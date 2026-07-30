// ONE PHONE, AND NOTHING ELSE. The document a comparison loads per side.
//
// It has no chrome and no nav: what it shows comes off the URL
// (`../stageUrl.ts`), because it is loaded in an iframe rather than mounted as
// a component. `CompareView` explains why that has to be so.
//
// **The one thing it does own is its screen, and it does not own it alone.** A
// stage reports every move to its parent and accepts a move from it, so the two
// halves of a comparison walk the app together. Navigating one side and leaving
// the other behind would silently turn a comparison into two unrelated screens
// — which looks exactly like a working comparison until you read the content.
//
// Beyond that it stays dumb. Any control it grew could drift the two sides
// apart in a way the parent cannot see.

import { useEffect, useState } from 'react';
import { ThemeProvider } from 'recompose-react';
import { MOCK_APPS, MockAssetStage, findMockApp } from 'recompose-jsx-mockups';

import { APP_ID } from '../config';
import { PhoneFrame } from '../widgets/PhoneFrame';
import { ROUTE_MESSAGE, isRouteMessage, stageParamsFromUrl } from '../stageUrl';

import styles from './StageView.module.css';

const PARAMS = stageParamsFromUrl();

export function StageView() {
  // Falls back rather than failing: a stage pointed at an app that no longer
  // exists should draw SOMETHING, because the alternative is one empty half of
  // a comparison and no clue why.
  const app = findMockApp(PARAMS.app) ?? MOCK_APPS[0]!;
  const asset =
    app.assets.find((candidate) => candidate.id === PARAMS.asset) ?? app.assets[0]!;

  // The screen this stage is on. Seeded from the URL, then driven by whichever
  // side the person is actually touching.
  const [route, setRoute] = useState<string | null>(PARAMS.route);

  useEffect(() => {
    const onMessage = (event: MessageEvent): void => {
      // Same origin only. A stage takes navigation instructions, so anything
      // else on the page being able to send them is not worth the convenience.
      if (event.origin !== window.location.origin) return;
      if (!isRouteMessage(event.data)) return;
      setRoute(event.data.route);
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  const phone = (
    <div className={styles.stage}>
      <PhoneFrame>
        <div className={styles.screen}>
          <MockAssetStage
            // Re-keyed on the route because `initialRoute` is read at mount:
            // the kit has no imperative "go here", and a comparison changing
            // screens is rare enough that a remount is the honest cost.
            key={`${asset.id}-${route ?? 'initial'}`}
            asset={asset}
            initialRoute={route ?? undefined}
            onRouteChange={(next) => {
              setRoute(next);
              // Tell the parent, which tells the other side. Guarded on being
              // framed at all, so a stage opened on its own to debug one half
              // does not throw on every tap.
              if (window.parent !== window) {
                window.parent.postMessage(
                  { type: ROUTE_MESSAGE, route: next },
                  window.location.origin,
                );
              }
            }}
            // PhoneFrame already scales its body to 390x844.
            fit="none"
          />
        </div>
      </PhoneFrame>
    </div>
  );

  // NO THEME IS A REAL ANSWER, and it is the absence of a runtime rather than a
  // runtime holding nothing: with no store registered every resolver returns
  // its caller's own fallback, which IS the app before a design is applied. It
  // is also the most useful "before" a comparison can have.
  if (PARAMS.theme === null) return phone;

  return (
    <ThemeProvider
      appId={APP_ID}
      designId={PARAMS.theme}
      // NOT STICKY. A stage is told what to show. Left sticky, both sides of a
      // comparison would boot into whichever design the visitor last picked in
      // the studio, and each would overwrite the other's stored selection as it
      // loaded — so the page would show one theme twice and give no sign why.
      sticky={false}
    >
      {phone}
    </ThemeProvider>
  );
}
