// The replayable-log subscription, once — used by both the run stream and the
// session stream.
//
// WHY THIS IS SHARED AND THE FOLDS ARE NOT. A run and a session are different
// things and their records mean different things, so the code that INTERPRETS
// them is deliberately separate. What is identical is the transport, and it is
// identical because both servers made the same three choices: one frame shape,
// replay from index 0 on every connect, and the stream ends after the terminal
// record.
//
// Those choices come with three obligations that took real debugging to get
// right the first time, and a second hand-written copy is how they come undone:
//
//  1. **Close on the terminal record.** The server ENDS the stream there. An
//     `EventSource` still open when that happens reconnects automatically — and
//     is replayed from 0 again, forever. This is the difference between a
//     finished demo and a silent request loop against a laptop.
//  2. **Survive a replay.** Every connect replays from 0, so a reconnect
//     re-delivers records already held. They are dropped by index; a record
//     from beyond the end means frames went MISSING and is repaired from the
//     snapshot, never appended as a hole.
//  3. **Keep going when the stream does not.** The snapshot endpoint returns the
//     same records in one shot, so a dropped stream degrades to a poll rather
//     than to a frozen page.
//
// The records list is held in an effect-LOCAL variable as well as in state: a
// callback closing over the state value would read whatever was current when
// the effect ran. This package cannot answer that with a ref written during
// render (the React Compiler's `refs` rule is an error here), and does not need
// to — the effect owns the subscription, so it can own its own mirror.

import { useEffect, useState } from 'react';

/** How the records are currently arriving. */
export type Transport = 'live' | 'polling' | 'closed';

export interface RecordStream<T> {
  readonly records: readonly T[];
  readonly transport: Transport;
}

/**
 * Everything that differs between a run and a session. Deliberately small: if
 * this grows a fourth callback, that is a sign the two have diverged enough
 * that sharing the transport is no longer buying anything.
 */
export interface RecordStreamSource<T> {
  /** The SSE endpoint for this id. */
  readonly eventsUrl: (id: string) => string;
  /** The whole record list in one shot — the poll fallback. */
  readonly fetchSnapshot: (id: string) => Promise<readonly T[]>;
  /**
   * Merge one arriving record. Returns the same list when it is a replayed
   * duplicate, a new list when it extends it, and **null** when it would leave
   * a gap — which the caller repairs from a snapshot rather than papering over.
   */
  readonly append: (current: readonly T[], record: T) => readonly T[] | null;
  /** Whether this record ends the stream. */
  readonly isTerminal: (record: T) => boolean;
  /** What the list becomes when the server says the id is gone (404). */
  readonly gone: (current: readonly T[]) => readonly T[];
  /** True when a 404 means "this is gone" rather than "the studio is down". */
  readonly isNotFound: (error: unknown) => boolean;
}

/** Stable empty reference: a fresh literal would re-render every consumer. */
const NO_RECORDS: readonly never[] = Object.freeze([]);

/** Slow enough not to hammer a laptop, fast enough that a demo still moves. */
const POLL_INTERVAL_MS = 2000;

/**
 * Subscribe to one replayable log.
 *
 * **Mount this under a `key={id}`.** Resetting the accumulated records when the
 * id changes would mean setting state from an effect, which is an error in this
 * package (`set-state-in-effect`); a `key` remount is the replacement it uses
 * everywhere else.
 */
export function useRecordStream<T>(
  id: string,
  source: RecordStreamSource<T>,
): RecordStream<T> {
  const [records, setRecords] = useState<readonly T[]>(NO_RECORDS);
  const [transport, setTransport] = useState<Transport>('live');

  useEffect(() => {
    let stopped = false;
    let es: EventSource | null = null;
    let pollTimer: number | undefined;
    // The effect's own view of the list — see the file header.
    let current: readonly T[] = NO_RECORDS;

    const publish = (next: readonly T[]): void => {
      current = next;
      setRecords(next);
    };

    const isSettled = (list: readonly T[]): boolean =>
      list.length > 0 && source.isTerminal(list[list.length - 1]!);

    const stopPolling = (): void => {
      if (pollTimer !== undefined) {
        window.clearInterval(pollTimer);
        pollTimer = undefined;
      }
    };

    const finish = (): void => {
      stopPolling();
      es?.close();
      es = null;
      setTransport('closed');
    };

    const resync = (): void => {
      void source
        .fetchSnapshot(id)
        .then((snapshot) => {
          if (stopped) return;
          // The snapshot is the whole list by construction, so it is only ever
          // adopted when it carries at least as much as we already hold — a
          // shorter answer would be a race, never a correction.
          if (snapshot.length >= current.length) publish(snapshot);
          if (isSettled(current)) finish();
        })
        .catch((error: unknown) => {
          if (stopped) return;
          // A 404 is an ANSWER, not a failure to reach: this is gone, and
          // polling for it forever would leave the view claiming it is still
          // going. Anything else is the studio being down — the next tick
          // tries again and the view keeps what already arrived.
          if (source.isNotFound(error)) {
            publish(source.gone(current));
            finish();
          }
        });
    };

    const startPolling = (): void => {
      if (pollTimer !== undefined || stopped) return;
      setTransport('polling');
      resync();
      pollTimer = window.setInterval(resync, POLL_INTERVAL_MS);
    };

    if (typeof EventSource === 'undefined') {
      // No streaming here (a test runner, an exotic client). The poll answers
      // exactly the same question, just less often.
      startPolling();
      return () => {
        stopped = true;
        stopPolling();
      };
    }

    es = new EventSource(source.eventsUrl(id));

    // Every frame is a default (unnamed) `message` whose data is one record as
    // JSON — one frame shape, so `onmessage` is the whole client.
    es.onmessage = (event: MessageEvent<string>) => {
      if (stopped) return;
      let record: T;
      try {
        record = JSON.parse(event.data) as T;
      } catch {
        return;
      }
      const next = source.append(current, record);
      if (next === null) {
        // A gap: frames went missing. The list cannot repair itself.
        resync();
        return;
      }
      if (next !== current) publish(next);
      // A live frame means the stream is carrying again.
      stopPolling();
      if (source.isTerminal(record)) finish();
      else setTransport('live');
    };

    es.onerror = () => {
      if (stopped) return;
      // `EventSource` reports both a transient drop (it reconnects itself) and
      // a dead server this way, and does not say which. Polling covers both,
      // and the next live frame cancels it.
      if (isSettled(current)) finish();
      else startPolling();
    };

    return () => {
      stopped = true;
      stopPolling();
      // A leaked stream against a local server is a slow leak nobody notices
      // until the demo, so this close is not optional.
      es?.close();
      es = null;
    };
    // `source` is a module-level constant in every caller; re-subscribing on a
    // fresh object identity would tear the stream down on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { records, transport };
}
