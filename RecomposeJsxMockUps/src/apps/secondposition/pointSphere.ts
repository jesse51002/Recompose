// The pure half of ./PointsShowcase.tsx, which ports
// ../../../../../CRM/lib/showcase/points_showcase.dart.
//
// `_PointSphereState` seeds fourteen tokens on a UNIT SPHERE once
// (`_buildSphere`, a `static final` — computed on first use and shared by every
// instance), then re-projects all fourteen to 2D inside a single
// `AnimatedBuilder` on every frame: one Y-axis spin angle, one converge factor,
// one depth sort. Every token's position, scale and opacity is a function of
// that ONE clock, which is exactly why ./PointsShowcase.tsx drives it with
// `requestAnimationFrame` rather than CSS — fourteen particles sharing a
// rotating projection is not a set of independent property tweens.
//
// So the arithmetic lives here, as plain functions of elapsed milliseconds and
// the measured box, and the component is left with the driver and the markup.
// It is also what a test can pin: a Fibonacci lattice that drifts, a converge
// that starts a beat early, or a depth sort that runs backwards are all
// invisible in a screenshot and obvious in an assertion.
//
// The Dart works in the controller's own 0–1 value and rebuilds phase-local
// clocks out of it; the port works in milliseconds and divides once, landing on
// identical values with one fewer round trip. Same trade ./streakOrbit.ts makes.
//
// ---------------------------------------------------------------------------
// WHAT THIS FORK CHANGED, AND WHY IT IS THE TIMELINE RATHER THAN THE MATHS
// ---------------------------------------------------------------------------
//
// The lattice, the projection and the depth sort are the Dart's and are left
// alone — this brand's `single_point` art IS a struck coin, so a swarm of them
// is already in the vocabulary and the redesign had nothing to correct there.
//
// What it changed is the CLOCK. The Dart hardcodes a 1700ms timeline with the
// collapse starting at 0.74 of it, two numbers that mean nothing to each other;
// here the swarm is two named phases resolved from ./shell/phrase.ts, and the
// second one is PINNED. Guardrail 16: the turn is watched, so it runs on the
// celebration clock and gets slower whenever that does; the collapse is FELT,
// so it is fixed at `IMPACT_MS` and cannot be stretched into a waft by someone
// slowing the flow down later. `CONVERGE_START` is derived from the two rather
// than typed, which is what makes that guarantee structural.

import { Curves, clamp01 } from './celebrations/curves';
import { ARRIVE_MS, IMPACT_MS, SETTLE_MS } from './shell/phrase';

/**
 * How long the swarm TURNS before it gathers — the slow half.
 *
 * A settle plus a beat: long enough that the eye reads fourteen separate coins
 * turning on one axis rather than a texture that flickers. It is the arrival of
 * the card, so it is on the celebration clock (../layout_brief.yaml: "the
 * arrival of a card and the reveal of what was earned are unhurried").
 *
 * IT MAY NOT DROP BELOW ~1050ms while `SPIN_TURNS` is 1.4. `CONVERGE_START`
 * below is derived from it, and one full turn has to complete before the
 * collapse begins — ./__tests__/pointSphere.test.ts asserts the projection
 * repeats after a turn and needs a spread lattice to do it.
 */
export const SPIN_MS = SETTLE_MS + ARRIVE_MS;

/**
 * How long the collapse takes — the quick half, AND IT IS PINNED ON PURPOSE.
 *
 * Guardrail 16's second clause: a hit is felt rather than read, and a slow
 * implosion is not a generous one, it is a weak one — coins drifting inward
 * instead of being drawn in. So this is `IMPACT_MS` verbatim and never a
 * fraction of the phase above it.
 */
export const COLLAPSE_MS = IMPACT_MS;

/** `_kSphereDuration` — the swarm's whole timeline, turn plus collapse. */
export const SPHERE_MS = SPIN_MS + COLLAPSE_MS;

/** `_kSpinTurns` — full Y-axis turns across that timeline. */
export const SPIN_TURNS = 1.4;

/**
 * `_kConvergeStart` — the fraction of the timeline at which the collapse begins.
 *
 * DERIVED, not chosen. The Dart's literal `0.74` is what makes an impact
 * stretchable: slow the timeline and the collapse slows with it. Expressing the
 * fraction as "everything except the pinned collapse" is what keeps
 * `COLLAPSE_MS` genuinely constant no matter what `SPIN_MS` becomes.
 */
export const CONVERGE_START = SPIN_MS / SPHERE_MS;

/** `_kStarCount`. */
export const STAR_COUNT = 14;

/**
 * `_kGoldenAngle`. The Dart's own literal, NOT `pi * (3 - sqrt(5))`
 * (2.39996322…): the two differ in the sixth decimal, and after thirteen
 * multiplications that is a visible rotation of the lattice.
 */
export const GOLDEN_ANGLE = 2.39996;

/** `_kReferenceExtent` — the box the seed sizes below are quoted against. */
export const REFERENCE_EXTENT = 280;

/** `edgePad`'s unscaled value — how far short of the box's edge the swarm stops. */
export const EDGE_PAD = 28;

/**
 * The edge of the box the coin-scatter INSIGNIA is contained within, in px.
 *
 * `_kHeroSize` renamed, because in this fork it is not a hero illustration: it
 * is a struck object mounted the way a company mounts what it awards
 * (./shell/Insignia.tsx). CONTAINED and never cropped — the art measures 0.84,
 * so a square box that cropped would clip it, while containment simply leaves
 * the remainder of the square empty, which is invisible on a cut-out.
 *
 * It is also the swarm's target: ./PointsShowcase.module.css centres the mark
 * on exactly the point the coins collapse to, so the two halves of the card are
 * one gesture rather than a cut.
 *
 * THE NUMBER IS A HIERARCHY DECISION, AND IT IS CALIBRATED AGAINST THE SIBLING
 * CARD RATHER THAN GUESSED. This card and ./StatsShowcase.tsx have the same
 * rank structure — a 72px `--sc-type-figure-hero` count at rank 1 and a mounted
 * insignia at rank 2 — so they have to strike the same balance or the two read
 * as two designers. Integrating each mark's luminance difference from the satin
 * field gives the streak icon at its tuned 140 box a weight of 1.49x the figure
 * beside it; the coin scatter is a wider (0.84 against 0.60) and far denser
 * cut-out, so it reaches that same 1.44x at **170** and hits 2.01x at 200. It
 * WAS 200, and at 200 the two tie in a squint — which Guardrail 14 says means
 * rank 1 is not winning. Below ~140 the mark stops holding rank 2 and the field
 * goes empty, exactly as `MARK_BOX_PX` records for the streak card.
 */
export const MARK_SIZE = 170;

/** `_buildSphere`'s `sizes` table, cycled by `i % sizes.length`. */
export const STAR_SIZES: readonly number[] = Object.freeze([28, 36, 32, 40, 30]);

/** `_StarSeed` — one coin's resting point on the unit sphere, plus its art size. */
export interface StarSeed {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  /** Edge of the coin's art at the reference extent, in px. */
  readonly size: number;
}

/**
 * `_buildSphere` — a Fibonacci (golden-angle) lattice: `y` steps evenly down
 * the axis, `r` is the ring radius at that latitude, and `theta` advances by the
 * golden angle so successive points never line up into visible spirals.
 */
function buildSphere(): readonly StarSeed[] {
  const seeds: StarSeed[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const y = 1 - (2 * (i + 0.5)) / STAR_COUNT;
    const r = Math.sqrt(1 - y * y);
    const theta = i * GOLDEN_ANGLE;
    seeds.push(
      Object.freeze({
        x: r * Math.cos(theta),
        y,
        z: r * Math.sin(theta),
        size: STAR_SIZES[i % STAR_SIZES.length] ?? 0,
      }),
    );
  }
  return Object.freeze(seeds);
}

/** `_PointSphereState._seeds` — built once, shared by every mount. */
export const STAR_SEEDS: readonly StarSeed[] = buildSphere();

/** What `LayoutBuilder` resolves once per size — the `renderScale` block. */
export interface SphereLayout {
  /** `smallerExtent / _kReferenceExtent`. */
  readonly renderScale: number;
  /** `28 * renderScale`. */
  readonly edgePad: number;
  /** `constraints.maxWidth / 2`. */
  readonly halfWidth: number;
  /** `constraints.maxHeight / 2`. */
  readonly halfHeight: number;
}

/**
 * `LayoutBuilder(builder: (context, constraints) { … })`, verbatim.
 *
 * The art scales off the SMALLER extent so the coins do not become gigantic on
 * a tall screen, while the orbital path uses each axis independently — which is
 * what stretches the sphere into an ellipsoid that fills width AND height.
 */
export function sphereLayout(width: number, height: number): SphereLayout {
  const smallerExtent = Math.min(width, height);
  const renderScale = smallerExtent / REFERENCE_EXTENT;
  return {
    renderScale,
    edgePad: EDGE_PAD * renderScale,
    halfWidth: width / 2,
    halfHeight: height / 2,
  };
}

/** `Image(width: p.seed.size * renderScale)` — one coin's art box, in px. */
export function starSize(index: number, renderScale: number): number {
  return (STAR_SEEDS[index]?.size ?? 0) * renderScale;
}

/** One coin's resolved frame — `_renderStar`'s arguments, already evaluated. */
export interface ProjectedStar {
  /** Which seed this is, so the driver can find its element. */
  readonly index: number;
  /** `Offset(p.x * radiusX, …)`. */
  readonly dx: number;
  /** `Offset(…, -p.seed.y * radiusY)` — Flutter's y axis points DOWN. */
  readonly dy: number;
  /** `(1 - converge) * (0.55 + 0.45 * depth)`. */
  readonly scale: number;
  /** `(1 - converge) * (0.4 + 0.6 * depth)`. */
  readonly opacity: number;
  /** Paint order, back (0) to front. Dart's `..sort((a, b) => a.z.compareTo(b.z))`. */
  readonly order: number;
}

/**
 * The `AnimatedBuilder`'s body, as a function of elapsed ms and the box.
 *
 * Returned in PAINT order (back to front) so the caller can hand `order`
 * straight to `z-index`, which is what Dart gets for free from the sorted
 * `Stack`'s child order.
 *
 * NOTE `_renderStar`'s third parameter is named `converge` but is handed
 * `easedConverge` at the call site (points_showcase.dart:254) — so the scale
 * and opacity ramps read the EASED value, not the raw one. Porting the
 * parameter name instead of the argument would make the swarm fade out on a
 * straight line rather than the ease-in-quart the screen actually shows.
 */
export function sphereFrame(elapsedMs: number, layout: SphereLayout): readonly ProjectedStar[] {
  const t = clamp01(elapsedMs / SPHERE_MS);
  const spin = t * 2 * Math.PI * SPIN_TURNS;
  const converge = clamp01((t - CONVERGE_START) / (1 - CONVERGE_START));
  const easedConverge = Curves.easeInQuart(converge);
  const radiusX = (layout.halfWidth - layout.edgePad) * (1 - easedConverge);
  const radiusY = (layout.halfHeight - layout.edgePad) * (1 - easedConverge);

  const cosA = Math.cos(spin);
  const sinA = Math.sin(spin);
  // The Y-axis rotation: x and z turn, y is the axis and is left alone.
  const projected = STAR_SEEDS.map((seed, index) => ({
    seed,
    index,
    x: seed.x * cosA + seed.z * sinA,
    z: -seed.x * sinA + seed.z * cosA,
  }));
  projected.sort((a, b) => a.z - b.z);

  return projected.map((p, order) => {
    // 0 (back) → 1 (front). Drives both the size and the fade, which is what
    // makes a flat projection read as depth.
    const depth = (p.z + 1) / 2;
    return Object.freeze({
      index: p.index,
      dx: p.x * radiusX,
      dy: -p.seed.y * radiusY,
      scale: (1 - easedConverge) * (0.55 + 0.45 * depth),
      opacity: (1 - easedConverge) * (0.4 + 0.6 * depth),
      order,
    });
  });
}
