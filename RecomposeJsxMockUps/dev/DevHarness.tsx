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
// It renders the asset UNTHEMED — no `initializeTheme`, no API. Every `--sc-*`
// token falls back to CombatDen's bundled values (see
// `src/apps/combatden/showcaseTokens.ts`), which is the honest default: this
// harness is for judging LAYOUT and INTERACTION. Judging a generated theme is
// the studio's job, because that needs a run to point at.

import { useState } from 'react';

import { COMBATDEN_APP } from '../src/apps/combatden';
import type { MockAsset } from '../src/kit/asset';
import { MockAssetStage } from '../src/kit/MockAssetStage';

import styles from './DevHarness.module.css';

export function DevHarness() {
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
        <span className={styles.hint}>{asset.description}</span>
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
        {asset.width}&thinsp;x&thinsp;{asset.height} &middot; scaled to fit &middot; unthemed
        (bundled token fallbacks)
      </footer>
    </div>
  );
}
