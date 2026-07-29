// ZEN BJJ'S POINTS STORE BODY.
//
// One scroll, and the same four blocks the base carries in the same order:
// topbar, tab strip, the points headline, then the store itself. What changes
// is the store — the base's two-up zig-zag grid of image-top cards becomes one
// reward per line (../StoreList.tsx), which is where that reasoning lives.
//
// The frame stays a single scroller: the headline scrolls away with the
// catalogue rather than pinning, because a balance pinned over a list a member
// is browsing is a nag, and Zen BJJ's voice is "grounded, never exclaiming".

import { PointsHeadline } from '../PointsHeadline';
import type { RewardsLayoutData } from '../rewardsLayoutData';
import { RewardsTabs } from '../RewardsTabs';
import { RewardsTopbar } from '../RewardsTopbar';
import { StoreList } from '../StoreList';

import styles from './rewardsStack.module.css';

export interface RewardsCardGridProps {
  data: RewardsLayoutData;
}

export function RewardsCardGrid({ data }: RewardsCardGridProps) {
  return (
    <div className={styles.scrollStack} data-rewards-format="cardGrid">
      <RewardsTopbar data={data} />
      <RewardsTabs active="pointsStore" />
      <PointsHeadline points={data.totalPoints} />
      <StoreList items={data.items} />
    </div>
  );
}
