// Ports ../../../../../CRM/lib/showcase/showcase_tokens.dart (`ShowcaseTokens`).
//
// THE SECOND TOKEN SYSTEM. This is a live-resolved mirror of the MEMBER app's
// `DesignConstants` — the phone's own design language — and it is NOT the admin
// chrome's token set. The two share token NAMES with different VALUES:
// `radiusBig` is **32** here and **12** in ../tokens/adminTokens.ts. They live
// in separate modules and separate CSS-variable namespaces (`--sc-*` here,
// `--gw-*` / `--adm-*` there) and neither may import the other; eslint.config.js
// Gates 2a/2b are the enforcement. Never "unify" them.
//
// Everything brandable resolves LIVE through the library's NON-HOOK resolvers
// (`themeColor`, `themePaletteEntry`, `themeFontFamily`) — they exist precisely
// so a token module can read the theme from outside a component, which is what
// lets this file be a plain module rather than a hook. The hardcoded values are
// CombatDen's verbatim fallbacks, used only when nothing has loaded.
//
// The output is `showcaseCssVars`, the ~67 `--sc-*` custom properties
// ./ShowcaseThemeVars.tsx writes onto ONE element. Every showcase `.module.css`
// reads `var(--sc-…)` and nothing else, so a theme switch re-skins all nine
// screens by rewriting variables on that single element.
//
// TWO PORTING RULES THIS FILE OBEYS, both from ../../../CLAUDE.md:
//
//   * `letterSpacing` ports as **px**, never `em`. Flutter's letterSpacing is an
//     absolute logical-pixel value that does not scale with font size; CSS `em`
//     does. `h1` is `letterSpacing: -0.02` at 24px → `-0.02px`. Writing
//     `-0.02em` would be `-0.48px`, ~24x tighter.
//   * No numeric `line-height` anywhere. Flutter leaves `height:` unset in this
//     whole ramp, which means the font's own metrics — CSS `line-height: normal`.
//     Every type shorthand below therefore spells `/normal` explicitly.

import type { CSSProperties } from 'react';
import type { Rgba, ThemeSnapshot } from 'recompose-react';
import {
  ThemeDerivation,
  alphaBlend,
  fontStack,
  hslLightness,
  rgba,
  themeColor,
  themeFontFamily,
  themePaletteEntry,
  toCss,
  withAlpha,
} from 'recompose-react';

import {
  SLOT_ACCENT,
  SLOT_BACKGROUND,
  SLOT_FONT_BODY,
  SLOT_FONT_DISPLAY,
  SLOT_PRIMARY,
  SLOT_TEXT,
} from './showcaseSlots';

// ---------------------------------------------------------------------------
// SECOND POSITION BALLET fallbacks — used only when no theme loads, which in
// the dev harness is ALWAYS. These are the produced run's own resolved values
// (apps/combatden/AdultBallet/output.yaml), not CombatDen's, for the reason
// `apps/romanahouse/` gives: this direction is committed to a light canvas and
// a satin-blush field, and against CombatDen's near-black background the whole
// arrangement is invisible. A fork whose direction is palette-agnostic should
// still inherit the base's.
//
// ./__tests__/showcaseTokens.test.ts pins every one of them.
// ---------------------------------------------------------------------------

/** `Satin Blush` — the pointe-ribbon dusty rose. `oklch(0.52 0.1 10)`. */
const FALLBACK_PRIMARY: Rgba = rgba(0x99, 0x4f, 0x5c);
/** `Sheet-Music Cream` — the warm paper ground. `oklch(0.9 0.012 85)`. */
const FALLBACK_BACKGROUND: Rgba = rgba(0xe2, 0xde, 0xd5);
/** `Warm Charcoal` — the ink. `oklch(0.26 0.015 60)`. */
const FALLBACK_TEXT: Rgba = rgba(0x2a, 0x22, 0x1d);
/** `Antique Brass` — the barre hardware. `oklch(0.58 0.09 75)`. */
const FALLBACK_ACCENT: Rgba = rgba(0x99, 0x72, 0x38);

/**
 * Ink for anything set ON the satin field, and the fallback under the theme's
 * `primary.regular_text` derivation.
 *
 * THIS IS A CONTRAST LAW, NOT A PREFERENCE. The base reuses `FALLBACK_TEXT`
 * here because its ink is near-white on a near-black primary. Ours is a warm
 * charcoal, and charcoal on the satin blush measures **2.70:1** — below AA at
 * every size. The run's own `background.light` is 5.47:1 on the same field, so
 * it is what every knocked-out label, name and figure in this app is set in.
 */
const FALLBACK_PRIMARY_BUTTON_TEXT: Rgba = rgba(0xfc, 0xf8, 0xf0);

/**
 * The two families the run actually resolved.
 *
 * `DM Serif Display` NAMES things and nothing else; `IBM Plex Sans` carries
 * every figure, label and line of prose, and has the tabular numerals the
 * carried-items line and the count-ups need. Splitting the base's single
 * `FALLBACK_FONT_FAMILY` in two is what lets an untheme'd harness show the
 * real pairing — `useThemeFontFamily` injects each family's stylesheet, so a
 * name with no stylesheet behind it would silently render as system-ui.
 */
export const FALLBACK_DISPLAY_FONT_FAMILY = 'DM Serif Display';
export const FALLBACK_BODY_FONT_FAMILY = 'IBM Plex Sans';

/** Opaque white — the base of `_liveSurfaceFallback`'s `Colors.white`. */
const WHITE: Rgba = rgba(0xff, 0xff, 0xff);

// ---------------------------------------------------------------------------
// HSL, the two functions Flutter hands `ShowcaseTokens` for free.
// ---------------------------------------------------------------------------
//
// `hslLightness` (the read) is exported by the library. The WRITE half —
// `HSLColor.fromColor(c).withLightness(l).toColor()`, which `_darkPrimaryFallback`
// needs — has no counterpart there, because nothing in the runtime re-lights a
// colour. It is ported here rather than pushed into the library: the library is
// the app-agnostic runtime and this is one app's fallback maths.

/** Flutter's `HSLColor.fromColor(c).hue`, in degrees. */
function hslHue(color: Rgba): number {
  const r = color.r / 0xff;
  const g = color.g / 0xff;
  const b = color.b / 0xff;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0 || max === 0) return 0;
  // Dart's `%` on doubles is always non-negative; JS's keeps the dividend's
  // sign, so the red branch needs the extra wrap to match `(x) % 6` in Dart.
  const hue =
    max === r
      ? 60 * (((((g - b) / delta) % 6) + 6) % 6)
      : max === g
        ? 60 * ((b - r) / delta + 2)
        : 60 * ((r - g) / delta + 4);
  return Number.isNaN(hue) ? 0 : hue;
}

/** Flutter's `HSLColor.fromColor(c).saturation`. */
function hslSaturation(color: Rgba): number {
  const r = color.r / 0xff;
  const g = color.g / 0xff;
  const b = color.b / 0xff;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  if (lightness === 1) return 0;
  const raw = (max - min) / (1 - Math.abs(2 * lightness - 1));
  // Pure black divides 0 by 0. Dart's `clampDouble` maps NaN to its MAX, and
  // the value is multiplied by a zero chroma either way — match it anyway.
  if (Number.isNaN(raw)) return 1;
  return raw < 0 ? 0 : raw > 1 ? 1 : raw;
}

/**
 * Flutter's `HSLColor.fromColor(c).withLightness(l).toColor()` — the exact
 * chroma/secondary/match reconstruction `HSLColor.toColor` performs, so a
 * ported fallback lands on the same byte values as the Dart original.
 */
function withHslLightness(color: Rgba, lightness: number): Rgba {
  const l = lightness < 0 ? 0 : lightness > 1 ? 1 : lightness;
  const hue = hslHue(color);
  const saturation = hslSaturation(color);
  const chroma = (1 - Math.abs(2 * l - 1)) * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = l - chroma / 2;
  let r: number;
  let g: number;
  let b: number;
  if (hue < 60) {
    [r, g, b] = [chroma, secondary, 0];
  } else if (hue < 120) {
    [r, g, b] = [secondary, chroma, 0];
  } else if (hue < 180) {
    [r, g, b] = [0, chroma, secondary];
  } else if (hue < 240) {
    [r, g, b] = [0, secondary, chroma];
  } else if (hue < 300) {
    [r, g, b] = [secondary, 0, chroma];
  } else {
    [r, g, b] = [chroma, 0, secondary];
  }
  return rgba((r + match) * 0xff, (g + match) * 0xff, (b + match) * 0xff, color.a);
}

// ---------------------------------------------------------------------------
// Brand colours (resolved live)
// ---------------------------------------------------------------------------

export function primaryColor(): Rgba {
  return themeColor(SLOT_PRIMARY, FALLBACK_PRIMARY);
}

export function backgroundColor(): Rgba {
  return themeColor(SLOT_BACKGROUND, FALLBACK_BACKGROUND);
}

export function text(): Rgba {
  return themeColor(SLOT_TEXT, FALLBACK_TEXT);
}

/** Selection / active-state accent. */
export function accent(): Rgba {
  return themeColor(SLOT_ACCENT, FALLBACK_ACCENT);
}

// ---------------------------------------------------------------------------
// Derived tokens
// ---------------------------------------------------------------------------

export function primaryColor50(): Rgba {
  return themeColor(SLOT_PRIMARY, withAlpha(FALLBACK_PRIMARY, 0.5), ThemeDerivation.third);
}

export function darkPrimary(): Rgba {
  return themeColor(SLOT_PRIMARY, darkPrimaryFallback(), ThemeDerivation.dark);
}

/** `_darkPrimaryFallback`: the fallback primary re-lit to 42% of its lightness. */
function darkPrimaryFallback(): Rgba {
  return withHslLightness(FALLBACK_PRIMARY, hslLightness(FALLBACK_PRIMARY) * 0.42);
}

export function primaryCard(): Rgba {
  return themeColor(SLOT_PRIMARY, withAlpha(FALLBACK_PRIMARY, 0.09), ThemeDerivation.card);
}

export function primaryButtonText(): Rgba {
  return themeColor(SLOT_PRIMARY, FALLBACK_PRIMARY_BUTTON_TEXT, ThemeDerivation.regularText);
}

/**
 * The RAISED reading surface, and the ink for anything on the satin field.
 *
 * One token doing two jobs on purpose: they are the same colour because they
 * are the same idea — the lightest tone the palette carries. It is the sheet a
 * prose section sits on, and it is what a name knocked out of a satin panel is
 * set in (5.47:1 there, where the charcoal ink is 2.70:1).
 */
export function ground(): Rgba {
  return themeColor(SLOT_BACKGROUND, FALLBACK_PRIMARY_BUTTON_TEXT, ThemeDerivation.light);
}

export function text2nd(): Rgba {
  return themeColor(SLOT_TEXT, withAlpha(FALLBACK_TEXT, 0.75), ThemeDerivation.second);
}

export function text3rd(): Rgba {
  return themeColor(SLOT_TEXT, withAlpha(FALLBACK_TEXT, 0.5), ThemeDerivation.third);
}

export function card(): Rgba {
  return themePaletteEntry('card', liveSurfaceFallback());
}

export function popup(): Rgba {
  return themePaletteEntry('popup', alphaBlend(liveSurfaceFallback(), backgroundColor()));
}

export function divider(): Rgba {
  return themePaletteEntry('divider', dividerFallback());
}

/**
 * `_liveSurfaceFallback`. Note it reads the LIVE `backgroundColor()`, not the
 * hardcoded fallback: a theme that ships `background` but no `card` still gets
 * a surface tuned to its own canvas. The alpha ramp is verbatim —
 * `0.06 + 0.5 * (lightness / 0.9)` — and `rgba()` clamps it at the top end.
 */
function liveSurfaceFallback(): Rgba {
  const l = hslLightness(backgroundColor());
  return withAlpha(WHITE, 0.06 + 0.5 * (l / 0.9));
}

/**
 * `divider`'s fallback: the live ink at an alpha that rises with how light the
 * canvas is, clamped to `[0.10, 0.22]`.
 */
function dividerFallback(): Rgba {
  const raw = 0.1 + 0.1 * hslLightness(backgroundColor());
  const alpha = raw < 0.1 ? 0.1 : raw > 0.22 ? 0.22 : raw;
  return withAlpha(text(), alpha);
}

// ---------------------------------------------------------------------------
// Status / semantic colours (NOT brandable)
// ---------------------------------------------------------------------------

export const HYPERLINK: Rgba = rgba(0x83, 0xc7, 0xff);
export const GOOD_GREEN: Rgba = rgba(0x74, 0xf3, 0x94);
export const OK_YELLOW: Rgba = rgba(0xcc, 0xce, 0x44);
export const BAD_RED: Rgba = rgba(0xf9, 0x4a, 0x4d);

// ---------------------------------------------------------------------------
// Layout / sizing. Plain numbers in logical px — the member app's scale, which
// is NOT the admin chrome's (radiusBig 32 here vs 12 there).
// ---------------------------------------------------------------------------

export const SC = Object.freeze({
  radiusBig: 32,
  radiusSmall: 16,
  radiusCircle: 1000,

  paddingBig: 32,
  paddingSmall: 16,

  spacingBig: 32,
  spacingLarge: 16,
  spacingMedium: 8,
  spacingSmall: 4,
  spacingTiny: 2,

  buttonBorder: 2,
  /**
   * Flutter's variable-icon-font weight AXIS, not a CSS length. It has no
   * direct CSS analogue (the showcase draws hand-built SVG glyphs, as
   * ../widgets/icons.tsx does for the chrome), so it is published unitless and
   * used as a STROKE width: 300/200 = 1.5px on a 24px glyph box.
   */
  iconWeight: 300,
  buttonBorderSize: 3,
  screenHorizontalPadding: 16,

  // Icon sizes (T-shirt scale, 16 + 4x).
  iconSizeXs: 16,
  iconSizeSm: 20,
  iconSizeMd: 24,
  iconSizeLg: 28,
  iconSizeXl: 32,
  iconSize2xl: 36,

  pillHeightSm: 24,
  pillHeightMd: 30,
  dividerThickness: 1,
});

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

/** The resolved Google Fonts family for a font slot. */
export function displayFontFamily(): string {
  return themeFontFamily(SLOT_FONT_DISPLAY, FALLBACK_DISPLAY_FONT_FAMILY);
}

export function bodyFontFamily(): string {
  return themeFontFamily(SLOT_FONT_BODY, FALLBACK_BODY_FONT_FAMILY);
}

/**
 * One rung of the ramp as a CSS `font` shorthand.
 *
 * `/normal` is the load-bearing part: Flutter leaves `height:` unset across the
 * whole ramp, so every one of these lines at the font's own metrics. Spelling
 * it out also means the shorthand cannot inherit a stray numeric line-height
 * from an ancestor.
 */
function typeShorthand(weight: number, sizePx: number, stack: string): string {
  return `${String(weight)} ${String(sizePx)}px/normal ${stack}`;
}

/**
 * A rung that DOES set a line-height, for running prose only.
 *
 * The ramp above lines at the font's own metrics because that is what the Dart
 * does. A description or an instructor bio is the one thing in this app that is
 * a paragraph rather than a label, and a paragraph set at `normal` is too tight
 * to read. **Never reach for this on anything containing a `CountUpText`** — a
 * line box shorter than the font's own makes adjacent digit cells overlap
 * through the reel's clip, which is a bug `apps/romanahouse/` shipped once.
 */
function proseShorthand(weight: number, sizePx: number, lineHeight: number, stack: string): string {
  return `${String(weight)} ${String(sizePx)}px/${String(lineHeight)} ${stack}`;
}

/** Flutter's absolute `letterSpacing`, in px. See the header. */
function letterSpacing(value: number): string {
  return `${String(value)}px`;
}

// ---------------------------------------------------------------------------
// The CSS variables
// ---------------------------------------------------------------------------

/** The `--sc-*` custom properties, ready for a `style` prop. */
export type ShowcaseCssVars = Readonly<Record<string, string>>;

/**
 * Every `--sc-*` variable the showcase island reads, resolved from whatever is
 * loaded right now.
 *
 * `theme` is not decoration. The resolvers read the module-singleton store,
 * which React cannot see — passing the snapshot is what makes this call a
 * function of the loaded theme for React's (and the React Compiler's
 * auto-memoisation's) purposes, so a `selectDesign` actually recomputes it. It
 * is also genuinely read, for the light/dark canvas flag.
 *
 * `displayFamily` / `bodyFamily` come in already resolved because the CALLER
 * must also have injected their `@font-face` stylesheets (`loadFontFamily`) —
 * a family name with no stylesheet behind it silently renders as system-ui.
 */
export function showcaseCssVars(
  theme: ThemeSnapshot,
  displayFamily: string,
  bodyFamily: string,
): ShowcaseCssVars {
  const bodyStack = fontStack(bodyFamily);
  const displayStack = fontStack(displayFamily);
  const px = (value: number): string => `${String(value)}px`;

  return {
    // --- Canvas ---
    // `ShowcaseTokens.isLightCanvas`, as a value CSS can branch on and as the
    // `color-scheme` the phone screen should render form controls in.
    //
    // INVERTED FROM THE BASE, for the base's own reason: the flag has to agree
    // with the canvas the fallback background actually paints. This fork's
    // untheme'd ground is sheet-music cream, so an unloaded theme is LIGHT here
    // where it is dark there. Leaving it would declare `color-scheme: dark` on
    // a light design.
    '--sc-canvas': theme.config?.colorMode === 'dark' ? 'dark' : 'light',

    // --- Brand colours ---
    '--sc-primary': toCss(primaryColor()),
    '--sc-background': toCss(backgroundColor()),
    '--sc-text': toCss(text()),
    '--sc-accent': toCss(accent()),

    // --- Derived ---
    '--sc-primary-50': toCss(primaryColor50()),
    '--sc-primary-dark': toCss(darkPrimary()),
    '--sc-primary-card': toCss(primaryCard()),
    '--sc-primary-button-text': toCss(primaryButtonText()),
    '--sc-text-2nd': toCss(text2nd()),
    '--sc-text-3rd': toCss(text3rd()),
    '--sc-card': toCss(card()),
    '--sc-popup': toCss(popup()),
    '--sc-divider': toCss(divider()),

    // --- Status / semantic (never brandable) ---
    '--sc-hyperlink': toCss(HYPERLINK),
    '--sc-good-green': toCss(GOOD_GREEN),
    '--sc-ok-yellow': toCss(OK_YELLOW),
    '--sc-bad-red': toCss(BAD_RED),

    // --- Fonts ---
    '--sc-font-body': bodyStack,
    '--sc-font-display': displayStack,

    // --- Radii ---
    '--sc-radius-big': px(SC.radiusBig),
    '--sc-radius-small': px(SC.radiusSmall),
    '--sc-radius-circle': px(SC.radiusCircle),

    // --- Padding / spacing ---
    '--sc-padding-big': px(SC.paddingBig),
    '--sc-padding-small': px(SC.paddingSmall),
    '--sc-spacing-big': px(SC.spacingBig),
    '--sc-spacing-large': px(SC.spacingLarge),
    '--sc-spacing-medium': px(SC.spacingMedium),
    '--sc-spacing-small': px(SC.spacingSmall),
    '--sc-spacing-tiny': px(SC.spacingTiny),
    '--sc-screen-padding-x': px(SC.screenHorizontalPadding),

    // --- Borders ---
    '--sc-button-border': px(SC.buttonBorder),
    '--sc-button-border-size': px(SC.buttonBorderSize),
    '--sc-divider-thickness': px(SC.dividerThickness),

    // --- Icons ---
    '--sc-icon-weight': String(SC.iconWeight),
    '--sc-icon-xs': px(SC.iconSizeXs),
    '--sc-icon-sm': px(SC.iconSizeSm),
    '--sc-icon-md': px(SC.iconSizeMd),
    '--sc-icon-lg': px(SC.iconSizeLg),
    '--sc-icon-xl': px(SC.iconSizeXl),
    '--sc-icon-2xl': px(SC.iconSize2xl),

    // --- Pills ---
    '--sc-pill-height-sm': px(SC.pillHeightSm),
    '--sc-pill-height-md': px(SC.pillHeightMd),

    // --- Type ramp (body slot) ---
    '--sc-type-h1': typeShorthand(700, 24, bodyStack),
    '--sc-type-h1-ls': letterSpacing(-0.02),
    '--sc-type-h1-regular': typeShorthand(500, 24, bodyStack),
    '--sc-type-h1-regular-ls': letterSpacing(-0.02),
    '--sc-type-h2': typeShorthand(600, 16, bodyStack),
    '--sc-type-h2-ls': letterSpacing(0),
    '--sc-type-h2-regular': typeShorthand(400, 16, bodyStack),
    '--sc-type-h2-regular-ls': letterSpacing(0.03),
    '--sc-type-h2-bold': typeShorthand(700, 16, bodyStack),
    '--sc-type-h2-bold-ls': letterSpacing(0),
    '--sc-type-h3': typeShorthand(600, 13, bodyStack),
    '--sc-type-h3-ls': letterSpacing(0),
    '--sc-type-p': typeShorthand(400, 12, bodyStack),
    '--sc-type-p-ls': letterSpacing(0.03),
    '--sc-type-p-big': typeShorthand(400, 16, bodyStack),
    '--sc-type-p-big-ls': letterSpacing(0.03),
    '--sc-type-p-small': typeShorthand(400, 11, bodyStack),
    '--sc-type-p-small-ls': letterSpacing(0.03),

    // --- Hero numerals (display slot; no letterSpacing in Dart) ---
    '--sc-type-big1': typeShorthand(600, 160, displayStack),
    '--sc-type-big1-ls': 'normal',
    '--sc-type-big1-5': typeShorthand(600, 64, displayStack),
    '--sc-type-big1-5-ls': 'normal',
    '--sc-type-big2': typeShorthand(600, 32, displayStack),
    '--sc-type-big2-ls': 'normal',

    // -----------------------------------------------------------------------
    // SECOND POSITION'S OWN REGISTERS.
    //
    // The ported ramp above is the base's and has no rung for what this design
    // needs: it is a body-slot ramp topping out at 24px, and this app's largest
    // rung on every browsing screen is a NAME set in the display serif. Adding
    // to `--sc-*` here rather than inventing a second namespace is what keeps
    // Guardrail 2's sweep honest — every `var(--sc-…)` any stylesheet in this
    // fork reads is a string in this one file.
    //
    // THE DIVISION OF LABOUR IS THE WHOLE TYPE SYSTEM: `-name-*` is the serif
    // and names things; everything else is the sans. The only figures set in
    // the serif are `-figure-*`, which exist for the celebration cards whose
    // entire subject IS the number.
    // -----------------------------------------------------------------------

    // Names — the display serif, and the largest rung on any browsing screen.
    '--sc-type-name-billed': typeShorthand(400, 30, displayStack),
    '--sc-type-name-billed-ls': letterSpacing(-0.2),
    '--sc-type-name-panel': typeShorthand(400, 21, displayStack),
    '--sc-type-name-panel-ls': letterSpacing(-0.1),
    '--sc-type-name-title': typeShorthand(400, 26, displayStack),
    '--sc-type-name-title-ls': letterSpacing(-0.2),
    '--sc-type-name-masthead': typeShorthand(400, 19, displayStack),
    '--sc-type-name-masthead-ls': letterSpacing(0),

    // Celebration figures — the ONE place a number may lead, so the one place
    // the serif is spent on digits.
    '--sc-type-figure-hero': typeShorthand(400, 72, displayStack),
    '--sc-type-figure-hero-ls': letterSpacing(-1),
    '--sc-type-figure': typeShorthand(400, 28, displayStack),
    '--sc-type-figure-ls': letterSpacing(-0.3),

    // The sans: metadata, costs, counts. Tabular wherever digits stack.
    '--sc-type-meta': typeShorthand(400, 13, bodyStack),
    '--sc-type-meta-ls': letterSpacing(0.1),
    '--sc-type-meta-strong': typeShorthand(600, 13, bodyStack),
    '--sc-type-meta-strong-ls': letterSpacing(0.1),
    '--sc-type-value': typeShorthand(600, 15, bodyStack),
    '--sc-type-value-ls': letterSpacing(0),

    // The region label. Charcoal or knockout — NEVER brass; see `--sc-rule`.
    '--sc-type-label': typeShorthand(600, 10, bodyStack),
    '--sc-type-label-ls': letterSpacing(1.3),

    // Running prose — the only rung in this app that sets a line-height.
    '--sc-type-prose': proseShorthand(400, 14, 1.55, bodyStack),
    '--sc-type-prose-ls': letterSpacing(0.1),

    // -----------------------------------------------------------------------
    // The three fields, and the rule.
    //
    // MEASURED, NOT CHOSEN. Every pairing below was checked against WCAG:
    //   ink on ground .............. 11.63:1
    //   on-satin on satin ........... 5.47:1
    //   ink on satin ................ 2.70:1   <- why `--sc-on-satin` exists
    //   rule (brass) on ground ...... 3.25:1   <- a LINE, never a word
    //   rule (brass) on satin ....... 1.33:1   <- never together at all
    // -----------------------------------------------------------------------

    /** The satin blush FIELD: panel halves, plinths, the action, the foot. */
    '--sc-satin': toCss(primaryColor()),
    /** Ink for anything set on that field. The only legible option there. */
    '--sc-on-satin': toCss(ground()),
    /** A parting line WITHIN the satin, where brass would vanish. */
    '--sc-satin-hair': toCss(withAlpha(ground(), 0.28)),
    /** The raised reading sheet — prose sections, the class detail body. */
    '--sc-ground-raised': toCss(ground()),
    /**
     * The brass rule. A LINE AND A MARK, NEVER A LABEL: 3.25:1 carries a
     * border honestly and fails text at every size this app would set one.
     */
    '--sc-rule': toCss(accent()),
    '--sc-rule-thickness': px(1),
    '--sc-rule-strong-thickness': px(2),
  };
}

/**
 * The vars as a React `style` value. React's `CSSProperties` has no index
 * signature for custom properties, so the cast is unavoidable — it is made
 * exactly once, here.
 */
export function showcaseStyle(vars: ShowcaseCssVars, extra?: CSSProperties): CSSProperties {
  return { ...vars, ...extra } as unknown as CSSProperties;
}
