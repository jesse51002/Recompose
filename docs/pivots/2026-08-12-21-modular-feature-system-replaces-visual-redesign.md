# Pivot: the modular feature system replaces the visual redesign

**Date:** 2026-08-12
**Status:** Superseded by [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules.md]]

## The decision

**Recompose builds a modular per-tenant feature system for white-label platforms, and the full visual redesign stops being the product.** Theming shrinks to a token layer whose job is making a generated module look native. The mechanism — compile-time versus runtime insertion, purpose-built insertion points versus a platform's existing extension surface, and the accept condition for a generated feature — is deliberately left open.

## From

**Customers agentically redesign white-label apps.** A [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] of an app the tenant already has — every screen, every asset — with **no new features**, delivered through two agent-maintained fork layers, landing on the platform's `uat` branch, integration consisting entirely of read access ([[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]]). Safety rested on **arrangement only** ([[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]]) and on bounded blast radius by output type: a bad output is ugly, not broken.

## To

**Customers agentically extend white-label apps.** A tenant describes functionality they need; a module is generated and inserted into their app, carrying the platform's own tokens so it reads as native. No fork. The module is additive and separable, which is the safety boundary the entire rest of the field converged on independently.

Four things move with it:

- **The buyer moves to platforms that already pay for per-tenant custom development** — Banno/Jack Henry, Backbase, Tapcart, Trainerize Enterprise, GoodBarber, BuildFire. The [[pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps|August 2 filter]] (every tenant already has an app) is kept as a secondary sort, not dropped. Banno satisfies both.
- **The product is the tenant-facing loop, not a developer tool.** Q2 Code makes an engineer faster; this removes the engineer. That is the difference that stops this being a prompting improvement over something a platform can build in-house.
- **Theming reduces to tokenization.** No layout agent, no animation, no [[Concepts/Product/Mechanisms/Visual_Mirror|visual mirror]], no [[Concepts/Product/Mechanisms/Screenshot_Oracle|screenshot oracle]] as a design accept condition. The asset pipeline survives intact and changes job: it makes generated modules look like they belong.
- **Both core principles in [[Strategy/Product_Boundaries|Product_Boundaries.md]] are spent.** Arrangement-only dies by definition. Never-touch-their-code becomes never-touch-their-trunk, with writes confined to an extension surface.

## Why

**Design alone does not move the buyer, and the vault's own evidence says so three times over.** Across a dozen documented custom-build cases design has never once been the sole reason anyone built bespoke — it always travels with a functional driver ([[Research/2026-08-02-why-custom|Research/2026-08-02-why-custom.md]]). App-store reviews of white-labeled apps complain about bugs, never about looking generic. Attach rate tracks tenant size, not design quality, and that remains unfalsifiable by any further research (T19).

**The money is on the feature side and the design side does not have a budget line.** Design is a $99–499 flat fee and 1.19% of revenue at Olo, 2.9% at Toast — the August 2 session already killed cost reduction as a design pitch because there is not enough cost to save. Per-tenant feature work at the platforms that do it is a named engineering organisation on a contracted engagement with pricing gated behind sales.

**The refusal is the demand signal.** Thirteen of nineteen researched platforms have no path by which a tenant gets net-new functionality at any price ([[Research/2026-08-02-features-vs-design|Research/2026-08-02-features-vs-design.md]]). Kajabi says it outright. That was previously read as the invariant being easy to hold; it reads at least as well as a market being structurally refused.

**L7's closure does not cover this mechanism.** The numbers that closed the feature route on 2026-08-04 measure an agent editing a large existing codebase — ~67% with a human on every task, under 10% past three files. A module generated into a defined slot is greenfield in its interior, and that is the one thing the field has actually shipped. The route moves from *contradicted by evidence* to *unevidenced in both directions*.

**And the founder's own correction, which is the reason this doc does not oversell the change:** the direction is **harder** than the redesign, not easier. Greenfield describes the module's interior only; its boundary is auth, session, user identity, tenant scoping, base data and RBAC inheritance against an unfamiliar production system, and that is most of the work. The redesign was an unsolved problem with a cosmetic failure mode. This is an unsolved problem with a security failure mode.

## What this costs, recorded rather than argued away

- **The safety property is undefined.** *A bad output is ugly, not broken* stops being true the moment a module writes. That sentence is what made halting sufficient, and halting is why [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] was defensible. Until a replacement exists, **the autonomy promise cannot be made** (T33).
- **The one-person asymmetry is spent.** API discovery, approved-API scoping, schema validation, auth passthrough, RBAC inheritance and public-vs-private data classification are all inherited. Three surfaces — module, backend, admin — mean three security surfaces (T35).
- **Fork drift becomes contract drift.** T23 relocates rather than dying. A git conflict is an event somebody is told about; a field that keeps its name and changes meaning passes the proxy cleanly and every module built on it is silently wrong.
- **The category has incumbents.** Atlassian Forge, Q2's Caliper, Banno's Plugin Framework and Gigacatalyst are already in it. The visual half was unoccupied.
- **The build-vs-buy threat sharpens.** L12 gates it on owning a mature extension SDK, and the chosen buyer is defined by owning one. Q2 shipped Q2 Code in April 2026 by bolting Claude Code onto an SDK that had existed since 2018.
- **Nine months of layout work is retired as product**, though not as capability. The JSX mirror, the screenshot oracle and the productionalize design are not deleted; they stop being the thing sold.

## Explored in

[[Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary|Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary.md]].

Directly reverses **L7** from [[Office_Hours/2026-08-04-00-Office_Hours_Agentic_Code_Generation_And_The_Feature_Route|the August 4 session]], which closed the feature route, and consumes **L9**, which excluded server-driven UI by principle rather than by feasibility. Both are superseded by this doc rather than contradicted — L7's evidence stands for the task it measured.

## Still open, and not to be invented

- **The accept condition** (T33). Four candidates exist — read-only modules first, generated tests through the platform's CI, a bounded module vocabulary, or tenant approval on real data. None chosen. This is the load-bearing gap.
- **Compile-time or runtime.** Runtime is server-driven UI, proven at Airbnb, Lyft, Spotify and DoorDash. Compile-time is a per-design binary. Undecided.
- **Whether existing extension surfaces are deep enough** (T32). Banno's Plugin Framework hosts HTML/CSS/JS on the partner's infrastructure; Tapcart's blocks live in its studio. If none reaches native UI inside an arbitrary existing screen, purpose-built insertion points return and the sale gets much harder.
- **What bounds a tenant's request.** *Describe what you need* is arbitrary software.
- **Where the admin dashboard lives**, and who operates a generated feature.
- **Whether one person can carry it** (T35).
- **Pricing.** Still undefined, now against a different buyer.

## Downstream impact

Everything below describes the visual redesign as the product and must be rewritten:

- [[Strategy/Recompose_Summary|Recompose_Summary.md]], [[Strategy/Product_Boundaries|Product_Boundaries.md]], [[Strategy/Customer_ICP|Customer_ICP.md]], [[Strategy/Architecture_Thesis|Architecture_Thesis.md]], [[Strategy/Competition|Competition.md]], [[Strategy/Agentic_Code_Generation|Agentic_Code_Generation.md]], [[Strategy/Design_vs_Feature_Work|Design_vs_Feature_Work.md]], [[Strategy/Open_Questions|Open_Questions.md]], [[Strategy/Journey|Journey.md]] (Phase 7), [[Strategy/YC_Application_F26|YC_Application_F26.md]].
- The concept files for the retired mechanisms, and any new concepts this introduces — proposed in [[Concepts/_Index|Concepts/_Index.md]], not created without approval.
- `PRODUCT.md` and the "What Recompose is" section of the repo root `CLAUDE.md`.

**No code changes follow from this pivot yet.** The assignment is unchanged in shape and unexecuted for the fifth session running: ten named platforms, a named human at each, and the calls before the build.
