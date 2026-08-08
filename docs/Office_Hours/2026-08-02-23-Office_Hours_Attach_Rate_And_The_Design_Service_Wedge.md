# Office Hours: Attach Rate, and What the Design-Service Wedge Actually Buys

**Date:** 2026-08-02
**Status:** APPROVED
**Mode:** Startup, evidence review — three commissioned research passes plus live web verification
**Builds on:** [[Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company|Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md]], [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]]

Concepts touched: [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]], [[Concepts/Business/Strategy/Shopify_Pattern|Shopify_Pattern]].

> Session opened as a research-migration task — pull the useful lineage research out of the CombatDen and AICustomizableWhiteLabeled vaults ahead of a possible YC interview — and turned into an evidence review that broke three claims the vault had been treating as settled. The founder commissioned three research passes over the session (design vs. feature work, build vs. buy, attach rate) and repeatedly refused explanations that did not cohere, which is what surfaced the errors. The product did not change. The evidence under the value argument did, and so did the ICP filter. Produced one pivot: [[pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps|pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps.md]].

---

## Problem statement

The session began with a narrow ask — migrate the relevant research from the two predecessor vaults into Recompose, because if the YC F26 application produces an interview the binding constraint is industry knowledge about the white-label space. It became four questions in sequence, each forced by the last one's answer being unsatisfying:

1. What research already exists, and what does it actually cover?
2. When platforms run a design service, is that team design-only, or does it also build features? And will any platform build net-new features for a paying tenant?
3. What is a platform's premium branded-app tier actually charging for, given the design deliverables are three files?
4. How many tenants ever buy that tier?

Question 4 was the one the vault most needed and had never asked.

---

## What carries from prior sessions

Untouched by anything found here:

- The mechanism. Assets by pipeline, layout by agent, [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] in scope, no new features.
- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]] as the safety property. **Strengthened, not weakened** — see below.
- Never touching the platform's trunk; read access as the whole integration; UAT as the landing branch.
- The autonomy promise and the halt-rather-than-ship property.
- "Close enough at a fraction of the price," explicitly not parity.
- Pricing for this ICP remains undefined. Nothing here settles it.
- Zero customers, no named target platform, no outside party has responded to anything.

---

## What this session changed

### 1. The design-service P&L claim is wrong, and it was load-bearing

P1a held that a platform running a design service can "read the value off a P&L — they have a **headcount line**, a per-customer cost, and a delivery time to compare against." Three of those four words survive contact with evidence; one does not.

Circle's entire design department is **~4 people out of ~160**, and its own job postings describe it as the internal *marketing* design team — "the creative engine behind all of Circle's marketing design… product launches and campaigns to events, advertising, social, motion, and visual identity systems." Vagaro's design service is a **$499 flat fee**. ABC Trainerize prices the same class of deliverable standalone at **$99–$169 one-time**. Professional services is **1.19% of revenue at Olo** and **2.9% at Toast**, and Olo's management said on the record they would rather upsell platform modules than grow it.

There is no headcount line. What there is: a **delivery time** (3–6 weeks, consistently sourced across Mighty Pro, Circle, Subsplash and Trainerize) and a **capacity ceiling**.

The founder pushed back hard on the first version of this — "4 people is a lot, that's real salary" — and was right that the money is real. The correction that survived is narrower and better: those four people don't stop existing when tenant design goes away, they go back to marketing work. The saving is recovered capacity, not eliminated headcount, and CFOs discount soft savings.

### 2. The enterprise tier price is not a design price

The $10–30k figures the vault had been anchoring on are **tenant-facing prices for a bundle**, not platform costs for design. Mighty Pro's own services page lists six deliverables and design is one: migration (members, courses, **payments**), a trademarked Community Design™ Plan built on "insights across 450+ 6-and-7-figure businesses," setup, design services, a Pro membership, ongoing reporting.

The dedicated human — the Community Strategist — turns out to do almost nothing related to the app. Their live job posting lists workshops on content cadence and engagement strategy, training on member onboarding flows, and creative input on "landing pages, welcome experiences, email sequences, and network messaging." The engagement sells **migration risk transfer** (if members, courses and payments don't move, the customer's revenue stops), **launch de-risking** (one shot at moving an audience), and **benchmark data no one else has**.

This took three attempts to get right. The first explanation attributed the price to App Store distribution machinery; the founder killed it correctly — Trainerize ships a store app for $149, so distribution can't be what costs $30k. The answer that held is that enterprise tier price tracks the **size of the customer's business**, not the cost of any deliverable, and the design service is the visible artifact that makes a price fence feel like a service.

**Consequence: pitching cost reduction is dead.** There is not enough cost to save. What survives is capacity and throughput — a service with a small cost base and a high price is already profitable and bounded by people, and that ceiling is the thing being removed.

### 3. Attach rate is a function of tenant size, and it is small

The question nobody had asked. One vertical has been measured independently, because Shopify storefronts leak detectable fingerprints:

- **1.73%** of 74,777 indexed Shopify **Plus** stores run Tapcart; total app-builder penetration across Plus is under 2%.
- **0.10%** of 802,852 Shopify stores overall — 788 stores, of which 787 are Tapcart.
- **88.2%** of app-builder stores are on Plus, against **43.7%** of stores overall.

Adoption by traffic tier runs 0.023% → 0.159% → 1.684% → 16.667%. The top figure is exactly 1/6 and probably reflects a six-store bucket, so the session settled on the conservative reading: at least a **70× spread** across tenant size inside one platform at one price. **Attach rate tracks how big the tenant is, not the vertical and not the price.**

This killed an idea raised earlier in the same session. Twice I argued the opportunity was at the bottom of the market — Trainerize's 400,000 trainers getting a $149 skin, a tier that doesn't exist. The Shopify gradient says small tenants don't buy branded apps at any price, so compressing the design cost does not move a tenant who was never going to buy the tier. Retracted.

### 4. The ICP filter inverts

The most useful structural finding: some platforms sell a shared shell and upgrade 1–3%; others have **no shell tier at all**, so every tenant gets their own app and the selection happens at acquisition rather than at upgrade. The second group's attach rate is effectively 100% — not a better conversion rate, a filtered funnel.

If what you want is N — tenants with a branded app today that could be redesigned — the filter is not "runs a design service." It is **"every tenant already has an app."**

| Platform | Tenants with their own app | Source |
|---|---|---|
| Subsplash | 20,000+ churches | Vendor |
| Passion.io | 15,000+ apps launched | Vendor |
| Q2 | 457 installed FIs | SEC 10-K |
| Banno | 300+ FIs | Vendor |
| Alkami | 301 FI clients | SEC 10-K |

Against Circle's ~5,000 creators at 1–3%: roughly 50–150 apps.

### 5. [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]] takes its third independent hit

Across a dozen documented custom-build cases, **design has never been the sole reason** anyone built bespoke. It appears four times, always alongside a functional, cost or control driver. That joins two prior findings: design labor was never the most binding constraint (v1, May 2026), and app-store reviews complain about bugs and slow loading, never about looking generic (v2, May 2026). Three researchers, three methods, one answer.

The honest counter, and the session held it: going bespoke is a six-figure decision and nobody makes it for design alone. Recompose enables a *different* decision — custom-grade design without going custom. Nothing has tested that one.

The most valuable single artifact found all session is the Lumino Studios operator quote: *"we're not copy-cats… every app ends up looking identical… I can open any boutique fitness app and immediately know which software it's running on" — "generic gym app #37."* The sharpest articulation of the problem that exists anywhere in the research, from a real operator. **And they still needed a functional wall — multi-zone access control — to actually move.** So: design is a real, articulated, felt pain that is never sufficient on its own to trigger a purchase.

### 6. [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]] got stronger

Of 19 platforms researched, **13 have no path by which a tenant gets net-new functionality built, at any price.** Kajabi says it outright. The only unambiguous exceptions are two fintech platforms — Jack Henry's Banno ("we build custom features, too") and Backbase's Services organization — and even within fintech, Q2 and Alkami deliberately refuse, pushing work to SDKs and partners.

So "no new features" is not a constraint Recompose imposes on the buyer. **It is the answer the platform already gives its own tenants.** A refused tenant gets exactly what they'd get anyway.

### 7. The white-label layer is durable

White-label dominates every vertical surveyed: 98–99.5% in credit unions (the only hard denominator — NCUA ~4,300 institutions against SEC-sourced vendor counts), 97–99.5% churches, >98% salon/spa, 93–98% fitness, >95% creator. Bespoke is confined to national chains and megachurches.

And it reverses: Red Lobster left Olo, built in-house, **came back in 2025** citing cost-effectiveness and pace of technology. Bloomin' Brands, Brinker and Papa Murphy's all went homegrown → Olo. The buyer's tenant base is structurally stable, which is good for the addressable market.

---

## Premises

**Locked by this session:**

- **L1.** Design services at white-label platforms are design-only. They do not write code for tenants.
- **L2.** The premium branded-app tier is priced on customer scale, not on deliverable cost. Design is one line item of roughly six.
- **L3.** Attach rate on a shell-model platform is single-digit percent or lower, and scales with tenant size.
- **L4.** Cost reduction is not a viable pitch. There is not enough cost.
- **L5.** Most platforms do not build features for tenants at all. The no-new-features invariant matches an existing organizational line.
- **L6.** Delivery time (3–6 weeks) is the defensible half of the ROI claim.

**To test:**

- **T19.** Does attach rate respond to design quality at all? The size correlation suggests the binding variable is tenant scale, which no design improvement changes. **This is now the most important open question in the vault.**
- **T20.** What is the attach rate at a no-shell platform for a *redesign*, as distinct from an initial app? Undefined and unmeasured.
- **T21.** Does the platform-to-platform switching mechanism carry design as a driver? The only evidence is two vendor testimonials (Circle, Mariana Tek). It is the sole thread pointing at the lost-deals half of the value argument.
- **T22.** Container-app tenants have no per-tenant binary. Does Recompose target them, and what does the product look like if it does?

---

## Approaches considered

**Keep the design-service wedge and soften the language.** Rejected. The problem is not phrasing; the P&L line the wedge depends on isn't there. Softening would preserve a claim that fails on the first sales call where someone knows their own numbers.

**Pivot to the bottom of the market — many small tenants, no human design possible.** Raised mid-session, then killed by the Shopify gradient. Small tenants don't buy branded apps at any price.

**Filter on "every tenant already has an app."** Accepted. Better evidenced (two of five candidates are SEC-sourced), selects for large N, and selects for platforms where a redesign has something to act on.

**Lead with credit unions, the only vertical with a hard denominator.** Rejected as a lead, kept as context. ~4,300 institutions, ~99% on vendors, a four-name vendor list — but banking actively resists visual differentiation: WCAG enforcement inside Alkami's Theme Builder, SOC 2 review per change, 240+ Alkami FI apps sharing visual DNA deliberately. Highest N, lowest appetite.

---

## Recommended approach

Target platforms where **every tenant already has their own branded app**, and pitch **capacity and delivery time**, never cost reduction.

**Subsplash is the single best-fitting candidate in all the research.** 20,000+ tenants each with their own app; no regulatory pressure toward visual sameness; an existing paid design and onboarding function; and a documented churn quote naming customization limits as the reason for leaving. The open variable is the July 2025 Roper Technologies acquisition at $800M — Roper runs its companies for margin, which reads either as receptiveness to cost structure or as no appetite for new vendors.

---

## Open questions

- **Does the attach-rate finding change the pricing model?** [[YC_Application_F26|YC_Application_F26.md]] computes $4.8M/year from Subsplash at a 20% upgrade rate. For Subsplash specifically that may be conservative — it has no shell tier, so all 20,000 churches already have apps. For any shell-model platform it is off by an order of magnitude. Unresolved.
- **Which architecture is targeted — per-tenant binary or container app?** Subsplash runs both. Container tenants have no separate binary, which changes the product's shape.
- **Is there an internal champion at all?** The roles found are Solutions Consultants, Client Implementation Managers, Customer Onboarding Specialists and marketing designers. The feared hostile head-of-design usually doesn't exist. Lower political risk, but nobody whose job improves if the purchase succeeds.
- **Pricing.** Still undefined. Nothing here settles it.

---

## The assignment

Unchanged in shape from 2026-07-27, sharpened in target:

1. **Ten named platforms where every tenant already has an app**, with a named human at each. Start with Subsplash, Passion.io, then the fintech four.
2. **On every call, ask two questions instead of "how many customers do you have":** *how many tenants are live on the branded tier today*, and *how many branded apps did you ship last quarter*. The second is harder to deflect and returns a run rate rather than a stock. Refusal to answer either is itself informative.
3. **Run the live-theming call.** Unchanged and still the instrument — elapsed time in the room is the entire value claim.

---

## What I noticed about how you think

**You do not accept a satisfying explanation that isn't internally consistent, and this session that was worth more than any research pass.** Three times an answer was wrong and three times you caught it by checking coherence rather than by knowing the fact. When the price was attributed to App Store distribution, you replied that getting on the store is basic and available at $149 — which is exactly right and killed the explanation. When "four people is small" was doing too much work, you priced it yourself. When a $30k figure had been repeated four times, you asked where it came from, and the answer was that nobody knows.

Every one of those pushbacks improved the output. The pattern is that you audit whether the pieces fit together, not whether they sound plausible — which is the failure mode most likely to catch a confident wrong answer from an assistant or a research agent.

**The counter-observation, and it matters more now than it did:** the corrections this session are all evidence corrections, and every one of them arrived from research rather than from a person. After eight months and six strategic phases, no outside party has responded to anything. The three research passes here are the most rigorous work in the vault and none of them can tell you whether a platform will buy. T19 — whether attach rate responds to design quality at all — cannot be answered by any amount of further research. It needs a sales call.
