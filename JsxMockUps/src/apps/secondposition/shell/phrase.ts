// THE PHRASE — this app's one clock and its one curve.
//
// Motion is judged ACROSS an asset, not per screen, so every duration and every
// easing in this fork resolves to a constant in THIS file. `apps/vinyasaflow/`
// learned that the expensive way: its eleven screens were built in parallel and
// arrived carrying three different curves, four ideas of how long one movement
// takes, and a count-up on `easeOutExpo`. Each was defensible alone; together
// they read as eleven designers. This file exists so that cannot happen here.
//
// THE TEMPO IS A BALLET PHRASE AND IT IS LITERAL (../layout_brief.yaml): a
// phrase travels, slows, arrives and holds. It does not overshoot and correct.
// So the curve is a plain DECELERATION — fast at the start, easing to a
// complete stop — and there is no spring, no rubber-band, no elastic and no
// scale-up-and-settle anywhere in this fork. `easeOutBack` in
// ../celebrations/curves.ts is the one curve this app may never sample.
//
// Delivered to CSS as `--sp-*` custom properties written onto the asset ROOT by
// ../SecondPositionSurface.tsx, so every stylesheet under it reads the same
// clock without importing anything. They are `--sp-*` rather than `--sc-*` on
// purpose: `--sc-*` is the ported token surface (../showcaseTokens.ts) and this
// is not a token this fork inherited, it is one it owns. Both have a sweep of
// their own — grep for `var(--sp-…)` against this file.

import type { CSSProperties } from 'react';

/**
 * THE PHRASE — the only easing curve in this app.
 *
 * A deceleration with no tail and no overshoot: it leaves immediately, sheds
 * speed the whole way, and stops dead on its value. An `easeInOut` would begin
 * softly, which reads as hesitation; an `easeOutExpo` covers 90% in the first
 * third and then visibly crawls, which reads as a tick. A phrase does neither.
 *
 * Every CSS animation here reads it as `var(--sp-phrase)`, and every per-frame
 * driver samples its JS twin, `Curves.easeOutCubic`.
 */
export const PHRASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

/**
 * A panel's satin field opening from its leading edge.
 *
 * THE SATIN IS THE ENTRANCE. A panel does not fade in as a block: its field
 * wipes to full extent over this duration with the name already in place
 * beneath it, so the field passing over the type is what puts the type on
 * screen. One gesture, one element, and no per-word delay curve to keep in
 * sync.
 */
export const WIPE_MS = 460;

/**
 * The interval between one panel opening and the next one down the column.
 *
 * FIXED, NOT CURVED. The same interval every time — panels landing on an even
 * beat read as a count, which is what a class is; panels landing on an
 * accelerating curve read as a flourish, which this brand does not do.
 */
export const STAGGER_MS = 70;

/**
 * Ordinary content arriving — a section, a tab switch, a row of chips.
 *
 * DELIBERATELY BRISK, and deliberately not the celebration durations below.
 * Slowing this to match them would make the whole app sluggish in order to fix
 * a problem that only exists where something is being shown off.
 */
export const ARRIVE_MS = 320;

/** One thing replacing another in the same box: a caption, a page, a tab body. */
export const SWITCH_MS = 300;

// ---------------------------------------------------------------------------
// Celebration only. Guardrail 16: a celebration exists to be ENJOYED, and one
// played faster than a member can register what they earned has delivered
// nothing while still costing them the time. These stay skippable, which is
// what makes them acceptable at this length — a tap on a still-moving card
// finishes it outright (./useTapToSettle.ts).
// ---------------------------------------------------------------------------

/**
 * An insignia arriving and coming to rest — the medallion, the trophy, the box.
 *
 * The better part of a second, because this is the beat the card exists for.
 */
export const SETTLE_MS = 1000;

/**
 * A figure rolling from zero to its value.
 *
 * Longer than the object it belongs to, so the number is still moving when the
 * eye arrives at it. Tabular, so nothing shifts sideways while it runs, and on
 * `PHRASE` so it lands exactly on its value with no final tick.
 */
export const COUNT_MS = 1300;

/**
 * A row of things arriving one after another — the week strip, the stat tiles,
 * the reward shelf. Long enough to be seen ARRIVING rather than found already
 * there.
 */
export const CASCADE_MS = 700;

/**
 * AN IMPACT, AND IT IS PINNED HERE ON PURPOSE.
 *
 * The box flying open, the coins thrown outward, the burst behind the trophy.
 * Guardrail 16's second half: an impact is FELT, not read, and a slow explosion
 * is not a generous one — it is a weak one, coins wafting outward instead of
 * being thrown. So this is a constant of its own rather than a fraction of
 * `SETTLE_MS`, which means the next person to slow the flow down cannot stretch
 * a burst into a drift by accident. That is exactly how the problem was found.
 */
export const IMPACT_MS = 420;

/**
 * How long a settled card holds before it plays again.
 *
 * STANDALONE ONLY. Inside the flow every card renders with `loop={false}` and
 * holds where it landed; the member's tap advances it. A CARD MUST NEVER WAIT
 * OUT THIS HOLD BEFORE REPORTING THAT IT SETTLED — conflating the two is what
 * left `apps/vinyasaflow/`'s five look-alike cards revealing their action at
 * 0.76s, 4.3s, 8.9s, 2.6s and 3.2s. The hold is a REPLAY concern; settling is a
 * loop-closed concern. See each card's `onCycleComplete`.
 */
export const HOLD_MS = 3000;

const ms = (value: number): string => `${String(value)}ms`;

/**
 * The clock, as the `--sp-*` custom properties every stylesheet in this fork
 * reads.
 *
 * Written onto the asset root by ../SecondPositionSurface.tsx — ONE element,
 * the same one `--sc-*` lands on — because custom properties inherit and a
 * stylesheet cannot import a TypeScript constant. A `.module.css` naming a
 * `--sp-*` that is not in this object gets nothing at all, exactly as
 * Guardrail 2 describes for `--sc-*`, so this object is the list to grep.
 */
export const PHRASE_VARS: CSSProperties = {
  '--sp-phrase': PHRASE,
  '--sp-wipe': ms(WIPE_MS),
  '--sp-stagger': ms(STAGGER_MS),
  '--sp-arrive': ms(ARRIVE_MS),
  '--sp-switch': ms(SWITCH_MS),
  '--sp-settle': ms(SETTLE_MS),
  '--sp-count': ms(COUNT_MS),
  '--sp-cascade': ms(CASCADE_MS),
  '--sp-impact': ms(IMPACT_MS),
  // `HOLD_MS` is published too, even though only JS reads it today. A constant
  // exported from this file but ABSENT from this object is a trap: a stylesheet
  // reaching for `var(--sp-hold)` would get nothing at all, silently, which is
  // the exact shape of the Guardrail 2 failure this object exists to prevent.
  // The rule for this file is that the clock and its CSS surface agree.
  '--sp-hold': ms(HOLD_MS),
} as CSSProperties;
