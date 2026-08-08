---
tags: [business, summary, orientation, recompose]
status: current
date: 2026-07-28
---

# Recompose — Orientation

Concepts touched: [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]].

> [!info] The two-minute read
> This doc is **what** Recompose does and who it is for. It is kept deliberately light.
> **How it works:** `Product_Boundaries.md`, then `Architecture_Thesis.md`.
> **What was decided and when:** `pivots/`. **Why:** `Office_Hours/`. **Where it's been:** `Journey.md`.
> **What exists in code right now:** `README.md`.

## What it does

**Customers agentically redesign white-label apps.**

A tenant on a white-labeled app says what they want it to look like, and their app comes back fully redesigned — every screen, every asset, reading as their brand rather than as the platform's app with a logo dropped on it. No features added, none removed. Just theirs.

## Who buys it

Multi-tenant white-label SaaS platforms with real tenant volume. Not agencies, not freelancers, not the end business.

They buy for a throughput reason, not a satisfaction reason: deep per-tenant branding takes **3–6 weeks of human time per tenant** everywhere it is offered, which caps how many a platform can sell regardless of demand. The sharpest wedge is platforms where **every tenant already has their own app** — Subsplash, Passion.io, Q2, Banno, Alkami — because the population a redesign can act on equals their tenant count. On platforms that sell a shared shell with a branded app as an upgrade, only 0.1–3% of tenants ever take it.

## How it gets in

**It never touches their code.** Recompose keeps its own tokenized fork of the platform's app and derives every tenant's design from that; the platform grants read access and nothing else. No pull request, no write access, no review burden.

That is a core principle, not an implementation detail — it is the reason a platform can say yes without engineering leadership signing off on an external agent writing to their trunk.

## What it replaces

The custom build — $10–50k and 4–12 weeks in the agency market — or the design line item inside a platform's premium tier, which is a 3–6 week human turnaround wherever it is offered.

Not the whole tier. That price also covers migration, a named strategist, App Store operations and higher limits, and it is set by the size of the tenant's business rather than by any deliverable's cost.

The bar is **close enough at a fraction of the price**. Not parity with a human designer.

## What it promises

**Autonomous operation.** No PR into the platform's trunk, no review queue, no integration work, no engineering sign-off on their side.

Roughly **95% of what the agents produce comes out clean, 4% needs a small fix, and 1% goes badly wrong** — a target, not a measurement. Nothing has been measured.

What makes that survivable is that **the pipeline halts rather than ships.** An agent that cannot satisfy the accept condition stops, and nothing deploys. The 1% becomes a stall instead of an incident; the 4% is cosmetic and does reach production.

Sync lands on **`uat`** — one of the two branches on the platform's own repo, the one ahead of `main`. It is a branch, not a review environment, and there is no approval queue.
