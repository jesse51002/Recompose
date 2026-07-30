// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/rating_graph.dart — the member's classes-into-rank line, with
// the promotion threshold at the top of the axis and 0 at the bottom.
//
// IT IS SUPPORTING, AND IT IS SIZED LIKE IT. The emphasis ranking puts the plot
// and the level-up shelf below the rank, the progress and the counts, and a
// chart is the single easiest thing on a screen to let grow until it leads —
// it is wide, it is the only drawing on the cream, and a display face makes any
// figure beside it look wonderful at size. So the plot is given the SHORTEST of
// the base's three heights and its two axis figures are set in the small sans.
// Nothing here is allowed to out-shout a medallion.
//
// WHAT THE BRASS RULES ARE DOING. The base pinned two bare labels to the right
// edge of an unbounded box. Here the two ends of the axis are drawn as what
// they are: the promotion line the member is climbing toward, and the floor
// they started from. Brass is a LINE and this is the most literal line in the
// app — it fails AA as text at 3.25:1 and carries a rule honestly, which is why
// the figures NAMING those rules sit beside them in charcoal instead.
//
// A CANVAS BECOMES AN SVG PATH. `_RatingGraphPainter` walks the series into a
// Catmull-Rom-to-Bézier path; the same arithmetic produces an SVG `d` string in
// ./mockRankProgress.ts, where it can be asserted without a renderer
// (../__tests__/rankProgress.test.ts). The curve is static, so there is nothing
// for a canvas to buy.
//
// THE `size` / `bleed` / `card` PROPS ARE GONE. They were the knobs the base's
// five `rank_format` arrangements turned, and `card` seated the plot on a
// raised rounded surface — the inset card with a shadow this design refuses
// outright. One arrangement, one plot.

import { Section } from '../shell/Section';

import { RANK_PART } from './rankParts';
import styles from './RatingGraph.module.css';
import { TimeframeSelector } from './TimeframeSelector';
import type { ShowcaseRankPoint } from './mockRankProgress';
import {
  RANK_TIMEFRAMES,
  SHOWCASE_TIMEFRAME_INDEX,
  plottableSeries,
  ratingGraphPath,
  windowPoints,
} from './mockRankProgress';

/**
 * `_kNominalWidth` and the box the path is walked into. Per-screen layout
 * ratios, not tokens — the Dart spells them as file-local consts too. The
 * rendered plot is this shape scaled to whatever width the section gives it.
 */
const NOMINAL_WIDTH = 393;
const NOMINAL_HEIGHT = 104;

/** `_kStrokeWidth`, in the viewBox's units. */
const STROKE_WIDTH = 3;

/**
 * The label naming what the axis counts. It restates a value already on the
 * screen — the "17 / 24 classes" above it and the two figures beside the rules
 * — which is typography rather than a new fact.
 */
const AXIS_LABEL = 'Classes into rank';

export interface RatingGraphProps {
  points: readonly ShowcaseRankPoint[];
}

export function RatingGraph({ points }: RatingGraphProps) {
  // `_LoadedGraph`'s three lines. The window is applied HERE rather than by the
  // range selector, because the selector is a preview label: the pill that
  // reads as active and the window the plot actually draws both come from
  // `SHOWCASE_TIMEFRAME_INDEX`, so the two cannot drift apart.
  const timeframe = RANK_TIMEFRAMES[SHOWCASE_TIMEFRAME_INDEX];
  const windowed = timeframe === undefined ? points : windowPoints(points, timeframe);
  const series = plottableSeries(windowed);
  // `windowed.isNotEmpty ? windowed.last.classesNeeded : 0`.
  const needed = windowed.length === 0 ? 0 : (windowed[windowed.length - 1]?.classesNeeded ?? 0);
  const path = ratingGraphPath(series, NOMINAL_WIDTH, NOMINAL_HEIGHT);

  return (
    <Section label={AXIS_LABEL}>
      {/*
        ONE GRID FOR ALL THREE PARTS, not three stacked blocks. The scale is the
        chart's axis and has to end where the line ends, and the only way that
        stays true when the threshold gains a digit is for the two to share a
        column. See the stylesheet.
      */}
      <div className={styles.body}>
        {path === '' ? (
          // `_GraphEmpty` — a series with fewer than two points. The axis goes
          // with the plot: two rules bracketing nothing would state a threshold
          // this member has no history against.
          <p className={styles.empty} data-rank-part={RANK_PART.ratingGraph}>
            No rank history yet.
          </p>
        ) : (
          <>
            <div
              className={styles.plot}
              style={{
                aspectRatio: `${String(NOMINAL_WIDTH)} / ${String(NOMINAL_HEIGHT)}`,
              }}
              data-rank-part={RANK_PART.ratingGraph}
            >
              {/*
                The promotion line. Hidden at a non-positive threshold, exactly
                as Dart's `if (classesNeeded > 0)` has it — there is no line to
                climb toward at the top of the ladder.
              */}
              {needed > 0 && <div className={styles.ruleTop} />}
              <svg
                className={styles.svg}
                viewBox={`0 0 ${String(NOMINAL_WIDTH)} ${String(NOMINAL_HEIGHT)}`}
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d={path}
                  stroke="currentColor"
                  strokeWidth={STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* The floor: the count resets to zero at every promotion. */}
              <div className={styles.ruleBottom} />
            </div>

            {/*
              `ThresholdLabel` — the two figures, in their own column so they sit
              BESIDE the rules they name rather than on top of the drawing. Each
              is centred on its own rule.
            */}
            <div className={styles.axis}>
              {needed > 0 && (
                <span className={styles.thresholdTop}>{String(needed)}</span>
              )}
              <span className={styles.thresholdBottom}>0</span>
            </div>
          </>
        )}

        <div className={styles.ranges}>
          <TimeframeSelector />
        </div>
      </div>
    </Section>
  );
}
