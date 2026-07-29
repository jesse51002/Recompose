// THE WEEK, AS THE THREAD BOWING SIDEWAYS.
//
// Ports MobileApp/lib/features/home/presentation/widgets/class_schedule/
// date_row.dart — five days, the current one marked — and rebuilds it in this
// fork's own vocabulary: the descending line goes out across the screen,
// THE WHOLE WEEK HAS TO FIT. It briefly used the shared <Bow> shelf, whose gap
// is tuned for video covers — five day pills at that gap overflowed by 89px and
// the fifth day, Sunday, was simply not on screen. The base shows five; a
// selector that silently hides one of its own options has removed it as far as
// a member is concerned. This row owns its measurements so the week fits.
//
// It was once an excursion of a line running
// uses to gather the four things the member carries and the foot uses to thread
// the four destinations, which is what makes sideways movement here read as
// part of one sequence rather than as a second axis bolted on.
//
// THE PILL IS GONE AND THE CIRCLE REPLACES IT. This design has three forms —
// the line, the circle, the photograph — so a bordered chip or an underlined
// tab would be a fourth. A day is a circle on the thread with its name spoken
// beneath it (../layout_brief.yaml: "a day sits in a circle").
//
// TODAY STAYS SELECTED, AND NOTHING RE-SELECTS IT. The real row re-selects as
// the member scrolls past each day heading, measured with a `GlobalKey` per day
// and a scroll listener; reproducing that would mean writing state on every
// scroll frame to drive an affordance this preview has nothing to do with. The
// base made the same call, and the circles are the same non-driving marks its
// pills were — no handler is threaded in, because wiring one would ADD
// navigation the shipped screen does not have.
//
// It is NOT pinned. The base's rail was a `SliverPersistentHeader(pinned:true)`
// held to the top by `position: sticky`; here the thread is the structure and a
// row that detaches from it to float over the content below would cut the line
// the design's one absolute says may never break.


import { DateTab } from './DateTab';
import styles from './DateRow.module.css';
import { formatDayLabel } from './homeScheduleGenerator';

export interface DateRowProps {
  /** The day offsets the board covers — one circle each. */
  dayOffsets: readonly number[];
  /** Which circle reads as the day the member is standing in. */
  currentDayIndex: number;
}

export function DateRow({ dayOffsets, currentDayIndex }: DateRowProps) {
  return (
    <div className={styles.week}>
      <div className={styles.days}>
        {dayOffsets.map((offset) => (
          <DateTab
            key={offset}
            label={formatDayLabel(offset)}
            isSelected={offset === currentDayIndex}
          />
        ))}
      </div>
    </div>
  );
}
