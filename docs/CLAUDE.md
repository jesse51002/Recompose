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
Research/YYYY-MM-DD-HH-short-kebab-slug.md
```

Date and hour (CDT/CST), matching `pivots/` and `Office_Hours/`, because several briefs now land on the same day and the date alone no longer orders them. A data file belonging to a research doc takes the same stem so the pair sorts together.

**The date is when the research was done, not when the file was created.** For anything commissioned here they match and `stat` is trustworthy. For anything carried in from elsewhere they do not — birth time is the migration date, and the real date must come from the original or the content. A wrong date in a filename is believed, so getting it wrong is worse than leaving it off.

**The hour follows the same rule, and that is why some filenames carry one and others do not.** A brief commissioned here takes its hour from birth time. A brief carried in has a birth hour that records the migration, so it is omitted rather than invented — an hour is a claim about when the work was done, and a wrong one reads as true. Do not backfill the older files to make the folder look uniform.

It matters because a finding is only as good as the thesis it was written against, and this vault holds research from both sides of a pivot.

## Commissioning research

**Research produces data. Deciding is the founder's job.** A brief asks for distributions, counts, rankings with a stated measure, classifications with stated criteria, verbatim quotes, and explicit nulls. It never asks whether a finding is good or bad for the thesis, never leads with "what you most need to know," and never closes with recommendations. A brief that renders a verdict shades its own findings toward it.

**Precision over recall when naming companies.** Name only what can be cited with a source and a date; everything else goes in a clearly marked unverified-leads list to verify or discard, with inclusion stated as no endorsement. **A miscategorised example anchors the whole search** — this has cost a pass. Give the brief an inclusion test and an explicit disqualifier list rather than a candidate list, and ask for an "excluded and why" section, which is often worth more than the included one.

**Ask for evidence quality on every row** — primary, vendor-claimed, third-party, competitor-sourced, consultant-marketing, inferred — and for a section on circulating statistics that do not survive sourcing. Conflicting figures are shown side by side, never averaged.

**Nulls are data.** "Searched X, Y, Z; found nothing" is a finding and belongs in the report with what was searched.

A returned brief is filed under `Research/` by the rule above, and its position — what it means for the product — goes in a separate `Strategy/` doc that links to it. **Do not let a brief's own recommendations become strategy**; they were written for whoever the prompt implied, not for this project.

## Point at where, not at how many

**Never write a pointer that has to be re-counted or re-listed to stay true.** "Read these four", "the two pivots", "19 concept files", a hand-copied tree of a folder's contents — each is wrong the moment something is added, and nothing forces a reader to notice. This is how docs go stale while nobody writes anything false.

Write the location and the rule for finding the thing:

- ✅ "Work backwards from the newest doc in `pivots/`."
- ❌ "Read these four first," followed by a numbered list.
- ✅ "[[Concepts/_Index|Concepts/_Index.md]] is the authoritative listing."
- ❌ a copy of the concept tree living in another file.

**One canonical location may hold the full list; everything else points at it.** Name a specific only when the specific is the point — a genuinely load-bearing doc, a filename-format example, the file that owns a rule.

Does not apply to counts inside a doc's own argument ("two things this costs," followed by the two things) or to cited figures in research. Those are content, not navigation — they are edited alongside what they describe.

## Companies

`Companies/` holds one page per company the repo tracks in depth — a competitor whose positioning bounds ours, a target buyer whose extension surface decides the sale, or a reference architecture worth copying. [[Companies/_Index|Companies/_Index.md]] is the authoritative listing and holds the page conventions.

**A company page holds current facts about one entity; a research brief answers a question at a date; a strategy doc holds a position.** Where a strategy doc needs a company fact, it links to the company page rather than restating it — which is what stops the same company being described in six documents that drift apart.

Every page carries a `verified` date, because company facts rot faster than anything else here. A page whose date is months old is one to re-check before quoting it on a call.

The folder needs no schema-pack change: `companies/` is already a prefix on the `company` entity type, and gbrain matches path prefixes case-insensitively.

## Linking

**Link a doc whenever you reference it.** Every link is an edge the retrieval graph traverses, and edges are what make the vault answerable rather than merely searchable.

One form, always — vault-root-relative path with a display alias. Any doc is a legal target.

```
[[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]
[[Research/2026-08-02-why-custom|the August build-vs-buy research]]
[[pivots/2026-07-30-22-autonomous-is-the-promise|the autonomy pivot]]
```

**Bare `[[Basename]]` fails silently.** Obsidian resolves it; gbrain does not — it drops the edge as a "reference to a non-page" with no error and the doc quietly leaves the graph. This is the one linking mistake that costs something, and nothing warns you.

**Deleting a link does not delete the edge.** Extraction only ever inserts, so a
wikilink removed from a doc leaves a phantom edge behind that `think --anchor`
still traverses — verified by test, and nothing reports it. `make -C docs brain`
prunes them as its fourth step, which is the whole reason that step exists, so
in normal use this is handled for you. It only becomes a live concern if you run
the `gbrain` commands by hand instead.

## Concepts

`Concepts/` is the glossary — the canonical short definition of each recurring term. [[Concepts/_Index|Concepts/_Index.md]] is the authoritative listing and holds proposals not yet approved; add every new concept to it. New concepts need explicit approval: propose, don't create.

Nests by domain then type — `Concepts/<Domain>/<Type>/<Name>.md`. Empty domain folders are placeholders, not omissions.

A concept file is under a screen: frontmatter with `tags` and `aliases`, then a 1–3 sentence definition, optional nuance, and links. Unlike pivots and office hours these are revisable, not historical records.

**Unresolved links in the carried historical docs are expected.** The gym-era concepts stayed behind in CombatDen — do not recreate them. Read them in `/var/home/jm/Documents/CombatDen/docs` if the gym-era meaning is genuinely needed.

## Skills for vault work

Reach for these rather than doing the work longhand. Each is invoked by name.

- **`office-hours`** — the diagnostic session that produces an `Office_Hours/` doc: forcing questions, options with tradeoffs, what shook, the assignment. Use when a decision is genuinely open. Read the prior sessions first; a session should not relitigate settled ground.
- **`idea-lineage`** — traces one idea through the vault: first mention, best articulation, reversals, contradictions, abandoned branches, and the current live version. The right tool when a position feels unstable or you suspect it was reversed and the docs never caught up.
- **`concept-synthesis`** — dedupes and synthesizes concept stubs into a tiered map, tracing how an idea evolved across sources. For when `Concepts/` has drifted into overlapping or half-formed entries.
- **`strategic-reading`** — reads a book, article or case study *through* a specific problem you are facing and returns an applied playbook. Not a summary tool; give it the problem, not just the source.

Anything that changes the gbrain setup — reindexing, sources, models, the schema pack, a search returning nothing — is **`gbrain-maintenance`**.

## The vault is edited only in the main checkout

**Never edit `docs/` from a git worktree.** Ask the brain questions there freely — `.envrc` derives `GBRAIN_HOME` from git, so a worktree resolves main's brain with no setup — but every write to the vault happens in the main checkout.

The reason is that the index cannot follow you. The `vault` source's path is absolute and points at main's `docs/`, so a sync run from a worktree indexes main's vault regardless of what the branch changed; PGLite is single-process, so two worktrees touching the brain at once collide; and a vault edited on a branch would be answered for out of an index that never saw it. Read-only in a worktree keeps the brain and the vault the same thing.

## Every folder is a taxonomy entry

**A page must live in a folder, and every folder must map to a page type.** When you add a top-level folder to the vault, add its prefix to the schema pack in the same change — the `gbrain-maintenance` skill has the command. A folder with no prefix gets typed by guesswork, which is how `Journey.md` once came back typed as a concept.

**Never write a page into the brain that has no file in `docs/`.** Several gbrain skills offer to — `capture`, `idea-ingest`, `enrich`, `eiirp` all write pages directly. Here the brain is a mirror of the filesystem, not a store in its own right: a brain-only page is in no folder, in no git history, invisible in Obsidian, and gone on the next reimport. If a skill produces something worth keeping, it lands in `docs/` as a file and gets committed.

The point is that nothing lives somewhere you cannot find it by opening a folder. The brain makes the vault searchable; it never becomes the place things are kept.

---

# Working with the vault

## Where to start

**[[Strategy/Recompose_Summary|Recompose_Summary.md]] and [[Strategy/Journey|Journey.md]], both.** The summary is what the company *is* now; the journey is how it got there. The summary alone reads as arbitrary; the journey alone leaves you reconstructing the current position from its history.

Then work backwards from the newest doc in `pivots/`, as far as the question needs — each pivot names the office hours doc that explored it, and that is where the reasoning lives. **Read the newest one first and check its status line**, because a pivot that has been superseded says so at the top and pointing at the next one is the only navigation that stays true.

**Every `Strategy/` doc describes the current direction only.** Where a direction was abandoned, its strategy doc was deleted rather than annotated — the history is in `pivots/`, `Office_Hours/` and [[Strategy/Journey|Journey.md]], which is where to go when you need to know what a decision replaced.

**This vault was migrated out of CombatDen on 2026-07-28.** Only what was true for Recompose came over; the gym CRM strategy, sales, UX and market material stayed behind and still lives in `/var/home/jm/Documents/CombatDen/docs`. Read it there if you need gym-era context — do not copy it here. The earliest office hours docs and pivots, and much of `Research/`, still use gym framing because that is when they were written. Read them for the reasoning, not the current buyer.

## GBrain

A local [gbrain](https://github.com/garrytan/gbrain) brain indexes this vault so questions can be asked by meaning. Everything runs on the Claude subscription — there is no per-call cost to weigh.

**The brain lives in this repo, at `.gbrain/`, not in your home directory.** `direnv` sets `GBRAIN_HOME` from the `.envrc` at the repo root, so it resolves the same whether you started from the repo root, from `docs/`, or from a subsystem folder — **it does not matter where you launch Claude from.** Outside the repo the variable is unset and gbrain says `No brain configured` rather than quietly answering out of a different brain.

`.gbrain/` is gitignored — it is a rebuildable index, not source. **A fresh clone has no brain**; see the `gbrain-maintenance` skill to build one.

**Ground every answer about this project in the vault before giving it.** Not only when you set out to work something out — before you say anything substantive about what Recompose is, why a decision went the way it did, what a doc claims, or what is still open. Reach for `gbrain think` first, then answer from what it returns.

The failure this prevents is answering from recall or inference. Both feel like knowing. A summary read three hours ago has since been superseded; a position that sounds right is often a premise the vault already reversed. `think` reads across ~40 pages at once and cites every claim, and names what the vault does not cover rather than guessing it. **It is not overhead to skip when you think you already know — that is exactly when it earns the call.**

**Before writing anything durable** — a pivot, an office hours doc, a strategy edit — treat it as required. The **Conflicts** section is the only thing that catches the vault contradicting itself, and a new doc written over an unnoticed contradiction entrenches it.

Narrow exceptions: a coding task, a mechanical edit, or a question one grep answers.

```bash
gbrain think "<question>"           # synthesis, cited, with Conflicts + Gaps — the default
gbrain think "<q>" --anchor <slug>  # also traverse the link graph around a page
gbrain query "<question>"           # ranked passages, free and fast
```

`gbrain search` is keyword-only and rarely what you want, despite gstack's docs calling it semantic. **Do not judge the brain by `query`** — on nine questions with known answers `query` put the right doc first six times and `think` answered all three misses correctly. Phrase questions the way the docs argue, not as labels.

**Keeping it current — one command:**

```bash
make -C docs brain
```

Sync, embed, extract, then print status. `make -C docs help` lists the rest.

Run it from anywhere in the tree, in any shell. **Do not run the three `gbrain`
commands by hand** — the Makefile exists because that route has three separate
ways to look like a broken brain when nothing is wrong. `GBRAIN_HOME` comes
from `direnv`, which a tool-run shell never gets, so every command answers `No
brain configured` with `.gbrain/` sitting right there; it has to be the
**parent** directory, because gbrain appends `.gbrain` itself, and pointing it
at `.gbrain/` looks correct and quietly creates a nested one. `VOYAGE_API_KEY`
lives in `~/.bashrc`, which non-interactive bash does not source, so `embed`
asks for a key that is set. The target supplies all of it.

The third trap survives even a correct environment: **`sync` imports text and
leaves embeddings stale by design.** It says so in its own last line. Stopping
there leaves `think` and `query` answering off the previous vectors while
`sync` reports success — which is the general rule with gbrain, that it
reports `success` while doing nothing, so verify by measurement. The target
ends on `sources status` for exactly that reason: read the embed and fails
columns rather than the exit code.

Sync follows git commits, not the working tree — **commit, then `make brain`.**

**Anything beyond this — reindexing, adding a source, changing the model or schema pack, rebuilding the graph, or a search returning nothing — is the `gbrain-maintenance` skill.** It records every failure mode hit while setting this up, including several gbrain features that do not work on this vault and why. Read it before trying a gbrain feature for the first time; its central warning is that gbrain reports `success` while doing nothing, so changes must be verified by measurement.
