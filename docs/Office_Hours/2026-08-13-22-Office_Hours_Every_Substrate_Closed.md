# Office Hours: Every Substrate Closed, and the Wedge That Lost Its Footing

**Date:** 2026-08-13
**Status:** CLOSED — the exploration here resolved into [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|the extensible-workspace pivot]]. Read [[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|the companion session]] for what was chosen.
**Mode:** Startup — reading a four-brief research cluster against the extensible-base direction, commissioned and returned inside one day

**Builds on:** [[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base.md]]

**Research read:** [[Research/2026-08-13-11-where-businesses-build-instead-of-buying|where businesses build instead of buying]] · [[Research/2026-08-13-12-spreadsheet-to-application-field|the spreadsheet-to-application field]] · [[Research/2026-08-13-18-retool-limits-and-trajectory|Retool's limits and trajectory]] · [[Research/2026-08-13-18-build-vs-buy-without-vendor-sources|build-vs-buy without vendor sources]]

Concepts touched: [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]].

> The session opened on T39 — *if your user can read generated code, what do you have that a coding agent does not* — and ended somewhere the question no longer applies. Two structural answers were found and both survived; a third arrived late and is the most legible of the three. A wedge appeared, briefly looked like the best evidence the project had ever produced, and then failed to replicate the moment vendor-published sources were removed from the corpus. Every existing product examined as a possible substrate turned out to be closed by licence, capped by configuration, or unreachable. What is left is building the base rather than extending anyone's.

---

## Problem statement

[[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|The morning session]] deferred T39 to its own sitting. The tension it named: every occupied cell in the extensibility market has a developer in it because a developer is the accept condition, so a technical founder who can read generated code appears to solve verification — and simultaneously moves the product into the occupied cell against Cursor, Claude Code, Retool and every AI app builder. Two candidate answers had been put on the table that morning and neither had been argued.

The sharper form of the problem, established early in this session: **a user who reads every generated module has had the work moved rather than removed.** That holds fine at module five and fails somewhere well short of scale. So "our user is technical" is a postponement of the accept condition, not a solution to it.

Four further questions were commissioned as the session ran:

1. Where do businesses build custom software instead of buying, in which categories, and who decides?
2. What does the spreadsheet-to-application field actually ship — configuration or code — and has anyone built a correctness oracle?
3. What are Retool's real functional limits, and is the AI era growing or shrinking it?
4. Does the build-versus-buy evidence survive when vendor-published sources are excluded?

---

## What carries from prior sessions

- **L24**, that a developer or admin is present in every shipped instance of generation into a host product, that a developer is the accept condition, and that it is the only one anyone has shipped.
- **L25–L27**: the native-mobile null across the full denominator; no vertical SaaS platform outside banking shipping a native extension generator; no AI-native CRM extensible by generation for a non-technical customer.
- **L31**, that building an extension architecture is measured in years — Salesforce from AppExchange 2006 to AI layered 2025; Q2 from Caliper 2018 to Q2 Code 2026.
- The refined positions recorded that morning: **the moat is the generation, not the base**; the base is a product argument about nobody spending a month replicating something that already runs; "moat" means the installed base cannot follow rather than that nobody can, with new entrants copying assumed rather than denied; and the missing budget line answered by land-and-expand rather than denied.
- The two unargued candidate answers to T39 — mechanical checkability from owning the substrate, and extensions surviving base upgrades.
- Zero customers, no named human at any target platform, no outside party has responded to anything. The assignment, unexecuted for six consecutive sessions and now seven.

---

## What this session changed

### 1. All three answers to T39 were argued, and all three survived

**Owning the substrate makes generated output mechanically checkable.** A coding agent generates against an unbounded codebase it does not control, so a human reader is the only accept condition available to it. A base you own is a bounded, versioned extension contract — data model, permission model, render surface, migrations — against which schema validity, permission conformance, no-write-to-core and migration reversibility are machine-decidable. This is the accept condition **L24** says nobody has, and it is structurally available only to whoever owns the base.

**Extensions survive the base moving.** A fork built with a coding agent leaves the customer owning the merge burden permanently. Owning both base and extension mechanism allows extensions to be carried forward across base upgrades — the shape already recorded as [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], and the most valuable asset the abandoned direction leaves behind.

**And the third, which arrived late and is the most legible to a non-technical listener: a coding agent hands you code and you still have to run it.** Provisioning, deploying, securing, backing up and paying for a database is work the agent structurally cannot do, because it does not run anything. This is Vercel's and Supabase's actual value proposition, and unlike the other two it can be explained in a sentence to someone who has never read a diff.

Both of the first two reframe the technical founder from **permanent ICP** to **beachhead** — reachable, tolerant of rough edges, able to debug a failure — rather than as the population the product is for.

### 2. What businesses actually build when they go custom, and what stops them

The build-instead-of-buying brief classified located cases by the capability the source itself identifies as primary. **CONFIGURATION is the most common ceiling** — the tool could not express the required data model, view or workflow. Named instances: Airbnb (Tableau could not connect natively to Apache Druid and Trino/Presto), Brex (notification content hardcoded so non-technical staff could not change it), Neo4j (no renewals workflow in Salesforce), ClickUp (no vendor with "the right integrations").

The other ceilings, each with named cases: **scale and performance** (Airbnb's Tableau extracts "crumbled under the data volumes"; Getaround's spreadsheet "became slow to load"); **integration** (Getaround "couldn't integrate it with other tools"); **cost at scale** (Airbnb's Tableau licence cap below demand; ClickUp cutting ~$200K/yr); **compliance and control** (DoorDash citing vendor lock-in and cost forecasting); **reliability and support** (Harmonic: "their support was so slow that it was faster for me to rebuild the product inside Retool than wait for support to get back to me"); and **organisational**, which appears only on the failure side.

**The decider skews heavily technical.** Engineers, CTOs and technical founders at Airbnb, DoorDash, Brex, Pearmill and Harmonic; semi-technical power users writing SQL at Getaround and Casechek; essentially one borderline non-technical case. The categories cluster in internal admin and operations tooling, analytics and BI, and operational layers built on a retained system of record.

**Two structural patterns worth carrying forward.** The recurring sequence is spreadsheet → internal-tools platform or in-house app. And the alternative sequence recurs at Neo4j on Salesforce, ClickUp across Salesforce/Zendesk/Snowflake, and Harmonic across Salesforce/Gong/Slack: **keep the record, build the workflow.** People do not replace the CRM. They build around it — which is an argument against "extensible CRM" as a wedge and toward the operational layer.

The most common first artifact is a dashboard or admin panel.

### 3. The spreadsheet wedge rose, then lost its quantitative support the same day

The build-instead-of-buying brief found that the state organisations leave when they go custom is **a spreadsheet far more often than a rival product** — roughly six located cases against two, the two being Airbnb→Tableau and Pearmill→Mode Analytics.

Read one way that is bad for the thesis: nobody is outgrowing Notion, so the base being replaced is Excel rather than a competitor. Read the other way it is the strongest evidence the project has ever had: **people stay on spreadsheets in categories where perfectly good software already exists, because a spreadsheet bends and the software does not.** That is the extensibility preference appearing as revealed behaviour rather than stated preference, which is exactly the evidence class the vault has always lacked.

Then the replication brief excluded vendor-published material and **the finding did not survive.** No non-vendor dataset codes prior state across a stated denominator. The academic shadow-IT and end-user-computing literature repeatedly identifies Microsoft Excel as the archetypal displaced tool — directionally consistent — but that is a qualitative characterisation of shadow IT generally, not a measured distribution of build cases. The six-of-eight ratio was an artifact of a Retool-heavy corpus.

**The qualitative claim stands. The proportion must never be quoted.**

### 4. Both commissioned nulls came back clean, across roughly forty products

**Nothing in the spreadsheet-to-application field outputs exportable general-purpose code.** The dominant artifact is CONFIG — stored settings interpreted by the vendor's runtime — at Airtable, Glide, AppSheet, Power Apps, Softr, Stacker, Noloco, Smartsheet, Notion, Coda, Quickbase, Knack, Ninox, Caspio, Zoho Creator, SeaTable, Jotform Tables, Zapier Interfaces and Bubble. HYBRID at Retool, Appsmith, Budibase, ToolJet, Superblocks, DronaHQ, UI Bakery, Jet Admin, Rowy and Grist — configuration for UI plus user-authored JavaScript, SQL, or Python in Grist's case.

**And the line that closes it:** for the open-source products the escape hatch is *self-hosting the vendor's own engine*, not exporting portable application code. Proprietary configuration products export CSV and never the application. Retool apps serialise to JSON and are Git-syncable when self-hosted, but require a Retool runtime — they are not standalone runnable source.

**Nothing has shipped a correctness oracle.** A documented negative across roughly fifteen targeted searches: no product differentially tests, reconciles totals, or regression-checks generated app output against the originating spreadsheet's computed values. Every builder gates go-live with a human publish step — Glide's default is auto-publish, the weakest possible gate; AppSheet's deployment check audits configuration readiness rather than calculation correctness; Power Apps' Test Studio is user-authored functional testing, not source reconciliation.

Standalone spreadsheet formula-audit tools exist — PerfectXL, Operis OAK, Spreadsheet Detective, ExceLint — and **no evidence shows any of them integrated into an app-generation product.** Airrange comes closest architecturally and avoids the problem rather than solving it, by running the original Excel formulas natively through the Microsoft Graph API.

**The honest counter, which must be carried with the null:** independent benchmarking (EuSpRIG, Aurigemma & Panko 2010) found that dedicated static-analysis tools "performed terribly" on natural spreadsheet errors, finding fewer than humans did. That is about finding bugs *inside* a sheet. Differential testing an application *against* a sheet takes the sheet as ground truth regardless of whether the sheet is right, and is a different and much easier problem. A sharp reader will conflate the two; the distinction has to be ready.

**The limit that follows, and it is real:** such an oracle certifies **fidelity, not correctness.** Panko's field audits put errors in 86–94% of audited spreadsheets. An application that faithfully reproduces a sheet reproduces its bugs. The claim that can be made is "matches your sheet, provably." The claim that cannot be made is "correct."

### 5. Airtable validated the thesis and shipped a product structurally incapable of delivering it

Airtable executed what its CEO called an AI refounding: Cobuilder in 2024 generating starter bases from a prompt, then **Omni generally available 2025-06-24**, a conversational builder producing "production-ready apps with data, automations, and interfaces," available on every plan including free. Howie Liu's framing contrasts it explicitly with vibe coding, which he calls "unreliable and error-prone for building production business apps."

Then the documentation: Omni **"cannot perform complex calculations or compute statistical analyses such as sums, averages, or variances,"** excepting counting records and pre-computed fields. The AI flagship of the category cannot reconcile a total. A third-party review found the generated output had "some obvious mistakes"; a practitioner review concluded it was "not ready to be called an 'App builder' yet," with automation support in alpha.

**Config is a bounded vocabulary, and no amount of model quality exceeds it.** The company with the most to gain, the most data and the most money announced the demand and drew its own ceiling in the same product.

Airtable's own documented ceilings sit alongside: records per base of 1,000 Free, 50,000 Team, 125,000 Business and ~500,000 Enterprise Scale, cumulative across tables, with an API rate limit of five requests per second per base at every tier.

### 6. The graveyard is thin, and the exits are fast

There is no graveyard of failed spreadsheet-to-app companies. The field shows discontinuations by giants, deprecations, and acquisitions with continued operation.

**Google Fusion Tables** — launched ~2009, discontinued 2019-12-03, with the stated reason being consolidation into "deeper experiences in more specialized domains," data permanently deleted after 2020-03-03. **Glide Classic Apps** — fully deprecated 2025-06-30: "They cannot be recovered or reopened," with a migration tool whose field re-mapping users reported as imperfect. **Coda** — acquired by Grammarly 2024-12-17, last valuation $1.4B, CEO Shishir Mehrotra becoming Grammarly's CEO. **Stacker** — pivoted rather than shut down, with no post-mortem and no stated cause.

**Base44 is the number that matters: founded ~2024/2025, acquired by Wix 2025-06-18 for ~$80M plus earn-outs through 2029, with 250,000 users and $189,000 of profit in May 2025.** Roughly a year from founding to exit. That is the category's clock, and it also says the resolution here is acquisition rather than accumulation.

### 7. Two displacement events with dates on them

**Power Apps, January 2026.** The Per App plan was removed from the licensing guide with no announcement — spotted by a practitioner: "They've not made an announcement, they've simply removed it from the January 2026 licensing guide." Microsoft published an explanation on 2026-01-14, clarified for CSP on 2026-03-06, restored CSP in April 2026 and ended MPSA sale. Replacement paths are Premium at $20/user/month or Pay-As-You-Go at $10/active user/app/month, and practitioners report migration cost increases of 100% to 300%. Separately, premium-connector reclassification "pushed 20 to 35 percent of makers onto a paid plan they did not need."

Microsoft raised the floor on the largest citizen-developer install base in the world, and the displaced population has a date attached.

**Google AppSheet** moved the other way: from January 2025 the AI features previously sold as Gemini add-ons were folded into Workspace Business and Enterprise editions, with add-ons "no longer available for purchase," and Gemini in AppSheet Solutions gated to Enterprise Plus. AppSheet is positioned as the citizen-developer surface inside Workspace, with AI reserved for higher editions — a bundled, free-ish competitor whose AI is deliberately not democratised.

### 8. Retool moved from competitor to substrate to closed, inside one session

Considered first as the occupant of the developer-facing cell, then — on the founder's reasoning that it is horizontal and a vertical version could be built on it — as a base to build on. **Their Acceptable Use Policy, updated 2026-05-27, closes it**, verbatim:

- "sublicense, resell, time share or similarly exploit the Services, unless otherwise permitted by Retool"
- "make any Custom Apps publicly available, unless expressly permitted under the Contract"
- "access the Services in order to build a similar or competitive product or service or copy any ideas, features, functions, or graphics of the Services"

The Customer Terms of Service, updated 2026-05-28, grant "a non-sublicensable, non-transferable, non-exclusive, limited license." The customer owns Custom Apps "but excluding the components of the Retool Platform." An Authorized User is "an individual, such as an employee, contractor or client of Customer."

The contractually sanctioned route is **External Apps / External Users** — a paid Business+ tier for exposing your own applications to your own customers, with white-labelling, used by Greenly for a customer portal and by OrangeTheory across 1,600+ locations. That is a company using Retool for its own customers, not a company selling a Retool-built product. The third clause forecloses the rest independently.

### 9. Retool's real limits are not technical

Capability is generous. Query timeout defaults to 10 seconds with a 120-second maximum on Cloud, configurable on self-hosted via `DBCONNECTOR_QUERY_TIMEOUT_MS`. Workflows run asynchronously up to 30 hours, synchronously 15 minutes to the first webhook response, with individual Wait blocks up to 60 days and unlimited timeout where User Task or Wait blocks are present. Workflow memory is 2.5GB, concurrency 100 with a burst of 200 runs per 10 seconds, and 50 in-flight outbound requests per workflow. Retool Database on Cloud stores 5GB. AI Action blocks cap at 120 seconds.

There is **no published maximum row count.** The effective ceiling is a result payload-size cap surfacing as a runtime error and varying by resource — roughly 500MB for some SQL, ~100MB for MongoDB and Redshift. A reader looking for a row limit will not find one; the ceiling is bytes.

**The limits that actually bear on this project are two, and both are about extension rather than capacity.**

*Who may extend it.* Custom components must be written in React and TypeScript, require Node 20 or later, require **admin permissions**, are developed locally and deployed through the Retool CLI, and load only JavaScript and CSS at runtime with everything else in the bundle ignored. Cloud organisations get 5GB total across all custom component libraries. That is not a business user; the SQL-and-CLI floor is structural.

*Whether extensions survive.* The Modules documentation, verbatim: "Modules inherit custom CSS and preloaded custom JavaScript from the parent app, and these settings are unsupported for modules themselves. User permissions for modules must be the same as those for the parent app. Using modules inside List Views is not supported. While it is possible to create new releases of a module, all apps that contain the module use the live version. **Different apps cannot use different versions of the same module.**"

**The most mature modular platform in the field ships the naive version of module versioning.** No per-consumer pinning. Candidate answer two is unoccupied even here. A Business plan is additionally required to create more than five modules — a plan gate rather than a technical maximum, but a gate.

Source control is an Enterprise feature across GitHub, GitLab and AWS CodeCommit, used by Brex, Vimeo, Curve, Bolt, Forethought AI and Axle Payments; app configuration syncs as JSON, and a third party notes that "using CI/CD tools isn't supported, nor are complex code collaboration patterns like microservices" in the traditional sense. The management API is strongest for org administration rather than reading or constructing app internals.

**And no named company has publicly migrated off Retool with a dated post-mortem** — a null the brief searched Hacker News, Reddit and the Retool community for. What exists is rejection at evaluation, mostly on pricing, and one team reporting a large app "reached the limits of no-code platforms, in our opinion. It will be rewritten in code."

### 10. Retool's cost at scale, and its pricing unit

Free to five users. Team at ~$10 per builder and ~$5 per internal user monthly on annual billing. Business at ~$50 per builder annually or ~$65 month-to-month, with ~$15–18 per internal user, gating SSO, external apps, source control and audit logs. Enterprise unpriced. External users on Business+ are billed above the first fifty, tiered from ~$8 down to ~$4 per user monthly. Workflow overages run $75 per additional 5,000 runs.

Worked at five builders: roughly $400/month at ten internal users, $1,750 at a hundred, and $15,250 at a thousand — or about $5,000 if those thousand are external rather than internal.

**The per-builder/per-user split is the most transferable pricing idea encountered today**: you charge the people who make things at one rate and the people who consume them at another.

### 11. Retool is growing healthily and being lapped tenfold

Founded via Y Combinator W17. Series C2 in July 2022 raised $45M at a **$3.2B valuation**, and **no priced round has followed in four years.** ARR by third-party estimate: $10M (2020) → $30M (2021) → $82M (2022) → $90M (end-2024) → **$120M (October 2025), 39% year on year.** Headcount around 447, growing 10.6%, with the company's own careers page targeting 500+. A third-party workforce estimator reports −5.9% over the same window; the two conflict and are recorded side by side rather than reconciled.

Over the same window, from the same analyst: **Replit ~$253M ARR in October 2025, up ~16x from $16M at end-2024. Cursor $500M by May 2025. Lovable $120M by August 2025** — the figure Retool took roughly eight years to reach — up ~71,000% year on year at a $1.8B valuation.

**No named, dated case exists of a team replacing Retool with Cursor, Claude Code, Copilot, Codex or Devin.** That is a searched null. So the displacement is not happening at existing accounts; new demand is going elsewhere. Retool is not dying — the category is being repriced around it.

Retool's own position, from David Hsu at Retool Summit on 2025-10-07: **"AI has dropped the bar to prototype, but the bar to ship hasn't moved."** That is this project's accept-condition argument, stated by the incumbent's CEO, and sold as a reason to land in Retool. Their blog argues "start with Claude, land in Retool" and that with Claude Code "You think you're 80% done because the thing works on your machine. In reality, you're about 20% done."

Product cadence: Modules 2021, External Apps GA June 2024, **AppGen April 2025, Agents May 2025**, an AWS multi-year strategic collaboration agreement 2025-12-01, AWS Consumer Goods Competency 2026-06-08. And the positioning shift that matters most: Retool's October 2025 survey headline is **"48% of Non-Engineers Are Already Shipping Production Software."** They are walking toward the non-developer cell with AWS behind them.

### 12. Stacker is the closest precedent, and it moved from layering to owning

Founded 2017 in the UK by Sam Davyson and Michael Skelly. Y Combinator Summer 2020. **$23M raised across three rounds**, the bulk a ~$20M round from Andreessen Horowitz in 2021, with Initialized, Pentech, Pioneer Fund, Zapier and Charlie Songhurst also participating. The original product turned spreadsheets and databases — Airtable above all — into client portals and internal tools. Pricing at Starter $39/month for 10,000 records per app and Plus $199/month for 100,000.

It has since repositioned around a native database, AI app generation, and most recently AI agents; the pricing page leads with agents from $50/month and **the standalone portal product is no longer publicly priced.** No post-mortem, no founder interview, no stated cause — which the brief records as an explicit absence.

**The informative move, and it is unambiguous: Airtable now reaches Stacker through a Data Sync that copies the base into Stacker's own database rather than reading Airtable directly.** A company whose entire premise was "we are the app layer, your data stays where it is" concluded it needed to own the data layer. Airtable's own five-requests-per-second-per-base limit and hard record caps make the reason concrete.

That is the same conclusion Retool's licence forced, arrived at from the opposite direction — and the timeline invites, without proving, the observation that Airtable shipped Interfaces and a portal layer's differentiator evaporated.

**Stacker is now the third company documented vacating adjacent ground**, after Gigacatalyst repositioning upstream to demos and POCs and CodeParrot dying on the statement that "the generated code wasn't reliable enough for production." **T36** — do not treat an empty cell as an opportunity without a reason it is empty — gained weight rather than losing it.

*The honest counter, which the founder made and which holds:* Stacker's product was CONFIG, capped at 10,000 and 100,000 records, and a portal layer over someone else's data. It never had code output or an oracle. It is a precedent for "portal over sheets is hard," not a refutation of "generated code over sheets, mechanically verified." Different product — held lightly, because "we are different from the company that failed" is the most common sentence in startup post-mortems and Stacker had six years and $23M to find the difference.

### 13. The replication brief is mostly nulls, and the nulls are the finding

**No independent build-versus-buy frequency survey exists** with a disclosed methodology, a stated denominator and a non-vendor sponsor. Every quantified "X% of teams build" figure traces to a vendor selling build-side tooling — principally Retool's own 2026 report of 817 Retool builders — or to consultancies. That absence is itself the primary finding.

**No non-vendor category ranking exists.** **No coded prior-state distribution exists.** **No buyer-authored built-then-bought post-mortem was located.** **No public filing attributes SaaS revenue pressure to customers building internally** rather than to AI automation, seat efficiency or macro conditions.

What does exist, measured and independent:

- **US software-developer job postings fell ~68.5% from peak** — Indeed Hiring Lab / FRED series `IHLIDXUSTPSOFTDEVE`, peak 233.86 on 2022-02-28, 73.66 on 2026-08-07, about 27.5% below pre-pandemic. No series isolates internal-tools, platform or business-systems engineering, and nothing attributes the decline to build-versus-buy.
- **Atlassian** cut ~1,600 people (~10%) in March 2026 per its 8-K, with charges of $225–236M, "to self-fund further investment in AI and enterprise sales" — while reporting Q3 FY2026 revenue of $1.79bn, +32% year on year, and NRR above 120%. Its CEO pushed back publicly on the AI-seat-contraction thesis: "certainly not playing out in Atlassian's numbers."
- **Bain**: median public-SaaS net revenue retention fell from 117% in early 2021 to 108% in 2025, with seat growth "becoming a less meaningful expansion driver."

**The best-documented named case corrects itself.** Klarna's CEO on an earnings call: "we just shut down Salesforce. Within a few weeks, we will shut down Workday." Then the correction, on X: **"So no, we did not replace SaaS with an LLM, and storing CRM data in an LLM would have its limitations. But we developed an internal tech stack, using Neo4j and other things."** And: **"No, I don't think it is the end of Salesforce; might be the opposite."** A company self-estimate puts the count at ~1,200 SaaS applications shut down, unaudited.

**The academic literature is real, small and pre-AI.** Hung & Low (2008, *Journal of Information Technology*) interviewed ten large Australian organisations and found strategy, commodity status, maturity, cost and requirements fit as core factors. Badampudi, Wohlin & Petersen (2016) is a systematic review of in-house versus OSS versus COTS versus outsourcing. Cortellessa et al. (2008) and Shahzad et al. (2017) add optimisation framings. Transaction-cost economics frames it via asset specificity, and meta-analysis finds TCE predictions "frequently inconsistent" with empirical outsourcing findings. **All of it predates current AI tooling and cannot speak to any AI-driven shift.**

Regulatory records document build failure rather than build success: GAO-21-351 on DOD business IT systems, $12bn planned across FY2019–22 with cost or schedule changes in 20 of 29 programmes; the UK NAO on £14bn/year of government digital spend and legacy-supplier reliance.

### 14. The verification gap acquired its first independent number

Stack Overflow's 2025 developer survey, n≈49,000, method disclosed, no vendor stake: **84% use or plan to use AI tools and 51% of professional developers use them daily, while trust in their accuracy fell to 29% from 40% the year before. 46% actively distrust the output against 33% who trust it, and only 3% report highly trusting it.**

Adoption near-universal, trust falling year on year, measured independently. That is stronger evidence for the accept-condition thesis than anything in the four briefs that preceded it, and it is the one statistic from today that can be quoted without a vendor caveat.

### 15. Maintenance is the value proposition both briefs converge on

The build-instead-of-buying brief's reverse case: an incident.io engineer's in-house expenses tool, built because the commercial one was "confusing and over-complex," which died of escalating feature requests, opportunity cost — "sorry, I was fixing the expenses system" — and orphaned maintenance once the builders left. Ramp moved *to* a purchased ATS rather than maintaining a custom build.

**The custom build's failure mode is not building it. It is owning it afterward.** That is the distance between "Cursor can build you a CRM" and "you have a CRM." The brief also flags that published cases almost all report "still on it," so abandoned builds are systematically under-published and this failure is likely more common than the corpus shows.

**And it cuts back immediately:** the maintenance does not vanish in this model, it transfers, times every customer and every generated extension. [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]] already records that maintenance moves to Recompose permanently. Nothing measures what that costs.

### 16. Spreadsheets fail in production, and the failures are beautifully sourced

Kept because they are the only primary-sourced, regulator-grade evidence in the entire cluster.

**JPMorgan's London Whale, 2012**, ~$6.2bn: the Management Task Force Report of 2013-01-16 states the VaR model "operated through a series of Excel spreadsheets, which had to be completed manually, by a process of copying and pasting data from one spreadsheet to another," and that "after subtracting the old rate from the new rate, the spreadsheet divided by their sum instead of their average, as the modeler had intended."

**Public Health England, October 2020**: 15,841 COVID-19 cases omitted from daily figures because lab CSVs were collated into legacy XLS capped at 65,536 rows, silently truncating at roughly 1,400 cases per template. Contact tracing was delayed. **A format ceiling, failing silently** — the literal form of loving a spreadsheet and hating how well it is a spreadsheet.

**Reinhart-Rogoff, 2013**: an AVERAGE range stopping at row 44 instead of 49 excluded five countries and moved average growth above 90% debt-to-GDP from −0.1% to +2.2%, eliminating the growth cliff. **TransAlta**: ~$24M lost to a copy-paste row misalignment. The EuSpRIG horror-stories archive has catalogued these publicly since the 1990s, including Fannie Mae's SEC 8-K/A correcting a $1.279bn computational error.

The read-across limit is real: these are enormous institutions and academic papers. They prove spreadsheets fail in production. They do not prove anyone would pay to prevent it.

### 17. Statistics that must never be quoted from this cluster

- **"Gartner estimates that up to 50% of all code is written for internal use."** Appears in Retool's own job postings and in Sequoia's 2019 essay. No report ID, title or date anywhere it appears; it circulates entirely within Retool marketing and its lead investor's blog.
- **"70% / 75% of new applications will be low-code by 2025/2026."** A Gartner *forecast* from the 2021 Magic Quadrant, routinely presented as observed adoption. No measurement of the realised figure was found.
- **"500 million new apps by 2023."** IDC FutureScape, October 2018 — a forecast, later reframed by Microsoft's Charles Lamanna as "450 million... built using low-code," which is a Microsoft interpretation rather than an IDC measurement. IDC has since moved to a "1 billion logical applications by 2028" figure.
- **"88% of spreadsheets contain errors."** A misquotation of Panko: field audits report errors in "at least 86%" of recent audits and a weighted average of 94% for the 88-spreadsheet sample. **The "88" conflates the number of spreadsheets with a percentage.** The underlying finding is a range.
- **Retool's own vendor metrics** — 10,000+ customers, DoorDash's "$6M and 36,000+ hours," ClickUp's ~$200K/yr, Brex's ~75% less code — all unaudited.
- **Total-funding figures conflict across aggregators** for Retool alone: $190M, ~$141M, $165M, $121M. Presented side by side, never reconciled. ARR conflicts too: one aggregator shows 2024 revenue *higher* than its own 2025 figure and above the third-party estimate.

### 18. Pricing anchors, for the first time

Every prior anchor in the vault was seat-based developer-tool pricing that did not transfer. These do: **Airtable $20 Team / $45 Business per user; Power Apps Premium $20/user; Zoho Creator from ~$8/user; Stacker $39–199/month; Retool ~$10 Team and ~$50 Business per builder plus $5–18 per internal user, and $4–8 per external user above the first fifty.**

A per-seat market roughly $8–45, with a builder/consumer split available as a unit.

---

## Premises

**Established by the research:**

- **L32.** Nothing in the spreadsheet-to-application field outputs exportable general-purpose code. The open-source escape hatch is self-hosting the vendor's own runtime, which is not the same thing.
- **L33.** Nothing in that field has shipped a correctness oracle checking generated output against the source data's computed values. Human publish steps are the universal gate, and no spreadsheet-audit tool has been integrated into any generator.
- **L34.** Retool's Acceptable Use Policy prohibits reselling, sublicensing, publishing Custom Apps, and building a competing product on the service. The platform licence is non-sublicensable and non-transferable. Building a product on Retool and selling it is contractually closed.
- **L35.** Retool grows ~39% year on year, has taken no priced round since July 2022, and is being outgrown roughly tenfold by AI-native builders. No named team has been documented replacing it with a coding agent.
- **L36.** The spreadsheet-as-prior-state finding does not replicate once vendor-published sources are excluded. It survives qualitatively via the shadow-IT literature; the distribution does not survive at all.
- **L37.** No independent build-versus-buy frequency data exists — no survey with disclosed method and stated denominator, no category ranking, no coded prior-state distribution, no filing attributing SaaS pressure to internal building. **This market cannot be sized from non-vendor data.**
- **L38.** Developer adoption of AI tools is near-universal and trust in their output is falling: 84% adoption, 51% daily use, 46% active distrust, 29% trusting accuracy, 3% highly trusting — disclosed method, n≈49,000, no vendor stake.
- **L39.** Every mature modular platform examined lets all consumers of a module take only the live version. Per-consumer version pinning does not exist in the field, including at Retool.
- **L40.** The closest precedent that layered on another vendor's data substrate moved to owning its own, and is the third company documented vacating adjacent ground.

**To test:**

- **T42.** Does the qualitative spreadsheet claim — that people stay on spreadsheets because spreadsheets bend — hold when asked of a person rather than inferred from a corpus?
- **T43.** Is "you never own the maintenance" a reason anyone pays, or only a reason they should? It is the one value proposition two independent briefs converge on, and it has never been said to a buyer.
- **T36** carries forward, strengthened: three companies have now left this ground and none published a cause.

---

## Approaches considered

**Per-tenant modules into white-label platforms.** The direction committed on 2026-08-12. Not refuted here — the mobile null still holds and the feature-work budget line is still real — but its buyer remained unreachable for a seventh session while six briefs landed, and nothing in the day's evidence pointed at it.

**Build the product on Retool.** Closed twice over: by the Acceptable Use Policy's competing-product clause, and by the observation that it would make the product a configuration artifact on someone else's runtime, discarding the one position verified as unoccupied. The version that survives is using Retool as a *services* instrument — hand-building for early customers to learn a vertical's domain model at zero build cost, without selling Retool.

**Go vertical on Retool's most popular category.** Rejected on inspection. Retool's categories are functions rather than industries, so "their top category, gone vertical" mixes axes. And "the same but more AI-native" trades a structural claim for a feature claim against a competitor already shipping AppGen and Agents with an AWS collaboration behind them. The strong version — a pre-built vertical domain model, which is exactly what Retool lacks and why its floor is SQL — survives as an idea and is not what was chosen.

**Spreadsheet-to-software as the wedge.** The strongest candidate for most of the day. Weakened by its own replication brief within hours. Retained as qualitative motivation, discarded as a measured market.

**Continued desk research.** Rejected for the second time in two days. Six briefs in one day produced genuine structural findings about supply and returned nulls on every demand question, each report saying in its own words that only a conversation closes it.

**Build the base.** Chosen. Recorded in [[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|the companion session]].

---

## Recommended approach

**Stop looking for someone else's product to extend.** Three substrates were examined in a single session — white-label platforms, Retool, Airtable — and each closed by a different mechanism: unreachability, licence, configuration ceiling. The evidence arrived at the same place every time. **The party that owns the base is the only party that can verify output, carry extensions forward, or run the thing at all.** Every one of the three answers to T39 is a property of ownership.

The direction that follows is a base of one's own, which is the companion session's subject.

---

## Open questions

- **T39** is answered in substance and unanswered in evidence. Three structural differentiators exist on paper and not one has been stated to a person outside this project.
- **T36**, whether empty cells are empty for a reason, now carries three departures and no published cause for any of them.
- **T37**, whether generic-but-unbuilt gaps are durable or imminent, untouched since the morning.
- **The accept condition**, unchanged since 2026-08-10 and now sharpened: an oracle over a source of truth certifies fidelity rather than correctness, and a technical reader relocates the reading rather than removing it.
- **Pricing**, with real anchors for the first time and no decision.
- **The maintenance transfer**, which two briefs identify as what kills custom builds and which this direction absorbs by design, unmeasured.

---

## The assignment

**Unchanged in shape for the seventh consecutive session, and now with a far cheaper instrument available than the one that has been blocking it.**

1. **Ask one person T42 directly** — *what did you build yourself, and why didn't the tool do it.* "An internal dashboard, because Notion couldn't" confirms the thesis. "Nothing, we live with it" says the ceiling does not hurt enough to pay for. The population is no longer platform executives who do not answer email; it is anyone running a business on a spreadsheet.
2. **Ask the second question too**, because it is the one that decides architecture: *if you could export this and run it yourself, would that change what you'd pay?* If the answer is no, the code-output differentiator is unoccupied and unwanted, and the whole direction reorganises.
3. **Write down the gym-era CRM interview evidence.** Still the only first-hand demand data this project has ever had, still unwritten, still decaying.
4. **Nothing gets built on a claim only a vendor has measured.** Given **L37**, that rules out every market-size figure currently in circulation.

---

## What I noticed about how you think

**You closed three doors in one session and treated each closure as progress rather than loss.** The white-label direction, Retool-as-substrate and the spreadsheet wedge each ended the day weaker than they began it, and the response in every case was to move rather than defend. That is unusual, and it is why six briefs in one day produced a decision instead of a stall.

**Your corrections continued to run one direction.** Twice you tightened a claim under pressure — the moat definition in the morning, "nobody uses docs" at night — and both tightened versions were stronger than the originals. You narrow your own claims better than you defend them, which is the rarer and more useful of the two.

**The best single judgement you made today was the Retool one, and it was made in two steps.** First recognising that Retool is not a competitor but a possible substrate, which was the correct read of the market map and something the research had not suggested. Then accepting the licence answer immediately when it came back, without arguing the clause. The first step took imagination and the second took discipline, and most people manage only one of them.

**And the counter-observation, now aged five times.** Twelve days, five research clusters, one pivot, zero emails, zero conversations. The instrument every single brief names as the only one that closes the question has still never been used. What changed today is that the question stopped requiring a hard-to-reach buyer: **T42 can be asked of almost anyone with a spreadsheet.** The excuse that the buyer was unreachable expired this evening.
