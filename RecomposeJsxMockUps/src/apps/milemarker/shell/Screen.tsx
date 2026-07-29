// THE HORIZON SCAFFOLD — the shape every screen in this fork takes.
//
// Replaces ../support/ShowcaseScaffold.tsx outright, which is why that file is
// deleted from this folder rather than left sitting unused beside it. A fork
// carrying two scaffolds, one of them unreachable, is a fork the next agent has
// to reverse-engineer.
//
// The direction (../layout_brief.yaml) is one hard edge with air above it and
// ground below it, so the scaffold is literally that and nothing else:
//
//   sky     fixed, saturated, holds the ONE live fact of this screen
//   ─────   the horizon: a painted lane stripe, the design's own edge
//   ground  the only thing that scrolls
//   foot    the action band, then the last lane (the four destinations)
//
// WHY THE FOOT IS OUTSIDE THE SCROLLER. The nav has to stay at the reachable
// edge (Guardrail 11) and the action band has to sit directly above it, so both
// live below the scroll box rather than inside it. The ground still reads as
// running unbroken into the last lane because they share one background and the
// only thing between them is a stripe.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Screen.module.css';

export interface ScreenProps {
  /** The sky's contents — normally a <Sky>. */
  sky: ReactNode;
  /** The ground: lanes, in order. */
  children: ReactNode;
  /**
   * The primary action, seated directly above the last lane. Exactly one region
   * per screen may be filled this way; a screen with no primary action passes
   * nothing.
   */
  action?: ReactNode;
  /** The last lane — the four destinations. Absent on `class` and `booking`. */
  foot?: ReactNode;
  /** A shorter sky, for a screen whose subject is the ground. */
  shortSky?: boolean | undefined;
  /**
   * Turn the ground's scrolling off. Default is ON, which is the opposite of
   * the base's scaffold: every screen in this design is a fixed sky over a
   * travelling ground, so scrolling is the norm rather than the exception.
   */
  staticGround?: boolean | undefined;
}

export function Screen({
  sky,
  children,
  action,
  foot,
  shortSky = false,
  staticGround = false,
}: ScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={cx(styles.sky, shortSky && styles.skyShort)}>{sky}</div>
      <div className={cx(styles.ground, staticGround && styles.groundStatic)}>{children}</div>
      {(action !== undefined || foot !== undefined) && (
        <div className={styles.foot}>
          {action}
          {foot}
        </div>
      )}
    </div>
  );
}
