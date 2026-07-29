// The dev harness: a way to LOOK at an asset while editing it.
//
// This package is a library — the studio is its real host — but a library you
// cannot run is a library you cannot design in, and these screens exist to be
// designed in. So `npm run dev` serves this: an asset switcher, a phone-shaped
// box, and nothing else.
//
// IT LIVES OUTSIDE `src/`, deliberately. It is a HOST, and hosts are exactly
// what the island rule keeps out of the screens: nothing under `src/` may
// import it, it is not exported from `src/index.ts`, and it ships in no bundle
// the studio produces. Treat it as scaffolding you are allowed to make ugly.
//
// It opens UNTHEMED — no `initializeTheme`, no API. Every `--sc-*` token falls
// back to CombatDen's bundled values (see `src/apps/combatden/showcaseTokens.ts`),
// which is the right default: the common loop is judging a layout you just
// edited, and that must not need a backend.
//
// The theme picker in the bar is opt-in for the same reason — see
// ./useHarnessTheme.ts. Click Load and it boots the runtime against
// `make api` on :8001; with the API down it says so and everything else keeps
// working.

import { useState } from 'react';

import { COMBATDEN_APP } from '../src/apps/combatden';
import type { MockAsset } from '../src/kit/asset';
import { MockAssetStage } from '../src/kit/MockAssetStage';

import styles from './DevHarness.module.css';
import { useHarnessTheme } from './useHarnessTheme';

export function DevHarness() {
  const theme = useHarnessTheme();
  const [asset, setAsset] = useState<MockAsset>(() => {
    // Deep-link by `?asset=<id>` so a reload lands back where you were —
    // rebuilding the celebration flow by hand after every edit gets old fast.
    const wanted = new URLSearchParams(window.location.search).get('asset');
    return COMBATDEN_APP.assets.find((a) => a.id === wanted) ?? COMBATDEN_APP.assets[0]!;
  });

  const select = (next: MockAsset) => {
    setAsset(next);
    const url = new URL(window.location.href);
    url.searchParams.set('asset', next.id);
    window.history.replaceState(null, '', url);
  };

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        <span className={styles.brand}>{COMBATDEN_APP.label}</span>
        <nav className={styles.tabs}>
          {COMBATDEN_APP.assets.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={candidate.id === asset.id ? styles.tabActive : styles.tab}
              onClick={() => {
                select(candidate);
              }}
            >
              {candidate.label}
            </button>
          ))}
        </nav>
        <ThemePicker theme={theme} />
      </header>

      <main className={styles.stageArea}>
        {/* `key` remounts on switch so an asset always opens on its initial
            route with fresh state, rather than resuming wherever its nav was
            left — the same reason the studio reloads its preview. */}
        <div className={styles.phone}>
          <MockAssetStage key={asset.id} asset={asset} />
        </div>
      </main>

      <footer className={styles.foot}>
        {asset.width}&thinsp;x&thinsp;{asset.height} &middot; scaled to fit &middot;{' '}
        {theme.status === 'ready' && theme.active !== null
          ? `theme: ${theme.active}`
          : 'unthemed (bundled token fallbacks)'}
        {' '}&middot; {asset.description}
      </footer>
    </div>
  );
}

/**
 * The theme switch. Off until asked — see ./useHarnessTheme.ts for why the
 * harness does not boot the runtime on load.
 */
function ThemePicker({ theme }: { theme: ReturnType<typeof useHarnessTheme> }) {
  if (theme.status === 'off') {
    return (
      <button type="button" className={styles.themeBtn} onClick={theme.load}>
        Load themes
      </button>
    );
  }
  if (theme.status === 'loading') {
    return <span className={styles.themeNote}>loading catalogue…</span>;
  }
  if (theme.status === 'failed') {
    // Say what went wrong AND how to fix it: the cause is nearly always that
    // :8001 is not up, and a bare "failed" sends people reading source.
    return (
      <span className={styles.themeNote} title={theme.error}>
        no catalogue — is <code>make api</code> running on :8001?{' '}
        <button type="button" className={styles.themeBtn} onClick={theme.load}>
          retry
        </button>
      </span>
    );
  }
  return (
    <select
      className={styles.themeSelect}
      value={theme.active ?? ''}
      onChange={(e) => {
        theme.select(e.target.value);
      }}
      aria-label="Theme"
    >
      {theme.styles.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
}
