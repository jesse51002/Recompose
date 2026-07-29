# Recompose — Monorepo Root

This repo is the engine. It is the whole company: a brand brief goes in, a
store-ready branded app comes out. The strategy vault lives one level up in
`../docs/` — read `../CLAUDE.md` for what Recompose is and who buys it. **This
file is about how the code is organized.**

## The subsystems, and the direction they depend

Every subsystem owns a `CLAUDE.md`. Read the one for the directory you are
editing **before** you edit it; it is authoritative for its own scope and
overrides anything general said here.

| Directory | What it is | Language |
|---|---|---|
| `ThemeTree/` | The pipeline. The dependency DAG that resolves colour, typography, copy, icons and images into an `output.yaml`. Also `ThemeTree/studio/`, the local-only run-orchestration API. | Python |
| `RecomposeAPI/` | The **read-only** API over a produced `output.yaml`. GET-only. The only Python surface that ships. | Python |
| `RecomposeFlutter/` | The Flutter theme runtime. Fetches a tenant's resolved branding at startup and exposes resolvers that never throw. | Dart |
| `RecomposeReact/` | The **web** theme runtime — the React mirror of `RecomposeFlutter`. Ships no screens and no assets. | TypeScript |
| `RecomposeJsxMockUps/` | The feature-free mock **assets** — interactive mocks you click through, on an app-agnostic kit. No logic, no API calls, no fetching. What the design agent edits and the studio nests. | TypeScript |
| `RecomposeStudio/` | The standalone theme browser: Library, Inspect and Studio views. | TypeScript |

Dependencies run one way and must keep running one way:

```
RecomposeStudio ──> RecomposeJsxMockUps ──> RecomposeReact ──> RecomposeAPI
                └────────────────────────────────>┘
```

`ThemeTree` produces what `RecomposeAPI` serves. Nothing depends on
`RecomposeStudio`. **There are no cycles and there must never be one.**

## The island rule

`RecomposeJsxMockUps` may import from `RecomposeReact` and from itself. **From
nothing else.** It may not reach into `RecomposeStudio` for a widget, a token or
a helper — that is why `cx` and `useElementSize` are duplicated in both rather
than shared.

It carries a second, internal one-way rule: `src/kit/` (app-agnostic) may not
import `src/apps/`. An app reaches the kit by calling `defineMockAsset` /
`defineMockApp`, never the reverse — which is what makes a new app a folder
rather than a change to the machinery. Its own eslint Gate 1 enforces it.

**There are two apps now, and the second one is there to keep that claim
honest.** `src/apps/cafe/` is a café ordering flow with its own token
vocabulary, its own device size and its own layout language; adding it changed
the kit not at all. An app folder also may not import a sibling app folder —
nothing enforces that yet, but deleting one app must never break another.

The rule predates the package split; it was enforced inside the old single
package and the split made it structural. If you find yourself wanting to share
something between the studio and the mockups, duplicate it or push it down into
`RecomposeReact`. Do not add the edge.

The reason is the product: the mockups are the surface a design agent rewrites
freely. Every dependency they carry is a thing that can break when an agent
rearranges a screen.

## Each subsystem owns its own dependencies

Every subsystem stands alone: it declares what it depends on and installs on its
own. There is no shared lockfile and no workspace linking across the repo. Adding
one would be an architecture decision, not a convenience.

Where a subsystem depends on a sibling, cross-package imports resolve to **source**
rather than to built output. That keeps hot reload working across the boundary and
makes a missing export fail immediately instead of failing against a stale build
directory. Declared dependencies record the intent; the resolver config is what
actually resolves.

Anything more specific than that — install commands, ports, config filenames, which
tool does the resolving — lives in the subsystem's own CLAUDE.md, because that is
the only place it can be kept true.

**Every subsystem also owns a `Makefile`**, and each answers the same few verbs so
the root can fan out to all of them uniformly. Run `make help` anywhere to see what
that subsystem offers; the root's `help` lists the subsystems and the common loops.
Add a target to the subsystem that owns the work, never to the root.

## Python: two surfaces, one of which ships

`ThemeTree/` and `RecomposeAPI/` are separate top-level packages. Whether they
share one project or split into separate distributions is an arrangement rather
than a principle — read `pyproject.toml` for how it stands today, not this file.

**`RecomposeAPI` ships. `ThemeTree/studio` does not.** Studio binds to localhost
and spends real money on every launch. Nothing about it is deployed, and nothing
in it should assume it ever will be. That distinction is load-bearing and is not
expected to change.

## Conventions that apply everywhere

- **Every CLAUDE.md here is a living document.** When code diverges from what one
  says — a renamed module, a new dependency, a rule the code outgrew on purpose —
  update that file **in the same change**. A stale rule produces false review
  findings and misleads the next contributor. If the doc is what diverged, fix the
  doc; if the code is, fix the code. They must agree when you are done.
- **Diagrams** are authored with the `mermaid-creation` skill and must pass the
  gates it defines. The skill is the source of truth for what those are.
- **No assumptions.** When a decision has more than one reasonable answer, ask and
  wait rather than picking one quietly.

## What is not here

CombatDen — the class-based-gym CRM, member app and kiosk — is the **reference
implementation**, not part of this repo. It lives at
`/var/home/jm/Documents/CombatDen`. Inside this engine it is one app folder,
`apps/combatden/`, and the themes generated against it.
