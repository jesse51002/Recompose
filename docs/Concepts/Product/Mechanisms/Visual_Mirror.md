---
tags: [concept, product, mechanism, design, architecture]
aliases: [visual mirror, jsx mirror, mockware, the mirror]
---

# Visual Mirror

A JSX copy of the platform's app that is **mockware only** — no features, no business logic, no API calls, no state. It exists to be looked at and edited. The design agent works here; the tenant watches here.

The word *visual* is load-bearing and is the whole reason the architecture holds. A **functional** mirror would force [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|the arrangement-only invariant]] to survive a translation in both directions, and the platform's ability to verify that invariant by diffing real code — the thing that makes it saleable rather than merely claimed — would be lost. Because the mirror carries no behaviour, **the invariant never crosses the translation boundary at all.** It is enforced downstream, on production code, where a human can still read the diff.

Three things justify its cost, and only one of them is preview:

1. **Model fluency.** Models handle JSX far better than Flutter widget trees or Kotlin layouts, and freedom in the representation the agent handles best is the point.
2. **[[Concepts/Product/Mechanisms/Screenshot_Oracle|A screenshot oracle]].** A browser renders and screenshots trivially. This is an accept condition for layout where there previously was none, and it exists cheaply only in a browser.
3. **Live visual feedback.** The tenant watches the redesign happen, which is table stakes in this category.

Its economics are the inverse of how they first appear: generation happens once per upstream release, per platform, amortized across every tenant, while the operation it makes cheap — design iteration — is per-tenant and constant.

**Anything that pushes the mirror toward functional fidelity moves the product's safety property from verifiable to argued.**

## Shows up in

- [[pivots/2026-07-28-01-agentic-editing-all-in|pivots/2026-07-28-01-agentic-editing-all-in.md]]
- [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]]
- [[Product_Boundaries|Product_Boundaries.md]]
- [[Architecture_Thesis|Architecture_Thesis.md]]

## Related concepts

- [[Concepts/Product/Mechanisms/Mockup_Skill|Mockup_Skill]]

- [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]]
- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]]
- [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]]
- [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]]
