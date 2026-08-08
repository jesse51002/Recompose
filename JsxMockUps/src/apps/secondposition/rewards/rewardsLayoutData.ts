// Ports ../../../../../../MobileApp/lib/features/rewards/presentation/layouts/
// rewards_layout_data.dart — everything the points store renders.
//
// ONE PAYLOAD FOR THE WHOLE SCREEN: the identity and the four carried facts,
// the member's point total, and the store's rewards. The arrangement rearranges
// this object; it never reaches past it for data the shipped screen did not
// already have. That is the whole invariant, and handing the head and the bill
// the SAME object is what makes it structural rather than a promise — there is
// no second source to reach for.
//
// Dart resolves five `RewardsFormat` values against this. There are no presets
// in this package, so the fork keeps the payload and drops the switch.
//
// WHAT IS THE GYM'S AND WHAT IS THE MEMBER'S. `gymName` / `gymLogoSrc` are the
// HOST's gym identity and are not customization slots — a theme pick must never
// rename the mock. `items` is the gym's real catalogue when one is injected.
// Everything else — the streak, the points balance, the rank badge — is
// PER-MEMBER chrome and stays sample data even then.
//
// NO LOAD STATE. Dart carries `isLoading` / `statusMessage` because its store
// loads over the network and its arrangements must all keep the three states
// that has (loading, error, empty). This browser's content ladder resolves
// real -> fetched -> BUNDLED (../useShowcaseContent.ts), so the store always
// has items and there is no fourth state to arrange. Porting a status widget
// nothing can ever show would be inventing a screen, not mirroring one.

import type { ShowcasePointsStoreItem } from './mockPointsStore';

export interface RewardsLayoutData {
  /** The host gym's name. There is no gym in this browser. */
  readonly gymName: string;
  /** The host gym's real logo URL. Absent here, which arms the theme's logo. */
  readonly gymLogoSrc?: string | undefined;
  readonly streakDays: number;
  readonly pointsLabel: string;
  /**
   * The head's belt art. Carried because the ported payload carries it;
   * ../shell/Masthead.tsx resolves the belt itself from `SLOT_RANK_BELT`, so
   * nothing on this screen passes it on. See ./mockPointsStore.ts.
   */
  readonly rankBadgeAsset: 'icon_rank_belt.png';
  /**
   * The member's points balance — the headline, and the yardstick
   * ./rewardBands.ts bands against. Already on the screen today.
   */
  readonly totalPoints: number;
  readonly items: readonly ShowcasePointsStoreItem[];
}
