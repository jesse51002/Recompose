# Retool: Functional Limits and Growth/Contraction Indicators Through 2026

## TL;DR
- Retool's extension surface (Modules, custom React/TypeScript component libraries, JS/Python/SQL code, Git source control, and a management REST API) is documented in detail; its hard ceilings are a mix of vendor-published numbers (10s default / 120s max query timeout on Cloud; 30-hour async workflow timeout; 5GB Retool Database on Cloud; 40MB documented mobile upload) and user-reported thresholds where no vendor number exists (max rows per query, component counts).
- Retool's Acceptable Use Policy (updated May 27, 2026) explicitly prohibits "sublicense, resell, time share or similarly exploit the Services, unless otherwise permitted by Retool," and grants customers a "non-sublicensable, non-transferable" platform license — while a licensed, paid "External Apps"/External Users path exists for customer/partner-facing apps.
- Trajectory indicators: Retool last raised at a $3.2B valuation (July 2022); Sacra estimates it "hit $120M ARR in October 2025, up from $90M at the end of 2024, growing at 39% year-over-year"; headcount ~447 (Revelio, Dec 2025); the company claims it is "trusted by over 10,000 companies worldwide" (VENDOR-CLAIMED); it launched AppGen (April 2025) and Agents (May 2025) and signed an AWS strategic collaboration (December 1, 2025).

---

# PART A — FUNCTIONAL LIMITS

## A1. The extension and escape-hatch surface

### Modules
PRIMARY (docs.retool.com/apps/guides/layout-structure/modules): A Retool Module is a reusable group of components and queries usable across apps or multiple times in one app. Documented limitations, quoted verbatim: "Modules inherit custom CSS and preloaded custom JavaScript from the parent app, and these settings are unsupported for modules themselves. User permissions for modules must be the same as those for the parent app. Using modules inside List Views is not supported. While it is possible to create new releases of a module, all apps that contain the module use the live version. Different apps cannot use different versions of the same module."

Versioning: no per-app version pinning — all apps consuming a module use the live version. Performance: "Module components contribute to app size: Retool separately executes each component inside your module."

Nesting/plan limit: A Business plan is required to create more than 5 modules. PRACTITIONER/VENDOR: A user on community.retool.com ("Module Limit Issue," thread 59418) reported hitting a "5 module limit" on the Team plan. This is corroborated by a third-party tutorial (SuperNimbus): "a business plan is required to create more than 5 modules." What the source measures vs. what a reader wants: the "5 module limit" is a plan-gating rule, not a technical maximum — on Business/Enterprise the documented constraint is app-size/performance, not a module count.

### Custom components
PRIMARY (docs.retool.com/apps/guides/custom/custom-component-libraries): "Retool allows you to extend its built-in components by creating your own using React and TypeScript." Requirements and limits, quoted verbatim: "Custom components must be written in React and Typescript." "Node.js v20 or later is required." "Admin permissions in Retool are required." "Custom component libraries only load JavaScript and CSS files at runtime. Any other file included in the revision bundle is ignored." "When you download a page in PDF format, custom components are not included." "For cloud instances, there is a 5GB limit on the total size of all custom component libraries within an organization." Custom components "can leverage public or private npm packages." They are developed locally and deployed via the Retool CLI.

Legacy vs. new: PRIMARY docs state "Custom components libraries are distinct from the legacy custom component feature. Retool does not recommend creating custom components using the legacy feature." The legacy approach loaded a component "into a sandbox'd iframe" (tryretool/custom-component-guide, GitHub), where "Retool's sandboxed iframe will provide a wrapper for React components." The newer libraries approach removes the iframe development constraints and adds full local tooling and npm support.

### Custom code
PRIMARY: User code runs in JS queries, transformers, and Python/JS/SQL in workflows. Query execution: default timeout 10 seconds (10000ms), maximum 120 seconds (120000ms) on Retool Cloud, per docs.retool.com/queries/guides/advanced-options (accessed Aug 13, 2026): "Retool automatically times out queries that run for longer than 10 seconds (10000ms)... For Retool-hosted users, the maximum duration before a query times out is 120 seconds (120000ms). Self-hosted instance users can set the DBCONNECTOR_QUERY_TIMEOUT_MS environment variable to change the maximum timeout value." Query throttle default is 750ms. npm/package support exists for custom component libraries; preloaded JavaScript and custom libraries can be imported at the app/org level.

### Source control (Git)
PRIMARY (retool.com/blog/git-branching-with-source-control; docs.retool.com/source-control): "Customers on Retool's Enterprise plan get integrations to the git-based Source Control Management (SCM) provider of their choice." Providers: GitHub, GitLab, AWS CodeCommit, with Bitbucket and Azure DevOps noted as "actively adding." Named customers using it, quoted: "Dozens of our largest customers like Brex, Vimeo, Curve, Bolt, Forethought AI, and Axle Payments use Source Control in Retool." Self-hosted instances on v3.18+ support GitHub configuration; setting VERSION_CONTROL_LOCKED=true can create a "read-only" production instance (v2.91+). What round-trips: app configuration is stored/synced as JSON. THIRD-PARTY caveat (boldtech.dev): "as Retool apps are built using pre-built components, the code can't be managed in GitHub in the same way as with traditional code repos... using CI/CD tools isn't supported, nor are complex code collaboration patterns like microservices" in the traditional file-structure sense. Native Source Code Sync (auto-commit without CLI) is described by a third-party guide (rapidevelopers.com) as "available on Business and Enterprise plans"; Retool's own blog frames the full SCM integration as an Enterprise feature — a divergence in where the gate sits, shown as-is.

### APIs
PRIMARY: Retool exposes a management REST API (docs.retool.com/org-users/concepts/retool-api and /reference/api/v2). Per api-evangelist/retool (GitHub, summarizing the docs): "The Retool Management API enables administrators to programmatically manage users, groups, permissions, apps, resources, workflows, folders, spaces, and source control integrations." Authentication via bearer token; supports SCIM 2.0 for enterprise provisioning (Enterprise plan). The public API is strongest for org administration (user CRUD, group membership) rather than reading or constructing app internals — a third-party integration writeup (usecarly.com) states: "The public API is strongest for org administration — full user CRUD and group-membership management — rather than reading app internals." A Retool MCP server allows AI coding agents (Cursor, Claude Code, Codex) to generate or modify Retool apps; Retool also supports importing React apps as a .zip or GitHub repo via the app-builder agent (retool.com/integrations/cursor).

## A2. Hard ceilings

VENDOR-PUBLISHED (PRIMARY):
- Query timeout: default 10s, max 120s on Cloud (docs.retool.com/queries/guides/advanced-options); query throttle default 750ms.
- Workflow run timeout: async 30 hours; "For asynchronous workflows with User Task or Wait blocks, the timeout is unlimited"; sync 15 minutes up to the first webhook Response block; individual Wait blocks max 60 days (docs.retool.com/workflows/concepts/limits).
- Workflow memory: "A workflow run can use up to 2.5GB in memory."
- Workflow concurrency: 100; burst limit 200 runs per 10 seconds; "Retool limits the number of in-flight outbound requests to 50 at a time from a single workflow" (configurable self-hosted via WORKFLOW_REQUEST_CONCURRENCY_LIMIT).
- AI Action blocks: "maximum timeout of 120 seconds. If your call takes longer than 120 seconds, you can instead call the AI provider directly via REST API, which doesn't have this restriction."
- Retool Database (Cloud): "Cloud-hosted organizations can store the equivalent of 5GB of PostgreSQL data, with unlimited tables and rows" (docs.retool.com/data-sources/concepts/storage-and-limits).
- Query result caching: up to 1 day.
- Custom component libraries: 5GB total per org (Cloud).
- File upload: "The maximum supported file size for file uploads is 40MB" — documented on the mobile docs page (docs.retool.com/mobile/guides/forms-inputs/files); not clearly stated for web apps.
- Mobile offline cache: "Retool Mobile can cache up to 100MB of data. If offline mode exceeds this limit, Retool Mobile excludes the last used entries" (docs.retool.com/mobile/guides/offline-functionality/offline-mode).

USER-REPORTED / NO VENDOR NUMBER (the distinction between what the source measures and what a reader wants is stated at each point):
- Maximum rows returned per query: NOT published as a fixed row count in primary docs. The effective limit is a result payload-size cap that surfaces as a runtime error and varies by resource: ~500MB for some SQL ("Result exceeded maximum size (556.308MB > 500MB)," community thread 4553), ~100MB MongoDB ("Result exceeded maximum size of 100 MB," thread 21513), ~100MB Redshift ("Result exceeded maximum size (105.961MB > 100MB)," thread 4196). These are PRACTITIONER/error-message sources, not a primary limits page; a reader wanting a "max rows" number will not find one — the ceiling is bytes, not rows.
- Hard component-count / app-load ceiling: NOT FOUND. Retool publishes soft best-practice thresholds (docs.retool.com/apps/concepts/best-practices) — "Large tables with thousands of rows of data are expensive to render and sluggish with filtering, which is all done client-side on the browser" — but no enforced maximum component count. The specific numeric page-load-query thresholds render in a table that did not extract to text.
- Workflow-timeout documentation conflict: PRACTITIONER threads (community.retool.com) flag inconsistent numbers. A user (thread 22182) noted docs stated both "2 minutes" and "10 minutes" in different places. A Retool staff member ("Tess," thread 35933) wrote: "There's a 15 minute limit in the code executor. It sounds like we're planning to make this limit configurable (so you could increase it) on self-hosted instances." These divergences are in the sources; Retool has since consolidated a limits page, but the historical forum inconsistencies stand as reported.

## A3. What cannot be built (or is painful)

- Native mobile: Retool Mobile runs natively on a proprietary runtime. Offline mode caches up to 100MB and has documented constraints, quoted: "Queries configured to read data for offline mode only cache data when the user views the results. The user must navigate to screens and view the query data at least once while connected." Write queries queue and run sequentially; "If one query fails due to a conflict, the user must resolve it before any remaining queries can run." COMPETITOR-SOURCED (newly.app, a rival vendor) claims Retool Mobile "becomes sluggish with 50+ components" and that "There is no 'eject' button and no way to export your application code" — flagged as a competitor's claim, not independently verified.
- Offline (web): offline mode is mobile-only; a feature-request thread (community.retool.com/t/offline-mode-all-apps-including-mobile) asks whether self-hosted offline works for non-mobile apps.
- Public/unauthenticated apps: a "Public App" feature exists (launched alongside Custom Component Libraries, per community thread 48262). External/public users raise pricing and policy questions (community thread 53955, "Public App, External Users, and Policy").
- Deep visual/brand customization: PRIMARY marketing (retool.com) says custom CSS and custom components remove constraints ("With custom components and dynamic CSS, you're never constrained by what's available out of the box"); a PRACTITIONER thread "Customization Limits" (thread 61890) asks about the ceiling for a page needing "incredible control."
- White-label / Retool branding removal: available on External Apps (Business/Enterprise). For comparison context only, Appsmith (a competitor) requires the enterprise edition to remove a "made with appsmith" banner (Hacker News 32106594) — this is about Appsmith, not Retool.
- Real-time/collaborative UI, custom authentication flows, complex custom routing, heavy client-side computation: no primary "cannot build" statement was located; the client-side rendering caveat above (large tables filtered "client-side on the browser") is the closest documented performance boundary.

## A4. Practitioner accounts of hitting (or not hitting) the ceiling

Ceiling-hit accounts:
- Hacker News (32106594): a user tested Retool, found it "way too expensive," and reported one large application "reached the limits of no-code platforms, in our opinion. It will be rewritten in code, but we think it was not a waste of time and resources as we could iterate."
- Hacker News (39477778): a potential user chose an open-source competitor, quoting Retool's older pricing as "totally out of the question" ("no distinction between developers and end users! No access controls until the $50/user/month level!").
- Hacker News (23108432): "The retool pricing is so annoying! Not only is the price per-user..." describing workarounds so people can use embed mode.

POSITIVE ceiling accounts (counter-evidence):
- Capterra reviewer: their team "build[s] a complete suite of internal tools, used across 22 dealerships... Once we discovered the pure power of Retool, we abandoned most of our custom dev efforts. We learned that for tooling, we could accomplish everything we needed in 1/2 the time with Retool."
- G2 reviewer: Retool "help[ed] us overcome Airtable's record count limits and handling more complex workflows."
Both positive accounts are review-site sources subject to vendor review-solicitation; that caveat is stated at point of use.

## A5. Migrations off Retool

Named, dated migrations OFF Retool with verbatim post-mortems are thin. The clearest documented cases are teams REJECTING Retool at evaluation:
- Hacker News (39477778): a team "looked at Retool first but la[nded]" on an open-source competitor, citing pricing and the lock-in concern.
- Hacker News (32106594): a team hit no-code limits on one large app and planned to rewrite it in code.

Vendor-competitor "migration guides" (tooljet.com/migrate-from-retool-to-open-source-alternatives) assert "Companies are increasingly migrating away from Retool to open source alternatives" and "Migrating from Retool typically saves 40% on long-term infrastructure costs" — COMPETITOR-SOURCED, no named companies, no primary data.

NULL: Searched Hacker News, Reddit (r/nocode, r/internaltools), and community.retool.com for named companies (with dates) that publicly migrated off Retool with quoted reasons; found individual practitioner accounts and rejections but no widely-documented named-company migration with a dated public post-mortem.

## A6. Cost at scale

PRIMARY (retool.com/pricing) and multiple THIRD-PARTY summaries (as of 2026). Note that several exact figures below come from third-party pricing explainers (jetadmin.io, uibakery.io, vendr.com, checkthat.ai, automationatlas.io) which state they are "approximate ranges based on multiple public sources"; Retool's own pricing page geo-prices and does not render all seat rates as plain text:
- Free: $0, up to 5 users, 500 workflow runs/month, 5GB storage (retool.com/pricing).
- Team: ~$10/builder/month and ~$5/internal user/month (annual). UI Bakery's explainer states Business "Monthly: $65 per builder/month and $18 per internal user/month."
- Business: ~$50/builder/month annual (or ~$65 month-to-month) and ~$15–18/internal user/month; SSO, external apps, source control, audit logs are gated here.
- Enterprise: custom-quoted (FLAG: not publicly priced). Retool's pricing page states Enterprise supports both cloud and self-hosting.
- External users (Business+): checkthat.ai (summarizing the pricing page) states "Customer-facing portals require the Business plan minimum and are billed per user above the first 50, ranging from $8/month per user (51–250 on annual billing) down to $4/month per user (501+)."
- Workflow run overages: "Team and Business plans include 5,000 workflow runs per month, then charge $75 per additional 5,000 runs" (checkthat.ai).

INFERRED cost derivation (labeled INFERRED; assumptions: Business annual at ~$50/builder and ~$15/internal user; 5 builders):
- 10 internal end users: 5 builders × $50 = $250 + 10 × $15 = $150 → ~$400/month.
- 100 internal end users: 5 × $50 = $250 + 100 × $15 = $1,500 → ~$1,750/month.
- 1,000 internal end users: 5 × $50 = $250 + 1,000 × $15 = $15,000 → ~$15,250/month.
- If the 1,000 are EXTERNAL users instead (Business, first 50 free, remainder tiered ~$4–8/user): 950 billable at a blended ~$5 → ~$4,750 + $250 builders → ~$5,000/month.
This arithmetic is illustrative; actual external-user tier boundaries and any Enterprise volume discounts are not fully public. Self-hosted uses the same per-user rates per Retool's pricing, but adds infrastructure cost the customer bears.

## A7. Embedding and reselling

PRIMARY LEGAL (accessed Aug 13, 2026):
- Acceptable Use Policy (docs.retool.com/legal/acceptable-use-policy, updated May 27, 2026) prohibits, verbatim: "sublicense, resell, time share or similarly exploit the Services, unless otherwise permitted by Retool;" and "make any Custom Apps publicly available, unless expressly permitted under the Contract;" and "access the Services in order to build a similar or competitive product or service or copy any ideas, features, functions, or graphics of the Services."
- Customer Terms of Service (docs.retool.com/legal/customer-terms-of-service, updated May 28, 2026): the platform license is "a non-sublicensable, non-transferable, non-exclusive, limited license for Customer and its Authorized Users." Customer "will own all Customer Data and Custom Apps, but excluding the components of the Retool Platform." An "Authorized User" is defined verbatim as "an individual, such as an employee, contractor or client of Customer, who is invited by Customer to use the Retool Platform."

Interpretation (INFERRED from the quoted clauses): Selling a Retool-built app to third parties as one's own standalone product is not permitted by default — the AUP forbids reselling/sublicensing "unless otherwise permitted by Retool," and the platform license is non-sublicensable and non-transferable. The contractually sanctioned way to expose apps to outside users is the paid External Apps / External Users model (embed via JavaScript/React SDK, white-labeled portals, Business/Enterprise). VENDOR-CLAIMED: Retool's External Apps GA (businesswire, June 26, 2024) states it is "already being implemented at hundreds of companies" and that customers can "whitelabel Retool" for external portals. The Product-Specific Terms and Master Subscription Agreement pages exist under docs.retool.com/legal but their full text was not retrieved.

---

# PART B — TRAJECTORY

## B1. Growth and contraction indicators (timeline)

- Aug 2017 — Seed (Y Combinator W17). [THIRD-PARTY: Sacra, Tracxn]
- Mar 2019 — Series A, led by Sequoia (first Sequoia investment Oct 2019 per Tracxn; Sequoia essay dates partnership to "early 2019"). [THIRD-PARTY: Tracxn, Sequoia]
- Oct 2020 — Series B, $50M (Tracxn calls this the largest single round). [THIRD-PARTY: Tracxn]
- Dec 2021 — Series C, $20M at $1.85B valuation. [THIRD-PARTY: TechCrunch]
- Jul 28, 2022 — Series C2, $45M at $3.2B valuation, led by Sequoia (with the Collison brothers, Nat Friedman, Elad Gil, BOND, and Coatue's Caryn Marooney). Total raised commonly cited as ~$141M. [THIRD-PARTY: TechCrunch, Sacra]. No subsequent priced round located through Aug 2026.
- ARR trajectory (all THIRD-PARTY, Sacra): $10M (2020) → $30M (2021) → $82M (2022, "+173% year-over-year"). Sacra: "Sacra estimates Retool hit $120M ARR in October 2025, up from $90M at the end of 2024, growing at 39% year-over-year."
- Headcount: 340 (2023) → 401 (2024) → ~447 (Revelio Labs, "The YoY growth rate is 10.6%," latest update December 2025). Retool careers page (VENDOR-CLAIMED): "We are on track to increase headcount in 2025 to over 500 employees. Expecting a similar pace in 2026."
- Layoffs: TrueUp lists an employee-reported layoff of ~30 (9%) in June 2023. [PRACTITIONER/aggregator — see Unverified Leads]
- Executive departure: ZoomInfo notes CFO Adrian Kaplan left "to join Peregine as Chief Financial Officer" (date not specified). [THIRD-PARTY aggregator — see Unverified Leads]
- Customer count: "trusted by over 10,000 companies worldwide, including Amazon, Stripe, Brex, and Orangetheory Fitness" repeated across 2025–2026 Retool press releases. [VENDOR-CLAIMED]
- Product cadence: Modules (2021); External Apps GA (June 2024); AppGen (April 2025); Agents (May 2025); AWS Strategic Collaboration Agreement (Dec 1, 2025); AWS Consumer Goods Competency (June 8, 2026).

## B2. Third-party demand signals

- Job postings (Retool's own hiring): Revelio Labs — active job postings 31 (2023) → 70 (2024, "77.2% increase") → 57 (2025, "20.5% decline"). What this measures: Retool's own recruiting activity, NOT adoption by other companies; and it conflates all roles.
- G2 reviews: pages show ~351 reviews at 4.6/5 (g2.com compare pages) and "Filter 361 reviews" on the main product page (g2.com/products/retool), rated 4.6/5. Capterra: pages cite ~34 (Capterra Canada) up to "148 reviews." What this measures: review count reflects vendor review-solicitation campaigns as well as organic adoption — G2 vendor guides describe active review-generation programs — so volume is not a clean adoption proxy.
- Employee-growth divergence (shown side by side, not reconciled): Revelio Labs reports "+10.6%" YoY headcount (Dec 2025); Workforce.ai (via TrueUp) reports "−5,9% past 12 months." These CONFLICT; both are third-party workforce estimators using undisclosed differing methods.
- NULL: Searched for public npm/Docker pull statistics for the retool/backend image, Google Trends search-interest series, and Stack Overflow tag counts; did not retrieve citable figures within the search budget. Reported as a gap.

## B3. AI coding tools and internal-tool platforms — evidence in both directions

Replaced Retool WITH AI coding tools (named, dated, quoted): NULL for Retool specifically. Searched Hacker News, Reddit, and blogs; found generic AI-tool churn stories (e.g., mindstudio.ai, May 9, 2026, "Claude Code has fully displaced Cursor, OpenClaw, and ChatGPT from at least one serious AI builder's daily workflow") — these describe AI tools replacing each other, not replacing Retool. No named, dated, quoted case of a team replacing Retool with Cursor/Claude Code/Copilot/Codex/Devin was sourced.

Adopted/expanded internal-tool platforms BECAUSE of AI: the available evidence is VENDOR-CLAIMED. Retool's own AppGen/Agents launches and its MCP integration (retool.com/integrations/cursor) position AI coding agents as feeding INTO Retool. Retool's blog (retool.com/blog/retool-vs-claude-code, authored by "the internal tools team lead at Retool") argues "start with Claude, land in Retool" and that with Claude Code "You think you're 80% done because the thing works on your machine. In reality, you're about 20% done." This is VENDOR-CLAIMED positioning.

Measured before/after 2024 adoption data: only Sacra ARR estimates (THIRD-PARTY) and Retool's own survey figures (VENDOR-CLAIMED) were found. Sacra: Retool $90M (end-2024) → $120M (Oct 2025). By comparison, Sacra states "Replit's annual recurring revenue (ARR) hit ~$253M in October 2025, up ~16x from $16M at the end of 2024... Cursor at $500M ARR in May 2025... Lovable at $120M ARR in August 2025, up ~71,000% YoY and valued at $1.8B."

Which side has more evidence: More documented, dated evidence exists for AI app builders (Replit, Lovable, Cursor) growing rapidly (Sacra third-party estimates) than for any named team replacing Retool with an AI tool (NULL). Much of the "AI helps Retool" evidence is Retool's own (VENDOR-CLAIMED). No conclusion is drawn on which trend wins.

## B4. What Retool says about AI

- David Hsu, Retool Summit (Oct 7, 2025), quoted by SiliconANGLE (Oct 8, 2025): "AI has dropped the bar to prototype, but the bar to ship hasn't moved. Describe the app you want and in just a few minutes, you've got an app. Our goal is to help you build the very best internal software." He characterized the driver as the "shockingly low quality of the average internal tool." [THIRD-PARTY journalism quoting Hsu]
- David Hsu (Product School podcast, via tldrecap.tech recap): "If you're not reinventing yourself, someone else is going to reinvent you." [PRACTITIONER recap of a podcast — venue and quote fidelity not primary]
- Products (VENDOR-CLAIMED for launch/positioning): AppGen (enterprise AI app generation, April 2025); Agents (May 2025 — Business Wire, May 28, 2025: "Agents use LLMs for reasoning capabilities and Retool for taking action, ultimately accomplishing work autonomously"); Retool AI / AI Assist (code suggestions, component generation). AI credits and Agent hours are bundled per tier as monetization units (Sacra).
- Milestone claim (VENDOR-CLAIMED): Business Wire, May 28, 2025: "Retool... today announced that companies like Amazon Web Services (AWS) and Databricks have already automated over 100 million hours of work using its platform."
- AWS: Business Wire, Dec 1, 2025: "Retool... today announced a multi-year strategic collaboration agreement (SCA) with Amazon Web Services (AWS)"; Retool is "part of the AWS Independent Software Vendor (ISV) Accelerate Program." Coverage: go-to-market and integration with Amazon Redshift, S3, DynamoDB, Athena, and Bedrock. Retool was also named 2025 Databricks Emerging Partner of the Year, and Business Wire (June 8, 2026) reports "Retool Achieves AWS Consumer Goods Competency," which requires partners to "undergo rigorous technical validation." [VENDOR-CLAIMED / partner announcements]

## B5. Competitive displacement

- Named alternatives positioned against Retool: Appsmith, Budibase, ToolJet, Superblocks, UI Bakery, Jet Admin, DronaHQ (internal-tool platforms); Lovable, Bolt, Base44, Replit, v0 (AI app builders).
- Documentation of share-taking is almost entirely COMPETITOR-SOURCED comparison pages: tooljet.com, superblocks.com, jetadmin.io, uibakery.io, adalo.com each run "Retool alternative/pricing/migration" pages. ToolJet claims migrations save "40%" and that "Retool has the largest market share but is proprietary and not self-hostable on lower tiers" (COMPETITOR-SOURCED, unverified). No independent analyst market-share data was sourced.
- In-house builds: Sacra's 2022 note (THIRD-PARTY analyst commentary, not measured share loss) observed Retool's enterprise pivot came "at the risk of leaving the bottom end of the market vulnerable to low-end disruption from fast followers like Budibase, Appsmith, Superblocks and others which compete on feature and positioning differentiation and on price."
- GitHub stars as an open-source-momentum proxy (jetadmin.io, Feb 2025): Appsmith and ToolJet "30K+"; Budibase "20K+." THIRD-PARTY; measures repo popularity, not Retool displacement.

---

# CIRCULATING STATISTICS THAT DO NOT SURVIVE SOURCING

- "Gartner estimates that up to 50% of all code is written for internal use." Appears verbatim in Retool's own job postings ("Nearly every company in the world runs on custom software: Gartner estimates that up to 50% of all code is written for internal use") and in Sequoia's 2019 essay ("Gartner estimates that up to half of all code is written for internal apps"). Trail: no Gartner report ID, title, or publication date is cited anywhere it appears; it circulates within Retool marketing and its lead investor's blog. Dead-ends at Retool/Sequoia repetition with no locatable primary Gartner document.
- "70%/75% of new applications will be low-code by 2025/2026 (Gartner)": widely repeated in low-code marketing; not located with a primary Gartner report ID within this research. Reported as unverified within budget.
- "Companies spend X% of engineering time on internal tools" / "Roughly 80% of the internal tools that businesses write fit a simple set of primitives" (Sacra 2022): THIRD-PARTY estimate; no primary methodology published.
- Forrester "over $120B per year on custom-built software" (Sequoia 2019 essay): attributed to Forrester but with no report ID; circulates via Sequoia/Retool.
- "10,000+ customers": VENDOR-CLAIMED across press releases with no third-party audit. The earlier "more than 500,000 apps built" (TechCrunch 2022) is also VENDOR-CLAIMED.
- ARR figures: Sacra ($120M, Oct 2025) is a third-party estimate. Getlatka's page contradicts itself and Sacra: "In 2025, Retool's revenue reached $120M. The company previously reported $138.6M in 2024" — i.e., it shows 2024 revenue ($138.6M) higher than its own 2025 figure ($120M) and above Sacra's Oct-2025 estimate. Shown as conflicting; not averaged or reconciled. No audited ARR exists (Retool is private).
- "Retool's total funding is $190M" (Growjo) vs. "~$141M" (Sacra/TechCrunch) vs. "$165M over 6 rounds" (Tracxn) vs. "$121M over 4 rounds" (Getlatka): total-funding figures conflict across aggregators. Presented side by side; not reconciled.

# NULLS

- Named-company migrations OFF Retool with dated public post-mortems: searched Hacker News, Reddit (r/nocode, r/internaltools), and community.retool.com; found practitioner rejections and one "will rewrite in code" account, but no named-company dated migration write-up.
- Named, dated case of a team replacing Retool specifically with an AI coding tool (Cursor/Claude Code/Copilot/Codex/Devin): not found.
- Public npm/Docker pull statistics (retool/backend), Google Trends series, and Stack Overflow tag counts: not retrieved within the search budget.
- Product-Specific Terms full text and Master Subscription Agreement full text: pages exist under docs.retool.com/legal but full text was not retrieved.
- Web-app (non-mobile) maximum file-upload size: not stated in primary docs; the 40MB figure is the mobile-documented and community-reported figure. A community user noted (thread on file uploads): "I looked through the Retool documentation on file uploads, but don't see anywhere where it states the maximum file size."
- Fixed "maximum rows per query": no primary number; only resource-specific result-size errors (~100MB–500MB) from community threads.

# UNVERIFIED LEADS

- CFO Adrian Kaplan's departure to Peregrine (ZoomInfo aggregator; date and details not confirmed by a primary source or journalism).
- TrueUp's June 2023 layoff of ~30 (9%) (employee-reported aggregator; not confirmed by Retool or journalism).
- Workforce.ai's "−5.9%" headcount figure (conflicts with Revelio's "+10.6%"; method undisclosed).
- "Retool recommends keeping query response payloads under 1.6MB" (RapidDev, third-party; not found in primary docs).
- Native "Source Code Sync on Business plan without CLI" (rapidevelopers.com third-party; Retool's own blog frames full SCM as an Enterprise feature — the gating claim is unresolved between sources).