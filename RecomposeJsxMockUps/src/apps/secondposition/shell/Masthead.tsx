// THE MASTHEAD — the identity at the top of every app screen, and the four
// facts the member carries with them.
//
// Replaces the base's `support/ShowcaseTopbar.tsx`, which is DELETED from this
// folder.
//
// ---------------------------------------------------------------------------
// THE FIVE ELEMENTS THAT ARE EASY TO DROP HERE, AND ONE FORK ALREADY DID
// ---------------------------------------------------------------------------
//
// The class-detail screen composes this in `back` mode, and a redesign reading
// "a topbar with a back button" and building exactly that drops the mark, the
// name, the rank belt, the streak, the points and the pass — six elements, all
// of which the member app's detail screen carries. It passes every mechanical
// gate. `apps/vinyasaflow/` shipped precisely that for an afternoon.
//
// So `back` mode renders the SAME carried line as every other mode. What it
// suppresses is only the big centred mark, which is what the base's `nameOnly`
// suppresses too.
//
// THE LOGO LADDER is ported verbatim and is load-bearing:
//   1. the host gym's REAL logo — gym identity is not a customization slot, so
//      a theme pick must never replace it. This browser has no host gym.
//   2. the ACTIVE THEME's `logo_primary` slot, when `themeTabPreview`. This is
//      the live path here.
//   3. the bundled mark — what rung 2 degrades to when a theme carries no logo.

import { ThemedImage } from 'recompose-react';

import { cx } from '../cx';
import { showcaseAsset } from '../showcaseAssets';
import {
  SLOT_ICON_QRCODE,
  SLOT_LOGO_PRIMARY,
  SLOT_RANK_BELT,
  SLOT_SINGLE_POINT,
  SLOT_STREAK_ICON,
} from '../showcaseSlots';
import { BackIcon, ExpandMoreIcon } from '../support/icons';

import styles from './Masthead.module.css';

/**
 * How the identity is drawn. The CARRIED LINE is unaffected by this — it is
 * present in all three, because it is present on all three screens.
 */
export type MastheadMode =
  /** The schedule root: the full mark above the name. */
  | 'billed'
  /** Every other tab: the name alone, no big mark. */
  | 'plain'
  /** The class detail: a back control leading the row. */
  | 'back';

export interface MastheadProps {
  mode: MastheadMode;
  gymName: string;
  streakDays: number;
  pointsLabel: string;
  /** The host gym's own logo URL. Wins over any theme or bundled fallback. */
  logoSrc?: string | undefined;
  /** Resolve the logo through the active theme's slot. */
  themeTabPreview?: boolean | undefined;
  /** Only meaningful in `back` mode. Wired by the screen; never a no-op. */
  onBack?: (() => void) | undefined;
}

export function Masthead({
  mode,
  gymName,
  streakDays,
  pointsLabel,
  logoSrc,
  themeTabPreview = false,
  onBack,
}: MastheadProps) {
  return (
    <header className={styles.masthead}>
      {mode === 'back' ? (
        <div className={styles.backRow}>
          <button className={styles.back} type="button" onClick={onBack} aria-label="Back">
            <BackIcon className={styles.backIcon} />
          </button>
          <Mark logoSrc={logoSrc} themeTabPreview={themeTabPreview} small />
          <span className={styles.backName}>{gymName}</span>
          <ExpandMoreIcon className={styles.chevron} />
        </div>
      ) : (
        <div className={cx(styles.identity, mode === 'plain' && styles.identityCompact)}>
          {mode === 'billed' && <Mark logoSrc={logoSrc} themeTabPreview={themeTabPreview} />}
          <div className={styles.nameRow}>
            <span className={styles.name}>{gymName}</span>
            <ExpandMoreIcon className={styles.chevron} />
          </div>
        </div>
      )}

      <div className={styles.rule} />

      <div className={styles.carried}>
        <div className={styles.cell}>
          <ThemedImage
            className={styles.belt}
            slot={SLOT_RANK_BELT}
            fallbackSrc={showcaseAsset('icon_rank_belt.png')}
            alt=""
          />
        </div>
        <div className={styles.cell}>
          <CarriedPair
            slot={SLOT_STREAK_ICON}
            fallbackSrc={showcaseAsset('streak_icon.png')}
            value={String(streakDays)}
            width={15}
            height={24}
          />
        </div>
        <div className={styles.cell}>
          <CarriedPair
            slot={SLOT_SINGLE_POINT}
            fallbackSrc={showcaseAsset('single_point.png')}
            value={pointsLabel}
            width={20}
            height={20}
          />
        </div>
        <div className={styles.cell}>
          <ThemedImage
            className={styles.qr}
            slot={SLOT_ICON_QRCODE}
            fallbackSrc={showcaseAsset('icon_qrcode.png')}
            alt=""
          />
        </div>
      </div>

      <div className={styles.rule} />
    </header>
  );
}

function Mark({
  logoSrc,
  themeTabPreview,
  small = false,
}: {
  logoSrc?: string | undefined;
  themeTabPreview: boolean;
  small?: boolean;
}) {
  const bundled = showcaseAsset('combatden_logo.png');
  const className = cx(styles.mark, small && styles.markSmall);
  if (logoSrc !== undefined && logoSrc !== '') {
    return <img className={className} src={logoSrc} alt="" />;
  }
  if (themeTabPreview) {
    return (
      <ThemedImage className={className} slot={SLOT_LOGO_PRIMARY} fallbackSrc={bundled} alt="" />
    );
  }
  return <img className={className} src={bundled} alt="" />;
}

/**
 * A carried mark and its value. ONE object, so the gap between them is the
 * small one — see the stylesheet.
 *
 * The two marks this renders are not square (`streak_icon` is 0.60, the point
 * tile 0.98), so each is given its own extents and CONTAINED. A cut-out has a
 * transparent margin, so containment shows no letterbox; cropping either to a
 * shared square would behead the chevrons.
 */
function CarriedPair({
  slot,
  fallbackSrc,
  value,
  width,
  height,
}: {
  slot: string;
  fallbackSrc: string;
  value: string;
  width: number;
  height: number;
}) {
  return (
    <div className={styles.pair}>
      <ThemedImage
        className={styles.pairIcon}
        slot={slot}
        fallbackSrc={fallbackSrc}
        alt=""
        style={{ width: `${String(width)}px`, height: `${String(height)}px` }}
      />
      <span className={styles.pairValue}>{value}</span>
    </div>
  );
}
