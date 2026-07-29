// THE THREAD'S LAST ACT — the four destinations, at the foot.
//
// Replaces the base's `support/ShowcaseBottomNav.tsx`. The line runs to the
// bottom of the screen and there goes out sideways one final time, looping
// through four circles before leaving the edge: navigation made of the same
// stroke as everything above it, so the app ends the way it began.
//
// GUARDRAIL 11: primary navigation sits at the FOOT. Not a side rail, not the
// top. What a fork chooses is the FORM — here, four circles on a strand — never
// the position. And Guardrail 12: this behaves exactly like the bottom bar
// every phone owner already knows. Four labelled targets, tap to switch,
// immediate, with the current one marked. The invention is entirely in how it
// is drawn.
//
// The four glyphs are BRAND-OVERRIDABLE: each resolves the theme's matching
// `nav_*` icon slot through the library's <ThemeIcon>, which masks the tenant
// SVG with the tint colour and keeps the bundled glyph on screen until the
// override's URL has actually probed — a 404'd CSS mask renders an EMPTY BOX
// rather than failing loudly.
//
// A tab RESETS rather than pushes, which is the Dart's own choice: each tab
// root is reached with `pushReplacementNamed`, so switching tabs cannot
// accumulate a back stack the member never built.

import type { ReactElement } from 'react';
import { ThemeIcon } from 'recompose-react';

import { useMockNav } from '../../../kit/MockNav';
import { TAB_ROUTES } from '../appAsset';
import { cx } from '../cx';
import {
  SLOT_NAV_HOME,
  SLOT_NAV_RANK,
  SLOT_NAV_REWARD,
  SLOT_NAV_VIDEOS,
} from '../showcaseSlots';
import { SC } from '../showcaseTokens';
import { HomeIcon, RankIcon, RewardIcon, VideosIcon } from '../support/icons';

import styles from './ThreadNav.module.css';

/**
 * The four destinations. TWO ARE NAMED FOR THE CONCEPT RATHER THAN THE SCREEN
 * — `rank` is the profile and `reward` is the store — which is the Dart's
 * mismatch, kept rather than tidied so the four `nav_*` icon slots keep
 * resolving against the names the pipeline generates them under.
 */
export type ShowcaseNavTab = 'home' | 'rank' | 'reward' | 'videos';

interface NavSpec {
  readonly tab: ShowcaseNavTab;
  readonly slot: string;
  readonly label: string;
  readonly Icon: (props: { size?: number | undefined }) => ReactElement;
}

/** Sentence case, like every other label in this app. */
const TABS: readonly NavSpec[] = Object.freeze([
  { tab: 'home', slot: SLOT_NAV_HOME, label: 'Home', Icon: HomeIcon },
  { tab: 'rank', slot: SLOT_NAV_RANK, label: 'Rank', Icon: RankIcon },
  { tab: 'reward', slot: SLOT_NAV_REWARD, label: 'Reward', Icon: RewardIcon },
  { tab: 'videos', slot: SLOT_NAV_VIDEOS, label: 'Videos', Icon: VideosIcon },
]);

const ICON_SIZE = SC.iconSizeMd;

export interface ThreadNavProps {
  selected: ShowcaseNavTab;
}

export function ThreadNav({ selected }: ThreadNavProps) {
  const nav = useMockNav();

  return (
    <nav className={styles.nav}>
      <div className={styles.strand} aria-hidden="true" />
      {TABS.map(({ tab, slot, label, Icon }) => {
        const here = tab === selected;
        // The glyph's tint. On the filled circle it is the knockout ink; on an
        // open one it is the thread's own terracotta, because the glyph is part
        // of the same drawing as the ring around it.
        const tint = here ? 'var(--sc-knockout)' : 'var(--sc-primary)';
        return (
          <button
            key={tab}
            type="button"
            className={styles.item}
            aria-current={here ? 'page' : undefined}
            onClick={() => {
              nav.reset(TAB_ROUTES[tab]);
            }}
          >
            <span className={cx(styles.disc, here && styles.discHere)}>
              <ThemeIcon slot={slot} fallback={<Icon />} color={tint} size={ICON_SIZE} />
            </span>
            <span className={cx(styles.label, here && styles.labelHere)}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
