// Ports ../../../../../../MobileApp/lib/features/profile/presentation/layouts/
// rank_layout_data.dart, plus the streak statement every arrangement carries
// (`rank_streak_hero.dart`).
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
// THE TOPBAR IS NO LONGER IN HERE. This fork's chrome is ../shell/Head.tsx,
// which the screen composes directly as the `Screen`'s `head`; it is the origin
// of the thread and is the one element that does not redraw between screens, so
// it belongs to the shell rather than to this screen's payload.

import type { ReactNode } from 'react';

import { Figure } from '../shell/Figure';
import { Region } from '../shell/Thread';
import type { ShowcaseVideo } from '../showcaseContent';

import { RANK_PART } from './rankParts';
import type { RankPart } from './rankParts';
import styles from './rankLayoutData.module.css';
import type { ShowcaseRank, ShowcaseRankPoint } from './mockRankProgress';

/** Everything this screen may render, gathered once. */
export interface RankLayoutData {
  readonly rank: ShowcaseRank;
  readonly points: readonly ShowcaseRankPoint[];
  readonly streakWeeks: number;
  readonly pointsLabel: string;
  /** The educational head of the loaded feed; empty hides its own section. */
  readonly levelUpVideos: readonly ShowcaseVideo[];
}

/**
 * Stamps a `data-rank-part` on a component this directory does not own, so the
 * invariant gate can count it (see ./rankParts.ts for why the DOM needs one).
 *
 * `display: contents` is what makes that free: the element stays in the DOM and
 * in every query, and generates no box at all — so a marker can never move a
 * pixel of the arrangement it exists to check, and a marker wrapping a region
 * leaves that region a direct child of the body's flex column.
 */
export function RankPartMarker({ part, children }: { part: RankPart; children: ReactNode }) {
  return (
    <div className={styles.marker} data-rank-part={part}>
      {children}
    </div>
  );
}

/**
 * The streak statement — `RankStreakHero`, in this design's register.
 *
 * The base said it as a sparkle hero setting "YOU HAVE A / 3 WEEK / STREAK" in
 * capitals. Both halves of that are things this app does not do: it never sets
 * a label in capitals, and the sparkle burst belongs to the celebration world
 * rather than to a screen the member opens on purpose. So the same three facts
 * are said the way this app says everything — a short spoken label beside a
 * node, over a very large figure set LIGHT, which is the most characteristic
 * mark on any screen here and what the eye lands on first.
 *
 * The node is `calm` (sage) rather than terracotta on the design's own rule:
 * sage marks a thing already earned, already attended, already held, and a
 * streak is exactly that.
 */
export function RankStreakRegion({ weeks }: { weeks: number }) {
  return (
    <RankPartMarker part={RANK_PART.streakHero}>
      <Region label="Your streak" kind="calm">
        <p className={styles.streak}>
          <Figure size="xl">{String(weeks)}</Figure>
          <span className={styles.streakUnit}>weeks</span>
        </p>
      </Region>
    </RankPartMarker>
  );
}
