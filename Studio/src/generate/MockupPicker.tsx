// The mockup chip and its picker — the SECOND axis in the canvas bar.
//
// Theme and mockup are independent, and that independence is the product's
// whole claim: the library swaps SLOTS (colour, type, copy, imagery), a
// mockup is an ARRANGEMENT. Any theme over any arrangement. Two chips side by
// side is the cheapest way to say so — and switching one while the other stays
// put is the demo that proves it.

import { useEffect } from 'react';
import { MOCK_APPS, type MockApp } from 'recompose-jsx-mockups';

import { cx } from '../widgets/cx';

import chip from './ThemeChip.module.css';
import styles from './ThemePopup.module.css';

/** Folders the studio generated, as opposed to authored bases. */
const GENERATED_PREFIX = 'gen-';

export function MockupChip({
  app,
  onOpen,
}: {
  app: MockApp;
  onOpen: () => void;
}) {
  return (
    <button type="button" className={chip.chip} onClick={onOpen}>
      <em>Mockup</em>
      <b>{app.label}</b>
    </button>
  );
}

export function MockupPopup({
  activeId,
  onPick,
  onClose,
}: {
  activeId: string;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
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
      <div className={styles.pop} role="dialog" aria-label="Mockups">
        <header className={styles.head}>
          <b>Mockups</b>
          <button type="button" className={styles.x} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className={styles.grid}>
          {MOCK_APPS.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={cx(styles.lib, candidate.id === activeId && styles.on)}
              onClick={() => {
                onPick(candidate.id);
                onClose();
              }}
            >
              <span className={styles.lb}>
                <b>{candidate.label}</b>
                <u>
                  {candidate.id.startsWith(GENERATED_PREFIX)
                    ? 'generated'
                    : candidate.id === 'combatden'
                      ? 'the base'
                      : 'redesign'}
                </u>
              </span>
            </button>
          ))}
        </div>

        <footer className={styles.foot}>
          A mockup is an <b>arrangement</b>; a theme is a set of slots. They are
          independent axes — switching one leaves the other exactly where it is,
          which is the whole point of generating them separately.
        </footer>
      </div>
    </>
  );
}
