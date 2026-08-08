// THE POINTS CARD — the second of the five post-class celebrations, rebuilt in
// this fork's world.
//
// WHAT IT IS. The thread enters at the top of the card, descends the left
// margin, and CLOSES INTO A LOOP around the points hero — the one place in this
// app where the line completes rather than running off an edge
// (../vinyasaflow/layout_brief.yaml, "The celebration is where the thread
// closes"). Before it closes, the point tokens orbit: fourteen of the brand's
// own struck terracotta discs distributed on a sphere, spinning and then
// collapsing inward to the ring's exact centre. What they collapse into is the
// loop. Beneath it the earned count is set very large and very light, and the
// running total sits under that as one quiet line.
//
// WHY THE ORBIT SURVIVED A REDESIGN THAT THREW MOST THINGS OUT. This brand's
// `single_point` art IS a struck terracotta disc — a circle, one of the three
// forms this app is allowed. A swarm of them is already in the vocabulary, so
// the ported sphere is not a leftover; it is the card's hero, and the only work
// the redesign had to do was aim its collapse at the loop.
//
// THE INVARIANT. Same three things the card has always contained: the orbiting
// sphere collapsing into the hero image, the "+N points" count-up, and the
// running-total caption. Nothing added; the thread and the loop are this
// design's chrome, not a fact the screen did not already show. The label is
// SENTENCE CASE — this app never sets one in capitals, and the base's "+N
// POINTS" is the base's.
//
// TWO VIEWS, ONE SWITCH — the shape `_PointsShowcaseState` has always had: the
// sphere runs its own timeline, hands over to the settled statement, which holds
// for `_kPointsHold` before the whole thing restarts with a bumped `_cycle`.
// The cycle re-keys both branches so their entrances replay. The DESCENDING
// THREAD sits outside the switch, because the line is present from the first
// frame of the card and does not restart when the swarm does.
//
// WHY THE SPHERE IS THE ONE rAF DRIVER HERE. Every other entrance is one
// element tweening between fixed endpoints, which is a keyframe. The swarm is
// not: fourteen discs share ONE spin angle and ONE converge factor, and each
// one's position is that angle projected through its own seed — a value that has
// to be recomputed per frame. So the driver writes `transform`, `opacity` and
// `z-index` straight to the elements' refs and never through React state:
// fourteen particles at 60fps must not cost fourteen re-renders. The maths
// itself is in ./pointSphere.ts, where it can be asserted.

import { useEffect, useRef, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { CountUpText } from './celebrations/CountUpText';
import { SHOWCASE_POINTS_STATS } from './celebrations/showcaseCelebrationStats';
import { cx } from './cx';
import { formatThousands } from './formatPoints';
import {
  LOOP_SIZE,
  POINTS_HOLD_MS,
  SPHERE_MS,
  STAR_SEEDS,
  THREAD_RISE,
  sphereFrame,
  sphereLayout,
  starSize,
} from './pointSphere';
import styles from './PointsShowcase.module.css';
import { ARRIVE_MS, BREATH, CLOSE_MS, COUNT_MS, DRAW_MS } from './shell/breath';
import { Figure } from './shell/Figure';
import { Loop } from './shell/Thread';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_POINTS_STARS_IMAGE, SLOT_SINGLE_POINT } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// ---------------------------------------------------------------------------
// The tempo. A breath: four counts in, four counts out, soft at BOTH ends.
// ---------------------------------------------------------------------------
//
// `EASE_OUT_QUART` — what the base's reveals used — is deliberately not read
// here. It is soft at one end and hard at the other, which is the shape of a
// brisk product animation; this design's motion begins gently and finishes
// gently, and that difference is the whole separation between the two
// (../vinyasaflow/layout_brief.yaml, "nothing here decelerates into a hard
// stop"). The curve below is symmetric for exactly that reason, and nothing in
// this file bounces, springs or overshoots.

/** The thread drawing itself down the margin. "A full screen draws in about three quarters of a second." */
const DESCEND_MS = DRAW_MS;

/** The hero fading up inside the ring, while the line is still coming round. */
const HERO_DELAY_MS = ARRIVE_MS;

/** A reveal's own duration. Opacity only — see `ptReveal` in the stylesheet. */
const REVEAL_MS = ARRIVE_MS;

/**
 * The count starts the moment the loop closes — that instant is the card's
 * single unmistakable finish, and the figure is what it hands over to.
 */
const COUNT_DELAY_MS = CLOSE_MS;

/** The running total waits out the roll plus one standard stagger. */
const TOTAL_DELAY_MS = COUNT_DELAY_MS + COUNT_MS + ARRIVE_MS;

/**
 * The geometry and the tempo the stylesheet reads. Theme-independent, so a
 * module constant — every measurement here is derived in ./pointSphere.ts or
 * above, and none is restated as a literal in the `.module.css`.
 */
const POINTS_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--pt-loop': `${String(LOOP_SIZE)}px`,
  '--pt-rise': `${String(THREAD_RISE)}px`,
  '--pt-descend-ms': `${String(DESCEND_MS)}ms`,
  '--pt-close-ms': `${String(CLOSE_MS)}ms`,
  '--pt-hero-delay-ms': `${String(HERO_DELAY_MS)}ms`,
  '--pt-count-delay-ms': `${String(COUNT_DELAY_MS)}ms`,
  '--pt-total-delay-ms': `${String(TOTAL_DELAY_MS)}ms`,
  '--pt-reveal-ms': `${String(REVEAL_MS)}ms`,
  '--pt-breath': BREATH,
});

/** The attribute the driver finds its disc elements by. */
const STAR_ATTR = 'data-star-index';

export interface PointsShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

/**
 * WHEN THIS CARD IS SETTLED, and it is the moment the loop closes.
 *
 * The swarm gathers, hands over to the settled view, and the line comes round
 * the hero and meets itself — "the moment it closes is the moment the card is
 * settled and its action appears". It used to be `SPHERE_MS + POINTS_HOLD_MS`,
 * which reported settling only after the card had also finished SITTING there:
 * 4.3 seconds before the flow's Continue button existed. The hold is a REPLAY
 * concern and belongs nowhere near the settle.
 */
const SETTLE_MS = SPHERE_MS + CLOSE_MS;

export function PointsShowcase({ loop = true, onCycleComplete }: PointsShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  // A tap finishes the draw — ./shell/useTapToSettle.ts.
  const { settled: tapped, bind } = useTapToSettle();
  const [cycle, setCycle] = useState(0);
  const [showPoints, setShowPoints] = useState(false);

  useEffect(() => {
    // GUARDRAIL 5, AND IT SHIPPED AS A BUG IN THIS EXACT FILE. The settle
    // callback fires BEFORE the reduced-motion guard, not after it. Returning
    // first means a card rendered with `loop={false}` — which is every card
    // inside ../vinyasaflow/celebrationAsset.tsx's flow — never settles, so its
    // action never appears and the flow dead-ends on this screen for anyone
    // running with animations turned down. The card already renders finished
    // under that preference; this is the one line that tells the flow so.
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    // The swarm's own timeline, then the hand-over.
    const toPoints = window.setTimeout(() => {
      setShowPoints(true);
    }, SPHERE_MS);
    // THE SETTLE IS ITS OWN DEADLINE, and it is the close of the loop rather
    // than the end of the hold that follows it. See `SETTLE_MS`.
    const settle = window.setTimeout(() => {
      onCycleComplete?.();
    }, SETTLE_MS);
    // `_hold = Timer(_kPointsHold, _restart)`, armed by `_onSphereDone`.
    // Collapsed into one absolute deadline here so the trio re-arms as a unit
    // each cycle. STANDALONE ONLY: in the flow `loop` is false and the card
    // holds where it landed, which is why nothing the flow depends on is
    // reported from here.
    const restart = loop
      ? window.setTimeout(() => {
          setShowPoints(false);
          setCycle((current) => current + 1);
        }, SETTLE_MS + POINTS_HOLD_MS)
      : 0;
    return () => {
      window.clearTimeout(toPoints);
      window.clearTimeout(settle);
      window.clearTimeout(restart);
    };
    // `cycle` is the dependency that re-arms the pair: the restart bumps it, the
    // effect tears down and re-runs, and the branch below remounts on its key.
  }, [cycle, loop, reduceMotion, onCycleComplete]);

  const done = tapped || reduceMotion;

  return (
    // No `CelebrationFrame` and no `ShowcaseScaffold`: this card owns the whole
    // card box, edge to edge, because `--sc-thread-x` is measured from the
    // SCREEN's left edge and a frame that insets the body by the screen padding
    // would put this card's thread 16px right of the thread on every other
    // screen. The line has to land on the same x here as it does on home, or the
    // claim that moving through the app is one continuous stroke is false.
    <div
      className={cx(styles.card, done && styles.finished)}
      style={showcaseStyle(POINTS_VARS)}
      {...bind}
    >
      {/* The descent, outside the switch: the thread is there from frame one and
          does not restart when the swarm does. It ends exactly on the loop's
          nine-o'clock tangent, which is why it reads as meeting the ring rather
          than stopping in mid-air. */}
      <span className={styles.enter} aria-hidden="true" />
      {/* A tap hands straight over to the settled view. The swarm is a per-frame
          driver, so `.settled`'s negative delay — which finishes every CSS
          animation on the card — has nothing to fast-forward there; the branch
          is what completes it. */}
      {showPoints || done ? <Settled key={cycle} immediate={done} /> : <PointSphere key={cycle} />}
    </div>
  );
}

/** The swarm — `_PointSphere`, aimed at the loop's centre. */
function PointSphere() {
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
        // Centre on the stack, move onto the ellipsoid, then scale about the
        // disc's OWN centre. The three collapse into one declaration, in order.
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
    <div ref={rootRef} className={styles.sphere}>
      {STAR_SEEDS.map((_, index) => (
        <div key={index} className={styles.star} data-star-index={index} style={{ opacity: 0 }}>
          <PointToken />
        </div>
      ))}
    </div>
  );
}

/** One struck terracotta disc — the theme's `single_point` over the bundled fallback. */
function PointToken() {
  return (
    <ThemedImage
      className={styles.tokenImg}
      slot={SLOT_SINGLE_POINT}
      fallbackSrc={showcaseAsset('single_point.png')}
      alt=""
    />
  );
}

/**
 * What the swarm collapses into: the loop closing around the hero, the earned
 * count beneath it, and the running total beneath that.
 *
 * The ring is `<Loop>` with NO children, and the hero is its absolutely
 * positioned sibling rather than its child. That is not fussiness — the closing
 * sweep is a mask, and a mask applies to a whole subtree, so a hero inside the
 * ring would be wiped away with it and arrive in a wedge.
 */
function Settled({ immediate = false }: { immediate?: boolean | undefined }) {
  const stats = SHOWCASE_POINTS_STATS;
  return (
    <div className={styles.settled}>
      <div className={styles.rise} aria-hidden="true" />
      <div className={styles.hold}>
        <div className={styles.ringBox}>
          <div className={styles.sweep}>
            <Loop size={LOOP_SIZE} />
          </div>
          <div className={styles.heroBox}>
            <ThemedImage
              className={styles.hero}
              slot={SLOT_POINTS_STARS_IMAGE}
              fallbackSrc={showcaseAsset('stat_points_stars.png')}
              alt=""
            />
          </div>
        </div>
      </div>
      {/* The spoken label OVER a very large figure — this app's one heading
          pattern. Sentence case, in the body face, at reduced strength; the
          number under it is the display face at 72px and weight 300, and it is
          what the eye lands on. */}
      <div className={styles.count}>
        <p className={styles.say}>points</p>
        <Figure size="xl">
          <CountUpText
            target={stats.gained}
            prefix="+"
            durationMs={COUNT_MS}
            delayMs={COUNT_DELAY_MS}
            immediate={immediate}
          />
        </Figure>
      </div>
      <p className={styles.total}>{formatThousands(stats.totalPoints)} total points</p>
      <div className={styles.tail} aria-hidden="true" />
    </div>
  );
}
