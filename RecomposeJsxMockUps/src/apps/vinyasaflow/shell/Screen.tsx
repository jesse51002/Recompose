// THE SCAFFOLD — an ordinary one, on purpose.
//
// Replaces the base's `support/ShowcaseScaffold.tsx`, which is what a fork
// owning its own `shell/` means (../../../CLAUDE.md, "A fork owns its own
// shell/").
//
// THERE IS NO RAIL AND NO VEIL. An earlier direction for this run drew one
// continuous line down the left edge of every screen and revealed content by
// uncovering it with a descending sheet. Both are gone, and the reason is the
// realism gate in `mockup-redesign-start`: no shipping app is built on a rail,
// so it read as a gimmick rather than as design. What differentiates this app is
// its canvas, its typography, the scale of its photography and the amount of
// space it spends — the things real apps genuinely differ on.
//
// SCROLLING IS OPT-IN PER SCREEN, and the reason is a CSS rule rather than a
// preference: when one of `overflow-x` / `overflow-y` is `visible` and the other
// is not, the `visible` one computes to `auto`. The celebration surfaces paint
// deliberately outside their box, and a global `overflow-y: auto` would crop
// every one of them.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Screen.module.css';

export interface ScreenProps {
  children: ReactNode;
  /** The fixed region above the body — usually ./Head.tsx. */
  head?: ReactNode;
  /**
   * The four destinations, at the foot. `undefined` on the two screens the
   * member app gives no tabs (`class` and `booking`), so what is reachable
   * never changes.
   */
  foot?: ReactNode;
  /**
   * Scroll the body vertically. OFF by default: it also makes the body clip
   * horizontally (see the header), which is wrong for the celebration cards.
   */
  bodyScroll?: boolean | undefined;
  /**
   * Retained so the screens that opted out of the old line-drawing entrance
   * keep compiling. It no longer selects between two entrances, because there
   * is only one — a short rise and fade. Passing `false` simply means this
   * screen composes its own arrival.
   */
  draws?: boolean | undefined;
}

export function Screen({
  children,
  head,
  foot,
  bodyScroll = false,
  draws = true,
}: ScreenProps) {
  // `SafeArea(top: !hasHead)`. The frame publishes its status inset as
  // `--phone-status-inset`; there is deliberately no bottom counterpart,
  // because the frame's inset override is `EdgeInsets.only(top:)`.
  const safeTop = head === undefined || head === null;

  return (
    <div className={styles.screen}>
      {safeTop && <div className={styles.safeTop} />}
      {head !== undefined && head !== null && <div className={styles.head}>{head}</div>}
      <div
        className={cx(
          styles.body,
          bodyScroll ? styles.bodyScroll : styles.bodyClip,
          draws && styles.rise,
        )}
      >
        {children}
      </div>
      {foot !== undefined && foot !== null && <div className={styles.foot}>{foot}</div>}
    </div>
  );
}
