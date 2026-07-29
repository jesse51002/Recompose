// The theme chip in the canvas bar: which theme is on, and the way to change it.
//
// A swatch and a name, not a dropdown. The swatch is the design's actual
// resolved primary, read from the live runtime — so the chip is showing the
// theme rather than describing it, and it repaints mid-run as the palette
// lands like everything else on this page.

import { rgba, toCss, useActiveDesign, useThemeColor } from 'recompose-react';

import styles from './ThemeChip.module.css';

/** The colour role every generated palette declares. */
const SLOT_PRIMARY = 'primary';

export function ThemeChip({ onOpen }: { onOpen: () => void }) {
  const { id, name } = useActiveDesign();
  // A fully TRANSPARENT fallback, not a grey: before a palette resolves there
  // is no primary, and a placeholder swatch would be the chip claiming a
  // colour the engine has not produced.
  const primary = toCss(useThemeColor(SLOT_PRIMARY, { fallback: rgba(0, 0, 0, 0) }));

  return (
    <button type="button" className={styles.chip} onClick={onOpen}>
      <em>Theme</em>
      <span className={styles.swatch} style={{ background: primary }} />
      <b>{name ?? id ?? 'none'}</b>
    </button>
  );
}
