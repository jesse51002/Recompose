// The store's body: the index, the balance block, and the catalogue.
//
// Replaces ../rewards/layouts/RewardsCardGrid.tsx. Same three parts in the same
// order — the two-tab index, the points headline, the reward list — rendered as
// a page of a catalogue rather than a feed of cards.
//
// THE BALANCE IS THE SCREEN'S ONE FULL-BLEED WALNUT BLOCK. The base draws it as
// a sparkle hero: "YOU EARNED" over a big accented figure over "POINTS". The
// three parts survive exactly; what changes is that the figure is set in the
// display face at 64px on solid walnut, edge to edge, which is this design's
// way of saying "this outranks everything else on the screen".

import { formatThousands } from '../formatPoints';

import { Catalogue } from './Catalogue';
import type { RewardsLayoutData } from './rewardsLayoutData';
import styles from './StoreSheet.module.css';

export function StoreSheet({ data }: { data: RewardsLayoutData }) {
  return (
    <div className={styles.sheet}>
      {/* The two destinations of the store, as an index. Labels, not controls —
          the base's tabs are labels too (../rewards/RewardsTabs.tsx explains
          why: re-selecting on scroll would be an affordance the preview has
          nothing to drive). */}
      <div className={styles.index}>
        <span className={styles.indexItemActive}>Points Store</span>
        <span className={styles.indexItem}>My Rewards</span>
      </div>

      <div className={styles.balance}>
        <span className={styles.balanceTop}>You earned</span>
        <span className={styles.balanceFigure}>{formatThousands(data.totalPoints)}</span>
        <span className={styles.balanceBottom}>Points</span>
      </div>

      <div className={styles.catalogue}>
        <h2 className={styles.catalogueLabel}>Redeemable</h2>
        <Catalogue items={data.items} buttonText="Redeem" />
      </div>
    </div>
  );
}
