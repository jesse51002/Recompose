// THE SHEET — the frame every screen in this design is built on.
//
// One ivory field, edge to edge, held beside the walnut rail. It replaces
// ../support/ShowcaseScaffold.tsx (which stacks a topbar, a body and a bottom
// bar in a column) with a ROW: rail, then sheet; and inside the sheet a head, a
// scrolling body and an optional foot band.
//
// It keeps the two properties the scaffold it replaces was careful about:
//
//   * SCROLLING IS OPT-IN. When one of `overflow-x` / `overflow-y` is `visible`
//     and the other is not, the visible one COMPUTES to `auto` — so turning a
//     body into a vertical scroller silently makes it clip horizontally too.
//     The celebration surfaces paint deliberately outside their box and must
//     keep `visible`, so they ask for no scroll.
//   * THE STATUS INSET is honoured by whichever element is flush to the top.
//
// The foot is where this design puts a screen's primary action: a full-width
// walnut band across the sheet. Because the navigation went vertical, the foot
// of every screen is free, and that is what pays for the rail.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Sheet.module.css';

export interface SheetProps {
  children: ReactNode;
  /** The rail, on the four screens that carry one. Omitted elsewhere. */
  rail?: ReactNode;
  /** Fixed, above the body. */
  head?: ReactNode;
  /** The walnut action band, pinned to the foot. */
  foot?: ReactNode;
  /** Scroll the body. Off by default — see the header. */
  scroll?: boolean | undefined;
  /** Drop the sheet's horizontal inset, for a body that rules to both edges. */
  flush?: boolean | undefined;
}

export function Sheet({ children, rail, head, foot, scroll = false, flush = false }: SheetProps) {
  return (
    <div className={styles.frame}>
      {rail}
      <div className={styles.sheet}>
        {head}
        <div className={cx(styles.body, scroll && styles.bodyScroll, !flush && styles.inset)}>
          {children}
        </div>
        {foot}
      </div>
    </div>
  );
}
