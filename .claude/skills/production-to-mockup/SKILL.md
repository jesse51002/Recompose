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

**A port is not done until `.claude/skills/mockup-redesign-<app>/SKILL.md`
exists.** This is the mechanism [[Mockup_Guardrail_Skill]] names, and it is the
step most likely to be skipped because the screens already look right.

It must answer, for this app specifically:

1. **What assets exist and why exactly that many** — including the justification
   for any second asset.
2. **How every screen exits.** A table. Flag the ones with no bottom nav, whose
   single affordance is therefore load-bearing.
3. **Any flow's order, and which source proved it.** Name the file. If a config
   file disagrees, say so explicitly and say which won.
4. **Names that look wrong but are not** — concept-vs-screen mismatches, wire
   contracts, banned directory names.
5. **Screens that are easy to confuse** with each other.
6. **Upstream sources that have gone stale**, with what each has already caused.
7. **Known gaps against the real app that are unported, not broken** — so the
   next agent does not "fix" them by inventing something.

Write it from what you hit while porting, not from what you imagine. If nothing
surprised you, the file is too short and you have not looked hard enough.

Then link it: this skill, `mockup-redesign-general`, and the app's own file
should each point at the others.

## Also update

- `RecomposeJsxMockUps/CLAUDE.md` — structure and rules, in the same change.
- `Concepts/_Index.md` in the vault if the port surfaced a genuinely new concept.

---

## Verification

`make -C RecomposeJsxMockUps check` proves typecheck, lint and tests and
**nothing about what renders**. Open the harness, screenshot every screen, and
walk every route confirming each exits:

```bash
make -C RecomposeJsxMockUps dev &
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B goto http://localhost:8081/ ; $B screenshot /tmp/app.png ; $B console --errors
```

Read the PNGs. Re-snapshot between navigations — refs go stale after a route
change and a stale click silently hits the wrong element.

The port is complete when: every screen renders styled, every screen exits,
every flow's last screen returns to its root, and the app's guardrail skill
exists.
