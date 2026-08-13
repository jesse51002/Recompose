---
tags: [business, icp, buyer, gtm]
status: reasoned-not-validated
date: 2026-08-12
source-pivot: pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md
---

# Customer ICP

Concepts touched: [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

> [!warning] Status
> Nothing in this document has been validated against a real buyer. **No platform has ever been contacted.** See "Validation status" at the end before using any of it as a fact.

Sources: [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md]], [[Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary|the August 10–12 session]] (L17–L23, T30–T35), [[Research/2026-08-02-features-vs-design|Research/2026-08-02-features-vs-design.md]], [[Research/2026-08-02-why-custom|Research/2026-08-02-why-custom.md]], [[Research/2026-08-02-attach-rate|Research/2026-08-02-attach-rate.md]], [[Research/2026-08-04-mobile-app-code-gen|Research/2026-08-04-mobile-app-code-gen.md]], [[Research/2026-08-04-company-list-white-label|Research/2026-08-04-company-list-white-label.md]].

---

## The buyer

**A multi-tenant white-label SaaS platform that already funds per-tenant custom development.**

The filter is the budget line. These platforms already pay engineers to build one feature for one tenant, they know what it costs, and they can read the value off a P&L rather than imagining it.

The exclusions are as load-bearing as the inclusion. **Not agencies** — their constraint is client acquisition, not production capacity. **Not freelancers** — same, harder. **Not the end business** — the tenant is who the module is *for*, but they are not who writes the check.

### The two groups, and why this one

[[Research/2026-08-02-features-vs-design|The August 2 research]] splits nineteen platforms into groups that are nearly disjoint on every other axis.

**Group A — already paying. The chosen buyer.**

| Platform | Evidence | Vertical |
|---|---|---|
| **Banno** (Jack Henry) | Named **"Custom Development team"** — *"Maybe your idea doesn't require a third-party — we build custom features, too."* May involve an additional contract | Fintech |
| **Backbase** | Code-writing **"Services" organization** distinct from product R&D: *"your tailor-made code seamlessly integrates our products with customers' systems"* | Fintech |
| **Tapcart** | **"Engineer, Solutions & Services"** at $120–140k *"building Custom Blocks and React web apps for existing and prospective clients"* | Commerce |
| **ABC Trainerize** | Enterprise tier includes *"custom-built widgets… non-standard functionality"*, gated to 5+ locations | Fitness |
| **GoodBarber** | *"You can rely on our team of experts, who offer custom developments for resellers"* — quote-based | Horizontal |
| **BuildFire** | *"Hire BuildFire's team of experts… to build features not currently available"*, sold as a Professional Services tier | Horizontal |

**Group B — the refusers.** Thirteen platforms, including Subsplash, Passion.io, Circle, Mighty Networks, Kajabi and Uscreen, have **no path by which a tenant gets net-new functionality at any price.** Kajabi states it outright: *"Kajabi is not able to support inquiries specific to custom coding."*

Group B is reachable and Group A has the money. **Group A is the buyer**, because a budget line that already exists is worth more than reachability, and because a pitch with no existing spend behind it has to establish the value from scratch on the call.

### The secondary sort

Platforms where **every tenant already has their own app** — it decides how many tenants a module can be sold to. A sort within Group A rather than the primary filter.

**Banno sits in both** and is the strongest target on the merits: 300+ financial institutions each with a live branded app, a named custom-development team, and a mature plugin framework to write into.

**It is also the worst on reachability** — a public company with procurement, vendor risk assessment and 6–18 month cycles. **Sort Tapcart and BuildFire ahead of it** and treat Banno as the target worth a long cycle rather than the first call.

---

## Where leverage comes from — open, and it decides the business

**A module is for one tenant by construction**, so nothing amortises automatically. Whether a module built for one tenant re-serves the next tenant who asks for something similar, and who owns that library, is undecided — and it changes the economics more than anything else in this document.

Three shapes, none chosen:

- **Pure bespoke.** Every module is one tenant's. Revenue scales with requests, cost scales with requests, and there is no leverage beyond the agent being cheaper than an engineer.
- **A growing library.** Early modules are bespoke; later requests increasingly match something already built and tested. Margin improves over time and the first customer is the most expensive.
- **A bounded vocabulary.** Modules compose from a fixed set of tested primitives from the start. Best margin, tightest safety story, smallest set of answerable requests.

The qualifying questions follow from this, and they replace *"how many tenants do you have"*:

- **What do tenants ask you to build that you say no to?**
- **How many of those are the same request?** — the answer decides which shape above the business has.
- **What does saying no actually cost you?** — churn, a lost deal, a discount.

---

## The value argument

**Two halves, and neither is tenant satisfaction.**

**1. Refused revenue.** Thirteen of nineteen platforms turn down feature requests entirely; the six that accept them are gated by engineering capacity and price behind sales. Either way, demand exists and supply is bounded by people. This is [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]] pointed at functionality instead of design — *a price tier you cannot currently staff.* There is a real staffed line item on the other side of it.

**2. Lost deals.** Platforms lose competitive deals to whoever can supply the workflow the prospect actually operates on. This is Gigacatalyst's own problem statement, applying unmodified — which makes it both a strong argument and a warning about who else is making it.

> [!danger] Rules
> **Never sell "your tenants will love it."** App-store reviews of white-labeled apps complain about bugs, booking failures and slow loading — the buyer is the platform, and the argument is capacity and refused revenue.
>
> **Never quote an enterprise-tier price.** No platform publishes one; every figure in circulation is a third-party estimate of a gated number, and the Circle estimates disagree by roughly 12×. Say "$1,000+/month" rather than a precise figure.
>
> **Do not build a cost-savings pitch on design.** Design work priced standalone is $99–169 one-time at Trainerize and $499 at Vagaro; professional services is 1.19% of revenue at Olo and 2.9% at Toast. There is not enough cost there to save.

---

## What is being replaced

**The contracted per-tenant custom-development engagement** — a platform's own engineers building one feature for one tenant on a human schedule, at a price gated behind sales — or the flat refusal that thirteen of nineteen platforms give instead.

Consequences for who we are actually up against:

- **The platform's own services organisation.** Banno's Custom Development team, Backbase's Services org, Tapcart's Solutions Engineer. A real internal competitor with a named budget.
- **The platform's extension SDK plus its partner network.** Q2 and Alkami answer the same demand this way deliberately — partners build, the platform hosts.
- **Q2 Code, and anything like it.** A governed AI development environment on an SDK the platform already owns. The distinction to hold is that it makes a developer faster and this removes the developer.
- **Not in this market: design tooling, token tooling, brand APIs, design services.** They answer a different question and should not appear in a pitch.

**[[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]], inverted.** Agencies are not the buyer; agency-grade work is what the product replaces. The budget being attacked is a **development** line item, which is where the money is.

**The bar is not parity.** Close enough at a fraction of the price. Chasing parity with a staff engineer who knows the codebase is unwinnable and is not what the buyer is paying for.

---

## Who is actually in the room

**Group A is defined by having a named engineering organisation that does this work.** Banno's Custom Development team and Backbase's Services org are the people whose work is being automated, and they are who a platform routes the technical evaluation to.

That cuts both ways and both directions are strong:

- **There is a champion.** Someone owns per-tenant delivery, has a queue, and knows what it costs. A capacity argument lands with them.
- **There is an opponent.** The same person can find fault and will be right about real things: the security surface, the API coupling, the correctness of generated code inside their auth context. A lukewarm technical review is a live risk.

**The sharper version of the same problem is build-versus-buy.** Group A platforms own mature extension SDKs — Caliper since 2018, Banno's Plugin Framework, Backbase's own — and that, not an AI budget, is what makes building this in-house cheap. Q2 wired Claude Code into Bedrock and shipped Q2 Code in April 2026. **The AI was the cheap part bolted onto the expensive part, and the chosen buyer owns the expensive part by definition.**

---

## How year one is delivered

**Forward-deployed.** The founder does the integration work as paid onboarding.

**What the platform has to do to adopt it depends entirely on whether their extension surface is deep enough**, and this is unverified:

- **If it is** — Recompose writes SDK-compliant modules into a surface they already own, host and govern. Small sign-off, their safety story, no architecture change.
- **If it is not** — they add insertion points to their own app, which needs engineering-leadership sign-off and is a materially harder sale.

Banno's Plugin Framework hosts HTML/CSS/JS web apps on the *partner's* infrastructure; Tapcart's blocks live inside its own studio. **Reading their public developer documentation is the cheapest high-value work available and it precedes every call.**

The [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]] principle — adopt without changing your architecture — is therefore satisfied *conditionally*. Where the surface exists it holds completely; where it does not, adoption requires the platform to restructure, and the founding rule says that is a product defect rather than an objection to argue past.

---

## What is undefined

Do not fill these in from memory.

- **Pricing.** Undefined for this buyer. The old $100/$300/$500 ladder was gym-owner pricing and is dead. The **$100/month per branded tenant** figure in [[Strategy/YC_Application_F26|YC_Application_F26.md]] was priced against *designs* and does not transfer to modules at all.
- **The unit sold.** Per module, per tenant, per platform licence, or a share of what the platform charges for the capability. Undecided, and the library question above decides the margin.
- **The accept condition for a generated feature.** The load-bearing gap in the whole direction.
- **Whether refusing feature requests costs the platform anything measurable.** The demand argument rests on it and nobody has asked.
- **How deep the existing extension surfaces go.** Decides whether the sale is easy or hard.
- **Whether one person can carry three surfaces** — module, backend, admin — each with a security surface.
- **The stack.** A module is written in whatever the platform's app is written in. React Native and Flutter are the friendly cases; native Swift and Kotlin are the hard ones, and mobile is the worst-supported domain in agentic code generation.

---

## Validation status

**No platform has been contacted. This ICP is reasoned, not validated.**

- **Nobody has asked for this** (T1). The origin is a realization while building a white-label app for a previous startup. Founder-reasoned and market-untested. Do not upgrade it into a pain narrative.
- **No named human exists at any target platform.** The list is done — [[Research/2026-08-04-company-list-white-label|Research/2026-08-04-company-list-white-label.md]] — and it names contact *surfaces*, not people. This has been the assignment for five sessions.
- **After roughly nine months and seven strategic phases, no outside party has ever responded to anything built here.**

**The open work, in order:**

1. **Verify the extension surfaces from public documentation** — Banno's Digital Toolkit, Tapcart's App Studio, BuildFire's `buildfire.js`. An afternoon, and it decides which product is being sold.
2. **Ten named platforms with a named human at each**, Group A first, Tapcart and BuildFire ahead of Banno on reachability. Job postings supply the names.
3. **Four questions on every call:** how many tenants are live on the branded tier and how many shipped last quarter; who builds websites for tenants today; **what do tenants ask for that you say no to, and how many of those are the same request**; and **what does saying no cost you.**
4. **Nothing gets built until at least three of those calls have happened.** This is the pre-registered condition from [[Strategy/Agentic_Code_Generation|Agentic_Code_Generation.md]] — *extending scope before the narrow version has a buyer is the pattern this vault has now run six times.*
