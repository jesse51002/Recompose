// The Generate page: watch a design get made. The customer's view.
//
// Two panes. The transcript on the left never resets between phases — the
// brand interview, the asset run, the layout interview and the layout agent
// all land in one column, because they are one design and four views of it
// would be four things to reconcile. The canvas on the right carries a bar
// (what to look at, which theme, how the run is going) over one of three
// panes: the mock, the artifact sheet, or the brief.
//
// EVERYTHING RENDERED IS A PURE FUNCTION OF THE RECORD LIST. The session
// stream replays from index 0 on every connect, so a reload mid-run costs
// nothing — the property the server-held session exists for, and the one
// easiest to lose here by keeping state the records already carry.

import { useEffect, useState } from 'react';
import { MOCK_APPS, findMockApp } from 'recompose-jsx-mockups';
import { selectDesign } from 'recompose-react';

import { cx } from '../widgets/cx';
import { AppSpinner } from '../widgets/AppSpinner';
import { InspectView } from '../inspect/InspectView';
import { foldSession } from '../studio/sessionFold';
import { useSessionStream } from '../studio/useSessionStream';
import {
  acceptProposal,
  closeSession,
  startLayout,
  stopLayout,
  takeTurn,
} from '../studio/sessionApi';

import { Approved } from './Approved';
import { BriefSheet } from './BriefSheet';
import { GenerateCanvas } from './GenerateCanvas';
import { RunMeter } from './RunMeter';
import { SpendMeter } from './SpendMeter';
import { SessionChat } from './SessionChat';
import { MockupChip, MockupPopup } from './MockupPicker';
import { ThemeChip } from './ThemeChip';
import { ThemePopup } from './ThemePopup';
import { phaseClass, SHELL_CLASS } from './phaseClass';
import styles from './GenerateView.module.css';

/**
 * How often to re-try loading a run's design while it does not exist yet. The
 * first partial write lands within the first level, so this is seconds of
 * polling, not minutes.
 */
const RETRY_MS = 2000;

/** Which pane the canvas is showing. */
type Pane = 'mockup' | 'inspect' | 'brief';

interface GenerateViewProps {
  readonly sessionId: string;
  /** Where to go once the design is approved. */
  readonly onDone: () => void;
}

/**
 * Watch one session.
 *
 * **Mounted under a `key={sessionId}`** by the caller, so a new design starts
 * with an empty accumulator rather than needing state reset from an effect.
 */
export function GenerateView({ sessionId, onDone }: GenerateViewProps) {
  const { records } = useSessionStream(sessionId);

  // The pane a person picked, and which proposal they picked it against.
  const [picked, setPicked] = useState<{ at: number; pane: Pane } | null>(null);
  const [library, setLibrary] = useState(false);
  const [mockups, setMockups] = useState(false);
  // The MOCKUP axis, independent of the theme. It follows a layout generation
  // when one appears, because that is the thing the agent just made — but a
  // person can switch away and the generation stays put.
  const [appId, setAppId] = useState(MOCK_APPS[0]!.id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const view = foldSession(records);
  // THE DESIGN'S NAME COMES FROM ITS BRIEF, not from a form in front of the
  // page. Until the interview produces one there is nothing to call this but
  // what it is.
  const designName = view.designName ?? 'this design';
  // A generation the agent produced wins until someone picks otherwise; the
  // fallback keeps a deleted folder from blanking the canvas.
  const app =
    findMockApp(appId) ?? findMockApp(view.designId) ?? MOCK_APPS[0]!;

  // WHEN A RUN STARTS, LOAD WHAT IT IS MAKING — and keep trying until it takes.
  //
  // Two things fought this. The design is not in the catalogue until the first
  // partial `output.yaml` lands, so the call right after launch resolves false;
  // and a theme picked by hand is STICKY (the store persists the selection and
  // prefers it on boot), so without an explicit override the run would generate
  // into a design nobody was looking at. The generated theme wins.
  //
  // It polls rather than firing once, because "the run has started" and "the
  // design exists" are seconds apart and nothing announces the second. It stops
  // on the first success, so a person can switch away afterwards and stay
  // switched — the override is for the moment the run begins, not a lock.
  const themeId = view.themeId;
  useEffect(() => {
    if (themeId === null) return;
    let stopped = false;
    let timer: number | undefined;
    const attempt = (): void => {
      if (stopped) return;
      void selectDesign(themeId).then((ok) => {
        if (stopped || ok) return;
        timer = window.setTimeout(attempt, RETRY_MS);
      });
    };
    attempt();
    return () => {
      stopped = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [themeId]);

  // A PROPOSAL OPENS ITSELF. The agent writes a document — five fields of
  // prose for the brand half — and the transcript card is only a notice that
  // one exists. Leaving it to be clicked put the thing you are being asked to
  // approve one interaction away from the button approving it. It is also why
  // Accept is the card's primary action and "Open the brief" its secondary:
  // by the time you read the card you are already looking at the document.
  //
  // DERIVED, not pushed from an effect. Setting state in an effect is an error
  // in this package (`set-state-in-effect`), and the derivation is better
  // anyway: what is stored is the pane a PERSON chose and the proposal it was
  // chosen against, so a new proposal invalidates the pick and opens itself,
  // while switching to the Mockup mid-proposal is not yanked back on the very
  // next record.
  const proposalCount = view.entries.filter(
    (entry) => entry.kind === 'brief',
  ).length;
  const pane: Pane =
    picked !== null && picked.at === proposalCount
      ? picked.pane
      : proposalCount > 0
        ? 'brief'
        : 'mockup';
  const setPane = (next: Pane): void => {
    setPicked({ at: proposalCount, pane: next });
  };

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

  const accept = (): void => {
    const proposal = view.proposal;
    if (proposal === null) return;
    // The phase that follows is long, and the thing just approved is what a
    // person should be looking at while it runs.
    setPane('brief');
    act(() => acceptProposal(sessionId, proposal));
  };

  // The approved screen takes the WHOLE surface, in the generated theme. It is
  // the tenant's last screen and the one moment the tool gets out of the way —
  // so it is not a pane inside the canvas, it replaces the page.
  if (view.settled) {
    return <Approved designName={designName} onDone={onDone} />;
  }

  return (
    <div className={cx(styles.shell, SHELL_CLASS)}>
      <div className={styles.panes}>
        <aside className={styles.chat}>
          <div className={styles.phead}>
            Conversation
            <span className={styles.push} />
            {view.phase !== null && (
              <span className={cx(styles.tag, phaseClass(view.phase))}>
                {view.phase}
              </span>
            )}
          </div>
          <SessionChat
            view={view}
            onSay={(message) => act(() => takeTurn(sessionId, message))}
            onAccept={accept}
            onOpenProposal={() => setPane('brief')}
            busy={busy}
          />
        </aside>

        <main className={styles.canvas}>
          <div className={styles.bar}>
            <div className={styles.seg}>
              <Seg now={pane} me="mockup" set={setPane} label="Mockup" />
              <Seg now={pane} me="inspect" set={setPane} label="Inspect" />
              <Seg now={pane} me="brief" set={setPane} label="Brief" />
            </div>
            <MockupChip app={app} onOpen={() => setMockups(true)} />
            <ThemeChip onOpen={() => setLibrary(true)} generatedId={themeId} />
            <span className={styles.push} />
            <SpendMeter view={view} />
            <RunMeter runId={view.runId} />
            {/* STOPPING THE LAYOUT AGENT, and only while one is running.
                It is the most expensive thing this page can start — a coding
                agent that runs for a long time and bills the whole time — and
                closing the tab does not stop it. A permanent button would
                offer to stop something that mostly is not running; this
                appears exactly when there is something to stop. */}
            {/* STARTING IT BY HAND. The agent starts itself when the assets
                settle, so this is not the normal path — it is what makes Stop
                reversible, and what recovers a start that failed. It appears
                only once there is a finished run to design against, because
                before that there is nothing for an agent to look at. */}
            {!view.layoutRunning && view.themeId !== null && (
              <button
                type="button"
                className={styles.start}
                disabled={busy}
                title={
                  view.designId === null
                    ? 'Redesign the screens for this theme.'
                    : 'Run the layout agent again on this design, continuing what is already there.'
                }
                onClick={() => act(async () => void (await startLayout(sessionId)))}
              >
                {view.designId === null ? 'Start the agent' : 'Run the agent again'}
              </button>
            )}
            {view.layoutRunning && (
              <button
                type="button"
                className={styles.stop}
                disabled={busy}
                title="Kill the layout agent. The screens keep whatever it has already written."
                onClick={() =>
                  act(async () => {
                    const stopped = await stopLayout(sessionId);
                    if (stopped === 0) setError('Nothing was running.');
                  })
                }
              >
                Stop the agent
              </button>
            )}
            <button
              type="button"
              className={styles.approve}
              disabled={busy}
              onClick={() => act(() => closeSession(sessionId))}
            >
              Approve design
            </button>
          </div>

          {error !== null && <div className={styles.error}>{error}</div>}

          <div className={styles.stage}>
            {pane === 'mockup' && <GenerateCanvas view={view} app={app} />}
            {/* The artifact sheet — every slot the run produced, filling in as
                the partial output.yaml grows. This IS the Inspect view; it is
                not a separate destination any more. */}
            {pane === 'inspect' && (
              <div className={styles.sheet}>
                <InspectView />
              </div>
            )}
            {pane === 'brief' && <BriefSheet view={view} />}
          </div>
        </main>
      </div>

      {library && <ThemePopup onClose={() => setLibrary(false)} />}
      {mockups && (
        <MockupPopup
          activeId={app.id}
          onPick={setAppId}
          onClose={() => setMockups(false)}
        />
      )}
    </div>
  );
}

function Seg({
  now,
  me,
  set,
  label,
}: {
  now: Pane;
  me: Pane;
  set: (next: Pane) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={cx(now === me && styles.segOn)}
      aria-pressed={now === me}
      onClick={() => set(me)}
    >
      {label}
    </button>
  );
}

/** Shown while the page works out whether a session is already open. */
export function GenerateAttaching() {
  return (
    <div className={cx(styles.shell, SHELL_CLASS, styles.attaching)}>
      <AppSpinner />
    </div>
  );
}
