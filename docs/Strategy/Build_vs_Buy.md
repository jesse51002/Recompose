---
tags: [business, market, competition, build-vs-buy, verticals]
status: current
date: 2026-08-02
---

# Build vs. buy: who runs white-label, and why the few who leave go custom

Concepts touched: [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]].

Findings from the August 2026 research in [[Research/2026-08-02-why-custom|Research/2026-08-02-why-custom.md]]. Line references point into that file. Two questions: what share of businesses with a mobile app run white-label versus a bespoke build, and why the ones who build, build.

---

## The split, by vertical

No precise split is measurable from public data anywhere. Every figure is a bounded estimate with a stated derivation. **White-label dominates in all eight verticals surveyed.**

| Vertical | White-label | Bespoke | Confidence | Denominator quality |
|---|---|---|---|---|
| **Credit unions** | **98–99.5%** | <1–2% | **High** | NCUA ~4,300 institutions + SEC-sourced vendor counts |
| Salon / spa | >98% | <2% | Moderate | Vagaro 220,000 businesses (marketing) |
| Churches | 97–99.5% | <1–3% | Moderate | Hartford ~373,000 congregations |
| Fitness / gyms | 93–98% | 2–7% | Low-moderate | Trainerize 400K trainers, Mindbody 35K (both marketing) |
| Community / creator | >95% | <5% | Low-moderate | Circle 5,000+ creators (marketing) |
| Field service | ~90%+ consumer-facing; ~100% for the ops app | small | Low | ServiceTitan ~10,800 customers (SEC) |
| Real estate | ~70–85% | ~15–30% | Low | No clean count of agents with their own app |
| Restaurants | ~50–75% | ~25–50% | Low | Toast ~164,000 locations, Olo ~90,000 (SEC) |

Bespoke builds concentrate almost entirely among **national chains, megachurches, and the largest brokerages** — organisations that can staff an engineering team. Independent studios, small churches, solo agents and single-location restaurants essentially never build.

Two denominators are worth carrying separately because they cap every TAM figure:

- **"Has an app at all" is a far smaller set than "is a business in the vertical"** (29). Most small churches, independent salons, solo agents and small gyms have no dedicated app. The meaningful ratio — share of *app-having* businesses on white-label — runs much higher than tenant count ÷ business population.
- **Restaurants blur the line** (55). A large chain's app can be bespoke on the front end while running Olo's or Toast's ordering engine underneath, so carrying a vendor SDK does not mean the app is white-label. This is why the restaurant confidence is low.

## Why the few who go custom, go custom

Roughly a dozen documented cases. The evidence is thin and selection-biased toward organisations with in-house engineering that blog about it (111).

| Reason | Cases | Evidence quality |
|---|---|---|
| **Control / data / integration** | **6** | Strong for Compass and UW Credit Union |
| Cost at scale | 3 | Moderate; often agency-sourced |
| Functional wall | 3 | Strong for Lumino and MSUFCU |
| Performance / reliability | 2 | Moderate-strong |
| Design / brand as a **co-driver** | 4 | Weak-moderate; mostly vendor testimonials |
| **Design / brand ALONE** | **0** | Not found in any credible first-hand case |

**Control and data is the dominant driver.** Compass built three proprietary native apps to keep the agent-client workflow and leads in-house rather than leaking them to portals. UW Credit Union's VP of E-Commerce Eric Bangerter: *"We don't want to build tools that already exist and we can't improve on… Because we do the integration, we don't have some of these problems… we can collect data and integrate it into our other systems"* (128).

**Functional walls are the sharpest.** Lumino Studios left bsport because it "didn't support open access control" for multi-zone locations and its API "couldn't support" user progress, coach reviews and class ratings (136). MSUFCU's CDO Benjamin Maxim: vendors *"were just not keeping up with what we needed to do… so we built our own apps, our own websites and our own online bank"* (137).

## The design finding

**Design has never been the sole documented reason for a custom build** (122, 145). It appears in four cases, always alongside a functional, cost or control driver.

The most design-forward case in the whole sample is **Lumino Studios**, and it is the sharpest articulation of the problem Recompose exists to solve, from a real operator (143):

> "we're not copy-cats… every app ends up looking identical… I can open any boutique fitness app and immediately know which software it's running on" — "generic gym app #37"

**And they still needed a functional wall — multi-zone access control — to actually move.**

The two closest-to-design-alone cases, Circle's *"how the platform looks and feels is really important to me"* and Mariana Tek's *"never puts its own branding in front of your clients"*, are both vendor testimonials and both **platform-to-platform switches, not bespoke builds** (144).

The precise finding is therefore not "design does not matter." It is: **design is a real, articulated, felt pain that is never sufficient on its own to trigger a purchase decision.**

## Reverse migrations

Custom-back-to-platform moves are the strongest evidence that the build case does not survive multi-year maintenance (147–151):

- **Red Lobster** was an early Olo adopter, built homegrown digital ordering in 2023, and **rejoined Olo in 2025** — per Olo's 26 June 2025 announcement, returning "after a brief departure to pursue an in-house digital ordering solution… citing the platform's enhanced capabilities, cost-effectiveness, and ability to keep pace with evolving technology trends." CMO Nichole Robillard: *"While we gained valuable learning from our internal development efforts, we're thrilled to be partnering with Olo again."*
- **Bloomin' Brands** (Outback), **Brinker** and **Papa Murphy's** all moved homegrown → Olo.
- **MSUFCU** built everything in house, then partnered with the CUSO CU NextGen (Nextly) citing staffing challenges.

## Two structural findings

**Container apps.** Subsplash runs both models simultaneously — standalone apps under each church's own developer account, *and* "The Church App," a single container that, in Subsplash's own support docs, "houses many of our apps all under a single roof" (14). Planning Center's Church Center, Tithe.ly's Church App and Pushpay's My Church do the same. A tenant inside a container has no per-tenant binary and is invisible to any app-store census. This matters for product shape as much as for measurement.

**In SMB verticals, "going custom" means switching vendors** (111). Small churches, boutique gyms, solo creators and individual agents almost never build — they move to a different white-label platform. Platform-to-platform switching is the competitive dynamic that actually exists at the bottom of every market.

## What this means for Recompose

**[[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]] is under strain, and this is the third independent convergence.** `Research/2026-05-01-ai-brand-competitor-analysis.md:3` found design labor was never the most binding constraint. `Research/2026-05-01-ai-brand-competitor-analysis-v2.md:47` found app-store reviews complain about bugs and slow loading, never about looking generic. This finds zero design-alone custom builds. Three researchers, three methods, one answer.

**But this research tests a different decision than the one Recompose enables.** Going bespoke is a six-figure commitment; nobody makes it for design alone, and it would be surprising if they did. Recompose's proposition is custom-grade design *without* going custom. The absence of design-driven bespoke builds is weak evidence about design-driven tier upgrades — which is the purchase that actually matters, and which nothing has yet measured.

**It does bear on the lost-deals half of the value story.** `Journey.md:105` names two halves: tier-unlock and competitive deals lost on brand. Nothing here tests tier-unlock. On lost deals it cuts both ways — no design-driven churn *to custom*, but the two design-cited cases in the sample are platform-to-platform switches, which is the mechanism lost-deals actually describes. Weak evidence, vendor-sourced, but it is the only thread pointing at the mechanism.

**The white-label layer is durable, which is good for the addressable market.** Reverse migrations mean the platforms Recompose sells to are not being eroded by in-house builds. Their tenant bases are structurally stable.

**Credit unions have the only hard denominator, and the worst appetite.** ~4,300 institutions, ~99% on vendors, a vendor list four names long. But `Research/2026-05-01-ai-brand-competitor-analysis.md:45` documents banking actively resisting visual differentiation — WCAG enforcement in Alkami's Theme Builder, SOC 2 review per change, 240+ Alkami FI apps sharing visual DNA on purpose. Cleanest market, hardest sell.

## What is not established

- Any precise split, in any vertical. All eight figures are bounded estimates.
- Whether design drives *tier upgrades*, as distinct from bespoke builds. Untested.
- Most vendor tenant counts are unaudited marketing figures (Trainerize, Subsplash, Vagaro, Mindbody, Circle) and are typically global rather than US-only. SEC-sourced counts (Toast, Olo, Alkami, Q2, ServiceTitan) are more reliable but also often global.
- The Q2 sample is a dozen cases and selection-biased. The strongest independent sources are the Compass engineering blog, CU Management on MSUFCU, and The Financial Brand on UW Credit Union; the rest is agency and vendor case studies, which systematically overstate design as a motive.

> [!note] On the source doc
> [[Research/2026-08-02-why-custom|Research/2026-08-02-why-custom.md]] closes with a Recommendations section addressed to someone choosing between white-label and custom for their own business, not to Recompose. That is an artifact of how the research was commissioned. Do not read it as strategy.
