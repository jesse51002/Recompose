# Extensibility demand across white-label mobile app platforms: an evidence report

## 1. TL;DR
- No platform in any industry surveyed has a **MEASURED, publicly-documented churn or lost-deal figure attributable to a refused per-tenant feature**. Refused-demand *requests* are documented (feature-request boards, G2/Capterra reviews); the *cost of refusing them* is a near-universal NEGATIVE RESULT in the public record.
- The clearest confirmed competitive signal is AI extension codegen shipping on vendors' own SDKs: Q2 "Q2 Code" (April 16, 2026, Claude Code via Amazon Bedrock), **Alkami "Alkami Code Studio" (announced the same day, April 16, 2026)**, **Temenos "Copilot for Workbench" (fact sheet dated April 2026; forum May 7, 2026)**, Salesforce "Agentforce Vibes" (Oct 1, 2025), ServiceNow "Build Agent"/Now Assist, Retool AppGen, Bubble AI App Generator, and monday "vibe." Most vertical SaaS platforms (fitness, salon, field service, creator, property, legal, fleet) have shipped end-user/ops AI agents, **not** SDK codegen — a set of NEGATIVE RESULTS.
- The READ-ONLY vs WRITE ratio — the brief's most-wanted number — **cannot be computed reliably per platform** from public evidence: verbatim refused requests exist but samples per platform are in the single digits. Reported below as individual attributed quotes with sample sizes, not as ratios.

## 2. Key findings
1. **Q2 Code is confirmed by primary sources.** Q2 Holdings (NYSE: QTWO) announced Q2 Code on April 16, 2026, "Developed by integrating Anthropic's Claude Code through Amazon Bedrock," to "turn natural language prompts into Q2 SDK-compliant extensions and integrations" via Q2 Innovation Studio; the release names Mid-Hudson Valley Federal Credit Union as an early adopter. [MEASURED — Q2/Business Wire release; press.aboutamazon.com] Confidence: high.
2. **Alkami Code Studio is the closest structural analog and shipped the same day.** Announced April 16, 2026 (Plano, TX; Nasdaq: ALKT) at Alkami Co:lab 2026, it is embedded in the SDK Wizard and "generates standards-aligned, design-compliant components powered by closed-loop large language models operating within Alkami's secure infrastructure" — the specific model is not named. Named early tester: Patelco Credit Union. [MEASURED — Alkami PRNewswire release] Confidence: high on existence, low on model.
3. **Temenos Copilot for Workbench** "helps business and technical users ask questions in natural language… and generate code extensions" on the Temenos Core Extensibility Framework; the Copilot for Workbench fact sheet is dated April 2026 and it was featured at the Temenos Community Forum on May 7, 2026. [MEASURED — temenos.com/innovation/ai; fact sheet April 2026] Confidence: high.
4. **Horizontal platforms have shipped NL→platform-native codegen:** Salesforce Agentforce Vibes (Oct 1, 2025, forked from Cline's VS Code extension, agent "Vibe Codey," multi-model incl. GPT-5 and Salesforce-hosted models), ServiceNow Build Agent / Now Assist for Creator (proprietary Now LLM), Retool AppGen, Bubble AI App Generator, monday "vibe." [MEASURED — vendor dev blogs/newsrooms] Confidence: high.
5. **HubSpot and Twilio ship Claude-compatible tooling.** HubSpot's Developer MCP Server lets developers "create HubSpot apps using natural language… like Claude Code, Cursor, and Codex"; Twilio ships an MCP server and a Claude Code plugin. Model is BYO, not bundled. [MEASURED — developers.hubspot.com/ai-tools; twilio.com/docs/ai] Confidence: high.
6. **Cost-of-refusal is a systematic NEGATIVE RESULT.** Across fitness, faith, creator, community, salon, restaurant, field service, e-commerce, banking, healthcare, property, events, and legal, no audited or attributed churn/lost-deal number tied to a refused per-tenant feature was found in earnings calls, analyst notes, or reviews. Confidence: high that it is absent from public record; the absence is the finding.
7. **Container vs per-tenant model varies sharply and determines addressable app count.** Planning Center runs an app that is "exclusively a 'container app,'" so "churches cannot have their own custom-branded app in the app stores" (subsplash.com). Subsplash, Pushpay, Tithe.ly run both container and per-tenant branded apps. Skool and Shopify Shop Minis are container models; Tapcart, Kajabi, Thinkific, Q2/Alkami give each tenant its own binary or FI-branded app. [MEASURED — vendor/help pages] Confidence: high.
8. **Tapcart's extension surface is native-composable but scope-bounded.** Custom Blocks (React/JS via App Studio SDK) render inside the merchant's native app but "do not support: Customizing app navigation… the cart, checkout area or member account area," and placement is "only supported on the homepage, product detail page or cart"; Enterprise-only; testing "is done in production." [MEASURED — help.tapcart.com; dev.tapcart.com] Confidence: high.
9. **Alkami's surface inserts native UI, bolt-on, partner-deployable, web+mobile.** Widgets/Snippets/Modules "bolt onto the existing base platform without altering the underlying environment"; a widget "has full control over the area of the screen" on "Desktop, Mobile, Tablet"; certified third-party System Integrators can build. Stack is C#/.NET/WCF (regulated banking). [MEASURED — docs.developer.alkami.com] Confidence: high.
10. **Shopify Shop Minis reach a container, not per-merchant binaries.** React Native SDK; Minis run inside the Shop app "in front of 100 million buyers"; GA to all developers in the Winter 2026 Editions ("Building a Mini used to require partnering directly with Shopify. Not anymore."); emoji-instead-of-Lucide-icons draws "instant rejection" (review gate). [MEASURED — shopify.dev changelog and docs] Confidence: high.
11. **Mindbody exposes read/write API behind four gates but no in-app native UI insertion.** Public API V6 + free webhooks; "four distinct gates: Mindbody's review, a credit card on file, a site-specific code… and an action only the studio owner can take" (usecarly.com, third-party). Branded app is configured, not code-extended. [MEASURED docs + third-party summary] Confidence: moderate-high.
12. **NexHealth writes to health-record systems.** Synchronizer API is "Not just read-only. Post appointments, payments, and forms"; POST /appointments "will insert a new appointment… into the health record system," across "over 15 dental and medical" systems. It is API infrastructure, not a white-label mobile app builder. [MEASURED — docs.nexhealth.com] Confidence: high.
13. **AppFolio's API is characterized as one-way and category-restricted.** A competitor (Rentvine) citing a 2026 VPI report states AppFolio "supports one-way data export only" and excludes "rent payments, tenant screening, and renters insurance." [VENDOR-CLAIMED by a competitor citing third-party docs] Confidence: low-moderate (competitor source; not AppFolio's own doc).
14. **Buildium's Open API is create-capable but plan-gated, and Buildium is RealPage-owned.** "Create capabilities have been released" (developer.buildium.com changelog); a third party notes "Open API is only available on Premium plans starting at $375/month." RealPage announced the Buildium acquisition on Nov 6, 2019 for "an initial purchase price of $580 million in cash," with Buildium generating "approximately $50 million in revenue during the twelve months ended September 30, 2019." [MEASURED changelog + RealPage/Nasdaq release; ESTIMATED/third-party pricing] Confidence: moderate-high.
15. **Skool and Mighty Networks have no public API, and tenants ask for one on the record.** Mighty community post: "Do you have a public API? or web-hooks available?"; Skool owner post argues it is "beyond incredibly important that API's are created." [MEASURED — community boards; small sample] Confidence: high that requests exist; low as a ratio.
16. **Kajabi refuses in-app custom code by design.** "Kajabi doesn't support coding customizations," though it "planned to add customizable widgets"; a custom-code editor exists only on the web "Pro ($319/month)" tier. [MEASURED — TechCrunch May 2, 2024; third-party] Confidence: high.
17. **Job postings confirm staffed, funded per-tenant/custom engineering at white-label vendors.** Duda advertises a "Senior Partner Solutions Engineer" (Louisville, CO; "155K-175K") to deliver "tailored solutions"; Instructure staffs a "Software Engineer (Professional Services Team)" ("102K-140K Annually") to "build custom solutions and integrations." [MEASURED — builtin.com listings] Confidence: high for those two; unknown elsewhere.
18. **Toast's model is integration-partner APIs, not native POS-screen insertion.** Partner API + outbound APIs where "the Toast platform acts as the API client"; applications pass a review; no documented third-party native-UI insertion into POS screens. [MEASURED — doc.toasttab.com] Confidence: high.

## 3. Details by research question

### Q1 — What tenants ask for and are told no to; READ-ONLY vs WRITE
Verbatim refused/unmet requests found (attributed; short quotes). **Samples per platform are single-digit; no per-platform ratio is computed.**
- **Mindbody (G2, ~2 relevant detailed reviews):** "difficult to have customers book term bookings for family accounts" → **WRITE** (booking rule). "aren't enough filters on the MindBody custom booking app" → **READ-ONLY** (filtered view). [g2.com]
- **Subsplash (Capterra):** "can't sync the calendar's in Subsplash to our external calendars" → **WRITE/integration**. [capterra.com]
- **Mighty Networks (community, 1 post):** "Do you have a public API? or web-hooks available?" → **WRITE/integration**. [community.mightynetworks.com]
- **Skool (community, 1 post):** request that "API's are created… for ANY automation platform" → **WRITE/integration**. [skool.com]
- **Tapcart (docs, an enumerated refusal set rather than a request):** navigation, "cart, checkout area or member account area," AR/virtual try-on are unsupported → predominantly **WRITE** surfaces. [help.tapcart.com]

Aggregate observation: among the handful of verbatim items, integration/write requests outnumber read-only view requests, but the total sample (fewer than ~10 attributable items across all platforms) is far too small to publish a ratio. This is itself a finding: **public feature-request boards for these specific white-label mobile platforms are sparse or gated**, so the "single most valuable number" cannot be established from public sources at the platform level.

### Q2 — Does refusing cost the platform anything measurable?
NEGATIVE RESULT across every industry. What was searched: earnings-call commentary, analyst notes, win/loss language, churn postmortems, and G2/Capterra/Reddit reviews mentioning leaving. Findings:
- The nearest quantifiable "leaving" signal is **switching cost, not feature refusal**: on Kajabi, third-party/Trustpilot commentary says leaving Kajabi Payments loses recurring subscribers who must re-enter payment details (group.app summary of Trustpilot). That is lock-in churn, not cost of refusing a feature. [secondary]
- Jobber "can be slow to act on feature requests" (getskimmer.com, competitor blog) — stated dissatisfaction, no revealed churn number. [secondary]
- No industry produced a MEASURED figure. The null result holds for fitness, faith, creator, community, salon, restaurant, field service, e-commerce, credit unions, healthcare, real estate, property management, events, legal, veterinary, franchise, fleet, and hospitality.

### Q3 — Extension-surface depth (from developer docs)
| Platform | Native UI into existing screen? | Host/deploy | Mobile reach | Review gate | Doc page |
|---|---|---|---|---|---|
| Alkami | Yes — widget "has full control over the area of the screen," bolt-on | FI/partner (certified SIs) | Desktop+Mobile+Tablet | Yes (certification) | docs.developer.alkami.com |
| Q2 | SDK-compliant extensions via Innovation Studio | FI/partner | Digital banking app | Yes (governed) | Q2 press / Innovation Studio |
| Tapcart | Yes but only homepage/PDP/cart; not nav/checkout/account | Partner (dashboard/CLI) | Native mobile | Merchant self-QA "in production" | help.tapcart.com; dev.tapcart.com |
| Shopify Shop Minis | Native-feel React Native inside Shop container | Partner, in Shop app | Mobile (Shop app) | Yes (rejection for style violations) | shopify.dev changelog |
| Mindbody | No native insertion; API read/write + configured branded app | Platform | Branded app + marketplace | Yes (4 gates) | developers.mindbodyonline.com |
| Toast | No native POS-screen insertion; partner/outbound APIs | Partner API server | POS workflows | Yes (partner application) | doc.toasttab.com |
| Cvent | Custom widgets embed UI in event sites; white-label docs | Partner | Attendee Hub / event apps | Essentials tier default | developers.cvent.com |
| NexHealth | N/A (API infra); writes to EHR | Developer | Powers third-party apps | Sandbox→live review | docs.nexhealth.com |
| Buildium | No native app insertion; Open API create-capable | Developer | Resident app (shared) | Premium plan gate | developer.buildium.com |
| AppFolio | Characterized one-way, category-restricted (competitor source) | — | Shared portals | — | rentvine.com (competitor) |
| Kajabi | No in-app custom code; web custom-code only on Pro | Platform | Per-creator branded app | Platform | kajabi.com; techcrunch.com |
| Circle | Full API but "not meant to… re-create your own Circle app" | Developer | Branded apps (container) | — | api-v1.circle.so |
| Mighty Networks | No public API confirmed | — | Branded apps + container | — | rollout.com; apitracker.io |
| Skool | No public API | — | Container app | — | skool.com community |

### Q4 — Where tenants left and built their own app over a functional/extensibility wall
NEGATIVE RESULT for documented, attributed cases naming an extensibility wall (not cost, not design) as the stated reason, with a named tenant. Adjacent, non-conclusive signals: Kajabi/Thinkific tiering forces "own your own code" onto the highest plan (spotlightr.com; ship30for30.com); a Tapcart testimonial cites a brand replacing "homegrown technology" *with* Tapcart (reverse direction). No reverse-migration ("built custom, came back") case with attributed quotes was found.

### Industry/platform notes
- **Fitness/gyms:** Mindbody (per-business branded app + marketplace container), Trainerize, ABC Fitness, Xplor, WellnessLiving — all ship ops/booking AI, none ship SDK codegen (NEGATIVE). Mindbody API is read/write behind four gates.
- **Faith:** Subsplash & Pushpay run both container and per-tenant apps; Planning Center is container-only. No SDK codegen found (NEGATIVE for Subsplash/Pushpay, unverified).
- **Creator/courses:** Kajabi refuses in-app code; Thinkific has an app store and code on the top tier. AI = content assistants, not codegen.
- **Community:** Circle has a full data API (not app-recreation); Mighty Networks and Skool have no public API and on-record requests for one.
- **Salon/spa:** Vagaro, Boulevard, Zenoti, Fresha — unofficial/partner APIs; AI = booking/CRM assistants (NEGATIVE for codegen).
- **Restaurants:** Toast partner/outbound APIs; Toast IQ is an ops assistant (NEGATIVE for codegen).
- **Field service:** Jobber/Housecall Pro/ServiceTitan — APIs with review gates; ServiceTitan uses Claude Code internally but ships no codegen product (NEGATIVE).
- **E-commerce mobile:** Tapcart (per-merchant binary, scoped React blocks + App Studio AI agent skills); Shopify Shop Minis (container).
- **Banking/credit unions:** Q2 and Alkami both ship native-UI SDKs and, now, AI codegen (Q2 Code, Alkami Code Studio); Temenos Copilot for Workbench generates code extensions; nCino/Jack Henry/Fiserv/FIS = NEGATIVE for shipped codegen.
- **Healthcare:** NexHealth writes to EHRs via API (infra, not app builder).
- **Property/real estate:** AppFolio (restricted API), Buildium (plan-gated create API, RealPage-owned); AI = ops agents (Realm-X, Lumina), not codegen (NEGATIVE).
- **Events:** Cvent (widgets + white-label docs, container/per-event apps); Whova (integration-only).
- **Legal/fleet/hospitality:** Clio, Samsara, Motive, Fleetio, Cloudbeds, Mews — NEGATIVE or unverified for SDK codegen; Clio/Samsara ship work/ops AI.

## 4. Tables

### 4.1 Platform scoring (structured evidence summary)
Scores 1–5 per axis; **U = unknown/absent evidence** (not scored). "Known-wtd subtotal" sums only scored axes using the brief's weights (RD×3, CoR×3, ESD×2, CDB×2, AAC×2, ROS×2, TD×2, RE×1, BvB×2). Because cost-of-refusal (CoR) and read-only-share (ROS) are absent for almost every platform, subtotals are **not directly comparable across rows** with different unknown counts; the # unknowns column is essential context. Reliability: H=primary doc/filing, M=mixed/secondary, L=competitor/inference. One-line justifications follow the table.

| Platform | RD | CoR | ESD | CDB | AAC | ROS | TD | RE | BvB | Known-wtd subtotal | # U | Reliab. |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Tapcart | 3 | U | 3 | 3 | 5 | U | 5 | 3 | 2 | 48 | 2 | H |
| Mindbody | 4 | 2 | 2 | U | 3 | 3 | 3 | 2 | 3 | 48 | 1 | M |
| Kajabi | 3 | 2 | 1 | 1 | 4 | U | 4 | 2 | 4 | 45 | 1 | M |
| Alkami | 3 | U | 5 | 4 | 5 | U | 2 | 1 | 1 | 44 | 2 | H |
| Q2 | 3 | U | 4 | 4 | 5 | U | 2 | 1 | 1 | 42 | 2 | H |
| Thinkific | 3 | U | 2 | 2 | 4 | U | 4 | 2 | 3 | 41 | 2 | M |
| Mighty Networks | 4 | U | 1 | 1 | 3 | U | 3 | 3 | 4 | 39 | 2 | M |
| Skool | 4 | U | 1 | 1 | 1 | U | 3 | 3 | 5 | 37 | 2 | M |
| AppFolio | 3 | U | 1 | U | 1 | 4 | 3 | 1 | 3 | 34 | 2 | L |
| Shop Minis | 3 | U | 3 | U | 1 | U | 5 | 1 | 2 | 32 | 3 | H |
| ServiceTitan | 3 | U | 2 | U | 2 | U | 3 | 1 | 3 | 30 | 3 | M |
| Jobber | 3 | U | 2 | U | 1 | U | 3 | 2 | 3 | 29 | 3 | M |
| Buildium | 3 | U | 2 | U | 1 | U | 3 | 1 | 3 | 28 | 3 | M |
| Circle | U | U | 2 | U | 3 | U | 4 | 3 | 3 | 27 | 4 | M |
| Cvent | U | U | 3 | U | 2 | U | 3 | 1 | 3 | 23 | 4 | M |

Per-row one-line justifications (axis with source):
- **Tapcart** — ESD 3: native React blocks but limited to homepage/PDP/cart (help.tapcart.com); AAC 5: each merchant has own binary; TD 5: React/JS, unregulated; BvB 2: has App Studio SDK + AI agent skills already (dev.tapcart.com).
- **Mindbody** — RD 4: multiple verbatim requests on G2; CoR 2 and ROS 3: from small G2 sample only; ESD 2: API + configured app, no native insertion (developers.mindbodyonline.com).
- **Kajabi** — ESD 1 / CDB 1: "doesn't support coding customizations," no custom-dev offer (techcrunch.com); AAC 4: per-creator branded app (kajabi.com).
- **Alkami** — ESD 5: native full-screen widgets, bolt-on (docs.developer.alkami.com); CDB 4: certified SIs; BvB 1: Code Studio AI codegen already shipped (Alkami PRNewswire); TD 2: C#/.NET, regulated.
- **Q2** — ESD 4 / BvB 1: Innovation Studio SDK + Q2 Code AI codegen (Q2 release); RE 1: public company, procurement.
- **Thinkific** — CDB 2: app store; TD 4: web; AAC 4: per-creator branded app.
- **Mighty Networks** — RD 4: on-record API requests; ESD 1 / CDB 1: no public API (apitracker.io); BvB 4: no SDK/AI codegen.
- **Skool** — RD 4: on-record API requests (skool.com); AAC 1: container app; BvB 5: no SDK/AI codegen.
- **AppFolio** — ESD 1: one-way/category-restricted per competitor (rentvine.com, low reliability); ROS 4: exports are read-only.
- **Shop Minis** — ESD 3: native RN inside container; AAC 1: single Shop container; TD 5: React Native (shopify.dev).
- **ServiceTitan** — ESD 2 / TD 3: gated API, .NET; BvB 3: API but no shipped codegen product (developer.servicetitan.io).
- **Jobber** — ESD 2: API, review gate; RD 3: "slow to act on feature requests" (getskimmer.com).
- **Buildium** — ESD 2 / BvB 3: create-capable Open API, plan-gated (developer.buildium.com); AAC 1: shared resident app.
- **Circle** — ESD 2: API "not meant to re-create your own Circle app" (api-v1.circle.so); AAC 3: branded apps; RD U: no board sample located.
- **Cvent** — ESD 3: custom widgets embed UI + white-label docs (developers.cvent.com); RD/CoR/ROS U: no board sample located.

### 4.2 Datapoint table (source + date)
| Datapoint | Value | Tag | Source | Date |
|---|---|---|---|---|
| Q2 Code announced | Claude Code via Bedrock, Q2 SDK extensions; early adopter Mid-Hudson Valley FCU | MEASURED | businesswire.com / press.aboutamazon.com | Apr 16, 2026 |
| Alkami Code Studio announced | AI SDK-component gen in SDK Wizard, beta; tester Patelco CU | MEASURED | Alkami PRNewswire | Apr 16, 2026 |
| Temenos Copilot for Workbench | "generate code extensions" on Extensibility Framework | MEASURED | temenos.com/innovation/ai; fact sheet | Apr 2026 |
| Salesforce Agentforce Vibes | NL→Salesforce app code; forked from Cline; multi-model | MEASURED | developer.salesforce.com; TechCrunch | Oct 1, 2025 |
| HubSpot Developer MCP Server | "create HubSpot apps using natural language… Claude Code" | MEASURED | developers.hubspot.com/ai-tools | 2026 |
| Tapcart Custom Blocks scope | homepage/PDP/cart only; no nav/checkout | MEASURED | help.tapcart.com | current |
| Alkami widget UI | "full control over the area of the screen," Desktop/Mobile/Tablet | MEASURED | docs.developer.alkami.com | current |
| Planning Center app | "exclusively a 'container app'" | MEASURED | subsplash.com | current |
| Mindbody API gates | "four distinct gates" | MEASURED/3P | usecarly.com | current |
| NexHealth write | POST /appointments inserts into EHR | MEASURED | docs.nexhealth.com | current |
| Buildium API price | Open API on "Premium… $375/month" | ESTIMATED/3P | supergood.ai | current |
| Buildium acquisition | RealPage, "$580 million in cash"; ~$50M TTM revenue | MEASURED | RealPage/Nasdaq release | Nov 6, 2019 |
| AppFolio API | "one-way data export only," category-restricted | VENDOR-CLAIMED (competitor) | rentvine.com | 2026 |
| Duda role | "Senior Partner Solutions Engineer," "155K-175K" | MEASURED | builtin.com | 2026 |
| Instructure role | "Software Engineer (Professional Services Team)," "102K-140K" | MEASURED | builtin.com | 2026 |
| Kajabi in-app code | "doesn't support coding customizations" | MEASURED | techcrunch.com | May 2, 2024 |
| Shop Minis reach | React Native SDK, "100 million buyers," GA Winter 2026 | MEASURED | shopify.dev | 2026 |

### 4.3 CSV block
```csv
platform,RD,CoR,ESD,CDB,AAC,ROS,TD,RE,BvB,known_wtd_subtotal,num_unknown,reliability
Tapcart,3,U,3,3,5,U,5,3,2,48,2,H
Mindbody,4,2,2,U,3,3,3,2,3,48,1,M
Kajabi,3,2,1,1,4,U,4,2,4,45,1,M
Alkami,3,U,5,4,5,U,2,1,1,44,2,H
Q2,3,U,4,4,5,U,2,1,1,42,2,H
Thinkific,3,U,2,2,4,U,4,2,3,41,2,M
MightyNetworks,4,U,1,1,3,U,3,3,4,39,2,M
Skool,4,U,1,1,1,U,3,3,5,37,2,M
AppFolio,3,U,1,U,1,4,3,1,3,34,2,L
ShopMinis,3,U,3,U,1,U,5,1,2,32,3,H
ServiceTitan,3,U,2,U,2,U,3,1,3,30,3,M
Jobber,3,U,2,U,1,U,3,2,3,29,3,M
Buildium,3,U,2,U,1,U,3,1,3,28,3,M
Circle,U,U,2,U,3,U,4,3,3,27,4,M
Cvent,U,U,3,U,2,U,3,1,3,23,4,M
```

## 5. What the evidence does and doesn't support

### Established
- Q2 Code, Alkami Code Studio, Temenos Copilot for Workbench, Salesforce Agentforce Vibes, ServiceNow Build Agent/Now Assist, Retool AppGen, Bubble AI App Generator, and monday vibe are shipped NL→platform-native code/app generators (dates/URLs above).
- Extension-surface depth is well-documented for Alkami, Q2, Tapcart, Shop Minis, Mindbody, Toast, Cvent, NexHealth, and Buildium.
- Container vs per-tenant model is documented per platform.
- Refused/unmet requests exist on the record for Mindbody, Subsplash, Mighty Networks, Skool, and Tapcart (as enumerated refusals).
- RealPage acquired Buildium for $580M in cash (RealPage/Nasdaq release, Nov 6, 2019).

### Open (searched, not found — datapoints absent from public record)
- Any MEASURED cost-of-refusal number in any industry.
- A defensible READ-ONLY:WRITE ratio at platform level (sample too small).
- Read-only share of requests for almost all platforms.
- Existing custom-dev budget for most platforms (only Duda, Instructure confirmed via job posts; Alkami/Q2 via SI/partner programs).
- Model disclosure for Alkami Code Studio, Temenos Copilot, ServiceNow, Retool, Bubble, and monday. (Agentforce Vibes is multi-model, including GPT-5 and Salesforce-hosted models.)
- Documented tenant reverse-migration cases with attributed quotes.

### Negative results (checked; nothing found)
- SDK codegen at: nCino, Jack Henry, Fiserv, FIS, ServiceTitan, Toast, Mindbody, Vagaro, Boulevard, Zenoti, Fresha, WellnessLiving, ABC Fitness, Xplor, Kajabi, Thinkific, Circle, Mighty Networks, Skool, AppFolio, Yardi, RealPage, Buildium, Clio, Samsara, Motive, Fleetio (where searched by the subagent).
- Cost-of-refusal at every industry.
- Public feature-request boards with large samples for these mobile white-label platforms specifically.
- Platforms with the thinnest evidence base overall on the demand axes: **Cvent, Circle, and Shop Minis** (RD/CoR/ROS mostly unknown), because no public feature-request board or review sample tied to refused per-tenant functionality was located for them; what was searched: G2/Capterra, community forums, changelogs.

## 6. Circulating statistics that do not survive sourcing
- **"Mighty Networks API" with a base URL `api.mightynetworks.com/api/v1/...`** appears in a third-party tutorial (rollout.com) implying a public API; other sources (rollout.com's own guide, apitracker.io) state Mighty Networks has **no public API**. The tutorial's endpoint dead-ends — no official Mighty API reference corroborates it. Treat the tutorial as unreliable.
- **AppFolio "one-way, category-restricted API"** traces to Rentvine (a direct competitor) citing a "2026 VPI Category Report" citing "third-party integration documentation." The chain does not terminate at an AppFolio primary doc; it is a competitor's characterization.
- **Buildium "$375/month Open API"** comes from supergood.ai (a third party), not Buildium's own pricing page; the price is an estimate. (The $580M/2019 acquisition figure, by contrast, is confirmed at RealPage's own release.)
- **Kajabi-competitor branded-app price list** ("Wix $200… Bubble $29–$529… Thinkific $199") is a 2024 TechCrunch paraphrase, not a current price sheet; treat as dated estimates.

## 7. Caveats
- **Sample sizes:** verbatim refused-request evidence is single-digit per platform; no ratio is publishable. G2/Capterra summaries (e.g., "226 verified reviews," "39 users," "114 users") measure feature *sentiment*, not per-tenant refused *requests*.
- **Recency:** several platform pages and comparisons are dated 2024–2026; the Kajabi in-app-code statement is from May 2024 and Kajabi said widgets were "in the works."
- **Vendor bias:** subsplash.com, pushpay.com, alkami.com, Q2, tapcart, and circle.so are self-descriptions; competitor sources (rentvine.com, getskimmer.com, pushpay-vs-subsplash pages) are adversarial. Both are labeled at point of use.
- **Read-across:** the AI-generator census leans on one subagent pass; several vertical negatives were "searched, not found," not exhaustive proofs of absence. Cvent, Whova, Cloudbeds, Mews, NexHealth, Blackbaud, kvCORE, Subsplash, Pushpay, and Duda were not exhaustively checked for codegen.
- **Computed vs reported:** all "Known-wtd subtotal" values are computed here from per-axis scores using the brief's weights; they are not reported figures and are not comparable across rows with differing unknown counts.
- **Third-party API detection** (apitracker.io, apify.com, supergood.ai, rollout.com) fingerprints platform-level APIs, not per-tenant provenance or in-app native UI capability; used only for existence, not depth.
- **Model disclosure gap:** only Q2 (Claude Code/Bedrock), HubSpot (Claude Code/Cursor/Codex, BYO), and Twilio (Claude Code plugin, BYO) name Anthropic specifically; other codegen tools' models are undisclosed, proprietary, or multi-model.