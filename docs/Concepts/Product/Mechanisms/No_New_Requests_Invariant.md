---
tags: [concept, product, mechanism, safety, architecture, retired]
status: retired
retired: 2026-08-12
aliases: [no-new-requests invariant, no new requests, functional equivalence, arrangement-only invariant, P14]
---

# No New Requests Invariant

> [!warning] Retired — do not present this as a live safety property
> The product's invariant is **additive-only**: a module adds; it never edits, moves, merges, splits or removes. See [[Strategy/Product_Boundaries|Product_Boundaries.md]].
>
> **The gate described below was never built**, so nothing in it was ever demonstrated. Kept because the pivots and office hours reference it.

Generated code is **view-layer only** and may not add API calls or reach new data. Every screen does exactly what it did before and needs exactly the data it needed before, so the API surface after a redesign is provably identical to the one before it.

This is the safety architecture, and it replaces sandboxing rather than supplementing it. **A visual redesign cannot be sandboxed** — everything Gigacatalyst generates is additive (a new dashboard, a new tab, a new view), which is precisely why an isolated sandbox works for them: the artifact is separable by construction and a broken one leaves the host untouched. A redesign modifies screens that already exist, so their containment story does not transfer. The invariant is what takes its place, and it is a *strictly tighter* constraint than they operate under, since they generate new functionality against newly discovered APIs and therefore need agentic API discovery, approved-API scoping, and schema validation. That entire class of problem cannot occur here.

The load-bearing property is that it is **verifiable rather than argued**. Diff the API calls a variant makes against the baseline and fail the build on any addition; the platform's own engineers, including a security reviewer, can confirm nothing was added or removed. The customer's QA surface is unchanged by construction. This is the mechanism behind functional equivalence and it is why the invariant is stated as a gate, not as a promise.

One narrow residual is recorded and not closed: **client-side role gating**. A component that renders conditionally on role, moved into a screen with different visibility assumptions, can surface something it shouldn't, and the backend will not catch it because the request is legitimately authorized. The explicit rule is never to move role-conditional components across visibility boundaries. The gate itself has also **never been run** — building it against the CombatDen reference implementation, before it is promised to any customer, is an open test.

## Shows up in

- [[pivots/2026-07-27-11-customization-engine-is-the-company|pivots/2026-07-27-11-customization-engine-is-the-company.md]]
- [[Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company|Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md]]
- [[Strategy/YC_Application_F26|YC_Application_F26.md]]

## Related concepts

- [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]]
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
- [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]]
- [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]
