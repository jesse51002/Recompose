// ONE DAY IN THE INDEX.
//
// A span, not a button — ./DateRow.tsx carries the reasoning, and it is the one
// decision on this screen that reads as a removal and is not: the base's tab is
// a `<button aria-pressed>` with no `onClick`, which announces a control that
// does not exist and cannot be pressed. The day the board opens on is announced
// with `aria-current` instead.

import { cx } from '../cx';

import styles from './DateTab.module.css';

export interface DateTabProps {
  label: string;
  isActive: boolean;
}

export function DateTab({ label, isActive }: DateTabProps) {
  return (
    <span className={cx(styles.day, isActive && styles.active)}>
      {/*
       * The label carries the brass mark on its own box rather than on the
       * cell, so the mark is exactly as wide as the word it marks. A rule
       * spanning the whole 1fr cell would read as a segment of a longer line.
       */}
      <span className={styles.label} aria-current={isActive ? 'date' : undefined}>
        {label}
      </span>
    </span>
  );
}
