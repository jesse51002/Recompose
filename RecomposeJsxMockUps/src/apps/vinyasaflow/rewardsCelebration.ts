// The pure half of ./RewardsCardShowcase.tsx — the celebration's third card.
//
// The base's version of this file ported `rewards_card_showcase.dart` frame for
// frame: a giftbox flying in on a 3D spin, fourteen stars thrown outward on
// `easeOutQuart`, and a bell PULSE on the points line. This fork keeps every
// one of those ELEMENTS and re-times all of them, because the arithmetic here
// is motion and motion is what ./layout_brief.yaml directs:
//
//   * NOTHING IS THROWN. `easeOutQuart` leaves at full speed and decelerates
//     into its mark — the shape of a confetti burst, which the brand's own note
//     rules out by name ("a warm soft golden bloom, a settled breath at the top
//     of a flow, never confetti"). Every curve below is the app's one breath,
//     `Curves.easeInOutSine` (./shell/breath.ts), soft at BOTH ends, because a
//     breath begins gently and finishes gently.
//   * NOTHING BOUNCES. The pulse — `scale 1 → 1.06 → 1` — overshot its size and
//     settled, which the brief bans outright, so it is gone along with the
//     mirrored decay Bézier that made it exact. The featured caption now simply
//     arrives with its figure.
//   * NOTHING SPINS. The box's `(1 - eIn) * 2pi` Y-axis turn was a flourish;
//     the box now settles in place as the thread reaches it.
//
// What is left is four pieces of arithmetic, none of them a component:
//
//  0. THE CAROUSEL'S DATA (`_buildStats`). The injected gym rewards mapped onto
//     the celebration's own item model, with the featured index clamped so the
//     paging below stays valid for any reward count — and, new here, the
//     GENERATED REWARD SLOT stamped on each one (see `buildRewardsStats`).
//  1. THE INTRO'S THREE PHASES. The thread drawing itself, the held breath at
//     the top of the flow, and the bloom. One clock, sliced; the box and the
//     coins are both functions of it, which is why ./RewardsCardShowcase.tsx
//     drives them with `requestAnimationFrame` rather than CSS.
//  2. THE PAGING (`_resetPaging`). `_initialPageBase` is 10000 and the page it
//     lands on is a modulo of the item count, so the carousel can advance
//     "forever" without ever reaching page 0 — off-by-one there silently
//     features the wrong reward.
//  3. THE THREAD'S DRAW WINDOWS. The descent, the bow, the drop and the closing
//     ring are four CSS animations rather than four rAF drivers, so their
//     starts and durations are published here as milliseconds and ride onto the
//     stylesheet as `--rw-*`. They are one stroke passing each piece in turn,
//     which is why each window OVERLAPS the next: a gap would read as four
//     lines arriving rather than one line travelling.

import { Curves, clamp01, phaseProgress } from './celebrations/curves';
import { ARRIVE_MS, BREATH, DRAW_MS as SCREEN_DRAW_MS, HOLD_MS as SETTLED_HOLD_MS } from './shell/breath';
import type { ShowcaseRewardItem, ShowcaseRewardsStats } from './celebrations/showcaseCelebrationStats';
import { SHOWCASE_REWARDS_STATS } from './celebrations/showcaseCelebrationStats';
import type { ShowcaseAssetFile } from './showcaseAssets';
import type { ShowcaseReward } from './showcaseContent';
import { SLOT_REWARDS, slotAt } from './showcaseSlots';

// ---------------------------------------------------------------------------
// The carousel's data
// ---------------------------------------------------------------------------

/**
 * The bundled sample whose photo backs slot `index` when an injected reward's
 * own URL is absent or dead.
 *
 * THE ONE PLACE THIS PORT DIVERGES FROM `_buildStats`. Dart writes
 * `imageAsset: ''`, which resolves to a dead `AssetImage` and lands on the
 * carousel's `errorBuilder`. The React model types `imageAsset` as one of the
 * bundled filenames (./showcaseAssets.ts) and has no empty member, so the port
 * falls through to the sample at the same slot instead.
 */
function sampleAssetFor(index: number): ShowcaseAssetFile {
  const samples = SHOWCASE_REWARDS_STATS.items;
  return samples[index % samples.length]?.imageAsset ?? 'reward_bring_friend.png';
}

/**
 * `_buildStats` — the injected gym rewards as carousel items (keeping the
 * bundled title and subtitle, which are copy rather than gym data), or the
 * bundled sample set when nothing was injected.
 *
 * THE GENERATED SLOT IS STAMPED HERE, and it was missing. `ShowcaseRewardItem`
 * has carried a `themeSlot` field — documented as "THE SAME ASSET the store
 * card paints with" — since the store was tokenised, and nothing ever set it,
 * so a themed run showed the generated reward photograph in the store and the
 * gym's raw catalogue photo in the celebration. That is Guardrail 7 exactly: one
 * asset, every screen that shows it. ../RewardsShowcase.tsx's `storeItemsFor`
 * assigns `slotAt(SLOT_REWARDS, i)` by position where its list is built; this
 * assigns the same slot to the same position of the same list, so the two
 * surfaces cannot disagree.
 */
export function buildRewardsStats(
  rewards: readonly ShowcaseReward[] | null | undefined,
): ShowcaseRewardsStats {
  if (rewards === null || rewards === undefined || rewards.length === 0) {
    return {
      ...SHOWCASE_REWARDS_STATS,
      items: SHOWCASE_REWARDS_STATS.items.map((item, index) => ({
        ...item,
        themeSlot: slotAt(SLOT_REWARDS, index),
      })),
    };
  }
  const items: readonly ShowcaseRewardItem[] = rewards.map((reward, index) => ({
    imageUrl: reward.imageUrl,
    imageAsset: sampleAssetFor(index),
    themeSlot: slotAt(SLOT_REWARDS, index),
    name: reward.title,
    discountLabel: reward.priceLabel,
    pointsCost: reward.pointsCost,
  }));
  return {
    title: SHOWCASE_REWARDS_STATS.title,
    subtitle: SHOWCASE_REWARDS_STATS.subtitle,
    featuredIndex: featuredIndexFor(items.length),
    items,
  };
}

/**
 * A stable identity for a resolved item list, so ./RewardsCardShowcase.tsx can
 * `key`-remount the celebration when the previewed gym's rewards change — the
 * React replacement for `didUpdateWidget`'s cancel-dispose-reset block, which
 * this package cannot express (resetting state from an effect is a lint error;
 * see ../../CLAUDE.md).
 */
export function rewardsSignature(stats: ShowcaseRewardsStats): string {
  return stats.items.map((item) => `${item.name} ${item.imageUrl ?? ''}`).join('');
}

// ---------------------------------------------------------------------------
// The intro: the thread draws, the box is held, the bloom
// ---------------------------------------------------------------------------

/**
 * THE TEMPO IS A BREATH AND IT IS LITERAL — a four-count in and a four-count
 * out, with an ease that is soft at both ends.
 *
 * RE-EXPORTED FROM ../shell/breath.ts, not declared here. This card carried
 * `easeInOutCubic` (0.645, 0.045, 0.355, 1) while its four siblings carried
 * `easeInOutSine` (0.37, 0, 0.63, 1): both soft at both ends, both defensible
 * alone, and side by side in one flow the near-miss reads as inconsistency the
 * eye can feel and not name. There is one curve in this app.
 *
 * It still replaces `easeOutQuart` everywhere on this card, for the reason that
 * was already written here: quart leaves at full speed, which is the right law
 * for a UI acknowledging a tap and the wrong one for a bloom, which has to
 * begin gently or it is a throw.
 */
export const BREATH_EASE = BREATH;

/** The four-count in: the thread travels down, out, down again, and closes. */
export const DRAW_MS = SCREEN_DRAW_MS;
/** The held breath at the top of the flow, with the box inside the closed loop. */
export const HOLD_MS = Math.round(ARRIVE_MS / 2);
/**
 * The box opening into the bloom — AN IMPACT, AND IT STAYS QUICK.
 *
 * Fixed, and deliberately NOT derived from `CLOSE_MS` like everything else on
 * this card. It was `CLOSE_MS - ARRIVE_MS`, so slowing the celebration clock
 * stretched the burst from ~440ms to 800ms and turned a pop into a drift —
 * coins wafting outward rather than being thrown.
 *
 * Guardrail 16 says a celebration must be slow enough to take in, and that is
 * about what a member READS: the box arriving, the reward revealed, the cost.
 * An EXPLOSION is not read, it is felt, and a slow explosion is not a generous
 * explosion — it is a weak one. The burst stays fast; the appear it uncovers is
 * what takes the time.
 */
export const BLOOM_MS = 440;

/** The intro's whole timeline. */
export const INTRO_TOTAL_MS = DRAW_MS + HOLD_MS + BLOOM_MS;
/** Where the bloom starts, in ms from the intro's first frame. */
export const BLOOM_START_MS = DRAW_MS + HOLD_MS;

/**
 * ONE STROKE PASSING EACH PIECE IN TURN. The descent, the bow, the drop and the
 * closing ring are separate elements only because CSS has no way to stroke one
 * shape through four different boxes; they are one line, so each window starts
 * BEFORE the previous one finishes. A gap between any two of them reads as four
 * lines arriving on their own schedules, which is the exact failure the brief's
 * "the stagger is not a stagger at all" paragraph describes.
 *
 * The ring's window runs past `DRAW_MS` into the hold on purpose: the moment it
 * closes is the moment the card is settled, so it is the last thing to land.
 */
export interface DrawWindow {
  readonly delayMs: number;
  readonly durationMs: number;
}

const window_ = (delayMs: number, durationMs: number): DrawWindow =>
  Object.freeze({ delayMs, durationMs });

/*
 * The four windows, as fractions of `DRAW_MS` rather than as four numbers of
 * their own. Retiming the app retimes the stroke; the OVERLAPS, which are what
 * make four elements read as one line, survive it by construction.
 */
const at = (start: number, end: number): DrawWindow =>
  window_(Math.round(DRAW_MS * start), Math.round(DRAW_MS * (end - start)));

/** The descent, from the top edge down to the bow. */
export const DESCENT_WINDOW: DrawWindow = at(0, 0.31);
/** The sideways excursion that gathers the shelf of rewards. */
export const BOW_WINDOW: DrawWindow = at(0.27, 0.59);
/** The return, dropping out from behind the featured photograph. */
export const DROP_WINDOW: DrawWindow = at(0.55, 0.74);
/** The loop closing around the hero — the card's single unmistakable finish. */
export const RING_WINDOW: DrawWindow = at(0.7, 1.23);

/**
 * The closing loop's diameter, in the phone's logical px.
 *
 * It is the card's one fixed measurement below the bow, which is what lets the
 * thread be positioned from the BOTTOM edge in CSS: everything under the bow
 * (the shelf's lower half, this ring, the gaps and the foot inset) is a known
 * number, while the head and the caption above it are however tall their type
 * makes them.
 */
export const LOOP_SIZE = 272;

/** `_kBoxSize` — the giftbox art's box, in px. It sits inside the loop. */
export const BOX_SIZE = 200;

/** How much of the loop's own diameter a coin travels at full bloom. */
export const BLOOM_REACH = 0.62;

/** `_kBurstStarCount` — the coins the box opens into. */
export const BLOOM_COIN_COUNT = 14;

/**
 * `_buildBurst`'s `sizes` table, cycled by `i % sizes.length`, at this fork's
 * own scale: smaller than the base's, because a bloom is petals opening and not
 * objects thrown, and fourteen big discs read as the latter however they move.
 */
export const BLOOM_COIN_SIZES: readonly number[] = Object.freeze([22, 30, 26, 34, 20, 28]);

/** One coin's launch angle, art size and travel reach. */
export interface BloomCoinSeed {
  /** Radians. `i / n * 2pi` plus the alternating jitter. */
  readonly angle: number;
  /** Edge of the coin's art, in px. NOT scaled by the box — it is passed raw. */
  readonly size: number;
  /** Share of the full reach this coin travels: 1.0, or 0.7 for every fourth. */
  readonly reach: number;
}

/**
 * `_buildBurst` — an even spread around the circle with a ±0.12rad per-coin
 * jitter so the bloom does not read as a perfect ring, and every fourth coin
 * stopping short for a layered "near + far" feel.
 */
function buildBloom(): readonly BloomCoinSeed[] {
  const seeds: BloomCoinSeed[] = [];
  for (let i = 0; i < BLOOM_COIN_COUNT; i++) {
    seeds.push(
      Object.freeze({
        angle: (i / BLOOM_COIN_COUNT) * 2 * Math.PI + (i % 2 === 0 ? 0.12 : -0.12),
        size: BLOOM_COIN_SIZES[i % BLOOM_COIN_SIZES.length] ?? 0,
        reach: i % 4 === 0 ? 0.7 : 1.0,
      }),
    );
  }
  return Object.freeze(seeds);
}

/** Built once, shared by every mount. */
export const BLOOM_SEEDS: readonly BloomCoinSeed[] = buildBloom();

/**
 * How far the furthest coin travels from the loop's centre.
 *
 * Measured off the LOOP rather than off the viewport, which is what the base
 * did (`min(constraints.maxWidth, maxHeight) / 2`). The loop sits low on the
 * card — the action waits inside its final curve — so a viewport-sized radius
 * would fling half the bloom off the bottom edge, and a bloom that leaves the
 * screen is a burst.
 */
export function bloomMaxRadius(loopSize: number): number {
  return loopSize * BLOOM_REACH;
}

/** The bloom's own clock, 0 → 1 across `BLOOM_MS`. */
export function bloomProgress(elapsedMs: number): number {
  return phaseProgress(elapsedMs, BLOOM_START_MS, INTRO_TOTAL_MS);
}

/** The box's resolved frame. */
export interface BoxFrame {
  readonly scale: number;
  readonly opacity: number;
}

/**
 * The box, as a function of elapsed ms.
 *
 * It arrives as the thread reaches it — the drop and the ring's window, not the
 * first frame — because "if the line has not reached a thing yet, that thing is
 * not there yet". It leaves by OPENING: the last thing it does is grow slightly
 * as it fades to nothing, so the coins read as coming out of it rather than as
 * appearing where it used to be.
 */
export function boxFrame(elapsedMs: number): BoxFrame {
  const settle = Curves.easeInOutSine(
    phaseProgress(elapsedMs, DROP_WINDOW.delayMs, RING_WINDOW.delayMs + RING_WINDOW.durationMs),
  );
  const open = Curves.easeInOutSine(bloomProgress(elapsedMs));
  return {
    scale: (0.94 + 0.06 * settle) * (1 + 0.1 * open),
    opacity: settle * (1 - open),
  };
}

/** One coin's resolved frame. */
export interface BloomCoinFrame {
  readonly dx: number;
  readonly dy: number;
  readonly opacity: number;
  readonly scale: number;
}

/**
 * One coin of the bloom.
 *
 * Distance is eased soft at both ends, so a coin leaves gently and STOPS on its
 * mark without a final tick — the same law the brief gives a ring that fills by
 * drawing. Opacity rises, holds through the middle of the phase, and settles
 * out; nothing is still moving when it disappears.
 */
export function bloomCoinFrame(
  seed: BloomCoinSeed,
  bloomT: number,
  maxRadius: number,
): BloomCoinFrame {
  const distance = Curves.easeInOutSine(bloomT) * maxRadius * seed.reach;
  const rise = Curves.easeInOutSine(clamp01(bloomT / 0.22));
  const fall = Curves.easeInOutSine(clamp01((bloomT - 0.5) / 0.5));
  return {
    dx: Math.cos(seed.angle) * distance,
    dy: Math.sin(seed.angle) * distance,
    opacity: rise * (1 - fall),
    scale: Curves.easeInOutSine(clamp01(bloomT / 0.3)),
  };
}

// ---------------------------------------------------------------------------
// The paging
// ---------------------------------------------------------------------------

/**
 * `_kCarouselHold` — how long the carousel runs before the celebration replays.
 *
 * A REPLAY CONCERN AND NOTHING ELSE, and it is worth saying because it was not.
 * The card used to report itself settled only when this expired, so inside the
 * flow the Continue button appeared 8.9 seconds after the loop had closed: the
 * longest wait in the asset by a factor of ten, on the one card that also has
 * the most to look at. See `SETTLE_MS` in ./RewardsCardShowcase.tsx.
 *
 * Long, and deliberately: it is the window a reviewer watching the card
 * standalone gets to see the shelf page through the gym's real catalogue.
 */
export const CAROUSEL_HOLD_MS = SETTLED_HOLD_MS * 2;

/** `_idleDelay` — how long a page rests before the carousel advances itself. */
export const IDLE_MS = SETTLED_HOLD_MS;

/**
 * `_initialPageBase`. A large offset so the carousel can advance "forever"
 * without ever hitting page 0; the item shown is `page % items.length`.
 */
export const INITIAL_PAGE_BASE = 10000;

/**
 * `_buildStats`'s featured index for an INJECTED reward list: the middle item,
 * or 0 when there is nothing to be in the middle of. The bundled sample set
 * carries its own `featuredIndex` and does not go through this.
 */
export function featuredIndexFor(itemCount: number): number {
  return itemCount <= 1 ? 0 : Math.trunc(itemCount / 2);
}

/**
 * `_resetPaging`'s `_page` —
 * `_initialPageBase - (_initialPageBase % items.length) + featuredIndex`.
 *
 * Subtracting the remainder lands the base on a multiple of the item count, so
 * adding `featuredIndex` makes `page % items.length` come out at exactly the
 * featured item. An empty list degrades to the base rather than dividing by
 * zero (the carousel renders nothing either way).
 */
export function initialPage(itemCount: number, featuredIndex: number): number {
  if (itemCount <= 0) return INITIAL_PAGE_BASE;
  return INITIAL_PAGE_BASE - (INITIAL_PAGE_BASE % itemCount) + featuredIndex;
}
