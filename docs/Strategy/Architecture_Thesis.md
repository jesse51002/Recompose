---
tags: [business, strategy, architecture, thesis]
status: current
date: 2026-08-12
source-pivot: pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md
---

# Architecture Thesis

Concepts touched: [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]].

> Rewritten 2026-08-12 for the modular feature system. Decision: [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md]]. Exploration: [[Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary|Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary.md]].

## The load-bearing claim, and it is the reverse of the previous one

The previous version of this doc claimed that an app's structure is *not where a platform's customers want to differentiate*, and that the visual surface is. **The pivot reverses that**, and the reversal is the whole thesis, so it is stated first rather than buried:

**Tenants want functional differentiation, platforms structurally refuse to supply it, and that refusal is the market.**

Thirteen of nineteen researched platforms have no path by which a tenant gets net-new functionality at any price — the answer is a public API you use yourself, a partner agency, or a roadmap board. The six that do supply it staff **named engineering organisations** and price behind sales: Banno's Custom Development team, Backbase's Services org, Tapcart's Solutions & Services Engineer. That is what per-tenant functionality costs when humans build it, and it is why almost nobody sells it.

[[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]] survives as a *supporting* claim rather than the premise: AI compresses the cost of producing a coherent visual surface, which is why a generated module can look native for nearly nothing. It is no longer the reason anyone buys.

**What has not changed is what is left to own.** The platform already owns the app, the tenants, the release train, the store listings and the customer relationship. Recompose owns **the transformation** — a tenant's request in, a working module out, no human handoff in between.

## The invariant moved again: from arrangement to addition

- **First form.** Code is fixed; tokens and assets vary.
- **Second form (2026-07-27).** Functionality is fixed; arrangement varies. A redesign changes how the app is arranged and never what it does.
- **Third form (2026-08-12).** **Existing code is fixed; new code is added beside it.** A module adds a screen, a widget, a workflow. It never edits, moves, merges, splits or removes anything already there.

Each form was checkable by the customer's own engineers, and that property is what makes any of them saleable. The third is checkable in the same way *for existing code* — a diff shows nothing was touched. **What it does not establish is that the added thing is correct**, and that is the gap the previous two forms did not have. See [[Strategy/Product_Boundaries|Product_Boundaries.md]].

The upside of the trade is that the third form is the boundary the entire field already uses. Salesforce, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper, Banno's Plugin Framework and Gigacatalyst converged on it independently, and the August 2026 research rates it load-bearing with high confidence. The previous invariant was unusual and had to be explained; this one is what a platform engineer already expects to hear.

## Two parts: assets are data, behaviour is code

The two-system split survives the pivot and keeps doing the same job. Only the second half was replaced.

**Part one — the asset pipeline, unchanged and repurposed.** An app-agnostic dependency DAG resolves palette, typography, copy, icons and images. Colour resolves four base OKLCH slots in one LLM call with WCAG AA enforced as an accept condition and the rest derived deterministically in Python; fonts are validated live against the Google Fonts catalogue; copy is length-bounded per slot; icons match against a curated set with generation as fallback. Coherence is achieved **structurally** — a shared derived palette feeds every image prompt and `depends_on` edges fold one slot's look into another's — not by a critique loop. See `README.md`.

**Its job changed.** It no longer produces a redesign. It produces the [[Concepts/Product/Mechanisms/Tokenized_Design_System|token set]] a generated module renders against, so a module Recompose built is indistinguishable from one the platform built. That is the entire remaining role of theming: **no layout generation, no animation, no visual mirror, no screenshot oracle as a design accept condition.**

**Part two — the module generator.** A tenant describes functionality; an agent produces an additive module against the platform's extension surface, wired to endpoints their API already exposes, rendered against their tokens.

**This half is specified as a direction and not as a mechanism.** Four things inside it are undecided and none may be invented:

1. **Compile-time or runtime.** Runtime is server-driven UI — the app ships a renderer and the server sends layout as data — proven at Airbnb, Lyft, Spotify and DoorDash. Compile-time is a per-tenant binary. Different asks of the platform.
2. **The accept condition.** Read-only modules, generated tests through their CI, a bounded primitive vocabulary, or tenant approval on real data. None chosen.
3. **What bounds the request.** *Describe what you need* is arbitrary software.
4. **Where the admin surface lives.** A custom feature nobody can configure is dead on arrival.

The split remains load-bearing for the same two reasons it always was. Engineering: routing palette generation through a coding agent would be slower, more expensive, non-deterministic and would throw away the WCAG and coherence guarantees the pipeline already provides. Positioning: **deterministic where determinism is available, agentic only where it is required, reads as architecture** — one agent doing everything reads as a wrapper over a model, and that shelf is crowded.

Two claims from every prior version survive untouched. The product is the [[Concepts/Product/Mechanisms/Orchestrator|orchestration layer]], not the generation models. And [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]] is the actual hard problem on the asset side — outputs that compose into something reading as one designer's work, rather than each module being independently correct.

## Integration is now nonzero, and that is the cost of the pivot

The previous architecture satisfied [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]] by having **nothing to integrate**: read access, an external fork, no library, no API, no version to track. The organizational consequence was the point — write access needs engineering-leadership sign-off, read access needs nobody, and that decides *who has to say yes.*

**A module has to run inside their app, so something has to accept it.** Two cases:

- **The platform already runs an extension architecture.** Banno's Digital Toolkit and Plugin Framework, Backbase's SDK, Tapcart's App Studio with its CLI, Global Components and Configurable Blocks, BuildFire's MIT-licensed `buildfire.js`, GoodBarber's custom code and APIs. Recompose writes into a surface they already own, host, deploy and govern. The sign-off is small because the surface exists precisely to be written into, and the safety story is theirs rather than one Recompose has to invent.
- **The platform has no such surface.** They add insertion points to their own app, which is exactly the sign-off the old principle avoided. Harder sale, and the reason the ICP moved.

**Which case is normal is unverified and is the first thing to check.** Banno's framework hosts web apps on the partner's own infrastructure; Tapcart's blocks live in its studio. If no existing surface reaches native UI inside an arbitrary existing screen, then the extension architectures buy the *budget line* but not the *integration*, and the harder sale is the normal one.

### The fork model is retired, and its hardest problem relocated rather than dying

Two agent-maintained fork layers, continuous re-derivation, landing on `uat` — all of it goes with the visual redesign. So does the whole class of fork hazards: divergence tax, semantic conflict on merge, and the undesigned-surface problem where upstream ships a new screen and it appears in default styling.

**What replaces it is quieter, not absent.** The fork concentrated all coupling into one place — a git merge — and made it *visible*: a conflict is an event and somebody is told. Modules distribute coupling across every dependency on the platform's API and make it **invisible**. A field that keeps its name and changes meaning passes cleanly and every module built on it is silently wrong, indefinitely, with nothing reporting it.

A proxy that absorbs upstream API changes and only cascades on large ones is the working answer. It is an anti-corruption layer: it genuinely reduces fan-out by making one place responsible for the platform's data shape. It does not remove the dependency, it cannot see a semantic change, and deciding *"is this a big update"* is itself an unsolved judgement whose cheap-direction failure does not announce itself.

### What distribution looks like now

The previous model's per-design binary is gone. What ships depends on the compile-time/runtime decision above:

- **Runtime** — layout arrives as data, so no new binary and no store submission. This is why Airbnb, Lyft, Spotify and DoorDash all run it. It requires the platform's app to carry a renderer.
- **Compile-time** — a module is code in a build, so a tenant's app is a distinct binary, and per-tenant store submission returns as a question.

Apple Rule 4.2.6 remains the platform's problem either way, because Recompose submits nothing. Confirming that with a real platform is still unclosed.

## Vertical-agnostic by intent, not just by construction

The asset pipeline has always been app-agnostic **by construction**: nothing app-specific lives in Python, the slot inventory and `depends_on` edges live in `apps/<app_id>/` YAML, and a new app is one folder rather than a code change.

The company is likewise vertical-agnostic. The buyer is any multi-tenant white-label platform **that already pays to build per-tenant functionality** — Banno, Backbase, Tapcart, Trainerize Enterprise, GoodBarber, BuildFire — with the previous filter kept as a secondary sort: platforms where every tenant already has their own app. Vertical is a targeting question, not an architectural one.

CombatDen is `apps/combatden/` — reference implementation, demo canvas, eval bed. History and a fixture, not the product.

**Two honest limits carry over unchanged.** App-agnosticism is unproven outside `apps/combatden/` and `apps/smoketest/`, both written by the founder with both ends of the contract included. And nothing has ever been generated against a codebase the founder did not write.

**The stack question changed shape.** It used to be a validation-tooling problem attached to screenshot-diffing at the end. Now it is upstream: a module has to be written in whatever the platform's app is written in, and the extension surface it targets is theirs. React Native and Flutter remain the friendly cases; native Swift and Kotlin are the hard ones, and mobile is the worst-supported domain for agentic code generation in the field.

## The four binding constraints, re-scored again

[[Research/2026-05-01-ai-brand-competitor-analysis|Research/2026-05-01-ai-brand-competitor-analysis.md]] found design labour was one of four constraints holding white-label apps at logo-and-colour, and not the most binding. Under the module product all four move:

- **Apple Rule 4.2.6** — decided by the compile-time/runtime choice above rather than by the product. Runtime removes it entirely.
- **Regression-test combinatorics** — **materially better.** This was the fork model's worst structural problem: code-diverged tenants mean the platform cannot ship one update to everyone. Additive modules do not diverge the base, so the platform ships its own updates exactly as before. This is the clearest architectural win in the pivot.
- **Integration and onboarding labour** — **worse, and it is now the honest headline.** The previous product reduced this to granting read access. A module needs auth, session, user identity, tenant scoping, base data and RBAC inheritance wired against a production system nobody here wrote. That is most of the work and it is where the failures stop being cosmetic.
- **Weak end-user willingness-to-pay for brand depth** — **no longer relevant to the pitch at all.** The product is not sold on brand. What replaces it as the demand question is whether refusing feature requests costs the *platform* anything measurable, which is unknown and is one question on one call.

## What this is and is not

- **Not a horizontal AI app builder** (Lovable, Bolt, v0). Those build apps from nothing. This adds functionality to an app that already exists and already ships, under someone else's auth and data model.
- **Not a coding agent product.** The two-part split is the distinction: pipeline where determinism exists, agent only where it does not.
- **Not Q2 Code, and this is the load-bearing competitive line.** Q2 Code is a governed development environment that makes Q2's engineers and certified partners faster at writing SDK-compliant extensions. **This removes the developer**: a non-technical tenant describes what they need and gets it. If the product becomes a tool a developer drives, it is competing with something every Group A platform can build in-house — Q2 did it by wiring Claude Code into Bedrock on top of an SDK that had existed since 2018, and *the AI was the cheap part bolted onto the expensive part.*
- **Not Gigacatalyst, and the comparison is now much closer than it was.** They build per-tenant functional customization inside a host SaaS; so does this. Two differences and both should be said plainly: they have no mobile frontend, which is why an API-composition sandbox suffices for them and a renderer has to live in the app here; and they are funded and shipping to Series B companies while this is a direction with nothing built.
- **Not a design product.** Theming is a token layer in service of native-looking modules.
- **Not defensible by moat.** The barrier is packaging, not difficulty — and the threat is sharper than under the visual product, because the chosen buyer is defined by already owning the extension architecture that makes building this cheap.

## Open architectural questions

None of these are answered.

1. **The accept condition for a generated feature.** No screenshot oracle, no equivalence diff. The single load-bearing gap.
2. **Compile-time or runtime.** Decides what the platform must do and whether store submission returns.
3. **How deep the existing extension surfaces actually go.** Answerable from public documentation, and it decides whether the sale is easy or hard.
4. **What bounds a tenant's request**, and whether a bounded primitive vocabulary is the answer.
5. **Contract drift.** The proxy's limits are known and its judgement rule is not designed.
6. **The security surface, enumerated.** API discovery, approved-API scoping, schema validation, auth passthrough, RBAC inheritance, public-vs-private data classification. Currently a list, not a design.
7. **Whether one person can carry three surfaces** — module, backend, admin — each with its own security surface.
8. **What survives in code.** The asset pipeline, both theme runtimes and the studio were built for the previous product. The pipeline keeps its job; the rest needs an explicit decision rather than drift.

Pricing is not an architectural question and the architecture does not decide it. **Pricing is undefined**, and it is undefined against a different buyer than last week.
