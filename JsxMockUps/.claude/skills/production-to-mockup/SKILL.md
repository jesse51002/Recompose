---
name: production-to-mockup
description: Port a production app into a new interactive mock asset in JsxMockUps — a new app under src/apps/, its assets, and the guardrail skill the port must emit. Use when onboarding a new app to the mockups, adding a screen ported from a real app, or standing up a visual mirror for a platform. Not for editing an existing mock; that is mockup-redesign-general plus the app's own skill.
---

# Production app → mock asset

Turning a real app into a [[Visual_Mirror]]: a feature-free JSX mock a design
agent rewrites freely and a tenant watches.

The port is **not finished when the screens render.** It is finished when the
next agent can pick the mock up without rediscovering what breaks it — which
means the port emits a skill (see *The deliverable* below). That is the whole
reason this skill exists as a separate step rather than a note at the end of a
redesign skill.

Load **`mockup-redesign-general`** alongside this one; every rule there applies
while you build.

---

## What a mock is, and what it is not

- **Feature-free.** No business logic, no API calls, no fetching, no state
  beyond what a screen needs to look right.
- **Interactive.** An asset is something you click through. Everything reachable
  by tapping belongs in ONE asset.
- **Arrangement only.** The port changes where things sit, never what exists. No
  screen merged or split, nothing added, nothing removed.
- **Fixed size, uniformly scaled.** Authored at the real device size, scaled by
  transform, never reflowed.

## Shape of a new app

```
src/apps/<app_id>/
  <screens…>            ported, one folder per screen
  showcaseTokens.ts     the --sc-* surface for THIS app
  ShowcaseThemeVars.tsx writes those vars onto one element
  <App>Surface.tsx      composes the content provider + theme vars
  appContent.tsx        the demo content every screen shares
  <asset>.tsx           one per asset: routes, initial route, provider
  index.ts              defineMockApp({ id, label, assets })
```

`src/kit/` does **not** change. If you find yourself editing the kit to add an
app, the thing you are adding is app-specific and belongs in the app. The kit
knows about assets, routes, registries and scaling; it must never learn a screen
name or a token name.

## Deciding the assets

**Start with one.** Add a second only when a screen genuinely cannot be reached
by tapping anything — a flow that fires after an external event, for instance.
Splitting for any other reason rebuilds the slideshow assets replaced.

Then, for every screen, decide its exit before you build it (see
`mockup-redesign-general` Guardrail 4). A screen whose exit you cannot name is a
screen that will strand a reviewer.

## Porting rules

**The live source is the authority.** Not config that describes it, not demo
constants, not an older mirror.

- **Demo/mock constants in the real app are usually dead.** They exist for the
  app's own previews and drift from what screens actually build. Find the
  builder the screen calls and port *that*. This has already shipped a stat tile
  the app had deleted.
- **Config that describes the app goes stale.** Slot descriptions in the
  pipeline's `app.yaml` narrate screens and orderings; when they disagree with
  the code, the code wins. Fix the description separately.
- **A previous mirror is a stale source.** If an earlier preview exists, check
  when it was last touched against when the app went live.
- **Read `git log` and open branches** before trusting any file as current.

**Port the behaviour, not just the paint.** If the real screen skips its intro
on tap, or hides a CTA until it settles, that is part of the screen. Those are
also exactly the mechanisms that create dead ends when half-ported.

**Keep names that carry meaning across the boundary.** Icon/copy slot ids are a
wire contract with the pipeline; renaming them to read better breaks resolution.

## Wiring navigation

Tap handlers live **where the affordance is** and import a route id — never a
callback threaded down through layout layers, which is the first thing to break
when an agent rearranges a screen.

`nav.go` pushes, `nav.replace` advances a flow without leaving the old screen
behind, `nav.reset` returns to the asset root. Tab switches reset.

---

## The deliverable: the app's own guardrail skill

**A port is not done until
`JsxMockUps/.claude/skills/mockup-redesign-<app>/SKILL.md` exists.** This is the mechanism [[Mockup_Skill]] names, and it is the
step most likely to be skipped because the screens already look right.

**It has TWO halves, and it is not done with only one.**

### Half one — the complete inventory, in plain prose

A full written description of the app, so nothing can be missed by someone who
cannot run it. **Prose and tables, not code.** Code says what is; this half says
what must be, which is what you check against.

It must list:

1. **Every asset**, and why exactly that many — including the justification for
   any second one.
2. **Every screen in each asset.** For each: what it is, what the member does
   there, and **everything it must contain** — every region, control, image slot
   and piece of copy. This is the checklist a redesign is judged against; an
   element missing from here is an element a redesign can silently drop.

   **Write presence, never form.** "A thumbnail", not "a 16:9 thumbnail". "The
   four info-bar items", not "a four-column strip". Size, aspect, order,
   emphasis and grouping belong to the redesign, and an inventory that pins one
   forbids the thing this package exists to do — silently, because it reads as
   a requirement rather than as a description of the app you ported. If you
   catch yourself describing the layout, you are writing PART TWO.
3. **Every transition between screens**, both directions. What triggers it,
   which screen it lands on, and what happens to the history — pushed, replaced,
   or reset to root.
4. **How every screen exits**, in a table. Flag the ones whose single affordance
   is the only way out, because those are the ones that become dead ends.
5. **The order of any flow**, and which source proved it. Name the file.
6. **THE EMPHASIS RANKING — one row per screen, and it is not optional.** For
   every screen, name what LEADS, what comes second and third, and what merely
   supports. This is the one place the inventory is allowed to talk about
   prominence, and it has to, because everything else here deliberately does
   not.

   **Why it lives here rather than in a redesign.** "A member scanning a
   schedule is looking for the class, not the clock" is a fact about the
   PRODUCT, true of every fork ever built from it. Decided once here, every
   redesign inherits the same answer; left out, each fork invents its own and
   three of them are wrong. A fork may express the ranking however it likes —
   scale, weight, colour, position, space — but may not reorder it.

   Write it as a table: screen, rank 1, rank 2, rank 3, supporting. Rank 1 is
   the thing a member is scanning for — usually **the name of a thing, TOGETHER
   WITH the picture of that thing.**

   **A name and its picture are ONE object at rank 1, not a thing and its
   decoration.** Where the pipeline generates an image from a piece of copy
   (`depends_on_text` in the app's `app.yaml`), that dependency is the proof:
   they are one claim about one item, and they get sized, placed and emphasised
   together. Splitting them — big picture, small name — produces the
   thumbnail-beside-caption row that every app in the category looks identical
   in.

   **Derive it from what the member came to do, not from what the source app
   made biggest.** The origin app may have got it wrong too; you are recording
   the product's intent, and where you disagree with the shipped screen, say so
   in PART TWO.

   This exists because a redesign shipped here with every element present,
   correctly themed and correctly spaced, and the largest thing on its schedule
   was the start time at 40px above a class name at 17px. No gate in this
   package could see it — an inventory check passes when everything is there,
   and everything was.

Write it so a reader can reconstruct the whole app in their head, in order,
without opening a single file. If a screen's description does not say what it
must contain, that screen has no accept condition.

### Half two — the gotchas

What will break the next agent, which the inventory cannot tell them:

6. **Names that look wrong but are not** — concept-vs-screen mismatches, wire
   contracts, banned directory names.
7. **Screens that are easy to confuse** with each other, and what breaks if they
   are.
8. **Upstream sources that have gone stale**, with what each has already caused.
9. **Known gaps against the real app that are unported, not broken** — so the
   next agent does not "fix" them by inventing something.
10. **Anything that surprised you during the port.** If nothing did, you have not
    looked hard enough and this section is too short.

Then link it: this skill, `mockup-redesign-general`, and the app's own file
should each point at the others.

## Seeding an existing catalogue

Adding an image slot leaves every already-produced run without it. `scripts/prefill`
fills them at zero cost, category-matched:

```bash
poetry run python scripts/prefill/run.py \
  --all-runs apps/<app> --app-yaml apps/<app>/app.yaml \
  --seed-root apps/<app>/prefill        # only when seeds and runs are in different checkouts
```

`--seed-root` exists for exactly the branch case: the seed set is committed on
the branch that added it while the catalogue lives in the root checkout, and
the two must meet. Without it the script skips every run with "no seed folder
for category X", which looks like a category bug and is a path one.

Wire the mockups and seed the catalogue **together**. Wiring alone makes every
existing theme fall through to whatever bundled asset the app ships, which is
visibly worse than before the change.

**Seed the copy in the same pass as the pictures.** An image slot may declare
`depends_on_text`, which makes the picture and the name one claim about what the
thing IS — so `prefill` reads both out of the same source row (`<slot>.jpg` and
`texts.yaml` under the same category folder). Seed one without the other and you
get a photograph of a boxing class labelled "Sunrise Flow", which is worse than
seeding neither.

**`--run-dir` and `--all-runs` used to disagree on a symlinked run.** Run
directories are routinely symlinks into another checkout — that is what
`setup_worktree_env.sh` creates — and `resolve()` silently relocates one into
the checkout it points at, where a branch that just added seeds has none. Both
modes use `absolute()` now; if you add a third target mode, do the same.

## Also update

- `JsxMockUps/CLAUDE.md` — structure and rules, in the same change.
- `Concepts/_Index.md` in the vault if the port surfaced a genuinely new concept.

---

## Verification — run `mockup-qa`

`make -C JsxMockUps check` proves typecheck, lint and tests and
**nothing about what renders**.

Run **`mockup-qa`**. It owns the sweep — do not improvise a shorter version
here. What matters for a PORT specifically is that it checks the render against
the inventory you just wrote: if the sweep cannot find a screen the inventory
promises, or finds one the inventory does not list, then one of the two is
wrong. Fix whichever it is; a wrong inventory is worse than none, because
everything downstream trusts it.

The port is complete when `mockup-qa` passes in full and the app's guardrail
skill exists with both halves.
