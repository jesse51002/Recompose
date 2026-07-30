// The theme catalogue, as a PICKER that returns an id.
//
// The sibling of `ThemePopup`, and the difference is the whole reason it
// exists: that one applies its pick to the live runtime (`selectDesign`),
// because there is one phone on that page and one theme in the process. Here
// there are two phones and neither of them is this document — each is an
// iframe with its own runtime — so applying anything locally would theme the
// studio's own chrome and change neither side of the comparison.
//
// So this one hands the id back and touches nothing.

import { useStylesPager } from 'recompose-react';

import { cx } from '../widgets/cx';

import styles from './ThemePopup.module.css';

export function ThemeCatalog({
  activeId,
  onPick,
  onClose,
}: {
  /** The id this side is already showing, if any. */
  activeId: string | null;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  const { items, isLoading, errored, query, setQuery } = useStylesPager({
    pageSize: 100,
  });

  return (
    <div className={styles.wrap} role="dialog" aria-label="Pick a theme">
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <div className={styles.panel}>
        <header className={styles.head}>
          <b>Themes</b>
          <button
            type="button"
            className={styles.x}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

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
            // Fail visible, same as its sibling: a blank grid that could mean
            // "loading" or "the API is down" wastes the most time here.
            <p className={styles.note}>
              The catalogue is not reachable. Start the API with{' '}
              <code>make -C RecomposeAPI dev</code>.
            </p>
          )}

          {/* NO THEME AT ALL is a legitimate side of a comparison, and the
              most useful one: the honest before is usually the app unthemed,
              not another brand. It leads the list because it is what a person
              reaches for first. */}
          <button
            type="button"
            className={cx(styles.lib, activeId === null && styles.on)}
            onClick={() => {
              onPick('');
              onClose();
            }}
          >
            <b>No theme</b>
            <u>the app before any design is applied</u>
          </button>

          {items.map((style) => (
            <button
              key={style.id}
              type="button"
              className={cx(styles.lib, style.id === activeId && styles.on)}
              onClick={() => {
                onPick(style.id);
                onClose();
              }}
            >
              <b>{style.displayName}</b>
              <u>{style.category ?? 'uncategorised'}</u>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
