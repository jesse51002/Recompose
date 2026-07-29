// THE INDEX — this design's answer to the base's bottom tab bar.
//
// Four destinations in one ruled row at the FOOT of the sheet, each a glyph
// over a tracked label, the one you are on SEATED IN SOLID WALNUT. It is the
// same device the day scale (../home/DayScale.module.css) and the timeframe
// selector use to mark a selection, which is the point: the shell is built out
// of the design's own part rather than out of a component borrowed from
// somewhere else.
//
// WHY THE FOOT, AND NOT A RAIL OR A HEADER. An earlier version of this fork
// put the four destinations on a vertical walnut rail down the left edge, then
// on a segmented header. Guardrail 11 rules out both: the foot is the edge a
// thumb reaches on a 390pt phone, and where every mobile OS puts primary
// navigation. What stays this design's own is its FORM — a ruled index row of
// four equal cells with the current one seated in solid walnut, the same
// device the day scale and the timeframe selector use to mark a selection.
//
// A screen with an action band stacks them: the band is that screen's one job,
// the index is how you leave.
//
// WHAT IT KEEPS FROM THE BAR IT REPLACES, exactly:
//
//   * the same four destinations, in the same order, always all four present;
//   * the same concept names — `rank` is the profile, `reward` is the store —
//     so the four `nav_*` icon slots keep resolving (../../CLAUDE.md);
//   * the same <ThemeIcon> resolution, so a tenant's generated glyphs land here
//     with the bundled ones behind them;
//   * the same reset-not-push tab switch;
//   * every label visible and announced.

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

import styles from './RomanaIndex.module.css';

/** `ShowcaseNavTab`, unchanged — the tab set is not a design decision. */
export type IndexTab = 'home' | 'rank' | 'reward' | 'videos';

interface IndexSpec {
  readonly tab: IndexTab;
  readonly slot: string;
  readonly label: string;
  readonly Icon: (props: { size?: number | undefined }) => ReactElement;
}

const TABS: readonly IndexSpec[] = Object.freeze([
  { tab: 'home', slot: SLOT_NAV_HOME, label: 'Home', Icon: HomeIcon },
  { tab: 'rank', slot: SLOT_NAV_RANK, label: 'Rank', Icon: RankIcon },
  { tab: 'reward', slot: SLOT_NAV_REWARD, label: 'Reward', Icon: RewardIcon },
  { tab: 'videos', slot: SLOT_NAV_VIDEOS, label: 'Videos', Icon: VideosIcon },
]);

/**
 * The glyph extent. Smaller than the bar's 24 because the label carries the
 * destination here and the theme's own `nav_*` art is 1.5px-stroke line work —
 * a stroke that fine wants to be read at a size, not filled to its box.
 */
const ICON_SIZE = 18;

export interface RomanaIndexProps {
  selected: IndexTab;
}

export function RomanaIndex({ selected }: RomanaIndexProps) {
  // A tab RESETS rather than pushes — the Dart reaches each tab root with
  // `pushReplacementNamed`, so switching tabs cannot accumulate a back stack
  // the member never built. Unchanged from the bar.
  const nav = useMockNav();

  return (
    <nav className={styles.index} aria-label="Sections">
      {TABS.map(({ tab, slot, label, Icon }) => {
        const active = tab === selected;
        // Ivory on walnut in the seated cell, held-back ink everywhere else.
        const color = active ? 'var(--sc-primary-button-text)' : 'var(--sc-text-3rd)';
        const select = () => {
          nav.reset(TAB_ROUTES[tab]);
        };
        return (
          <div
            key={tab}
            className={cx(styles.cell, active && styles.cellActive)}
            style={{ color }}
            onClick={select}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                select();
              }
            }}
            role="button"
            tabIndex={0}
            aria-current={active ? 'page' : undefined}
          >
            <ThemeIcon slot={slot} fallback={<Icon />} color={color} size={ICON_SIZE} />
            <span className={styles.label}>{label}</span>
          </div>
        );
      })}
    </nav>
  );
}
