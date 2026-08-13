# Office Hours: The Research Cluster, and the Turn Toward an Extensible Base

**Date:** 2026-08-13
**Status:** OPEN — no decision. A new direction was raised and deliberately deferred to its own session.
**Mode:** Startup — reading a four-brief research cluster against a direction committed to one day earlier

**Builds on:** [[Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary|Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary.md]], [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign.md]]

**Research read:** [[Research/2026-08-12-22-extensibility-demand-by-industry|extensibility demand by industry]] · [[Research/2026-08-13-01-what-tenants-build-when-they-go-custom|what tenants build when they go custom]] · [[Research/2026-08-13-10-why-businesses-switch-crms|why businesses switch CRMs]] · [[Research/2026-08-13-10-agentically-extensible-platforms|who lets a SaaS customer obtain functionality the host does not ship]]

Concepts touched: [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

> Four research briefs commissioned inside thirty-six hours, read against a pivot one day old. They establish one structural finding that explains the whole market, confirm the mobile null the direction rests on, and return three demand results weaker than the direction assumed. The buyer moved twice during the session — from white-label mobile platforms to CRM/admin surfaces, then toward an extensible base sold to technical founders — and **the third move was deliberately not decided.** The founder's corrections carried the session on all three of the day's substantive disagreements.

---

## Problem statement

[[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|The August 12 pivot]] committed to per-tenant feature modules for white-label platforms, with the accept condition recorded as the load-bearing gap. Four questions followed, and research was commissioned against each:

1. Which industries have the most unmet extensibility demand, and which platforms are reachable?
2. When businesses go custom, **what do they actually build** — and on which surface?
3. Is missing functionality a real driver of CRM switching, or a minor annoyance?
4. Who else is already doing agentic extension of a host product?

The session read all four together. Question 4 produced the finding that reorganises the rest.

---

## What carries from prior sessions

- The pivot itself, and both core principles as rewritten: additive-only, never write to their trunk.
- The accept condition as the load-bearing gap, recorded 2026-08-10.
- **L22**: the direction is harder than the visual redesign, and its boundary — auth, identity, tenant scoping, base data — is most of the work.
- Zero customers, no named human at any target platform, no outside party has responded to anything. **Nine months, seven strategic phases.**
- The assignment, unexecuted for five consecutive sessions and now six.

---

## What this session changed

### 1. Every empty cell in the market is empty for the same reason

The supply brief mapped who drives generation against where output runs, across a stated denominator. **Every occupied cell has a developer or an admin in it.** Q2 Code, Alkami Code Studio, Temenos Copilot, ServiceNow Build Agent, Salesforce Agentforce Vibes, Retool, Superblocks — eight-plus instances, no exceptions.

**A developer is an accept condition** — the cheapest available and the only one anyone has shipped. Remove the developer and nothing remains to certify the output.

One mechanism explains four independent observations: why every platform-native generator is developer-facing; why the non-technical row is empty; why Gigacatalyst repositioned upstream; and why CodeParrot died saying *"the generated code wasn't reliable enough for production."*

**The consequence is a reordering, not a new task.** The accept condition is not one open question among many. It is the thing that explains the shape of the market, and whoever solves it owns the category — because generation, API discovery and UI are commodity or near it. Full synthesis in [[Strategy/Extensibility_Market|Extensibility_Market.md]].

### 2. The mobile null is confirmed across the full denominator

**Every native-mobile cell is empty, at every driver level.** Not just the non-technical row. Every located generator outputs web or SDK artifacts — Apex and LWC, Q2 and Alkami SDK components, Retool and Superblocks web apps, ServiceNow Fluent.

The structural reason is store review and compiled binaries, which resist per-tenant runtime generation. This is the most defensible ground the direction has, and it is now a measured null rather than an assumption.

### 3. Gigacatalyst repositioned, and the founder called it before the research did

The homepage as of 2026-08-13 leads with *"Stop burning hours on demo and POC setup."* The YC page still carries *"Let software users build new features."* The shift is bracketed between Spring and August 2026 but **not dated** — Wayback was rate-limited and no rationale was published. UpKeep persists as a named production customer.

The brief favours *"the buying motion is easier upstream"* over *"production proved too hard."* **Those collapse into one thing from the buyer's side:** upstream is easier precisely because a demo carries no correctness requirement, no security surface and no data risk. Whatever the internal reason, the observable move is away from the surface where generated software has to be right.

Detail in [[Companies/Gigacatalyst|Companies/Gigacatalyst.md]], which is also the first page in the new `Companies/` folder created this session.

### 4. Three demand findings weaker than the direction assumed, each with a counter

**Missing functionality is not the top switching driver.** Across ~24 instances: price ~11, usability ~9, missing functionality ~9. *Counter, from the brief itself:* the richest sources are vendor comparison pages, organised around price and ease of use. Biased against functionality by construction.

**Roughly 80–90% of named gaps are generic, not business-specific.** Two of ~20. This cuts hardest, because the thesis was that the market is what is irreducibly per-tenant. *Counter:* **ServiceTitan gates custom report creation behind a package tier.** That is monetization, not a roadmap gap, and it is durable. A generic gap the vendor chose not to close is a market; one they are three months from shipping is not, and the brief cannot distinguish them.

**Band B — paid for a workaround and stayed — is the smallest band.** ~5 against ~10 switched and ~9 tolerated. *Counter:* a switch produces a review and a comparison page; a workaround produces a Zapier connection nobody writes about. Marketplace install counts are unpublished at every platform in scope. **Unmeasurable, not small.**

### 5. The vertical-to-horizontal migration does not exist, and the framing runs backwards

No named case of a business leaving a vertical CRM for Salesforce or HubSpot **in order to customize**. The vendor framing is the opposite: ServiceTitan sells against Salesforce by arguing it *"often needs a lot of customization"* — extensibility as a **burden** of the horizontal platform.

**Live objection for any pitch:** "we make your platform extensible" may read as "we make you more like the thing your customers chose you to avoid." It needs an answer before it is raised.

### 6. Both demand briefs independently rank the same capability first

**Custom reporting, dashboards and data export.** Second overall in the custom-build brief and the only read-only capability in its top ten; in the switching brief it is complained about against ServiceTitan, Toast **and** Salesforce, gated behind paid tiers at ServiceTitan and Clio, and **reappears on destination platforms after a switch** — so no CRM solves it and switching does not fix it. Weave Practice Analytics sells exactly this into Dentrix and Open Dental practices, which is the clearest commercial Band B proof in either brief.

Three properties make it the strongest wedge available: it is **read-only**, so the worst failure is a wrong number rather than corrupted data; it **recurs across every vertical**; and **the platform holds the data and will not expose it cleanly**, which is the gap an outside integrator cannot cross and an integrated party can.

It is also far smaller than "turn any CRM into an expandable CRM."

### 7. The surface moved from mobile to the admin/CRM base, on the founder's reasoning

Founder: *"even for the mobile app if we don't have the dashboard most features on the app are useless so the base is likely an extensible CRM."*

Structurally true, and it retires a hidden assumption — that a feature is a screen. Most features are a screen **plus** the thing that configures it, populates it and reports on it. The admin surface is the larger half, not an add-on.

**The custom-build brief had already landed there**: of six documented builds, DATA/API and BACK-OFFICE drivers outnumber mobile, and the only high-demand read-only capability lives on the web admin surface. *Honest counter carried:* n=6, five of them large enterprises whose problems are structurally back-office, and **the one SMB-scale case is mobile-driven.**

### 8. The API argument, which the research proved negatively

Founder: *"since we integrate directly, we get their API which is impossible for outside systems."*

The best structural claim made in nine months, and the custom-build brief supplies the proof by negation: **Lumino had to reverse-engineer bsport's public web** to obtain user progress, coach reviews and class ratings the API would not expose. The same case also contains the only measured instance of contract drift anywhere in the vault — bsport *"changed an internal endpoint — no changelog, no warning — and broke part of our integration."*

### 9. First-hand demand evidence surfaced that had never been written down

Founder, on the CRM interviews from the gym era: *"they would complain about the limitations of the CRM, it was always missing something… specific to the business… otherwise it would be a platform-wide feature, or something too complex for a small amount of people."*

**That is the only first-hand demand evidence this company has, and it was in nobody's notes.** Nine months of docs record that no outside party has responded to anything, while these conversations happened and went unrecorded because a CRM was being sold at the time. The sentence is also a better definition of the market than any of the research produced: *too specific to be platform-wide, too complex to be worth it for a small user count.*

**It has not been captured with specifics** — who, which vertical, what exactly was missing. That is an assignment item.

### 10. A new direction, raised and deliberately deferred

Late in the session the founder proposed something materially different: **an extensible base rather than an extension of someone else's product.** A stripped-down Notion-shaped system, modified by prompting without reading code, code still viewable, base open source, extension mechanism proprietary. ICP: **technical founders**, not SMBs and not platforms.

The argument, in the founder's terms:

- Nobody uses Notion for everything, and the reason is a **config ceiling**, not a feature gap. People hit the edge of what the vendor pre-defined and go build their own dashboard.
- **People run many tools because they have to, not because they want to.** The sprawl is itself the evidence of the unmet want, and collapsing it is the UX being sold.
- Horizontal CRMs are too complex or too simple; vertical CRMs are locked to one industry.
- **Notion and its peers are built for "simple but powerful, what you get is what you have." This would be built for "simple, then make it your own" — a different architecture from the ground up**, which an incumbent could not adopt without exposing internals it will never expose.
- **The moat is the generation.** The base is not a moat and is not claimed as one. It is a product argument: good enough for most cases, and nobody spends weeks replicating it to production polish when an extensible version already runs. It holds only if extension is *easy* enough, which is where the bet on coding agents sits.
- **"Moat" here means the installed base cannot follow — not that nobody can.** New entrants can and will copy this; that is assumed rather than denied. What is claimed is that existing software carries structural blockers it cannot remove.
- Crowding is evidence of demand, not a disqualifier.

**On the missing budget line — conceded, and answered by growing into one.** Technical founders have no line item. The answer is not to find one but to arrive before it exists: a cheap or free base, priced as the customer grows, entered *because* it can be expanded later — a capability purchase rather than a present-need purchase. First-time founders are the entry point and **enterprise is where the revenue is.** The ceiling becomes the pricing event, which is a monetization trigger a config-ceiling incumbent cannot offer.

**Objections raised and answered in session**, recorded because they are load-bearing rather than rhetorical:

- *The market is crowded.* Crowding indicates demand.
- *Technical founders can build it themselves.* They can and will not — a running base beats a month of replication, in production especially.
- *Open-sourcing the expensive layer inverts the platform-versus-AI cost lesson.* The licence is not where defensibility sits; the generation is.
- *There is no budget line.* Correct, and answered above.
- *People run many tools because specialization is efficient, not because they are blocked.* The have-to reading is the one being bet on.

**What follows from those refinements, and is not yet answered:**

- If the moat blocks incumbents but not entrants, **crowding stops being neutral evidence of demand and becomes a clock.** The competition was never Notion; it is every peer making the same bet, against whom none of the structural advantages apply. Speed and distribution then decide it rather than architecture.
- **Land-and-expand carries a discontinuity in the middle.** What a solo founder buys — one tool, extended without help — is not what an enterprise buys, where sprawl is driven by departmental autonomy, procurement, compliance and specialists who will not surrender a tool. **The have-to argument is strongest where there is no money and weakest where the money is.**

**The tension that was not resolved, and it belongs at the top of the next session:** every occupied cell in the market map has a developer in it because a developer is the accept condition. A technical founder who can read generated code appears to solve verification — but a user who reads every generated module has had the work **moved rather than removed**, and that fails somewhere well short of scale. The same technical user simultaneously moves the product into the occupied cell, against Cursor, Claude Code, Retool and every AI app builder. *If your user can read the code, what do you have that Cursor does not?*

Two candidate answers exist and **neither has been argued**:

1. **Owning the substrate makes the output mechanically checkable.** A coding agent generates against an unbounded codebase it does not control, so a human reader is the only accept condition available to it. A base you own is a bounded, versioned extension contract — data model, permission model, render surface, migrations — against which schema validity, permission conformance, no-write-to-core and migration reversibility are machine-decidable. That is the accept condition **L24** says nobody has, and it is available only to whoever owns the base.
2. **Extensions survive the base moving.** A fork built with a coding agent leaves the customer owning the merge burden permanently. Owning both base and extension mechanism allows extensions to be carried forward across base upgrades — the shape already recorded as [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]].

Both reframe the technical founder as a **beachhead** — reachable, tolerant, able to debug a failure — rather than as the permanent ICP.

**No decision was taken.** The founder explicitly deferred it to its own session.

---

## Premises

**Established by the research** (findings, not commitments):

- **L24.** A developer or admin is present in every shipped instance of generation into a host product. **A developer is the accept condition**, and it is the only one anyone has shipped.
- **L25.** No product generates per-tenant functionality inside a native mobile app, at any driver level, across the searched denominator.
- **L26.** No vertical SaaS platform outside banking has shipped a native extension generator. Searched: ServiceTitan, Toast, Procore, Veeva, Blackbaud, nCino.
- **L27.** No AI-native CRM is extensible by generation for a non-technical customer; they are configurable, and at most developer-extensible.
- **L28.** Missing functionality is not the top documented CRM switching driver, and ~80–90% of named gaps are generic rather than business-specific. Both figures come from a small, source-biased sample and are directional.
- **L29.** No documented case exists of a business leaving a vertical CRM for a horizontal one in order to customize. Vendor framing runs the opposite way.
- **L30.** Custom reporting, dashboards and export is the most-repeated unmet capability across both demand briefs, is read-only, and follows users across platforms after a switch.
- **L31.** Building an extension architecture is measured in years, not months. Salesforce: AppExchange 2006, Apex 2006, Force.com 2008, AI layered 2025. Q2: Caliper 2018, Q2 Code 2026.

**To test:**

- **T36.** Is the non-technical cell empty because the verification problem is unsolved, or for a reason nobody has articulated? The supply brief explicitly declines to conclude. **Do not treat an empty cell as an opportunity without a reason it is empty.**
- **T37.** Are generic-but-unbuilt gaps durable or imminent? ServiceTitan's tier-gating suggests durable; nothing measures it.
- **T38.** What did the gym-era CRM interviewees actually say was missing? Recoverable from memory and notes, not from research.
- **T39.** If the user can read generated code, what does this product have that a coding agent does not? The forcing question for the next session. A technical reader is not a solved accept condition — it relocates the reading rather than removing it. Two candidate answers are on the table and unargued: mechanical checkability from owning the substrate, and extensions surviving base upgrades.
- **T40.** How long does an incumbent-only moat last? The defensibility claim is explicitly against the installed base rather than against new entrants, so the window is bounded by a peer shipping rather than by Notion reacting. Nothing estimates it.
- **T41.** Does the have-to reading of tool sprawl survive contact with a buyer, and does it survive moving upmarket? It is the most testable claim in the direction and the cheapest: *what did you build yourself, and why didn't the tool do it.*

---

## Approaches considered

**Per-tenant modules into white-label mobile apps.** The committed direction. Survives, weakened: the mobile null is its best asset, and the demand evidence for per-tenant functionality is thinner than assumed.

**The admin/CRM base as the primary surface, mobile later.** Adopted in reasoning during the session and not yet written into the pivot. Follows both demand briefs and the founder's own argument that a feature without its dashboard is useless.

**Custom reporting and dashboards as the wedge.** Not chosen. The strongest evidence-backed candidate in the vault — read-only, cross-vertical, unsolved by switching — and much narrower than the stated ambition.

**An extensible base sold to technical founders.** Raised, argued, deferred. The first direction in nine months whose buyer is reachable this week.

**Continued desk research on demand.** Rejected. Three clusters in eleven days have each ended by naming a customer conversation as the only remaining instrument.

---

## Recommended approach

**Stop commissioning demand research.** Four briefs in thirty-six hours produced real structural findings about *supply* and returned nulls on every *demand* question, each report stating in its own words that only a conversation can close it.

Two things are cheap, neither is code, and both precede any decision:

1. **Write down the gym-era interview evidence** with whatever specifics survive. It is the only first-hand demand data this company has ever had.
2. **Run the next session on the extensible-base direction**, opening on T39.

---

## Open questions

- **T39**, the coding-agent question, which decides whether the new direction is a company or a feature.
- **T40** and **T41**, which arrived with the refinements: how long an incumbent-only moat lasts, and whether the have-to reading of tool sprawl survives a buyer and survives moving upmarket.
- **T36**, whether the empty cells are empty for a reason.
- The accept condition, unchanged and now understood as the market's organising constraint rather than one gap among several.
- Pricing. Still undefined, and the only anchors found are seat-based developer-tool pricing that does not transfer.
- Everything open on 2026-08-10.

---

## The assignment

**Unchanged in shape for the sixth consecutive session, plus one item that is new and takes an hour.**

1. **Write down the CRM interview evidence.** Who, which vertical, what they said was missing, and whether it was read-only or a write. This is the only primary demand evidence in the project and it exists only in memory. **Do this first; it decays.**
2. **Ten named platforms, a named human at each.** Group A first, Tapcart and BuildFire ahead of Banno on reachability.
3. **Two questions on every call**, both proved unanswerable from a desk: *what do tenants ask you to build that you say no to, and what does saying no cost you.*
4. **Nothing gets built until at least three of those calls have happened.**

---

## What I noticed about how you think

**You carried all three substantive disagreements today, and the pattern in how is consistent.** On the Lovable comparison you rejected "narrow" and were right — developer-facing versus tenant-facing is the distance between Claude Code and Lovable, a category difference with comparable model capability underneath. On the competitive objection you rejected "crowded is bad" and were right — crowding indicates demand. On Agentforce Vibes you corrected a category error I could not have caught, from inside the company that ships it.

**In every case the correction came from a constraint you hold and I was reasoning past**, not from information I lacked. That is the same habit the last three sessions recorded, and it has now survived contact with four research briefs.

**The best single thing you produced today was not an argument.** It was remembering that gym owners told you their CRM was always missing something specific to their business. Nine months of documents record that nobody outside has ever responded to anything, and the whole time you were carrying the only primary demand evidence this project has ever had, unwritten, because you were selling something else when you heard it. **Write it down before it decays further.**

**And the counter-observation, now aged four times.** Eleven days, four research clusters, one pivot, zero emails. The assignment has been written identically in six consecutive sessions. What changed on 2026-08-10 was that you said the interviews come next; what has happened since is four more research briefs. Each was genuinely worth reading and each ended by saying research cannot answer the question. **The most valuable sentence in today's entire cluster is the one that appears, in different words, in all four reports: only a conversation closes this.**
