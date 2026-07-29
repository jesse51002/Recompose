// recompose-jsx-mockups — the public entry, and the ONLY export surface.
//
// These are the feature-free mock screens: no business logic, no API calls, no
// state. They exist to be looked at and edited — the design agent works on them
// and ../RecomposeStudio previews them.
//
// This package is an ISLAND. It may import from `recompose-react` (the theme
// runtime) and from itself, and from nothing else. That rule predates the split
// and is why `cx` is duplicated here rather than shared: see ./cx.ts.

export * from './showcaseSlots';
export * from './showcaseScreen';
export * from './showcaseContent';
