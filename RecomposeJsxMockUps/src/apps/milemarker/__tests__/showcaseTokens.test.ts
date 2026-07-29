// The showcase island's token surface (../showcaseTokens.ts, porting
// CRM/lib/showcase/showcase_tokens.dart).
//
// Two things are pinned here, and both are things a reviewer cannot eyeball:
//
//  1. THE DERIVED FALLBACKS. `_darkPrimaryFallback`, `_liveSurfaceFallback`,
//     `divider`'s alpha ramp and `popup`'s alpha blend are real arithmetic on
//     the Dart side, ported by hand. They only ever render when NOTHING has
//     loaded, which is exactly when nobody is looking — so the numbers are
//     asserted against the values the Dart maths produces.
//  2. THE TWO-TOKEN-SYSTEM RULE. `radiusBig` is 32 here and 12 in the admin
//     chrome. A test that fails the moment the two are "unified" is cheaper
//     than the review that catches it.
//
// This file lives under src/__tests__/
// because eslint Gate 2b forbids anything outside the island from importing
// `showcase/showcaseTokens` — a test there could not import its own subject.

import { describe, expect, it } from 'vitest';

import {
  BAD_RED,
  FALLBACK_BODY_FONT_FAMILY,
  FALLBACK_DISPLAY_FONT_FAMILY,
  GOOD_GREEN,
  HYPERLINK,
  OK_YELLOW,
  SC,
  accent,
  accentButtonText,
  backgroundColor,
  card,
  darkPrimary,
  divider,
  popup,
  primaryButtonText,
  primaryCard,
  primaryColor,
  primaryColor50,
  showcaseCssVars,
  text,
  text2nd,
  text3rd,
} from '../showcaseTokens';

// Nothing is registered in this file, so every resolver takes its fallback —
// which is precisely the branch under test.
const NO_THEME = Object.freeze({
  config: null,
  activeDesignId: null,
  isLoaded: false,
  isReady: false,
});

describe('brand fallbacks', () => {
  // THIS FORK REPLACES THE BASE'S FALLBACKS, and the reason is in
  // ../showcaseTokens.ts: the direction is committed to DAYLIGHT, and the
  // harness opens untharmed. Pinned so a later "restore the base values" edit
  // fails loudly rather than quietly returning the fork to a canvas its lane
  // stripes cannot be seen on.
  it('is the Mile Marker fallback set — a LIGHT canvas', () => {
    // apps/combatden/RunClub/output.yaml, verbatim.
    expect(primaryColor()).toEqual({ r: 0, g: 103, b: 137, a: 1 });
    expect(backgroundColor()).toEqual({ r: 216, g: 223, b: 225, a: 1 });
    expect(text()).toEqual({ r: 21, g: 28, b: 31, a: 1 });
    expect(accent()).toEqual({ r: 219, g: 86, b: 18, a: 1 });
  });

  it('carries the two faces separately — they are not interchangeable', () => {
    expect(FALLBACK_DISPLAY_FONT_FAMILY).toBe('Bricolage Grotesque');
    expect(FALLBACK_BODY_FONT_FAMILY).toBe('IBM Plex Sans');
  });

  it('keeps the status colours off the brand', () => {
    expect(HYPERLINK).toEqual({ r: 131, g: 199, b: 255, a: 1 });
    expect(GOOD_GREEN).toEqual({ r: 116, g: 243, b: 148, a: 1 });
    expect(OK_YELLOW).toEqual({ r: 204, g: 206, b: 68, a: 1 });
    expect(BAD_RED).toEqual({ r: 249, g: 74, b: 77, a: 1 });
  });
});

describe('derived fallbacks', () => {
  it('re-lights the primary to 42% for darkPrimary', () => {
    // HSLColor.fromColor(#006789) is (h 194.9, s 1, l 0.26863); withLightness(
    // 0.26863 * 0.42 = 0.11282).toColor() lands on #002B3A.
    expect(darkPrimary()).toEqual({ r: 0, g: 43, b: 58, a: 1 });
  });

  it('takes the alpha derivations of primary and text', () => {
    expect(primaryColor50()).toEqual({ r: 0, g: 103, b: 137, a: 0.5 });
    expect(primaryCard()).toEqual({ r: 0, g: 103, b: 137, a: 0.09 });
    expect(text2nd()).toEqual({ r: 21, g: 28, b: 31, a: 0.75 });
    expect(text3rd()).toEqual({ r: 21, g: 28, b: 31, a: 0.5 });
  });

  it('does NOT reuse the page ink for text sitting on a brand colour', () => {
    // The base can reuse its ink here because its ink is near-white and its
    // primary a mid orange. On a light canvas that shortcut inverts: Coached
    // Ink on Daylight Track Blue is ~1.9:1, and this design puts its single
    // largest element in exactly that position on every screen.
    expect(primaryButtonText()).toEqual({ r: 216, g: 223, b: 225, a: 1 });
    // The tape is the inverse case — coral is light enough that the page's own
    // ink is the readable one.
    expect(accentButtonText()).toEqual({ r: 21, g: 28, b: 31, a: 1 });
  });

  it('tunes the card surface to the LIVE canvas lightness', () => {
    // alpha = 0.06 + 0.5 * (lightness(background) / 0.9), background #D8DFE1
    // having lightness 0.86471.
    const surface = card();
    expect(surface.r).toBe(255);
    expect(surface.g).toBe(255);
    expect(surface.b).toBe(255);
    expect(surface.a).toBeCloseTo(0.54039, 5);
  });

  it('flattens that surface over the canvas for popup', () => {
    expect(popup()).toEqual({ r: 237, g: 240, b: 241, a: 1 });
  });

  it('ramps the divider alpha with the canvas, clamped to [0.10, 0.22]', () => {
    const line = divider();
    expect(line.r).toBe(21);
    // 0.10 + 0.10 * 0.86471 = 0.18647, inside the clamp.
    expect(line.a).toBeCloseTo(0.18647, 5);
  });
});

describe('the two token systems never meet', () => {
  it('keeps the MEMBER app scale, not the admin chrome one', () => {
    // ../tokens/adminTokens.ts has radiusBig 12. This is the phone.
    expect(SC.radiusBig).toBe(32);
    expect(SC.radiusSmall).toBe(16);
    expect(SC.screenHorizontalPadding).toBe(16);
    expect(SC.spacingBig).toBe(32);
    expect(SC.iconSizeMd).toBe(24);
  });
});

describe('showcaseCssVars', () => {
  const vars = showcaseCssVars(NO_THEME, 'Oswald', 'Inter');

  it('namespaces every variable under --sc-', () => {
    const keys = Object.keys(vars);
    expect(keys.length).toBeGreaterThan(60);
    expect(keys.every((key) => key.startsWith('--sc-'))).toBe(true);
  });

  it('writes both font stacks from the slots it was handed', () => {
    expect(vars['--sc-font-body']).toBe('"Inter", system-ui, sans-serif');
    expect(vars['--sc-font-display']).toBe('"Oswald", system-ui, sans-serif');
  });

  it('spells letterSpacing in PX, never em', () => {
    // Flutter's letterSpacing is absolute logical px; `-0.02em` at 24px would
    // be -0.48px, ~24x tighter. See ../../../CLAUDE.md "Things that will bite".
    expect(vars['--sc-type-h1-ls']).toBe('-0.02px');
    expect(vars['--sc-type-p-ls']).toBe('0.03px');
    expect(vars['--sc-type-h2-ls']).toBe('0px');
  });

  it('never sets a numeric line-height — Flutter leaves `height:` unset', () => {
    for (const [key, value] of Object.entries(vars)) {
      if (!key.startsWith('--sc-type-') || key.endsWith('-ls')) continue;
      expect(value).toContain('/normal ');
    }
  });

  it('carries the ramp at the Dart weights and sizes', () => {
    expect(vars['--sc-type-h1']).toBe('700 24px/normal "Inter", system-ui, sans-serif');
    expect(vars['--sc-type-h2-bold']).toBe('700 16px/normal "Inter", system-ui, sans-serif');
    expect(vars['--sc-type-h3']).toBe('600 13px/normal "Inter", system-ui, sans-serif');
    expect(vars['--sc-type-p-small']).toBe('400 11px/normal "Inter", system-ui, sans-serif');
    // The hero numerals are the DISPLAY slot.
    expect(vars['--sc-type-big1']).toBe('600 160px/normal "Oswald", system-ui, sans-serif');
    expect(vars['--sc-type-big2']).toBe('600 32px/normal "Oswald", system-ui, sans-serif');
  });

  it('defaults the canvas to LIGHT when nothing is loaded', () => {
    // Inverted from the base's default so the `color-scheme` the browser is
    // handed agrees with the canvas the fallback background actually paints.
    expect(vars['--sc-canvas']).toBe('light');
    expect(showcaseCssVars({ ...NO_THEME }, 'A', 'B')['--sc-canvas']).toBe('light');
  });
});

describe("the fork's own vocabulary", () => {
  const vars = showcaseCssVars(NO_THEME, 'Oswald', 'Inter');

  it('names the two fields the whole design is built out of', () => {
    // A screen asks for "the sky", never for "the brand colour".
    expect(vars['--sc-sky']).toBe(vars['--sc-primary']);
    expect(vars['--sc-ground']).toBe(vars['--sc-background']);
    expect(vars['--sc-tape']).toBe(vars['--sc-accent']);
    // The knockout is the derivation, not the page ink.
    expect(vars['--sc-sky-ink']).toBe(vars['--sc-primary-button-text']);
  });

  it('carries TWO lane stripe colours, and that is the point', () => {
    // Blue on the pale ground; white only over a colour field. A white stripe
    // on the canvas is ~1.25:1 and effectively invisible, which is why the
    // design cannot get away with one.
    expect(vars['--sc-lane']).toBe(vars['--sc-primary']);
    expect(vars['--sc-lane-knock']).toBe(vars['--sc-primary-button-text']);
    expect(vars['--sc-lane']).not.toBe(vars['--sc-lane-knock']);
    expect(vars['--sc-lane-weight']).toBe('3px');
  });

  it('puts the LABEL in the body face and the headline in the display face', () => {
    // The opposite of ../romanahouse, deliberately: Bricolage Grotesque earns
    // the headline and the figures, and nothing else. Its quirks read as noise
    // at 10px in caps.
    expect(vars['--sc-type-label']).toContain('"Inter"');
    expect(vars['--sc-type-hero']).toContain('"Oswald"');
    expect(vars['--sc-type-fig-xl']).toContain('"Oswald"');
    expect(vars['--sc-type-lede']).toContain('"Inter"');
  });
});
