// Ports ../../../../../../../MobileApp/lib/features/profile/presentation/
// layouts/rank_sparkle_stack.dart.
//
// `RankFormat.sparkleStack` — THE ARRANGEMENT THAT SHIPS TODAY.
//
// Streak hero at full size, then the rank summary (current rank, plot, range
// pills), the next rank, and the level-up videos, each separated by a rule.
// This reproduces the previous ProfileShowcase rendering value for value, so a
// tenant with no layout slot sees no change — and ../__tests__/
// rankFormats.test.tsx asserts exactly that against the recorded baseline.

import { NextRankSection } from '../NextRankSection';
import { RankSummarySection } from '../RankSummarySection';
import type { RankLayoutData } from '../rankLayoutData';
import { RankStreakHero, RankTopbar } from '../rankLayoutData';

import { LevelUpVideos } from './LevelUpVideos';
import styles from './rankLayouts.module.css';

export function RankSparkleStack({ data }: { data: RankLayoutData }) {
  return (
    <div className={styles.page}>
      <RankTopbar data={data} />
      <RankStreakHero weeks={data.streakWeeks} />
      <RankSummarySection data={data} />
      <div className={styles.divider} />
      {/*
        ZEN BJJ takes the `stacked` next-rank arrangement over the base's
        `badgeTrailing`.

        `badgeTrailing` puts a 100px belt inside a progress RING on the right of
        two lines of text — a dial, and dials are the loudest way to say "you
        are 17/25 of the way somewhere". `stacked` reads left to right in
        sentences instead: the belt beside the words, then a full-width bar
        under them, then the count. All four elements are still here (badge,
        title, progress, label) — `NextRankSection` renders every one of them in
        every arrangement, which is exactly why this is a prop.

        It carries no inset of its own (the base's `badgeTrailing` does), so the
        page supplies the gutter its siblings use.
      */}
      <div className={styles.gutterBig}>
        <NextRankSection rank={data.rank} layout="stacked" />
      </div>
      <LevelUpVideos videos={data.levelUpVideos} />
    </div>
  );
}
