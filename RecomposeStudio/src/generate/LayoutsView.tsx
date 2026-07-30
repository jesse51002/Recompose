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

import { useState } from 'react';

import { cx } from '../widgets/cx';
import { FLEET, logoUrl } from '../data/fleetFixtures';
import {
  DEFAULT_LAYOUTS,
  MAX_LAYOUTS,
  MIN_LAYOUTS,
  dealLayouts,
} from '../data/layoutFixtures';

import { SHELL_CLASS } from './phaseClass';
import styles from './LayoutsView.module.css';

/**
 * How long each mark waits before it lands, in ms.
 *
 * The reveal is a pure CSS stagger — `--i` per cell, multiplied here — rather
 * than a timer pushing state. Thirty-two setState calls to animate a list is
 * work the compositor already does for free, and this package treats setting
 * state from an effect as an error anyway.
 */
const STEP_MS = 55;

export function LayoutsView({ onBack }: { onBack: () => void }) {
  const [cap, setCap] = useState(DEFAULT_LAYOUTS);
  const layouts = dealLayouts(cap);
  const busiest = Math.max(...layouts.map((l) => l.tenants.length));

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
            {FLEET.length} tenants · {busiest} on the busiest
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
          <b>{FLEET.length}</b> tenants dressed
        </span>
        <i />
        <span className={styles.claimAlt}>
          uncapped this would be <b>{FLEET.length}</b> branches
        </span>
      </div>

      {/* Re-keyed on the cap so every mark replays its entrance when the board
          re-packs. Without it React reuses the cells and the tenants would
          silently teleport between columns — the one moment this page exists
          to show would be the one moment it did not animate. */}
      <div className={styles.board} key={cap}>
        {layouts.map((layout, column) => (
          <section className={styles.column} key={layout.name}>
            <header className={styles.columnHead}>
              <b>{layout.name}</b>
              <u>
                {layout.tenants.length}{' '}
                {layout.tenants.length === 1 ? 'tenant' : 'tenants'}
              </u>
            </header>

            <div className={styles.cells}>
              {layout.tenants.map((tenant, row) => (
                <div
                  className={styles.cell}
                  key={tenant.branch}
                  title={`${tenant.name} · ${layout.name}`}
                  // Down the column, then across, so the board fills as a
                  // wave rather than thirty-two things arriving at once.
                  style={{
                    animationDelay: `${String((row * layouts.length + column) * STEP_MS)}ms`,
                  }}
                >
                  <img src={logoUrl(tenant.run)} alt="" />
                  <span>{tenant.name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className={styles.synthetic}>
        Every tenant and layout on this page is invented, and the assignment is
        arbitrary. Only the marks are real — the pipeline made each one.
      </p>
    </div>
  );
}
