// Every app this package ships, in the order a host should offer them.
//
// THE ONE FILE A NEW APP TOUCHES OUTSIDE ITS OWN FOLDER. `src/kit/` does not
// change, `dev/` does not change, and no existing app changes — a host reads
// this list and mounts what it finds, so it never names an app.
//
// CombatDen's base layout is first: the reference implementation the pipeline
// generates against, and what every redesign forks from. A redesigned variant
// is a sibling folder with its own id, registered here.

import type { MockApp } from '../kit/registry';

import { COMBATDEN_APP } from './combatden';
import { MILEMARKER_APP } from './milemarker';
import { ROMANAHOUSE_APP } from './romanahouse';
import { ZENBJJ_APP } from './zenbjj';

export const MOCK_APPS: readonly MockApp[] = Object.freeze([
  COMBATDEN_APP,
  ZENBJJ_APP,
  ROMANAHOUSE_APP,
  MILEMARKER_APP,
]);

/** One app by id, or `undefined`. */
export function findMockApp(id: string | null | undefined): MockApp | undefined {
  return id === null || id === undefined
    ? undefined
    : MOCK_APPS.find((app) => app.id === id);
}
