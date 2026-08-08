// The pure half of ./SparkleBurst.tsx — the SHAPE and the CLOCK, neither of
// which is a component and both of which are worth pinning in a test.
//
// THE SHAPE. The mark is an eight-point star drawn on a 24-unit box. The web
// has no painter on a decorative box, and an inline SVG per particle would be
// twelve extra elements for a fill, so it is a `clip-path: polygon(...)` over a
// plain background: the same drawing, size-independent by construction, because
// the painter's `s = size / 24` scale factor becomes the percentage itself.
//
// THE CLOCK, AND WHY IT IS PINNED TO THE IMPACT. Guardrail 16 and
// ../layout_brief.yaml both say the same thing about a burst: "a hit is felt,
// not read — the box flying open, the coins thrown outward, the burst behind
// the trophy — and a slow impact is not a generous one, it is a weak one. Every
// impact is pinned to its own short duration and NEVER derived from the
// celebration clock, so that slowing the flow later cannot stretch an explosion
// into a waft."
//
// So the whole burst fills `IMPACT_MS` and nothing else, and the two spans
// below divide that window rather than a celebration duration:
//
//   stagger = (index / n) * 0.65   where the particle's fade STARTS
//   fade    = 0.35                 how long that fade LASTS
//
// Both are fractions of the window, so they resolve to a wall-clock delay and a
// wall-clock duration and the whole burst becomes twelve CSS animations with
// nothing left in JS. The last particle starts at 0.65 and runs 0.35, so the
// scatter finishes exactly on the window's edge however the impact is retuned.

import { IMPACT_MS } from '../shell/phrase';

/** One entry of the scatter: `(size, dx, dy, opacity)`. */
export interface SparkleParticle {
  /** Edge length of the star's box, in px. Not scaled by the burst size. */
  readonly size: number;
  /** Offset from the burst's centre, in px. */
  readonly dx: number;
  readonly dy: number;
  /** The opacity the particle settles at. */
  readonly opacity: number;
}

/**
 * The scatter — a radial spray around a centre point.
 *
 * Kept from the port unchanged. It is a measured spray rather than a ring: the
 * outermost twelve sit between 130 and 153px from the centre, which on a 390pt
 * card clears the trophy's own box on every side and still lands inside the
 * field the mark stands in.
 */
export const SPARKLE_SCATTER: readonly SparkleParticle[] = Object.freeze([
  Object.freeze({ size: 10, dx: -110, dy: -90, opacity: 0.85 }),
  Object.freeze({ size: 8, dx: 100, dy: -100, opacity: 0.7 }),
  Object.freeze({ size: 12, dx: 130, dy: 30, opacity: 0.8 }),
  Object.freeze({ size: 6, dx: -130, dy: 20, opacity: 0.55 }),
  Object.freeze({ size: 8, dx: -90, dy: 110, opacity: 0.65 }),
  Object.freeze({ size: 10, dx: 80, dy: 110, opacity: 0.75 }),
  Object.freeze({ size: 5, dx: 0, dy: -130, opacity: 0.55 }),
  Object.freeze({ size: 5, dx: 0, dy: 130, opacity: 0.5 }),
  Object.freeze({ size: 4, dx: -150, dy: -30, opacity: 0.45 }),
  Object.freeze({ size: 4, dx: 150, dy: -40, opacity: 0.5 }),
  Object.freeze({ size: 3, dx: 60, dy: -70, opacity: 0.4 }),
  Object.freeze({ size: 3, dx: -70, dy: 60, opacity: 0.35 }),
]);

/** The painter's box: every point below is on a 24-unit grid. */
const STAR_UNITS = 24;

/**
 * The star's path in its own 24-unit coordinates — `moveTo(12, 0)` then seven
 * `lineTo`s, closed. Kept as the raw points so the polygon below is DERIVED
 * rather than a hand-typed percentage list.
 */
export const SPARKLE_STAR_POINTS: readonly (readonly [number, number])[] = Object.freeze([
  Object.freeze([12, 0] as const),
  Object.freeze([14, 10] as const),
  Object.freeze([24, 12] as const),
  Object.freeze([14, 14] as const),
  Object.freeze([12, 24] as const),
  Object.freeze([10, 14] as const),
  Object.freeze([0, 12] as const),
  Object.freeze([10, 10] as const),
]);

/** A 24-unit coordinate as a percentage of the box, trimmed of trailing zeros. */
function unitPercent(value: number): string {
  return `${String(Number(((value / STAR_UNITS) * 100).toFixed(4)))}%`;
}

/**
 * The star as a `clip-path` value. Size-independent by construction, which is
 * what lets ONE class serve twelve particle sizes — and what lets
 * ../rewards/SparkleHero.tsx reuse the same mark without reusing this clock.
 */
export const SPARKLE_STAR_CLIP_PATH = `polygon(${SPARKLE_STAR_POINTS.map(
  ([x, y]) => `${unitPercent(x)} ${unitPercent(y)}`,
).join(', ')})`;

/** The fraction of the window the stagger spans. */
export const SPARKLE_STAGGER_SPAN = 0.65;

/** One particle's slice of the window. `0.65 + 0.35` closes it exactly. */
export const SPARKLE_FADE_SPAN = 0.35;

/**
 * The scale a particle grows from.
 *
 * A plain growth, and it stops dead at 1. Nothing in this fork overshoots and
 * corrects — a star that swelled past its size and came back would be the one
 * spring in an app whose whole motion direction is that a phrase resolves.
 */
export const SPARKLE_START_SCALE = 0.6;

/** How long a single particle's fade runs: 0.35 of the impact window. */
export const SPARKLE_FADE_MS = IMPACT_MS * SPARKLE_FADE_SPAN;

/**
 * When particle `index` of `count` starts its fade, in ms from the burst's own
 * start.
 */
export function sparkleDelayMs(index: number, count: number): number {
  if (count <= 0) return 0;
  return (index / count) * SPARKLE_STAGGER_SPAN * IMPACT_MS;
}
