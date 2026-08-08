---
tags: [business, icp, buyer, gtm]
status: reasoned-not-validated
date: 2026-08-02
source-pivot: pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps.md
---

# Customer ICP

Concepts touched: [[Tier_Unlock_ROI]], [[Integration_Surface]], [[Full_Visual_Redesign]], [[Freelance_Conversion_Thesis]], [[Closed_Design_To_Production_Loop]], [[No_New_Requests_Invariant]], [[Re_Derived_Not_Forked]], [[Brand_Is_Product]], [[Tokenized_Design_System]], [[AI_Design_Compression]].

> [!warning] Status
> Nothing in this document has been validated against a real buyer. No platform has been contacted. See "Validation status" at the end before using any of it as a fact.

Sources: `pivots/2026-07-27-11-customization-engine-is-the-company.md` (P1–P4 as decided), `pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps.md` (P1a), `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md` (P1, P1b, P2, P3, P4, §11d, T1–T9), `Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge.md` (L1–L6, T19–T22), `YC_Application_F26.md`, and the August 2026 research: `Research/Attach_Rate.md`, `Research/Enterprise_Tier_Anatomy.md`, `Research/FeaturesVSDesign.md`, `Research/WhyCustom.md`.

---

## The buyer

**A multi-tenant white-label SaaS platform with real tenant volume.**

That is the whole ICP. The exclusions are as load-bearing as the inclusion, and all three were made by the founder in-session:

- **Not agencies.** An agency's constraint is client acquisition, not theme production.
- **Not freelancers.** Same reason, harder.
- **Not the end business.** Not the membership operator, the course creator, the content creator, the gym, the church, the restaurant. The end business is the *platform's tenant* — the person whose brand goes on the app — but they are not who writes the check. This exclusion is the founder saying the engine business is not the vertical-app business.

Founder, verbatim: *"this is for white label apps at scale, it automates it and make sit very quick to give deep custoimiztion to customers and have a very broad preset themes, it snot for small teams at small volume that the bottle neck is finding people."*

**"Real tenant volume" has no defined threshold, and the phrase is less useful than it looks.** What matters is not tenant count but **tenants who already have their own app** — on a shared-shell platform those differ by roughly a hundredfold. The named candidates below range from 20,000+ (Subsplash) down to ~300 (Alkami, Banno), and the small ones are not disqualified: 301 institutions each with a live branded app is a larger addressable base than a 20,000-tenant shell platform where 1% take the upgrade.

---

## What the unit of value actually is: design variety, not tenant count

Recompose sells **designs**, one fork each; how many tenants a platform points at a design is its own business. So revenue tracks **how much design variety a platform buys**, not how many tenants it has. A 500-tenant platform whose customers are content on three shared designs is a small account. A 50-tenant platform where every customer wants their own look is a large one.

Tenant count still matters, but **indirectly and as a proxy.** It matters because it is upstream of variety: a platform with eight customers has no meaningful demand for distinct looks, so faster theme production is worth approximately nothing to it — the eight themes were never the constraint. Volume is what creates the *possibility* of variety, not the value itself.

At high tenant counts the arithmetic inverts. Deep per-tenant branding is not gated by a large design payroll — the design functions that exist are small and cheap, and priced standalone at $99–$499. It is gated by **elapsed human time per tenant**: 3–6 weeks of a person's partial attention, consistently, across every platform that publishes a turnaround. That is a capacity ceiling, not a cost line. Volume is what makes the ceiling bind.

**The qualifying question is therefore about the installed base, not the payroll.** Not "how many tenants do you have," and not "what do you spend on design," but **"how many of your tenants have their own app today, and how long does each one take you?"** The first number is the population a redesign can act on; the second is the constraint being removed.

The corollary Codex drew independently and that the vault accepted: the product should not optimize for beautiful one-off generations. It should optimize for **platform onboarding, tenant throughput, review and approval, repeatability, and QA** — the properties that only matter at volume. Whether the buyer actually evaluates on throughput rather than beauty is an open test (T6), and it may change what gets built.

---

## The sharpest wedge: platforms where every tenant already has an app

P1a. See `pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps.md`.

Platforms divide into two models, and it decides how much there is to sell:

- **Shell model.** A shared app for everyone, with a standalone branded app as a premium upgrade. Attach rate on that upgrade is **0.1–3%**, measured, and it **tracks tenant size rather than price**. A shell platform's tenant count is not its addressable app count; it is roughly a hundredth of it.
- **No-shell model.** Every tenant is provisioned with their own app. Attach is effectively 100%, which is not a better conversion rate — it is a filtered funnel, because the platform never sold to the tenants who would have stayed on a shell.

**Target the second group.** The population of redesignable apps equals the tenant count, and a redesign has something to act on from day one.

### The named candidates

| Platform | Tenants with their own app | Source quality |
|---|---|---|
| **Subsplash** | **20,000+ churches**; powers 50 of the top 100 US churches; acquired by Roper for $800M, July 2025 | Public / vendor |
| **Passion.io** | **15,000+ apps launched** | Vendor marketing |
| **Q2** | **457 installed FI customers**, ~27.3M registered users | SEC 10-K, 31 Dec 2025 |
| **Banno** (Jack Henry) | **300+ FIs** | Vendor |
| **Alkami** | **301 FI clients**, 22.4M live users | SEC 10-K, 31 Dec 2025 |

**Subsplash fits best.** Large installed base, no regulatory pressure toward visual sameness, an existing paid design and onboarding function, and a former customer on record leaving over customization limits. The open variable is the Roper acquisition — Roper operates for margin, which reads either as receptiveness to cost structure or as no appetite for new vendors.

The fintech four have the cleanest denominators in the entire research (~4,300 US credit unions per NCUA, ~99% on vendors, a four-name vendor list) and the worst appetite: `Research/AIBrandCompetitiorAnalysis.md:45` documents WCAG enforcement inside Alkami's Theme Builder, SOC 2 review per change, and 240+ Alkami FI apps sharing visual DNA deliberately, because trust signals reward consistency.

### What the premium tier actually costs, and what it buys

The figures below are **tier prices, not design prices**, and the distinction is load-bearing. Mighty Pro's tier lists six deliverables and design is one — migration of members, courses and payments; a Community Design™ Plan; setup; design services; a membership; ongoing reporting. Full anatomy in `Research/Enterprise_Tier_Anatomy.md`.

| Platform | Tier figure in circulation | Source quality |
|---|---|---|
| Mighty Pro | $1,167/mo → $3,000–5,000/mo → $28–33k/yr | All third-party estimates. Contact-sales only |
| Circle Plus | "~$30K/year" — and separately "$10,000–$30,000 **per month**" | Two third-party estimates, ~12× apart |
| Passion.io Plus / DFY | $10,000–$20,000 setup | Third-party, May 2026 |
| Tapcart Ultimate | $400+/mo with "Collaborative App Design Services" | Public |
| Agency custom app build | $10–50k, 4–12 weeks | April 2026 research |

> [!danger] Never quote an enterprise-tier price
> No platform publishes one. Every figure above is a third-party estimate of a gated number, and the Circle estimates disagree by an order of magnitude. `YC_Application_F26.md` already instructs saying "$1,000+/month" rather than a precise figure; extend that to all of them.

**The design work priced standalone is cheap.** ABC Trainerize sells its Custom Branded App at a **one-time ~$99–$169**; Vagaro's design package is **$499 one-time**. That is the market pricing the same class of deliverable — splash, icons, store assets, brand kit — that the enterprise tiers list. Do not build a cost-savings pitch on it; there is not enough cost there.

**What is real and defensible is elapsed time:** 3–4 weeks at Mighty Pro, ~4 weeks at Circle, ~4 weeks at Trainerize Studio, six weeks at Subsplash. Consistent across every platform that publishes a turnaround.

> [!note] An unresolved tension inside the wedge, worth knowing before the call
> The same research that makes Subsplash a target also makes it a counter-example. v1 calls Subsplash "the cleanest proof that this customer base is *satisfied* with logo+color skinning" — no vendor in the vertical has felt pressure to go further. v2 surfaces the opposite: a former customer writing *"Very little customization apart from text and images… I ended up developing my own app and cancelled my Subsplash subscription."* Both are in the sources. Neither has been tested.

---

## The value argument, and the rule about what never to say

**Two halves. Neither is tenant satisfaction.**

**1. Tier-unlock ([[Tier_Unlock_ROI]]).** A premium tier bounded by people rather than by demand — 3–6 weeks of human time per tenant, everywhere it is offered. Embedded-analytics vendors publish a formal level 1–4 white-label ladder in which **level 3 is explicitly "per-tenant theming for reseller scenarios"** — per-tenant theming is not sold to make end users happy, it is **priced as a tier**. The pitch is *"a price tier you can't currently sell."*

**2. Lost deals.** Platforms lose competitive deals to whoever's app can actually look like the prospect's brand. This is the loss-framed half, adapted directly from Gigacatalyst's own problem statement — *"you lose competitive deals — customers choose vendors that have the exact workflow they operate on"* — with workflow swapped for brand. It lands with a sales leader where the margin argument only lands with a CFO. The pitch is *"the deals you lose on brand."*

> [!danger] The rule
> **Never sell "your tenants will love it."**
> The vault's own competitor research proves it false: app-store reviews of Subsplash-, Mindbody-, and Olo-powered apps overwhelmingly complain about bugs, booking failures, and slow loading — **almost never about looking generic**. End consumers have no comparison set; they see their gym's app, not all gym apps. The pain of templating is felt by the B2B buyer, not the end user ([[Brand_Is_Product]]).
>
> Reframing the ROI as tier-unlock makes that finding **irrelevant rather than damaging**. Reintroducing the end-user claim makes it damaging again, in front of the one buyer who can check it.

The retention argument (a tenant who has shaped an app into its own brand does not churn) is the weakest of the three and rests on platform-side switching cost, not on end users caring. `YC_Application_F26.md` cut it from the written application and kept it as a verbal point only. Treat it the same way here.

---

## What is being replaced

This moved, and the move is the largest strategic consequence of the July 2026 pivot (§11d).

- **When the product was assets only**, it replaced a **designer applying a brand** — a few days per tenant, a theming budget.
- **Now that the product changes structure too** ([[Full_Visual_Redesign]]), it replaces the designer **and the front-end engineer who implements the design**. That is the **whole custom-build line item: $10–50k and 4–12 weeks** in the agency market.

Consequences for who we are actually up against:

- **Demoted to marginal:** token tooling (Tokens Studio, Token Designer, UXPin Merge). Right comparison when the product was assets; now overlapping a fraction of the surface.
- **Promoted to direct:** in-platform design services — Mighty Pro's Design Lab, Passion.io's DFY tier, BentoBox under Clover — but only the design line item inside them. The rest of the tier is untouched: migration, the named strategist, App Store operations, seat and member limits, SSO. At Mighty Pro that is one of six deliverables, and it is not the one the price is set by.
- **Promoted to direct:** agency and freelance custom app builds.

**The [[Freelance_Conversion_Thesis]] returns inverted.** Agencies are not the buyer; agency-grade work is what the product sells. The budget being attacked is the **custom-build budget, not the theming budget** — which moves the pricing anchor from a software line item to a services line item, an order of magnitude higher.

**The bar is not parity.** Founder, correcting an overstatement in-session: *"it deosnt have to clear it, and it likely never will but it has to be clsoe enough to it, wher eit can give very close to the quailty at a fraction of the price, we are not trying to beat actual designers here."* Close enough at a fraction of the price — the standard disruption shape ([[AI_Design_Compression]]). What changed with the added structure is the **comparison target** (a custom build rather than a generic template), not the requirement.

---

## Who is actually in the room

**Sell to whoever owns the throughput, not whoever owns the craft.**

The feared hostile evaluator — a head of tenant design who sees the gap between generated output and a custom build and is right that it exists — frequently does not exist. The client-facing roles the research actually found are Solutions Consultants, Client Implementation Managers, Customer Onboarding Specialists, Community Strategists and marketing designers. Circle's design department is ~4 people who primarily do Circle's own marketing.

That cuts both ways and the second half is worse. Political risk is low: nobody's team is visibly on the line, so there is little reason for a lukewarm technical review (T8). But there is also **no internal owner whose job improves if the purchase succeeds** — no champion carrying it through procurement. A deal with no opponent and no advocate stalls rather than losing.

Codex's separate objection is the organizational twin of this and is still live (T4): adoption stalls not on engineering but on *"messy design systems, hardcoded one-off screens, asset assumptions, native build quirks, QA ownership, and internal resistance to giving an external system control over production UI."* Two answers exist and both are architectural rather than rhetorical — [[No_New_Requests_Invariant]] (arrangement only; the API surface is provably identical, so their QA surface is unchanged by construction and their own engineers can verify it) and [[Re_Derived_Not_Forked]] (the redesign is a repeatable transformation re-applied per release, not a permanent fork, so upgrades still ship once). Neither has been tested on a real customer.

---

## How year one is delivered

**Forward-deployed.** The founder does the integration as paid onboarding; per-tenant generation is near-zero marginal cost afterward (P4).

**What the platform has to do to adopt it: grant read access.** Nothing else. Recompose keeps its own tokenized fork and derives every design from it, so there is no library to adopt, no API to wire, no version to track and no pull request to review ([[Never_Touch_Their_Code]]). The [[Integration_Surface]] principle — a platform adopts the engine without changing its architecture — is satisfied more completely by having nothing to integrate than any SDK would have satisfied it.

That changes the comparison. Gigacatalyst's public ~2 days to install and ~2 weeks to full integration was the bar to beat when there *was* an installation step; there is not one now, and the remaining time cost is the forward-deployed tokenization pass, which is our work rather than theirs. The roadmap priority is compressing that pass — **not** adding generation modalities, and no longer multi-language SDK breadth.

The reason this is infrastructure rather than a pipeline with a services team attached: an agent that can write view code for a redesign is the same capability as an agent that can do the initial [[Tokenized_Design_System|tokenization]] pass. The blocker and the product collapse into one thing (P14a).

The differentiator that survives all of the above is three-legged: cross-modal coherence, the [[Closed_Design_To_Production_Loop|closed design→production loop]], and low-friction integration. Everyone else stops at tokens, brand kits, or a mockup a human still has to implement.

---

## What is undefined

Do not fill these in from memory or from the gym era. They are genuinely open.

- **Pricing for this ICP is undefined.** The old $100/$300/$500 ladder was **gym-owner pricing and is dead** — it does not transfer. The only number written anywhere is `YC_Application_F26.md`'s **$100/month per branded tenant**, presented there explicitly as the *platform's COGS, not the end price*, defensible only as "the price at which the platform still keeps 70% on a tier they currently cannot scale," and **never as a final number**. The office hours doc records pricing as completely undefined (T7, Open Question 2). Gigacatalyst publishes no pricing, so the nearest analog gives no comparable.
- **The tenant-count floor for "real volume."** Never picked.
- **Stack constraint as a qualifying filter.** Flutter/React Native only, or rebuild it for them? Unresolved since 2026-05-25 and now more consequential, because it decides **which platforms are even reachable**.
- **Whether presets are the platform's product or the platform's tenants' product.** Unexamined (Open Question 7).
- **App-agnosticism outside `apps/combatden/` and `apps/smoketest/`.** Unproven (T5). Every claim in this document about adopting a platform's app assumes it.
- **Whether attach rate responds to design quality at all** (T19). The measured correlation is with tenant *size*, which no design improvement changes. This is the largest unexamined assumption under the whole value argument and no amount of further research can settle it.
- **Which app architecture is targeted.** Subsplash, Planning Center, Tithe.ly and Pushpay all run container apps that house thousands of tenants under a single App Store listing (`Research/WhyCustom.md:14`). A container tenant has no per-tenant binary, which changes the shape of what ships. Subsplash runs both models simultaneously (T22).

---

## Validation status

**No platform has been contacted. This ICP is reasoned, not validated.**

Precisely:

- **Nobody has asked for this** (T1). The origin is a realization while building a white-label app for a previous startup — *"I just figured it out it could be useful when i was doing a different idea of building my own white lalbed app for class based gym."* Founder-reasoned and market-untested. Do not upgrade it into a pain narrative.
- **There is no target list.** Not one named platform with a named human at it exists. The office hours session called this "the single biggest hole the session found" and it is still unclosed (T2). A category is not a target.
- **After roughly eight months and six strategic phases, no outside party has ever responded to anything built here.**

**The open work, in order:**

1. Produce **ten named platforms where every tenant already has an app, and a named human at each** — starting with Subsplash and Passion.io, then the fintech four, because the population of redesignable apps equals their tenant count rather than a hundredth of it.
2. **On every call, ask two questions instead of "how many customers do you have":** *how many tenants are live on the branded tier today*, and *how many branded apps did you ship last quarter*. The second is harder to deflect and returns a run rate rather than a stock. Refusal to answer either is itself informative.
3. Run the **live-theming call** with three of them: pull their biggest customers off their own logo wall, redesign the example app live on the call, and watch the reaction. The instrument is **elapsed time in the room** — an artifact that arrives by email shows the output; one that materializes while the buyer watches proves the clock, and the clock is the entire value claim (T3).
3. Only then the second shell — aimed at whatever stack an interested party actually runs on.
