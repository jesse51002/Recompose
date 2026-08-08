// THE DAY SCALE — the five-day window as a measuring rule.
//
// The base draws five pills in a row, the selected one underlined. This draws
// a scale: a hairline baseline with a tick under each day, the day's label
// hanging beneath it, and the selected day seated in a solid walnut block. A
// gauge, not a set of chips — which is what the rest of the sheet is made of.
//
// TODAY STAYS SELECTED, exactly as in the base. The real row re-selects as the
// member scrolls past each day heading, measured with a `GlobalKey` per day and
// a scroll listener; reproducing that here would mean writing state on every
// scroll frame to drive an affordance the preview has nothing to do with. The
// same call ../rewards/RewardsTabs.tsx and ../videos/VideoCategoryTabs.tsx make
// for their own rows.
//
// It PINS under the head, because the base's rail does
// (`SliverPersistentHeader(pinned: true)`): sticky is the web's counterpart,
// and the opaque background is what makes it legible while days move under it.

import { cx } from '../cx';

import styles from './DayScale.module.css';
import { formatDayLabel } from './homeScheduleGenerator';

export interface DayScaleProps {
  /** The day offsets the board covers — one graduation each. */
  dayOffsets: readonly number[];
  /** Which day reads as selected. */
  currentDayIndex: number;
}

export function DayScale({ dayOffsets, currentDayIndex }: DayScaleProps) {
  return (
    <div className={styles.scale}>
      {dayOffsets.map((offset) => {
        const selected = offset === currentDayIndex;
        return (
          <div key={offset} className={cx(styles.mark, selected && styles.marked)}>
            <span className={styles.tick} aria-hidden="true" />
            <span className={styles.label} aria-current={selected ? 'date' : undefined}>
              {formatDayLabel(offset)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
