---
name: failure_modes_list
description: The running list of failure modes actually hit while building mock screens in JsxMockUps — what went wrong, how many independent agents hit it, and the rule that would have prevented it. Read it before starting a screen or a fan-out build, and APPEND to it whenever a build or a QA sweep turns up a new class of failure. This is an evidence log rather than a guardrail set — nothing here is authoritative until it is promoted into mockup-redesign-general, mockup-redesign-start, mockup-qa or a CLAUDE.md, and each entry's "Promoted?" line tracks whether that has happened.
---

# Failure modes actually hit here

A log of what has really gone wrong building mock screens, kept so the next
build does not rediscover it. **Each entry records the evidence, not an
opinion**: what broke, how many independent agents hit it, and the rule that
would have stopped it.

## How to use this file

- **Before a build**, read it. Most entries cost one line of CSS to avoid and
  half an hour to find.
- **After a build or a `mockup-qa` sweep**, append what you hit. An entry is
  worth adding the moment TWO independent agents hit the same thing, or ONE
  agent hits something that took a browser to find.
- **This file is not authoritative.** The guardrails live in
  `mockup-redesign-general`, the build process in `mockup-redesign-start`, the
  sweep in `mockup-qa`, and the per-app facts in `JsxMockUps/CLAUDE.md`.
  This is where a failure waits until someone decides where it belongs. The
  **Promoted?** field is the tracking.
- **Do not delete an entry when it is promoted.** Mark it, and leave the
  evidence — the count is what justifies the rule to the next reader.

---

# Log

## FM-1 — `background: var(…)` is a shorthand, and it drops whole

- **Hit by:** 7 of 11 screens, ~27 occurrences, all self-fixed. Plus 13 more
  left in the frozen `shell/` layer, which three agents flagged and could not
  touch.
- **What happens:** `background: var(--sc-satin)` is the `background`
  SHORTHAND. One unresolvable custom property makes it invalid at
  computed-value time and the browser drops the entire declaration — so the
  fill vanishes rather than falling back.
- **Why it kept happening:** Guardrail 3 already names `background`, but its
  worked example is `padding: 0 var(…) var(…)`, so the rule reads as being
  about MULTI-value shorthands. Every agent had to rediscover that a
  single-value `background:` counts too.
- **The rule:** use `background-color:`. Reserve `background:` for a genuine
  multi-part value with no `var()` in it.
- **Worst case seen:** a `.veil` rule — "would have silently deleted the
  entrance" — and a `DateTab` active mark, where a dropped declaration silently
  unmarks the day the member is looking at.
- **Promoted?** Not yet. Belongs in Guardrail 3, as an explicit
  single-value example.

## FM-2 — a container that clips for a MOTION reason shears tenant copy

- **Hit by:** 7 agents independently, all reaching for the same fix.
- **What happens:** the veil entrance requires `overflow: hidden` on the field
  it covers. That same `overflow: hidden` then shears any long unbroken
  tenant-authored string — a class name, a reward name, a rank name, a
  `wins_*` copy slot — instead of wrapping it. Nothing errors; the word is just
  cut off mid-glyph.
- **The rule:** **if a container clips for a motion reason, every
  tenant-authored string inside it needs an explicit wrap rule.**
  `overflow-wrap: anywhere` is the fix. Clamping (`-webkit-line-clamp`) handles
  the long-but-breakable case; it does NOT handle one long unbroken token.
- **Note:** this is the cost of the veil pattern, so it applies to any fork
  whose entrance covers rather than clips.
- **Promoted?** Not yet. This is the most valuable entry in the file —
  no existing guardrail covers it.

## FM-3 — no `box-sizing` reset, so `width: 100%` + padding overflows

- **Hit by:** 2 agents, at build time.
- **What happens:** this package carries **no global `border-box` reset**, so
  `width: 100%` plus horizontal padding computes wider than the parent by
  exactly twice the padding. A row runs off the right edge and everything
  inside it stops being centred. Related: a flex child's default
  `min-width: auto` refuses to shrink, so one long label widens the whole row.
- **The rule:** `box-sizing: border-box` on any element combining a percentage
  width with padding; `min-width: 0` on flex children that must be allowed to
  shrink.
- **Why it is here as well as in `mockup-qa`:** Pass 2b already documents it,
  but as a QA check — so it bit during the BUILD, twice, before any sweep ran.
- **Promoted?** Documented in `mockup-qa` Pass 2b. Not in the build-time
  guardrails.

## FM-4 — an emphasis inversion the arithmetic passes

- **Hit by:** 5 agents.
- **What happens:** the point sizes obey Guardrail 14 and the screen is still
  wrong, because weight, colour or case let a smaller element **tie for the
  eye** with rank 1. One case: a 700-weight 24px sans cost sitting under a
  400-weight 30px serif name — larger name, equal presence. Another: a 24px
  points balance out-sizing three of the four 21px rank-1 names on the screen.
- **The rule:** the size ladder is necessary and not sufficient. Guardrail 14's
  own one-second look is the actual test, and it must be run against a
  screenshot rather than against the stylesheet.
- **Promoted?** Guardrail 14 has the one-second test. It does not yet say
  that passing the arithmetic is not passing the test.

## FM-5 — deleting the shared chrome before fan-out blinds every screen agent

- **Hit by:** 5 agents could not open the harness at all.
- **What happens:** the fork's own `support/Showcase*` chrome is deleted when
  the shared layer is frozen, which is correct — but until EVERY screen has
  migrated, the surviving screens still import it, so `appAsset.tsx` pulls a
  broken module graph and `make dev` 500s. No agent can see its own screen in
  the real harness for most of the build. Several independently worked around
  it by spinning private vite roots on other ports; one then collided with
  another agent on the shared Chromium.
- **The rule (pick one, and say which in the workflow):** either delete the
  replaced chrome in a final serial pass AFTER the screens land, or tell every
  screen agent up front to spin its own vite root and expect the package build
  to be broken. Do not leave them to discover it.
- **Promoted?** Not yet. Belongs in `mockup-redesign-start`'s "Build as a
  workflow" section, which currently says the build parallelises without
  mentioning that the harness does not survive it.

## FM-6 — two surfaces that differ between the harness and the studio

- **Hit by:** 1 agent each, both needing a browser to find.
- **`.safeTop` is 0 in the dev harness and NON-ZERO in `Studio`'s
  `PhoneFrame`.** A field built as full-bleed against the harness grows a strip
  of canvas above it in the studio only. Anything that must reach the top edge
  has to account for `--phone-status-inset`, not assume it is zero.
- **A satin action band on a satin card ground disappears into it.** A design
  committed to ONE fill colour needs an explicit seam wherever two filled
  regions meet, or the primary action stops reading as a control.
- **Promoted?** Not yet. Both belong in `JsxMockUps/CLAUDE.md`.

## FM-7 — the frozen layer is where cross-screen defects hide

- **Hit by:** 3 agents flagged the first; none could fix either, because the
  files were frozen for the fan-out.
- **A shared primitive contradicted the fork's own motion law.**
  `celebrations/CountUpText.tsx` drove every count-up on `Curves.easeOutExpo`
  — the one curve `shell/phrase.ts` rules out by name — and `phrase.ts`
  promised a `Curves.easeOutCubic` twin that **did not exist in `curves.ts`**.
  Four cards rolled on the wrong curve and every screen agent was correctly
  forbidden from touching it.
- **A tokenised slot was never populated.** `ShowcaseRewardItem.themeSlot`
  exists, is documented as the thing that stops a reward changing picture
  between the store and the celebration, and is set nowhere — Guardrail 7's
  exact shape, inherited from the base.
- **The rule:** freezing a shared layer is right, but it makes the freezer the
  only person who can fix it. **Collect the frozen-layer flags from every agent
  report and act on them before QA** — they are the findings no single screen
  agent was allowed to resolve, and they are disproportionately cross-cutting.
- **Promoted?** Not yet.

## FM-8 — equal WIDTHS hide unequal HEIGHTS in a row of peers

- **Hit by:** 2 of 5 apps shipped it. A third had already hit it, fixed it, and
  named the symptom in its own stylesheet — where nobody looked. Found by
  eye in the browser, not by any gate.
- **What happens:** a row of sibling cells that read as ONE SET — stat tiles,
  chips, metric cells, summary boxes — is given equal WIDTHS (`flex: 1 1 0`
  plus `min-width: 0`) and content-sized HEIGHTS (`align-items: flex-start`,
  which is also what a Flutter `crossAxisAlignment: start` ports to). The moment
  one cell's caption wraps to a second line, that cell grows and its siblings do
  not. Where each cell draws a border, a fill or a rule, the row goes visibly
  ragged; where the cells carry dividers, the dividers stop short of each other.
- **Why it is easy to miss, and why every gate passes:** the widths ARE equal,
  so the row looks like the sizing job was done. The delta is small — 15px on a
  390pt screen, then scaled down into a phone frame — and reads as a spacing
  quirk rather than a defect. And it only appears for the ONE caption long
  enough to wrap, so a screen reviewed against short demo strings never shows
  it. Typecheck, lint, the suite, the token sweep and the inventory check are
  all blind to it: nothing is missing, nothing is extra, no token is invented.
- **The rule:** **siblings that read as one set must be one size on the axis
  they share.** `align-items: stretch` on the row. **If the visible box — the
  border, the fill, the radius — is on a CHILD of the flex item rather than on
  the flex item itself, stretching the cell is not enough:** the child must fill
  the cell it was handed, with `height: 100%` **and** `box-sizing: border-box`
  (no global reset here — see FM-3, or the padding and border are added on top
  of the cell and overflow it). The box a reader sees is the one that has to be
  equal, and it is not always the flex item.
- **Keep the content TOP-aligned, do not centre it.** Centring in the taller box
  misaligns the icons and the figures across the row, which trades one raggedness
  for another. Top-aligned, the icons, the figures and the first line of every
  caption still line up; only the empty space under a short caption grows.
- **Same failure on any shared axis** — a column of peers whose widths differ, a
  grid row whose cells size to content. Nothing about it is specific to height.
- **"The port is faithful" is how it survives review.** The origin app can carry
  the same defect for the same reason, so matching it looks like correctness.
  Fidelity is not the bar here; if you diverge, record the divergence in the
  stylesheet or the next agent restores it.
- **The check — measure, do not eyeball.** Read `getBoundingClientRect().height`
  for every cell AND for the bordered box inside it, and assert ONE distinct
  value across the row. A screenshot at phone scale will not reliably show a
  15px delta, which is exactly why this shipped twice.
- **Promoted?** Not yet. Belongs in `mockup-redesign-general` as its own
  guardrail — nothing there covers it. Guardrail 13 is about the GAPS between
  things and Guardrail 15 about DISTRIBUTION along the row; neither says that
  peers must be one SIZE.

---

## Things that did NOT go wrong, worth knowing

Recorded because they cost review time to re-derive:

- **The `--sc-*` / `--sp-*` token sweeps worked.** Zero invented token names
  across 11 screens. Grepping the token module before using a name is a habit
  that holds.
- **The CSS-module class sweep worked.** Zero `styles.x` referring to an
  undefined class, in the settled tree.
- **Two false positives to expect from `mockup-qa`'s own probes**, both of
  which will waste a pass if you trust them:
  - **`elementFromPoint` on an element scrolled below the fold returns `null`
    or the foot nav**, which reads as `BLOCKED` and is not. Only hit-test
    elements whose centre is inside the phone's visible box.
  - **A 3D-transformed element reports a distorted `getBoundingClientRect`
    ratio.** The rewards cover flow flagged as "-15% cropped" purely because
    its side pages are rotated in perspective; `object-fit` works in the
    element's own undistorted box and nothing was cropped. Check for a
    `rotateY` before believing a ratio finding.

---

## Living document

Append to this file whenever a build or a sweep turns up a new class of
failure — and when an entry is promoted into a real guardrail, mark it here
rather than deleting it. The evidence count is what justifies the rule to
whoever reads it next.
