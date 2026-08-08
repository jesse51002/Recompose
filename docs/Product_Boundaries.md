---
tags: [product, boundaries, scope, recompose]
status: current
date: 2026-07-28
---

# Product Boundaries

Concepts touched: [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]], [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]].

> [!info] What this doc is for
> The lines the product holds. Boundaries are decisions, not status — they should only change when a pivot changes them, and a pivot doc should exist saying so. For how the mechanism works, read `Architecture_Thesis.md`; for what exists in code right now, read `README.md`.

## The two core principles

Everything below follows from these. Nothing else in this doc outranks them, and neither is tradeable for a feature, a deal, or a demo.

1. **Arrangement only.** A redesign changes how the app is arranged. It never changes what the app does.
2. **We never touch their code.** Recompose does not write to the platform's repository. Not once, not ever.

The first is what makes the product *safe to accept*. The second is what makes it *possible to say yes to*. They answer two different objections — one from QA, one from whoever owns the codebase — and losing either one collapses the sale for a different reason.

## Arrangement only

**A redesign changes arrangement. It never changes behaviour.** No screen is merged or split, no functionality is added, none is removed. Every screen does what it did before and needs the data it needed before, so the API surface is provably identical ([[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]]).

This is stronger than a sandbox because it is *verifiable rather than argued* — the platform's own engineers can confirm nothing was added or removed. Give it up and the product becomes an unbounded code generator operating on someone else's app, which is a category no platform will let near production.

## Visual, not functional

Recompose changes how an app looks. It does not change what the app does, and it does not generate features.

The functional half of per-tenant customization is a real and larger product — Gigacatalyst is building it — and it is a fundamentally harder safety problem: a bad output for them is a security incident, a bad output here is ugly. That asymmetry is the reason the visual half is tractable for one person. Reaching for the functional half forfeits it.

## The platform's architecture is not ours to change

A platform must be able to adopt the engine **without changing its architecture**. As of 2026-07-28 this is satisfied by there being nothing to adopt: they grant read access, and Recompose forks ([[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]]). No SDK to install, no API to wire, no version to track.

The consequence is a rule about whose problem an integration failure is: if adoption requires the customer to restructure, that is a **product defect**, not a customer objection to be argued past. The one live instance is distribution — a platform shipping a single shared shell rather than per-tenant binaries cannot take per-design layout without changing how it releases, which makes it the wrong customer rather than a hard sale.

## We never touch their trunk

**Recompose does not write to the platform's main branch. Not once, not ever.**

The model is a **shared tokenized fork** of their app — Recompose's base — kept continuously current against their main by an agent. Each **design** is a further fork of that base, also kept current — one fork per design, not per tenant, since a single design may serve many tenants. The platform's own trunk is never modified, never PR'd into, never reviewed for our changes, because there are none. They grant read access. That is the integration.

This is the answer to the largest named adoption blocker, and the reason it works is organizational as much as technical: an external agent with **write** access to the trunk needs engineering leadership sign-off, and **read** access does not. It changes who has to say yes.

It also gives the platform a better trust primitive than review. A PR is a one-time gate that costs them attention. A fork is **continuously and self-serve auditable** — they can diff our fork against their main whenever they like, without involving us.

Two things this boundary costs, both accepted:

- **The maintenance burden moves to us, permanently.** Their devs are not maintaining tokens inside code they understand; our agent is re-reconciling an external fork against every structural change they make, forever. There are consequently **two sync layers**: their main into our tokenized base, and our base into each tenant's design fork.
- **Re-tokenization recurs.** New screens and visual expansion need the base re-tokenized. Under this model that is entirely our side of the line — no PR to them at all — so it is a cost, not a friction point.

> [!note] On the name [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
> These *are* forks, so the name reads misleadingly. What it asserts is that a fork's **contents** are re-derived by an agent rather than maintained by hand — **divergence must never accumulate unmanaged.** The name is kept for link stability.

## Assets go through the pipeline; only layout goes through the agent

**Assets are data, so a pipeline generates them. Layout is code, so an agent writes it.** That split is a boundary, not just an implementation choice.

Anything expressible as a slot resolves deterministically through the [[Concepts/Product/Mechanisms/Orchestrator|orchestration layer]], where cost is bounded, coherence is structural, and accept conditions exist. The agent is reached for **only** where no slot inventory can express the change. Widening agent scope past layout collapses the distinction that stops this being filed under "another coding agent" — one agent doing everything reads as a wrapper over a model; two systems with a clear boundary reads as architecture.

## Within layout, the agent is free — bounded by the invariant, never by an enum

Structural presets are out of bounds, and this was **tested, not assumed**. A bounded set of structural options reproduces the platform's original design language however many options it exposes, because the options are drawn from that language. That is a reskin, which is the exact dismissal this product exists to escape. Recorded in `pivots/2026-07-28-01-agentic-editing-all-in.md`.

So the agent gets full freedom over arrangement. The only constraint is the invariant at the top of this doc. Any future proposal to constrain layout by classification, enumeration, or a template set is re-opening a closed question and needs to beat that test result.

## The mirror is visual, never functional

The design agent works on a **JSX mock** of the platform's app — no features, no business logic, no API calls, no state. Mockware, generated once per upstream release and amortized across every tenant.

This boundary is load-bearing rather than cosmetic. A *functional* mirror would force the arrangement-only invariant to survive a translation in both directions, and the platform's ability to verify it by diffing a branch — the thing that makes the invariant saleable rather than merely claimed — would be gone. Because the mirror is visual only, **the invariant never crosses the translation boundary.** It is enforced at productionalize time, on real production code, where it stays a diff a human can read.

Anything that pushes the mirror toward functional fidelity is moving the product's safety property from verifiable to argued. Do not.

## Screenshots are the design accept condition

Design output is judged by rendering and looking at it, not by a rule set. This is not deterministic the way WCAG is for colour, and it is not claimed to be — it is an oracle where there previously was none, and it exists cheaply only in a browser.

The corollary is a constraint on the pipeline: the same oracle applies on the production side, by building to web and diffing screenshots against the approved mock. The mirror's fidelity is therefore **measured, not assumed**.

## Sync lands on uat, and uat is a branch

Every upstream merge re-applies the design. The result lands on **`uat`**, the branch of the platform's own repo that is ahead of `main` — not in a review environment, and not in a queue. Recompose does not push generated code to production; `main` fast-forwards off the history `uat` already carries.

## We promise autonomy

The product claims **autonomous operation**. No PR into the platform's trunk, no review queue, no integration work, no engineering sign-off. The intended trend is toward zero human involvement as agent capability and the review scaffolding around it improve.

The error budget — roughly 95% clean, 4% minor, 1% significant — is a **target, not a measurement.** Nothing has been measured.

What makes it survivable is that **the pipeline halts rather than ships.** An agent that cannot satisfy the accept condition stops and nothing deploys, so a significant failure costs a delay rather than a brand. The 4% minor is cosmetic by definition — annoying rather than breaking — and it does reach production.

The boundary this sets on marketing: **never quote the budget as an observed rate**, and never claim the 4% is caught before it ships. **Who resolves a halt is undecided** — see Open questions.

## The buyer is the platform

Sold to multi-tenant white-label SaaS platforms with real tenant volume. Not to agencies, not to freelancers, not to the end business, and never direct to the end user.

The value argument is throughput — [[Concepts/Business/Pricing/Tier_Unlock_ROI|a tier they cannot scale]] and the deals they lose on brand. **Tenant satisfaction is not the pitch** and must not become one: the research found end users complain about bugs, not about looking generic. "Your tenants will love it" is out of bounds as a sales line.

## The unit is a design, and allocation is not our business

**Recompose sells designs.** One design is **one fork**, agent-kept current. Whether the platform points a single design at forty tenants or gives forty tenants their own is entirely their decision.

The fork carries two branches, `uat` and `main`, mirroring the platform's own. Generation always runs against **uat**, because uat is the branch that is ahead; `main` then fast-forwards, since it already has the commit history. Two branches, but not two units of work — the promotion is free, and the branches only need separate handling in the cases where they actually diverge.

Founder: *"just one set design on my side, how the platform wants to use it is none of my business."*

This is a scope boundary, not just a pricing one. It means Recompose does not build preset tiers, does not model tenant assignment, does not track which tenant is on which design, and does not price differently by usage pattern. All of that is the platform's product, layered on top of ours.

It is also what makes flat per-design pricing correct rather than merely convenient: **the unit sold and the unit maintained are the same object**, so cost and revenue move together by construction and no mix of usage patterns can put them out of step.

## Close enough at a fraction of the price

The quality bar is the standard disruption shape, not parity. The comparison target is a custom build ($10–50k, 4–12 weeks), and the bet is that a platform trades the last increment of quality for two orders of magnitude on cost and time.

Chasing parity with a human designer is out of bounds. It is unwinnable, and winning it is not what the buyer is paying for.

## What Recompose is not

- **Not a coding agent.** It edits the view layer under a fixed invariant. It does not take open-ended engineering work.
- **Not a design tool.** Design tools stop at a mockup a human still implements. This closes the loop to a running app ([[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]]).
- **Not token tooling.** Token tooling stops at tokens and leaves the hard part — coherent assets and layout — to a person.
- **Not a template marketplace.** The output is derived from a brief, not selected from a set. Presets are a *demo* surface, not the architecture.
- **Not an app builder.** It redesigns an app that already exists and already works.

## Roadmap boundary

Productization means **integration-surface breadth** and **compressing the onboarding pass**. It does not mean adding generation modalities. New output types are the seductive wrong direction — they make demos better and adoption no easier, and adoption is the named primary blocker.

## CombatDen boundary

CombatDen is the reference implementation, demo canvas and eval bed. It is not the product, not the company, and not a sales priority. Work on it is justified only where it serves the engine — as a test surface, a demo, or an eval bed. Any other CombatDen work is out of scope.

## Boundaries not yet set

Named honestly, because pretending these are decided would be worse than the gap:

- **What terminates the design validator loop.** Screenshots give an oracle but not a stopping condition, and an unbounded loop is unbounded cost.
- **The unit the error budget is measured in.** 95/4/1 per screen, per tenant-redesign, or per sync operation? These differ by orders of magnitude in workload.
- **Who resolves a halt.** The autonomous promise says nothing stops on the platform's desk, but a halted design has to be resolved by somebody. Leaning the platform's own staff; a forward-deployed engineer was considered and the objection against it is lack of domain knowledge about the platform's app. **If the answer is platform staff, "no manual maintenance for the platform" is false** and one of the two has to give.
- **How the 4% minor gets swept up.** It reaches production by design. A scheduled code review is a candidate, not a decision.
- **Whether the mirror generalizes.** Every artifact to date is CombatDen, an app the founder wrote. Mirroring a codebase he did not write is untested.
- **Live-testing tooling for the production validator.** Candidates raised, none chosen.
- **Pricing.** Undefined for this buyer, and deliberately deferred until a platform conversation happens. The old $100/$300/$500 ladder was gym-owner pricing and is dead. Whoever picks this up: per-tenant versus per-platform matters enormously, because sync cost multiplies by tenant count.

