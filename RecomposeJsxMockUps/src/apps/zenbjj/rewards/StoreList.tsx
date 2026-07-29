// ZEN BJJ'S POINTS STORE — one reward per line.
//
// WHAT THE BASE DOES. `StoreGrid` splits the catalogue into two columns that
// zig-zag down the page (even indices left, odd right) so each column packs to
// its own content height. Six image-top cards, two abreast, is a lot of
// simultaneous colour and a title clamped to two lines under every photograph.
//
// WHAT THIS DOES. The same six rewards, in one column, as the shared card's
// `thumbLeft` arrangement: square thumb leading, the title on a full line, the
// price tag and the points cost inline beneath it, and the redeem action
// trailing — each row closed by a hairline. "How it is done matters most":
// a member reading a store one item at a time can actually read the titles,
// and the two-line clamp stops deciding what a reward is called.
//
// NOTHING IS DROPPED AND NOTHING IS ADDED. Every card still carries its image,
// exactly one price tag, its title, its points cost and exactly one redeem
// action — ./RewardCard.tsx composes the identical five parts in both
// arrangements, which is the whole reason the arrangements are a prop rather
// than two components. The catalogue is the same length in the same order, so
// the theme slot each reward paints with (assigned by position in
// ../RewardsShowcase.tsx) is unchanged too.

import type { ShowcasePointsStoreItem } from './mockPointsStore';
import { RewardCard } from './RewardCard';
import styles from './StoreList.module.css';

export interface StoreListProps {
  items: readonly ShowcasePointsStoreItem[];
}

export function StoreList({ items }: StoreListProps) {
  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        // The store list is a fixed const set (or the gym's own, which is also
        // positional), so the slot index IS the card's identity — two items may
        // legitimately share a title.
        <RewardCard
          key={`${String(index)}-${item.title}`}
          item={item}
          buttonText="Redeem"
          layout="thumbLeft"
        />
      ))}
    </div>
  );
}
