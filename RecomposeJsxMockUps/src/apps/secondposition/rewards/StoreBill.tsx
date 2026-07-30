// THE BILL OF REWARDS — every redeemable thing the studio is offering, as one
// continuous printed column.
//
// Replaces the base's `StoreGrid.tsx`, the two-up zig-zag of rounded tiles.
// Nothing here is a grid: panels stack directly against one another, parted
// only by a hairline, because a bill is read down rather than scanned across
// (../layout_brief.yaml). Two-up would also have halved every photograph's
// width to fit a shape the pictures did not ask for.
//
// THE FIRST WORK ON A BILL IS BILLED LARGER, and that is the only concession to
// hierarchy this column makes. The opening reward takes its photograph full
// width at the picture's own 3:2 with the satin carried underneath as a plinth
// and its name larger than anywhere else on the screen; everything after it
// takes the split panel. Two registers of one unit, never a third — so a longer
// or shorter catalogue changes how many splits there are and nothing else.
//
// THE ORDER IS THE CATALOGUE'S OWN, cheapest first, exactly as the list arrives
// (../showcaseSlots.ts declares the four generated reward slots in that order
// too). Promoting the first item is a matter of PROMINENCE; re-sorting the list
// would be answering a question the member did not ask.

import type { ShowcasePointsStoreItem } from './mockPointsStore';
import { RewardPanel } from './RewardPanel';
import styles from './StoreBill.module.css';

/**
 * `RewardCard.buttonText` at the base's own call site — the name of the one
 * action a reward carries. It is one constant rather than a prop because there
 * is one store and every reward in it is redeemed the same way.
 */
const REDEEM_LABEL = 'Redeem';

export interface StoreBillProps {
  items: readonly ShowcasePointsStoreItem[];
}

export function StoreBill({ items }: StoreBillProps) {
  return (
    <div className={styles.bill}>
      {items.map((item, index) => (
        <RewardPanel
          // The store is a fixed catalogue (or the gym's own, which is also
          // positional), so the index IS the item's identity — two rewards may
          // legitimately share a title.
          key={`${String(index)}-${item.title}`}
          item={item}
          buttonText={REDEEM_LABEL}
          register={index === 0 ? 'billed' : 'split'}
          index={index}
        />
      ))}
    </div>
  );
}
