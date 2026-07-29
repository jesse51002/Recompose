---
name: mockup-redesign-start
description: RUN THIS FIRST, before any other redesign skill and before opening a single file, whenever creating a new design fork of a mock app. It is the phase that commits to a design direction — a visual world derived from the already-produced theme (its generated imagery, palette and typefaces) and the brand brief, not from the existing app — and writes it to layout_brief.yaml before any code exists. Pair with the impeccable skill, then hand off to mockup-redesign-general and the app's own skill.
---

# Starting a redesign — commit to a world before you write a line

Your job is to produce an app that **does not read as the base**. Same product
truth, same screens, same information — a different piece of design.

> [!important]
> **The direction is decided ONCE, by you, alone. The screens are then BUILT BY
> PARALLEL AGENTS, one per screen, in a workflow.** Those are not two styles of
> working — they are the two halves of this skill, and doing either the other
> way round is a known failure. Fanning out the direction gives you four
> incompatible worlds; building a dozen screens serially in one context is
> punishingly slow for no gain, because once the shared layer is frozen the
> screens do not touch each other's files. See "Build as a workflow" below,
> which is not optional.

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
  a requirement. A sheet, a full-screen pager, a scrolling or segmented header,
  swipe between sections, an overlay menu, gesture-first with one persistent
  affordance — all keep the same destinations reachable, which is all the
  invariant asks. Biggest lever, most often left alone.

  **Not a vertical side rail** — `mockup-redesign-general` Guardrail 11.
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

## Build as a workflow, one agent per screen — NOT OPTIONAL

**You MUST use a workflow to build the screens, with one agent per screen.**
This is the default and the expectation, not an optimisation to reach for when a
redesign feels large. Writing a dozen screens one after another in a single
context is punishingly slow and buys nothing: once the direction and the shared
layer are fixed, the screens are independent to write and touch disjoint file
sets. Eleven screens is eleven agents.

**Reach for the `Workflow` tool.** `Agent` calls in a loop are not the same
thing — the workflow is what gives you the pipeline (structure then craft per
screen, with no barrier between them), the phase grouping, and a run you can
resume after editing the script.

**If your harness will not let you spawn agents**, say so in your first reply
and ask whether to proceed serially — do not silently spend an hour doing by
hand what the skill told you to fan out. A serial build is a fallback with a
real cost, not an equivalent choice, and the user should get to decide whether
to pay it.

**Do not fan out the browser work.** `browse` is a single shared Chromium, so
parallel agents navigate out from under each other and every finding needs
re-validating. The build parallelises; the sweep does not.

What each pass does stays the same; the workflow is how they are run:

1. **Structure** — the screen rebuilt in the new world. Ugly is acceptable
   here; the wrong *shape* is not, because everything after inherits it.
2. **Craft** — `impeccable`'s quality floor: rhythm, alignment, type, detail.
3. **Motion** — the motion direction, applied.
4. **Review, then sweep** — `/code-review low` first, then `mockup-qa`. Both
   serial; only the sweep needs a browser.

### The shape

```js
// 1. FOUNDATION — one agent, before any fan-out. Nothing is parallel yet.
//    Token module, the surface/token root, and the shared chrome every screen
//    renders. Freeze it here.
await agent('From layout_brief.yaml, build the token module, the surface and ' +
            'the shared chrome. Do not touch any screen.')

// 2. SCREENS — one agent each, structure then craft, no barrier between them.
//    A screen reaching craft while another is still in structure is the point.
const built = await pipeline(SCREENS,
  s => agent(`Rebuild the ${s} screen in the committed world. ${BRIEF}`,
             {label: `structure:${s}`, phase: 'Structure'}),
  (_, s) => agent(`Craft pass on ${s}: impeccable's quality floor. ${BRIEF}`,
             {label: `craft:${s}`, phase: 'Craft'}),
)

// 3. MOTION — after every screen exists; it is judged across a whole asset.
await agent(`Apply the motion direction across both assets. ${BRIEF}`)
```

Then, outside the workflow and in this order:

1. **`/code-review low` over the diff.** Static, no browser, and it catches the
   whole class of defects a reader can see — a dangling import, a handler never
   wired, a class name that does not exist, a prop no caller passes. Fixing
   those here means not chasing them through a browser later.
2. **`mockup-qa`, in one serial session.** Browser time is the expensive part
   and there is only one browser.

### The rules that make it work

- **Never fan out the direction.** STEPS 1–3 are one decision made once. Ask
  four agents to choose a world and you get four worlds, and no amount of later
  craft reconciles them.
- **Freeze the shared layer before fan-out.** Tokens, the surface, the chrome.
  Skip this and every screen agent invents its own spacing scale and type ramp
  in parallel — the most expensive possible way to produce an incoherent app.
- **Hand every screen agent the `layout_brief.yaml` verbatim.** It is the only
  thing holding the parallel work together. Summarising it per agent is how
  drift starts.
- **Scope each agent to its own screen's files, and name them.** Screens live
  in separate folders; that is what makes this safe. Two agents editing one
  file is lost work.
- **No worktree isolation.** Because the file sets do not overlap, agents can
  share the checkout — and isolating them would just create merges to do by
  hand afterwards.
- **Anything judged ACROSS screens stays serial**, and so does anything using
  a browser: motion, the review, the sweep, and your own look at the result.

Between passes, screenshot and look. `make check` proves the code compiles; it
proves nothing about the design, and it passes cleanly on screens that render
completely unstyled.
