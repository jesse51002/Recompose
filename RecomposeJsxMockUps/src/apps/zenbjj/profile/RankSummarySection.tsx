// The current rank over its plot over the range selector — the block the
// profile opens its rank half with.
//
// IT IS A GROUPING, NOT A WIDGET. The three are separate components precisely
// so an arrangement can place them apart; this one keeps them together and
// decides how each is drawn.
//
// ZEN BJJ'S THREE DECISIONS, all of them arrangement:
//
//   * the belt LEADS the rank name instead of the pair being centred. A centred
//     badge-and-title is a trophy presentation; a belt on the left with the
//     rank beside it is a line in a record, which is what a rank is here.
//   * the plot sits on a raised CARD rather than floating on the canvas. The
//     material story is "matte forged metal, woven gi and belt-weave fabric" —
//     the graph is the one piece of data on this screen and it gets a surface
//     to lie on.
//   * the range pills run INLINE from the leading edge rather than centred and
//     spread. They are a control, and a control that starts under the left edge
//     of the thing it controls is quieter than one floated across the screen.
//
// Nothing moves off the screen and nothing arrives: the same belt, the same
// rank name and sub-label, the same plot with its two axis labels, and the same
// four ranges with the same one selected.

import { RankHeader } from './RankHeader';
import { RatingGraph } from './RatingGraph';
import styles from './RankSummarySection.module.css';
import { TimeframeSelector } from './TimeframeSelector';
import type { RankLayoutData } from './rankLayoutData';

export function RankSummarySection({ data }: { data: RankLayoutData }) {
  return (
    <div className={styles.summary}>
      {/* `beltLeft` is full-width and leading-aligned, so it needs the page
          gutter; the base's `centred` shrink-wraps and does not. */}
      <div className={styles.inset}>
        <RankHeader
          rankTitle={data.rank.name}
          rankSubtitle={data.rank.subLabel}
          layout="beltLeft"
        />
      </div>
      <RatingGraph points={data.points} card />
      <div className={styles.inset}>
        <TimeframeSelector layout="inline" />
      </div>
    </div>
  );
}
