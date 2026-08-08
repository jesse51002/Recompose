// LANES — the ground's only structure.
//
// There are no cards in this design. A region is a band of the ground opened by
// a painted stripe, and that is the whole vocabulary: no rounded containers, no
// shadows, no elevation, no tinted panels. The moment a card appears the ground
// stops being a surface you travel over and becomes a desk with things on it.
//
// `first` exists because the horizon is already an edge — a lane stripe
// immediately under a 3px white border would read as a double rule.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Lane.module.css';

export interface LaneProps {
  children: ReactNode;
  /** The 10px tracked label that opens the region. */
  label?: string | undefined;
  /** A second label at the far end of the same row — a count, a total, a unit. */
  labelAside?: ReactNode;
  /** The lane that opens the ground: no stripe, because the horizon is one. */
  first?: boolean | undefined;
  /** A hairline division rather than a painted stripe — inside one list. */
  soft?: boolean | undefined;
  /** Content runs to both edges: a full-bleed photograph, a scroller. */
  bleed?: boolean | undefined;
  /** No vertical padding — the content brings its own. */
  flush?: boolean | undefined;
  /** Half the vertical padding. */
  tight?: boolean | undefined;
  className?: string | undefined;
}

export function Lane({
  children,
  label,
  labelAside,
  first = false,
  soft = false,
  bleed = false,
  flush = false,
  tight = false,
  className,
}: LaneProps) {
  return (
    <section
      className={cx(
        styles.lane,
        first && styles.first,
        soft && styles.soft,
        bleed && styles.bleed,
        flush && styles.flush,
        tight && styles.tight,
        className,
      )}
    >
      {label !== undefined &&
        (labelAside === undefined ? (
          <span className={styles.label}>{label}</span>
        ) : (
          <div className={styles.labelRow}>
            <span className={styles.label}>{label}</span>
            <span className={styles.labelAside}>{labelAside}</span>
          </div>
        ))}
      {children}
    </section>
  );
}

/** The same label, for a caller composing its own row. */
export function LaneLabel({ children }: { children: ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}
