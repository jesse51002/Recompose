// The member app's POINTS STORE (`PointsStoreScreen`), rebuilt as A BILL OF
// REWARDS.
//
// Ports ../../../../../MobileApp/lib/features/rewards/presentation/layouts/
// rewards_layout.dart. This file is the FRAME; the bill is ./rewards/StoreBill.tsx.
//
// NOT to be confused with ./RewardsCardShowcase.tsx, which ports
// `rewards_card_showcase.dart` — the animated post-class rewards CELEBRATION.
// The two Dart files are named that way and the ports keep their names, because
// a reviewer runs the two side by side. This screen is registered as `store`;
// that one is registered as `rewards`.
//
// WHAT THE FORK CHANGED, AND WHY
//
// The base was a two-up grid of rounded `card`-filled tiles under a sparkling
// hero numeral. This design has no card and no tile, and it does not let a
// figure lead a screen a member browses (./layout_brief.yaml): a reward is one
// of the things this studio ANNOUNCES, so it is a panel on the bill exactly as
// a class and a film are. The opening reward is BILLED — its photograph full
// width at 3:2 with the satin carried underneath as a plinth — and the rest
// take the split panel, picture beside name. Two registers of one unit, never
// a third.
//
// THE ORDER OF THE THREE THINGS ABOVE THE BILL CHANGED TOO. The base ran tabs,
// then the balance, then the store. The tabs are the control that switches the
// list, so they sit directly on top of the list they switch and nothing comes
// between them (Guardrail 13); the balance is a fact the member carries, so it
// sits with the identity at the head of the screen.
//
// EMPHASIS. Rank 1 is each reward's NAME and its PHOTOGRAPH, together and as
// one object — the pipeline generates the picture FROM the copy, so they are
// one claim about one thing. Rank 2 is its points cost, rank 3 the member's
// balance, and the price label and the tabs support. That ordering is a
// property of the product rather than of this design, so it is inherited, not
// chosen: see `.claude/skills/mockup-redesign-combatden`.
//
// A STATIC SURFACE. `loop` / `onCycleComplete` exist on the Dart showcase
// widget only to keep the seven screens' API uniform and are unused there; the
// port does not take them. The only motion here is the panels' own entrance —
// each one's satin field wiping open on a fixed interval down the column, which
// ../shell/Panel.tsx owns.
//
// WHAT IS THE GYM'S AND WHAT IS THE MEMBER'S: see ./rewards/rewardsLayoutData.ts.

import { SLOT_REWARDS, slotAt } from './showcaseSlots';

import { PointsHeadline } from './rewards/PointsHeadline';
import type { ShowcasePointsStoreItem } from './rewards/mockPointsStore';
import { SHOWCASE_POINTS_STORE_DATA } from './rewards/mockPointsStore';
import type { RewardsLayoutData } from './rewards/rewardsLayoutData';
import { RewardsTabs } from './rewards/RewardsTabs';
import { RewardsTopbar } from './rewards/RewardsTopbar';
import { StoreBill } from './rewards/StoreBill';
import { FootNav } from './shell/FootNav';
import { Screen } from './shell/Screen';
import type { ShowcaseReward } from './showcaseContent';

/** `RewardsShowcase.gymName`'s default. */
const DEFAULT_GYM_NAME = 'Your Gym';

/**
 * The injected gym rewards as store items, or the bundled sample ones. Ports
 * the `rewards != null && rewards.isNotEmpty` branch in `build`.
 *
 * THE THEME SLOT IS STAMPED HERE, where the list is built, and both branches
 * get one — Guardrail 10's "stamp at the source". No panel re-derives which
 * slot it paints with, so rearranging the bill cannot make a picture drift off
 * the name it was generated from. The bundled set is stamped too: it is what
 * renders before any theme loads.
 *
 * The item's own `imageAsset` stays absent for an injected reward, exactly as
 * Dart leaves it null: the gym's photo URL is what renders, and a dead one
 * degrades to the panel's own empty field (../shell/Panel.tsx).
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

  // One payload, handed unchanged to the head and the bill. There is
  // deliberately no second source for either of them to reach into.
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
      head={<RewardsTopbar data={data} />}
      // `reward` is the STORE — the four destinations are named for the CONCEPT
      // rather than the screen, which is the Dart's own mismatch, kept so the
      // four `nav_*` icon slots keep resolving against the names the pipeline
      // generates them under.
      foot={<FootNav selected="reward" />}
      // The bill runs past the fold: it is a surface a member browses, not a
      // single-viewport composition. No `prose` inset — a panel is full bleed,
      // and the three cream regions above it carry their own gutter.
      scroll
    >
      <PointsHeadline points={data.totalPoints} />
      <RewardsTabs active="pointsStore" />
      <StoreBill items={data.items} />
    </Screen>
  );
}
