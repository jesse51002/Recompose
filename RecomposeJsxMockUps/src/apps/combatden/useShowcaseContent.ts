// The demo content resolution ladder, from
// ../../../../../CRM/lib/features/members/presentation/widgets/member_app/
// theme_tab/theme_preview_pane.dart:179-195.
//
// The ladder here is TWO rungs: the selected gym's REAL content wins, and
// failing that the BUNDLED offline constants. A single real item is then
// repeated across all four slots (`fillSlots`). In this browser the real branch
// is always absent — there is no gym — so the bundle is what renders, and the
// phone is complete with every backend down.
//
// THE FETCHED TIER IS GONE, and it never worked. Dart's ladder has a middle
// rung — `GET /api/v1/theme/showcase-defaults` for the previewed category —
// and this file used to import it from `../data/showcaseDefaults`. That path
// resolved to nothing: the module it named lives in ../../../RecomposeStudio,
// which this package may not import (the island rule, ../../CLAUDE.md), and
// the studio's own copy imports `recompose-jsx-mockups` right back — so
// honouring it would have required a cycle across the very boundary the rule
// exists to hold. TypeScript never reported the dangling import, so the branch
// sat here reading as a working tier while every render fell through it.
//
// It is deleted rather than vendored because this package MAY NOT FETCH. "No
// data fetching, ever ... a `fetch` in this package is a bug" is the island's
// own rule, and it is the rule that makes these screens safe for an agent to
// rewrite: a screen that reaches the network can fail in ways a redesign
// cannot be judged against. A host that wants live demo content should pass it
// in through the `real*` arguments, which is what they are for.

import { useThemeText } from 'recompose-react';

import type { ShowcaseClassInfo, ShowcaseReward, ShowcaseVideo } from './showcaseContent';
import { fillSlots } from './showcaseContent';
import { bundledClasses, bundledRewards, showcaseGroupFor } from './showcaseGroupDefaults';
import {
  SLOT_CLASS_NAMES,
  SLOT_CLASS_PHOTOS,
  SLOT_REWARD_NAMES,
  SLOT_VIDEO_THUMBS,
  SLOT_VIDEO_TITLES,
  slotAt,
} from './showcaseSlots';
import { bundledVideos } from './showcaseVideoDefaults';

/**
 * The four generated names for one of the three sets, in slot order.
 *
 * FOUR FIXED CALLS, NOT A LOOP, and that is the whole reason this helper
 * exists rather than a `.map`. `useThemeText` is a hook, so calling it once
 * per item would tie React's hook order to a list length — fine while every
 * list is four long, a crash the first time a feed is thirteen. Every set the
 * pipeline names is exactly four (`apps/combatden/app.yaml`), so unrolling is
 * both correct and honest about the constraint.
 *
 * Each falls back to the item's own shipped name, so an unthemed browser and a
 * theme that failed this slot's length bounds both render what they always did.
 */
function useFourNames(
  slots: readonly string[],
  fallbacks: readonly (string | undefined)[],
): readonly string[] {
  return [
    useThemeText(slots[0] ?? '', fallbacks[0] ?? ''),
    useThemeText(slots[1] ?? '', fallbacks[1] ?? ''),
    useThemeText(slots[2] ?? '', fallbacks[2] ?? ''),
    useThemeText(slots[3] ?? '', fallbacks[3] ?? ''),
  ];
}

/**
 * `named[i]` when it is a real string, else what the item already had.
 *
 * The guard matters because `useThemeText(slot, '')` returns `''` for a slot
 * the theme does not carry — and an empty title renders as a blank card rather
 * than as "no override", which is the opposite of what a fallback is for.
 */
function pickName(named: readonly string[], index: number, current: string): string {
  const value = named[index];
  return value === undefined || value === '' ? current : value;
}

/** What the phone renders: four class cards, four reward cards, and a video feed. */
export interface ShowcaseContent {
  readonly classes: readonly ShowcaseClassInfo[];
  readonly rewards: readonly ShowcaseReward[];
  readonly videos: readonly ShowcaseVideo[];
}

/**
 * The resolved content for `category` (`Fighting`, `Yoga`, … — the previewed
 * style's own bucket; null falls back to the default group).
 *
 * `realClasses` / `realRewards` / `realVideos` are the selected gym's own
 * content. They are always absent in this browser and are kept on the signature
 * because `fillSlots` is the shared rule: a host that DOES have a gym passes
 * them, and one real item then fills all four cards.
 *
 * VIDEOS DO NOT GO THROUGH `fillSlots`, and that is deliberate rather than an
 * omission. `fillSlots` exists because the schedule and the store are FIXED
 * FOUR-CARD layouts that a one-class gym would otherwise leave three-quarters
 * empty. A feed has no slots — it is however long it is — so repeating a single
 * video fourteen times would invent a feed rather than fill a layout, and the
 * genre carousels would all hold the same card. An empty real feed simply falls
 * through to the bundled one, which is the same rule minus the repeat.
 */
export function useShowcaseContent(
  category: string | null,
  realClasses?: readonly ShowcaseClassInfo[] | null,
  realRewards?: readonly ShowcaseReward[] | null,
  realVideos?: readonly ShowcaseVideo[] | null,
): ShowcaseContent {
  // `selectedGym.themeCategory ?? showcaseGroupFor(selectedGym.videoGymId)` —
  // and `showcaseGroupFor(null)` is the default group, so the key is never null.
  const key = category ?? showcaseGroupFor(null);
  const classes = fillSlots(realClasses, bundledClasses(key));
  const rewards = fillSlots(realRewards, bundledRewards(key));
  const videos =
    realVideos === null || realVideos === undefined || realVideos.length === 0
      ? bundledVideos(key)
      : realVideos;

  // The three name sets. Resolved HERE, beside the photo slots, because a
  // generated name and the generated picture it names are one claim about
  // what the thing is — the pipeline enforces that with `depends_on_text`,
  // and splitting them across two files is how they would drift apart.
  const classNames = useFourNames(SLOT_CLASS_NAMES, classes.map((c) => c.name));
  const rewardNames = useFourNames(SLOT_REWARD_NAMES, rewards.map((r) => r.title));
  const videoTitles = useFourNames(SLOT_VIDEO_TITLES, videos.map((v) => v.title));

  return {
    // The photo slot is stamped HERE, once, so every screen that renders this
    // class agrees on which image it uses.
    classes: classes.map((c, i) => ({
      ...c,
      name: pickName(classNames, i, c.name),
      themeSlot: slotAt(SLOT_CLASS_PHOTOS, i),
    })),
    rewards: rewards.map((r, i) => ({
      ...r,
      title: pickName(rewardNames, i, r.title),
    })),
    // The thumbnail CYCLES across the whole feed; the title does not. Four
    // photographs spread over fourteen cards read as a brand that owns four
    // good pictures — four titles spread the same way read as the same video
    // listed four times. So only the first four cards, the hero among them,
    // take generated copy, and the tail keeps what it shipped with.
    videos: videos.map((v, i) => ({
      ...v,
      title: i < videoTitles.length ? pickName(videoTitles, i, v.title) : v.title,
      themeSlot: slotAt(SLOT_VIDEO_THUMBS, i),
    })),
  };
}
