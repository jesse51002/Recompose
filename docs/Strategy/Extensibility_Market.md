---
tags: [business, research-synthesis, market, competition, demand]
status: current
date: 2026-08-13
source-research: Research/2026-08-13-10-why-businesses-switch-crms.md, Research/2026-08-13-10-agentically-extensible-platforms.md
---

# The extensibility market: demand and supply, read together

Concepts touched: [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]].

Two briefs commissioned the same day answer opposite halves of one question. [[Research/2026-08-13-10-why-businesses-switch-crms|Why businesses switch CRMs]] is the demand side; [[Research/2026-08-13-10-agentically-extensible-platforms|who lets a SaaS customer obtain functionality the host does not ship]] is the supply side. **Read separately each one misleads. Read together they say something neither says alone.**

---

## The finding both briefs converge on

**Every empty cell in this market is empty for the same reason: nobody has a way to know that generated functionality is correct enough to run in production without a developer looking at it.**

The supply brief mapped who drives generation against where the output runs, across the full candidate set. The map is almost entirely empty, and the pattern of what fills it is exact:

| | standalone | embedded beside host | inserted into host screens | native mobile |
|---|---|---|---|---|
| **developer** | Retool, Superblocks | Retool Embed, Superblocks Embedded, Q2, Alkami, Temenos, ServiceNow, Salesforce | ServiceNow | **empty** |
| **admin / power user** | ServiceNow App Engine | ServiceNow Now Assist for Creator | *(config only)* | **empty** |
| **non-technical end user** | **empty** | **Gigacatalyst — and its live copy has moved to demos and POCs** | **empty** | **empty** |

**Every occupied cell has a developer or an admin in it.** That is not a coincidence about product design. **A developer is an accept condition** — the cheapest one available, and the only one anybody has shipped. Remove the developer and there is nothing left to say the output is right.

Four independent observations sit on top of that single explanation:

- **Every platform-native generator is developer-facing.** Q2 Code, Alkami Code Studio, Temenos Copilot, ServiceNow Build Agent, Salesforce Agentforce Vibes. Eight-plus data points, no exceptions.
- **"Embedded" at Retool and Superblocks means embedding *developer-built* apps in a portal**, not end-customer generation. They are not competitors in the relevant sense and should not be listed as such.
- **Gigacatalyst, the only occupant of the non-technical cell, has repositioned toward demos, POCs and implementation workspaces** — the surface where generated software carries no production consequence. See [[Companies/Gigacatalyst|Companies/Gigacatalyst.md]].
- **CodeParrot's cause of death was exactly this:** *"the generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value."*

**The strategic consequence is a reordering, not a new task.** The accept condition has been recorded as one open question among many since 2026-08-12. It is not one of many. **It is the thing that explains the entire shape of the market**, and whoever solves it owns the category — because generation, API discovery and UI are commodity or close to it, and verification is what nobody has.

> [!warning] Read the empty cells honestly
> Empty because nobody thought of it, or empty because it does not work? The supply brief labels this an inference and declines to answer. The evidence is consistent with the verification barrier and does not prove it. **Do not treat an empty cell as an opportunity without a reason it is empty.**

## Native mobile is empty everywhere, across the whole matrix

Not just the non-technical row — **every** native-mobile cell, at every driver level, across the full searched denominator. Every located generator outputs web or SDK artifacts: Apex and Lightning Web Components, Q2 and Alkami SDK components, Retool and Superblocks web apps, ServiceNow Fluent artifacts.

The likely reason is structural: native mobile means store review and compiled binaries, which resist per-tenant runtime generation. Web and SDK artifacts deploy without either.

**This is the most defensible ground the direction has**, and it is confirmed as a null result rather than assumed. It is also the ground with the highest engineering cost, for exactly the reason it is empty.

## Demand is weaker than the direction assumed, in three specific ways

The switching brief is the harder read, and none of it should be softened.

**1. Missing functionality is not the top switching driver.** Across ~24 documented instances: price and cost-at-scale ~11, usability and adoption ~9, **missing functionality ~9**, support ~7, integrations ~6, reporting and data access ~6, performance ~4.

*The counter the brief supplies itself:* the highest-yield sources are vendor comparison pages and "X vs Y" articles, which are **organised around price and ease of use**. The sample is biased against functionality by construction. Treat the ranking as directional, not measured.

**2. Roughly 80–90% of named gaps are generic, not business-specific.** Of ~20 rows with a named capability, about two are specific to how one business operates. The rest are custom and exportable reporting, multi-location roll-up, native accounting and job costing, custom objects — things the vendor should build and might.

**This is the finding that cuts hardest at the thesis.** The market was supposed to be what is *irreducibly per-tenant*, because a generic gap is a slow roadmap rather than a market.

*The counter, and it is real:* **generic-but-unbuilt-for-years is still an unmet need.** ServiceTitan gates custom report creation behind a higher package — *"The ability to create custom reports is dependent on your ServiceTitan Package"* — which is not a roadmap gap but deliberate monetization. Toast users export order data to Excel to run pivot tables. These are generic, recurring, and unaddressed. **A generic gap the vendor has chosen not to close is a market; a generic gap they are three months from shipping is not, and the brief cannot distinguish them.**

**3. Band B — paid for a workaround and stayed — is the smallest documented band.** Band A (switched) ~10, Band B ~5, Band C (lived with it) ~9. Band B was the hypothesised market.

*The counter the brief supplies:* a switch produces a review and a comparison page; a workaround produces a Zapier connection and a spreadsheet. **Band B is systematically under-written, and marketplace install counts — the standing Band B evidence — are unpublished at every platform in scope.** The band is unmeasurable rather than small.

## The vertical-to-horizontal migration does not exist

The cut most wanted — do businesses leave vertical CRMs for Salesforce or HubSpot **in order to customize** — is a **negative result**. No named case, in any vertical, with an extensibility reason.

**The vendor framing runs the other way, and that is worth more than the null.** ServiceTitan argues that Salesforce *"often needs a lot of customization to meet the tailored needs of trade businesses"* and that trade companies *"will often need to build extensions or integrate with third-party applications to fill functional gaps"* — positioning extensibility as a **burden of the horizontal platform**, not a draw. Salesforce markets Field Service against ServiceTitan and names no defectors.

**Implication for the pitch:** "we make your platform extensible" may read to a vertical SaaS buyer as "we make you more like the thing your customers chose you to avoid." That objection has to be answered before it is raised.

## The one capability both briefs independently rank at the top

**Custom reporting, dashboards and data export.**

- The custom-build brief ranks custom reporting and BI second overall, and it is the **only high-demand read-only capability in the top ten**.
- The switching brief finds report customization complained about against ServiceTitan, Toast **and** Salesforce, gated behind a paid tier at ServiceTitan and Clio, and **reappearing on destination platforms after a switch**.
- Weave Practice Analytics is a third party selling exactly this into Dentrix, Eaglesoft and Open Dental practices — the clearest commercial Band B proof in either brief.

**Three properties make this the strongest candidate wedge available:**

1. **It is read-only.** Worst case is a wrong-looking number, not corrupted data — the only accept condition that keeps failure cheap.
2. **It recurs across every vertical and follows people across platforms**, which means no CRM solves it and switching does not fix it.
3. **The platform holds the data and will not expose it cleanly**, which is precisely the gap an outside integrator cannot cross and an integrated party can. Lumino had to reverse-engineer bsport's public web to get data the API withheld.

**It is also much smaller than "turn any CRM into an expandable CRM,"** and it competes with every BI vendor the moment data access is easy. The narrowness is the point: it is the slice where the accept condition is solvable today.

## What this says about competitors, so nobody re-adds them

- **Not competitors:** Retool, Superblocks, Appsmith, Budibase, ToolJet, Noloco, Glide, Unqork, Betty Blocks, Creatio. Internal-tools and developer-built embedded portals. Verified against primary docs, not assumed.
- **Not a competitor:** Salesforce Agentforce Vibes. A VS Code extension generating Apex for developers building *on* Salesforce.
- **Not the analogy:** Builder.ai and CodeParrot. Both built standalone artifacts, not extensions of someone else's host. CodeParrot's *cause of death* transfers; its business model does not.
- **The only real one:** [[Companies/Gigacatalyst|Gigacatalyst]], and it has moved.

## Pricing, which remains undefined and now has partial anchors

- **Retool** — Team $10/builder + $5/internal user; Business ~$50/builder; external users gated to Business and Enterprise, custom-priced.
- **Superblocks** — Pro ~$49/creator + $15/end user; embedded apps and external users gated to Enterprise, custom.
- **Gigacatalyst** — custom, contact sales, no public tiers.

**No per-end-customer, platform-fee or revenue-share model is published anywhere in this category.** The seat-based anchors above are for developer tools and do not transfer to a per-tenant outcome. Pricing stays undefined.

## What a platform takes on if it builds this itself

Salesforce: AppExchange GA 2006-01-14 with roughly 25 partners and 70 apps, Apex the same year, Force.com 2008. **Twenty years of platform work, with the AI layered on in 2025.** Q2's Caliper SDK dates to 2018 and Q2 Code is 2026 work on top of it.

That is the sentence for a call: *the AI is months; the platform underneath it is years, and you are quoting the months.*

## What is not established

- Whether the empty cells are empty because the verification problem is unsolved, or for reasons nobody has articulated. Inference, explicitly not concluded.
- The date and rationale of Gigacatalyst's repositioning.
- Band B volume, at any platform, because marketplace install counts are unpublished.
- Whether generic-but-unbuilt gaps are durable or three months from shipping.
- Extension-architecture ship dates for Shopify, Atlassian Forge and HubSpot — not researched to primary sources.
- The Q2 Code early adopter named in the prior brief could not be independently located this pass.
