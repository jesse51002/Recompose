// The member app's POINTS STORE (`PointsStoreScreen`), rebuilt on the thread.
//
// Ports ../../../../../MobileApp/lib/features/rewards/presentation/layouts/
// rewards_layout.dart. This file is the FRAME; the body is ./rewards/StoreBody.tsx.
//
// NOT to be confused with ./RewardsCardShowcase.tsx, which ports
// `rewards_card_showcase.dart` — the animated post-class rewards CELEBRATION.
// The two Dart files are named that way and the ports keep their names, because
// a reviewer runs the two side by side. This screen is registered as `store`;
// that one is registered as `rewards`.
//
// WHAT THE FORK CHANGED, AND WHY
//
// The base was a two-up grid of rounded cards sitting on a tinted `card` fill.
// This design has no card, no panel and no tinted container — a box would be a
// FOURTH form beside the line, the circle and the photograph
// (../layout_brief.yaml). So the store is THREADED instead: each reward is a
// stop on the same terracotta line every other screen hangs on, marked by a
// coin — a `carry` node — with its cost read straight off the node in the
// display face and the reward hanging below it.
//
// EVERY FIELD SURVIVES THE MOVE. Image, title, points cost, price label and the
// one Redeem action per reward are all still there, the tabs still switch
// between Points store and My rewards, and the member's balance still leads the
// screen. What changed is arrangement and prominence: the cost leads and the
// picture supports.
//
// THE REWARD PHOTOGRAPHY IS THE ONE SET THAT DOES NOT BELONG TO THIS WORLD —
// loud, saturated stock frames of a different kind of gym. The brief's answer is
// a LAYOUT answer rather than a filter: hold them small, at their own ratio,
// with the type and the cost leading. ./rewards/RewardRow.tsx is where that
// lands, and it is why no reward here is promoted to a full-bleed hero the way
// the schedule's first class is.
//
// A STATIC SURFACE. `loop` / `onCycleComplete` exist on the Dart showcase widget
// only to keep the seven screens' API uniform and are unused there; the port
// does not take them. Nothing on this screen animates on its own — the entrance
// is the thread drawing itself, which the shell owns.
//
// WHAT IS THE GYM'S AND WHAT IS THE MEMBER'S: see ./rewards/rewardsLayoutData.ts.

import type { ShowcasePointsStoreItem } from './rewards/mockPointsStore';
import { SHOWCASE_POINTS_STORE_DATA } from './rewards/mockPointsStore';
import type { RewardsLayoutData } from './rewards/rewardsLayoutData';
import { StoreBody } from './rewards/StoreBody';
import { Head } from './shell/Head';
import { Screen } from './shell/Screen';
import { ThreadNav } from './shell/ThreadNav';
import type { ShowcaseReward } from './showcaseContent';
import { SLOT_REWARDS, slotAt } from './showcaseSlots';

/** `RewardsShowcase.gymName`'s default. */
const DEFAULT_GYM_NAME = 'Your Gym';

/**
 * The injected gym rewards as store items, or the bundled sample ones. Ports
 * the `rewards != null && rewards.isNotEmpty` branch in `build`.
 *
 * THE THEME SLOT IS STAMPED HERE, where the list is built, and both branches
 * get one — Guardrail 10's "stamp at the source". No row re-derives which slot
 * it paints with, so rearranging the store cannot make a picture drift off the
 * name it was generated from. The bundled set is stamped too: it is what
 * renders before any theme loads.
 *
 * An injected reward's own `imageAsset` stays absent, exactly as Dart leaves it
 * null: the gym's photo URL is what renders beneath the slot.
 */
export function storeItemsFor(
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
  gymName = DEFAULT_GYM_NAME,
  gymLogoSrc,
  rewards,
}: RewardsShowcaseProps) {
  const sample = SHOWCASE_POINTS_STORE_DATA;

  // One payload, handed unchanged to the body. There is deliberately no second
  // source for the arrangement to reach into.
  const data: RewardsLayoutData = {
    gymName,
    gymLogoSrc,
    streakDays: sample.streakDays,
    pointsLabel: sample.pointsLabel,
    rankBadgeAsset: sample.rankBadgeAsset,
    totalPoints: sample.totalPoints,
    items: storeItemsFor(rewards),
  };

  return (
    <Screen
      head={
        <Head
          gymName={data.gymName}
          gymLogoSrc={data.gymLogoSrc}
          streakDays={data.streakDays}
          pointsLabel={data.pointsLabel}
        />
      }
      // `reward` is the STORE — the four destinations are named for the CONCEPT
      // rather than the screen, which is the Dart's own mismatch, kept so the
      // four `nav_*` icon slots keep resolving against the names the pipeline
      // generates them under.
      foot={<ThreadNav selected="reward" />}
      // The store is a surface a member browses, not a single-viewport
      // composition, so the thread keeps descending past the fold.
      bodyScroll
    >
      <StoreBody data={data} />
    </Screen>
  );
}
