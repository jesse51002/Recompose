// THE SHEET HEAD — the letterhead and the spec block.
//
// Replaces ../support/ShowcaseTopbar.tsx's rendering (which stacks a big
// centred mark over a centred gym name over four evenly-spread stat cells).
// The elements are the SAME four plus the name and its chevron, and every
// theme slot they resolve is the same:
//
//   `logo_primary`  the mark, at the head of the letterhead — small, and to
//                   the LEFT of the gym name rather than centred above it.
//   `rank_belt`     the rank cell
//   `streak_icon`   the streak cell
//   `single_point`  the points cell
//   `icon_qrcode`   the pass cell
//
// What changed is the form. The mark shrinks and the name goes left, so the two
// read as a letterhead; under a 2px walnut rule the four stats become a SPEC
// BLOCK — four cells divided by vertical hairlines, each a tracked 9px label
// over its object and its figure. It is the specification panel on a technical
// drawing, which is where the design keeps facts that are true of the member
// rather than of the screen. Beneath it sits the four-destination index
// (./RomanaIndex.tsx), so the whole fixed head is one ruled block.
//
// The tracked labels are static chrome, in the same sense the nav's "Home" /
// "Rank" / "Reward" / "Videos" are: they name a value already on screen rather
// than introducing one. No cell shows anything the base's info bar did not.

import { ThemedImage } from 'recompose-react';

import { showcaseAsset } from '../showcaseAssets';
import {
  SLOT_ICON_QRCODE,
  SLOT_LOGO_PRIMARY,
  SLOT_RANK_BELT,
  SLOT_SINGLE_POINT,
  SLOT_STREAK_ICON,
} from '../showcaseSlots';
import { ExpandMoreIcon } from '../support/icons';

import type { IndexTab } from './RomanaIndex';
import { RomanaIndex } from './RomanaIndex';
import styles from './SheetHead.module.css';

export interface SheetHeadProps {
  gymName: string;
  streakDays: number;
  pointsLabel: string;
  /** Bundled belt art, behind the theme's `rank_belt` slot. */
  rankBadgeAsset: 'icon_rank_belt.png';
  /**
   * The way off a screen that carries no rail.
   *
   * `class` has no bottom nav in the member app and no rail here, so this IS
   * its only exit. An unwired back control on that screen is a trap rather
   * than a cosmetic gap, and it has been one — see Guardrail 4.
   */
  onBack?: (() => void) | undefined;
  /**
   * The destination this screen is. Omitted on the two screens that carry no
   * navigation in the member app — `class` and `booking` — so what is reachable
   * from where stays exactly as the base has it.
   */
  selected?: IndexTab | undefined;
  /** The host gym's real logo URL, when a host has one. */
  logoSrc?: string | undefined;
  /** Resolve the mark through the theme's `logo_primary` slot. */
  themeTabPreview?: boolean | undefined;
}

export function SheetHead({
  gymName,
  streakDays,
  pointsLabel,
  rankBadgeAsset,
  onBack,
  selected,
  logoSrc,
  themeTabPreview = false,
}: SheetHeadProps) {
  return (
    <header className={styles.head}>
      {onBack !== undefined && (
        <button type="button" className={styles.back} onClick={onBack}>
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="square"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M14 5.5 L7.5 12 L14 18.5" />
          </svg>
          <span className={styles.backLabel}>Back</span>
        </button>
      )}
      <div className={styles.letterhead}>
        <Mark logoSrc={logoSrc} themeTabPreview={themeTabPreview} />
        <span className={styles.gymName}>{gymName}</span>
        <ExpandMoreIcon className={styles.chevron} />
      </div>
      <div className={styles.spec}>
        <SpecCell label="Rank">
          <ThemedImage
            className={styles.object}
            slot={SLOT_RANK_BELT}
            fallbackSrc={showcaseAsset(rankBadgeAsset)}
            alt=""
          />
        </SpecCell>
        <SpecCell label="Streak">
          <ThemedImage
            className={styles.objectTall}
            slot={SLOT_STREAK_ICON}
            fallbackSrc={showcaseAsset('streak_icon.png')}
            alt=""
          />
          <span className={styles.figure}>{String(streakDays)}</span>
        </SpecCell>
        <SpecCell label="Points">
          <ThemedImage
            className={styles.object}
            slot={SLOT_SINGLE_POINT}
            fallbackSrc={showcaseAsset('single_point.png')}
            alt=""
          />
          <span className={styles.figure}>{pointsLabel}</span>
        </SpecCell>
        <SpecCell label="Pass">
          <ThemedImage
            className={styles.object}
            slot={SLOT_ICON_QRCODE}
            fallbackSrc={showcaseAsset('icon_qrcode.png')}
            alt=""
          />
        </SpecCell>
      </div>
      {selected !== undefined && <RomanaIndex selected={selected} />}
    </header>
  );
}

/**
 * The logo ladder, unchanged from the base's topbar:
 *
 *   1. the host gym's REAL logo, which always wins — gym identity is not a
 *      customization slot;
 *   2. the active THEME's `logo_primary`, when `themeTabPreview`;
 *   3. the bundled mark.
 */
function Mark({
  logoSrc,
  themeTabPreview,
}: {
  logoSrc?: string | undefined;
  themeTabPreview: boolean;
}) {
  const bundled = showcaseAsset('combatden_logo.png');
  if (logoSrc !== undefined && logoSrc !== '') {
    return <img className={styles.mark} src={logoSrc} alt="" />;
  }
  if (themeTabPreview) {
    // <ThemedImage> keeps the fallback on screen until the override's URL has
    // actually probed, so a 404 degrades to the bundled art, not an empty box.
    return (
      <ThemedImage
        className={styles.mark}
        slot={SLOT_LOGO_PRIMARY}
        fallbackSrc={bundled}
        alt=""
      />
    );
  }
  return <img className={styles.mark} src={bundled} alt="" />;
}

function SpecCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.cell}>
      <span className={styles.cellLabel}>{label}</span>
      <span className={styles.cellValue}>{children}</span>
    </div>
  );
}
