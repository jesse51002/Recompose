// A PHOTOGRAPH AT ITS OWN PROPORTION — one frame of a filmstrip.
//
// THIS COMPONENT EXISTS BECAUSE ../shell/Disc.tsx WAS USED FOR THE WRONG THING.
// Every shelf thumbnail in this app is a 1280x720 video still with its title
// burnt into the top third; the first build struck them into 1:1 discs, which
// threw away 44% of the width to the crop and the corners to the mask, and the
// shelves rendered as unreadable fragments — "ENDARY", "KING", "1-6 D".
//
// The rule is now in ../layout_brief.yaml and it outranks every shape
// preference the direction states: THE PROPORTION OF A PHOTOGRAPH IS NEVER THE
// LAYOUT'S TO CHOOSE. A photograph arrives already composed, so a box of a
// different ratio does not resize it, it destroys it. The disc is for the
// objects this brand minted — the roundel, the medallion, the struck coins,
// which are square, centre-weighted and transparent-edged — and for headshots,
// which are close enough to square to join them.
//
// `mockup-redesign-general` names this failure mode in its "does it look right"
// section and it still shipped here once. The guardrail was read and the brief
// contradicted it, which is why the brief is where the fix went first.

import { ThemedImage } from 'recompose-react';

import { cx } from '../cx';

import styles from './Frame.module.css';

export interface FrameProps {
  /** Width in px. The height follows from `ratio`. */
  width: number;
  /**
   * The SOURCE's aspect ratio, not a shape the layout wants. 16/9 for a video
   * still, 3/2 for most class photography.
   */
  ratio: number;
  /** The theme slot this image resolves from. */
  slot?: string | undefined;
  /** The bundled art behind the slot. */
  src: string;
  className?: string | undefined;
}

export function Frame({ width, ratio, slot, src, className }: FrameProps) {
  const style = {
    width: `${String(width)}px`,
    height: `${String(Math.round(width / ratio))}px`,
  };
  return (
    <span className={cx(styles.frame, className)} style={style}>
      {slot === undefined ? (
        <img className={styles.img} src={src} alt="" />
      ) : (
        <ThemedImage className={styles.img} slot={slot} fallbackSrc={src} alt="" />
      )}
    </span>
  );
}
