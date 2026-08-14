# The Competitive Landscape for AI-Native, Extensible Workspaces

## TL;DR
- Across all four bands, the axis that separates products is who authors the artifact and whether AI generates working functionality. Airtable (Omni, GA June 24, 2025), Notion (Custom Agents, Feb 24, 2026) and Coda now generate tables/views/automations from a prompt (VENDOR-CLAIMED/PRIMARY); Confluence deliberately ships its HTML macro "disabled by default" and states the reason as cross-site-scripting risk (PRIMARY).
- Band C "company-brain" products have begun crossing from retrieval to durable artifact creation: Glean Agents (early 2025), Dust (300,000+ agents deployed) and Onyx (custom agents) now persist agents/workflows (PRIMARY/VENDOR-CLAIMED). Glean's own release states it "achieved $100 million in annual recurring revenue (ARR) in the fourth quarter FY25" and it raised $150M at a $7.2B valuation in June 2025 (PRIMARY/THIRD-PARTY).
- Band D artifact surfaces persist and share to varying degrees: Claude Artifacts gained persistent storage and MCP on Oct 21, 2025 and public+multiplayer sharing by July 2026 (PRIMARY); Gamma's CEO stated it "profitably hit $100 million in ARR, with 70 million users" (Nov 2025, VENDOR-CLAIMED). Several widely repeated figures — Notion's "100M users," McKinsey's "1.8 hours/day searching" — do not survive sourcing to a verifiable primary document.

## Key Findings
1. Confluence's HTML macro is "disabled by default" and Atlassian's own documentation gives the reason verbatim: "Enabling these macros can make your Confluence site vulnerable to cross-site scripting attacks." (PRIMARY, Atlassian Documentation, versions 8.3–10.2, retrieved 2026)
2. Airtable relaunched as an "AI-native app platform" in 2025; Omni went generally available June 24, 2025 and generates tables, interfaces and automations from natural language (VENDOR-CLAIMED/PRIMARY, Airtable, 2025).
3. Notion shipped a Notion 3.0 "AI Agent" on Sept 18, 2025 and "Custom Agents" on Feb 24, 2026, gated to Business and Enterprise plans; the standalone $10/user/month Notion AI add-on retired in May 2025 (THIRD-PARTY/PRIMARY; CNBC Sept 18, 2025; Notion product page).
4. Glean's Feb 5, 2025 release states it "achieved $100 million in annual recurring revenue (ARR) in the fourth quarter FY25"; it raised $150M Series F at a $7.2B valuation on June 10, 2025 (PRIMARY, Glean; THIRD-PARTY, CNBC/Reuters).
5. Dust raised a $40M Series B (May 2026, led by Abstract and Sequoia) bringing total funding over $60M; its May 18, 2026 release reports "more than 3,000 organizations, reached 41,000 monthly active users in April 2026, and has deployed over 300,000 agents," with "240% NRR with zero churn" (PRIMARY, GlobeNewswire).
6. Claude Artifacts added AI-powered publishable artifacts (June 25, 2025), persistent storage and MCP (Oct 21, 2025), and public sharing with multiplayer editing (by July 2026) (PRIMARY, Anthropic help center/docs).
7. Gamma's CEO stated via TechCrunch (Nov 10, 2025) that "the company has profitably hit $100 million in ARR, with 70 million users"; it raised $68M at a $2.1B valuation led by a16z (VENDOR-CLAIMED/THIRD-PARTY).
8. Onyx (formerly Danswer, YC W24) is MIT-licensed and self-hostable; raised a $10M seed co-led by Khosla Ventures and First Round; deployed to 14,000+ at Netflix and 37,000 users at UC San Diego (PRIMARY/VENDOR-CLAIMED).
9. Notion databases carry a documented per-database cap: Notion's help center states "each database can hold up to 250,000 rows" and "up to 500 properties" (PRIMARY, Notion help). Third-party guides cite an older 10,000-row figure — the two conflict.
10. The Notion template economy is real and monetized: Notion charges "a 8% fee plus 40 cents per transaction" per its help center; individual creators such as Thomas Frank report crossing $1M in template sales (PRIMARY/PRACTITIONER), but Notion discloses no aggregate creator-count or install figure.

## Spine table — who authors, what the artifact is, whether AI produces it

| Product | Band | Who can change what it does | What the artifact is | Does AI produce the artifact | Tag |
|---|---|---|---|---|---|
| Notion | A/B | Any end user; admins gate agents | Stored config in Notion runtime; general code via connected agents (Cursor/Claude Code, 2026) | AI produces functionality (agents, DB views, automations) | PRIMARY/THIRD-PARTY |
| Airtable | A/B | Any end user | Stored config (bases, interfaces, automations) | AI (Omni) produces working apps | VENDOR-CLAIMED |
| Coda | B | Any end user | Stored config + formula language | AI writes content + formulas | THIRD-PARTY |
| Confluence | B | End user (HTML macro admin-gated) | Stored config; HTML macro restricted | Atlassian Intelligence writes content; Rovo agents | PRIMARY |
| Glean | C | Admin/end user builds agents | Persisted agents/workflows over external data | AI produces agents | PRIMARY |
| Dust | C | Any end user ("AI Operators") | Persisted agents over 100+ sources | AI produces agents | VENDOR-CLAIMED |
| Onyx | C | Developer/admin (self-host) | General code (MIT license) + custom agents | AI produces agents | PRIMARY |
| M365 Copilot | C | Admin/maker (Copilot Studio) | Stored config agents; credits-metered | AI produces agents | PRIMARY |
| Claude Artifacts | D | Any end user | General code (HTML/CSS/JS/React), user-readable | AI produces working functionality | PRIMARY |
| ChatGPT Canvas | D | Any end user | Document/code, editable, Python execution | AI produces content + runnable code | PRIMARY |
| v0 | D | Any end user | General code (React/Next.js), exportable | AI produces working apps | THIRD-PARTY |
| Gamma | D | Any end user | Stored config (decks/sites) | AI produces decks/sites | VENDOR-CLAIMED |
| Retool | D | Developer/admin | Stored config; no code export | AI (AppGen, Oct 2025) produces apps | THIRD-PARTY |

```csv
product,band,who_authors,artifact_type,ai_produces_artifact,tag
Notion,A/B,any end user (admins gate agents),stored config + general code via agents,working functionality,PRIMARY/THIRD-PARTY
Airtable,A/B,any end user,stored config,working apps,VENDOR-CLAIMED
Coda,B,any end user,stored config + formula language,content + formulas,THIRD-PARTY
Confluence,B,end user (HTML macro admin-gated),stored config,content + Rovo agents,PRIMARY
Glean,C,admin/end user,persisted agents over external data,agents,PRIMARY
Dust,C,any end user,persisted agents over 100+ sources,agents,VENDOR-CLAIMED
Onyx,C,developer/admin,general code (MIT) + agents,agents,PRIMARY
M365 Copilot,C,admin/maker,stored config agents,agents,PRIMARY
Claude Artifacts,D,any end user,general code,working functionality,PRIMARY
ChatGPT Canvas,D,any end user,document/code + Python exec,content + runnable code,PRIMARY
v0,D,any end user,general code (exportable),working apps,THIRD-PARTY
Gamma,D,any end user,stored config,decks/sites,VENDOR-CLAIMED
Retool,D,developer/admin,stored config (no export),apps,THIRD-PARTY
```

## Band A — AI-native workspaces
Airtable executed what CEO Howie Liu called an "AI refound." Cobuilder (2024) generated starter bases from a prompt; Omni, a conversational agent, went GA June 24, 2025 and builds "tables, interfaces, and automations." Airtable's own page states: "Vibe coding tools just generate throw-away prototypes. Omni creates production-ready apps with data, automations, and interfaces." (VENDOR-CLAIMED). A practitioner review (Nikhil R, June 28, 2025) found Omni "not ready to be called an 'App builder' yet," with automation support "in alpha" (PRACTITIONER). Airtable's Series F valued it near $11.7B (THIRD-PARTY, productgrowth.in — single unverified estimator).

Mem relaunched as "Mem 2.0" in early 2026, repositioning from a notes app to an "AI Thought Partner" with agentic chat that can "create, edit, and organize notes" (PRIMARY, Mem blog). Mem is listed as a subsidiary of OpenAI (THIRD-PARTY, CBInsights). Fabric positions itself as an AI workspace across files, documents, images, video and links, with AI at every tier (VENDOR-CLAIMED, fabric.so).

Whether Notion qualifies as "AI-first" is contested: third-party commentary (Taskade, agentglitch) frames Notion as having "bolted AI onto a document database," while its Feb 24, 2026 Custom Agents launch is described by one source as closing "the gap between 'documents with AI sprinkled on top' and 'AI-native workspaces'" (THIRD-PARTY). Notion is treated primarily as a Band B product below.

## Band B — established workspaces with AI added
**Notion.** Notion AI is bundled with every paid plan (the standalone $10/user/month add-on retired May 2025). Capabilities now include agents, database/view generation, and "chat with your workspace." Notion crossed $500M annualized revenue by Sept 2025; CNBC (Sept 18, 2025) reported Notion "launched a customizable agent that can create documents to pull in data from many sources, using models from the likes of OpenAI and Anthropic." Documented database limits (PRIMARY, Notion help): "each database can hold up to 250,000 rows"; "up to 500 properties." A stated limitation from Notion's help center on performance: databases with sorts/filters on "title, text, formula, or rollup" have "load times [that] can make load times longer."

**Coda.** Acquired by Grammarly in December 2024; the parent rebranded to Superhuman in October 2025. Coda Brain was deprecated and folded into Superhuman Go (THIRD-PARTY, Slite/2sync). Coda's free plan offers "up to 50 objects...and up to 1,000 rows per doc for shared documents" (THIRD-PARTY, Zapier). Coda AI adds an AI column type and natural-language formula generation; a third-party review states its "AI features are limited to document-level operations — no autonomous agents, no persistent agent memory" (THIRD-PARTY, Taskade).

**Confluence / Atlassian.** Rovo went GA in October 2025; initially priced at "$24 per user, per month for companies with fewer than 100 users; and $20 per user, per month for 375 users," later bundled into paid cloud plans with non-subscribers charged "$5 per user, per month" (THIRD-PARTY, TechTarget/Constellation). Standard includes 25 Rovo credits per user per month (THIRD-PARTY, eesel). The HTML macro remains "disabled by default" for XSS reasons (PRIMARY).

**Airtable** (see Band A) is also an established workspace. Its documented history includes two layoff rounds totaling 491 employees (THIRD-PARTY, productgrowth.in — single source).

## Band C — company brain / enterprise knowledge AI
**Glean.** Enterprise search over Google Workspace, M365, Slack, Salesforce. Its Feb 5, 2025 release states it "achieved $100 million in annual recurring revenue (ARR) in the fourth quarter FY25"; CNBC (June 10, 2025) reported ARR "surpassed $100 million in its last fiscal year, ending Jan. 31, 2025." Glean's own Dec 8, 2025 release states it "doubled its annual recurring revenue (ARR) to $200 million, nine months after surpassing the $100 million milestone" (PRIMARY — upgraded from analyst restatement). Series F: $150M at $7.2B (June 10, 2025); total raised ~$765–768M. Launched Glean Agents early 2025 (crossing retrieval→creation); its June 10, 2025 release states the platform "is already powering more than 100 million agent actions annually" and is "setting its sights on...supporting one billion agent actions by the end of the year" (PRIMARY). Customers named in a Sept 2024 release: Reddit, Instacart, Pinterest, Duolingo, Databricks, BILL, Samsara, Grammarly. Consumption-based pricing is new to Glean's model (THIRD-PARTY, Futurum).

**Dust.** "Multiplayer" agentic AI over 100+ sources; $40M Series B (May 2026), total >$60M; SOC 2 Type II, GDPR, EU/US residency. Its May 18, 2026 release reports "more than 3,000 organizations, reached 41,000 monthly active users in April 2026, and has deployed over 300,000 agents," with monthly adoption "consistently above 90%," weekly "above 70%," and "240% NRR with zero churn" (PRIMARY). Pricing: Pro $24/seat/mo (yearly), Max $120/seat/mo, Enterprise custom (PRIMARY, dust.tt). Crosses retrieval→creation (persisted agents). Founders Gabriel Hubert and Stanislas Polu previously co-founded TOTEMS (acquired by Stripe, 2014); Polu was an OpenAI research engineer.

**Onyx (formerly Danswer).** MIT-licensed, self-hostable, air-gappable; $10M seed (Khosla, First Round, YC). Its blog states deployment "to all 14,000+ employees" at Netflix and "37,000 users" at UC San Diego. Managed cloud $20/user/month. Builds custom agents (crosses retrieval→creation). The Danswer name is discontinued and replaced by Onyx (PRIMARY; COMMUNITY-MEASURED — GitHub 18,199 stars on the legacy repo).

**Guru.** Knowledge management, founded 2013 Philadelphia; total funding ~$68–70.4M (Accel, Thrive, Emergence, Slack Fund); "over 300 paying customers" cited at Series A, named including Shopify, Square, Spotify, Intercom. Est. revenue $25–100M (THIRD-PARTY, Owler — estimate). Guru states "your data never trains an AI LLM" and cites GDPR/HIPAA/HECVAT/CAIQ crosswalks (PRIMARY).

**Microsoft 365 Copilot.** $30/user/month add-on; a Copilot Business SKU for <300 users at $21/user/month. Copilot Studio builds custom agents metered in Copilot Credits ("$200.00/pack/month for 25,000 Copilot Credits," or $0.01/credit PAYG). Internal employee-facing agents are zero-rated for licensed M365 Copilot users (PRIMARY, Microsoft). Credit costs are feature-based: "Classic response...1 credit. Generative response...2 credits. Agent action...5 credits. Tenant Graph grounding...10 credits."

Slack AI and Notion AI are referenced here as company-brain surfaces but Slack AI's granular pricing was not confirmed in this research (see Nulls).

## Band D — artifact and canvas surfaces
**Claude Artifacts.** AI-powered publishable artifacts launched June 25, 2025; persistent storage + MCP added Oct 21, 2025 ("20 MB storage limit per artifact"); public sharing with multiplayer editing confirmed as of July 18, 2026. Persistence is available on Pro/Max/Team/Enterprise, not Free. Artifacts run in a sandboxed iframe; Claude's system instructions state: "NEVER use localStorage, sessionStorage, or ANY browser storage APIs in artifacts. These APIs are NOT supported." Unpublishing is destructive: "Once you unpublish an artifact, you cannot publish that same artifact again," and it "permanently deletes all associated storage data (both personal and shared) if the artifact used persistent storage." Anthropic's launch post states end-users' Claude usage bills to their own subscription: "Their API usage counts against their subscription, not yours. You pay nothing for their usage." (PRIMARY, Anthropic).

**ChatGPT Canvas.** Launched beta Oct 3, 2024 (Plus/Team); general release Dec 10, 2024, adding Python execution and Canvas in custom GPTs (PRIMARY OpenAI; THIRD-PARTY TechCrunch). Users can "directly edit text or code" and "restore previous versions." Shareable via a view-only link; no real-time co-editing (secondary sources). OpenAI's model release notes indicate Canvas "will no longer be available in GPT-5.5 Instant or GPT-5.5 Thinking," with writing/coding moving "directly in chat responses through writing blocks and code blocks" (~late May 2026) (PRIMARY, OpenAI Help Center).

**ChatGPT Custom GPTs / GPT Store.** GPT Store launched Jan 10, 2024; OpenAI's own post states "users have already created over 3 million custom versions of ChatGPT" within two months; building "doesn't require coding experience." OpenAI announced "In Q1 we will launch a GPT builder revenue program...US builders will be paid based on user engagement with their GPTs"; the exact payout formula was never disclosed and a broad rollout is unconfirmed (PRIMARY OpenAI; secondary reporting for non-rollout). The separate Apps SDK, built on MCP, launched in preview Oct 6, 2025 ("Developers can start building them today with the new Apps SDK, available in preview...We've made the Apps SDK open source"), enabling interactive third-party apps inside ChatGPT, with paid apps possible via the Agentic Commerce Protocol (PRIMARY/THIRD-PARTY). The GPT Store (no-code custom GPTs) and the Apps SDK (developer-built MCP apps) are distinct platforms.

**v0 (Vercel).** Launched Oct 2023; rebuilt into a full-stack app builder generating React/Next.js code (exportable); "approaching $50 million in annualised revenue" by April 2026; "v0 Teams and Enterprise accounts now represent more than 50% of v0's revenue"; 4M+ users. Vercel raised a $300M Series F (Sept 2025) at $9.3B (THIRD-PARTY).

**Gamma.** Founded 2020; AI presentation/site/doc generator. Its Nov 10, 2025 Business Wire release states "Gamma customers have created more than 400 million presentations, websites, and other assets, with over 1 million pieces of content generated in Gamma every day"; CEO Grant Lee stated (via TechCrunch, Nov 10, 2025) it "profitably hit $100 million in ARR, with 70 million users." $68M Series B at $2.1B led by a16z (Nov 10, 2025), total ~$90–91M; ~50-person team; profitable since early 2024. Pricing: Free/$8 Plus/$15 Pro/$100 Ultra (VENDOR-CLAIMED/THIRD-PARTY).

**Retool.** Incumbent internal-tools builder; AI AppGen (Oct 2025) builds apps from prompts; Retool Agents (May 2025). No code export; AI apps use only Retool's components. Business $65/user/month. Valued at $3.2B (THIRD-PARTY, Medium — single source).

## Specific question 1 — user-authored executable content
- **Claude Artifacts**: permits general code (HTML/CSS/JS/React) authored by any user, runs in a sandboxed iframe; browser storage APIs blocked by system instruction ("NEVER use localStorage...ANY browser storage APIs") (PRIMARY).
- **ChatGPT Canvas**: permits inline Python execution (PRIMARY OpenAI; THIRD-PARTY TechCrunch, Dec 2024).
- **Confluence**: HTML macro "disabled by default"; documentation reason verbatim: "Enabling these macros can make your Confluence site vulnerable to cross-site scripting attacks... We strongly recommend leaving this macro disabled if you allow self-signed up or anonymous users to create content." The HTML Include macro is "a legacy macro, and is often disabled by Confluence administrators for security reasons... You should only turn on these macros if you trust all your users not to attempt to exploit them." (PRIMARY).
- **Notion**: opened to external code agents (Cursor, Claude Code, Codex) as native agents in 2026; a CodeIntegrity proof-of-concept (Sept 2025) demonstrated prompt-injection data exfiltration via a malicious PDF against Notion 3.0 agents; Notion responded by upgrading detection for "injection patterns, including those hidden in file attachments" (THIRD-PARTY).
- **v0, Retool**: general code (v0 exportable; Retool not) (THIRD-PARTY).

Pattern of deliberate restriction: Confluence is the clearest documented case; the stated reason is uniformly XSS/security across doc versions 8.3–10.2. Claude blocks browser storage APIs by design. Both restrictions are stated by the vendor in their own words, quoted above.

## Specific question 2 — tables, databases, workflows
- **Notion**: databases up to 250,000 rows and 500 properties per Notion help (PRIMARY); older third-party guides cite 10,000 rows (conflict shown, not averaged). AI generates DB properties/views (PRIMARY).
- **Airtable**: "over 50M apps" built to date (VENDOR-CLAIMED); Omni generates tables/interfaces/automations.
- **Coda**: free plan "up to 50 objects...up to 1,000 rows per doc for shared documents" (THIRD-PARTY, Zapier); buttons/rules/Packs drive in-doc automation.
- **Confluence/Jira**: Rovo automation rule generation; databases via Confluence databases.
- **Retool/v0**: generate full data-backed apps; Retool ships a built-in vector database for RAG.

## Specific question 3 — marketplaces and template economies
Notion Marketplace: creators set up a separate creator profile; Notion uses Stripe. Fee structure per Notion help: "a 8% fee plus 40 cents per transaction" (a third-party guide, easy.tools, cites "10% of $500" plus per-transaction fees — a conflicting characterization of the same fee; Notion's own help page is the PRIMARY figure). Creators earn money; named earners include Thomas Frank ("crossed $1 million in Notion template sales") and Easlo (PRACTITIONER/THIRD-PARTY). Notion discloses no aggregate creator count, no aggregate creator revenue, and no install count from the marketplace. Third-party creator-earnings ranges ($500–$50,000/month) are self-reported and unverifiable. Notion's marketplace trades templates (stored config), not executable code, so executable-review/security processes are not applicable. Coda trades "Packs" (integrations). Airtable has a template gallery. The executable-artifact marketplaces are the GPT Store (OpenAI: "over 3 million custom versions" at launch), the Apps SDK app directory, and Claude published-artifact sharing.

## Specific question 4 — deployment, enterprise readiness, buying
- **Self-hostable / local-first**: Onyx (self-host, air-gappable, MIT; "run in a completely airgapped environment"); Obsidian, Logseq, Anytype (local-first). Most others are vendor-cloud only (Notion, Airtable, Coda, Glean cloud, Gamma, v0, Claude, ChatGPT).
- **SSO/SCIM/audit**: Dust ships SOC 2 Type II, GDPR, EU/US residency, SCIM, audit logs on Enterprise (PRIMARY). Glean markets enterprise-grade governance and Glean Protect Plus (paid governance SKU). Guru cites GDPR, HIPAA, HECVAT, CAIQ crosswalks and encryption at rest/in transit (PRIMARY). Onyx supports "SSO (OIDC/SAML/OAuth2), RBAC" and document permissioning mirroring external apps (PRIMARY).
- **Budget line**: Glean/Guru/Onyx sold against knowledge management / enterprise search; Copilot/Notion against productivity; Retool/v0 against developer tooling; Airtable against no-code app platform.
- **Pricing units**: seat-based (Notion, Dust, Guru, M365 Copilot base); consumption/credits (Rovo, Copilot Studio, Notion Custom Agents credits, Glean's new consumption model).

## Specific question 5 — funding, stage, scale
| Company | Founded | Total raised | Last round | Valuation | Revenue | Tag |
|---|---|---|---|---|---|---|
| Notion | 2013 | ~$343–353M | Series C, Oct 2021 | $10B | ~$500M annualized (Sept 2025) | THIRD-PARTY |
| Glean | 2019 | ~$765–768M | Series F, Jun 2025 | $7.2B | $100M ARR (Q4 FY25, PRIMARY); $200M (Dec 2025, PRIMARY) | PRIMARY/THIRD-PARTY |
| Dust | 2023 | >$60M | Series B, May 2026 | undisclosed | 240% NRR (PRIMARY-claimed) | PRIMARY/THIRD-PARTY |
| Gamma | 2020 | ~$90–91M | Series B, Nov 2025 | $2.1B | $100M ARR (VENDOR-CLAIMED) | THIRD-PARTY |
| Guru | 2013 | ~$68–70.4M | Series C, 2020 | undisclosed | $25–100M est. | THIRD-PARTY (est.) |
| Onyx | 2023 | $10M seed | Seed | undisclosed | undisclosed | PRIMARY |
| Airtable | 2012 | undisclosed here | Series F | ~$11.7B (est.) | ~$100M+ FCF (est.) | THIRD-PARTY (est.) |
| Vercel (v0) | 2015 (Vercel) | $863M | Series F, Sept 2025 | $9.3B | v0 ~$50M annualized | THIRD-PARTY |

Disclosed vs estimated: Glean's ARR and valuation, Gamma's round, Vercel's round, and Notion's valuation are disclosed (PRIMARY/THIRD-PARTY press). Airtable's $11.7B valuation and ~$100M+ FCF, and Guru's revenue band, are third-party estimates from aggregators (productgrowth.in, Owler) whose methodology is not disclosed.

## Specific question 6 — deaths, pivots, narrowings
- Danswer → renamed Onyx (name discontinued; product continues) (PRIMARY).
- Coda Brain deprecated, folded into Superhuman Go after Grammarly's acquisition (Dec 2024) and rebrand to Superhuman (Oct 2025) (THIRD-PARTY).
- Notion AI standalone $10 add-on retired May 2025 (folded into Business/Enterprise) (THIRD-PARTY/PRIMARY).
- Tome (an early AI-deck rival that raised $43M in one 2023 round) "pivoted out of the space later," per Upstarts Media (THIRD-PARTY).
- ChatGPT Canvas being sunset from GPT-5.5 models (~late May 2026) in favor of inline writing/code blocks (PRIMARY, OpenAI release notes).
- Adobe Animate shutdown set for March 1, 2026 (adjacent, not in-band; cited only as a datapoint) with Adobe stating an AI-investment reprioritization (THIRD-PARTY).

## Specific question 7 — context note: consumer-first local tools
Obsidian, Logseq, Anytype, Capacities and Tana are local-first or object-based personal-knowledge tools. Obsidian is local-first, free for personal use, and requires a Commercial license ("$8 per user per month") for for-profit orgs of "two or more employees" (PRIMARY, Obsidian help). Logseq is free/open-source; Anytype is open-source, local, end-to-end encrypted; Capacities is object-based with a paid tier at $10/month. Tana is cloud-based, AI-native (supertags, AI voice capture), and third-party sources note it "has been pivoting toward being a team and work tool rather than a pure solo PKM app" (THIRD-PARTY, Tool Finder). Of these, Tana shows the clearest team/business adoption evidence; the rest are individual by design and, lacking AI generation of working functionality in most cases, are not worked up as competitors.

## Circulating statistics that do not survive sourcing
- **Notion "100 million users"**: widely repeated (taptwicedigital, sqmagazine) but Notion executives said in Sept 2025 (CNBC) only that the company "says it has over 100 million users" with no dated methodology; the precise "100M" figure traces to secondary stat-aggregator sites, not a Notion filing. Notion's "$400M revenue (2024)" and "$500M annualized (2025)" conflict across sources (Forbes cited ~$250M for 2023; getlatka claims "$600M ARR, $11B valuation" without a filing). Should not be cited as a hard figure.
- **McKinsey "1.8 hours/day / 19% of workweek searching"**: traces through Cottrill Research and a "Time Searching for Information" blog to a McKinsey Global Institute figure (2012), not a currently retrievable McKinsey report with that exact phrasing. The "businesses hire 5 employees but only 4 show up" analogy is a blog gloss, not McKinsey. Should not be cited as a current McKinsey statistic. A parallel IDC figure ("2.5 hours per day, or roughly 30% of the workday") circulates with the same weak provenance.
- **IDC "$X billion lost to poor knowledge sharing"**: not located in this research; trail dead-ends. No primary IDC document found.
- **Glean/Gamma ARR**: Glean's $100M and $200M ARR figures are in its own press releases (PRIMARY). Gamma's $100M ARR and 70M users are founder-stated (VENDOR-CLAIMED), repeated by TechCrunch and Business Wire.
- **Notion template creator earnings ($500–$50,000/month)**: self-reported by creators and by template-selling guides with a commercial interest; no independent verification.

## Excluded and why
- **Slack** — chat/messaging with no primary document/knowledge surface; fails inclusion test 1/disqualifier 2 (Slack AI referenced only as Band C context).
- **Adobe Animate** — not a workspace; single-purpose tool; cited only as a death datapoint.
- **Pure file storage/sync (Dropbox, Box)** — fails disqualifier: pure file storage and sync.
- **Standalone Jira / project trackers with no doc layer** — fails disqualifier: project trackers with no document or knowledge layer (Confluence included instead).
- **Website/app builders shipping external products (Lovable, Bolt.new, Replit)** — output is a product shipped to external audiences, not a team's own workspace; referenced only where they overlap Band D app-building; not worked up as workspaces.
- **Consumer-first local tools with no AI generation (Obsidian, Logseq, Anytype, Capacities)** — per the brief, placed in the context note, not worked up individually.

## Nulls
- Notion aggregate template-creator count, aggregate creator revenue, and marketplace install counts: searched ("Notion template marketplace creator earnings revenue," Aug 2026); no Notion-disclosed aggregate found — only per-creator self-reports and third-party guides.
- IDC "$X billion lost to poor knowledge sharing": searched ("IDC $31 billion Fortune 500 lost poor knowledge sharing statistic origin," Aug 2026); no primary source located (search returned before results due to budget exhaustion).
- Gartner/Forrester low-code and AI-productivity forecasts: not retrieved in this research budget; null.
- Slack AI granular pricing tiers and Notion AI per-plan credit counts (beyond "20 free responses" secondary figure): not confirmed against primary pricing pages.
- Fibery AI, Baserow AI, Rows AI, Glide AI, Softr, Bardeen, Gumloop, Lindy, Sana AI, Hebbia, Coveo, Lucidworks, Moveworks, Qatalog, Command AI, Observable, Streamlit, Hex, Deepnote, Figma Make, Google AI Studio apps, Mistral/Le Chat canvas, Slite, Nuclino, Slab, Document360, Zoho, Smartsheet, Asana AI, Monday, ClickUp: not individually verified within the search budget; see Unverified leads.

## Unverified leads
- Band A: Fibery AI, Baserow AI, Rows AI, Glide AI, Softr, Craft AI, Reflect, Saga — no citations gathered.
- Band B: Slite, Nuclino, Slab, Document360, Zoho Writer/WorkDrive, Smartsheet, Asana AI, Monday, ClickUp (ClickUp Brain), Google Workspace/Gemini, Microsoft Loop — mentioned in aggregate but not individually verified.
- Band C: Bardeen, Gumloop, Lindy, Sana Labs/Sana AI, Hebbia, Coveo, Lucidworks, Moveworks, Qatalog, Command AI, Elastic-based search — no citations gathered.
- Band D: Observable, Streamlit, Hex, Deepnote, Figma Make, Google AI Studio apps, Mistral/Le Chat canvas, Bolt.new, Replit — no citations gathered.
These are names only, not findings and not endorsements.

## What the evidence does and does not support
**Established (well-sourced):** Confluence's XSS-based HTML restriction (PRIMARY, quoted across doc versions); Airtable Omni GA date and function (PRIMARY/VENDOR-CLAIMED); Glean's funding, valuation and ARR trajectory ($100M Q4 FY25 → $200M Dec 2025) (PRIMARY); Dust's Series B and disclosed usage metrics (PRIMARY); Claude Artifacts' persistence/sharing timeline and storage/unpublish rules (PRIMARY); Gamma's funding round and asset counts (THIRD-PARTY/PRIMARY vendor); Notion database limits (PRIMARY); Microsoft Copilot/Copilot Studio pricing (PRIMARY).

**Open (conflicting or single-source):** exact Notion user counts and revenue (sources give 100M users, $250M/$400M/$500M/$600M revenue — conflicting); Airtable's exact total funding and $11.7B valuation (single estimator); Guru's revenue band (aggregator estimate); Notion's per-database row cap (250,000 per Notion help vs 10,000 in third-party guides); Dust's MAU (41,000 in the dated primary release vs 51,000 in some syndications).

**Negative results:** no primary McKinsey document for "1.8 hours/day"; no IDC "$X billion" primary source; no Notion-disclosed marketplace aggregates (creators, revenue, installs); Gartner/Forrester forecasts not retrieved; Slack AI pricing not confirmed; whole categories of candidate products (Unverified leads) lack citations within this budget.

## Caveats
- Search budget was capped at 18 web queries plus one subagent call; several Band B/C/D candidates remain unverified (see Unverified leads and Nulls). The final two intended searches (Notion AI credit tiers; ChatGPT Canvas/Custom GPTs; IDC statistic) were partially covered by the subagent rather than direct search.
- Vendor-run metrics (Dust's zero churn and 240% NRR; Gamma's user count; Glean's agent-action counts) are self-reported and not independently audited; they are labeled VENDOR-CLAIMED or PRIMARY-claimed where they appear in the vendor's own release.
- Customer counts and "users" figures frequently mix free-tier and paid accounts; Notion's "4 million paying customers" is distinct from its "100 million users," and Gamma's "70 million users" is not a paying-customer count.
- Marketplace registry figures measure what is published, not active use: the GPT Store's "3 million custom versions" counts created GPTs, not active creators or installs; Notion discloses neither.
- Several funding/headcount figures come from third-party aggregators (Tracxn, Owler, PitchBook, productgrowth.in) whose methodology is not disclosed; these are tagged as estimates.
- Many sources are dated early-to-mid 2026 and describe fast-moving products; capabilities and pricing may have changed since retrieval. Where a vendor page and a third-party guide conflict, both figures are shown side by side rather than averaged.
- ChatGPT Canvas persistence and sharing details rest partly on secondary how-to sources; OpenAI's launch post confirms editing and code execution but not a verbatim persistence/shareable statement.