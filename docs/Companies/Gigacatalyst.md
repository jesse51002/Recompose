---
tags: [company, competitor, per-tenant-customization, yc]
relationship: competitor
verified: 2026-08-13
aliases: [Giga, Giga Next, gigacatalyst]
---

# Gigacatalyst

**Giga Next Inc.** YC Spring 2026 (P26 batch), founded 2025, San Francisco, team of four. Founder/CEO Namanyay Goel; YC primary partner Andrew Miklas.

**The only company found anywhere occupying the cell Recompose is aiming at** — non-technical end-user generation of functionality inside a third party's production SaaS — and **its live positioning has moved off it.**

## What they built

An embedded AI layer performs **agentic API discovery** of the host's endpoints, query parameters and data structures, then translates natural-language requests into sandboxed "microapps" that inherit the host's auth and RBAC, with *"no changes to the host codebase required."* Generated code passes validation gates before deployment — compile checks, schema validation, security enforcement — and *"connects only through approved APIs."* Microapps run beside the host product with versioning, audit trails and a sharing marketplace.

Founder, on the coupling problem: *"we create a proxied, pinned API layer that can handle the base API changing."* [vendor-claimed] That is an anti-corruption layer, and it is the same answer to contract drift that [[Strategy/Open_Questions|Open_Questions.md]] §2.5 records as the working idea here.

**Integration benchmark:** ~2 days to install, ~2 weeks to full platform integration, publicly stated as *"not an instant plug-and-play add-on."* From a funded team of four who built the API discovery. Treat as a floor. [vendor-claimed]

## The repositioning, which is the most important fact on this page

**As of 2026-08-13 the homepage leads with a sales-enablement motion, not a production one.**

> "Stop burning hours on demo and POC setup / Turn customer requirements into configured demos, POCs, and implementation workspaces, using your existing product APIs." [primary, live, fetched 2026-08-13]

**The YC company page still carries the original framing:** *"Let software users build new features with our in-app AI agents."* [primary, fetched 2026-08-12] The YC Launch post is more explicit still — *"Gigacatalyst allows sales and CS teams to build missing features that customers need,"* with examples including a KPI dashboard in about a minute and an OCR photo-upload tab.

**The shift is bracketed, not dated.** Wayback snapshots for the domain could not be retrieved (rate-limited), no pivot post exists on the founder's blog or X, and the company has published no rationale. What is established is a before/after between Spring 2026 YC copy and the August 2026 homepage. The social-preview asset is versioned `?v=5`, implying several prior homepage revisions.

**Production use has not obviously stopped.** The current homepage carries a testimonial from **Ryan Chan, CEO of UpKeep** — *"Over 1,000 UpKeep customers use it daily."* [vendor-claimed] UpKeep is a field-service and maintenance-management SaaS (YC W17) that raised a $36M Series B in May 2020 led by Insight Partners, $48.8M total. No other customer is named publicly.

### Why they moved, and the two readings are not exclusive

The evidence supports **"the buying motion is easier upstream"** — demos, POCs and implementation workspaces carry no production consequence. It does **not** establish **"production per-tenant extension proved too hard"**: the company has never said so, and UpKeep persists.

**But the two readings collapse into one when read from the buyer's side.** The upstream motion is easier *precisely because* a prototype carries no correctness requirement, no security surface and no data risk. Whatever the internal reason, the observable pattern is a company retreating from the surface where generated software has to be right, toward the one where it does not.

That is the same pattern as every platform-native generator being developer-facing, and as [[Strategy/Extensibility_Market|the empty cells in the market map]].

## Where they collide with Recompose, and where they do not

**Collides.** Separate UI surface alongside the host product, integrated through the host's API, inheriting the host's auth, generated per tenant, drivable by a non-technical user. That is the architecture, not a neighbouring one. The developer-facing/tenant-facing distinction that separates Recompose from Q2 Code does not separate it from Gigacatalyst as originally positioned.

**Does not collide.**

- **No native mobile.** API composition into a sandboxed micro-app suffices for a web product. A native mobile app is a compiled binary shipped through store review, so a renderer has to live in the app or the module has to be in the build. **Nobody in the surveyed market does per-tenant generation into native mobile** — every cell of that row is empty. This is the one piece of structurally defensible ground.
- **Their published customers are modern SaaS with clean APIs.** Agentic API discovery is tuned for well-documented REST. Older vertical stacks with worse documentation are a different problem, and the payoff for reading a bad API is higher than for reading a good one.
- **They are funded, shipping and have a named production customer**, against a direction with nothing built. This asymmetry is the honest headline of any comparison.
- **They have vacated the cell, at least in how they sell.** How durable that is, nobody outside knows.

## Traction figures, which do not reconcile

Shown side by side rather than averaged. All **vendor-claimed**, none independently verified.

| Claim | Source |
|---|---|
| $1M+ pipeline unblocked in 6 weeks · 70% day-30 retention · $100K churn prevented · 800+ features shipped in 6 weeks | YC Launch post |
| 2,500 apps built already | Product Hunt, founder comment |
| 90.8% adoption · 89% day-30 retention · 670 microapps | HokAI (third-party aggregator, self-describes as *"a preliminary assessment based on limited publicly available information"*) |

Day-30 retention appears as both 70% and 89%; the artifact count as 670, 800+ and 2,500. **No figure has a named customer attached to it.** Do not quote any of them.

The vocabulary is still worth noting — adoption rate, day-30 retention, pipeline unblocked, churn prevented, engineering-hours saved. That is what this buyer responds to, and **nothing at Recompose is instrumented to produce any of it.**

## The question that needs a prepared answer

**"Why aren't you just Gigacatalyst?"** The answer is now stronger than it was on 2026-08-12, and it has three parts: native mobile, which nobody does; vertical and older stacks rather than clean Series B APIs; and the fact that their own live positioning has moved upstream to demos and POCs.

**Do not overclaim the third part.** It is a homepage change with no stated rationale, a persisting production customer, and no date attached.

Note that [[Strategy/YC_Application_F26|the frozen YC application]] omits them from its competitor answer, on grounds that no longer hold.

## Unverified

- **The date and stated rationale of the repositioning.** The single most valuable missing fact about this company.
- **Whether production per-tenant extension remains a live offering** alongside the demo motion.
- **Pricing.** Custom, contact-sales, no public tiers. No comparable exists.
- **Their ICP boundary.** "Series B SaaS" is inferred from published customers, not stated.
- **How they resolve a microapp that runs and computes the wrong answer.** Sandboxing, compile checks and schema validation catch code that *fails*. Nothing published says what catches code that *works and is wrong* — the same gap in [[Strategy/Open_Questions|Open_Questions.md]] §2.1.

## Sources

Company homepage (fetched 2026-08-13), YC company and Launch pages, Product Hunt founder comments, founder blog, HokAI aggregator, TechCrunch on UpKeep's Series B. Full sourcing in [[Research/2026-08-13-agentically-extensible-platforms|Research/2026-08-13-agentically-extensible-platforms.md]]. **Every traction and integration figure is vendor-claimed and none is independently verified.**
