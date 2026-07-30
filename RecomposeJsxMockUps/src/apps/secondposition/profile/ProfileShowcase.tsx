// THE MEMBER'S RANK AND PROGRESS.
//
// Ports ../../../../../../MobileApp/lib/features/profile/presentation/screens/
// profile_screen.dart, redesigned for Second Position — read
// ../layout_brief.yaml before changing anything here.
//
// THE ELEMENT SET IS THE BASE'S, EXACTLY. The masthead with its four carried
// items, the streak statement, the current rank with its belt, the plot with
// its timeframe selector, the next rank with its circular progress badge and
// belt preview, the level-up films, and the four destinations at the foot.
// Nothing dropped, nothing added. What changed is the arrangement.
//
// WHAT THIS SCREEN IS, IN THE DESIGN'S OWN TERMS. The app is a company's season
// billed, and this is the page of the programme that names the DANCER. So it
// opens with one plate: the member's belt struck as an insignia, centred on a
// full field of satin with air around it and its name beneath, credited at the
// foot with the run of weeks they have kept. That is rank 1 and it is
// unmistakable before anything is read — it is the only coloured field above
// the fold and it holds the largest name and the largest object on the screen.
//
// Everything under it is on the cream reading ground, opened by brass rules,
// and steps down in exactly the order the emphasis ranking gives:
//
//   * NEXT RANK (rank 2) — the belt they are working toward, mounted the same
//     way at half the scale, with the distance still to go drawn as a measured
//     ring around it rather than a bar (./NextRankSection.tsx).
//   * the STREAK and the CLASS COUNTS (rank 3) — the streak credited on the
//     plate, the counts stated by the ring's own figure and the plot's axis.
//   * the PLOT and the SHELF (supporting) — a short chart bracketed by two
//     brass rules, and the films below it. The chart is deliberately the
//     smallest of the base's three heights: a wide drawing on an empty ground
//     is the easiest thing on this screen to let grow until it leads, and the
//     ranking says it must not (./RatingGraph.tsx).
//
// THE SATIN HOLDS ITS THIRD. The plate above the fold, the film plinths on the
// shelf, and the band at the foot — the brief asks for something between a
// third and a half of the surface, and the plate alone is about 40% of the
// first screenful.
//
// NO DART SHOWCASE COUNTERPART. Like ../videos/VideoShowcase.tsx, the Flutter
// preview never carried this screen, so it is a first port straight from the
// member app.
//
// ONE OF THE TWO SHAPES. `profile_screen.dart` on main chooses between the rank
// shape and `RanklessProfileBody` on the gym FLAG `selectedMember.gymRankEnabled`.
// There is no gym in this browser and therefore no flag; the rank shape is the
// one worth previewing, because it is the one carrying the two belt slots and
// the graph — the rank-less shape is the same screen with the rank block
// removed, which would preview strictly less of the theme.

import { FootNav } from '../shell/FootNav';
import { Masthead } from '../shell/Masthead';
import { Screen } from '../shell/Screen';
import type { ShowcaseVideo } from '../showcaseContent';
import { levelUpVideos } from '../videos/videoSelectors';

import { LevelUpVideos } from './LevelUpVideos';
import { NextRankSection } from './NextRankSection';
import { RankSummarySection } from './RankSummarySection';
import { RatingGraph } from './RatingGraph';
import type { RankLayoutData } from './rankLayoutData';
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
  // loaded feed. It hides itself when empty — see ./LevelUpVideos.tsx.
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
        <Masthead
          mode="plain"
          gymName={gymName}
          logoSrc={gymLogoSrc}
          // Every screen configures the masthead identically, including the
          // rungs this mode does not draw: `plain` suppresses the big mark, and
          // a flag that differs per screen is how one loaded theme ends up
          // drawing two different marks on two tabs.
          themeTabPreview
          streakDays={data.streakWeeks}
          pointsLabel={data.pointsLabel}
        />
      }
      foot={<FootNav selected="rank" />}
      scroll
    >
      <div className={styles.body}>
        {/*
          The plate runs edge to edge, so it sits OUTSIDE the reading inset. The
          two ruled sections under it are prose regions and take the gutter; the
          shelf below them brings its own, because its strip has to run off both
          edges (Guardrail 13's warning about a container whose padding was
          removed for one child and then stranded the next one).
        */}
        <RankSummarySection rank={data.rank} streakWeeks={data.streakWeeks} />

        <div className={styles.reading}>
          <NextRankSection rank={data.rank} />
          <RatingGraph points={data.points} />
        </div>

        <LevelUpVideos videos={data.levelUpVideos} />
      </div>
    </Screen>
  );
}
