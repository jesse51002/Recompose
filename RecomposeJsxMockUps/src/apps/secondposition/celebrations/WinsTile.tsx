// ONE ENTRY OF THE TALLY — a mark, a figure and what the figure counts.
//
// The base was a bordered, rounded, centred box. This design has no borders, no
// radius and nothing that floats (../layout_brief.yaml), so an entry is just a
// ruled column of the printed band ./WinsTileRow.tsx draws: left aligned, on
// the satin, parted from its neighbour by a hairline and by nothing else.
//
// THE THREE PARTS ARE ONE OBJECT, so the gaps inside are the smallest on the
// card and the whole column arrives as one gesture rather than three staggered
// ones (Guardrail 13, Guardrail 15).
//
// WHERE THE EMPHASIS SITS. The value is rank 2 on this card and the label rank
// 3, so the value takes the largest rung the body SANS has IN ITS REGULAR CUT
// and the label the tracked 10px one. It is deliberately NOT the display serif:
// `--sc-type-figure-*` belongs to a card whose whole subject IS a number, and
// this card's subject is the copy on the plinth above (../WinsShowcase.tsx). A
// tally set in the serif would tie with the announcement it is supposed to sit
// beneath — and so, it turned out, does the BOLD cut of the sans at 24px when
// there are three of it in a row. See the stylesheet.
//
// If the value parses as a clean integer ("+160", "4") it rolls in as a
// count-up; anything else ("3 weeks") is printed. The whole column arrives with
// a CSS keyframe because that is two properties tweened between fixed
// endpoints; only the count-up needs a driver. See ./CountUpText.tsx for why.

import { cx } from '../cx';
import { SC, showcaseStyle } from '../showcaseTokens';
import { AwardIcon, GiftIcon, HelpIcon, StarIcon } from '../support/icons';

import { CountUpText } from './CountUpText';
import type { ShowcaseWinTile } from './showcaseCelebrationStats';
import styles from './WinsTile.module.css';

/** `_NumericValue` — a `(prefix, integer)` pair the count-up can roll. */
export interface NumericValue {
  readonly prefix: string;
  readonly value: number;
}

/** `_parseNumeric`'s pattern, verbatim. */
const NUMERIC_RE = /^([+-]?)(\d+)$/;

/**
 * Ports `_parseNumeric`: `"+50"`, `"160"`, `"-3"` become a `(prefix, integer)`
 * pair; anything the count-up shouldn't touch (`"3 weeks"`) returns null.
 */
export function parseNumeric(raw: string): NumericValue | null {
  const match = NUMERIC_RE.exec(raw.trim());
  if (match === null) return null;
  const digits = match[2];
  if (digits === undefined) return null;
  const value = Number.parseInt(digits, 10);
  if (Number.isNaN(value)) return null;
  return { prefix: match[1] ?? '', value };
}

/**
 * The mark's box.
 *
 * The smallest rung on the icon scale, because a stroke glyph is the one thing
 * in this column that is not on the emphasis ranking at all — it sits below the
 * label. Drawn any larger it out-shouts the 10px caption beside it and the
 * column reads icon-first.
 */
const MARK_SIZE = SC.iconSizeXs;

export interface WinsTileProps {
  tile: ShowcaseWinTile;
  /** When this column's arrival — and its roll — starts. */
  delayMs?: number | undefined;
  /** How long the roll runs, so every column's figure lands on one frame. */
  rollMs?: number | undefined;
  /** The card is already done: print the answer instead of rolling to it. */
  settled?: boolean | undefined;
}

export function WinsTile({ tile, delayMs = 0, rollMs, settled = false }: WinsTileProps) {
  const numeric = parseNumeric(tile.value);
  const rolls = numeric !== null && !settled;

  return (
    <div
      className={styles.entry}
      style={showcaseStyle({ '--wt-delay': `${String(delayMs)}ms` })}
    >
      <TileMark name={tile.iconName} />
      {/*
        `tabular-nums` only where there are digits to line up. It is what lets
        the odometer be SWAPPED for its own answer without the column shifting
        sideways: the reel and the printed value occupy the same cell.
      */}
      <span className={cx(styles.value, numeric !== null && styles.figure)}>
        {rolls && numeric !== null ? (
          <CountUpText
            target={numeric.value}
            prefix={numeric.prefix}
            durationMs={rollMs}
            delayMs={delayMs}
          />
        ) : (
          tile.value
        )}
      </span>
      <span className={styles.label}>{tile.label}</span>
    </div>
  );
}

/** `_iconFor`. Inherits the column's held-back ink; see the stylesheet. */
function TileMark({ name }: { name: string }) {
  const props = { size: MARK_SIZE, className: styles.mark } as const;
  if (name === 'star') return <StarIcon {...props} />;
  if (name === 'award') return <AwardIcon {...props} />;
  if (name === 'gift') return <GiftIcon {...props} />;
  return <HelpIcon {...props} />;
}
