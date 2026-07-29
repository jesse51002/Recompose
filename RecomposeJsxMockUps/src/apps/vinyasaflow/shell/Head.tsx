// THE EDITORIAL TOPBAR.
//
// Replaces the base's `support/ShowcaseTopbar.tsx`. An earlier direction for
// this run made the mark the origin of a line running down the screen and hung
// the four carried items off it as decorated circles; both are gone with the
// line. Here the mark and the studio's name are a masthead, and the four things
// the member carries are ONE QUIET LINE beneath it.
//
// That demotion is the design decision. Rank, streak, points and the pass are
// status, not the subject — the photograph below them is the subject. A row of
// ornamented badges above an editorial hero competes with it and makes the top
// of every screen the busiest part, which is the opposite of what this app is
// for. Every one of the four is still present and still says what it said.
//
// THE LOGO LADDER IS THE BASE'S AND IS NOT A DESIGN DECISION: the host gym's own
// logo, then the theme's `logo_primary` slot through <ThemedImage> (which also
// degrades when a RESOLVED override 404s), then the bundled mark. A tenant's
// mark outranks a generated one.

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

import styles from './Head.module.css';

export interface HeadProps {
  gymName: string;
  /** The host gym's own logo — the top rung of the ladder. */
  gymLogoSrc?: string | undefined;
  /** Resolve the theme's `logo_primary` slot as the middle rung. */
  themeTabPreview?: boolean | undefined;
  streakDays: number;
  pointsLabel: string;
}

export function Head({
  gymName,
  gymLogoSrc,
  themeTabPreview = false,
  streakDays,
  pointsLabel,
}: HeadProps) {
  return (
    <header className={styles.head}>
      <div className={styles.mast}>
        <Mark logoSrc={gymLogoSrc} themeTabPreview={themeTabPreview} />
        {/*
          The chevron is the member app's own studio switcher. It is rendered
          because the base renders it — dropping an affordance is a feature
          removed, which the invariant forbids in both directions.
        */}
        <button type="button" className={styles.name}>
          <span>{gymName}</span>
          <ExpandMoreIcon className={styles.chevron} />
        </button>
      </div>

      {/*
        ALL FOUR, and only what each of them actually said in the base: the rank
        belt and the pass are marks with no label, the streak is its icon and
        its count, the points are their coin and their total. Nothing invented —
        an added label here would be a fact the screen did not carry, which the
        invariant forbids just as firmly as dropping one.
      */}
      <div className={styles.carry}>
        <Carried slot={SLOT_RANK_BELT} fallback="icon_rank_belt.png" label="Rank" />
        <Carried
          slot={SLOT_STREAK_ICON}
          fallback="streak_icon.png"
          label="Streak"
          text={`${String(streakDays)} weeks`}
        />
        <Carried
          slot={SLOT_SINGLE_POINT}
          fallback="single_point.png"
          label="Points"
          text={pointsLabel}
        />
        <Carried slot={SLOT_ICON_QRCODE} fallback="icon_qrcode.png" label="Pass" />
      </div>
    </header>
  );
}

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
    return (
      <ThemedImage className={styles.mark} slot={SLOT_LOGO_PRIMARY} fallbackSrc={bundled} alt="" />
    );
  }
  return <img className={styles.mark} src={bundled} alt="" />;
}

/**
 * One carried item: its minted mark, and its value where it has one.
 *
 * `label` names the mark for a screen reader; it is deliberately NOT rendered.
 * The base drew these as bare icons too, and a visible caption under each would
 * be four new labels on the busiest part of the screen.
 */
function Carried({
  slot,
  fallback,
  label,
  text,
}: {
  slot: string;
  fallback: Parameters<typeof showcaseAsset>[0];
  label: string;
  text?: string | undefined;
}) {
  return (
    <div className={styles.carryItem}>
      <ThemedImage
        className={styles.carryImg}
        slot={slot}
        fallbackSrc={showcaseAsset(fallback)}
        alt={label}
      />
      {text === undefined ? null : <span className={styles.carryText}>{text}</span>}
    </div>
  );
}
