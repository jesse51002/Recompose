---
tags: [research, competition, pricing, white-label, design-service]
status: current
date: 2026-08-02
---

# How white-label platforms deliver design today

Concepts touched: [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]].

Extracted 2026-08-02 from two superseded strategy docs in the pre-Recompose lineage — `Business/Pricing.md` and `Business/Differentiation.md` in the AICustomizableWhiteLabeled vault (both April–May 2026), which are not carried here because their ICP and pricing positions are dead. Two things below survive the change of company: platforms already charge for design delivery, and the ones who charge most cannot build the replacement themselves. Read the prices as **revenue lines, not cost lines** — [[Research/2026-08-02-enterprise-tier-anatomy|Research/2026-08-02-enterprise-tier-anatomy.md]] and [[Research/2026-08-02-attach-rate|Research/2026-08-02-attach-rate.md]] carry the correction.

> [!warning] Do not quote the precise figures
> Everything in the table is May 2026 and read off public pricing pages, not from anyone inside a platform. At least one figure is already known stale: [[YC_Application_F26|YC_Application_F26.md]] records current sources putting Mighty Pro at **$3,000–5,000+/month**, one citing **$28k/year**, against the $1,167 below. Quote ranges. A precise stale number in front of a buyer is a liability. Same instruction as [[Customer_ICP|Customer_ICP.md]].

---

## What design costs in this market

| Platform | Price | How design is delivered |
|---|---|---|
| Skool | $99/mo | None. Customization intentionally refused. |
| Kajabi (Pro) | $179–$399/mo | Template only |
| Kajabi + branded app add-on | $179 + $199 = $378/mo | Template on Kajabi shell |
| Trainerize Studio CBA | $250+/mo | Logo, palette, splash screen |
| Mighty Pro entry | $360+/mo | Light customization |
| Passion.io SaaS | $99–$599/mo | Template + logo |
| **Passion.io DFY** | **$10k–$20k setup + SaaS** | **Human design service** |
| **Mighty Pro Whitelabel** | **$1,167+/mo** (likely $3–5k+ now) | **Human "Design Lab" team** |
| **Hivebrite** | **Custom enterprise (~$30k/yr)** | **Human design studio** |
| Custom freelance dev | $50k–$250k upfront + 15–25%/yr | Human, from scratch |

The bolded rows are the direct evidence that a design service exists as a **revenue line** — a price a platform charges its tenant, delivered by people the platform employs or contracts. Note what they are not: evidence of platform *cost*. [[Research/2026-08-02-enterprise-tier-anatomy|Research/2026-08-02-enterprise-tier-anatomy.md]] establishes that these are tier prices covering migration, a named strategist and App Store operations, and that the design work priced standalone runs $99–$499.

The unbolded rows are the counter-evidence and should be read as such. Most of the market stops at logo-and-palette and charges nothing extra for it, which means most platforms have no design line item to replace and no internal price to anchor against.

## Why the platforms who pay for design can't build the replacement

The generic worry is that incumbents capture the compressed-labor layer themselves — Squarespace beat freelance designers, Canva beat graphic designers, Shopify shipped Magic, Wix shipped Harmony, Kajabi did a substantial AI relaunch in September 2025. That pattern is real, and it applies to platform-tier incumbents with hundreds of engineers and an AI mandate from leadership.

It applies much more weakly to the mid-tier vertical white-label specialists — the Trainerize and Passion.io tier, which is where the design-service line item actually sits. For one of them to ship this themselves requires:

1. Tokenizing a design system that is almost certainly hardcoded today, not parameterized
2. Integrating multiple generation pipelines (illustration, palette, typography, motion, copy) at production quality
3. Building the coherence layer that keeps those outputs looking like one designer made them
4. Building per-modality override and regeneration UI
5. Maintaining backwards compatibility with thousands of already-shipped tenant apps, including code signing, certificates, and App Store linkage continuity
6. Replacing or retraining the human design team the service currently runs on

That is a 12–18 month architectural rebuild for an engineering org of roughly 20–40 people whose roadmap is already saturated with integration requests, App Store policy compliance, and feature-parity demands from existing tenants. The cheaper path available to them is bolting shallow AI onto the existing template system — AI logo generators, AI palette suggestions, AI bio writers, an AI-assisted theme picker. That is what they are most likely to ship, and it does not close the gap.

Two caveats worth keeping honest. This argument was written in May 2026 by the founder as pushback in an office hours session ([[Office_Hours/2026-05-01-18-Office_Hours_External_Critique_and_Peak_End_Design|Office_Hours/2026-05-01-18-Office_Hours_External_Critique_and_Peak_End_Design.md]]), not from evidence about any specific platform's roadmap or engineering headcount — the 20–40 figure is an estimate, not a datum. And it was written when the scope was assets only; under [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] the build the platform would have to do is *larger*, not smaller, since it now includes the front-end engineering as well as the design, which strengthens the argument in the same direction it already points.

## What this does not establish

- Whether any specific platform actually staffs design in-house, outsources it, or charges a setup fee. Every figure above is a public price, not an org chart.
- Whether tenants care enough about design to drive the platform's demand. This documents supply-side cost, not demand.
- What a platform earns per tenant, which is the denominator the pricing question needs.

## Shows up in

- [[Competition|Competition.md]]
- [[Customer_ICP|Customer_ICP.md]]
- [[YC_Application_F26|YC_Application_F26.md]]
