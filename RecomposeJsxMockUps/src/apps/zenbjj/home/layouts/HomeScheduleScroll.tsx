// Ports MobileApp/lib/features/home/presentation/layouts/parts/
// home_schedule_scroll.dart, and carries forward the shipped
// ../HomeNotBookedBody.tsx it replaces (itself a port of
// CRM/lib/showcase/home/home_not_booked_body.dart +
// MobileApp/.../widgets/home_body/home_body.dart).
//
// THE VERTICAL SCHEDULE SCAFFOLD: topbar, date rail, day list. FOUR OF THE FIVE
// home formats are this shape and differ only in how a day's classes are drawn
// and how the rail behaves — shared so the board is written once and cannot
// drift apart between formats.
//
// It does not own a scroller. The scroller is <ShowcaseScaffold bodyScroll>, one
// level up (../HomeShowcase.tsx), which is what the sticky rail sticks inside;
// Dart's `CustomScrollView` + `controller` is that scaffold plus this column.
// The scroll-position maths Dart runs on that controller — `headerHeight`,
// `dayGroupHeight`, `_onVerticalScroll` — has no counterpart here for the same
// reason the rail's selection is static: see ../DateRow.tsx.

import { DateRow } from '../DateRow';
import type { DateTabStyle } from '../DateTab';
import { DayClassGroup } from '../DayClassGroup';
import { dayAt } from '../homeScheduleGenerator';

import { DAY_OFFSETS } from './homeLayout';
import type { HomeLayoutProps } from './homeLayout';
import styles from './HomeScheduleScroll.module.css';

export interface HomeScheduleScrollProps extends HomeLayoutProps {
  /** `SliverPersistentHeader(pinned:)`. */
  pinDateRow?: boolean;
  dateTabStyle?: DateTabStyle;
}

export function HomeScheduleScroll({
  topbar,
  classes,
  pinDateRow = true,
  dateTabStyle = 'underline',
}: HomeScheduleScrollProps) {
  return (
    <div className={styles.body}>
      {topbar}
      <DateRow
        dayOffsets={DAY_OFFSETS}
        currentDayIndex={0}
        pinned={pinDateRow}
        tabStyle={dateTabStyle}
      />
      {DAY_OFFSETS.map((offset) => (
        <DayClassGroup
          key={offset}
          day={dayAt(offset, classes)}
          showBookings={false}
          // ZEN BJJ lights exactly ONE card on the whole board — the next class
          // today — and leaves every other day a run of compact rows. A lead
          // per day would be five heroes, which is a pattern rather than a
          // focus, and the point of the treatment is that it is rare.
          leadFirst={offset === 0}
        />
      ))}
    </div>
  );
}
