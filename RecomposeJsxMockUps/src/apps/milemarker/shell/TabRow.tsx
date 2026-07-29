// THE ONE TAB ROW — the store's two categories and the video library's scopes.
//
// It exists because those two shipped as separate near-copies and immediately
// drifted: the store's cells carried NO inline padding and the video's carried
// 16px, for no reason anyone decided. Same control, same design, two
// stylesheets. That is the shape of spacing bug `mockup-qa`'s Pass 2d looks for,
// and a shared component is the only fix that stays fixed.
//
// THE TABS ARE LABELS, NOT CONTROLS, on both screens — the same call the base
// makes. The member app re-selects them against real state this browser does not
// have, and wiring them here would add an affordance the shipped screen does not
// carry. So this takes no callback; `selected` is an index.

import { cx } from '../cx';

import styles from './TabRow.module.css';

export interface TabRowProps {
  labels: readonly string[];
  selected: number;
  /**
   * `fill` shares the width between equal cells (two destinations); `scroll`
   * lets the row travel sideways (more labels than fit). Presentation only —
   * the cells are identical either way, which is the point.
   */
  mode?: 'fill' | 'scroll';
}

export function TabRow({ labels, selected, mode = 'fill' }: TabRowProps) {
  return (
    <div className={cx(styles.row, mode === 'fill' ? styles.fill : styles.scroll)}>
      {labels.map((label, i) => (
        <span key={label} className={cx(styles.cell, i === selected && styles.cellActive)}>
          {i === selected && <span className={styles.tape} />}
          {label}
        </span>
      ))}
    </div>
  );
}
