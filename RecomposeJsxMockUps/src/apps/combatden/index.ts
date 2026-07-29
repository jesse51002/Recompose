// CombatDen's assets — the app you click through, and the celebration that
// plays after a class.
//
// This is the app-specific half of the package. Everything under ./ knows about
// gyms, classes, belts and points; nothing in ../../kit/ does. Adding a second
// app means a sibling folder and one more `defineMockApp`, not a change to the
// kit or to the host.

import { defineMockApp } from '../../kit/registry';

import { APP_ASSET } from './appAsset';
import { CELEBRATION_ASSET } from './celebrationAsset';

export const COMBATDEN_APP = defineMockApp({
  id: 'combatden',
  label: 'CombatDen',
  // The app first: it is the one a reviewer opens by default, and the
  // celebration only makes sense as something that happens after it.
  assets: [APP_ASSET, CELEBRATION_ASSET],
});
