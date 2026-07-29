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
| `RecomposeJsxMockUps/` | The feature-free mock screens. No logic, no API calls, no state. What the design agent edits and the studio previews. | TypeScript |
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
a helper — that is why `cx` is duplicated in both rather than shared.

The rule predates the package split; it was enforced inside the old single
package and the split made it structural. If you find yourself wanting to share
something between the studio and the mockups, duplicate it or push it down into
`RecomposeReact`. Do not add the edge.

The reason is the product: the mockups are the surface a design agent rewrites
freely. Every dependency they carry is a thing that can break when an agent
rearranges a screen.

## Three independent installs

The TypeScript packages are **not** an npm workspace. Each has its own
`package.json` and its own `node_modules`; you run `npm install` three times.

Cross-package imports resolve to **source**, not to built output — via `resolve.alias`
in each `vite.config.ts` and `paths` in each `tsconfig.json`. That keeps hot reload
working across boundaries and makes a missing export fail immediately rather than
against a stale `dist/`. The `file:../Sibling` entries in `dependencies` record the
intent; the alias is what actually resolves.

`RecomposeStudio`'s dev and preview port is **pinned to 8080** and must not be
changed casually — the API's CORS allowlist contains 8080 and not Vite's default 5173.

## Python: one package root, two surfaces

`ThemeTree/` and `RecomposeAPI/` are separate top-level packages in one Poetry
project (`pyproject.toml` lists both under `packages`). One `poetry install`
covers both.

They are deliberately not separate distributions. That is a decision for now, not
a principle — if the API ever needs its own release cadence, it earns its own
`pyproject` then and not before.

- **`RecomposeAPI` ships. `ThemeTree/studio` does not.** Studio binds to
  127.0.0.1:8002 and spends real money on every launch. Nothing about it is
  deployed, and nothing in it should assume it ever will be.

## Conventions that apply everywhere

- **Every CLAUDE.md here is a living document.** When code diverges from what one
  says — a renamed module, a new dependency, a rule the code outgrew on purpose —
  update that file **in the same change**. A stale rule produces false review
  findings and misleads the next contributor. If the doc is what diverged, fix the
  doc; if the code is, fix the code. They must agree when you are done.
- **Diagrams** are authored with the `mermaid-creation` skill and must pass its
  gates: top-down at the flow level, sibling-only edges, no `~~~`, and both the
  Mermaid-9 parse and the render before you call it done.
- **No assumptions.** When a decision has more than one reasonable answer, ask and
  wait rather than picking one quietly.

## What is not here

CombatDen — the class-based-gym CRM, member app and kiosk — is the **reference
implementation**, not part of this repo. It lives at
`/var/home/jm/Documents/CombatDen`. Inside this engine it is one app folder,
`apps/combatden/`, and the themes generated against it.
