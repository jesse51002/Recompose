// One session's transcript, live.
//
// The transport is ./recordStream.ts, shared with the run stream; this is the
// session-shaped half — which endpoints, and how a session's records merge and
// end.

import type { RecordStream, RecordStreamSource } from './recordStream';
import { useRecordStream } from './recordStream';
import type { SessionRecord } from './sessionApi';
import { fetchSessionSnapshot, sessionEventsUrl } from './sessionApi';
import { appendSessionRecord, goneSessionRecords } from './sessionFold';
import { StudioError } from './studioApi';

export type SessionStream = RecordStream<SessionRecord>;

/** Module-level: see the note in ./useRunStream.ts. */
const SESSION_SOURCE: RecordStreamSource<SessionRecord> = {
  eventsUrl: sessionEventsUrl,
  fetchSnapshot: async (id) => (await fetchSessionSnapshot(id)).records,
  append: appendSessionRecord,
  isTerminal: (record) => record.kind === 'settled',
  gone: goneSessionRecords,
  isNotFound: (error) => error instanceof StudioError && error.status === 404,
};

/**
 * Subscribe to one session. **Mount under a `key={sessionId}`** — see
 * `useRecordStream` for why.
 */
export function useSessionStream(sessionId: string): SessionStream {
  return useRecordStream(sessionId, SESSION_SOURCE);
}
