// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// next_rank/{next_rank_section,next_rank_badge,next_rank_title,
// next_rank_progress_label,next_rank_progress,rank_arc_painter}.dart — the belt
// the member is working toward, and how close they are to it.
//
// SIX DART FILES, ONE HERE. Each of the four elements is three to ten lines, so
// a file apiece would be six files of one element; the base kept them separate
// because `beltHero` split them across two regions of the screen, and this fork
// has one arrangement. The painter lands here too: an arc between two fixed
// endpoints is one static SVG stroke with no per-frame value for a canvas to
// buy.
//
// THIS IS THE `next_rank_belt_image` SLOT'S ONLY CONSUMER, AND THE REASON THIS
// SCREEN EXISTS. The pipeline derives it from `rank_belt` and has produced it
// for every theme, and `next_rank_badge.dart` is the one widget in the member
// app that reads it — so a whole generated image per theme had been shipping to
// nothing until the preview carried Profile.
//
// THE RING DOES NOT TOUCH THE MEDALLION, and that is the brief rather than a
// taste. An insignia is "never framed, never given a border, never inset into a
// container" (../layout_brief.yaml), and the base's ring hugged the badge at
// three pixels' clearance, which is a border by any other name. So the measure
// is drawn at its own radius with 28px of clear air inside it: the belt is
// mounted, and the ring is the distance still to go, and the two are legibly
// separate objects rather than one framed one.
//
// THE TWO STROKES ARE THE PALETTE'S TWO LINE COLOURS AND BOTH ARE MEASURED. The
// track is brass — 3.25:1 on the cream, which fails text at any size and
// carries a line honestly, which is brass's entire job here. The swept portion
// is the satin blush at 4.31:1, heavier, so the progress reads as both a colour
// and a weight against the full circle behind it. Neither spells a word.
//
// IT STOPS FLAT ON ITS MARK. `stroke-linecap: butt`, from the motion direction's
// own sentence: "a progress arc fills at a slowing rate and stops flat on its
// mark." A round cap would also paint a dot at the top of the ladder, where the
// value is zero and the ring must read EMPTY.

import { ThemedImage } from 'recompose-react';

import { INSIGNIA_ART_CLASS, Insignia } from '../shell/Insignia';
import { Section } from '../shell/Section';
import { showcaseAsset } from '../showcaseAssets';
import { SLOT_NEXT_RANK_BELT_IMAGE } from '../showcaseSlots';
import { showcaseStyle } from '../showcaseTokens';

import { RANK_PART } from './rankParts';
import styles from './NextRankSection.module.css';
import type { ShowcaseRank } from './mockRankProgress';

/**
 * The medallion's box, and the circle measured around it. Per-asset layout
 * dimensions, not design tokens — the Dart spells its own as file-local consts
 * too.
 *
 * The badge is deliberately smaller than the current rank's 140
 * (./RankHeader.tsx): the rank a member HOLDS leads this screen and the one
 * they are working toward follows it, and scale is the plainest way to say so.
 */
const BADGE_SIZE = 76;
const RING_SIZE = 132;

/** The full measure, and the part of it done. */
const TRACK_STROKE = 1.5;
const SWEEP_STROKE = 4;

/** `mockProfile.nextRankTitle` — the one heading this region carries. */
export const NEXT_RANK_TITLE = 'Next Rank';

/**
 * `NextRankSection.build`'s arithmetic, verbatim: at the top of the ladder
 * there is no target, so the ring reads empty and the label names the state
 * instead of printing "17 / 0 classes".
 */
export function nextRankProgress(rank: ShowcaseRank): { progress: number; label: string } {
  const target = rank.classesTillNextStep;
  const done = rank.classesSinceRank;
  if (target <= 0) return { progress: 0, label: 'Top of the ladder.' };
  const raw = done / target;
  return {
    progress: raw < 0 ? 0 : raw > 1 ? 1 : raw,
    label: `${String(done)} / ${String(target)} classes`,
  };
}

export interface NextRankSectionProps {
  rank: ShowcaseRank;
}

export function NextRankSection({ rank }: NextRankSectionProps) {
  const { progress, label } = nextRankProgress(rank);

  return (
    // The heading is the shell section's own label — a brass rule, then the
    // small tracked sans in charcoal. The serif is for NAMES, and "Next Rank"
    // names nothing: the next rank's name is not a fact this screen holds.
    <Section label={NEXT_RANK_TITLE}>
      <div className={styles.focus}>
        <RingBadge progress={progress} />
        {/*
          NEVER TRUNCATED: this is the one place the screen says what the
          progress actually counts, so it is given the room to wrap.
        */}
        <span className={styles.label} data-rank-part={RANK_PART.nextRankProgressLabel}>
          {label}
        </span>
      </div>
    </Section>
  );
}

/**
 * The mounted belt with the measure drawn around it.
 *
 * The geometry is computed here rather than in CSS because the dash length IS
 * the value being shown — deriving it from a circumference in a stylesheet
 * would put the one number this component exists to communicate somewhere it
 * cannot be read.
 */
function RingBadge({ progress }: { progress: number }) {
  const radius = (RING_SIZE - SWEEP_STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const swept = circumference * clamp01(progress);
  const centre = RING_SIZE / 2;

  return (
    <div
      className={styles.ring}
      style={showcaseStyle({
        '--nr-ring-size': `${String(RING_SIZE)}px`,
        // The dash the sweep starts hidden behind and animates away to zero.
        // Unitless, which `stroke-dashoffset` takes as user units.
        '--nr-sweep-dash': String(swept),
      })}
      data-rank-part={RANK_PART.nextRankProgress}
    >
      <Insignia
        size={BADGE_SIZE}
        art={
          <ThemedImage
            className={INSIGNIA_ART_CLASS}
            slot={SLOT_NEXT_RANK_BELT_IMAGE}
            fallbackSrc={showcaseAsset('profile_next_rank_belt.png')}
            alt=""
            data-rank-part={RANK_PART.nextRankBadge}
          />
        }
      />
      <svg
        className={styles.arc}
        viewBox={`0 0 ${String(RING_SIZE)} ${String(RING_SIZE)}`}
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* The whole measure. Brass, because brass is a line. */}
        <circle
          className={styles.track}
          cx={centre}
          cy={centre}
          r={(RING_SIZE - TRACK_STROKE) / 2}
          strokeWidth={TRACK_STROKE}
        />
        {/* The part of it done, from twelve o'clock, clockwise. */}
        <circle
          className={styles.sweep}
          cx={centre}
          cy={centre}
          r={radius}
          strokeWidth={SWEEP_STROKE}
          strokeDasharray={`${String(swept)} ${String(circumference)}`}
          transform={`rotate(-90 ${String(centre)} ${String(centre)})`}
        />
      </svg>
    </div>
  );
}

/** `progress.clamp(0.0, 1.0)`. */
function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
