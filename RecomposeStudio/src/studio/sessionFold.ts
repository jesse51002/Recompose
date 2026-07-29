// The session, folded out of its records.
//
// Same discipline as ./runFold.ts and for the same reason: the stream REPLAYS
// FROM INDEX 0 on every connect, so a tab that opens after the design was
// approved, a tab that reconnects after a drop, and a tab that watched from the
// first second all receive the same list in the same order. Rendering has to be
// a pure function of that list — anything that assumed "I was here for the
// start" would show a different conversation depending on when it connected.

import type {
  AgentQuestion,
  LayoutBriefInput,
  SessionPhase,
  SessionRecord,
} from './sessionApi';
import type { BriefInput } from './studioApi';

/** One thing the transcript shows, in order. */
export type Entry =
  | { readonly kind: 'said'; readonly who: 'agent' | 'you'; readonly text: string }
  | { readonly kind: 'phase'; readonly phase: SessionPhase }
  | { readonly kind: 'asked'; readonly question: AgentQuestion; readonly answered: boolean }
  | { readonly kind: 'brief'; readonly brief: BriefInput; readonly accepted: boolean }
  | { readonly kind: 'layout'; readonly brief: LayoutBriefInput; readonly accepted: boolean }
  | { readonly kind: 'task'; readonly task: 'assets' | 'layout'; readonly state: string; readonly line: string | null; readonly error: string | null };

export interface SessionView {
  readonly entries: readonly Entry[];
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
  /** The proposal awaiting an Accept, if any. */
  readonly proposal:
    | { readonly kind: 'brief'; readonly brief: BriefInput }
    | { readonly kind: 'layout'; readonly brief: LayoutBriefInput }
    | null;
  readonly settled: boolean;
}

/**
 * Fold a session's records into what the page renders.
 *
 * **A question or a proposal is "pending" only if it is the LAST one of its
 * kind and nothing the owner said came after it.** That is what stops a
 * transcript full of answered questions from showing five live chip rows —
 * the records never say "answered", because answering is just the next `said`.
 */
export function foldSession(records: readonly SessionRecord[]): SessionView {
  const entries: Entry[] = [];
  let phase: SessionPhase | null = null;
  let runId: string | null = null;
  let designId: string | null = null;
  let themeId: string | null = null;
  let settled = false;

  // Index of the last still-open ask / proposal, or -1. Cleared by anything
  // the owner says, because that IS the answer.
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
          openAsk = entries.length;
          entries.push({ kind: 'asked', question: record.question, answered: false });
        }
        break;
      case 'proposed':
        if (record.brief) {
          openProposal = entries.length;
          entries.push({ kind: 'brief', brief: record.brief, accepted: false });
        } else if (record.layout) {
          openProposal = entries.length;
          entries.push({ kind: 'layout', brief: record.layout, accepted: false });
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

  // A settled session has nothing open, whatever the last records were.
  if (settled) {
    openAsk = -1;
    openProposal = -1;
  }

  const pendingEntry = openAsk >= 0 ? entries[openAsk] : undefined;
  const proposalEntry = openProposal >= 0 ? entries[openProposal] : undefined;

  return {
    entries: entries.map((entry, i) =>
      i === openAsk || i === openProposal
        ? entry
        : markResolved(entry),
    ),
    phase,
    runId,
    designId,
    themeId,
    pending:
      pendingEntry?.kind === 'asked' ? pendingEntry.question : null,
    proposal:
      proposalEntry?.kind === 'brief'
        ? { kind: 'brief', brief: proposalEntry.brief }
        : proposalEntry?.kind === 'layout'
          ? { kind: 'layout', brief: proposalEntry.brief }
          : null,
    settled,
  };
}

/** A question or proposal that is no longer the open one reads as resolved. */
function markResolved(entry: Entry): Entry {
  if (entry.kind === 'asked') return { ...entry, answered: true };
  if (entry.kind === 'brief' || entry.kind === 'layout') {
    return { ...entry, accepted: true };
  }
  return entry;
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
