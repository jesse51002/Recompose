// ONE DAY OF THE BILL — a brass rule, the day's name, and its works.
//
// The band and the classes ARE the day. It composes ../shell/Section.tsx rather
// than drawing its own rule and label, because a day heading is the same kind
// of thing as every other region opening on the cream ground, and two places
// drawing one rule is how the two drift apart (Guardrail 13).
//
// THE SECTION IS INSET AND ITS BODY IS NOT. The rule and the label take the
// screen gutter; the panel column bleeds back out to both edges through the
// shell's own `bleed`, so the works run edge to edge and stack against one
// another parted only by a hairline. That alternation — a captioned cream
// margin, then a full-bleed announced thing — is the page rhythm the brief
// describes, and it is what stops a column of panels reading as a tray of
// tiles.

import { Section } from '../shell/Section';

import { ClassPanel } from './classItem/ClassPanel';
import styles from './DayClassGroup.module.css';
import type { ShowcaseClass, ShowcaseDay } from './homeClass';

export interface DayClassGroupProps {
  day: ShowcaseDay;
  /**
   * True for the day the board opens on. Its FIRST class takes the billed
   * register; everything else on this day and every later one takes the split.
   */
  opensTheBill: boolean;
}

export function DayClassGroup({ day, opensTheBill }: DayClassGroupProps) {
  return (
    <Section className={styles.day} label={day.label.toUpperCase()} bleed>
      {day.classes.map((classData, i) => (
        <ClassPanel
          // The schedule is a fixed four-slot list, so the slot index IS the
          // row's identity; two days legitimately carry the same class name.
          key={rowKey(i, classData)}
          classData={classData}
          register={opensTheBill && i === 0 ? 'billed' : 'split'}
          // The stagger restarts each day rather than counting down the whole
          // board. Panels open on a fixed interval, so a continuous count would
          // have the twentieth panel wiping 1.3 seconds after the first — long
          // after it has scrolled past, and out of step with whatever the
          // member is actually looking at when they arrive.
          index={i}
        />
      ))}
    </Section>
  );
}

function rowKey(index: number, classData: ShowcaseClass): string {
  return `${String(index)}-${classData.name}`;
}
