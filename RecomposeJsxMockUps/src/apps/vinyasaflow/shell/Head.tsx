// WHERE THE THREAD COMES FROM.
//
// Replaces the base's `support/ShowcaseTopbar.tsx`. The brand mark is already a
// circle with one continuous line inside it, so this does not decorate it — it
// places it on the thread's centre and lets the stroke descend out of it. It is
// the one element that does not redraw between screens.
//
// THE FOUR THINGS THE MEMBER CARRIES — rank, streak, points and the QR pass —
// are gathered by the thread bowing sideways, which is the same device the week
// strip and every shelf use. Four circles on a strand, each with its name
// beneath it in sentence case.
//
// THE LOGO LADDER IS THE BASE'S AND IS NOT A DESIGN DECISION: the host gym's
// own logo, then the theme's `logo_primary` slot through <ThemedImage> (which
// also degrades when a RESOLVED override 404s), then the bundled mark. A
// tenant's mark outranks a generated one.

import { ThemedImage } from 'recompose-react';

import { cx } from '../cx';
import { showcaseAsset } from '../showcaseAssets';
import { SLOT_ICON_QRCODE, SLOT_LOGO_PRIMARY, SLOT_RANK_BELT, SLOT_STREAK_ICON } from '../showcaseSlots';
import { ExpandMoreIcon } from '../support/icons';

import { Figure } from './Figure';
import styles from './Head.module.css';
import { Bow } from './Thread';

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

      <div className={styles.carry}>
        <Bow>
          <CarryArt slot={SLOT_RANK_BELT} fallback="icon_rank_belt.png" label="Rank" />
          <CarryFigure
            slot={SLOT_STREAK_ICON}
            fallback="streak_icon.png"
            value={String(streakDays)}
            label="Streak"
          />
          <CarryPlain value={pointsLabel} label="Points" />
          <CarryArt slot={SLOT_ICON_QRCODE} fallback="icon_qrcode.png" label="Pass" />
        </Bow>
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

/** A carried item whose face is a minted object: the belt, the pass. */
function CarryArt({
  slot,
  fallback,
  label,
}: {
  slot: string;
  fallback: Parameters<typeof showcaseAsset>[0];
  label: string;
}) {
  return (
    <div className={styles.carryItem}>
      <span className={cx(styles.carryDisc, styles.carryArt)}>
        <ThemedImage
          className={styles.carryImg}
          slot={slot}
          fallbackSrc={showcaseAsset(fallback)}
          alt=""
        />
      </span>
      <span className={styles.carryLabel}>{label}</span>
    </div>
  );
}

/** A carried item that is a count with its own mark behind it: the streak. */
function CarryFigure({
  slot,
  fallback,
  value,
  label,
}: {
  slot: string;
  fallback: Parameters<typeof showcaseAsset>[0];
  value: string;
  label: string;
}) {
  return (
    <div className={styles.carryItem}>
      <span className={cx(styles.carryDisc, styles.carryArt)}>
        <ThemedImage
          className={styles.carryImg}
          slot={slot}
          fallbackSrc={showcaseAsset(fallback)}
          alt=""
        />
      </span>
      <span className={styles.carryLabel}>
        {value} {label.toLowerCase()}
      </span>
    </div>
  );
}

/** A carried item that is only a figure: the points total. */
function CarryPlain({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.carryItem}>
      <span className={styles.carryDisc}>
        <Figure size="xs">{value}</Figure>
      </span>
      <span className={styles.carryLabel}>{label}</span>
    </div>
  );
}
