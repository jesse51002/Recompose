// The demo's own switcher. Ported from design/studio-demo.html (.top).
//
// It replaced the landing-page nav this app used to wear — a ported marketing
// header over a centred, max-width column. That chrome belonged to a theme
// BROWSER; this is a tool you watch a design get made in, and it wants the
// whole viewport.
//
// **The POV chip is the point of it.** The three pages are not peers: two are
// the platform's admin and one is their customer. Saying which you are looking
// at is the difference between a demo that reads as one app and one that reads
// as three unrelated screens.
//
// In the real product there is no switcher at all — a tenant lands in Generate
// and never sees the others.

import { cx } from './widgets/cx';

import type { AppView } from './appUrl';
import styles from './TopBar.module.css';

const PAGES: readonly { readonly view: AppView; readonly n: string; readonly label: string }[] =
  Object.freeze([
    { view: 'onboard', n: '1', label: 'Onboard' },
    { view: 'generate', n: '2', label: 'Generate' },
    { view: 'fleet', n: '3', label: 'Fleet' },
  ]);

/** Whose view each page is. */
const POV: Readonly<Record<AppView, string>> = Object.freeze({
  onboard: 'Admin',
  generate: 'Customer',
  fleet: 'Admin',
  // Reached from the fleet rather than from the switcher — it answers a
  // question the fleet raises — but it is still the platform's own view, so
  // the chip has to say so while it is open.
  layouts: 'Admin',
  // A pane of the Generate page rather than a page (see GenerateView), but the
  // map is total over AppView so the route still needs a point of view.
  compare: 'Customer',
  // Never rendered with the shell — the stage returns before it (see App.tsx)
  // — but the map is total over AppView, so it needs an entry.
  stage: 'Admin',
});

export function TopBar({
  view,
  onChange,
}: {
  view: AppView;
  onChange: (next: AppView) => void;
}) {
  return (
    <header className={styles.top}>
      <div className={styles.brand}>
        {/* THE MARK ONLY, with the name set in the shell's own type beside it.
            The source lockup's wordmark is white with a light outline, which
            is invisible on this chrome — and the studio is a tool, so its
            header should read in the tool's own voice rather than paste in a
            marketing asset. The R carries the brand; the type carries the UI. */}
        <img className={styles.mark} src="/recompose-mark.png" alt="" />
        Recompose
      </div>
      <span className={styles.pov}>{POV[view]}</span>
      <div className={styles.switch}>
        {PAGES.map((page) => (
          <button
            key={page.view}
            type="button"
            className={cx(view === page.view && styles.on)}
            aria-pressed={view === page.view}
            onClick={() => onChange(page.view)}
          >
            {page.n} · {page.label}
          </button>
        ))}
      </div>
    </header>
  );
}
