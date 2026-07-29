// Vinyasa Flow — a DESIGN FORK of ../combatden, for the theme produced at
// `apps/combatden/VinyasaFlow/`. Same two assets, same eleven screens, same
// element set; a different piece of design.
//
// What it argues is in ./layout_brief.yaml: the app as ONE UNBROKEN THREAD. A
// single terracotta line enters every screen at the brand mark, runs to the
// bottom edge without one break, and everything the app holds hangs on it — it
// bows sideways to gather a row of things and comes back, it crosses a
// photograph in linen white, and its last act at the foot is to loop through
// the four destinations. There are three forms in this app and no others: the
// line, the circle, and the photograph.
//
// This is the app-specific half of the package. Everything under ./ knows about
// gyms, classes, belts and points; nothing in ../../kit/ does. Adding a second
// app means a sibling folder and one more `defineMockApp`, not a change to the
// kit or to the host.

import { defineMockApp } from '../../kit/registry';

import { APP_ASSET } from './appAsset';
import { CELEBRATION_ASSET } from './celebrationAsset';

export const VINYASAFLOW_APP = defineMockApp({
  id: 'vinyasaflow',
  label: 'Vinyasa Flow',
  // The app first: it is the one a reviewer opens by default, and the
  // celebration only makes sense as something that happens after it.
  assets: [APP_ASSET, CELEBRATION_ASSET],
});
