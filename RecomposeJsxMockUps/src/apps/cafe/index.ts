// The café — the SECOND app, and the proof that a second app is a folder.
//
// Nothing in `src/kit/` changed to make this exist, and nothing in
// `src/apps/combatden/` did either. It brings its own token vocabulary
// (`--cafe-*`, not `--sc-*`), its own device size, its own layout language and
// its own state. What it shares with CombatDen is the mechanism only:
// `defineMockAsset`, `defineMockApp`, `useMockNav`, `MockAssetStage`, and the
// `recompose-react` resolvers.
//
// WHAT IT IS NOT: a pipeline app. There is no `apps/cafe/app.yaml` in the
// engine, so it resolves only the universal slot ids every brand manifest
// declares — the four colour roles and the two font roles (./cafeSlots.ts).
// That is enough to prove theming crosses the app boundary, and it is why
// every picture on these screens is drawn from the palette rather than
// bundled: nothing here can look themed while quietly rendering a fixed asset.

import { defineMockApp } from '../../kit/registry';

import { CAFE_ASSET } from './cafeAsset';

export const CAFE_APP = defineMockApp({
  id: 'cafe',
  label: 'Café',
  assets: [CAFE_ASSET],
});
