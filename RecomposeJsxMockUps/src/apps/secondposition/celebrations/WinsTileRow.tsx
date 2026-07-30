// THE TALLY — the three win totals, printed along the foot of the wins card.
//
// The base was three bordered, rounded, centred boxes with a gutter between
// them. ../layout_brief.yaml refuses all three of those at once: "it refuses
// the inset rounded card with a shadow: nothing in this app floats above
// anything, separation is a change of field and a hairline, and corners are
// square throughout". So the row is a printed band instead — a hairline opens
// it, three equal columns divide it, and a hairline parts each column from the
// next. That is how a bill prints its total, and it is the same treatment
// ../RankShowcase.tsx gives its classes-in-rank tally, one column wider.
//
// THREE DISTINCT ENTITIES, DISTRIBUTED (Guardrail 15). A classes count, a
// points total and a streak are three separate facts that happen to share a
// row, so each takes an equal third of the full width rather than being packed
// behind one gap with a void at the end. Inside a column the icon, the figure
// and the label are ONE object and sit at the smallest gap on the card.
//
// THE CASCADE, AND WHY THE FIGURES LAND TOGETHER. The columns arrive one after
// another — the tally being struck, left to right — but their count-ups all
// resolve on the same beat, because three odometers finishing at three
// different moments turns the foot of the card into a slot machine and steals
// the eye from the announcement above it, which is this card's rank 1. So each
// column's roll is shortened by exactly its own place in the cascade. One
// window, three starts, one landing.

import { cx } from '../cx';
import { ARRIVE_MS, CASCADE_MS, COUNT_MS } from '../shell/phrase';

import type { ShowcaseWinTile } from './showcaseCelebrationStats';
import { WinsTile } from './WinsTile';
import styles from './WinsTileRow.module.css';

/**
 * When one column's arrival starts.
 *
 * THE ROW IS ONE CASCADE AND IT FILLS ONE WINDOW. `CASCADE_MS` in
 * ../shell/phrase.ts names this row by name — it is how long a ROW of things
 * takes to arrive, start of the first to rest of the last — so the step between
 * columns is whatever divides the remainder of that window evenly, rather than
 * a fixed interval that would make a three-column tally and a seven-day week
 * take different lengths of time. ../support/StreakWeekStrip.ts computes its
 * own the same way, and the two agree because they read the same two constants.
 */
export function winsTileDelayMs(baseDelayMs: number, index: number, count: number): number {
  if (count <= 1) return baseDelayMs;
  return baseDelayMs + ((CASCADE_MS - ARRIVE_MS) / (count - 1)) * index;
}

/**
 * How long column `index`'s figure rolls for.
 *
 * `COUNT_MS` minus the column's own offset into the cascade, so every figure
 * lands on the same frame however late its column arrived. That frame is the
 * card's loop close (../WinsShowcase.tsx) — the figures are the last thing
 * moving, which is what "a card settles when its figure lands" means here.
 */
export function winsTileRollMs(index: number, count: number): number {
  return COUNT_MS - winsTileDelayMs(0, index, count);
}

export interface WinsTileRowProps {
  tiles: readonly ShowcaseWinTile[];
  /** When the first column's arrival starts, in ms from the card opening. */
  baseDelayMs?: number | undefined;
  /**
   * The card is already done — tapped, or a reduced-motion preference. Each
   * figure is swapped for its own answer rather than fast-forwarded; see
   * ./WinsTile.tsx.
   */
  settled?: boolean | undefined;
  className?: string | undefined;
}

export function WinsTileRow({ tiles, baseDelayMs = 0, settled = false, className }: WinsTileRowProps) {
  const count = tiles.length;
  return (
    <div className={cx(styles.row, className)}>
      {tiles.map((tile, index) => (
        // The tile list is a fixed const trio, so the slot index IS the tile's
        // identity — two tiles may legitimately carry the same label.
        <div key={`${String(index)}-${tile.label}`} className={styles.column}>
          <WinsTile
            tile={tile}
            delayMs={winsTileDelayMs(baseDelayMs, index, count)}
            rollMs={winsTileRollMs(index, count)}
            settled={settled}
          />
        </div>
      ))}
    </div>
  );
}
