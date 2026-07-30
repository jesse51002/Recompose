// ONE WIN — a circle on the thread, the name of the thing, and the figure.
//
// IT IS NOT A TILE ANY MORE, AND THAT IS THE POINT. The base drew a bordered,
// rounded box with an icon over a value over a caption. This design has no card,
// no panel and no bordered box anywhere, because a box would be a FOURTH FORM
// beside the line, the circle and the photograph (../layout_brief.yaml). The
// filename is kept because eleven agents are building against one another's
// paths; nothing else about it survives.
//
// What replaces the border is the app's own idiom, unchanged from
// ../shell/Head.tsx's carried items and ../shell/ThreadNav.tsx's destinations: a
// glyph in an open circle sitting ON the thread, its name beneath it, and — the
// one thing those two do not have room for — the count set large and light under
// that. A spoken label over a very large figure is how this app states a number
// everywhere it states one.
//
// EVERYTHING THE TILE SAID IS STILL SAID: the icon, the value and the label. The
// value still rolls when it parses as a clean integer ("+50", "160") and still
// renders as static text when it does not ("3 weeks"), which is the base's own
// rule and the reason the streak reads grammatically.
//
// The reveal is CSS — one keyframe, one `animation-delay` — because it is
// opacity between two endpoints. Only the count-up needs a driver; see
// ./CountUpText.tsx for why that one is the exception.

import { ARRIVE_MS, COUNT_MS } from '../shell/breath';
import { Figure } from '../shell/Figure';
import { SC, showcaseStyle } from '../showcaseTokens';
import { AwardIcon, GiftIcon, HelpIcon, StarIcon } from '../support/icons';

import { CountUpText } from './CountUpText';
import type { ShowcaseWinTile } from './showcaseCelebrationStats';
import styles from './WinsTile.module.css';

/**
 * How long a win takes to arrive once the strand reaches it. Opacity only —
 * nothing in this app slides, springs or overshoots.
 */
export const WINS_SETTLE_MS = ARRIVE_MS;

/**
 * How long a count takes to roll.
 *
 * The brief's own figure: "a count travels from zero to its value in tabular
 * figures ... lands inside three quarters of a second, and settles without a
 * final tick". Shorter than the library's 1400ms celebration roll, which is a
 * scoreboard tempo rather than a breath.
 */
export const WINS_COUNT_UP_MS = COUNT_MS;

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

export interface WinsTileProps {
  tile: ShowcaseWinTile;
  /** When the strand reaches this win — its reveal and its count start together. */
  delayMs?: number | undefined;
  /** The card is already settled: land the count on its value. See ./WinsTileRow.tsx. */
  immediate?: boolean | undefined;
}

export function WinsTile({ tile, delayMs = 0, immediate = false }: WinsTileProps) {
  const numeric = parseNumeric(tile.value);
  return (
    <div
      className={styles.win}
      style={showcaseStyle({
        '--wt-settle-ms': `${String(WINS_SETTLE_MS)}ms`,
        '--wt-delay-ms': `${String(delayMs)}ms`,
      })}
    >
      <span className={styles.disc}>
        <TileIcon name={tile.iconName} />
      </span>
      {/*
        The label and the figure are ONE object and share the tightest gap on
        the card; the gap up to the circle is one rung wider, and the gap to the
        next region wider again. That difference is the whole of the grouping
        (Guardrail 13).
      */}
      <span className={styles.naming}>
        <span className={styles.label}>{tile.label}</span>
        <Figure size="sm">
          {numeric === null ? (
            tile.value
          ) : (
            <CountUpText
              target={numeric.value}
              prefix={numeric.prefix}
              delayMs={delayMs}
              durationMs={WINS_COUNT_UP_MS}
              immediate={immediate}
            />
          )}
        </Figure>
      </span>
    </div>
  );
}

/**
 * `_iconFor`, tinted the thread's own terracotta rather than the page ink.
 *
 * The glyph is part of the same drawing as the ring around it — the rule
 * ../shell/ThreadNav.tsx states for an open destination circle, and the same one
 * applies here.
 */
function TileIcon({ name }: { name: string }) {
  const props = { size: SC.iconSizeMd, className: styles.icon } as const;
  if (name === 'star') return <StarIcon {...props} />;
  if (name === 'award') return <AwardIcon {...props} />;
  if (name === 'gift') return <GiftIcon {...props} />;
  return <HelpIcon {...props} />;
}
