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
import { acceptProposal, closeSession, takeTurn } from '../studio/sessionApi';

import { Approved } from './Approved';
import { BriefSheet } from './BriefSheet';
import { GenerateCanvas } from './GenerateCanvas';
import { RunMeter } from './RunMeter';
import { SessionChat } from './SessionChat';
import { MockupChip, MockupPopup } from './MockupPicker';
import { ThemeChip } from './ThemeChip';
import { ThemePopup } from './ThemePopup';
import { phaseClass, SHELL_CLASS } from './phaseClass';
import styles from './GenerateView.module.css';

/** Which pane the canvas is showing. */
type Pane = 'mockup' | 'inspect' | 'brief';

interface GenerateViewProps {
  readonly sessionId: string;
  readonly designName: string;
  /** Where to go once the design is approved. */
  readonly onDone: () => void;
}

/**
 * Watch one session.
 *
 * **Mounted under a `key={sessionId}`** by the caller, so a new design starts
 * with an empty accumulator rather than needing state reset from an effect.
 */
export function GenerateView({ sessionId, designName, onDone }: GenerateViewProps) {
  const { records } = useSessionStream(sessionId);
  const [pane, setPane] = useState<Pane>('mockup');
  const [library, setLibrary] = useState(false);
  const [mockups, setMockups] = useState(false);
  // The MOCKUP axis, independent of the theme. It follows a layout generation
  // when one appears, because that is the thing the agent just made — but a
  // person can switch away and the generation stays put.
  const [appId, setAppId] = useState(MOCK_APPS[0]!.id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const view = foldSession(records);
  // A generation the agent produced wins until someone picks otherwise; the
  // fallback keeps a deleted folder from blanking the canvas.
  const app =
    findMockApp(appId) ?? findMockApp(view.designId) ?? MOCK_APPS[0]!;

  // WHEN A RUN STARTS, SWITCH TO WHAT IT IS MAKING. Otherwise the phone sits
  // on whatever theme was loaded before and the run appears to do nothing —
  // the partial `output.yaml` writes exist precisely so this repaints level by
  // level, and it can only do that if the runtime is pointed at the new design.
  //
  // Re-attempted whenever the transcript grows, because the design is not in
  // the catalogue until the first partial write lands: the first call after
  // launch resolves false, a later one succeeds. `selectDesign` resolves
  // rather than throwing, so a miss costs nothing.
  const themeId = view.themeId;
  useEffect(() => {
    if (themeId === null) return;
    void selectDesign(themeId);
  }, [themeId, records.length]);

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
    act(() =>
      acceptProposal(
        sessionId,
        proposal.kind === 'brief'
          ? { brief: proposal.brief }
          : { layout: proposal.brief },
      ),
    );
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
            <ThemeChip onOpen={() => setLibrary(true)} />
            <span className={styles.push} />
            <RunMeter runId={view.runId} />
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
