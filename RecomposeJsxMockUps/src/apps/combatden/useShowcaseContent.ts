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

import type { ShowcaseClassInfo, ShowcaseReward, ShowcaseVideo } from './showcaseContent';
import { fillSlots } from './showcaseContent';
import { bundledClasses, bundledRewards, showcaseGroupFor } from './showcaseGroupDefaults';
import { SLOT_CLASS_PHOTOS, slotAt } from './showcaseSlots';
import { bundledVideos } from './showcaseVideoDefaults';

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
  return {
    // The photo slot is stamped HERE, once, so every screen that renders this
    // class agrees on which image it uses.
    classes: fillSlots(realClasses, bundledClasses(key)).map((c, i) => ({
      ...c,
      themeSlot: slotAt(SLOT_CLASS_PHOTOS, i),
    })),
    rewards: fillSlots(realRewards, bundledRewards(key)),
    videos:
      realVideos === null || realVideos === undefined || realVideos.length === 0
        ? bundledVideos(key)
        : realVideos,
  };
}
