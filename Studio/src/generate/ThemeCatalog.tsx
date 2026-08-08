// The theme catalogue as an inline LIST, not a modal.
//
// It used to be a popup, which meant picking a side's theme opened a dialog on
// top of the dialog you were already in — two scrims, two closes, and the thing
// you were editing hidden behind the thing editing it. One sheet, everything in
// it.
//
// The other difference from `ThemePopup` is what a pick DOES. That one applies
// to the live runtime (`selectDesign`), because there is one phone on that page
// and one theme in the process. Here there are two phones and neither of them
// is this document — each is an iframe with its own runtime — so this hands the
// id back and touches nothing.

import { useStylesPager } from 'recompose-react';

import { cx } from '../widgets/cx';

import styles from './ThemeCatalog.module.css';

export function ThemeCatalog({
  activeId,
  onPick,
}: {
  /** The id this side is showing, or null for none. */
  activeId: string | null;
  /** Called with a design id, or `''` for no theme at all. */
  onPick: (id: string) => void;
}) {
  // 100 IS THE API'S CAP, not a preference. `limit` above it is a 422, and
  // `useStylesPager` reports that the same way it reports the API being down —
  // so asking for 200 read on screen as "the catalogue is not reachable" with
  // the catalogue perfectly reachable. The pager fetches more as you scroll.
  const { items, isLoading, errored, query, setQuery } = useStylesPager({
    pageSize: 100,
  });

  return (
    <div className={styles.catalog}>
      <input
        className={styles.search}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search themes…"
        aria-label="Search themes"
      />

      <div className={styles.list}>
        {/* NO THEME LEADS, always, and is never filtered out by the search —
            it is the honest "before" in most comparisons, and having to clear
            a query to get back to it would be a trap. */}
        <button
          type="button"
          className={cx(styles.item, activeId === null && styles.on)}
          onClick={() => {
            onPick('');
          }}
        >
          <b>No theme</b>
          <u>before any design is applied</u>
        </button>

        {isLoading && items.length === 0 && (
          <p className={styles.note}>Loading…</p>
        )}
        {errored && items.length === 0 && (
          // Fail visible. A blank list that could mean "loading" or "the API is
          // down" is the failure mode that wastes the most time here — and on
          // the wrong port it is a CORS refusal, which looks identical.
          <p className={styles.note}>
            The catalogue is not reachable. Start the API with{' '}
            <code>make -C Backend dev</code>, and serve the studio on 8080
            — the API&rsquo;s CORS allowlist has that port and no other.
          </p>
        )}

        {items.map((style) => (
          <button
            key={style.id}
            type="button"
            className={cx(styles.item, style.id === activeId && styles.on)}
            onClick={() => {
              onPick(style.id);
            }}
          >
            <b>{style.displayName}</b>
            <u>{style.category ?? 'uncategorised'}</u>
          </button>
        ))}
      </div>
    </div>
  );
}
