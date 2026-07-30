// The Library, as a popup over the canvas.
//
// It is a popup rather than a third pane because picking a theme is a MOMENT,
// not a place: you open it, choose, and go back to looking at the phone. The
// old studio gave the catalogue a whole view of its own, which put a shopping
// trip between the reviewer and the thing they were reviewing.
//
// Picking re-resolves colour, type, copy, icons and imagery over whatever
// arrangement the canvas is showing. **Theme and layout are independent axes:**
// the library swaps slots, never arrangement.

import { useEffect } from 'react';
import { selectDesign, useActiveDesign, useStylesPager } from 'recompose-react';

import { cx } from '../widgets/cx';

import styles from './ThemePopup.module.css';

export function ThemePopup({
  onClose,
  onPick,
}: {
  onClose: () => void;
  /** A deliberate choice — the run's refresh loop must stop overriding it. */
  onPick: () => void;
}) {
  const { items, isLoading, errored, total, query, setQuery } = useStylesPager({ pageSize: 100 });
  const { id: activeId } = useActiveDesign();

  // Escape closes it. A modal that traps you in it is the one interaction a
  // demo cannot afford to get wrong in front of a room.
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <div className={styles.pop} role="dialog" aria-label="Theme library">
        <header className={styles.head}>
          <b>Library</b>
          <span className={styles.count}>
            {total > 0 ? `${String(total)} designs` : ''}
          </span>
          <button type="button" className={styles.x} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        {/* Seventy-odd designs is a list you search, not one you scan. The
            pager debounces and refetches, so this filters server-side rather
            than hiding rows that are already loaded. */}
        <input
          className={styles.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search designs…"
          aria-label="Search designs"
          autoFocus
        />

        <div className={styles.grid}>
          {isLoading && items.length === 0 && (
            <p className={styles.note}>Loading the catalogue…</p>
          )}
          {errored && items.length === 0 && (
            // Fail visible: a blank grid that could mean "loading" or "the API
            // is down" is the failure mode that wastes the most time here.
            <p className={styles.note}>
              The catalogue is not reachable. Start the API with{' '}
              <code>make -C RecomposeAPI dev</code>.
            </p>
          )}
          {items.map((style) => (
            <button
              key={style.id}
              type="button"
              className={cx(styles.lib, style.id === activeId && styles.on)}
              onClick={() => {
                onPick();
                void selectDesign(style.id);
                onClose();
              }}
            >
              {/* NAMES, not pictures. A generated image is one slot out of
                  eighteen and says almost nothing about the palette; a grid of
                  thumbnails is a wall you squint at. The name and its category
                  are what a person actually picks by. */}
              <b>{style.displayName}</b>
              <u>{style.category ?? 'uncategorised'}</u>
            </button>
          ))}
        </div>

        <footer className={styles.foot}>
          Selecting a theme re-resolves colour, type, copy, icons and imagery
          over whichever arrangement the canvas is showing. Theme and layout are
          independent — the library swaps <b>slots</b>, never arrangement.
        </footer>
      </div>
    </>
  );
}
