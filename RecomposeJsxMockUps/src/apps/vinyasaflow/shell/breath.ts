// THE BREATH — this app's one clock and its one curve.
//
// Motion is judged ACROSS an asset, not per screen, which is why every duration
// and every easing in this fork resolves to a constant in THIS file. Before it
// existed the eleven screens carried three different "breath" curves
// (`cubic-bezier(0.37, 0, 0.63, 1)`, `(0.45, 0, 0.55, 1)`, `(0.645, 0.045,
// 0.355, 1)`), four different ideas of how long a line takes to travel (760 /
// 800 / 900 / 980ms), and a count-up rolling on `easeOutExpo`. Each was
// defensible alone; together they read as five designers, which is exactly the
// failure a motion pass exists to catch.
//
// THE TEMPO IS A BREATH AND IT IS LITERAL (../layout_brief.yaml): slow, even,
// unhurried — a four-count in and a four-count out — with an ease that is soft
// at BOTH ends, because a breath begins gently and finishes gently. Nothing
// here decelerates into a hard stop and nothing accelerates away from one.
//
// NOTHING BOUNCES. No spring, no overshoot, no rubber-band, no elastic easing
// anywhere. `easeOutBack` is the one curve in ./../celebrations/curves.ts this
// fork may never sample.
//
// Delivered to CSS as `--vf-*` custom properties written onto the asset ROOT by
// ../VinyasaFlowSurface.tsx, so every stylesheet under it reads the same clock
// without importing anything. They are `--vf-*` rather than `--sc-*` on
// purpose: `--sc-*` is the ported token surface (../showcaseTokens.ts) and this
// is not a token this fork inherited, it is one it owns.

import type { CSSProperties } from 'react';

/**
 * THE BREATH — `easeInOutSine`, and the only easing curve in this app.
 *
 * Symmetric: soft in, soft out. An ease-OUT lands hard and an ease-IN leaves
 * hard; this one begins and finishes the way a breath does. Every CSS
 * animation here reads it as `var(--vf-breath)` and every per-frame driver
 * samples its JS twin, `Curves.easeInOutSine`.
 */
export const BREATH = 'cubic-bezier(0.37, 0, 0.63, 1)';

/**
 * THE BREATH, SPLIT IN HALF — for a stroke that has to be drawn as two elements
 * and must still read as one movement.
 *
 * A ring drawn by rotating two wedges off it (`RankShowcase`, `WinsShowcase`)
 * cannot be one animation: each wedge can only cover half a circle. Run both on
 * `BREATH` and the line visibly stalls at six o'clock, where one hands over to
 * the other. `easeInOutSine` restricted to its first half IS `easeInSine`, and
 * to its second half IS `easeOutSine`, so a wedge on each — the second delayed
 * by exactly one half-duration — recomposes into a single unbroken breath
 * across the whole circle.
 *
 * Only ever use them as that pair, in that order, over equal halves. Either one
 * alone is hard at one end, which is the thing this app does not do.
 */
export const BREATH_IN = 'cubic-bezier(0.12, 0, 0.39, 0)';
export const BREATH_OUT = 'cubic-bezier(0.61, 1, 0.88, 1)';

/**
 * A celebration's main movement — the hero arriving and resolving.
 *
 * SLOW ON PURPOSE. Guardrail 16: a celebration exists to be ENJOYED, and it has
 * to be slow enough for a member to register what they earned. Every one of
 * these cards previously resolved in UNDER A SECOND, which is quick enough that
 * the thing being celebrated was over before it was read — the animation cost
 * the member time and delivered nothing.
 *
 * These durations are CELEBRATION-ONLY. Ordinary content movement is
 * `ARRIVE_MS` and is deliberately left brisk; slowing that would make the whole
 * app sluggish to fix a problem that only exists where something is being shown
 * off.
 */
export const DRAW_MS = 1500;

/**
 * A celebration's hero settling into its finished state — the moment the card
 * is done and its action appears.
 *
 * The longest duration in the app, because it is the beat the whole card exists
 * for. It stays skippable: a tap resolves the card immediately
 * (./useTapToSettle.ts), which is what makes a duration this long acceptable.
 */
export const CLOSE_MS = 1600;

/**
 * A row of things arriving one after another — the week strip, the stat tiles,
 * the reward shelf. Long enough that a member sees them ARRIVE rather than
 * finding them already there.
 */
export const BOW_MS = 950;

/**
 * One thing opening where the line has just reached it.
 *
 * Short, because it is not an entrance in its own right — the entrance is the
 * line's travel, and this is only the thing behind it becoming visible.
 */
export const ARRIVE_MS = 320;

/**
 * A figure rolling from zero to its value.
 *
 * "A count travels from zero to its value in tabular figures so nothing shifts
 * sideways while it moves, lands inside three quarters of a second, and settles
 * without a final tick." The tick is what `easeOutExpo` produces — 90% of the
 * roll in the first third and a visible crawl into the stop — so the roll is on
 * the breath like everything else.
 */
export const COUNT_MS = 1500;

/** One thing being replaced by another in the same box: a caption, a page. */
export const SWITCH_MS = 320;

/**
 * How long a settled card holds before it draws itself again.
 *
 * STANDALONE ONLY. Inside the celebration flow every card renders with
 * `loop={false}` and holds where it landed; the flow advances on the member's
 * tap. A card must NEVER wait out this hold before reporting that it settled —
 * that is what kept the flow's action hidden for up to nine seconds before this
 * pass. See each card's `onCycleComplete`.
 */
export const HOLD_MS = 3600;

/**
 * Where the stroke comes FROM: the brand mark's lower edge, in the phone's
 * logical px.
 *
 * `shell/Head.module.css` puts the mark at `--sc-spacing-large` (16) from the
 * top of the head at 40px tall, so its foot is at 56. The screen's reveal
 * begins there rather than at y=0 because the mark "is the origin of that
 * stroke and is the one element that does not redraw between screens"
 * (../layout_brief.yaml) — it is present from the first frame, and the line
 * descends out of it.
 */
export const ORIGIN_Y = 56;

const ms = (value: number): string => `${String(value)}ms`;

/**
 * The clock, as the `--vf-*` custom properties every stylesheet in this fork
 * reads.
 *
 * Written onto the asset root by ../VinyasaFlowSurface.tsx — ONE element, the
 * same one `--sc-*` lands on — because custom properties inherit and a
 * stylesheet cannot import a TypeScript constant. A `.module.css` that names a
 * `--vf-*` not in this object gets nothing at all, exactly as Guardrail 2
 * describes for `--sc-*`, so this object is the list to grep.
 */
export const BREATH_VARS: CSSProperties = {
  '--vf-breath': BREATH,
  '--vf-breath-in': BREATH_IN,
  '--vf-breath-out': BREATH_OUT,
  '--vf-draw': ms(DRAW_MS),
  '--vf-close': ms(CLOSE_MS),
  '--vf-bow': ms(BOW_MS),
  '--vf-arrive': ms(ARRIVE_MS),
  '--vf-count': ms(COUNT_MS),
  '--vf-switch': ms(SWITCH_MS),
  '--vf-origin': `${String(ORIGIN_Y)}px`,
} as CSSProperties;
