// What this design has cost, in one line of the canvas bar.
//
// The sibling of ./RunMeter.tsx, and it reads the SESSION rather than the run
// — because a design outlives any one run. The interview happens before a run
// exists and carries on after it settles, so a figure read off the run stream
// could only ever be part of the answer.
//
// **It says what is NOT counted, on the surface.** The layout agent runs on
// the operator's own CLI credentials and reports nothing back, so there is no
// honest number for it. A total that quietly omitted the longest-running
// agent would be worse than no total: it would be believed.

import type { SessionView } from '../studio/sessionFold';

import styles from './SpendMeter.module.css';

/**
 * Two significant figures below a cent, because early in an interview the
 * total really is fractions of a cent and "$0.00" reads as "free".
 */
function money(usd: number): string {
  if (usd === 0) return '$0.00';
  if (usd < 0.01) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}

export function SpendMeter({ view }: { view: SessionView }) {
  const total = view.agentCostUsd + view.assetsCostUsd;
  const title =
    `Interview ${money(view.agentCostUsd)} · ` +
    `artwork ${money(view.assetsCostUsd)}. ` +
    'The layout agent is not counted — it runs on your own CLI credentials ' +
    'and reports no cost back.';

  return (
    <div className={styles.meter} title={title}>
      <span className={styles.label}>spent</span>
      <b className={styles.total}>{money(total)}</b>
    </div>
  );
}
