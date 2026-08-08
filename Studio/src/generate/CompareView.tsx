// Before and after, side by side, kept in step.
//
// **WHY EACH SIDE IS AN IFRAME, and it is not a shortcut.** The theme runtime
// is a module singleton on purpose — `recompose-react`'s own header says so —
// and the mockups lean on that deliberately: `showcaseTokens.ts` resolves
// sixty-odd colours through the NON-HOOK resolvers (`themeColor`,
// `themePaletteEntry`, `themeFontFamily`) precisely so a token module can
// resolve outside React. Those functions read the singleton and can never see
// a React context, so a `ThemeScope` provider would leave both halves showing
// one theme and give no sign of it. An iframe is a separate document, so it
// gets its own module instance and its own store — which makes two live themes
// a property of the browser rather than something this code has to maintain.
//
// **WHAT IS PER SIDE AND WHAT IS SHARED is the whole design of this page.**
// The two sides differ ONLY in theme and layout, because those are the two
// things a redesign changes. Everything else — the flow, the screen, the
// scroll offset — is one value driving both, so the only difference on screen
// is the difference being demonstrated. A comparison whose halves are on
// different screens looks exactly like a working comparison until you read it,
// which makes it worse than no comparison at all.
//
// MANUAL BY DESIGN. Nothing here triggers a generation.

import { useCallback, useEffect, useRef, useState } from 'react';
import { MOCK_APPS } from 'recompose-jsx-mockups';

import { cx } from '../widgets/cx';
import { ROUTE_MESSAGE, isRouteMessage, stageUrl } from '../stageUrl';

import { ThemeCatalog } from './ThemeCatalog';
import styles from './CompareView.module.css';

/** What one side gets to differ in. Deliberately only two things. */
interface Side {
  readonly theme: string | null;
  readonly app: string;
}

const FIRST_APP = MOCK_APPS[0]!;

/** Every flow id any app declares, in first-seen order. Shared across sides. */
const FLOWS = [
  ...new Map(
    MOCK_APPS.flatMap((app) => app.assets).map((asset) => [asset.id, asset]),
  ).values(),
];

export function CompareView() {
  // PER SIDE: the two things a redesign changes.
  const [before, setBefore] = useState<Side>({ theme: null, app: FIRST_APP.id });
  const [after, setAfter] = useState<Side>({ theme: null, app: FIRST_APP.id });

  // SHARED: everything else. One value, both frames.
  const [flow, setFlow] = useState(FLOWS[0]!.id);
  const [route, setRoute] = useState<string | null>(null);

  const beforeRef = useRef<HTMLIFrameElement>(null);
  const afterRef = useRef<HTMLIFrameElement>(null);

  useSyncedScroll(beforeRef, afterRef);
  useSyncedRoute(beforeRef, afterRef, setRoute);

  return (
    <div className={styles.page}>
      {/* THE FLOW SWITCH IS ONE CONTROL, ABOVE BOTH, and that is the point —
          it is not a property of a side, so it must not look like one. */}
      {FLOWS.length > 1 && (
        <div className={styles.flows} role="group" aria-label="Flow">
          {FLOWS.map((asset) => (
            <button
              key={asset.id}
              type="button"
              className={cx(asset.id === flow && styles.flowOn)}
              aria-pressed={asset.id === flow}
              onClick={() => setFlow(asset.id)}
            >
              {asset.label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.pair}>
        <Pane
          label="Before"
          side={before}
          onChange={setBefore}
          flow={flow}
          route={route}
          frameRef={beforeRef}
        />
        <Pane
          label="After"
          side={after}
          onChange={setAfter}
          flow={flow}
          route={route}
          frameRef={afterRef}
          accent
        />
      </div>

      <p className={styles.note}>
        Both sides show the same flow and the same screen, and scroll together —
        the only difference is the theme and the layout. The screens are rarely
        the same height, so the shorter one stops at its end while the other
        keeps going.
      </p>
    </div>
  );
}

function Pane({
  label,
  side,
  onChange,
  flow,
  route,
  frameRef,
  accent = false,
}: {
  label: string;
  side: Side;
  onChange: (next: Side) => void;
  flow: string;
  route: string | null;
  frameRef: React.RefObject<HTMLIFrameElement | null>;
  accent?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const app = MOCK_APPS.find((candidate) => candidate.id === side.app) ?? FIRST_APP;

  return (
    <section className={styles.pane}>
      <header className={styles.paneHead}>
        {/* The title is the point of the page and reads as one — a person is
            being asked which of these two they prefer. */}
        <h2 className={cx(styles.label, accent && styles.labelAccent)}>{label}</h2>
        <span className={styles.summary}>
          {side.theme ?? 'no theme'} · {app.label}
        </span>
        {/* ONE BUTTON FOR BOTH AXES. Theme and layout are the two things this
            side is allowed to differ in, and they are chosen together because
            they are chosen for the same reason — you are composing one side of
            a comparison, not setting two unrelated preferences. */}
        <button
          type="button"
          className={styles.edit}
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      </header>

      <div className={styles.frameWrap}>
        <iframe
          ref={frameRef}
          className={styles.frame}
          title={`${label}: ${app.label}`}
          // KEYED ON EVERYTHING THE URL CARRIES EXCEPT THE ROUTE. A stage reads
          // its parameters once, at module scope, so a theme or layout change
          // has to reload the document — but the route is messaged in and out
          // live, and re-keying on it would throw the document away on every
          // tap and lose the scroll position with it.
          key={`${side.theme ?? 'none'}-${side.app}-${flow}`}
          // THE ROUTE IS NOT IN HERE. React writes `src` whenever the prop
          // changes, and writing `src` NAVIGATES the iframe — so carrying the
          // route in the URL reloaded both documents on every tap, which is
          // the flash. The current screen is posted in on load instead.
          src={stageUrl({
            theme: side.theme,
            app: side.app,
            asset: flow,
            route: null,
          })}
          onLoad={(event) => {
            if (route === null) return;
            event.currentTarget.contentWindow?.postMessage(
              { type: ROUTE_MESSAGE, route },
              window.location.origin,
            );
          }}
        />
      </div>

      {editing && (
        <EditSide
          label={label}
          side={side}
          onChange={onChange}
          onClose={() => setEditing(false)}
        />
      )}
    </section>
  );
}

/**
 * The sheet behind Edit: this side's theme and layout, in ONE place.
 *
 * It used to open the catalogue as a second dialog on top of itself — two
 * scrims, two closes, and the thing you were editing hidden behind the thing
 * editing it. The list is inline now, and picking a theme applies it and closes,
 * because picking IS the decision and a confirm after it buys nothing.
 */
function EditSide({
  label,
  side,
  onChange,
  onClose,
}: {
  label: string;
  side: Side;
  onChange: (next: Side) => void;
  onClose: () => void;
}) {
  return (
    <div className={styles.modal} role="dialog" aria-label={`Edit ${label}`}>
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <div className={styles.sheet}>
        <header className={styles.sheetHead}>
          <b>{label}</b>
          <button
            type="button"
            className={styles.x}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <label className={styles.field}>
          <em>Layout</em>
          <select
            className={styles.fieldControl}
            value={side.app}
            onChange={(event) => {
              onChange({ ...side, app: event.target.value });
            }}
          >
            {MOCK_APPS.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.label}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.field}>
          <em>Theme</em>
          <ThemeCatalog
            activeId={side.theme}
            onPick={(id) => {
              // The catalogue reports "no theme" as an empty id; a side stores
              // null, because null is the absence of a runtime rather than a
              // design whose name happens to be blank.
              onChange({ ...side, theme: id === '' ? null : id });
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Relays one side's navigation to the other.
 *
 * A stage posts up when it moves and accepts a post telling it to move, so the
 * relay is this hook and nothing else: take the message, hand it to whichever
 * frame did not send it, and remember it so a frame that reloads (a theme or
 * layout change) comes back on the screen everyone else is on.
 *
 * Guarded on the SOURCE rather than on a flag, which is what stops the relay
 * echoing: a frame is never sent a route it just reported.
 */
function useSyncedRoute(
  a: React.RefObject<HTMLIFrameElement | null>,
  b: React.RefObject<HTMLIFrameElement | null>,
  remember: (route: string) => void,
): void {
  useEffect(() => {
    const onMessage = (event: MessageEvent): void => {
      if (event.origin !== window.location.origin) return;
      if (!isRouteMessage(event.data)) return;
      remember(event.data.route);
      for (const frame of [a.current, b.current]) {
        if (frame === null) continue;
        // The sender already IS on this route; telling it again would remount
        // the screen under the finger that just tapped it.
        if (frame.contentWindow === event.source) continue;
        frame.contentWindow?.postMessage(
          { type: ROUTE_MESSAGE, route: event.data.route },
          window.location.origin,
        );
      }
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [a, b, remember]);
}

/**
 * Keeps the two phones scrolled to the same offset.
 *
 * **Pixels, not percentages.** The two screens are rarely the same height, so a
 * proportional sync would mean one gesture showed you different parts of each
 * design — which is the one thing a comparison must not do. Matching raw
 * `scrollTop` means the shorter side simply reaches its end and stops, which is
 * what a person expects and what the note on the page says.
 *
 * The scroll container is found by SEARCHING for it rather than by class name:
 * the mockups are an island this package must not reach into, and their scroller
 * is a CSS-module class whose real name is a hash. Anything that is taller than
 * itself and scrolls is the thing.
 *
 * `echo` is what stops the two sides driving each other forever — writing
 * `scrollTop` fires a scroll event, which would write back.
 */
function useSyncedScroll(
  a: React.RefObject<HTMLIFrameElement | null>,
  b: React.RefObject<HTMLIFrameElement | null>,
): void {
  const echo = useRef(false);

  const findScroller = useCallback((frame: HTMLIFrameElement): Element | null => {
    const doc = frame.contentDocument;
    if (doc === null) return null;
    // THE ONE WITH THE MOST TO SCROLL, not the first one found. Taking the
    // first meant a different app could hand back some minor inner scroller
    // instead of the screen body, and the two sides would then be syncing two
    // different things — which reads as "scroll desynced after switching the
    // layout" rather than as a wrong element.
    let best: Element | null = null;
    let most = 0;
    for (const element of doc.querySelectorAll('*')) {
      const room = element.scrollHeight - element.clientHeight;
      if (room <= 4 || room <= most) continue;
      const overflow = doc.defaultView?.getComputedStyle(element).overflowY ?? '';
      if (overflow !== 'auto' && overflow !== 'scroll') continue;
      best = element;
      most = room;
    }
    return best;
  }, []);

  useEffect(() => {
    // WHAT IS CURRENTLY WIRED UP. Re-keying an iframe (a theme or layout
    // change) makes React throw the element away and mount a NEW one, so
    // anything holding the old element is holding a corpse. The previous
    // version captured both frames once and never looked again, which is why
    // the sync died the first time a layout changed and never came back —
    // switching back did not help, because the elements it was listening to
    // had been discarded too.
    let wired: (Element | null)[] = [];
    const cleanups: (() => void)[] = [];

    const wire = (): void => {
      // The cheap guard first: if both scrollers are still in their document
      // and still have room to move, nothing has changed and the full scan is
      // not worth doing. Only a reload or an in-phone navigation trips this.
      const stillGood =
        wired.length === 2 &&
        wired.every(
          (element) =>
            element !== null &&
            element.isConnected &&
            element.scrollHeight > element.clientHeight,
        );
      if (stillGood) return;

      // Read the refs NOW rather than trusting a captured value.
      const frames = [a.current, b.current];
      const scrollers = frames.map((frame) =>
        frame === null ? null : findScroller(frame),
      );
      if (
        scrollers.length === wired.length &&
        scrollers.every((element, index) => element === wired[index])
      ) {
        return;
      }

      for (const cleanup of cleanups.splice(0)) cleanup();
      wired = scrollers;

      scrollers.forEach((source, index) => {
        if (source === null) return;
        const onScroll = (): void => {
          if (echo.current) return;
          echo.current = true;
          for (const [otherIndex, target] of scrollers.entries()) {
            if (otherIndex === index || target === null) continue;
            target.scrollTop = source.scrollTop;
          }
          // Released on the next frame rather than immediately: the write above
          // queues a scroll event on the other side, and clearing the guard
          // synchronously would let that event bounce straight back.
          requestAnimationFrame(() => {
            echo.current = false;
          });
        };
        source.addEventListener('scroll', onScroll, { passive: true });
        cleanups.push(() => {
          source.removeEventListener('scroll', onScroll);
        });
      });
    };

    wire();
    // Polling rather than load events and observers across two documents: the
    // guard above makes the common tick a two-property check, and this recovers
    // from every cause at once — a reload, an in-phone navigation that replaces
    // the scrolling element, a frame that had not rendered yet.
    const poll = window.setInterval(wire, 500);

    return () => {
      window.clearInterval(poll);
      for (const cleanup of cleanups.splice(0)) cleanup();
    };
  }, [a, b, findScroller]);
}
