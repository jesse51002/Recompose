// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/rank_summary_section.dart, and folds in `rank_streak_hero.dart`
// — WHERE THIS MEMBER STANDS, as one plate.
//
// THIS IS THE SCREEN'S RANK 1 (the emphasis ranking in the `mockup-redesign-
// combatden` skill: "the current RANK and its belt, together"), and it is the
// only region here given a whole field of satin. A name and its picture are ONE
// object, so the belt and the words are mounted as one thing rather than as a
// picture with a caption beside it.
//
// WHAT MOVED INTO IT, AND WHAT MOVED OUT.
//
//   * The STREAK STATEMENT moved IN. The base said it as a sparkle hero
//     stacking "YOU HAVE A / 3 WEEK / STREAK" above the rank block, borrowing
//     the celebration surface's own signature for a screen the member opens on
//     purpose. This design has no sparkle vocabulary and rations its loud
//     gestures to the celebration asset, so the same three words are said the
//     way a bill credits a company: a line at the foot of the plate, under a
//     satin hairline, in the small tracked sans. It stays rank 3 — the words
//     are 10px against a 26px name and a 140px medallion — which is where the
//     ranking puts the streak.
//   * The PLOT and its RANGE SELECTOR moved OUT, into their own ruled section
//     on the cream (./RatingGraph.tsx). The base grouped the three because one
//     of its five arrangements wanted them adjacent; here the plate is a claim
//     and the plot is something you read, and this app alternates whole regions
//     between announced things and read things. Keeping a chart inside the
//     announcement would put a data line on the satin, where brass and hairline
//     rules cannot follow it.
//
// THE SATIN ARRIVES FIRST AND THE NAME IS REVEALED BY IT (../layout_brief.yaml).
// The plate does not fade in as a block: a sheet of the cream ground lies over
// it and retracts downward off its own leading edge, so the field passing over
// the type is what puts the type on screen. One gesture, one element, no
// per-word delay curve to keep in sync.

import { RANK_PART } from './rankParts';
import { RankHeader } from './RankHeader';
import styles from './RankSummarySection.module.css';
import type { ShowcaseRank } from './mockRankProgress';

export interface RankSummarySectionProps {
  rank: ShowcaseRank;
  /** `RankStreakHero.weeks` — the run of consecutive weeks attended. */
  streakWeeks: number;
}

export function RankSummarySection({ rank, streakWeeks }: RankSummarySectionProps) {
  return (
    <section className={styles.plate}>
      <RankHeader rankTitle={rank.name} rankSubtitle={rank.subLabel} />

      {/*
        A parting line WITHIN the satin. It cannot be brass: brass on this field
        measures 1.33:1 and is simply invisible (../showcaseTokens.ts), which is
        why `--sc-satin-hair` exists.
      */}
      <div className={styles.hair} />

      {/*
        `RankStreakHero`'s three strings, verbatim, on one line. The figure is
        the middle rung of the sans and the words around it are the small
        tracked label — a figure is never set larger than the name it describes,
        and on this plate that name is the rank.
      */}
      <p className={styles.streak} data-rank-part={RANK_PART.streakHero}>
        <span className={styles.streakWords}>You have a</span>
        <span className={styles.streakFigure}>{`${String(streakWeeks)} week`}</span>
        <span className={styles.streakWords}>streak</span>
      </p>

      {/*
        The entrance, and it is LAST so it lies over everything it reveals. It
        is a VEIL rather than a clip because a clip removes what it hides from
        hit testing, and nothing in this app may be untappable while it moves —
        there is nothing to tap on this plate, but the rule is the app's and a
        second way of doing an entrance is a second thing to keep in step.
      */}
      <span className={styles.veil} aria-hidden="true" />
    </section>
  );
}
