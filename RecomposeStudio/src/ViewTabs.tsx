// The app's top-level view switcher — the band directly under the landing nav.
//
// No Dart counterpart to port: the CRM's theme surface is one tab, so there was
// never a switcher there. What DOES port is the vocabulary — the admin rail's
// "active item is sapphire, with a sapphire bar along its leading edge"
// (../../../../CRM/DESIGN.md §5, Navigation), turned on its side. A horizontal
// bar's leading edge is its bottom, so the bar becomes an underline sitting on
// the band's own hairline.
//
// THE HEIGHT IS A CONTRACT, not a layout choice — see ./ViewTabs.module.css.
//
// Deliberately NOT sticky: ./browser/LibraryView.module.css already sticks its
// search + filter chrome at `top: var(--adm-nav-height)`, so a second sticky
// bar claiming the same offset would sit on top of the library's own.

import type { AppView } from './appUrl';
import styles from './ViewTabs.module.css';

/**
 * The label is the whole affordance, so each carries a `title` naming what the
 * view holds — three one-word labels are fast to scan and thin on meaning, and
 * this is the cheapest place to answer "what is Studio?" without a subtitle
 * row competing with the page's own title.
 */
const TABS: readonly { readonly view: AppView; readonly label: string; readonly title: string }[] =
  Object.freeze([
    { view: 'browse', label: 'Library', title: 'Browse every generated design' },
    { view: 'inspect', label: 'Inspect', title: 'Every artifact the pipeline produced' },
    { view: 'studio', label: 'Studio', title: 'Generate a new design' },
    // The two admin surfaces. Both are demo-ware and say so on the page
    // itself, which is the only place a viewer would otherwise be misled.
    { view: 'onboard', label: 'Onboard', title: 'Point us at a platform (demo)' },
    { view: 'fleet', label: 'Fleet', title: 'Every customer app and its agent (demo)' },
  ]);

export function ViewTabs({
  view,
  onChange,
}: {
  view: AppView;
  onChange: (next: AppView) => void;
}) {
  return (
    <div className={styles.band}>
      <nav className={styles.tabs} aria-label="View">
        {TABS.map((tab) => {
          const current = tab.view === view;
          return (
            <button
              key={tab.view}
              type="button"
              className={styles.tab}
              title={tab.title}
              aria-current={current ? 'page' : undefined}
              onClick={() => onChange(tab.view)}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
