// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// video_category_tabs.dart — the scope filter for the videos tab ("All" plus
// one per genre the loaded feed carries).
//
// BEADS ON THE STRAND, NOT PILLS. The base draws each scope as a rounded
// container and fills the selected one; this design owns three forms and a
// filled rounded rectangle is a fourth, so the row is rebuilt out of the two it
// does own. The thread bows sideways (../shell/Thread.tsx's `Bow`), runs
// through a small circle in front of every scope, and each word sits on the
// line with the canvas behind it so the stroke passes BEHIND the word rather
// than through it. The scope the member is standing in swells the line to a
// filled terracotta bead and takes the heavier of the two label weights; the
// rest are open rings the line runs through. It is the same drawing the four
// destinations at the foot are made from, which is the point.
//
// IT STILL BEHAVES LIKE A TAB ROW, which Guardrail 12 requires: a horizontal
// row of labels, one visibly current, scrolling sideways when the tenant's
// genre set runs long (up to nine values). Only the drawing is new.
//
// IT SCROLLS IN THE REAL APP TOO. `Bow` owns that — it is the app's one
// sideways scroller, and running the filter on it is what keeps sideways
// movement reading as part of the sequence rather than a second axis.
//
// TAPS ARE NO-OPS. In the app a genre pill OPENS that genre's full list
// (`TagVideosScreen`) rather than filtering this screen; there is no navigator
// in a phone mock, so the scopes are labels and "All" is always the current
// one. A dead <button> would advertise an action the preview cannot take,
// exactly as ../rewards/RewardsTabs.tsx concluded for its own two tabs.

import { Bow } from '../shell/Thread';
import { cx } from '../cx';

import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import styles from './VideoCategoryTabs.module.css';

export interface VideoCategoryTabsProps {
  /** `['All', ...genres.map((g) => g.label)]` — already labelled, sentence case. */
  tabs: readonly string[];
  selectedIndex: number;
}

export function VideoCategoryTabs({ tabs, selectedIndex }: VideoCategoryTabsProps) {
  return (
    <div {...{ [PART_ATTR]: VIDEO_PARTS.categoryTabs }}>
      <Bow>
        {tabs.map((label, index) => {
          const here = index === selectedIndex;
          return (
            <span
              // Genre labels are distinct by construction (`genresInFeed`
              // dedups), so the label IS the scope's identity.
              key={label}
              className={cx(styles.tab, here && styles.tabHere)}
              aria-current={here ? 'true' : undefined}
              {...{ [PART_ATTR]: VIDEO_PARTS.categoryPill }}
            >
              <span className={cx(styles.bead, here && styles.beadHere)} aria-hidden="true" />
              {label}
            </span>
          );
        })}
      </Bow>
    </div>
  );
}
