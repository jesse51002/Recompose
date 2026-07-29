// THE SCAFFOLD, and the thread that makes this design what it is.
//
// Replaces the base's `support/ShowcaseScaffold.tsx` outright rather than
// restyling it, which is what a fork owning its own `shell/` means
// (../../../CLAUDE.md, "A fork owns its own shell/").
//
// THE THREAD IS DRAWN HERE, ONCE, AS ONE ELEMENT. `.rail` runs `top: 0` to
// `bottom: 0` of the screen root, so it is continuous BY CONSTRUCTION: no
// arrangement of children can break it, no region has to remember to continue
// it, and a screen that scrolls does not tear it. That is deliberate — the
// brief's one absolute is that the line never terminates mid-screen, and the
// cheapest way to guarantee a property is to make it unrepresentable to
// violate.
//
// Content sits ABOVE the rail (z-index 1 against its 0), so:
//
//   * a node masks the line simply by having a background (./Thread.tsx);
//   * a full-bleed photograph covers it and redraws it in the knockout ink on
//     top (./Photo.tsx), which is the brief's "the same line in two inks";
//
// and neither has to coordinate with this file.
//
// SCROLLING IS OPT-IN PER SCREEN, and the reason is a CSS rule rather than a
// preference: when one of `overflow-x` / `overflow-y` is `visible` and the
// other is not, the `visible` one computes to `auto`. The celebration surfaces
// paint deliberately outside their box, and a global `overflow-y: auto` would
// crop every one of them.

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
}

export function Screen({ children, head, foot, bodyScroll = false }: ScreenProps) {
  // `SafeArea(top: !hasHead)`. The frame publishes its status inset as
  // `--phone-status-inset`; there is deliberately no bottom counterpart,
  // because the frame's inset override is `EdgeInsets.only(top:)`.
  const safeTop = head === undefined || head === null;

  return (
    <div className={styles.screen}>
      <div className={styles.rail} aria-hidden="true" />
      {safeTop && <div className={styles.safeTop} />}
      {head !== undefined && head !== null && <div className={styles.head}>{head}</div>}
      <div className={cx(styles.body, bodyScroll ? styles.bodyScroll : styles.bodyClip)}>
        {children}
      </div>
      {foot !== undefined && foot !== null && <div className={styles.foot}>{foot}</div>}
    </div>
  );
}
