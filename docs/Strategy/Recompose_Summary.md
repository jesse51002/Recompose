---
tags: [business, summary, orientation, recompose]
status: current
date: 2026-08-12
source-pivot: pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md
---

# Recompose — Orientation

Concepts touched: [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]].

> [!info] The two-minute read
> This doc is **what** Recompose does and who it is for. It is kept deliberately light.
> **How it works:** [[Strategy/Product_Boundaries|Product_Boundaries.md]], then [[Strategy/Architecture_Thesis|Architecture_Thesis.md]].
> **What was decided and when:** `pivots/`. **Why:** `Office_Hours/`. **Where it's been:** [[Strategy/Journey|Journey.md]].
> **What exists in code right now:** `README.md`. Only the asset pipeline has an assigned job in the current mechanism.

> [!warning] Nothing in the mechanism is built
> The asset pipeline, the theme runtimes and the studio are real. The module system is a direction, not code. Zero customers, no named target platform, and no outside party has responded to anything.

## What it does

**Customers agentically extend white-label apps.**

A tenant on a white-labeled app says what they need it to *do*, and a module is generated and inserted into their app — carrying the platform's own design tokens, so it reads as part of the app rather than as something bolted on. The platform never builds it and never reviews it.

> [!note] The one-line description is provisional
> It has not been tested on anyone. Treat it as a draft rather than as settled copy.

## Why features rather than design

Design alone does not move this buyer, and the vault's own evidence says so three times over. Across a dozen documented custom-build cases, design has **never once** been the sole reason anyone built bespoke — it always travels with a functional driver. App-store reviews of white-labeled apps complain about bugs, never about looking generic. And branded-app attach rate correlates with **tenant size**, not with design quality.

Meanwhile the money is on the other side. Design services are priced standalone at **$99–499** and professional services runs **1.19% of revenue at Olo, 2.9% at Toast** — there is not enough cost there to save. Per-tenant feature work at the platforms that do it is a named engineering organisation on a contracted engagement with pricing gated behind sales.

**And the refusal is the demand signal.** Thirteen of nineteen researched platforms have no path by which a tenant gets net-new functionality at any price. Kajabi says so outright.

## Who buys it

**Multi-tenant white-label SaaS platforms that already pay to build per-tenant functionality** — Jack Henry's Banno, Backbase, Tapcart, ABC Trainerize at Enterprise, GoodBarber and BuildFire. They have the budget line, they know what it costs, and they can read the value off a P&L rather than imagining it.

The secondary sort is the previous filter, kept rather than dropped: **platforms where every tenant already has their own app**, because the population a module can act on equals their tenant count. **Banno satisfies both** and is the best target on the merits — and the worst on reachability, being a public company with procurement and 6–18 month cycles.

Not agencies, not freelancers, not the end business.

## How it gets in

**It never writes to their trunk.** Where a platform already runs an extension architecture — Banno's Plugin Framework, Backbase's SDK, Tapcart's App Studio and Configurable Blocks, BuildFire's open-source SDK — a module is written into a surface they already own, deploy and govern. That is the **additive boundary**: Salesforce, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper and Gigacatalyst all converged on it independently as the safety story for third-party code inside a host product.

Where no such surface exists, the platform adds insertion points. That needs engineering-leadership sign-off, which makes it a materially harder sale — and it is why the buyer is a platform that has already built one.

**Whether any existing surface is deep enough to carry a real feature is unverified.** Banno's framework hosts web apps on the partner's own infrastructure; Tapcart's blocks live inside its studio. Verifying this from public documentation is the first task in front of the direction.

## What it replaces

The per-tenant custom development engagement: a platform's own engineers building one feature for one tenant, as a priced, contracted, human-scheduled piece of work — or the flat refusal that thirteen of nineteen platforms give instead.

The bar is **close enough at a fraction of the price**, not parity.

## What it promises

**Nothing yet, and that is deliberate.**

> [!danger] Do not claim autonomy and do not quote an error budget
> A promise of unattended operation needs a failure the system can detect and stop on. A generated feature has no such check yet — no screenshot to judge, no diff that proves correctness — so there is nothing to halt against. See [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

Candidates for the accept condition, none chosen: read-only modules first, generated tests through the platform's own CI, a bounded module vocabulary over endpoints their API already exposes, or tenant approval against real data.

## How hard this is

Hard, and the difficulty sits at the boundary rather than in the code. A module's interior is new code in a defined slot. Its edges are auth, session, user identity, tenant scoping, base data and RBAC inheritance against a production system nobody here wrote — that is most of the work, and a mistake there is a security incident rather than an ugly screen.

Thirteen of nineteen platforms refuse this work outright and the six that do it staff named engineering organisations with pricing behind sales. That is the cost of doing it with humans, and it is simultaneously the reason automating it is worth money and the reason it is not straightforward.

Whether one person can carry three surfaces — module, backend, admin — each with its own security surface, is an open question rather than an assumption.
