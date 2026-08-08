# Pivot: The Customization Engine Is the Company; CombatDen Becomes the Reference Implementation

**Date:** 2026-07-27
**Status:** Decided

Concepts touched: [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]], [[Concepts/Business/Strategy/Shopify_Pattern|Shopify_Pattern]], [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]], [[Retention_Layer]], [[Autonomous_Agent_Layer]], [[Class_Based_Gym_Market]], [[Gym_Owner]], [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]].

## The decision

The AI customization engine becomes the company — sold to **multi-tenant white-label SaaS platforms with real tenant volume** as a low-friction integration surface plus generation pipeline that lets **every one of their customers agentically redesign the app's entire look** — and CombatDen (the class-based-gym CRM, member app, kiosk, rewards, agentic video feed) is retained as the **reference implementation and demo**, not as the product being sold.

The one-line description written for the YC F26 application:

> **Customers agentically redesign white-label apps.**

## Scope: a full visual redesign, not theming

This is the ambition level and it is deliberate. The product is **not** "we tokenize your app and swap a palette." The target is a **complete visual overhaul of the app, driven by the tenant, with no new features** — every screen, every asset, every surface reading as that customer's brand rather than as the platform's app with a logo dropped in.

The founder's framing: *"i need ot be ambitous... full visual overhaul, no new features just complelte visual overhaul or deep visiual cusomtizion... i thin kambistuio ideas are the ones that end up going well, I Might not get there 100% but thats fine, thats what yc is for and if Gigacatalyst can do features, then visual should be a lot easier."*

That last clause is load-bearing and is now evidenced rather than assumed — see the Gigacatalyst analysis in the office hours doc. Their product generates *working software* against live data with inherited auth, RBAC, sandboxing, versioning, and audit trails; a bad output for them is a security incident. A bad output here is ugly. **The visual half is the structurally easier half of the same ambition**, which is the argument for aiming at full redesign rather than at theming.

**The mechanism, decided in the same session, and it is explicitly two parts:**

1. **Assets are data, so a pipeline generates them.** The existing app-agnostic dependency DAG resolves palette, typography, copy, icons, and images — deterministic colour derivation, WCAG AA enforced as an accept condition, bounded and known cost per run, coherence achieved structurally.
2. **Layout is code, so an agent writes it.** Layout is the surface no slot inventory can express, so an agent makes the change directly in the platform's codebase, under the invariant below.

This split is load-bearing for positioning as well as engineering: deterministic where determinism is available, agentic only where it is required. One agent doing everything reads as a wrapper over a model; two systems with a clear boundary reads as architecture, and it is what stops the company being filed under "another coding agent."

Pre-generated presets and mix-and-match theme sets are the **demo surface** — how the output is shown visually in an application or a sales call — not the architecture. Founder: *"the preset thing i said was more for the applcaiotn demo so i can just visually demo it, this is the interesting part that i thin kyc will care about."*

Two properties make this shippable rather than reckless:

- **Functional equivalence.** A redesign changes **arrangement only**. No screens are merged or split, no functionality is added, none is removed. Every screen does exactly what it did before and needs exactly the data it needed before, so the API surface is provably identical and the customer's QA surface is unchanged by construction. This is stronger than a sandbox because it is verifiable rather than argued — the platform's own engineers can confirm nothing was added or removed — and it is a strictly tighter constraint than Gigacatalyst operates under, since they generate new functionality against newly discovered APIs.
- **Delivered as a git branch on the customer's repo**, merged to main only on their manual acceptance. This gives them review, CI, history and rollback with no new process to adopt. How a tenant's redesign stays current across upstream releases — continuous merge absorbed by the vendor, or enumerating each generated layout on the customer's main so nothing diverges — is an **open implementation question, deliberately deferred as out of scope for the idea phase**. Thinking recorded in Open Question 12 of the office hours doc.

**Why this is the unlock and not just a bigger claim:** an agent that can write view code for a redesign is the same capability as an agent that can do the initial tokenization pass. Integration — named above as the biggest expected blocker — and the redesign product stop being two problems and become one, which is what makes this infrastructure rather than a generation pipeline with a services team attached.

The quality bar is **close enough at a fraction of the price**, not parity — the standard disruption shape, and explicitly not an attempt to beat human designers. What adding structure changed is the comparison target (a custom build rather than a generic template), not the requirement.

The remaining engineering risk is real and named: layout has no deterministic accept condition the way colour has WCAG and OKLCH, so generating *good* layouts rather than merely valid ones is the open problem. How the agent's output enters a customer's repository, who reviews it, and how it meets their CI and release process is unresolved and needs its own architecture session. Full reasoning in §11 and §11b of the office hours doc.

## What it pivots from

Two things at once, and the second is a reversal:

1. **From the class-based-gym CRM as the company.** Since `Business/pivots/2026-06-02-19-return-to-full-crm-switch-friendly-beachhead.md`, the product being sold was a full gym CRM targeted at gyms whose incumbent CRM is switch-friendly. The buyer was a [[Gym_Owner|gym owner]]. The engine was an internal capability that made the product's design tier possible.
2. **From the autonomous agent layer as the primary differentiator.** `Business/pivots/2026-07-25-16-autonomous-agent-layer-added-to-crm.md` made an autonomous, initiative-taking agent on top of the CRM the lead differentiator and the intended YC F26 thesis. On deeper examination two days later the founder concluded it will not work and withdrew it. The [[Autonomous_Agent_Layer]] is out of scope for this direction.

It also pulls forward a deferred decision. `Business/Office_Hours/2026-05-24-19-Redesign_Engine_As_Production_Platform_Horizon.md` explored productizing the engine for others and deferred it ~3–6 months **post first sale**, with the explicit warning that platform work must not become procrastination from selling gyms. That trigger was never met — there has been no first sale. Picking the platform direction up now is a deliberate, named override of that gate, not an oversight.

## What it pivots to

The engine as the product, sold to platforms rather than to end businesses.

- **Buyer:** a multi-tenant white-label SaaS platform with real tenant volume. Explicitly not agencies, not freelancers, not the end business. Volume is the unit of value — at low tenant counts the buyer's bottleneck is finding clients, not producing themes.
- **The value argument, two halves.** *Tier-unlock:* deep per-tenant branding is a premium tier platforms either cannot staff or staff expensively, because it costs a designer per tenant (Mighty Pro's Design Lab at $1,167+/mo, Passion.io's $10–20k DFY tier). *Lost deals:* platforms lose competitive deals to whoever's app can actually look like the prospect's brand — the loss-framed half, adapted from Gigacatalyst's own problem statement (*"you lose competitive deals — customers choose vendors that have the exact workflow they operate on"*). The pitch is *"a price tier you can't currently sell"* and *"the deals you lose on brand,"* never *"your tenants will love it."*
- **What is replaced, and it moved.** Because the product now changes **structure** and not only assets, the labor removed is the designer **and the front-end engineer who implements the design** — the whole custom-build line item, $10–50k and 4–12 weeks in the agency market. That reclassifies the competition: in-platform design services (Mighty Pro Design Lab, Passion.io DFY, BentoBox under Clover) and agency custom builds become the direct alternatives, while token tooling drops to a fraction of the surface. The [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]] returns inverted — agencies are not the buyer, but agency-grade work is what the product sells. **The sharpest wedge is therefore platforms that already run a design service**, because they can read the value off a P&L instead of imagining it.
- **The product is the integration surface as much as the pipeline.** Integrating into a customer's existing architecture is the expected primary blocker to adoption. A strong SDK (`Flutter` already is one), an API, and possibly embeddable/nested surfaces are first-class product requirements, designed so a platform adopts the engine **without changing its architecture**.
- **Delivery model, year one:** forward-deployed. The founder does the integration as paid onboarding; per-tenant generation is near-zero marginal cost afterward. The productization roadmap is integration-surface breadth and compressing the onboarding pass — not adding generation modalities.
- **CombatDen's role:** reference implementation, live demo canvas, and eval bed. Not the company, and no longer the sales priority.

## Why (briefly)

Three reasons, in order of weight.

**Founder energy is binding and it points away from vertical business software.** In the founder's words: *"I dont see myself doing crm long term, i wanna work with something more ai focused and cutting edge, if i end up just making busiess features i'll get bored, it was always a means to an end for me in the first place."* Clarified later: boring *work* is acceptable, but the **core product must be an automation product**. A solo founder without conviction in the product does not make the hundredth cold call — which is the most economical explanation available for why the 2026-06-02 validation assignment sat unexecuted for eight weeks while build work continued.

**The engine is the strongest asset in the project and the only one that is genuinely scarce.** A working app-agnostic dependency DAG, 80 validated brand themes generated in under two hours, two production Flutter apps consuming it live, and a new app costing one folder rather than a code change. Nothing else in eight months is as differentiated.

**The strategic position is real and currently unoccupied, and the adjacent proof exists.** Token tooling stops at tokens; brand APIs and brand-kit generators stop before any app ships; design tools stop at a mockup a human still has to implement. No verified player closes brief → coherent multi-modal asset set → store-ready production app across a fleet of tenants on a shared shell. Meanwhile Gigacatalyst (YC Spring 2026) has demonstrated the *functional* half of exactly this shape — per-tenant customization infrastructure embedded in a host SaaS, no changes to the host codebase, live with Series B companies — which validates the buyer, the motion, and the architecture pattern without occupying the visual half.

The countervailing risk is recorded and accepted, not resolved: this is the sixth strategic phase in roughly eight months, there are still zero paying customers, and no outside party has ever responded to anything. See the office hours doc for the full challenge.

## Office hours doc(s) that explored this

- `Business/Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md` — the session that produced this decision.
- `Business/Office_Hours/2026-05-24-19-Redesign_Engine_As_Production_Platform_Horizon.md` — the original exploration of the engine as a platform, and the deferral this pivot overrides.
- `Business/Office_Hours/2026-04-30-14-Office_Hours_Customizable_White_Label_Thesis.md` — the original architectural thesis.
- `Business/Office_Hours/2026-05-01-15-Office_Hours_Marketplace_Pivot_and_Architecture_Refinement.md` — the binding-constraint reframe and the finding that end users do not pay for brand depth, which this pivot converts from a weakness into an irrelevance.

## Downstream impact

### Prior pivots whose status needs updating

- `Business/pivots/2026-07-25-16-autonomous-agent-layer-added-to-crm.md` — withdrawn by the founder. Status should become `Superseded by Business/pivots/2026-07-27-11-customization-engine-is-the-company.md`. **Not yet edited.**
- `Business/pivots/2026-06-02-19-return-to-full-crm-switch-friendly-beachhead.md` — the CRM is no longer the product being sold. Status should become `Superseded by Business/pivots/2026-07-27-11-customization-engine-is-the-company.md`. **Not yet edited.**

### Docs that must be updated to reflect the new direction

- `docs/Strategy/Journey.md` — needs a Phase 6 entry. Phase 5 (autonomous agent layer) needs to be marked withdrawn.
- `Business/CombatDen_Strategy.md`, `Business/CombatDen_Summary.md`, `Business/Product_Model.md` — all describe a gym CRM as the product.
- `Business/Competition.md`, `Business/Differentiation.md` — the competitive set changes entirely, from class-based-gym CRMs to token tooling, brand-generation APIs, and per-tenant customization infrastructure. Both are also still stale on the AI landscape.
- `Business/Value_Pricing_Justification.md`, [[Pricing_Tiers]] — the $100/$300/$500 ladder was gym-owner pricing and is now irrelevant. Platform pricing is undefined.
- `Business/Architecture_Thesis.md` — mostly survives, but "the chosen vertical is class-based gyms" is no longer true; the engine is now vertical-agnostic by intent, not just by construction.
- `Sales_Customer_Acquisition/*` — the entire pitch, ICP, and outreach set targets gym owners.
- `Codebase/2026-08-02-distribution-architecture.md` — Apple Rule 4.2.6 and per-customer developer accounts largely stop being this product's problem under the new ICP, since platform customers already ship apps. Needs confirming, then rewriting.
- [[Retention_Layer]], [[Layered_Architecture]], [[Class_Based_Gym_Market]], [[Gym_Owner]] — these concepts remain accurate for CombatDen-as-reference-implementation but are no longer load-bearing for the company.

### Sequencing

Per the vault convention, this pivot doc is written before any of the above. **None of those updates should happen before the YC F26 application is submitted** (deadline ~2026-07-27 evening). They are a post-submission cleanup pass.

### Concept candidates (not created — new concepts require explicit approval)

- **Integration_Surface** — the claim that low-friction adoption without architectural change is a first-class product requirement and a likely differentiator.
- **Tier_Unlock_ROI** — selling a revenue tier the buyer cannot staff, as distinct from selling end-user satisfaction.
- **Closed_Design_To_Production_Loop** — brief in, store-ready app out, no human handoff; the line that separates this from token tooling and design tools.
- **No_New_Requests_Invariant** — generated code is view-layer only and may not add API calls or reach new data; the enforceable, customer-verifiable safety property that replaces sandboxing.
- **Re_Derived_Not_Forked** — a redesign is a repeatable transformation re-applied per release, never a permanent branch; the answer to per-tenant divergence and the reason upgrades still ship once.
- **Full_Visual_Redesign** — the ambition level: the entire visual surface including layout, no new features, driven by the tenant. Distinct from theming and from tokenizing.

---

## Addendum, 2026-07-28: the company is named Recompose

Appended the day after this pivot was written; the body above is unaltered.

The company had no name when this decision was made — Open Question 5 of the office hours doc records it as unresolved. Drafting the founder video forced it, since a name has to be said out loud on camera.

**Recompose.** *Composition* is the design term for how elements are arranged on a screen, which makes re-compose a direct name for the arrangement-only invariant in P14 above. It is a noun-shaped company name rather than a service verb, and it is long enough to plausibly be unclaimed.

**Rejected, with the reasoning worth keeping:**

- **Overhaul + a second word.** The founder's own scope word, but "overhaul" defaults to car repair, and every candidate second word either fought that association (Labs, AI) or doubled it (Works, Systems, Foundry). *Overhaul Engine* was the trap — "engine overhaul" is the single most common use of the word in English.
- **Repackage.** Rejected on one specific ground: "repackaging" is the everyday term for changing nothing but the wrapper, which is precisely the dismissal the "Scope" section above spends a page rejecting. White-label already attracts that read, so the name would have landed on the cheapest available interpretation of the category.
- **Remix, Retool, Render.** All three fit conceptually; all three are occupied by large dev companies.
- **Rendition.** Exact meaning — a particular version or interpretation of a work — but the dominant US association is extraordinary rendition.

**Provisional and explicitly changeable.** Domain and trademark are unchecked. Recorded in `Business/YC_Application_F26.md`; the older rename flag from the 2026-05-01 session is now closed.
