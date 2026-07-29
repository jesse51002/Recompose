// HOME — the schedule, and the app asset's root.
//
// The base builds this out of a topbar, a pinned date rail and five day groups
// of four identical rows. This rebuilds it as the horizon: the club's mark and
// the next session in the air, then the ground — the four info-bar items struck
// as discs, the week as a ruled scale, and each day's sessions with the FIRST
// given a stretch of full-bleed route and the rest as rows read by time.
//
// EVERY ELEMENT THE BASE HAS IS STILL HERE, and the ones that moved are worth
// naming because a reviewer will look for them:
//
//   gym mark           the roundel floating in the sky (bigger, not gone)
//   gym name + chevron the identity row at the top of the sky
//   rank/streak/points/QR  the club lane, first lane of the ground
//   the five-day row   the day scale, second lane
//   "TODAY"            each day group's own label
//   class rows         name, time range with duration, instructor, attending
//                      count and thumbnail — all of them, on every row
//
// HIERARCHY IS THE REDESIGN DOING ITS JOB. Promoting a day's first session to a
// full-bleed head while the rest stay compact rows is a prominence decision,
// not a new feature: every class is still present, still shows what it showed,
// and still opens when tapped.

import { useMockNav } from '../../../kit/MockNav';
import { ROUTE_CLASS } from '../appAsset';
import { useAppContent } from '../appContent';
import { cx } from '../cx';
import { showcaseAsset, showcaseAssetOrNetwork } from '../showcaseAssets';
import type { ShowcaseClassInfo } from '../showcaseContent';
import {
  SLOT_ICON_QRCODE,
  SLOT_LOGO_PRIMARY,
  SLOT_RANK_BELT,
  SLOT_SINGLE_POINT,
  SLOT_STREAK_ICON,
} from '../showcaseSlots';
import { Disc, DiscStat } from '../shell/Disc';
import { Lane } from '../shell/Lane';
import { LastLane } from '../shell/LastLane';
import { RouteImage } from '../shell/RouteImage';
import { Screen } from '../shell/Screen';
import { Sky, SkyIdentity, SkyMark } from '../shell/Sky';
import { CheckIcon } from '../support/icons';

import type { ShowcaseClass } from './homeClass';
import { dayAt, formatDayLabel, formatFullDayLabel } from './homeScheduleGenerator';
import styles from './HomeShowcase.module.css';
import { DAY_OFFSETS } from './layouts/homeLayout';

// Dummy non-identity data: the streak / points / rank items. Gym name and logo
// come from the host. Unchanged from the base — demo content, not design.
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

/**
 * "9:00am - 9:55am" → ["9:00", "am"], so the row can set the figure large and
 * its meridiem small underneath.
 *
 * Falls back to the whole leading token when the shape is not what it expects.
 * An injected gym class borrows its time from a sample today, but a future one
 * might not, and a row showing nothing where the time should be is worse than
 * one showing an unsplit string.
 */
function splitTime(timeRange: string): readonly [string, string] {
  const start = timeRange.split('-')[0]?.trim() ?? timeRange;
  const match = /^(\d{1,2}:\d{2})\s*([ap]m)$/i.exec(start);
  if (match === null) return [start, ''];
  return [match[1] ?? start, match[2] ?? ''];
}

export function HomeShowcase({
  gymName = 'Your Gym',
  gymLogoSrc,
  classes,
  themeTabPreview = false,
}: HomeShowcaseProps) {
  const today = dayAt(0, classes);
  const lead = today.classes[0];
  const [leadFigure, leadMeridiem] = splitTime(lead?.timeRange ?? '');

  return (
    <Screen
      sky={
        <Sky
          lead={
            <SkyIdentity
              gymName={gymName}
              gymLogoSrc={gymLogoSrc}
              themeTabPreview={themeTabPreview}
              crest={false}
            />
          }
          label="Next session"
          headline={`${leadFigure}${leadMeridiem}`}
          aside={lead?.name}
          mark={
            <SkyMark slot={SLOT_LOGO_PRIMARY} fallbackSrc={showcaseAsset('combatden_logo.png')} />
          }
        />
      }
      foot={<LastLane selected="home" />}
    >
      <ClubLane />
      <DayScale />
      {DAY_OFFSETS.map((offset) => (
        <DayLane key={offset} offset={offset} classes={classes} />
      ))}
    </Screen>
  );
}

/**
 * The four info-bar items, struck as discs.
 *
 * They are the base's topbar row moved onto the ground, not four new things:
 * rank belt, streak with its icon and count, points total, and the QR
 * affordance. Discs because this brand mints coins and medallions, and because
 * four squares under an open sky would read as the card grid this design does
 * not have.
 */
function ClubLane() {
  return (
    <Lane first label="Your club" tight>
      <div className={styles.club}>
        <DiscStat
          size={44}
          slot={SLOT_RANK_BELT}
          src={showcaseAsset(RANK_BADGE_ASSET)}
          object
          label="Rank"
        />
        <DiscStat
          size={44}
          slot={SLOT_STREAK_ICON}
          src={showcaseAsset('streak_icon.png')}
          object
          figure={String(STREAK_DAYS)}
          label="Streak"
        />
        <DiscStat
          size={44}
          slot={SLOT_SINGLE_POINT}
          src={showcaseAsset('single_point.png')}
          object
          figure={POINTS_LABEL}
          label="Points"
        />
        <DiscStat
          size={44}
          slot={SLOT_ICON_QRCODE}
          src={showcaseAsset('icon_qrcode.png')}
          object
          label="Check in"
        />
      </div>
    </Lane>
  );
}

/**
 * The week, as a measuring scale rather than a row of pills.
 *
 * TODAY STAYS SELECTED. The real row re-selects as the member scrolls past each
 * day heading, measured with a `GlobalKey` per day and a scroll listener; the
 * base does not reproduce that and neither does this, so the days are labels
 * with the current one marked. Making them switch would add an affordance the
 * shipped screen does not have.
 */
function DayScale() {
  return (
    <Lane label="This week" tight>
      <div className={styles.scale}>
        {DAY_OFFSETS.map((offset) => {
          const on = offset === 0;
          return (
            <span key={offset} className={cx(styles.day, on && styles.dayOn)}>
              <span className={cx(styles.tick, on && styles.tickOn)} />
              <span className={styles.dayLabel}>{formatDayLabel(offset)}</span>
            </span>
          );
        })}
      </div>
    </Lane>
  );
}

/** One day: its label, its head session, and the rest as rows. */
function DayLane({
  offset,
  classes,
}: {
  offset: number;
  classes?: readonly ShowcaseClassInfo[] | null | undefined;
}) {
  const day = dayAt(offset, classes);
  const [head, ...rest] = day.classes;

  return (
    <Lane label={formatFullDayLabel(offset)} bleed flush>
      {head !== undefined && <HeadSession classData={head} />}
      {rest.map((item, i) => (
        <SessionRow key={`${item.name}-${String(i)}`} classData={item} />
      ))}
    </Lane>
  );
}

/**
 * The day's first session: a stretch of full-bleed route, captioned beneath.
 *
 * The tap target imports its route rather than taking a callback (Guardrail 6)
 * — a callback threaded down through the day group is exactly the plumbing a
 * later rearrangement breaks.
 */
function HeadSession({ classData }: { classData: ShowcaseClass }) {
  const nav = useMockNav();
  const { openClassNamed } = useAppContent();
  const [figure, meridiem] = splitTime(classData.timeRange);
  const src = showcaseAssetOrNetwork(
    classData.imageUrl,
    classData.imageAsset ?? 'class_photo_1.png',
  );

  return (
    <button
      type="button"
      className={styles.leadTap}
      onClick={() => {
        openClassNamed(classData.name);
        nav.go(ROUTE_CLASS);
      }}
    >
      <RouteImage slot={classData.themeSlot} src={src} height={168} />
      <span className={styles.leadMeta}>
        <span className={styles.leadCol}>
          <span className={styles.leadName}>{classData.name}</span>
          <span className={styles.sub}>
            {classData.timeRange} · {classData.durationMinutes} min
          </span>
          <span className={cx(styles.sub, styles.subDim)}>{classData.mentor}</span>
          <span className={cx(styles.sub, styles.subDim)}>
            {classData.attending ?? 0} attending
          </span>
          {classData.isBooked && (
            <span className={styles.booked}>
              <CheckIcon className={styles.bookedGlyph} size={12} />
              Booked
            </span>
          )}
        </span>
        <span className={styles.leadTime}>
          {figure}
          <span className={styles.timeMeridiem}>{meridiem}</span>
        </span>
      </span>
    </button>
  );
}

/** Every other session: read by time, with its photograph struck into a disc. */
function SessionRow({ classData }: { classData: ShowcaseClass }) {
  const nav = useMockNav();
  const { openClassNamed } = useAppContent();
  const [figure, meridiem] = splitTime(classData.timeRange);
  const src = showcaseAssetOrNetwork(
    classData.imageUrl,
    classData.imageAsset ?? 'class_photo_1.png',
  );

  return (
    <button
      type="button"
      className={styles.row}
      onClick={() => {
        openClassNamed(classData.name);
        nav.go(ROUTE_CLASS);
      }}
    >
      <span className={styles.time}>
        <span className={styles.timeFigure}>{figure}</span>
        <span className={styles.timeMeridiem}>
          {meridiem} · {classData.durationMinutes} min
        </span>
      </span>
      <span className={styles.meta}>
        <span className={styles.name}>{classData.name}</span>
        <span className={styles.sub}>{classData.mentor}</span>
        <span className={cx(styles.sub, styles.subDim)}>
          {classData.attending ?? 0} attending
        </span>
        {classData.isBooked && (
          <span className={styles.booked}>
            <CheckIcon className={styles.bookedGlyph} size={12} />
            Booked
          </span>
        )}
      </span>
      <Disc size={52} slot={classData.themeSlot} src={src} />
    </button>
  );
}
