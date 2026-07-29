// The kit's own contract, tested against LOCAL fixtures only.
//
// Nothing here imports an app — eslint Gate 1 forbids it, and the reason is the
// point of the kit: if these tests needed combatden to be meaningful, the kit
// would not be app-agnostic. The assertions about combatden's actual assets
// live next to combatden, in ../../apps/combatden/__tests__/assets.test.ts.

import { describe, expect, it } from 'vitest';

import { aspectRatio, defineMockAsset } from '../asset';
import { defineMockApp, findMockAsset, mockAssetOrFirst } from '../registry';

const SCREEN = () => null;

describe('defineMockAsset', () => {
  it('rejects an initialRoute that is not a route', () => {
    // The failure this prevents renders as a BLANK phone, which reads as a
    // broken design rather than a broken reference — so it must fail loudly at
    // definition instead of quietly at render.
    expect(() =>
      defineMockAsset({
        id: 'x',
        label: 'X',
        description: '',
        width: 390,
        height: 844,
        routes: { home: SCREEN },
        initialRoute: 'hoem',
      }),
    ).toThrow(/initialRoute "hoem" is not one of its routes/);
  });

  it('rejects a non-positive size', () => {
    expect(() =>
      defineMockAsset({
        id: 'x',
        label: 'X',
        description: '',
        width: 0,
        height: 844,
        routes: { home: SCREEN },
        initialRoute: 'home',
      }),
    ).toThrow(/must both be positive/);
  });
});

describe('defineMockApp', () => {
  it('rejects duplicate asset ids', () => {
    // A duplicate does not error on its own; it makes one asset unreachable by
    // id, and WHICH one depends on iteration order.
    const asset = defineMockAsset({
      id: 'dupe',
      label: 'A',
      description: '',
      width: 1,
      height: 1,
      routes: { a: SCREEN },
      initialRoute: 'a',
    });
    expect(() => defineMockApp({ id: 'app', label: 'App', assets: [asset, asset] })).toThrow(
      /duplicate asset id "dupe"/,
    );
  });

  it('rejects an app with no assets', () => {
    expect(() => defineMockApp({ id: 'app', label: 'App', assets: [] })).toThrow(
      /declares no assets/,
    );
  });
});

describe('lookup', () => {
  const asset = (id: string) =>
    defineMockAsset({
      id,
      label: id,
      description: '',
      width: 390,
      height: 844,
      routes: { a: SCREEN },
      initialRoute: 'a',
    });

  it('finds an asset by id and reports a miss as undefined', () => {
    const first = asset('one');
    const second = asset('two');
    const app = defineMockApp({ id: 'app', label: 'App', assets: [first, second] });
    expect(findMockAsset(app, 'two')).toBe(second);
    expect(findMockAsset(app, 'nope')).toBeUndefined();
  });

  it('falls back to the first asset for an unknown or absent id', () => {
    // The forgiving lookup a host wants when the id came from a URL or a saved
    // preference it does not control.
    const first = asset('one');
    const second = asset('two');
    const app = defineMockApp({ id: 'app', label: 'App', assets: [first, second] });
    expect(mockAssetOrFirst(app, 'nope')).toBe(first);
    expect(mockAssetOrFirst(app, null)).toBe(first);
    expect(mockAssetOrFirst(app, 'two')).toBe(second);
  });

  it('reports an asset\u2019s aspect ratio', () => {
    expect(aspectRatio(asset('one'))).toBeCloseTo(390 / 844);
  });
});
