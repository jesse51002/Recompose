// What a mock asset IS. App-agnostic: nothing here names a screen or an app.
//
// An ASSET is one self-contained, interactive mock: a set of routes, the one it
// opens on, and a fixed size it is authored at. The app asset and the
// celebration asset are two of them.
//
// WHY MORE THAN ONE ASSET EXISTS AT ALL. The goal is one thing you click
// through, not a slideshow — so an asset holds every screen reachable by
// tapping something. A second asset is only justified when a screen genuinely
// CANNOT be reached that way: the post-class celebration plays after a member
// attends a class, and no button in the app leads to it. Splitting for any
// other reason rebuilds the slideshow this replaced.
//
// WHY A FIXED SIZE. The asset is authored at one device size and scaled
// uniformly to fit whatever box it lands in (see ./MockAssetStage.tsx). Layout
// is therefore designed once, against real device pixels, and never reflows —
// which is what makes a screenshot of it a faithful preview and what keeps a
// design agent's arrangement meaning the same thing at every zoom level.

import type { ComponentType, ReactNode } from 'react';

/** One screen inside an asset. Routes are plain ids the asset itself defines. */
export type MockRoutes = Readonly<Record<string, ComponentType>>;

/**
 * Wraps whichever route is showing, for an asset whose screens need shared
 * context — demo content, a gym identity, a flow's own state.
 *
 * It sits INSIDE the nav and OUTSIDE the route, which is the only position that
 * works: routes are rendered by the stage and cannot wrap themselves, and a
 * provider outside the nav could not react to where the member currently is.
 * Optional, because an asset whose screens are self-sufficient needs nothing.
 */
export type MockAssetProvider = ComponentType<{ children: ReactNode }>;

export interface MockAsset {
  /** Stable id — what a host stores, deep-links, or lists by. */
  readonly id: string;
  /** Short human label for a picker. */
  readonly label: string;
  /** One line on what this asset is, for a host that shows more than a name. */
  readonly description: string;
  /** Authored width in CSS px. */
  readonly width: number;
  /** Authored height in CSS px. */
  readonly height: number;
  /** Every screen this asset can show, by route id. */
  readonly routes: MockRoutes;
  /** The route it opens on. Must be a key of `routes`. */
  readonly initialRoute: string;
  /** Optional shared context for every screen — see `MockAssetProvider`. */
  readonly provider?: MockAssetProvider | undefined;
}

/**
 * Declare an asset, checking the one thing types cannot: that `initialRoute`
 * is actually a route.
 *
 * A typo there fails at render as a blank screen, which reads as a broken
 * design rather than a broken reference — so it is caught at module load, where
 * the message can say what is wrong.
 */
export function defineMockAsset(asset: MockAsset): MockAsset {
  if (!(asset.initialRoute in asset.routes)) {
    throw new Error(
      `MockAsset "${asset.id}": initialRoute "${asset.initialRoute}" is not one of ` +
        `its routes (${Object.keys(asset.routes).join(', ')}).`,
    );
  }
  if (asset.width <= 0 || asset.height <= 0) {
    throw new Error(
      `MockAsset "${asset.id}": width and height must both be positive ` +
        `(got ${String(asset.width)}x${String(asset.height)}).`,
    );
  }
  return asset;
}

/** The aspect ratio an asset holds while scaling. */
export function aspectRatio(asset: MockAsset): number {
  return asset.width / asset.height;
}
