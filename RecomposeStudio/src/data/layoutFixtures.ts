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
export const MAX_LAYOUTS = 8;
/** Where the page opens. Mid-range, so the slider has somewhere to go both ways. */
export const DEFAULT_LAYOUTS = 5;

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
    NAMES.slice(0, capped).map((name, column) => ({
      name,
      tenants: FLEET.filter((_, index) => index % capped === column),
    })),
  );
}
