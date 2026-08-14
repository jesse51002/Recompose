# Pivot: the extensible workspace replaces per-tenant feature modules

**Date:** 2026-08-13
**Status:** DECIDED

## The decision

**Recompose builds its own extensible workspace and stops extending anyone else's product.** A deliberately simplified Notion-shaped base — documents, tables, workflows — whose distinguishing capability is that real HTML and JavaScript are first-class content inside it: authored by prompting, installed from a marketplace, and modified freely. A desktop runtime with a local file vault, per-workspace data on the server, and execution on the user's machine. Sold to small teams and early-stage companies first, with the enterprise information-hub budget line as the destination.

## From

**A modular per-tenant feature system for white-label platforms**, decided [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|2026-08-12]]. A tenant described functionality, an additive module was generated and inserted into their app through the platform's own extension surface, rendered against the platform's tokens. Two principles governed it: additive only, and never write to their trunk. The buyer was a multi-tenant platform already funding per-tenant custom development.

## To

**A base of our own, with freedom as the product.** The unit is no longer a module inserted into someone else's application but an artifact created inside a workspace we control. The buyer is no longer a platform's engineering organisation but the team using the workspace. Both former principles dissolve: there is no trunk of theirs to avoid, and additive-only was a constraint imposed by operating inside a system we did not own.

What carries across is the mechanism, not the target. Generation is still the differentiator; owning the substrate is still what makes output checkable; and carrying an extension forward across a change to the base — [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]] — is still unoccupied ground and now the central engineering problem rather than a supporting one.

## Why

**Every substrate examined turned out to be closed.** Retool's Acceptable Use Policy prohibits reselling, sublicensing and building a competing product on the service; the white-label platforms have been unreachable for eight sessions; Airtable, Notion and the rest are bounded by a configuration ceiling that no model quality can exceed. The closest precedent that layered on someone else's data, Stacker, moved to owning its own.

**The verification argument only works for whoever owns the base.** A developer is the only accept condition anyone has shipped, and a coding agent generating against an unbounded codebase leaves a human reader as the sole check. A base we own is a bounded contract, and it is also the only place a rollback can be guaranteed — the strongest safety mechanism found anywhere in the field.

**And the timing argument is specific rather than general.** HTML and JavaScript inside a workspace were worthless while authoring them was expensive. AI made authoring nearly free, and people now hold artifacts with nowhere coherent to keep them beside their notes and data. Where extension requires writing and publishing code, roughly two percent of users participate; where the barrier is low and private, the median Home Assistant install carries fourteen automations. **The barrier is the code, not the desire.**

## Explored in

[[Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed|Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed.md]] — why no existing product can be extended.

[[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace.md]] — what is built instead, the architecture decisions **D1–D6**, and what remains open.

Preceded by [[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base.md]], where the extensible base was first raised and deferred.

## What is deliberately still open

The accept condition, unchanged since 2026-08-10 and now understood as answerable by rollback rather than verification. Whether the marketplace is a curated store or a public index. Sync conflict resolution. Pricing. And whether a raise is required before the product exists, which the founder expects it is.

## Downstream impact

**Nothing downstream has been updated yet; this was deferred deliberately at the time of writing.**

Every doc under `Strategy/` that names the buyer, the deliverable or the insertion mechanism now describes a direction that is no longer current — the summary and the ICP most of all, and [[Strategy/Journey|Journey.md]], whose job is to record exactly this kind of turn. [[Strategy/Competition|Competition.md]] was already stale before this pivot: it states Retool is not in this market, which stopped being true when AppGen shipped alongside a non-engineer positioning.

Under `Concepts/`, anything defined by operating inside a host system — the integration surface, never-touching-their-code, the additive-only invariant — is scoped to a target that no longer exists and needs either retirement or restatement. [[Concepts/_Index|Concepts/_Index.md]] is the authoritative listing.

Outside the vault, the repo root `CLAUDE.md` opens by describing the product as a modular per-tenant feature system and must be rewritten before it misleads a future session, as must `PRODUCT.md`.

The engine itself — the pipeline, the API, the theme runtimes, the mock surfaces and the studio — has no assigned job in this direction. That is an open decision rather than something to let drift, and it is the same warning the 2026-08-12 pivot carried about the same subsystems.
