// WHERE THE THREAD CLOSES.
//
// The post-reservation celebration (`ClassBookedScreen`, reached from the class
// detail's reserve action). It is the ONE screen in this design where the line
// stops continuing off the edge and completes: the descent runs down the left
// margin, meets a ring drawn in its own stroke, travels all the way round the
// rolled mat, and comes back to where it started. Arriving is a loop closing.
//
// THE GEOMETRY IS DERIVED, NOT TYPED. The ring's left stroke sits exactly ON
// the descent — `LOOP_LEFT` is the descent's centre pulled back half the ring's
// own weight — and its diameter is then whatever makes its CENTRE land on the
// screen's centre. So the loop is both hung off the thread and centred in the
// frame, and neither fact is a number anyone chose. Change `--sc-thread-x` and
// both follow.
//
// THREE FORMS, AND ALL THREE ARE HERE: the line (the descent), the circle (the
// closing loop), and the photograph — except the hero is not a photograph, it
// is one of the objects this brand minted, transparent-edged and near square
// (808x850). It therefore takes a HEIGHT and derives its width, like every
// picture in this app: no width+height pair, no aspect-ratio, no cover. It is
// deliberately NOT wrapped in a `MintedDisc` — a circle inside a circle is one
// form doing a job the ring already does, and the disc's clip would shave the
// mat's top tip, which sits fractionally outside its own inscribed circle.
//
// THE ARITHMETIC IS THE DART'S (booking_showcase.dart:16-20), kept so the
// screen still lasts as long as the real one:
//
//   imageScale    = 720ms                          the hero arriving
//   bookedCascade = imageScale + reveal(260ms)     when the card is settled
//   ctaFadeIn     = 220ms                          the action's own fade
//   loopHold      = 2200ms                         the finished frame's dwell
//   cycle         = bookedCascade + loopHold       one full loop
//
// The 260ms is `CelebrationTimings.revealMs` — the library's ported timing
// vocabulary, which is where the Dart const gets it from too.
//
// WHAT THE MOTION DOES DIFFERENTLY, and it is the brief's own instruction: the
// closing of the loop IS the animation. The ring draws itself at an EVEN rate
// (linear, because "a ring or an arc fills by drawing, at an even rate, and
// stops exactly on its mark") and finishes at `BOOKED_CASCADE_MS`, which is the
// same instant the headline and the action arrive. One unmistakable finish
// rather than three parts each on its own schedule. Everything else eases soft
// at BOTH ends — a breath begins gently and finishes gently — which is why the
// ported `EASE_OUT_QUART` is gone: it accelerates away from its start.
//
// THE CTA IS THE ONLY WAY OFF THIS SCREEN. It carries no bottom nav, exactly as
// the member app's does not, so it has been a dead end twice: once with no
// handler at all, and once with a `pointer-events: none` that had outlived its
// reason. There is now no `pointer-events` anywhere in its ancestry and there
// must never be — the brief says it too ("every tap target is live from the
// first frame regardless of what the line is doing").

import { useEffect, useState } from 'react';
import {
  CelebrationTimings,
  SCALE_REVEAL_START_SCALE,
  ThemedImage,
  useThemeText,
} from 'recompose-react';

import { useMockNav } from '../../kit/MockNav';

import styles from './BookingShowcase.module.css';
import { Action } from './shell/Action';
import { Title } from './shell/Figure';
import { Screen } from './shell/Screen';
import { Loop } from './shell/Thread';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_CELEBRATION_IMAGE, SLOT_CLASS_BOOKED_HEADLINE } from './showcaseSlots';
import { SC, showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** `_kImageScaleDuration` — the hero arriving inside the ring. */
const IMAGE_SCALE_MS = 720;
/** `_kBookedCascadeDuration` — the pop plus one standard reveal. The loop closes here. */
const BOOKED_CASCADE_MS = IMAGE_SCALE_MS + CelebrationTimings.revealMs;
/** `_kCtaFadeIn`. */
const CTA_FADE_IN_MS = 220;
/** `_kLoopHold` — how long the finished content sits before the loop restarts. */
const LOOP_HOLD_MS = 2200;
/** One full cycle: the cascade, then the hold. */
const CYCLE_MS = BOOKED_CASCADE_MS + LOOP_HOLD_MS;

/** The authored device width. Every arrangement here is scaled, never reflowed. */
const SCREEN_WIDTH = 390;

/**
 * Where the ring's outer edge starts, so its LEFT STROKE LANDS ON THE DESCENT.
 *
 * The rail is positioned by its left edge, so the line's centre is
 * `threadX + threadWidth / 2`; pulling back half the ring's own (heavier)
 * weight puts the two strokes on top of each other. The descent and the ring's
 * left side are then literally the same mark, which is what makes the loop read
 * as the line closing rather than as a circle dropped on it.
 */
const LOOP_LEFT = SC.threadX + SC.threadWidth / 2 - SC.threadWidthOver / 2;

/**
 * Tangent on the left, centre on the screen's centre — so the diameter is
 * whatever satisfies both. Not a number anyone picked.
 */
const LOOP_SIZE = 2 * (SCREEN_WIDTH / 2 - LOOP_LEFT);

/**
 * The mat's own height inside the ring, ~78% of the diameter.
 *
 * Sized against the ART's silhouette rather than its box: the mat's top tip is
 * the point furthest from centre, at ~0.50 x its own height, which leaves ~34px
 * of clearance to the ring's inner edge here. Width is derived (see the
 * stylesheet) so nothing is ever cropped.
 */
const HERO_HEIGHT = 264;

/**
 * The measurements and motion values the stylesheet reads. Derived from the
 * constants above and from the library's ported timing vocabulary, written as
 * CSS variables so the `.module.css` restates no number of its own.
 *
 * A module constant: none of it depends on the theme or on a render.
 */
const MOTION_VARS = showcaseStyle({
  '--bk-loop-left': `${String(LOOP_LEFT)}px`,
  '--bk-loop-size': `${String(LOOP_SIZE)}px`,
  '--bk-hero-height': `${String(HERO_HEIGHT)}px`,
  '--bk-loop-draw-ms': `${String(BOOKED_CASCADE_MS)}ms`,
  '--bk-image-scale-ms': `${String(IMAGE_SCALE_MS)}ms`,
  '--bk-reveal-ms': `${String(CelebrationTimings.revealMs)}ms`,
  '--bk-settle-delay-ms': `${String(BOOKED_CASCADE_MS)}ms`,
  '--bk-cta-fade-ms': `${String(CTA_FADE_IN_MS)}ms`,
  '--bk-reveal-offset': '12px',
  '--bk-start-scale': String(SCALE_REVEAL_START_SCALE),
  /*
   * THE BREATH. Soft at both ends — four counts in, four counts out. Nothing in
   * this app decelerates into a hard stop or accelerates away from one, and
   * nothing bounces, springs back or overshoots.
   */
  '--bk-breath': 'cubic-bezier(0.45, 0, 0.55, 1)',
});

export interface BookingShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function BookingShowcase({ loop = true, onCycleComplete }: BookingShowcaseProps) {
  // `ClassBookedScreen` ends by returning the member where they came from. The
  // CTA is the only way off this screen, so it is wired here rather than left
  // as decoration.
  const nav = useMockNav();
  const reduceMotion = usePrefersReducedMotion();
  const headline = useThemeText(SLOT_CLASS_BOOKED_HEADLINE, 'Class Booked');
  // Re-keys the body so every CSS entrance replays — Dart's `_cycle`.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // NOT Guardrail 5's shape, and the difference is worth stating: firing
    // `onCycleComplete` before this guard would be actively wrong here, because
    // ./appAsset.tsx's `BookingRoute` navigates home through it. In the flow the
    // screen renders with `loop={false}`, so an early fire would bounce the
    // member off the celebration before they ever saw it. Nothing on this screen
    // is gated on the callback — the action is live from the first frame — so
    // there is no hidden CTA for the guard to strand.
    if (!loop || reduceMotion) return;
    const id = window.setInterval(() => {
      onCycleComplete?.();
      setCycle((current) => current + 1);
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [loop, reduceMotion, onCycleComplete]);

  return (
    // No head and no foot. The member app gives this screen neither, so the
    // thread simply passes through it — what is reachable never changes.
    <Screen>
      <div key={cycle} className={styles.screen} style={MOTION_VARS}>
        <div className={styles.stage}>
          <div className={styles.loopWrap}>
            {/*
              The ring, and the sweep that closes it. The `<Loop>` is wrapped
              rather than styled directly because the mask that draws it must
              NOT touch the hero standing inside it.
            */}
            <div className={styles.ring} aria-hidden="true">
              <Loop size={LOOP_SIZE} />
            </div>
            <ThemedImage
              className={styles.hero}
              slot={SLOT_CELEBRATION_IMAGE}
              fallbackSrc={showcaseAsset('class_booked_celebration.png')}
              alt=""
            />
          </div>
          {/*
            Wrapped rather than given a `className`: `Title`'s own rule sets
            `margin: 0`, and a shorthand beats the longhand this needs whenever
            the bundler happens to emit the shell's stylesheet last.
          */}
          <div className={styles.headline}>
            <Title>{headline}</Title>
          </div>
        </div>
        {/*
          The action waits at the foot, in the space it occupies from the first
          frame, so its arrival never moves anything. It is also the screen's ONE
          terracotta fill.
        */}
        <div className={styles.actionZone}>
          <Action
            text="Continue"
            onPressed={() => {
              // reset(), not back(): booking is the end of the reserve flow, so
              // it returns to the asset's ROOT rather than back through the
              // class detail the member just finished with.
              nav.reset();
            }}
          />
        </div>
      </div>
    </Screen>
  );
}
