// The Generate page: watch a design get made.
//
// Three panes. The transcript on the left never resets between phases; the
// canvas in the centre shows the mock, repainting as the theme lands and
// switching to the generated folder once a layout agent is writing to one; the
// centre's Inspect side shows the run as it resolves.
//
// EVERYTHING IS A PURE FUNCTION OF THE RECORD LIST. The session stream replays
// from index 0 on every connect, so a reload mid-run costs nothing — which is
// the property the whole server-held session exists for, and the one worth not
// breaking here by keeping state that the records already carry.

import { useState } from 'react';

import { cx } from '../widgets/cx';
import { AppSpinner } from '../widgets/AppSpinner';
import { RunSheet } from '../studio/RunSheet';
import { foldSession } from '../studio/sessionFold';
import { useSessionStream } from '../studio/useSessionStream';
import { acceptProposal, closeSession, takeTurn } from '../studio/sessionApi';

import { SessionChat } from './SessionChat';
import { BriefSheet } from './BriefSheet';
import { GenerateCanvas } from './GenerateCanvas';
import { phaseClass, SHELL_CLASS } from './phaseClass';
import styles from './GenerateView.module.css';

/** Which side of the centre pane is showing. */
type Centre = 'mockup' | 'inspect' | 'brief';

interface GenerateViewProps {
  readonly sessionId: string;
  readonly designName: string;
}

/**
 * Watch one session.
 *
 * **Mounted under a `key={sessionId}`** by the caller, so a new design starts
 * with an empty accumulator rather than needing state reset from an effect.
 */
export function GenerateView({ sessionId, designName }: GenerateViewProps) {
  const { records, transport } = useSessionStream(sessionId);
  const [centre, setCentre] = useState<Centre>('mockup');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const view = foldSession(records);

  /** Every write shares one guard: one in flight, and failures are shown. */
  const act = (work: () => Promise<void>): void => {
    setBusy(true);
    setError(null);
    void work()
      .catch((cause: unknown) => {
        setError(cause instanceof Error ? cause.message : String(cause));
      })
      .finally(() => setBusy(false));
  };

  const say = (message: string): void => {
    act(() => takeTurn(sessionId, message));
  };

  const accept = (): void => {
    const proposal = view.proposal;
    if (proposal === null) return;
    // Opening the brief on accept is deliberate: the phase that follows is
    // long, and the thing the person just approved is what they should be
    // looking at while it runs.
    setCentre('brief');
    act(() =>
      acceptProposal(
        sessionId,
        proposal.kind === 'brief'
          ? { brief: proposal.brief }
          : { layout: proposal.brief },
      ),
    );
  };

  return (
    <div className={cx(styles.shell, SHELL_CLASS)}>
      <header className={styles.top}>
        <div className={styles.identity}>
          <span className={styles.product}>Recompose</span>
          <span className={styles.design}>{designName}</span>
        </div>
        <div className={styles.topRight}>
          {view.phase !== null && (
            <span className={cx(styles.tag, phaseClass(view.phase))}>
              {view.phase}
            </span>
          )}
          {/* The transport is worth showing because "polling" and "live" look
              identical until something is wrong, and a demo that has silently
              degraded is worse than one that says so. */}
          <span className={styles.transport}>{transport}</span>
          {view.settled ? (
            <span className={styles.done}>approved</span>
          ) : (
            <button
              type="button"
              className={styles.approve}
              disabled={busy}
              onClick={() => {
                act(() => closeSession(sessionId));
              }}
            >
              Approve design
            </button>
          )}
        </div>
      </header>

      {error !== null && <div className={styles.error}>{error}</div>}

      <div className={styles.panes}>
        <SessionChat
          view={view}
          onSay={say}
          onAccept={accept}
          onOpenProposal={() => setCentre('brief')}
          busy={busy}
        />

        <section className={styles.centre}>
          <nav className={styles.tabs}>
            <Tab now={centre} me="mockup" set={setCentre} label="Mockup" />
            <Tab now={centre} me="inspect" set={setCentre} label="Inspect" />
            {/* The brief is its own tab rather than a panel in the column: it
                is a document, and it is longer than that column deserves. */}
            <Tab
              now={centre}
              me="brief"
              set={setCentre}
              label="Brief"
              disabled={view.proposal === null && records.length === 0}
            />
          </nav>

          <div className={styles.stage}>
            {centre === 'mockup' && <GenerateCanvas view={view} />}
            {centre === 'inspect' &&
              (view.runId === null ? (
                <Empty>
                  Nothing has been generated yet. The run appears here the
                  moment one starts.
                </Empty>
              ) : (
                // RunSheet is kept whole from the previous studio: per-node
                // state, the live clock, the tally and the cost read better in
                // its plate grid than they ever would in a transcript.
                <RunSheet
                  key={view.runId}
                  runId={view.runId}
                  // The brief is shown in its own tab here, so the sheet's
                  // masthead falls back to the run name rather than repeating
                  // a document that is one click away.
                  brief={null}
                  // Starting another run is the session's job, not a button
                  // inside a pane of it: the agent decides when work starts.
                  onStartAnother={() => setCentre('mockup')}
                />
              ))}
            {centre === 'brief' && <BriefSheet view={view} />}
          </div>
        </section>
      </div>
    </div>
  );
}

function Tab({
  now,
  me,
  set,
  label,
  disabled = false,
}: {
  now: Centre;
  me: Centre;
  set: (next: Centre) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={cx(styles.tab, now === me && styles.tabOn)}
      aria-pressed={now === me}
      disabled={disabled}
      onClick={() => set(me)}
    >
      {label}
    </button>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className={styles.empty}>{children}</div>;
}

/** Shown while the page works out whether a session is already open. */
export function GenerateAttaching() {
  return (
    <div className={cx(styles.shell, SHELL_CLASS, styles.attaching)}>
      <AppSpinner />
    </div>
  );
}
