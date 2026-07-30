// No Dart counterpart, and the reason it exists is a language difference, not a
// design one.
//
// `rank_format` may change ARRANGEMENT ONLY: no element of the screen is added,
// dropped, or multiplied by picking a different value. Flutter checks that
// mechanically — `MobileApp/test/rank_invariants_test.dart` pumps every value
// of the enum and diffs the component multiset with `find.byType(...)`, because
// a widget carries its own type into the tree.
//
// A DOM node carries no such thing. CSS Module class names would be the obvious
// stand-in and are unusable: `test.css` defaults to false under vitest, so a
// `.module.css` import returns `''` and every class-based query would pass
// vacuously against nothing (see ../../../CLAUDE.md, "Things that will bite").
//
// So each part of this screen stamps its identity as a `data-rank-part`, and
// ./__tests__/rankFormats.test.tsx counts those exactly as the Dart test counts
// widget types. The attributes are inert — no styling reads them and no
// behaviour branches on them — but they are load-bearing for the one property
// that makes the whole layout-format idea sellable, so they are not test-only
// decoration to be stripped.

// TWO IDS THE BASE HAD ARE GONE, AND BOTH BECAUSE THIS FORK MOVED THE ELEMENT
// INTO THE SHARED SHELL RATHER THAN BECAUSE IT DROPPED ONE (../../../CLAUDE.md:
// a doc that outlives its truth is the exact shape of the bug it warns about):
//
//   * `topbar` — the screen's chrome is now ../shell/Head.tsx, composed as the
//     `Screen`'s `head`. It is shared by every screen in the app and stamping a
//     profile-specific attribute on it would be this folder reaching outside
//     itself.
//   * `nextRankTitle` — a region announces itself through ../shell/Thread.tsx's
//     `<Region label>`, which takes the label as a STRING and draws it itself.
//     There is no element here to stamp, and rendering a second heading purely
//     to carry an attribute would put the words on the screen twice.

export const RANK_PART = Object.freeze({
  /** `RankStreakHero` — the streak statement, rationed to exactly one. */
  streakHero: 'streakHero',
  /** `RankHeader` — the CURRENT rank: belt art, name, sub-rank name. */
  rankHeader: 'rankHeader',
  /** The current rank's belt art (`rank_belt`). */
  rankBelt: 'rankBelt',
  /** `RatingGraph` — the plot. */
  ratingGraph: 'ratingGraph',
  /** One range chip. There are always four. */
  timeframePill: 'timeframePill',
  /** `NextRankBadge` — the next rank's belt art (`next_rank_belt_image`). */
  nextRankBadge: 'nextRankBadge',
  /** `NextRankProgress` — the ring the thread winds around. */
  nextRankProgress: 'nextRankProgress',
  /** `NextRankProgressLabel` — the one place the screen says what it counts. */
  nextRankProgressLabel: 'nextRankProgressLabel',
  /** `LevelUpVideosSection` — the shelf that feeds the loop back to content. */
  levelUpVideos: 'levelUpVideos',
} as const);

export type RankPart = (typeof RANK_PART)[keyof typeof RANK_PART];
