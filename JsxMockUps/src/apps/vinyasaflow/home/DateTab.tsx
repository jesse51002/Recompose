// ONE DAY ON THE WEEK'S BOW — a circle with its name spoken beneath it.
//
// Ports ../../../../../../CRM/lib/showcase/home/date_tab.dart (MobileApp's
// `DateTab`), rebuilt in this fork's vocabulary. The base drew a pill with an
// underline under the selected day; both are fourth forms in a design that
// contains only the line, the circle and the photograph, so the day IS a
// circle and the day the member is standing in is the one the line swells into
// and fills.
//
// IT MARKS THE SAME DAY THE SAME WAY THE FOOT MARKS THE SAME DESTINATION:
// filled solid terracotta, its name at full ink; the rest drawn open, in line
// only, their names at reduced strength. Five circles at the head and four at
// the foot, threaded by one stroke — see ../shell/ThreadNav.tsx, which this is
// deliberately the twin of.
//
// NO TYPE SITS ON THE FILL. `--sc-node-lg` is 26px and carries nothing, which
// is what keeps this within the design's one-terracotta-fill-with-type-on-it
// budget — the foot's selected destination is that one, and it is spent there.
//
// The button carries no handler, exactly as the base's pill did: this preview
// has no re-selection to drive (see ./DateRow.tsx), and wiring one would add an
// affordance the shipped screen does not have.

import { cx } from '../cx';

import styles from './DateTab.module.css';

export interface DateTabProps {
  label: string;
  isSelected: boolean;
}

export function DateTab({ label, isSelected }: DateTabProps) {
  return (
    <button type="button" className={cx(styles.day, isSelected && styles.dayHere)} aria-pressed={isSelected}>
      <span className={cx(styles.label, isSelected && styles.labelHere)}>{label}</span>
    </button>
  );
}
