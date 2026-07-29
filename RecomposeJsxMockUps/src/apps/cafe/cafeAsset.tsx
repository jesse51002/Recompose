// The café's one asset: the ordering flow you click through.
//
// ONE asset, not three screens behind a picker, because every screen here is
// reachable by tapping something — a menu card opens an item, adding one
// returns to the menu, the basket bar opens the order. The package's rule is
// that a second asset needs a screen that genuinely CANNOT be reached that way,
// and this app has none.
//
// AUTHORED AT 402x874, NOT CombatDen's 390x844. That is deliberate: the stage
// computes `min(w/W, h/H)` against whatever an asset declares, so two apps at
// two different device sizes are the cheapest proof that the size is the
// asset's property and not the kit's assumption.

import { defineMockAsset } from '../../kit/asset';

import { CafeSurface } from './CafeSurface';
import { ItemScreen } from './ItemScreen';
import { MenuScreen } from './MenuScreen';
import { OrderScreen } from './OrderScreen';
import { ROUTE_ITEM, ROUTE_MENU, ROUTE_ORDER } from './routes';

export const CAFE_ASSET = defineMockAsset({
  id: 'order',
  label: 'Order',
  description:
    'The café app: scan the menu, open an item, add it to the order and place it.',
  width: 402,
  height: 874,
  routes: {
    [ROUTE_MENU]: MenuScreen,
    [ROUTE_ITEM]: ItemScreen,
    [ROUTE_ORDER]: OrderScreen,
  },
  initialRoute: ROUTE_MENU,
  provider: CafeSurface,
});
