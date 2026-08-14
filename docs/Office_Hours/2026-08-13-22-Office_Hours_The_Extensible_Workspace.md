# Office Hours: The Extensible Workspace, and Freedom as the Product

**Date:** 2026-08-13
**Status:** DECIDED — recorded in [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|the extensible-workspace pivot]]. Architecture decisions taken here are **D1–D6**; the accept condition, the marketplace posture and sync conflict resolution remain open.
**Mode:** Startup — designing a direction, auditing its claims one by one, then testing it against two commissioned briefs

**Builds on:** [[Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed|Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed.md]], [[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base.md]]

**Research read:** [[Research/2026-08-13-20-self-augmenting-software|self-augmenting software, commercial and hobbyist]] · [[Research/2026-08-13-21-ai-native-workspace-landscape|the AI-native workspace landscape]]

Concepts touched: [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

> The companion session closed every existing substrate. This one builds the base instead. A deliberately simplified Notion-shaped workspace whose distinguishing capability is one thing — users may put real HTML and JavaScript inside it, author it by prompting, install someone else's from a marketplace and modify it freely — with a desktop runtime, a local file vault, and per-workspace data on the server. The founder's own summary is the best statement of it: *the same thing everyone else is doing, except we integrate with HTML and JS and give freedom.* Every claim underneath that sentence was enumerated and assessed; the two briefs then confirmed the mechanism's central obstacle has a name, a date and a documented reason.

---

## Problem statement

Having established that no existing product can be extended — closed by licence at Retool, by configuration ceiling at Airtable and Notion, by unreachable buyer at the white-label platforms — the question became what to build instead.

The direction moved several times within the session before settling: from an extensible base for technical founders, through spreadsheet-to-software, through a vertical Retool, through a personal local-only founder tool, to a workspace whose extension artifact is real code. Each move was a response to specific evidence, and the last one held because it was the first that survived having its claims enumerated.

---

## What carries from prior sessions

- **L24**, the developer as the only shipped accept condition, and the corollary that removing the developer removes it.
- **L32–L33**, the two verified nulls: nothing in the adjacent field outputs code you own, and nothing verifies generated output against a source of truth.
- **L36**, the spreadsheet claim surviving qualitatively and not as a proportion.
- **L37**, that this market cannot be sized from non-vendor data.
- **L39**, that per-consumer version pinning of a shared module does not exist anywhere, including Retool.
- The three structural differentiators argued in the companion session: owning the substrate makes output checkable; extensions can survive the base moving; a coding agent hands you code and you still have to run it.
- Zero customers, zero conversations, seven sessions of an unexecuted assignment.

---

## What this session changed

### 1. The direction acquired a one-sentence form, and it is falsifiable

*The same thing everyone else is doing, except we integrate with HTML and JS and give freedom.*

Every previous framing this month sprawled — "extensible base," "spreadsheet to software," "modular per-tenant feature system." This one is a sentence, it names precisely one difference, and it can be shown wrong.

**The "why now" attached to it is the strongest part.** HTML and JavaScript inside a workspace were worthless while authoring them was expensive, because almost nobody wanted to hand-write them in a document tool. AI made authoring nearly free, so a capability that was previously not worth having became potentially worth building around. The second half matters as much and was sharpened during the session: people do not merely *make* HTML cheaply now — they **hold** AI-generated artifacts and have nowhere coherent to keep them beside their notes and data.

That narrower claim is the defensible one. The wider version — that there is nowhere to distribute AI-generated HTML — is weakly true and weakening, given GitHub Pages, Netlify, Vercel, Val Town, CodePen, Replit and Claude Artifacts' own publishing. The gap is not distribution; it is that **none of those is where your notes and data already live.**

**The cost hidden in the word "same."** Parity-plus-one-difference is a real and common way to win, and it obliges reaching parity. The differentiator is a small fraction of the build; the workspace underneath it is the rest. Every simplified-Notion in the field — Anytype, Capacities, Tana, AppFlowy, Logseq, Silverbullet — failed on the parity half rather than on the idea. **"Deliberately simplified" therefore cannot be a preference. It has to be an enforced constraint, or the differentiator never ships.** This is the single discipline most worth holding.

### 2. The claims underneath the direction were enumerated and assessed individually

At the founder's request the proposal was decomposed into its load-bearing assumptions. Recorded here because the assessment, not the list, is what the next session should not have to redo.

**On the marketplace.** *Notion's marketplace teaches people what Notion can do* — credible, unverified, and note that a Notion template is an inert data structure that teaches capability precisely because Notion's capability is small enough to be expressed as a starting layout. *A free-form code marketplace works the way a template marketplace works* — **the largest leap in the proposal**, because a template cannot execute, leak or break anything, while a code marketplace distributes executable third-party code into other people's workspaces. *People will install someone else's artifact and AI-modify it* — unmeasured, and **the best idea in the proposal**, because it threads between the finding that authoring is rare and installing is common by making modification the entry act. *The marketplace will bootstrap* — the hardest problem in software; seeding with AI is more feasible than it has ever been and a seeded marketplace still does not produce a creator economy.

**On demand.** *People generate lots of custom HTML now* — true and observable. *They have nowhere to distribute it* — weakly true, sharpened above. *Nobody presents docs anymore* — overstated, and withdrawn by the founder as hyperbole meant as a trend claim; documents are not in decline and the generalisation would be a bad foundation for positioning. *Casual users will seek out a personalised app* — unmeasured.

**On the product.** *A deliberately simplified base is achievable and better* — unsupported and crowded; simplicity wins only if it structurally enables extension in a way depth prevents, which is an architectural claim to be made true rather than assumed. *AI can reliably modify someone else's arbitrary code* — uncertain, and it **collides with the project's own best answer**: owning the substrate is strong because the extension surface is narrow and machine-verifiable, while arbitrary code from arbitrary authors is maximally unbounded. **The marketplace and the bounded-contract verification argument cannot both be held in full.** *Not business-critical means errors are tolerable* — mostly right and the smartest move in the proposal; it is the Lovable zone, cheap to be wrong. Two costs: cheap-to-be-wrong correlates with cheap-to-abandon and low willingness to pay, and it removes correctness risk without touching security risk. *Deployable rather than local-only* — sound, and independently validated by the research below.

**On the business.** *AI cost is fine because usage is bursty* — plausible per user, dangerous in aggregate; free-tier plus heavy inference aimed at the lowest-willingness-to-pay population is the worst unit-economics shape available, and it is HyperCard's distribution problem with a variable cost attached, except HyperCard was free because it was *bundled* and cost Apple nothing per user. *Monetisation can come later* — the fourth consecutive direction deferring it, against a vault whose 2026-08-02 pivot exists because "no budget line" killed a direction.

**On competition.** *Notion cannot follow* — half right and the right half is good; they structurally cannot ship free-form code, but they do not need to beat that, they need their templates to be good enough, and their gallery already has scale. *Nobody serves this today* — partially false; Claude Artifacts plus Projects is close, and well-funded parties are walking toward it.

**Two claims were answered by the founder and are recorded as settled rather than open.** That well-funded entrants are converging is read as directional confirmation rather than threat. And that if the thesis is wrong the company fails, which is true of every startup and is not a reason to demand certainty — the job is to ensure the bets are chosen deliberately rather than inherited.

**The best business answer of the day came out of this audit**, in response to the budget-line objection: *not everything in enterprise is business-critical, and this can become their central hub of information*, starting at small business and early-stage. That describes a funded, named line item — Confluence occupies it and Atlassian bills billions against it — which is more than the previous four directions had. The caveat that does not get easier: the **security review is identical whether or not the product is business-critical**, and a third-party code marketplace makes that review materially harder, which suggests the marketplace and the enterprise motion may need sequencing rather than shipping together.

### 3. The reason nobody allows user HTML is named, documented, and unchanged for years

The landscape brief's most decision-relevant finding. **Confluence's HTML macro is disabled by default**, and Atlassian's own documentation gives the cause verbatim, consistent across versions 8.3 through 10.2:

> "Enabling these macros can make your Confluence site vulnerable to cross-site scripting attacks... We strongly recommend leaving this macro disabled if you allow self-signed up or anonymous users to create content."

And on the HTML Include macro: "a legacy macro, and is often disabled by Confluence administrators for security reasons... You should only turn on these macros if you trust all your users not to attempt to exploit them."

In a multi-user document product, a page one person authors is a page another person renders — the textbook definition of stored cross-site scripting. **This is not an absence nobody noticed. It is a named vulnerability class that a company with a security organisation chose to ship switched off.**

**Claude Artifacts does permit user HTML, and the price it pays reveals the shape of the answer.** Artifacts run in a sandboxed iframe, and the system instructions prohibit browser storage outright: *"NEVER use localStorage, sessionStorage, or ANY browser storage APIs in artifacts. These APIs are NOT supported."* Persistent storage arrived 2025-10-21 with a 20MB per-artifact limit on paid plans only, along with MCP; public sharing with multiplayer editing was confirmed by 2026-07-18. Unpublishing is destructive: *"Once you unpublish an artifact, you cannot publish that same artifact again,"* and it "permanently deletes all associated storage data."

**This produces the central tension of the product.** The sandbox that makes user HTML safe is the same sandbox that stops it being a dashboard over your own data. What the artifact must do — read your tables — is precisely what the sandbox exists to prevent. The resolution is a capability-scoped bridge, which is what Atlassian Forge and Shopify Functions are, and it is the first thing to design because permissions, egress logging and the entire marketplace security story terminate there.

The security surface is not theoretical in this product class: a CodeIntegrity proof-of-concept in September 2025 demonstrated **prompt-injection data exfiltration via a malicious PDF against Notion 3.0 agents**, and Notion responded by upgrading detection for injection patterns hidden in file attachments.

### 4. The company-brain category crossed from retrieval into creation during 2025

The band that sits over a company's existing tools has stopped merely answering questions.

**Glean.** Enterprise search across Google Workspace, M365, Slack and Salesforce. Its own release states it "achieved $100 million in annual recurring revenue in the fourth quarter FY25," and a December 2025 release states it **"doubled its annual recurring revenue to $200 million, nine months after surpassing the $100 million milestone."** Series F of $150M at a **$7.2B valuation** on 2025-06-10; ~$765M raised in total. **Glean Agents launched early 2025** — the crossing — and the platform is described as "already powering more than 100 million agent actions annually" while "setting its sights on supporting one billion agent actions by the end of the year." Named customers include Reddit, Instacart, Pinterest, Duolingo, Databricks and Grammarly. Pricing is moving to consumption.

**Dust.** Agentic AI over 100+ sources, "multiplayer." $40M Series B in May 2026 led by Abstract and Sequoia, total above $60M. Its own release reports **"more than 3,000 organizations, reached 41,000 monthly active users in April 2026, and has deployed over 300,000 agents,"** with monthly adoption above 90%, weekly above 70%, and "240% NRR with zero churn." Pro at $24/seat, Max at $120/seat, Enterprise custom. SOC 2 Type II, GDPR, EU/US residency, SCIM, audit logs.

**Onyx**, formerly Danswer, YC W24. MIT-licensed, self-hostable, air-gappable — "run in a completely airgapped environment" — with SSO across OIDC/SAML/OAuth2, RBAC and permission mirroring. $10M seed co-led by Khosla and First Round. Deployed to "all 14,000+ employees" at Netflix and 37,000 users at UC San Diego. Managed cloud at $20/user/month.

**Guru.** Founded 2013, ~$68–70M raised, 300+ paying customers named including Shopify, Square, Spotify and Intercom, with GDPR/HIPAA/HECVAT/CAIQ crosswalks and a "your data never trains an AI LLM" commitment.

**Microsoft 365 Copilot** at $30/user/month, with a Business SKU at $21 under 300 users, and Copilot Studio metering agents in credits — $200 per 25,000-credit pack, or $0.01 per credit pay-as-you-go, priced per action type: classic response 1 credit, generative response 2, agent action 5, tenant Graph grounding 10.

**These sell into "the central hub of company information" — the exact budget line this direction intends to grow into — with enterprise trust already established and consumption pricing already normalised.** The distinction that still holds: **they create agents, not interfaces.** Nobody in that band makes a rich interactive page. That is the gap, and it is considerably narrower than the category being open.

### 5. Notion is further along than the direction assumed

Notion 3.0's AI Agent shipped 2025-09-18 and **Custom Agents on 2026-02-24**, gated to Business and Enterprise. The standalone $10/user/month Notion AI add-on retired in May 2025 and is now bundled into every paid plan. Revenue crossed roughly $500M annualized by September 2025. Documented database limits, from Notion's own help centre: **250,000 rows and 500 properties per database** — with older third-party guides citing 10,000, a conflict shown rather than reconciled — and a stated performance caveat that sorts or filters on title, text, formula or rollup lengthen load times.

**And the one that dents the structural argument: Notion opened to external coding agents — Cursor, Claude Code, Codex — as native agents in 2026.** The claim that Notion cannot ship code without exposing internals is weaker than it was; they found a third route, which is to let someone else's agent operate inside the workspace. Their own objects remain stored configuration and there is no marketplace of executable artifacts, so the argument is dented rather than broken — but "they cannot follow" should not be said without that qualification.

Elsewhere in the band: **Coda** was acquired by Grammarly in December 2024, the parent rebranded to Superhuman in October 2025, and Coda Brain was deprecated and folded into Superhuman Go; a third-party review notes Coda's AI features are "limited to document-level operations — no autonomous agents, no persistent agent memory." **Atlassian Rovo** went GA in October 2025, initially around $20–24 per user per month and later bundled into paid cloud plans with non-subscribers at $5, with 25 Rovo credits per user per month on Standard.

### 6. The marketplace has no precedent for what it would trade

**Notion's marketplace trades stored configuration, never executable artifacts.** Notion charges **8% plus $0.40 per transaction**; a third-party guide characterises the same fee as "10% of $500" plus per-transaction fees, a conflict recorded rather than resolved. Creators do earn — Thomas Frank has "crossed $1 million in Notion template sales," and Easlo is named — but **Notion discloses no aggregate creator count, no aggregate creator revenue and no install count.** Third-party earnings ranges of $500–$50,000 per month are self-reported, frequently by people whose business is selling courses on selling templates.

So the classic creator-economy shape: a handful of visible winners and an entirely unmeasured tail. **Do not model on Thomas Frank.**

The executable marketplaces are elsewhere. **The GPT Store** launched 2024-01-10, and OpenAI's own post states "users have already created over 3 million custom versions of ChatGPT" within two months, with building requiring no coding experience. OpenAI announced a builder revenue programme for Q1 2024 — **"US builders will be paid based on user engagement with their GPTs"** — and **the payout formula was never disclosed and a broad rollout remains unconfirmed.** Marketplace monetisation quietly failing to happen at the largest available scale. The separate **Apps SDK**, built on MCP, launched in preview 2025-10-06 and is open source, enabling developer-built interactive apps inside ChatGPT with paid apps possible via the Agentic Commerce Protocol. The two are distinct platforms and should not be conflated.

**And the security reality of executable marketplaces, from the self-augmenting brief:** the VS Code Marketplace hosts ~60,000 extensions from ~45,000 publishers with 3.3 billion installs, **only 1,800 publishers verified**, and the figures come from a security firm that scrapes the marketplace. The median extension has 500 installs. Obsidian's directory carried a manual-review backlog that "reached 2,300+ queued submissions" before an automated system launched in May 2026 adding scanning and "safety scorecards showing maintenance signals, update frequency, and risk indicators."

**The founder's position, taken deliberately:** a security review bot before anything is posted, plus rigorous review and warnings, on the explicit analogy to code and prompts on GitHub — you cannot make everything safe, so move with caution. **The asymmetry to hold:** GitHub and npm survive being unsafe because nobody believes they are vetted and the trust decision is explicit. A marketplace inside a product implies vendor endorsement. **The real choice is therefore whether this is a curated store or a public index** — different expectations, different blame, different legal posture — and it is free to choose correctly now and expensive to change later.

### 7. The authoring rate splits by barrier, and that split is the closest thing to a green light

The self-augmenting brief was commissioned with this as its most important question and it returned thin where measured and null nearly everywhere else.

**Where it is measured, it is measured in code-publishing ecosystems.** npm in 2016: "There are a little over 211,000 registered npm users, of whom about 73,000 have published packages" — roughly 35% of registered users and **~1.8% of an estimated four million total.** VS Code: ~45,000 publishers against tens of millions of users. The brief's own conclusion is that authors are a small minority.

**But publishing a package is not the act this product proposes.** It requires being a developer *and* choosing to ship publicly. The one datapoint measuring private, low-barrier extension points the other way: **Home Assistant's opt-in analytics report "automations 14" per reporting installation, across 518,790 of 665,467 installations (77.96%)** as of 2026-08-14. Caveats stated in the brief and carried here: opt-in and self-selected toward engaged users, with a 2021 estimate that four to five times more installations exist than opt in; the dashboard does not label the figure mean or median; and it does not distinguish self-authored automations from blueprint-imported ones.

**When extension requires writing and publishing code, roughly two percent participate. When it is low-barrier and private, the median reporting install carries fourteen. The barrier is the code, not the desire.**

That inference is drawn across two sources and **neither brief states it** — it is this session's reading, and it should be treated as the strongest available support for the direction rather than as a finding. Everything else is null: Obsidian, AutoHotkey, Tasker and PyPI have no published authoring rate at all, and Stack Overflow's survey asks no authored-versus-installed question.

The academic baseline, for scale: Scaffidi, Shaw & Myers (2005) estimated ~90 million US workplace end-users by 2012, of whom 55M+ would use spreadsheets or databases as potential end-user programmers and 13M+ would describe themselves as programmers — a modelled estimate extending Boehm's 1995 figure, not a measurement of authoring.

### 8. The category's graveyard died of distribution, never of capability

The historical section was requested precisely because this is the longest-running natural experiment available, and it returned the day's most transferable lesson.

**HyperCard (1987–2004).** Stacks, cards, buttons and HyperTalk, where the authoring tool and the finished artifact were the same environment. **Shipped free with every Macintosh from 1987**; Apple began charging for HyperCard 2.0 in 1990 at $49.95, which practitioners identify as the break — "The free-distribution model that had made HyperCard ubiquitous in 1987-1990 was broken." Active development stopped around 1998; formally discontinued March 2004. And Bill Atkinson's own retrospective in 2002:

> "I missed the mark with HyperCard. I grew up in a box-centric culture at Apple. If I'd grown up in a network-centric culture, like Sun, HyperCard might have been the first Web browser. My blind spot at Apple prevented me from making HyperCard the first Web browser."

**The creator of the most beloved self-augmenting tool ever built named local-only as the mistake.** A personal, local-only version of this product was proposed and withdrawn within this same session; the research validated the withdrawal about as directly as research ever does.

**Lotus Notes/Domino (1989– ).** Applications authored through the client and stored in NSF databases proved sticky and often outlived support contracts. IBM moved to "feature packs" in 2016, handed development to HCL, and sold the line outright (announced December 2018, completed July 2019). HCL ended support for 9.x and 10.x on 2024-06-01: "Due to the age of these releases, HCL will not be offering extended support." Practitioner framing: the platform "was steamrolled by Microsoft's Exchange."

**Zope/Plone through-the-web development (1998– ).** Designed to let site managers "safely delegate control to design experts, database experts, and content managers." **The current Zope documentation records the retreat: "In recent years the Through-The-Web model has been discouraged for any kind of development and reduced to configuration tasks."** The project that invented editing your application through the browser walked it back to configuration only.

**Google App Maker** — shut down 2021-01-19, stated cause **"low usage"**, with Workspace distribution behind it, and "due to the specific source code used for App Maker, you can't directly migrate your apps to another platform." The shutdown followed Google's acquisition of AppSheet in January 2020. **Yahoo Pipes** — shut down 2015-09-30 to "focus our efforts on core Yahoo product experiences." **Excel macros/VBA and Access** survived, and the cause practitioners cite is bundling with Office and installed base.

**Not one of these died because extension was too hard to build.** They died on pricing, bundling, distribution and being on the wrong side of a network. Which is the same split that ran through the whole day: feasibility kept looking better-supported than the business model.

### 9. Extensions break on upgrade everywhere, and nobody migrates them

**Obsidian**: plugins are fetched from GitHub releases with a `versions.json` compatibility fallback, and practitioner reporting notes "Every time Obsidian updates, there's a chance one of your plugins will stop working," describing the dependency as making Obsidian "powerful, but also fragile." **AutoHotkey**: v1 and v2 are not backward-compatible — "V2 cannot be backward-compatible with v1" — with the forum reaction that "a massive amount of community value becomes lost," and a policy deferring compatibility-breaking changes to v3.0. **Chrome**: the MV2→MV3 migration removed the blocking webRequest API and the ability to execute remote code; Google's stated reason is that MV3 "is more secure, performant, and privacy-preserving," while the EFF's Alexei Miagkov said "the reasons they have stated publicly don't fully make sense."

**Home Assistant has the best answer found anywhere and it is not migration.** An automatic backup before each update, advance breaking-change announcements, a repair system, and rollback — "If you ever get stuck, you can restore the automatic backup and you are right back where you started." When something breaks it "usually affects a single integration... especially community-maintained ones, rather than your whole installation." Integrations do get removed when upstream dies: the MS Teams integration went in HA 2026.7 because Microsoft discontinued Office 365 Connectors on 2026-05-22.

**Nobody carries extensions forward. Backup-and-rollback is the state of the art.** Candidate answer two — extensions surviving the base moving — is unoccupied across forty years and every ecosystem surveyed, not merely at Retool.

And the author-leaves problem appears for the **third** time in two days: Yahoo Pipes' shutdown prompted the observation that "many organisations relying on pipes created by departed staff may find that things stop working," joining incident.io's orphaned expenses tool and the citizen-developer pattern where "the app becomes an orphan. IT does not want to adopt orphaned citizen dev apps." Quickbase's own VP concedes ease of use "can translate into building one-time-use applications, duplicate apps, or complex apps that are difficult for other builders to maintain."

### 10. Nothing anywhere verifies that an extension is correct

Across commercial low-code, hobbyist ecosystems, browser extensions and four decades of prior art, the brief's stated negative result: **no system reviewed verifies that a user-authored extension is correct.** Verification, where it exists, checks permission and policy compliance or that the code loads. Obsidian vets plugins against a developer policy — no obfuscation, no dynamic ads, no client-side telemetry — and added automated scanning and safety scorecards, all of which check policy and security signals rather than function. Chrome scopes permissions. Home Assistant checks an automation loads.

**This is the third independent brief returning the same null**, and it settles what the accept condition can be here in the absence of an oracle: **not "was it right" but "can I undo it."**

### 11. The business evidence improved for the first time in weeks

**Gamma.** Founded 2020. Its November 2025 release states "Gamma customers have created more than 400 million presentations, websites, and other assets, with over 1 million pieces of content generated in Gamma every day," and its CEO stated via TechCrunch on 2025-11-10 that the company **"profitably hit $100 million in ARR, with 70 million users."** $68M Series B at a **$2.1B valuation** led by a16z, ~$90M total raised, **roughly a fifty-person team, profitable since early 2024.** Pricing free / $8 / $15 / $100.

**v0 (Vercel).** Launched October 2023, rebuilt into a full-stack builder generating exportable React and Next.js. **"Approaching $50 million in annualised revenue" by April 2026, with "v0 Teams and Enterprise accounts now represent more than 50% of v0's revenue,"** and 4M+ users. Vercel raised a $300M Series F in September 2025 at $9.3B.

**These answer the two objections pressed hardest during the day** — that a casual AI-artifact product cannot make real money, and that a prosumer entry point does not convert upward into business revenue. v0 in particular is the small-teams-then-enterprise sequence, measured, at a company that started with a prompt box.

### 12. One death worth staring at, and a churning category

**ChatGPT Canvas is being sunset from GPT-5.5 models** (~late May 2026) per OpenAI's own release notes, with writing and coding moving "directly in chat responses through writing blocks and code blocks." OpenAI built a dedicated canvas surface — launched beta 2024-10-03, general 2024-12-10 with Python execution — and is retiring it into the chat stream.

Alongside: **Tome**, an early AI-deck rival that raised $43M in a single 2023 round, "pivoted out of the space later." **Coda Brain** deprecated into Superhuman Go. **Notion AI's** standalone add-on retired. **Danswer** renamed to Onyx.

The artifact-surface category is churning, and the largest player just decided the separate surface was not worth keeping.

### 13. Freedom was chosen explicitly, and the risk was named rather than solved

The founder's position, stated directly: capability-scoped access to internal data and APIs, but **no restriction on calling public APIs**, accepting the risk and selecting for users who accept it too — "I would rather take on risk and bring people in who are fine with it than go back to the limits I am trying to crush."

**The specific consequence, accepted rather than solved:** scoped read plus unrestricted egress means the read scope is **advisory rather than enforced.** An artifact granted access to one table with free outbound calls can send that table anywhere, and no permission dialog changes that. This is exactly the Notion prompt-injection demonstration in a different costume.

**The mitigation that preserves the freedom entirely** — and does not limit capability, only opacity — is to declare destinations at install time as browser extensions do with host permissions, show the user what an artifact talks to, and log the calls. The artifact may still call anything; what changes is that doing so is visible.

**What should be avoided is shipping a permissions interface that implies a guarantee it cannot make.** If the honest statement is "artifacts you install can talk to the internet, here is what this one talks to," that is the statement to make.

---

## Decisions taken

**D1. Desktop application, not browser-only.** The initial recommendation in this session was the opposite and was wrong. Three arguments overturned it: arbitrary long-running work has no home in a browser tab, which throttles background execution and dies on close; browser memory is bounded at roughly 2–4GB per tab, which is fine for dashboards and inadequate for the tail the freedom policy explicitly designs for; and a hosted runtime for arbitrary user processes is an unbounded liability that would require quotas, which is the limiting the direction exists to avoid. Desktop puts real Node, Python and subprocesses on the user's machine at zero marginal cost.

**D2. A vault of files on disk, syncing to the server.** Obsidian's model, and the decision with the largest downstream consequence: **Claude Code, Cursor and Codex operate on the workspace natively with no integration built.** That turns coding agents from competitor into substrate consumer, gives a concrete answer to T39 that no incumbent can copy without abandoning its storage model, and moves the heaviest inference cost onto the power user's own subscription — which makes the population that supplies the marketplace nearly free to serve.

**D3. Data on the server, isolated per workspace, not a shared instance.** Collaboration is impossible with local-only data, and collaboration is a stated core value. **Per-workspace SQLite rather than shared Postgres** — the pattern used by Turso/libSQL, LiteFS and Durable Objects. Isolation is free, snapshots are a file copy, restore is per-workspace, and one workspace's runaway query cannot reach another. What this signs up for: a routing layer that knows which node holds which workspace, process and connection management at scale, and **replication**, because a single-node SQLite file is a data-loss event waiting for a disk failure.

**D4. Execution is local.** Follows from D1 and D3. The consequence to design for is that a locally-running artifact needs to reach a server-side database, which means credentials on the user's machine — see D6.

**D5. No dev/prod separation. Snapshot and restore instead.** Dev/prod was rejected for simplicity, correctly. But AI-generated code plus heavy database modification with no undo will destroy someone's data quickly. **The Home Assistant answer — automatic backup before a change, with rollback — is the strongest safety mechanism found anywhere in the field, and with a file-and-SQLite vault it is nearly free.** Given L47, it is not merely a nice property: it is the only accept condition actually available.

**D6. Freedom on public APIs; scoped access to internal data through a host-held credential and an IPC bridge.** The artifact never holds a connection string. It runs in a sandboxed context, talks to the host over IPC or `postMessage`, and the host makes the scoped query and returns the result. **That gives one chokepoint where the read scope is enforced, the egress is logged, and the marketplace security story terminates** — which is why the IPC contract is the first thing to specify.

**A consequence of D3 worth stating as a principle: resource limits are not capability limits.** Per-workspace isolation permits "build anything you like; this workspace has N gigabytes and N CPU-hours" — total freedom of *what*, a bound on *how much*. That is what makes a freemium tier survivable without policing behaviour, and shared Postgres would have forced query-level policing, which *is* capability limiting.

**And a consequence of D3 worth stating as a differentiator:** the platform absorbing infrastructure, operations and billing so the user never thinks about it is the most legible of the three answers to T39. A coding agent hands you code; you still have to provision, deploy, secure, back up and pay for a database. **The workspace hands you a running database with no operations**, and that is something Cursor and Claude Code structurally cannot provide because they do not run anything.

**Concurrent editing of the same artifact was explicitly not solved**, on the founder's reasoning that multi-agent editing of a shared file is unsolved everywhere and the budget should not go there. Warnings and presence indicators when an agent is editing. The cheap addition that changes its character: **presence plus version history**, which does not prevent a clobbered edit — nothing does — but makes one recoverable. Given snapshots exist for D5, the same mechanism covers files. **Turning an unsolvable correctness problem into a recoverable one is the only kind of safety available without an oracle**, and it is the same move as D5.

---

## Premises

**Established by the research:**

- **L41.** Confluence ships its HTML macro disabled by default; the stated cause is cross-site scripting, unchanged across documentation versions 8.3–10.2. **The reason no workspace allows user HTML is named and documented, not an oversight.**
- **L42.** Claude Artifacts permits user-authored HTML and pays for it with a sandboxed iframe and a blanket prohibition on browser storage APIs. Persistence arrived 2025-10-21, capped at 20MB per artifact, paid plans only, and destroyed on unpublish.
- **L43.** Company-brain products crossed from retrieval into durable artifact creation during 2025 — Glean Agents, Dust's 300,000+ deployed agents, Onyx custom agents. Glean doubled to $200M ARR in nine months at a $7.2B valuation. **None of them creates interfaces.**
- **L44.** Notion wired external coding agents — Cursor, Claude Code, Codex — into the workspace as native agents in 2026, and shipped Custom Agents on 2026-02-24. The "they cannot ship code" argument is dented.
- **L45.** Notion's marketplace trades stored configuration, never executable artifacts, charges 8% plus $0.40, and discloses no aggregate creator, revenue or install figures. The GPT Store's builder revenue programme was announced, never specified, and never confirmed as broadly rolled out.
- **L46.** Where extension requires authoring and publishing code, participation is roughly two percent of users; where it is low-barrier and private, the median reporting Home Assistant install carries fourteen automations. *(Inference across two sources; neither brief states it.)*
- **L47.** No system in the surveyed field verifies that a user-authored extension is correct. Verification checks policy compliance or that code loads. **Backup-and-rollback is the strongest safety mechanism located anywhere, across forty years.**
- **L48.** Every death in this category was caused by distribution, pricing or bundling — never by extension being too hard to build. **Local-only is named as the fatal choice by HyperCard's own creator**, and Zope's documentation records through-the-web development being deliberately reduced to configuration.
- **L49.** A casual AI-artifact product can reach $100M ARR profitably on a fifty-person team (Gamma), and a prosumer artifact generator can convert to majority Teams-and-Enterprise revenue (v0).
- **L50.** Every extension ecosystem breaks its extensions on upgrade — Obsidian on releases, AutoHotkey across major versions, Chrome across manifest versions — and none migrates them forward.

**To test:**

- **T44.** Do people who install an artifact then modify it? **The interaction the entire direction rests on, and nobody measures it.**
- **T45.** Does the low-barrier authoring rate hold when the low barrier is a prompt rather than YAML? L46 is an inference across two different populations and is the weakest load-bearing premise here.
- **T46.** What observation would show the HTML-artifact trend has stalled? A trend thesis with no disconfirming measurement cannot be killed, and that is the state in which two years get spent on an unexamined premise.
- **T47.** Can the parity half — the simplified base itself — be built small enough to ship before the differentiator does?
- **T48.** Does a code marketplace inside a workspace survive its first supply-chain incident, and is the answer different for a curated store than for a public index?

---

## Approaches considered

**Personal, local-only founder tool.** Raised and withdrawn within the session. It solved the correctness problem completely by shrinking the blast radius to one person — the cleanest answer found to the constraint the repo's own CLAUDE.md calls the hardest part — and it removed the business model entirely. Local-only is architecturally opposed to enterprise, because SSO, audit, admin, multi-tenancy and compliance are the opposite of local-only, so "not enterprise yet" would not have been a beachhead but a different company with no route upward. The research then named local-only as HyperCard's fatal choice, and the PKM market it would have entered is the most crowded and least monetisable in consumer software. **What survives is the observation that the local-first population is a good beachhead attached to a bad market** — worth using for learning and users, dangerous to mistake for the company.

**Simplified Notion with a configuration marketplace.** Rejected implicitly: configuration marketplaces exist, Notion's is the largest, and it is the thing being differentiated against.

**Simplified Notion with a free-form code marketplace.** Chosen. Two named obstacles: cross-site scripting in the shared path (L41), and the absence of any precedent for a user-authored executable marketplace inside a workspace (L45).

**Hosted execution.** Rejected. Arbitrary user processes on the vendor's infrastructure under a freedom-first policy is an unbounded cost with no defensible limit that is not also a capability limit.

**Browser-only delivery.** Rejected after being initially recommended. See D1.

---

## Recommended approach

**Design the vault format and the host-to-artifact IPC contract first.** Everything downstream — permissions, egress logging, marketplace security, sharing, publishing, rollback — terminates at those two, and both are expensive to change once artifacts exist in the wild.

**Then seed the marketplace before the first user.** The chosen product shape has the worst cold start in software: *a tool for building tools* has an empty empty-state, and every new user is handed a blank canvas plus homework. That was Notion's own defining early problem and the reason its template gallery exists. Given **L46**, most users will install rather than author — which means **first run must be "pick something that nearly works," never "here is your empty workspace."** Presets-first-with-modification and builder-with-presets-available are the same feature set and completely different products, and only the first matches the one measured behaviour available.

Seeding is also the single piece of work requiring no users, no funding and no permission, and it can be done entirely with the tools already in hand.

**Then prove T44 on one human being.** One workspace, one preset installed, one AI modification that works, watched by someone who is not the founder.

---

## Open questions

- **The accept condition**, unchanged since 2026-08-10, and now understood as answerable by rollback rather than verification (L47, D5). Whether that is sufficient for a *shared* artifact — where the person harmed is not the person who accepted the risk — is untested and is the harder half.
- **Marketplace posture** — curated store or public index. Different expectations, different blame, different legal exposure. Free now, expensive later, undecided.
- **Sync conflict resolution.** Two people, or an agent and a server, editing one vault. Obsidian's answer took years and is their paid product. **The fifth appearance in a single day of surviving-concurrent-change** — after Retool modules, marketplace artifact forking, base upgrades, and extension breakage across every ecosystem surveyed. It is not a coincidence and it is not going to be avoided.
- **The marketplace-versus-verification contradiction.** Owning the substrate makes output checkable *because the contract is narrow*; free-form code from arbitrary authors is maximally unbounded. Both cannot be held in full and the resolution is not yet chosen.
- **Pricing**, with the field's anchors now available — roughly $8–45 per seat, Gamma's free/$8/$15/$100 ladder, Retool's builder-versus-consumer split, and per-workspace resource tiers as a unit that fits D3.
- **Funding.** The direction is inference-heavy and subsidised credits are expected to be necessary. That makes a raise a dependency rather than an option, against zero customers and nine months of no outside response — which means **the fundable asset is a working demonstration rather than traction.**

---

## The assignment

1. **Build the smallest thing that proves T44.** One workspace, one artifact installed from a seeded preset, one AI modification of it that works. Not auth, not sync, not the marketplace, not an industry. Days, not months.
2. **Put it in front of one person who is not you, and watch whether they modify what they installed.** That single observation is worth more than any brief commissioned today, and there were six.
3. **Write down what would prove T46 wrong**, before the build starts rather than after it.
4. **Decide the marketplace posture in writing** before any artifact is published by anyone else, because it cannot be walked back once users have formed an expectation.
5. **The gym-era CRM interview evidence is still unwritten**, eight sessions on, and still the only first-hand demand data this project has ever had.

---

## What I noticed about how you think

**You design better under a named constraint than under an open question.** The direction moved five times today and only settled once the constraints became specific — cross-site scripting in the shared path, unbounded compute under a freedom policy, cold start in a tool-for-building-tools. Given a wall you produce architecture; given a blank field you produce another direction. The practical implication is that the fastest route to the next decision is to go find the next wall rather than think harder about the last one.

**Freedom is the actual conviction here, and it survived every attempt to price it.** Sandboxing, permissions, marketplace safety, hosted compute, database limits — each was offered as a reason to constrain, and each time you absorbed the risk and named who you were selecting for. That is a genuine product position rather than a preference, and it was the only thing today that did not move.

**You overturned my recommendation once and were right.** The browser-versus-desktop argument was mine and the vault-plus-coding-agent reasoning was yours, and it is a better answer than the one I gave — it makes the workspace the substrate a coding agent operates on rather than a competitor to it, which is the cleanest resolution T39 has had. The pattern from previous sessions held: the correction came from a constraint you were holding and I was reasoning past.

**The counter-observation, now aged six times, and it has finally changed shape.** Twelve days, six research clusters, one pivot, zero conversations. But the reason has expired. For eight sessions the assignment required a named human at an unreachable platform, and it no longer does — **T44 needs one person and an afternoon.** If the next session opens with a seventh brief instead of an observation of a human being using something, that is no longer a scheduling problem, and it should be named as what it is.
