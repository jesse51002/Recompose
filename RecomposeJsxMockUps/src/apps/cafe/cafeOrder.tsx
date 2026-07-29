// The asset's shared state: which item is open, and what is in the basket.
//
// Held here rather than in a screen for the reason ../combatden/appContent.tsx
// gives: a screen is unmounted the moment you navigate away, so state that has
// to survive the trip — the item you tapped, the order you built — cannot live
// in one.

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { CafeItem } from './cafeMenu';
import { itemOrFirst } from './cafeMenu';

export interface CafeOrder {
  /** The item the customer opened from the menu. */
  readonly openItem: CafeItem;
  readonly openItemNamed: (id: string) => void;
  /** What they have added, in the order they added it. */
  readonly basket: readonly CafeItem[];
  readonly addToBasket: (item: CafeItem) => void;
  readonly clearBasket: () => void;
  readonly total: string;
}

const CafeOrderContext = createContext<CafeOrder | null>(null);

export function CafeOrderProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [basket, setBasket] = useState<readonly CafeItem[]>([]);

  const openItemNamed = useCallback((id: string) => {
    setOpenId(id);
  }, []);
  const addToBasket = useCallback((item: CafeItem) => {
    setBasket((current) => [...current, item]);
  }, []);
  const clearBasket = useCallback(() => {
    setBasket([]);
  }, []);

  const openItem = useMemo(() => itemOrFirst(openId), [openId]);
  const total = useMemo(
    () => basket.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2),
    [basket],
  );

  const value = useMemo<CafeOrder>(
    () => ({ openItem, openItemNamed, basket, addToBasket, clearBasket, total }),
    [openItem, openItemNamed, basket, addToBasket, clearBasket, total],
  );
  return <CafeOrderContext.Provider value={value}>{children}</CafeOrderContext.Provider>;
}

/**
 * Throws outside the provider rather than returning empties, for the same
 * reason `useAppContent` does: a screen rendered with no state silently shows
 * the default and looks like it is working.
 */
export function useCafeOrder(): CafeOrder {
  const order = useContext(CafeOrderContext);
  if (order === null) {
    throw new Error(
      'useCafeOrder must be used inside a <CafeOrderProvider>. A screen is ' +
        'being rendered outside the asset that supplies its state.',
    );
  }
  return order;
}
