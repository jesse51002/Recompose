// One run's records, live.
//
// The transport lives in ./recordStream.ts and is shared with the session
// stream; what is left here is the run-shaped half — which endpoints, and how a
// run's records merge and end. That split is the point: the three subtleties
// the transport gets right (close on terminal, survive a replay, degrade to
// poll) are properties of a replayable log, not of a run, and a second copy of
// them is how they come undone.

import { appendRecord, goneRecords, withTerminal } from './runFold';
import type { RecordStream, RecordStreamSource, Transport } from './recordStream';
import { useRecordStream } from './recordStream';
import type { RunRecord } from './studioApi';
import { fetchRunSnapshot, runEventsUrl, StudioError } from './studioApi';

export type { Transport };
export type RunStream = RecordStream<RunRecord>;

/**
 * Module-level, not built per render: `useRecordStream` re-subscribes when this
 * identity changes, so a fresh object every render would tear the stream down
 * and replay it from zero on every keystroke elsewhere in the page.
 */
const RUN_SOURCE: RecordStreamSource<RunRecord> = {
  eventsUrl: runEventsUrl,
  // `withTerminal` is what turns a crashed run's log — one with no terminal
  // line — into a list a client can stop on.
  fetchSnapshot: async (runId) => withTerminal(await fetchRunSnapshot(runId)),
  append: appendRecord,
  isTerminal: (record) => record.kind === 'settled',
  gone: goneRecords,
  isNotFound: (error) => error instanceof StudioError && error.status === 404,
};

/**
 * Subscribe to one run. **Mount under a `key={runId}`** — see
 * `useRecordStream` for why.
 */
export function useRunStream(runId: string): RunStream {
  return useRecordStream(runId, RUN_SOURCE);
}
