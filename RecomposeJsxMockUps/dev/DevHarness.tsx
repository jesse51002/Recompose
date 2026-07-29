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

import { MOCK_APPS } from '../src/apps';
import type { MockAsset } from '../src/kit/asset';
import { MockAssetStage } from '../src/kit/MockAssetStage';
import type { MockApp } from '../src/kit/registry';
import { mockAssetOrFirst } from '../src/kit/registry';

import styles from './DevHarness.module.css';
import { useHarnessTheme } from './useHarnessTheme';

/** `?app=` / `?asset=`, resolved against the registry rather than trusted. */
function initialSelection(): { app: MockApp; asset: MockAsset } {
  const params = new URLSearchParams(window.location.search);
  const wantedApp = params.get('app');
  // `?? MOCK_APPS[0]` and `mockAssetOrFirst`: both ids come from a URL, which
  // is somewhere the harness does not control — a stale bookmark or a deleted
  // asset should open the first app rather than a blank frame.
  const app = MOCK_APPS.find((candidate) => candidate.id === wantedApp) ?? MOCK_APPS[0]!;
  return { app, asset: mockAssetOrFirst(app, params.get('asset')) };
}

export function DevHarness() {
  const theme = useHarnessTheme();
  const [{ app, asset }, setSelection] = useState(initialSelection);

  const select = (nextApp: MockApp, nextAsset: MockAsset) => {
    setSelection({ app: nextApp, asset: nextAsset });
    const url = new URL(window.location.href);
    url.searchParams.set('app', nextApp.id);
    url.searchParams.set('asset', nextAsset.id);
    window.history.replaceState(null, '', url);
  };

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        {/* The APP switcher. It exists to prove the harness is a host and not
            CombatDen's harness: it lists whatever `src/apps/index.ts` exports
            and never names an app, so adding a third one changes no file
            here. Switching app also switches to that app's first asset —
            asset ids are per-app, so carrying one across would be meaningless. */}
        <nav className={styles.tabs}>
          {MOCK_APPS.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={candidate.id === app.id ? styles.appActive : styles.app}
              onClick={() => {
                select(candidate, candidate.assets[0]!);
              }}
            >
              {candidate.label}
            </button>
          ))}
        </nav>
        <nav className={styles.tabs}>
          {app.assets.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={candidate.id === asset.id ? styles.tabActive : styles.tab}
              onClick={() => {
                select(app, candidate);
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
        {/* The frame follows the ASSET's ratio rather than pinning 390/844.
            Two apps at two device sizes is the point of the second app, and a
            hardcoded frame would letterbox one of them and read as the stage
            getting the scale wrong. */}
        <div
          className={styles.phone}
          style={{ aspectRatio: `${String(asset.width)} / ${String(asset.height)}` }}
        >
          <MockAssetStage key={`${app.id}:${asset.id}`} asset={asset} />
        </div>
      </main>

      <footer className={styles.foot}>
        {app.label} &middot; {asset.width}&thinsp;x&thinsp;{asset.height} &middot; scaled to
        fit &middot;{' '}
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
