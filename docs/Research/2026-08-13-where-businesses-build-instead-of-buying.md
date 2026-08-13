# Where Businesses Build Custom Software Instead of Buying Off-the-Shelf: An Evidence Map

## 1. TL;DR
- The only sizable quantitative dataset on build-vs-buy frequency by category is vendor-run: Retool's 2026 "Build vs. Buy Shift" survey of 817 of its own customers/builders (VENDOR-CLAIMED), which ranks workflow automation (35%), internal admin tools (33%), BI/reporting (29%), CRM and form builders (25%), project management (23%), and customer support (21%) as the categories most "under replacement pressure." No independent, audited dataset with a hard denominator exists.
- Documented individual cases (engineering blogs, vendor case studies, forums) cluster overwhelmingly in internal admin/operations tooling, analytics/BI, and operational layers around a retained system-of-record (CRM, ticketing); the single most common "before" state in the case evidence is spreadsheets (Google Sheets/Excel), not a competing SaaS product.
- The strongest single piece of case evidence is Airbnb's build of Apache Superset to replace Tableau (primary source, named capability quoted); most other named cases are vendor case studies from internal-tools platforms (Retool, Superblocks) and must be read as vendor-claimed.

## 2. Key Findings
1. **Retool 2026 survey category ranking (VENDOR-CLAIMED).** Among 817 Retool customers/builders surveyed in late 2025, "every SaaS category is under replacement pressure," led by workflow automations (35%) and internal admin tools (33%), then BI tools (29%), CRMs and form builders (25%), project management (23%), and customer support (21%). Source: Retool blog, "The Build vs. Buy Shift," Feb 17, 2026.
2. **Headline replacement figure (VENDOR-CLAIMED).** Per Retool's "The Build vs. Buy Shift" report (via Business Wire, Feb 17, 2026), "35% of teams have already replaced at least one SaaS tool with a custom build and 78% expect to build more custom internal tools in 2026." Sample: 817 Retool customers/builders surveyed late 2025; sponsor: Retool; method: mixed quantitative + open-ended; David Hsu (CEO/founder) quoted.
3. **Shadow IT prevalence within the same survey (VENDOR-CLAIMED).** 60% of builders "have built something outside of IT oversight in the past year"; reasons cited: build faster than IT (31%), existing SaaS insufficient (25%), IT process too slow (18%) (N=488). Source: Retool blog, Feb 17, 2026.
4. **What gets built in the shadows (VENDOR-CLAIMED).** Internal tools/apps (53%), automated workflows (53%), custom dashboards (51%), APIs/webhooks (39%), data pipelines (32%), database structures (30%). Source: Retool blog, Feb 17, 2026.
5. **Airbnb → Apache Superset (MEASURED / primary).** Per Superset creator Maxime Beauchemin (opensource.com, Apr 2021), Tableau "couldn't connect natively to Apache Druid and Trino/Presto"; with Tableau's "'Live Mode' misbehaving in intricate ways at the time... we were steered towards using Tableau Extracts" which "crumbled under the data volumes"; and "we had a limited number of licenses for Tableau, and generally had an order of magnitude more employees that wanted/needed access... than our contract allowed." Built in-house (2015 hackathon); open-sourced 2016; Apache top-level project 2021.
6. **DoorDash in-house case management (MEASURED / primary).** DoorDash replaced fragmented third-party tools and a Google Sheets–based "Realtime Disaster Tracker" with a React/Kotlin in-house case-management platform, citing improved "cost forecasting," reduced "vendor lock-in," and elimination of "cascading failures." Multi-year build by in-house engineers. Source: DoorDash Engineering Blog, Apr 15, 2025.
7. **DoorDash Dasher tooling via Retool (VENDOR-CLAIMED).** Separately, DoorDash runs 40+ operational tools on Retool after outgrowing a Django Admin panel. Per Retool's customer page, the Dasher rewards program (run by director of engineering Rohan Chopra's team) previously "required team members to fill out a massive spreadsheet manually, hand over the data to the engineering team, and run weekly scripts," with "mistyped data, missed handoffs, and uncaught errors"; Retool says it cut build time "from 1-2 months to 30-60 minutes," and its use-cases page states "DoorDash saved $6M and 36,000+ hours."
8. **The dominant "before" state is spreadsheets, not a rival SaaS.** In the case corpus (Getaround, DoorDash, Brex, ClickUp, Harmonic, SmplCo), the pre-custom state is most often Google Sheets/Excel or hardcoded logic, with a named competing SaaS as the "before" only in a minority (Airbnb→Tableau; Pearmill→Mode Analytics/Retool). Source: multiple, below.
9. **Reverse migration / retention cases exist and are documented.** incident.io's engineer describes an in-house expenses tool that became an unmaintainable liability ("who can fix all the little bugs?"); Ramp migrated to a purchased ATS (Ashby) rather than keeping a custom build. Sources: incident.io blog Jul 12, 2022; subagent findings.
10. **Recruiting/ATS and core HR/payroll returned essentially no named build-instead-of-buy cases** despite targeted search; the ATS evidence points the other way (buy dominates). NEGATIVE RESULT.

## 3. Details

### 3.1 The primary ranking and what it is measured on
The only category-level frequency ranking found is the **Retool 2026 "Build vs. Buy Shift" report** (VENDOR-CLAIMED). It is measured on *stated* replacement pressure reported by 817 Retool customers and builders surveyed in late 2025 — i.e., a stated-preference survey of a population already selected for building internal tools. It is not a measure of the general population of companies, and Retool sells the destination. Its own category ranking, verbatim from the report:

- Workflow automations — 35%
- Internal admin tools — 33%
- BI tools — 29%
- CRMs and form builders — 25%
- Project management — 23%
- Customer support — 21%

Retool frames these as categories "under replacement pressure," not as measured completed replacements. The report also states 35% "have already replaced at least one SaaS tool" — a completed-action figure — but does not break that 35% down by category, so the per-category numbers above are the "at risk" measure, not the "already replaced" measure. This distinction is in the source and is preserved here.

Because no independent survey with a disclosed methodology and a hard denominator was found, **any category ranking in this report that is not the Retool figure is derived from case counts**, and the denominator is "documented cases located in this search," which is not a random or complete sample. That derived ranking is stated in §3.2 and labeled ESTIMATED.

### 3.2 Case-count ranking (ESTIMATED; derived from located cases)
Counting only cases with a named company and a named capability (the precision bar set in the brief), the located cases distribute roughly as follows: internal admin / operations tooling is the largest bucket (DoorDash case management, DoorDash Dasher tools, Brex, Ramp, Getaround, Treasure Financial, Casechek); analytics/BI second (Airbnb, Pearmill); operational layers on a retained CRM/ticketing third (Neo4j renewals, ClickUp GTM tools, Harmonic); e-commerce ops (Afloat) and billing ops (Casechek) thin; ERP present mainly as consultant-marketing rather than named primary cases; recruiting/ATS, core HR/payroll, and pure warehouse/inventory essentially empty of named cases. This ordering is an artifact of where documentation exists (internal-tools vendors publish case studies; ATS builds are rarely blogged), not necessarily of real-world frequency.

### 3.3 Ceiling taxonomy across located cases
Classifying each case by the brief's taxonomy (recording the capability the source identifies as primary):
- **CONFIGURATION** (tool could not express required data model/view/workflow): Airbnb (Druid/Trino connectivity, extract model), Brex (hardcoded notification content not editable by non-technical staff), Neo4j (no renewals workflow in Salesforce), ClickUp (no vendor with "the right integrations"). Most common ceiling in the corpus.
- **SCALE / PERFORMANCE**: Airbnb (Tableau Extracts "crumbled under the data volumes"), Getaround (spreadsheet "became slow to load").
- **INTEGRATION**: Getaround ("couldn't integrate it with other tools"), DoorDash case management (fragmented tools, no single source of truth).
- **COST AT SCALE**: Airbnb (Tableau license cap below demand), ClickUp (cut ~$200K/yr automation spend), DoorDash Retool ("$6M" claim), and the recurring theme in the Retool survey of per-viewer BI pricing.
- **COMPLIANCE / CONTROL**: DoorDash case management ("vendor lock-in," "cost forecasting," "system isolation").
- **RELIABILITY / SUPPORT**: Harmonic ("their support was so slow that it was faster for me to rebuild the product inside Retool").
- **ORGANISATIONAL**: incident.io reverse case (personnel left; tool orphaned) — organisational cause on the maintenance side.

### 3.4 Decider taxonomy
- **TECHNICAL** (engineer/CTO/technical founder): Airbnb (Beauchemin), DoorDash (engineering teams; Rohan Chopra), Brex (engineering manager Derek Stavis), Pearmill (CTO Nima Gardideh), Harmonic (Head of Automation and Tooling Miles Konstantin).
- **SEMI-TECHNICAL** (power user/analyst writing SQL/no-code): Getaround (ops analyst using Retool + BigQuery), Casechek (PMs with "only basic SQL knowledge and no frontend experience").
- **NON-TECHNICAL**: ClickUp GTM decision framed by a GTM AI Product Manager (borderline semi-technical).
- **DECIDER UNKNOWN**: Afloat, Treasure Financial, Neo4j (source does not clearly identify the individual decider).

### 3.5 Sequences, timing, first artifact
- **Recurring sequence:** spreadsheet → internal-tools platform (Retool/Superblocks) or in-house app. Seen at Getaround, DoorDash (Dasher tools), Casechek, and described generically across Retool material.
- **Alternative sequence:** SaaS system-of-record retained + custom operational layer built on top (Neo4j on Salesforce; ClickUp with Salesforce/Zendesk/Snowflake; Harmonic with Salesforce/Gong/Slack). This "keep the record, build the workflow" pattern recurs.
- **Timing:** No dataset ties graduations to a specific headcount/revenue/funding threshold. The case evidence is anecdotal on timing. NEGATIVE RESULT on a clustering distribution.
- **First artifact:** most commonly a dashboard/admin panel or a single high-pain workflow (DoorDash disaster tracker; Brex template manager; Getaround "Parkifier"; Casechek "Bill Explorer").

### 3.6 Reverse migrations and retention
- **Reverse (built → returned/regretted):** incident.io engineer's in-house expenses app — stated reason to build: "we really didn't like the expenses software... decided we could do better"; stated reason it failed: escalating feature requests, opportunity cost ("sorry, I was fixing the expenses system"), and orphaned maintenance after builders left.
- **Retention (considered build, stayed / kept SaaS where it worked):** the Groovy Web case describes an $18M-ARR SaaS company that "did not stop using Salesforce Einstein for sales... kept the SaaS tool where it worked and built custom where it could not" (consultant-marketing). Ramp reportedly moved *to* a purchased ATS (Ashby) rather than maintaining a custom build.

### 3.7 Stated wishes (verbatim)
- Harmonic (Miles Konstantin): "Their support was so slow that it was faster for me to rebuild the product inside Retool than wait for support to get back to me."
- ClickUp (Borys Aptekar): "We realized we could build these tools ourselves and save on multiple subscriptions."
- Getaround (Kathy Dieppa): "Using Google Sheets was not easy... the spreadsheet became slow to load and hard to navigate... they couldn't integrate it with other tools."
- Airbnb (Beauchemin): Tableau "couldn't connect natively to Apache Druid and Trino/Presto."
- Casechek (Steve Kania): "Customer Success can now immediately answer billing questions themselves without waiting hours for Engineering."

### 3.8 Spreadsheets in the sequence
Spreadsheets appear (a) as the "before" state that triggers the build (Getaround, DoorDash Dasher rewards, DoorDash disaster tracker, Casechek, ClickUp CRM workflow), and (b) as a persistent shadow layer the build is meant to eliminate. Retool's own materials repeatedly position Sheets as "where many internal tools start," and one Retool consultant advises against re-integrating Sheets because it "reintroduces all the problems you were trying to solve."

### 3.9 Products positioned as "start simple, extend as you grow"
- **Retool** — operating; private company; claims 10,000+ customers including Amazon, Stripe, Brex, Orangetheory (VENDOR-CLAIMED). Evidence of graduation to full custom code exists (its own docs note teams "later migrate to databases as data volume or complexity grows").
- **Airtable** — operating. Its record ceilings are set by plan: per Carly AI's "Airtable Record Limit" (2026), Free 1,000, Team 50,000, Business 125,000, Enterprise Scale ~500,000 records per base (Team $20/seat/mo, Business $45/seat/mo). The Kreante agency ("Airtable as Database vs Supabase," updated June 2026) places the cost inflection point at "roughly 5 to 8 seats... Above 8 seats, Supabase becomes significantly cheaper because its pricing is per project, not per user," citing an ~80,000-record/12-seat client at ~$540/month hitting 4–6-second lookups. (Both are consultant/review sources, not Airtable.)
- **Notion** — operating; documented hard limits include a 2,000-character field cap that blocked one content-automation workflow (blog/forum).
- **Superblocks, Appsmith, Coda** — operating (Superblocks and Appsmith positioned explicitly as Retool alternatives).
- Current status of each: operating; no located evidence of shutdown or acquisition among these named platforms as of this search.

## 4. Tables

### 4.1 Category-level frequency (the only quantitative ranking found)
| Category | Figure | What it measures | Sample / sponsor | Date | Tag |
|---|---|---|---|---|---|
| Workflow automations | 35% | "under replacement pressure" (stated) | 817 Retool builders / Retool | Feb 2026 | VENDOR-CLAIMED |
| Internal admin tools | 33% | same | same | Feb 2026 | VENDOR-CLAIMED |
| BI tools | 29% | same | same | Feb 2026 | VENDOR-CLAIMED |
| CRMs & form builders | 25% | same | same | Feb 2026 | VENDOR-CLAIMED |
| Project management | 23% | same | same | Feb 2026 | VENDOR-CLAIMED |
| Customer support | 21% | same | same | Feb 2026 | VENDOR-CLAIMED |
| "Already replaced ≥1 SaaS tool" | 35% | completed action (stated) | same | Feb 2026 | VENDOR-CLAIMED |

### 4.2 Per-case table
| Company | Industry | Category | Before | Missing capability (quoted where possible) | Ceiling | Decider | Who built | First artifact | Outcome | Evidence quality | Source / date |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Airbnb | Travel marketplace | Analytics/BI | Tableau | "couldn't connect natively to Apache Druid and Trino/Presto"; extracts "crumbled under the data volumes"; license cap | CONFIG + SCALE + COST | Technical | In-house | Superset (Panoramix) | Still on it; open-sourced | PRIMARY blog | Airbnb Tech Blog / opensource.com, 2015–2021 |
| DoorDash | Food delivery | Support/case mgmt | Fragmented 3rd-party tools + Google Sheets | fragmentation, "vendor lock-in," "cost forecasting," "cascading failures" | INTEGRATION + CONTROL | Technical | In-house (React/Kotlin) | Teammate HQ UI | Still on it | PRIMARY blog | DoorDash Eng, Apr 15 2025 |
| DoorDash | Food delivery | Internal admin/ops | Django Admin + "massive spreadsheet" + weekly scripts | "mistyped data, missed handoffs, and uncaught errors"; permissioning gaps | CONFIG + COST | Technical | In-house on Retool | Dasher rewards tool | Still on it; "$6M / 36,000+ hours" claim | VENDOR-CLAIMED | Retool customer page |
| ClickUp | Productivity SaaS | Marketing automation/GTM | Multiple AI vendor subscriptions | none had "the right integrations or the staying power" | INTEGRATION + COST | Semi/Non-technical | In-house on Retool | 6 AI GTM tools | Still on it; ~$200K/yr saved | VENDOR-CLAIMED | Retool blog, Feb 2026 |
| Harmonic | Startup data | Internal tooling | $20K/yr third-party tool | "their support was so slow that it was faster... to rebuild" | RELIABILITY/SUPPORT | Technical | In-house on Retool | Rebuilt the tool | Still on it; 33 apps | VENDOR-CLAIMED | Retool press release, Feb 17 2026 |
| Getaround | Car-sharing | Inventory/asset ops | Google Sheets | "slow to load," "couldn't integrate it with other tools" | SCALE + INTEGRATION | Semi-technical | In-house on Retool | "Parkifier" registry | Still on it | VENDOR-CLAIMED | Retool blog, Oct 20 2021 |
| Casechek | Healthcare supply chain | Billing ops | Manual/eng requests | teams "needed dedicated back office tools to see the status or history of a bill" | CONFIG | Semi-technical | PMs on Superblocks | "Bill Explorer" | Still on it; onboarding 70% faster | VENDOR-CLAIMED | Superblocks, Mar 8 2023 |
| Ramp | Fintech | Financial ops/underwriting | Salesforce / in-house | forced to "Frankenstein" Salesforce or build painfully in-house | CONFIG | Technical | In-house on Retool | Underwriting command center | Still on it; 100+ tools | VENDOR-CLAIMED | Retool customer story |
| Brex | Fintech | Internal admin | Hardcoded app logic | "non-technical employees couldn't make changes to... notifications because they were hardcoded" | CONFIG | Technical | In-house on Retool | Template Manager | Still on it; ~75% less code claim | VENDOR-CLAIMED | Retool customer story |
| Pearmill | Marketing agency | Analytics/BI | Retool, Mode Analytics, GCP Scheduler | consolidation; "replaced Retool, Mode Analytics and Google Cloud Scheduler... saving money" | COST + CONFIG | Technical | In-house on Superblocks | Consolidated tooling | Still on it | VENDOR-CLAIMED | Superblocks testimonial |
| Neo4j | Database vendor | CRM/renewals | Salesforce (kept as SoR) | no renewals workflow (track timelines, health, forecasts) | CONFIG | Decider unknown | In-house on Retool | "Renewals Control Center" | Still on it | VENDOR-CLAIMED | Retool, Feb 2026 |
| Afloat | E-commerce gifting | E-commerce ops | Shopify admin + manual | real-time delivery tracking, role-based partner views | CONFIG + INTEGRATION | Decider unknown | Agency (Akveo) on Retool | Partner + admin dashboards | Delivered | AGENCY marketing | Akveo blog |
| JetRuby | Software agency | ERP | SAP/NetSuite evaluated (used nothing) | "rigid workflows," customization "started over $50,000," vendor lock-in | CONFIG + COST | Technical | In-house | Custom ERP | Still on it | ENGINEERING blog (self-promotional) | jetruby.com |
| incident.io (founder's prior project) | — | Finance/expenses | Commercial expenses software | "confusing and over-complex"; then feature-request overload, orphaned maintenance | ORGANISATIONAL | Technical | In-house (side project) | Expense app | Abandoned/regretted (reverse case) | PRIMARY blog | incident.io, Jul 12 2022 |

### 4.3 CSV
```
company,industry,category,before,ceiling,decider,builder,first_artifact,outcome,evidence_quality,source_date
Airbnb,Travel marketplace,Analytics/BI,Tableau,CONFIG+SCALE+COST,Technical,In-house,Superset,Still on it,PRIMARY,2015-2021
DoorDash,Food delivery,Support/case mgmt,Fragmented tools+Sheets,INTEGRATION+CONTROL,Technical,In-house,Teammate HQ,Still on it,PRIMARY,2025-04-15
DoorDash,Food delivery,Internal admin/ops,Django Admin+spreadsheet,CONFIG+COST,Technical,Retool,Dasher rewards tool,Still on it,VENDOR-CLAIMED,n.d.
ClickUp,Productivity SaaS,Marketing/GTM,AI vendor subscriptions,INTEGRATION+COST,Semi/Non-technical,Retool,6 GTM tools,Still on it,VENDOR-CLAIMED,2026-02
Harmonic,Startup data,Internal tooling,$20K/yr third-party tool,RELIABILITY,Technical,Retool,Rebuilt tool,Still on it,VENDOR-CLAIMED,2026-02-17
Getaround,Car-sharing,Inventory/asset ops,Google Sheets,SCALE+INTEGRATION,Semi-technical,Retool,Parkifier,Still on it,VENDOR-CLAIMED,2021-10-20
Casechek,Healthcare supply chain,Billing ops,Manual/eng requests,CONFIG,Semi-technical,Superblocks,Bill Explorer,Still on it,VENDOR-CLAIMED,2023-03-08
Ramp,Fintech,Financial ops,Salesforce/in-house,CONFIG,Technical,Retool,Underwriting center,Still on it,VENDOR-CLAIMED,n.d.
Brex,Fintech,Internal admin,Hardcoded app,CONFIG,Technical,Retool,Template Manager,Still on it,VENDOR-CLAIMED,n.d.
Pearmill,Marketing agency,Analytics/BI,Retool+Mode+GCP,COST+CONFIG,Technical,Superblocks,Consolidated tooling,Still on it,VENDOR-CLAIMED,n.d.
Neo4j,Database vendor,CRM/renewals,Salesforce,CONFIG,Unknown,Retool,Renewals Control Center,Still on it,VENDOR-CLAIMED,2026-02
Afloat,E-commerce gifting,E-commerce ops,Shopify admin,CONFIG+INTEGRATION,Unknown,Agency/Retool,Dashboards,Delivered,AGENCY,n.d.
JetRuby,Software agency,ERP,SAP/NetSuite evaluated,CONFIG+COST,Technical,In-house,Custom ERP,Still on it,ENGINEERING-BLOG,n.d.
incident.io-prior,Finance,Expenses,Commercial expense SaaS,ORGANISATIONAL,Technical,In-house,Expense app,Abandoned,PRIMARY,2022-07-12
```

## 5. What the Evidence Does and Doesn't Support

**Established:**
- Companies do build custom internal/operational software instead of buying, and multiple named, primary-source cases exist (Airbnb, DoorDash). The most consistent trigger in the case corpus is a spreadsheet or hardcoded workaround, not a rival SaaS product.
- The most common ceiling in the located cases is CONFIGURATION (the tool could not express the required workflow/data model/permission), followed by COST AT SCALE and INTEGRATION.
- Named cases skew heavily technical on the "who decided/who built" axis, and heavily toward internal admin/ops and analytics as categories.

**Open (searched, not resolved):**
- Whether custom-build frequency clusters at any headcount/revenue/funding stage. No dataset found.
- The true per-category *completed-replacement* rate in the general company population. The only category figures are Retool's "at risk" stated-preference numbers from a self-selected sample.
- Long-run outcomes (still on it vs. abandoned) at population scale — case-level outcomes are almost all "still on it," but that is survivorship bias in what gets published.

**Negative results (searched, not found):**
- No independent (non-vendor) survey ranking build-vs-buy by software category with disclosed methodology.
- No named company case of building a custom ATS/recruiting system instead of buying; the ATS evidence runs the other way.
- No clean named case of a company replacing core HR/payroll SaaS with an internal build (Gusto and HiBob are vendors building their own products, not buyers).
- No named pure-warehouse/inventory build case (only unnamed agency clients).
- No documented headcount/stage timing distribution.

## 6. Circulating Statistics That Do Not Survive Sourcing
- **"Gartner estimates that up to 50% of all code is written for internal use."** This appears in Retool's own job postings and marketing. The trail dead-ends in Retool's paraphrase; no primary Gartner report, report ID, or date is cited in the sources located. Should not be used as an independent statistic.
- **"68% of fast-growing businesses regret a software purchase (Gartner, 2024)."** Appears on a consultancy page (feature23.com) with no Gartner report ID or link. Unverifiable as sourced; should not be used.
- **Low-code market-size and adoption forecasts ("$65B in 2026," "$94B by 2028," "75% of new applications built with low-code by 2026," "16.2 million citizen developers").** These are FORECAST figures widely re-quoted across low-code vendor blogs (ToolJet, Kissflow, Searchlab, Adalo) attributed to Gartner/Forrester/McKinsey/Mendix, frequently without a specific report citation. They are projections, not observed adoption, and the versions in circulation disagree (e.g., "70% of new apps by 2026" vs. "75% by 2026"). Treat as forecast, not measurement.
- **"DoorDash saved $6M and 36,000+ hours," "ClickUp saved ~$200K/yr," "Brex ~75% less code."** These are VENDOR-CLAIMED figures published by Retool; no audited basis is disclosed.
- **AI-written-code figures ("Microsoft up to 30%," "Meta targeting ~50%," "Google >30%").** Executive statements on earnings calls / conference stages, not audited; relevant only as context, not as build-vs-buy adoption.

## 7. Caveats
- **Vendor bias dominates the corpus.** The single quantitative ranking and the majority of named cases come from internal-tools vendors (Retool, Superblocks, Appsmith, Akveo) whose business is selling the "build" side. Every such figure is tagged VENDOR-CLAIMED. Only Airbnb, DoorDash's case-management post, incident.io, and JetRuby are non-internal-tools-vendor sources, and JetRuby is itself an agency promoting custom builds.
- **Self-selected sample.** The Retool survey population is 817 of Retool's own customers/builders — people already committed to building — so its 35%/78% figures cannot be read across to companies generally.
- **Survivorship bias in outcomes.** Published cases almost all report "still on it." The one prominent counter-case (incident.io) is a retrospective on a failed build. Abandoned builds are systematically under-published.
- **Stated vs. revealed.** The category ranking is stated preference ("under replacement pressure"), not revealed behavior. Where a revealed-behavior number exists (the 35% "already replaced"), it is not broken out by category.
- **Recency and dating.** Some vendor case studies carry no clear publication date (marked n.d.). The Retool report is Feb 2026; the Getaround case is Oct 2021; DoorDash case-management is Apr 2025.
- **The case-count ranking in §3.2 is computed by the author from located cases, not reported by any source**, and reflects documentation availability rather than real-world frequency.
- **Read-across.** ERP evidence is largely consultant-marketing (JetRuby, Flatlogic, BestPeers) rather than named primary cases, and should not be weighted equally with the primary Airbnb/DoorDash material.
- **Airtable ceiling figures** in §3.9 come from a consultant (Kreante) and an AI-content site (Carly AI), not from Airtable's own documentation, and should be treated as third-party characterizations.