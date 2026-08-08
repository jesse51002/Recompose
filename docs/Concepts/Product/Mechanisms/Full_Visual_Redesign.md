---
tags: [concept, product, mechanism, scope, design]
aliases: [full visual redesign, full visual overhaul, deep visual customization, complete visual overhaul, arrangement-only redesign]
---

# Full Visual Redesign

The ambition level Recompose commits to: a **complete visual overhaul of a white-label app — including layout — driven by the tenant, with no new features**. Every screen, asset, and surface reads as that tenant's brand rather than as the platform's app with a logo dropped in.

The scope is deliberate and its boundaries are set in both directions. It is **more than theming** — the pivot doc is emphatic that the product is *not* "we tokenize your app and swap a palette," and it is not [[Concepts/Product/Mechanisms/Tokenized_Design_System|tokenizing]] either, which is the prerequisite that makes a surface parameterizable rather than the product itself. It is also **less than a rebuild**: layout is in scope, information architecture is not. Per the tightened arrangement-only invariant, no screens are merged or split and no functionality is added or removed — a generated variant changes how existing elements are arranged on the screens that already exist, and nothing else. That is the one sentence to hand an engineering team.

The argument that this ambition is reachable rather than aspirational is comparative, and it is evidenced rather than assumed: Gigacatalyst (YC Spring 2026) generates *working software* against live data with inherited auth, RBAC, sandboxing, versioning, and audit trails. A bad output for them is a security incident; a bad output here is ugly. **The visual half is the structurally easier half of the same ambition.** The engineering risk this originally named — that layout has no deterministic accept condition the way colour has WCAG and OKLCH — was answered on 2026-07-28 by the [[Concepts/Product/Mechanisms/Screenshot_Oracle|screenshot oracle]]: render the design and have a VLM judge the image. That is an accept condition where there was none, though not a deterministic one. What replaced it as the open risk is narrower: an accept condition is not a *stopping* condition, and the validator loop is still unbounded.

Delivery status is uneven and should not be overstated: the asset half (palette, typography, copy, icons, imagery) is prototyped and running; layout and animation generation were still in prototyping as of the YC F26 application.

## Shows up in

- `pivots/2026-07-27-11-customization-engine-is-the-company.md`
- `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md`
- `YC_Application_F26.md`

## Related concepts

- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]]
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
- [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]]
- [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]]
- [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]
- [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]]
- [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]]
