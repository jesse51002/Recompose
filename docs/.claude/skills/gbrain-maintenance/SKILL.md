---
name: gbrain-maintenance
description: Set up, change, repair or troubleshoot the gbrain brain that indexes this vault. Use whenever the task touches gbrain's configuration rather than just querying it — reindexing, adding or removing a source, changing the embedding or think model, editing the schema pack or page types, rebuilding the link graph, chasing a search that returns nothing or the wrong thing, or working out why an import "succeeded" but nothing landed. Also use before trying any gbrain feature for the first time, because several of them do not work on this vault and the reasons are recorded here. Not needed to simply ask a question — that is `gbrain think`, documented in docs/CLAUDE.md.
---

# gbrain maintenance — this vault's brain

Everything here was learned by hitting it. Each gotcha cost a wrong turn; several cost an hour and one produced a committed document that was wrong. Read the relevant section before changing anything, and **verify by measurement rather than by exit status** — gbrain's failure mode is reporting success while doing nothing.

## What is set up

| | |
|---|---|
| engine | PGLite at `<repo>/.gbrain/` — **project-local, not `~/.gbrain`**, nothing uploaded |
| embeddings | `voyage:voyage-3-large`, 1024 dimensions |
| think model | `claude-cli:claude-opus-5` (subscription, via the local `claude` CLI) |
| schema pack | `recompose`, forked from `gbrain-base-v2` |
| live source | **`vault`** — path-registered to `docs/`, federated |
| dead source | **`default`** — isolated, must stay that way |

`gbrain sources status` is the live picture. Never hardcode page or link counts anywhere; they drift.

## Where the brain lives, and why it matters

The brain is **inside the repo** at `.gbrain/`, not in the home directory. `direnv` reads `.envrc` at the repo root and exports `GBRAIN_HOME`, so every gbrain command resolves the same brain from anywhere in the tree — repo root, `docs/`, a subsystem folder. Outside the repo the variable is unset and there is no `~/.gbrain` to fall back to, so gbrain fails loudly with `No brain configured`. That loudness is deliberate: the alternative is silently answering out of a different brain.

**`GBRAIN_HOME` is a parent directory.** gbrain appends `.gbrain` itself — `GBRAIN_HOME=/x` means `/x/.gbrain`. Setting it to the `.gbrain` directory looks right and fails. It also *succeeds* at creating a nested `.gbrain/.gbrain/` stub on the way past, so the mistake leaves litter that looks like a second brain; there is one at the repo root from an earlier occurrence.

**`direnv` does not reach a non-interactive shell**, which is what every agent tool-run gets. `GBRAIN_HOME` is unset there and gbrain answers `No brain configured` with the brain sitting in plain sight. Export it explicitly rather than concluding the brain is broken:

```bash
export GBRAIN_HOME=/var/home/jm/Documents/Recompose   # parent of .gbrain
```

**`VOYAGE_API_KEY` lives in `~/.bashrc`**, which non-interactive bash does not source, so `gbrain embed` reports the key missing when it is set. `source ~/.bashrc` first. The key is only needed for embedding — `sync --source vault --no-embed` imports text without it, which is the right move only if you then embed separately.

**`config.json` stores an absolute `database_path`.** Moving the brain directory does not update it, and the symptom is `No brain configured` with the config sitting right there. Repoint it by hand after any move.

### Rebuilding on a fresh clone

`.gbrain/` is gitignored — it is a derived index, not source, and it is hundreds of megabytes. A clone therefore has no brain, and neither does a machine that has never run this. The schema pack lives there too, so it does not travel either.

```bash
gbrain init --pglite --json --embedding-model voyage:voyage-3-large --embedding-dimensions 1024
gbrain schema fork gbrain-base-v2 recompose && gbrain schema use recompose
gbrain schema add-prefix concept  concepts/
gbrain schema add-prefix analysis research/
gbrain schema add-prefix analysis industries/
gbrain schema add-prefix analysis office_hours/
gbrain schema add-prefix analysis strategy/
gbrain schema add-prefix writing  pivots/
gbrain sources add vault --path "$PWD/docs" --name "Recompose vault"
gbrain sources federate vault
gbrain sync --source vault
gbrain extract links --source db
gbrain config set models.think claude-cli:claude-opus-5
```

Needs `VOYAGE_API_KEY` in the environment for embeddings, and the `claude` CLI logged in for `think`. Verify with `gbrain sources status` and one `think` call — not with exit codes.

## Routine operations

```bash
gbrain sync --source vault        # incremental, seconds
gbrain extract links --source db  # rebuild the graph after content changes
gbrain sources status             # lag, embed coverage, failures, queue
```

**Sync follows git commits, not the working tree.** Its checkpoint is a commit SHA, so an uncommitted edit is invisible to it. Commit, then sync. A sync that says "Already up to date" right after you edited a file is correct behaviour, not a bug.

Hands-off: `gbrain sync --watch` loops, `gbrain autopilot --install` daemonizes it.

Updating gbrain itself, which also refreshes its skills, since they are symlinked out of the clone rather than copied:

```bash
git -C ~/gbrain pull && gbrain-skills-sync
```

## The failure mode to expect

**gbrain reports `"status":"success"` while importing zero pages.** It did this twice in one session, for two different reasons. Never trust the exit status or the word `success` — check `page_count` in `gbrain sources list`, or `gbrain get <slug>`, or a `backlinks` count. Measure the thing you wanted to happen.

## Gotchas

### Import and sources

- **`gbrain import` only ingests markdown.** Pointed at a code directory it quietly imports the `.md` files it finds and nothing else, then reports success. Code needs `gbrain sync --strategy code`, a different walker.
- **`--source-id <id>` does not create the source.** Importing into one that does not exist fails every single file on a foreign key violation and still exits `success`. Run `gbrain sources add <id> --path <dir>` first.
- **A new source is `isolated` until federated.** It is only searched when named with `--source`, so a plain search silently ignores it and it reads as a missing index. Run `gbrain sources federate <id>`.
- **You cannot exclude a subdirectory at import time.** `docs/` is inside a git tree, so gbrain enumerates via `git ls-files` and honours `.gitignore` — not `.gbrainignore`. Excluding anything tracked means importing it and then `gbrain delete <slug>`.
- **The `default` source cannot be removed** (*"it backs the pre-v0.17 brain"*) and cannot be given a path. It holds stale pages. It is isolated deliberately — **federating it would double every search result.**

### Changing the model or embeddings

- **The embedding model cannot be changed in place.** `gbrain config set embedding_model` is rejected outright, because the field sizes the schema and a DB write would be a silent no-op. The procedure is to move `.gbrain/brain.pglite` aside, `gbrain init` with the new model, and reimport.
- **Set the think model through config, never by patching the recipe.** `~/gbrain` is a git clone; a local edit to a tracked file conflicts on the next `git pull`.
- **A model missing from a recipe's allowlist still works if set via config.** `model-resolver.ts` deliberately skips the allowlist throw for models opted into through `models.default` / `models.think`. That is the supported route for anything newer than the recipe knows — `claude-opus-5` runs this way. Passing the same value with `--model` fails as `unknown_model`; config is what unlocks it.
- `openai-compat` providers (`openrouter`, `litellm`, `deepseek`, …) skip allowlists entirely. Only `native` providers enforce them.

### Schema pack and page types

- **Types are inferred from path prefixes and were wrong by default.** `gbrain-base-v2` keys `concept` off `wiki/concepts/`, which this vault does not use, so real concept files matched nothing and `Journey.md` — a chronological history — came back typed `concept`.
- The `recompose` pack fixes this: `Concepts/` → `concept`; `Research/`, `Industries/`, `Office_Hours/`, `Strategy/` → `analysis`; `pivots/` → `writing`. **A new top-level folder needs a new prefix or its pages will be typed by guesswork.**
- **The pack lives at `.gbrain/schema-packs/recompose/pack.json`, which is gitignored, so it does not travel with a clone.** Recreate with `gbrain schema fork gbrain-base-v2 recompose`, `gbrain schema use recompose`, then `gbrain schema add-prefix <type> <prefix>` for each folder.
- **Retyping existing pages needs a delete-and-reimport.** `gbrain schema sync` only touches *untyped* pages by design; `import --fresh` skips on content hash; `default` cannot be removed. The working sequence is `gbrain delete` across every slug, then reimport.

### The link graph

The graph is what `gbrain think --anchor <slug>` traverses. It exists only because vault wikilinks are written as **paths with aliases** — `[[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]`.

- **Bare `[[Basename]]` fails silently.** Obsidian resolves it, gbrain does not. Before the conversion, 567 of 571 candidate edges were dropped as *"references to non-pages"* and the graph was empty. A doc that reverts to basename links disappears from the graph with no error.
- **A doc at the vault root cannot be linked at all** — a link with no slash is indistinguishable from a bare basename. This is why the strategy docs live in `Strategy/` rather than at the root. Anything new at the vault root is invisible to the graph.
- Resolution is case-insensitive, so `Concepts/...` matches the lowercase slug.

**The graph is append-only. Extraction never prunes.** Verified by controlled
test: add a wikilink, commit, `make -C docs brain` — the edge appears
(`created 2`). Remove that same wikilink, commit, run it again — extraction
sweeps all pages, reports `created 0`, and **the edge is still in
`backlinks`** with the source file containing no reference to the target. It
survives a full re-derivation because extraction only ever inserts.

The consequence is that deleting or rewriting a linked passage leaves a
phantom edge that `think --anchor` keeps traversing, and nothing anywhere
reports it. The only remedy is manual:

```bash
gbrain unlink <from-slug> <to-slug>       # repeat for the un-prefixed variant
```

**Every wikilink produces two candidate edges** — one with the `docs/` prefix
and one without, e.g. `strategy/journey` *and* `docs/strategy/journey`. Only
the prefixed one resolves to a real page; the bare one is part of the routinely
skipped "references to non-pages". This is why a single added link reports
`created 2`, and why `unlink` must be run for both forms.

**`extract` is a full sweep, not an incremental one.** `sync` is the part that
diffs git commits; extraction re-scans every page each run regardless of what
changed. It is idempotent on insert, so re-running is safe and never
duplicates.

**`--dry-run` reports candidate writes, not new edges.** It says `would create
1481` against a graph where a real run creates 0. Do not read it as a count of
pending work.

**`graph-query <slug> --direction out` silently returns nothing.** It is not a
supported flag and fails the usual way — exit 0, empty result. To see a page's
outbound edges, query `backlinks` on the targets instead.

To audit the graph for phantom edges, cross-check each edge against the file it
claims to come from — iterate `backlinks` over every page and grep the source
file for the target path. Anything that does not appear in the file is stale.

## Dead ends — do not retry these

Each was tried and does not work here. Retrying them costs time and finds the same wall.

- **`gbrain extract links --by-mention`** — needs `person`/`company` entity pages as link targets. This vault has none, and `gbrain-base-v2` marks both `extractable: false`, so they cannot be auto-created.
- **`gbrain extract links --ner`** — needs `link_types[].inference.regex` in the active pack. No pack here declares any. Reports `0 links`.
- **The LLM chunker.** `src/core/chunkers/llm.ts` exists and would split on topic shifts via Haiku, but **nothing calls it**. Markdown import always uses the recursive chunker and there is no flag or config key. Chunking is not a tunable today.
- **Indexing code.** `gbrain-base-v2` dropped the `code` page type its predecessor declared, so `code-def` / `code-refs` / `code-callers` cannot work and a `dream` cycle leaves the graph empty. Grep is the tool for code.
- **`/sync-gbrain`, and any code source pointed at the repo root.** The code walker prunes by directory *name* and never consults `.gitignore`, so it descends into `apps/` — 3.4 GB of generated runs — and would embed hundreds of produced `output.yaml` files.
- **litellm for chat.** Configured for expansion only here; `think` cannot route through it without a proxy in front.

## Where gstack's documentation is wrong

`~/.claude/skills/gstack/USING_GBRAIN_WITH_GSTACK.md` and the `## GBrain Search Guidance` block that `/sync-gbrain` auto-writes into a CLAUDE.md both describe **`gbrain search` as semantic**. It is not — `gbrain --help` says `search <query>  Keyword search (tsvector)`. It never touches embeddings.

This mattered: a nine-question evaluation of retrieval quality was run with `search` and its results reported as semantic performance. They measured the wrong system. `query` is hybrid retrieval; `think` is the synthesis layer and the one to use.

## Verifying a change actually landed

After any reindex, retype or graph rebuild:

```bash
gbrain sources status                      # page counts, lag, failures
gbrain get <a-known-slug> | head -3        # did the type come out right
gbrain backlinks <a-well-linked-slug>      # is the graph populated
gbrain think "<question with a known answer>"
```

For retrieval quality, ask something whose answer you already know and check the top hit is the document that holds it. Do not benchmark with `search`.

**Phrase test questions the way the docs argue, not as labels.** "What happens when an agent cannot satisfy the accept condition" retrieves the error-budget paragraph; "what is the error budget" does not, though it is the same paragraph.

## Judging a cheaper model

Cheaper models drop the analysis before they drop the answer. Haiku answered three benchmark questions correctly at a twelfth of the cost while producing **no Conflicts section on any of them**.

Benchmark on *"why were structural presets rejected"* — the test is whether it surfaces that the 2026-07-27 session argued **for** bounded sets while 2026-07-28 rejected them, and that the reconciliation was never written. Answering correctly is the easy half.
