// THE POINTS CARD — the third of the five post-class celebrations, rebuilt in
// this fork's world.
//
// WHAT IT IS. A satin field, edge to edge, with nothing on it. Fourteen of the
// brand's own struck coins turn on an ellipsoid that fills it, then are drawn
// inward to a single point — and out of that point the scatter of coins the
// studio strikes for exactly this is MOUNTED: centred, contained, clear air
// around it, no frame and no border, the way a company mounts what it awards
// (../layout_brief.yaml, "THE STRUCK OBJECTS ARE INSIGNIA"). Beneath the mark,
// the figure. Pinned to the foot behind a cream hairline, one quiet line of
// small print carrying the running total, the way a bill states what is owed
// after it has announced what is given.
//
// THE FIGURE LEADS, AND THIS IS THE ONE PLACE IT MAY. Everywhere else in this
// app the display serif NAMES things and a figure is never set larger than the
// name it describes. A celebration card whose whole subject IS the number is
// the stated exception, "because there the number is the name of what
// happened" — so `+160` takes `--sc-type-figure-hero`, the largest rung the
// fork owns, and the word POINTS sits under it as its tracked unit. The mark is
// rank 2 and the running total rank 3, which is the emphasis ranking the
// product fixes for every fork of this screen.
//
// THE INVENTORY IS UNCHANGED: the orbiting sphere of point tokens collapsing
// into the points hero image, a "+N POINTS" count-up, and a running-total
// caption. Nothing added — splitting POINTS out of the count-up's own suffix is
// typography, not a new fact, and the hairline is a rule rather than a label.
//
// TWO VIEWS, ONE SWITCH — the shape `_PointsShowcaseState` has always had: the
// swarm runs its own timeline and hands over to the settled statement, which
// holds for `HOLD_MS` before the whole thing replays with a bumped `_cycle`.
// The cycle re-keys both branches so their entrances replay with it.
//
// WHY THE SWARM IS THE ONE rAF DRIVER HERE. Every other entrance on this card
// is one element tweening between fixed endpoints, which is a keyframe. The
// swarm is not: fourteen coins share ONE spin angle and ONE converge factor,
// and each one's position is that angle projected through its own seed — a
// value that has to be recomputed per frame. So the driver writes `transform`,
// `opacity` and `z-index` straight to the elements' refs and never through
// React state: fourteen particles at 60fps must not cost fourteen re-renders.
// The maths itself is in ./pointSphere.ts, where it can be asserted.

import { useEffect, useRef, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { CountUpText } from './celebrations/CountUpText';
import { SHOWCASE_POINTS_STATS } from './celebrations/showcaseCelebrationStats';
import { cx } from './cx';
import { formatThousands } from './formatPoints';
import { MARK_SIZE, SPHERE_MS, STAR_SEEDS, sphereFrame, sphereLayout, starSize } from './pointSphere';
import styles from './PointsShowcase.module.css';
import { INSIGNIA_ART_CLASS, Insignia } from './shell/Insignia';
import { ARRIVE_MS, COUNT_MS, HOLD_MS, SETTLE_MS } from './shell/phrase';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_POINTS_STARS_IMAGE, SLOT_SINGLE_POINT } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// ---------------------------------------------------------------------------
// The card's own geometry. Everything else is a `--sc-*` token or a `--sp-*`
// duration; these three are measurements this arrangement makes and nothing
// else in the app has an opinion about.
// ---------------------------------------------------------------------------

/**
 * The vertical room the figure block asks for beneath the mark — the 72px serif
 * count-up plus its tracked unit.
 *
 * IT IS AN ALLOWANCE, NOT A CLAMP. Nothing is sized to it and nothing clips if
 * the resolved face lines a little taller; the stylesheet uses it (with the
 * foot below) to work out where the card's optical centre is, so that the mark
 * sits in the middle of the field the eye actually reads rather than in the
 * middle of the box. Being a few px out costs half that in placement.
 */
const FIGURE_ALLOWANCE_PX = 108;

/** The foot: the hairline, its air, one line of sans, and the bottom inset. */
const FOOT_ALLOWANCE_PX = 66;

/** How far a reveal travels as it arrives. It rises and stops; nothing overshoots. */
const RISE_PX = 12;

/** The geometry the stylesheet reads. Theme-independent, so a module constant. */
const POINTS_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--pt-mark': `${String(MARK_SIZE)}px`,
  '--pt-figure': `${String(FIGURE_ALLOWANCE_PX)}px`,
  '--pt-foot': `${String(FOOT_ALLOWANCE_PX)}px`,
  '--pt-rise': `${String(RISE_PX)}px`,
});

/**
 * WHEN THE CARD IS SETTLED — the loop closing, never a hold expiring.
 *
 * The swarm collapses (`SPHERE_MS`), the mark settles into the point it
 * collapsed to (`SETTLE_MS`), the figure rolls, and the running total fades in
 * behind it (`ARRIVE_MS`). The moment the last of those lands is the moment the
 * card has finished saying what it came to say, and it is where the flow's
 * action appears.
 *
 * `HOLD_MS` IS NOT IN THIS SUM AND MUST NEVER BE. The hold is a REPLAY concern
 * that exists only when a card runs standalone; conflating the two is what left
 * `apps/vinyasaflow/`'s five look-alike cards revealing their action at 0.76s,
 * 4.3s, 8.9s, 2.6s and 3.2s. `Math.max` rather than the figure alone because
 * the count and the caption resolve within a frame of each other today, and a
 * later change to either must not be able to report a card settled while
 * something on it is still moving.
 */
const SETTLE_AT_MS = SPHERE_MS + Math.max(COUNT_MS, SETTLE_MS + ARRIVE_MS);

/**
 * How long the count-up takes once the card has been FINISHED by a tap.
 *
 * ONE MILLISECOND, NOT ZERO. `./celebrations/CountUpText.tsx` divides elapsed
 * time by its duration, so zero makes the first frame `0 / 0` — `NaN` — and the
 * reel is translated by `NaN%` and disappears. One lands on the value on the
 * next frame, which is the same thing to the eye and cannot divide by zero.
 */
const SNAP_MS = 1;

/** The attribute the driver finds its coin elements by. */
const STAR_ATTR = 'data-star-index';

export interface PointsShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function PointsShowcase({ loop = true, onCycleComplete }: PointsShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  // A tap anywhere finishes the card outright — ./shell/useTapToSettle.ts.
  const { settled: tapped, bind } = useTapToSettle();
  const [cycle, setCycle] = useState(0);
  const [showPoints, setShowPoints] = useState(false);

  useEffect(() => {
    // GUARDRAIL 5, AND THIS CARD IS THE KNOWN OFFENDER. The settle callback
    // fires BEFORE the reduced-motion guard, not after it. Returning first
    // means a card rendered with `loop={false}` — which is every card inside
    // ./celebrationAsset.tsx's flow — never settles, so its Continue never
    // appears and the flow dead-ends here for anyone running with animations
    // turned down. The card already renders finished under that preference;
    // this is the one line that tells the flow so. The base still has the bug.
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    // `_ctrl.forward().whenComplete(widget.onComplete)` → `_onSphereDone`: the
    // swarm's own timeline, then the hand-over to the settled statement.
    const toPoints = window.setTimeout(() => {
      setShowPoints(true);
    }, SPHERE_MS);
    // The settle is its own deadline. See `SETTLE_AT_MS`.
    const settle = window.setTimeout(() => {
      onCycleComplete?.();
    }, SETTLE_AT_MS);
    // `_hold = Timer(_kPointsHold, _restart)`. STANDALONE ONLY: inside the flow
    // `loop` is false and the card holds where it landed, waiting for the tap.
    // Armed as one absolute deadline so the trio re-arms as a unit each cycle.
    const restart = loop
      ? window.setTimeout(() => {
          setShowPoints(false);
          setCycle((current) => current + 1);
        }, SETTLE_AT_MS + HOLD_MS)
      : 0;
    return () => {
      window.clearTimeout(toPoints);
      window.clearTimeout(settle);
      window.clearTimeout(restart);
    };
    // `cycle` is the dependency that re-arms the trio: the restart bumps it, the
    // effect tears down and re-runs, and the branch below remounts on its key.
  }, [cycle, loop, reduceMotion, onCycleComplete]);

  const done = tapped || reduceMotion;

  return (
    // NO `Screen` AND NO `CelebrationFrame`. Two reasons, and both are
    // correctness rather than taste. The satin field is "the ground of every
    // celebration card" (../layout_brief.yaml) and runs to three of the four
    // edges, so a frame that inset it or painted a second ground underneath
    // would break the one thing this card is; and the tap that finishes it has
    // to be heard by the WHOLE card, so the element carrying `bind` is the
    // element that fills the box. ./celebrationAsset.tsx's scaffold already
    // owns the CTA zone beneath this, laid out from the first frame so nothing
    // reflows.
    <div
      className={cx(styles.card, done && styles.finished)}
      style={showcaseStyle(POINTS_VARS)}
      {...bind}
    >
      {/* The field is a child rather than the root so it can stop short of the
          action band below — the stylesheet says why that is not optional. */}
      <div className={styles.field}>
        {/*
         * A tap hands straight over to the settled view. The swarm is a
         * per-frame driver, so `.finished`'s negative delay — which runs every
         * CSS animation on this card past its end — has nothing to
         * fast-forward there; this branch is what completes it.
         */}
        {showPoints || done ? <Settled key={cycle} immediate={done} /> : <PointSwarm key={cycle} />}
      </div>
    </div>
  );
}

/** The swarm — `_PointSphere`, aimed at the mark's centre. */
function PointSwarm() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    const stars = [...root.querySelectorAll<HTMLElement>(`[${STAR_ATTR}]`)];

    // `LayoutBuilder(constraints)`. `clientWidth/Height` and not
    // `getBoundingClientRect`, because the stage scales the whole device with a
    // CSS transform and only the former reports the LAYOUT pixels the Dart
    // constraints are quoted in.
    const layout = sphereLayout(root.clientWidth, root.clientHeight);
    stars.forEach((element, index) => {
      const size = `${String(starSize(index, layout.renderScale))}px`;
      element.style.width = size;
      element.style.height = size;
    });

    let raf = 0;
    let startMs = 0;
    const frame = (now: number): void => {
      if (startMs === 0) startMs = now;
      const elapsed = Math.min(now - startMs, SPHERE_MS);
      for (const star of sphereFrame(elapsed, layout)) {
        const element = stars[star.index];
        if (element === undefined) continue;
        // Dart nests `Transform.translate > Opacity > Transform.scale`: centre
        // on the stack, move onto the ellipsoid, then scale about the coin's
        // OWN centre. The three collapse into one declaration in that order.
        element.style.transform = `translate(-50%, -50%) translate(${String(star.dx)}px, ${String(star.dy)}px) scale(${String(star.scale)})`;
        element.style.opacity = String(star.opacity);
        // The depth sort. Dart reorders the `Stack`'s children; the DOM keeps
        // its order and stacks by `z-index` instead, which is the same paint
        // order without re-parenting fourteen nodes every frame.
        element.style.zIndex = String(star.order);
      }
      if (elapsed < SPHERE_MS) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // Everything starts at opacity 0, which is what the driver's own frame 0
    // resolves to — so the first painted frame is already correct with no
    // transform written yet.
    <div ref={rootRef} className={styles.swarm}>
      {STAR_SEEDS.map((_, index) => (
        <div key={index} className={styles.coin} data-star-index={index} style={{ opacity: 0 }}>
          <PointToken />
        </div>
      ))}
    </div>
  );
}

/** One struck coin — the theme's `single_point` over the bundled fallback. */
function PointToken() {
  return (
    <ThemedImage
      className={styles.coinImg}
      slot={SLOT_SINGLE_POINT}
      fallbackSrc={showcaseAsset('single_point.png')}
      alt=""
    />
  );
}

/**
 * What the swarm collapses into: the mark mounted on the point the coins
 * vanished at, the earned figure directly beneath it, and the running total
 * pinned to the foot behind a hairline.
 *
 * `immediate` is the tap. `.finished` fast-forwards every CSS animation on the
 * card, but the count-up is a per-frame driver like the swarm and has no
 * keyframe to run past its end, so it is handed its own short duration instead.
 */
function Settled({ immediate = false }: { immediate?: boolean | undefined }) {
  const stats = SHOWCASE_POINTS_STATS;
  return (
    <div className={styles.settled}>
      {/*
       * THE WRAPPER IS LOAD-BEARING, not a spare div. `<Insignia settling>`
       * animates its own `transform` as it comes to rest, and the centring here
       * is also a transform — put the two on one element and the arrival wipes
       * out `translate(-50%, -50%)` and the mark lands in the corner.
       */}
      <div className={styles.mark}>
        <Insignia
          onSatin
          settling
          size={MARK_SIZE}
          art={
            <ThemedImage
              className={INSIGNIA_ART_CLASS}
              slot={SLOT_POINTS_STARS_IMAGE}
              fallbackSrc={showcaseAsset('stat_points_stars.png')}
              alt=""
            />
          }
        />
      </div>

      {/* The figure and its unit are ONE object, so the gap between them is the
          small one and the gap to anything else is not. */}
      <div className={styles.figure}>
        <span className={styles.gained}>
          <CountUpText
            target={stats.gained}
            prefix="+"
            durationMs={immediate ? SNAP_MS : COUNT_MS}
          />
        </span>
        <span className={styles.unit}>Points</span>
      </div>

      {/* The small print. A cream hairline parts it from the field — brass is
          1.33:1 on satin and would simply not be there. */}
      <div className={styles.foot}>
        <div className={styles.hair} />
        <p className={styles.total}>{formatThousands(stats.totalPoints)} total points</p>
      </div>
    </div>
  );
}
