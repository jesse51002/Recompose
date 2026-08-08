// The theme chip in the canvas bar: which theme is on, and the way to change it.
//
// A swatch and a name, not a dropdown. The swatch is the design's actual
// resolved primary, read from the live runtime — so the chip is showing the
// theme rather than describing it, and it repaints mid-run as the palette
// lands like everything else on this page.

import {
  clearDesign,
  rgba,
  selectDesign,
  toCss,
  useActiveDesign,
  useThemeColor,
} from 'recompose-react';

import styles from './ThemeChip.module.css';

/** The colour role every generated palette declares. */
const SLOT_PRIMARY = 'primary';

export function ThemeChip({
  onOpen,
  generatedId,
  onClear,
  onRevert,
}: {
  onOpen: () => void;
  /** The design this session's run is producing, once it has one. */
  generatedId?: string | null;
  /** The person dropped the theme — the run's refresh loop must not undo it. */
  onClear: () => void;
  /** The person asked for the generated theme back; the loop may drive again. */
  onRevert: () => void;
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
          onClick={() => {
            onRevert();
            void selectDesign(generatedId);
          }}
        >
          ↩ generated
        </button>
      )}
      {/* THE WAY BACK TO NOTHING. A selection is sticky — persisted and
          preferred on boot — so once any design had been applied there was no
          way to see the screens bare again. Bare is the baseline a generated
          theme is worth judging against, and it is the one state the picker
          could not reach.

          Shown only when there IS a theme to drop, for the same reason the
          revert button is conditional: an offer to clear nothing is noise. */}
      {id !== null && (
        <button
          type="button"
          className={styles.revert}
          title="Drop the theme and show the screens unthemed"
          onClick={() => {
            onClear();
            clearDesign();
          }}
        >
          ✕ theme
        </button>
      )}
    </span>
  );
}
