// The text of a class row: name, time range with duration, instructor,
// attending count, and the booked mark on a page that carries one.
//
// Ports MobileApp/lib/features/home/presentation/widgets/class_schedule/
// class_item/class_item_meta.dart. IDENTICAL IN BOTH TREATMENTS — that is the
// point of pulling it out. A treatment may re-place this column, re-scale its
// gaps and hoist the time out of it; it may not drop a line from it.
//
// THE COLUMN BOX IS NOT HERE, it is the treatment's, which is what lets the
// compact row and the lead class share these lines at two different measures
// without either of them re-typing one.
//
// TIME FIRST, THEN THE NAME. The base led with the name; a schedule is scanned
// by time, and this design puts the figure where the eye lands first
// (../../layout_brief.yaml). Nothing is added or removed by the reorder.
//
// The person and check glyphs the base drew beside the count and the booked
// mark are gone. This app contains three forms — the line, the circle and the
// photograph — and a small pictogram scattered through a list is none of them;
// the count and the mark still say exactly what they said, in words.

import type { ShowcaseClass } from '../homeClass';

import { ClassItemTime } from './ClassItemTime';
import styles from './ClassItemMeta.module.css';

export interface ClassItemMetaProps {
  classData: ShowcaseClass;
  showBookings: boolean;
  /**
   * The column box — flex sizing and the inter-line gap. The treatment's.
   *
   * `string | undefined` rather than `string` because a CSS-module lookup is
   * exactly that under this package's `noUncheckedIndexedAccess`. The prop is
   * still REQUIRED: a treatment cannot forget to lay out its own text.
   */
  className: string | undefined;
  /**
   * False only where the treatment hoists <ClassItemTime> above this column and
   * sets it as a figure (the lead class). The time MOVES; it is never dropped.
   */
  showTime?: boolean;
}

export function ClassItemMeta({
  classData,
  showBookings,
  className,
  showTime = true,
}: ClassItemMetaProps) {
  return (
    <div className={className}>
      {showTime && <ClassItemTime classData={classData} />}
      <span className={styles.name}>{classData.name}</span>
      <span className={styles.quiet}>{classData.mentor}</span>
      {classData.attending !== undefined && (
        <span className={styles.quiet}>{String(classData.attending)} attending</span>
      )}
      {showBookings && classData.isBooked && (
        <span className={styles.booked}>You booked this class!</span>
      )}
    </div>
  );
}
