// The Layouts page: how many arrangements exist, and who is wearing each.
//
// DEMO-WARE, and it says so on its own surface like the other two.
//
// **The one thing this page has to make obvious in ten seconds:** layout and
// theme scale differently. A theme is data and is generated per tenant; a
// layout is code and has to be maintained — re-derived every time the platform
// ships. Uncapped, that is a branch per tenant forever. Capped, it is a fixed
// number of arrangements that many tenants share, each wearing its own brand.
//
// So the page is a board of columns, one per layout, with the tenants' own
// generated marks stacked underneath — and a cap you can drag. Moving it
// re-packs every column at once, which is the argument as a gesture: three
// layouts still dress thirty-two tenants.
//
// The marks are the same real PNGs the fleet draws, off the read API. Thirty
// grey squares would prove nothing; thirty different marks sharing five
// columns is the whole point rendered rather than claimed.

import { useState, type CSSProperties } from 'react';

import { cx } from '../widgets/cx';
import { FLEET, logoUrl } from '../data/fleetFixtures';
import {
  DEFAULT_LAYOUTS,
  MAX_LAYOUTS,
  MIN_LAYOUTS,
  TENANT_COUNT,
  dealLayouts,
} from '../data/layoutFixtures';

import { SHELL_CLASS } from './phaseClass';
import styles from './LayoutsView.module.css';

/**
 * How long each mark waits before it lands, in ms, and the ceiling on it.
 *
 * The reveal is a pure CSS stagger — one `animation-delay` per cell — rather
 * than a timer pushing state. Three hundred setState calls to animate a list
 * is work the compositor already does for free, and this package treats
 * setting state from an effect as an error anyway.
 *
 * The CEILING is what makes it survive three hundred cells: ungoverned, the
 * last mark would land half a minute after the first and the board would read
 * as broken rather than as filling. Every cell past the cap lands together,
 * which looks like a wave breaking rather than a queue draining.
 */
const STEP_MS = 6;
const MAX_DELAY_MS = 1400;

/**
 * How the board is shaped, given how many cards it has to hold.
 *
 * **The board never scrolls.** A grid you have to scroll answers the question
 * "how many are there?" with "keep going and find out", which is the one
 * question this page exists to answer at a glance. So the cards get smaller
 * instead — six of them are a comparison you can read, a hundred are a wall
 * you take in whole, and both of those are the argument.
 *
 * Columns come from the square root biased for a wide viewport, so the cards
 * stay roughly card-shaped at every cap rather than becoming slivers at one
 * end and slabs at the other.
 */
function shape(cap: number): { cols: number; tile: number; named: boolean } {
  const cols = Math.ceil(Math.sqrt(cap * 1.9));
  return {
    cols,
    // The tiles carry the density, so they take the squeeze. Floors at 6px:
    // below that a mark stops being a mark and becomes a texture, which still
    // reads as "a lot" and is all that is left to say at that size.
    tile: Math.max(6, Math.round(34 - cap * 0.34)),
    // A name nobody can read is noise. Past this the count is the only thing
    // a card has room to say, and the count is what matters at that end.
    named: cap <= 20,
  };
}

export function LayoutsView({ onBack }: { onBack: () => void }) {
  const [cap, setCap] = useState(DEFAULT_LAYOUTS);
  const layouts = dealLayouts(cap);
  const busiest = Math.max(...layouts.map((l) => l.tenants.length));
  const { cols, tile, named } = shape(cap);

  return (
    <div className={cx(styles.page, SHELL_CLASS)}>
      <header className={styles.head}>
        <div className={styles.headText}>
          {/* Reached FROM the fleet, so it owes a way back — it is not a peer
              in the nav and there is nothing else to click. */}
          <button type="button" className={styles.back} onClick={onBack}>
            ← Fleet
          </button>
          <h1>Layouts</h1>
          <p>
            A theme is generated per tenant. A layout is <b>code</b>, and code
            has to be maintained every time the platform ships — so the platform
            caps how many exist. Tenants share an arrangement and wear their own
            brand on it.
          </p>
        </div>

        <div className={styles.cap}>
          <label className={styles.capLabel} htmlFor="layout-cap">
            Layout cap
          </label>
          <div className={styles.capRow}>
            <b>{cap}</b>
            <input
              id="layout-cap"
              type="range"
              min={MIN_LAYOUTS}
              max={MAX_LAYOUTS}
              value={cap}
              onChange={(event) => setCap(Number(event.target.value))}
            />
          </div>
          <span className={styles.capNote}>
            {TENANT_COUNT} tenants · {busiest} on the busiest
          </span>
        </div>
      </header>

      {/* THE COUNT THAT MATTERS, said as a sentence rather than left to be
          worked out from the board. Branches to maintain is the number the
          cap actually controls, and it is the number a room is being asked
          to compare against "one per tenant". */}
      <div className={styles.claim}>
        <span>
          <b>{cap}</b> arrangements to maintain
        </span>
        <i />
        <span>
          <b>{TENANT_COUNT}</b> tenants dressed
        </span>
        <i />
        <span className={styles.claimAlt}>
          uncapped this would be <b>{TENANT_COUNT}</b> branches
        </span>
      </div>

      {/* Re-keyed on the cap so every mark replays its entrance when the board
          re-packs. Without it React reuses the cells and the tenants would
          silently teleport between columns — the one moment this page exists
          to show would be the one moment it did not animate. */}
      <div
        className={styles.board}
        key={cap}
        style={
          {
            '--cols': String(cols),
            '--tile': `${String(tile)}px`,
          } as CSSProperties
        }
      >
        {layouts.map((layout, column) => (
          <section className={styles.column} key={layout.name}>
            <header className={styles.columnHead}>
              {named && <b>{layout.name}</b>}
              <u>
                {layout.tenants.length}
                {named ? (layout.tenants.length === 1 ? ' tenant' : ' tenants') : ''}
              </u>
            </header>

            {/* MARKS ONLY, no names. The roster is the fleet's own logos
                cycled up to a platform-sized count, so names would repeat down
                every column and read as a bug. The mark is what the page is
                about — the name is on the tile's title for anyone who asks. */}
            <div className={styles.cells}>
              {layout.tenants.map((tenant, row) => (
                <img
                  className={styles.cell}
                  // Position, not identity: the roster cycles, so a tenant's
                  // own branch appears many times and is not a key.
                  key={`${String(row)}-${tenant.branch}`}
                  src={logoUrl(tenant.run)}
                  alt=""
                  title={`${tenant.name} · ${layout.name}`}
                  // Down the column, then across, so the board fills as a wave
                  // rather than three hundred things arriving at once.
                  style={{
                    animationDelay: `${String(
                      Math.min(
                        (row * layouts.length + column) * STEP_MS,
                        MAX_DELAY_MS,
                      ),
                    )}ms`,
                  }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className={styles.synthetic}>
        Every layout on this page is invented and the assignment is arbitrary.
        The marks are real — the pipeline made each one — but there are only
        {' '}
        {FLEET.length} of them, cycled to stand in for {TENANT_COUNT} tenants.
      </p>
    </div>
  );
}
