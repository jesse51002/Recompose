// THE BLOOM AROUND THE CLOSING LOOP.
//
// The base's `SparkleBurst` flung twelve eight-point stars out from a hero. This
// is the same element in the same place doing the same job — the decorative
// halo on the wins card — drawn in this design's own vocabulary: small
// terracotta discs and small open rings, settled on a ring just outside the
// loop, opening outward as the stroke travels past them. See
// ./sparkleGeometry.ts for why the star had to go and where the clock comes
// from.
//
// PURE CSS AFTER MOUNT, exactly as before. Each petal's slice of the window is a
// fixed `animation-delay` and a fixed duration, so fifteen CSS animations
// replace the controller entirely — the component never re-renders and never
// touches a ref.
//
// IT SIZES ITSELF TO ITS HOST. The bloom is `position: absolute; inset: 0` in
// its own stylesheet rather than taking a `size` prop, because its only correct
// size is the loop's box: the petals are placed from the CENTRE, and a box a few
// px off-centre tilts the whole ring. One declaration, no call site can get it
// wrong.
//
// LOOPING is the CALLER's job — the card re-keys the bloom each cycle and the
// CSS animations replay from the top.

import { cx } from '../cx';
import { showcaseStyle } from '../showcaseTokens';

import styles from './SparkleBurst.module.css';
import {
  BLOOM,
  BLOOM_CLOSED_RADIUS_SCALE,
  BLOOM_PETAL_MS,
  BLOOM_START_SCALE,
  bloomDelayMs,
  petalOffset,
} from './sparkleGeometry';

/** The motion the stylesheet reads. Theme-independent, so a module constant. */
const BLOOM_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--sp-fade-ms': `${String(BLOOM_PETAL_MS)}ms`,
  '--sp-start-scale': String(BLOOM_START_SCALE),
});

export interface SparkleBurstProps {
  /** Pushes every petal's start back by this much — the loop's own start. */
  delayMs?: number | undefined;
  /**
   * The loop's draw duration. The petals are staggered across it by ANGLE, so
   * passing the same number the ring is drawn over is what keeps the bloom and
   * the stroke one movement instead of two.
   */
  windowMs: number;
  className?: string | undefined;
}

export function SparkleBurst({ delayMs = 0, windowMs, className }: SparkleBurstProps) {
  return (
    <div className={cx(styles.bloom, className)} style={showcaseStyle(BLOOM_VARS)} aria-hidden="true">
      {BLOOM.map((petal, index) => {
        const settled = petalOffset(petal);
        const closed = petalOffset(petal, BLOOM_CLOSED_RADIUS_SCALE);
        return (
          <span
            // The bloom is a fixed const list, so the slot index IS the petal's
            // identity — two entries may share every field.
            key={index}
            className={cx(
              styles.petal,
              petal.open && styles.petalOpen,
              petal.calm && styles.petalCalm,
            )}
            style={showcaseStyle({
              '--sp-size': `${String(petal.size)}px`,
              '--sp-dx': `${String(settled.dx)}px`,
              '--sp-dy': `${String(settled.dy)}px`,
              '--sp-dx-closed': `${String(closed.dx)}px`,
              '--sp-dy-closed': `${String(closed.dy)}px`,
              '--sp-opacity': String(petal.opacity),
              '--sp-delay-ms': `${String(delayMs + bloomDelayMs(petal, windowMs))}ms`,
            })}
          />
        );
      })}
    </div>
  );
}
