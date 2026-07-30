// The pure half of ./RewardsCardShowcase.tsx — everything on that card that is
// arithmetic rather than markup.
//
// Four separate pieces live here, and none of them is a component:
//
//  0. THE SHELF'S DATA. The injected gym rewards mapped onto the celebration's
//     own item model, with the generated reward slot stamped on each one and
//     the featured index clamped so the paging stays valid for any reward count.
//  1. THE GIFTBOX INTRO's three phases. One clock over an arrival, a beat and
//     an impact, with the box and fourteen thrown coins derived from it. Every
//     value is a function of that ONE clock, which is why the component drives
//     it with `requestAnimationFrame` rather than CSS.
//  2. THE CARD'S OWN DEADLINES — when the intro hands over, when the card has
//     finished saying what it came to say, and (standalone only) when it
//     replays.
//  3. THE PAGING. `INITIAL_PAGE_BASE` is 10000 and the page it lands on is a
//     modulo of the item count, so the carousel can advance "forever" without
//     ever reaching page 0 — off-by-one there silently features the wrong reward.
//
// GUARDRAIL 16 IS WHY THE CLOCK IS SHAPED THE WAY IT IS, AND THIS CARD IS THE
// EXACT CASE THE GUARDRAIL WAS WRITTEN FROM. The box's ARRIVAL is slow — a full
// `SETTLE_MS`, because that is the beat the card exists for — and the box FLYING
// OPEN is not: it is pinned to `IMPACT_MS` and derived from nothing, so the next
// person to slow this flow down cannot stretch an explosion into a waft. A slow
// burst is not a generous burst; it is coins wafting outward instead of being
// thrown. ./shell/phrase.ts holds both constants and says the same thing.

import { PHRASE_CURVE, SLIDE_MS } from './celebrations/rewardsCoverFlow';
import { clamp01, phaseProgress } from './celebrations/curves';
import type { ShowcaseRewardItem, ShowcaseRewardsStats } from './celebrations/showcaseCelebrationStats';
import { SHOWCASE_REWARDS_STATS } from './celebrations/showcaseCelebrationStats';
import { ARRIVE_MS, CASCADE_MS, HOLD_MS, IMPACT_MS, SETTLE_MS, WIPE_MS } from './shell/phrase';
import type { ShowcaseAssetFile } from './showcaseAssets';
import type { ShowcaseReward } from './showcaseContent';
import { SLOT_REWARDS, slotAt } from './showcaseSlots';

// ---------------------------------------------------------------------------
// The shelf's data
// ---------------------------------------------------------------------------

/**
 * The bundled sample whose photo backs slot `index` when an injected reward's
 * own URL is absent or dead.
 *
 * THE ONE PLACE THIS PORT DIVERGES FROM `_buildStats`. Dart writes
 * `imageAsset: ''`, which resolves to a dead `AssetImage` and lands on the
 * carousel's `errorBuilder` — an empty box. The React model types `imageAsset`
 * as one of the bundled filenames (./showcaseAssets.ts) and has no empty
 * member, so the port falls through to the sample at the same slot instead. It
 * is only reachable when a gym's photo URL is empty or 404s, which the wire
 * contract does not produce: every `ShowcaseReward.imageUrl` is a required
 * string.
 */
function sampleAssetFor(index: number): ShowcaseAssetFile {
  const samples = SHOWCASE_REWARDS_STATS.items;
  return samples[index % samples.length]?.imageAsset ?? 'reward_bring_friend.png';
}

/**
 * The injected gym rewards as shelf items (keeping the bundled title and
 * subtitle, which are copy rather than gym data), or the bundled sample set
 * when nothing was injected.
 *
 * THE THEME SLOT IS STAMPED HERE, ON BOTH BRANCHES, and that is a fix rather
 * than a port. `ShowcaseRewardItem.themeSlot` has always existed and carried a
 * comment saying it is "the same asset the store card paints with" — and
 * nothing ever set it, so the store showed a reward's generated photograph
 * while this carousel showed the gym's stock URL for the same reward. That is
 * Guardrail 7 exactly: one catalogue, two screens, and the two must not
 * disagree. `./RewardsShowcase.tsx` stamps `slotAt(SLOT_REWARDS, i)` at the
 * same index on the same list, which is what makes them agree by construction
 * rather than by memory.
 */
export function buildRewardsStats(
  rewards: readonly ShowcaseReward[] | null | undefined,
): ShowcaseRewardsStats {
  if (rewards === null || rewards === undefined || rewards.length === 0) {
    return {
      title: SHOWCASE_REWARDS_STATS.title,
      subtitle: SHOWCASE_REWARDS_STATS.subtitle,
      featuredIndex: SHOWCASE_REWARDS_STATS.featuredIndex,
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
// The giftbox intro
// ---------------------------------------------------------------------------

/**
 * The box travelling in and coming to rest.
 *
 * UNHURRIED ON PURPOSE. This is the insignia arriving — the one beat the intro
 * exists for — and ./layout_brief.yaml gives it the better part of a second.
 */
export const BOX_ARRIVE_MS = SETTLE_MS;

/** The beat it sits at rest before the hit. Short: a held pose, not a pause. */
export const BOX_HOLD_MS = ARRIVE_MS;

/**
 * THE IMPACT, AND IT IS PINNED RATHER THAN DERIVED.
 *
 * The box flying open and the coins thrown outward are one hit, and a hit is
 * FELT rather than read. `IMPACT_MS` is a constant of its own in
 * ./shell/phrase.ts for exactly this reason, so slowing the celebration clock
 * later cannot stretch this into a drift.
 */
export const BOX_OPEN_MS = IMPACT_MS;

/** When the hit starts, in ms from the intro's first frame. */
export const OPEN_START_MS = BOX_ARRIVE_MS + BOX_HOLD_MS;

/** The intro's whole timeline. */
export const INTRO_TOTAL_MS = OPEN_START_MS + BOX_OPEN_MS;

/** The edge of the square the giftbox cut-out is CONTAINED inside, in px. */
export const BOX_SIZE = 240;

/** How far the box travels up into its resting place, in px. */
export const BOX_RISE_PX = 22;

/**
 * How much the box swells as it opens.
 *
 * It grows and dissolves rather than shrinking away: a wrapper coming apart
 * gets bigger for an instant. It is a one-way expansion into nothing and never
 * a scale-up-and-settle, which this app does not do anywhere.
 */
export const BOX_OPEN_SWELL = 0.22;

/** How many coins the box throws. */
export const BURST_COIN_COUNT = 14;

/** The coins' art sizes, cycled by `i % length`. */
export const BURST_COIN_SIZES: readonly number[] = Object.freeze([28, 36, 32, 40, 26, 34]);

/** One coin's launch angle, art size and travel reach. */
export interface BurstStarSeed {
  /** Radians. `i / n * 2pi` plus the alternating jitter. */
  readonly angle: number;
  /** Edge of the coin's art, in px. NOT scaled by the box — it is thrown whole. */
  readonly size: number;
  /** Share of `maxRadius` this coin travels: 1.0, or 0.7 for every fourth. */
  readonly reach: number;
}

/**
 * An even spread around the circle with a ±0.12rad per-coin jitter so the burst
 * does not read as a perfect ring, and every fourth coin stopping short for a
 * layered "near + far" feel.
 */
function buildBurst(): readonly BurstStarSeed[] {
  const seeds: BurstStarSeed[] = [];
  for (let i = 0; i < BURST_COIN_COUNT; i++) {
    seeds.push(
      Object.freeze({
        angle: (i / BURST_COIN_COUNT) * 2 * Math.PI + (i % 2 === 0 ? 0.12 : -0.12),
        size: BURST_COIN_SIZES[i % BURST_COIN_SIZES.length] ?? 0,
        reach: i % 4 === 0 ? 0.7 : 1.0,
      }),
    );
  }
  return Object.freeze(seeds);
}

/** Built once, shared by every mount. */
export const BURST_SEEDS: readonly BurstStarSeed[] = buildBurst();

/** `math.min(constraints.maxWidth, constraints.maxHeight) / 2`. */
export function burstMaxRadius(width: number, height: number): number {
  return Math.min(width, height) / 2;
}

/** The box's own clock, 0 → 1 across its arrival. */
export function arriveProgress(elapsedMs: number): number {
  return phaseProgress(elapsedMs, 0, BOX_ARRIVE_MS);
}

/** The hit's own clock, 0 → 1 across the open. */
export function burstProgress(elapsedMs: number): number {
  return phaseProgress(elapsedMs, OPEN_START_MS, INTRO_TOTAL_MS);
}

/** The box's resolved frame. */
export interface BoxFrame {
  /** `1 + swell * open` — it grows as it comes apart. */
  readonly scale: number;
  /** `arrive * (1 - open)`. */
  readonly opacity: number;
  /** How far below its resting place it still is, in px. */
  readonly riseY: number;
}

/** The box's frame, as a function of elapsed ms. */
export function boxFrame(elapsedMs: number): BoxFrame {
  const arrive = PHRASE_CURVE(arriveProgress(elapsedMs));
  const open = PHRASE_CURVE(burstProgress(elapsedMs));
  return {
    scale: 1 + BOX_OPEN_SWELL * open,
    opacity: arrive * (1 - open),
    riseY: (1 - arrive) * BOX_RISE_PX,
  };
}

/** One thrown coin's resolved frame. */
export interface BurstStarFrame {
  readonly dx: number;
  readonly dy: number;
  readonly opacity: number;
  readonly scale: number;
}

/**
 * One coin, for one seed.
 *
 * Distance is the only eased term, and it is eased on the PHRASE: thrown hard
 * and shedding speed the whole way, stopping dead rather than drifting on.
 * Opacity ramps up over the first fifth, holds past the halfway mark, then
 * clears so the field is empty when the shelf takes it; scale reaches full size
 * almost immediately, because a coin does not grow, it arrives.
 *
 * At `burstT <= 0` this gives opacity 0 and scale 0, so the elements stay
 * mounted and invisible rather than being added to the tree mid-animation.
 */
export function burstStarFrame(
  seed: BurstStarSeed,
  burstT: number,
  maxRadius: number,
): BurstStarFrame {
  const distance = PHRASE_CURVE(burstT) * maxRadius * seed.reach;
  const opacity =
    burstT < 0.22 ? burstT / 0.22 : burstT < 0.55 ? 1 : clamp01(1 - (burstT - 0.55) / 0.45);
  return {
    dx: Math.cos(seed.angle) * distance,
    dy: Math.sin(seed.angle) * distance,
    opacity,
    scale: Math.min(1, burstT / 0.18),
  };
}

// ---------------------------------------------------------------------------
// The card's deadlines
// ---------------------------------------------------------------------------

/**
 * When the featured name is revealed, measured from the shelf opening.
 *
 * The bloom runs first and the caption's satin follows it: the name is not
 * announced until the shelf it belongs to has stopped moving.
 */
export const CAPTION_DELAY_MS = CASCADE_MS;

/** How long the shelf takes to arrive and name what it opened on. */
export const BILL_SETTLE_MS = CAPTION_DELAY_MS + WIPE_MS;

/**
 * THE MOMENT THE CARD HAS FINISHED SAYING WHAT IT CAME TO SAY, and therefore
 * the moment its action appears.
 *
 * A CARD SETTLES WHEN ITS OBJECT STOPS, NEVER WHEN A TIMER EXPIRES
 * (./layout_brief.yaml). The base conflated this with the carousel's REPLAY
 * hold and fired `onCycleComplete` seven seconds after the intro, which put the
 * flow's action 8.9s out on this card against 0.76s on the streak — five cards
 * that look alike revealing their action at five different times. The hold
 * below is a replay concern and is armed only when the card runs standalone.
 */
export const CARD_SETTLE_MS = INTRO_TOTAL_MS + BILL_SETTLE_MS;

/**
 * How long a page rests before the shelf advances itself.
 *
 * A DWELL, NOT A MOTION, which is why it is a local constant rather than a rung
 * on ./shell/phrase.ts: that file holds how long a movement takes, and this is
 * how long nothing happens. Long enough to read a name and its cost without
 * being hurried, short enough that a member watching the card sees the shelf
 * move at least twice. The base's was 5000, which was one advance per loop.
 */
export const IDLE_MS = 2800;

/**
 * How long a settled card holds before it plays again. STANDALONE ONLY.
 *
 * Two page advances and then the app's standard hold: a carousel that restarts
 * before it has carouselled has not shown what it is. In the flow the card
 * holds where it landed and the member's tap advances it, so none of this is
 * reachable there — and crucially it is NOT what `onCycleComplete` waits for.
 */
export const CAROUSEL_HOLD_MS = 2 * IDLE_MS + SLIDE_MS + HOLD_MS;

// ---------------------------------------------------------------------------
// The paging
// ---------------------------------------------------------------------------

/**
 * A large offset so the carousel can advance "forever" without ever hitting
 * page 0; the item shown is `page % items.length`.
 */
export const INITIAL_PAGE_BASE = 10000;

/**
 * The featured index for an INJECTED reward list: the middle item, or 0 when
 * there is nothing to be in the middle of. The bundled sample set carries its
 * own `featuredIndex` and does not go through this.
 */
export function featuredIndexFor(itemCount: number): number {
  return itemCount <= 1 ? 0 : Math.trunc(itemCount / 2);
}

/**
 * `INITIAL_PAGE_BASE - (INITIAL_PAGE_BASE % items.length) + featuredIndex`.
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
