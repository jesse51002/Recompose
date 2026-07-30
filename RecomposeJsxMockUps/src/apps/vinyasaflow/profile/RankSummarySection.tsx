// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/rank_summary_section.dart — the current rank over its plot over
// the range selector.
//
// IT IS A GROUPING, NOT A WIDGET, and here the grouping is the whole job: the
// rank, the climb into it, and the window that climb is drawn over are ONE
// statement, so they sit `--sc-spacing-large` apart while the regions above and
// below sit `--sc-spacing-big` away. That difference is what tells a reader the
// plot belongs to the belt named over it (Guardrail 13).
//
// THE PLOT IS THE ONLY THING ON THIS SCREEN THAT REACHES BACK TO THE THREAD.
// Its region is `bleed`, so the content escapes the column every other region
// aligns to and the data line can start ON the descent — the line does not stop
// and hand over to a chart, it turns and becomes one. The selector under it goes
// back to the content column, because it is words rather than the line.

import { Region } from '../shell/Thread';

import { RankHeader } from './RankHeader';
import { RatingGraph } from './RatingGraph';
import type { RankLayoutData } from './rankLayoutData';
import styles from './RankSummarySection.module.css';
import { TimeframeSelector } from './TimeframeSelector';

export function RankSummarySection({ data }: { data: RankLayoutData }) {
  return (
    <div className={styles.summary}>
      <RankHeader rankTitle={data.rank.name} rankSubtitle={data.rank.subLabel} />
      {/*
        The label names what the plot already counts, which is typography rather
        than a new fact: the axis it brackets is `classesNeeded` at the top and
        0 at the bottom, and both of those are still drawn on the plot itself.
      */}
      <Region label="Classes into this rank" bleed>
        <div className={styles.plot}>
          <RatingGraph points={data.points} />
        </div>
        <div className={styles.ranges}>
          <TimeframeSelector />
        </div>
      </Region>
    </div>
  );
}
