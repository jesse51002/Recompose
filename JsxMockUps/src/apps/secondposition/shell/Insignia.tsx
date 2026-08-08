// AN INSIGNIA — how this app presents the objects it strikes.
//
// The brand's generated marks are not illustrations. They are a brass roundel,
// two medallions, satin chevrons, a struck star tile, a scatter of coins, a
// sheet-music box and two composed still lifes. A company mounts what it awards:
// centred, with air around it, its name beneath it, nothing framing it.
//
// The art is CONTAINED rather than cropped, and the stylesheet explains why
// that is a correctness rule here rather than a preference.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Insignia.module.css';

export interface InsigniaProps {
  /** The mark. A `<ThemedImage>` carrying `INSIGNIA_ART_CLASS`. */
  art: ReactNode;
  /** Edge length of the box the mark is contained within, in px. */
  size: number;
  /** The name of the thing. Rendered beneath the mark, as one object with it. */
  caption?: string | undefined;
  /** A sub-label under the caption — a rank tier, a cost, a count. */
  sub?: ReactNode;
  /** Mount it on a satin field rather than the cream ground. */
  onSatin?: boolean | undefined;
  /** Play the arrival. Off for anything already on screen when a card opens. */
  settling?: boolean | undefined;
  className?: string | undefined;
}

export function Insignia({
  art,
  size,
  caption,
  sub,
  onSatin = false,
  settling = false,
  className,
}: InsigniaProps) {
  return (
    <div
      className={cx(styles.mount, onSatin && styles.onSatin, settling && styles.settling, className)}
    >
      <div className={styles.box} style={{ width: `${String(size)}px`, height: `${String(size)}px` }}>
        {art}
      </div>
      {caption !== undefined && caption !== '' && (
        <span className={cx(styles.caption, onSatin ? styles.captionOnSatin : styles.captionOnGround)}>
          {caption}
        </span>
      )}
      {sub !== undefined && sub !== null && (
        <span className={cx(styles.sub, onSatin ? styles.subOnSatin : styles.subOnGround)}>
          {sub}
        </span>
      )}
    </div>
  );
}

/** The class every `<ThemedImage>` handed to `art` must carry. */
export const INSIGNIA_ART_CLASS = styles.art;
