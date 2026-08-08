---
tags: [concept, index]
aliases: [concept index, glossary, concepts]
---

# Concepts Index

Every concept currently defined in this vault, grouped by folder. Concepts are the only legal target of a wikilink — pivots, office hours, strategy and research docs are referenced by plain-text path in backticks. New concepts require the founder's explicit approval; proposals sit at the bottom of this file.

Concepts touched: this file is the list — every concept below is linked once, which is correct here and nowhere else.

Some domain folders exist but are still empty. They are placeholders for domains not yet needed, not omissions.

---

## Product / Mechanisms

- [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]] — A brand brief goes in; a store-ready branded production app comes out, with no human handoff in the middle.
- [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] — The ambition level Recompose commits to: a complete visual overhaul of a white-label app, including layout, driven by the tenant, with no new features.
- [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]] — A platform must be able to adopt the engine without changing its architecture, so the SDK and API that make that true are first-class product, not onboarding overhead.
- [[Concepts/Product/Mechanisms/Mockup_Skill|Mockup_Skill]] — A written description of a visual mirror that ships with it, so an agent knows exactly what every screen must contain and exactly how to edit it safely.
- [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]] — A tenant's customized surfaces feel like one designer made them, rather than like separate AI tools produced outputs that got stapled together.
- [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]] — Recompose does not write to the platform's repository, ever; it keeps its own tokenized fork and the platform grants read access. One of the two core principles.
- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]] — Generated code is view-layer only and may not add API calls or reach new data, so the API surface after a redesign is provably identical to the one before it.
- [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]] — The coordination layer that turns commodity AI generation primitives into one coherent brand-applied app; shipped today as a small dependency DAG over images, colours, fonts and text.
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]] — A tenant's redesign is continuously re-derived by an agent rather than hand-maintained, so divergence never accumulates as human work. **The name now reads misleadingly — the mechanism is forks.**
- [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]] — Design output is judged by rendering it and looking at the image, which is an accept condition for layout where there previously was none.
- [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]] — Customizable visual elements are exposed as parameterized slots rather than hard-coded, so a customer's skin is a config the pipeline resolves.
- [[Concepts/Product/Mechanisms/UAT_Sync|UAT_Sync]] — Every upstream change re-derives through the design forks and lands on `uat`, the platform's own branch that is ahead of `main`, never straight to production. A branch, not a review environment.
- [[Concepts/Product/Mechanisms/Visual_Mirror|Visual_Mirror]] — A JSX copy of the platform's app that is mockware only, where the design agent works and the tenant watches. The word *visual* is what keeps the invariant enforceable.

## Business / Strategy

- [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]] — The post-2024 cost compression of producing distinct visual design, from weeks of human labor to hours of AI-driven generation. The load-bearing technical premise.
- [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]] — The dynamic where a customer's brand identity is not separable from the product they sell — the brand *is* the product.
- [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] — The promise: a redesign runs to production without anyone being asked about it. Defensible because the pipeline **halts rather than ships**, not because anyone reviews it.
- [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]] — Target the populations that already pay $10–50k for custom builds, because they have dollar-validated willingness to pay for customization. **Returns inverted under P1b:** agencies are not the buyer, but agency-grade work is what the product replaces.
- [[Concepts/Business/Strategy/Shopify_Pattern|Shopify_Pattern]] — Build a rock-solid fixed structure for a category and expose customization as a deep theming layer on top, so customers compete on identity rather than on whether the structure works.

## Business / Pricing

- [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]] — Sell a platform a revenue tier it cannot currently staff, not end-user satisfaction. This is the *shape* of the ROI argument — **Recompose's own pricing is undefined** (Open Question 2).

---

## Proposed, not yet created

**Approved and created 2026-07-28:** `Never_Touch_Their_Code`, `Visual_Mirror`, `Screenshot_Oracle`, `UAT_Sync`. They are listed above and no longer proposals.

**Created 2026-07-30:** `Autonomous_Operation` — see `pivots/2026-07-30-22-autonomous-is-the-promise.md`.

**The remainder do not exist. All require the founder's explicit approval before a file is written** — per the vault convention that new concepts are proposed, not created unilaterally. Each is listed with the source that would ground it and a working name that is itself up for debate.

1. **The buyer concept — required, and its absence is a real hole.** The vault has no concept file for the multi-tenant white-label SaaS platform with real tenant volume, which is the role `Gym_Owner` played in the CombatDen vault and the single most-referenced entity in the current strategy. Working names: `White_Label_Platform`, `Platform_Buyer`, `Multi_Tenant_Platform`. Would be grounded in P1, P1a (the sharpest wedge is platforms already running a design service) and P1b of `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md`. Folder: `Concepts/People/`.
2. **`Assets_Are_Data_Layout_Is_Code`** — the two-part architecture split from P13b: a deterministic pipeline resolves palette, typography, copy, icons and images; an agent writes layout. The pivot calls this split load-bearing for positioning as well as engineering, and it currently has no home — it is scattered across [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] and [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]].
3. **`Forward_Deployed`** — P4: year one is forward-deployed, the founder does integration as paid onboarding, and the roadmap priority is integration-surface breadth rather than more generation modalities. This is a delivery-model commitment, not a footnote.
4. **`Reference_Implementation`** — P5: what CombatDen is now, and the rule that gym material is prehistory. Whether it also stays live with real gyms is Open Question 4, unruled.
5. **`Category_Creation`** — P10: deep per-tenant branding is bought in only two narrow places today, so most of the addressable market has never bought this in any form. Accepted in-session as the hardest kind of company to sell.
6. **`Uncrowded_Is_Not_Defensible`** — P7: the founder concedes platforms could build the pipeline themselves; the barrier is packaging, not difficulty, and the defence is being default-first plus coherence quality. Worth a concept precisely because it is a standing prohibition on moat claims.

### Cleanup item, also needing a decision

A set of wikilink targets used across the vault resolve to nothing, because the CombatDen concept set was not carried over. The most-linked are `Coach`, `Layered_Architecture`, `Pricing_Tiers`, `Gym_Owner` and `Autonomous_Agent_Layer`; the tail includes `Two_Pillars`, `Switching_Cost_Moat`, `Retention_Layer`, `Loss_Framed_Retention`, `Class_Based_Gym_Market`, `Engagement_Loop`, `Rank_System`, `Points`, `Rewards`, `Streaks`, `Member`, `Migration_Friction`, `ROI_Math`, `Content_Library`, `Contextual_Content_Delivery`, `Thin_Product_Test`, `Initiative_Not_Intelligence`. The current set is recoverable with a grep for `[[` across the vault. A handful are also written in path form (`Concepts/People/Coach`), which is a second convention violation on the same links. Two options, and the choice is the founder's: recreate them as explicitly historical CombatDen concepts, or de-link them to plain text in the docs that reference them. Doing neither leaves the graph broken.
