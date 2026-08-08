---
tags: [research, market-sizing, attach-rate, white-label, pricing]
status: current
date: 2026-08-02
---

# Attach rate on the branded-app tier

Concepts touched: [[Tier_Unlock_ROI]], [[Shopify_Pattern]], [[Brand_Is_Product]].

How many of a platform's tenants actually buy the branded-app tier. This is the multiplier on every revenue estimate for Recompose and no vendor publishes it. One vertical has been measured independently; everything else is inference from price ratios. Compiled 2026-08-02.

---

## The only measured vertical: Shopify

Shopify storefronts leak detectable technology fingerprints, so third parties can count app-builder adoption directly. Two independent 2026 datasets:

- **Storeleads (May 2026)** — **1.73%** of 74,777 indexed Shopify **Plus** stores run Tapcart. Total mobile-app-builder penetration across Plus is under 2%.
- **StoreInspect** — across **802,852** Shopify stores, only **788** had a detectable mobile app builder: **0.10%**. Of those, 787 were Tapcart and 1 was Plobal.

### The size correlation

**88.2% of stores with an app builder are on Shopify Plus, against 43.7% of stores overall.** This is the most robust finding in the dataset and does not depend on any small bucket.

Adoption by monthly traffic tier:

| Traffic | Adoption |
|---|---|
| under 50K | 0.023% |
| 50K–200K | 0.159% |
| 200K–1M | 1.684% |
| 1M+ | 16.667% |

> [!warning] Verify the top bucket before using the full gradient
> **16.667% is exactly 1/6**, which usually indicates a denominator of six. If the 1M+ bucket holds a handful of stores, that figure is a single observation presented as a rate, and the headline "~700× spread" rests on it. The 1.684% row may have the same problem. Bucket sizes are not published in the source. Without them, the defensible gradient is 0.023% → 0.159% → 1.684%, a ~70× spread, which makes the same point. Prefer the 88.2%-vs-43.7% comparison, which is not exposed to this.

**The finding, stated conservatively: attach rate tracks tenant size, not vertical and not price.** Adoption rises by at least an order of magnitude across the tenant-size range inside a single platform at a single price point.

## Inferred rates elsewhere

No creator, fitness or wellness platform discloses tier mix. The following are derived from published price ratios and stated customer economics. None are measured.

| Platform | Estimate | Basis | Confidence |
|---|---|---|---|
| Tapcart (Shopify Plus) | **1.73%** | Storeleads count | **Measured** |
| Tapcart (all Shopify) | **~0.10%** | StoreInspect count | **Measured** |
| Mighty Networks → Pro | ~1–3% | Price and host-earnings ratio (below) | Inferred |
| Kajabi → branded app | mid-to-high single digits | $199/mo add-on is a 50–130% increase on base | Weak inference |
| ABC Trainerize → Studio/Enterprise | low single digits | Apple-listing tier requires multi-location; base is solo trainers | Weak inference |
| Vagaro → branded app | <1% | $100 + $100/mo against a ~$24/mo base — triples or quadruples the bill | Inferred |

The Mighty Networks derivation is the strongest of the inferences: Mighty Pro is reported to start near **$33,000/year** for the Essential package against a Launch plan under $100/month, and Mighty's marketing puts the typical Launch host at **$14,400/year** in earnings against an average of **$490,000/year** for Pro hosts. A 34× revenue gap between tiers implies Pro draws from a thin top slice of the base.

> [!note] Two claims in this section are unsourced and load-bearing
> The **$33,000/year Mighty Pro Essential** figure is more specific than anything otherwise verifiable — see `Research/Enterprise_Tier_Anatomy.md`, which records that every Mighty price in circulation is a third-party estimate spanning $1,167/mo to $30k/yr. And the claim that **one-third of Mighty Pro customers tried custom development first and abandoned it** is a strong signal if traceable. Neither arrived with a source. Confirm both before use.

## The structural finding: two models, similar output

Some platforms sell a shared shell to everyone and upgrade a small percentage to a standalone branded app. Others have **no shell tier at all** — every tenant gets their own app, so the selection happens at acquisition rather than at upgrade.

The second group's attach rate is effectively 100%, which is not a better conversion rate. It is a filtered funnel: they never sell to the tenants who would have stayed on a shell.

**Both models converge on a similar absolute number of standalone branded apps.** The count of genuinely standalone white-label apps in the world is small either way.

### Platforms where every tenant already has an app

| Platform | Tenants with their own app | Source quality |
|---|---|---|
| Subsplash | 20,000+ churches | Vendor marketing |
| Passion.io | 15,000+ apps launched | Vendor marketing |
| Q2 | 457 installed FI customers | SEC 10-K, Dec 31 2025 |
| Banno (Jack Henry) | 300+ FIs | Vendor |
| Alkami | 301 FI clients | SEC 10-K, Dec 31 2025 |

Against a shell-model platform: Circle's ~5,000 creators at 1–3% is roughly 50–150 branded apps.

## What this means for Recompose

**The addressable count per platform is far smaller than tenant counts suggest.** A platform's headline customer number is not the number of apps that exist to redesign. On a shell model it is 1–3% of it.

**Volume is not at the bottom of the market.** Small tenants do not buy branded apps at any price — sub-200K-traffic Shopify stores stay on the shell regardless of what the upgrade costs. Compressing the design cost does not appear to move a tenant who was never going to buy the tier.

**The better ICP filter is "every tenant already has an app," not "the platform runs a design service."** It selects for the platforms where N is actually large and where a redesign has something to act on. It is also better evidenced than the design-service wedge, which rests on public pricing pages rather than counts.

**The tension:** the largest-N targets are concentrated in banking, which `Research/AIBrandCompetitiorAnalysis.md:45` documents as actively resisting visual differentiation — WCAG enforcement inside Alkami's Theme Builder, ADA-compliant outputs at Banno, SOC 2 review per change, Alkami's 240+ FI apps sharing visual DNA deliberately, and every banking AI announcement in 2024–2026 being end-user AI rather than design AI. Highest tenant count, lowest appetite.

**Subsplash clears both filters.** 20,000+ tenants each with their own app, no regulatory pressure toward visual sameness, an existing paid design and onboarding function, and a churn quote naming customization limits as the reason for leaving (`Research/AIBrandCopetitiorAnaylsisv2.md:29`). The open variable is the July 2025 Roper Technologies acquisition at $800M — Roper operates for margin, which could read either as receptiveness to cost structure or as no appetite for new vendors.

## How to measure this without vendor cooperation

- **SDK fingerprinting.** Appfigures and Sensor Tower maintain SDK-detection indexes across App Store and Play binaries. Querying a platform's SDK returns the numerator directly. This is the technique behind the Shopify figures above, applied to app binaries rather than storefronts. Note the limit recorded in `Research/WhyCustom.md:14`: container apps (Subsplash's "The Church App," Planning Center's Church Center, Tithe.ly, Pushpay) house thousands of tenants under one listing and are invisible to this method.
- **Developer-account enumeration.** Where a platform publishes under its own developer account, the App Store and Play developer pages list every app shipped. Free and direct.
- **Denominator from disclosures.** Customer counts appear in SEC filings, press releases and acquisition announcements.
- **Sales-call probe.** Ask two questions rather than "how many customers do you have": *how many tenants are live on the branded tier today*, and *how many branded apps did you ship last quarter*. The second is harder to deflect and returns a run rate rather than a stock. Refusal to answer either is itself informative.

## What is not established

- Bucket sizes behind the Shopify traffic gradient.
- Any measured attach rate outside Shopify.
- Sources for the $33,000/year Mighty Pro Essential figure and the one-third-tried-custom claim.
- Whether attach rate responds to design quality at all. The size correlation suggests the binding variable is tenant scale, which no design improvement changes.

## Shows up in

- `Customer_ICP.md`
- `Competition.md`
- `Research/Enterprise_Tier_Anatomy.md`
