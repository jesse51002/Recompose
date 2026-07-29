// Ports ../../../../../CRM/lib/showcase/showcase_slots.dart.
//
// The slot manifest the showcase screens consume — the ids the pipeline keys
// its wire payload by, so the same loaded theme resolves identically here and
// in the member app. It is deliberately a SUBSET of the member app's own
// manifest: only what the nine preview screens render, so the engine's
// startup missing-slot warning stays scoped to what the phone actually shows.
//
// These are the lists ../App.tsx hands to <ThemeProvider>'s `expected*` props
// (the analogue of Dart passing `ShowcaseSlots.expected*` into
// `ThemeRuntime.initialize`). Nothing else in the app declares slots.

// ---- Colour slots ----
export const SLOT_PRIMARY = 'primary';
export const SLOT_BACKGROUND = 'background';
export const SLOT_TEXT = 'text';
export const SLOT_ACCENT = 'accent';

export const EXPECTED_COLORS: readonly string[] = Object.freeze([
  SLOT_PRIMARY,
  SLOT_BACKGROUND,
  SLOT_TEXT,
  SLOT_ACCENT,
]);

// ---- Image slots ----
export const SLOT_LOGO_PRIMARY = 'logo_primary';
export const SLOT_CELEBRATION_IMAGE = 'celebration_image';
export const SLOT_STREAK_ICON = 'streak_icon';
export const SLOT_GIFTBOX = 'giftbox';
export const SLOT_SINGLE_POINT = 'single_point';
export const SLOT_POINTS_STARS_IMAGE = 'points_stars_image';
export const SLOT_TROPHY_IMAGE = 'trophy_image';
export const SLOT_RANK_BELT = 'rank_belt';
// The belt of the rank ABOVE the member's current one — the pipeline derives it
// from `rank_belt` (`apps/combatden/app.yaml`, `depends_on: rank_belt`). It is
// generated for every theme and read by the real member app
// (`MobileApp/lib/core/app_slots.dart`), whose Profile screen is its only
// consumer; the preview did not render Profile, so the slot was produced and
// then displayed nowhere.
export const SLOT_NEXT_RANK_BELT_IMAGE = 'next_rank_belt_image';
export const SLOT_ICON_QRCODE = 'icon_qrcode';

export const EXPECTED_IMAGES: readonly string[] = Object.freeze([
  SLOT_LOGO_PRIMARY,
  SLOT_CELEBRATION_IMAGE,
  SLOT_STREAK_ICON,
  SLOT_GIFTBOX,
  SLOT_SINGLE_POINT,
  SLOT_POINTS_STARS_IMAGE,
  SLOT_TROPHY_IMAGE,
  SLOT_RANK_BELT,
  SLOT_NEXT_RANK_BELT_IMAGE,
  SLOT_ICON_QRCODE,
]);

// ---- Font slots ----
export const SLOT_FONT_DISPLAY = 'display';
export const SLOT_FONT_BODY = 'body';

export const EXPECTED_FONTS: readonly string[] = Object.freeze([
  SLOT_FONT_DISPLAY,
  SLOT_FONT_BODY,
]);

// ---- Text slots ----
export const SLOT_CLASS_BOOKED_HEADLINE = 'class_booked_headline';
export const SLOT_RESERVE_CTA = 'reserve_cta';
export const SLOT_BOOK_NEXT_CLASS_CTA = 'book_next_class_cta';
export const SLOT_WINS_TITLE = 'wins_title';
export const SLOT_WINS_SUBTITLE = 'wins_subtitle';

export const EXPECTED_TEXT: readonly string[] = Object.freeze([
  SLOT_CLASS_BOOKED_HEADLINE,
  SLOT_RESERVE_CTA,
  SLOT_BOOK_NEXT_CLASS_CTA,
  SLOT_WINS_TITLE,
  SLOT_WINS_SUBTITLE,
]);

// ---- Icon slots ----
export const SLOT_NAV_HOME = 'nav_home';
export const SLOT_NAV_RANK = 'nav_rank';
export const SLOT_NAV_REWARD = 'nav_reward';
export const SLOT_NAV_VIDEOS = 'nav_videos';

/**
 * Class photography and the reward catalogue — the generated imagery a schedule
 * row and a store card paint with.
 *
 * Assigned BY POSITION where the lists are built (see ./home/homeClass.ts and
 * ./rewards/mockPointsStore.ts) rather than threaded down as an index. A screen
 * that rearranges its rows must not have to re-derive which slot each one uses,
 * which is the same reasoning that keeps tap handlers off prop chains.
 */
export const SLOT_CLASS_PHOTOS: readonly string[] = Object.freeze([
  'class_photo_1',
  'class_photo_2',
  'class_photo_3',
  'class_photo_4',
]);

/** Cheapest-first, matching the order app.yaml declares them in. */
export const SLOT_REWARDS: readonly string[] = Object.freeze([
  'reward_guest_pass',
  'reward_apparel',
  'reward_gear',
  'reward_session',
]);

/** The slot for the item at `index`, cycling if a list runs longer than the set. */
export function slotAt(slots: readonly string[], index: number): string {
  return slots[index % slots.length]!;
}

export const EXPECTED_ICONS: readonly string[] = Object.freeze([
  SLOT_NAV_HOME,
  SLOT_NAV_RANK,
  SLOT_NAV_REWARD,
  SLOT_NAV_VIDEOS,
]);
