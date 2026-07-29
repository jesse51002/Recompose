// The `--cafe-*` token surface. The analogue of ../combatden/showcaseTokens.ts,
// and pointedly NOT the same vocabulary.
//
// THAT IS THE WHOLE POINT OF THIS FILE. `--sc-*` is CombatDen's design
// language: `--sc-radius-big` is 32 because a gym app's cards are that round.
// This app is a café, its cards are 14, and its type ramp is a different shape.
// If a second app could only be built by reusing the first app's tokens, the
// split into `kit/` and `apps/` would be decoration — the kit would be carrying
// one product's taste. So this file exists to prove the opposite: a new app
// brings its own measurements, its own names, and shares nothing but the
// mechanism.
//
// Brandable values resolve LIVE through the library's NON-HOOK resolvers, which
// is what lets this be a plain module rather than a hook. The hardcoded values
// are this app's own fallbacks, used only when no theme has loaded.

import type { CSSProperties } from 'react';
import type { Rgba } from 'recompose-react';
import { fontStack, rgba, themeColor, toCss, withAlpha } from 'recompose-react';

import { SLOT_ACCENT, SLOT_BACKGROUND, SLOT_PRIMARY, SLOT_TEXT } from './cafeSlots';

/** Used when nothing has loaded — a warm, light café palette. */
const FALLBACK_PRIMARY: Rgba = rgba(0x8c, 0x52, 0x2b);
const FALLBACK_BACKGROUND: Rgba = rgba(0xfa, 0xf5, 0xef);
const FALLBACK_TEXT: Rgba = rgba(0x2a, 0x21, 0x1a);
const FALLBACK_ACCENT: Rgba = rgba(0x3f, 0x6b, 0x50);

/** Loaded by `useThemeFontFamily` when the theme names no family. */
export const FALLBACK_FONT_FAMILY = 'Fraunces';

export function primary(): Rgba {
  return themeColor(SLOT_PRIMARY, FALLBACK_PRIMARY);
}
export function background(): Rgba {
  return themeColor(SLOT_BACKGROUND, FALLBACK_BACKGROUND);
}
export function text(): Rgba {
  return themeColor(SLOT_TEXT, FALLBACK_TEXT);
}
export function accent(): Rgba {
  return themeColor(SLOT_ACCENT, FALLBACK_ACCENT);
}

/**
 * The measurements. A café menu, not a gym schedule: tighter radii, a wider
 * type ramp, and a grid gutter rather than a list rhythm.
 */
export const CAFE = Object.freeze({
  radiusCard: 14,
  radiusPill: 999,
  gutter: 20,
  gap: 12,
  gridGap: 14,
  barHeight: 60,
});

/**
 * The `--cafe-*` custom properties, resolved once and written onto one element
 * by ./CafeThemeVars.tsx.
 *
 * The two font families arrive as ARGUMENTS rather than being read here,
 * because loading a web font is an effect: naming a family in `font-family`
 * does nothing until its stylesheet is in the document, and only the hook can
 * do that. Same division as ../combatden/ShowcaseThemeVars.tsx.
 */
export function cafeCssVars(
  displayFamily: string,
  bodyFamily: string,
): Record<string, string> {
  const ink = text();
  const surface = background();
  return {
    '--cafe-primary': toCss(primary()),
    '--cafe-bg': toCss(surface),
    '--cafe-ink': toCss(ink),
    '--cafe-accent': toCss(accent()),
    // Derived rather than declared: a café card is the page a shade deeper, and
    // a second colour slot for it would be a slot every brand has to think
    // about for no gain.
    '--cafe-card': toCss(withAlpha(ink, 0.05)),
    '--cafe-line': toCss(withAlpha(ink, 0.12)),
    '--cafe-ink-soft': toCss(withAlpha(ink, 0.62)),
    '--cafe-on-primary': toCss(surface),

    '--cafe-radius-card': `${String(CAFE.radiusCard)}px`,
    '--cafe-radius-pill': `${String(CAFE.radiusPill)}px`,
    '--cafe-gutter': `${String(CAFE.gutter)}px`,
    '--cafe-gap': `${String(CAFE.gap)}px`,
    '--cafe-grid-gap': `${String(CAFE.gridGap)}px`,
    '--cafe-bar-height': `${String(CAFE.barHeight)}px`,

    '--cafe-font-display': fontStack(displayFamily),
    '--cafe-font-body': fontStack(bodyFamily),

    // Type: shorthands, so one `font:` declaration carries the whole ramp.
    // `/normal` is spelled explicitly for the reason the showcase ramp spells
    // it — an unset line-height is the font's own metrics, not a number.
    '--cafe-type-hero': '600 30px/1.15 var(--cafe-font-display)',
    '--cafe-type-title': '600 19px/1.25 var(--cafe-font-display)',
    '--cafe-type-item': '600 15px/1.3 var(--cafe-font-body)',
    '--cafe-type-body': '400 14px/1.45 var(--cafe-font-body)',
    '--cafe-type-meta': '400 12px/normal var(--cafe-font-body)',
    '--cafe-type-price': '600 14px/normal var(--cafe-font-body)',
  };
}

/** The vars as a style object, with a caller's own style merged after. */
export function cafeStyle(
  vars: Record<string, string>,
  style?: CSSProperties | undefined,
): CSSProperties {
  return { ...vars, ...style } as CSSProperties;
}
