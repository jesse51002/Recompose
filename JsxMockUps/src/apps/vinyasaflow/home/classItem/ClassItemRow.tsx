// EVERY CLASS AFTER THE FIRST — compact, beside its own node on the line.
//
// Replaces the base's `ClassItemTextLeft` (which ported
// MobileApp/.../class_item/layouts/class_item_text_left.dart: meta column left,
// thumbnail right, a rule beneath). Three things about it are different, and
// each is the design rather than a preference:
//
//   * IT HANGS ON THE THREAD. The row is a two-column grid whose first column
//     is the thread's inset, with a <Node> centred on the line — the same
//     construction ../../shell/Thread.tsx uses for a region, so a class reads as
//     a bead on the sequence rather than as a card floating beside it.
//   * THE PHOTOGRAPH SITS BESIDE THE NODE, not opposite the text. The eye then
//     travels line → node → picture → words, which is the order the design
//     reads in everywhere else.
//   * THERE IS NO RULE UNDER IT. The base separated rows with a 2px divider;
//     this app has exactly one line in it and a second horizontal stroke would
//     compete with the one the whole structure hangs from. The gap does the
//     separating instead (Guardrail 13).
//
// The tap is unchanged: the row opens the class detail, which is the app
// asset's first real navigation and the Dart's own.

import { Node } from '../../shell/Thread';

import { ClassItemMeta } from './ClassItemMeta';
import { ClassItemPhoto } from './ClassItemPhoto';
import styles from './ClassItemRow.module.css';
import { useOpenClass } from './useOpenClass';
import type { ShowcaseClass } from '../homeClass';

export interface ClassItemRowProps {
  classData: ShowcaseClass;
  showBookings: boolean;
}

export function ClassItemRow({ classData, showBookings }: ClassItemRowProps) {
  const open = useOpenClass(classData.name);
  return (
    <div
      className={styles.row}
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
      <Node kind="open" />
      <div className={styles.body}>
        <ClassItemPhoto classData={classData} />
        <ClassItemMeta
          classData={classData}
          showBookings={showBookings}
          className={styles.info}
        />
      </div>
    </div>
  );
}
