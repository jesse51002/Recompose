---
tags: [concept, product, mechanism, architecture, upgrades, retired]
status: retired
retired: 2026-08-12
aliases: [re-derived not forked, repeatable transformation, agent-maintained fork, no hand-maintained divergence]
---

# Re-Derived, Not Forked

> [!warning] Retired — there is no fork
> **Regression-test combinatorics**, the constraint this existed to answer, is solved structurally instead: additive modules do not diverge the base, so the platform ships one update to every tenant exactly as it does today.
>
> **The coupling hazard is quieter rather than absent.** A module's API dependency has no conflict and no event: a field that keeps its name and changes meaning passes cleanly and every module built on it is silently wrong. See [[Strategy/Open_Questions|Open_Questions.md]] §2.5.

A tenant's redesign is a **continuously re-derived transformation, never a hand-maintained divergence**. Divergence in the git sense does exist — the design lives on a fork — but nothing in that fork is maintained by a person, so per-tenant divergence never accumulates as human work.

This is the answer to the structural objection any technical buyer raises: if each tenant's app is code-diverged, the platform can no longer ship one update to all tenants and upgrades become N merges against N forks. That is the **regression-test combinatorics** constraint named in the April 2026 competitor research as one of the four reasons white-label customization stalled at logo-and-colour, and it is the economic reason the category converged on tokens rather than forks. The principle exists to keep [[Concepts/Product/Mechanisms/Full_Visual_Redesign|full visual redesign]] compatible with a platform still shipping upgrades once.

> [!note] Term note
> The name reads misleadingly and is retained for link stability: the mechanism **is** forks. What it asserts is that a fork's *contents* are re-derived by an agent rather than maintained by hand. "Re-derived, not hand-maintained" would be the accurate phrasing.

## The mechanism

Recompose **never writes to the platform's trunk.** Two fork layers, both kept current by an agent:

1. A **shared tokenized fork** of the platform's app — Recompose's base — re-derived against their main as they ship.
2. Each **design fork** — one per design, not per tenant — re-derived against that base.

Changes surface on **`uat`**, never straight to production. A re-derive that the agent cannot complete **halts** rather than landing something unverified — which is what makes divergence a scheduling problem rather than a quality one.

The trade is explicit: the maintenance burden moves from the platform to Recompose, permanently. Absorbing it agentically, with no queue handed back to the platform, is what the autonomous promise means ([[pivots/2026-07-30-22-autonomous-is-the-promise|pivots/2026-07-30-22-autonomous-is-the-promise.md]]). **Who resolves a halt is undecided** — see [[Strategy/Open_Questions|Open_Questions.md]].

**Rejected in the same decision:** a *layout enum on the customer's main*, where each generated layout is enumerated as a variant in the customer's own trunk so nothing forks. It was the founder's preferred option as recently as 2026-07-27 and is now dead — it requires writing generated layout code into their trunk, which is incompatible with never touching it. Founder: *"just touching and maintaining their production code sounds like a mess. Agentic separate forks you essentially don't have to think about unless there is an error is better."*

**Still open:** how the branded binary reaches the platform's release train, given the source of truth for a design is a Recompose fork rather than their repo.

## Shows up in

- [[pivots/2026-07-28-01-agentic-editing-all-in|pivots/2026-07-28-01-agentic-editing-all-in.md]]
- [[pivots/2026-07-27-11-customization-engine-is-the-company|pivots/2026-07-27-11-customization-engine-is-the-company.md]]
- [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]]
- [[Strategy/Product_Boundaries|Product_Boundaries.md]]
- [[Research/2026-05-01-ai-brand-competitor-analysis|Research/2026-05-01-ai-brand-competitor-analysis.md]]

## Related concepts

- [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]]
- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]]
- [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]]
- [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]]
