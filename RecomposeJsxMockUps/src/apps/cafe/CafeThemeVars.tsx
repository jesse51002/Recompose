// Writes the `--cafe-*` surface onto one element. The analogue of
// ../combatden/ShowcaseThemeVars.tsx, and the same division of labour: this
// component subscribes to the theme, resolves the whole token set once, and
// every stylesheet below reads `var(--cafe-…)` and nothing else.
//
// The font hooks are why this is a component at all. `useThemeFontFamily`
// resolves the slot AND injects the family's Google Fonts stylesheet — naming a
// family in `font-family` does nothing on the web until that stylesheet is in
// the document, so this is the call that makes a theme's type real rather than
// a string nobody can render.

import type { CSSProperties, ReactNode } from 'react';
import { useThemeFontFamily, useThemeSnapshot } from 'recompose-react';

import { SLOT_FONT_BODY, SLOT_FONT_DISPLAY } from './cafeSlots';
import { FALLBACK_FONT_FAMILY, cafeCssVars, cafeStyle } from './cafeTokens';

export interface CafeThemeVarsProps {
  children: ReactNode;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

export function CafeThemeVars({ children, className, style }: CafeThemeVarsProps) {
  // Subscribes to theme changes; the colour values themselves are read by
  // `cafeCssVars` through the non-hook resolvers.
  useThemeSnapshot();
  const displayFamily = useThemeFontFamily(SLOT_FONT_DISPLAY, FALLBACK_FONT_FAMILY);
  const bodyFamily = useThemeFontFamily(SLOT_FONT_BODY, FALLBACK_FONT_FAMILY);

  return (
    <div className={className} style={cafeStyle(cafeCssVars(displayFamily, bodyFamily), style)}>
      {children}
    </div>
  );
}
