// BOOKING — the post-reservation celebration, and the second screen with no
// last lane.
//
// Ports CRM/lib/showcase/booking_showcase.dart's ARITHMETIC verbatim; the
// arrangement is this fork's. Not to be confused with `class`: that screen is
// the detail page with the reserve action, this one clones `ClassBookedScreen`
// at `AppRoutes.reservingLoading`, which the reserve action pushes.
//
// THE ARITHMETIC, unchanged (booking_showcase.dart:16-20):
//
//   imageScale    = 720ms                          the object settling
//   bookedCascade = imageScale + reveal(260ms)     when the line has landed
//   ctaFadeIn     = 220ms                          the band's own fade
//   loopHold      = 2200ms                         the finished frame's dwell
//   cycle         = bookedCascade + loopHold       one full loop
//
// The 260ms is `CelebrationTimings.revealMs` — the library's ported timing
// vocabulary, which is where the Dart const gets it from too, so the cascade is
// derived rather than restated.
//
// WHAT THIS FORK CHANGES, and why it is not a dropped element: the headline
// (`class_booked_headline`, a themed copy slot) is in the SKY, and the sky does
// not animate on entry — the motion direction is explicit that the horizon
// stays put while the ground goes past. So the member lands on a screen that
// already says they are in, the marker settles below it, and the action arrives.
// The hero still scales in and the CTA still fades in beneath it, which is what
// the screen's inventory asks for.
//
// Under `prefers-reduced-motion` the interval is never armed and the CSS
// animations are suppressed, so the screen renders its finished state and stays.

import { useEffect, useState } from 'react';
import {
  CelebrationTimings,
  EASE_OUT_QUART,
  SCALE_REVEAL_START_SCALE,
  ThemedImage,
  useThemeText,
} from 'recompose-react';

import { useMockNav } from '../../kit/MockNav';

import styles from './BookingShowcase.module.css';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_CELEBRATION_IMAGE, SLOT_CLASS_BOOKED_HEADLINE } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { ActionBand } from './shell/ActionBand';
import { Screen } from './shell/Screen';
import { Sky } from './shell/Sky';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** `_kImageScaleDuration`. */
const IMAGE_SCALE_MS = 720;
/** `_kBookedCascadeDuration` — the settle plus one standard reveal. */
const BOOKED_CASCADE_MS = IMAGE_SCALE_MS + CelebrationTimings.revealMs;
/** `_kCtaFadeIn`. */
const CTA_FADE_IN_MS = 220;
/** `_kLoopHold` — how long the finished content sits before the loop restarts. */
const LOOP_HOLD_MS = 2200;
/** One full cycle: the cascade, then the hold. */
const CYCLE_MS = BOOKED_CASCADE_MS + LOOP_HOLD_MS;

/**
 * The motion values the stylesheet reads. Derived from the constants above and
 * from the library's ported motion vocabulary, and written as CSS variables so
 * the `.module.css` restates no timing of its own.
 */
const MOTION_VARS = showcaseStyle({
  '--bk-image-scale-ms': `${String(IMAGE_SCALE_MS)}ms`,
  '--bk-cta-fade-ms': `${String(CTA_FADE_IN_MS)}ms`,
  '--bk-cta-delay-ms': `${String(BOOKED_CASCADE_MS)}ms`,
  '--bk-start-scale': String(SCALE_REVEAL_START_SCALE),
  '--bk-ease': EASE_OUT_QUART,
});

export interface BookingShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function BookingShowcase({ loop = true, onCycleComplete }: BookingShowcaseProps) {
  // `ClassBookedScreen` ends by returning the member where they came from. The
  // band is the only way off this screen — it carries no last lane — so it is
  // wired here rather than left as decoration.
  const nav = useMockNav();
  const reduceMotion = usePrefersReducedMotion();
  // Re-keys the body so every CSS entrance replays — Dart's `_cycle`.
  const [cycle, setCycle] = useState(0);
  const headline = useThemeText(SLOT_CLASS_BOOKED_HEADLINE, 'Class Booked');

  useEffect(() => {
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
    <Screen
      staticGround
      sky={<Sky label="Reserved" headline={headline} small />}
      action={
        <span className={styles.actionIn}>
          <ActionBand
            label="Continue"
            onPress={() => {
              // reset(), not back(): booking is the end of the reserve flow, so
              // it returns to the asset's root rather than back through the
              // class detail the member just finished with.
              nav.reset();
            }}
          />
        </span>
      }
    >
      <div key={cycle} className={styles.ground} style={MOTION_VARS}>
        <div className={styles.hero}>
          <ThemedImage
            className={styles.heroImg}
            slot={SLOT_CELEBRATION_IMAGE}
            fallbackSrc={showcaseAsset('class_booked_celebration.png')}
            alt=""
          />
        </div>
      </div>
    </Screen>
  );
}
