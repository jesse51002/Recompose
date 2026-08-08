// THE CATALOGUE — the points store as a price list.
//
// Replaces ../rewards/StoreGrid.tsx's two-up grid of image-top cards. The
// rewards are named things with a cost, which is a LIST OF PRICES, and a price
// list is a form with four hundred years of practice behind it: the name on the
// left, a leader rule running across the measure, the figure hard against the
// right margin.
//
// Every field a card carried is here — the reward's picture, its title, its
// points cost, its price label and its Redeem action — and the action is the
// same no-op the base's is (`ShowcasePrimaryButton` with no `onPressed`),
// because a preview has no member and no balance to spend.
//
// THE THEME SLOT IS STAMPED AT THE SOURCE, in ../RewardsShowcase.tsx's
// `storeItemsFor`, and read off the item here — never re-derived per call site.
// The same reward also appears in the celebration carousel, and the two
// disagreeing is Guardrail 7's own worked example.

import { Plate } from '../shell/Plate';
import { showcaseAssetOrNetwork } from '../showcaseAssets';

import styles from './Catalogue.module.css';
import type { ShowcasePointsStoreItem } from './mockPointsStore';

export interface CatalogueProps {
  items: readonly ShowcasePointsStoreItem[];
  /** `RewardCard.buttonText` — the action's label ("Redeem", "Use"). */
  buttonText: string;
}

export function Catalogue({ items, buttonText }: CatalogueProps) {
  return (
    <ol className={styles.list}>
      {items.map((item, index) => (
        // The store list is a fixed const set (or the gym's own, which is also
        // positional), so the slot index IS the entry's identity — two items
        // may legitimately share a title.
        <li key={`${String(index)}-${item.title}`} className={styles.entry}>
          <Plate
            className={styles.plate}
            // The base's own ladder: the injected gym photo, then the bundled
            // fallback, with the generated slot above both inside <Plate>.
            src={showcaseAssetOrNetwork(item.imageUrl, item.imageAsset ?? 'reward_gloves.png')}
            slot={item.themeSlot}
          />
          <div className={styles.column}>
            <div className={styles.line}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.leader} aria-hidden="true" />
              <span className={styles.cost}>{String(item.pointsCost)}</span>
            </div>
            <div className={styles.line}>
              <span className={styles.price}>{item.priceLabel}</span>
              <span className={styles.leaderFaint} aria-hidden="true" />
              <span className={styles.unit}>pts</span>
            </div>
            <button type="button" className={styles.redeem}>
              {buttonText}
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
}
