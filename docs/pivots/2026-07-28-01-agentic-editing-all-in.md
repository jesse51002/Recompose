---
tags: [pivot, architecture, agentic-editing, recompose]
status: Superseded in part
date: 2026-07-28
---

# Pivot: All-In on Agentic Editing — The Visual Mirror, the Productionalize Agent, and Human Leverage as the Promise

**Date:** 2026-07-28
**Status:** Decided — **superseded in part by [[pivots/2026-07-30-22-autonomous-is-the-promise|pivots/2026-07-30-22-autonomous-is-the-promise.md]]**

> [!warning] The promise stated here was reversed on 2026-07-30
> The architecture below stands unchanged. What no longer holds is the **promise sold alongside it** — human leverage, "one person can manage a hundred at a time", and the error budget justified by *UAT and a human reviewer being the designed architecture*. UAT was corrected to a branch with no queue and no reviewer, and the promise is now autonomous operation with halting as what makes the budget survivable. Read the sentences about human review, UAT review and the error budget below as history. Per the never-edit-retroactively rule, nothing in this doc has been altered.

Concepts touched: [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]], [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]].

## The decision

The layout half of the product goes **all-in on free agentic editing**: the platform's codebase is agentically tokenized, mirrored into a **feature-free JSX visual mock**, redesigned by an agent with full freedom under the arrangement-only invariant, validated against **screenshots**, then converted back into production code by a **productionalize agent** and kept in sync on every upstream merge — **landing on UAT, never directly on prod.**

The promise sold alongside it is deliberately deflationary: **not that agents are magic, but that one person can manage a hundred at a time.**

## What it pivots from

Two things.

1. **From structural presets and enum classification.** The prior working assumption was that layout variation could be expressed as a bounded set of structural options the customer selects among. The founder built and tested it.
2. **From a layout half that was named but unspecified.** [[pivots/2026-07-27-11-customization-engine-is-the-company|pivots/2026-07-27-11-customization-engine-is-the-company.md]] committed to "layout is code, so an agent writes it" and left everything past that sentence open, naming the absence of a layout accept condition as the remaining engineering risk.

## What it pivots to

- **Free agency over layout, bounded by an invariant rather than by an enum.** The agent is not choosing from options; it is editing, constrained only by [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|nothing added, nothing removed]].
- **A JSX mirror that is explicitly visual, not functional.** Mockware — no features, no logic, no API calls, no state. This is what keeps the invariant enforceable at productionalize time, on production code, where the platform's own engineers can still verify it by diff.
- **Screenshots as the design accept condition.** Not deterministic the way WCAG is, but an oracle where the prior pivot said there was none — and one that only exists cheaply in a browser.
- **A productionalize agent as the load-bearing component.** Approved visual design in, production code out, invariant preserved. This is now understood to be where the product's difficulty and its defensibility both live.
- **We never touch the platform's trunk.** Recompose maintains a **shared tokenized fork** of their app as its base, kept current against their main by an agent; each design is a further fork of that base — one fork per design, not per tenant. There is no PR into their repository and no merge into their main. They grant read access; that is the integration. Two sync layers result: their main into our base, our base into each design fork.
- **Sync onto UAT.** Every upstream change re-applies through those forks and surfaces in UAT for human review, never straight to production.
- **Human leverage as the stated promise**, with an explicit error budget (~95% clean / ~4% minor / ~1% significant) that is acceptable *because* UAT and a human reviewer are the designed architecture, not a fallback.

## Why (briefly)

**The enum approach was tested and failed for a reason that generalizes.** Founder: *"it's always going to be bounded by the design language originally... if it sticks to it it'll cease to be truly unique."* A bounded structural system reproduces the platform's original design language no matter how many options it exposes. That is a reskin, which is precisely the dismissal this company exists to escape. This is the first empirical finding in the project and it came from building rather than reasoning.

**The visual mirror buys three things at once** — model fluency (agents handle JSX far better than Flutter widget trees), a screenshot oracle for the accept-condition problem the prior pivot left open, and live visual feedback for the end user, which is table stakes in this category. Its cost is incurred once per release per platform and amortized across every tenant, while the operation it makes cheap is per-tenant and constant.

**UAT is what makes the error budget survivable.** A 1% catastrophic rate on main is unsellable; the same rate in UAT is a queue a human works. That single choice converts a product-quality problem into a throughput problem, and the throughput is the thing the pricing and the positioning are both actually about.

**Not touching the trunk is a trust decision before it is a technical one.** Founder: *"that's the easy part in all honesty, the real problem is getting them to trust it, and I think no codebase touching is the way to go about it."* The codebase-ownership objection is the largest named adoption blocker in the vault, and it is organizational as much as technical — write access to the trunk requires engineering leadership sign-off, read access does not. This changes who has to say yes. It does **not** answer the QA and release objection; functional equivalence still carries that weight and is still unbuilt.

### The model this rejects

The **layout enum** — enumerating each generated layout on the customer's own trunk so per-tenant divergence never exists as a category — was rated highest by the founder as recently as 2026-07-27. It is dead. Founder: *"I realize how messy it would be trying to get them to release to production often, and just touching and maintaining their production code sounds like a mess. Agentic separate forks you essentially don't have to think about unless there is an error is better."* The enum and "we never touch your trunk" are mutually exclusive; the trunk won.

## Office hours doc(s) that explored this

- [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]] — the session that produced this decision.
- [[Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company|Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md]] — the founding session this refines.
- [[Office_Hours/2026-05-25-12-Office_Hours_Live_Preview_Rendering_Architecture|Office_Hours/2026-05-25-12-Office_Hours_Live_Preview_Rendering_Architecture.md]] — whose locked premise this breaks, and whose Flutter-Web finding it repurposes.

## Premise superseded

[[Office_Hours/2026-05-25-12-Office_Hours_Live_Preview_Rendering_Architecture|Office_Hours/2026-05-25-12-Office_Hours_Live_Preview_Rendering_Architecture.md]] locked: *"the customization the product sells is token/asset-level... not layout or structural redesign."* That premise is dead as of [[pivots/2026-07-27-11-customization-engine-is-the-company|pivots/2026-07-27-11-customization-engine-is-the-company.md]]; this pivot records the architectural consequences that were never worked through at the time.

That session's conclusion — compile the real app to web and push config over `postMessage` — was correct for a token-only product and is **not** the architecture here. Its underlying finding, that **Flutter Web is canvas-painted and therefore pixel-identical to mobile**, survives and is repurposed: it becomes the production-side screenshot oracle.

## Downstream impact

### Docs updated in the same change

- [[Strategy/Product_Boundaries|Product_Boundaries.md]] — the boundary set changes materially: the mirror is in scope and is visual-only; screenshots are the accept condition; UAT is a boundary; the error budget and the human-leverage promise are boundaries.
- [[Strategy/Recompose_Summary|Recompose_Summary.md]] — the mechanism and direction sections.
- [[Strategy/Architecture_Thesis|Architecture_Thesis.md]] — the layout half is now specified.
- [[Strategy/Open_Questions|Open_Questions.md]] — several questions resolved, several added.
- [[Strategy/Journey|Journey.md]] — Phase 6 extended.
- root `../CLAUDE.md` (project root, outside the vault) — the "What Recompose is" orientation block.

### Not yet done

- **Concept candidates**, requiring explicit approval before creation: `Visual_Mirror`, `Screenshot_Oracle`, `Human_Leverage_Not_Autonomy`, `UAT_Sync`.
- **Pricing** remains undefined and is deliberately deferred. Founder: *"for the price it's still unknown, this is really not that important yet."* Note for whoever picks it up: per-tenant versus per-platform matters enormously, because sync cost multiplies by tenant count.

### The binding constraint is unchanged

This is an architecture decision, not a demand signal. No white-label platform has seen any of this. The architecture is now three sessions deep and zero conversations deep, and the validation assignment first set on 2026-06-02 remains unexecuted.
