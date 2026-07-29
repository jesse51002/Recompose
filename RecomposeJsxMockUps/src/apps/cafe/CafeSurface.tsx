// The asset's ROOT: the element every `--cafe-*` token lands on, plus the
// order state its screens read.
//
// SAME SHAPE AS ../combatden/CombatDenSurface.tsx, and the same warning
// applies. CSS custom properties do not fall back — with no ancestor defining
// them they resolve to NOTHING, not to a default — so if this component is ever
// removed from the tree the screens do not degrade, they render unstyled: type
// drops to the browser default and every padding collapses. That has already
// happened once in this package.

import type { ReactNode } from 'react';

import { CafeOrderProvider } from './cafeOrder';
import styles from './CafeSurface.module.css';
import { CafeThemeVars } from './CafeThemeVars';

export function CafeSurface({ children }: { children: ReactNode }) {
  return (
    <CafeOrderProvider>
      <CafeThemeVars className={styles.root}>{children}</CafeThemeVars>
    </CafeOrderProvider>
  );
}
