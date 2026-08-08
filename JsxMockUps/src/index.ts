// recompose-jsx-mockups — the public entry, and the ONLY export surface.
//
// The feature-free mock screens: no business logic, no API calls, no data
// fetching. They exist to be looked at and edited — a design agent works on
// them and ../Studio nests them live.
//
// TWO HALVES. `./kit` is app-agnostic and knows nothing about any product: the
// asset contract, an in-memory navigation stack, a registry, and the stage that
// scales an asset to fit. `./apps/<app_id>` is one product's screens and the
// assets built from them. A host mounts an asset from a registry and never
// imports a screen.
//
// This package is an ISLAND. It may import from `recompose-react` (the theme
// runtime) and from itself, and from nothing else. That rule predates the
// package split and is why `cx` and `useElementSize` are duplicated here rather
// than shared: see ./apps/combatden/cx.ts and ./kit/useElementSize.ts.

// --- The kit: how any app's assets are described, navigated and displayed ---
export { defineMockAsset, aspectRatio } from './kit/asset';
export type { MockAsset, MockAssetProvider, MockRoutes } from './kit/asset';
export { MockAssetStage } from './kit/MockAssetStage';
export type { MockAssetFit, MockAssetStageProps } from './kit/MockAssetStage';
export { MockNavProvider, useMockNav } from './kit/MockNav';
export type { MockNav } from './kit/MockNav';
export { defineMockApp, findMockAsset, mockAssetOrFirst } from './kit/registry';
export type { MockApp } from './kit/registry';

// --- The apps ---
// `MOCK_APPS` is what a host should read: it lists every app without naming
// one, so a new app is a folder plus a line in ./apps/index.ts and no host
// changes. The individual exports below are for a host that genuinely wants a
// specific app — the studio nests CombatDen's assets by name.
export { MOCK_APPS, findMockApp } from './apps';
export { COMBATDEN_APP } from './apps/combatden';
export { AppContentProvider, useAppContent } from './apps/combatden/appContent';
export type { AppContent, AppContentProviderProps } from './apps/combatden/appContent';

// --- The slot manifest and demo content the studio's other views read ---
export * from './apps/combatden/showcaseSlots';
export * from './apps/combatden/showcaseContent';
