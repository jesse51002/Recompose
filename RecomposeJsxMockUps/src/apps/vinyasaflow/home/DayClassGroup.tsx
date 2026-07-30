// ONE DAY OF THE SCHEDULE — a node on the line, the day spoken beside it, and
// the day's classes hanging below.
//
// Ports ../../../../../../CRM/lib/showcase/home/day_class_group.dart (MobileApp's
// `DayClassGroup`): a day label over its class rows. The base upper-cased the
// label; this app never sets a word in capitals, so the day announces itself the
// way the teacher would — a short phrase in the body sans beside its node.
//
// HIERARCHY IS USED UNEQUALLY, AND THAT IS THE POINT. The day's FIRST class is
// given a full-bleed photograph at its own 3:2 with the thread crossing it in
// knockout; every class below it is a compact row with a small photograph beside
// its own node. A schedule where every row is a hero is a gallery, and one where
// nothing is is a spreadsheet — ../layout_brief.yaml. Nothing is dropped and
// nothing is added by that: a demoted row still carries its name, its time
// range with duration, its instructor, its attending count and its picture, and
// still opens the same class when tapped.
//
// The day heading is a <Region> rather than a heading element in the display
// face because this app's display face has exactly two jobs, and neither is a
// section heading: it sets the ONE headline that names a screen (here the studio
// name, in ../shell/Head.tsx) and every figure the app counts.

import { Region } from '../shell/Thread';

import { ClassListItem } from './ClassListItem';
import styles from './DayClassGroup.module.css';
import type { ShowcaseClass, ShowcaseDay } from './homeClass';

export interface DayClassGroupProps {
  day: ShowcaseDay;
  /** The day happening now — the line swells into a filled stop for it. */
  isToday?: boolean;
  showBookings?: boolean;
}

export function DayClassGroup({
  day,
  isToday = false,
  showBookings = true,
}: DayClassGroupProps) {
  const [lead, ...rest] = day.classes;
  return (
    <section className={styles.day}>
      <Region label={day.label} kind={isToday ? 'solid' : 'open'} bleed>
        {lead === undefined ? null : (
          <ClassListItem classData={lead} showBookings={showBookings} lead />
        )}
      </Region>
      {rest.length > 0 && (
        <div className={styles.rows}>
          {rest.map((classData, i) => (
            // The schedule is a fixed four-slot list, so the slot index IS the
            // row's identity; two days can legitimately carry the same class.
            <ClassListItem
              key={rowKey(i + 1, classData)}
              classData={classData}
              showBookings={showBookings}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function rowKey(index: number, classData: ShowcaseClass): string {
  return `${String(index)}-${classData.name}`;
}
