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
> **What exists in code right now:** `README.md` — and note that what exists was built for the previous product.

> [!warning] This describes a direction decided on 2026-08-12, not a product that exists
> The [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|modular feature pivot]] replaced the visual redesign as the product. **Nothing in the new mechanism is built.** The asset pipeline, the theme runtimes and the studio are real and were built for the previous scope. Zero customers, no named target platform, no outside party has responded to anything.

## What it does

**Customers agentically extend white-label apps.**

A tenant on a white-labeled app says what they need it to *do*, and a module is generated and inserted into their app — carrying the platform's own design tokens, so it reads as part of the app rather than as something bolted on. The platform never builds it and never reviews it.

> [!note] The one-line description is provisional
> It mirrors the previous line — *"customers agentically redesign white-label apps"* — by swapping the verb. It has not been tested on anyone and it is the headline of [[Strategy/YC_Application_F26|YC_Application_F26.md]], so treat it as a draft rather than as settled copy.

## Why features rather than design

Design alone does not move this buyer, and the vault's own evidence says so three times over. Across a dozen documented custom-build cases, design has **never once** been the sole reason anyone built bespoke — it always travels with a functional driver. App-store reviews of white-labeled apps complain about bugs, never about looking generic. And branded-app attach rate correlates with **tenant size**, not with design quality.

Meanwhile the money is on the other side. Design services are priced standalone at **$99–499** and professional services runs **1.19% of revenue at Olo, 2.9% at Toast** — there is not enough cost there to save. Per-tenant feature work at the platforms that do it is a named engineering organisation on a contracted engagement with pricing gated behind sales.

**And the refusal is the demand signal.** Thirteen of nineteen researched platforms have no path by which a tenant gets net-new functionality at any price. Kajabi says so outright.

## Who buys it

**Multi-tenant white-label SaaS platforms that already pay to build per-tenant functionality** — Jack Henry's Banno, Backbase, Tapcart, ABC Trainerize at Enterprise, GoodBarber and BuildFire. They have the budget line, they know what it costs, and they can read the value off a P&L rather than imagining it.

The secondary sort is the previous filter, kept rather than dropped: **platforms where every tenant already has their own app**, because the population a module can act on equals their tenant count. **Banno satisfies both** and is the best target on the merits — and the worst on reachability, being a public company with procurement and 6–18 month cycles.

Not agencies, not freelancers, not the end business.

## How it gets in

**It never writes to their trunk.** Where a platform already runs an extension architecture — Banno's Plugin Framework, Backbase's SDK, Tapcart's App Studio and Configurable Blocks, BuildFire's open-source SDK — a module is written into a surface they already own, deploy and govern. That is the **additive boundary**, and it is what Salesforce, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper and Gigacatalyst all converged on independently as the safety story for third-party code inside a host product.

Where no such surface exists, the platform adds insertion points. That is a materially harder sale — it needs engineering-leadership sign-off — and it is why the buyer moved to platforms that have already built one.

**Whether any existing surface is deep enough to carry a real feature is unverified.** Banno's framework hosts web apps on the partner's own infrastructure; Tapcart's blocks live inside its studio. Verifying this from public documentation is the first task in front of the direction.

## What it replaces

The per-tenant custom development engagement: a platform's own engineers building one feature for one tenant, as a priced, contracted, human-scheduled piece of work — or the flat refusal that thirteen of nineteen platforms give instead.

The bar is **close enough at a fraction of the price**, not parity.

## What it promises

**Nothing yet, and this is deliberate.**

The previous product promised [[Concepts/Business/Strategy/Autonomous_Operation|autonomous operation]], and what made that defensible was that a bad output was *ugly, not broken* — so an agent that could not satisfy its accept condition simply halted and nothing shipped.

**That sentence stops being true the moment a module writes to a database.** Until a replacement safety property and an accept condition are chosen, the autonomy claim is not available and must not be made on a call. Candidates under consideration: read-only modules first, generated tests through the platform's own CI, a bounded module vocabulary over endpoints their API already exposes, or tenant approval against real data.

## What this direction costs, stated plainly

It is **harder** than the visual redesign, not easier. Greenfield describes a module's interior; its boundary is auth, session, user identity, tenant scoping, base data and RBAC inheritance against a production system nobody here wrote. The redesign was an unsolved problem with a cosmetic failure mode. This is an unsolved problem with a **security** failure mode, and whether one person can carry it is an open question rather than an assumption.
