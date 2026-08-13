---
tags: [business, strategy, architecture, thesis]
status: current
date: 2026-08-12
source-pivot: pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md
---

# Architecture Thesis

Concepts touched: [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]].

> Decision: [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md]]. Exploration: [[Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary|Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary.md]].

## The load-bearing claim

**Tenants want functional differentiation, platforms structurally refuse to supply it, and that refusal is the market.**

Thirteen of nineteen researched platforms have no path by which a tenant gets net-new functionality at any price — the answer is a public API you use yourself, a partner agency, or a roadmap board. The six that do supply it staff **named engineering organisations** and price behind sales: Banno's Custom Development team, Backbase's Services org, Tapcart's Solutions & Services Engineer. That is what per-tenant functionality costs when humans build it, and it is why almost nobody sells it.

[[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]] is a supporting claim rather than the premise. AI compresses the cost of producing a coherent visual surface, which is why a generated module can look native for nearly nothing. It is not why anyone buys.

**What is left to own is the transformation.** The platform already owns the app, the tenants, the release train, the store listings and the customer relationship. Recompose owns a tenant's request in, a working module out, no human handoff in between.

## The invariant: existing code is fixed, new code is added beside it

A module adds a screen, a widget, a workflow. It never edits, moves, merges, splits or removes anything already there.

The property that makes an invariant saleable is that the customer's own engineers can check it, and this one they can: a diff shows nothing existing was touched. **What it does not establish is that the added thing is correct**, and that gap is the accept condition — open, and covered in [[Strategy/Product_Boundaries|Product_Boundaries.md]].

The compensating strength is that this is the boundary the entire field already uses. Salesforce, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper, Banno's Plugin Framework and Gigacatalyst converged on it independently, and the August 2026 research rates it load-bearing with high confidence. It is what a platform engineer already expects to hear rather than something that has to be explained.

## Two parts: assets are data, behaviour is code

The architecture is two systems with a boundary between them, and the boundary is where determinism runs out.

**Part one — the asset pipeline.** An app-agnostic dependency DAG resolves palette, typography, copy, icons and images. Colour resolves four base OKLCH slots in one LLM call with WCAG AA enforced as an accept condition and the rest derived deterministically in Python; fonts are validated live against the Google Fonts catalogue; copy is length-bounded per slot; icons match against a curated set with generation as fallback. Coherence is achieved **structurally** — a shared derived palette feeds every image prompt and `depends_on` edges fold one slot's look into another's — not by a critique loop. See `README.md`.

Its output is the [[Concepts/Product/Mechanisms/Tokenized_Design_System|token set]] a generated module renders against, so a module Recompose built is indistinguishable from one the platform built. **That is the entire role of theming: no layout generation, no animation, no redesign of anything that exists.**

**Part two — the module generator.** A tenant describes functionality; an agent produces an additive module against the platform's extension surface, wired to endpoints their API already exposes, rendered against their tokens.

**This half is a direction, not a mechanism.** Four things inside it are undecided and none may be invented:

1. **Compile-time or runtime.** Runtime is server-driven UI — the app ships a renderer and the server sends layout as data — proven at Airbnb, Lyft, Spotify and DoorDash. Compile-time is a per-tenant binary. Different asks of the platform.
2. **The accept condition.** Read-only modules, generated tests through their CI, a bounded primitive vocabulary, or tenant approval on real data. None chosen.
3. **What bounds the request.** *Describe what you need* is arbitrary software.
4. **Where the admin surface lives.** A custom feature nobody can configure is dead on arrival.

The split is load-bearing twice over. Engineering: routing palette generation through a coding agent would be slower, more expensive, non-deterministic and would throw away the WCAG and coherence guarantees the pipeline already provides. Positioning: **deterministic where determinism is available, agentic only where it is required, reads as architecture** — one agent doing everything reads as a wrapper over a model, and that shelf is crowded.

Two further claims hold. The product is the [[Concepts/Product/Mechanisms/Orchestrator|orchestration layer]], not the generation models — Recraft, FLUX, Firefly and their successors are commoditizing primitives anyone with an API key can call. And [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]] is the hard problem on the asset side: outputs that compose into something reading as one designer's work, rather than each being independently correct.

## Integration is nonzero, and how nonzero decides the sale

[[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]] says a platform must be able to adopt the engine without changing its architecture, and that adoption failure is a product defect rather than an objection to argue past. **A module runs inside their app, so something has to accept it.** Two cases, and they are different sales:

- **The platform already runs an extension architecture.** Banno's Digital Toolkit and Plugin Framework, Backbase's SDK, Tapcart's App Studio with its CLI, Global Components and Configurable Blocks, BuildFire's MIT-licensed `buildfire.js`, GoodBarber's custom code and APIs. Recompose writes into a surface they already own, host, deploy and govern. The sign-off is small because the surface exists precisely to be written into, and the safety story is theirs rather than one Recompose has to invent.
- **The platform has no such surface.** They add insertion points to their own app, which needs engineering-leadership sign-off. Harder sale, and the reason the ICP is the first group.

**Which case is normal is unverified and is the first thing to check.** Banno's framework hosts web apps on the partner's own infrastructure; Tapcart's blocks live in its studio. If no existing surface reaches native UI inside an arbitrary existing screen, then the extension architectures buy the *budget line* but not the *integration*, and the harder sale is the normal one.

### Contract drift is the coupling hazard

A module depends on the platform's API, and the dependency is **invisible**: a field that keeps its name and changes meaning passes cleanly, and every module built on it is silently wrong indefinitely with nothing reporting it. There is no event, no conflict, and no oracle.

A proxy that absorbs upstream API changes and only cascades on large ones is the working answer. It is an anti-corruption layer and it genuinely reduces fan-out by making one place responsible for the platform's data shape. It does not remove the dependency, it cannot see a semantic change, and deciding *"is this a big update"* is itself an unsolved judgement whose cheap-direction failure does not announce itself.

### What distribution looks like

Determined by the compile-time/runtime decision above:

- **Runtime** — layout arrives as data, so no new binary and no store submission. This is why Airbnb, Lyft, Spotify and DoorDash all run it. It requires the platform's app to carry a renderer.
- **Compile-time** — a module is code in a build, so a tenant's app is a distinct binary, and per-tenant store submission returns as a question.

Apple Rule 4.2.6 is the platform's problem either way, because Recompose submits nothing. Unconfirmed with any platform.

## Vertical-agnostic by intent, not just by construction

The asset pipeline has always been app-agnostic **by construction**: nothing app-specific lives in Python, the slot inventory and `depends_on` edges live in `apps/<app_id>/` YAML, and a new app is one folder rather than a code change.

The company is likewise vertical-agnostic. The buyer is any multi-tenant white-label platform **that already pays to build per-tenant functionality** — Banno, Backbase, Tapcart, Trainerize Enterprise, GoodBarber, BuildFire — with the previous filter kept as a secondary sort: platforms where every tenant already has their own app. Vertical is a targeting question, not an architectural one.

CombatDen is `apps/combatden/` — reference implementation, demo canvas, eval bed. History and a fixture, not the product.

**Two honest limits.** App-agnosticism is unproven outside `apps/combatden/` and `apps/smoketest/`, both written by the founder with both ends of the contract included. And nothing has ever been generated against a codebase the founder did not write.

**The stack is an upstream constraint.** A module is written in whatever the platform's app is written in, against an extension surface that is theirs. React Native and Flutter are the friendly cases; native Swift and Kotlin are the hard ones, and mobile is the worst-supported domain for agentic code generation in the field.

## The four binding constraints

[[Research/2026-05-01-ai-brand-competitor-analysis|Research/2026-05-01-ai-brand-competitor-analysis.md]] found four constraints holding white-label apps at logo-and-colour. Scored against this architecture:

- **Apple Rule 4.2.6** — decided by the compile-time/runtime choice above rather than by the product. Runtime removes it entirely.
- **Regression-test combinatorics** — **solved, and it is the clearest architectural win available.** Additive modules do not diverge the base, so the platform ships one update to every tenant exactly as it does today. Nothing about adoption changes how they release.
- **Integration and onboarding labour** — **the honest headline, and the hardest thing here.** A module needs auth, session, user identity, tenant scoping, base data and RBAC inheritance wired against a production system nobody here wrote. That is most of the work and it is where failures stop being cosmetic.
- **Weak end-user willingness-to-pay for brand depth** — irrelevant, because nothing is sold on brand. The demand question in its place is whether refusing feature requests costs the *platform* anything measurable. Unknown, and it is one question on one call.

## What this is and is not

- **Not a horizontal AI app builder** (Lovable, Bolt, v0). Those build apps from nothing. This adds functionality to an app that already exists and already ships, under someone else's auth and data model.
- **Not a coding agent product.** The two-part split is the distinction: pipeline where determinism exists, agent only where it does not.
- **Not Q2 Code, and this is the load-bearing competitive line.** Q2 Code is a governed development environment that makes Q2's engineers and certified partners faster at writing SDK-compliant extensions. **This removes the developer**: a non-technical tenant describes what they need and gets it. If the product becomes a tool a developer drives, it is competing with something every Group A platform can build in-house — Q2 did it by wiring Claude Code into Bedrock on top of an SDK that had existed since 2018, and *the AI was the cheap part bolted onto the expensive part.*
- **Not Gigacatalyst, though the distance is small.** They build per-tenant functional customization inside a host SaaS; so does this. Two differences, both to be said plainly: they have no mobile frontend, which is why an API-composition sandbox suffices for them while a renderer has to live in the app here; and they are funded and shipping to Series B companies while this is a direction with nothing built.
- **Not a design product.** Theming is a token layer in service of native-looking modules.
- **Not defensible by moat.** The barrier is packaging, not difficulty, and the buyer is defined by already owning the extension architecture that makes building this cheap. Never make a moat claim.

## Open architectural questions

None of these are answered.

1. **The accept condition for a generated feature.** No oracle exists. The single load-bearing gap.
2. **Compile-time or runtime.** Decides what the platform must do and whether store submission returns.
3. **How deep the existing extension surfaces actually go.** Answerable from public documentation, and it decides whether the sale is easy or hard.
4. **What bounds a tenant's request**, and whether a bounded primitive vocabulary is the answer.
5. **Contract drift.** The proxy's limits are known and its judgement rule is not designed.
6. **The security surface, enumerated.** API discovery, approved-API scoping, schema validation, auth passthrough, RBAC inheritance, public-vs-private data classification. Currently a list, not a design.
7. **Whether one person can carry three surfaces** — module, backend, admin — each with its own security surface.
8. **What job each subsystem holds.** The asset pipeline's is settled. The theme runtimes, the mock surfaces and the studio need an explicit decision rather than drift.

Pricing is not an architectural question and the architecture does not decide it. **Pricing is undefined.**
