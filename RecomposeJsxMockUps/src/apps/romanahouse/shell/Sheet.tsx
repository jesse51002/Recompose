// THE SHEET — the frame every screen in this design is built on.
//
// One ivory field, edge to edge. It replaces ../support/ShowcaseScaffold.tsx
// with a head that carries the letterhead and the spec block, a scrolling body,
// an optional action band, and the four-destination index at the foot.
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
// The action band is a full-width walnut bar carrying a screen's primary
// action, and it sits directly above the index (Guardrail 11: primary
// navigation lives at the foot). Both are fixed; only the body scrolls.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import type { IndexTab } from './RomanaIndex';
import { RomanaIndex } from './RomanaIndex';
import styles from './Sheet.module.css';

export interface SheetProps {
  children: ReactNode;
  /** Fixed, above the body. */
  head?: ReactNode;
  /** The walnut action band, pinned above the index. */
  foot?: ReactNode;
  /**
   * Which of the four destinations this screen is, or absent for a screen that
   * carries no index at all — `class` and `booking`, which the base gives no
   * bottom bar either.
   *
   * It belongs to the SHEET rather than to the head because the index sits at
   * the foot of the shell: the thumb reaches the bottom of a 390pt screen and
   * not the top, which is the same reasoning that rules out a side rail
   * (Guardrail 11). A screen with both an action band and an index stacks them
   * — the band is this screen's one job, the index is how you leave.
   */
  selected?: IndexTab | undefined;
  /** Scroll the body. Off by default — see the header. */
  scroll?: boolean | undefined;
  /** Drop the sheet's horizontal inset, for a body that rules to both edges. */
  flush?: boolean | undefined;
}

export function Sheet({
  children,
  head,
  foot,
  selected,
  scroll = false,
  flush = false,
}: SheetProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.sheet}>
        {head}
        <div className={cx(styles.body, scroll && styles.bodyScroll, !flush && styles.inset)}>
          {children}
        </div>
        {foot}
        {selected !== undefined && <RomanaIndex selected={selected} />}
      </div>
    </div>
  );
}
