# Who lets a SaaS customer obtain functionality the host product does not ship — an evidence report

*Evidence tags: MEASURED (filings, changelogs, primary docs, dated snapshots) · VENDOR-CLAIMED (company's own unaudited claim) · ESTIMATED · FORECAST · UNKNOWN/NEGATIVE. Secondary labels from the brief: primary / vendor-claimed / third-party / inferred. Current date: 13 August 2026.*

## 1. TL;DR (findings only)

- **Non-technical-end-user-driven generation into a production host system: one company was found positioned this way, and its public positioning has since moved.** Gigacatalyst (Giga Next Inc., YC Spring 2026) is the only entity found describing self-serve, natural-language generation of functionality embedded in a third party's SaaS, running on that host's APIs/auth, drivable by "sales, CS, and users." Denominator searched: the full brief candidate set for Categories A and B (Gigacatalyst plus Retool, Superblocks, DronaHQ, Appsmith, Budibase, ToolJet, Noloco, Glide, Unqork, Betty Blocks, Creatio, Airplane) plus platform-native generators (Q2, Alkami, Temenos, ServiceNow, Salesforce). As of 13 Aug 2026 gigacatalyst.com leads with "Stop burning hours on demo and POC setup" (demo/POC/implementation motion), while its YC page still says "Let software users build new features." No other company matched the non-technical-end-user cell.
- **Per-tenant generated functionality inside a native mobile app: none found.** Denominator: all companies above plus the platform-native generators. Every generator located outputs web/SDK artifacts (Apex/LWC, Q2/Alkami SDK components, Superblocks/Retool web apps, ServiceNow Fluent artifacts). No product was found generating per-tenant functionality inside a native iOS/Android app. NEGATIVE RESULT.
- **A vertical (industry-specific) SaaS platform shipping a native extension generator: found only in banking.** Q2 Code, Alkami Code Studio, and Temenos Copilot for Workbench (all first announced April–May 2026) generate SDK-compliant extensions for their own banking platforms — but all are developer-facing, not end-user-facing. Outside banking, searches of ServiceTitan, Toast, Procore, Veeva, Blackbaud, and nCino returned no native extension generator (agents and copilots only). NEGATIVE outside banking.

## 2. Key findings

1. **Gigacatalyst is the sole Category-A candidate, and its live positioning is now demo/POC enablement, not production per-tenant extension.** Current homepage headline: "Stop burning hours on demo and POC setup" / "Turn customer requirements into configured demos, POCs, and implementation workspaces, using your existing product APIs." (gigacatalyst.com, fetched 13 Aug 2026; MEASURED — live primary source.) The YC company page still reads "Let software users build new features with our in-app AI agents." (ycombinator.com/companies/gigacatalyst, fetched 12 Aug 2026; MEASURED.) STATED-vs-REVEALED divergence between channels.
2. **Gigacatalyst names one customer publicly: UpKeep.** The current homepage carries a testimonial attributed to Ryan Chan, CEO of UpKeep, stating "Over 1,000 UpKeep customers use it daily." (gigacatalyst.com, 13 Aug 2026; VENDOR-CLAIMED.) UpKeep is a field-service/maintenance-management SaaS (YC W17) that raised a $36M Series B on 12 May 2020 led by Insight Partners, bringing total funding to $48.8M (TechCrunch, 12 May 2020: "UpKeep… has today announced the close of a $36 million Series B financing round. The round was led by Insight Partners."; MEASURED — funding announcement). No other named Gigacatalyst customer was found.
3. **Gigacatalyst traction figures conflict across its own channels.** YC Launch post: "$1M+ in pipeline unblocked in 6 weeks," "70% day-30 retention," "$100K in churn prevented," "800+ features shipped in 6 weeks." (ycombinator.com/launches, 2026; VENDOR-CLAIMED.) Product Hunt founder comment: "2,500 apps built already." (producthunt.com; VENDOR-CLAIMED.) Third-party aggregator HokAI: "90.8% adoption, 89% day-30 retention, and 670 microapps." (hokai.io; third-party, unverified.) Figures are not reconciled; shown, not averaged.
4. **Q2 Code (banking, vertical) ships a platform-native generator — developer-facing.** "Q2 Code applies generative and agentic AI to turn business goals and feature requirements into Q2 SDK-compliant extensions and integrations." Announced 16 April 2026, built on Claude Code via Amazon Bedrock, within Q2 Innovation Studio. (press.aboutamazon.com / investors.q2.com, 16 Apr 2026; MEASURED — dated press release. ANNOUNCED, not GA.)
5. **Alkami Code Studio (banking, vertical) is in beta, developer-facing.** "AI-powered code assistant within the Alkami SDK Wizard"; generates "standards-aligned, design-compliant SDK components" via closed-loop LLMs; early tester Patelco Credit Union (Deepan Chandrasekaran quoted). Announced 16 April 2026 at Alkami Co:lab 2026. (alkami.com/news, 16 Apr 2026; MEASURED. WAITLISTED/beta — "Financial institutions on the Alkami Platform can request access.")
6. **Temenos Copilot for Workbench (banking, vertical) announced, developer-facing.** "Temenos Copilot for Workbench, helping developers build, plan and execute custom platform extensions using AI Agents." Unveiled at TCF 2026, press release dated 7 May 2026; fact sheet dated April 2026. Runs against the Temenos Core Extensibility Framework. (temenos.com/press_release, 7 May 2026; MEASURED. ANNOUNCED.)
7. **ServiceNow ships application generation, aimed at admins/developers/"business technologists," not per-tenant end users.** Now Assist for Creator: "Application generation: Generate application tables, user roles, and record producers from a text prompt." Build Agent: "generates production-ready output, not prototypes... It knows your instance, your data model, and your platform standards." (store.servicenow.com; servicenow.com/products/now-platform-app-engine, fetched Aug 2026; MEASURED.) A ServiceNow community developer blog cautions Build Agent "is not an end-to-end app builder — not yet." (servicenow.com community blog, 2026; primary/third-party.)
8. **Salesforce Agentforce Vibes is a developer IDE tool, not per-tenant CRM extension — it fails the inclusion test.** Docs: "Agentforce Vibes generates Apex code from natural language prompts"; available as a VS Code extension; "Turn ideas into working agents and apps." (developer.salesforce.com; salesforce.com/agentforce/developers/vibe-coding, fetched Aug 2026; MEASURED.) Who-drives = developer. It builds ON Salesforce; it is not a third party embedding per-tenant generation into someone else's SaaS. Excluded from Category A; noted as a Category-C platform-native generator that is developer-driven.
9. **Embedded/customer-facing low-code exists (Superblocks, Retool) but is developer/admin-driven; "embed" frequently means embedding vendor-built apps in a portal.** Superblocks: "white-label customer portals and embedded apps," Clark AI generates apps for "business teams" inside the buying company. (superblocks.com/product/embedded-apps; docs.superblocks.com, fetched Aug 2026; MEASURED marketing + docs.) Retool "External Apps"/Embed: shipped, used by Greenly and OrangeTheory. (retool.com/blog/external-apps; retool.com/customers/greenly; MEASURED.) In both, the buyer's developers build; end customers consume — not self-serve generation. STATED ("help your customers do more") vs REVEALED (developer-built, embedded) divergence.
10. **No AI-native CRM was found that is extensible by generation for a non-technical customer.** Attio ships a Developer Platform (REST API, App SDK, embedded React apps) and custom objects; Twenty is open-source and API/code-extensible. Both are configurable and developer-extensible; neither lets a non-technical customer generate a capability the vendor never designed. (docs.attio.com; attio.com/blog/meet-the-attio-developer-platform; MEASURED.)
11. **The category has no consensus analyst/investor name.** Forrester's 2014 report "New Development Platforms Emerge For Customer-Facing Applications" (Richardson & Rymer) coined "low-code"; adjacent terms in use are "customer-facing low-code," "embedded low-code," "embedded/customer-facing analytics," "in-app extensibility." No analyst term was found specifically for AI-generated per-tenant extension. Gigacatalyst's own YC directory line uses "an AI FDE for every enterprise software customer." (MEASURED / NEGATIVE for a consensus term.)
12. **Graveyard: Builder.ai and CodeParrot are documented; Airplane.dev is an acqui-hire shutdown.** Builder.ai filed insolvency 20 May 2025 (Chapter 7, Delaware); it "raised more than $500 million" (FT/TechInformed; CB Insights logs $429.5M over 8 rounds), and per Sifted citing the FT, "lenders called a default on the $50m loan the startup raised in October after Builder's restated accounts marked down a prior $220m revenue estimate to around $55m… previously reported sales for 2023 had also been marked [down] from $180m to $45m." CodeParrot (YC W23) shut down July 2025: "the generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value." Airplane.dev was acquired by Airtable (announced late 2023), product sunset 1 March 2024, $40.5M raised, described as an acqui-hire.

## 3. Details

### Category A — Per-tenant customization embedded in a host SaaS

**Gigacatalyst (Giga Next Inc.)** — the only member found. Mechanism (per YC/Launch and Product Hunt, all VENDOR-CLAIMED): an embedded AI layer performs agentic API discovery of the host's endpoints, then translates natural-language requests into sandboxed "microapps" that inherit the host's auth and RBAC, with "no changes to the host codebase required"; a founder comment describes "a proxied, pinned API layer that can handle the base API changing." Buyer: the SaaS platform (B2B2B). Who drives it (as stated): "sales, CS, and users" — i.e., includes non-technical end users. Where output runs: embedded beside the host. Safety model (stated): sandbox + inherited auth/RBAC + pinned/proxied API layer. This is the only located instance of the "non-technical end user" cell, and it is the cell the brief flags as the one it believes unoccupied.

No other Category-A member was found across the searched denominator. If Gigacatalyst is the only member, that is the finding as the brief requested it be stated plainly.

### Category B — Extensibility infrastructure sold to SaaS companies

No confirmed member does **non-technical-end-user, per-tenant generation** inside a host. The two products with genuine embedded/customer-facing positioning are:

- **Superblocks** — "Embedded Apps" produce white-label customer portals; Clark AI generates apps. Superblocks reached $60M total after a $23M Series A announced 27 May 2025 (backers Kleiner Perkins, Spark Capital, Greenoaks, Meritech); TechCrunch (3 Aug 2026): "early-stage Superblocks, which has 50 employees and raised a total of $60 million as of its Series A." REVEALED behavior: docs and product pages describe the buyer's builders/business teams generating apps that IT governs; embedded apps are then exposed to end users. Not documented as end-customer self-generation. (superblocks.com; docs.superblocks.com; techcrunch.com 3 Aug 2026; MEASURED.)
- **Retool** — "External Apps"/Embed is shipped and customer-facing; AppGen adds AI generation. REVEALED behavior: developer-built apps embedded into the buyer's product/portal; external users consume. (retool.com/external; retool.com/blog/external-apps; MEASURED.)

Both are included in the master table under Category B with who-drives = developer/admin and an explicit note that "embedded/customer-facing" here means embedding vendor-built apps, not per-tenant end-user generation — the divergence the brief asked to be surfaced. The remaining brief leads (DronaHQ, Appsmith, Budibase, ToolJet, Noloco, Glide, Unqork, Betty Blocks, Creatio) were not confirmed as embedded customer-facing generation products in this pass and are treated as NEGATIVE/unverified (see excluded table). Appsmith, Budibase, and ToolJet are open-source internal-tools builders with embedding options; embedding a dashboard in an internal portal does not satisfy tests 1–2.

### Category C — Platform-native generation on the platform's own SDK

Confirmed generators producing extensions for their own platform:

- **Q2 Code** — banking (vertical). SDK-compliant extensions/integrations from natural language; Claude Code via Bedrock; within Q2 Innovation Studio. Adam Blue (Q2): "we're embedding AI directly into the SDK." Announced 16 Apr 2026. Buyer: financial institution (the platform's customer). Who drives: developers/partners. ANNOUNCED. Brief-supplied early adopter "Mid-Hudson Valley FCU" was not independently located in this pass (UNKNOWN). (press.aboutamazon.com, 16 Apr 2026.)
- **Alkami Code Studio** — banking (vertical). Generates SDK components in the SDK Wizard; closed-loop LLMs keep code private; early tester Patelco Credit Union. Beta as of 16 Apr 2026. WAITLISTED/beta. (alkami.com/news, 16 Apr 2026.)
- **Temenos Copilot for Workbench** — banking (vertical). AI Agents build custom platform extensions on the Core Extensibility Framework. Fact sheet April 2026; announced 7 May 2026. ANNOUNCED. (temenos.com, 7 May 2026.)
- **ServiceNow** — horizontal. Now Assist for Creator (application generation from a prompt) and Build Agent (autonomous developer agent using the Fluent framework). SHIPPED, admin/developer-driven. (store.servicenow.com; servicenow.com, Aug 2026.)
- **Salesforce Agentforce Vibes** — horizontal. Developer IDE (VS Code) generating Apex/LWC/agents. SHIPPED. Developer-driven; fails Category-A inclusion (see finding 8). One legacy doc page ("Agentforce Vibes Developer Guide (Deprecated)") is the retired Einstein-for-Devs guide; the active guide is current. (developer.salesforce.com, Aug 2026.)
- **Retool AppGen, Bubble AI, monday "vibe"** — horizontal, brief-named. Retool AppGen confirmed as AI generation within Retool. Bubble AI App Generator and monday "vibe" were not independently verified in this pass (UNKNOWN/brief-named).

**Vertical-SaaS gap answer:** vertical SaaS platforms HAVE shipped native extension generators — but only in banking (Q2, Alkami, Temenos), and all are developer-facing. Searches of ServiceTitan (developer portal/API only), Toast, Procore ("agent-ready" marketplace/MCP, no generator), Veeva (AI Agents, configurable/extendable agents — not an extension generator), Blackbaud (Development Agent — an agent, not a generator), and nCino returned no native extension generator. NEGATIVE outside banking.

### Category D — Reference architectures (extensibility solved with engineering)

- **Salesforce** — AppExchange went GA 14 Jan 2006 (Mike Kreaden, Salesforce, "The AppExchange Turns 10": "The AppExchange went GA on January 14, 2006," launched with "approximately 25 partners participating (we had around 70 apps at launch, about half of them developed by Salesforce)"); Apex introduced at Dreamforce 2006; Force.com 2008. To build today: register as partner/ISV, write Apex + Lightning Web Components, pass Salesforce security review, list on AppExchange. This is ~20 years of platform work; Agentforce Vibes (2025) is AI layered on top. (medium.com/@mikekreaden; salesforceben.com; MEASURED.)
- **ServiceNow** — Now Platform App Engine + ServiceNow Studio; Store apps; Build Agent generates against the Fluent framework. Third parties build low-code/scoped apps governed by the platform, distributed via the ServiceNow Store. (servicenow.com, Aug 2026; MEASURED for current state; original ship dates not established this pass — NEGATIVE.)
- **Shopify, Atlassian Forge, HubSpot** — named in the brief; their extension-architecture ship dates and current build requirements were not independently verified in this pass. NEGATIVE RESULT (not researched to primary sources).
- **Q2 Caliper SDK** — brief states it dates to 2018 (the AI generator is recent work on a years-old SDK). Not independently re-verified this pass.

### The AI-CRM question (one sentence, as requested)

No — across the AI-native/next-gen CRM category checked (Attio, Twenty, with adjacent evidence on Folk/Clay-type tools), CRMs are configurable (custom objects, fields, views, automations) and, in Attio's case, developer-extensible via a REST API and App SDK, but none was found that lets a non-technical customer obtain, by generation, a capability the vendor never designed. (Docs checked: docs.attio.com; attio.com/blog/meet-the-attio-developer-platform; attio.com/blog/introducing-attio-objects; MakerStack/rework third-party for Twenty.)

### Gigacatalyst positioning timeline (dated)

- **2025** — Company founded (Giga Next Inc.), San Francisco, team of 4; founder/CEO Namanyay Goel; YC primary partner Andrew Miklas. (ycombinator.com/companies/gigacatalyst; MEASURED.)
- **Spring 2026 (P26 batch) / Launch YC** — Production per-tenant extension positioning: "Gigacatalyst allows sales and CS teams to build missing features that customers need"; "Your customers and team members can build new missing workflows in natural language"; examples include a KPI dashboard "in ~1 minute" and an OCR photo-upload tab. Traction claims: $1M pipeline, 70% day-30 retention, 800+ features/6 weeks. (ycombinator.com/launches/QMD-gigacatalyst; MEASURED as a dated primary claim.)
- **Product Hunt launch (2026)** — Founder: "we create a proxied, pinned API layer that can handle the base API changing. We've rolled it out to our Series B customers"; "we've got 2,500 apps built already." (producthunt.com; VENDOR-CLAIMED.)
- **13 Aug 2026 (live)** — Homepage now leads with sales-enablement: "Stop burning hours on demo and POC setup / Turn customer requirements into configured demos, POCs, and implementation workspaces." Testimonial from UpKeep CEO Ryan Chan; "Over 1,000 UpKeep customers use it daily." (gigacatalyst.com; MEASURED live.)
- **YC page and founder blog (nmn.gl) as of Aug 2026** still carry the older production-extension language ("turn every customer workflow into a native part of their product").

**On dating the exact shift: NEGATIVE RESULT.** Wayback Machine snapshots for gigacatalyst.com could not be retrieved (availability API returned HTTP 429 rate-limiting; CDX and direct-snapshot URLs were not accessible). No dated pivot post was found on x.com/NamanyayG (robots-restricted) or nmn.gl/blog. The shift is therefore established as a before/after between the YC/Launch copy (Spring 2026) and the live homepage (Aug 2026), but not to a specific date. The homepage social-preview asset is versioned "?v=5," implying several prior homepage revisions.

**Labeled inference (kept separate from facts) — which of the two readings the evidence supports.** The brief posed two explanations for a move from production per-tenant extension toward prototypes/demos: (a) production per-tenant extension proved too hard, most likely a correctness/verification problem; (b) the buying motion is easier upstream, where a prototype carries no production risk. *Inference:* the live copy ("demos, POCs, and implementation workspaces") is consistent with reading (b) — a move upstream to a lower-risk buying motion — and the persistence of a named production customer (UpKeep, "used daily") argues against a total abandonment of production use. The evidence does not independently establish reading (a): no statement from the company cites correctness/verification failure, and the only correctness-failure quote in the record belongs to CodeParrot, a different company. This is a hypothesis about the world consistent with the observed copy change, not a conclusion; the founder's stated rationale is absent from the public record (UNKNOWN).

### Pricing findings

- **Retool** — Team $10/builder + $5/internal user (annual); Business ~$50/builder; external users on Business/Enterprise, custom-priced; Enterprise custom. External/embedded apps gated to Business+. (vendr.com/marketplace/retool; retool.com; MEASURED, captured Aug 2026.)
- **Superblocks** — Pro ~$49/creator + $15/end user; embedded apps, SSO, external users gated to Enterprise (custom). (budibase.com comparison; superblocks.com; MEASURED, captured Aug 2026.)
- **Gigacatalyst** — "Pricing is custom and requires contacting the sales team; no public tiers." NEGATIVE RESULT for published pricing. (hokai.io; gigacatalyst.com.)
- **Per-end-customer / platform-fee / revenue-share model in Category A or B** — no published figure found. NEGATIVE RESULT. No pricing comparable exists in the public record for the specific A/B outcome.

### Revealed-buyer list (named SaaS/software companies that publicly adopted embedded customer-facing extensibility)

- **Greenly** (carbon accounting) — Retool Embed; "Rapidly iterating on customer-facing products with Retool Embed... Embedding Retool apps in a unified customer portal." (retool.com/customers/greenly; MEASURED — vendor case study.)
- **OrangeTheory Fitness** — Retool external apps across 1,600+ locations (franchisee/operator-facing). (retool.com/blog/external-apps; MEASURED — vendor claim.)
- **UpKeep** — Gigacatalyst (testimonial, "Over 1,000 UpKeep customers use it daily"). (gigacatalyst.com, 13 Aug 2026; VENDOR-CLAIMED.)

The list is short by design; these are the named public adopters located.

### What platforms say about not building per-tenant customization

No explicit support-doc statement of the form "we will not build a one-customer feature" was located. NEGATIVE RESULT for that exact quote. The closest primary rationale is the architectural justification for isolating per-client code from core: Temenos states its Extensibility Framework provides "clear separation of core and extensions ownership," so "platform code is never modified" and upgrades stay simple. (journey.temenos.com/docs; temenos.com/innovation/platform; MEASURED.) A ServiceNow community developer blog documents the current ceiling of prompt-to-app generation: Build Agent "is not an end-to-end app builder — not yet." (servicenow.com community, 2026.)

### Consultancies / agencies (kept out of the product tables)

Collected as evidence that demand exists at a price: Salesforce ISV/consulting partners (AppExchange ecosystem); ServiceTitan implementation partners; Shopify Plus agencies; HubSpot Solutions Partners; and Retool consultancies such as **Bold Tech**, which advertises "200+ custom internal applications on platforms like Retool" including client-specific tools and a "custom-made mobile app" for Red Roots Capital. (blog.boldtech.dev; MEASURED — agency's own claims, VENDOR-CLAIMED.) These build per-tenant features by hand and are disqualified from the product tables under test 4.

## 4. Tables

### Master table (included companies)

| Company | Category | Who drives | Who buys | Where output runs | Integration model | Safety model | Stage / customers | Verification |
|---|---|---|---|---|---|---|---|---|
| Gigacatalyst (Giga Next Inc.) | A | non-technical end user + sales/CS (stated) | the SaaS platform (B2B2B) | embedded beside host | agentic API discovery (+ proxied/pinned API layer) | sandbox + inherited auth/RBAC | YC S2026; team 4; founded 2025; named customer UpKeep (VENDOR-CLAIMED); live positioning now demo/POC | Passes tests 1–4 as originally positioned; verified via ycombinator.com/launches (2026) and gigacatalyst.com (13 Aug 2026). Note live repositioning toward demos/POCs. |
| Superblocks | B | developer / admin (Clark AI) | the SaaS platform / end business | embedded (white-label portal) | SDK/embed + API | approved-API scoping, RBAC, audit logs | Series A ($23M, 27 May 2025), $60M raised total, 50 staff | Passes test 1 (host = buyer's product) and 4 (tooling); FAILS "non-technical end user" and end-customer self-generation; verified via superblocks.com/product/embedded-apps + docs + techcrunch.com (3 Aug 2026). |
| Retool (External Apps / Embed + AppGen) | B | developer | the end business / SaaS platform | embedded / standalone portal | SDK/embed + API; direct DB | approved-API scoping, RBAC, SSO | Public; adopters Greenly, OrangeTheory | Passes test 4; PARTIAL on 1–2 (developer-built, not end-customer generation); verified via retool.com/blog/external-apps + retool.com/customers/greenly (Aug 2026). |
| Q2 Code | C | developer / FI partner | the FI (platform's customer) | host SDK extension | SDK generation (Claude/Bedrock) | governed env, enterprise controls | ANNOUNCED 16 Apr 2026 | Passes test 1,3,4; who-drives = developer; verified via press.aboutamazon.com (16 Apr 2026). |
| Alkami Code Studio | C | developer / FI | the FI | host SDK component | SDK Wizard generation, closed-loop LLM | governance/security, private code | BETA 16 Apr 2026; tester Patelco CU | Passes 1,3,4; developer-driven; verified via alkami.com/news (16 Apr 2026). |
| Temenos Copilot for Workbench | C | developer | the bank | Core Extensibility Framework extension | AI Agents on Extensibility Framework | core/extension separation | ANNOUNCED 7 May 2026 | Passes 1,3,4; developer-driven; verified via temenos.com/press_release (7 May 2026). |
| ServiceNow (Now Assist for Creator / Build Agent) | C | admin / developer / "business technologist" | the enterprise | Now Platform app (Fluent) | prompt-to-app generation + Fluent | governed platform, audit, change mgmt | SHIPPED | Passes 1,3,4; not per-tenant end-user; verified via store.servicenow.com + servicenow.com (Aug 2026). |
| Salesforce Agentforce Vibes | C | developer | the enterprise | Apex/LWC/agents on Salesforce | VS Code IDE generation (Claude/Mastra) | Trust Layer, review required | SHIPPED (from Oct 2025) | Passes 3,4; FAILS Category-A framing (developer IDE, not per-tenant embed); verified via developer.salesforce.com (Aug 2026). |

### "Excluded and why"

| Company | Considered as | Failed test / reason |
|---|---|---|
| Salesforce Agentforce Vibes (as Category A) | per-tenant CRM extension | Test 2/who-drives: developer IDE building on Salesforce; not a third party embedding per-tenant self-serve generation. Retained only as Category-C, developer-driven. Verified via developer.salesforce.com. |
| Appsmith | Category B embedded | Tests 1–2: open-source internal-tools builder; embedding = dashboard in a portal, not end-customer generation inside a host. |
| Budibase | Category B embedded | Tests 1–2: internal-tools/low-code; embedding options are internal-portal-oriented. |
| ToolJet | Category B embedded | Tests 1–2: open-source internal-tools; not documented as customer-facing per-tenant generation. |
| DronaHQ | Category B embedded | UNKNOWN/unverified as embedded customer-facing generation this pass; excluded pending primary docs. |
| Noloco | Category B embedded | Configuration-oriented client portals over a fixed model; not generation of new capability. |
| Glide | Category B / native mobile | Standalone app builder; output not connected to a pre-existing host's data/auth (test 1). |
| Unqork | Category B | No-code enterprise app platform; not customer-facing per-tenant generation into someone else's host. UNKNOWN this pass. |
| Betty Blocks, Creatio | Category B | Low-code app platforms; configuration within vendor-defined space; not confirmed customer-facing generation. |
| Airplane.dev | Category B / graveyard | Internal-tools platform; acquired by Airtable, product sunset 1 Mar 2024 → graveyard, not master. |
| Bubble AI / monday "vibe" | Category C | Brief-named; not independently verified this pass. UNKNOWN. |
| Veeva AI Agents | Category C vertical | Agents (drafts/answers/acts), configurable/extendable — not a native extension generator. Disqualifier (AI assistant). Verified via veeva.com. |
| Blackbaud Development Agent | Category C vertical | An agent ("operates like an extension of your staff"), not a code/extension generator. Disqualifier. Verified via blackbaud.com. |
| Procore | Category C vertical | Developer portal + "agent-ready" marketplace/MCP; no natural-language extension generator found. NEGATIVE. Verified via developers.procore.com. |
| ServiceTitan | Category C vertical | Developer portal/API only; no generator found. NEGATIVE. |
| Builder.ai | Category A/graveyard | Built standalone apps for customers (not extension of someone else's host); insolvent → graveyard. |
| CodeParrot | Category A/graveyard | Figma-to-code for developers; not host extension; shut down → graveyard. |

### Positioning map — who drives it (rows) × where output runs (columns)

| | standalone | embedded beside host | inserted into host screens | native mobile app |
|---|---|---|---|---|
| **developer** | Retool, Superblocks | Retool Embed, Superblocks Embedded; Q2, Alkami, Temenos, ServiceNow, Salesforce (as SDK extensions) | ServiceNow (Fluent artifacts) | **EMPTY — none found** |
| **admin / power user** | ServiceNow App Engine | ServiceNow Now Assist for Creator | (config-level) | **EMPTY — none found** |
| **non-technical end user** | **EMPTY — none found** | **Gigacatalyst (as originally positioned; live copy now demo/POC)** | **EMPTY — none found** | **EMPTY — none found** |

Named empty cells: every "native mobile app" cell is empty; the "non-technical end user × standalone / inserted-into-host" cells are empty; and the "non-technical end user × embedded" cell has a single, now-repositioned occupant.

### Graveyard table

| Company | What they tried | Raised | Outcome | Stated cause (verbatim where available) |
|---|---|---|---|---|
| Builder.ai | AI-generated custom apps for SMBs ("Natasha") | "more than $500 million" (FT); CB Insights: $429.5M / 8 rounds | Insolvency 20 May 2025; Chapter 7 (Delaware) | Sifted (citing FT): "lenders called a default on the $50m loan the startup raised in October after Builder's restated accounts marked down a prior $220m revenue estimate to around $55m… previously reported sales for 2023 had also been marked [down] from $180m to $45m." (MEASURED-secondary.) Note: standalone app builder, not host extension. |
| CodeParrot (YC W23) | Figma/screenshot → production frontend code | ~$500K (YC) | Shut down July 2025; MRR peaked ~$1.5K | "the generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value." (techstartups.com, 9 Dec 2025.) |
| Airplane.dev | Internal-tools/scripts platform | $40.5M | Acquired by Airtable (announced late 2023); product sunset 1 Mar 2024; acqui-hire | Former employee: acquisition despite "tens of millions of dollars in the bank... solid revenue growth"; "the Airplane product would be shut down." (yolken.net; MEASURED-primary blog.) Not a host-extension product. |
| Internal.io | Internal-tools builder | n/d | Closed Q4 2023 | Cited alongside Airplane as an internal-tools shutdown. (boldtech.dev; third-party.) |

### Category-D reference-architecture table

| Platform | Extension architecture ship date | Build duration (where documented) | What a third party must do today |
|---|---|---|---|
| Salesforce | AppExchange GA 14 Jan 2006; Apex Dreamforce 2006; Force.com 2008 | ~20 years of cumulative platform work; AppExchange project "design, code, and launch by the next Dreamforce" (~1 year) | Join partner/ISV program; build in Apex + LWC; pass security review; list on AppExchange. (medium.com/@mikekreaden; salesforceben.com) |
| ServiceNow | Now Platform / App Engine / Store (dates not verified this pass) | n/d — NEGATIVE | Build scoped/low-code app in Studio (optionally via Build Agent/Fluent); publish to ServiceNow Store. (servicenow.com) |
| Q2 | Caliper SDK dates to 2018 (per brief; not re-verified) | AI (Q2 Code) is 2026 work on the 2018 SDK | Build on Q2 Digital Banking Platform via Innovation Studio/SDK; Q2 Code assists. (press.aboutamazon.com) |
| Shopify / Atlassian Forge / HubSpot | NOT VERIFIED this pass | NEGATIVE | NEGATIVE — not researched to primary sources. |

### Machine-readable CSV (master table)

```csv
company,category,who_drives,who_buys,where_output_runs,integration_model,safety_model,stage,verification
Gigacatalyst,A,non-technical end user (stated),SaaS platform (B2B2B),embedded beside host,agentic API discovery + pinned proxy,sandbox+inherited auth/RBAC,"YC S2026; team 4; customer UpKeep (vendor-claimed); live copy now demo/POC",ycombinator.com/launches 2026 + gigacatalyst.com 2026-08-13
Superblocks,B,developer/admin,SaaS platform/end business,embedded white-label portal,SDK/embed+API,approved-API scoping+RBAC+audit,"Series A 23M 2025-05-27; 60M total; 50 staff",superblocks.com + techcrunch.com 2026-08-03
Retool,B,developer,end business/SaaS platform,embedded/standalone portal,SDK/embed+API+direct DB,approved-API scoping+RBAC+SSO,"public; Greenly OrangeTheory",retool.com/blog/external-apps 2026-08
Q2 Code,C,developer/FI,financial institution,host SDK extension,SDK gen (Claude/Bedrock),governed env,ANNOUNCED 2026-04-16,press.aboutamazon.com 2026-04-16
Alkami Code Studio,C,developer/FI,financial institution,host SDK component,SDK Wizard gen closed-loop LLM,governance/private code,BETA 2026-04-16 tester Patelco,alkami.com/news 2026-04-16
Temenos Copilot for Workbench,C,developer,bank,Core Extensibility Framework extension,AI Agents on Extensibility Framework,core/extension separation,ANNOUNCED 2026-05-07,temenos.com 2026-05-07
ServiceNow Now Assist for Creator/Build Agent,C,admin/developer,enterprise,Now Platform app (Fluent),prompt-to-app+Fluent,governed platform+audit,SHIPPED,servicenow.com 2026-08
Salesforce Agentforce Vibes,C,developer,enterprise,Apex/LWC/agents,VS Code IDE gen (Claude/Mastra),Trust Layer+review,SHIPPED from 2025-10,developer.salesforce.com 2026-08
```

## 5. What the evidence does and doesn't support

**Established (MEASURED / well-sourced):**
- Platform-native AI generators that produce SDK-compliant extensions for the platform's own product shipped or were announced in banking in April–May 2026 (Q2, Alkami, Temenos) and exist horizontally (ServiceNow, Salesforce). All are developer- or admin-driven.
- Embedded/customer-facing low-code (Superblocks, Retool) is real and shipping, but developer/admin-driven; "embed" commonly means embedding vendor-built apps in a portal.
- Gigacatalyst is the sole located entity positioned for non-technical-end-user per-tenant generation into a host, and its live homepage has moved to a demo/POC/implementation motion while its YC page retains the older production framing.
- AI-native CRMs are configurable and (Attio) developer-extensible, not generation-extensible for non-technical customers.

**Open (unresolved):**
- The exact date and stated rationale of Gigacatalyst's repositioning (Wayback inaccessible; no founder pivot post found).
- Whether Gigacatalyst's production per-tenant extension remains a live offering alongside the demo/POC motion (the UpKeep testimonial suggests some production use continues; the homepage foregrounds demos/POCs).
- Reconciliation of Gigacatalyst's conflicting traction figures (70% vs 89% day-30 retention; 670 vs 800+ vs 2,500 apps/features).
- Extension-architecture ship dates for Shopify, Atlassian Forge, HubSpot, and ServiceNow (not verified).

**Negative results (searched and not found):**
- No product generating per-tenant functionality inside a native mobile app (searched all A/B/C candidates).
- No non-banking vertical SaaS platform with a native extension generator (searched ServiceTitan, Toast, Procore, Veeva, Blackbaud, nCino).
- No AI-native CRM extensible by generation for a non-technical customer.
- No consensus analyst/investor category name for AI-generated per-tenant extension.
- No published per-end-customer / platform-fee / revenue-share pricing for Category A or B.
- No explicit platform support-doc quote refusing to build one-customer features.
- Second Category-A member: none found beyond Gigacatalyst.

**Labeled inference on why cells are empty (hypotheses, not conclusions):** The "native mobile app" row being uniformly empty is consistent with the technical reality that native mobile requires app-store review and compiled binaries, which resist per-tenant runtime generation; the located generators all target web/SDK artifacts that can be deployed without store review. The "non-technical end user" row being nearly empty is consistent with the correctness/verification barrier visible in the graveyard (CodeParrot's verbatim cause of death), which raises the risk of self-serve generation into production — but this is an inference from adjacent evidence, not a measured cause for the empty cells.

**What would change these conclusions (open questions / absent datapoints):** a retrievable Wayback history for gigacatalyst.com dating the pivot; a founder statement of the pivot rationale; a second Category-A vendor; a non-banking vertical SaaS shipping a native generator; any product generating per-tenant functionality in a native mobile app; published A/B pricing; and primary extension-architecture ship dates for Shopify/Forge/HubSpot.

## 6. Circulating statistics and claims that do not survive sourcing

- **Gigacatalyst "90.8% adoption / 89% day-30 retention / 670 microapps"** (hokai.io) conflicts with the founder's own YC Launch figures ("70% day-30 retention," "800+ features"). The HokAI page self-describes as "a preliminary assessment based on limited publicly available information." Trail dead-ends at an aggregator, not a primary source. Treat as unverified.
- **Gigacatalyst "$1M pipeline unblocked / $100K churn prevented in 6 weeks"** — VENDOR-CLAIMED via YC Launch; no independent confirmation; no named customer attached to the dollar figures.
- **Builder.ai "raised"** appears as "more than $500 million" (FT), $429.5M over 8 rounds (CB Insights), ~$450M, and with a "$1.3–1.5B valuation" across outlets; the revenue-restatement specifics (2024 marked down from $220m to ~$55m; 2023 from $180m to $45m, per Sifted/FT) recur consistently, but the raise figure varies by source. Shown as a range, not a single number.
- **"Mid-Hudson Valley FCU" as Q2 Code early adopter** (from the brief) was not located in the Q2 press materials retrieved this pass. UNKNOWN pending the primary release text.
- **Low-code market size "$44.5B in 2026 / 75% of new apps"** — a Gartner FORECAST repeated by vendors (Kissflow, citing Gartner: "$44.5 billion by 2026, with 75 percent of new applications built on low-code and 80 percent of low-code users coming from" outside IT; ~19% CAGR). Not evidence of adoption of per-tenant generation.

## 7. Caveats

- **Recency:** Categories A and C are moving weekly; Q2/Alkami/Temenos generators are April–May 2026 announcements (some beta/announced, not GA), and Gigacatalyst's positioning changed between its Spring 2026 YC copy and its August 2026 homepage.
- **Vendor bias:** all traction, adoption, and outcome figures from company channels (Gigacatalyst, Superblocks, Retool, Q2, Alkami, Temenos) are VENDOR-CLAIMED and unaudited.
- **Wayback limits:** gigacatalyst.com snapshot history could not be retrieved (rate-limiting/permissions), so the pivot is bracketed, not dated.
- **Private-company opacity:** Gigacatalyst (4 people), Superblocks, and most Category-B leads are private; funding/customer detail is thin or self-reported.
- **Computed vs reported:** no figures in this report were averaged; conflicting numbers are shown side by side. Where a value was inferred (e.g., "~20 years of platform work" for Salesforce), it is derived from the dated ship points (2006 → 2026), not reported as such by the vendor.
- **Denominator honesty:** several brief-named leads (DronaHQ, Unqork, Betty Blocks, Creatio, Bubble, monday, Shopify/Forge/HubSpot architectures, Mid-Hudson Valley FCU) were not resolved to primary sources this pass and are marked UNKNOWN/NEGATIVE rather than assigned a category.