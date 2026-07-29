// THE PLATE — the one way a photograph appears in this design.
//
// See ./Plate.module.css for why. This component is deliberately thin: it takes
// a `src` OR a theme slot plus its bundled fallback, and it degrades the same
// way the base's own image ladder does.
//
// IT TAKES A SLOT RATHER THAN A RESOLVED URL wherever one exists, because
// Guardrail 7 is a real bug that has shipped here: the same asset appears on
// more than one screen (a class photo on the schedule row AND the class banner;
// a reward in the store AND the celebration carousel), and wiring one consumer
// leaves the others on the old path — so the picture silently CHANGES between
// two screens showing the same thing. One component, one ladder, every caller.

import { useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { cx } from '../cx';

import styles from './Plate.module.css';

export interface PlateProps {
  /** The already-resolved URL, used when there is no theme slot. */
  src: string;
  /** The theme's generated slot for this image, when it has one. */
  slot?: string | undefined;
  alt?: string;
  /** The mount's own box. The caller sizes it; the plate fills it. */
  className?: string | undefined;
}

export function Plate({ src, slot, alt = '', className }: PlateProps) {
  return (
    <div className={cx(styles.plate, className)}>
      <div className={styles.frame}>
        {slot === undefined ? (
          // `key` remounts on a src change: a theme switch swaps the whole
          // list, and without the reset one dead URL would pin this mount to
          // an empty box forever. Resetting in an effect is a lint error here.
          <PlateImg key={src} src={src} alt={alt} />
        ) : (
          // <ThemedImage> keeps the fallback on screen until the override's URL
          // has actually probed, so a 404 degrades to the bundled art rather
          // than to an empty box.
          <ThemedImage className={styles.img} slot={slot} fallbackSrc={src} alt={alt} />
        )}
        <span className={styles.veil} aria-hidden="true" />
      </div>
    </div>
  );
}

function PlateImg({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={styles.blank} />;
  return (
    <img
      className={styles.img}
      src={src}
      alt={alt}
      onError={() => {
        setFailed(true);
      }}
    />
  );
}
