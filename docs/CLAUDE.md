Conventions for the Obsidian vault in this directory. Authoritative for everything under `docs/`; the repo root [[CLAUDE|CLAUDE.md]] covers how to work in the repo and how the code is organized.

# Vault conventions

## Obsidian markdown

Obsidian-flavored markdown. Frontmatter for metadata (`status`, `date`, `tags`, `aliases`) — but never a `title` that duplicates the H1, since Obsidian uses the filename. Callouts are `> [!note]` / `> [!warning]`. Embeds are `![[Note]]`. Tags are `#tag` or a frontmatter list. Headings and blocks are linkable (`[[Note#Heading]]`, `^block-id`). Prefer kebab-case or snake_case for new filenames. Standard markdown links for external URLs only — internal references are wikilinks (see Linking).

## Write what is true now, not what changed

**A doc states the current position. It does not narrate its own edit history.** When something changes, rewrite the passage so it is simply correct and delete the old wording.

**No correction notes** — no `> [!warning] Corrected 2026-XX-XX`, no *"this section used to read…"*, no `(Corrected: it previously said X)`. A doc carrying three layers of what it used to say is harder to trust than one that just says the thing.

**The narrow exception, and it has to earn itself:** a correction note is justified only when someone acting on the old belief would do damage — a stale figure still being quoted in a live pitch, a claim already sent outside, a rule whose old form is still enforced in code. Even then write it as a live warning about what to do (*"never quote the precise figure"*), not as a changelog.

Applies to every doc here, every `CLAUDE.md`, and `PRODUCT.md`.

## The historical records

Three places hold history, and **none of them is ever edited retroactively.** That is exactly what makes it safe to delete the archaeology everywhere else.

- **`pivots/`** — the decision: what changed, when, and why, briefly.
- **`Office_Hours/`** — the reasoning that produced it.
- **[[Strategy/Journey|Journey.md]]** — the summary arc. Recording what was tried and what reversed *is* its job, so it is the one place a "then this changed" sentence belongs in normal prose. Update it whenever something meaningful shifts — a pivot, a first sale, a failed sales attempt that reveals something structural. A few sentences, enough that someone reading cold understands the situation in two minutes.

If a decision is later reversed, write a **new** doc with a new date referencing the old one, and set the old one's status to `Superseded by [link]`.

### Filenames

Pivots and office hours both lead with date and hour (CDT/CST) so they sort chronologically and same-day ties break by creation hour:

```
pivots/YYYY-MM-DD-HH-short-kebab-slug.md
Office_Hours/YYYY-MM-DD-HH-Office_Hours_Topic.md
Office_Hours/YYYY-MM-DD-HH-Descriptive_Name.md    (thinking artifacts that aren't sessions)
```

Date and hour come from the file's **birth time on disk** (`stat <file>`), not the semantic date of the decision or session — so the filename records when it was written, and the two can diverge when something is captured later. The semantic date lives in the doc body.

### Pivots

Written when a final decision lands on product plan, strategy, scope, target customer, pricing, core mechanism, or user flow — **before** any other doc is updated to reflect it. Not for copy edits, bug fixes, or operational changes.

Short and decisive. Every pivot carries: **date and status**; **the decision** in one sentence; **what it pivots from** and **to**; **why**, in two to four sentences; **the office hours doc(s)** that explored it; and **downstream impact** — what must now be updated.

Options weighed and alternatives rejected belong in the office hours doc, not here.

**When in doubt, write it.** An unnecessary pivot doc costs a few minutes. A missing one costs the reasoning behind a decision you will need when the question comes back.

### Office hours

The exploration: forcing questions asked, how they were answered, which assumptions shook, what was conceded, every option with its tradeoffs. Also home to thinking artifacts that aren't sessions — architecture options, decision-space mapping, context handoffs.

Every office hours doc carries: **date, status, mode**; **problem statement**; **what carries from prior sessions**; **what this session changed**; **premises** (locked vs. to-test); **approaches considered**; **recommended approach**; **open questions**; **the assignment** — a concrete real-world next action; and **what I noticed about how you think**.

**Read the prior sessions before running a new one.** A session should not relitigate basics already locked. If new evidence shakes an earlier assumption, say so explicitly — which assumption, from which session, and what changed.

Not every session produces a pivot. "No decision yet, need more data" is still a record worth keeping.

### Order of operations

**Explore in office hours → decide in a pivot → update the strategy docs → update code or copy.** A pivot without prior exploration is allowed but rare; an office hours doc with no downstream pivot is common.

## Research: dated filenames

```
Research/YYYY-MM-DD-short-kebab-slug.md
```

Date only, no hour. A data file belonging to a research doc takes the same stem so the pair sorts together.

**The date is when the research was done, not when the file was created.** For anything commissioned here they match and `stat` is trustworthy. For anything carried in from elsewhere they do not — birth time is the migration date, and the real date must come from the original or the content. A wrong date in a filename is believed, so getting it wrong is worse than leaving it off.

It matters because a finding is only as good as the thesis it was written against, and this vault holds research from both sides of a pivot.

## Point at where, not at how many

**Never write a pointer that has to be re-counted or re-listed to stay true.** "Read these four", "the two pivots", "19 concept files", a hand-copied tree of a folder's contents — each is wrong the moment something is added, and nothing forces a reader to notice. This is how docs go stale while nobody writes anything false.

Write the location and the rule for finding the thing:

- ✅ "Work backwards from the newest doc in `pivots/`."
- ❌ "Read these four first," followed by a numbered list.
- ✅ "[[Concepts/_Index|Concepts/_Index.md]] is the authoritative listing."
- ❌ a copy of the concept tree living in another file.

**One canonical location may hold the full list; everything else points at it.** Name a specific only when the specific is the point — a genuinely load-bearing doc, a filename-format example, the file that owns a rule.

Does not apply to counts inside a doc's own argument ("two things this costs," followed by the two things) or to cited figures in research. Those are content, not navigation — they are edited alongside what they describe.

## Linking

**Link a doc whenever you reference it.** Every link is an edge the retrieval graph traverses, and edges are what make the vault answerable rather than merely searchable.

One form, always — vault-root-relative path with a display alias. Any doc is a legal target.

```
[[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]
[[Research/2026-08-02-why-custom|the August build-vs-buy research]]
[[pivots/2026-07-30-22-autonomous-is-the-promise|the autonomy pivot]]
```

**Bare `[[Basename]]` fails silently.** Obsidian resolves it; gbrain does not — it drops the edge as a "reference to a non-page" with no error and the doc quietly leaves the graph. This is the one linking mistake that costs something, and nothing warns you.

## Concepts

`Concepts/` is the glossary — the canonical short definition of each recurring term. [[Concepts/_Index|Concepts/_Index.md]] is the authoritative listing and holds proposals not yet approved; add every new concept to it. New concepts need explicit approval: propose, don't create.

Nests by domain then type — `Concepts/<Domain>/<Type>/<Name>.md`. Empty domain folders are placeholders, not omissions.

A concept file is under a screen: frontmatter with `tags` and `aliases`, then a 1–3 sentence definition, optional nuance, and links. Unlike pivots and office hours these are revisable, not historical records.

**Unresolved links in the carried historical docs are expected.** The gym-era concepts stayed behind in CombatDen — do not recreate them. Read them in `/var/home/jm/Documents/CombatDen/docs` if the gym-era meaning is genuinely needed.

---

# Working with the vault

## Where to start

**[[Strategy/Recompose_Summary|Recompose_Summary.md]] and [[Strategy/Journey|Journey.md]], both.** The summary is what the company *is* now; the journey is how it got there. The summary alone reads as arbitrary; the journey alone leaves you reconstructing the current position from its history.

Then work backwards from the newest doc in `pivots/`, as far as the question needs — each pivot names the office hours doc that explored it, and that is where the reasoning lives. Two anchors do not move: [[pivots/2026-07-27-11-customization-engine-is-the-company|the founding pivot]], which everything since amends rather than replaces, and [[Strategy/YC_Application_F26|YC_Application_F26.md]], the tightest single statement of the company.

**This vault was migrated out of CombatDen on 2026-07-28.** Only what was true for Recompose came over; the gym CRM strategy, sales, UX and market material stayed behind and still lives in `/var/home/jm/Documents/CombatDen/docs`. Read it there if you need gym-era context — do not copy it here. The earliest office hours docs and pivots, and much of `Research/`, still use gym framing because that is when they were written. Read them for the reasoning, not the current buyer.

## GBrain

A local [gbrain](https://github.com/garrytan/gbrain) brain indexes the vault so questions can be asked by meaning. PGLite at `~/.gbrain/`, `voyage-3-large` embeddings, local to this machine — nothing is uploaded. `gbrain sources status` is the live picture: which sources, how many pages, sync lag, embed coverage.

**Reach for `gbrain think` whenever you are working something out about this project** — what was decided and why, whether a claim is supported, where a position came from, what is still open. Do it *before* reading a pile of docs by hand: it reads across ~40 pages at once and cites every claim. Reconstructing an argument from five documents that it will hand you in one call is wasted effort.

Especially worth a call **before writing anything durable** — a pivot, an office hours doc, a strategy edit — because the **Conflicts** section is the only thing here that catches the vault contradicting itself, which is exactly the failure a new doc entrenches.

```bash
gbrain think "<question>"    # multi-hop synthesis, cited, with Conflicts + Gaps
gbrain query "<question>"    # hybrid retrieval — ranked passages, free, fast
gbrain search "<terms>"      # KEYWORD ONLY (tsvector). Not semantic. Rarely what you want.
```

`gbrain search` never touches embeddings, despite gstack's `USING_GBRAIN_WITH_GSTACK.md` and its auto-generated `## GBrain Search Guidance` block both calling it semantic.

**Do not judge the brain by `query`.** On nine questions with known answers `query` put the right doc first six times; `think` answered all three misses correctly, because it synthesises across pages rather than ranking them. A `query` miss is not evidence the vault lacks the answer.

**Phrase questions the way the docs argue, not as labels.** "What happens when an agent cannot satisfy the accept condition" retrieves the error-budget paragraph; "what is the error budget" does not, though it is the same paragraph.

### Keeping it current

The vault is the **`vault`** source, registered with a local path, so it syncs incrementally in seconds:

```bash
gbrain sync --source vault        # incremental
gbrain extract links --source db  # rebuild edges after content changes
```

**Sync follows git commits, not the working tree** — its checkpoint is a commit SHA, so uncommitted edits are invisible. Commit, then sync. It previews cost before spending and gates on a floor.

Hands-off: `gbrain sync --watch` loops, `gbrain autopilot --install` daemonizes it.

**The `default` source must stay isolated.** It holds stale pages from before the vault was path-registered, cannot be given a path, and cannot be removed (*"it backs the pre-v0.17 brain"*). Federating it again would double every search result.

Updating gbrain itself is one command, since its skills are symlinked out of the clone rather than copied:

```bash
git -C ~/gbrain pull && gbrain-skills-sync
```

### Model and billing

`models.think` is **`claude-cli:claude-opus-5`** — dispatched through the local `claude` CLI's OAuth session, so it bills **the Claude subscription, not API credits.** Those calls report no `Cost:` line because there is nothing to charge. **The provider prefix decides billing:** `claude-cli:` is the subscription, `anthropic:` is API credits at roughly $0.15 a call on Opus 5. The subscription path is ~40% slower (57s vs 41s on the same question) because it dispatches through a subprocess rather than a direct HTTPS call.

Opus 5 is not in the `claude-cli` recipe's allowlist and works anyway — `model-resolver.ts` deliberately skips the allowlist for models opted into via config. That is the supported way to run something newer than the recipe knows. **Do not patch the recipe instead:** `~/gbrain` is a git clone and a local edit conflicts on the next pull.

**gbrain copied the Anthropic API key into `~/.gbrain/config.json` at init**, harvested from the repo `.env` and byte-identical to it — outside the repo, and what any `anthropic:` call authenticates with. Delete the field to guarantee nothing can bill API credits.

**Cheaper models drop the analysis before the answer.** Haiku answered all three benchmark questions correctly at a twelfth of the cost but produced **no Conflicts section on any of them**. Benchmark a cheaper model on *"why were structural presets rejected"* specifically — whether it finds the 2026-07-27 / 2026-07-28 contradiction, not whether it answers.

### Schema pack

The active pack is **`recompose`**, forked from `gbrain-base-v2`, mapping folders onto canonical types by path prefix: `Concepts/` → `concept`; `Research/`, `Industries/`, `Office_Hours/`, `Strategy/` → `analysis`; `pivots/` → `writing`. Without it types were assigned by guesswork — `Journey.md` came back `concept`, and the real concept files matched nothing because base-v2 keys `concept` off `wiki/concepts/`.

**It lives at `~/.gbrain/schema-packs/recompose/pack.json`, outside this repo, so it does not travel with a clone.** Recreate with `gbrain schema fork gbrain-base-v2 recompose`, `gbrain schema use recompose`, then the `add-prefix` calls.

**Retyping existing pages needs a delete-and-reimport.** `schema sync` only touches *untyped* pages, `import --fresh` skips on content hash, and `default` cannot be removed.

### The link graph

Live, and traversed by `gbrain think --anchor <slug>`. It works only because wikilinks are written as paths with aliases — see Linking. Bare basenames dropped 567 of 571 candidate edges.

The other two routes stay unavailable: `--by-mention` needs `person`/`company` entity pages, which this vault has none of; `--ner` needs `link_types[].inference.regex`, which no pack here declares.

### Gotchas, each of which cost a wrong turn

- **`gbrain import` only ingests markdown.** Pointed at code it imports the `.md` files and nothing else, reporting `success` having imported zero source files.
- **`--source-id` does not create the source.** Importing into one that does not exist fails every file on a foreign key violation and still exits `success`. Check `page_count`, never the exit status.
- **A new source is `isolated` until federated** — a plain search silently ignores it, which reads as a missing index.
- **You cannot exclude a subdirectory at import time.** `docs/` is a git tree, so gbrain enumerates via `git ls-files` and honours `.gitignore`, not `.gbrainignore`.
- **The embedding model cannot be changed in place** — the field sizes the schema, so a DB write is a silent no-op. Move `brain.pglite` aside, re-init, reimport.
- **The LLM chunker is unreachable.** `chunkers/llm.ts` exists and nothing calls it; markdown import always uses the recursive chunker. Chunking is not a lever today.
- **Code is deliberately not indexed.** `gbrain-base-v2` dropped the `code` page type its predecessor declared, so `code-def`/`code-refs`/`code-callers` cannot work. Grep is the tool for code.
- **Never point a code source at the repo root, and do not run `/sync-gbrain`** — the code walk prunes by directory *name*, never reads `.gitignore`, and descends into `apps/` and its 3.4 GB of generated runs.
- **PGLite is single-process** — a live `gbrain serve` blocks any import.
