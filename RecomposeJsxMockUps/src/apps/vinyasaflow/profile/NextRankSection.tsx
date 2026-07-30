// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// next_rank/{next_rank_section,next_rank_badge,next_rank_title,
// next_rank_progress_label,next_rank_progress,rank_arc_painter}.dart — the belt
// the member is working toward, and how close they are to it.
//
// THE PROGRESS BADGE IS THE THREAD WINDING AROUND A RING. It is drawn as an arc
// in the thread's own ink and weight, starting at twelve o'clock and running
// clockwise, and it FILLS BY DRAWING at an even rate — the same way the line
// travels everywhere else in this app, and stopping exactly on its mark without
// a bounce or a settle. There is no track behind it: an unfilled ring would be a
// container, and what the member has left to do is said in words beside it.
//
// THE BELT INSIDE IT IS A <MintedDisc>. The pipeline's `next_rank_belt_image` is
// a struck medallion — 1:1, centre-weighted, transparent-edged — so a circle
// costs it nothing. It keeps its inset from the stroke so the arc never touches
// the art.
//
// THIS IS THAT SLOT'S ONLY CONSUMER, AND THE REASON THIS SCREEN EXISTS. The
// pipeline derives it from `rank_belt` (`apps/combatden/app.yaml`,
// `depends_on: rank_belt`) and has produced it for every theme;
// `next_rank_badge.dart` is the one widget in the member app that reads it, and
// the preview never carried Profile — so a tenth generated image per theme had
// been shipping to nothing.
//
// The Dart ladder is the payload's `next_rank_image_url` (the gym's real belt
// art) OVER the themed slot OVER the bundled asset. There is no member in this
// browser, so the ladder starts at the themed slot, exactly as ./RankHeader.tsx
// does for the current belt — which is what makes the two belts differ per theme
// rather than being one asset drawn twice.
//
// SIX DART FILES, ONE HERE, AND ONE ARRANGEMENT. The base kept the four
// elements separately exported because five arrangements split them across the
// screen; there is one arrangement in this fork, so the exports that only those
// layouts used are gone rather than left dead.

import { Figure } from '../shell/Figure';
import { MintedDisc } from '../shell/Photo';
import { Region } from '../shell/Thread';
import { showcaseAsset } from '../showcaseAssets';
import { SLOT_NEXT_RANK_BELT_IMAGE } from '../showcaseSlots';
import { SC, showcaseStyle } from '../showcaseTokens';

import { RANK_PART } from './rankParts';
import styles from './NextRankSection.module.css';
import type { ShowcaseRank } from './mockRankProgress';

/**
 * The ring's diameter and the belt's inside it. Per-asset layout dimensions,
 * not design tokens — the Dart spells them as file-local consts too. The belt
 * is `_kInsetRatio` (0.22) in from the stroke on every side, which is what keeps
 * the arc clear of the art.
 */
const RING = 128;
const BELT = 72;

/** `NextRankSectionProps`. */
export interface NextRankSectionProps {
  rank: ShowcaseRank;
}

/**
 * `NextRankSection.build`'s arithmetic, verbatim: at the top of the ladder there
 * is no target, so the ring reads empty and the words name the state instead of
 * printing "17 / 0 classes".
 */
export function nextRankProgress(rank: ShowcaseRank): {
  progress: number;
  label: string;
  done: number;
  target: number;
} {
  const target = rank.classesTillNextStep;
  const done = rank.classesSinceRank;
  if (target <= 0) return { progress: 0, label: 'Top of the ladder.', done, target };
  const raw = done / target;
  return {
    progress: raw < 0 ? 0 : raw > 1 ? 1 : raw,
    label: `${String(done)} / ${String(target)} classes`,
    done,
    target,
  };
}

/**
 * "Next rank" — the belt the member is working toward, the ring winding around
 * it, and the count of classes between here and there.
 *
 * The count is set the way this app sets every number it counts: the figure
 * large and light in the display face, its denominator running on beside it in
 * the body face. Same string as the base ("17 / 24 classes"), one register apart
 * so the number is what the eye lands on.
 */
export function NextRankSection({ rank }: NextRankSectionProps) {
  const { progress, label, done, target } = nextRankProgress(rank);

  return (
    <Region label="Next rank">
      <div className={styles.section}>
        <div
          className={styles.ring}
          style={showcaseStyle({ '--nr-ring': `${String(RING)}px` })}
          data-rank-part={RANK_PART.nextRankProgress}
        >
          <span className={styles.belt} data-rank-part={RANK_PART.nextRankBadge}>
            <MintedDisc
              slot={SLOT_NEXT_RANK_BELT_IMAGE}
              fallback={showcaseAsset('profile_next_rank_belt.png')}
              alt=""
              size={BELT}
            />
          </span>
          <RankArc progress={progress} size={RING} />
        </div>
        {/*
          NEVER TRUNCATED: this is the one place the screen says what the
          progress actually counts, so it is given the room to wrap.
        */}
        <div className={styles.words} data-rank-part={RANK_PART.nextRankProgressLabel}>
          {target > 0 ? (
            <>
              <Figure size="lg">{String(done)}</Figure>
              <p className={styles.of}>/ {String(target)} classes</p>
            </>
          ) : (
            <p className={styles.of}>{label}</p>
          )}
        </div>
      </div>
    </Region>
  );
}

/**
 * `RankArcPainter` — the swept portion of a circle, starting at twelve o'clock
 * and running clockwise, in the thread's stroke.
 *
 * The viewBox is the box's own px, so `rect.deflate(strokeWidth / 2)` ports as a
 * radius of `(size - strokeWidth) / 2` with no scaling left to reason about.
 *
 * THE DASH IS THE WHOLE CIRCUMFERENCE, offset to reveal the swept fraction —
 * not a dash cut to the sweep's own length. Two things fall out of that: the
 * stylesheet can wind it on by animating one number, and at progress 0 the
 * pattern's gap covers the entire path, so a round cap cannot leave a dot on an
 * empty ring (the member at the top of the ladder).
 */
function RankArc({ progress, size }: { progress: number; size: number }) {
  const stroke = SC.threadWidthOver;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg
      className={styles.arc}
      viewBox={`0 0 ${String(size)} ${String(size)}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        className={styles.sweep}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - clamp01(progress))}
        transform={`rotate(-90 ${String(size / 2)} ${String(size / 2)})`}
        style={showcaseStyle({ '--nr-arc-length': String(circumference) })}
      />
    </svg>
  );
}

/** `progress.clamp(0.0, 1.0)`. */
function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
