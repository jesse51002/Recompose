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
//
// THE SCREEN DRAWS ITSELF, AND `.veil` IS HOW. ../layout_brief.yaml's motion
// direction: "A screen does not fade in and does not slide in. Its line enters
// at the top and travels down, drawing itself stroke-first, and each region
// arrives at the moment the line reaches it. The stagger is therefore not a
// stagger at all — it is a consequence of one continuous stroke passing each
// node in turn, which is why it never needs a per-element delay curve."
//
// So there is no per-element delay curve here, and no per-region entrance
// anywhere in this fork's app screens. There is ONE element: a sheet of canvas
// covering everything below the brand mark, whose top edge travels to the
// bottom of the screen over one breath. The rail is UNDER it, so the line
// literally draws itself as the edge passes; every region under it arrives at
// the instant the edge clears it, exactly and by construction rather than by
// arithmetic that has to be kept in sync.
//
// IT IS A VEIL AND NOT A `clip-path`, AND THAT IS THE RULE THAT OUTRANKS THE
// MOTION. A clip removes what it hides from HIT TESTING, so a clipped bottom
// nav is untappable for as long as the line takes to reach it. The veil is
// `pointer-events: none` and merely paints over: every tap target on the screen
// is live from the first frame regardless of what the line is doing. A member
// standing in a studio doorway with their phone out is never made to wait for a
// nicety.

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
   * Let the shell draw this screen's line. ON by default, and the only screen
   * that turns it off is `booking`, whose whole composition IS the line
   * arriving and closing into a loop around the hero. Two descents on one
   * screen is two lines, and this app has one.
   *
   * NOT a vocabulary of entrances. There is one animation per asset here and
   * this is not a second one — it is the one screen that draws its own.
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
      <div className={styles.rail} aria-hidden="true" />
      {safeTop && <div className={styles.safeTop} />}
      {head !== undefined && head !== null && <div className={styles.head}>{head}</div>}
      <div className={cx(styles.body, bodyScroll ? styles.bodyScroll : styles.bodyClip)}>
        {children}
      </div>
      {foot !== undefined && foot !== null && <div className={styles.foot}>{foot}</div>}
      {/*
        The line's travel. Last in the DOM and painted above everything (see the
        header), covering the screen from the mark's foot down and lifting away
        as the stroke descends. `aria-hidden` and `pointer-events: none`: it is
        the only thing on the screen that is not a fact and not a target.
      */}
      {draws && <div className={styles.veil} aria-hidden="true" />}
    </div>
  );
}
