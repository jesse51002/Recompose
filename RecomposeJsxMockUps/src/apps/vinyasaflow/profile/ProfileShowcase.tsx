// THE MEMBER'S RANK AND PROGRESS, hung on the thread.
//
// Ports ../../../../../../MobileApp/lib/features/profile/presentation/screens/
// profile_screen.dart, and redesigned for Vinyasa Flow — see ../layout_brief.yaml.
//
// THE ELEMENT SET IS THE BASE'S, EXACTLY. The head with its four carried items,
// the streak statement, the current rank with its belt, the plot with its
// timeframe selector, the next rank with its circular progress badge and belt
// preview, the level-up videos, and the four destinations at the foot. Nothing
// dropped, nothing added; what changed is the arrangement, and every piece of it
// is drawn from the three forms this design owns — the line, the circle, and the
// photograph.
//
// WHAT THIS SCREEN IS, IN THE DESIGN'S OWN TERMS. It is the screen the direction
// fits best, because every fact it holds is already a thing on a sequence:
//
//   * the current rank is a MEDALLION THE THREAD PASSES THROUGH — the disc sits
//     on the line's own centre, so the stroke descends into it and out the
//     bottom (./RankHeader.tsx);
//   * the plot is the THREAD CONTINUING AS A DATA LINE — one unbroken stroke in
//     the thread's own ink, starting at the descent's x and running out to the
//     right edge, with no fill and no gridline that could read as a box
//     (./RatingGraph.tsx);
//   * the progress badge is the THREAD WINDING AROUND A RING — an arc in the
//     thread's stroke that fills by drawing (./NextRankSection.tsx);
//   * the level-up shelf is the line BOWING SIDEWAYS to gather a row of frames,
//     which is this app's only horizontal scroller (./layouts/LevelUpVideos.tsx).
//
// THE SHELL DRAWS THE DESCENT ITSELF, once, on the screen root, so nothing here
// has to continue it and no arrangement of these regions can break it.
//
// NO DART SHOWCASE COUNTERPART. Like ../videos/VideoShowcase.tsx, the Flutter
// preview never carried this screen.
//
// ONE OF THE TWO SHAPES. `profile_screen.dart` on main chooses between the rank
// shape and `RanklessProfileBody` on the gym FLAG `selectedMember.gymRankEnabled`.
// There is no gym in this browser and therefore no flag; the rank shape is the
// one worth previewing, because it is the one carrying the two belt slots and
// the graph.

import { Head } from '../shell/Head';
import { Screen } from '../shell/Screen';
import { ThreadNav } from '../shell/ThreadNav';
import type { ShowcaseVideo } from '../showcaseContent';
import { levelUpVideos } from '../videos/videoSelectors';

import { LevelUpVideos } from './layouts/LevelUpVideos';
import { NextRankSection } from './NextRankSection';
import { RankSummarySection } from './RankSummarySection';
import type { RankLayoutData } from './rankLayoutData';
import { RankStreakRegion } from './rankLayoutData';
import styles from './ProfileShowcase.module.css';
import {
  SHOWCASE_PROFILE_POINTS_LABEL,
  SHOWCASE_PROFILE_STREAK_WEEKS,
  SHOWCASE_RANK,
  SHOWCASE_RANK_POINTS,
} from './mockRankProgress';

/** The default every surface in this island shares. */
const DEFAULT_GYM_NAME = 'Your Gym';

export interface ProfileShowcaseProps {
  /** The host gym's name. There is no gym in this browser. */
  gymName?: string;
  /** The host gym's real logo URL. Absent here. */
  gymLogoSrc?: string | undefined;
  /** The resolved feed; the level-up shelf is its educational head. */
  videos: readonly ShowcaseVideo[];
}

export function ProfileShowcase({
  gymName = DEFAULT_GYM_NAME,
  gymLogoSrc,
  videos,
}: ProfileShowcaseProps) {
  // `LevelUpVideosSection` asks the portal for `videoType: educational,
  // limit: 10`; there is no portal here, so the same narrowing runs over the
  // loaded feed. It hides itself when empty — see ./layouts/LevelUpVideos.tsx.
  const data: RankLayoutData = {
    rank: SHOWCASE_RANK,
    points: SHOWCASE_RANK_POINTS,
    streakWeeks: SHOWCASE_PROFILE_STREAK_WEEKS,
    pointsLabel: SHOWCASE_PROFILE_POINTS_LABEL,
    levelUpVideos: levelUpVideos(videos),
  };

  return (
    <Screen
      head={
        <Head
          gymName={gymName}
          gymLogoSrc={gymLogoSrc}
          // The theme's own `logo_primary` as the middle rung of the mark's
          // ladder, so switching theme re-logos this screen exactly as it does
          // the schedule. The base passed nothing here, which meant one loaded
          // theme drew two different marks on two screens — Guardrail 7's shape.
          themeTabPreview
          streakDays={data.streakWeeks}
          pointsLabel={data.pointsLabel}
        />
      }
      foot={<ThreadNav selected="rank" />}
      bodyScroll
    >
      {/*
        The regions, in the order the line reaches them. The gap BETWEEN regions
        is `--sc-spacing-big` and the gap inside one is `--sc-spacing-medium`
        (shell/Thread.module.css) — that difference is what does the grouping,
        and getting it backwards is the failure Guardrail 13 describes.
      */}
      <div className={styles.body}>
        <RankStreakRegion weeks={data.streakWeeks} />
        <RankSummarySection data={data} />
        <NextRankSection rank={data.rank} />
        <LevelUpVideos videos={data.levelUpVideos} />
      </div>
    </Screen>
  );
}
