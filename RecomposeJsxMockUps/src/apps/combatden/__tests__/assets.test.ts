// What combatden's two assets actually are. These live here rather than in
// ../../../kit/__tests__ because they assert facts about THIS app, and the kit
// may not import an app (eslint Gate 1).

import { describe, expect, it } from 'vitest';

import { aspectRatio } from '../../../kit/asset';
import { findMockAsset, mockAssetOrFirst } from '../../../kit/registry';
import { COMBATDEN_APP } from '..';
import { APP_ASSET } from '../appAsset';
import { CELEBRATION_ASSET } from '../celebrationAsset';

describe('the combatden assets', () => {
  it('ships exactly two, app first', () => {
    // Two is the claim the split rests on: everything tap-reachable is one
    // asset, and the post-class flow is the only thing that is not. A third
    // appearing here means something reachable got split out.
    expect(COMBATDEN_APP.assets.map((a) => a.id)).toEqual(['app', 'celebration']);
    expect(mockAssetOrFirst(COMBATDEN_APP, null)).toBe(APP_ASSET);
    expect(findMockAsset(COMBATDEN_APP, 'celebration')).toBe(CELEBRATION_ASSET);
  });

  it('runs the celebration in the member app\u2019s order, wins last', () => {
    // app.yaml records this order in rank_belt's own description ("the 2nd of
    // five post-class cards (Streak, Rank, Points, Rewards, Wins)") and in
    // trophy_image's ("the 5th and final card").
    expect(Object.keys(CELEBRATION_ASSET.routes)).toEqual([
      'streak',
      'rank',
      'points',
      'rewards',
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
    // scale differently for no reason a reviewer could see.
    for (const asset of COMBATDEN_APP.assets) {
      expect([asset.width, asset.height]).toEqual([390, 844]);
      expect(aspectRatio(asset)).toBeCloseTo(390 / 844);
    }
  });
});
