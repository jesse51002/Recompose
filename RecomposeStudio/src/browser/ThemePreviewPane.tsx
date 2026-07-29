// The left pane: a large phone showing one INTERACTIVE mock asset, re-themed
// live, with a chip per asset beneath it.
//
// WHAT CHANGED, AND WHY THE OLD SHAPE IS GONE. This used to be a slideshow:
// `SHOWCASE_SCREENS` behind prev/next arrows, one still at a time, animated
// between. The mockups package no longer ships stills — it ships ASSETS, each
// one a set of screens you reach by tapping something inside the phone (the
// bottom nav switches tab, a schedule row opens a class, its reserve action
// books it). Chrome outside the phone that changes what is on it is exactly
// what that work replaced, so the arrows and the slide transition went with
// the stills rather than being ported onto something they no longer describe.
//
// The chips that remain are a different thing: they pick which ASSET is
// mounted, and there are only two (the app, and the post-class celebration the
// app has no route to). That is a genuine choice a reviewer has to make, not a
// substitute for navigation.
//
// WHAT IS DELIBERATELY NOT PORTED — the two admin-only actions under the mock.
// `SetAppThemeButton` persists the previewed theme as a gym's app branding and
// the "Edit gym name / logo" button opens `GymProfileDialog`; both are guarded
// in Dart by `selectedGym.gymId != null`, and this browser is the public,
// unauthenticated surface where that is ALWAYS null. There is no gym, no
// Supabase session and no write endpoint here, so neither button has anything
// to do.

import { useMemo } from 'react';
import type { ReactNode } from 'react';

import {
  AppContentProvider,
  COMBATDEN_APP,
  MockAssetStage,
  type MockAsset,
} from 'recompose-jsx-mockups';

import { cx } from '../widgets/cx';
import { PhoneFrame } from '../widgets/PhoneFrame';

import { useSelectedStyle } from './selectedStyle';

import styles from './ThemePreviewPane.module.css';

interface ThemePreviewPaneProps {
  /** Which asset is mounted. Defaults to the app. */
  readonly assetId?: string;
  readonly onSelectAsset?: (assetId: string) => void;
}

export function ThemePreviewPane({ assetId, onSelectAsset }: ThemePreviewPaneProps = {}) {
  // The picked style's category selects which bundled demo content the phone
  // shows, so a Yoga theme previews yoga classes rather than boxing. It lives
  // out here because the mockups island may not import from `browser/`
  // (lint Gate 2a) — the seam is the `category` value, threaded below.
  const { category } = useSelectedStyle();

  const assets = COMBATDEN_APP.assets;
  const asset = assets.find((candidate) => candidate.id === assetId) ?? assets[0]!;

  // THE CATEGORY SEAM, and the one subtle thing in this file.
  //
  // `MockAssetStage` renders `asset.provider` itself, with children and
  // nothing else — so the asset's own `AppContentProvider` would mount with
  // `category` defaulted to null and the phone would show the default content
  // group under every theme. Wrapping the stage from out here does not help:
  // the asset's inner provider is nested deeper and wins.
  //
  // So the category is bound INTO the asset. `MockAsset` is plain data and
  // `provider` is one of its fields, which makes substituting it the host's
  // prerogative rather than a reach into the island — and `AppContentProvider`
  // is part of the package's public surface, so nothing private is touched.
  //
  // Memoised on the category because a fresh component identity every render
  // would remount the whole asset and throw away wherever the reviewer had
  // navigated to.
  const themed = useMemo<MockAsset>(
    () => ({
      ...asset,
      provider: ({ children }: { children: ReactNode }) => (
        <AppContentProvider category={category}>{children}</AppContentProvider>
      ),
    }),
    [asset, category],
  );

  return (
    <div className={styles.pane}>
      <div className={styles.phoneWrap}>
        <PhoneFrame>
          <div className={styles.stage}>
            <MockAssetStage
              // Keyed on the ASSET only, deliberately not on the active design.
              // Switching asset is a different thing to look at and should
              // start at its opening route; switching THEME is the same thing
              // repainted, and remounting there would bounce the reviewer back
              // to home every time they tried a style.
              key={asset.id}
              asset={themed}
              // The frame already scales its whole body to fit (see
              // ../widgets/PhoneFrame.tsx). Scaling here too would compound
              // into a doubly-shrunk screen.
              fit="none"
            />
          </div>
        </PhoneFrame>
      </div>

      {assets.length > 1 && (
        <div className={styles.controls}>
          <div className={styles.chips}>
            {assets.map((candidate) => (
              <button
                key={candidate.id}
                type="button"
                className={cx(styles.chip, candidate.id === asset.id && styles.chipActive)}
                aria-pressed={candidate.id === asset.id}
                title={candidate.description}
                onClick={() => onSelectAsset?.(candidate.id)}
              >
                {candidate.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
