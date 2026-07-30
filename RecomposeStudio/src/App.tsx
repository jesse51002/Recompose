// The app shell: three pages, and the runtime booted around them.
//
// Onboard (admin) hands over to Generate (the customer), which hands over to
// Fleet (admin again) once a design is approved. That is the product's shape,
// so the pages perform the handover rather than leaving a person to find the
// right tab.
//
// <ThemeProvider> is the gate that holds every page back until the runtime has
// settled. It carries NO value: every hook below reads the module-singleton
// store directly (see ../../CLAUDE.md).

import { useEffect, useState } from 'react';
import { ThemeProvider, loadFontFamily } from 'recompose-react';

import styles from './App.module.css';
import { SHELL_CLASS } from './generate/phaseClass';
import { cx } from './widgets/cx';
import { INITIAL_URL_VIEW, syncViewUrl, type AppView } from './appUrl';
import { APP_ID, SEED_DESIGN_ID } from './config';
import {
  EXPECTED_COLORS,
  EXPECTED_FONTS,
  EXPECTED_ICONS,
  EXPECTED_IMAGES,
  EXPECTED_TEXT,
} from 'recompose-jsx-mockups';
import { FleetView } from './generate/FleetView';
import { LayoutsView } from './generate/LayoutsView';
import { OnboardView } from './generate/OnboardView';
import { StudioView } from './studio/StudioView';
import { ADM } from './tokens/adminTokens';
import { TopBar } from './TopBar';
import { AppSpinner } from './widgets/AppSpinner';

// Geist is the CHROME's typeface (the CRM's `baseFont`, the landing page's
// `GW.sans`) — not a theme slot, so nothing in the runtime will fetch it. The
// same Google Fonts injection the theme's own font slots use loads it once.
// The theme's fonts are loaded separately, by `useThemeFontFamily`.
loadFontFamily(ADM.fontFamily);

export function App() {
  // The top-level view. A deep link opens straight onto it; from here on the
  // address bar follows the state (../appUrl.ts), which is what lets a demo be
  // handed over as a URL rather than a click path.
  const [view, setView] = useState<AppView>(INITIAL_URL_VIEW);

  useEffect(() => {
    syncViewUrl(view);
  }, [view]);

  return (
    <div className={cx(styles.app, SHELL_CLASS)}>
      <TopBar view={view} onChange={setView} />
      <main className={styles.main}>
        <ThemeProvider
          appId={APP_ID}
          // The design the engine boots on. A previous visit's sticky
          // selection outranks it (ThemeStore's fallback ladder), which is
          // what makes the Library's pick survive a reload.
          designId={SEED_DESIGN_ID}
          // The slot manifest the showcase screens consume — Dart passes the
          // same `ShowcaseSlots.expected*` lists into `ThemeRuntime.initialize`.
          // They are used ONLY for the store's loud missing-slot warning, which
          // is why the browser declares exactly what the phone renders and not
          // the member app's whole inventory.
          expectedColors={EXPECTED_COLORS}
          expectedImages={EXPECTED_IMAGES}
          expectedFonts={EXPECTED_FONTS}
          expectedText={EXPECTED_TEXT}
          expectedIcons={EXPECTED_ICONS}
          fallback={<CenteredSpinner />}
        >
          {/* All three pages sit inside the gate. Generate reads the theme
              directly; Onboard and Fleet read none, but they stay inside it
              rather than being special-cased out — the gate costs them one
              already-settled render, and an exception would be a second code
              path to keep true. */}
          {view === 'generate' ? (
            <StudioView onDone={() => setView('fleet')} />
          ) : view === 'fleet' ? (
            <FleetView onOpenLayouts={() => setView('layouts')} />
          ) : view === 'layouts' ? (
            <LayoutsView onBack={() => setView('fleet')} />
          ) : (
            // Onboarding hands over to the customer's view when the fork is
            // ready. That handover IS the product's shape — admin sets a
            // platform up once, tenants generate against it many times — so
            // the page performs it rather than leaving you to find a tab.
            <OnboardView onOpenCustomerView={() => setView('generate')} />
          )}
        </ThemeProvider>
      </main>
    </div>
  );
}

function CenteredSpinner() {
  return (
    <div className={styles.loading}>
      <AppSpinner size={ADM.spinnerSizeLarge} strokeWidth={2} />
    </div>
  );
}
