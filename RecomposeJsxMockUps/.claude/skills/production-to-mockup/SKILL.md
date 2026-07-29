---
name: production-to-mockup
description: Port a production app into a new interactive mock asset in RecomposeJsxMockUps — a new app under src/apps/, its assets, and the guardrail skill the port must emit. Use when onboarding a new app to the mockups, adding a screen ported from a real app, or standing up a visual mirror for a platform. Not for editing an existing mock; that is mockup-redesign-general plus the app's own skill.
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
`RecomposeJsxMockUps/.claude/skills/mockup-redesign-<app>/SKILL.md` exists.** This is the mechanism [[Mockup_Guardrail_Skill]] names, and it is the
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
3. **Every transition between screens**, both directions. What triggers it,
   which screen it lands on, and what happens to the history — pushed, replaced,
   or reset to root.
4. **How every screen exits**, in a table. Flag the ones whose single affordance
   is the only way out, because those are the ones that become dead ends.
5. **The order of any flow**, and which source proved it. Name the file.

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

## Also update

- `RecomposeJsxMockUps/CLAUDE.md` — structure and rules, in the same change.
- `Concepts/_Index.md` in the vault if the port surfaced a genuinely new concept.

---

## Verification — run `mockup-qa`

`make -C RecomposeJsxMockUps check` proves typecheck, lint and tests and
**nothing about what renders**.

Run **`mockup-qa`**. It owns the sweep — do not improvise a shorter version
here. What matters for a PORT specifically is that it checks the render against
the inventory you just wrote: if the sweep cannot find a screen the inventory
promises, or finds one the inventory does not list, then one of the two is
wrong. Fix whichever it is; a wrong inventory is worse than none, because
everything downstream trusts it.

The port is complete when `mockup-qa` passes in full and the app's guardrail
skill exists with both halves.
