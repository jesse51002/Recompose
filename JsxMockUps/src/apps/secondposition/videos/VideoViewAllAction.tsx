// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// video_view_all_action.dart — a genre's "view all", at the far end of the line
// that names it.
//
// ONE TREATMENT NOW. The base carried three (`link` / `row` / `tile`) so an
// arrangement could move the action into a stacked section's foot or a mosaic's
// last cell; those sections are gone (./VideoCarouselSection.tsx) and the
// treatments went with them rather than staying as unreachable branches. What
// the three existed to protect still holds: the action MOVES, it is never
// dropped.
//
// Preview-only, so it is a label rather than a control — there is no route
// behind it and a dead <button> would advertise an action the phone cannot
// take, exactly as ../rewards/RewardsTabs.tsx concluded for its own tabs.
//
// ITS UNDERLINE IS BRASS, which is the one thing brass may do beside drawing a
// rule: mark. It matches the brass under the selected scope tab
// (./VideoCategoryTabs.module.css), so "brass under a word" means the same
// thing in both places on this screen, and it never spells the word itself.

import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import styles from './VideoViewAllAction.module.css';

/** `_kLabel`, verbatim. The stylesheet is what sets it in capitals. */
const LABEL = 'view all';

export function VideoViewAllAction() {
  return (
    <span className={styles.viewAll} {...{ [PART_ATTR]: VIDEO_PARTS.viewAll }}>
      {LABEL}
    </span>
  );
}
