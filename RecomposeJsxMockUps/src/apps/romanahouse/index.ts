// Romana House Pilates — a DESIGN FORK of ../combatden, for the theme produced
// at `apps/combatden/ReformerClassical/`. Same two assets, same eleven screens,
// same element set; a different piece of design.
//
// What it argues is in ./layout_brief.yaml: the app as the studio's apparatus
// chart — a walnut rail down the left edge carrying the mark and the four
// destinations, an ivory sheet beside it structured by scribed rules rather
// than by cards, and the largest thing on any screen being a number.
//
// This is the app-specific half of the package. Everything under ./ knows about
// gyms, classes, belts and points; nothing in ../../kit/ does. Adding a second
// app means a sibling folder and one more `defineMockApp`, not a change to the
// kit or to the host.

import { defineMockApp } from '../../kit/registry';

import { APP_ASSET } from './appAsset';
import { CELEBRATION_ASSET } from './celebrationAsset';

export const ROMANAHOUSE_APP = defineMockApp({
  id: 'romanahouse',
  label: 'Romana House',
  // The app first: it is the one a reviewer opens by default, and the
  // celebration only makes sense as something that happens after it.
  assets: [APP_ASSET, CELEBRATION_ASSET],
});
