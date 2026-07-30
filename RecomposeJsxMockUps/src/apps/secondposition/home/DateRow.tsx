// THE DAY INDEX — the week across the head, the day in view marked in brass.
//
// It PINS. `position: sticky` is what Dart's `SliverPersistentHeader(pinned:
// true)` does: the row travels up with the board until it reaches the top of
// the scroller and then holds while the days move under it. The opaque cream
// ground is what makes that legible — a full-bleed satin panel passing beneath
// a transparent row would read straight through it.
//
// THE DAYS ARE LABELS, NOT CONTROLS, and that is the base's own behaviour made
// honest rather than a capability taken away. The real member screen re-selects
// the pill as the member scrolls past each day heading, measured with a key per
// day and a scroll listener; the base ports the row WITHOUT that machinery and
// still renders five `<button aria-pressed>`s with no handler — Guardrail 4's
// rendered-affordance dead end wearing a tab's clothes. All five days are
// already on the board below, so this row is an index TO it: it says which day
// is which and which one the bill opens on. Wiring the pills to switch the
// board would add a control the shipped screen does not have; leaving them as
// buttons that do nothing promises one. So they are spans, and the day in view
// is announced with `aria-current` instead of with a pressed state nothing can
// unpress.

import { DateTab } from './DateTab';
import styles from './DateRow.module.css';
import { formatDayLabel } from './homeScheduleGenerator';

export interface DateRowProps {
  /** The day offsets the board covers — one entry each. */
  dayOffsets: readonly number[];
  /** Which day the board opens on. */
  activeDayOffset: number;
}

export function DateRow({ dayOffsets, activeDayOffset }: DateRowProps) {
  return (
    <div className={styles.index}>
      {dayOffsets.map((offset) => (
        <DateTab
          key={offset}
          label={formatDayLabel(offset)}
          isActive={offset === activeDayOffset}
        />
      ))}
    </div>
  );
}
