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

/**
 * How a multi-select answer is joined into the one message a turn carries.
 *
 * A turn is a string — the records cannot tell a chip press from typing, which
 * is deliberate — so several picks have to arrive as one line. Chosen over a
 * comma because an option may well contain a comma and this one will not, and
 * because it reads as a list to the model rather than as prose.
 */
export const ANSWER_SEPARATOR = ' · ';

/** One thing the transcript shows, in order. */
export type Entry =
  | { readonly kind: 'said'; readonly who: 'agent' | 'you'; readonly text: string }
  | { readonly kind: 'phase'; readonly phase: SessionPhase }
  | {
      readonly kind: 'asked';
      readonly question: AgentQuestion;
      readonly answered: boolean;
      /**
       * The option(s) the person took, once they have. Empty until then.
       *
       * A LIST because a question can be multi-select (`multi_select` on the
       * agent's own schema, which the UI used to ignore). Not in the records —
       * answering is just the next `said`, so this is derived by matching that
       * text back against the options. A typed reply that happens to match an
       * option counts as picking it, which is the honest reading: the
       * transcript cannot tell them apart either, and neither can the agent.
       */
      readonly picked: readonly string[];
    }
  | {
      readonly kind: 'brief';
      readonly brief: BriefInput;
      /** Someone pressed Accept on it. Only an `accepted` record sets this. */
      readonly accepted: boolean;
      /**
       * It is the one waiting on a decision right now.
       *
       * Separate from `!accepted`, because a brief the agent replaced with a
       * newer one is also unaccepted and must not still offer its own Accept.
       */
      readonly awaiting: boolean;
    }
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
  /**
   * WHAT THIS DESIGN HAS COST, in USD, split by which half spent it.
   *
   * Summed from `spent` records rather than held as a total, so a tab that
   * joins in the fortieth minute reports the same number as one that watched
   * from the start — the same property everything else here has.
   *
   * Neither figure includes the LAYOUT agent: it runs on the operator's own
   * CLI credentials and reports nothing back, so counting it would mean
   * inventing a number.
   */
  readonly agentCostUsd: number;
  readonly assetsCostUsd: number;
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
  /**
   * Whether the ASSET run is still going.
   *
   * The pair of `layoutRunning`, derived the same way and for the same kind of
   * reason: the theme grows on disk for the whole run, so the canvas has to
   * keep re-fetching it, and this is what says when to stop. Without it the
   * page fetched the theme once — at whichever level happened to have landed
   * first — and then showed that frozen partial for the rest of the run.
   */
  readonly assetsRunning: boolean;
  /**
   * The asset run FINISHED, and finished well.
   *
   * Distinct from `themeId !== null`, which is true from the moment the run
   * STARTS — the started record already names the theme it is going to make.
   * Gating the layout offer on that said "the theme is ready" within a second
   * of launching, minutes before it was, and offered to lay out a design that
   * was three images deep.
   *
   * Distinct from `!assetsRunning` too, because that is also true of a run
   * that failed and of one that never began. Only a `finished` state sets it.
   */
  readonly assetsSettled: boolean;
  readonly settled: boolean;
  /**
   * WHY it settled, when it did not settle well.
   *
   * A session is settled by a PERSON approving the design — except for one
   * case, and that case is why this field exists. When a session is not in the
   * server's memory (its process restarted while the design was in flight),
   * the stream yields a SYNTHETIC settled record carrying an error, so a
   * client terminates instead of reconnecting forever against a dead session.
   * Reading `settled` alone turned that crash marker into the approval
   * celebration: the design announced itself approved, with nobody having
   * pressed anything, every time the studio was restarted mid-run.
   *
   * Null means it settled the way it is supposed to.
   */
  readonly settledError: string | null;
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
  let assetsRunning = false;
  let assetsSettled = false;
  let agentCostUsd = 0;
  let assetsCostUsd = 0;
  let settled = false;
  let settledError: string | null = null;

  // Index of the still-open ask, or -1. Cleared by anything the owner says,
  // because that IS the answer. A PROPOSAL has no equivalent: it stays
  // acceptable until accepted or replaced, which is what `awaiting` below
  // works out at the end.
  let openAsk = -1;

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
          }
        }
        break;
      case 'asked':
        if (record.question) {
          openAsk = entries.length;
          entries.push({
            kind: 'asked',
            question: record.question,
            answered: false,
            picked: [],
          });
        }
        break;
      case 'proposed':
        if (record.brief) {
          openAsk = -1;
          designName = record.brief.design_direction.name;
          entries.push({
            kind: 'brief',
            brief: record.brief,
            accepted: false,
            awaiting: false,
          });
        }
        break;
      case 'accepted':
        // THE ONLY THING THAT ACCEPTS A BRIEF. It used to be inferred — a
        // proposal that was no longer the open one read as accepted — but a
        // proposal stops being open the moment the person says ANYTHING, so
        // typing "make it darker" marked the brief accepted and took its
        // Accept button away. Not open and accepted are different facts.
        //
        // It accepts the LAST brief rather than the open one, because the two
        // can differ: saying something closes the open proposal, and the
        // person may then press Accept on the card they were already reading.
        {
          const at = lastBriefIndex(entries);
          const brief = at >= 0 ? entries[at] : undefined;
          if (brief !== undefined && brief.kind === 'brief') {
            entries[at] = { ...brief, accepted: true };
          }
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
        if (record.task === 'assets' && record.task_state) {
          assetsRunning =
            record.task_state === 'started' || record.task_state === 'progress';
          // Last record wins, so a re-run correctly un-settles it.
          assetsSettled = record.task_state === 'finished';
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
      case 'spent':
        // Accumulated, never rendered as an entry: money is a running total,
        // not a moment in the conversation.
        if (record.spent_on === 'agent') agentCostUsd += record.cost_usd ?? 0;
        else if (record.spent_on === 'assets') assetsCostUsd += record.cost_usd ?? 0;
        break;
      case 'settled':
        settled = true;
        settledError = record.error ?? null;
        break;
      default:
        break;
    }
  }

  // A settled session has nothing open, whatever the last records were — and
  // approving stops the agent server-side, so nothing is running either.
  if (settled) {
    openAsk = -1;
    layoutRunning = false;
    assetsRunning = false;
  }

  const pendingEntry = openAsk >= 0 ? entries[openAsk] : undefined;

  // WHAT IS AWAITING AN ACCEPT: the last brief that has not been accepted.
  //
  // Not "the open proposal" any more, and that distinction is the whole fix.
  // Saying anything closes the open proposal — that is how a question knows it
  // was answered — so a person who typed "make it warmer" and then reached for
  // Accept was pressing a button wired to null. A brief stays acceptable until
  // it is either accepted or replaced by a newer one.
  //
  // Suppressed while a question is open, so the CLAUDE.md invariant holds:
  // never live chips above a live Accept.
  const lastBrief = lastBriefIndex(entries);
  const lastBriefEntry = lastBrief >= 0 ? entries[lastBrief] : undefined;
  const awaiting =
    openAsk < 0 &&
    !settled &&
    lastBriefEntry !== undefined &&
    lastBriefEntry.kind === 'brief' &&
    !lastBriefEntry.accepted
      ? lastBrief
      : -1;

  return {
    entries: entries.map((entry, i) =>
      i === awaiting
        ? { ...(entry as Extract<Entry, { kind: 'brief' }>), awaiting: true }
        : i === openAsk
          ? entry
          : markResolved(entry, entries, i),
    ),
    designName,
    layoutRunning,
    assetsRunning,
    assetsSettled,
    agentCostUsd,
    assetsCostUsd,
    phase,
    runId,
    designId,
    themeId,
    pending: pendingEntry?.kind === 'asked' ? pendingEntry.question : null,
    proposal:
      awaiting >= 0 && lastBriefEntry?.kind === 'brief'
        ? lastBriefEntry.brief
        : null,
    settled,
    settledError,
  };
}

/** The most recent brief in the transcript, or -1 if there is none yet. */
function lastBriefIndex(entries: readonly Entry[]): number {
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    if (entries[i]!.kind === 'brief') return i;
  }
  return -1;
}

/** A question that is no longer the open one reads as answered. */
function markResolved(
  entry: Entry,
  entries: readonly Entry[],
  index: number,
): Entry {
  if (entry.kind === 'asked') {
    return { ...entry, answered: true, picked: answerTo(entries, index) };
  }
  // A BRIEF IS NOT TOUCHED HERE. Being closed and being accepted are
  // different facts, and only an `accepted` record carries the second.
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
function answerTo(entries: readonly Entry[], index: number): readonly string[] {
  for (let i = index + 1; i < entries.length; i += 1) {
    const entry = entries[i]!;
    if (entry.kind === 'asked') return [];
    if (entry.kind === 'said' && entry.who === 'you') {
      const asked = entries[index];
      if (asked?.kind !== 'asked') return [];
      // Split first, so a multi-select answer resolves to every chip it
      // names. A single pick has no separator in it and falls out of the same
      // code as a one-element list.
      const said = entry.text.split(ANSWER_SEPARATOR);
      return asked.question.options.filter((option) => said.includes(option));
    }
  }
  return [];
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
