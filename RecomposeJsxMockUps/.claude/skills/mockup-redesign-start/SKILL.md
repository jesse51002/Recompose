---
name: mockup-redesign-start
description: RUN THIS FIRST, before any other redesign skill and before opening a single file, whenever creating a new design fork of a mock app. It is the phase that commits to a design direction — a visual world derived from the brand brief, not from the existing app — and writes it to layout_brief.yaml before any code exists. Pair with the impeccable skill, then hand off to mockup-redesign-general and the app's own skill.
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

Be radical. A direction that goes too far can be pulled back; one that never
left cannot be pushed.

---

## STEP 1 — Decide before you look

Read these, in order, and **stop before opening any `.tsx` or `.css`**:

1. **The app's skill, PART ONE only** — e.g. `mockup-redesign-combatden`. It is
   a plain-prose **inventory**: every screen, everything on it, every
   transition. It exists so you can know *what must be there* without seeing
   *how it looks now*. Treat it as a requirements list from a client who has
   not shown you their old app.
2. **The brand brief** — `apps/<app>/<run>/customization.yaml` for the design
   you are forking for. Its `design_direction` and `colors_direction` are the
   real input: audience, voice, feel, materials, hard nos.

Read the code later, when you build. Not while you are deciding what the thing
should be — you cannot un-see it, and every edit after that anchors to it.

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
- **Typography as structure.** Where hierarchy comes from — scale, weight, case,
  tracking, rules, position, colour, or omitting the heading entirely.
- **The navigation pattern.** See *What you may change*; this is the biggest
  lever you have.
- **Imagery.** Full-bleed, inset, masked, duotone, tiny, absent. The generated
  photography is the largest visual surface in the app — how it is presented
  moves the design further than any spacing decision.
- **Motion.** Its character in a phrase, and what it does to the user's
  understanding: reveal, settle, transport, punctuate.
- **Three things you will deliberately NOT do**, because they are the defaults
  everyone reaches for.

Judge the direction against **the brief**, and against whether a designer would
be proud to have committed to it. Do not judge it against the base — measuring
distance from the incumbent is how you end up next to it.

---

## STEP 3 — Write it down before you write code

Author `src/apps/<new-id>/layout_brief.yaml` from the direction you committed
to, **before** any other file exists. Contract:
`ThemeTree/studio/schema/layout_brief.py` — `name`, `layout_direction`,
`motion_direction`, each a `short_desc` and a `long_desc`, nothing else.

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
  full-bleed pager, vertical → horizontal. A schedule need not be rows.
- **Change information density radically**, either way — one item per screen, or
  the whole week at once.
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

## Iterating with `/loop`

A full redesign does not land in one pass. Drive the passes with `/loop`, and
give each one a single job:

1. **Structure** — every screen in the new world. Ugly is acceptable here; the
   wrong *shape* is not.
2. **Craft** — `impeccable`'s quality floor: rhythm, alignment, type, detail.
3. **Motion** — the motion direction, applied.
4. **Sweep** — `mockup-qa`, fix, re-sweep.

Between passes, screenshot and look. `make check` proves the code compiles; it
proves nothing about the design, and it passes cleanly on screens that render
completely unstyled.
