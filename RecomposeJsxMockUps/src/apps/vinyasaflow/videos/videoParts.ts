// No Dart counterpart — this is the web's stand-in for `find.byType(...)`.
//
// `MobileApp/test/videos_invariants_test.dart` proves the arrangement-only
// invariant by counting WIDGET TYPES in the rendered tree: one
// `FeaturedVideoCard`, one `VideoCarouselSection` per genre, one
// `VideoViewAllAction` per genre, a card for every video. React has no
// equivalent — a rendered tree is DOM, and a CSS-module class name is a
// build-time hash that says nothing about which component wrote it — so each
// component stamps its identity onto its root element as `data-sc-part`.
//
// They are INSTRUMENTATION, not styling: no stylesheet in this island selects
// on them, and nothing here may become load-bearing markup.
//
// THE LIST IS SHORTER THAN THE BASE'S, BY EXACTLY WHAT THIS FORK DELETED. The
// four section shapes and four card sizes are gone (./VideoCarouselSection.tsx),
// and `thumb` went with the frame becoming ../shell/Photo.tsx's — the shell
// owns the image element and forwards no attributes onto it, and wrapping a
// picture in a span purely to keep a hook would be markup added for
// instrumentation's sake.
// A name kept here that nothing stamps is the same stale-doc failure the
// guardrails warn about, so it is removed rather than left.

/** The attribute each videos component stamps its identity on. */
export const PART_ATTR = 'data-sc-part';

/** One value per component whose presence the inventory pins. */
export const VIDEO_PARTS = Object.freeze({
  /** `VideoCategoryTabs` — the scope filter, as beads on the bow. */
  categoryTabs: 'category-tabs',
  /** One scope — "All" plus one per genre. */
  categoryPill: 'category-pill',
  /** `FeaturedVideoCard` — the hero. */
  featured: 'featured-video',
  /** The hero's "Play" action. */
  featuredPlay: 'featured-play',
  /** `VideoReccCard` — the frame and the words inside the hero. */
  reccCard: 'recc-card',
  /** `VideoCarouselSection` — one shelf per genre. */
  section: 'video-section',
  /** A shelf's own spoken name. */
  sectionTitle: 'section-title',
  /** `VideoViewAllAction` — one per shelf. */
  viewAll: 'view-all',
  /** `VideoCarouselCard` — one per video. */
  card: 'video-card',
  /** Every rendered creator avatar (absent by design when the URL is blank). */
  avatar: 'creator-avatar',
  /** `VideosFeedStatus` — the reason there is nothing to arrange. */
  feedStatus: 'feed-status',
});
