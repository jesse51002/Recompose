// The Profile screen's element list, stamped into the DOM.
//
// WHAT THIS USED TO BE, AND WHY IT IS NOT THAT ANY MORE. The base carried five
// `rank_format` arrangements and this file was their invariant gate: each part
// stamped a `data-rank-part` so a test could count them and prove that picking
// a different arrangement added, dropped and multiplied nothing. This fork has
// ONE arrangement, because this package has no layout presets at all
// (../../../CLAUDE.md: "layout and animation are changed by editing the layout
// and the animation"), so the five formats are gone and the gate they needed
// went with them. There is no `rankFormats.test.tsx` here.
//
// WHAT IT IS NOW. The same list, doing the other half of the same job: it is
// this screen's INVENTORY, made answerable from the DOM. `mockup-qa` checks a
// render against the app's inventory in both directions — nothing missing,
// nothing extra — and these attributes are how each element says "I am here"
// without a class name. A class name cannot do it: `test.css` defaults to false
// under vitest, so a `.module.css` import returns `''` and every class-based
// query passes vacuously against nothing (../../../CLAUDE.md, "Things that will
// bite").
//
// The attributes stay inert. No styling reads them and no behaviour branches on
// them.
//
// TWO IDS THE BASE HAD ARE GONE, and both because the element moved rather than
// because it was dropped (a doc that outlives its truth is the exact shape of
// the bug it warns about):
//
//   * `topbar` — the screen's chrome is now ../shell/Masthead.tsx, composed as
//     the `Screen`'s `head`. Every screen in this app shares it, and stamping a
//     profile-specific attribute onto shared chrome would be this folder
//     reaching outside itself.
//   * `nextRankTitle` — the heading is now ../shell/Section.tsx's own `label`,
//     which takes a STRING and draws the element itself. There is nothing here
//     to stamp, and rendering a second heading purely to carry an attribute
//     would put the words on the screen twice.

export const RANK_PART = Object.freeze({
  /** `RankStreakHero` — the streak statement, rationed to exactly one. */
  streakHero: 'streakHero',
  /** `RankHeader` — the CURRENT rank: belt art, name, sub-rank name. */
  rankHeader: 'rankHeader',
  /** The current rank's belt art (`rank_belt`). */
  rankBelt: 'rankBelt',
  /** `RatingGraph` — the plot. */
  ratingGraph: 'ratingGraph',
  /** One range of the timeframe scale. There are always four. */
  timeframePill: 'timeframePill',
  /** `NextRankBadge` — the next rank's belt art (`next_rank_belt_image`). */
  nextRankBadge: 'nextRankBadge',
  /** `NextRankProgress` — the ring measuring the way to that belt. */
  nextRankProgress: 'nextRankProgress',
  /** `NextRankProgressLabel` — the one place the screen says what it counts. */
  nextRankProgressLabel: 'nextRankProgressLabel',
  /** `LevelUpVideosSection` — the shelf that feeds the loop back to content. */
  levelUpVideos: 'levelUpVideos',
} as const);

export type RankPart = (typeof RANK_PART)[keyof typeof RANK_PART];
