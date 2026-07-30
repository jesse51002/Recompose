// The pure half of ./RewardsCarousel.tsx — the cover flow's arithmetic, and the
// one easing curve the whole rewards card is driven on.
//
// The carousel recomputes one page's transform from the FRACTIONAL page every
// frame:
//
//   offset  = (slot - livePage) * bloom       how far this page is from centre
//   clamped = offset.clamp(-1, 1)             beyond one slot nothing changes
//   t       = clamped.abs()
//   scale   = 1 - (1 - minScale) * t
//   tiltY   = -clamped * maxTilt              radians, about the y axis
//   veil    = t * recessionVeilMax            how far it has receded
//
// All of that is arithmetic on one number, so it lives here and the component
// is left with the driver and the markup. It is also what a test can pin: the
// resting page must be face-on at full size, and a page one slot out must be at
// `MIN_SCALE` and fully tilted no matter how far past one slot it actually is.
//
// WHAT THIS FORK CHANGED, AND WHY IT IS A CORRECTNESS FIX RATHER THAN A TASTE.
// The base sized a page by its DIAMETER: every reward went into a 208px circle
// with its photograph `object-fit: cover`ed into it. A generated reward
// photograph measures 1.50, so that box threw away a third of every one of them
// and then masked the corners off what was left — Guardrail 10b, exactly. And a
// disc is not this brand's form for a photograph in any case: ../layout_brief.yaml
// splits the two rules and says they are not interchangeable — a CUT-OUT is
// contained inside whatever shape it is given, a PHOTOGRAPH is given a box of
// its own proportion and the layout is solved around that.
//
// So the given axis here is HEIGHT. `FEATURED_SIZE` keeps its name and its
// value because it is the same measurement doing the same job — the size of the
// page at rest — and the width is whatever 3:2 makes of it.

import { CASCADE_MS, PHRASE, SWITCH_MS } from '../shell/phrase';

import type { Curve } from './curves';
import { cubic } from './curves';

/**
 * THE JS TWIN OF `--sp-phrase`, and the only curve either of this card's
 * per-frame drivers samples.
 *
 * ../shell/phrase.ts publishes the app's one easing to CSS as a string; a
 * driver writing transforms per frame needs the same curve as a function. It is
 * built here rather than taken from ./curves.ts because that module is the
 * ported set of FLUTTER's named curves (`Curves.easeOutQuart` and friends) and
 * this app's phrase is not one of them — it is this fork's own. The control
 * points are `PHRASE`'s, parsed once, so the stylesheet and the driver cannot
 * drift onto two different easings.
 *
 * It sits in this file, rather than beside the intro's maths in
 * ../rewardsCelebration.ts, because both drivers can see this one and the other
 * direction would be a cycle.
 */
export const PHRASE_CURVE: Curve = cubic(0.22, 0.61, 0.36, 1);

/** `PHRASE`, re-exported so a caller can assert the two are the same curve. */
export const PHRASE_EASE = PHRASE;

/** The proportion of the generated reward photographs. They measure 1.50. */
export const PHOTO_RATIO = 3 / 2;

/**
 * The featured page's HEIGHT, in px. Its width is `PHOTO_RATIO` times this.
 *
 * The base's `_featuredSize` was a circle's diameter; this is the given axis of
 * a 3:2 box. Same number, same job — see the header for why the axis moved.
 */
export const FEATURED_SIZE = 208;

/** The featured page's width, derived rather than typed twice. */
export const FEATURED_WIDTH = FEATURED_SIZE * PHOTO_RATIO;

/**
 * How small a page one slot away shrinks to.
 *
 * Softer than the base's 0.56 for the same reason the tilt is: a neighbour here
 * is the next work further down the bill, receding, not a card fanned away.
 */
export const MIN_SCALE = 0.62;

/** The y-axis tilt of a one-slot-away page, in radians (~26°). */
export const MAX_TILT = 0.45;

/**
 * `Matrix4..setEntry(3, 2, 0.0015)`. Flutter's entry is 1/distance; CSS's
 * `perspective()` takes the distance itself, so it is the reciprocal.
 */
export const PERSPECTIVE_PX = 1 / 0.0015;

/**
 * The share of the carousel's width one page SLOT occupies — what turns a page
 * offset into a distance on screen.
 *
 * Wider than the base's 0.45 because the pages are wider: at 3:2 the featured
 * page is 312px on a 390px card, so a 0.45 slot would bury each neighbour
 * almost entirely behind it. At 0.62 a neighbour's inner edge tucks about 11px
 * under the featured page and the rest of it runs off the screen edge, which is
 * what says the catalogue continues past what is on the card.
 */
export const VIEWPORT_FRACTION = 0.62;

/**
 * How far a receded page is veiled back toward the ground, at one full slot out.
 *
 * The neighbours are not competing with the featured page: it is rank 1 on this
 * card and they are rank 3, so they lose scale, they turn away, AND they lose
 * contrast. The veil is the CREAM ground rather than a shadow — nothing in this
 * app floats above anything, so recession is a wash of the ground colour and
 * never a drop shadow.
 */
export const RECESSION_VEIL_MAX = 0.5;

/**
 * One page advance.
 *
 * `SWITCH_MS` is the shared clock's beat for "one thing replacing another in the
 * same box: a caption, A PAGE, a tab body" (../shell/phrase.ts) — which is
 * exactly what this is. It is deliberately not derived from the celebration
 * durations: paging a shelf is ordinary content motion, and slowing it to a
 * celebration's tempo would make the card feel stuck rather than generous.
 */
export const SLIDE_MS = SWITCH_MS;

/**
 * The BLOOM — the shelf opening out of the burst.
 *
 * Every page starts stacked exactly on the featured one and spreads to its own
 * slot over this window, so the shelf is seen ARRIVING rather than found
 * already there. `CASCADE_MS` is the clock's rung for "a row of things arriving
 * one after another", and a bloom is that row arriving all at once from one
 * point instead.
 */
export const BLOOM_MS = CASCADE_MS;

/** One page's resolved cover-flow transform. */
export interface CoverFlowTransform {
  /** `1 - (1 - minScale) * t`. */
  readonly scale: number;
  /** `-clamped * maxTilt`, in radians. */
  readonly tiltRadians: number;
}

/** `offset.clamp(-1.0, 1.0)` then the two derivations above. */
export function coverFlowTransform(offset: number): CoverFlowTransform {
  const clamped = offset < -1 ? -1 : offset > 1 ? 1 : offset;
  const t = Math.abs(clamped);
  return { scale: 1 - (1 - MIN_SCALE) * t, tiltRadians: -clamped * MAX_TILT };
}

/**
 * How opaque the ground-coloured veil over a page at `offset` is.
 *
 * Clamped on the same one-slot boundary as the transform, so a page three slots
 * out is no more veiled than the one beside it — they are all simply "not the
 * featured page".
 */
export function recessionVeil(offset: number): number {
  const clamped = offset < -1 ? -1 : offset > 1 ? 1 : offset;
  return Math.abs(clamped) * RECESSION_VEIL_MAX;
}

/**
 * The stacking order for a page at `offset` — the featured page paints over its
 * neighbours.
 *
 * The base needed no counterpart because circles of one fixed diameter never
 * overlapped. Pages of this width DO, by design, and without this the page
 * sliding in would paint OVER the one it is sliding behind.
 */
export function pageDepth(offset: number): number {
  return 100 - Math.round(Math.abs(offset) * 10);
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
