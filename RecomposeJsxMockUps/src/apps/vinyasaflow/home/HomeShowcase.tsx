// THE SCHEDULE, AND THE APP ASSET'S ROOT.
//
// Ports ../../../../../../CRM/lib/showcase/home_showcase.dart — the member app's
// HOME screen (`HomeScreen` -> `HomeBody`) — rebuilt in this fork's world. The
// thread enters at the brand mark, bows sideways through the four things the
// member carries, bows again through the five days of the window, and then runs
// down the schedule putting a node beside every class before leaving through the
// four destinations at the foot. Nothing on this screen is beside the line;
// everything is on it.
//
// A STATIC SURFACE: nothing here animates, which is why it takes no loop knobs.
// It DOES scroll (`bodyScroll`) — the schedule is a multi-day board on a real
// device, and previewing one clipped day would sell a shorter app than the one
// being licensed.
//
// THE FORMAT SWITCH IS GONE. The base resolved a tenant's `home_format` slot to
// one of five arrangements; a bounded option set reproduces the platform's own
// design language, which is a reskin, so the machinery was removed from this
// package (../../../CLAUDE.md, "One layout and one animation per asset"). There
// is one schedule here and it is this one.
//
// `gymName` / `gymLogoSrc` are the HOST's gym identity and are NOT customization
// slots — a theme pick must never rename the mock. `themeTabPreview` arms the
// middle rung of the mark's logo ladder (see ../shell/Head.tsx).

import { Head } from '../shell/Head';
import { Screen } from '../shell/Screen';
import { ThreadNav } from '../shell/ThreadNav';
import type { ShowcaseClassInfo } from '../showcaseContent';

import { DateRow } from './DateRow';
import { DayClassGroup } from './DayClassGroup';
import styles from './HomeShowcase.module.css';
import { DAY_OFFSETS, dayAt } from './homeScheduleGenerator';

// Dummy non-identity data: two of the four things the member carries. The rank
// belt and the QR pass resolve their own generated slots inside <Head>.
const STREAK_DAYS = 3;
const POINTS_LABEL = '3.4k';

/** The day the member is standing in. Offset 0 is today. */
const CURRENT_DAY = 0;

export interface HomeShowcaseProps {
  gymName?: string;
  /** The host gym's real logo URL. Absent in the public browser. */
  gymLogoSrc?: string | undefined;
  /** The gym's real classes; null falls back to the group defaults. */
  classes?: readonly ShowcaseClassInfo[] | null;
  themeTabPreview?: boolean;
}

export function HomeShowcase({
  gymName = 'Your Gym',
  gymLogoSrc,
  classes,
  themeTabPreview = false,
}: HomeShowcaseProps) {
  return (
    <Screen
      head={
        <Head
          gymName={gymName}
          gymLogoSrc={gymLogoSrc}
          themeTabPreview={themeTabPreview}
          streakDays={STREAK_DAYS}
          pointsLabel={POINTS_LABEL}
        />
      }
      foot={<ThreadNav selected="home" />}
      bodyScroll
    >
      <div className={styles.board}>
        <DateRow dayOffsets={DAY_OFFSETS} currentDayIndex={CURRENT_DAY} />
        {DAY_OFFSETS.map((offset) => (
          <DayClassGroup
            key={offset}
            day={dayAt(offset, classes)}
            isToday={offset === CURRENT_DAY}
            showBookings={false}
          />
        ))}
      </div>
    </Screen>
  );
}
