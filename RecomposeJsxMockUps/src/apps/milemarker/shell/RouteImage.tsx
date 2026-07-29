// A PHOTOGRAPH AS GROUND — full-bleed, edge to edge, bounded by lane stripes.
//
// Replaces ../classdetail/sections/ClassImageBanner.tsx and the base's other
// inset photo treatments. The rule is in ../layout_brief.yaml and it is
// absolute: full-bleed or a disc, never an inset rectangle. A photograph that is
// the subject of its screen is a stretch of route, and a stretch of route runs
// to both edges.
//
// The caption is a child of THIS component rather than something a caller
// places, so it cannot end up on top of the picture. Text over a stock
// photograph is the one thing this design refuses — it is what makes a branded
// app look like a template.

import { ThemedImage } from 'recompose-react';

import styles from './RouteImage.module.css';

export interface RouteImageProps {
  /** The theme slot this image resolves from. */
  slot?: string | undefined;
  /** The bundled art behind the slot. */
  src: string;
  /**
   * The SOURCE's aspect ratio. The width is always the full screen, so this is
   * what sets the height — a hardcoded pixel height forces the box to whatever
   * ratio the screen width implies and crops the picture to fit it, which is
   * the same mistake as putting a 16:9 still in a disc, made on the other axis.
   * 3/2 for class and reward photography, 16/9 for a video still.
   */
  ratio: number;
  /** The tracked label above the caption. */
  captionLabel?: string | undefined;
  /** The caption itself, in the lane beneath the frame. */
  caption?: string | undefined;
}

export function RouteImage({ slot, src, ratio, captionLabel, caption }: RouteImageProps) {
  return (
    <>
      {/*
        `aspect-ratio` is safe here and this is the case the package's own note
        describes: it re-derives an axis only when the size it derives FROM is
        definite, and the width is 100% of a definite 390pt ground.
      */}
      <div className={styles.frame} style={{ aspectRatio: String(ratio) }}>
        {slot === undefined ? (
          <img className={styles.img} src={src} alt="" />
        ) : (
          <ThemedImage className={styles.img} slot={slot} fallbackSrc={src} alt="" />
        )}
      </div>
      {(caption !== undefined || captionLabel !== undefined) && (
        <div className={styles.caption}>
          {captionLabel !== undefined && (
            <span className={styles.captionLabel}>{captionLabel}</span>
          )}
          {caption !== undefined && <span className={styles.captionText}>{caption}</span>}
        </div>
      )}
    </>
  );
}
