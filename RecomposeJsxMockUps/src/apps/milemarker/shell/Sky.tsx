// THE SKY — the open field above the horizon, and the one thing in it.
//
// Replaces ../support/ShowcaseTopbar.tsx, which is deleted from this folder.
// The base's topbar is a container of seven things; this is a field holding
// ONE, and the difference is the design.
//
// What lives here, and what deliberately does not:
//
//   lead      the identity row (mark, gym name, its switch chevron) or the back
//             affordance. One row, at the top of the air.
//   label     a 10px tracked label. This is how a region announces itself in
//             this design — there are almost no headings.
//   headline  the single live fact, at 60px, knocked out of the field.
//   mark      a generated cut-out floating free, overhanging the horizon.
//
// The four INFO-BAR items (rank, streak, points, QR) are NOT here. They are on
// the ground, in the first lane, struck as discs — see ../home/ClubLane.tsx.
// That is a move, not a drop: every one of them is still on the screen the base
// puts it on. Moving them off the topbar is what frees the air for the
// headline, and the headline is the whole direction.

import type { ReactNode } from 'react';
import { ThemedImage } from 'recompose-react';

import { cx } from '../cx';
import { showcaseAsset } from '../showcaseAssets';
import { SLOT_LOGO_PRIMARY } from '../showcaseSlots';
import { BackIcon, ExpandMoreIcon } from '../support/icons';

import styles from './Sky.module.css';

export interface SkyProps {
  /** The 10px tracked label above the headline. */
  label: string;
  /** The one live fact. A string, or a node when it counts up. */
  headline: ReactNode;
  /** Drop the headline to 38px — for words rather than a figure. */
  small?: boolean | undefined;
  /** A line under the headline, when the fact needs a unit or a qualifier. */
  aside?: ReactNode;
  /** The identity row or the back row. */
  lead?: ReactNode;
  /** A generated cut-out, floating free at the right. */
  mark?: ReactNode;
}

export function Sky({ label, headline, small = false, aside, lead, mark }: SkyProps) {
  return (
    <div className={styles.sky}>
      {lead}
      {mark}
      <div className={cx(styles.block, mark === undefined && styles.blockWide)}>
        <span className={styles.label}>{label}</span>
        <h1 className={cx(styles.headline, small && styles.headlineSmall)}>{headline}</h1>
        {aside !== undefined && <span className={styles.aside}>{aside}</span>}
      </div>
    </div>
  );
}

/**
 * The floating cut-out. Its own component because every screen that has one
 * resolves it through <ThemedImage> the same way, and because the overhang is a
 * measurement rather than a decision a screen should be making.
 */
export function SkyMark({
  slot,
  fallbackSrc,
  small = false,
}: {
  slot: string;
  fallbackSrc: string;
  small?: boolean | undefined;
}) {
  return (
    <ThemedImage
      className={cx(styles.mark, small && styles.markSmall)}
      slot={slot}
      fallbackSrc={fallbackSrc}
      alt=""
    />
  );
}

/**
 * The identity row: the gym's mark, its name, and the switch chevron.
 *
 * THE LOGO LADDER is the base's, unchanged (../support/ShowcaseTopbar.tsx's
 * header documents it in full): the host gym's real logo always wins, then the
 * active theme's `logo_primary`, then the bundled CombatDen mark. Gym identity
 * is not a customization slot, so a theme pick must never rename or re-logo the
 * mock — and this browser has no host gym, which is what arms the middle rung.
 */
export function SkyIdentity({
  gymName,
  gymLogoSrc,
  themeTabPreview = false,
  crest = true,
}: {
  gymName: string;
  gymLogoSrc?: string | undefined;
  themeTabPreview?: boolean | undefined;
  /**
   * Draw the mark in this row. HOME passes false, because there the mark is the
   * large roundel floating in the air beside the headline — one gym mark, drawn
   * once, at the size that screen gives it. It is never dropped: a screen that
   * turns this off is a screen showing it bigger somewhere else.
   */
  crest?: boolean | undefined;
}) {
  const combatDenLogo = showcaseAsset('combatden_logo.png');
  const mark =
    gymLogoSrc !== undefined && gymLogoSrc !== '' ? (
      <img className={styles.crest} src={gymLogoSrc} alt="" />
    ) : themeTabPreview ? (
      <ThemedImage
        className={styles.crest}
        slot={SLOT_LOGO_PRIMARY}
        fallbackSrc={combatDenLogo}
        alt=""
      />
    ) : (
      <img className={styles.crest} src={combatDenLogo} alt="" />
    );

  return (
    <div className={styles.lead}>
      <div className={styles.gymRow}>
        {crest && mark}
        <span className={styles.gymName}>{gymName}</span>
        <ExpandMoreIcon className={styles.chevron} size={14} />
      </div>
      <div className={styles.leadSpacer} />
    </div>
  );
}

/**
 * The back row. `class` is the only screen that carries it, and it is that
 * screen's ONLY exit — an unwired back button here is a trap, not a cosmetic
 * gap, and it has been one (Guardrail 4).
 */
export function SkyBack({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.lead}>
      <button type="button" className={styles.back} onClick={onBack}>
        <BackIcon className={styles.backGlyph} size={18} />
        <span>Back</span>
      </button>
    </div>
  );
}
