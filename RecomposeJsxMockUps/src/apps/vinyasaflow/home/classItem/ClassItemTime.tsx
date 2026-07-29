// When the class runs.
//
// Ports MobileApp/lib/features/home/presentation/widgets/class_schedule/
// class_item/class_item_time.dart. Its own component because the lead class
// hoists the time out of the meta column and sets it as a FIGURE — moving one
// component keeps the time rendered exactly once, where re-typing the text in
// the hero would render it twice, which is an added element rather than an
// arrangement.
//
// THE START TIME IS A FIGURE AND THE REST IS NOT. The display face does exactly
// two jobs in this app, and one of them is every figure it counts — a streak, a
// points total, a class time — set large and LIGHT (../../layout_brief.yaml). A
// class's start time is what a member scans a schedule for, so on the lead class
// it is the biggest thing on the row and the rest of the range trails beneath it
// at reading size. Nothing is lost by that split: the end time and the duration
// are both still on screen, in one line, under the time they belong to.
//
// The compact form keeps the whole range on one line at reading size, because a
// second 40px figure three rows down would flatten the hierarchy the lead class
// is there to create.

import type { ShowcaseClass } from '../homeClass';

import styles from './ClassItemTime.module.css';

export interface ClassItemTimeProps {
  classData: ShowcaseClass;
}

export function ClassItemTime({ classData }: ClassItemTimeProps) {
  return (
    <span className={styles.meta}>
      {classData.timeRange} · {String(classData.durationMinutes)} min
    </span>
  );
}
