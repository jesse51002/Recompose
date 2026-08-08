// THE DISC — the circle, used as this brand's own form.
//
// The generated identity is a roundel, the rank is a medallion and the points
// are struck coins, so anything this app counts, awards or lists as an item is a
// true circle. It is also the answer to a real layout problem: a schedule forty
// rows long cannot give every thumbnail a stretch of full-bleed route, and the
// alternative to a disc is a small rounded rectangle — which is the card this
// design does not have.
//
// TWO FITS, and picking the wrong one is the easy mistake. A PHOTOGRAPH fills
// its disc (`cover`); a generated CUT-OUT sits inside it at 74% (`contain`),
// because a struck mark has its own margins and cropping one to the circle's
// edge cuts the mark.

import { ThemedImage } from 'recompose-react';

import { cx } from '../cx';

import styles from './Disc.module.css';

export interface DiscProps {
  /** Diameter in px. */
  size: number;
  /** The theme slot this image resolves from. */
  slot?: string | undefined;
  /** The bundled art behind the slot. */
  src: string;
  /**
   * A cut-out object rather than a photograph — sits inside the circle instead
   * of filling it.
   */
  object?: boolean | undefined;
  /** Draw the circle as a ring rather than a filled disc. */
  ring?: boolean | undefined;
  className?: string | undefined;
}

export function Disc({ size, slot, src, object = false, ring = false, className }: DiscProps) {
  const style = { width: `${String(size)}px`, height: `${String(size)}px` };
  const imgClass = cx(styles.discImg, object && styles.discObject);
  return (
    <span className={cx(styles.disc, ring && styles.ring, className)} style={style}>
      {slot === undefined ? (
        <img className={imgClass} src={src} alt="" />
      ) : (
        <ThemedImage className={imgClass} slot={slot} fallbackSrc={src} alt="" />
      )}
    </span>
  );
}

/** A disc over a figure and its tracked label — the info-bar item's form here. */
export function DiscStat({
  size,
  slot,
  src,
  object = false,
  figure,
  label,
}: DiscProps & { figure?: string | undefined; label: string }) {
  return (
    <span className={styles.stat}>
      <Disc size={size} slot={slot} src={src} object={object} />
      {figure !== undefined && <span className={styles.statFigure}>{figure}</span>}
      <span className={styles.statLabel}>{label}</span>
    </span>
  );
}
