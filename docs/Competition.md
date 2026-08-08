---
tags: [business, competition, market, strategy]
status: current
date: 2026-07-28
---

# Competition

Concepts touched: [[Closed_Design_To_Production_Loop]], [[Tier_Unlock_ROI]], [[Integration_Surface]], [[Full_Visual_Redesign]], [[No_New_Requests_Invariant]], [[Re_Derived_Not_Forked]], [[Tokenized_Design_System]], [[Modal_Coherence]], [[Orchestrator]], [[AI_Design_Compression]], [[Shopify_Pattern]], [[Brand_Is_Product]], [[Freelance_Conversion_Thesis]].

The buyer is a multi-tenant white-label SaaS platform with real tenant volume. Every category below is judged against that buyer's actual question: *what do I do today when a customer wants their app to look like their brand, and what would I stop doing if I bought this?*

Two things reset this document. First, the company changed: the class-based-gym CRM is now only the reference implementation, so gym CRMs (Mindbody, PushPress, Gymdesk, Zen Planner) are no longer the competitive set in any sense — they appear here only as examples of platforms that sell a branded-app service. See `pivots/2026-07-27-11-customization-engine-is-the-company.md`. Second, scope moved from assets to assets **plus structure** ([[Full_Visual_Redesign]]), which changed who is being replaced: not a designer applying a brand, but the designer *and* the front-end engineer who implements the design — the whole custom-build line item. That promotes in-platform design services and agency builds to direct alternatives and demotes token tooling to a fraction of the surface.

> [!note] Source provenance
> Everything in `Research/` was written in April–May 2026 against the *earlier* thesis — building our own vertical white-label app for creators. The factual surveys carry; the strategic recommendations do not, and the reader has to hold the two apart. Competitive detail added since comes from `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md`.
>
> - `Research/AIBrandCompetitiorAnalysis.md`, `Research/AIBrandCopetitiorAnaylsisv2.md` — landscape surveys. Their recommendations (pick a vertical, price at $500–1,500/mo, PWA-first delivery) were written for a company we are no longer building.
> - `Research/CoachAndInfluencer.md` — **read this as a customer list, not a competitor list.** It maps the multi-tenant white-label platforms (Passion.io, Mighty Pro, Disciple, Uscreen, Tapcart, GoodBarber, BuildFire, Nudge Coach, Trainerize, Circle, VidApp, Maestro) with pricing and tenant counts. Every one of them is the buyer now. Its market sizing is for the creator/coach ICP and is dead.
> - `Research/Incumbent_Design_Delivery.md` — what platforms charge for design and why the ones who charge can't build the replacement. Extracted 2026-08-02 from two lineage docs not carried here. Figures are May 2026 and some are stale; quote ranges.
> - `Research/Enterprise_Tier_Anatomy.md` — what the premium branded-app tier actually contains at Mighty Pro and Circle Plus, what the dedicated strategist does, and where design sits inside it. **Current as of 2026-08-02 and the only research here written against the platform ICP.** Read it before quoting any enterprise-tier price — it records how weakly sourced every figure in circulation is.
> - `Research/Distribution_Architecture.md` — Apple Rule 4.2.6, per-tenant binaries vs. picker apps, per-tenant App Review load. The Apple architecture facts are live industry structure. **Its "Decision: per-customer Apple Developer accounts" is not our decision** — Recompose does not ship to the App Store; the platform does. Read it as a description of the buyer's world.
> - `Research/B2B2C_SaaS_sales_for_small_businesses.md` — how vertical SaaS sells to SMBs (Toast, Square, Mindbody, Zenoti, ABC Fitness). The wrong buyer for us; useful as a description of the business our buyer is in.
> - `Research/WhyCustom.md` and `Research/Attach_Rate.md` — August 2026, written against the platform ICP. White-label dominates every vertical surveyed (93–99.5%), but **attach rate on the branded-app tier is 0.1–3% on shell-model platforms and tracks tenant size rather than price.** Read both before using any tenant count as an addressable number.

---

## Token tooling

**What they do.** Tokens Studio ("design systems, fully automated"), Token Designer (AI token generation plus an MCP server), UXPin Merge (AI token sync, claims to halve engineering effort), Supernova, Style Dictionary, Knapsack. The W3C Design Tokens spec stabilised in October 2025, so a single token bundle can flow from Figma to web, iOS and Android.

**Where they stop.** At tokens. No app ever ships from any of them. They produce a well-managed variable layer and hand it to an engineering team, which is the expensive part.

**Real alternative for the buyer?** No, and less of one than a year ago. A platform that adopts token tooling still needs a designer to decide what the tokens should be per tenant and a front-end engineer to apply them — the exact two roles this replaces. Token tooling was the right comparison when the product was assets only; against a [[Tokenized_Design_System|tokenized]] *plus* structural redesign it overlaps a fraction of the surface. It is closer to a component of the stack than a substitute for it.

## Brand APIs and brand-kit generators

**What they do.** Brand API 2.0 and Brand.dev serve logos, colours and fonts per company — Brand.dev's Styleguide API ($49/mo for 3,000 retrievals) extracts colours, typography hierarchy, spacing, shadows and component styles from any URL and explicitly markets "White-Label Product Customization." BrandForge is the closest *business-model* analog: AI white-label brand generation sold with full API access to hosts, registrars and agencies, advertising "signed contract to first customer in under 14 days." Zoviz/Visual DNA turns a URL into CSS variables or a shadcn theme; Figma ships an AI Brand Guidelines Generator.

**Where they stop.** Before any app ships. They emit a brand *description* — kits, palettes, style guides, sometimes a website — never a native app. BrandForge is the sharpest illustration: same buyer shape, same API-to-hosts motion, output that never reaches a mobile binary.

**Real alternative for the buyer?** No. These are upstream inputs and plausible suppliers, not substitutes. A platform that buys Brand.dev has extracted a tenant's brand and still has to build the tenant's app.

## AI design tools

**What they do.** Galileo AI, Figma First Draft and Stitch generate UI from prompts. v0, Lovable (Connected Design Systems) and Subframe generate greenfield projects with design-system constraints. Builder.io Visual Copilot enforces existing design tokens on AI-generated screens via CLI integration with Cursor, Windsurf and Claude Code. Adobe's Firefly Custom Models, Style Kits and Design Intelligence are the strongest evidence that AI can generate a coherent brand *language* at scale — Coca-Cola and Disney announced custom models at MAX 2025, and Firefly Services exposes it programmatically.

**Where they stop.** At a mockup, or at a new project, that a human still has to implement inside an existing production app. Firefly's output is creative collateral, not interactive product — nobody has wired Firefly Services to generate the per-tenant asset set for a multi-tenant app shell. Quality is also a live constraint on this whole tier: NN/g's 2024–25 evaluations found AI-generated UI tends toward "purple gradients and glossy cards — the unmistakable AI look," with multi-screen flows particularly weak, and a 2024 MDPI systematic review found homogenised layouts with missing elements and navigation inconsistencies.

**Real alternative for the buyer?** No. The buyer's problem is not "produce a design," it is "get a distinct design into N tenants' already-shipped app without hiring N designer-weeks." None of these operate per tenant across a fleet, and none of them touch a production codebase under a safety contract. Builder.io is the nearest miss — it enforces tokens on generated screens inside one team's workflow — but it is a tool a design team uses, not infrastructure a platform installs.

## In-platform design services — the direct alternative

**What they do.** This is what platforms with tenant volume actually sell today when a customer wants a branded app, and it is a human design team behind a premium tier:

- **Mighty Pro Design Lab** — branded splash screens, store-listing assets, brand colours in light and dark, up to five fonts, delivered as a service tier.
- **Passion.io** — Plus tier requires a **$10,000–$20,000 setup fee**; 15,000+ apps launched.
- **BentoBox under Clover** — agency-priced design service (recorded in the office hours doc; not covered by the May research).
- **Circle Plus Design Studio** — builds marketing screenshots, splash and icons over **4–6 weeks**, reportedly ~$30k/year.
- **Mindbody**, **ABC Trainerize** (Studio CBA, ~four-week human turnaround), **Vagaro**, **Tapcart Ultimate** ($400+/mo with "Collaborative App Design Services" and a dedicated account manager), **Banno Visual Branding Services** in banking.

Across ~80 platforms surveyed in May 2026, custom illustrations, iconography and motion per customer sat at roughly **0%** adoption, custom typographic systems under 5%, and everything deeper than logo-plus-colours was gated behind $10k–$28k/year professional-services tiers. The price gap between the self-serve template tier and the feels-custom services tier is consistently **5–30×**.

**Where they stop.** At human throughput — **3–6 weeks per tenant**, consistently, everywhere a turnaround is published. That is the cap, and it is a capacity ceiling rather than a cost line. This is [[Tier_Unlock_ROI]] — a revenue tier the platform cannot scale, not an end-user satisfaction argument and not a payroll to eliminate.

**Real alternative for the buyer?** **Yes for the design line item, no for the tier around it.** At Mighty Pro the tier lists six deliverables — migration of members, courses and payments; a Community Design™ Plan; setup; design services; a membership; ongoing reporting — and design is one. The named human attached to these tiers is a launch project manager and business coach, not a designer: the Community Strategist job posting lists workshops on content cadence, training on member onboarding flows, and creative input on landing pages and email sequences. Recompose replaces one bullet. Full anatomy in `Research/Enterprise_Tier_Anatomy.md`.

> [!danger] Do not build a cost-savings pitch here, and do not quote a tier price
> The design functions are small and cheap. Circle's design department is ~4 people out of ~160 and primarily does Circle's own marketing; Vagaro's service is a $499 flat fee; ABC Trainerize prices the same class of deliverable standalone at **$99–$169 one-time**. Professional services runs 1.19% of revenue at Olo and 2.9% at Toast, and Olo's management said they would rather upsell platform modules than grow it. There is not enough cost to save.
>
> Every premium-tier price in circulation is a third-party estimate of a contact-sales number. Mighty Pro appears as $1,167/mo, $3,000–5,000/mo, $28k/yr and $33k/yr; Circle Plus appears as both **~$30k/year** and **$10,000–$30,000 per month**. **Use ranges, never a precise figure, and never attribute a tier price to design.**

> [!note] Who is in the room
> There is usually no head of tenant design. The client-facing roles are Solutions Consultants, Client Implementation Managers, Customer Onboarding Specialists and marketing designers. Political risk is low — and so is the chance of an internal champion. A deal with no opponent and no advocate stalls rather than losing.

## Agency and freelance custom builds

**What they do.** Build the app, or the branded front end, as a project. **$10–50k over 4–12 weeks** for a custom app build; the May survey puts full brand identity plus app design at agency comparables of **$25,000–150,000**. Platforms without a design service commonly send the customer here.

**Where they stop.** At project economics. Every build is bespoke, nothing amortises across tenants, and the platform captures none of it. The existence of a third-party re-skin economy is the tell — kvtemplates.com and cherieyoung.com sell named templates across kvCORE, Lofty, Sierra Interactive, Real Geeks and Boomtown because the platforms themselves cannot differentiate their tenants.

**Real alternative for the buyer?** **Yes, by displacement.** The budget being attacked is the custom-build budget, not the theming budget. This is the [[Freelance_Conversion_Thesis]] returning inverted: agencies were ruled out as the *buyer*, but agency-grade output is what the product sells, to platforms. [[AI_Design_Compression]] is the reason the cost structure can differ by an order of magnitude.

**The bar this sets, stated correctly.** Not parity. *Close enough at a fraction of the price* — the Squarespace, Canva and Shopify-themes shape, where the price difference makes the craft comparison stop mattering. What the structural scope change moved is the comparison target (a custom build rather than a generic template), not the requirement. The 76 generated brand themes have never been evaluated against a custom build, and "a fraction of the price" is meaningless until the fraction has a number — see *What is undefined* below.

## Coding agents — the shelf this must not be filed on

**What they are.** Claude Code, Codex, Cursor, and general AI app builders like Lovable and Bolt. In F26 specifically, "agentic coding agent" is a crowded shelf, and a reader who files the company there stops reading.

**Where they stop.** They are general-purpose capability, not a product for this buyer. No per-tenant fleet model, no coherence guarantee across modalities, no accept condition on output, no invariant that makes the result safe to merge into a production app, no integration surface a platform can adopt. They are also *inputs here*: the layout agent runs on Codex and Claude Code headless.

**Why this isn't one, and it is architectural rather than rhetorical.** The engine is explicitly two parts:

1. **Assets are data, so a pipeline generates them.** The app-agnostic dependency DAG ([[Orchestrator]]) resolves palette, typography, copy, icons and images: four base OKLCH slots in a single call with **WCAG AA enforced as an accept condition** before the result is accepted, the rest of the palette derived deterministically in Python, fonts validated live against the Google Fonts catalogue, copy length-bounded, and [[Modal_Coherence|coherence]] achieved structurally by feeding the shared derived palette into every image prompt and folding `depends_on` style references between slots. Cost is bounded and known per run; the graph is validated before any paid call; failures degrade gracefully.
2. **Layout is code, so an agent writes it.** Layout is the one surface no slot inventory can express, so an agent edits the view layer directly in the platform's codebase — under [[No_New_Requests_Invariant|functional equivalence]]: arrangement only, no screen merged or split, no functionality added or removed, API surface provably identical.

Deterministic where determinism is available, agentic only where it is required. One agent doing everything reads as a wrapper over a model; two systems with a clear boundary reads as architecture. It is also better engineering — routing palette generation through a coding agent would be slower, more expensive, non-deterministic, and would discard the WCAG and coherence guarantees the pipeline already provides.

## Adjacent: the platforms themselves

**What they do.** Incumbents are absorbing the AI design layer inside their own products. Shopify Magic, Sidekick, the AI Store Builder and the Horizon theme generate themed storefronts from a brand prompt; Wix shipped Harmony in 2025; Toast added Branded Mobile Apps in late 2024 at $299/mo. In the Shopify-merchant app-builder segment specifically, AI design generation has already shipped: Taptool's "Theme AI" replicates a merchant's storefront onto a native shell, Fuego.io generates screens from prompts at $499–999/mo, Appbrew pairs its Milo agent with a human designer, and Themr produces full Liquid themes in roughly 60 seconds at $99/mo.

**Where they stop.** Inside their own vertical and their own shell. None of this is sold to *other* platforms as infrastructure, and the Shopify-side bar is "scan the merchant's existing site and replicate it" rather than generating an original design system per tenant. Outside Shopify e-commerce, the May survey found no AI-design-native white-label product in banking, loyalty, fitness, church, real estate, restaurant, telehealth, hotel, event, crypto, streaming, podcast, sports or nonprofit.

**Real alternative for the buyer?** Not as a purchase — but this is where the honest risk sits, and the ICP change inverted it. Under the old thesis these incumbents were competitors racing to absorb the layer first. Under the new one they are *the buyer*, and the risk becomes build-versus-buy. That risk is conceded rather than argued away: a platform could build this pipeline itself, and the barrier is packaging, not difficulty. The defence is being the default first plus coherence quality and a low-friction [[Integration_Surface]] — **never a moat claim.** A read, not a finding: the Shopify app-builder segment is simultaneously the clearest proof the demand shape is real and the hardest place to sell, because it is the one vertical already served.

## Explicitly not a competitor

**FlutterFlow.** Removed from the set by founder correction: it is app *construction* — "like a Figma that makes live Flutter apps" — not fleet rebranding. It automates building an app from scratch and has nothing to do with theming an existing one. Its removal weakened the earlier "three converging categories" claim to two; recorded here so it does not get re-added.

---

## Gigacatalyst — the adjacent proof

**The company.** Giga Next Inc., **YC Spring 2026**. Founder Namanyay Goel, team of four, San Francisco. Tagline: *"Customize your software to every user with AI."*

**The mechanism.** It embeds inside a B2B SaaS product as a white-labeled feature. **Agentic API discovery** parses the host's endpoints, query parameters and data structures automatically. Their phrasing: built *"on your APIs and design system and governed by your auth and security,"* with **"no changes to the host codebase required."** They generate real code but fence it — *"code runs securely in isolated sandboxes,"* generated apps *"pass validation gates before deployment"* including compile checks, schema validation and security enforcement, and they *"connect only through approved APIs."* Generated apps run beside the host product, inherit its auth and RBAC, and carry versioning, audit trails and a sharing marketplace. An end user types *"build a KPI dashboard for maintenance performance"* and has a working app in about a minute.

**The integration numbers — the most useful data point available.** Their team installs in about **2 days**; **full platform integration takes about 2 weeks**, and they state publicly that it is *"not an instant plug-and-play add-on."* From a funded team of four who built agentic API discovery. Treat two weeks as the **floor, not the ceiling**, and treat *"no changes to the host codebase required"* as the achievable bar, since they hit it. This is the benchmark our own [[Integration_Surface]] gets measured against.

**Traction shape, and the metric vocabulary.** $1M+ pipeline unblocked and $100K churn prevented in six weeks; ~800 features shipped (~2,400 engineering-hours equivalent); 670+ microapps; 90.8% adoption across 946 users. Adoption rate, day-30 retention, pipeline unblocked, churn prevented, engineering-hours saved — that is what this buyer responds to, and **nothing here is currently instrumented to produce any of it.**

**Their problem framing, which is better than ours was.** *"You lose competitive deals — customers choose vendors that have the exact workflow they operate on."* Loss-framed, and it lands with a sales leader rather than only a CFO. The visual analogue is direct — platforms lose deals to whoever's app can actually look like the prospect's brand — and it is now the second half of the value argument alongside [[Tier_Unlock_ROI|tier-unlock]].

### What they validate, and what they leave open

They demonstrate the **functional half of exactly this shape**: per-tenant customization infrastructure embedded in a host SaaS, no changes to the host codebase, live with Series B companies. That validates **the buyer, the motion, and the architecture pattern** — without occupying the visual half. The founder's read, accepted: *"im in visuals they are in features, its a different."*

It also reframes a crowded adjacent market as evidence of value rather than as a warning, and it normalises the forward-deployed first year: that is the standard shape for this product category, not a concession.

### The visual half is the structurally easier half

This is the load-bearing argument, and it is evidenced rather than assumed. Gigacatalyst generates **working software against live customer data**, with inherited auth and RBAC, sandboxing, versioning and audit trails. **A bad output for them is a security incident. A bad output here is ugly.** There is no data model to get wrong, no permissions to leak, no correctness contract to violate.

Our constraint is also strictly **tighter** than theirs: they generate new functionality against newly discovered APIs, which is precisely why they need API discovery, approved-API scoping and schema validation. A redesign under [[No_New_Requests_Invariant|functional equivalence]] rearranges components already bound to existing data — nothing new is fetched, nothing new is written, and the entire class of problems their architecture exists to contain cannot occur. That asymmetry is the strongest available argument that the ambitious version of this ([[Full_Visual_Redesign]], layout included) is reachable.

**What does not transfer.** Everything they generate is **additive** — a new dashboard, a new tab, a new view — which is *why* sandboxing works: the artifact is separable by construction and a broken one leaves the product untouched. A visual redesign is not additive; it modifies screens that already exist. You cannot sandbox a redesign of the host's own home screen. Their safety story does not carry over. Ours is two different things: functional equivalence a platform's own engineers can verify, and **never writing to their trunk at all** — Recompose maintains a tokenized fork as its base, and each tenant's design as a further fork, all kept current by an agent. The platform grants read access and nothing else.

Where their answer to *"don't touch our code"* is separability, ours is that **there is no write**. On one axis that is a stronger claim than theirs, since read access does not need the engineering sign-off that write access does. On the other, note the asymmetry honestly: their additive output can be sandboxed and a redesign cannot, because it modifies screens that already exist. Neither story dominates; they solve the same objection from opposite directions.

### The question that needs a prepared answer

**"Why isn't visual just Gigacatalyst's next feature?"** They already parse the host's design system so their generated apps look native. Reading a design system in order to conform to it is genuinely different from generating a new one, so the distinction holds — but they have built plumbing adjacent to this, and the architectural distance narrowed once the mechanism here became a code-modifying agent inside a host codebase too. The separation is *what each one changes*, not how each one works. **This question is currently unanswered** and it will be asked by anyone who knows them. They were deliberately omitted from the YC competitor answer on the grounds that features and visuals are not competing for the same dollar; the omission is visible to any partner who knows the company.

---

## The empty space, read honestly

**No verified player closes the loop:** brand brief → coherent multi-modal asset set → **store-ready production app**, across a **fleet of tenants on a shared shell**. Token tooling stops at tokens. Brand APIs stop before any app ships. Design tools stop at a mockup a human implements. In-platform design services and agencies close the loop with people, one customer at a time. Both May surveys reached the same conclusion independently: every primitive has existed for 12–24 months, the loop is assemblable today by stitching six to eight vendors, and **the integrator has not been built.** That gap is [[Closed_Design_To_Production_Loop]] and it is the whole company.

**An empty space is evidence of an opportunity or evidence of a market nobody wants, and this has not been tested.** The May survey's own verdict was *"either evidence the structural barriers are larger than they look, or evidence the window is wide open. The honest read is: both, in different verticals."* That has not been resolved by anything since. What is on the record:

- **Nobody has asked for this.** The origin is a realisation while building a white-label app, not a request from any platform.
- **No named target platform and no named human at one exists yet.** This is the biggest open hole and nothing else moves until it closes.
- **No outside party has responded to anything in roughly eight months across six strategic phases.** This competitive read is entirely desk research. The instrument that would test it is live theming of the example app against a prospect's own biggest customers, on a sales call — because the value claim is elapsed time, and elapsed time only proves itself in the room.

Three of the four structural constraints the May survey named as things AI does *not* compress still apply, and only one is answered:

| Constraint | Status |
|---|---|
| Integration/onboarding labor dominates unit economics | **Removed rather than absorbed** — as of 2026-07-28 there is nothing for the platform to integrate; they grant read access and Recompose forks ([[Never_Touch_Their_Code]]). Gigacatalyst's ~2 weeks was the benchmark when an install step existed. The remaining labor is our forward-deployed tokenization pass. |
| Regression-test combinatorics across N themes | **Answered 2026-07-28** — agent-maintained forks re-derived on every upstream change, landing on the `uat` branch ([[Re_Derived_Not_Forked]], [[UAT_Sync]]). Divergence exists in git but never accumulates as human work. |
| End-user willingness-to-pay for brand depth is weak | **Made irrelevant rather than fixed.** App-store reviews of Subsplash-, Mindbody- and Olo-powered apps complain about bugs and slow loading, never about looking generic. The pain is the B2B buyer's ([[Brand_Is_Product]]), which is why the pitch is a price tier the platform cannot scale and the deals it loses on brand — **never** "your tenants will love it." |
| Apple Rule 4.2.6 and per-customer developer accounts | **Probably no longer this product's problem** under the new ICP, since platform customers already ship apps. **Needs confirming.** The old distribution doc stayed behind in the CombatDen vault; there is no Recompose equivalent yet. |

One more constraint the [[Shopify_Pattern]] contributes and which is not answered: ~98.5% of Shopify merchants use stock themes despite a decade of theme infrastructure. Most buyers choose curation over a blank canvas. That is an argument for presets as the demo surface, and an open question about whether depth is what platforms will actually pay for.

## What is undefined

State these as undefined rather than filling them in.

- **Pricing for this ICP.** Undefined. The old $100/$300/$500 ladder was gym-owner pricing and is dead. `YC_Application_F26.md` proposes $100/month per branded tenant as the *platform's COGS* and its own notes hold it as the top of a defensible range rather than a decided number. Per-tenant, per-seat, platform license, revenue share — nothing is decided.
- **The comparison ratio.** Because pricing is undefined, "close enough at a fraction of the price" has no fraction. That makes pricing more load-bearing than it first appeared: the ratio *is* the pitch.
- **Gigacatalyst's pricing.** Not published, so there is no comparable in the nearest analog.
- **Mighty Pro's current price.** Three conflicting figures across sources; unverified.
- **Whether the output clears the bar.** The 76 generated themes have never been evaluated against a custom build, and "close enough" is a judgment made by a person whose identity decides the deal.
- **Named targets.** Zero. Start with platforms where every tenant already has their own app — Subsplash, Passion.io, then the fintech four — because the addressable app count equals the tenant count rather than 0.1–3% of it.
