// Ports ../../../../../../MobileApp/lib/features/rewards/presentation/layouts/
// rewards_topbar.dart — the points store's head, built from ./rewardsLayoutData.ts
// so the screen passes it the same payload the bill gets.
//
// It composes ../shell/Masthead.tsx in `plain` mode: this is a tab root rather
// than the schedule, so the identity is the studio's NAME with its chevron and
// not the big brass roundel above it. What `plain` does NOT suppress is the
// carried line — rank, streak, points and the pass are on every app screen and
// this one is no exception. Dropping them is the single easiest way to lose
// five elements here and pass every mechanical gate; a sibling fork did exactly
// that on its class screen for an afternoon.
//
// The rank belt is resolved inside the Masthead from `SLOT_RANK_BELT`, so the
// `rankBadgeAsset` this data still carries is the ported field rather than a
// prop anything reads — see ./rewardsLayoutData.ts.

import { Masthead } from '../shell/Masthead';

import type { RewardsLayoutData } from './rewardsLayoutData';

export interface RewardsTopbarProps {
  data: RewardsLayoutData;
}

export function RewardsTopbar({ data }: RewardsTopbarProps) {
  return (
    <Masthead
      mode="plain"
      gymName={data.gymName}
      logoSrc={data.gymLogoSrc}
      streakDays={data.streakDays}
      pointsLabel={data.pointsLabel}
    />
  );
}
