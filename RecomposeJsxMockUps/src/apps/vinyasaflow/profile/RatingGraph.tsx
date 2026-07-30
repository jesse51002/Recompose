// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/rating_graph.dart — the member's classes-into-rank line, with
// the classes axis bracketed on the right edge: `classesNeeded` (the promotion
// line) at the top and `0` at the bottom.
//
// THE PLOT IS THE THREAD CONTINUING AS A DATA LINE. One unbroken stroke in the
// thread's own ink, no fill under it, no gridline, no axis rule, no surface
// behind it — because a plot on a panel would be a fourth form and this design
// has three. Everything that would normally hold a chart together is doing its
// job here by being absent: the two threshold numbers say what the axis counts,
// the curve says the rest.
//
// WHAT WENT, AND WHY. The base carried a `size` triple, a `bleed` flag and a
// `card` flag — the knobs five arrangements turned. There is one arrangement
// here, so they are gone rather than left as dead options (../../../CLAUDE.md:
// a fork deletes the chrome it replaced). `card` in particular could not
// survive: it seats the plot on a raised surface, which is the box this design
// does not have.
//
// A CANVAS BECOMES AN SVG PATH. `_RatingGraphPainter` walks the series into a
// Catmull-Rom-to-Bézier path; the same arithmetic produces an SVG `d` string in
// ./mockRankProgress.ts, where it can be asserted without a renderer. There is
// no per-frame VALUE here — the curve is static and only its DRAWING is
// animated, which CSS does on the stroke itself — so there is nothing for a
// canvas to buy.

import { RANK_PART } from './rankParts';
import styles from './RatingGraph.module.css';
import type { ShowcaseRankPoint } from './mockRankProgress';
import {
  RANK_TIMEFRAMES,
  SHOWCASE_TIMEFRAME_INDEX,
  plottableSeries,
  ratingGraphPath,
  windowPoints,
} from './mockRankProgress';

/**
 * The viewBox the path is built in. Per-screen layout ratios, not tokens — the
 * Dart spells them as file-local consts too. The box is scaled uniformly to
 * whatever width it is given, so these are a PROPORTION rather than a size.
 */
const NOMINAL_WIDTH = 393;
const NOMINAL_HEIGHT = 150;

/**
 * `_kStrokeWidth`, in viewBox units. It lands on screen a shade under 3 once
 * the box is scaled into the room left of the gutter, which is the thread's own
 * weight where it has to hold against something — the same ink at the same
 * strength, not a second device.
 */
const STROKE_WIDTH = 3;

export interface RatingGraphProps {
  points: readonly ShowcaseRankPoint[];
}

export function RatingGraph({ points }: RatingGraphProps) {
  // `_LoadedGraph`'s three lines, and the reason the window lives with the
  // series rather than with the pills: the selector and the plot have to agree
  // on what is being shown even when an arrangement separates them.
  const timeframe = RANK_TIMEFRAMES[SHOWCASE_TIMEFRAME_INDEX];
  const windowed = timeframe === undefined ? points : windowPoints(points, timeframe);
  const series = plottableSeries(windowed);
  // `windowed.isNotEmpty ? windowed.last.classesNeeded : 0`.
  const needed = windowed.length === 0 ? 0 : (windowed[windowed.length - 1]?.classesNeeded ?? 0);
  const path = ratingGraphPath(series, NOMINAL_WIDTH, NOMINAL_HEIGHT);

  return (
    // `AspectRatio(aspectRatio: _kNominalWidth / _height) > Stack(...)`.
    <div
      className={styles.plot}
      style={{ aspectRatio: `${String(NOMINAL_WIDTH)} / ${String(NOMINAL_HEIGHT)}` }}
      data-rank-part={RANK_PART.ratingGraph}
    >
      {path === '' ? (
        // `_GraphEmpty` — a series with fewer than two points.
        <p className={styles.empty}>No rank history yet.</p>
      ) : (
        <>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${String(NOMINAL_WIDTH)} ${String(NOMINAL_HEIGHT)}`}
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            {/*
              `pathLength={1}` normalises the stroke's length to one unit, which
              is what lets the stylesheet draw it with a plain dash offset and no
              measurement. At offset 1 the whole path is the dash pattern's GAP,
              so nothing is painted and a round cap cannot leave a dot behind on
              the first frame.
            */}
            <path
              className={styles.line}
              d={path}
              pathLength={1}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/*
            `ThresholdLabel` — the promotion line at the top and 0 at the bottom,
            pinned to the box's own corners so a shorter plot moves them with it.
            The top one is hidden at a non-positive threshold, exactly as Dart's
            `if (classesNeeded > 0)` has it.
          */}
          {needed > 0 && <span className={styles.thresholdTop}>{String(needed)}</span>}
          <span className={styles.thresholdBottom}>0</span>
        </>
      )}
    </div>
  );
}
