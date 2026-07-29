// THE FIRST CLASS OF A DAY, given the whole width.
//
// A full-bleed photograph at its own 3:2 with the thread crossing it in the
// knockout ink, the start time set beneath as a figure, and the rest of the
// class's facts under that. It is the same class row as ./ClassItemRow.tsx with
// the same element set and the same tap; what differs is how much of the screen
// it is given, which is a hierarchy decision and belongs to the design.
//
// WHY THE PHOTOGRAPH RUNS EDGE TO EDGE. The studio photography is warm, wide and
// full of the long horizontals of a floor and a row of mats — it earns width
// (../../layout_brief.yaml). The thread cannot simply stop where the picture
// starts, so <BleedPhoto> redraws it on top in linen white and one pixel
// heavier: the same line in two inks, not two devices.
//
// THE TYPE UNDER IT IS INSET TO THE CONTENT COLUMN even though the picture is
// not, so the hero's words line up with every other word on the screen. That
// is the one place this treatment has to know the thread's measurement, and it
// reads it from `--sc-thread-inset` rather than typing the number.

import { ClassItemMeta } from './ClassItemMeta';
import { ClassItemPhoto } from './ClassItemPhoto';
import styles from './ClassItemHero.module.css';
import { useOpenClass } from './useOpenClass';
import type { ShowcaseClass } from '../homeClass';

export interface ClassItemHeroProps {
  classData: ShowcaseClass;
  showBookings: boolean;
}

export function ClassItemHero({ classData, showBookings }: ClassItemHeroProps) {
  const open = useOpenClass(classData.name);
  return (
    <div
      className={styles.hero}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
    >
      <ClassItemPhoto classData={classData} bleed />
      <div className={styles.text}>
        {/*
          The photograph and the name directly beneath it are ONE object and
          rank 1 on this screen. Everything else in this column supports them.
        */}
        <ClassItemMeta
          classData={classData}
          showBookings={showBookings}
          className={styles.info}
          lead
        />
      </div>
    </div>
  );
}
