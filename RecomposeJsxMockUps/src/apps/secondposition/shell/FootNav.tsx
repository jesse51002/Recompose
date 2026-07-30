// THE FOOT — the four destinations, as a solid satin band.
//
// Replaces the base's `support/ShowcaseBottomNav.tsx`, which is DELETED from
// this folder.
//
// THE TAB NAMES ARE CONCEPTS, NOT SCREENS, and that mismatch is deliberate:
// `rank` is the PROFILE screen and `reward` is the STORE. They are named for
// the four `nav_*` icon slots the pipeline generates, so renaming them to match
// the screens would break icon resolution.
//
// A tab RESETS rather than pushes. The Dart reaches each tab root with
// `pushReplacementNamed`, so pushing would accumulate a back stack the member
// never built.

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

import styles from './FootNav.module.css';

/** `ShowcaseNavTab`, in `values` order. */
export type FootTab = 'home' | 'rank' | 'reward' | 'videos';

interface NavSpec {
  readonly tab: FootTab;
  readonly slot: string;
  readonly label: string;
  readonly Icon: (props: { size?: number | undefined }) => ReactElement;
}

const TABS: readonly NavSpec[] = Object.freeze([
  { tab: 'home', slot: SLOT_NAV_HOME, label: 'Home', Icon: HomeIcon },
  { tab: 'rank', slot: SLOT_NAV_RANK, label: 'Rank', Icon: RankIcon },
  { tab: 'reward', slot: SLOT_NAV_REWARD, label: 'Reward', Icon: RewardIcon },
  { tab: 'videos', slot: SLOT_NAV_VIDEOS, label: 'Videos', Icon: VideosIcon },
]);

const ICON_SIZE = SC.iconSizeMd;

export interface FootNavProps {
  selected: FootTab;
}

export function FootNav({ selected }: FootNavProps) {
  const nav = useMockNav();

  return (
    <nav className={styles.nav}>
      {TABS.map(({ tab, slot, label, Icon }) => {
        const isActive = tab === selected;
        return (
          <button
            key={tab}
            type="button"
            className={cx(styles.item, isActive && styles.active)}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => {
              nav.reset(TAB_ROUTES[tab]);
            }}
          >
            {/*
             * The glyph is a FALLBACK behind the theme's own `nav_*` slot.
             * <ThemeIcon> masks the tenant SVG with the tint and keeps the
             * bundled glyph on screen until the override has actually probed —
             * a 404'd CSS mask renders an empty box rather than failing loudly.
             *
             * The tint is the full cream either way; the holding-back happens
             * in CSS via opacity, which is what keeps the LABEL at full
             * strength while the icon carries the state.
             */}
            <span className={styles.icon}>
              <ThemeIcon
                slot={slot}
                fallback={<Icon />}
                color="var(--sc-on-satin)"
                size={ICON_SIZE}
              />
            </span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
