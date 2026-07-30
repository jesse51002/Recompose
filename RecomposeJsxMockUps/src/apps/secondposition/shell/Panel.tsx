// THE PANEL — the unit this whole design is built from.
//
// Every listable thing in the app is one of these: a class, a reward, a film.
// Half picture and half name, edge to edge, no card. Read ../layout_brief.yaml;
// this component is that brief made executable, and the two registers below are
// the only two it allows.
//
// WHY THE RATIO IS A PROP AND NOT A CONSTANT. Guardrail 10b, which shipped a
// real bug in `apps/milemarker/`: its brief mandated a container SHAPE
// ("full-bleed or a disc, never an inset rectangle"), which silently forced 1:1
// boxes onto 1.78 source art and destroyed every shelf thumbnail. A photograph
// arrives already composed; a box of a different ratio does not resize it, it
// throws part of it away. So the caller states what the ART is and this
// component gives it a box of that shape.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Panel.module.css';

/**
 * The proportion of the SOURCE ART, not a design preference.
 *
 * `photo` — the generated class and reward photographs, which measure 1.50.
 * `still` — a video still, which measures 1.78.
 */
export type PanelRatio = 'photo' | 'still';

const RATIO: Readonly<Record<PanelRatio, string>> = Object.freeze({
  photo: '3 / 2',
  still: '16 / 9',
});

export interface PanelProps {
  /**
   * `billed` — the opening work: the picture full width at its own proportion
   * with the satin carried underneath as a plinth. One per screen.
   * `split` — everything after it: the picture beside its name, each owning a
   * comparable share of the row.
   */
  register: 'billed' | 'split';
  ratio: PanelRatio;
  /** The picture. A `<ThemedImage>`; it is given `.mediaImg` by the caller. */
  media: ReactNode;
  /** The name. The largest thing in the panel, always. */
  name: string;
  /** Times, instructors, counts — the facts you choose BETWEEN panels on. */
  meta?: ReactNode;
  /** A cost or duration, on its own line beneath the meta. */
  trailing?: ReactNode;
  /**
   * Position in the column, for the entrance stagger. Panels open on a fixed
   * interval — the same one every time, so a screenful reads as a count rather
   * than a flourish.
   */
  index?: number | undefined;
  /** Where this panel goes. Wired by the screen; a panel is never inert. */
  onOpen?: (() => void) | undefined;
  /** An accessible name for the control, when the visible name is not enough. */
  label?: string | undefined;
}

export function Panel({
  register,
  ratio,
  media,
  name,
  meta,
  trailing,
  index = 0,
  onOpen,
  label,
}: PanelProps) {
  const billed = register === 'billed';

  return (
    <button
      type="button"
      className={cx(styles.panel, billed ? styles.billed : styles.split)}
      style={{ '--panel-index': String(index) } as React.CSSProperties}
      onClick={onOpen}
      aria-label={label ?? name}
    >
      <div className={styles.media} style={{ aspectRatio: RATIO[ratio] }}>
        {media}
      </div>
      <div className={styles.field}>
        <span className={styles.name}>{name}</span>
        {meta !== undefined && meta !== null && <span className={styles.meta}>{meta}</span>}
        {trailing !== undefined && trailing !== null && (
          <span className={styles.trailing}>{trailing}</span>
        )}
        {/*
         * The veil is the entrance and it is LAST in the field so it lies over
         * the type. It never intercepts a tap — see the stylesheet.
         */}
        <span className={styles.veil} aria-hidden="true" />
      </div>
      {/*
       * The parting line, in two pieces because it crosses two fields and no
       * single colour is legible on both. See the stylesheet.
       */}
      <span className={styles.rule} aria-hidden="true" />
      {!billed && <span className={styles.ruleField} aria-hidden="true" />}
    </button>
  );
}

/** The class every `<ThemedImage>` handed to `media` should carry. */
export const PANEL_MEDIA_CLASS = styles.mediaImg;

/** The class for a small cut-out sitting inside `trailing` (a points token). */
export const PANEL_TRAILING_ICON_CLASS = styles.trailingIcon;
