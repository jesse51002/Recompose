// THE BURST — the hit that punctuates the trophy landing on the wins card.
//
// PURE CSS AFTER MOUNT. Each particle's slice of the window is a fixed
// `animation-delay` + `animation-duration` (./sparkleGeometry.ts), so twelve
// CSS animations replace a per-frame controller entirely: the component never
// re-renders and never touches a ref. That also means ../WinsShowcase.module.css's
// `.finished` rule reaches every particle — a tap finishes the burst along with
// the rest of the card, with nothing here to hand over by hand.
//
// IT IS AN IMPACT AND IT STAYS QUICK. The whole scatter fills `IMPACT_MS` and
// runs on the fork's one curve, `--sp-phrase`. Guardrail 16's second half: the
// arrival is what is slowed on a celebration, never the hit, and a burst that
// borrowed the celebration clock would be stretched into a waft the next time
// anyone slowed the flow down. Pinning it is what makes that impossible rather
// than merely unlikely.
//
// ITS OWN VARIABLES ARE `--sb-*`, NOT `--sp-*`. The fork's motion clock owns
// the `--sp-*` namespace (../shell/phrase.ts) and is written onto the asset
// root; these are per-particle geometry written onto one element. Sharing a
// prefix between a global clock and a local scatter is how a stylesheet ends up
// reading a variable it did not mean, so they are kept apart by name.
//
// LOOPING is the CALLER's job: the card re-keys the burst each cycle and the
// CSS animations replay from the top.

import { cx } from '../cx';
import { showcaseStyle } from '../showcaseTokens';

import styles from './SparkleBurst.module.css';
import {
  SPARKLE_FADE_MS,
  SPARKLE_SCATTER,
  SPARKLE_START_SCALE,
  SPARKLE_STAR_CLIP_PATH,
  sparkleDelayMs,
} from './sparkleGeometry';

/** The geometry the stylesheet reads. Theme-independent, so a module constant. */
const BURST_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--sb-star': SPARKLE_STAR_CLIP_PATH,
  '--sb-fade': `${String(SPARKLE_FADE_MS)}ms`,
  '--sb-start-scale': String(SPARKLE_START_SCALE),
});

export interface SparkleBurstProps {
  /**
   * The edge of the square the scatter centres in.
   *
   * OMIT IT to let the caller's own class size the box, which is how the wins
   * card uses it: the burst is filled to its field with `position: absolute;
   * inset: 0`, and an inline width beside that would fight it and move the
   * centre.
   */
  size?: number | undefined;
  /** Pushes every particle's start back by this much — when the hit lands. */
  delayMs?: number | undefined;
  className?: string | undefined;
}

export function SparkleBurst({ size, delayMs = 0, className }: SparkleBurstProps) {
  const count = SPARKLE_SCATTER.length;
  return (
    <div
      className={cx(styles.burst, className)}
      style={showcaseStyle(
        BURST_VARS,
        size === undefined ? undefined : { width: `${String(size)}px`, height: `${String(size)}px` },
      )}
      aria-hidden="true"
    >
      {SPARKLE_SCATTER.map((particle, index) => (
        <span
          // The scatter is a fixed const list, so the slot index IS the
          // particle's identity — two entries may share every field.
          key={index}
          className={styles.particle}
          style={showcaseStyle({
            '--sb-size': `${String(particle.size)}px`,
            '--sb-dx': `${String(particle.dx)}px`,
            '--sb-dy': `${String(particle.dy)}px`,
            '--sb-opacity': String(particle.opacity),
            '--sb-delay': `${String(delayMs + sparkleDelayMs(index, count))}ms`,
          })}
        />
      ))}
    </div>
  );
}
