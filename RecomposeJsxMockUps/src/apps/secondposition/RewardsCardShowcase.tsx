// CELEBRATION CARD 3 OF 5 — the rewards a member can get, BILLED.
//
// A satin sheet, a struck box on it, and then the bill: the shelf of works this
// studio is offering, with the one it opened on named underneath in the display
// serif. It is the same unit as every other screen in this fork
// (./layout_brief.yaml) — a photograph at its own proportion, and its name on
// the satin directly beneath it, read as ONE object.
//
// WHY THE WHOLE CARD IS A SATIN FIELD. "The satin blush is a FIELD: it owns the
// panel halves, the plinths, the single primary action on a screen, the
// navigation at the foot AND THE GROUND OF EVERY CELEBRATION CARD." So this
// card is not a cream screen with a satin object on it; it is a satin field
// with a bill on it, which is also what lets the insignia be MOUNTED the way
// this brand mounts what it awards — centred on satin, clear air around it,
// nothing framing it. Everything set on it is `--sc-on-satin`: the charcoal ink
// measures 2.70:1 there and fails AA at every size.
//
// NOT to be confused with ./RewardsShowcase.tsx, which is the static points
// STORE. The two Dart files are named that way and the ports keep their names,
// because a reviewer runs the two side by side. This card is registered as
// `rewards`; that screen is registered as `store`.
//
// EMPHASIS, AND IT IS INHERITED RATHER THAN CHOSEN. Rank 1 is the featured
// reward's NAME and its PHOTOGRAPH, together — the pipeline generates the
// picture from the copy, so they are one claim about one thing. Rank 2 is its
// points cost, rank 3 the shelf, and the giftbox intro supports. Note what that
// makes this card DIFFERENT from streak, points and wins: the hero here is a
// name, not a figure, so the display serif goes on the reward's name and the
// cost stays in the sans beneath it. `--sc-type-figure-hero` has no business on
// this screen.
//
// THE THREE THINGS THAT MOVED, AND WHY, AGAINST THE BASE
//
//   * The title was a 32px display heading over the carousel. It is the card's
//     own masthead now — 19px serif with the subtitle under it and a cream
//     hairline beneath, at the top edge — because a card whose loudest element
//     is its section heading has answered the wrong question (Guardrail 14).
//   * Every reward was a 208px CIRCLE with a 1.50 photograph `cover`ed into it,
//     which threw away a third of each frame and then masked the corners off
//     what was left. A photograph gets a box of its own proportion here; a disc
//     is for a cut-out, which is contained and loses nothing.
//   * The action appeared SEVEN SECONDS after the intro, because the card fired
//     `onCycleComplete` when the carousel's replay hold expired. The card
//     settles when its object stops — see `CARD_SETTLE_MS`.
//
// WHAT DRIVES WHAT. Two per-frame drivers and nothing else in JS: the giftbox
// intro (the box and fourteen coins share ONE clock, ./rewardsCelebration.ts
// holds that arithmetic) and the shelf's bloom and page tween
// (./celebrations/RewardsCarousel.tsx). The head's arrival and the caption's
// satin are CSS keyframes on the app's one curve.

import { useEffect, useRef, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { RewardsCarousel } from './celebrations/RewardsCarousel';
import { SLIDE_MS, wrapIndex } from './celebrations/rewardsCoverFlow';
import type { ShowcaseRewardsStats } from './celebrations/showcaseCelebrationStats';
import { cx } from './cx';
import { formatThousands } from './formatPoints';
import {
  BOX_SIZE,
  BURST_SEEDS,
  CAPTION_DELAY_MS,
  CARD_SETTLE_MS,
  CAROUSEL_HOLD_MS,
  IDLE_MS,
  INTRO_TOTAL_MS,
  boxFrame,
  buildRewardsStats,
  burstMaxRadius,
  burstProgress,
  burstStarFrame,
  initialPage,
  rewardsSignature,
} from './rewardsCelebration';
import styles from './RewardsCardShowcase.module.css';
import { INSIGNIA_ART_CLASS, Insignia } from './shell/Insignia';
import { Screen } from './shell/Screen';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import type { ShowcaseReward } from './showcaseContent';
import { SLOT_GIFTBOX, SLOT_SINGLE_POINT } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * The one delay the stylesheet cannot read off the clock directly.
 *
 * Everything else in this card's CSS is a `--sp-*` duration written onto the
 * asset root by ../SecondPositionSurface.tsx; this is a COMPOSED window (the
 * caption waits out the shelf's bloom), so it is derived once here rather than
 * restated as a literal in the stylesheet.
 */
const REWARDS_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--rw-caption-delay': `${String(CAPTION_DELAY_MS)}ms`,
});

/** The attributes the intro's driver finds its elements by. */
const BOX_ATTR = 'data-giftbox';
const COIN_ATTR = 'data-burst-index';

export interface RewardsCardShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
  /**
   * The previewed gym's rewards. Non-empty shows them (with their generated
   * photographs) instead of the bundled sample set.
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
  // A tap finishes the card outright — ./shell/useTapToSettle.ts.
  const { settled: tapped, bind } = useTapToSettle();
  const firstPage = initialPage(stats.items.length, stats.featuredIndex);
  const [cycle, setCycle] = useState(0);
  const [opened, setOpened] = useState(false);
  /** The UNBOUNDED page, exactly Dart's `_page`. The item is `page % length`. */
  const [page, setPage] = useState(firstPage);

  useEffect(() => {
    // GUARDRAIL 5 — FIRE THE CALLBACK BEFORE THE GUARD. The flow renders every
    // card with `loop={false}` and treats this callback as `markDone`, so a
    // reduced-motion return that skipped it left the action hidden forever and
    // turned the card into a dead end. The reduced-motion render is the settled
    // one, which is exactly what "settled" means here.
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    // The box's hit hands over to the bill.
    const open = window.setTimeout(() => {
      setOpened(true);
    }, INTRO_TOTAL_MS);
    // THE SETTLE IS ITS OWN DEADLINE, and it is the card finishing what it came
    // to say — the shelf stopped and the name revealed — never the replay hold
    // expiring. Conflating the two is what put this card's action 8.9 SECONDS
    // out against 0.76 on the streak, five look-alike cards revealing their
    // action at five different times.
    const settle = window.setTimeout(() => {
      onCycleComplete?.();
    }, CARD_SETTLE_MS);
    // STANDALONE ONLY. In the flow the card holds where it landed and the
    // member's tap advances it.
    const restart = loop
      ? window.setTimeout(() => {
          setOpened(false);
          // Back to the featured item for the next cycle.
          setPage(firstPage);
          setCycle((current) => current + 1);
        }, CARD_SETTLE_MS + CAROUSEL_HOLD_MS)
      : 0;
    return () => {
      window.clearTimeout(open);
      window.clearTimeout(settle);
      window.clearTimeout(restart);
    };
    // `cycle` is the dependency that re-arms the set: the restart bumps it, the
    // effect tears down and re-runs, and the intro below remounts on its key.
  }, [cycle, loop, reduceMotion, onCycleComplete, firstPage]);

  // The first advance is armed the moment the shelf is up, but subsequent ones
  // only after the slide has RESOLVED — so every advance after the first is a
  // slide plus an idle.
  const advanceDelayMs = page === firstPage ? IDLE_MS : SLIDE_MS + IDLE_MS;

  // A tap that finished the card, or a reduced-motion preference: everything
  // lands on its resting value. `finished` is what the stylesheet reads as
  // `.finished` (a negative animation delay over the whole subtree) and what
  // the shelf's per-frame driver reads as `immediate`, because a driver has no
  // keyframe to fast-forward.
  const finished = tapped || reduceMotion;
  const billed = opened || finished;

  // THE SHELF STOPS WHEN THE CARD IS FINISHED, and `finished` is the guard
  // rather than `reduceMotion` alone. A tap "finishes the card outright: the
  // figure lands on its value, THE OBJECT REACHES ITS RESTING PLACE, the action
  // appears" (./layout_brief.yaml) — and a card that has announced itself
  // settled while its rank 1 keeps changing underneath the member is the card
  // contradicting itself. It was worse than it sounds: `immediate` is also on
  // by then, so every further advance was a jump cut with no travel at all.
  // Un-tapped, the shelf carousels as the inventory says it does.
  useEffect(() => {
    if (!billed || finished) return;
    const advance = window.setTimeout(() => {
      setPage((current) => current + 1);
    }, advanceDelayMs);
    return () => {
      window.clearTimeout(advance);
    };
  }, [billed, page, advanceDelayMs, finished]);

  return (
    // The card owns its own scaffold rather than the base's celebration frame:
    // a fork owns its `shell/`, and this design's ground here is the satin
    // itself, edge to edge, with nothing inset and nothing floating. Nothing on
    // this subtree may set `overflow` — the coins are thrown past the card's
    // edges and the shelf's rim pages run off the screen on purpose, and one
    // non-visible axis computes the other to `auto`.
    <Screen background="var(--sc-satin)">
      <div
        className={cx(styles.card, finished && styles.finished)}
        style={showcaseStyle(REWARDS_VARS)}
        {...bind}
      >
        {billed ? (
          <Bill stats={stats} page={page} firstPage={firstPage} immediate={finished} />
        ) : (
          <GiftboxIntro key={cycle} />
        )}
        {/*
          THE SEAM BETWEEN THE FIELD AND THE ACTION. The flow's button is a
          satin band and this card's ground is a satin field, so once the card
          settles the two meet with nothing between them and `Continue` stops
          reading as something pressable. The stylesheet has the whole argument;
          it is last in the card so it lies over everything, and it never takes
          a tap.
        */}
        <span className={styles.footRule} aria-hidden="true" />
      </div>
    </Screen>
  );
}

/** The settled card: the head, the shelf, and the name of what it opened on. */
function Bill({
  stats,
  page,
  firstPage,
  immediate,
}: {
  stats: ShowcaseRewardsStats;
  page: number;
  firstPage: number;
  immediate: boolean;
}) {
  const featuredIndex = wrapIndex(page, stats.items.length);
  const featured = stats.items[featuredIndex];
  // The first featured item is not a SWITCH — it is what the card opened on —
  // so it is revealed with the rest of the card rather than replacing itself.
  const switched = page !== firstPage;

  return (
    <>
      {/*
        THE CARD'S MASTHEAD. An identity at the top of a screen is the one thing
        that earns being centred, and it is what this pair is: the name of what
        is being offered and the line telling the member what to do with it. The
        rule under it is CREAM, not brass — brass on satin measures 1.33:1 and
        is simply not there.
      */}
      <header className={styles.head}>
        <span className={styles.title}>{stats.title}</span>
        <span className={styles.subtitle}>{stats.subtitle}</span>
        <span className={styles.headRule} aria-hidden="true" />
      </header>

      <div className={styles.bill}>
        {/* The shelf bleeds to both edges: the pages at the rim are meant to
            run off the screen, which is what says the catalogue continues past
            what is on the card. */}
        <div className={styles.shelf}>
          <RewardsCarousel items={stats.items} page={page} immediate={immediate} />
        </div>

        {/*
          RANK 1 IS THIS AND THE PHOTOGRAPH ABOVE IT, AS ONE OBJECT — which is
          why the gap between them is the small one and everything else on the
          card is far away. The name is the display serif at the billed rung,
          the largest type on the screen; the cost is rank 2 and stays in the
          sans, because a figure is never set larger than the name it describes.

          It is revealed the way every name in this app is revealed: the field
          passing over the type is what puts the type on screen (the veil below).
          The `key` is what re-fires that on each advance.
        */}
        {featured !== undefined && (
          <div
            key={featuredIndex}
            className={cx(styles.caption, switched && styles.captionSwitch)}
          >
            <span className={styles.name}>{featured.name}</span>
            <span className={styles.discount}>{featured.discountLabel}</span>
            <span className={styles.cost}>{formatThousands(featured.pointsCost)} pts</span>
            <span className={styles.captionVeil} aria-hidden="true" />
          </div>
        )}
      </div>
    </>
  );
}

/**
 * The intro: the struck box arriving on the satin, held, then thrown open.
 *
 * TWO TEMPOS IN ONE GESTURE, AND THAT IS THE WHOLE POINT (Guardrail 16). The
 * ARRIVAL is unhurried — a full `SETTLE_MS`, because the mounted insignia is
 * what the beat exists for. The OPEN is pinned to `IMPACT_MS` and derived from
 * nothing: a hit is felt rather than read, and a slow explosion is not a
 * generous one, it is coins wafting outward instead of being thrown.
 *
 * One rAF driver rather than fourteen keyframes because every value — the box's
 * swell and fade, each coin's distance, opacity and scale — is a function of
 * the SAME clock and the coins' reach is measured off the field they are thrown
 * across. ../rewardsCelebration.ts holds all of it.
 */
function GiftboxIntro() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    const box = root.querySelector<HTMLElement>(`[${BOX_ATTR}]`);
    const coins = [...root.querySelectorAll<HTMLElement>(`[${COIN_ATTR}]`)];
    if (box === null) return;

    // `clientWidth/Height` and not `getBoundingClientRect`, because the stage
    // scales the whole device with a CSS transform and only the former reports
    // the layout pixels the geometry is quoted in.
    const maxRadius = burstMaxRadius(root.clientWidth, root.clientHeight);

    let raf = 0;
    let startMs = 0;
    const frame = (now: number): void => {
      if (startMs === 0) startMs = now;
      const elapsed = Math.min(now - startMs, INTRO_TOTAL_MS);

      const values = boxFrame(elapsed);
      box.style.transform = `translate(-50%, -50%) translateY(${String(values.riseY)}px) scale(${String(values.scale)})`;
      box.style.opacity = String(values.opacity);

      const burstT = burstProgress(elapsed);
      coins.forEach((element, index) => {
        const seed = BURST_SEEDS[index];
        if (seed === undefined) return;
        const coin = burstStarFrame(seed, burstT, maxRadius);
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
    // The box is painted OVER the coins, so they come out from behind it.
    // Everything starts invisible, which is what the driver's own frame 0
    // resolves to — the first painted frame is already correct.
    <div ref={rootRef} className={styles.stage}>
      {BURST_SEEDS.map((seed, index) => (
        <div
          key={index}
          className={styles.coin}
          data-burst-index={index}
          style={{ width: `${String(seed.size)}px`, height: `${String(seed.size)}px`, opacity: 0 }}
        >
          <ThemedImage
            className={styles.coinImg}
            slot={SLOT_SINGLE_POINT}
            fallbackSrc={showcaseAsset('single_point.png')}
            alt=""
          />
        </div>
      ))}
      <div className={styles.giftbox} data-giftbox="" style={{ opacity: 0 }}>
        {/*
          MOUNTED, NOT ILLUSTRATED, and CONTAINED rather than cropped. The
          giftbox cut-out measures 1.39, so a box of any other shape would
          either behead it or letterbox it; ../shell/Insignia.tsx scales it to
          fit inside the square it is given and leaves the remainder empty,
          which is invisible because a cut-out has no opaque edge to show one.
        */}
        <Insignia
          size={BOX_SIZE}
          art={
            <ThemedImage
              className={INSIGNIA_ART_CLASS}
              slot={SLOT_GIFTBOX}
              fallbackSrc={showcaseAsset('giftbox.png')}
              alt=""
            />
          }
        />
      </div>
    </div>
  );
}
