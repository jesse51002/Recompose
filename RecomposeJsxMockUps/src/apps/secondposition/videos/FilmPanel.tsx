// THE FILM PANEL — this screen's unit, and the videos-tab reading of
// ../shell/Panel.tsx.
//
// ../layout_brief.yaml: everything the app lists — a class, a reward, a film —
// is one full-bleed panel that is half picture and half satin field, with the
// name knocked out of the satin in the display serif. Two registers and never a
// third: the opening work is BILLED, its picture full width at its own
// proportion with the satin carried underneath as a plinth; everything after it
// is SPLIT, the picture beside its name.
//
// WHY THIS EXISTS BESIDE THE SHELL'S `Panel` RATHER THAN CALLING IT. Two
// reasons, and both are properties of this screen rather than preferences:
//
//   1. `Panel` renders a <button> and requires somewhere to go. A film has
//      nowhere: there is no player screen in this asset and inventing one would
//      add a capability the platform's own app does not have here. A <button>
//      wired to nothing is Guardrail 4's "rendered affordance with no handler",
//      which is a bug this package has already shipped twice. So a film panel
//      is an <article>, exactly as the base's video cards were.
//   2. `Panel`'s SPLIT register is a 200px-picture grid — a vertical-list
//      geometry. This screen's lists run SIDEWAYS (one carousel per genre), and
//      on a sideways strip "beside the picture" is where the NEXT film is. Put
//      the satin there and the unit dissolves; the only place left for it is
//      underneath, which is the billed geometry at strip scale. So this screen
//      spends both registers on the same axis: the hero billed at full width,
//      each shelf film billed at 260. It is the same unit at two sizes, which
//      is what the brief calls the bill's one concession to hierarchy.
//
// EVERY STILL IS 16:9 AND GETS A 16:9 BOX. Guardrail 10b, and it has really
// gone wrong here: cropping a 1.78 still to a square discards 44% of the width
// and renders fragments of the burnt-in title — `ENDARY`, `KING`, `1-6 D` are
// real output from this package. The run's four generated stills measure
// 1200x675 and the shared-pool fallbacks are YouTube's own 1280x720, so the box
// below is `16 / 9` for both and `cover` crops nothing at all.

import type { CSSProperties, ReactNode } from 'react';

import { cx } from '../cx';

import styles from './FilmPanel.module.css';
import { PART_ATTR } from './videoParts';

/**
 * Which of the two registers this film is given.
 *
 * `billed` — the hero: the still full width of the screen, the plinth beneath
 * it carrying the largest name anywhere on the page.
 * `shelf` — a film on a genre strip: the same construction in a fixed column,
 * with the name at the panel rung instead of the billed one.
 */
export type FilmRegister = 'billed' | 'shelf';

export interface FilmPanelProps {
  register: FilmRegister;
  /** The still. A `<VideoThumbnail>`, which fills whatever box it is given. */
  media: ReactNode;
  /** The field's contents — the name, then the facts about it. */
  children: ReactNode;
  /**
   * Position in its column or strip, for the entrance stagger. Panels open on
   * one fixed interval (../shell/phrase.ts) so a screenful reads as a count.
   */
  index?: number | undefined;
  /** The `data-sc-part` identity the invariant counts this panel under. */
  part: string;
}

export function FilmPanel({ register, media, children, index = 0, part }: FilmPanelProps) {
  const billed = register === 'billed';
  return (
    <article
      className={cx(styles.panel, billed ? styles.billed : styles.shelf)}
      style={{ '--film-index': String(index) } as CSSProperties}
      {...{ [PART_ATTR]: part }}
    >
      {/*
        A SHELF STILL IS FRAMED IN BRASS AND THE HERO IS NOT, and that is the
        brief's own rule rather than an inconsistency: brass frames "a thumbnail
        too small to hold its own edge". These stills carry loud burnt-in
        lettering right to their borders, so at 260 the picture bleeds into the
        cream and stops reading as a frame; at 390 it holds its own edge and a
        line drawn round it would fight the full bleed.
      */}
      <div className={cx(styles.frame, !billed && styles.framed)}>
        <div className={styles.media}>{media}</div>
      </div>
      <div className={styles.field}>
        {children}
        {/*
          The veil is the entrance and it is LAST in the field so it lies over
          the type. It never intercepts a tap — see the stylesheet.
        */}
        <span className={styles.veil} aria-hidden="true" />
      </div>
    </article>
  );
}

/** The name of the film. The largest thing in its panel, always. */
export const FILM_NAME_CLASS = styles.name;

/** The line of facts under the name — the channel, the view count. */
export const FILM_META_CLASS = styles.meta;

/** One fact inside that line. Ellipsised, so a long channel never wraps. */
export const FILM_FACT_CLASS = styles.fact;
