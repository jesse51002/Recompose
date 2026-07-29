// The asset's route ids, in their own module so a screen can import one
// without importing the asset that mounts it.
//
// Same reasoning as ../combatden/appAsset.tsx exporting its route ids: a tap
// target lives where the affordance is and reaches navigation by importing a
// constant, never by receiving a callback threaded down through layout. A
// callback chain is exactly the prop plumbing a design agent breaks when it
// rearranges a screen; an imported constant survives any arrangement.
//
// They are here rather than on the asset because the asset imports the screens
// and the screens import these — putting them on the asset would make that a
// cycle.

export const ROUTE_MENU = 'menu';
export const ROUTE_ITEM = 'item';
export const ROUTE_ORDER = 'order';
