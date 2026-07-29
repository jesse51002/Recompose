// Every app this package ships, in the order a host should offer them.
//
// THE ONE FILE A NEW APP TOUCHES OUTSIDE ITS OWN FOLDER. `src/kit/` does not
// change, `dev/` does not change, and no existing app changes — a host reads
// this list and mounts what it finds, so it never names an app.
//
// CombatDen is first because it is the real one: the reference implementation
// the pipeline generates against and the engine's demo canvas. The café is a
// proof, deliberately kept small — see ./cafe/index.ts for what it does and
// does not claim to be.

import type { MockApp } from '../kit/registry';

import { CAFE_APP } from './cafe';
import { COMBATDEN_APP } from './combatden';

export const MOCK_APPS: readonly MockApp[] = Object.freeze([COMBATDEN_APP, CAFE_APP]);

/** One app by id, or `undefined`. */
export function findMockApp(id: string | null | undefined): MockApp | undefined {
  return id === null || id === undefined
    ? undefined
    : MOCK_APPS.find((app) => app.id === id);
}
