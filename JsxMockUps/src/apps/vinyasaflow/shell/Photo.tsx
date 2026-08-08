// THE ONLY RECTANGLE IN THIS APP.
//
// There are three forms here — the line, the circle, and the photograph — and
// this is the third. Everything else is drawn from the first two.
//
// THE PROPORTION OF A PHOTOGRAPH IS NEVER THE LAYOUT'S TO CHOOSE, and this
// component makes that structural rather than remembered: NO VARIANT SETS BOTH
// WIDTH AND HEIGHT. One axis is given and the other is `auto`, so the box is
// always the picture's own shape and there is nothing for `object-fit: cover`
// to crop away. Guardrail 10b is the failure this avoids, and it is invisible
// to typecheck, lint, the suite and the token sweep — the layout stays
// "correct" while the pictures are destroyed.
//
// That also means a tenant whose art arrives at a different proportion than
// this run's is handled for free: the layout solves around whatever shape turns
// up, rather than asserting one and cropping to it.
//
// `minted` is the deliberate exception, and it is not a photograph. The
// generated cut-outs — the roundel, the medallion, the struck coins — are
// square, centre-weighted and transparent-edged, so a circle costs them nothing
// and belongs to them. Never pass a landscape photograph to it.

import { ThemedImage } from 'recompose-react';

import styles from './Photo.module.css';

export interface PhotoProps {
  /** The generated image slot this picture resolves from. */
  slot: string;
  /** The bundled fallback URL, for when nothing has loaded. */
  fallback: string;
  alt: string;
}

/**
 * A photograph that is the subject of its screen or the head of a list.
 *
 * Runs edge to edge; its height is whatever its own proportion makes it. The
 * thread is redrawn across it in the knockout ink, because the line may never
 * break and the picture covers the one the screen root draws.
 */
export function BleedPhoto({ slot, fallback, alt }: PhotoProps) {
  return (
    <div className={styles.bleed}>
      <ThemedImage slot={slot} fallbackSrc={fallback} alt={alt} className={styles.bleedImg} />
      <span className={styles.over} aria-hidden="true" />
    </div>
  );
}

/** A photograph that is one of many in a list. Width given, height derived. */
export function InlinePhoto({ slot, fallback, alt }: PhotoProps) {
  return (
    <ThemedImage slot={slot} fallbackSrc={fallback} alt={alt} className={styles.inline} />
  );
}

/**
 * A frame on a shelf. HEIGHT is the given axis, so stills of differing
 * proportion sit in one row without any of them being cropped to match a
 * neighbour — they align top and bottom and differ in width.
 */
export function StripPhoto({ slot, fallback, alt }: PhotoProps) {
  return <ThemedImage slot={slot} fallbackSrc={fallback} alt={alt} className={styles.strip} />;
}

export interface MintedProps extends PhotoProps {
  /** Diameter in the phone's logical px. */
  size: number;
}

/**
 * A cut-out object this brand minted, in a circle. NOT for photographs — see
 * the header.
 */
export function MintedDisc({ slot, fallback, alt, size }: MintedProps) {
  return (
    <ThemedImage
      slot={slot}
      fallbackSrc={fallback}
      alt={alt}
      className={styles.minted}
      style={{ width: `${String(size)}px`, height: `${String(size)}px` }}
    />
  );
}

export interface CaptionProps {
  children: string;
}

/** A photograph's caption. Outside the frame, never over it. */
export function Caption({ children }: CaptionProps) {
  return <p className={styles.caption}>{children}</p>;
}
