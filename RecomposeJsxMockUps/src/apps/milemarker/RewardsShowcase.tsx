// STORE — the member app's POINTS STORE (`PointsStoreScreen`).
//
// NOT to be confused with ./RewardsCardShowcase.tsx, which ports
// `rewards_card_showcase.dart` — the animated post-class rewards CELEBRATION.
// The two Dart files are named that way and the ports keep their names, because
// a reviewer runs the two side by side. This screen is registered as `store`;
// that one is registered as `rewards`.
//
// The base draws a sparkle "YOU EARNED / 3,400 / POINTS" hero over a grid of
// image cards. This rebuilds it as a PRICE LIST: the balance is the one figure
// in the sky, and the store below is a run of entries read down their right
// edge — reward struck into a disc, name and price label in the middle, cost in
// tabular figures hard against the margin.
//
// EVERY ELEMENT IS STILL HERE: the topbar's rank badge and points (now the sky's
// mark and headline), the points headline, the two category tabs, and every
// reward with its image, title, points cost and price label.
//
// THE REWARD IMAGES ARE FRAMES, NOT DISCS. Every generated reward photograph is
// 3:2 (1200x800); the generated cut-outs are 0.99-1.00. A disc costs a cut-out
// nothing and costs a landscape photograph a third of its width, which is the
// rule ../layout_brief.yaml now states outright.
//
// THE HERO'S SPARKLE SCATTER IS GONE, and it is the one thing on this screen
// that is a genuine removal of ORNAMENT rather than of content. The figure it
// decorated is still here and larger; the scatter was a treatment of that
// figure, not an element of the screen. The direction allows no ornament that
// paints outside its lane.

import { formatThousands } from './formatPoints';
import { cx } from './cx';
import { showcaseAsset, showcaseAssetOrNetwork } from './showcaseAssets';
import type { ShowcaseReward } from './showcaseContent';
import {
  SLOT_RANK_BELT,
  SLOT_REWARDS,
  SLOT_SINGLE_POINT,
  slotAt,
} from './showcaseSlots';
import type { ShowcasePointsStoreItem } from './rewards/mockPointsStore';
import { SHOWCASE_POINTS_STORE_DATA } from './rewards/mockPointsStore';
import styles from './rewards/StoreList.module.css';
import { Disc } from './shell/Disc';
import { Frame } from './shell/Frame';
import { Lane } from './shell/Lane';
import { LastLane } from './shell/LastLane';
import { Screen } from './shell/Screen';
import { TabRow } from './shell/TabRow';
import { Sky, SkyMark } from './shell/Sky';

/** `ShowcaseScreen.build`'s `gymName` default. */
const DEFAULT_GYM_NAME = 'Your Gym';

/**
 * The gym's real rewards mapped onto the store's shape, or the bundled sample.
 *
 * The generated `rewards` slot is assigned BY POSITION here, at the source,
 * so every screen rendering the same reward inherits the same slot and the
 * store and the celebration carousel cannot drift apart (Guardrail 7/10).
 */
function storeItemsFor(
  rewards: readonly ShowcaseReward[] | null | undefined,
): readonly ShowcasePointsStoreItem[] {
  if (rewards === null || rewards === undefined || rewards.length === 0) {
    return SHOWCASE_POINTS_STORE_DATA.items.map((item, i) => ({
      ...item,
      themeSlot: slotAt(SLOT_REWARDS, i),
    }));
  }
  return rewards.map((reward, i) => ({
    title: reward.title,
    priceLabel: reward.priceLabel,
    pointsCost: reward.pointsCost,
    imageUrl: reward.imageUrl,
    themeSlot: slotAt(SLOT_REWARDS, i),
  }));
}

export interface RewardsShowcaseProps {
  /** The host gym's name. There is no gym in this browser. */
  gymName?: string;
  /** The host gym's real logo URL. Absent here. */
  gymLogoSrc?: string | undefined;
  /** The gym's real rewards; null falls back to the bundled sample items. */
  rewards?: readonly ShowcaseReward[] | null;
}

export function RewardsShowcase({
  gymName: _gymName = DEFAULT_GYM_NAME,
  gymLogoSrc: _gymLogoSrc,
  rewards,
}: RewardsShowcaseProps) {
  const sample = SHOWCASE_POINTS_STORE_DATA;
  const items = storeItemsFor(rewards);

  return (
    <Screen
      shortSky
      sky={
        <Sky
          lead={
            /*
              The rank medallion belongs WITH the balance, which is where the
              base has it — its topbar carries rank and points on one row. It
              shipped as a lane of its own at the foot of the shop, which
              preserved the element and told the member nothing: a badge in a
              section by itself is an element in storage. `mockup-qa` Pass 1b.
            */
            <span className={styles.standing}>
              <Disc
                size={26}
                slot={SLOT_RANK_BELT}
                src={showcaseAsset(sample.rankBadgeAsset)}
                object
              />
              <span className={styles.standingLabel}>Your rank</span>
            </span>
          }
          label="You earned"
          headline={formatThousands(sample.totalPoints)}
          aside="Points"
          mark={
            <SkyMark
              small
              slot={SLOT_SINGLE_POINT}
              fallbackSrc={showcaseAsset('single_point.png')}
            />
          }
        />
      }
      foot={<LastLane selected="reward" />}
    >
      {/* Labels, not controls — see <TabRow>. */}
      <Lane first flush>
        <TabRow labels={['Points Store', 'My Rewards']} selected={0} />
      </Lane>

      <Lane label="Redeem" labelAside={`${String(items.length)} items`} bleed flush>
        {items.map((item, i) => (
          <StoreEntry key={`${item.title}-${String(i)}`} item={item} first={i === 0} />
        ))}
      </Lane>
    </Screen>
  );
}

function StoreEntry({ item, first }: { item: ShowcasePointsStoreItem; first: boolean }) {
  const src = showcaseAssetOrNetwork(item.imageUrl, item.imageAsset ?? 'reward_gloves.png');
  return (
    <div className={cx(styles.item, first && styles.itemFirst)}>
      <Frame width={78} ratio={3 / 2} slot={item.themeSlot} src={src} />
      <span className={styles.itemBody}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.price}>{item.priceLabel}</span>
      </span>
      <span className={styles.cost}>
        <span className={styles.costFigure}>{formatThousands(item.pointsCost)}</span>
        <span className={styles.costUnit}>Points</span>
      </span>
    </div>
  );
}
