You are a general conversational assistant, not only a coding tool.
Always answer natural language questions fully, even if they are not about code.
Prefer clear explanations in plain English before showing code.
When the user seems to be chatting, respond like the Claude web app: helpful, concise, and not terminal-focused.

## What Recompose is

The terms used below are defined in `docs/Concepts/`, and `docs/Concepts/_Index.md` is the authoritative listing of them. They appear here as plain text rather than wikilinks because this file sits outside the vault root and `[[...]]` does not resolve from here.

**One line (YC F26, final): "Customers agentically redesign white-label apps."**

- **The buyer** is a multi-tenant white-label SaaS platform with real tenant volume. Explicitly not agencies, not freelancers, not the end business. **The unit of value is design variety, not tenant count** — Recompose sells designs, and how many tenants a platform points at one is its business; volume only creates the *possibility* of variety. The sharpest wedge is platforms that already run a design service, because a design service is direct evidence of variety demand and they can read the value off a P&L.
- **The scope** is a full visual redesign driven by the tenant — every screen, every asset — **with no new features**. Not theming, not tokenizing.
- **The mechanism is explicitly two parts.** *Assets are data, so a pipeline generates them:* an app-agnostic dependency DAG resolves palette, typography, copy, icons and images, deterministic where determinism is available (WCAG AA enforced as an accept condition, bounded cost per run). *Layout is code, so an agent writes it:* the app is tokenized into a **shared fork**, mirrored as a feature-free **JSX visual mock**, redesigned by an agent with full freedom, validated against **screenshots**, then converted back to production code by a **productionalize agent**. Structural presets were built, tested and rejected — a bounded option set reproduces the platform's original design language, which is a reskin.
- **Recompose never writes to the platform's trunk.** Two agent-maintained fork layers: a shared tokenized fork as our base, re-derived against their main as they ship, and one design fork per design (not per tenant) re-derived against that base. Changes land on **`uat`** — the platform's own branch, the one ahead of `main` — never straight to production. **UAT is a branch, not a review environment**, and there is no approval queue. They grant read access; that is the integration. See `docs/pivots/2026-07-28-01-agentic-editing-all-in.md`.
- **The promise is autonomy.** No PR into their trunk, no review queue, no integration work, no engineering sign-off — and the intended trend is toward zero human involvement. Error budget ~95% clean / 4% minor / 1% significant, and it is a **target that has never been measured**, so never quote it as an observed rate. **What makes it acceptable: the pipeline halts rather than ships** — an agent that cannot satisfy the accept condition stops and nothing deploys, so a significant failure is a stall, not an incident. The 4% minor is cosmetic and *does* reach production, with nothing yet catching it. This reversed the earlier "leverage, not autonomy" framing on 2026-07-30 — see `docs/pivots/2026-07-30-22-autonomous-is-the-promise.md`. **Still OPEN and not to be invented: who resolves a halt** (platform staff vs a Recompose FDE, the latter blocked on domain knowledge), and **how the 4% gets swept up**.
- **The safety property** is functional equivalence: a redesign changes **arrangement only**. No screen merged or split, no functionality added, none removed, API surface provably identical. It is customer-verifiable rather than argued.
- **This repo is the engine** — the Python pipeline that resolves a brief into assets, the Python API that serves it, the Flutter and React theme runtimes, the feature-free mock surfaces the design agent edits, and the studio that browses it all. The second half of this file is the map; `README.md` is the walkthrough. Read both before touching any of it, and the subsystem's own `CLAUDE.md` before editing inside it. One warning worth putting up here: **launching a run from the studio spends real money**, and the studio is deliberately local-only, never deployed.
- **CombatDen is the reference implementation, demo canvas and eval bed — not the company.** It lives in a separate repo at `/var/home/jm/Documents/CombatDen`. Inside the engine it is one app folder, `apps/combatden/`.
- **Undefined, and do not invent it:** pricing for this ICP is open (the old $100/$300/$500 ladder was gym-owner pricing and is dead; `Strategy/YC_Application_F26.md` floats $100/month per branded tenant as a working figure explicitly defended as a range, not a final number). The layout half of the mechanism is specified but not built — **productionalize is the hard part and where the product actually lives.** There are zero customers and no named target platform. The name "Recompose" is provisional — domain and trademark unchecked.

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

## CLAUDE.md is a living document

Every CLAUDE.md in this repo is a living document — exactly like a skill, it must track reality. Whenever code genuinely diverges from what a CLAUDE.md says (a new live backend call, a renamed system, an added dependency, a rule the code has outgrown on purpose, an architecture change), **update that CLAUDE.md in the same change** so the doc and the code never drift apart. Never leave one stale: a stale rule produces false "violation" findings in review and misleads the next contributor. If a documented rule is what diverged, fix the doc to match the new reality; if the divergence is a mistake, fix the code. Either way, doc and code must agree when you are done.

This file itself is a living document — keep it in sync with how the vault and codebase are actually organized and written. When conventions genuinely change, update this file in the same change rather than letting it describe a structure that no longer exists.

## Point at where, not at how many

**Never write a pointer that has to be re-counted or re-listed to stay true.** "Read these four", "the two pivots", "19 concept files", a hand-copied tree of what a folder contains, a parenthetical listing five of the strategy docs — each is wrong the moment something is added, and nothing forces a reader to notice. This is how docs go stale even when nobody writes anything false.

Write the location and the rule for finding the thing instead:

- ✅ "Work backwards from the newest doc in `pivots/`."
- ❌ "Read these four first," followed by a numbered list.
- ✅ "`docs/Concepts/_Index.md` is the authoritative listing."
- ❌ a copy of the concept tree living inside another file.
- ✅ "the strategy docs in `docs/Strategy/`"
- ❌ "`Strategy/Recompose_Summary.md`, `Strategy/Product_Boundaries.md`, `Strategy/Customer_ICP.md`, …"

**One canonical location may hold the full list; every other doc points at it rather than copying it.** Name a specific only when the specific is the point — a genuinely load-bearing doc that must be read first, a filename-format example, the single file that owns a rule.

This does not apply to counts inside a doc's own argument ("two things this boundary costs," followed by the two things) or to cited figures in research notes. Those are content, not navigation: they are edited alongside the thing they describe, so they cannot silently drift away from it.

Applies to every doc in the vault, to every `CLAUDE.md`, to every skill, and to `PRODUCT.md`.

## Context (EXTREMELY IMPORTANT)

Always read `docs/` for in-depth details about the project. First a recursive ls, then read the docs you think are of use. `docs/` is an actively maintained Obsidian vault you will edit often — pivots, office hours, concepts and the strategy docs all live here and get updated as the project moves. The vault root is `docs/` (that is where `.obsidian/` lives), so wikilinks only resolve inside it.

**`docs/CLAUDE.md` holds the vault's own conventions and is authoritative for everything under `docs/`.** Read it before writing anything there — it covers how pivots and office hours differ, the concept linking rule, and why a doc states what is true now rather than narrating its own edit history.

**Where to start reading.** `docs/Strategy/Journey.md` is the fastest orientation — the summary arc, earliest phase to current, with the CombatDen prehistory kept verbatim at the front and the Recompose phases at the end. Read it before the strategy docs. Then work backwards from the newest doc in `pivots/`, taking as many as the question needs; each pivot names the office hours doc that explored it, and that is where the reasoning lives. Two anchors are worth naming because they do not move: `pivots/2026-07-27-11-customization-engine-is-the-company.md` is the founding decision that everything since amends rather than replaces, and `Strategy/YC_Application_F26.md` is the tightest single statement of the company. The strategy docs in `Strategy/` and the notes in `Research/` fill in whatever is still missing.

What to know about the state of the vault:

- **This vault was created on 2026-07-28 by migrating the engine-lineage material out of CombatDen.** Only docs that are true for Recompose came over; the gym CRM strategy, sales, UX and market material was deliberately left behind and still lives in `/var/home/jm/Documents/CombatDen/docs`. If you need gym-era context, read it there — do not copy it here.
- **The carried historical docs were written while the company was still a gym CRM.** The earliest office hours docs and pivots, and much of `Research/`, use gym framing as their working example, because that is when they were written. They are correct as history and are **never edited retroactively** (see the pivot and office hours conventions in `docs/CLAUDE.md`). Read them for the reasoning, not for the current buyer.

## GBrain: semantic search over the vault

A local [gbrain](https://github.com/garrytan/gbrain) brain indexes the vault so a question can be asked by meaning rather than by exact string. PGLite at `~/.gbrain/`, embeddings `voyage:voyage-3-large` at 1024 dimensions, local to this machine — nothing is uploaded. One source, `default`, holding `docs/` — 89 pages.

**Reach for `gbrain think` whenever you are trying to work something out about this project** — what was decided and why, whether a claim is supported, what a doc means, where a position came from, what is still open. Do it *before* reading a pile of docs by hand: it reads across ~40 pages at once, cites every claim, and names what the vault does not answer. Reading five documents to reconstruct an argument it will hand you in one call is wasted effort.

It is especially worth a call before writing anything durable — a pivot, an office hours doc, a strategy edit — because the **Conflicts** section is the only thing here that catches the vault contradicting itself, and that is exactly the failure a new doc entrenches.

**Use the right command — they are three different systems, and gstack's own docs get this wrong.**

```bash
gbrain think "<question>"    # ← the real interface: multi-hop synthesis, cited answer, gap analysis
gbrain query "<question>"    # hybrid retrieval (vector + keyword, RRF-fused) — ranked passages
gbrain search "<terms>"      # KEYWORD ONLY (tsvector). Not semantic. Rarely what you want.
```

`gbrain search` is plain full-text search and never touches embeddings, despite gstack's `USING_GBRAIN_WITH_GSTACK.md` and its auto-generated `## GBrain Search Guidance` block both describing it as semantic.

**Default to `think`, and do not judge the brain by `query`.** Measured on nine questions with known answers, `query` put the right document first six times. On the three it missed, `think` answered all three correctly — because it reads across ~40 pages and synthesises rather than ranking, so the answer surviving in the eighth-ranked passage still reaches you. A `query` miss is not evidence the vault lacks the answer.

Two things `think` does that retrieval structurally cannot:

- **Conflicts.** Asked why structural presets were rejected, it found that the 2026-07-27 office hours argued *for* bounded sets as "the strongest product call in the vault" and the 2026-07-28 session rejected them — and that the reconciliation was never written.
- **Gaps.** On the error budget it returned 95/4/1, confirmed *never measured* from five separate pages, then named the missing denominator (per screen? per tenant? per sync?) as open question T15.

Roughly $0.15 per call on Opus 5 and ~30s. Use `query` when a ranked list of passages is genuinely all you want.

**Phrase questions the way the docs argue, not as labels.** "What happens when an agent cannot satisfy the accept condition" returns the error-budget paragraph at 1.36; "what is the error budget" does not retrieve it at all, though it is the same paragraph. The vault argues in prose and rarely uses its own terms as headings.

### Keeping the brain current

The vault is registered as the **`vault`** source with a local path, so it syncs incrementally:

```bash
gbrain sync --source vault        # ~3s when nothing changed
gbrain extract links --source db  # rebuild edges after content changes
```

**Sync follows git commits, not the working tree.** Its checkpoint is a commit SHA, so an uncommitted edit is invisible to it — commit first, then sync. That falls out of the commit-every-change rule above rather than fighting it.

It previews cost before spending and refuses to surprise you: *"~4,268 new tokens … est. $0.00 on voyage-3-large. Below cost gate floor ($0.5), proceeding."*

For hands-off operation, `gbrain sync --watch [--interval N]` loops, and `gbrain autopilot --install` runs it as a daemon. `gbrain sources status` is the health dashboard — sync lag, embed coverage, failures, queue depth.

**The `default` source is deliberately isolated and must stay that way.** It holds 89 stale pages from before the vault was path-registered, it cannot be given a path, and it cannot be removed (*"it backs the pre-v0.17 brain"*). Isolating it excludes it from search; federating it again would double every result.

**Keeping gbrain itself current** is one command, since the skills are symlinked out of the clone rather than copied:

```bash
git -C ~/gbrain pull && gbrain-skills-sync
```

### Which model, and who pays

`models.think` is **`claude-cli:claude-opus-5`** — Opus 5, dispatched through the local `claude` CLI's OAuth session, so it bills **your Claude subscription, not API credits.** Calls on that path report no `Cost:` line because there is no per-token charge.

**The provider prefix decides billing, not the model:**

| prefix | billed to |
|---|---|
| `claude-cli:` | your Claude subscription |
| `anthropic:` | API credits (~$0.15/call on Opus 5) |

**Opus 5 is not in the `claude-cli` recipe's allowlist, and it works anyway.** That is deliberate, not a loophole: `model-resolver.ts` skips the allowlist throw when a model is opted into via config (`models.default`, `models.think`, `models.tier.*`). Setting it through config is the supported way to run a model newer than the recipe knows about. If the id ever stops existing you get a clean `model_not_found`, not a silent downgrade. **Do not "fix" a model-not-listed warning by patching the recipe** — `~/gbrain` is a git clone and a local edit conflicts on the next `git pull`.

`openai-compat` providers (`openrouter`, `litellm`, `deepseek`, `groq`, …) skip the allowlist unconditionally — only `native` providers enforce it at all.

**gbrain copied your Anthropic API key into `~/.gbrain/config.json` at init**, harvested from the repo `.env` and byte-identical to it. That file is outside the repo. It is what any `anthropic:` call would authenticate with; delete the field to guarantee nothing can bill API credits.

**Cheaper models drop the analysis before they drop the answer.** Haiku answered all three benchmark questions correctly at a twelfth of the cost but produced **no Conflicts section on any of them**, and skipped Gaps twice in three. Conflicts is the highest-value output — it caught that the 2026-07-27 session argued *for* bounded structural sets while 2026-07-28 rejected them, with no reconciliation ever written. Benchmark any cheaper model on that question specifically, not on whether it answers correctly.

**Code is deliberately not indexed.** `code-def` / `code-refs` / `code-callers` cannot work here: the active schema pack `gbrain-base-v2` **dropped the `code` page type** that its predecessor `gbrain-base` declared, so nothing emits code symbols and `resolve_symbol_edges` has nothing to resolve. Without that, indexing code buys semantic search over a tree Grep already searches exactly and never staler than the working copy — while needing a manual re-sync on every commit. Grep is the tool for code here.

### Page types come from a custom schema pack

The active pack is **`recompose`**, forked from `gbrain-base-v2` and mapping the vault's folders onto base-v2's canonical types via path prefixes:

| folder | type |
|---|---|
| `Concepts/` | `concept` |
| `Research/`, `Industries/`, `Office_Hours/`, `Strategy/` | `analysis` |
| `pivots/` | `writing` |

Without it every page was typed by guesswork — `Strategy/Journey.md` came back `concept`, and the real concept files matched nothing, because base-v2's `concept` prefix is `wiki/concepts/` and this vault imports as `concepts/`. Only `docs/CLAUDE.md` sits at the vault root now; everything else lives in a folder and types correctly.

**The pack lives at `~/.gbrain/schema-packs/recompose/pack.json` — outside this repo, so it does not travel with a clone.** Recreate with `gbrain schema fork gbrain-base-v2 recompose`, `gbrain schema use recompose`, then the `gbrain schema add-prefix` calls above.

**Retyping existing pages requires a delete-and-reimport.** `gbrain schema sync` only touches *untyped* pages by design, `import --fresh` skips on content hash, and the `default` source cannot be removed. The working sequence is `gbrain delete <slug>` across every page, then `gbrain import docs`.

### The link graph

**290 links across 89 pages.** Live, and traversed by `gbrain think --anchor <slug>` (51-node subgraph on a concept anchor).

It only works because the vault writes wikilinks as **paths with aliases** — `[[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]`. gbrain resolves `[[relative/path]]` and nothing else; bare Obsidian basenames silently dropped 567 of 571 edges as *"references to non-pages"*. `docs/CLAUDE.md` carries the rule. **A doc that reverts to `[[Basename]]` disappears from the graph without any error.**

The other two link routes stay unavailable and are not worth retrying: `--by-mention` needs `person`/`company` entity pages, which this vault has none of and base-v2 marks `extractable: false`; `--ner` needs `link_types[].inference.regex`, which no pack here declares.

### The link graph does not work, and cannot without a change

gbrain's graph reranking signals are inert on this vault, and the reason is structural rather than a misconfiguration. **Obsidian wikilinks address by basename (`[[Orchestrator]]`); gbrain pages are keyed by full path slug (`concepts/product/mechanisms/orchestrator`).** A bare `orchestrator` resolves to nothing, so link extraction reports:

```
Links: created 4 from 89 pages
Skipped 567 candidate(s) whose target page doesn't exist
```

567 of 571 edges dropped. The `aliases:` in concept frontmatter are semantic phrasings, not basenames, so they do not bridge it. Until slugs and wikilink targets agree, `gbrain extract` is not worth running and the graph signals in search score against an empty edge table.

This also settles a tempting idea: concepts are the sole legal target of a wikilink, so they *would* be the graph's hub nodes — but they cannot be, for the reason above. Keep or drop them on retrieval grounds alone.

### Things that are true here and not in gbrain's general documentation

Each cost a wrong turn to find.

- **`gbrain import` only ingests markdown.** Pointed at a code directory it silently imports the `.md` files and nothing else, reporting `success` while importing zero source files.
- **`--source-id <id>` does not create the source.** Importing into one that does not exist fails every file on a foreign key violation and still exits `success`. Check `page_count`, never the exit status.
- **You cannot exclude a subdirectory at import time.** `docs/` is inside a git tree, so gbrain enumerates via `git ls-files` and honours `.gitignore`, not `.gbrainignore`. Excluding anything tracked means import-then-`gbrain delete`.
- **The embedding model cannot be changed in place.** `gbrain config set embedding_model` is rejected outright — the field sizes the schema, so a DB write would be a silent no-op. Switching means moving `~/.gbrain/brain.pglite` aside, re-running `gbrain init`, and reimporting.
- **The LLM chunker is not reachable.** `src/core/chunkers/llm.ts` exists and would split on topic shifts via Haiku, but nothing calls it — markdown import always uses the recursive chunker, and there is no flag or config key. Chunking is therefore not a lever available today.
- **Page types are inferred and frequently wrong.** `Strategy/Journey.md` carries no `type:` and was typed `concept`; 38 of 89 pages are `concept` and 31 `note`. Do not build anything on `--type` filtering.
- **A new source is `isolated` until federated.** A plain search silently ignores it, which reads as a missing index. Run `gbrain sources federate <id>`.

Never point a code source at the repo root and do not run `/sync-gbrain`: the code walk prunes by directory *name*, never consults `.gitignore`, and would descend into `apps/` — 3.4 GB of generated runs. PGLite is single-process, so a live `gbrain serve` blocks any import.

**To refresh after meaningful vault changes:** `gbrain import docs` (idempotent — dedupes on content hash).

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
