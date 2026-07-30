// The showcase island's token surface (../showcaseTokens.ts, porting
// CRM/lib/showcase/showcase_tokens.dart), as this fork resolves it.
//
// Three things are pinned here, and none of them is something a reviewer can
// eyeball:
//
//  1. THE REPLACED FALLBACK SET. This fork does not inherit CombatDen's, it
//     ships the produced run's (`apps/combatden/AdultBallet/output.yaml`).
//     Pinning them is what stops a later edit quietly returning a light,
//     satin-and-cream layout to a near-black canvas it cannot be read on.
//  2. THE DERIVED FALLBACKS. `_darkPrimaryFallback`, `_liveSurfaceFallback`,
//     `divider`'s alpha ramp and `popup`'s alpha blend are real arithmetic on
//     the Dart side, ported by hand. They only render when NOTHING has loaded —
//     which, in the dev harness, is always.
//  3. THE CONTRAST LAWS. `primaryButtonText` and the fork's own `--sc-on-satin`
//     are not taste: charcoal on the satin blush measures 2.70:1 and fails AA
//     at every size. A test is cheaper than rediscovering that in review.

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
  backgroundColor,
  card,
  darkPrimary,
  divider,
  ground,
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
// which is precisely the branch under test, and the branch the harness runs.
const NO_THEME = Object.freeze({
  config: null,
  activeDesignId: null,
  isLoaded: false,
  isReady: false,
});

describe('brand fallbacks', () => {
  // THIS FORK REPLACES THE FALLBACK SET rather than inheriting the base's.
  it('is the Second Position fallback set — a LIGHT canvas', () => {
    // Satin Blush, the pointe-ribbon dusty rose.
    expect(primaryColor()).toEqual({ r: 153, g: 79, b: 92, a: 1 });
    // Sheet-Music Cream, the warm paper ground.
    expect(backgroundColor()).toEqual({ r: 226, g: 222, b: 213, a: 1 });
    // Warm Charcoal, the ink.
    expect(text()).toEqual({ r: 42, g: 34, b: 29, a: 1 });
    // Antique Brass, the barre hardware.
    expect(accent()).toEqual({ r: 153, g: 114, b: 56, a: 1 });
  });

  // Two faces, never one. The serif NAMES things and the sans carries every
  // figure; collapsing them onto a single constant is what the base does and
  // what this design cannot do.
  it('names the display and body faces separately', () => {
    expect(FALLBACK_DISPLAY_FONT_FAMILY).toBe('DM Serif Display');
    expect(FALLBACK_BODY_FONT_FAMILY).toBe('IBM Plex Sans');
  });

  it('keeps the status colours off the brand', () => {
    expect(HYPERLINK).toEqual({ r: 131, g: 199, b: 255, a: 1 });
    expect(GOOD_GREEN).toEqual({ r: 116, g: 243, b: 148, a: 1 });
    expect(OK_YELLOW).toEqual({ r: 204, g: 206, b: 68, a: 1 });
    expect(BAD_RED).toEqual({ r: 249, g: 74, b: 77, a: 1 });
  });
});

describe('the contrast laws', () => {
  // The base reuses its plain ink here because its ink is near-white on a
  // near-black primary. Ours is a warm charcoal on a mid blush: 2.70:1, under
  // AA at every size. `background.light` is 5.47:1 on the same field.
  it('sets ink on the satin field to the light cream, never the charcoal', () => {
    expect(primaryButtonText()).toEqual({ r: 252, g: 248, b: 240, a: 1 });
    expect(ground()).toEqual({ r: 252, g: 248, b: 240, a: 1 });
    expect(primaryButtonText()).not.toEqual(text());
  });

  it('exposes the satin field and its ink as the pair they are', () => {
    const vars = showcaseCssVars(NO_THEME, 'A', 'B');
    expect(vars['--sc-satin']).toBe('rgba(153, 79, 92, 1)');
    expect(vars['--sc-on-satin']).toBe('rgba(252, 248, 240, 1)');
  });
});

describe('derived fallbacks', () => {
  it('re-lights the primary to 42% for darkPrimary', () => {
    // HSLColor.fromColor(#994F5C) has lightness 0.45490; withLightness(
    // 0.45490 * 0.42 = 0.19106).toColor() lands on #402127.
    expect(darkPrimary()).toEqual({ r: 64, g: 33, b: 39, a: 1 });
  });

  it('takes the alpha derivations of primary and text', () => {
    expect(primaryColor50()).toEqual({ r: 153, g: 79, b: 92, a: 0.5 });
    expect(primaryCard()).toEqual({ r: 153, g: 79, b: 92, a: 0.09 });
    expect(text2nd()).toEqual({ r: 42, g: 34, b: 29, a: 0.75 });
    expect(text3rd()).toEqual({ r: 42, g: 34, b: 29, a: 0.5 });
  });

  it('tunes the card surface to the LIVE canvas lightness', () => {
    // alpha = 0.06 + 0.5 * (lightness(background) / 0.9), background #E2DED5
    // having lightness 0.86078. A light canvas therefore wants a far stronger
    // white veil than CombatDen's 0.107 — this is the branch that would go
    // wrong silently if the fallback background were left as the base's.
    const surface = card();
    expect(surface.r).toBe(255);
    expect(surface.g).toBe(255);
    expect(surface.b).toBe(255);
    expect(surface.a).toBeCloseTo(0.53821, 5);
  });

  it('flattens that surface over the canvas for popup', () => {
    expect(popup()).toEqual({ r: 242, g: 240, b: 236, a: 1 });
  });

  it('ramps the divider alpha with the canvas, clamped to [0.10, 0.22]', () => {
    const line = divider();
    expect(line.r).toBe(42);
    // 0.10 + 0.10 * 0.86078 = 0.18608, inside the clamp.
    expect(line.a).toBeCloseTo(0.18608, 5);
  });
});

describe('the two token systems never meet', () => {
  it('keeps the MEMBER app scale, not the admin chrome one', () => {
    // The admin chrome has radiusBig 12. This is the phone.
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
    // be -0.48px, ~24x tighter.
    expect(vars['--sc-type-h1-ls']).toBe('-0.02px');
    expect(vars['--sc-type-p-ls']).toBe('0.03px');
    expect(vars['--sc-type-h2-ls']).toBe('0px');
    // The fork's own registers use the same unit.
    expect(vars['--sc-type-name-billed-ls']).toBe('-0.2px');
    expect(vars['--sc-type-label-ls']).toBe('1.3px');
  });

  it('sets a numeric line-height on PROSE and on nothing else', () => {
    // Flutter leaves `height:` unset across the ported ramp, so every rung
    // lines at the font's own metrics. `--sc-type-prose` is this fork's one
    // deliberate exception, because a paragraph set at `normal` is too tight to
    // read — and it is an exception a test has to hold, because the reason the
    // rule exists is real: a line box shorter than the font's own makes
    // adjacent digit cells overlap through a CountUpText reel's clip.
    expect(vars['--sc-type-prose']).toContain('/1.55 ');
    for (const [key, value] of Object.entries(vars)) {
      if (!key.startsWith('--sc-type-') || key.endsWith('-ls')) continue;
      if (key === '--sc-type-prose') continue;
      expect(value).toContain('/normal ');
    }
  });

  it('carries the ported ramp at the Dart weights and sizes', () => {
    expect(vars['--sc-type-h1']).toBe('700 24px/normal "Inter", system-ui, sans-serif');
    expect(vars['--sc-type-h2-bold']).toBe('700 16px/normal "Inter", system-ui, sans-serif');
    expect(vars['--sc-type-h3']).toBe('600 13px/normal "Inter", system-ui, sans-serif');
    expect(vars['--sc-type-p-small']).toBe('400 11px/normal "Inter", system-ui, sans-serif');
    expect(vars['--sc-type-big1']).toBe('600 160px/normal "Oswald", system-ui, sans-serif');
    expect(vars['--sc-type-big2']).toBe('600 32px/normal "Oswald", system-ui, sans-serif');
  });

  it('spends the SERIF on names and the SANS on every figure', () => {
    // The whole type system in three assertions. A name is the display face; a
    // time, a cost or a count is the body face. The one exception is a
    // celebration figure, which IS the name of what happened.
    for (const key of ['--sc-type-name-billed', '--sc-type-name-panel', '--sc-type-name-title']) {
      expect(vars[key]).toContain('"Oswald"');
    }
    for (const key of ['--sc-type-meta', '--sc-type-value', '--sc-type-label', '--sc-type-prose']) {
      expect(vars[key]).toContain('"Inter"');
    }
    expect(vars['--sc-type-figure-hero']).toContain('"Oswald"');
  });

  it('keeps every NAME rung larger than every metadata rung', () => {
    // Guardrail 14 as arithmetic. A fork here once set a start time at 40px
    // above a 17px class name, so the loudest thing on a screen a member opens
    // to choose a class was the clock. The ramp itself now forbids it.
    const px = (value: string): number => Number(/ (\d+)px/.exec(value)?.[1] ?? '0');
    const smallestName = Math.min(
      px(vars['--sc-type-name-panel'] ?? ''),
      px(vars['--sc-type-name-billed'] ?? ''),
    );
    const largestMeta = Math.max(
      px(vars['--sc-type-meta'] ?? ''),
      px(vars['--sc-type-value'] ?? ''),
      px(vars['--sc-type-label'] ?? ''),
    );
    expect(smallestName).toBeGreaterThan(largestMeta);
  });

  it('defaults the canvas to LIGHT when nothing is loaded', () => {
    // The inverse of the base, and for the base's own reason: the flag must
    // agree with the canvas the fallback background actually paints.
    expect(vars['--sc-canvas']).toBe('light');
    expect(showcaseCssVars({ ...NO_THEME }, 'A', 'B')['--sc-canvas']).toBe('light');
  });
});
