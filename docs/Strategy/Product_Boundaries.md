---
tags: [product, boundaries, scope, recompose]
status: current
date: 2026-08-12
source-pivot: pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md
---

# Product Boundaries

Concepts touched: [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]].

> [!info] What this doc is for
> The lines the product holds. Boundaries are decisions, not status — they should only change when a pivot changes them, and a pivot doc should exist saying so. For how the mechanism works, read [[Strategy/Architecture_Thesis|Architecture_Thesis.md]]; for what exists in code right now, read `README.md`.

## The two core principles

Everything below follows from these. Nothing else in this doc outranks them.

1. **Additive only.** A module is *added* to the app. Nothing that already exists is modified, moved, merged, split or removed.
2. **We never write to their trunk.** Recompose does not push to the platform's main branch. Not once, not ever.

The first is what makes the product *safe to accept*. The second is what makes it *possible to say yes to*. They answer two different objections — one from QA, one from whoever owns the codebase — and losing either collapses the sale for a different reason.

## Additive only

**A module adds. It never edits.** No existing screen is changed, no existing widget is moved, no existing call is altered or removed. Everything that worked before works identically, because nothing that was there was touched.

This is the **additive boundary**, and it is what Salesforce metadata, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper SDK, Banno's Plugin Framework and Gigacatalyst all converged on independently, without coordinating, as the way third-party code lives safely inside a host product. The August 2026 research asked whether the additive-versus-modifying distinction is load-bearing across the field and answered *yes, overwhelmingly, high confidence.* A module is separable by construction; that is the whole reason this shape is attemptable.

**What it does not give, and the gap matters more than it looks.** Additive-only is verifiable for *existing* code — nothing changed, and the platform's own engineers can diff it. It says nothing about whether the added thing is **correct**. A module that adds cleanly and computes the wrong number passes every check here.

That gap is the accept condition, and it is open.

## The safety property is undefined, and no autonomy claim may be made until it is not

A promise of unattended operation needs a check the system can fail. **There is none yet.** A generated feature has no cheap conclusive oracle: no screenshot a human judges, and no diff that proves correctness rather than absence of change. Without one there is nothing to halt against, and a module that writes to a database fails in a way that is a data or security problem rather than a cosmetic one.

Four candidates, none chosen:

- **Read-only modules first.** A module reads through the platform's existing authenticated API and presents; it never writes. The only candidate that *restores* the old asymmetry rather than replacing it, and the only one obviously shippable by one person. It may exclude what tenants most often ask for, which is unmeasured.
- **Generated tests through their CI.** Uses infrastructure the platform already trusts. Tests authored by the agent that wrote the code verify what the agent *believed* it built — they catch regressions, not misunderstood requirements.
- **A bounded module vocabulary.** Primitives — list, form, schedule, notify, report, chart — wired to endpoints their API already exposes. The agent arranges and configures; it never authors novel logic. Each primitive is tested once and reused everywhere.
- **Tenant approval on real data.** The tenant is the only party who knows what they meant. A non-technical owner clicking a happy path will not exercise the empty state, the concurrent edit, the permission boundary or the five-hundredth row.

> [!danger] Until this is chosen
> **Do not claim autonomous operation, and do not quote an error budget.** The ~95/4/1 figure in circulation was never measured and describes cosmetic defects in a redesign; it has no meaning for generated functionality. Do not adapt it, and do not replace it with a new number before anything is measured. See [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

## Whether the module vocabulary is bounded is open

A bounded set of tested primitives — list, form, schedule, notify, report, chart — limits what a tenant can ask for and buys a tight safety story and reusable margin. An unbounded agent answers any request and has no such floor. Genuinely undecided, and the architecture's own split argues for bounding it: deterministic wherever a slot inventory can express the change, agentic only where none can.

> [!warning] The structural-preset result does not decide this and must not be cited as if it did
> Presets were built, tested and rejected for **design**, because a bounded option set reproduces the platform's original design language and that is a reskin. It holds because design's value *is* its unboundedness. A feature's value is that it works, so a bounded feature vocabulary limits what is buildable without collapsing into sameness. The rule is live because the finding is the only empirical result in the project and is easy to over-apply.

## We never write to their trunk

**Recompose does not push to the platform's main branch. Not once, not ever.** A module lands in an extension surface: a plugin registry, an SDK-compliant package, a module bundle the platform's own pipeline picks up.

The principle is organizational before it is technical — an external party writing to a trunk needs engineering-leadership sign-off, and that decides who has to say yes. How much sign-off is needed depends entirely on which case a platform is in, and they are different sales:

- **The platform already runs an extension architecture** — Banno's Digital Toolkit and Plugin Framework, Backbase's SDK, Tapcart's App Studio and Configurable Blocks, BuildFire's `buildfire.js`, GoodBarber's custom code and APIs. Recompose writes into a surface they already own, deploy, host and govern. The sign-off is small because the surface exists to be written into.
- **The platform has no such surface.** They must add insertion points to their own app, which needs engineering-leadership sign-off. Materially harder, and the reason the buyer is a platform in the first case.

**Unverified, and it decides which case is normal.** Banno's Plugin Framework hosts HTML/CSS/JS web apps on the *partner's* infrastructure; Tapcart's blocks live inside its own studio. Whether any existing surface reaches native UI inside an arbitrary existing screen is not known and is answerable from public documentation.

## Assets go through the pipeline; behaviour goes through the agent

**Assets are data, so a pipeline generates them.** The app-agnostic dependency DAG resolves palette, typography, copy, icons and images, with deterministic colour derivation, WCAG AA enforced as an accept condition, and cost per run bounded and known. Its output is the token set a generated module renders against, so a module Recompose built looks like one the platform built.

**That is the whole of theming.** No layout generation, no animation, no redesign of anything that exists.

**Behaviour is code, so an agent writes it.** The [[Concepts/Product/Mechanisms/Orchestrator|orchestration layer]] boundary is load-bearing: deterministic where determinism is available, agentic only where it is required. One agent doing everything reads as a wrapper over a model; two systems with a clear boundary reads as architecture.

## The buyer is a platform that already pays for this

Sold to multi-tenant white-label SaaS platforms **that already fund per-tenant custom development** — Banno, Backbase, Tapcart, ABC Trainerize at Enterprise, GoodBarber, BuildFire. The budget line exists, so the value is read off a P&L rather than imagined.

Secondary sort: platforms where **every tenant already has their own app**, because the population a module can act on equals the tenant count. Banno satisfies both.

Not agencies, not freelancers, not the end business, and never direct to the end user.

> [!danger] Out of bounds
> **Never sell "your tenants will love it."** App-store reviews of white-labeled apps complain about bugs, booking failures and slow loading, essentially never about the app itself. The buyer is the platform and the argument is capacity and refused revenue, not end-user delight.

## Close enough at a fraction of the price

The bar is the standard disruption shape, not parity. What is being undercut is a **contracted custom-development engagement** — a platform's own engineers building one feature for one tenant on a human schedule.

Chasing parity with a staff engineer who knows the codebase is out of bounds. It is unwinnable and it is not what the buyer is paying for.

## What Recompose is not

- **Not a coding agent.** It generates additive modules against a fixed boundary. It does not take open-ended engineering work inside someone else's app.
- **Not a developer tool.** Q2 Code is a governed development environment that makes an engineer faster. This removes the engineer. If it becomes a tool a developer drives, it is competing with something every Group A platform can build in-house on an SDK they already own.
- **Not an app builder.** It extends an app that already exists and already ships.
- **Not a design product.** Theming is a token layer in service of making modules look native. Anything that pushes it back toward being the deliverable is re-opening a closed decision.
- **Not defensible by moat.** The barrier is packaging, not difficulty, and the buyer is defined by already owning the expensive half of it. Never make a moat claim.

## Boundaries not yet set

Named honestly, because pretending these are decided would be worse than the gap.

- **The accept condition for a generated feature.** The load-bearing gap. Four candidates above, none chosen.
- **Compile-time or runtime insertion.** Runtime is server-driven UI, proven at Airbnb, Lyft, Spotify and DoorDash. Compile-time is a per-tenant binary and brings per-tenant store submission with it. Undecided, and it changes what a platform has to do.
- **What bounds a tenant's request.** *Describe what you need* is arbitrary software.
- **Where the admin dashboard lives.** A custom feature nobody can configure is dead on arrival, which makes this a third surface with a third security surface. Unaddressed.
- **The unit sold, and where leverage comes from.** A module is for one tenant by construction, so nothing amortises automatically. Whether a module library re-serves later requests, and whether Recompose or the platform owns it, decides the margin — and it is undecided. **This changes the economics more than anything else on this list.**
- **How a module stays current with the platform's backend.** A proxy absorbing API changes is the working idea. It centralises coupling rather than removing it, and it cannot see a field that keeps its name and changes meaning.
- **Whether one person can carry this.** Three surfaces, three security surfaces, a failure mode that is not cosmetic.
- **Pricing.** Undefined for this buyer and this unit. The $100/$300/$500 ladder was gym-owner pricing and is dead; the $100/month-per-branded-tenant figure in [[Strategy/YC_Application_F26|YC_Application_F26.md]] was priced against designs and does not transfer.

## CombatDen boundary

CombatDen is the reference implementation, demo canvas and eval bed. It is not the product, not the company, and not a sales priority. Work on it is justified only where it serves the engine — as a test surface, a demo, or an eval bed. Any other CombatDen work is out of scope.
