// Mile Marker Run Club — a DESIGN FORK of ../combatden, for the theme produced
// at `apps/combatden/RunClub/`. Same two assets, same eleven screens, same
// element set; a different piece of design.
//
// What it argues is in ./layout_brief.yaml: the app as the road seen from the
// start line — every screen split by a HORIZON, with an open field of sky above
// it carrying the one live fact of that screen knocked out at 60px, a
// lane-striped ground below it that is the only thing that scrolls, and the
// finish tape laid across the foot as the primary navigation.
//
// This is the app-specific half of the package. Everything under ./ knows about
// gyms, classes, belts and points; nothing in ../../kit/ does. Adding a second
// app means a sibling folder and one more `defineMockApp`, not a change to the
// kit or to the host.

import { defineMockApp } from '../../kit/registry';

import { APP_ASSET } from './appAsset';
import { CELEBRATION_ASSET } from './celebrationAsset';

export const MILEMARKER_APP = defineMockApp({
  id: 'milemarker',
  label: 'Mile Marker',
  // The app first: it is the one a reviewer opens by default, and the
  // celebration only makes sense as something that happens after it.
  assets: [APP_ASSET, CELEBRATION_ASSET],
});
