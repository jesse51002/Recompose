// ONE DAY, AS AN ORDER — a day's classes numbered in sequence.
//
// Replaces the base's `DayClassGroup` + `ClassListItem` + `ClassItemTextLeft`
// stack. Same day heading, same classes, same fields on each; a different idea
// about what a schedule IS. Classical Pilates is defined by the order — a fixed
// sequence, each exercise in its place — so a day is numbered, the ordinal
// leads the entry from its own gutter, and the start time is the figure the eye
// lands on.
//
// EVERY FIELD THE BASE ROW CARRIES IS HERE. The time range survives as its two
// ends — the start as the entry's figure, the close and the duration on the
// spec line beneath — rather than as one repeated string. Name, instructor,
// attending count and the 16:9 photograph are all present; the photograph is a
// mounted plate at the right margin, per ../shell/Plate.tsx.
//
// `showBookings` is false on home in the base, so no entry here draws the
// booked confirmation. That is the base's own call, kept.
//
// The tap target is the whole entry and it opens the class — the same
// affordance in the same place, importing the route id rather than receiving a
// callback (Guardrail 6).

import { useMockNav } from '../../../kit/MockNav';
import { ROUTE_CLASS } from '../appAsset';
import { useAppContent } from '../appContent';
import { Plate } from '../shell/Plate';
import { showcaseAssetOrNetwork } from '../showcaseAssets';
import { PersonIcon } from '../support/icons';

import styles from './DayOrder.module.css';
import type { ShowcaseClass, ShowcaseDay } from './homeClass';

export interface DayOrderProps {
  day: ShowcaseDay;
}

export function DayOrder({ day }: DayOrderProps) {
  return (
    <section className={styles.order}>
      <h2 className={styles.dayLabel}>{day.label}</h2>
      <ol className={styles.entries}>
        {day.classes.map((classData, i) => (
          // The schedule is a fixed four-slot list, so the slot index IS the
          // entry's identity; two days can legitimately carry the same name.
          <OrderEntry key={`${String(i)}-${classData.name}`} classData={classData} index={i} />
        ))}
      </ol>
    </section>
  );
}

function OrderEntry({ classData, index }: { classData: ShowcaseClass; index: number }) {
  const nav = useMockNav();
  const { openClassNamed } = useAppContent();
  // The name is carried across rather than the object, because the board
  // repeats the resolved list across the week and an entry's position in it is
  // not a position in `classes`.
  const open = () => {
    openClassNamed(classData.name);
    nav.go(ROUTE_CLASS);
  };
  const [start = classData.timeRange, end] = classData.timeRange.split(' - ');

  return (
    <li
      className={styles.entry}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span className={styles.ordinal}>{String(index + 1).padStart(2, '0')}</span>
      <div className={styles.column}>
        <span className={styles.start}>{start}</span>
        <span className={styles.name}>{classData.name}</span>
        <span className={styles.mentor}>{classData.mentor}</span>
        <span className={styles.spec}>
          {end === undefined ? '' : `until ${end} · `}
          {String(classData.durationMinutes)} min
        </span>
        {classData.attending !== undefined && (
          <span className={styles.attending}>
            <PersonIcon size={12} className={styles.attendingIcon} />
            {String(classData.attending)} attending
          </span>
        )}
      </div>
      <Plate
        className={styles.plate}
        src={showcaseAssetOrNetwork(classData.imageUrl, classData.imageAsset ?? 'class_photo_1.png')}
        slot={classData.themeSlot}
      />
    </li>
  );
}
