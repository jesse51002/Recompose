// THE SCAFFOLD — every screen in this fork sits in one of these.
//
// Replaces the base's `support/ShowcaseScaffold.tsx`, which is DELETED from
// this folder rather than left beside it: a fork carrying two scaffolds, one of
// them unreachable, is a fork the next agent has to reverse-engineer.
//
// It keeps the base's two load-bearing behaviours, because both are correctness
// rather than style — the opt-in body scroll (see the stylesheet) and the
// top-only safe area — and changes the one that is style: there is no default
// horizontal inset, because this design's unit runs edge to edge.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Screen.module.css';

export interface ScreenProps {
  children: ReactNode;
  /** The masthead. Its presence is what suppresses the safe-area spacer. */
  head?: ReactNode;
  /** The satin foot. Absent on `class` and `booking`, as in the member app. */
  foot?: ReactNode;
  /**
   * Inset the body for running prose. OFF by default — a column of panels is
   * full-bleed, and only a reading section asks for the gutter.
   */
  prose?: boolean | undefined;
  /**
   * Scroll the body vertically. OFF by default: it also makes the body clip
   * horizontally, which is exactly wrong for the celebration surfaces that
   * paint outside their box.
   */
  scroll?: boolean | undefined;
  /** CSS colour for the whole screen. Defaults to the cream ground. */
  background?: string | undefined;
}

export function Screen({ children, head, foot, prose, scroll, background }: ScreenProps) {
  const hasHead = head !== undefined && head !== null;

  return (
    <div
      className={styles.screen}
      style={background === undefined ? undefined : { background }}
    >
      {!hasHead && <div className={styles.safeTop} />}
      {head}
      <div className={cx(styles.body, scroll === true && styles.bodyScroll, prose === true && styles.padProse)}>
        {children}
      </div>
      {foot}
    </div>
  );
}
