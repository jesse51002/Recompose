// The theme chip in the canvas bar: which theme is on, and the way to change it.
//
// A swatch and a name, not a dropdown. The swatch is the design's actual
// resolved primary, read from the live runtime — so the chip is showing the
// theme rather than describing it, and it repaints mid-run as the palette
// lands like everything else on this page.

import { rgba, selectDesign, toCss, useActiveDesign, useThemeColor } from 'recompose-react';

import styles from './ThemeChip.module.css';

/** The colour role every generated palette declares. */
const SLOT_PRIMARY = 'primary';

export function ThemeChip({
  onOpen,
  generatedId,
}: {
  onOpen: () => void;
  /** The design this session's run is producing, once it has one. */
  generatedId?: string | null;
}) {
  const { id, name } = useActiveDesign();
  // A fully TRANSPARENT fallback, not a grey: before a palette resolves there
  // is no primary, and a placeholder swatch would be the chip claiming a
  // colour the engine has not produced.
  const primary = toCss(useThemeColor(SLOT_PRIMARY, { fallback: rgba(0, 0, 0, 0) }));

  // A manual pick is sticky, so once someone browses the library there was no
  // way back to the design their own run is making. This is that way back, and
  // it appears only when there IS somewhere to go back to.
  const strayed =
    generatedId !== null && generatedId !== undefined && generatedId !== id;

  return (
    <span className={styles.group}>
      <button type="button" className={styles.chip} onClick={onOpen}>
        <em>Theme</em>
        <span className={styles.swatch} style={{ background: primary }} />
        <b>{name ?? id ?? 'none'}</b>
      </button>
      {strayed && (
        <button
          type="button"
          className={styles.revert}
          title={`Back to ${generatedId}, the design this run is making`}
          onClick={() => void selectDesign(generatedId)}
        >
          ↩ generated
        </button>
      )}
    </span>
  );
}
