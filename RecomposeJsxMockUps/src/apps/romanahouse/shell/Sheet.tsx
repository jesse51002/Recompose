// THE SHEET — the frame every screen in this design is built on.
//
// One ivory field, edge to edge. It replaces ../support/ShowcaseScaffold.tsx
// (topbar, body, bottom bar) with a head that carries the letterhead, the spec
// block and the four-destination index, a scrolling body, and an optional foot
// band.
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
// walnut band across the sheet. Because the navigation moved into the head, the
// foot of every screen is free — which is what the index buys, and it costs one
// row of height rather than a fifth of the width (Guardrail 11).

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Sheet.module.css';

export interface SheetProps {
  children: ReactNode;
  /** Fixed, above the body. */
  head?: ReactNode;
  /** The walnut action band, pinned to the foot. */
  foot?: ReactNode;
  /** Scroll the body. Off by default — see the header. */
  scroll?: boolean | undefined;
  /** Drop the sheet's horizontal inset, for a body that rules to both edges. */
  flush?: boolean | undefined;
}

export function Sheet({ children, head, foot, scroll = false, flush = false }: SheetProps) {
  return (
    <div className={styles.frame}>
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
