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
// THE NAME LEADS, AND IT LEADS WITH ITS PHOTOGRAPH. This file briefly did the
// opposite, on the reasoning that "a schedule is scanned by time" — which is
// wrong, and produced a screen whose loudest element was the clock. A member
// opens a schedule to choose a CLASS; the time is how they choose between
// classes once one has caught their eye.
//
// `mockup-redesign-combatden`'s emphasis ranking is the authority: rank 1 on
// `home` is the class name TOGETHER WITH its photograph — one object, not a
// thing and its decoration, because the pipeline generates the picture FROM the
// name (`class_photo_2` declares `depends_on_text: [class_name_2]`). The time,
// the instructor and the attending count are supporting.
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
   * False only where the treatment places <ClassItemTime> itself. The time
   * MOVES; it is never dropped.
   */
  showTime?: boolean;
  /**
   * The day's first class, which is given the width and a display-size name.
   * Only the SCALE of the name changes — every line here is present either way.
   */
  lead?: boolean | undefined;
}

export function ClassItemMeta({
  classData,
  showBookings,
  className,
  showTime = true,
  lead = false,
}: ClassItemMetaProps) {
  return (
    <div className={className}>
      <span className={lead ? styles.nameLead : styles.name}>{classData.name}</span>
      {showTime && <ClassItemTime classData={classData} />}
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
