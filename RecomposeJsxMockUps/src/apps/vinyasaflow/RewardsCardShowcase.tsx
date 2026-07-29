// CELEBRATION CARD 3 OF 5 — the rewards a member can get.
//
// THE THREAD'S LAST ACT, ON ONE CARD. The line enters at the top edge, descends
// the left margin past the two things this card says, bows out sideways to
// gather the shelf of rewards, drops back down out from behind the featured
// frame, and CLOSES into the loop that holds its cost. That loop is the only
// place in this app where the line completes instead of continuing off an edge,
// and the card's action waits at the foot inside its final curve — in the space
// it occupies from the first frame, so its arrival never moves anything.
//
// It is one stroke. The four pieces below are separate elements only because
// CSS cannot stroke one shape through four boxes; ../rewardsCelebration.ts
// publishes their windows overlapping so they read as one line travelling
// rather than four lines arriving.
//
// WHY THE GEOMETRY IS ANCHORED TO THE BOTTOM. Everything under the bow is a
// fixed number — half the shelf, the gap, the loop, the foot inset — while the
// head and the caption above it are however tall their type makes them. So the
// column is laid out from the bottom up and the thread is positioned from the
// bottom edge, which is what lets the INTRO (which renders only the loop) and
// the settled card put that loop in exactly the same place. The line does not
// move between the two; only what hangs on it changes.
//
// TWO VIEWS, ONE SWITCH, the same shape as ./StatsShowcase.tsx and
// ./PointsShowcase.tsx: the intro runs its own timeline, hands over to the
// shelf, which holds for `CAROUSEL_HOLD_MS` before the whole thing restarts
// with a bumped `_cycle`. One idle beat fits inside that hold, so exactly one
// page advance happens per loop.
//
// NOT to be confused with ./RewardsShowcase.tsx, which is the static points
// STORE. The two Dart files are named that way and the ports keep their names,
// because a reviewer runs the two side by side.
//
// WHAT REPLACES `didUpdateWidget`. Dart rebuilds its stats and paging in place
// when the injected rewards change. Resetting state from an effect is a lint
// error in this package (../../CLAUDE.md), so the celebration is `key`-remounted
// on a signature of the resolved items instead.
//
// WHAT DRIVES WHAT. The bloom is the one rAF driver: the box and fourteen coins
// share ONE clock and are recomputed per frame (../rewardsCelebration.ts holds
// that arithmetic). The shelf owns its own tween
// (./celebrations/RewardsCarousel.tsx). The thread's four draws, the content's
// arrivals and the caption's switch are CSS keyframes.

import { useEffect, useRef, useState } from 'react';

import { RewardsCarousel } from './celebrations/RewardsCarousel';
import { FEATURED_HEIGHT, SLIDE_MS, wrapIndex } from './celebrations/rewardsCoverFlow';
import type { ShowcaseRewardsStats } from './celebrations/showcaseCelebrationStats';
import { cx } from './cx';
import { formatThousands } from './formatPoints';
import {
  BLOOM_SEEDS,
  BOW_WINDOW,
  BOX_SIZE,
  BREATH_EASE,
  CAROUSEL_HOLD_MS,
  DESCENT_WINDOW,
  DROP_WINDOW,
  IDLE_MS,
  INTRO_TOTAL_MS,
  LOOP_SIZE,
  RING_WINDOW,
  bloomCoinFrame,
  bloomMaxRadius,
  bloomProgress,
  boxFrame,
  buildRewardsStats,
  initialPage,
  rewardsSignature,
} from './rewardsCelebration';
import styles from './RewardsCardShowcase.module.css';
import { ARRIVE_MS } from './shell/breath';
import { Figure, Title } from './shell/Figure';
import { MintedDisc } from './shell/Photo';
import { Node } from './shell/Thread';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import type { ShowcaseReward } from './showcaseContent';
import { SLOT_GIFTBOX, SLOT_SINGLE_POINT } from './showcaseSlots';
import { SC, showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * The stagger between one arrival and the next, once the line is down.
 *
 * Half a reveal, so the four overlap rather than queue: they are things the one
 * stroke has already passed, not four entrances. The library's
 * `CelebrationTimings.revealStaggerMs` is the base app's beat and is not this
 * app's clock — see ./shell/breath.ts.
 */
const ARRIVAL_STAGGER_MS = Math.round(ARRIVE_MS / 2);

const ms = (value: number): string => `${String(value)}ms`;
const px = (value: number): string => `${String(value)}px`;

/**
 * The geometry and the motion the stylesheet reads. Theme-independent, so a
 * module constant: every value is a token or a constant from
 * ../rewardsCelebration.ts, and none of them is restated as a literal in CSS.
 */
const REWARDS_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--rw-loop': px(LOOP_SIZE),
  '--rw-shelf-h': px(FEATURED_HEIGHT),
  '--rw-breath': BREATH_EASE,
  '--rw-descent-delay': ms(DESCENT_WINDOW.delayMs),
  '--rw-descent-ms': ms(DESCENT_WINDOW.durationMs),
  '--rw-bow-delay': ms(BOW_WINDOW.delayMs),
  '--rw-bow-ms': ms(BOW_WINDOW.durationMs),
  '--rw-drop-delay': ms(DROP_WINDOW.delayMs),
  '--rw-drop-ms': ms(DROP_WINDOW.durationMs),
  '--rw-ring-delay': ms(RING_WINDOW.delayMs),
  '--rw-ring-ms': ms(RING_WINDOW.durationMs),
  '--rw-arrive-ms': ms(ARRIVE_MS),
  '--rw-arrive-1': ms(0),
  '--rw-arrive-2': ms(ARRIVAL_STAGGER_MS),
  '--rw-arrive-3': ms(ARRIVAL_STAGGER_MS * 2),
  '--rw-arrive-4': ms(ARRIVAL_STAGGER_MS * 3),
  '--rw-switch-ms': ms(SLIDE_MS),
});

/** The attributes the bloom's driver finds its elements by. */
const BOX_ATTR = 'data-giftbox';
const COIN_ATTR = 'data-bloom-index';

export interface RewardsCardShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
  /**
   * The previewed gym's rewards. Non-empty shows them (with their own photos)
   * instead of the bundled sample set.
   */
  rewards?: readonly ShowcaseReward[] | null;
}

export function RewardsCardShowcase({
  loop = true,
  onCycleComplete,
  rewards,
}: RewardsCardShowcaseProps) {
  const stats = buildRewardsStats(rewards);
  return (
    <RewardsCelebration
      key={rewardsSignature(stats)}
      stats={stats}
      loop={loop}
      onCycleComplete={onCycleComplete}
    />
  );
}

interface RewardsCelebrationProps {
  stats: ShowcaseRewardsStats;
  loop: boolean;
  onCycleComplete?: (() => void) | undefined;
}

/** The cycle, the paging and the two views. */
function RewardsCelebration({ stats, loop, onCycleComplete }: RewardsCelebrationProps) {
  const reduceMotion = usePrefersReducedMotion();
  // A tap finishes the draw — ../shell/useTapToSettle.ts.
  const { settled: tapped, bind } = useTapToSettle();
  const firstPage = initialPage(stats.items.length, stats.featuredIndex);
  const [cycle, setCycle] = useState(0);
  const [gathered, setGathered] = useState(false);
  /** `_page` — UNBOUNDED, exactly as in Dart. The item is `page % length`. */
  const [page, setPage] = useState(firstPage);

  useEffect(() => {
    // GUARDRAIL 5 — FIRE THE CALLBACK BEFORE THE GUARD. Under a reduced-motion
    // preference the base returned here without ever settling, so in the flow
    // (which renders with `loop={false}` and treats this callback as `markDone`)
    // the card's action never appeared and the card became a dead end. The same
    // fix is already in ../milemarker for its streak and points cards.
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    const toShelf = window.setTimeout(() => {
      setGathered(true);
    }, INTRO_TOTAL_MS);
    // THE SETTLE IS ITS OWN DEADLINE, and it is the intro finishing rather than
    // the carousel finishing its run. It used to be the latter, which put the
    // flow's action 8.9 SECONDS out on this card against 0.76 on the streak.
    // "The moment it closes is the moment the card is settled and its action
    // appears" (./layout_brief.yaml); the carousel's hold is a replay concern.
    const settle = window.setTimeout(() => {
      onCycleComplete?.();
    }, INTRO_TOTAL_MS);
    // The hold, armed by the handover. STANDALONE ONLY: in the flow the card
    // holds where it landed and the member's tap advances it.
    const restart = loop
      ? window.setTimeout(() => {
          setGathered(false);
          // Back to the featured item for the next cycle.
          setPage(firstPage);
          setCycle((current) => current + 1);
        }, INTRO_TOTAL_MS + CAROUSEL_HOLD_MS)
      : 0;
    return () => {
      window.clearTimeout(toShelf);
      window.clearTimeout(settle);
      window.clearTimeout(restart);
    };
  }, [cycle, loop, reduceMotion, onCycleComplete, firstPage]);

  // Dart arms the first advance the moment the intro ends, but re-arms
  // subsequent ones only after `animateToPage`'s future has RESOLVED — so every
  // advance after the first is a slide plus an idle.
  const advanceDelayMs = page === firstPage ? IDLE_MS : SLIDE_MS + IDLE_MS;

  useEffect(() => {
    if (!gathered || reduceMotion) return;
    const advance = window.setTimeout(() => {
      setPage((current) => current + 1);
    }, advanceDelayMs);
    return () => {
      window.clearTimeout(advance);
    };
  }, [gathered, page, advanceDelayMs, reduceMotion]);

  const finished = tapped || reduceMotion;
  // A tap hands the bloom straight over to the shelf: the bloom is a per-frame
  // driver, so `.finished`'s negative delay — which finishes every CSS
  // animation on the card, the thread's four windows included — has nothing to
  // fast-forward there.
  const settled = gathered || finished;

  return (
    // The card owns its own scaffold rather than the base's celebration frame:
    // a fork owns its `shell/`, and this one's chrome is the thread. Nothing on
    // this subtree may set `overflow` — the bloom paints outside the card on
    // purpose, and one scrolling axis computes the other to `auto`.
    <div
      className={cx(styles.card, finished && styles.finished)}
      style={showcaseStyle(REWARDS_VARS)}
      {...bind}
    >
      {/* The line, drawn once per cycle and then left alone. It does not
          remount when the shelf replaces the box, so the stroke the member
          watched arrive is the same stroke the settled card hangs on.

          Both keys are PREFIXED because they are siblings counting the same
          cycle: bare `cycle` gave two children the key `0` on the first pass,
          which React warns about and which would have let it reuse one fiber
          for the other on a remount. */}
      <CardThread key={`thread-${String(cycle)}`} drawing={!reduceMotion} />

      {settled ? (
        <Gathered stats={stats} page={page} firstPage={firstPage} />
      ) : (
        <Bloom key={`bloom-${String(cycle)}`} />
      )}
    </div>
  );
}

/**
 * THE STROKE. Four pieces, one line: down the left margin, out sideways across
 * the shelf, back down from behind the featured frame, and round into the loop.
 *
 * Every piece is placed from the card's BOTTOM edge, because everything below
 * the bow is a fixed measurement — which is what keeps the loop in one place
 * across both views (see the file header).
 */
function CardThread({ drawing }: { drawing: boolean }) {
  return (
    <div className={styles.thread} aria-hidden="true">
      <span className={cx(styles.descent, drawing && styles.descentDraw)} />
      <span className={cx(styles.bow, drawing && styles.bowDraw)} />
      <span className={cx(styles.drop, drawing && styles.dropDraw)} />
    </div>
  );
}

/**
 * The closing loop, as a drawn stroke.
 *
 * AN SVG RATHER THAN THE SHELL'S `<Loop>`, and the reason is the motion brief
 * rather than a preference: "the closing of the loop IS the animation", and a
 * CSS border cannot be stroked on. `pathLength="1"` normalises the circumference
 * so the dash pattern is a plain 1 → 0 and no circumference arithmetic is
 * needed; the `-90deg` rotation in the stylesheet starts the stroke at twelve
 * o'clock, which is exactly where the drop arrives.
 *
 * The radius is inset by half the stroke so the ring's OUTER edge lands on
 * `LOOP_SIZE`, which is what `shell/Thread.tsx`'s own `box-sizing: border-box`
 * ring does — the two are the same circle drawn two ways.
 */
const RING_RADIUS = (LOOP_SIZE - SC.threadWidthOver) / 2;

function ClosingLoop({ drawing }: { drawing: boolean }) {
  return (
    <svg
      className={styles.ring}
      viewBox={`0 0 ${String(LOOP_SIZE)} ${String(LOOP_SIZE)}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        className={cx(styles.ringStroke, drawing && styles.ringDraw)}
        cx={LOOP_SIZE / 2}
        cy={LOOP_SIZE / 2}
        r={RING_RADIUS}
        pathLength="1"
      />
    </svg>
  );
}

/** The settled card: everything the line gathered, hanging on it. */
function Gathered({
  stats,
  page,
  firstPage,
}: {
  stats: ShowcaseRewardsStats;
  page: number;
  firstPage: number;
}) {
  const featuredIndex = wrapIndex(page, stats.items.length);
  const featured = stats.items[featuredIndex];
  // The first featured item is not a SWITCH — it is what the card opened on —
  // so it arrives with the rest of the card rather than fading over itself.
  const switched = page !== firstPage;

  return (
    <>
      {/* The one headline that names this card, and what it asks of the member.
          Node and label share a grid row, so they are one object. */}
      <header className={cx(styles.head, styles.arrive1)}>
        <Node kind="open" />
        <Title className={styles.title}>{stats.title}</Title>
        <p className={styles.subtitle}>{stats.subtitle}</p>
      </header>

      {/* The featured reward, named where the line stops on it. A solid node is
          the line swelling to a stop: the thing being shown right now. */}
      {featured !== undefined && (
        <div
          key={featuredIndex}
          className={cx(styles.caption, styles.arrive2, switched && styles.captionSwitch)}
        >
          <Node kind="solid" />
          <p className={styles.name}>{featured.name}</p>
          <p className={styles.price}>{featured.discountLabel}</p>
        </div>
      )}

      {/* The shelf the bow gathers. It bleeds to both edges: the frames at the
          rim are meant to run off the screen, which is what says the catalogue
          continues past what is on it. */}
      <div className={cx(styles.shelf, styles.arrive3)}>
        <RewardsCarousel items={stats.items} page={page} />
      </div>

      {/* The close: the loop, and the cost inside it. */}
      <div className={styles.close}>
        <ClosingLoop drawing={false} />
        {featured !== undefined && (
          <p
            key={featuredIndex}
            className={cx(styles.cost, styles.arrive4, switched && styles.captionSwitch)}
          >
            <Figure size="xl" className={styles.costValue}>
              {formatThousands(featured.pointsCost)}
            </Figure>
            <span className={styles.costUnit}>pts</span>
          </p>
        )}
      </div>
    </>
  );
}

/**
 * The intro: the box held inside the loop as it closes, then the bloom.
 *
 * THE BOX IS ALREADY THIS DESIGN'S CIRCLE — a round cork-and-linen box wrapped
 * in a eucalyptus vine — so the loop closing around it is the thread finding a
 * shape it already had. What it opens into is NOT confetti: a warm soft golden
 * bloom of the brand's own struck coins, eased soft at both ends, every one of
 * which stops on its mark before it fades. See ../rewardsCelebration.ts for the
 * curve and why it is not the base's.
 */
function Bloom() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    const box = root.querySelector<HTMLElement>(`[${BOX_ATTR}]`);
    const coins = [...root.querySelectorAll<HTMLElement>(`[${COIN_ATTR}]`)];
    if (box === null) return;

    const maxRadius = bloomMaxRadius(LOOP_SIZE);

    let raf = 0;
    let startMs = 0;
    const frame = (now: number): void => {
      if (startMs === 0) startMs = now;
      const elapsed = Math.min(now - startMs, INTRO_TOTAL_MS);

      const boxValues = boxFrame(elapsed);
      box.style.transform = `translate(-50%, -50%) scale(${String(boxValues.scale)})`;
      box.style.opacity = String(boxValues.opacity);

      const bloomT = bloomProgress(elapsed);
      coins.forEach((element, index) => {
        const seed = BLOOM_SEEDS[index];
        if (seed === undefined) return;
        const coin = bloomCoinFrame(seed, bloomT, maxRadius);
        element.style.transform = `translate(-50%, -50%) translate(${String(coin.dx)}px, ${String(coin.dy)}px) scale(${String(coin.scale)})`;
        element.style.opacity = String(coin.opacity);
      });

      if (elapsed < INTRO_TOTAL_MS) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // The same `.close` box the settled card uses, in the same place, so the
    // loop does not move when the shelf replaces the box.
    <div ref={rootRef} className={styles.close}>
      <ClosingLoop drawing />
      {BLOOM_SEEDS.map((seed, index) => (
        <span key={index} className={styles.coin} data-bloom-index={index} style={{ opacity: 0 }}>
          <MintedDisc
            slot={SLOT_SINGLE_POINT}
            fallback={showcaseAsset('single_point.png')}
            alt=""
            size={seed.size}
          />
        </span>
      ))}
      <span className={styles.box} data-giftbox="" style={{ opacity: 0 }}>
        <MintedDisc
          slot={SLOT_GIFTBOX}
          fallback={showcaseAsset('giftbox.png')}
          alt=""
          size={BOX_SIZE}
        />
      </span>
    </div>
  );
}
