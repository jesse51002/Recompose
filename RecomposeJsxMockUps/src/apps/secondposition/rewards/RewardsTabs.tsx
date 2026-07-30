// Ports ../../../../../../MobileApp/lib/features/rewards/presentation/widgets/
// rewards_tabs/rewards_tabs.dart — the two-tab selector the store carries.
//
// ONE CHROME, NOT TWO. The Dart ships an `underline` and a `segmented` variant
// resolved from a slot. There are no presets in this package — a bounded option
// set reproduces the platform's own design language, which is a reskin — so the
// fork keeps one arrangement and the pill is gone with the rest of this app's
// rounded fills.
//
// THE ACTIVE MARK IS BRASS AND THE INACTIVE LABEL IS NOT DIMMED PAST AA. Brass
// is a LINE and a MARK in this app and never a word (3.25:1 on the cream: it
// carries a border honestly and fails text at every size), so it draws the
// segment of rule under the tab the member is standing in and the labels stay
// ink. The held-back label is the 75% tone at 5.81:1; the 50% tone measures
// 2.92:1 and is not available to type here.
//
// NO TAP CALLBACKS, and that is the base's decision rather than this fork's.
// Dart's widget accepts `onPointsStoreTap` / `onMyRewardsTap` and the store
// passes neither: there is no My Rewards screen in this asset, and inventing
// one would be inventing a feature. So the strip states which list is showing
// and is not drawn as a pressable control — the screen's own exits are the four
// destinations at the foot.

import { cx } from '../cx';

import styles from './RewardsTabs.module.css';

/** `RewardsTab` — which tab is currently selected. */
export type RewardsTab = 'pointsStore' | 'myRewards';

export interface RewardsTabsProps {
  active: RewardsTab;
}

export function RewardsTabs({ active }: RewardsTabsProps) {
  return (
    <div className={styles.tabs}>
      <TabItem label="Points Store" isActive={active === 'pointsStore'} />
      <TabItem label="My Rewards" isActive={active === 'myRewards'} />
    </div>
  );
}

/**
 * `_TabItem` — one half of the strip.
 *
 * The two labels are left aligned inside equal columns rather than centred:
 * they are read, and a member's eye returns to one edge. Splitting the width in
 * two is also what gives the brass mark a measured length instead of one that
 * tracks how long the word happens to be.
 */
function TabItem({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    // `aria-current` only on the active one: the attribute set to "false" on
    // the other is noise a screen reader still has to step over.
    <span className={cx(styles.tab, isActive && styles.active)} aria-current={isActive ? true : undefined}>
      {label}
    </span>
  );
}
