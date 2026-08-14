---
tags: [strategy, summary, recompose]
status: living
---

# Recompose

**One line, provisional: "A workspace you can extend with real code, by asking."**

Untested on anyone. The name is provisional and domain and trademark are unchecked.

Decided [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|2026-08-13]]. The reasoning is in [[Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed|Every Substrate Closed]] and [[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|The Extensible Workspace]].

---

## What it is

A deliberately simplified Notion-shaped workspace — documents, tables, workflows — with one capability nothing else in its field has: **real HTML and JavaScript are first-class content inside it.** Authored by prompting, installed from a marketplace, and modified freely afterward.

The founder's own statement of it is the tightest available: *the same thing everyone else is doing, except we integrate with HTML and JS and give freedom.*

**The differentiator is one thing, deliberately.** Everything else is parity, and parity is most of the build.

## Why now

HTML and JavaScript inside a workspace were worthless while authoring them was expensive, because almost nobody wanted to hand-write them in a document tool. AI made authoring nearly free, so a capability that was previously not worth having became worth building around.

The second half matters as much: people now **hold** AI-generated artifacts and have nowhere coherent to keep them beside their notes and their data. The gap is not distribution — GitHub Pages, Vercel, Val Town, CodePen and Claude's own publishing all exist. **The gap is that none of them is where the rest of your work lives.**

## The three things a coding agent cannot do

Each is a property of owning the base, which is why every attempt to build on someone else's product closed.

1. **Verification.** An agent generating against an unbounded codebase leaves a human reader as the only accept condition. A base we own is a bounded, versioned contract, and rollback is guaranteed rather than hoped for.
2. **Extensions surviving the base moving.** A fork built with an agent leaves the customer owning the merge burden permanently. [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]] names the shape, and no product in any surveyed ecosystem has it.
3. **It runs.** An agent hands you code and you still have to provision, deploy, secure, back up and pay for a database. The workspace hands you a running one with no operations. This is the most legible of the three to someone who has never read a diff.

## The buyer

Small teams and early-stage companies first; the enterprise information-hub budget line as the destination. Full treatment in [[Strategy/Customer_ICP|Customer_ICP.md]].

The line being sold into already exists and is funded — Confluence occupies it and Atlassian bills billions against it. That is a material improvement over the previous direction, which had no budget line at all.

## The architecture, in one paragraph

**Files local, data server-side, execution local**, each placed for a different reason. A vault of files on disk means Claude Code, Cursor and Codex operate on the workspace natively with no integration built. Data lives in a per-workspace database on the server because collaboration is impossible without it. Execution stays on the user's machine because a hosted runtime for arbitrary user processes is an unbounded liability under a freedom-first policy. Decisions **D1–D6** and their costs are in [[Strategy/Architecture_Thesis|Architecture_Thesis.md]].

## Freedom is the position

Capability-scoped access to internal data, and **no restriction on calling public APIs.** The risk is accepted rather than engineered away, and the product selects for users who accept it too.

This is a deliberate choice with a known cost: scoped read plus unrestricted egress makes the read scope advisory rather than enforced. What that obliges is honesty about what is promised — see [[Strategy/Trust_And_Safety|Trust_And_Safety.md]], which also carries the reason no other workspace allows user HTML and what it costs to allow it.

## The two hardest things

**Parity.** The differentiator is a small fraction of the build and the workspace underneath it is the rest. Every simplified-Notion in the field failed on that half rather than on the idea. "Deliberately simplified" has to be an enforced constraint, not a preference.

**Cold start.** A tool for building tools has an empty empty-state, and every new user is handed a blank canvas plus homework. Where extension requires code, roughly two percent of users author anything; where the barrier is low and private, the median Home Assistant install carries fourteen automations. **Most users will install rather than author**, so first run must be *pick something that nearly works*, never *here is your empty workspace* — and seeding the marketplace is a prerequisite rather than a later phase.

## Undefined, and not to be invented

The accept condition for a shared artifact, where the person harmed is not the person who accepted the risk. Whether the marketplace is a curated store or a public index. Sync conflict resolution. Pricing. Whether a raise is required before the product exists, which is expected. And the contradiction between a free-form marketplace and the bounded contract that makes output checkable — both cannot be held in full.

There are zero customers, and no conversation has been had with anyone outside this project about any direction since the gym product. The gym-era CRM was taken to customers at volume and produced a verbal yes at price; nothing since has been carried to a person. [[Strategy/Open_Questions|Open_Questions.md]] is the live list.

## What is not carried forward

Nothing about operating inside someone else's product survives, because there is no longer a host. The engine in this repo — the pipeline, the API, the theme runtimes, the mock surfaces, the studio — has **no assigned job in this direction**, which is an open decision rather than something to let drift.

CombatDen remains a separate repo and is not part of this.
