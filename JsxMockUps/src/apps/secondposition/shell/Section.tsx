// A SECTION of the cream reading ground — a brass rule, a label, and prose.
//
// The counterweight to ./Panel.tsx. The app alternates between ANNOUNCED things
// (panels on satin, edge to edge) and READ things (sections on cream, inset),
// and that alternation is the page rhythm. A screen made entirely of one or the
// other has lost it.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Section.module.css';

export interface SectionProps {
  children: ReactNode;
  /** The tracked label that opens the region. Charcoal — never brass. */
  label?: string | undefined;
  /** A serif heading, where the region names something rather than labelling it. */
  title?: string | undefined;
  /** Draw the brass rule above the label. */
  rule?: boolean | undefined;
  /** Let the body run to both screen edges, out of the prose inset. */
  bleed?: boolean | undefined;
  className?: string | undefined;
}

export function Section({ children, label, title, rule = true, bleed = false, className }: SectionProps) {
  return (
    <section className={cx(styles.section, className)}>
      {rule && <div className={styles.rule} />}
      {label !== undefined && label !== '' && <span className={styles.label}>{label}</span>}
      {title !== undefined && title !== '' && <span className={styles.title}>{title}</span>}
      <div className={cx(bleed && styles.bleed)}>{children}</div>
    </section>
  );
}

/** The class for a paragraph of running copy inside a section. */
export const SECTION_PROSE_CLASS = styles.prose;
