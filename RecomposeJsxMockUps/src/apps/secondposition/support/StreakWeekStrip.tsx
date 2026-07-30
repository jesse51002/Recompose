// THE WEEK, PRINTED ALONG THE FOOT OF THE CARD.
//
// Seven cells running edge to edge, the way a bill prints the nights a work is
// given. The base's answer was seven rounded pills floating on the canvas with
// the trained ones tinted; this design has no pills and no tint, because
// ../layout_brief.yaml refuses both the inset rounded card and the third fill.
//
// SO THE MARK IS A CHANGE OF FIELD. A day the member danced is STRUCK OUT of
// the satin: its cell inverts to the cream ground with the satin as its ink,
// and an untrained day stays satin with cream ink. That is forced by the same
// measurement that governs the foot navigation — cream on satin is 5.47:1 and
// satin on cream is the same ratio the other way round, while every way of
// "holding back" an untrained day (a fainter ink, a tinted fill, a brass rule)
// either fails AA on this field or vanishes into it. Both states are at full
// strength and the FIELD carries the difference, which costs no legibility at
// all.
//
// The check and the open circle survive from the base unchanged, because they
// are elements of the badge rather than the way it is emphasised. They are
// small and quiet here: the inversion has already said which days count, so the
// glyph is confirmation rather than the announcement.

import { cx } from '../cx';
import { ARRIVE_MS, CASCADE_MS } from '../shell/phrase';
import { SC, showcaseStyle } from '../showcaseTokens';

import { CheckCircleIcon, CircleIcon } from './icons';
import styles from './StreakWeekStrip.module.css';

/** One day in the strip. */
export interface ShowcaseStreakDay {
  readonly label: string;
  readonly completed: boolean;
}

/**
 * When one cell's arrival starts.
 *
 * THE ROW IS ONE CASCADE AND IT FILLS ONE WINDOW. `CASCADE_MS` in
 * ../shell/phrase.ts names this strip by name — it is how long a ROW of things
 * takes to arrive, start of the first to rest of the last — so the step between
 * cells is whatever divides the remainder of that window evenly, rather than a
 * fixed interval that would make a seven-day week and a three-tile row take
 * different lengths of time. The panel column's `STAGGER_MS` is deliberately
 * NOT reused here: that one is fixed precisely because a scrolling column has
 * no last item to land on, and this row does.
 */
export function streakBadgeDelayMs(baseDelayMs: number, index: number, count: number): number {
  if (count <= 1) return baseDelayMs;
  return baseDelayMs + ((CASCADE_MS - ARRIVE_MS) / (count - 1)) * index;
}

/** The glyph size. Small on purpose — the inverted field is the real marker. */
const GLYPH_SIZE = SC.iconSizeXs;

export interface StreakWeekStripProps {
  days: readonly ShowcaseStreakDay[];
  /** When the first cell's arrival starts, in ms from the card opening. */
  baseDelayMs?: number | undefined;
}

export function StreakWeekStrip({ days, baseDelayMs = 0 }: StreakWeekStripProps) {
  return (
    <div className={styles.strip}>
      {days.map((day, index) => (
        // The week is a fixed seven-slot list, so the slot index IS the day's
        // identity — 'S' and 'T' each appear twice.
        <StreakDayCell
          key={`${String(index)}-${day.label}`}
          day={day}
          delayMs={streakBadgeDelayMs(baseDelayMs, index, days.length)}
        />
      ))}
    </div>
  );
}

function StreakDayCell({ day, delayMs }: { day: ShowcaseStreakDay; delayMs: number }) {
  const Glyph = day.completed ? CheckCircleIcon : CircleIcon;
  return (
    <div
      className={cx(styles.cell, day.completed && styles.danced)}
      style={showcaseStyle({ '--wk-delay': `${String(delayMs)}ms` })}
    >
      <span className={styles.day}>{day.label}</span>
      <Glyph size={GLYPH_SIZE} className={styles.glyph} />
    </div>
  );
}
