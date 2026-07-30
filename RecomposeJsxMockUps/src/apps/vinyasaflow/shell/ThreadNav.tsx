// THE FOUR DESTINATIONS, at the foot — a STANDARD bottom tab bar.
//
// Replaces the base's `support/ShowcaseBottomNav.tsx`. An earlier direction for
// this run drew them as four circles threaded on a line; that failed the realism
// gate in `mockup-redesign-start`, because no shipping app navigates that way
// and a member should never have to learn a control. This is the icon-over-label
// bar every phone owner already knows, with the current tab in terracotta and
// the rest in quiet ink.
//
// The file keeps its name so ~3 screens keep resolving; it should be renamed
// when they are next touched.
//
// GUARDRAIL 11: primary navigation sits at the FOOT. A fork chooses the FORM,
// never the position — and this fork's answer to "what form" is now "the
// ordinary one", which is a design decision rather than a failure of nerve.
// GUARDRAIL 12 is the reason: a control must look like what it is and behave the
// way its platform behaves, and a member must be able to use the screen
// correctly the first time having only ever used other phone apps.
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
      {TABS.map(({ tab, slot, label, Icon }) => {
        const here = tab === selected;
        const tint = here ? 'var(--sc-primary)' : 'var(--sc-text-3rd)';
        return (
          <button
            key={tab}
            type="button"
            className={cx(styles.item, here && styles.itemHere)}
            aria-current={here ? 'page' : undefined}
            onClick={() => {
              nav.reset(TAB_ROUTES[tab]);
            }}
          >
            <span className={styles.glyph}>
              <ThemeIcon slot={slot} fallback={<Icon />} color={tint} size={ICON_SIZE} />
            </span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
