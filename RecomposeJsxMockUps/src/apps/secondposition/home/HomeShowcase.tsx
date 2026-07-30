// THE SCHEDULE — the app asset's root, and this design's BILL.
//
// A bill is the printed sheet a company posts to say which works are being
// given, in what order, danced by whom (../layout_brief.yaml). It treats each
// work as worth announcing rather than ranking them into rows of equal grey, so
// this screen is not a timetable: it is the studio saying what it is giving
// today, one work at a time, each a full-bleed panel of picture and name.
//
// THE OPENING WORK IS BILLED AND EVERYTHING AFTER IT IS SPLIT — the only
// concession to hierarchy the list makes, and there is exactly ONE of it, which
// is ../shell/Panel.tsx's own contract ("one per screen"). The brief also calls
// it "the opening class of the day"; on a board that carries five days those
// two readings disagree, and the shell's wins. Five heroes down one scroller is
// five claims about which work leads, which is no claim at all.
//
// WHAT MUST NOT DRIFT, and it is the whole reason this screen was rebuilt: the
// class NAME and its PHOTOGRAPH are rank 1 TOGETHER. `class_photo_2` declares
// `depends_on_text: [class_name_2]` in apps/combatden/app.yaml, so the picture
// is generated FROM the copy — they are one claim about one class, not a thing
// and its decoration. The time is rank 2, the instructor and the attending
// count rank 3, and the day index and the carried stats merely support. A
// sibling fork set the start time at 40px over a 17px class name, and the
// loudest element on the screen a member opens IN ORDER TO CHOOSE A CLASS was
// the clock. Nothing here sets a figure above the name it describes.
//
// `gymName` / `gymLogoSrc` are the HOST's gym identity and are NOT customization
// slots — a theme pick must never rename the mock. `themeTabPreview` arms the
// masthead's middle logo rung (see ../shell/Masthead.tsx).

import { FootNav } from '../shell/FootNav';
import { Masthead } from '../shell/Masthead';
import { Screen } from '../shell/Screen';
import type { ShowcaseClassInfo } from '../showcaseContent';

import { DateRow } from './DateRow';
import { DayClassGroup } from './DayClassGroup';
import { dayAt } from './homeScheduleGenerator';

// The three carried facts the masthead does not read off a slot. Dummy
// non-identity data, exactly as the base's topbar took them.
const STREAK_DAYS = 3;
const POINTS_LABEL = '3.4k';

/**
 * The preview's own window: one day in the index and one section on the board
 * per day.
 *
 * WHY FIVE AND NOT FOURTEEN. `HomeState.initialWindowDays` is 14 and the real
 * board extends to 60 as the member scrolls — a server-paged window this
 * preview has no server for. Five days is several viewports of real board:
 * enough to show the screen is deep, short enough that stepping to the next
 * screen never means scrolling past forty identical panels.
 */
const VISIBLE_DAYS = 5;

/** `0, 1, … VISIBLE_DAYS - 1` — the day offsets the board covers. */
const DAY_OFFSETS: readonly number[] = Object.freeze(
  Array.from({ length: VISIBLE_DAYS }, (_, offset) => offset),
);

/**
 * The day the board opens on, and the day whose opening class is billed.
 *
 * A constant rather than state: the index below is an INDEX, not a control (see
 * ./DateRow.tsx), so nothing on this screen can change which day leads.
 */
const OPENING_DAY = 0;

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
      // The board scrolls and NOTHING ELSE DOES: the masthead and the foot are
      // the scaffold's own rows, so the identity holds the top edge and the
      // four destinations hold the bottom one while the bill moves between them.
      scroll
      head={
        <Masthead
          mode="billed"
          gymName={gymName}
          logoSrc={gymLogoSrc}
          streakDays={STREAK_DAYS}
          pointsLabel={POINTS_LABEL}
          themeTabPreview={themeTabPreview}
        />
      }
      foot={<FootNav selected="home" />}
    >
      {/*
       * NO `prose` INSET ON THE BODY, deliberately. This screen's unit is a
       * full-bleed panel; the two things that DO want the gutter — the day
       * index and each day's rule and label — take it themselves. Guardrail
       * 13's warning runs the other way here: a body given the inset for the
       * sake of two captions strands every panel behind a 16px wall, and
       * un-stranding them means a negative margin on the unit rather than on
       * the exception.
       */}
      <DateRow dayOffsets={DAY_OFFSETS} activeDayOffset={OPENING_DAY} />
      {DAY_OFFSETS.map((offset) => (
        <DayClassGroup
          key={offset}
          day={dayAt(offset, classes)}
          opensTheBill={offset === OPENING_DAY}
        />
      ))}
    </Screen>
  );
}
