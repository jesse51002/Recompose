// CELEBRATION CARD 1 OF 5 — the streak, rebuilt in this fork's world.
//
// ONE HELD SHAPE. ../layout_brief.yaml: "The celebration is where the thread
// closes… the thread draws itself around that card's hero, comes round, and
// CLOSES into a loop — the only place in the app where the line completes
// rather than continuing off the edge. The hero sits inside the loop, its
// figure set large and light beneath, and the card's action waits at the foot,
// inside the thread's final curve, in the space it will occupy from the first
// frame so its arrival never moves anything."
//
// So this card is, top to bottom: the closing loop with the streak icon inside
// it; the week count set very large and light with its spoken label beneath;
// what the class was worth; and the week gathered on one last sideways
// excursion of the line. The action beneath it belongs to ./celebrationAsset.tsx
// and is laid out from the first frame, which is why nothing here reflows when
// it appears.
//
// THE BASE'S "TWO VIEWS, ONE SWITCH" IS GONE. It ran an orbit of eight icons on
// its own timeline, then swapped the whole subtree for a stats statement. This
// card never swaps: every part is mounted from the first frame and arrives by
// being DRAWN, on delays measured off one clock in ./streakOrbit.ts. That is
// the brief's own rule — "each region arrives at the moment the line reaches
// it… If the line has not reached a thing yet, that thing is not there yet" —
// and it is also what makes the card impossible to catch mid-reflow.
//
// NO rAF DRIVER, AND NO `CelebrationFrame`. The orbit needed the first (eight
// particles on one shared radius); the ring's own travel is a single property
// over a single clock, which is what keyframes are for. The frame went with the
// orbit: it composes `support/ShowcaseScaffold`, which `shell/` replaces.
//
// The only rAF left is inside ./celebrations/CountUpText.tsx, which drives
// itself.

import { useEffect, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { CountUpText } from './celebrations/CountUpText';
import { cx } from './cx';
import { Figure } from './shell/Figure';
import { Loop } from './shell/Thread';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_STREAK_ICON } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import type { ShowcaseStreakDay } from './support/StreakWeekStrip';
import { StreakWeekStrip } from './support/StreakWeekStrip';
import styles from './StatsShowcase.module.css';
import {
  BREATH,
  COUNT_ROLL_MS,
  CYCLE_MS,
  HERO_FADE_MS,
  HERO_HEIGHT_PX,
  LOOP_DRAW_MS,
  LOOP_PX,
  SETTLE_MS,
  STATEMENT_FADE_MS,
} from './streakOrbit';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Dummy data — a clone of MobileApp's `buildStreakStats`. Not a customization
// slot, and not a member's real numbers.
/** `_kWeekCount`. */
const WEEK_COUNT = 3;
/** What the count is a count OF. Sentence case, like every label in this app. */
const WEEK_UNIT = 'week streak';
/**
 * `_kSubtitle`, split at the space so the FIGURE can take the display face and
 * the word can take the body face — the brief gives every number the app counts
 * to the display slot, and this is one. The rendered string is unchanged:
 * "+160 points".
 */
const SUBTITLE_FIGURE = '+160';
const SUBTITLE_UNIT = 'points';
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
 * The motion and the two art measurements the stylesheet reads.
 * Theme-independent, so a module constant rather than a hook.
 */
const CARD_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--st-draw-ms': `${String(LOOP_DRAW_MS)}ms`,
  '--st-hero-ms': `${String(HERO_FADE_MS)}ms`,
  '--st-settle-ms': `${String(SETTLE_MS)}ms`,
  '--st-statement-ms': `${String(STATEMENT_FADE_MS)}ms`,
  '--st-hero-h': `${String(HERO_HEIGHT_PX)}px`,
  '--st-breath': BREATH,
});

export interface StatsShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function StatsShowcase({ loop = true, onCycleComplete }: StatsShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  // A tap finishes the draw. ./shell/useTapToSettle.ts says why the card has to
  // hear the tap itself rather than learn about it from the flow.
  const { settled: tapped, bind } = useTapToSettle();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // GUARDRAIL 5, AND THIS FILE IS WHERE IT SHIPPED AS A BUG. The callback
    // fires BEFORE the early return, not after it. Under a reduced-motion
    // preference "the line is simply already drawn, every card is already
    // settled, and every action is already present" — and the flow only reveals
    // this card's action when the callback lands, so returning first left the
    // celebration with no way off it at all.
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }

    // The loop closes → the card is settled → its action appears. One deadline,
    // not a chain of them.
    const settle = window.setTimeout(() => {
      onCycleComplete?.();
    }, SETTLE_MS);

    // Standalone only. In the flow `loop` is false and the card holds where it
    // landed. `cycle` re-keys the card below, which is what replays the CSS.
    const restart = loop
      ? window.setTimeout(() => {
          setCycle((current) => current + 1);
        }, CYCLE_MS)
      : 0;

    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(restart);
    };
  }, [cycle, loop, reduceMotion, onCycleComplete]);

  const done = tapped || reduceMotion;

  return (
    <div
      className={cx(styles.card, done && styles.finished)}
      style={showcaseStyle(CARD_VARS)}
      {...bind}
    >
      {/* Re-keyed per cycle so every CSS entrance below replays with it. */}
      <div key={cycle} className={styles.held}>
        <div className={styles.halo}>
          {/*
            The ring is childless and the hero is its SIBLING, stacked on it by
            the grid. That is deliberate: `.ring` carries the conic mask that
            draws the line round, and a mask applies to an element's children
            too — so a hero passed as `<Loop>`'s child would be swept away and
            drawn back with it.
          */}
          <div className={styles.ring}>
            <Loop size={LOOP_PX} />
          </div>
          <ThemedImage
            className={styles.hero}
            slot={SLOT_STREAK_ICON}
            fallbackSrc={showcaseAsset('streak_icon.png')}
            alt=""
          />
        </div>

        <div className={styles.statement}>
          <div className={styles.headline}>
            <Figure size="xl" className={styles.count}>
              <CountUpText
                target={WEEK_COUNT}
                durationMs={COUNT_ROLL_MS}
                delayMs={SETTLE_MS}
                immediate={done}
              />
            </Figure>
            <p className={styles.unit}>{WEEK_UNIT}</p>
          </div>
          <p className={styles.points}>
            <Figure size="xs">{SUBTITLE_FIGURE}</Figure>
            <span className={styles.pointsUnit}>{SUBTITLE_UNIT}</span>
          </p>
        </div>

        <div className={styles.week}>
          <StreakWeekStrip days={WEEK_DAYS} baseDelayMs={SETTLE_MS} />
        </div>
      </div>
    </div>
  );
}
