// THE WEEK, GATHERED ON THE LINE — seven days, Sunday through Saturday, each
// one a circle the thread runs through.
//
// ../layout_brief.yaml: "Where the app needs to hold a row of things it does
// not stack, the thread bows sideways instead, running out across the screen,
// through what it carries, and back down. A week of days, a shelf of films, a
// strip of point tokens: the line goes out to gather them and returns." So this
// is a `<Bow>` — the same excursion the head's carried items and every shelf
// use, and the only thing in the app that scrolls sideways.
//
// A DAY IS A CIRCLE, which is one of the three forms this app is drawn from,
// and the day's own letter sits inside it. The circle is filled with the canvas
// for the same reason `shell/Thread.module.css`'s `carry` node is: a node that
// holds something has to mask the line behind it, or the stroke crosses the
// letter.
//
// SAGE IS WHAT MARKS AN ATTENDED DAY, and this is the design's clearest single
// use of it — "the second fill and the quieter one… it marks a thing already
// earned, already attended, already held." Its label is knocked out in the
// palette's own light derivation of sage (5.03:1), never the canvas linen
// (3.31:1), because a small fill with a word on it is still text.
//
// THE STAGGER IS GONE, AND THAT IS THE POINT. The base cascaded seven badges in
// on `CelebrationTimings.badgeStagger * i`, each with a 12px slide and a
// 0.9 → 1 pulse. The brief replaces per-element choreography with one stroke:
// "each region arrives at the moment the line reaches it. The stagger is
// therefore not a stagger at all — it is a consequence of one continuous stroke
// passing each node in turn." So the whole excursion is swept in left to right
// behind a travelling clip, and every day arrives exactly when the line reaches
// it — for free, with no per-badge delay to keep in step.

import { Bow } from '../shell/Thread';
import { cx } from '../cx';
import { showcaseStyle } from '../showcaseTokens';
import { BREATH, WEEK_SWEEP_MS } from '../streakOrbit';

import styles from './StreakWeekStrip.module.css';

/** `ShowcaseStreakDay` — one day in the strip. */
export interface ShowcaseStreakDay {
  readonly label: string;
  readonly completed: boolean;
}

export interface StreakWeekStripProps {
  days: readonly ShowcaseStreakDay[];
  /** When the line starts running out — the moment the card's loop closes. */
  baseDelayMs?: number | undefined;
}

export function StreakWeekStrip({ days, baseDelayMs = 0 }: StreakWeekStripProps) {
  return (
    <div
      className={styles.sweep}
      style={showcaseStyle({
        '--sw-sweep-ms': `${String(WEEK_SWEEP_MS)}ms`,
        '--sw-delay-ms': `${String(baseDelayMs)}ms`,
        '--sw-breath': BREATH,
      })}
    >
      <Bow>
        {days.map((day, index) => (
          // The week is a fixed seven-slot list, so the slot index IS the day's
          // identity — 'S' and 'T' each appear twice.
          <div key={`${String(index)}-${day.label}`} className={styles.day}>
            <span className={cx(styles.disc, day.completed && styles.discCalm)}>
              <span className={styles.label}>{day.label}</span>
            </span>
          </div>
        ))}
      </Bow>
    </div>
  );
}
