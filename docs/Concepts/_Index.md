---
tags: [concept, index]
aliases: [concept index, glossary, concepts]
---

# Concepts Index

Every concept currently defined in this vault, grouped by folder. New concepts require the founder's explicit approval; proposals sit at the bottom of this file.

Concepts touched: this file is the list — every concept below is linked once, which is correct here and nowhere else.

Some domain folders exist but are still empty. They are placeholders for domains not yet needed, not omissions.

> [!warning] Retired concepts are listed separately and none of them describes the product
> They are **kept rather than deleted**, because the pivots and office hours reference them and those are never edited. Each carries a banner and `status: retired`.

---

## Product / Mechanisms — live

- [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]] — A platform must be able to adopt the engine without changing its architecture. Satisfied **conditionally**: completely where an extension surface already exists, not at all where the platform must add insertion points.
- [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]] — A tenant's customized surfaces feel like one designer made them, rather than like separate AI tools produced outputs that got stapled together.
- [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]] — Recompose does not write to the platform's **trunk**, ever; a module lands in an extension surface they own. One of the two core principles.
- [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]] — The coordination layer that turns commodity AI generation primitives into one coherent output; shipped today as a dependency DAG over images, colours, fonts and text.
- [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]] — Customizable visual elements exposed as parameterized slots rather than hard-coded. Its output is what makes a generated module look native inside the platform's app.

## Business / Strategy — live

- [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]] — The post-2024 cost compression of producing distinct visual design. A supporting claim: it is why a generated module can look native for nearly nothing, not why anyone buys.
- [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] — The promise that work runs to production without the platform being asked. **SUSPENDED**: unattended operation needs a check the system can fail, and a generated feature has none. Do not claim it, and do not quote any error budget.
- [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]] — The dynamic where a customer's brand identity is not separable from the product they sell. **Not load-bearing**: design never drives a purchase alone, on four independent findings.
- [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]] — Target populations that already pay for custom work, because they have dollar-validated willingness to pay. Inverted: agencies are not the buyer, agency-grade work is what the product replaces, and the budget is a development line.
- [[Concepts/Business/Strategy/Shopify_Pattern|Shopify_Pattern]] — Build a rock-solid fixed structure for a category and expose customization as a deep layer on top. The layer here is functional rather than visual.

## Business / Pricing — live

- [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]] — Sell a platform a revenue tier it cannot currently staff, not end-user satisfaction. The constraint removed is engineering capacity. **Recompose's own pricing is undefined.**

## Retired — kept for the historical record, not describing the product

- [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]] — Brief in, store-ready app out, no human handoff. **The argument shape is reusable** as "request in, working functionality out, no developer in the middle."
- [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] — The scope Recompose committed to between 2026-07-27 and 2026-08-12. Theming is a token layer.
- [[Concepts/Product/Mechanisms/Mockup_Skill|Mockup_Skill]] — A written spec shipping with a mock so an agent knows how to edit it safely. **The idea transfers**: a module generator needs a specification of the platform's API surface, and nothing produces one.
- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]] — Arrangement only; the API surface provably identical. The invariant is **additive-only** instead, which proves nothing existing changed but not that the new thing is correct. **The gate was never built.**
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]] — Continuous agent re-derivation instead of hand-maintained divergence. **Regression-test combinatorics is solved structurally by additive modules**; the live coupling hazard is contract drift.
- [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]] — Judge design by rendering it and looking. **A feature has no equivalent**, which is the load-bearing open question. One live rule: VLMs rank reliably and score unreliably.
- [[Concepts/Product/Mechanisms/UAT_Sync|UAT_Sync]] — Re-derivation lands on the platform's `uat` branch, never straight to production. No forks, so nothing lands anywhere yet.
- [[Concepts/Product/Mechanisms/Visual_Mirror|Visual_Mirror]] — A feature-free JSX copy of the platform's app where the design agent worked. No design agent, no mirror.

---

## Proposed, not yet created

**All require the founder's explicit approval before a file is written** — per the vault convention that new concepts are proposed, not created unilaterally. Working names are themselves up for debate.

### Proposed 2026-08-12

1. **`Additive_Only`** — a core principle with no concept file, and the most conspicuous gap in the vault. A module adds; it never edits, moves, merges, splits or removes. Would carry the field evidence (Salesforce, ServiceNow, SAP, Shopify, Forge, Caliper, Banno's Plugin Framework, Gigacatalyst converging independently; rated load-bearing at high confidence) **and** the honest limit: diff-verifiable for existing code, silent about whether the added thing is correct. Folder: `Concepts/Product/Mechanisms/`.
2. **`Insertable_Module`** — the unit of the product. What one is, what it may touch, what it renders against, and the three surfaces it spans (module, backend, admin). Currently described only in prose across the strategy docs.
3. **`Tenant_Facing_Loop`** — the differentiator against Q2 Code and every extension SDK: a non-technical tenant describes what they need and gets it, with no developer in the loop. This is the single sentence the company is now built on and it has no concept file.
4. **`Contract_Drift`** — the coupling hazard. A module's dependency on the platform's API is invisible: a field that keeps its name and changes meaning has no event attached to it. Would carry the proxy's limits.
5. **`Accept_Condition`** — the load-bearing gap, and arguably deserving a concept precisely because it is *absent*. Would hold the four candidates and the rule that autonomy cannot be claimed until one is chosen.

### Proposed earlier, still open

6. **The buyer concept — required, and its absence is a real hole.** The vault has no concept file for the platform buyer, the single most-referenced entity in the strategy. Definition: *a multi-tenant white-label SaaS platform that already funds per-tenant custom development*, sorted within that by whether every tenant already has an app. Working names: `White_Label_Platform`, `Platform_Buyer`, `Multi_Tenant_Platform`. Folder: `Concepts/People/`.
7. **`Assets_Are_Data_Behaviour_Is_Code`** — the two-part architecture split. A deterministic pipeline resolves palette, typography, copy, icons and images; an agent writes the module. Load-bearing for positioning as well as engineering, and it has no home.
8. **`Forward_Deployed`** — year one is forward-deployed, the founder does integration as paid onboarding. A delivery-model commitment, not a footnote.
9. **`Reference_Implementation`** — what CombatDen is now, and the rule that gym material is prehistory.
10. **`Uncrowded_Is_Not_Defensible`** — the barrier is packaging, not difficulty, and the defence is being default-first. Sharpened by the category having funded incumbents and the buyer owning the expensive half.

### Withdrawn

- **`Category_Creation`** — proposed on the premise that most of the market has never bought this in any form. The company now targets a budget line that demonstrably exists, which is close to the opposite bet. Do not create it without re-arguing it.

### Cleanup item, also needing a decision

A set of wikilink targets used across the vault resolve to nothing, because the CombatDen concept set was not carried over. The most-linked are `Coach`, `Layered_Architecture`, `Pricing_Tiers`, `Gym_Owner` and `Autonomous_Agent_Layer`; the tail includes `Two_Pillars`, `Switching_Cost_Moat`, `Retention_Layer`, `Loss_Framed_Retention`, `Class_Based_Gym_Market`, `Engagement_Loop`, `Rank_System`, `Points`, `Rewards`, `Streaks`, `Member`, `Migration_Friction`, `ROI_Math`, `Content_Library`, `Contextual_Content_Delivery`, `Thin_Product_Test`, `Initiative_Not_Intelligence`. The current set is recoverable with a grep for `[[` across the vault. A handful are also written in path form (`Concepts/People/Coach`), which is a second convention violation on the same links. Two options, and the choice is the founder's: recreate them as explicitly historical CombatDen concepts, or de-link them to plain text in the docs that reference them. Doing neither leaves the graph broken.
