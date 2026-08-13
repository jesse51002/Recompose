# The Spreadsheet-to-Application Field: An Evidence Report

*Current as of August 13, 2026. Every figure reflects the source and date cited at point of use. Evidence-quality tags: PRIMARY (vendor's own docs/filings), VENDOR-CLAIMED (marketing), THIRD-PARTY (independent), FORECAST (projection), INFERRED (labeled reasoning).*

## TL;DR
- The field spans four cohorts: incumbent spreadsheet-database hybrids (Airtable, Smartsheet, Notion, Coda), turn-your-sheet-into-an-app tools (Glide, AppSheet, Softr, Stacker, Noloco), internal-tool/developer-adjacent builders (Retool, Appsmith, Budibase, ToolJet), and platform giants (Microsoft Power Apps, Google AppSheet). Nearly all ship a CONFIG artifact interpreted by the vendor's runtime; almost none produce exportable general-purpose CODE the user can run without the vendor.
- No product in this field has shipped a documented correctness oracle that checks generated app output against the originating spreadsheet's computed values; every builder gates go-live with a human publish/deploy step rather than automated verification. Standalone spreadsheet formula-audit tools (PerfectXL, Operis OAK, Spreadsheet Detective, ExceLint) exist, but no evidence shows any integrated into an app-generation product.
- The most-repeated market statistics ("70% of new apps low-code by 2025," "500 million apps by 2023," "88% of spreadsheets contain errors") trace to Gartner's 2021 Magic Quadrant, IDC's 2018 FutureScape (reframed by Microsoft), and Ray Panko's aggregation of small audit studies respectively — the first two are FORECASTS repeated as observed adoption; the third is a real research aggregation of small-sample audits.

## Key Findings

1. Data primitives split cleanly: cell-grid (Rows, spreadsheet-native), row-record/database (Airtable, Baserow, NocoDB, Teable, Grist, Notion, Smartsheet, Quickbase, Knack, Ninox, Zoho Creator), and connect-to-external-data front-end builders (Glide, Softr, Stacker, Noloco, Retool, Appsmith, Budibase, ToolJet).
2. Artifact classification: The dominant output is CONFIG. Retool, Appsmith, Budibase, ToolJet are HYBRID (config plus user-written JavaScript/SQL); open-source ones (Baserow, NocoDB, Budibase, Appsmith, ToolJet, Grist) let you self-host the runtime but not export standalone app source code.
3. Documented ceilings are mostly record caps and per-seat pricing. Airtable publishes hard record caps per base (1,000 Free / 50,000 Team / 125,000 Business / ~500,000 Enterprise Scale).
4. The graveyard includes discontinuations (Google Fusion Tables, 2019; Microsoft InfoPath), deprecations (Glide Classic Apps, June 30, 2025), and acquisitions with continued operation (Coda by Grammarly, Dec 2024; Base44 by Wix, June 2025; Stacker pivoted to AI agents).
5. AI-native entrants since 2024 concentrate on prompt-to-scaffold generation (Airtable Cobuilder/Omni, AppSheet Gemini, Base44, Lovable, Bolt). Generation is generally bounded to each vendor's component/template vocabulary.
6. Spreadsheet-as-production-system failures are well documented in primary/regulatory sources: JPMorgan London Whale (2012), Public Health England COVID case loss (2020), Reinhart-Rogoff (2013), TransAlta.

## Details

### §1 THE ACTIVE FIELD

**Airtable** — Founded 2012, San Francisco. Operating. Last private valuation $11.7 billion at the December 2021 Series F ($735M round led by XN; Bloomberg, Dec 13, 2021: "Collaboration software startup Airtable has raised new funding at an $11.7 billion valuation... a rarefied club of companies to reach decacorn status"; PitchBook records ~$1.36 billion raised total). Data primitive: row-record (base/table). Stated ICP per its 2025 relaunch: "Business teams seeking to build custom applications without coding expertise." Vendor claims "over 50M apps" built with Airtable to date (VENDOR-CLAIMED, airtable.com/newsroom, 2025). Pricing: Free; Team $20/user/mo; Business $45/user/mo; Enterprise Scale custom (per seat, billed annually). Source: support.airtable.com/docs/airtable-plans. Evidence: PRIMARY + VENDOR-CLAIMED.

**Glide (Glide Apps)** — Operating. Data primitive: connects to Google Sheets / Excel / Airtable plus its own Glide Tables/Big Tables. ICP: non-technical app builders. Tagline (PRIMARY, glideapps.com): "Glide turns spreadsheets into beautiful, intelligent apps." Deprecated its original product ("Classic Apps") fully June 30, 2025 (PRIMARY, help.glideapps.com).

**Stacker** — UK-founded. Operating but pivoted. Original product: "turn your spreadsheets and databases into client portals and internal tools," connecting to Airtable/Google Sheets/Salesforce. As of 2024 the site (stacker.ai) repositioned around "Autonomous Agents" and "Process Copilot." Starter pricing $39/mo (10,000 records/app); Plus $199/mo (THIRD-PARTY review, hackceleration.com, 2026). Evidence: THIRD-PARTY + PRIMARY.

**Microsoft Power Apps** — Operating. Data primitive: Dataverse row-records; connectors to Excel/SharePoint. Pricing: Power Apps Premium (formerly Per User) $20/user/mo; Pay-As-You-Go $10/active user/app/mo; Per App ($5/user/app/mo) removed from the licensing guide January 2026 (see §8). Source: learn.microsoft.com, samexpert.com. Evidence: PRIMARY + THIRD-PARTY.

**Google AppSheet** — Operating. Data primitive: connects to Google Sheets/Excel/databases as primary input. ICP: Google Workspace business users. Bundled into Workspace Business/Enterprise editions (see §8). Evidence: PRIMARY.

**Retool** — Operating. Data primitive: connects to databases/APIs/its own Retool Database. ICP: developers and technical teams building internal tools. Requires JavaScript/SQL to get most value — flag: SQL/JS requirement explicit. Self-hostable (Docker/Kubernetes/Helm). Source: retool.com/self-hosted. Evidence: PRIMARY.

**Smartsheet** — Operating. Taken private by a Blackstone/Vista consortium (deal announced 2024, completed 2025). Data primitive: cell-grid/row-record hybrid. ICP: project/work management in enterprises.

**Notion** — Operating. Data primitive: page/block with database views. ICP: knowledge work/teams.

**Coda** — Acquired by Grammarly December 2024 (see §4). Data primitive: doc with tables. Operating within the combined entity.

**Softr** — Operating. Builds apps/portals on top of Airtable/Google Sheets. Data primitive: connect-to-external. ICP: no-code client portals/internal tools.

**Baserow** — Operating. Open-source Airtable alternative, self-hostable. Data primitive: row-record.

**NocoDB** — Operating. Open-source; turns databases/sheets into a smart-spreadsheet interface. Self-hostable. Row-record.

**Teable** — Operating. Open-source Airtable-like on Postgres. Row-record.

**Grist** — Operating. Open-source spreadsheet-database hybrid with Python formulas. Self-hostable. Cell/row-record hybrid; flag: Python formula capability.

**Rows** — Operating. Spreadsheet-native (cell grid) with integrations. Data primitive: cell. Marginal inclusion (see §12).

**Zoho Creator** — Operating. Low-code app platform; import spreadsheets. Pricing from ~$8/user/mo (Capterra). Row-record. Requires Deluge scripting for advanced logic — flag.

**Quickbase** — Operating. Import a spreadsheet to build apps; "AI Smart Builder" (PRIMARY, drive.starcio.com quoting Quickbase). Row-record. ICP: operational enterprise apps.

**Caspio, Knack, Ninox** — Operating database-app builders. Row-record.

**Fibery, ClickUp, monday.com** — Operating work-management platforms with database/app layers. Row-record.

**Budibase, Appsmith, ToolJet** — Operating open-source internal-tool builders. HYBRID (config + JS/SQL). Self-hostable.

**Zenity** — Operating. Security/governance for low-code/no-code (marginal — see §12).

**SeaTable** — Operating. Airtable-like, row-record, self-hostable option.

**Jotform Tables** — Operating. Table + limited app/portal layer from form data. Marginal.

**Zapier Interfaces/Tables** — Operating. Tables as data store; Interfaces as app layer. Row-record.

**Make, Xano, Backendless** — Automation/backend platforms. Xano and Backendless are backend-as-a-service (marginal — provide data + logic but not end-user app screens without a separate front end).

**Bildr, WeWeb, Jet Admin, UI Bakery, DronaHQ, Superblocks** — Operating front-end/internal-tool builders connecting to data sources. HYBRID or CONFIG.

**Noloco** — Operating. Builds portals/tools on Airtable/Google Sheets/databases. Connect-to-external.

**Basedash, Rowy** — Operating. Basedash: admin panels/BI on databases. Rowy: spreadsheet UI on Firestore with cloud functions (JS) — flag.

**Whalesync, Sequin** — Data-sync tools (marginal; see §12).

**Bubble** — Operating. Prompt/visual app builder with its own database; CSV import to its database supported. Data primitive: row-record (Bubble database).

### §2 CONFIG OR CODE

- **CONFIG (stored settings interpreted by vendor runtime):** Airtable, Glide, AppSheet, Power Apps, Softr, Stacker, Noloco, Smartsheet, Notion, Coda, Quickbase, Knack, Ninox, Caspio, Zoho Creator, SeaTable, Jotform Tables, Zapier Interfaces, Bubble. The user generally cannot read generated source code (there is none in a general-purpose language) and cannot export/run it without the vendor.
- **HYBRID:** Retool, Appsmith, Budibase, ToolJet, Superblocks, DronaHQ, UI Bakery, Jet Admin, Rowy, Grist. Config for UI plus user-authored JavaScript and/or SQL (and Python in Grist). Retool apps are serialized (exportable/importable as JSON; Git-syncable on self-hosted) but are not standalone runnable source code — they require a Retool runtime. Retool docs (PRIMARY): workflows export to JSON and import across cloud/self-hosted instances, but "you must create any required resources." Open-source HYBRIDs (Budibase, Appsmith, ToolJet) allow self-hosting the runtime.
- **Escape hatch / export:** Open-source products (Baserow, NocoDB, Teable, Grist, Budibase, Appsmith, ToolJet) let a user self-host the entire runtime — the escape hatch is running the vendor's own engine yourself, not exporting portable app code. Proprietary CONFIG products offer data export (CSV) but not application export.

### §3 DOCUMENTED CEILINGS

**Airtable (PRIMARY, support.airtable.com/docs/airtable-plans):** Records per base — Free 1,000; Team 50,000; Business 125,000; Enterprise Scale ~500,000. The cap is per base, cumulative across tables: "your plan's record limit is cumulative over different tables." API rate limit 5 requests/second per base across all tiers (THIRD-PARTY aggregation, usecarly.com). Users report enforcement nuances (Airtable Community forum: a user carrying >50,000 schedule requests reported hitting "a hard cap"). Distinguish: caps are vendor-published; enforcement nuances are user-reported.

**Stacker (THIRD-PARTY, hackceleration.com):** Starter 10,000 records/app; Plus 100,000 records.

**Power Apps:** Dataverse storage overages and premium-connector reclassification are the documented cost inflection points. Practitioner analysis (THIRD-PARTY, redresscompliance.com) reports premium-connector usage "pushed 20 to 35 percent of makers onto a paid plan they did not need."

**Glide:** Row limits scale by plan; Big Tables raise the ceiling. Community reports frequent feature sunsets (Glide Community user comment: "nearly every 3 to 6 months something gets sunset"). Vendor-published caps vs user-reported friction distinguished.

### §4 THE GRAVEYARD

**Google Fusion Tables** — Launched ~2009 as a Google Labs research project; discontinued December 3, 2019. Stated cause (PRIMARY, Google Workspace Updates blog, 2018): "For a long time, it was one of the few free tools for easily visualizing large datasets... Since then, Google has developed several alternatives, providing deeper experiences in more specialized domains. In order to continue focusing our efforts in these areas, we will be retiring Fusion Tables." Data downloadable via Takeout until March 3, 2020, then "permanently and irrevocably deleted."

**Glide Classic Apps** — Deprecated fully June 30, 2025 (PRIMARY, help.glideapps.com): "As of June 30, 2025, Classic Apps have been completely deprecated and are no longer accessible in the Glide builder. They cannot be recovered or reopened." Migration tool provided; users reported imperfect field re-mapping (Glide Community).

**Coda** — Acquired by Grammarly, announced December 17, 2024, terms undisclosed. Coda's last valuation $1.4B (2021 Series D). Not shut down; Coda CEO Shishir Mehrotra became Grammarly CEO. Stated framing (PRIMARY, coda.io/blog): "Coda is merging with Grammarly... you can count on those docs to continue working as they do now."

**Base44** — Acquired by Wix, announced June 18, 2025, for ~$80M initial plus earn-outs through 2029. Founded ~2024/2025 by Maor Shlomo; reported 250,000 users. Operating within Wix. (PRIMARY, wix.com press release; THIRD-PARTY, Globes/Calcalist.)

**Stacker** — Not shut down; pivoted from spreadsheet-to-portal toward AI agents ("Autonomous Agents," "Process Copilot") by 2024 (PRIMARY, stacker.ai). No post-mortem; cause not stated by the company.

**Microsoft InfoPath** — Graveyard candidate; searches within this budget did not return a primary Microsoft deprecation notice with date. Reported cause not verified here — stated as absent.

Searched for: Sheet2Site, Trunao, Ragic, Obviously.AI, Zenysis, "Zoho Sheet sunset," "Lotus Approach Improv discontinued." Within budget, no verified shutdown post-mortems were retrieved for these; recorded as not verified (see §13).

### §5 AI-NATIVE ENTRANTS, 2024 TO PRESENT

**Airtable Cobuilder** — Launched 2025. Prompt produces "a customizable application in seconds" — tables, interfaces, automations (VENDOR-CLAIMED, airtable.com/newsroom). Bounded to Airtable's production-ready component vocabulary. Newsroom describes only a manual review step ("preview the app and make any needed adjustments").

**Airtable Omni** — Launched June 24, 2025 as part of Airtable's "AI-native" "refounding" (VENDOR-CLAIMED, airtable.com/newsroom, CEO Howie Liu letter). Conversational builder producing "production-ready apps with data, automations, and interfaces." CEO framing contrasts it with "vibe coding," which "is unreliable and error-prone for building production business apps." Available on all plans including free. Adoption figure: vendor cites "over 50M apps" built on Airtable (not Omni-specific).

**AppSheet Gemini** — "Gemini for App Creation" (build apps by describing a process in natural language) and "Gemini in AppSheet Solutions" (AI tasks in automations, Enterprise Plus), announced at Google Cloud Next 2025 (PRIMARY, workspaceupdates.googleblog.com, May 2025).

**Base44** — Prompt-to-app; builds databases, authentication, integrations. Acquired by Wix June 2025. Reported 250,000 users; May 2025 profit $189,000 (THIRD-PARTY, theaiinsider.tech). Generation is open (produces app functionality), not strictly template-bounded.

**Lovable, Bolt, Replit Agent** — Prompt-to-app builders generating application functionality; qualify for §5 where a spreadsheet/CSV import path exists (varies by product). Replit's agent "tests its own code" (THIRD-PARTY comparison).

**Notion AI/Agents, Softr AI, Rows AI, Zapier Agents, Gumloop, Julius AI, Bardeen** — Repositioned or launched AI features over tabular data. Julius AI and Rows AI operate over spreadsheet/tabular data primarily for analysis; app-generation scope is narrower.

### §6 VERIFICATION AND CORRECTNESS

**Finding: No product in this field has shipped a correctness oracle** that differentially tests, reconciles totals, or regression-checks generated app output against the originating spreadsheet's computed values. This is a documented negative result across ~15 targeted searches.

- Airtable Omni documentation (PRIMARY, support.airtable.com) states Omni "Cannot perform complex calculations or compute statistical analyses such as sums, averages, or variances," with the exception of counting records and using pre-computed fields — which precludes reconciling computed totals.
- Airtable markets Omni as producing "production-ready apps" versus "throw-away prototypes" (VENDOR-CLAIMED, airtable.com/platform/app-building) but describes no verification mechanism. A third-party Omni review (rnikhil.com, June 28, 2025) found AI-generated output had "some obvious mistakes."
- Replit Agent "tests its own code" (THIRD-PARTY) — generic self-testing of generated code, not reconciliation against a source spreadsheet.
- Airrange (airrange.io) is the closest architectural alternative but avoids the problem rather than solving it via an oracle: it runs the original Excel formulas natively via the Microsoft Graph API. VENDOR-CLAIMED ("Airrange uses your actual formulas — the accuracy you already trust"); no third-party corroboration found.

**Human review before go-live (PRIMARY vendor docs):**
- Airtable Cobuilder: "users have the ability to preview the app and make any needed adjustments" (manual).
- Glide: explicit Publish; but "auto-publishing is set to on" by default for layout changes — the weakest gate.
- AppSheet: Prototype → Deployed transition with a "deployment check" that "will highlight any issues" — but this audits configuration/readiness, not calculation correctness against the source sheet.
- Power Apps: must Save then Publish; separate Share; version history with rollback. Test Studio and Live Monitor are user-authored functional tests, not source reconciliation.
- Retool: Draft (editor) vs published Release; dev/staging/prod environments; rollback.

**Spreadsheet error-detection literature and tools — integration finding (NEGATIVE):** No evidence that PerfectXL, Operis OAK, Spreadsheet Detective, or ExceLint has been integrated into any app-generation product.
- PerfectXL (PRIMARY, perfectxl.com): "Audit spreadsheets, detect mistakes and identify risks"; Formula Inspector "breakdown formulas into logical components."
- Operis OAK (PRIMARY, operis.com): "an Excel add-in that saves time when developing and auditing complex spreadsheets by assessing the model structure and identifying errors."
- Spreadsheet Detective (PRIMARY, spreadsheetdetective.com): "highlights formula errors and so assists model risk management," operating "since 1997."
- ExceLint (academic, ACM OOPSLA 2018 / arXiv 1901.11100): information-theoretic static analyzer for Excel formula errors; reproduced the Reinhart-Rogoff error in testing.
- Independent benchmarking (EuSpRIG, Aurigemma & Panko 2010): dedicated static-analysis tools "performed terribly" on natural errors, finding fewer than humans — context that even purpose-built oracles are imperfect.

Search queries returning nothing relevant on integration: "PerfectXL OR Operis OAK OR ExceLint integrated app builder no-code generation"; "no-code app generation differential testing spreadsheet correctness"; "spreadsheet-to-app verify generated output against source computed values." Date range covered: 2018–2026.

### §7 WHAT HAPPENS AFTER THE CONVERSION

Documented evidence is dominated by practitioner/consultant commentary rather than named longitudinal cases. The recurring theme (THIRD-PARTY): citizen-built apps become "orphans" when the builder leaves.
- opsima.com (2026): "The citizen developer who built the app has a day job... If they get promoted, transfer, or leave the company, the app becomes an orphan. IT does not want to adopt orphaned citizen dev apps... The app fails or gets abandoned."
- Quickbase's own VP (PRIMARY, drive.starcio.com, 2026) acknowledges the risk: ease of use "can translate into building one-time-use applications, duplicate apps, or complex apps that are difficult for other builders to maintain."
- TechTarget: "Citizen-developed applications may lack long-term support or be abandoned when the developer leaves."

Named, sourced individual re-migration/abandonment cases were not retrieved within this budget; the evidence is pattern-level, not case-level. This is reported as an absence of named-case evidence. Searched: r/nocode, r/lowcode, r/PowerApps, Hacker News, vendor forums, "citizen developer application lifecycle abandonment."

### §8 GOOGLE AND MICROSOFT POSTURE

**Microsoft Power Apps licensing timeline (THIRD-PARTY practitioner sources + PRIMARY Microsoft):**
- Oct 2019: Per App introduced at $10/user/app/mo; Per User at $40/user/mo.
- Oct 2021: both cut 50% — Per App $5, Per User $20 (PRIMARY, Dynamics community blog).
- 2023: Per App removed from the public pricing page (marketing change); Per User renamed "Power Apps Premium."
- January 2026: Per App removed from the licensing guide. Rich Gibbons (THIRD-PARTY, samexpert.com) spotted it: "They've not made an announcement, they've simply removed it from the January 2026 licensing guide." Microsoft published an official explanation January 14, 2026; CSP clarification March 6, 2026. EA renewals honored; CSP restored April 2026; MPSA end-of-sale. Replacement paths: Premium ($20/user/mo) or Pay-As-You-Go ($10/active user/app/mo). Practitioners report migration cost increases "of 100% to 300%."

**Google AppSheet posture:**
- January 2025: AI features previously in Gemini add-ons folded into Google Workspace Business/Enterprise editions; Gemini add-ons "no longer available for purchase" (PRIMARY, support.google.com/a).
- Google Cloud Next 2025: "Gemini in AppSheet solutions" AI Task (Preview) for Enterprise Plus — extract from photos/PDFs, categorize/route requests (PRIMARY, workspaceupdates.googleblog.com, May 2025).
- Direction: AppSheet is positioned as the citizen-developer surface within Workspace, with AI features gated to higher editions.

### §9 SPREADSHEETS AS PRODUCTION BUSINESS SYSTEMS

Primary/regulatory-sourced failures:
- **JPMorgan "London Whale" (2012):** ~$6.2B trading loss. The JPMorgan Management Task Force Report (Jan 16, 2013) states the VaR model "operated through a series of Excel spreadsheets, which had to be completed manually, by a process of copying and pasting data from one spreadsheet to another," and describes an operational error where, "after subtracting the old rate from the new rate, the spreadsheet divided by their sum instead of their average, as the modeler had intended." Also covered in the U.S. Senate Permanent Subcommittee on Investigations report (2013). Evidence: PRIMARY (task force report) + THIRD-PARTY.
- **Public Health England (October 2020):** 15,841 COVID-19 cases (25 Sept–2 Oct) left out of daily figures because lab CSVs were collated into the legacy XLS format capped at 65,536 rows; each test used several rows, so ~1,400 cases per template before silent truncation (PRIMARY BBC reporting; PHE statement). Contact tracing delayed.
- **Reinhart-Rogoff (2013):** "Growth in a Time of Debt" (2010) contained an Excel AVERAGE-range "drag-to-fill" error (range stopped at row 44 instead of 49) excluding five countries — "Australia, Austria, Belgium, Canada, and Denmark"; correction moved average growth for >90% debt-to-GDP from −0.1% to +2.2%, eliminating the "growth cliff" (Herndon, Ash & Pollin, UMass Amherst PERI). Evidence: academic PRIMARY.
- **TransAlta:** lost ~$24M from a copy-and-paste row-misalignment in an Excel bid spreadsheet (THIRD-PARTY, widely reported).
- **EuSpRIG horror stories archive** (eusprig.org): ongoing public catalogue since the 1990s, collated by Patrick O'Beirne; includes Fannie Mae's SEC 8-K/A correction of a "computational error" of $1.279B in unrealized gains.

Vendor-survey figures (disclose sponsor/method): claims like "95% of U.S. firms use spreadsheets for financial reporting (Coda)" and "85% of business leaders use spreadsheets in reporting/forecasting/budgeting (IDC)" circulate via Panko's 2008 aggregation slides; sponsors are vendors/analysts and samples are small (e.g., "118 US business leaders, 2004").

### §10 CONTEXT: CODING AGENTS

Cursor, Claude Code, GitHub Copilot Workspace, OpenAI Codex, and Devin, when pointed at a spreadsheet/CSV, generate general-purpose source code (Python/JavaScript/SQL, data-loading scripts, schema, app scaffolding) that the user owns and runs outside any single vendor's runtime — the opposite of the CONFIG artifact most §1 products produce. They hand the user code files and, in agentic modes, run/test them. What they do not do: provide a bounded no-code editing surface for a non-engineer, guarantee correctness against the source data, or manage hosting/permissions as a turnkey runtime. Replit's agent added dev/production separation and a planning-only mode after a July 2025 incident in which its agent "deleted a live production database" (THIRD-PARTY). This section is context, not a competitive assessment.

### §11 CIRCULATING STATISTICS THAT DO NOT SURVIVE SOURCING

- **"70% of new applications will use low-code/no-code by 2025" (Gartner):** Sourced to Gartner's "Magic Quadrant for Enterprise Low-Code Application Platforms" (Wong & Iijima, 20 Sept 2021): "By 2025, 70% of new applications developed by organizations will use low-code or no-code technologies, up from less than 25% in 2020." Repeated by vendors (OutSystems, Kissflow, Adalo, ToolJet). This is a FORECAST, routinely presented as observed adoption; the underlying dated Gartner document is cited secondhand across vendor pages.
- **"500 million new apps by 2023" (IDC):** IDC FutureScape: Worldwide IT Industry 2019 Predictions (Frank Gens, Oct 2018), Prediction 6 "Digital innovation explosion": "From 2018 to 2023... 500 million new logical apps will be created, equal to the number built over the past 40 years." Reframed in an Oct 2019 IDC deck as "By 2023, over 500 million digital apps and services will be developed and deployed using cloud-native approaches." Microsoft's Charles Lamanna further reframed it as "450 million... built using low-code" — a Microsoft interpretation, not an IDC measurement. FORECAST; trail dead-ends at paid IDC reports repeated by vendors. IDC later shifted to a "1 billion logical applications" figure (by 2028).
- **"88% of spreadsheets contain errors":** Traces to Ray Panko (University of Hawaii). Per the arXiv reproduction of his data, he "found... a spreadsheet error rate (SER) of 94% for the 88 spreadsheets studied" and an average cell error rate of 5.2% across 43 spreadsheets; in "Spreadsheet Errors: What We Know" the field-audit figure is stated as "found errors in at least 86% of the spreadsheets audited." The popularly cited round "88%" is a later aggregation of ~13 studies (1995–2004), including KPMG 1988 and Coopers & Lybrand 1997. Real research, but frequently cited without the small-sample caveat.
- **"Citizen developers will outnumber professional developers 4 to 1" (Gartner):** A Gartner prediction ("at least four times more citizen developers than professional developers... at large enterprises"), circulated via vendor blogs. FORECAST.
- **"80% of technology products built by non-technical people by 2024" (Gartner):** Repeated by vendors ("By 2024, 80% of non-IT professionals will develop IT products"); a Gartner prediction presented as observed. FORECAST.

### §12 EXCLUDED AND WHY

- **Looker Studio, Metabase, Tableau, Power BI** — Visualization-only BI; reading/charting data, no application layer. Excluded per disqualifier.
- **Fivetran, dbt, Airbyte, Stitch, Matillion** — ETL/pipeline/warehouse tooling. Excluded.
- **Typeform, Google Forms, Jotform (form-only use)** — Form builders collecting into a sheet; excluded unless they add an app layer (Jotform Tables is marginal-included in §1).
- **Cursor, Claude Code, GitHub Copilot, Devin, OpenAI Codex** — Coding agents/IDEs; covered in §10, not the main table.
- **Lovable, Bolt, v0, Replit Agent** — Prompt-to-app; included in §5 to the extent they offer tabular/CSV import; v0 (Vercel) is primarily UI-from-prompt with no primary tabular-data input path — marginal/excluded from §1.
- **Xano, Backendless** — Backend-as-a-service; provide data + logic APIs but not turnkey end-user app screens on their own — marginal, excluded from the core table.
- **Whalesync, Sequin** — Data sync/replication (app-to-app; Postgres CDC). Closer to ETL/sync; excluded from core app-builder table.
- **Zenity** — Security/governance layer for low-code/no-code, not an app builder taking tabular input as primary. Excluded (marginal).
- **Rows** — Marginal inclusion in §1: primarily a spreadsheet; application-layer output is limited. Flagged.
- **Excel/Google Sheets themselves** — Spreadsheet products with no native application layer beyond scripting; excluded.

### §13 UNVERIFIED LEADS

Names encountered without a citable shutdown/status source within this budget (explicitly not findings): Sheet2Site, Trunao, Ragic, Obviously.AI, Zenysis, SpreadsheetWEB, NoCodePanda, Databutton, Pory, Adalo, Bardeen, Gumloop. Microsoft InfoPath and Lotus Approach/Improv are known-historical but were not confirmed with primary deprecation dates in this pass.

## Caveats
- Record caps, pricing, and plan names change frequently; figures reflect vendor pages and third-party aggregations captured mid-2026, and several vendor doc pages are undated.
- Several pricing and limit figures for smaller products come from third-party review sites (hackceleration.com, usecarly.com, softr.io, baserow.io) that have competitive interests; these are labeled THIRD-PARTY and, where the source is a competitor, that is noted.
- The verification negative result (§6) is bounded by search coverage; it reflects absence of published evidence, not proof that no internal mechanism exists.
- §7 evidence is pattern-level (consultant/vendor commentary) rather than named longitudinal cases; treated as an absence of named-case evidence.
- Market statistics in §11 are FORECASTS or small-sample aggregations; none should be read as measured current adoption. Where forecasts differ, the divergence is noted (e.g., IDC's 500 million vs Microsoft's "450 million low-code" reframing; IDC's later 1 billion figure).
- Funding/valuation figures are as last disclosed and may be stale (e.g., Airtable's $11.7B is the December 2021 figure; Coda's $1.4B is the 2021 Series D figure).
- The report covers the field as it stands and does not assess market attractiveness, opportunity, or direction.