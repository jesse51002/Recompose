---
name: mockup-redesign-start
description: RUN THIS FIRST, before any other redesign skill and before opening a single file, whenever creating a new design fork of a mock app. It is the phase that commits to a design direction — a visual world derived from the already-produced theme (its generated imagery, palette and typefaces) and the brand brief, not from the existing app — and writes it to layout_brief.yaml before any code exists. Pair with the impeccable skill, then hand off to mockup-redesign-general and the app's own skill.
---

# Starting a redesign — commit to a world before you write a line

Your job is to produce an app that **does not read as the base**. Same product
truth, same screens, same information — a different piece of design.

**Load `impeccable` now.** This skill says what to decide and what you may not
break; `impeccable` is how you decide it well. Use its `shape` command and
`reference/new-work.md` (the replacement-visual-world path), and its rule:

> Redesign keeps product truth, content, function and constraints, but treats
> the old look as **evidence and anti-reference**. Never split the difference
> into polish on the discarded look.

A direction that goes too far can be pulled back; one that never left cannot be pushed.

---

## STEP 1 — Decide before you look

**The theme is already chosen and already produced.** Its run directory is the
other half of this design, it is finished, and it is not yours to change. Your
layout is being built *for these pixels*.

Take these three inputs, in order, and **stop before opening any `.tsx` or
`.css`**:

### 1. The theme — `apps/<app>/<run>/`

Start here, and **actually open the images**. They are the largest visual
surface in the app and the strongest constraint on any layout you can propose.

| what | where | what to take from it |
| --- | --- | --- |
| the generated imagery | `final_images/*.png` | Look at every one. Their subject, crop, colour and weight. |
| the nav icons | `icons/*.svg` | Monochrome, tinted at render — their stroke weight sets a floor for how fine the rest of your chrome can be. |
| palette, fonts, copy | `output.yaml` | `color_set` (oklch, plus `mode`), `font_set` (two real families), `text_set` (the brand's own words). |
| the brief behind it | `customization.yaml` | `design_direction` and `colors_direction`: audience, voice, feel, materials, hard nos. |

Three things to read off it that change what layouts are even available:

- **Cutout vs scene.** A slot with `scene: true` in `apps/<app>/app.yaml` is a
  photograph with its own background and edges; everything else is a cut-out
  object on transparency. Cutouts float, overlap and composite onto any
  surface; scenes want an edge to sit against and break when you try to float
  them. Count each and note *which screens* the scenes land on: that tells you
  where the app can carry real photography and where it is objects on a field,
  and a world that wants full-bleed imagery on a screen holding only cutouts is
  a world you cannot build.
- **The typefaces are real and specific.** A serif display face and a condensed
  grotesk want different layouts. Build for the pair you were given rather than
  a generic scale — the display face in particular should be doing visible work,
  not sitting at 19px above body copy.
- **Mode and chroma.** A near-black background with one low-chroma primary is a
  different design problem from a bright surface with a saturated one. Check
  `mode` and the actual oklch values rather than assuming.

Use `make api` on :8001 to view them served, or just open the PNGs.

### 2. The app's skill, PART ONE only

`mockup-redesign-<app>`, whichever app you are forking. PART ONE is a
plain-prose **inventory**: every screen, everything on it, every transition. It
exists so you can know *what must be there* without seeing *how it looks now*.
Treat it as a requirements list from a client who has not shown you their old
app.

### 3. Nothing else

Read the code later, when you build — not while you are deciding what the thing
should be. You cannot un-see it, and every edit after that anchors to it.

---

## STEP 2 — Commit to a visual world

Use `impeccable`'s `new-work` path. Decide each of these concretely enough that
two people reading your answer would build recognisably the same app:

- **The thesis.** One line naming this app's visual argument. A real position —
  *a printed training manual*, *a dark equipment locker*, *a broadcast
  scoreboard*, *a membership card you carry* — not "clean and modern".
- **The spatial system.** The underlying structure: strict grid, single column
  with full-bleed breaks, stacked sheets, edge-to-edge with no gutters. Does
  content sit on cards, on bare canvas, in frames, behind glass?
- **Typography as structure**, for the two families the theme actually resolved.
  Where hierarchy comes from — scale, weight, case, tracking, rules, position,
  colour, or omitting the heading entirely — and what the display face is for.
- **The navigation pattern.** See *What you may change*; this is the biggest
  lever you have.
- **Imagery, named per slot.** Full-bleed, inset, masked, duotone, tiny, absent
  — decided against the images you actually looked at in STEP 1, not in the
  abstract. This moves the design further than any spacing decision, and the
  cutout/scene split is what makes a given treatment possible or impossible.
- **Motion.** Its character in a phrase, and what it does to the user's
  understanding: reveal, settle, transport, punctuate.
- **Three things you will deliberately NOT do**, because they are the defaults
  everyone reaches for.

Judge the direction against **the brief and the theme you were handed** — does
it serve that brand, and does it make those specific images and typefaces look
like they were chosen for it? And against whether a designer would be proud to
have committed to it. Do not judge it against the base; measuring distance from
the incumbent is how you end up next to it.

---

## STEP 3 — Write it down before you write code

Author `src/apps/<new-id>/layout_brief.yaml` from the direction you committed
to, **before** any other file exists. Contract:
`ThemeTree/studio/schema/layout_brief.py` — `name`, `layout_direction`,
`motion_direction`, each a `short_desc` and a `long_desc`, nothing else.

Give it the **design's own name**, matching the run you designed against, so
the two halves of the design are legible as a pair without a field pointing at
one from the other.

Write it as a **direction**: what the app IS, in the imperative, about intent.
Not as a changelog of differences from the base. If a line of it reads "the
gutter opens to 1.5×, the heading drops to an eyebrow", rewrite it — that is a
diff, and a diff means the old design is still the frame.

Then hold yourself to it. When you are forty files deep and tempted to leave a
component roughly as it was, the brief is what already decided otherwise. If a
choice contradicts it, either the choice changes or the brief does — explicitly.

---

## What you may change — almost everything

The invariant is **functional equivalence**. It constrains what is *present and
reachable*, and says nothing about form. Read it as permission.

**You may NOT:**

- add a screen, remove one, merge two, or split one;
- add a feature or remove one;
- drop information — every fact on a screen stays on that screen;
- make a screen unreachable, or leave one with no way off it;
- fetch anything, hardcode a colour, or invent a token.

**You MAY — and where the direction calls for it, SHOULD:**

- **Replace the navigation pattern.** A bottom tab bar is the base's answer, not
  a requirement. A rail, a sheet, a pager, a persistent header, gesture-first,
  an overlay — all keep the same destinations reachable, which is all the
  invariant asks. Biggest lever, most often left alone.
- **Change what a screen is made of.** Cards → bare canvas, list → grid, grid →
  full-bleed pager, vertical → horizontal. A list of things is not required to
  be rows.
- **Change information density radically**, either way — one item per screen, or
  everything at once.
- **Reorder a screen's contents** by importance, as long as everything is there.
- **Replace the type and spatial systems, the motion language, and how imagery
  is presented** outright.
- **Give a screen a different reading order.** The invariant is about what is
  present and reachable, not where it sits.

If your direction seems to require bending the invariant, re-read it — it is
more permissive than it first appears.

---

## The anti-reskin tests

Run all four on your own work before reporting done. Any **yes** is a fail.

1. **Side-by-side.** Screenshot the same screen in base and fork. Would someone
   shown only these say *"same app, restyled"*?
2. **Skeleton.** Reduce both to grey boxes. Same arrangement of boxes — topbar,
   list of rows, bottom bar in the same places?
3. **Diff.** Is your work describable as a list of adjustments — spacing,
   weight, radius, size? That is polish. A redesign is describable as a
   different idea.
4. **Origin.** Could a reader of your `layout_brief.yaml` reconstruct the design
   without having seen the base? If it only makes sense as a delta from the
   base, it is one.

On a fail, do not nudge harder in the same direction. Return to STEP 2 and
commit to a different world.

---

## Then build

Hand off to:

- **`mockup-redesign-general`** — the guardrails for any app: token root, token
  names, shorthands, dead ends, the one-index rule, verification. Load
  `impeccable`'s `reference/craft-floor.md` alongside it before editing UI.
- **The app's own skill**, PART TWO — the gotchas.
- **`mockup-qa`** at the end. Not optional.

## Build it in passes, each with one job

A full redesign does not land in one sweep of the codebase. Work through it in
order, and finish each pass before starting the next:

1. **Structure** — every screen rebuilt in the new world. Ugly is acceptable
   here; the wrong *shape* is not, because everything after this inherits it.
2. **Craft** — `impeccable`'s quality floor: rhythm, alignment, type, detail.
3. **Motion** — the motion direction, applied.
4. **Sweep** — `mockup-qa`, fix what it finds, re-sweep.

Between passes, screenshot and look. `make check` proves the code compiles; it
proves nothing about the design, and it passes cleanly on screens that render
completely unstyled.
