// How the run is going, in one line of the canvas bar.
//
// This is what replaced a whole page of run chrome. Per-node state, a live
// clock and a cost readout are worth a glance, not a destination — the
// artifacts themselves are in Inspect, and the narrative is in the transcript.
//
// It reads the RUN stream, not the session: a `task` record names the run id
// and the browser attaches here, so there is exactly one thing that knows how
// a run is going.

import { foldRecords } from '../studio/runFold';
import { useNowTick } from '../studio/useNowTick';
import { useRunStream } from '../studio/useRunStream';

import styles from './RunMeter.module.css';

export function RunMeter({ runId }: { runId: string | null }) {
  if (runId === null) {
    // Not "0 of 23": nothing has been asked for yet, and a zeroed counter
    // would read as a run that has produced nothing rather than no run.
    return <div className={styles.meter}><span>nothing generating</span></div>;
  }
  return <Live key={runId} runId={runId} />;
}

/**
 * Split out because `useRunStream` must be keyed on the run id, and hooks
 * cannot be called conditionally in the parent.
 */
function Live({ runId }: { runId: string }) {
  const { records } = useRunStream(runId);
  const run = foldRecords(records);
  // The clock stops when the run does — a finished run costs no renders, and
  // the numbers it settled on stay put.
  const now = useNowTick(!run.settled);

  // `nodes` is every node, roots included; that is the honest denominator for
  // "produced", since colour and typography are produced things too.
  const done = run.nodes.done;
  const total = run.nodes.total;
  const failed = run.nodes.failed;
  const started = run.startedAt === null ? null : Date.parse(run.startedAt);
  const elapsed =
    started === null ? null : Math.max(0, Math.round((now - started) / 1000));

  return (
    <div className={styles.meter}>
      <span className={run.settled ? undefined : styles.running}>
        <b>
          {done}
          {total > 0 ? ` / ${String(total)}` : ''}
        </b>{' '}
        produced
      </span>
      {/* Failure gets the one alarm hue and is never folded into the count —
          the pipeline is fault-tolerant, so a lost node is a normal outcome
          that still has to be visible. */}
      {failed > 0 && (
        <span className={styles.failed}>
          <b>{failed}</b> failed
        </span>
      )}
      {run.finish?.cost != null && (
        <span>
          <b>${run.finish.cost.toFixed(2)}</b>
        </span>
      )}
      {elapsed !== null && <span>{formatElapsed(elapsed)}</span>}
    </div>
  );
}

/** `4m 12s`, or `48s` under a minute. Seconds matter early and stop mattering. */
function formatElapsed(seconds: number): string {
  if (seconds < 60) return `${String(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m)}m ${String(s)}s`;
}
