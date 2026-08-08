// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/timeframe_selector.dart (and, for the range itself,
// `shared/widgets/pills/timeframe_pill.dart`) — the 1W / 1M / 1Y / ALL window
// the plot above it is drawn from.
//
// IT DOES NOT WINDOW ANYTHING, and that is the island's rule rather than a gap:
// every showcase surface is a preview inside a phone frame that takes no input,
// which is why ../rewards/RewardsTabs.tsx dropped its callbacks and
// ../videos/VideoCategoryTabs.tsx renders labels. ALL is the pinned selection
// (`SHOWCASE_TIMEFRAME_INDEX`) and it is the window ./RatingGraph.tsx actually
// plots, so the range that reads as chosen always names the line on screen.
//
// SO IT IS DRAWN AS A SCALE, NOT AS FOUR BUTTONS. The base set them as pills
// with a border and a pill radius — a control that looks pressable and is not,
// which is the shape Guardrail 4 objects to and which this app also refuses on
// its own terms: it has no rounded chips and nothing floats. Four tracked
// labels along the foot of a chart read as an axis, and the one in force is
// marked in brass. That is the SAME mark ../videos/VideoCategoryTabs.module.css
// puts under the selected scope and ../videos/VideoViewAllAction.module.css
// puts under its word, so "brass under a label" means one thing everywhere in
// this app.
//
// DISTRIBUTED, NOT BUNCHED. Four semantically distinct ranges sharing a row
// with width to spare is Guardrail 15's exact case: equal columns across the
// full width it is given, rather than four chips packed at the left with a void
// at the right that nothing claims. The width it is given is the PLOT's, not the
// section's — ./RatingGraph.tsx seats this in the chart's own grid so the scale
// ends where the line it measures ends.
//
// The four values are the same four in every design — the Dart's own `_kRanges`
// is a file-level const for that reason. A layout moves the row; it never drops
// a range.

import { cx } from '../cx';

import { RANK_PART } from './rankParts';
import styles from './TimeframeSelector.module.css';
import { RANK_TIMEFRAMES, SHOWCASE_TIMEFRAME_INDEX } from './mockRankProgress';

export function TimeframeSelector() {
  const selected = RANK_TIMEFRAMES[SHOWCASE_TIMEFRAME_INDEX]?.label;

  return (
    <div className={styles.scale}>
      {RANK_TIMEFRAMES.map((entry) => {
        const isActive = entry.label === selected;
        return (
          <span
            key={entry.label}
            className={cx(styles.range, isActive && styles.active)}
            data-rank-part={RANK_PART.timeframePill}
            data-rank-active={isActive ? '' : undefined}
          >
            {entry.label}
          </span>
        );
      })}
    </div>
  );
}
