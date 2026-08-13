---
tags: [business, competition, market, strategy]
status: current
date: 2026-08-12
source-pivot: pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md
---

# Competition

Concepts touched: [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

The buyer is a multi-tenant white-label SaaS platform **that already funds per-tenant custom development**. Every category below is judged against that buyer's actual question: *what do I do today when a tenant asks for functionality we don't have, and what would I stop doing if I bought this?*

> [!warning] This is a category with funded incumbents in it
> The platform's own services organisation, its extension SDK and partner network, AI extension generators built on SDKs the platform already owns, and Gigacatalyst. Nothing on the design side is an alternative to a feature product; the list at the bottom of this doc records which categories those are so they do not get added back.

> [!note] Source provenance
> **Every filename in `Research/` carries the date the research was done, and the date tells you which thesis it was written against.** The May 2026 files predate two pivots and argue for a vertical white-label app of our own. The August 2026 files were written against the platform ICP. **All of them were commissioned against a design product**, so read their facts and discard their framing.
>
> - [[Research/2026-08-02-features-vs-design|Research/2026-08-02-features-vs-design.md]] — **the load-bearing one.** Which platforms build features for individual tenants, which refuse, and who staffs it. This is the competitive map.
> - [[Research/2026-08-04-mobile-app-code-gen|Research/2026-08-04-mobile-app-code-gen.md]] — the state of agentic code generation, the additive-boundary finding, and the graveyard. The constraint set this product has to beat.
> - [[Research/2026-08-02-why-custom|Research/2026-08-02-why-custom.md]] — why anyone goes custom. Design never travels alone; a functional driver is always present.
> - [[Research/2026-08-04-company-list-white-label|Research/2026-08-04-company-list-white-label.md]] — the raw target list, with contact surfaces rather than people.
> - The May 2026 brand-competitor surveys and the August design-delivery, attach-rate and enterprise-tier briefs describe the *design* market, which is not this one. Their facts hold; their recommendations do not apply.

---

## The platform's own services organisation — the direct alternative

**What they do.** Build the feature, for that tenant, with their own engineers, as a priced engagement.

- **Banno (Jack Henry)** — a named **"Custom Development team."** *"Maybe your idea doesn't require a third-party — we build custom features, too… our custom integrations team is here to build it for you."* Work may involve an additional contract with the vendor and/or Jack Henry.
- **Backbase** — a code-writing **"Services" organization** distinct from product R&D: *"your tailor-made code seamlessly integrates our products with customers' systems."* Alongside a mobile guild of 70+ engineers.
- **Tapcart** — an **"Engineer, Solutions & Services"** at $120–140k *"building Custom Blocks and React web apps for existing and prospective clients,"* plus a Senior React Developer for App Studio Solutions.
- **ABC Trainerize** — Enterprise *"custom-built widgets… non-standard functionality,"* gated to 5+ locations.
- **GoodBarber** and **BuildFire** — custom development sold to their **reseller and agency base**, not to end tenants. Different shape; read carefully before counting them.

**Where they stop.** At engineering headcount, on a human schedule, with pricing gated behind sales. No platform publishes rates, minimums, timelines or IP terms — all of it is contact-sales, which is itself the signal that the work is expensive and scarce.

**Real alternative for the buyer?** **Yes, and it is the incumbent.** This is the line item being attacked, and there is genuinely money in it.

> [!warning] This is also the internal opponent
> **Group A is defined by having exactly the team whose work this automates**, and they are who the technical evaluation gets routed to. That supplies a champion who owns a queue and knows what it costs, and someone with standing to object who will be right about real things.

## Extension SDKs and partner networks — the deliberate alternative

**What they do.** Refuse to build per-tenant features, and supply an architecture so someone else can.

- **Q2 — Caliper SDK**, since 2018, plus certified third-party developers, with Q2 hosting and deploying: *"solutions developed in the Q2 SDK are deployed, hosted, and monitored by Q2."* Over 1,000 extensions running in product. Explicitly **not** a bespoke-build shop.
- **Alkami** — APIs, an extensible SDK, prebuilt UI components, and a One-Click SDK Manager added in the Winter 2026 release.
- **Banno Digital Toolkit** — Plugin Framework, Consumer API, Admin API. Plugins are HTML/CSS/JS web apps hosted on the **partner's** infrastructure.
- **Tapcart** — App Studio, CLI, Global Components, Configurable Blocks, and an agency ecosystem building Custom Blocks.
- **BuildFire** — a free MIT-licensed SDK (`buildfire.js`); keep a plugin proprietary by upgrading.

**Where they stop.** At someone else having to do the work. The tenant still needs a developer, an agency, or a budget. Self-serve extensibility answers the platform's problem, not the tenant's.

**Real alternative for the buyer?** **Yes, and it is the answer they already chose.** This is why the module product's differentiator has to be *removing the developer* rather than *supplying code faster*.

**It is also the substrate.** Where a surface like this exists, Recompose writes into it and inherits its safety story. That is the central bet, and it is unverified: Banno's plugins run on the partner's own infrastructure and Tapcart's blocks live in its studio, so **whether any existing surface reaches native UI inside an arbitrary existing screen is not known.** Reading their public developer documentation is the cheapest high-value work available.

## AI extension generators — the sharpest threat

**What they do.** **Q2 Code**, announced 2026-04-16: *"a governed AI-powered development environment… to build extensions and integrations on the Q2 Digital Banking Platform,"* built with Anthropic's Claude Code via Amazon Bedrock. Mid-Hudson Valley Federal Credit Union named as an Early Access adopter; the program expands through 2026.

**Where they stop.** At a developer. It is a governed environment for Q2's own engineers and certified partners writing SDK-compliant extensions. **It makes a developer faster; it does not remove one.** Adoption is also early — one named customer, Early Access.

**Real alternative for the buyer?** **Yes, and it is the pre-registered kill condition.** Q2 did not build a coding agent; they wired Claude Code into Bedrock, and the only reason that was cheap is that **Caliper has existed since 2018.** *The AI was the cheap part bolted onto the expensive part* — and the chosen ICP is defined by owning the expensive part.

The standing condition from [[Strategy/Agentic_Code_Generation|Agentic_Code_Generation.md]]: **if two or more targets ship a native AI-extension layer, the external position erodes.** One has. Checking whether Banno, Backbase, Alkami or Tapcart has shipped or announced anything similar is a required pre-call task, and if a second one has, this direction needs re-examining rather than defending.

**The distinction to hold, and it is the whole product.** A non-technical tenant describes what they need and gets working functionality, with no developer anywhere in the loop. Nobody has shipped that. If the product drifts into being a tool a developer drives, it is competing head-on with something every Group A platform can build in-house.

## Gigacatalyst — the closest company in the market

**The company.** Giga Next Inc., **YC Spring 2026**. Founder Namanyay Goel, team of four, San Francisco. *"Customize your software to every user with AI."*

**The mechanism.** Embeds inside a B2B SaaS product as a white-labeled feature. **Agentic API discovery** parses the host's endpoints, query parameters and data structures. Built *"on your APIs and design system and governed by your auth and security,"* with **"no changes to the host codebase required."** Generated code *"runs securely in isolated sandboxes,"* passes validation gates before deployment including compile checks, schema validation and security enforcement, and *"connects only through approved APIs."* Generated apps run beside the host product, inherit auth and RBAC, and carry versioning, audit trails and a sharing marketplace. An end user types *"build a KPI dashboard for maintenance performance"* and has a working app in about a minute.

**Both companies generate per-tenant functionality inside a host SaaS, on the host's APIs, governed by the host's auth.** There is no clean separation to point at. The two real differences should be said plainly rather than argued around:

- **They have no mobile frontend.** API composition into a sandboxed micro-app is sufficient for a web product; a mobile app is compiled and shipped through app stores, so a renderer has to live inside the app or the module has to be in the build. That is a genuinely harder problem and it is the one piece of defensible ground.
- **They are funded, shipping and live with Series B companies.** Recompose is a direction with nothing built. This asymmetry is the honest headline of the comparison.

**Their integration numbers are the benchmark.** ~2 days to install, ~2 weeks to full platform integration, publicly stated as *"not an instant plug-and-play add-on"* — from a funded team of four who built agentic API discovery. Treat it as a floor rather than a ceiling.

**Their traction vocabulary is what this buyer responds to**, and nothing here is instrumented to produce any of it: $1M+ pipeline unblocked, $100K churn prevented in six weeks, ~800 features shipped (~2,400 engineering-hours equivalent), 670+ microapps, 90.8% adoption across 946 users.

**Their problem framing is the one this product uses too.** *"You lose competitive deals — customers choose vendors that have the exact workflow they operate on."* A strong argument, and a warning about who else is already making it.

> [!danger] The question that needs a prepared answer
> **"Why aren't you just Gigacatalyst?"** — asked by anyone who knows them. The honest answer is mobile plus the tenant-facing loop, not a different problem. Write the paragraph before the first call rather than improvising it; the frozen YC application omits them from its competitor answer, which is visible to anyone who checks.

## Coding agents — the shelf this must not be filed on

**What they are.** Claude Code, Codex, Cursor, and greenfield app builders like Lovable, Bolt, v0, Base44 on web and a0.dev, Rork, Vibecode, FlutterFlow AI on mobile.

**Where they stop.** **Every AI app builder is a greenfield generator** — none modifies or extends a large existing production codebase under someone else's auth and data model. Brownfield agents work at roughly two-thirds with a human on every task, and collapse below 10% past three files. None has a per-tenant fleet model, an accept condition on output, or an integration surface a platform can adopt. They are also *inputs* here: the module generator runs on them.

**Why this isn't one, and it is architectural rather than rhetorical.** The engine is two parts with a boundary where determinism runs out — an app-agnostic dependency DAG for assets, with WCAG AA as an accept condition and coherence achieved structurally, and an agent only for the module code no slot inventory can express. Deterministic where determinism is available, agentic only where it is required. One agent doing everything reads as a wrapper over a model; two systems with a clear boundary reads as architecture.

## Not in this market, recorded so they do not get added

Each of these answers a design question. **None is an alternative to a feature product, and none should appear in a pitch.**

- **Token tooling** (Tokens Studio, Supernova, Style Dictionary, Knapsack, UXPin Merge) — stops at tokens. Now a component of the asset pipeline's world, not a competitor.
- **Brand APIs and brand-kit generators** (Brand.dev, BrandForge, Zoviz) — emit a brand description, never an app.
- **AI design tools** (Galileo, Figma First Draft, Stitch, Builder.io Visual Copilot, Adobe Firefly) — stop at a mockup a human implements.
- **In-platform design services** (Mighty Pro Design Lab, Circle Plus Design Studio, Vagaro Studio 180, Passion.io DFY, Mindbody) — design-only, staffed by graphic designers. Standalone the deliverable prices at **$99–499**, and professional services is 1.19% of revenue at Olo and 2.9% at Toast: there is no budget line here.
- **Agency and freelance custom app builds** — a real alternative for a *tenant*. The budget being attacked is the platform's development line, not the tenant's build.
- **FlutterFlow** — app construction, not fleet customization. Removed by founder correction and kept out.

## The empty space, read honestly

**What nobody has shipped:** a path where a **non-technical tenant of a white-label platform describes functionality and receives it in their app, with no developer in the loop.** Q2 Code makes a developer faster. Gigacatalyst removes the developer on web, without a mobile frontend. Extension SDKs require a developer by design. Every AI app builder is greenfield.

**Four reasons that gap is narrow:**

- **The category has funded incumbents.** Forge, Caliper, Banno's Plugin Framework and Gigacatalyst are all in it.
- **The buyer can build it.** The build-versus-buy filter points squarely at the chosen ICP, and Q2 has already demonstrated the build.
- **The measured capability is not there yet.** No documented case exists of an agent autonomously shipping a net-new user-facing feature into a production mobile codebase it did not author. Not vendor-claimed, not measured. Mobile is the worst-supported domain in the field: no robust iOS/Swift benchmark, JS/TS the lowest-scoring language family.
- **The graveyard is real.** Builder.ai raised ~$450M and went insolvent in May 2025. CodeParrot (YC W23) shut down in July 2025 because *"the generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value."* CodeParrot died of cleanup economics, which is exactly what the undefined accept condition risks here.

**What is on the record:** nobody has asked for this, no named human exists at any target platform, and **no outside party has responded to anything in roughly nine months across seven strategic phases.** This competitive read is entirely desk research.

## What is undefined

- **Pricing.** Undefined for this buyer and this unit. The $100/month per branded tenant in [[Strategy/YC_Application_F26|YC_Application_F26.md]] was priced against designs and does not transfer.
- **The comparison ratio.** *Close enough at a fraction of the price* has no fraction, and the ratio is the pitch.
- **Gigacatalyst's pricing.** Not published, so the nearest analog gives no comparable.
- **Whether existing extension surfaces are deep enough** to carry a real feature. Decides whether the sale is easy or hard.
- **Whether a second Group A platform has shipped an AI extension layer.** A standing condition: if two or more do, the external position erodes. One has.
- **Named targets.** Still zero people. Group A first, Tapcart and BuildFire ahead of Banno on reachability.
