// The session half of the studio's wire contract.
//
// SOURCE OF TRUTH, file by file — every type below is a transcription, not an
// invention, and a change there is a change here:
//
//   SessionRecord    RecomposeAPI/studio/schema/session_record.py
//   SessionSnapshot  RecomposeAPI/studio/schema/session_snapshot.py
//   StartSession     RecomposeAPI/studio/schema/session_open.py
//   LayoutBrief      RecomposeAPI/studio/schema/layout_brief.py
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
  | 'layout brief'
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

/** One direction of a layout brief: a line, and the prose behind it. */
export interface DirectionInput {
  readonly short_desc: string;
  readonly long_desc: string;
}

/** `LayoutBrief` — the layout half's input, named per generation. */
export interface LayoutBriefInput {
  readonly name: string;
  readonly app: string;
  readonly theme_run: string;
  readonly layout_direction: DirectionInput;
  readonly motion_direction: DirectionInput;
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
  readonly layout?: LayoutBriefInput | null;

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
  readonly design_name: string;
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
  readonly design_name: string;
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

/** Open a session. 409 when one is already open. */
export async function openSession(input: {
  appId: string;
  designName: string;
}): Promise<SessionOpened> {
  return send<SessionOpened>('/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: input.appId, design_name: input.designName }),
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
