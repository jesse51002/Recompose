// ZEN BJJ ONLY — the lead class of the board, given the room the base gives
// every class equally.
//
// WHAT IT IS. A full-width 16:9 photograph with the class's own meta column
// beneath it, at the page gutter. It renders the IDENTICAL element set as
// ../classItem/ClassItemTextLeft.tsx — name, time with duration, instructor,
// attending count, thumbnail — from the identical `classData`, and it opens the
// identical class detail screen on tap. Only the arrangement differs.
//
// WHY IT EXISTS. The base's schedule is a ladder of equal rows: a member
// scanning it has to read all four before deciding anything. Zen BJJ is
// "low-key and focused — a focused pool of light": one class is lit, the rest
// of the hall stays quiet. So the first class of TODAY takes the pool and every
// other class stays a compact row.
//
// THIS IS PROMINENCE, NOT CONTENT. Nothing is added and nothing is removed —
// the demoted rows still carry every field they carried and still open when
// tapped, which is the test the arrangement-only invariant actually asks. The
// board's class count is unchanged; ../DayClassGroup.tsx decides which row is
// the lead and passes nothing else down.

import { useMockNav } from '../../../../kit/MockNav';
import { useAppContent } from '../../appContent';
import { ROUTE_CLASS } from '../../appAsset';
import type { ShowcaseClass } from '../homeClass';

import { ClassItemMeta } from './ClassItemMeta';
import { ClassItemThumb } from './ClassItemThumb';
import styles from './ClassItemLead.module.css';

export interface ClassItemLeadProps {
  classData: ShowcaseClass;
  showBookings: boolean;
}

export function ClassItemLead({ classData, showBookings }: ClassItemLeadProps) {
  // The tap target lives HERE, where the affordance is, and imports its route
  // id rather than taking a callback — the same contract the compact row keeps
  // (Guardrail 6). The name is carried across rather than the object, because
  // the board repeats the resolved list across the week and a row's position in
  // it is not a position in `classes`.
  const nav = useMockNav();
  const { openClassNamed } = useAppContent();
  const open = () => {
    openClassNamed(classData.name);
    nav.go(ROUTE_CLASS);
  };
  return (
    <div
      className={styles.item}
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
      <ClassItemThumb
        classData={classData}
        className={styles.photo}
        imgClassName={styles.photoImg}
      />
      <ClassItemMeta
        classData={classData}
        showBookings={showBookings}
        className={styles.info}
        prominent
      />
    </div>
  );
}
