// The pure half of ./RewardsCarousel.tsx — the cover flow's arithmetic.
//
// The carousel recomputes one page's transform from the FRACTIONAL page every
// frame:
//
//   offset  = page - livePage                 how far this page is from centre
//   clamped = offset.clamp(-1, 1)             beyond one slot nothing changes
//   t       = clamped.abs()
//   scale   = 1 - (1 - minScale) * t
//   tiltY   = -clamped * maxTilt              radians, about the y axis
//   depth   = the stacking order, featured on top
//
// All of that is arithmetic on one number, so it lives here and the component
// is left with the driver and the markup. It is also what a test can pin: the
// resting page must be face-on at full size, and a page one slot out must be at
// `MIN_SCALE` and fully tilted no matter how far past one slot it actually is.
//
// WHAT THIS FORK CHANGED, AND WHY. The base sized a page by its DIAMETER —
// every reward went into a circle of a fixed width and height, with the photo
// `object-fit: cover`ed into it. The reward photographs are 3:2 and 1.85:1
// landscape stock frames, so that box discarded a third of every one of them
// (Guardrail 10b), and a circle is this brand's form for the objects it MINTED,
// not for a photograph. The given axis here is therefore HEIGHT: the frames on
// this shelf align on a common height and differ in width, which is the only
// arrangement in which stills of two different proportions sit in one row with
// none of them cropped to match a neighbour.
//
// The tilt and the minimum scale are softened for the same reason the eases
// are: a hard 3D fan is a flourish, and this design's confidence is unhurried.
// A neighbour reads as the next frame on a strip, receding, rather than as a
// card fanned away.

/** The featured frame's HEIGHT, in px. Its width is whatever its own art makes it. */
export const FEATURED_HEIGHT = 148;

/** How small a page one slot away shrinks to. */
export const MIN_SCALE = 0.6;

/** The y-axis tilt of a one-slot-away page, in radians. */
export const MAX_TILT = 0.42;

/**
 * `Matrix4..setEntry(3, 2, 0.0015)`. Flutter's entry is 1/distance; CSS's
 * `perspective()` takes the distance itself, so it is the reciprocal.
 */
export const PERSPECTIVE_PX = 1 / 0.0015;

/**
 * The share of the viewport one page SLOT occupies — what turns a page offset
 * into a distance on screen.
 *
 * It is deliberately narrower than a featured frame, which is what makes the
 * neighbours peek in at both edges instead of sitting in their own columns.
 */
export const VIEWPORT_FRACTION = 0.45;

/**
 * One page advance, in ms.
 *
 * Slower than the base's 450: this app's tempo is a breath, and the page tween
 * is already eased soft at both ends (`easeInOutCubic`), so the only thing
 * standing between it and the brief's four-count was its duration.
 */
export const SLIDE_MS = 640;

/** One page's resolved cover-flow transform. */
export interface CoverFlowTransform {
  /** `1 - (1 - minScale) * t`. */
  readonly scale: number;
  /** `-clamped * maxTilt`, in radians. */
  readonly tiltRadians: number;
  /**
   * Stacking order, highest at the centre.
   *
   * The base had no counterpart because circles of one fixed diameter never
   * overlapped. Frames of their own widths DO — a 1.85:1 still is wider than a
   * page slot — and without this the incoming neighbour paints OVER the
   * featured frame, which reads as the wrong one being featured.
   */
  readonly depth: number;
}

/** `offset.clamp(-1.0, 1.0)` then the three derivations above. */
export function coverFlowTransform(offset: number): CoverFlowTransform {
  const clamped = offset < -1 ? -1 : offset > 1 ? 1 : offset;
  const t = Math.abs(clamped);
  return {
    scale: 1 - (1 - MIN_SCALE) * t,
    tiltRadians: -clamped * MAX_TILT,
    // Live in the fractional offset, so the incoming page rises to the front
    // across the tween rather than popping there when the integer page changes.
    depth: 100 - Math.round(Math.abs(offset) * 10),
  };
}

/**
 * `page % items.length`, on Dart's semantics.
 *
 * Dart's `%` on ints is always non-negative; JS's keeps the dividend's sign, so
 * a negative page (which a carousel seeded near zero can reach) would index
 * out of the list. The extra wrap is the same fix ../showcaseTokens.ts makes
 * for `hslHue`.
 */
export function wrapIndex(page: number, length: number): number {
  if (length <= 0) return 0;
  return ((page % length) + length) % length;
}
