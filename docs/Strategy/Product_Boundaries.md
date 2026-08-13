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

> [!warning] Rewritten 2026-08-12 for the modular feature system
> The previous version of this doc held **arrangement only** and **we never touch their code** as the two core principles, and called them untradeable. [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|The August 12 pivot]] traded both. What replaces them is weaker in one specific way and stronger in another, and the section below says which is which rather than smoothing it over.

## The two core principles

Everything below follows from these. Nothing else in this doc outranks them.

1. **Additive only.** A module is *added* to the app. Nothing that already exists is modified, moved, merged, split or removed.
2. **We never write to their trunk.** Recompose does not push to the platform's main branch. Not once, not ever.

The first is what makes the product *safe to accept*. The second is what makes it *possible to say yes to*. They answer two different objections — one from QA, one from whoever owns the codebase — and losing either collapses the sale for a different reason. That structure is inherited unchanged from the visual product; only the content of the first principle moved.

## Additive only

**A module adds. It never edits.** No existing screen is changed, no existing widget is moved, no existing call is altered or removed. Everything that worked before works identically, because nothing that was there was touched.

This is the **additive boundary**, and adopting it is the single biggest thing the pivot bought. It is what Salesforce metadata, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper SDK, Banno's Plugin Framework and Gigacatalyst all converged on independently, without coordinating, as the way third-party code lives safely inside a host product. The August 2026 research asked whether the additive-versus-modifying distinction is load-bearing across the field and answered *yes, overwhelmingly, high confidence.*

The previous product could not have it. A redesign modifies screens that already exist and cannot be sandboxed, which is why it had to carry a bespoke safety story instead. This one is separable by construction.

**What it does not give, and the difference matters more than it looks.** The old invariant was *verifiable*: the platform's engineers could diff a redesign and confirm the API surface was identical. Additive-only is verifiable in the same way for *existing* code — nothing changed, and a diff proves it. It says nothing about whether the added thing is **correct**. A module that adds cleanly and computes the wrong number passes every check here.

That gap is the accept condition, and it is open. See below.

## The safety property is undefined, and the autonomy claim is suspended until it is not

The previous product's safety property was **bounded blast radius by output type**: a bad output is *ugly, not broken.* No data model to corrupt, no permission to leak, no correctness contract to violate. That is what made **halting** sufficient — an agent that could not satisfy its accept condition stopped, and a significant failure cost a delay rather than a brand.

**A module that writes to a database has none of that.** The failure mode moves from *ugly* to *security incident* or *wrong data*, and the sentence the whole autonomy promise stood on is gone.

Four candidates, none chosen:

- **Read-only modules first.** A module reads through the platform's existing authenticated API and presents; it never writes. The only candidate that *restores* the old asymmetry rather than replacing it, and the only one obviously shippable by one person. It may exclude what tenants most often ask for, which is unmeasured.
- **Generated tests through their CI.** Uses infrastructure the platform already trusts. Tests authored by the agent that wrote the code verify what the agent *believed* it built — they catch regressions, not misunderstood requirements.
- **A bounded module vocabulary.** Primitives — list, form, schedule, notify, report, chart — wired to endpoints their API already exposes. The agent arranges and configures; it never authors novel logic. Each primitive is tested once and reused everywhere.
- **Tenant approval on real data.** The tenant is the only party who knows what they meant. A non-technical owner clicking a happy path will not exercise the empty state, the concurrent edit, the permission boundary or the five-hundredth row.

> [!danger] Until this is chosen
> **Do not claim autonomous operation, and do not quote an error budget.** [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] was defensible because halting was sufficient, and halting was sufficient because a bad output was cosmetic. Neither premise currently holds. The old ~95/4/1 figure was a target that was never measured under the previous product and does not transfer to this one at all.

## The bounded-vocabulary question is open, and the preset result does not decide it

Structural presets were built, tested and rejected for *design* — a bounded option set reproduces the platform's original design language however many options it exposes, which is a reskin.

**That result does not transfer to features and must not be cited as though it does.** It holds because design's value *is* its unboundedness. A feature's value is that it works. A bounded vocabulary of feature primitives limits what is buildable; it does not collapse into sameness. Whether to bound the vocabulary is therefore genuinely open, and the vault's own split — deterministic wherever a slot inventory can express the change, agentic only where none can — argues for bounding it.

## We never write to their trunk

**Recompose does not push to the platform's main branch. Not once, not ever.** A module lands in an extension surface: a plugin registry, an SDK-compliant package, a module bundle the platform's own pipeline picks up.

This is a **softening** of the previous principle and the doc should say so. Before, integration was read access and nothing else — there was literally nothing to adopt, no library, no API, no version to track, and the reason it worked was organizational: an external agent with write access needs engineering-leadership sign-off, and read access needs nobody.

Now there is something to adopt. Two cases, and they are different sales:

- **The platform already runs an extension architecture** — Banno's Digital Toolkit and Plugin Framework, Backbase's SDK, Tapcart's App Studio and Configurable Blocks, BuildFire's `buildfire.js`, GoodBarber's custom code and APIs. Recompose writes into a surface they already own, deploy, host and govern. The sign-off is small because the surface exists to be written into.
- **The platform has no such surface.** They must add insertion points to their own app, which requires exactly the engineering-leadership sign-off the previous principle existed to avoid. This is a materially harder sale and is the reason the buyer moved.

**Unverified, and it decides which case is normal.** Banno's Plugin Framework hosts HTML/CSS/JS web apps on the *partner's* infrastructure; Tapcart's blocks live inside its own studio. Whether any existing surface reaches native UI inside an arbitrary existing screen is not known and is answerable from public documentation.

## Assets stay in the pipeline, and the pipeline's job changed

**Assets are data, so a pipeline generates them.** The app-agnostic dependency DAG survives the pivot intact: palette, typography, copy, icons and images, with deterministic colour derivation, WCAG AA enforced as an accept condition, and cost per run bounded and known.

**What changed is what it is for.** It no longer produces a redesign. It produces the tokens a generated module renders against, so that a module built by Recompose looks like it was built by the platform. That is the whole of theming now — no layout generation, no animation work, no [[Concepts/Product/Mechanisms/Full_Visual_Redesign|full visual redesign]].

The [[Concepts/Product/Mechanisms/Orchestrator|orchestration layer]] boundary is unchanged and still load-bearing: deterministic where determinism is available, agentic only where it is required. One agent doing everything reads as a wrapper over a model; two systems with a clear boundary reads as architecture.

## The buyer is the platform, and it is a platform that already pays for this

Sold to multi-tenant white-label SaaS platforms **that already fund per-tenant custom development** — Banno, Backbase, Tapcart, ABC Trainerize at Enterprise, GoodBarber, BuildFire. The budget line exists, so the value is read off a P&L rather than imagined.

Secondary sort, kept from the previous ICP rather than dropped: platforms where **every tenant already has their own app**, because the population a module can act on equals the tenant count. Banno satisfies both.

Not agencies, not freelancers, not the end business, and never direct to the end user.

> [!danger] Still out of bounds
> **Never sell "your tenants will love it."** The research holds regardless of the pivot: app-store reviews of white-labeled apps complain about bugs, booking failures and slow loading, essentially never about the app itself. The buyer is the platform and the argument is throughput and refused revenue, not end-user delight.

## Close enough at a fraction of the price

Unchanged in shape, changed in comparison target. The bar is the standard disruption shape, not parity. The thing being undercut is a **contracted custom-development engagement** — a platform's own engineers building one feature for one tenant on a human schedule — rather than a custom design build.

Chasing parity with a staff engineer who knows the codebase is out of bounds. It is unwinnable and it is not what the buyer is paying for.

## What Recompose is not

- **Not a coding agent.** It generates additive modules against a fixed boundary. It does not take open-ended engineering work inside someone else's app.
- **Not a developer tool.** Q2 Code is a governed development environment that makes an engineer faster. This removes the engineer. If it becomes a tool a developer drives, it is competing with something every Group A platform can build in-house on an SDK they already own.
- **Not an app builder.** It extends an app that already exists and already ships.
- **Not a design product.** Theming is a token layer in service of making modules look native. Anything that pushes it back toward being the deliverable is re-opening a closed decision.
- **Not defensible by moat.** The barrier is packaging, not difficulty. Never make a moat claim — and note the threat is sharper now than it was, because the chosen buyer is defined by already owning the expensive half.

## Boundaries not yet set

Named honestly, because pretending these are decided would be worse than the gap. **This list is longer than the previous product's, and that is the accurate signal.**

- **The accept condition for a generated feature.** The load-bearing gap. Four candidates above, none chosen.
- **Compile-time or runtime insertion.** Runtime is server-driven UI, proven at Airbnb, Lyft, Spotify and DoorDash. Compile-time is a per-design binary. Undecided, and it changes what a platform has to do.
- **What bounds a tenant's request.** *Describe what you need* is arbitrary software. A bounded vocabulary is the obvious answer and has not been chosen.
- **Where the admin dashboard lives.** A custom feature nobody can configure is dead on arrival, which makes this a third surface with a third security surface. Unaddressed.
- **The unit sold, and whether the old leverage survives.** The previous unit was a **design**, and one design could serve forty tenants — the unit sold and the unit maintained were the same object. **A custom feature is for one tenant by construction**, so that leverage is not automatic. Whether a module library re-serves later tenants, and whether Recompose or the platform owns that library, is undecided and it changes the economics more than anything else on this list.
- **How the module stays current with the platform's backend.** A proxy absorbing API changes is the working idea. It centralises coupling rather than removing it, and it cannot see a field that keeps its name and changes meaning.
- **Whether one person can carry this.** Three surfaces, three security surfaces, and a failure mode that is no longer cosmetic. Open.
- **Pricing.** Undefined, now against a different buyer. The old $100/$300/$500 ladder was gym-owner pricing and is dead; the $100/month-per-branded-tenant figure in [[Strategy/YC_Application_F26|YC_Application_F26.md]] was priced against designs, not modules, and does not transfer either.

## CombatDen boundary

CombatDen is the reference implementation, demo canvas and eval bed. It is not the product, not the company, and not a sales priority. Work on it is justified only where it serves the engine — as a test surface, a demo, or an eval bed. Any other CombatDen work is out of scope.
