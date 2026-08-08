// ONE REWARD, AS A STOP ON THE THREAD.
//
// Replaces the base's `RewardCard.tsx` + `rewardCardParts.tsx` — a rounded
// `card`-filled rectangle with the photograph across its top, five arrangements
// deep. This design has no card, so a reward is not a container: it is a COIN
// on the line with its cost read straight off it and the reward hanging below.
//
// EVERY ELEMENT THE CARD CARRIED IS STILL HERE, and that is the invariant
// rather than a nicety: the image, the title, the points cost, the price label,
// and exactly ONE redeem action belonging to this reward. `data-reward-part`
// names four of them the way the base did, so a census can still count them
// without knowing the arrangement. What changed is which of them leads.
//
// THE COST LEADS, THE PICTURE SUPPORTS, AND THAT IS A LAYOUT ANSWER TO AN
// IMAGERY PROBLEM. The reward photographs are the one set this app is handed
// that does not belong to its world — loud, saturated stock frames of a
// different kind of gym. They are not hidden, recoloured or cropped away; they
// are held SMALL at their own ratio, which is the honest answer
// (../layout_brief.yaml).
//
// THE PHOTOGRAPH'S BOX IS ITS OWN SHAPE. ../shell/Photo.tsx's `InlinePhoto`
// sets WIDTH only and leaves height `auto`, so there is nothing for a crop to
// take. Do not add a height, an `aspect-ratio` or an `object-fit` beside it:
// Guardrail 10b is invisible to typecheck, lint and the token sweep, and the
// layout stays "correct" while the pictures are destroyed.
//
// WHY THE COST IS BESIDE THE COIN RATHER THAN INSIDE IT. A `carry` node is
// `--sc-node-lg` across — 26px — and the line it sits on runs at
// `--sc-thread-x`, 26px from the screen's edge, so a node wide enough to hold
// "3,500" set in the display face at its smallest rung (22px, ~55px of advance)
// would run off the left edge of the phone. The coin and the figure are
// therefore laid out as ONE object on one row, exactly as `Region` lays out a
// node and the label it names — the cost reads out of the coin, and the coin
// stays a coin.
//
// NO REDEEM DIALOG. Dart's `RewardStoreCard` wires every card's action to
// `RewardRedeemDialog`; every showcase surface is a preview inside a phone
// frame that takes no input, so the action is a live <button> with nothing
// behind it, exactly as the base's was. The screen's own exit is the four
// destinations at the foot (Guardrail 4).

import { formatThousands } from '../formatPoints';
import { Figure } from '../shell/Figure';
import { InlinePhoto } from '../shell/Photo';
import { Node } from '../shell/Thread';
import { showcaseAssetOrNetwork } from '../showcaseAssets';

import type { ShowcasePointsStoreItem } from './mockPointsStore';
import styles from './RewardRow.module.css';

/**
 * The `data-reward-part` names, carried over from the base's card so the four
 * fields stay countable from the DOM after the rearrangement. Markup for a
 * census, not for styling — no rule in ./RewardRow.module.css selects on it.
 */
export const REWARD_PART = Object.freeze({
  image: 'image',
  priceTag: 'price-tag',
  title: 'title',
  cost: 'cost',
});

/**
 * What renders when a reward carries no picture of its own. The same bundled
 * default the base's `RewardImageHero` fell through to.
 */
const FALLBACK_REWARD_IMAGE = 'reward_bring_friend.png';

export interface RewardRowProps {
  item: ShowcasePointsStoreItem;
  /** `RewardCard.buttonText` — the CTA's label ("Redeem", "Use"). */
  buttonText: string;
}

export function RewardRow({ item, buttonText }: RewardRowProps) {
  // Theme slot -> injected gym photo -> bundled, the same ladder a schedule row
  // uses. The slot is stamped where the list is built (../RewardsShowcase.tsx's
  // `storeItemsFor`), so every surface showing this reward paints from the same
  // one and the picture cannot drift off the name it was generated from.
  const fallback = showcaseAssetOrNetwork(
    item.imageUrl,
    item.imageAsset ?? FALLBACK_REWARD_IMAGE,
  );

  return (
    <article className={styles.reward}>
      {/* The coin. `carry` is the one node that masks the line behind it. */}
      <Node kind="carry" />

      {/* The cost, read straight off the coin. The screen's second figure. */}
      <p className={styles.cost} data-reward-part={REWARD_PART.cost}>
        <Figure size="sm" className={styles.costValue}>
          {formatThousands(item.pointsCost)}
        </Figure>
        <span className={styles.costUnit}>pts</span>
      </p>

      <div className={styles.detail}>
        <p className={styles.title} data-reward-part={REWARD_PART.title}>
          {item.title}
        </p>
        {/*
          The price label. A brand-coloured chip in the base; here it is type,
          because a chip is a filled box and this design has no box — and
          because terracotta may not set 13px running copy on this canvas.
        */}
        <p className={styles.price} data-reward-part={REWARD_PART.priceTag}>
          {item.priceLabel}
        </p>

        <div className={styles.foot}>
          <span className={styles.photo} data-reward-part={REWARD_PART.image}>
            <InlinePhoto
              slot={item.themeSlot ?? ''}
              fallback={fallback}
              alt={item.title}
            />
          </span>
          <button type="button" className={styles.redeem}>
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  );
}
