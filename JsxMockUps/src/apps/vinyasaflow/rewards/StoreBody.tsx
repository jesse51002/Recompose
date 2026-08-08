// THE POINTS STORE, HUNG ON THE THREAD.
//
// Replaces the base's `layouts/RewardsCardGrid.tsx` (a topbar, a tab strip, a
// sparkle hero and a two-up grid of cards). The topbar is now the shell's
// ../shell/Head.tsx and the grid is gone, because this design has no card to
// make a grid of.
//
// WHAT IS LEFT IS THREE STOPS ON ONE LINE, in the base's own order:
//
//   1. the two tabs, on an open node — ./RewardsTabs.tsx
//   2. the member's balance, on a SAGE node, because sage is the ink this
//      design spends on a thing already earned — ./PointsHeadline.tsx
//   3. the store itself: one coin per reward, cost first — ./RewardRow.tsx
//
// THE GAPS ARE THE GROUPING (Guardrail 13). Inside a reward nothing exceeds
// `--sc-spacing-large`; between two rewards it is `--sc-spacing-big`; and the
// store as a whole opens `--sc-spacing-big` BELOW the stack's own
// `--sc-spacing-big` gap, so the step from the balance into the store is twice
// the step from one reward to the next. That is what makes six rewards read as
// one group rather than as six more regions.
//
// The right gutter lives here rather than on each region: ../shell/Thread.tsx's
// `Region` deliberately pads neither edge (a full-bleed photograph has to be
// able to reach both), so the surface that stacks regions is what owes them a
// margin from the screen's right edge.

import type { RewardsLayoutData } from './rewardsLayoutData';
import { PointsHeadline } from './PointsHeadline';
import { RewardRow } from './RewardRow';
import { RewardsTabs } from './RewardsTabs';
import styles from './StoreBody.module.css';

/** `RewardCard.buttonText` — the store's own CTA label, as the Dart sets it. */
const REDEEM_LABEL = 'Redeem';

export interface StoreBodyProps {
  data: RewardsLayoutData;
}

// No `data-rewards-format` marker on the stack below: the base carried one
// because five arrangements shared this screen, and there is exactly one layout
// and one animation per asset here (../../../CLAUDE.md). A marker naming a
// vocabulary that no longer exists is the first step to rebuilding it.
export function StoreBody({ data }: StoreBodyProps) {
  return (
    <div className={styles.stack}>
      <RewardsTabs active="pointsStore" />
      <PointsHeadline points={data.totalPoints} />
      <div className={styles.store}>
        {data.items.map((item, index) => (
          // The store list is a fixed const set (or the gym's own, which is
          // also positional), so the position IS the item's identity — two
          // rewards may legitimately share a title.
          <RewardRow
            key={`${String(index)}-${item.title}`}
            item={item}
            buttonText={REDEEM_LABEL}
          />
        ))}
      </div>
    </div>
  );
}
