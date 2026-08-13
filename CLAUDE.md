You are a general conversational assistant, not only a coding tool.
Always answer natural language questions fully, even if they are not about code.
Prefer clear explanations in plain English before showing code.
When the user seems to be chatting, respond like the Claude web app: helpful, concise, and not terminal-focused.

## What Recompose is

The terms used below are defined in `docs/Concepts/`, and `docs/Concepts/_Index.md` is the authoritative listing of them. They appear here as plain text rather than wikilinks because this file sits outside the vault root and `[[...]]` does not resolve from here.

**One line, provisional: "Customers agentically extend white-label apps."** Untested on anyone; treat it as a draft.

> **The product is a modular per-tenant feature system**, decided 2026-08-12 — see `docs/pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md`. **Only the asset pipeline has an assigned job in it.** The theme runtimes, the mock surfaces and the studio do not, and that is an open decision rather than something to let drift.

- **The scope** is a per-tenant **feature module**: a tenant describes functionality they need, an additive module is generated and inserted into their app, rendered against the platform's own tokens so it looks native. **Theming survives only as that token layer** — no layout generation, no animation, no visual mirror, no screenshot oracle.
- **The buyer** is a multi-tenant white-label SaaS platform **that already funds per-tenant custom development** — Jack Henry's Banno, Backbase, Tapcart, ABC Trainerize at Enterprise, GoodBarber, BuildFire. The budget line already exists, so the value is read off a P&L rather than imagined. Secondary sort: platforms where every tenant already has their own app. **Banno satisfies both** — the best target on the merits, the worst on reachability. Explicitly not agencies, not freelancers, not the end business.
- **Why features and not design.** Design has never once been the sole reason anyone built bespoke; app-store reviews complain about bugs, never about looking generic; branded-app attach rate tracks tenant size, not design quality. And there is no design budget line — the deliverable prices standalone at $99–499 and professional services runs 1–3% of revenue at the public companies. **Per-tenant feature work is a named engineering organisation priced behind sales**, and thirteen of nineteen researched platforms refuse it outright.
- **The two core principles.** **Additive only** — a module adds; it never edits, moves, merges, splits or removes anything that exists. **Never write to their trunk** — a module lands in an extension surface the platform owns. The first makes it safe to accept, the second makes it possible to say yes to. `docs/Strategy/Product_Boundaries.md` holds both, and what each does not cover.
- **The mechanism is two parts.** *Assets are data, so a pipeline generates them:* the app-agnostic dependency DAG resolves palette, typography, copy, icons and images, deterministic where determinism is available (WCAG AA enforced as an accept condition, bounded cost per run). *Behaviour is code, so an agent writes it:* an additive module against the platform's extension surface, wired to endpoints their API already exposes. Structural presets were built, tested and rejected for design — **do not carry that conclusion to features**, where a bounded vocabulary limits what is buildable without collapsing into sameness.
- **The hard part is the boundary, not the code.** A module's interior is greenfield; its edges — auth, session, user identity, tenant scoping, base data, RBAC inheritance — are integration against a production system nobody here wrote, and that is most of the work. **A mistake there is a security incident, not an ugly screen.** Never present this as an easy or incremental path.
- **Do not claim autonomy, and do not quote an error budget.** Unattended operation needs a check the system can fail, and a generated feature has none yet. The ~95/4/1 figure in circulation was never measured and describes cosmetic defects; do not quote it or adapt it.
- **This repo is the engine** — the Python pipeline that resolves a brief into assets, the Python API that serves it, the Flutter and React theme runtimes, the mock surfaces, and the studio that browses it all. The second half of this file is the map; `README.md` is the walkthrough. Read both before touching any of it, and the subsystem's own `CLAUDE.md` before editing inside it. One warning worth putting up here: **launching a run from the studio spends real money**, and the studio is deliberately local-only, never deployed.
- **CombatDen is the reference implementation, demo canvas and eval bed — not the company.** It lives in a separate repo at `/var/home/jm/Documents/CombatDen`. Inside the engine it is one app folder, `apps/combatden/`.
- **Undefined, and do not invent any of it:** the accept condition for a generated feature (the load-bearing gap); compile-time versus runtime insertion; whether existing extension surfaces are deep enough to carry a real feature; what bounds a tenant's request; where the admin dashboard lives; whether one person can carry three surfaces each with its own security surface; and pricing, which is open against a new buyer *and* a new unit — the old $100/$300/$500 ladder was gym-owner pricing and the $100/month-per-branded-tenant figure was priced against designs. **There are zero customers and no named human at any target platform.** The name "Recompose" is provisional and domain and trademark are unchecked; *composition* names arrangement, which is not what the product does, so weigh that if the name is ever revisited.

## No assumptions

When a decision has more than one reasonable answer, ask and wait for the user's explicit response. Never assume, recommend-and-proceed, or defer the choice unilaterally. Presenting researched options is encouraged; making the choice for the user is not.

## Confirm before changing

Do not create, edit, finalize, or mark anything as "locked"/"done" without first proposing the change and getting my explicit confirmation. Propose → wait → then write. This applies to copy, code, and working docs alike. Never claim consensus I haven't given.

## Commit every change, never push

**Commit as soon as a change is complete** — code, docs, copy, all of it. One commit per coherent change, written in the repo's existing style: a sentence that says what changed and why, not a conventional-commit prefix.

**Never push.** The remote exists but is not the workflow yet. `git push` happens only when I ask for it in that turn; approval to commit is never approval to push.

Uncommitted work that was already sitting in the tree when you started is mine, not yours to absorb — leave it out of your commits rather than sweeping it in.

## Skills

Skills live in `.claude/skills/`. **Before starting any task, check the available skills and use the most relevant one(s).** Skills are living documents like the CLAUDE.md files: whenever a convention captured in a skill changes, update the skill in the same change so it never goes stale.

When we do something repeatable that's worth capturing as a skill (a reusable workflow, a rule set, a copy or style pattern), **propose making a skill and wait for my confirmation before creating it.** Don't create skills unprompted.

**This file is for how to work here, not what to know.** CLAUDE.md holds working conventions, rules, and behavioral guidance — how to operate in this repo. Deep domain knowledge (frameworks, playbooks, reference material) belongs in a skill, not here. If a section is teaching a body of knowledge rather than telling you how to work, move it to a skill.

## Reviewing a plan before building it

**`plan-eng-review`** locks the execution plan — architecture, data flow, edge cases, test coverage, performance — walking the issues interactively with opinionated recommendations. Use it on anything non-trivial before writing code, not after. `productionalize` is the hard part of this product and the place a bad plan is most expensive.

## CLAUDE.md is a living document

Every CLAUDE.md in this repo is a living document — exactly like a skill, it must track reality. Whenever code genuinely diverges from what a CLAUDE.md says (a new live backend call, a renamed system, an added dependency, a rule the code has outgrown on purpose, an architecture change), **update that CLAUDE.md in the same change** so the doc and the code never drift apart. Never leave one stale: a stale rule produces false "violation" findings in review and misleads the next contributor. If a documented rule is what diverged, fix the doc to match the new reality; if the divergence is a mistake, fix the code. Either way, doc and code must agree when you are done.

This file itself is a living document — keep it in sync with how the vault and codebase are actually organized and written. When conventions genuinely change, update this file in the same change rather than letting it describe a structure that no longer exists.

## Point at where, not at how many

**Never write a pointer that has to be re-counted or re-listed to stay true** — "read these four", "the two pivots", a hand-copied tree of what a folder contains. Write the location and the rule for finding the thing instead. The full rule, with examples and the exceptions, is in `docs/CLAUDE.md`; it binds this file, every subsystem `CLAUDE.md`, every skill, and `PRODUCT.md` — not just the vault.

## The strategy vault

`docs/` is an actively maintained Obsidian vault holding pivots, office hours, concepts and the strategy docs. The vault root is `docs/` (that is where `.obsidian/` lives), so wikilinks only resolve inside it.

**Most work in this repo is code and does not need it.** Read the vault when the question is *what* or *why* — what the product is, who buys it, why a decision went the way it did, what is still open. A coding task rarely needs any of that; the subsystem `CLAUDE.md` files carry what the code requires.

When you do go in, **`docs/CLAUDE.md` is authoritative for everything under `docs/`** — read it first. It owns the vault conventions and the reading order. **Answers about the product, the strategy or the reasoning behind a decision get grounded in the vault before they are given, not recalled** — `docs/CLAUDE.md` says how. Maintaining the gbrain index that makes that possible is the `gbrain-maintenance` skill.

**Do not put vault material in this file.** Anything scoped to `docs/` belongs in `docs/CLAUDE.md`; this file covers how to work in the repo and how the code is organized.

## Subdirectory CLAUDE.md files

Before editing any file in a subdirectory, check whether that subdirectory (or its closest parent) contains a `CLAUDE.md`. If one exists, read it first — it contains directory-specific conventions, rules, and constraints that override or supplement this file for that scope. Subdirectory CLAUDE.md files are authoritative for their own directories.

## Response length

Keep responses concise when possible but go in depth when you deem necessary. Just don't ramble and repeat yourself.

## App Development Reality Check Instructions

When helping with app development, business strategy, feature planning, or product decisions, Claude should:

- **Challenge unrealistic expectations** - If approaches seem overly optimistic, technically unfeasible, or ignore market/user realities, point this out directly
- **Question core assumptions** - Don't just optimize ideas; evaluate whether fundamental premises about users, market fit, or execution make sense
- **Identify potential negative consequences** - Warn about decisions that could backfire, alienate users, create technical debt, or damage the product
- **Push back on bad ideas** - If a direction seems misguided, say so clearly rather than just trying to make it work better
- **Evaluate feasibility** - Consider whether proposed features, timelines, or strategies are actually executable given realistic constraints
- **Watch for feature bloat** - Point out when trying to build too many features will dilute focus or confuse users rather than add value
- **Question metrics and priorities** - If success measures seem arbitrary or disconnected from business reality, flag this
- **Consider user perspective** - Evaluate whether features actually solve real user problems or just seem clever to the creator
- **Assess competitive landscape** - Point out if assumptions about market positioning or differentiation seem unrealistic
- **Identify when pivoting is needed** - Sometimes the best advice is to try a completely different approach rather than iterating on a flawed concept
- **Flag resource misallocation** - Warn when time/money might be better spent elsewhere

It's better to challenge weak product decisions early than to help optimize something that won't succeed. The goal is long-term product success, not short-term validation.

---

# How the code is organized

## The subsystems, and the direction they depend

Every subsystem owns a `CLAUDE.md`. Read the one for the directory you are
editing **before** you edit it; it is authoritative for its own scope and
overrides anything general said here.

| Directory | What it is | Language |
|---|---|---|
| `ThemeTree/` | The pipeline. The dependency DAG that resolves colour, typography, copy, icons and images into an `output.yaml`. A library plus a CLI — it serves nothing. | Python |
| `Backend/` | The API. Two halves in one app: **read** over a produced `output.yaml`, and `studio/` — author a brief, launch a run, watch it, hold a design session. The only Python surface that ships. | Python |
| `Flutter/` | The Flutter theme runtime. Fetches a tenant's resolved branding at startup and exposes resolvers that never throw. | Dart |
| `React/` | The **web** theme runtime — the React mirror of `Flutter`. Ships no screens and no assets. | TypeScript |
| `JsxMockUps/` | The feature-free mock **assets** — interactive mocks you click through, on an app-agnostic kit. No logic, no API calls, no fetching. What the design agent edits and the studio nests. | TypeScript |
| `Studio/` | The standalone theme browser: Library, Inspect and Studio views. | TypeScript |

Dependencies run one way and must keep running one way:

```
Studio ──> JsxMockUps ──> React ──> Backend
                └────────────────────────────────>┘
```

`ThemeTree` produces what `Backend` serves. Nothing depends on
`Studio`. **There are no cycles and there must never be one.**

## The island rule

`JsxMockUps` may import from `React` and from itself. **From
nothing else.** It may not reach into `Studio` for a widget, a token or
a helper — that is why `cx` and `useElementSize` are duplicated in both rather
than shared.

It carries a second, internal one-way rule: `src/kit/` (app-agnostic) may not
import `src/apps/`. An app reaches the kit by calling `defineMockAsset` /
`defineMockApp`, never the reverse — which is what makes a new app a folder
rather than a change to the machinery. Its own eslint Gate 1 enforces it.

**A redesign of an app is a SIBLING FOLDER under `src/apps/`, never an edit to
the base.** The base layout is what the pipeline generates against; a redesign
forks it, keeps its own folder and its own `layout_brief.yaml`, and is registered in
`src/apps/index.ts`. That mirrors the engine's own two fork layers. An app
folder also may not import a sibling app folder — nothing enforces that yet,
but deleting one design must never break another.

The rule predates the package split; it was enforced inside the old single
package and the split made it structural. If you find yourself wanting to share
something between the studio and the mockups, duplicate it or push it down into
`React`. Do not add the edge.

The reason is the product: the mockups are the surface a design agent rewrites
freely. Every dependency they carry is a thing that can break when an agent
rearranges a screen.

## Working in a worktree: run `./scripts/setup_worktree` FIRST

**Always, before anything else, in every new worktree.** A worktree gets the
tracked files and nothing else, and three of the things this repo needs to run
are deliberately untracked — so a fresh one type-checks, tests and builds
perfectly while being unable to actually run. Each gap fails late and reads as a
code fault:

| Missing | How it fails |
|---|---|
| `.env` | The API dies **on import** with `google_fonts_api_key Field required`. Looks like a broken settings model. |
| `apps/*/*/` | 3.3 GB of generated runs. The API starts fine and **404s every design**, so the studio comes up with an empty catalogue and no error anywhere. |
| `APPS_ROOT` | Not a file — a setting. Unset, a worktree **writes new themes into itself**, where they are gitignored, so removing the worktree destroys them. Old themes survive and new ones vanish. |
| `node_modules` | Six subsystems, each installing its own. |

The script copies the keys, symlinks the runs from the main checkout (per RUN,
because `apps/<app>/app.yaml` is tracked and linking the app directory would
shadow it — the same shape as the ignore rule), and installs every subsystem.
It is idempotent, so re-run it whenever main generates more themes.

```bash
./scripts/setup_worktree                # keys + runs + install
./scripts/setup_worktree --no-install    # keys + runs only
```

Two of those are shared with the main checkout by design: the runs are large,
read-only to everything that serves them, and a copy would go stale the moment
main generated another. `.env` is COPIED rather than linked, because an editor
writing through a symlink would edit the main checkout's keys.

**`APPS_ROOT` is the one place a worktree gives up its isolation, deliberately.**
`apps_root` otherwise resolves from the config file's own location, so an API
served out of a worktree both reads and writes that worktree's `apps/` — and a
run costs about $1.50 and a few minutes to make, is gitignored, and dies with
the worktree. The script points it at main so a theme generated from a worktree
is kept. The cost is that a worktree writes into the main checkout's `apps/`;
that is the trade, and it is the right way round, because losing a paid artifact
is worse than sharing a directory that everything else treats as read-only.

The ThemeTree **CLI** is unaffected and still resolves its own `--out-root` from
the package location, which is why the run symlinks are still made: `make -C
ThemeTree smoke` and the expand/regen scripts read the worktree's own `apps/`.
Re-run the script after generating through the UI if you want the new run
visible to those too.


**The vault is read-only in a worktree.** A worktree resolves main's brain automatically, so `gbrain think` works there, but every edit to `docs/` happens in the main checkout — the index is main's and cannot follow a branch. `docs/CLAUDE.md` has the reasoning.
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

`docs/` owns a `Makefile` too, but it is **not** a subsystem and answers none of
those verbs — it is the vault, and what it owns is the gbrain index over itself.
Keep it out of the root's fan-out, where it would break `install`, `check` and
`test`; it stays findable through the common loops instead.

## Python: a library and the API over it

`ThemeTree/` and `Backend/` are separate top-level packages. Whether they
share one project or split into separate distributions is an arrangement rather
than a principle — read `pyproject.toml` for how it stands today, not this file.

`ThemeTree/` is a **library plus a CLI** and serves nothing. `Backend/` is
the only thing that listens on a port, and it has both halves: reading a produced
`output.yaml`, and `studio/` — briefs, run launches, sessions.

**The studio half moved there from `ThemeTree/studio/` on 2026-07-29.** It was a
separate app on its own port, split so a deployed read API could boot without
provider keys; starting a run is an API request like any other, so they are one
service now and the whole thing needs the keys.

`POST /runs` answers immediately — the run is a background task the client polls
or streams — but it leaves ~5 minutes of work and about $1.50 of spend going,
and **there is no auth on it yet.** The bind address is the only control today.
Auth is the prerequisite for deploying this, not a follow-up.

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
