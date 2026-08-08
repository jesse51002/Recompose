---
tags: [business, competition, platform, design, features]
status: current
date: 2026-08-02
---

# Design work vs. feature work at white-label platforms

Concepts touched: [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]].

Two questions, answered by the August 2026 research in `Research/2026-08-02-features-vs-design.md`: when a platform runs a design service, does that team also build features; and will any of these platforms build net-new functionality for a tenant who pays. Line references below point into that file.

---

## The finding

**Most white-label platforms do not build features for individual tenants at all. There is no such thing to buy.** Of 19 platforms researched, 13 have no path by which a tenant gets net-new functionality built for them at any price — the answer is a public API you use yourself, a partner agency, or a roadmap board. Kajabi states it outright: "Kajabi is not able to support inquiries specific to custom coding… we recommend seeking guidance from an expert or developer" (54).

**The clear exceptions are two fintech platforms.** Jack Henry's **Banno** runs a named "Custom Development team" — "Maybe your idea doesn't require a third-party — we build custom features, too" (40). **Backbase** runs a code-writing "Services" organization distinct from product R&D, writing "tailor-made code" per customer (42). Both gate everything behind sales; no pricing, timelines or IP terms are public.

Fintech is not uniform about this, though. **Q2 and Alkami — same vertical — deliberately do not do it**, pushing work to their SDKs and certified partners instead (50, 52). Q2's model is explicitly that partners build and Q2 hosts.

The remaining four cases are narrower than they look: **Tapcart** (commerce) staffs a Solutions Engineer building custom blocks for clients (44); **Trainerize** offers "custom-built widgets" only at Enterprise with 5+ locations (46); and **GoodBarber** and **BuildFire** sell custom development to their **reseller and agency base**, not to end tenants (58, 60).

**The second finding follows from the first.** Where a design service does exist, it is design-only — icons, splash screens, store listings, brand colors — staffed by graphic designers or folded into onboarding and customer-success roles. It does not write code for tenants. Design and feature work are separate teams, separate SKUs and usually separate budgets.

## Design services are design-only

| Platform | What the design function is | Line |
|---|---|---|
| **Circle** | "Design Studio" is Circle's **internal marketing design team** — "the creative engine behind all of Circle's marketing design… product launches and campaigns to events, advertising, social, motion, and visual identity systems." Senior Brand Designers and Growth Designers. ~4 people out of ~160. No solutions-engineering role found | 15 |
| **Mighty Networks** | Design customization plus VIP technical support, monthly strategy calls, launch and migration help. Explicitly a done-for-you launch and strategy service. No professional-services engineering role found | 17 |
| **Passion.io** | Team builds the app, handles content migration, manages App Store submission, provides a dedicated success manager. New features roll out platform-wide automatically | 19 |
| **Vagaro** | Dedicated "Design Services Team" of in-house graphic designers — logos, brand kits, splash images, app icons. Flat fee. The branded app is *themed* by this team, "not custom-coded" | 21 |
| **Mindbody** | Design mock-up for approval, then a launch team builds the app. Client-facing staff are Solutions Consultants and Client Implementation Managers. Anything bespoke goes to an **external Certified Consultants marketplace** | 23 |
| **Subsplash** | Self-describes as "a design-centric company." Customer Onboarding Specialists provide "consulting, building and graphic design" for paid implementation clients. Reviews say tenants are "limited to features that the platform has built itself" | 27 |

Two exceptions:

- **ABC Trainerize** — the **Enterprise** tier "includes custom-built widgets… non-standard functionality tailored to your business." Custom-priced, gated to 5+ locations (25).
- **Tapcart** — design services sit next to a genuinely separate code-writing function: an "Engineer, Solutions & Services" ($120–140k) "building Custom Blocks and React web apps for existing and prospective clients," plus a Senior React Developer for App Studio Solutions. Clearest case of the two being distinct SKUs under one roof (29).

## Who does what: the full placement

Four distinct things get called "extensible," and the distinction is the whole point. Only (c) is a platform building something for one tenant.

- **(a) Self-serve** — public API, SDK, webhooks, plugin framework, custom CSS/JS escape hatch. The tenant builds it.
- **(b) Partner-built** — a certified agency network builds it.
- **(c) Platform-built, paid** — the platform's own engineers build a custom feature for one tenant as a priced engagement.
- **(d) Roadmap influence only** — requests enter the general roadmap, nothing exclusive.

**Category (c) is rare and concentrated in fintech.**

| Platform | Category | Evidence | Line |
|---|---|---|---|
| **Banno / Jack Henry** | a+b+**c** | Named **"Custom Development team"** — "Maybe your idea doesn't require a third-party — we build custom features, too… our custom integrations team is here to build it for you." May involve an additional contract | 40 |
| **Backbase** | a+**c** | Code-writing **"Services" organization** distinct from product R&D: "Your tailor-made code seamlessly integrates our products with customers' systems" | 42 |
| **Tapcart** | a+b+**c** | Solutions & Services Engineer builds custom blocks and React apps for clients | 44 |
| **ABC Trainerize** | **c**, narrow | Enterprise custom-built widgets, 5+ locations | 46 |
| **GoodBarber** | a+b+**c** for resellers | "If you don't have the necessary resources, you can rely on our team of experts, who offer custom developments for resellers" — quote-based | 58 |
| **BuildFire** | a+b+**c** | "Hire BuildFire's team of experts… to build features not currently available in BuildFire," sold as a Professional Services tier | 60 |
| Q2 | a+b, deliberately not c | Caliper SDK plus certified third-party developers; Q2 hosts and deploys. Pushes code to partners rather than building bespoke | 50 |
| Alkami | a+b | APIs, extensible SDK, One-Click SDK Manager. No evidence of bespoke single-tenant builds | 52 |
| Kajabi | a+d | API, webhooks, Liquid/HTML/CSS/JS. Explicitly **will not** support custom coding — "we recommend seeking guidance from an expert or developer" | 54 |
| Toast, Olo, ServiceTitan | a+d | Robust public APIs. Feature work is done by internal product engineers for the whole base. Client-facing roles are Implementation Specialists, not feature builders | 64 |
| Mindbody | b | Outsourced to Certified Consultants | 66 |
| Mighty Networks, Passion.io, Circle | a+d | Features ship platform-wide; requests enter a general roadmap | 68 |

## Professional services is small and shrinking

At the public companies, the closest financial proxy is a minor line and deliberately not grown (32, 52):

- **Olo** — Professional Services and Other was **$3.384M of $284.938M** total revenue in FY2024 (**1.19%**). Management said they prioritize upselling platform modules "rather than growth in professional services."
- **Toast** — hardware plus professional services was **$180M of $6,153M** in FY2025 (**2.9%**).
- **Alkami** — subscription revenue was **~95%** of total in FY2025, implying ~5% from professional and implementation services.

This is the financial signature of a function that exists to enable subscription revenue, not to earn on its own.

## What this means for Recompose

**The no-new-features invariant matches a line these organizations already draw.** [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]] is not a constraint being imposed on the buyer — design and feature work are already separate teams, separate SKUs and separate budgets almost everywhere. A platform adopting [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] does not have to reorganize anything, and the deliverable slots into a boundary that already exists. That removes an objection at the [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]].

**"No new features" is already the platform's own answer to its tenants.** At 13 of 19 platforms there is no way for a tenant to get functionality built, at any price. So a tenant who asks Recompose for a feature and is refused gets exactly the answer their platform already gives them. The invariant does not create a new disappointment; it inherits an existing one. Where category (c) *does* exist — Banno, Backbase, Tapcart, GoodBarber, BuildFire, Trainerize Enterprise — those requests have a paid path to be routed to, which makes the line easier to hold rather than harder.

**Fintech is where (c) concentrates, and it is also where visual differentiation is resisted.** `Research/2026-05-01-ai-brand-competitor-analysis.md:45` records WCAG enforcement baked into Alkami's Theme Builder, ADA-compliant outputs at Banno, SOC 2 review per change, Alkami's 240+ FI apps sharing visual DNA on purpose, and every banking AI announcement 2024–2026 being end-user AI rather than design AI. Best custom-dev muscle, weakest appetite for the product.

**There is rarely a person whose team is being replaced.** `Open_Questions.md:57` anticipated a lukewarm technical review from someone with a reason to find fault. On this evidence that person often does not exist — the roles are Solutions Consultants, Client Implementation Managers, Customer Onboarding Specialists, and marketing designers. Lower political risk, but also no internal owner who wants the purchase to succeed.

## What is not established

- **No direct tenant quote confirming a platform built them a custom feature** was found for any platform (96). Category (c) is inferred from job postings and vendor marketing copy.
- No public dollar figures, hourly rates, minimums, timelines, or IP/exclusivity terms for Banno's or Backbase's custom development — all gated behind sales (95).
- Team sizes for most design and professional-services sub-teams are not public (98).
- Thirteen platforms went unresearched, including BentoBox, Owner.com, Zenoti, Boulevard, Nudge Coach, Disciple Media, Arketa, Everfit, Tithe.ly and Ministry Brands (97).

> [!note] On the source doc
> `Research/2026-08-02-features-vs-design.md` ends with a Recommendations section written for a buyer shopping for a platform, not for Recompose. That is an artifact of how the research was commissioned. Do not read it as strategy.
