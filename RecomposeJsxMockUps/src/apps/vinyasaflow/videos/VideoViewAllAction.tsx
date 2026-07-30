// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// video_view_all_action.dart — a shelf's "view all".
//
// ONE TREATMENT NOW, not three. `link` / `row` / `tile` existed so the four
// section shapes could each place the action somewhere sensible; there is one
// shelf here, so the action has one place — the far end of the genre's own
// label row, where it is visible the moment the shelf is (./VideoCarouselSection.tsx).
//
// Preview-only, so it is a label rather than a control: there is no route
// behind it and a dead <button> would advertise an action the phone cannot
// take, exactly as ../rewards/RewardsTabs.tsx concluded for its own tabs.
//
// Lower case is the Dart's own — and it is also this design's rule, which never
// sets a label in capitals anywhere.

import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import styles from './VideoViewAllAction.module.css';

/** `_kLabel`. */
const LABEL = 'view all';

export function VideoViewAllAction() {
  return (
    <span className={styles.viewAll} {...{ [PART_ATTR]: VIDEO_PARTS.viewAll }}>
      {LABEL}
    </span>
  );
}
