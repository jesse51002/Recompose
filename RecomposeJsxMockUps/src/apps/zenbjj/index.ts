// Zen BJJ — a REDESIGN of ../combatden, and a sibling of it.
//
// Same two assets, same screens, same element set: everything the base carries
// is here, rearranged. A redesign never edits the base — it is copied to a
// folder of its own, redesigned there, and registered in ../index.ts, which is
// the same shape as the engine's two fork layers (a shared tokenised base, then
// one design fork per design).
//
// What this fork changes is ARRANGEMENT ONLY: hierarchy, density, rhythm,
// spacing and motion. It hard-codes no colour, no font and no type size — those
// come from the pipeline through the `--sc-*` tokens, exactly as in the base.
// ./layout_brief.yaml says what the arrangement is trying to say.

import { defineMockApp } from '../../kit/registry';

import { APP_ASSET } from './appAsset';
import { CELEBRATION_ASSET } from './celebrationAsset';

export const ZENBJJ_APP = defineMockApp({
  id: 'zenbjj',
  label: 'Zen BJJ',
  // The app first: it is the one a reviewer opens by default, and the
  // celebration only makes sense as something that happens after it.
  assets: [APP_ASSET, CELEBRATION_ASSET],
});
