// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// video_category_tabs.dart — the scope of the library: "All" plus one genre per
// genre the loaded feed carries.
//
// IT SCROLLS IN THE REAL APP TOO, and for the same reason: the genre set is
// open-ended (up to nine values), so a fixed row would overflow. What changed
// is where a short set sits. Dart centres the row inside its scroller; here it
// starts at the gutter, because everything below the masthead's rule is
// SCANNED and everything scanned is left aligned (../layout_brief.yaml). The
// masthead is the one centred thing on the screen and centring the line under
// it would take that distinction away.
//
// NO PILLS. This design has no radius anywhere and no third fill — the satin
// owns the panels, the plinths, the action and the foot, and a row of filled
// chips would be a fourth field competing with all of them. The scope is a cast
// list instead: the words, and a brass rule under the one you are reading. That
// rule is also the only thing brass may do beside opening a section, and it is
// the same mark "view all" wears (./VideoViewAllAction.module.css).
//
// THE AXIS PROP IS GONE. It existed so an arrangement could stand the pills up
// in a rail down the left; Guardrail 11 now bans a side rail by name, the
// arrangement went with it, and a prop with one possible value is a lie about
// what the component does.
//
// TAPS ARE NO-OPS. In the app a genre OPENS that genre's full list
// (`TagVideosScreen`) rather than filtering this screen; there is no such
// screen in this asset, so these are labels and "All" is always the active one.
// A dead <button> would advertise an action the preview cannot take, exactly as
// ../rewards/RewardsTabs.tsx concluded for its own two tabs.

import { cx } from '../cx';

import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import styles from './VideoCategoryTabs.module.css';

export interface VideoCategoryTabsProps {
  /** `['All', ...genres.map((g) => g.label)]` — already labelled. */
  tabs: readonly string[];
  selectedIndex: number;
}

export function VideoCategoryTabs({ tabs, selectedIndex }: VideoCategoryTabsProps) {
  return (
    <div className={styles.strip} {...{ [PART_ATTR]: VIDEO_PARTS.categoryTabs }}>
      {tabs.map((label, index) => (
        <span
          // Genre labels are distinct by construction (`genresInFeed` dedups),
          // so the label IS the tab's identity.
          key={label}
          className={cx(styles.tab, index === selectedIndex && styles.active)}
          {...{ [PART_ATTR]: VIDEO_PARTS.categoryPill }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
