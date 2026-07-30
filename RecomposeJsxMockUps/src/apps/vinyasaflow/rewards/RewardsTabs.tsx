// Ports ../../../../../../MobileApp/lib/features/rewards/presentation/widgets/
// rewards_tabs/ — the two-tab selector the points store carries, redrawn as a
// stop on the thread.
//
// GUARDRAIL 12: THE INVENTION IS IN HOW IT IS DRAWN, NOT IN HOW IT WORKS. This
// is still two labelled targets in a row with exactly one marked, which is the
// pattern every phone owner already knows. What changed is that the marker is
// the app's own stroke — a two-pixel terracotta rule under the active label, at
// the weight of the line it hangs from — rather than a pill or a tinted
// segment. The base's `segmented` chrome is gone with it: a filled capsule
// wrapped around two labels is a BOX, and this design has three forms and no
// fourth (../layout_brief.yaml).
//
// SENTENCE CASE. The base said "Points Store" / "My Rewards"; this app never
// title-cases or capitalises a label, because its voice is a teacher rather
// than an instrument panel. Same two labels, same two targets.
//
// THE ACTIVE TAB IS MARKED BY INK STRENGTH, NOT BY BRAND COLOUR. Fired
// terracotta measures 4.35:1 on the linen canvas and dusty sage 3.89:1, so
// neither may set a 15px label. The rule beneath it carries the brand instead —
// colour lives in fills and strokes here, never in running type.
//
// NO TAP CALLBACKS. Dart's widget accepts `onPointsStoreTap` / `onMyRewardsTap`
// and the store passes neither, because every showcase surface is a preview
// inside a phone frame that takes no input. The port drops them rather than
// carrying two props nothing can ever pass.

import { cx } from '../cx';
import { Node } from '../shell/Thread';

import styles from './RewardsTabs.module.css';

/** `RewardsTab` — which tab is currently selected. */
export type RewardsTab = 'pointsStore' | 'myRewards';

export interface RewardsTabsProps {
  active: RewardsTab;
}

export function RewardsTabs({ active }: RewardsTabsProps) {
  return (
    <div className={styles.region}>
      <Node kind="open" />
      <div className={styles.tabs}>
        <Tab label="Points store" isActive={active === 'pointsStore'} />
        <Tab label="My rewards" isActive={active === 'myRewards'} />
      </div>
    </div>
  );
}

/**
 * One target. The inactive rule is drawn transparent rather than omitted, so
 * both tabs keep identical heights and the active one does not appear to sit a
 * pixel lower than its neighbour.
 */
function Tab({ label, isActive }: { label: string; isActive: boolean }) {
  return <span className={cx(styles.tab, isActive && styles.active)}>{label}</span>;
}
