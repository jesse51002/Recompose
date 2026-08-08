// PROFILE — the member's record.
//
// Replaces ./layouts/RankSparkleStack.tsx. Every part the base stacks is here,
// in the base's order: the streak hero, the rank header with its belt, the
// rating plot, the timeframe selector, the next-rank section with its belt
// preview and progress, and the level-up video row.
//
// What changes is the argument. Classical training is an apprenticeship, so
// this screen is the record of one — an award line with the medallion seated
// against the rank, a plot drawn on a ruled grid, and the climb to the next
// tier as a linear GAUGE with the next medallion waiting at the far end.
//
// THE PROGRESS RING BECOMES A TRACK, and that is a form change rather than a
// dropped element: the base's ring encodes one number, the fraction of the way
// to the next rank, and the gauge encodes the same number and states it in
// figures beside it. Nothing about the member's progress is lost; a circle is
// simply a shape this design does not have.

import { ThemedImage } from 'recompose-react';

import { showcaseAsset } from '../showcaseAssets';
import { SLOT_NEXT_RANK_BELT_IMAGE, SLOT_RANK_BELT } from '../showcaseSlots';
import { GenreShelf } from '../videos/GenreShelf';

import { NEXT_RANK_TITLE, nextRankProgress } from './NextRankSection';
import { RatingGraph } from './RatingGraph';
import type { RankLayoutData } from './rankLayoutData';
import styles from './RecordSheet.module.css';
import { TimeframeSelector } from './TimeframeSelector';

export function RecordSheet({ data }: { data: RankLayoutData }) {
  const { progress, label } = nextRankProgress(data.rank);
  return (
    <div className={styles.record}>
      {/* The screen's one filled block — the same role the store gives the
          points balance. `SparkleHero`'s three parts, verbatim. */}
      <div className={styles.streak}>
        <span className={styles.streakTop}>You have a</span>
        <span className={styles.streakFigure}>{String(data.streakWeeks)} week</span>
        <span className={styles.streakBottom}>Streak</span>
      </div>

      {/* The award line: the medallion seated against the rank it stands for. */}
      <div className={styles.award}>
        <ThemedImage
          className={styles.belt}
          slot={SLOT_RANK_BELT}
          fallbackSrc={showcaseAsset('profile_rank_belt_gold.png')}
          alt=""
        />
        <div className={styles.awardNames}>
          <span className={styles.awardLabel}>Rank</span>
          <span className={styles.rankName}>{data.rank.name}</span>
          {data.rank.subLabel !== '' && (
            <span className={styles.rankSub}>{data.rank.subLabel}</span>
          )}
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Progress</h2>
        <RatingGraph points={data.points} />
        <TimeframeSelector />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{NEXT_RANK_TITLE}</h2>
        <div className={styles.gaugeRow}>
          <div className={styles.gaugeColumn}>
            {/* The figure states what the track shows. */}
            <span className={styles.gaugeFigure}>{Math.round(progress * 100)}%</span>
            <span className={styles.track}>
              <span
                className={styles.fill}
                style={{ width: `${String(Math.round(progress * 100))}%` }}
              />
            </span>
            <span className={styles.gaugeLabel}>{label}</span>
          </div>
          {/* The medallion waiting at the far end of the climb. */}
          <ThemedImage
            className={styles.nextBelt}
            slot={SLOT_NEXT_RANK_BELT_IMAGE}
            fallbackSrc={showcaseAsset('profile_next_rank_belt.png')}
            alt=""
          />
        </div>
      </section>

      {/* Hides itself when the feed carries no educational videos, exactly as
          ./layouts/LevelUpVideos.tsx does. */}
      {data.levelUpVideos.length > 0 && (
        <GenreShelf title="Videos to level up" videos={data.levelUpVideos} />
      )}
    </div>
  );
}
