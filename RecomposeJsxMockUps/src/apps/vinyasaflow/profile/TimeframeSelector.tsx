// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/timeframe_selector.dart (and, for the chip itself,
// `shared/widgets/pills/timeframe_pill.dart`) — the 1W / 1M / 1Y / All range
// selector for the rank graph.
//
// IT STILL READS AS A SELECTOR, and that is deliberate rather than incidental.
// Guardrail 12: a control must look like what it is and behave the way its
// platform behaves. Four ranges in a row with exactly one marked is the pattern
// every phone owner already knows; what this design changes is how the mark is
// DRAWN — a capsule in the thread's stroke, no fill, which is the same "line
// with round ends" ../shell/Action.tsx is built from. The invention is in the
// drawing, never in the interaction.
//
// THE CHIPS DO NOT WINDOW ANYTHING, and that is the island's rule rather than a
// gap: every showcase surface is a preview inside a phone frame that takes no
// input, which is why ../rewards/RewardsTabs.tsx dropped its callbacks and
// ../videos/VideoCategoryTabs.tsx renders labels. `All` is the pinned selection
// (`SHOWCASE_TIMEFRAME_INDEX`), and it is the one the plot is drawn from, so the
// marked chip always names the window on screen. A live-looking <button> that
// did nothing would advertise an action the phone cannot take.
//
// The four values are the same four in every arrangement — the Dart's own
// `_kRanges` is a file-level const for exactly that reason.

import { cx } from '../cx';

import { RANK_PART } from './rankParts';
import styles from './TimeframeSelector.module.css';
import { RANK_TIMEFRAMES, SHOWCASE_TIMEFRAME_INDEX } from './mockRankProgress';

export function TimeframeSelector() {
  const selected = RANK_TIMEFRAMES[SHOWCASE_TIMEFRAME_INDEX]?.label;
  return (
    <div className={styles.row}>
      {RANK_TIMEFRAMES.map((entry) => (
        <Chip key={entry.label} label={entry.label} active={entry.label === selected} />
      ))}
    </div>
  );
}

/**
 * One range. The marked one wears the thread's stroke bent into a capsule and
 * the page's full-strength ink; the rest are the same words at the second ink,
 * with the border kept transparent so selecting one never resizes the row.
 */
function Chip({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={cx(styles.chip, active && styles.chipHere)}
      data-rank-part={RANK_PART.timeframePill}
      data-rank-active={active ? '' : undefined}
    >
      {label}
    </span>
  );
}
