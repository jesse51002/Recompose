// The loader: how a host discovers what an app offers without knowing the app.
//
// A MockApp is one product's assets under one id. A host lists them, picks one
// by id, and mounts it with ../kit/MockAssetStage — never importing a screen,
// a route id, or an app folder directly. That indirection is what makes a
// second app a new folder plus one registration rather than a change to the
// host.

import type { MockAsset } from './asset';

export interface MockApp {
  /** Stable id, matching the pipeline's `app.yaml` app id. */
  readonly id: string;
  readonly label: string;
  /** Every asset, in the order a host should offer them. */
  readonly assets: readonly MockAsset[];
}

/**
 * Declare an app's assets.
 *
 * Duplicate asset ids are rejected here rather than tolerated: a host looks
 * assets up BY id, so a duplicate silently makes one of them unreachable, and
 * the one that disappears depends on iteration order.
 */
export function defineMockApp(app: MockApp): MockApp {
  const seen = new Set<string>();
  for (const asset of app.assets) {
    if (seen.has(asset.id)) {
      throw new Error(`MockApp "${app.id}": duplicate asset id "${asset.id}".`);
    }
    seen.add(asset.id);
  }
  if (app.assets.length === 0) {
    throw new Error(`MockApp "${app.id}": declares no assets.`);
  }
  return app;
}

/** One asset by id, or `undefined` when the app does not declare it. */
export function findMockAsset(app: MockApp, id: string): MockAsset | undefined {
  return app.assets.find((asset) => asset.id === id);
}

/**
 * One asset by id, or the app's first.
 *
 * The forgiving lookup a host wants when the id came from somewhere it does not
 * control — a URL, a saved preference, a build that predates the asset — where
 * showing the app's primary asset beats showing nothing.
 */
export function mockAssetOrFirst(app: MockApp, id: string | null | undefined): MockAsset {
  const found = id === null || id === undefined ? undefined : findMockAsset(app, id);
  // Non-null: defineMockApp rejects an empty asset list, so index 0 exists.
  return found ?? app.assets[0]!;
}
