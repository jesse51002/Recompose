// The celebration primitives (../celebrations/) and the cascade maths the
// celebration screens derive from this fork's motion clock (../shell/phrase.ts).
//
// WHAT IS PINNED HERE IS WHAT A SCREENSHOT CANNOT CATCH. Every one of these is
// a number ported by hand out of Dart, and every one of them fails silently:
//
//  1. THE CURVE SAMPLERS. Flutter's named eases are cubic Béziers, not the
//     analytic twins the web usually reaches for, and the rAF drivers solve
//     them the way `Cubic.transformInternal` does. A wrong solve still animates
//     — just on the wrong curve. So the solver is cross-checked against a
//     brute-force sampling of the same control points.
//  2. THE CASCADE DISTRIBUTION. A row of tiles or badges must land its LAST
//     item exactly on the clock whatever the count, and must not divide by zero
//     on a one-item row. Both are invisible until the day a gym ships one stat.
//  3. THE STAR GEOMETRY. The `clip-path` is DERIVED from `_SparkleStarPainter`'s
//     own 24-unit point list; if the derivation drifts the sparkle is still a
//     shape, just not that one.
//  4. THE COUNT-UP REEL. A digit column is measured, not laid out, so a wrong
//     offset reads as a number that is very slightly off its baseline.
//
// This file lives under src/__tests__/ for
// the same reason ./showcaseTokens.test.ts does: eslint Gate 2b forbids
// anything outside the island from importing it.

import { describe, expect, it } from 'vitest';

import {
  Curves,
  clamp01,
  cubic,
  phaseProgress,
} from '../celebrations/curves';
import {
  digitCountFor,
  reelOffset,
  reelSpec,
} from '../celebrations/CountUpText';
import {
  FEATURED_SIZE,
  MAX_TILT,
  MIN_SCALE,
  PERSPECTIVE_PX,
  coverFlowTransform,
  wrapIndex,
} from '../celebrations/rewardsCoverFlow';
import {
  SHOWCASE_POINTS_STATS,
  SHOWCASE_REWARDS_STATS,
  SHOWCASE_WINS_STATS,
} from '../celebrations/showcaseCelebrationStats';
import {
  SPARKLE_FADE_MS,
  SPARKLE_SCATTER,
  SPARKLE_STAGGER_SPAN,
  SPARKLE_STAR_CLIP_PATH,
  SPARKLE_STAR_POINTS,
  sparkleDelayMs,
} from '../celebrations/sparkleGeometry';
import { parseNumeric } from '../celebrations/WinsTile';
import { winsTileDelayMs } from '../celebrations/WinsTileRow';
import { streakBadgeDelayMs } from '../support/StreakWeekStrip';
import { ARRIVE_MS, CASCADE_MS, IMPACT_MS, SETTLE_MS } from '../shell/phrase';

// ---------------------------------------------------------------------------
// The curve samplers
// ---------------------------------------------------------------------------

/**
 * An independent solve of the same cubic Bézier: walk the curve parameter
 * densely and keep the sample whose x is closest to the target. Slow and dumb
 * on purpose — it shares no code with the subject, so agreement is evidence.
 */
function bruteForceCubic(a: number, b: number, c: number, d: number, x: number): number {
  const axis = (p: number, q: number, m: number): number =>
    3 * p * (1 - m) * (1 - m) * m + 3 * q * (1 - m) * m * m + m * m * m;
  let best = 0;
  let bestError = Number.POSITIVE_INFINITY;
  for (let i = 0; i <= 100000; i++) {
    const m = i / 100000;
    const error = Math.abs(axis(a, c, m) - x);
    if (error < bestError) {
      bestError = error;
      best = m;
    }
  }
  return axis(b, d, best);
}

describe('curves', () => {
  const NAMED: readonly (readonly [string, readonly [number, number, number, number]])[] = [
    ['easeOut', [0.25, 0.1, 0.25, 1]],
    ['easeOutQuart', [0.165, 0.84, 0.44, 1]],
    ['easeInQuart', [0.895, 0.03, 0.685, 0.22]],
    ['easeOutExpo', [0.19, 1, 0.22, 1]],
    ['easeOutBack', [0.175, 0.885, 0.32, 1.275]],
    ['easeInOutCubic', [0.645, 0.045, 0.355, 1]],
  ];

  it('carries Flutter’s own control points, not the analytic twins', () => {
    for (const [name, points] of NAMED) {
      const curve = Curves[name as keyof typeof Curves];
      const [a, b, c, d] = points;
      for (const t of [0.1, 0.25, 0.5, 0.75, 0.9]) {
        // The solver stops at `_cubicErrorBound` (0.001) in X; the resulting Y
        // error is that times the local slope, which none of these exceeds 10x.
        expect(curve(t)).toBeCloseTo(bruteForceCubic(a, b, c, d, t), 1.5);
      }
    }
  });

  it('pins both endpoints EXACTLY — `Curve.transform`’s short-circuit', () => {
    // Not `toBeCloseTo`: the bisection stops within 0.001 of the target x, so
    // without Flutter's short-circuit a not-yet-started phase would already
    // read ~0.005. That is the whole reason the special case exists.
    for (const [name] of NAMED) {
      const curve = Curves[name as keyof typeof Curves];
      expect(curve(0)).toBe(0);
      expect(curve(1)).toBe(1);
    }
  });

  it('clamps out-of-range input rather than extrapolating', () => {
    expect(Curves.easeOutQuart(-5)).toBe(0);
    expect(Curves.easeOutQuart(5)).toBe(1);
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2)).toBe(1);
    expect(clamp01(0.4)).toBe(0.4);
  });

  it('lets easeOutBack — and ONLY easeOutBack — overshoot 1', () => {
    let backPeak = 0;
    let quartPeak = 0;
    for (let i = 0; i <= 100; i++) {
      backPeak = Math.max(backPeak, Curves.easeOutBack(i / 100));
      quartPeak = Math.max(quartPeak, Curves.easeOutQuart(i / 100));
    }
    expect(backPeak).toBeGreaterThan(1);
    expect(quartPeak).toBeLessThanOrEqual(1.001);
  });

  it('is monotonic where Flutter’s curve is', () => {
    let previous = -1;
    for (let i = 0; i <= 200; i++) {
      const value = Curves.easeOutQuart(i / 200);
      expect(value).toBeGreaterThanOrEqual(previous - 1e-6);
      previous = value;
    }
  });

  it('builds an arbitrary Cubic the same way', () => {
    const linear = cubic(1 / 3, 1 / 3, 2 / 3, 2 / 3);
    expect(linear(0.4)).toBeCloseTo(0.4, 2);
  });
});

describe('phaseProgress', () => {
  it('is the Dart’s `((t - from) / (to - from)).clamp(0, 1)`', () => {
    expect(phaseProgress(500, 500, 1100)).toBe(0);
    expect(phaseProgress(800, 500, 1100)).toBeCloseTo(0.5, 6);
    expect(phaseProgress(1100, 500, 1100)).toBe(1);
    expect(phaseProgress(0, 500, 1100)).toBe(0);
    expect(phaseProgress(5000, 500, 1100)).toBe(1);
  });

  it('treats a zero-length phase as already over', () => {
    expect(phaseProgress(100, 100, 100)).toBe(1);
    expect(phaseProgress(99, 100, 100)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// The sparkle burst
// ---------------------------------------------------------------------------

describe('sparkle geometry', () => {
  it('derives the 8-point star from `_SparkleStarPainter`’s own path', () => {
    expect(SPARKLE_STAR_POINTS).toHaveLength(8);
    // `moveTo(12 * s, 0)` … `lineTo(10 * s, 10 * s)` … `close()`.
    expect(SPARKLE_STAR_POINTS[0]).toEqual([12, 0]);
    expect(SPARKLE_STAR_POINTS[4]).toEqual([12, 24]);
    expect(SPARKLE_STAR_CLIP_PATH).toBe(
      'polygon(50% 0%, 58.3333% 41.6667%, 100% 50%, 58.3333% 58.3333%, ' +
        '50% 100%, 41.6667% 58.3333%, 0% 50%, 41.6667% 41.6667%)',
    );
  });

  it('is size-independent — the painter’s `s = size / 24` becomes the percent', () => {
    // Every coordinate resolves to its share of the box, so one class scales
    // from the 3px particles to the 12px one with no per-size geometry.
    expect(SPARKLE_STAR_CLIP_PATH).not.toContain('px');
  });

  it('carries `_scatter` verbatim — twelve particles', () => {
    expect(SPARKLE_SCATTER).toHaveLength(12);
    expect(SPARKLE_SCATTER[0]).toEqual({ size: 10, dx: -110, dy: -90, opacity: 0.85 });
    expect(SPARKLE_SCATTER[11]).toEqual({ size: 3, dx: -70, dy: 60, opacity: 0.35 });
  });

  it('slices THIS FORK\u2019S IMPACT WINDOW, not the celebration clock', () => {
    // GUARDRAIL 16, AS ARITHMETIC. A burst is FELT, not read: a slow explosion
    // is not a generous one, it is coins wafting outward instead of being
    // thrown. So the whole burst fills `IMPACT_MS` \u2014 a constant pinned in
    // ../shell/phrase.ts for exactly this reason \u2014 and is NOT derived from
    // the celebration's own (much longer) settle. Pinning it here is what stops
    // the next person who slows the flow down from stretching the explosion
    // with it, which is how the problem was found in the first place.
    expect(sparkleDelayMs(0, 12)).toBe(0);
    expect(sparkleDelayMs(6, 12)).toBeCloseTo(0.5 * SPARKLE_STAGGER_SPAN * IMPACT_MS, 6);
    expect(sparkleDelayMs(11, 12)).toBeCloseTo((11 / 12) * SPARKLE_STAGGER_SPAN * IMPACT_MS, 6);
    expect(SPARKLE_FADE_MS).toBeCloseTo(IMPACT_MS * 0.35, 6);
  });

  it('closes the window exactly \u2014 the two spans sum to one', () => {
    // 0.65 of stagger + 0.35 of fade. The last particle starts its fade as late
    // as any particle does and still lands on the window's final frame.
    const last = sparkleDelayMs(SPARKLE_SCATTER.length - 1, SPARKLE_SCATTER.length);
    expect(last + SPARKLE_FADE_MS).toBeLessThanOrEqual(IMPACT_MS);
    expect(SPARKLE_STAGGER_SPAN + 0.35).toBeCloseTo(1, 6);
  });

  it('keeps the impact SHORTER than the settle it punctuates', () => {
    // The relationship is the point, not either number: an impact that ran as
    // long as the arrival would stop reading as a hit.
    expect(IMPACT_MS).toBeLessThan(SETTLE_MS);
  });
});

// ---------------------------------------------------------------------------
// The count-up odometer
// ---------------------------------------------------------------------------

describe('count-up reels', () => {
  it('ports `_digitCountFor`', () => {
    expect(digitCountFor(0)).toBe(1);
    expect(digitCountFor(3)).toBe(1);
    expect(digitCountFor(9)).toBe(1);
    expect(digitCountFor(10)).toBe(2);
    expect(digitCountFor(160)).toBe(3);
    expect(digitCountFor(3400)).toBe(4);
  });

  it('ports `_divisor` / `_maxIndex` per position', () => {
    expect(reelSpec(160, 0)).toEqual({ divisor: 1, maxIndex: 160 });
    expect(reelSpec(160, 1)).toEqual({ divisor: 10, maxIndex: 16 });
    expect(reelSpec(160, 2)).toEqual({ divisor: 100, maxIndex: 1 });
  });

  it('lands every position on the right digit, because the last cell IS it', () => {
    for (const target of [3, 28, 160, 3400]) {
      const digits = String(target).split('').reverse();
      for (let p = 0; p < digitCountFor(target); p++) {
        const { divisor, maxIndex } = reelSpec(target, p);
        // The strip renders `i % 10`, so the settled cell shows this.
        expect(maxIndex % 10).toBe(Number(digits[p]));
        expect(reelOffset(1, target, divisor, maxIndex)).toBe(maxIndex);
      }
    }
  });

  it('clamps a position that would over-roll — Dart’s `.clamp(0, maxIndex)`', () => {
    // 160 / 100 = 1.6, but the hundreds reel only has cells 0 and 1.
    expect(reelOffset(1, 160, 100, 1)).toBe(1);
    expect(reelOffset(0.5, 160, 100, 1)).toBeCloseTo(0.8, 6);
    expect(reelOffset(0, 160, 1, 160)).toBe(0);
    expect(reelOffset(0.5, 160, 1, 160)).toBeCloseTo(80, 6);
  });
});

describe('parseNumeric', () => {
  it('rolls a clean integer', () => {
    expect(parseNumeric('160')).toEqual({ prefix: '', value: 160 });
    expect(parseNumeric('+160')).toEqual({ prefix: '+', value: 160 });
    expect(parseNumeric('-3')).toEqual({ prefix: '-', value: 3 });
    expect(parseNumeric('  28  ')).toEqual({ prefix: '', value: 28 });
  });

  it('leaves anything else as static text — Dart returns null', () => {
    expect(parseNumeric('3 weeks')).toBeNull();
    expect(parseNumeric('')).toBeNull();
    expect(parseNumeric('1.5')).toBeNull();
    expect(parseNumeric('3.4k')).toBeNull();
  });

  it('agrees with the wins tiles it was written for', () => {
    // `buildWinsStats`'s order: classes, points, streak. The first two count
    // up; the streak tile is static text, because "3 weeks" is not a number.
    const [classes, points, streak] = SHOWCASE_WINS_STATS.tiles;
    expect(parseNumeric(classes?.value ?? '')).toEqual({ prefix: '', value: 4 });
    expect(parseNumeric(points?.value ?? '')).toEqual({ prefix: '+', value: 160 });
    expect(parseNumeric(streak?.value ?? '')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// The cascades
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// The cascades
//
// REWRITTEN FOR THIS FORK, and the shape of the change is the point. The base
// derived every beat from `CelebrationTimings` as an ADDITIVE LADDER — a fixed
// stagger per item, so a row's total duration grew with its length and each
// card's hold had to be tuned to outlast its own longest cascade. This fork
// derives them from its OWN clock (../shell/phrase.ts) as a DISTRIBUTION: the
// whole row lands inside one `CASCADE_MS` no matter how many items it holds.
//
// That is what lets one motion hold together across eleven screens, and it is
// why the old ladder constants (`TILE_BASE_DELAY_MS`, `STRIP_DELAY_MS`,
// `WINS_HOLD_MS`, `STATS_HOLD_MS`) no longer exist to be pinned: a card's
// timing is no longer a per-card number, it is the shared clock.
// ---------------------------------------------------------------------------

describe('a cascade distributes across the clock rather than laddering', () => {
  // The property that matters is the one an additive ladder cannot give you:
  // the LAST item always lands at the same moment, whatever the count.
  const lands = (delay: number): number => delay + ARRIVE_MS;

  it('lands the last wins tile exactly on the cascade, for any count', () => {
    expect(winsTileDelayMs(0, 0, 3)).toBe(0);
    expect(lands(winsTileDelayMs(0, 2, 3))).toBe(CASCADE_MS);
    // Five tiles would still finish on the same beat as three.
    expect(lands(winsTileDelayMs(0, 4, 5))).toBe(CASCADE_MS);
  });

  it('lands the last streak badge exactly on the cascade, for any count', () => {
    expect(streakBadgeDelayMs(0, 0, 7)).toBe(0);
    expect(lands(streakBadgeDelayMs(0, 6, 7))).toBe(CASCADE_MS);
    expect(lands(streakBadgeDelayMs(0, 4, 5))).toBe(CASCADE_MS);
  });

  it('carries the base delay through untouched', () => {
    expect(winsTileDelayMs(250, 0, 3)).toBe(250);
    expect(streakBadgeDelayMs(250, 0, 7)).toBe(250);
  });

  it('never divides by zero on a one-item or empty row', () => {
    // The guard matters: a gym with one stat tile is a real shape, and
    // `(count - 1)` is the denominator.
    expect(winsTileDelayMs(100, 0, 1)).toBe(100);
    expect(winsTileDelayMs(100, 0, 0)).toBe(100);
    expect(streakBadgeDelayMs(100, 0, 1)).toBe(100);
    expect(streakBadgeDelayMs(100, 0, 0)).toBe(100);
  });

  it('orders every item strictly after the one before it', () => {
    for (let i = 1; i < 7; i++) {
      expect(streakBadgeDelayMs(0, i, 7)).toBeGreaterThan(streakBadgeDelayMs(0, i - 1, 7));
    }
  });
});



// ---------------------------------------------------------------------------
// The rewards cover flow
// ---------------------------------------------------------------------------

describe('cover flow', () => {
  it('leaves the active page face-on at full size', () => {
    expect(coverFlowTransform(0)).toEqual({ scale: 1, tiltRadians: -0 });
  });

  it('shrinks and tilts a neighbour to the limit', () => {
    expect(coverFlowTransform(1)).toEqual({ scale: MIN_SCALE, tiltRadians: -MAX_TILT });
    expect(coverFlowTransform(-1)).toEqual({ scale: MIN_SCALE, tiltRadians: MAX_TILT });
  });

  it('clamps beyond one slot — a far page looks the same as a near one', () => {
    expect(coverFlowTransform(4)).toEqual(coverFlowTransform(1));
    expect(coverFlowTransform(-9)).toEqual(coverFlowTransform(-1));
  });

  it('interpolates linearly between them, as `1 - (1 - minScale) * t` does', () => {
    const half = coverFlowTransform(0.5);
    expect(half.scale).toBeCloseTo(1 - (1 - MIN_SCALE) * 0.5, 6);
    expect(half.tiltRadians).toBeCloseTo(-MAX_TILT * 0.5, 6);
  });

  it('turns Flutter’s `setEntry(3, 2, 0.0015)` into a CSS perspective DISTANCE', () => {
    expect(PERSPECTIVE_PX).toBeCloseTo(1 / 0.0015, 6);
    expect(FEATURED_SIZE).toBe(208);
  });

  it('wraps a page index the way Dart’s `%` does, not JS’s', () => {
    expect(wrapIndex(0, 3)).toBe(0);
    expect(wrapIndex(4, 3)).toBe(1);
    expect(wrapIndex(10001, 3)).toBe(wrapIndex(10001 % 3, 3));
    // JS would answer -1 here and index off the end of the list.
    expect(wrapIndex(-1, 3)).toBe(2);
    expect(wrapIndex(-4, 3)).toBe(2);
    expect(wrapIndex(1, 0)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// The ported data
// ---------------------------------------------------------------------------

describe('celebration stats', () => {
  // THE BUNDLED COPY IS THIS BRAND’S, NOT THE DART’S. `wins_title` and
  // `wins_subtitle` are themed slots, and ../WinsShowcase.tsx still reads them
  // through `useThemeText` — these constants are only the FALLBACK. The harness
  // opens untheme'd, though, so the fallback is what a reviewer actually reads,
  // and the run resolved these two to its own words.
  it('carries the run’s own wins copy as the untheme’d fallback', () => {
    expect(SHOWCASE_WINS_STATS.title).toBe('Today’s work');
    expect(SHOWCASE_WINS_STATS.heroAsset).toBe('stat_wins_trophy.png');
    expect(SHOWCASE_WINS_STATS.tiles).toHaveLength(3);
    expect(SHOWCASE_POINTS_STATS).toEqual({ gained: 160, totalPoints: 3400 });
    expect(SHOWCASE_REWARDS_STATS.items).toHaveLength(3);
  });

  it('features an item the carousel can actually centre on', () => {
    expect(SHOWCASE_REWARDS_STATS.featuredIndex).toBeGreaterThanOrEqual(0);
    expect(SHOWCASE_REWARDS_STATS.featuredIndex).toBeLessThan(SHOWCASE_REWARDS_STATS.items.length);
  });
});
