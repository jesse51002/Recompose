// The pure half of ./SparkleBurst.tsx.
//
// WHAT THIS IS NOW, AND WHY IT STOPPED BEING A SPARKLE SCATTER. The base drew
// twelve eight-point stars flung out at random offsets — confetti, which is the
// register this brand was chosen against. It is also a FOURTH FORM: this app
// has the line, the circle and the photograph and nothing else, and an
// eight-point star is none of the three (../layout_brief.yaml).
//
// So the burst is a BLOOM: small discs and small open rings — the app's own two
// ways of drawing a circle — settled on a ring just outside the closing loop,
// opening outward as the line travels past them. It is warm and it is settled,
// which is what a wreath deserves; it is not a firework.
//
// THE CLOCK IS THE LINE. Every petal's delay is a fraction of the loop's own
// draw, taken straight from the ANGLE it sits at: a petal at ninety degrees
// opens when the stroke reaches three o'clock. That is the brief's motion rule
// made arithmetic rather than authored — "the stagger is not a stagger at all,
// it is a consequence of one continuous stroke passing each node in turn" — so
// there is no per-element delay curve anywhere in this file or its stylesheet.
//
// POLAR, NOT CARTESIAN. The base listed `(dx, dy)` pairs, which is the right
// shape for a scatter and the wrong one for a ring: the angle is the thing the
// clock reads, and a `(dx, dy)` pair hides it. Offsets are derived below.
//
// THE STAR SHAPE STAYS. `SPARKLE_STAR_CLIP_PATH` is still exported and still
// derived from the Dart painter's own point list, because ../rewards/SparkleHero.tsx
// reads it. Deleting it would break a screen this file does not own.

/** `_SparkleStarPainter`'s box: every point below is on a 24-unit grid. */
const STAR_UNITS = 24;

/**
 * `_SparkleStarPainter.paint`'s path, in its own 24-unit coordinates —
 * `moveTo(12, 0)` then seven `lineTo`s, closed. Kept as the raw points so the
 * polygon below is DERIVED rather than a hand-typed percentage list.
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
 * The star as a `clip-path` value. Size-independent by construction: the
 * painter's `s = size / 24` scale factor becomes the percentage itself.
 *
 * NOT read by ./SparkleBurst.tsx any more — see the header. Its one consumer is
 * ../rewards/SparkleHero.tsx.
 */
export const SPARKLE_STAR_CLIP_PATH = `polygon(${SPARKLE_STAR_POINTS.map(
  ([x, y]) => `${unitPercent(x)} ${unitPercent(y)}`,
).join(', ')})`;

/** One petal of the bloom, placed by where it sits on the ring. */
export interface BloomPetal {
  /** Diameter, in px. */
  readonly size: number;
  /**
   * Where it sits, in degrees CLOCKWISE FROM TWELVE — the same origin and the
   * same direction the loop's stroke travels, which is what lets the delay be
   * read straight off this number.
   */
  readonly angleDeg: number;
  /** How far out from the loop's centre it settles, in px. */
  readonly radius: number;
  /** The opacity it settles at. */
  readonly opacity: number;
  /** Drawn in LINE ONLY — a ring rather than a disc. Both are the same form. */
  readonly open: boolean;
  /**
   * Sage rather than terracotta. Spent sparingly and on purpose: sage is the
   * colour this design gives a thing already earned, and the wreath's own
   * leaves are that green, so a few of them tie the bloom to the art.
   */
  readonly calm: boolean;
}

/**
 * THE BLOOM. Fifteen petals on a ring just outside the loop, spaced roughly
 * evenly round it so no quadrant is bare and none is crowded.
 *
 * The radii are bounded by what the phone has room for rather than by taste:
 * the card is 390 wide inside a `--sc-screen-padding-x` inset, so a petal
 * further out than ~178 leaves the screen, and the vertical gaps to the
 * headings above and the wins below are one `--sc-spacing-big`, so petals near
 * the vertical axis are pulled in. The open rings are the four largest, because
 * a ring smaller than about ten px reads as a smudge rather than as a circle.
 */
export const BLOOM: readonly BloomPetal[] = Object.freeze([
  Object.freeze({ size: 9, angleDeg: 12, radius: 168, opacity: 0.55, open: false, calm: false }),
  Object.freeze({ size: 5, angleDeg: 38, radius: 176, opacity: 0.38, open: false, calm: false }),
  Object.freeze({ size: 12, angleDeg: 60, radius: 164, opacity: 0.5, open: true, calm: false }),
  Object.freeze({ size: 6, angleDeg: 84, radius: 178, opacity: 0.42, open: false, calm: true }),
  Object.freeze({ size: 8, angleDeg: 106, radius: 166, opacity: 0.48, open: false, calm: false }),
  Object.freeze({ size: 4, angleDeg: 128, radius: 177, opacity: 0.32, open: false, calm: false }),
  Object.freeze({ size: 11, angleDeg: 150, radius: 165, opacity: 0.48, open: true, calm: false }),
  Object.freeze({ size: 5, angleDeg: 174, radius: 172, opacity: 0.34, open: false, calm: true }),
  Object.freeze({ size: 9, angleDeg: 198, radius: 164, opacity: 0.52, open: false, calm: false }),
  Object.freeze({ size: 4, angleDeg: 220, radius: 176, opacity: 0.3, open: false, calm: false }),
  Object.freeze({ size: 12, angleDeg: 244, radius: 167, opacity: 0.48, open: true, calm: false }),
  Object.freeze({ size: 6, angleDeg: 266, radius: 178, opacity: 0.38, open: false, calm: true }),
  Object.freeze({ size: 8, angleDeg: 290, radius: 165, opacity: 0.48, open: false, calm: false }),
  Object.freeze({ size: 5, angleDeg: 314, radius: 177, opacity: 0.34, open: false, calm: false }),
  Object.freeze({ size: 10, angleDeg: 338, radius: 169, opacity: 0.52, open: true, calm: false }),
]);

/** An offset from the bloom's centre, in px. */
export interface PetalOffset {
  readonly dx: number;
  readonly dy: number;
}

/**
 * Where a petal sits, in px from the centre, at `scale` of its settled radius.
 *
 * Screen y grows downward and the angle is measured clockwise from twelve, so
 * `dx` is the sine and `dy` is the NEGATIVE cosine.
 */
export function petalOffset(petal: BloomPetal, scale = 1): PetalOffset {
  const radians = (petal.angleDeg * Math.PI) / 180;
  const radius = petal.radius * scale;
  return {
    dx: Number((radius * Math.sin(radians)).toFixed(2)),
    dy: Number((-radius * Math.cos(radians)).toFixed(2)),
  };
}

/**
 * Where a petal starts, as a fraction of its settled radius.
 *
 * A bloom OPENS: every petal drifts a little outward as it arrives, rather than
 * appearing where it will end up. Twelve percent is enough to read as movement
 * and small enough that nothing travels far enough to look flung.
 */
export const BLOOM_CLOSED_RADIUS_SCALE = 0.88;

/** The scale a petal grows from. Never below this — nothing here pops. */
export const BLOOM_START_SCALE = 0.72;

/** How long one petal takes to open. */
export const BLOOM_PETAL_MS = 380;

/**
 * The fraction of the loop's draw over which the petals start.
 *
 * Short of 1 on purpose. At exactly 1 the petal at 338 degrees would only BEGIN
 * opening as the stroke closed, and the bloom would still be arriving well after
 * the card had otherwise finished; at 0.78 every petal has started before the
 * loop meets itself and the last settles a beat after it, which reads as the
 * bloom coming to rest rather than as a second entrance starting.
 */
export const BLOOM_STAGGER_SPAN = 0.78;

/**
 * When a petal opens, in ms from the start of the loop's draw — read straight
 * off the angle, so the bloom is the stroke passing rather than a cascade.
 */
export function bloomDelayMs(petal: BloomPetal, windowMs: number): number {
  return Number(((petal.angleDeg / 360) * BLOOM_STAGGER_SPAN * windowMs).toFixed(2));
}
