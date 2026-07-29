// THE THREAD'S LAST EXCURSION — three wins on one strand.
//
// The base drew three equally-sized bordered tiles cascading in left to right.
// Everything each tile said is still here (../celebrations/WinsTile.tsx), and so
// is the cascade; what changed is what holds them. The loop above has closed, a
// STEM drops out of the bottom of it, and the line then spreads sideways through
// three circles and off both edges of the screen — so the card is ONE drawing
// from the wreath to the action beneath it rather than a ring with a row parked
// under it.
//
// THE CASCADE IS THE LINE PASSING, WHICH IS THE ONLY KIND THIS APP HAS. The
// strand opens from the CENTRE outward, because that is where the stem lands, so
// the middle win arrives first and the outer two arrive together as the line
// reaches them. The base scaled `badgeStagger` by index to get a left-to-right
// sweep; a sweep from an edge would need the line to enter from that edge, and
// it does not. See ../layout_brief.yaml: "the stagger is not a stagger at all —
// it is a consequence of one continuous stroke passing each node in turn".
//
// THE STRAND BLEEDS PAST ITS OWN BOX ON PURPOSE. ../celebrations/CelebrationFrame.tsx
// insets the card by `--sc-screen-padding-x`, and a line that stopped at that
// inset would TERMINATE MID-SCREEN, which the brief forbids outright. It is
// pulled back out by exactly that token so it leaves through both edges.

import { showcaseStyle } from '../showcaseTokens';

import type { ShowcaseWinTile } from './showcaseCelebrationStats';
import { WinsTile } from './WinsTile';
import styles from './WinsTileRow.module.css';

/**
 * The circle each win sits in.
 *
 * Declared HERE rather than in ../celebrations/WinsTile.module.css because the
 * strand has to run through the circles' centre, and two files each holding
 * their own copy of that number is two sources of truth that drift the first
 * time either is touched. Written once, inherited down.
 */
export const WINS_DISC_PX = 48;

/** How long the stem takes to drop out of the closed loop. */
export const WINS_STEM_MS = 180;

/** How long the strand takes to open from the centre out to both edges. */
export const WINS_STRAND_MS = 380;

/**
 * How much later an outer win arrives than the middle one — the time the strand
 * takes to reach it. Short of the full strand duration because the line reaches
 * a win at its circle, not at the screen edge beyond it.
 */
export const WINS_REACH_MS = 260;

/**
 * When win `index` of `count` arrives: the moment the strand, opening from the
 * centre, reaches it. Symmetric by construction, so a row of any length works
 * and a row of three gives the middle win first and the outer two together.
 */
export function winsTileDelayMs(baseDelayMs: number, index: number, count: number): number {
  if (count <= 1) return baseDelayMs;
  const middle = (count - 1) / 2;
  return baseDelayMs + (Math.abs(index - middle) / middle) * WINS_REACH_MS;
}

export interface WinsTileRowProps {
  tiles: readonly ShowcaseWinTile[];
  /** When the strand starts opening — the moment the stem has landed. */
  baseDelayMs?: number | undefined;
}

export function WinsTileRow({ tiles, baseDelayMs = 0 }: WinsTileRowProps) {
  return (
    <div
      className={styles.row}
      style={showcaseStyle({
        '--wt-disc': `${String(WINS_DISC_PX)}px`,
        '--wr-stem-ms': `${String(WINS_STEM_MS)}ms`,
        // The stem lands exactly as the strand starts, so it runs in the window
        // immediately before it. Clamped at zero: a caller passing no delay gets
        // a stem that draws from the first frame rather than one that starts
        // part-way through itself.
        '--wr-stem-delay-ms': `${String(Math.max(0, baseDelayMs - WINS_STEM_MS))}ms`,
        '--wr-strand-ms': `${String(WINS_STRAND_MS)}ms`,
        '--wr-strand-delay-ms': `${String(baseDelayMs)}ms`,
      })}
    >
      <span className={styles.stem} aria-hidden="true" />
      <span className={styles.strand} aria-hidden="true" />
      {tiles.map((tile, index) => (
        // The tile list is a fixed const trio, so the slot index IS the tile's
        // identity — two tiles may legitimately carry the same label.
        <WinsTile
          key={`${String(index)}-${tile.label}`}
          tile={tile}
          delayMs={winsTileDelayMs(baseDelayMs, index, tiles.length)}
        />
      ))}
    </div>
  );
}
