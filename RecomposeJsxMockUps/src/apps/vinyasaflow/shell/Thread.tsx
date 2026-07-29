// THE EDITORIAL SECTION, THE SHELF, AND THE HERO WELL.
//
// THE FILE KEEPS ITS NAME AND ITS EXPORTS, AND NOTHING ELSE FROM WHAT IT WAS.
// It used to hang nodes off one continuous line running down the left of every
// screen. That direction failed the realism gate in `mockup-redesign-start` —
// no shipping app is built on a rail — so the line is gone and a `Region` is now
// what a magazine page and every premium wellness app already use: a section
// with a heading, separated from its neighbours by SPACE.
//
// The names survive because ~30 stylesheets and 13 screens resolve against them
// and this fork is being worked back one screen at a time. They should be
// renamed as each screen is next touched; `Node` in particular now renders
// nothing at all and every call to it is dead weight.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Thread.module.css';

/**
 * Retired. Every variant renders nothing — a node was a swell on a line that no
 * longer exists.
 */
export type NodeKind = 'open' | 'solid' | 'calm' | 'carry';

export interface NodeProps {
  kind?: NodeKind | undefined;
  children?: ReactNode;
}

/** Renders nothing. Retained so existing screens keep resolving. */
export function Node(_props: NodeProps) {
  return null;
}

export interface RegionProps {
  /**
   * The section's heading, in the app's own voice. Sentence case, always.
   * Omitted where the content names itself.
   */
  label?: string | undefined;
  /** Retired — a section no longer carries a mark. */
  kind?: NodeKind | undefined;
  /**
   * Let the content run to BOTH edges instead of sitting inside the margin —
   * for a full-bleed photograph, which is the only thing that earns it.
   */
  bleed?: boolean | undefined;
  children?: ReactNode;
}

/**
 * One section: a heading, and what sits under it.
 *
 * The gap under the heading is `--sc-spacing-medium` and the gap BETWEEN
 * sections is the caller's `--sc-spacing-big`. That difference is what carries
 * the grouping; equal gaps everywhere is a screen that reads as a list of parts
 * even though no single value is wrong (Guardrail 13).
 */
export function Region({ label, bleed = false, children }: RegionProps) {
  return (
    <section className={cx(bleed ? styles.regionBleed : styles.region)}>
      {label !== undefined && label !== '' ? (
        <p className={cx(styles.say, bleed && styles.region)}>{label}</p>
      ) : null}
      {children !== undefined && children !== null ? (
        <div className={label === undefined || label === '' ? undefined : styles.content}>
          {children}
        </div>
      ) : null}
    </section>
  );
}

export interface BowProps {
  children: ReactNode;
}

/**
 * A horizontal shelf — the standard pattern every content app uses for a set of
 * covers, and the only sideways scrolling in this app.
 *
 * It bleeds past the right edge on purpose: a shelf that stops inside the margin
 * looks finished, and a member does not know to scroll it.
 */
export function Bow({ children }: BowProps) {
  return (
    <div className={styles.bow}>
      <div className={styles.bowItems}>{children}</div>
    </div>
  );
}

export interface LoopProps {
  /** The stage's width, in the phone's logical px. */
  size: number;
  children?: ReactNode;
}

/**
 * The celebration's centred stage.
 *
 * No border and no fill: a generated cut-out is square, centre-weighted and
 * transparent-edged, and it reads best given room and left alone. `size` sets
 * the width only — the height follows what is inside it, so nothing gets
 * squashed to fit a square that no longer has a reason to be square.
 */
export function Loop({ size, children }: LoopProps) {
  return (
    <div className={styles.loop} style={{ width: `${String(size)}px` }}>
      {children}
    </div>
  );
}
