// The pieces that hang on the line ./Screen.tsx draws.
//
// The line itself is NOT here — it is one element on the screen root, so it
// cannot be broken by anything assembled below. What is here is everything that
// attaches to it: the swell where a region begins, the sideways excursion where
// the app needs to hold a row of things, and the closing loop the celebration
// ends on.
//
// A REGION IS A NODE PLUS A SPOKEN LABEL PLUS ITS CONTENT, and the label is
// sentence case because this app never sets one in capitals. That is a rule of
// the design rather than a default: the voice is a teacher with a hand on your
// shoulder, and a tracked uppercase caption is the voice of an instrument
// panel. See ../layout_brief.yaml.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Thread.module.css';

/**
 * How a node is drawn.
 *
 * `open` lets the line run through it — a bead on a string, and the default
 * for anything that is simply a place on the sequence. `solid` is the line
 * swelling to a stop, for the thing happening now. `calm` is the same in sage,
 * which this design spends only on a thing already earned or attended.
 * `carry` is the one variant big enough to hold a figure, and the only one
 * that masks the line behind it.
 */
export type NodeKind = 'open' | 'solid' | 'calm' | 'carry';

// `string | undefined` because CSS-module lookups are typed that way under
// `noUncheckedIndexedAccess`, and `cx` already drops an undefined. Widening it
// here beats a non-null assertion that would hide a genuinely missing class —
// which is Guardrail 2's second trap: `styles.x` for a class the stylesheet
// does not define is `undefined`, renders as no class at all, and produces an
// unstyled element with no error anywhere.
function nodeClass(kind: NodeKind): string | undefined {
  if (kind === 'solid') return styles.nodeSolid;
  if (kind === 'calm') return styles.nodeCalm;
  if (kind === 'carry') return styles.nodeCarry;
  return styles.nodeOpen;
}

export interface NodeProps {
  kind?: NodeKind | undefined;
  /** Only a `carry` node has room for anything inside it. */
  children?: ReactNode;
}

/** The swell on the line. Placed by the line's CENTRE, so it stays on it at any size. */
export function Node({ kind = 'open', children }: NodeProps) {
  return (
    <span className={cx(styles.node, nodeClass(kind))} aria-hidden={children === undefined}>
      {children}
    </span>
  );
}

export interface RegionProps {
  /**
   * What this region announces itself as, in the app's own voice. Sentence
   * case, always. Omitted where the content names itself.
   */
  label?: string | undefined;
  kind?: NodeKind | undefined;
  /**
   * Let the content run to BOTH edges instead of sitting right of the thread —
   * for a full-bleed photograph, which is the only thing that earns it.
   */
  bleed?: boolean | undefined;
  children?: ReactNode;
}

/**
 * One place on the sequence: a node, the label beside it, and what hangs below.
 *
 * The label and the node share a grid ROW, so they are one object and cannot
 * drift apart; the content sits under the label rather than under the thread.
 * The gap inside a region is `--sc-spacing-medium` and the gap BETWEEN regions
 * is the caller's `--sc-spacing-big` — that difference is what does the
 * grouping, and getting it backwards is the failure Guardrail 13 describes.
 */
export function Region({ label, kind = 'open', bleed = false, children }: RegionProps) {
  return (
    <section className={styles.region}>
      <Node kind={kind} />
      {label !== undefined && label !== '' ? <p className={styles.say}>{label}</p> : null}
      {children !== undefined && children !== null ? (
        <div className={bleed ? styles.contentBleed : styles.content}>{children}</div>
      ) : null}
    </section>
  );
}

export interface BowProps {
  children: ReactNode;
}

/**
 * The line going out sideways to gather a row of things, and back down.
 *
 * A week of days, a shelf of films, a strip of tokens. It is the only
 * horizontal scroller in the app, which is what makes sideways movement read as
 * part of one sequence rather than as a second axis.
 */
export function Bow({ children }: BowProps) {
  return (
    <div className={styles.bow}>
      <div className={styles.bowStroke} aria-hidden="true" />
      <div className={styles.bowItems}>{children}</div>
    </div>
  );
}

export interface LoopProps {
  /** Diameter, in the phone's logical px. */
  size: number;
  children?: ReactNode;
}

/**
 * The celebration's closing loop — the one place the line completes instead of
 * continuing off the edge.
 *
 * Sized by the caller because what it encircles differs per card, and a ring
 * that does not fit its hero is worse than no ring.
 */
export function Loop({ size, children }: LoopProps) {
  return (
    <div
      className={styles.loop}
      style={{ width: `${String(size)}px`, height: `${String(size)}px` }}
    >
      {children}
    </div>
  );
}
