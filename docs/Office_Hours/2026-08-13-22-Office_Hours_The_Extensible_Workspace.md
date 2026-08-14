# Office Hours: The Extensible Workspace, and Freedom as the Product

**Date:** 2026-08-13
**Status:** DECIDED — recorded in [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|the extensible-workspace pivot]]. Architecture decisions taken here are listed as **D1–D6**; the accept condition and the marketplace posture remain open.
**Mode:** Startup — designing a direction, then testing its claims against two commissioned briefs

**Builds on:** [[Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed|Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed.md]], [[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base.md]]

**Research read:** [[Research/2026-08-13-20-self-augmenting-software|self-augmenting software, commercial and hobbyist]] · [[Research/2026-08-13-21-ai-native-workspace-landscape|the AI-native workspace landscape]]

> The companion session closed every existing substrate. This one builds the base instead. A deliberately simplified Notion-shaped workspace whose distinguishing capability is a single thing — users may put real HTML and JavaScript inside it, author it by prompting, install someone else's from a marketplace and modify it — with a desktop runtime, a local file vault, and a per-workspace database on the server. The founder's own summary is the best statement of it: *the same thing everyone else is doing, except we integrate with HTML and JS and give freedom.*

---

## Problem statement

Having established that no existing product can be extended — by licence, by config ceiling, or by unreachable buyer — the question became what to build instead, and whether a workspace whose extension artifact is real code is a company or a feature.

Two briefs were commissioned against it: what self-augmenting software already exists, commercially and among hobbyists; and who occupies the AI-native workspace landscape.

---

## What carries from prior sessions

- **L24**, the developer as the only shipped accept condition, and the fact that removing the developer removes it.
- The three structural differentiators argued in the companion session: owning the substrate makes output checkable; extensions can survive the base moving; a coding agent hands you code and you still have to run it.
- **L36** — the spreadsheet claim survives qualitatively and not as a proportion.
- Zero customers, zero conversations, seven sessions of an unexecuted assignment.

---

## What this session changed

### 1. The direction acquired a one-sentence form, and it is falsifiable

*The same thing everyone else is doing, except we integrate with HTML and JS and give freedom.*

The **why now** attached to it is good and it is the strongest part: HTML and JavaScript inside a workspace were worthless when authoring them was expensive, because almost nobody wanted to write them. AI made authoring nearly free, so a capability that was previously not worth having became potentially worth building around. The second half matters as much — people now **have** AI-generated HTML artifacts and no coherent place to keep them next to their notes and data.

**The cost hidden in the word "same."** Parity-plus-one-thing is a real strategy, but it obliges reaching parity, and the differentiator is a small fraction of the build. The simplified base is not a preference but a constraint to be enforced, or the differentiator never ships. Every simplified-Notion in the field — Anytype, Capacities, Tana, AppFlowy, Logseq — failed on the parity half rather than the idea.

### 2. The reason nobody allows user HTML is named, documented and unchanged for years

Confluence's HTML macro is **disabled by default**, and Atlassian's own documentation gives the cause verbatim across versions 8.3 through 10.2: *"Enabling these macros can make your Confluence site vulnerable to cross-site scripting attacks... You should only turn on these macros if you trust all your users not to attempt to exploit them."*

In a multi-user document product, a page one person authors is a page another renders — the definition of stored cross-site scripting. This is not an absence; it is a named vulnerability class that a company with a security organisation chose to ship switched off.

**Claude Artifacts does permit it, and the price reveals the shape of the answer:** a sandboxed iframe plus a blanket prohibition on browser storage APIs.

**Which produces the central tension of this product.** The sandbox that makes user HTML safe is the same sandbox that stops it being a dashboard over your own data. What the artifact must do is the thing the sandbox exists to prevent. The resolution is a capability-scoped bridge — the host holds credentials, the artifact talks to the host, the host makes the scoped call — and it is the first thing to design because permissions, logging and marketplace security all terminate there.

### 3. The company-brain category already crossed from retrieval into creation

Glean Agents shipped early 2025; Dust reports over 300,000 agents deployed across 3,000 organisations; Onyx builds custom agents and is MIT-licensed and air-gappable. **Glean doubled from $100M to $200M ARR in nine months** at a $7.2B valuation.

They sell into "the central hub of company information" — the budget line this direction intends to grow into — with enterprise trust already established. **The distinction that still holds: they create agents, not interfaces.** Nobody in that band makes a rich interactive page. That is the gap, and it is narrower than the category being open.

### 4. Notion is further along than the direction assumed

Notion 3.0's AI Agent shipped September 2025 and Custom Agents in February 2026. More importantly, **Notion opened to external coding agents — Cursor, Claude Code, Codex — as native agents in 2026.** The claim that Notion structurally cannot ship code is weaker than it was: they found a third route, which is to let someone else's agent operate in the workspace. Their own objects remain stored configuration, and there is no marketplace of executable artifacts, so the argument is dented rather than broken.

A CodeIntegrity proof-of-concept in September 2025 demonstrated prompt-injection data exfiltration via a malicious PDF against Notion 3.0 agents — the security surface, demonstrated, in the exact product class.

### 5. The marketplace has no precedent for what it would trade

**Notion's marketplace trades stored configuration, never executable artifacts**, and Notion discloses no creator count, no aggregate creator revenue and no install figures. The visible economics are a handful of celebrity creators and self-reported earnings from people who sell courses about selling templates.

The executable marketplaces are the GPT Store and Claude's published artifacts. Note that OpenAI announced a builder revenue programme for Q1 2024, never disclosed the payout formula, and a broad rollout remains unconfirmed — marketplace monetisation quietly failing to happen at the largest available scale.

### 6. The authoring rate splits by barrier, and that split is the green light

Where authoring is measured it is measured in **code-publishing** ecosystems: npm 2016, 73,000 publishers against ~4 million users; VS Code, ~45,000 publishers against tens of millions. Roughly two percent, and the brief's own conclusion is that authors are a small minority.

But those measure *publishing code*, which is not the act this product proposes. The one datapoint measuring private, low-barrier extension points the other way: **Home Assistant reports fourteen automations per reporting installation** across 518,790 installs — heavily caveated as opt-in, unlabelled as mean or median, and not separating authored from imported.

**When extension requires writing and publishing code, ~2% do it. When it is low-barrier and private, the median install carries fourteen.** The barrier is the code, not the desire. That is the closest thing to supporting evidence this direction has, and it is an inference across two sources rather than a finding either brief states.

### 7. The category's graveyard died of distribution, never of capability

HyperCard shipped free with every Macintosh from 1987; Apple began charging in 1990 and practitioners identify that as the break. Atkinson's own retrospective names the other cause: *"If I'd grown up in a network-centric culture, like Sun, HyperCard might have been the first Web browser. My blind spot at Apple prevented me from making HyperCard the first Web browser."*

Google shut App Maker for *"low usage"* with Workspace distribution behind it. Zope's current documentation records that through-the-web development *"has been discouraged for any kind of development and reduced to configuration tasks."* Notes/Domino was steamrolled by Exchange.

**Not one of them died because extension was too hard to build.** They died on pricing, bundling and being on the wrong side of a network — and the local-only choice is named as fatal by the person who made it.

### 8. Nothing anywhere verifies that an extension is correct

Across commercial low-code, hobbyist ecosystems, browser extensions and forty years of prior art: verification, where it exists, checks policy compliance or that code loads. **Home Assistant's automatic pre-update backup with rollback is the best safety mechanism found in the entire field.**

That is now the third independent brief returning this null, and it settles what the accept condition can be in the absence of an oracle: not *was it right* but *can I undo it*.

### 9. The business evidence improved for the first time in weeks

**Gamma: $100M ARR, 70 million users, profitable since early 2024, roughly fifty people**, priced free / $8 / $15 / $100. **v0: ~$50M annualized with over half of revenue now from Teams and Enterprise accounts.**

Those two answer the two objections pressed hardest all day — that a casual AI-artifact product cannot make real money, and that a prosumer entry point does not convert upward. v0 in particular is the small-teams-then-enterprise sequence, measured.

### 10. Freedom was chosen explicitly, with the risk named

The founder's position: capability-scoped access to internal data and APIs, but **no restriction on calling public APIs**, accepting the risk and selecting for users who accept it too. Marketplace safety by review bot, rigorous review and warnings, on the explicit analogy to code and prompts on GitHub — you cannot make everything safe, so move with caution.

**The specific consequence, accepted rather than solved:** scoped read plus unrestricted egress means the read scope is advisory. An artifact granted access to one table and free outbound calls can send that table anywhere. The mitigation that preserves the freedom entirely is to declare destinations at install and log them — capability unchanged, opacity removed.

---

## Decisions taken

- **D1. Desktop application, not browser-only.** The compute that matters is the user's, arbitrary long-running work has no home in a tab, and a folder on disk is what makes coding-agent integration free.
- **D2. A vault of files on disk, syncing to the server.** Obsidian's model. Its consequence is the most valuable one available: **Claude Code, Cursor and Codex operate on the workspace natively with no integration built**, which turns coding agents from competitor into substrate consumer and moves the heaviest inference cost onto the power user's own subscription.
- **D3. Data on the server, isolated per workspace, not a shared instance.** Collaboration is impossible with local-only data. Per-workspace SQLite rather than shared Postgres — the pattern Turso, LiteFS and Durable Objects use — which makes isolation free and snapshots a file copy.
- **D4. Execution is local.** A hosted runtime for arbitrary user processes is an unbounded liability under a freedom-first policy.
- **D5. No dev/prod separation. Snapshot and restore instead.** The Home Assistant answer, and the only accept condition available without an oracle.
- **D6. Freedom on public APIs; scoped access to internal data through a host-held credential and an IPC bridge.** The artifact never holds a connection string; the host is the single chokepoint where scope is enforced and egress is logged.

**The consequence to hold deliberately:** resource limits are not capability limits. Per-workspace isolation permits "build anything you like, this workspace has N gigabytes and N CPU-hours" — total freedom of *what*, a bound on *how much* — which is what makes a freemium tier survivable without policing behaviour. The platform absorbing infrastructure and billing so the user never thinks about it is itself a differentiator a coding agent cannot match.

---

## Premises

**Established by the research:**

- **L41.** Confluence ships its HTML macro disabled by default; the stated cause is cross-site scripting, unchanged across documentation versions 8.3–10.2.
- **L42.** Claude Artifacts permits user-authored HTML and pays for it with a sandboxed iframe and a prohibition on all browser storage APIs.
- **L43.** Company-brain products crossed from retrieval into durable artifact creation during 2025. Glean doubled to $200M ARR in nine months. None of them creates interfaces.
- **L44.** Notion wired external coding agents into the workspace in 2026.
- **L45.** Notion's marketplace trades stored configuration, never executable artifacts, and discloses no aggregate creator, revenue or install figures.
- **L46.** Where extension requires authoring and publishing code, participation is roughly two percent of users. Where it is low-barrier and private, the median Home Assistant install carries fourteen automations. *(Inference across two sources; neither brief states it.)*
- **L47.** No system in the surveyed field verifies that a user-authored extension is correct. Backup-and-rollback is the strongest safety mechanism located anywhere.
- **L48.** Every death in this category was caused by distribution, pricing or bundling — never by extension being too hard to build. Local-only is named as fatal by HyperCard's creator.
- **L49.** A casual AI-artifact product can reach $100M ARR profitably with a fifty-person team, and a prosumer artifact generator can convert to majority business revenue.

**To test:**

- **T44.** Do people who install an artifact then modify it? The interaction the whole direction rests on, and nobody measures it.
- **T45.** Does the low-barrier authoring rate hold when the low barrier is a prompt rather than YAML?
- **T46.** What observation would show the HTML-artifact trend has stalled? A trend thesis with no disconfirming measurement cannot be killed, and that is the state in which two years get spent.
- **T47.** Can the parity half — the simplified base itself — be built small enough to ship before the differentiator does?

---

## Approaches considered

**Personal, local-only founder tool.** Raised and withdrawn within the session. It solved the correctness problem completely by shrinking the blast radius to one person, and it removed the business model entirely — local-only has no path to enterprise, since the enterprise requirements are the opposite of local-only. The research then named local-only as HyperCard's fatal choice.

**Simplified Notion with a config marketplace.** Rejected implicitly: config marketplaces exist, Notion's is the largest, and it is the thing being differentiated against.

**Simplified Notion with a free-form code marketplace.** Chosen. Its two named obstacles are cross-site scripting in the shared path and the absence of any precedent for a user-authored executable marketplace inside a workspace.

**Hosted execution.** Rejected. Arbitrary user processes on the vendor's infrastructure under a freedom-first policy is an unbounded cost with no defensible limit that is not also a capability limit.

---

## Recommended approach

**Design the vault format and the host-to-artifact IPC contract first.** Everything downstream — permissions, egress logging, marketplace security, sharing, publishing — terminates at those two, and both are expensive to change once artifacts exist in the wild.

**Then seed the marketplace before the first user.** The product shape chosen has the worst cold start in software: the empty state is empty and every new user is handed a blank canvas plus homework. Notion's defining early problem was exactly this, which is why templates exist. Given **L46**, most users will install rather than author, which means **first run must be "pick something that nearly works," never "here is your empty workspace."** Presets-first-with-modification and builder-with-presets-available are the same feature set and different products; only the first matches measured behaviour.

Seeding is also the one piece of work that requires no users and no funding, and it can be done entirely with the tools already in hand.

---

## Open questions

- **The accept condition**, unchanged since 2026-08-10 and now understood as answerable only by rollback rather than verification. Whether that is enough for a shared artifact is untested.
- **Marketplace posture** — curated store or public index. These carry different user expectations, different blame and different legal exposure; the choice is free now and expensive later. Undecided.
- **Sync conflict resolution.** Two people, or an agent and a server, editing the same vault. Obsidian's answer took years and is their paid product. The fourth appearance of surviving-concurrent-change in a single day.
- **Pricing**, still undefined, though the field now supplies anchors: roughly $8–45 per seat, Gamma's free/$8/$15/$100 ladder, and per-workspace resource tiers as a unit that fits the architecture.
- **Funding.** The direction is inference-heavy and the founder expects to need subsidised credits to compete. That makes a raise a dependency rather than an option, and the fundable asset is a working demonstration rather than traction.

---

## The assignment

1. **Build the smallest thing that proves the interaction.** One workspace, one artifact installed from a seeded preset, one AI modification of it that works. Not auth, not sync, not the marketplace — **T44**, and nothing else.
2. **Put it in front of one person who is not you.** Watch whether they modify what they installed. That single observation is worth more than any brief commissioned today.
3. **Write down what would prove T46 wrong**, before the build starts rather than after.
4. **The gym-era CRM interview evidence is still unwritten**, eight sessions on, and still the only first-hand demand data this project has ever had.

---

## What I noticed about how you think

**You design better under a named constraint than under an open question.** The direction moved five times today and only settled once the constraints became specific — XSS in the shared path, unbounded compute under a freedom policy, cold start in a tool-for-building-tools. Given a wall you produce architecture; given a blank field you produce another direction. That suggests the fastest route to the next decision is to go find the next wall rather than to think harder about the last one.

**Freedom is the actual conviction here, and it survived every attempt to price it.** Sandboxing, permissions, marketplace safety, hosted compute — each was offered as a reason to constrain, and each time you took the risk and named who you were selecting for. That is a genuine product position rather than a preference, and it is the first thing today that did not move.

**The counter-observation, now aged six times, and it has changed shape.** Twelve days, six research clusters, one pivot, zero conversations. But the reason has expired: for eight sessions the assignment required a named human at an unreachable platform. It no longer does. **T44 needs one person and an afternoon.** If the next session opens with a seventh brief instead of an observation of a human being using something, that is no longer a scheduling problem.
