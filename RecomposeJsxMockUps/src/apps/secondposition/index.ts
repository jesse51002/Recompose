// Second Position Ballet — a redesign of CombatDen's two assets, built for the
// theme produced at `apps/combatden/AdultBallet/`.
//
// Same six app routes and same five celebration cards as the base, because the
// asset and route sets are the thing a fork may not change. What differs is the
// design: read ./layout_brief.yaml, which is the direction this folder was
// built from and the authority on every choice in it.

import { defineMockApp } from '../../kit/registry';

import { APP_ASSET } from './appAsset';
import { CELEBRATION_ASSET } from './celebrationAsset';

export const SECONDPOSITION_APP = defineMockApp({
  id: 'secondposition',
  label: 'Second Position Ballet',
  // The app first: it is the one a reviewer opens by default, and the
  // celebration only makes sense as something that happens after it.
  assets: [APP_ASSET, CELEBRATION_ASSET],
});
