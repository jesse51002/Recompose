// THE LAST LANE — the four destinations, at the foot.
//
// Replaces ../support/ShowcaseBottomNav.tsx, which is deleted from this folder.
// Position is fixed by Guardrail 11 (primary nav lives at the FOOT, never a
// side rail, never the top); the FORM is the fork's, and here it is the ground's
// own final band rather than a bar laid over it — opened by a lane stripe like
// every other lane, painted in the same canvas, with the coral finish tape
// stretched across the cell the member is standing in.
//
// Everything load-bearing about the base's nav is kept, because none of it is
// styling:
//
//   * THE FOUR GLYPHS ARE BRAND-OVERRIDABLE. Each resolves the theme's matching
//     `nav_*` slot through <ThemeIcon>, which masks the tenant SVG with the tint
//     and keeps the bundled glyph until the override's URL has actually probed —
//     a 404'd CSS mask renders an EMPTY BOX rather than failing loudly.
//   * THE TAB NAMES ARE CONCEPTS, NOT SCREENS. `rank` is the profile and
//     `reward` is the store. That mismatch is the Dart's, kept so the four
//     `nav_*` slots keep resolving against the names the pipeline generates
//     them under. Renaming them to match the screens breaks icon resolution.
//   * A TAB RESETS, NEVER PUSHES. Each tab root is reached with
//     `pushReplacementNamed` in Dart, so switching tabs cannot accumulate a back
//     stack the member never built.
//
// The items are built ONCE, above the render, so nothing can drop, reorder or
// duplicate a destination.

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
import { HomeIcon, RankIcon, RewardIcon, VideosIcon } from '../support/icons';

import styles from './LastLane.module.css';

/** `ShowcaseNavTab`, in `values` order. */
export type ShowcaseNavTab = 'home' | 'rank' | 'reward' | 'videos';

interface NavSpec {
  readonly tab: ShowcaseNavTab;
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

/**
 * 20px, not the base's 24. The glyphs sit under a label in a 62px band, and the
 * design's weight is carried by the tape and the type rather than by the icon.
 */
const ICON_SIZE = 20;

export function LastLane({ selected }: { selected: ShowcaseNavTab }) {
  const nav = useMockNav();

  return (
    <nav className={styles.lane}>
      {TABS.map(({ tab, slot, label, Icon }) => {
        const isActive = tab === selected;
        const color = isActive ? 'var(--sc-text)' : 'var(--sc-text-2nd)';
        return (
          <button
            key={tab}
            type="button"
            className={cx(styles.cell, isActive && styles.cellActive)}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => {
              nav.reset(TAB_ROUTES[tab]);
            }}
          >
            {isActive && <span className={styles.tape} />}
            <ThemeIcon slot={slot} fallback={<Icon />} color={color} size={ICON_SIZE} />
            <span className={cx(styles.label, isActive && styles.labelActive)}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
