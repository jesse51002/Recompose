// What Zen BJJ's two assets actually are. These live here rather than in
// ../../../kit/__tests__ because they assert facts about THIS app, and the kit
// may not import an app (eslint Gate 1).
//
// THIS IS THE REDESIGN'S EQUIVALENCE GATE, and it is the same assertions the
// base's own file makes. A redesign rearranges; it never adds or drops a
// screen, a route or an asset — so if this file ever has to differ from
// ../../combatden/__tests__/assets.test.ts by more than the app's name, the
// redesign has stopped being one.

import { describe, expect, it } from 'vitest';

import { aspectRatio } from '../../../kit/asset';
import { findMockAsset, mockAssetOrFirst } from '../../../kit/registry';
import { ZENBJJ_APP } from '..';
import { APP_ASSET } from '../appAsset';
import { CELEBRATION_ASSET } from '../celebrationAsset';

describe('the zenbjj assets', () => {
  it('ships exactly two, app first', () => {
    // Two is the claim the split rests on: everything tap-reachable is one
    // asset, and the post-class flow is the only thing that is not. A third
    // appearing here means something reachable got split out.
    expect(ZENBJJ_APP.assets.map((a) => a.id)).toEqual(['app', 'celebration']);
    expect(mockAssetOrFirst(ZENBJJ_APP, null)).toBe(APP_ASSET);
    expect(findMockAsset(ZENBJJ_APP, 'celebration')).toBe(CELEBRATION_ASSET);
  });

  it('runs the celebration in the member app’s order, wins last', () => {
    // `celebration_flow.dart`'s `celebrationCardRoutes` list order, which its
    // own test also asserts (wins last in every gym shape). app.yaml's
    // `rank_belt` description still calls rank "the 2nd of five" — the Dart is
    // the authority on what the app does, so that slot description is stale.
    expect(Object.keys(CELEBRATION_ASSET.routes)).toEqual([
      'streak',
      'points',
      'rewards',
      'rank',
      'wins',
    ]);
    expect(CELEBRATION_ASSET.initialRoute).toBe('streak');
  });

  it('opens the app on home and carries every tap-reachable screen', () => {
    expect(APP_ASSET.initialRoute).toBe('home');
    expect(Object.keys(APP_ASSET.routes).sort()).toEqual([
      'booking',
      'class',
      'home',
      'profile',
      'store',
      'video',
    ]);
  });

  it('authors both assets at the same phone size', () => {
    // They are shown in the same frame, so a mismatch would make one of them
    // scale differently for no reason a reviewer could see. The redesign keeps
    // the base's 390x844 too — a fork that re-authored at another size would
    // not be comparable to the layout it forked from.
    for (const asset of ZENBJJ_APP.assets) {
      expect([asset.width, asset.height]).toEqual([390, 844]);
      expect(aspectRatio(asset)).toBeCloseTo(390 / 844);
    }
  });
});
