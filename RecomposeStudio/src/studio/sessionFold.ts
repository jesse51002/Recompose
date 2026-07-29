// The session, folded out of its records.
//
// Same discipline as ./runFold.ts and for the same reason: the stream REPLAYS
// FROM INDEX 0 on every connect, so a tab that opens after the design was
// approved, a tab that reconnects after a drop, and a tab that watched from the
// first second all receive the same list in the same order. Rendering has to be
// a pure function of that list — anything that assumed "I was here for the
// start" would show a different conversation depending on when it connected.

import type { AgentQuestion, SessionPhase, SessionRecord } from './sessionApi';
import type { BriefInput } from './studioApi';

/** One thing the transcript shows, in order. */
export type Entry =
  | { readonly kind: 'said'; readonly who: 'agent' | 'you'; readonly text: string }
  | { readonly kind: 'phase'; readonly phase: SessionPhase }
  | {
      readonly kind: 'asked';
      readonly question: AgentQuestion;
      readonly answered: boolean;
      /**
       * The option the person took, once they have.
       *
       * Not in the records — answering is just the next `said`, so this is
       * derived by matching that text back against the options. A typed reply
       * that happens to match an option counts as picking it, which is the
       * honest reading: the transcript cannot tell them apart either, and
       * neither can the agent.
       */
      readonly picked: string | null;
    }
  | { readonly kind: 'brief'; readonly brief: BriefInput; readonly accepted: boolean }
  | { readonly kind: 'task'; readonly task: 'assets' | 'layout'; readonly state: string; readonly line: string | null; readonly error: string | null };

export interface SessionView {
  readonly entries: readonly Entry[];
  /**
   * What the design is called, once its brief has named it — null before.
   *
   * Nothing is typed before the conversation starts, so this is the first
   * moment a name exists. Read off the last proposed brief rather than held as
   * state, so it survives a reload like everything else here.
   */
  readonly designName: string | null;
  /** The last phase declared, or null before the first one. */
  readonly phase: SessionPhase | null;
  /** The run to attach the RUN stream to, once one has started. */
  readonly runId: string | null;
  /** The design folder the layout agent is writing to, once one exists. */
  readonly designId: string | null;
  /**
   * The theme being generated — the asset run's NAME, which is its id in the
   * catalogue. Distinct from `designId`: one is an arrangement, the other a
   * set of slots, and they arrive from different tasks.
   */
  readonly themeId: string | null;
  /** The open question, if the agent is waiting on a pick. */
  readonly pending: AgentQuestion | null;
  /** The brand brief awaiting an Accept, if one is open. */
  readonly proposal: BriefInput | null;
  /**
   * Whether a layout agent is running right now.
   *
   * Derived from the last `layout` task record rather than tracked, so it
   * survives a reload like everything else. It gates the Stop control: the
   * agent is the most expensive thing this page starts, and an offer to stop
   * something that is not running is worse than no offer at all.
   */
  readonly layoutRunning: boolean;
  readonly settled: boolean;
}

/**
 * Fold a session's records into what the page renders.
 *
 * **A question or a proposal is "pending" only if it is the LAST one of its
 * kind and nothing the owner said came after it.** That is what stops a
 * transcript full of answered questions from showing five live chip rows —
 * the records never say "answered", because answering is just the next `said`.
 *
 * **AT MOST ONE THING IS EVER AWAITING THE PERSON.** A question closes any open
 * proposal and a proposal closes any open question, so the page can never show
 * live chips above a live Accept button. The agent's own output union makes one
 * turn produce one arm, but a turn is not the unit that matters here: a system
 * note (a run settling) can start a turn without the owner having said
 * anything, so an ask left open before it would still be live underneath
 * whatever came after. Two live asks would mean two answers, and the second
 * would silently overwrite the first.
 */
export function foldSession(records: readonly SessionRecord[]): SessionView {
  const entries: Entry[] = [];
  let phase: SessionPhase | null = null;
  let runId: string | null = null;
  let designId: string | null = null;
  let themeId: string | null = null;
  let designName: string | null = null;
  let layoutRunning = false;
  let settled = false;

  // Index of the still-open ask / proposal, or -1. At most one is ever set.
  // Cleared by anything the owner says, because that IS the answer.
  let openAsk = -1;
  let openProposal = -1;

  for (const record of records) {
    switch (record.kind) {
      case 'phase':
        if (record.phase) {
          phase = record.phase;
          entries.push({ kind: 'phase', phase: record.phase });
        }
        break;
      case 'said':
        if (record.who && record.text) {
          entries.push({ kind: 'said', who: record.who, text: record.text });
          if (record.who === 'you') {
            openAsk = -1;
            openProposal = -1;
          }
        }
        break;
      case 'asked':
        if (record.question) {
          openProposal = -1;
          openAsk = entries.length;
          entries.push({
            kind: 'asked',
            question: record.question,
            answered: false,
            picked: null,
          });
        }
        break;
      case 'proposed':
        if (record.brief) {
          openAsk = -1;
          openProposal = entries.length;
          designName = record.brief.design_direction.name;
          entries.push({ kind: 'brief', brief: record.brief, accepted: false });
        }
        break;
      case 'task':
        if (record.run_id) runId = record.run_id;
        // Both tasks use `design_id`, and they mean different things: the
        // assets task names the THEME it is producing, the layout task names
        // the FOLDER it is editing.
        if (record.design_id) {
          if (record.task === 'assets') themeId = record.design_id;
          else designId = record.design_id;
        }
        if (record.task === 'layout' && record.task_state) {
          // 'started' and 'progress' both mean a process is alive; anything
          // else is terminal. Last record wins, so a restart re-arms it.
          layoutRunning =
            record.task_state === 'started' || record.task_state === 'progress';
        }
        if (record.task && record.task_state) {
          entries.push({
            kind: 'task',
            task: record.task,
            state: record.task_state,
            line: record.line ?? null,
            error: record.error ?? null,
          });
        }
        break;
      case 'settled':
        settled = true;
        break;
      default:
        break;
    }
  }

  // A settled session has nothing open, whatever the last records were — and
  // approving stops the agent server-side, so nothing is running either.
  if (settled) {
    openAsk = -1;
    openProposal = -1;
    layoutRunning = false;
  }

  const pendingEntry = openAsk >= 0 ? entries[openAsk] : undefined;
  const proposalEntry = openProposal >= 0 ? entries[openProposal] : undefined;

  return {
    entries: entries.map((entry, i) =>
      i === openAsk || i === openProposal
        ? entry
        : markResolved(entry, entries, i),
    ),
    designName,
    layoutRunning,
    phase,
    runId,
    designId,
    themeId,
    pending: pendingEntry?.kind === 'asked' ? pendingEntry.question : null,
    proposal: proposalEntry?.kind === 'brief' ? proposalEntry.brief : null,
    settled,
  };
}

/** A question or proposal that is no longer the open one reads as resolved. */
function markResolved(
  entry: Entry,
  entries: readonly Entry[],
  index: number,
): Entry {
  if (entry.kind === 'asked') {
    return { ...entry, answered: true, picked: answerTo(entries, index) };
  }
  if (entry.kind === 'brief') return { ...entry, accepted: true };
  return entry;
}

/**
 * Which option an answered question was answered WITH.
 *
 * The next thing the owner said after it, if that text is one of the options.
 * Scanning forward rather than storing the pick keeps the whole fold a pure
 * function of the record list — the property that makes a reload free — and
 * there is nothing to store anyway: a chip press posts the option's own text,
 * so the records genuinely do not distinguish it from typing.
 *
 * Stops at the next question so a later answer cannot be attributed to an
 * earlier ask.
 */
function answerTo(entries: readonly Entry[], index: number): string | null {
  for (let i = index + 1; i < entries.length; i += 1) {
    const entry = entries[i]!;
    if (entry.kind === 'asked') return null;
    if (entry.kind === 'said' && entry.who === 'you') {
      const asked = entries[index];
      if (asked?.kind !== 'asked') return null;
      return asked.question.options.includes(entry.text) ? entry.text : null;
    }
  }
  return null;
}

/**
 * Merge one arriving record. Same three cases as `runFold.appendRecord`:
 * a duplicate from a replay is dropped, the next one extends, and anything
 * beyond the end is a GAP the caller repairs from a snapshot.
 */
export function appendSessionRecord(
  current: readonly SessionRecord[],
  record: SessionRecord,
): readonly SessionRecord[] | null {
  if (record.index < current.length) return current;
  if (record.index > current.length) return null;
  return [...current, record];
}

/** What the list becomes when the server says the session is gone. */
export function goneSessionRecords(
  current: readonly SessionRecord[],
): readonly SessionRecord[] {
  if (current.length > 0 && current[current.length - 1]!.kind === 'settled') {
    return current;
  }
  return [
    ...current,
    {
      kind: 'settled',
      index: current.length,
      at: new Date().toISOString(),
      error: 'this session is no longer on the studio',
    },
  ];
}
