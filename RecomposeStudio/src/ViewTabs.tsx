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
// Deliberately NOT sticky. It was not sticky when the Library view existed
// either (that view stuck its own search chrome at the same offset); the
// reason has changed but the answer has not — each page below owns a full
// height and manages its own scrolling, so a sticky band would cut into it.

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
    { view: 'onboard', label: 'Onboard', title: 'Admin — point us at a platform' },
    { view: 'generate', label: 'Generate', title: 'Customer — watch a design get made' },
    { view: 'fleet', label: 'Fleet', title: 'Admin — every customer app and its agent' },
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
