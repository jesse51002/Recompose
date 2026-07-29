// THE RAIL — this design's answer to the base's bottom tab bar.
//
// It is the one piece of chrome in the app, and it is the whole reason the
// fork does not read as the base: a walnut band down the LEFT edge, full
// height, carrying the studio's mark at its head and the four destinations
// stacked beneath it. The destination you are on is seated in a brass carriage
// stop on the rail's inner edge — the reformer's own logic, where the carriage
// sits at the one notch it was set to and the spring is the only bright metal
// in the room.
//
// WHAT IT KEEPS FROM THE BAR IT REPLACES, exactly:
//
//   * the same four destinations, in the same order, always all four present;
//   * the same concept names — `rank` is the profile, `reward` is the store —
//     so the four `nav_*` icon slots keep resolving (../../CLAUDE.md);
//   * the same <ThemeIcon> resolution, so a tenant's generated glyphs land here
//     with the bundled ones behind them;
//   * the same reset-not-push tab switch;
//   * every label still built and still announced.
//
// It is present on exactly the screens the bottom bar was: home, store, video
// and profile. `class`, `booking` and every celebration card carry no bar in
// the member app and carry no rail here, which is what keeps "what is reachable
// from where" identical to the base.
//
// THE MARK MOVED HERE, and that is a move rather than an addition: the base
// draws it in the topbar of those same four screens, this draws it at the head
// of the rail on those same four screens. It sits on an IVORY plate rather than
// straight on the walnut, because the generated mark is a walnut monogram in a
// brass ring and walnut-on-walnut is not a mark, it is a smudge.

import type { ReactElement } from 'react';
import { ThemeIcon, ThemedImage } from 'recompose-react';

import { useMockNav } from '../../../kit/MockNav';
import { TAB_ROUTES } from '../appAsset';
import { cx } from '../cx';
import { showcaseAsset } from '../showcaseAssets';
import {
  SLOT_LOGO_PRIMARY,
  SLOT_NAV_HOME,
  SLOT_NAV_RANK,
  SLOT_NAV_REWARD,
  SLOT_NAV_VIDEOS,
} from '../showcaseSlots';
import { HomeIcon, RankIcon, RewardIcon, VideosIcon } from '../support/icons';

import styles from './RomanaRail.module.css';

/** `ShowcaseNavTab`, unchanged — the tab set is not a design decision. */
export type RailTab = 'home' | 'rank' | 'reward' | 'videos';

interface RailSpec {
  readonly tab: RailTab;
  readonly slot: string;
  readonly label: string;
  readonly Icon: (props: { size?: number | undefined }) => ReactElement;
}

const TABS: readonly RailSpec[] = Object.freeze([
  { tab: 'home', slot: SLOT_NAV_HOME, label: 'Home', Icon: HomeIcon },
  { tab: 'rank', slot: SLOT_NAV_RANK, label: 'Rank', Icon: RankIcon },
  { tab: 'reward', slot: SLOT_NAV_REWARD, label: 'Reward', Icon: RewardIcon },
  { tab: 'videos', slot: SLOT_NAV_VIDEOS, label: 'Videos', Icon: VideosIcon },
]);

/**
 * The glyph extent on the rail. Smaller than the bar's 24 because the rail is
 * narrow and the icons are the theme's own line art — the run's `nav_*` slots
 * are 1.5px-stroke lucide glyphs, and a stroke that fine wants to be read at a
 * size, not filled to the edges of its box.
 */
const ICON_SIZE = 21;

export interface RomanaRailProps {
  selected: RailTab;
  /** The host gym's real logo URL, when a host has one. */
  logoSrc?: string | undefined;
  /** Resolve the mark through the theme's `logo_primary` slot. */
  themeTabPreview?: boolean | undefined;
}

export function RomanaRail({ selected, logoSrc, themeTabPreview = false }: RomanaRailProps) {
  // A tab RESETS rather than pushes — the Dart reaches each tab root with
  // `pushReplacementNamed`, so switching tabs cannot accumulate a back stack
  // the member never built. Unchanged from the bar.
  const nav = useMockNav();

  return (
    <nav className={styles.rail} aria-label="Sections">
      <RailMark logoSrc={logoSrc} themeTabPreview={themeTabPreview} />
      <div className={styles.stack}>
        {TABS.map(({ tab, slot, label, Icon }) => {
          const active = tab === selected;
          // `isActive ? accent : …` is the member app's own selection role and
          // is kept. On a walnut rail the inactive ink is the sheet's ivory
          // held back, which is the same relationship the bar draws in reverse.
          const color = active ? 'var(--sc-accent)' : 'var(--sc-primary-button-text)';
          const select = () => {
            nav.reset(TAB_ROUTES[tab]);
          };
          return (
            <div
              key={tab}
              className={cx(styles.notch, active && styles.notchActive)}
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
              {/* The carriage stop. One brass fitting, on the inner edge, and
                  the only bright metal on the rail. */}
              <span className={styles.stop} aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * The maker's plate at the head of the rail — the logo ladder, unchanged from
 * ../support/ShowcaseTopbar.tsx:
 *
 *   1. the host gym's REAL logo, which always wins;
 *   2. the active THEME's `logo_primary`, when `themeTabPreview`;
 *   3. the bundled mark.
 */
function RailMark({
  logoSrc,
  themeTabPreview,
}: {
  logoSrc?: string | undefined;
  themeTabPreview: boolean;
}) {
  const bundled = showcaseAsset('combatden_logo.png');
  return (
    <div className={styles.plate}>
      {logoSrc !== undefined && logoSrc !== '' ? (
        <img className={styles.mark} src={logoSrc} alt="" />
      ) : themeTabPreview ? (
        <ThemedImage
          className={styles.mark}
          slot={SLOT_LOGO_PRIMARY}
          fallbackSrc={bundled}
          alt=""
        />
      ) : (
        <img className={styles.mark} src={bundled} alt="" />
      )}
    </div>
  );
}
