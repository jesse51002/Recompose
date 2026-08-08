Conventions for the Obsidian vault in this directory. Authoritative for everything under `docs/`; the repo root [[CLAUDE|CLAUDE.md]] covers how to work here generally and how the code is organized.

# Docs Vault Conventions

The `docs/` folder is an Obsidian vault. All rules below apply whenever reading or writing anything in `docs/`.

## Journey.md — keep it updated

`docs/Journey.md` is the high-level at-a-glance record of where the project has been and where it stands now. It is not a detailed log — the pivots and office hours docs hold the detail. Journey.md holds the **summary arc**: what was tried, what the real blocker was, what changed, and current status.

**Keep it updated whenever a meaningful shift happens:** a new pivot, a first sale, a failed sales attempt that reveals something structural, a significant product or strategy change. The update should be a few sentences per phase entry or a new phase — enough for someone (or an agent) reading cold to understand the current situation in under two minutes. Do not let it drift stale; a stale Journey.md defeats its purpose.

## This is an Obsidian vault

- Use Obsidian-flavored markdown. Standard CommonMark works, but prefer Obsidian conventions where they apply.
- Internal links between docs should use Obsidian wikilinks (`[[Note Name]]` or `[[Path/To/Note|Display Text]]`) rather than relative markdown links (`[text](path.md)`) when linking to other notes inside this vault. Use standard markdown links for external URLs.
- Embeds use `![[Note Name]]` syntax when transcluding another note's content.
- Tags use `#tag-name` inline or in YAML frontmatter (`tags: [foo, bar]`).
- YAML frontmatter at the top of a file is supported and rendered as properties in Obsidian. Use it for metadata like `status`, `date`, `tags`, `aliases`, `related`.
- Callouts use the `> [!note]` / `> [!warning]` / `> [!info]` syntax.
- Block references use `^block-id` and are linked with `[[Note#^block-id]]`.
- Headings are linkable: `[[Note#Heading]]`.
- File and folder names can contain spaces — Obsidian handles them — but kebab-case or snake_case is preferred for new files unless an existing convention in the folder uses spaces.
- Do not add a frontmatter `title` field that duplicates the H1 — Obsidian uses the filename as the title by default.

## Write what is true now, not what changed

**A doc states the current position. It does not narrate its own edit history.** When something changes, rewrite the passage so it is simply correct, and delete the old wording rather than preserving it alongside the new.

Specifically, **do not add correction notes** — no `> [!warning] Corrected 2026-XX-XX`, no *"this section used to read…"*, no *"this was reversed on…"*, no parenthetical `(Corrected: it previously said X)`. A reader wants to know what is true, and a doc carrying three layers of what it used to say is harder to trust than one that just says the thing. The vault already has a place for history and it is not the strategy docs.

**Where the history actually goes:**

- **`pivots/`** — the decision, what it changed from, and when. This is the record. It is why a correction note in a strategy doc is redundant.
- **`Office_Hours/`** — the reasoning that produced it.
- **[[Journey|Journey.md]]** — the summary arc. Recording what was tried and what changed *is* this file's job, so it is the one place a "then this reversed" sentence belongs in normal prose.

Those three are historical records and are **never edited retroactively**, which is exactly what makes it safe to delete the archaeology everywhere else.

**The narrow exception,** and it has to earn itself: a correction note is justified only when someone acting on the old belief would do damage, and the note is the thing that stops them. A stale figure that is still being quoted in a live pitch, a claim already sent to an outside party, a rule whose old form is still enforced somewhere in code. Even then, write it as a live warning about what to do — *"never quote the precise figure"* — not as a changelog entry about what the doc used to say. If it is only interesting rather than load-bearing, it goes in the pivot doc and nowhere else.

This applies to every doc in the vault, to every [[CLAUDE|CLAUDE.md]], and to `PRODUCT.md`.
- When creating a new note that should be discoverable, add relevant `tags` and link it from at least one existing note so it isn't orphaned in the graph view.

## Two doc types: Pivots vs. Office Hours

The `pivots/` and `Office_Hours/` folders serve different purposes and the distinction matters:

- **Pivots** = **final decisions I made about pivots.** A pivot doc records what was decided, when, what it changed from, what it changed to, and why (briefly). The exploration that led to the decision lives elsewhere. Pivot docs are short, decisive, and authoritative.
- **Office Hours** = **exploration of options.** Office hours docs capture the diagnostic conversation, the options considered, the constraints, the back-and-forth reasoning, the open questions, and the founder's converged direction at that moment. Multiple office hours docs may explore the same area before a pivot decision crystallizes. Some office hours sessions never produce a pivot at all — that's fine; they're still valuable as a record of the thinking.

The order is always: **explore in office hours → decide in pivot → update strategy docs.** A pivot doc without prior office hours exploration is allowed but rare; an office hours doc without a downstream pivot is common.

## Pivots: documenting final decisions

When a final decision is made about the product plan, strategy, scope, target customer, pricing, core mechanism, or user flow, document it in `pivots/` BEFORE updating any other docs to reflect the new direction.

### Why

The strategy docs at the vault root describe what is being built and why. When a decision overturns or modifies what those docs claim, the *fact* of the decision and the *moment* it was made is at risk of disappearing the moment the docs are updated. Pivot docs preserve the decision itself — what changed, when, and why — so future readers can quickly see the lineage of the product without reconstructing it from strategy-doc archaeology.

The exploration behind the decision (every option, every constraint, every tradeoff considered) lives in the corresponding office hours doc(s) referenced from the pivot. The pivot itself is short and final.

### Filename convention

Every pivot file starts with the date and hour (CDT/CST local time) so files sort chronologically and ties within a day break by creation hour. Format:

```
pivots/YYYY-MM-DD-HH-short-descriptive-slug.md
```

Examples:
- [[pivots/2026-05-20-23-customization-pipeline-simplified-to-dependency-dag|pivots/2026-05-20-23-customization-pipeline-simplified-to-dependency-dag.md]]
- [[pivots/2026-07-27-11-customization-engine-is-the-company|pivots/2026-07-27-11-customization-engine-is-the-company.md]]

The date and hour come from the file's birth time (run `stat <file>` to see Birth field) so the filename reflects when the doc was actually written on disk. The semantic date of the decision (when it was opened or made) lives inside the doc body, not in the filename, so the two can diverge if a decision opened earlier is captured later.

Slug is short, kebab-case, descriptive enough to be obvious from the filename alone.

### Required content

Pivot docs are short. Every pivot doc should include:

1. **Date and status** at the top (Decided / Reversed / Superseded by [link])
2. **The decision** — what was decided, in one sentence
3. **What it pivots from** — the prior direction in one or two sentences (so the change is legible)
4. **What it pivots to** — the new direction in one or two sentences
5. **Why (briefly)** — the load-bearing reasoning. Two to four sentences. Full reasoning lives in the office hours doc(s) referenced below.
6. **Office hours doc(s) that explored this** — links to the `Office_Hours/` files where options were considered. May be empty if the decision was made without a formal exploration session.
7. **Downstream impact** — which strategy docs, code, or copy must be updated to reflect this pivot.

The pivot doc is decisive, not exploratory. It records the decision and the moment. Options considered, tradeoffs weighed, alternatives rejected — those belong in the office hours doc(s) that this pivot references.

### Workflow — order of operations

1. Explore the decision space in `Office_Hours/` (one or more office hours docs covering options, constraints, tradeoffs, open questions).
2. Decision is made.
3. Pivot doc written in `pivots/YYYY-MM-DD-HH-<slug>.md` recording the decision, what it pivoted from/to, why briefly, and links to the office hours doc(s).
4. Pivot doc committed to the repo.
5. THEN update every affected strategy doc at the vault root to reflect the new direction.
6. THEN update any code or landing-page copy that depended on the previous direction.

The pivot doc is preserved indefinitely. Never delete. Never edit retroactively. If the decision is later reversed or revisited, write a NEW pivot doc with a new date that references the previous one (set the previous one's status to `Superseded by [link]`).

### What counts as a pivot

- Changes to the product's core mechanism, scope, or features
- Changes to the target customer or positioning
- Changes to pricing or business model
- Architectural decisions that affect strategy doc claims
- Decisions to defer, kill, or substantially restructure a previously planned feature
- Changes to the engagement loop or core user flow

Small copy edits, bug fixes, typos, and operational changes do not need pivot docs.

### When in doubt, write the pivot doc

Pivot docs are cheap to write and impossible to recreate from memory months later. If a change feels meaningful, write the pivot doc. The cost of an unnecessary pivot doc is a few minutes. The cost of a missing pivot doc is losing the reasoning behind a decision that future-you will need to revisit when something breaks or the question comes back.

## Office Hours: exploring options

Office hours docs capture the *exploration* — the diagnostic conversation, the options considered, the constraints, the back-and-forth reasoning, the founder's converged direction at that moment. They live in `Office_Hours/`.

Office hours docs are produced by the `/office-hours` skill or any equivalent strategic diagnostic, but the folder is also home to other thinking artifacts that aren't strictly sessions: architecture options exploration, decision-space mapping, context handoffs between sessions.

### Why

Office hours docs capture the diagnostic conversation: which forcing questions were asked, how the founder answered, which assumptions got tested or shaken, what was conceded, what was pushed back on, every option considered with its tradeoffs. The *fact* of any final decision lives in the corresponding pivot doc. The *reasoning, back-and-forth, and founder's own corrections in real time* live in the office hours doc.

Without the office hours record, future readers (including future-you) see only the final pivot decision and lose the question that produced it. The question matters. A good answer to the wrong question is worse than a partial answer to the right one.

Not every office hours doc produces a pivot. Some explorations end with "no decision yet, need more data." That's still a valuable record — it captures what was considered and what was deferred, so the next session can pick up rather than start from scratch.

### Filename convention

Every office hours file lives in `Office_Hours/` and starts with the date and hour (CDT/CST local time) so files sort chronologically AND ties within a day break by hour. Format:

```
Office_Hours/YYYY-MM-DD-HH-Office_Hours_<topic>.md
```

Examples:
- [[Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company|Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md]] (broad strategic session, started ~11am)
- [[Office_Hours/2026-04-26-01-Office_Hours_Personalization_Architecture|Office_Hours/2026-04-26-01-Office_Hours_Personalization_Architecture.md]] (focused sub-decision, ~1am)

The date and hour come from the file's birth time on disk (run `stat <file>` to see Birth field), not from the semantic date of the session. This means filenames sort by when the doc was actually written, even when sessions about an earlier date get captured later. The semantic date (when the session ran) lives inside the doc body in the `Date` field.

Topic is short, descriptive, and disambiguates from prior sessions on the same day.

Other thinking artifacts that aren't strictly office hours sessions (architecture options exploration, decision-space mapping, context handoffs between sessions) can also live in this folder using the same date-hour convention without the `Office_Hours_` prefix:

```
Office_Hours/YYYY-MM-DD-HH-<descriptive-name>.md
```

Example:
- [[Office_Hours/2026-04-26-00-Personalization_Architecture_Options|Office_Hours/2026-04-26-00-Personalization_Architecture_Options.md]] (options exploration, not a session)

### Reading prior sessions before running a new one

When running a new office hours session, the first step is to read all prior office hours docs in `Office_Hours/`. The session should not relitigate basics already locked in earlier sessions. If a new question or piece of evidence shakes an assumption from a prior session, the new doc must explicitly flag the shake — what assumption, from which prior session, and how the new evidence changes it.

This makes the office hours folder a continuous record of the founder's evolving thinking rather than a series of disconnected one-off conversations.

### Required content

Every office hours doc should include:

1. **Date, status, mode** at the top (DRAFT / APPROVED, Startup / Builder, related session refs)
2. **Problem statement** — the question(s) the session set out to answer
3. **What carries from prior sessions** — locked premises, pitch language, plans that survive untouched
4. **What this session changed** — new positions, shaken assumptions, evidence re-weightings
5. **Premises** (locked vs. to-test)
6. **Approaches considered** — options examined, why each was accepted or rejected
7. **Recommended approach** — the converged direction
8. **Open questions** — what is unresolved
9. **The assignment** — concrete real-world action the founder takes next
10. **What I noticed about how you think** — observational reflections on founder behavior in the session

### Relationship to pivots

Office hours docs and pivot docs serve different purposes:

- **Office hours doc** = the exploration. Diagnostic conversation, options considered, tradeoffs, reasoning, open questions. May or may not produce a final decision.
- **Pivot doc** = the final decision. What was decided, what it pivots from/to, why briefly, with links back to the office hours doc(s) that explored the options.

When an office hours session leads to a pivot, write the pivot doc separately in `pivots/` per the pivot convention above. The pivot doc references the office hours doc(s) that explored the options. The office hours doc can also reference the eventual pivot doc once it exists, but isn't required to.

When an office hours session does NOT lead to a pivot (the exploration ends inconclusive, or the converged direction is just an iteration on the existing strategy that doesn't qualify as a pivot), no pivot doc is written. The office hours doc stands alone as the record of that thinking.

### Never delete, never edit retroactively

Same rule as pivots. Office hours docs are preserved indefinitely. If a later session reverses or revises an earlier session, write a new doc with a new date that references the prior one. The historical record is the value.

## Research: dated filenames

Every file in `Research/` starts with the date the research was done, so the folder sorts chronologically and a reader can tell how old a finding is without opening it:

```
Research/YYYY-MM-DD-short-kebab-slug.md
```

Date only — no hour. Research is not a chronological narrative the way pivots and office hours are, and several files landing on the same day is normal. A data file that belongs to a research doc takes the same stem so the pair sorts together.

**The date is when the research was done, not when the file was created.** For anything commissioned in this vault those are the same and `stat` is trustworthy. For anything carried in from elsewhere they are not — the birth time is the migration date, and the real date has to come from the original or from the content. Getting this wrong is worse than leaving it off, because a wrong date in a filename is believed.

Why it matters here specifically: a research finding is only as good as the thesis it was written against, and this vault holds research from both sides of a pivot. The date is what tells a reader which one they are looking at.

## Linking

**Link a doc whenever you reference it.** If you name another vault doc in prose, make it a link. Every link is an edge the retrieval graph traverses, and edges are what make the vault answerable rather than merely searchable.

One form, always — a vault-root-relative path with a display alias:

```
[[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]
[[Research/2026-08-02-why-custom|the August build-vs-buy research]]
[[pivots/2026-07-30-22-autonomous-is-the-promise|the autonomy pivot]]
```

Any doc is a legal target. The reader sees the alias; the tools see the path.

**Bare `[[Basename]]` fails silently.** Obsidian resolves it, gbrain does not — it drops the edge as a "reference to a non-page" with no error, and the doc quietly leaves the graph. This is the one linking mistake that costs something, and nothing will warn you.

## Concepts

`Concepts/` is the glossary: the canonical short definition of each recurring term. [[Concepts/_Index|Concepts/_Index.md]] is the authoritative listing and holds proposals not yet approved. Add every new concept to it.

The folder nests by domain then type — `Concepts/<Domain>/<Type>/<Concept_Name>.md`. Some domain folders are empty placeholders, not omissions. New concepts need the founder's explicit approval; propose rather than create.

**Unresolved links in the carried historical docs are expected.** The gym-era concepts stayed behind in CombatDen. Do not recreate them — read them in `/var/home/jm/Documents/CombatDen/docs` if the gym-era meaning is genuinely needed.

A concept file is short — under a screen. Frontmatter carries `tags` and `aliases`; the body is a 1–3 sentence definition, optional nuance, and links to related docs. Concept files are revisable as the product evolves; unlike pivots and office hours they are not historical records.
