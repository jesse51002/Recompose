// SYNTHETIC, like everything beside it in this folder. There are no customers
// and no layouts; this exists so the Layouts page has something to draw.
//
// **What this page argues.** Layout is code and theme is data, so they scale
// differently: a theme is generated per tenant and costs a run, while a layout
// is written by an agent and has to be MAINTAINED — re-derived every time the
// platform ships. Uncapped, that is one branch per tenant forever. Capped, it
// is a fixed number of arrangements that many tenants share, each wearing its
// own brand. The cap is therefore not a limitation the platform tolerates; it
// is the thing that makes the model survive scale, and this page exists to
// make that visible rather than argued.
//
// The tenants are the fleet's own rows, so the two pages cannot disagree about
// who exists.

import { FLEET, type FleetApp } from './fleetFixtures';

/** How few and how many layouts the demo lets you drag between. */
export const MIN_LAYOUTS = 2;
/**
 * A HUNDRED, which is the uncapped end of the argument made visible.
 *
 * The low end shows a handful of arrangements dressing every tenant; the high
 * end shows what happens without a cap — a hundred columns to maintain, most
 * of them holding three logos. Both ends are the point, and the slider is only
 * persuasive if it can actually reach the bad one.
 */
export const MAX_LAYOUTS = 100;
/** Where the page opens. Low, because the low end is the claim. */
export const DEFAULT_LAYOUTS = 6;

/**
 * How many tenants the board draws.
 *
 * The fleet has thirty-two rows, which is a fleet and not a platform. This
 * page's whole subject is behaviour AT SCALE, and thirty-two logos across a
 * hundred columns would show empty columns rather than shared ones — so the
 * fleet's marks are cycled to fill a plausible tenant count.
 *
 * **The repetition is deliberate and unhidden.** These are the same logos the
 * pipeline actually produced, reused; the page says so on its own surface. A
 * board of invented marks would be a bigger lie than a board of repeated real
 * ones, and the thing being demonstrated is the arrangement, not the roster.
 */
export const TENANT_COUNT = 300;

/**
 * The pool of layout names, longest-lived first.
 *
 * Named for what the ARRANGEMENT does, never for a tenant — the whole point is
 * that no layout belongs to anybody. A layout called "Apex MMA" would be a
 * design fork wearing a different word.
 */
const NAMES: readonly string[] = Object.freeze([
  'Schedule-first',
  'Studio hero',
  'Progress-led',
  'Booking-forward',
  'Community feed',
  'Minimal card',
  'Coach spotlight',
  'Class grid',
]);

export interface Layout {
  readonly name: string;
  readonly tenants: readonly FleetApp[];
}

/**
 * A layout's name.
 *
 * The pool is named for what the ARRANGEMENT does; past it, numbered. A
 * hundred hand-written names would be a hundred inventions nobody reads, and
 * "Layout 41" is the honest label for a column that exists to be counted.
 */
function layoutName(index: number): string {
  return NAMES[index] ?? `Layout ${String(index + 1)}`;
}

/** The tenant roster, the fleet's real marks cycled to `TENANT_COUNT`. */
const TENANTS: readonly FleetApp[] = Object.freeze(
  Array.from({ length: TENANT_COUNT }, (_, i) => FLEET[i % FLEET.length]!),
);

/**
 * Deal every tenant across `count` layouts.
 *
 * **Round-robin rather than chunked**, and that is the demo: dealing means
 * moving the cap re-packs every column at once, so dragging from eight to
 * three visibly gathers tenants together instead of merely truncating a list.
 * Chunking would leave the first columns untouched and show nothing.
 *
 * Deterministic — no shuffle, no clock — so the same cap always draws the same
 * board and a demo cannot surprise the person giving it.
 */
export function dealLayouts(count: number): readonly Layout[] {
  const capped = Math.min(Math.max(count, MIN_LAYOUTS), MAX_LAYOUTS);
  return Object.freeze(
    Array.from({ length: capped }, (_, column) => ({
      name: layoutName(column),
      tenants: TENANTS.filter((_, index) => index % capped === column),
    })),
  );
}
