// Ports ../../../../../../MobileApp/lib/features/profile/presentation/layouts/
// rank_layout_data.dart — everything this screen may render, gathered once.
//
// THE SCREEN RENDERS EVERY ELEMENT IN THIS PAYLOAD: the streak, the current
// rank, the plot with its range selector, all four next-rank elements, and the
// level-up videos. The fork may move them and change their prominence. It may
// not drop one, add one, or reach for anything not in here — which is the
// arrangement-only invariant, stated as a data shape.
//
// Note what is deliberately absent: any notion of rank HISTORY. The screen has
// the current rank and the next one and nothing else, so no arrangement can
// imply a progression it cannot show. (./mockRankProgress.ts's series is the
// member's class COUNT toward the rank they already hold — not a ladder of past
// ranks.)
//
// IT IS A TYPE AND NOTHING ELSE NOW, where the base's file also built the
// screen's topbar and its streak hero. Both moved:
//
//   * the topbar is ../shell/Masthead.tsx, which the screen composes directly
//     as the `Screen`'s `head`. It is shared chrome, not this screen's payload.
//   * the streak statement is said by ./RankSummarySection.tsx, on the satin
//     plate, because in this design it is part of what the plate CLAIMS about
//     the member rather than a hero of its own.
//
// The gym name and logo left with the topbar for the same reason: the screen
// takes them as props and hands them to the masthead, and no region below the
// rule has any use for them.

import type { ShowcaseVideo } from '../showcaseContent';

import type { ShowcaseRank, ShowcaseRankPoint } from './mockRankProgress';

/** Everything a Profile region may render, gathered once. */
export interface RankLayoutData {
  readonly rank: ShowcaseRank;
  readonly points: readonly ShowcaseRankPoint[];
  readonly streakWeeks: number;
  readonly pointsLabel: string;
  /** The educational head of the loaded feed; empty hides its own section. */
  readonly levelUpVideos: readonly ShowcaseVideo[];
}
