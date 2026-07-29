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
  /** Height in px. The width is always the full screen. */
  height: number;
  /** The tracked label above the caption. */
  captionLabel?: string | undefined;
  /** The caption itself, in the lane beneath the frame. */
  caption?: string | undefined;
}

export function RouteImage({ slot, src, height, captionLabel, caption }: RouteImageProps) {
  return (
    <>
      <div className={styles.frame} style={{ height: `${String(height)}px` }}>
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
