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
import { CompareView } from './CompareView';
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
 * How often the canvas re-reads the theme WHILE THE RUN IS GOING.
 *
 * Not a retry interval — a refresh interval. `output.yaml` is rewritten after
 * every level of the DAG, so the design in the catalogue keeps growing for the
 * whole run: a palette, then type, then copy, then eighteen images arriving one
 * at a time. `selectDesign` fetches once and caches, and nothing in the runtime
 * re-fetches on its own, so this loop is the only thing that makes the phone
 * repaint mid-run at all. Stopping at the first success — which is what it used
 * to do — froze the canvas on whichever level happened to have landed first.
 *
 * Two seconds against a loopback read of one YAML file, for the few minutes a
 * run lasts. It stops the moment the run settles.
 */
const REFRESH_MS = 2000;

/**
 * Which pane the canvas is showing.
 *
 * `compare` is a pane rather than a page of its own: it is the SAME design
 * being looked at, next to another one, so it belongs beside the mock and the
 * artifacts rather than in the nav as a fourth peer.
 */
type Pane = 'mockup' | 'compare' | 'inspect' | 'brief';

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
  const [picked, setPicked] = useState<{ at: string; pane: Pane } | null>(null);
  const [library, setLibrary] = useState(false);
  // WHETHER THE PERSON HAS TAKEN THE WHEEL. The refresh loop below re-selects
  // the generated theme every couple of seconds so the canvas repaints as the
  // run produces it — which would also undo any choice made while the run is
  // going, yanking someone back two seconds after they cleared the theme or
  // picked another. This is the one bit of state that tells the two apart.
  const [chosen, setChosen] = useState(false);
  const [mockups, setMockups] = useState(false);
  // The MOCKUP axis, independent of the theme. It follows a layout generation
  // when one appears, because that is the thing the agent just made — but a
  // person can switch away and the generation stays put.
  const [appId, setAppId] = useState(MOCK_APPS[0]!.id);
  // WHICH FLOW of that app. An app is more than one — the app itself and the
  // post-class celebration — and the canvas only ever drew the first.
  //
  // KEPT ACROSS A MOCKUP SWITCH, exactly like the route below and for the same
  // reason: comparing two designs means flipping between them on the same
  // screen, and the celebration screen is not the same screen as the app's.
  // Resetting the flow on every switch sent you back to the app flow and made
  // the celebration impossible to compare at all. Asset ids are shared across
  // apps (`app`, `celebration`) the way route ids are, and the canvas falls
  // back to the first asset for an id an app does not declare, so carrying one
  // into an unrelated app degrades rather than breaks. Null means "its first".
  const [assetId, setAssetId] = useState<string | null>(null);
  // The screen being looked at, remembered ACROSS mockup switches — comparing
  // two designs means flipping between them on the same screen. The kit falls
  // back to an asset's own root when it does not declare the route, so this
  // is safe to carry into an unrelated app.
  const [route, setRoute] = useState<string | null>(null);
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

  // WHEN A RUN STARTS, LOAD WHAT IT IS MAKING — and keep re-loading it until
  // the run is over.
  //
  // Three things fought this. The design is not in the catalogue until the
  // first partial `output.yaml` lands, so the call right after launch resolves
  // false; a theme picked by hand is STICKY (the store persists the selection
  // and prefers it on boot), so without an explicit override the run would
  // generate into a design nobody was looking at; and `selectDesign` fetches
  // exactly once, with nothing in the runtime re-fetching after it.
  //
  // That last one is why this loop does not stop at the first success. The
  // design GROWS for the whole run — a palette, then type, then copy, then the
  // images one at a time — so a single successful fetch pinned the canvas to
  // whatever had landed in the first few seconds and left it there. It now
  // refreshes until the run settles, which is what makes the phone repaint
  // live rather than only on reload.
  const themeId = view.themeId;
  const assetsRunning = view.assetsRunning;
  useEffect(() => {
    if (themeId === null || chosen) return;
    let stopped = false;
    // Serialised rather than an interval: a slow fetch must not stack up
    // another behind it, and each tick is scheduled only after the last lands.
    let timer: number | undefined;
    const tick = (): void => {
      if (stopped) return;
      void selectDesign(themeId).then((ok) => {
        // The one instrument on this loop, and it is here because the loop is
        // the only thing making the canvas repaint mid-run: if the phone looks
        // frozen, this line says whether the fetch is not happening, not
        // landing, or landing on a theme that has not grown. `selectDesign`
        // swallows every failure by design (it must never break a live view),
        // so without this a 404, a 422 against a partial, and a successful
        // no-op all look identical from out here.
        console.debug(
          `[studio] theme refresh ${themeId}: ${ok ? 'adopted' : 'not yet'}`,
          { assetsRunning },
        );
        if (stopped) return;
        // Once the run is done the theme is final, so one successful fetch
        // after it settles is the last one needed.
        if (ok && !assetsRunning) return;
        timer = window.setTimeout(tick, REFRESH_MS);
      });
    };
    tick();
    return () => {
      stopped = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [themeId, assetsRunning, chosen]);

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
  // AND THE RUN STARTING OPENS THE MOCKUP, for the same reason in reverse.
  // Accepting a brief pins the brief — it is the thing just approved and the
  // right thing to read while the run spins up — but the moment the theme
  // exists, the interesting surface is the phone repainting into it. Leaving
  // the reviewer on a static document while the one live thing on the page
  // happens behind a tab is the whole demo missed.
  //
  // Both are DERIVED, not pushed from an effect (`set-state-in-effect` is an
  // error in this package). What is stored is the pane a PERSON chose and the
  // MILESTONE it was chosen against, so each new milestone re-opens its own
  // pane while a mid-milestone switch is not yanked back on the next record.
  const proposalCount = view.entries.filter(
    (entry) => entry.kind === 'brief',
  ).length;
  const milestone =
    themeId !== null ? `theme:${themeId}` : `brief:${String(proposalCount)}`;
  const autoPane: Pane =
    themeId !== null ? 'mockup' : proposalCount > 0 ? 'brief' : 'mockup';
  const pane: Pane =
    picked !== null && picked.at === milestone ? picked.pane : autoPane;
  const setPane = (next: Pane): void => {
    setPicked({ at: milestone, pane: next });
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

  // A SETTLED SESSION IS NOT NECESSARILY AN APPROVED ONE, and conflating the
  // two is why a design announced itself approved with nobody having pressed
  // anything. A session is settled by a person approving it — except when the
  // studio's process restarted while the design was in flight, in which case
  // the stream yields a synthetic settled record carrying an error so the
  // client stops reconnecting to a dead session. That crash marker was being
  // rendered as the approval celebration.
  //
  // Fail visible: say the session died and offer the way out, rather than
  // congratulate someone on a design nobody approved.
  if (view.settled && view.settledError !== null) {
    return <SessionLost error={view.settledError} onDone={onDone} />;
  }

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
            onStartLayout={() =>
              act(async () => void (await startLayout(sessionId)))
            }
            onStopLayout={() =>
              act(async () => {
                const stopped = await stopLayout(sessionId);
                if (stopped === 0) setError('Nothing was running.');
              })
            }
            busy={busy}
          />
        </aside>

        <main className={styles.canvas}>
          <div className={styles.bar}>
            <div className={styles.seg}>
              <Seg now={pane} me="mockup" set={setPane} label="Mockup" />
              <Seg now={pane} me="compare" set={setPane} label="Before / after" />
              <Seg now={pane} me="inspect" set={setPane} label="Inspect" />
              <Seg now={pane} me="brief" set={setPane} label="Brief" />
            </div>
            <MockupChip app={app} onOpen={() => setMockups(true)} />
            <ThemeChip
              onOpen={() => setLibrary(true)}
              generatedId={themeId}
              onClear={() => setChosen(true)}
              onRevert={() => setChosen(false)}
            />
            <span className={styles.push} />
            <SpendMeter view={view} />
            <RunMeter runId={view.runId} />
            {/* The layout agent's Start and Stop USED TO SIT HERE and now live
                in the transcript column (`SessionChat`). This row is about
                what you are looking at — panes, chips, readouts — and the most
                expensive button on the page read as chrome inside it. */}
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
            {pane === 'mockup' && (
              <GenerateCanvas
                view={view}
                app={app}
                assetId={assetId ?? app.assets[0]!.id}
                onPickAsset={setAssetId}
                route={route}
                onRouteChange={setRoute}
              />
            )}
            {/* The artifact sheet — every slot the run produced, filling in as
                the partial output.yaml grows. This IS the Inspect view; it is
                not a separate destination any more. */}
            {/* Two live renders of the same app, one per theme and layout.
                Mounted here rather than as a page because it is a way of
                LOOKING at this design, which is what the pane switch selects. */}
            {pane === 'compare' && <CompareView />}
            {pane === 'inspect' && (
              <div className={styles.sheet}>
                <InspectView />
              </div>
            )}
            {pane === 'brief' && <BriefSheet view={view} />}
          </div>
        </main>
      </div>

      {library && (
        <ThemePopup
          onClose={() => setLibrary(false)}
          onPick={() => setChosen(true)}
        />
      )}
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

/**
 * A session that ended without anybody approving it.
 *
 * The one case is the studio restarting mid-design: the transcript's last line
 * is not terminal, so the stream synthesises one rather than let a client
 * reconnect forever. That is a crash and reads as one here — it used to read
 * as approval, because the page only asked WHETHER it had settled.
 */
function SessionLost({
  error,
  onDone,
}: {
  error: string;
  onDone: () => void;
}) {
  return (
    <div className={cx(styles.shell, SHELL_CLASS, styles.attaching)}>
      <div className={styles.lost}>
        <h2>This design was interrupted</h2>
        <p>{error}</p>
        <p className={styles.lostNote}>
          Nothing was approved and nothing was deployed. Whatever the run had
          already produced is still on disk under its own name.
        </p>
        <button type="button" className={styles.approve} onClick={onDone}>
          Back to the fleet
        </button>
      </div>
    </div>
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
