// Ports ../../../../../CRM/lib/showcase/booking_showcase.dart — a visual clone
// of the member app's CLASS-BOOKED CELEBRATION (`ClassBookedScreen`): a slow
// image scale-pop, the "Class Booked" caption sliding up under it, and the CTA
// fading in. It loops.
//
// THE ARITHMETIC, not the derived numbers (booking_showcase.dart:16-20):
//
//   imageScale    = 720ms                          the pop
//   bookedCascade = imageScale + reveal(260ms)     when the caption has landed
//   ctaFadeIn     = 220ms                          the CTA's own fade
//   loopHold      = 2200ms                         the finished frame's dwell
//   cycle         = bookedCascade + loopHold       one full loop
//
// The 260ms is `CelebrationTimings.revealMs` — the library's ported timing
// vocabulary, which is where the Dart const gets it from too, so the cascade is
// derived rather than restated.
//
// HOW IT ANIMATES. Dart drives three `AnimationController`s and two `Timer`s.
// Here the three entrances are CSS — a keyframe each, with `animation-delay`
// placing the beat — because they are one-shot property tweens that never need
// a per-frame value in JS. The only JS left is the loop: one interval bumping a
// counter that re-keys the body, which is exactly what `_cycle` does in Dart
// (`KeyedSubtree` there, `key` here) and what makes the CSS animations replay.
//
// Under `prefers-reduced-motion` the interval is never armed and the CSS
// animations are suppressed (../showcase/BookingShowcase.module.css), so the
// screen renders its finished state and stays there.

import { useEffect, useState } from 'react';
import {
  CelebrationTimings,
  EASE_OUT_QUART,
  ThemedImage,
  useThemeText,
} from 'recompose-react';

import styles from './BookingShowcase.module.css';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_CELEBRATION_IMAGE, SLOT_CLASS_BOOKED_HEADLINE } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { ShowcasePrimaryButton } from './support/ShowcasePrimaryButton';
import { useMockNav } from '../../kit/MockNav';
import { ShowcaseScaffold } from './support/ShowcaseScaffold';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// ---------------------------------------------------------------------------
// ZEN BJJ'S TIMING — the same three beats, slowed and softened.
//
// "Calm on the surface, deep power underneath. Never frantic." The base pops
// the image in 720ms from 0.86 scale and snaps the CTA in over 220ms, which is
// a confirmation that congratulates you. This fork takes half again as long on
// the image, starts it much closer to its final size, and lets the CTA arrive
// slowly enough that it reads as settling rather than appearing. Nothing about
// the ORDER changes — image, then headline, then action — because that order is
// what the screen means.
// ---------------------------------------------------------------------------

/** The image's arrival. `_kImageScaleDuration` is 720 in the base. */
const IMAGE_SCALE_MS = 1100;
/**
 * How far under its final size the image starts.
 *
 * The library's `SCALE_REVEAL_START_SCALE` (the base's value) is a visible pop.
 * A near-unity start is the same move made quietly: the image grows into place
 * rather than springing into it.
 */
const IMAGE_START_SCALE = 0.94;
/** The pop plus one standard reveal — the beat the headline lands on. */
const BOOKED_CASCADE_MS = IMAGE_SCALE_MS + CelebrationTimings.revealMs;
/** The CTA's own fade. 220 in the base. */
const CTA_FADE_IN_MS = 460;
/** How long the finished content sits before the loop restarts. 2200 in the base. */
const LOOP_HOLD_MS = 2800;
/** One full cycle: the cascade, then the hold. */
const CYCLE_MS = BOOKED_CASCADE_MS + LOOP_HOLD_MS;

/**
 * The cap on the celebration image.
 *
 * The base mirrors the member app's own `_kCelebrationMaxHeight` (420). Zen BJJ
 * gives back 60px of it: the screen is one image, one line and one button, and
 * the space AROUND those three is what makes them read as composed rather than
 * as a full page.
 */
const CELEBRATION_MAX_HEIGHT = 360;

/**
 * The motion values the stylesheet reads. Derived from the constants above and
 * from the library's ported motion vocabulary, and written as CSS variables so
 * the `.module.css` restates no timing of its own. A module constant: none of
 * it depends on the theme or on a render.
 */
const MOTION_VARS = showcaseStyle({
  '--bk-image-scale-ms': `${String(IMAGE_SCALE_MS)}ms`,
  '--bk-reveal-ms': `${String(CelebrationTimings.revealMs)}ms`,
  '--bk-reveal-delay-ms': `${String(IMAGE_SCALE_MS)}ms`,
  // 6px, not the base's 12: a shorter travel over the same duration is a slower
  // move, which is the whole of what "controlled" means in a transition.
  '--bk-reveal-offset': '6px',
  '--bk-cta-fade-ms': `${String(CTA_FADE_IN_MS)}ms`,
  '--bk-cta-delay-ms': `${String(BOOKED_CASCADE_MS)}ms`,
  '--bk-start-scale': String(IMAGE_START_SCALE),
  '--bk-ease': EASE_OUT_QUART,
});

export interface BookingShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function BookingShowcase({ loop = true, onCycleComplete }: BookingShowcaseProps) {
  // `ClassBookedScreen` ends by returning the member where they came from. The
  // CTA is the only way off this screen — it carries no bottom nav — so it is
  // wired here rather than left as decoration.
  const nav = useMockNav();
  const reduceMotion = usePrefersReducedMotion();
  // Re-keys the body so every CSS entrance replays — Dart's `_cycle`.
  const [cycle, setCycle] = useState(0);

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
    // ZEN BJJ takes the WIDE inset (`paddingBig`) rather than the standard one.
    // This screen is a single held moment and the margin is most of what makes
    // it feel held; the base's 16 makes the CTA read as a form's submit button.
    <ShowcaseScaffold horizontalPadding="big">
      <div key={cycle} className={styles.screen} style={MOTION_VARS}>
        <BookedContent />
        <div className={styles.ctaRow}>
          <ShowcasePrimaryButton
            text="Continue"
            fullWidth
            borderRadius="var(--sc-radius-big)"
            onPressed={() => {
              // reset(), not back(): booking is the end of the reserve flow, so
              // it returns to the asset's root rather than back through the
              // class detail the member just finished with.
              nav.reset();
            }}
          />
        </div>
      </div>
    </ShowcaseScaffold>
  );
}

/** `_BookedContent` — `Column(center, spacing: spacingBig)`. */
function BookedContent() {
  const headline = useThemeText(SLOT_CLASS_BOOKED_HEADLINE, 'Class Booked');
  return (
    <div className={styles.content}>
      {/*
        `ScaleReveal(duration: 720)` — ease-out-quart, opacity 0 -> 1 and scale
        `SCALE_REVEAL_START_SCALE` -> 1. The library exports both the curve and
        the start scale; the CSS module reads them as its keyframe values.
      */}
      <div
        className={styles.celebration}
        style={{ maxHeight: `${String(CELEBRATION_MAX_HEIGHT)}px` }}
      >
        <ThemedImage
          className={styles.celebrationImg}
          slot={SLOT_CELEBRATION_IMAGE}
          fallbackSrc={showcaseAsset('class_booked_celebration.png')}
          alt=""
        />
      </div>
      {/* `StaggeredReveal(delay: 720)` — fade + a 12px slide up, ease-out-quart. */}
      <p className={styles.headline}>{headline}</p>
    </div>
  );
}
