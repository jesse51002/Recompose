// HOME — the day's work, numbered in its order.
//
// The base draws a schedule: a centred branded topbar, a row of day pills, a
// TODAY heading, and a stack of rows each pairing text with a 16:9 thumbnail.
// This draws the studio's apparatus chart. The rail carries the mark and the
// destinations; the sheet carries a letterhead, a spec block, a measuring
// SCALE for the day window, and then each day's classes as numbered entries in
// a sequence — ordinal, time, name, teacher, attendance, and the class
// photograph as a small mounted plate at the right margin.
//
// EVERY ELEMENT THE INVENTORY NAMES IS HERE: the mark (on the rail), the gym
// name with its chevron and the four-item info bar (../shell/SheetHead.tsx),
// five days with the active one marked (the scale), the day heading (a tracked
// label under a rule), and every class entry's name, time range with duration,
// instructor, attending count and thumbnail. Nothing dropped, nothing added.
//
// `gymName` / `gymLogoSrc` are the HOST's gym identity and are NOT customization
// slots — a theme pick must never rename the mock. `themeTabPreview` selects the
// mark's middle logo rung (../shell/RomanaRail.tsx).

import { RomanaRail } from '../shell/RomanaRail';
import { Sheet } from '../shell/Sheet';
import { SheetHead } from '../shell/SheetHead';
import type { ShowcaseClassInfo } from '../showcaseContent';

import { DayOrder } from './DayOrder';
import { DayScale } from './DayScale';
import { dayAt } from './homeScheduleGenerator';
import { DAY_OFFSETS } from './layouts/homeLayout';
import styles from './HomeShowcase.module.css';

// Dummy non-identity data: the streak / points / rank cells in the spec block.
// Gym name + logo come from the host.
const RANK_BADGE_ASSET = 'icon_rank_belt.png' as const;
const STREAK_DAYS = 3;
const POINTS_LABEL = '3.4k';

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
    <Sheet
      scroll
      flush
      rail={
        <RomanaRail selected="home" logoSrc={gymLogoSrc} themeTabPreview={themeTabPreview} />
      }
      head={
        <SheetHead
          gymName={gymName}
          streakDays={STREAK_DAYS}
          pointsLabel={POINTS_LABEL}
          rankBadgeAsset={RANK_BADGE_ASSET}
        />
      }
    >
      {/* The scale pins under the head exactly as the base's date rail pins
          under its topbar — `position: sticky` inside this one scroller. */}
      <DayScale dayOffsets={DAY_OFFSETS} currentDayIndex={0} />
      {DAY_OFFSETS.map((offset) => (
        <DayOrder key={offset} day={dayAt(offset, classes)} />
      ))}
      <div className={styles.tail} />
    </Sheet>
  );
}
