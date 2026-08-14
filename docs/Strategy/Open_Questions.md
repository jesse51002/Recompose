---
tags: [strategy, open-questions, recompose]
status: living
---

# Open Questions

Live, unanswered, and load-bearing. Test identifiers continue the sequence used in `Office_Hours/`; the sessions that raised them carry the reasoning.

**The single most important fact about this list: none of it can be closed by more research.** Six briefs landed on 2026-08-13 and every one of them named a conversation as the only remaining instrument.

---

## The ones that decide whether this is a company

**T44 — Do people who install an artifact then modify it?**
The interaction the entire direction rests on, and nobody measures it. Registries count published packages, never modifications. Answerable in an afternoon with one preset, one person, and one observation.

**The marketplace-versus-verification contradiction.**
Owning the substrate makes output checkable *because the contract is narrow*; free-form code from arbitrary authors is maximally unbounded. Both are currently claimed. Choosing between them is upstream of the marketplace's design, not downstream of it. See [[Strategy/Trust_And_Safety|Trust_And_Safety.md]].

**T47 — Can the parity half be built small enough to ship before the differentiator does?**
The differentiator is a small fraction of the work and the workspace underneath it is the rest. Every simplified-Notion in the field failed here rather than on the idea.

**The accept condition for a shared artifact.**
Open since 2026-08-10 in one form or another. Rollback answers it for a local artifact, where the person who accepted the risk is the person harmed. It does not answer it for a published one.

## The ones that decide what gets built

**Marketplace posture — curated store or public index.**
Different expectations, different blame, different legal exposure. Free to choose now, expensive after users form an expectation.

**Sync conflict resolution.**
Two people, or an agent and a server, editing one vault. Obsidian's answer took years and is their paid product. This is the fifth face of the same problem — see below.

**T45 — Does the low-barrier authoring rate hold when the low barrier is a prompt rather than YAML?**
The two-percent-versus-fourteen-automations split is an inference across two different populations and is the weakest load-bearing premise in the direction.

**T46 — What observation would show the HTML-artifact trend has stalled?**
A trend thesis with no disconfirming measurement cannot be killed. This must be written down before the build starts, not after.

**T48 — Does a code marketplace inside a workspace survive its first supply-chain incident?**
And is the answer different for a curated store than for a public index.

## The ones about money

**Pricing.** Undecided, with real anchors for the first time: $8–45 per seat across the field, Gamma's free/$8/$15/$100 ladder, Retool's builder-versus-consumer split, and consumption pricing normalised by Glean, Rovo and Copilot Studio. Two units fit the architecture and neither is chosen — a builder/installer split, or per-workspace resource tiers.

**Funding.** The direction is inference-heavy and subsidised credits are expected to be necessary, which makes a raise a dependency rather than an option. Against zero customers and no outside response in nine months, **the fundable asset is a working demonstration rather than traction.**

**T43 — Is "you never own the maintenance" a reason anyone pays, or only a reason they should?**
The value proposition with the most independent corroboration behind it and no direct evidence that anyone will pay for it.

**T42 — Does the spreadsheet claim hold when asked of a person rather than inferred from a corpus?**
That people stay on spreadsheets because spreadsheets bend. It survives qualitatively via the shadow-IT literature; the distribution behind it does not survive removing vendor sources.

## Inherited and still unanswered

**T36 — Are empty cells empty for a reason?**
Three companies have now vacated adjacent ground and none published a cause: Gigacatalyst repositioning upstream to demos and POCs, CodeParrot dying on "the generated code wasn't reliable enough for production," and Stacker moving to agents after six years and $23M.

**The gym-era CRM interview evidence, still unwritten.**
Gym owners saying their CRM was always missing something specific to their business. **The only first-hand demand data this project has ever had**, recorded nowhere, decaying since it was first flagged.

---

## The one that keeps reappearing

**Surviving concurrent change** turned up in five distinct places in a single day, and it is the same problem each time:

- Retool modules, where every consumer takes the live version and no per-app pinning exists
- Marketplace artifacts forking with no diff or merge story
- Extensions breaking on base upgrades across Obsidian, AutoHotkey and Chrome, where **nobody migrates them forward** and backup-and-rollback is the state of the art
- Sync conflict between two editors, or an agent and a server
- Version drift when a hand edit meets a regeneration

[[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]] names the shape of an answer and nothing in any surveyed ecosystem implements one. **It is simultaneously the central engineering problem and the second of the three things a coding agent structurally cannot do.**

---

## What is not open

These are decided, and reopening them needs new evidence rather than new discomfort.

Desktop rather than browser-only. A vault of files on disk. Data server-side, isolated per workspace. Execution local. Rollback instead of dev/prod separation. Freedom on public APIs with internal access behind a host-held credential. Small teams first, enterprise as the destination. And the differentiator being exactly one thing.
