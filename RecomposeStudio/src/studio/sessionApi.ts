// The session half of the studio's wire contract.
//
// SOURCE OF TRUTH, file by file — every type below is a transcription, not an
// invention, and a change there is a change here:
//
//   SessionRecord    RecomposeAPI/studio/schema/session_record.py
//   SessionSnapshot  RecomposeAPI/studio/schema/session_snapshot.py
//   StartSession     RecomposeAPI/studio/schema/session_open.py
//
// A SESSION is one design being made end to end; a RUN is one pipeline launch
// inside it. Per-node run progress deliberately does NOT come through here — a
// `task` record names its `run_id` and the browser attaches the existing run
// stream to it, so there is one place that knows how a run is going.

import { resolveStudioBaseUrl } from './studioConfig';
import type { BriefInput } from './studioApi';
import { StudioError } from './studioApi';

/** `SessionRecordKind` — the seven line kinds a transcript can carry. */
export type SessionRecordKind =
  | 'opened'
  | 'phase'
  | 'said'
  | 'asked'
  | 'proposed'
  | 'task'
  | 'settled';

/** `SessionPhase` — the demo's own phase vocabulary, carried as a record. */
export type SessionPhase =
  | 'brief'
  | 'generating'
  // No 'layout brief' between these two: the layout is not interviewed for,
  // so a settled run goes straight to 'designing'.
  | 'designing'
  | 'validating'
  | 'review'
  | 'approved';

/** `AgentQuestion` — rendered as a chip row. */
export interface AgentQuestion {
  readonly question: string;
  readonly options: readonly string[];
  readonly multi_select: boolean;
}

/**
 * One line of a session's log — and one SSE frame's payload.
 *
 * Every field but `kind` / `index` / `at` is optional because one model covers
 * all seven kinds; which kind carries what is in the Python's own docstring.
 */
export interface SessionRecord {
  readonly kind: SessionRecordKind;
  readonly index: number;
  readonly at: string;

  readonly session_id?: string | null;
  readonly app_id?: string | null;
  readonly design_name?: string | null;

  readonly phase?: SessionPhase | null;

  readonly who?: 'agent' | 'you' | null;
  readonly text?: string | null;

  readonly question?: AgentQuestion | null;

  readonly brief?: BriefInput | null;

  readonly task?: 'assets' | 'layout' | null;
  readonly task_state?: 'started' | 'progress' | 'finished' | 'failed' | null;
  /** The pipeline run to attach the RUN stream to. Assets only. */
  readonly run_id?: string | null;
  /** The mock app folder the layout agent is writing to. Layout only. */
  readonly design_id?: string | null;
  /** One line of the layout agent's stdout. */
  readonly line?: string | null;

  readonly error?: string | null;
}

/** `RunStatus`, reused: a session runs, succeeds, fails or is found crashed. */
export type SessionStatus = 'running' | 'succeeded' | 'failed' | 'crashed';

export interface SessionSnapshot {
  readonly session_id: string;
  readonly app_id: string;
  /** Null until the brand brief names it — nothing is typed before the
      conversation starts. */
  readonly design_name: string | null;
  readonly status: SessionStatus;
  /** The last phase declared, or null before the first one. */
  readonly phase?: SessionPhase | null;
  readonly started_at: string;
  readonly finished_at?: string | null;
  readonly error?: string | null;
  readonly records: readonly SessionRecord[];
}

export interface SessionOpened {
  readonly session_id: string;
  readonly app_id: string;
  readonly design_name: string | null;
  readonly started_at: string;
}

function url(path: string): string {
  return `${resolveStudioBaseUrl()}${path}`;
}

/**
 * Every failure as a `StudioError`, so a caller never has to tell a network
 * error from a refusal by inspecting what was thrown.
 */
async function send<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url(path), init);
  } catch {
    throw new StudioError(
      0,
      `The studio is not reachable at ${resolveStudioBaseUrl()}. ` +
        'Start it with `make -C RecomposeAPI dev`.',
    );
  }
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const detail = (body as { detail?: unknown } | null)?.detail;
    throw new StudioError(
      response.status,
      typeof detail === 'string'
        ? detail
        : `The studio answered ${response.status}.`,
      detail,
    );
  }
  return (await response.json()) as T;
}

/**
 * Open a session. 409 when one is already open.
 *
 * An app and nothing else. A design name used to be required, typed into a
 * form in front of the page — which asked a person to name a thing that did
 * not exist yet before anything had explained what was about to happen, and
 * asked for a fact the agent's own first question collects anyway.
 */
export async function openSession(input: {
  appId: string;
}): Promise<SessionOpened> {
  return send<SessionOpened>('/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: input.appId }),
  });
}

/**
 * Say something, or pick a chip.
 *
 * One entry point for both, because they are the same thing to the agent — a
 * chip pick posts the option's own text. Nothing useful comes back: the reply
 * is the next record on the stream, not the response to this request.
 */
export async function takeTurn(sessionId: string, message: string): Promise<void> {
  await send<unknown>(`/sessions/${encodeURIComponent(sessionId)}/turn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
}

/**
 * Accept the open proposal — exactly one half.
 *
 * The reviewed brief goes back VERBATIM rather than the server reading its own
 * state, because the review panel is editable: what the owner accepted is what
 * they were looking at, not necessarily what the agent last proposed.
 *
 * A separate route from `takeTurn` because the commit is deterministic and
 * runs before the agent is told — a brief is never reported saved because a
 * model said so.
 */
export async function acceptProposal(
  sessionId: string,
  brief: BriefInput,
): Promise<void> {
  await send<unknown>(`/sessions/${encodeURIComponent(sessionId)}/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brief }),
  });
}

/**
 * Start (or restart) the layout agent on this session's run.
 *
 * **It normally starts itself** when the asset run settles. This is the
 * manual door, and it exists because Stop without Start would be a one-way
 * door — the only way back to another layout attempt would be regenerating
 * the whole theme, which would make stopping a bad run cost more than letting
 * it finish. Starting on an existing folder continues it rather than
 * re-copying the base.
 */
export async function startLayout(sessionId: string): Promise<string> {
  const body = await send<{ design_id: string }>(
    `/sessions/${encodeURIComponent(sessionId)}/layout/start`,
    { method: 'POST' },
  );
  return body.design_id;
}

/**
 * Stop the running layout agent, whole process tree.
 *
 * **The one control over the most expensive thing the studio starts.** A
 * layout agent runs for a long time and bills the whole time; closing the tab
 * does not stop it, and before this the only way out was killing the API.
 *
 * Returns how many were stopped, so the page can say "nothing was running"
 * rather than implying it stopped something.
 */
export async function stopLayout(sessionId: string): Promise<number> {
  const body = await send<{ stopped: number }>(
    `/sessions/${encodeURIComponent(sessionId)}/layout/stop`,
    { method: 'POST' },
  );
  return body.stopped;
}

/** Approve the design and close the session. */
export async function closeSession(sessionId: string): Promise<void> {
  await send<unknown>(`/sessions/${encodeURIComponent(sessionId)}/close`, {
    method: 'POST',
  });
}

/** The open session, or `null` — how a freshly-loaded page re-attaches. */
export async function fetchActiveSession(): Promise<SessionSnapshot | null> {
  return send<SessionSnapshot | null>('/sessions/active');
}

/** One session's full state (the poll fallback). */
export async function fetchSessionSnapshot(
  sessionId: string,
): Promise<SessionSnapshot> {
  return send<SessionSnapshot>(`/sessions/${encodeURIComponent(sessionId)}`);
}

/** The SSE endpoint. Replays from index 0 on every connect. */
export function sessionEventsUrl(sessionId: string): string {
  return url(`/sessions/${encodeURIComponent(sessionId)}/events`);
}
