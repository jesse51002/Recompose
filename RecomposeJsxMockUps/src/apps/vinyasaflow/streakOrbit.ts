// The pure half of ./StatsShowcase.tsx — the streak card's geometry and its
// timings, kept out of the component so both can be read (and asserted) alone.
//
// THE FILENAME IS THE LAST THING LEFT OF THE ORBIT, and it is kept only because
// this fork does not rename files across a redesign. The base's card opened on
// eight small streak icons expanding, spinning and collapsing to the centre
// before a big one popped in on `easeOutBack` — a shared, non-monotonic radius
// that needed a per-frame rAF driver, which is why an arithmetic module existed
// at all.
//
// NONE OF THAT SURVIVES THE BRIEF, on two counts. `easeOutBack` overshoots, and
// ../layout_brief.yaml's motion direction bans overshoot by name ("nothing
// overshoots its size and settles… there is no elastic easing anywhere in this
// app"). And the celebration's motion is specified outright: "the closing of the
// loop IS the animation. The line travels around the hero and meets itself, and
// the moment it closes is the moment the card is settled and its action
// appears." So the ring's own travel replaces the ring of icons, and the card
// needs no driver at all — one clock, expressed as CSS animation delays off the
// values below.
//
// The orbit was an ENTRANCE, not an element: the app skill's inventory for this
// card lists the hero, the count, the subtitle and the week strip, and nothing
// else. Changing how a card arrives is arrangement; every element it arrives
// with is still here.

/**
 * The breath, and it is the only easing curve on this card.
 *
 * Soft at BOTH ends — `easeInOutSine`. The brief is explicit that this is what
 * separates this app's movement from every brisk product animation: "nothing
 * here decelerates into a hard stop, and nothing accelerates away from one." An
 * ease-out lands hard; this one arrives the way a breath finishes.
 */
export const BREATH = 'cubic-bezier(0.37, 0, 0.63, 1)';

/**
 * The line's travel around the hero — "a full screen draws in about three
 * quarters of a second, and it is allowed to take that long."
 */
export const LOOP_DRAW_MS = 760;

/** The hero fades up inside the ring while the line is still going round it. */
export const HERO_FADE_MS = 600;

/**
 * WHEN THE CARD IS SETTLED, and it is the moment the loop closes rather than
 * the moment the last part lands. The brief: "the moment it closes is the
 * moment the card is settled and its action appears. That gives the card a
 * single unmistakable finish rather than a set of parts each arriving on its
 * own schedule."
 */
export const SETTLE_MS = LOOP_DRAW_MS;

/** The statement arrives as one block, on the close. Not a per-part stagger. */
export const STATEMENT_FADE_MS = 420;

/**
 * The count's roll. "A count travels from zero to its value in tabular figures
 * … lands inside three quarters of a second, and settles without a final tick."
 * Shorter than `CelebrationTimings.countUpMs` (1400) on purpose.
 */
export const COUNT_ROLL_MS = 720;

/** The last excursion running out across the screen to gather the week. */
export const WEEK_SWEEP_MS = 720;

/** How long a settled card holds before it draws itself again, standalone. */
export const HOLD_MS = 2600;

/**
 * One full cycle, for the standalone `loop` mode only. The flow passes
 * `loop={false}` and never arms it.
 */
export const CYCLE_MS =
  SETTLE_MS + Math.max(STATEMENT_FADE_MS, COUNT_ROLL_MS, WEEK_SWEEP_MS) + HOLD_MS;

/**
 * The closing ring's diameter, in the phone's logical px.
 *
 * A number rather than a token because `shell/Thread.tsx`'s `<Loop size>` takes
 * one: what a loop encircles differs per card, and a ring that does not fit its
 * hero is worse than no ring.
 */
export const LOOP_PX = 232;

/**
 * The hero's height. HEIGHT ONLY — the width is derived from the picture's own
 * proportion, because `streak_icon.png` measures 468x977 (0.48) and is nothing
 * like square. It is why this card does NOT use `shell/Photo.tsx`'s
 * `MintedDisc`: a circle is free for the roundel and the struck coins, which
 * are square and transparent-edged, and it would cut the top and bottom clean
 * off this one.
 *
 * The ring has to clear the picture's CORNERS, not its width: at this height
 * the half-diagonal is `hypot(176, 176 * 468 / 977) / 2` ≈ 98px against the
 * ring's 116px radius, so the art sits inside the loop with room to spare even
 * before its own transparent margin is counted.
 */
export const HERO_HEIGHT_PX = 176;
