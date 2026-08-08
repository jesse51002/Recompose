// CELEBRATION CARD 1 — THE STREAK, as a plaque struck on satin.
//
// The base was two views on a switch: a ring of eight streak icons expanded,
// spun on a shared rAF clock and collapsed, the big icon popped in on
// `easeOutBack` and faded OUT, and only then did the week count, the caption
// and the week strip cascade in over the empty canvas. Two things make that the
// wrong card here, and both come out of ../layout_brief.yaml rather than out of
// taste:
//
//   * NOTHING IN THIS APP OVERSHOOTS. The motion direction is a ballet phrase —
//     travel, slow, arrive, hold — on one deceleration curve, and it names
//     `easeOutBack` as the one curve this fork may never sample. An eight-
//     particle ring on a non-monotonic radius is the only thing in the island
//     that needed a per-frame driver; with the overshoot gone there is no
//     curve left that a keyframe cannot express, so ./streakOrbit.ts is DELETED
//     rather than left beside this file unreferenced.
//   * THE MARK AND THE FIGURE BELONG ON SCREEN TOGETHER. An insignia "is the
//     largest thing on the screen after that card's own figure" — which cannot
//     be true of a mark that has faded out before the figure arrives. The
//     emphasis ranking wants the week COUNT at rank 1 and the streak mark at
//     rank 2, and two views on a switch give each of them rank 1 for a while
//     and rank nothing for the rest.
//
// SO THE CARD IS ONE VIEW: a satin sheet, the chevrons mounted as an insignia,
// the count struck under them in the display serif, what the class was worth
// beneath that, and the week printed along the foot. The only figure in this
// app that may be set in the serif is a celebration card's own subject, and on
// this card that is the week count — there the number IS the name of what
// happened, which is why `--sc-type-figure-hero` exists at all.
//
// THE ENTRANCE IS THE FORK'S ONE GESTURE. The satin field opens from the top
// edge and everything is already in place beneath it, so the field passing over
// the type is what puts the type on screen — the same motion a panel makes down
// the schedule, at the scale of a whole card. It is a VEIL and not a clip
// because a clip removes what it hides from hit testing, and the scaffold's
// tap-to-skip target has to be live from the first frame.

import { useEffect, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { CountUpText } from './celebrations/CountUpText';
import { cx } from './cx';
import { INSIGNIA_ART_CLASS, Insignia } from './shell/Insignia';
import { COUNT_MS, HOLD_MS, STAGGER_MS, WIPE_MS } from './shell/phrase';
import { Screen } from './shell/Screen';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_STREAK_ICON } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import styles from './StatsShowcase.module.css';
import type { ShowcaseStreakDay } from './support/StreakWeekStrip';
import { StreakWeekStrip } from './support/StreakWeekStrip';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Dummy data — a clone of MobileApp's `buildStreakStats` output. Not a
// customization slot, and not a member's real numbers.
/** `_kWeekCount`. */
const WEEK_COUNT = 3;
/** The unit the count is counting. A LABEL, so the sans; the figure is the name. */
const WEEK_UNIT = 'Week streak';
/**
 * `buildStreakStats`: the subtitle is what the class was WORTH, not a sentence
 * about it. The old value came from `mock_stats.dart`'s dormant demo constant.
 */
const SUBTITLE = '+160 points';
/** `_kWeekDays`. */
const WEEK_DAYS: readonly ShowcaseStreakDay[] = Object.freeze([
  Object.freeze({ label: 'S', completed: false }),
  Object.freeze({ label: 'M', completed: true }),
  Object.freeze({ label: 'T', completed: false }),
  Object.freeze({ label: 'W', completed: false }),
  Object.freeze({ label: 'T', completed: true }),
  Object.freeze({ label: 'F', completed: false }),
  Object.freeze({ label: 'S', completed: false }),
]);

/**
 * The edge of the box the chevrons are CONTAINED in.
 *
 * The art measures 0.60, so a square box renders it ~84x140 with the remainder
 * left empty — invisible, because a cut-out has no opaque edge to show a
 * letterbox. A crop to the box's own square would behead it. This is the rule
 * for an insignia and it is the opposite of the rule for a photograph; the two
 * are never interchangeable (./layout_brief.yaml).
 *
 * THE NUMBER IS A HIERARCHY DECISION AND IT WAS MADE BY MEASURING, because
 * looking at it alone got it wrong once. This card's rank 1 is the week COUNT
 * and its rank 2 is the mark, and a ONE-DIGIT count is the hardest case in the
 * flow for that ordering: the points card spends the same 72px rung on four
 * glyphs and wins the field outright, where "3" is a single stem of cream on a
 * whole sheet of satin. Measured as ink energy — summed |luminance − field| over
 * each element's box, which is what a squint actually integrates — the mark at
 * 140 came out at 2135 against the count's 379 and even the earned line's 499,
 * so the ranking was inverted twice over.
 *
 * 120 is where that resolves as far as scale can take it (1573), and the rest is
 * carried by the two levers Guardrail 14 names alongside size: CONTRAST, since
 * the count is the brightest thing on the card at 5.47:1 while the chevrons are
 * a tonal object in the field's own hue, and ISOLATION, since the count holds
 * the optical centre and the mark hangs above it. Below ~104 the mark stops
 * reading as an insignia at all and the card goes hollow. A photographic cut-out
 * will always out-MASS one digit; what it must not do is out-rank it.
 */
const MARK_BOX_PX = 120;

// ---------------------------------------------------------------------------
// THE PHRASE, as one ladder.
//
// Every delay below is a sum of ./shell/phrase.ts constants, so slowing the
// fork slows the card and nothing here has to be re-derived by hand. The one
// number that is NOT derived from the celebration clock is the field's own
// opening, because the satin opens at `WIPE_MS` everywhere in this app — a
// celebration is unhurried in what it REVEALS, not in how its ground arrives.
// ---------------------------------------------------------------------------

/** The count starts rolling once the field is fully open. */
const FIGURE_DELAY_MS = WIPE_MS;
/** What the class was worth, a beat behind the roll it belongs to. */
const EARNED_DELAY_MS = WIPE_MS + STAGGER_MS * 2;
/** The week begins printing itself a beat after that. */
const STRIP_DELAY_MS = WIPE_MS + STAGGER_MS * 4;

/**
 * WHEN THE LOOP CLOSES, WHICH IS WHEN THE CARD HAS SAID WHAT IT CAME TO SAY.
 *
 * The figure landing is the last event on the card, and that is on purpose
 * because the figure is rank 1: the insignia has come to rest at `SETTLE_MS`
 * (1000ms, inside this window), the earned line lands at 920ms and the last
 * cell of the week at 1440ms. `HOLD_MS` is a REPLAY concern and has nothing to
 * do with any of it — conflating the two is what left `apps/vinyasaflow/`'s
 * five look-alike cards revealing their action at 0.76s, 4.3s, 8.9s, 2.6s and
 * 3.2s.
 */
const LOOP_CLOSE_MS = FIGURE_DELAY_MS + COUNT_MS;

/**
 * The one delay the stylesheet reads. The count's own delay goes to
 * `CountUpText` as a prop and the strip's to the strip, so this object stays
 * one entry rather than a duplicate of the ladder above.
 */
const STATS_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--st-earned-delay': `${String(EARNED_DELAY_MS)}ms`,
});

export interface StatsShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function StatsShowcase({ loop = true, onCycleComplete }: StatsShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  const { settled, bind } = useTapToSettle();
  const [cycle, setCycle] = useState(0);

  // THE CALLBACK FIRES BEFORE EVERY GUARD (Guardrail 5). A flow renders this
  // card with `loop={false}`, so a `return` ahead of the call leaves the CTA
  // hidden forever; the reduced-motion branch has exactly the same shape,
  // because a member who asked for less motion is handed a card that is
  // ALREADY settled rather than one that never settles.
  useEffect(() => {
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    const close = window.setTimeout(() => {
      onCycleComplete?.();
    }, LOOP_CLOSE_MS);
    return () => {
      window.clearTimeout(close);
    };
  }, [cycle, reduceMotion, onCycleComplete]);

  // THE HOLD IS A REPLAY CONCERN AND IS ARMED ONLY STANDALONE. Inside the flow
  // the card holds where it landed and the member's tap advances it. A tap also
  // ends the replay: once someone has finished the card by hand, restarting it
  // under them is the card arguing with them.
  useEffect(() => {
    if (!loop || reduceMotion || settled) return;
    const replay = window.setTimeout(() => {
      setCycle((current) => current + 1);
    }, LOOP_CLOSE_MS + HOLD_MS);
    return () => {
      window.clearTimeout(replay);
    };
  }, [cycle, loop, reduceMotion, settled]);

  // A per-frame driver has no keyframe for `.finished` to fast-forward, so the
  // count-up is handed over in its own branch: the reel is replaced by the
  // value it was rolling towards. Tabular figures on both sides of the swap
  // mean the digit cell is the same width either way, so nothing shifts.
  const landed = settled || reduceMotion;

  return (
    <div className={cx(styles.card, settled && styles.finished)} {...bind}>
      <Screen background="var(--sc-satin)">
        <div key={cycle} className={styles.sheet} style={showcaseStyle(STATS_VARS)}>
          <div className={styles.statement}>
            {/*
              THE INSIGNIA. Mounted centred on the satin with clear air around
              it — never framed, never bordered, never laid under type. It
              carries no caption because the streak mark has no name; what it
              stands for is the figure directly beneath it.
            */}
            <Insignia
              art={
                <ThemedImage
                  className={INSIGNIA_ART_CLASS}
                  slot={SLOT_STREAK_ICON}
                  fallbackSrc={showcaseAsset('streak_icon.png')}
                  alt=""
                />
              }
              size={MARK_BOX_PX}
              settling
              className={styles.mark}
            />

            {/*
              THE CLAIM — three gaps, three degrees of belonging. The count and
              its unit sit at the small gap because they are ONE object; what
              the class was worth sits a `large` below them because it is a
              second fact about the same thing; and the mark stands a `big`
              above the pair because it is a different thing entirely. A single
              gap repeated three times would group none of them (Guardrail 13).
            */}
            <div className={styles.claim}>
              <div className={styles.figure}>
                <span className={styles.count}>
                  {landed ? (
                    WEEK_COUNT
                  ) : (
                    <CountUpText
                      target={WEEK_COUNT}
                      durationMs={COUNT_MS}
                      delayMs={FIGURE_DELAY_MS}
                    />
                  )}
                </span>
                <span className={styles.unit}>{WEEK_UNIT}</span>
              </div>

              <p className={styles.earned}>{SUBTITLE}</p>
            </div>
          </div>

          <StreakWeekStrip days={WEEK_DAYS} baseDelayMs={STRIP_DELAY_MS} />
        </div>
      </Screen>

      {/*
        THE SATIN ARRIVES FIRST AND EVERYTHING IS REVEALED BY IT. A sheet of the
        cream ground lying over the whole card and retracting downward off it,
        so the field's own leading edge is what puts the mark, the figure and
        the week on screen — one gesture, one element, no per-region delay curve
        to keep in sync. `pointer-events: none`, because it lies over the
        scaffold's tap-to-skip target and a covering may never intercept a tap.
      */}
      <span key={cycle} className={styles.veil} aria-hidden="true" />
    </div>
  );
}
