// The card art, drawn in CSS from the palette.
//
// THERE IS NO IMAGE HERE ON PURPOSE. This app declares only the universal theme
// slots (see ./cafeSlots.ts) — it has no `app.yaml` of its own yet, so there is
// no generated picture of a flat white to resolve. The honest options were a
// bundled photograph that never changes with the brand, or shapes built from
// the theme's own colours. A stock photo would look like the app was themed
// when the one element carrying the most visual weight was not, which is the
// exact illusion this package exists to avoid.
//
// It also makes the point the second app is here to make: every pixel on this
// screen moves with the palette, and none of it shares a token, a component or
// an asset with CombatDen.

import { cx } from './cx';
import styles from './ItemArt.module.css';

export type CafeArt = 'ring' | 'wedge' | 'stack' | 'dot';

const ART_CLASS: Readonly<Record<CafeArt, string | undefined>> = {
  ring: styles.ring,
  wedge: styles.wedge,
  stack: styles.stack,
  dot: styles.dot,
};

export interface ItemArtProps {
  art: CafeArt;
  /** `card` on the menu grid, `hero` on the detail screen. */
  size?: 'card' | 'hero';
}

export function ItemArt({ art, size = 'card' }: ItemArtProps) {
  return (
    <div
      className={cx(styles.frame, size === 'hero' && styles.hero, ART_CLASS[art])}
      data-cafe-part="art"
      aria-hidden="true"
    />
  );
}
