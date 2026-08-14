---
tags: [journey, history, strategy, recompose]
status: living
---

# Journey

A chronological record of what has been tried, what failed, what was learned, and where the project stands. This is a founder-facing document — honest about the losses, clear on the actual blockers behind each shift.

**Each phase gets what changed, why, and what it cost. Everything else lives in the pivot and office hours docs each phase links to.** A phase that grows past a few paragraphs has stopped being an arc entry and become a session summary; compress it back.

Concepts touched: [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]], [[Concepts/Business/Strategy/Freelance_Conversion_Thesis|Freelance_Conversion_Thesis]].

> [!note] Phases 1–5 happened under the name CombatDen
> Recompose is the company that came out of that arc. Phases 1 through 5 below are the previous name and the previous product — a class-based-gym CRM and member app. That product is now the **reference implementation and demo canvas**, not the company. Nothing in Phases 1–5 describes what Recompose sells today.
>
> This file is kept because **the losses are the most useful part of the record.** Five phases of well-reasoned pivots that never produced a signed customer is the single most important fact about this project, and deleting the prehistory would delete the evidence for it.

---

## Phase 1 — Full CRM Replacement

**What was tried:** Built a full gym CRM — billing, scheduling, member management, the whole operational stack, positioned as a replacement for PushPress / Mindbody / Kicksite.

**The outreach, and it is the only first-hand demand contact this project has ever had.** Roughly **20+ gyms approached in person**, **5+ full interviews**, **two yeses**, and **one of those pulled out over migration friction.** Selling continued through Phase 4. Every direction after that was reasoned to and never carried to a person, which is the fact the rest of this file is about.

**Real blocker — migration friction.** Existing CRMs hold credit card data hostage. Even when a gym owner was ready to buy, the deal died on the switch cost. Credit card migration is slow or impossible; owners can't move their billing infrastructure on a whim. Global MMA's fan-founder was enthusiastic but blocked by a cost-wary partner; the deal died there. No verbal yes turned into a signed deal.

**What was learned:** Don't compete on the operational critical path. Migration friction is structural — it isn't solved by a better product or a lower price. The CRM incumbents have a lock that a new entrant cannot break through head-to-head.

---

## Phase 2 — Retention Layer (two pillars, no customization, no AI angle)

**What changed:** Stripped to a member-facing app sitting *alongside* the gym's existing CRM — engagement loop, points, ranks, content library. No billing, no check-in, no signup. Pitched as a retention add-on.

**The structural diagnosis that shaped this phase.** A full office-hours session (April 26) mapped the layered architecture ceiling: a product that runs alongside a CRM cannot mandate adoption from coaches, owners, or members. Coaches log into the CRM because that's how they get paid. Members book because they have to. A layered product depends entirely on voluntary behavior. This means:
- **Coach-driven personalization (per-class voice notes, per-class summaries)** was evaluated in depth and killed. Per-class coach input requires coaches to open the app daily by choice, without an adoption hook. The only proven coach adoption hooks (pay, schedule, attendance) are owned by the CRM, not a layered app. Every workaround evaluated had the same failure mode.
- **Messaging was briefly added then immediately cut the same day.** After removing coach feedback, member-coach messaging was added to fill the gap. On reflection, it was thinness anxiety masquerading as a product decision — it doesn't move retention the way the loyalty engine does and adds scope without confirmed demand. Cut the same day it was added.
- **The remaining product (loyalty + algorithmic content) was honest but thin.** One real differentiator vs. a gym's existing CRM bundled app: the loyalty engine. Content recommendations are there but generic without per-class coach input. The pitch cleared the intellectual bar but not the wallet bar.

**Real blocker — unit economics.** $50–100/mo ACV with solo founder sales to SMB gym owners. US fighting-gym TAM is ~5–10k businesses. Even fully penetrated, that's a small number. 10 hours of founder time per $100 of MRR added. The math was structurally bad independent of whether the product could sell.

**Secondary blocker — the product looked like a feature.** Without the design/brand angle, the pitch was: "pay us monthly for a loyalty program your CRM doesn't have." Smart gym owners heard it as an add-on, not a product. No visual hook, no obvious "whoa." The layer only ever drew *"that's cool"* and never advanced a deal.

---

## Phase 3 — Retention + AI Brand Customization

**What changed (May 1, 2026 merge pivot).** A second project (AIAutoDesign — AI-driven brand customization at SaaS pricing) was being evaluated simultaneously. Rather than switching projects entirely, the two were merged: AIAutoDesign's architecture (tokenized design system, AI asset generation pipeline, cross-modal orchestration) becomes the brand-customization surface that CombatDen was missing. The product becomes three surfaces: loyalty, content, brand.

**Why this fixed the unit economics problem.** The $300 and $500 tiers are viable on their own. The freelancer-replacement ROI argument ($15–50k custom app for $300/mo SaaS) gives the higher tiers a standalone justification beyond the retention math. The $100 tier exists as a customer-acquisition instrument below the CRM price reflex (~$200/mo). TAM also expanded from fighting gyms (~5–10k US) to all class-based gyms (~100–200k US), with fighting gyms as the beachhead rather than the market ceiling.

**ICP refinement (May 24, 2026).** Tightened to a psychographic, not a sport: premium, branding-conscious, retention-focused class-based gym owners with budget. The $300+ price point self-selects for this.

**Architecture-fit refinement (June 1, 2026).** The engagement loop is anchored on *booking*, and booking only works without the CRM in the **unlimited-membership** model, where there's no entitlement gate and no hard class capacity. So the active near-term market narrows to unlimited-membership gyms, and broadening is gated on owning or integrating the CRM. See `CombatDen:Business/pivots/2026-06-01-14-beachhead-unlimited-membership-crm-as-future-layer.md`.

**The test.** If this pivot produces a sale, there's a lot to build. If it doesn't, the project needs a fundamental rethink or a full idea change.

---

## Phase 4 — Back to the Full CRM

**What changed (June 2, 2026).** A red-team of the finished landing page — the founder role-played a skeptical gym owner advised by a separate AI, feeding it the live site copy and the real sales answers (`CombatDen:ConvoWithClaude.md`) — exposed that the layered product's two deepest flaws (blindness to payment/entitlement/capacity, and the double check-in it forces) make it *added operational burden* pitched at gyms that already hate their CRM. Working through it surfaced the decisive evidence: across the whole arc, the **full CRM is the only thing that ever produced a real buying signal** (a gym at the door, "I'll sign once you bring it back" — died on migration friction, not demand), while the **layer only ever drew "that's cool"** and never advanced a deal. The reasoned pivots away from the CRM (Phases 2–3) walked the project away from its single validated signal.

**Why the CRM is viable now when it wasn't in Phase 1.** Phase 1's CRM died because too few gyms allowed migration. The product is now vertical-agnostic, so the TAM is roughly an order of magnitude larger and the **switch-friendly slice is finally big enough to be a market.** The near-term ICP narrows precisely to **gyms on switch-friendly CRMs** — engineering around migration friction by segment selection rather than abandoning the CRM. The ~75%-built Phase 1 billing stack is revivable (caveat: the last 25% — failed payments, proration, refunds, edge cases — is the hard, trust-critical part).

**The discipline.** Validate before building: pitch the whole product to switch-friendly, CRM-hating Dallas gyms; a real yes is a commitment to switch, not "cool." See `CombatDen:Business/pivots/2026-06-02-19-return-to-full-crm-switch-friendly-beachhead.md`.

**Still open as of July 25, 2026.** The June 2 assignment — define the validation bar, build the switch-friendly-CRM list, rewrite the landing page, then pitch and measure commitment-to-switch — was never executed. Seven and a half weeks of building happened instead. **That gap is the template for every phase that followed.**

---

## Phase 5 — The Autonomous Agent Layer (WITHDRAWN)

> [!warning] Withdrawn two days after it was written
> On **July 27, 2026** the founder examined this thesis more deeply and concluded it will not work: *"i had it yesterady but ive realzied it a very thin idea"* — *"ignore the agentic layer parts it was an idea that now that i dug deeper into it wont work."* Superseded by [[pivots/2026-07-27-11-customization-engine-is-the-company|pivots/2026-07-27-11-customization-engine-is-the-company.md]]. Kept because a thesis that lasted two days is part of the record.

**What changed (July 25, 2026).** An **autonomous AI agent layer** on top of the CRM becomes the primary differentiator and the thesis of the YC F26 application. Two steps, only the second of which differentiates: a conversational agent that acts on command (parity), and a layer that acts *first* — reviews the industry weekly, reviews customers daily, watches competitors, generates ideas unprompted.

**The competitive finding that justified it.** A verification sweep of live sites found PushPress, Mindbody, Momence, Wodify, Zen Planner, Glofox, HealthdeskAI and 1club all shipping AI, and **every one of them reactive.** Positioning in one line: *every gym CRM now has an AI you talk to; this is the one you don't have to.*

**Why it withdrew.** The value argument was consistency, not intelligence — and that labor is already bundled into a front-desk worker at no marginal cost, which kills the ROI story. See `CombatDen:Business/pivots/2026-07-25-16-autonomous-agent-layer-added-to-crm.md`.

**Timeline correction made in the same session.** The project started around November 2025 — roughly **8 months**, much of it idea phase — not the 15 months an earlier draft claimed.

---

## Phase 6 — Recompose: the customization engine is the company

**What changed (July 27, 2026).** The AI customization engine, built across Phases 3–5 as an internal capability, becomes the company. CombatDen is retained as the **reference implementation and eval bed**. The one-line description: *"Customers agentically redesign white-label apps."* The company is named **Recompose** on July 28, because *composition* is the design term for how elements are arranged and the product's invariant is arrangement-only. See [[pivots/2026-07-27-11-customization-engine-is-the-company|the July 27 pivot]].

**The buyer changes, and it is the largest single shift in the arc:** from a gym owner to a **multi-tenant white-label SaaS platform**. The value is tier-unlock and lost deals, never tenant satisfaction.

**The mechanism is two parts.** *Assets are data, so a pipeline generates them* — the app-agnostic DAG resolving palette, typography, copy, icons, images. *Layout is code, so an agent writes it.* Deterministic where determinism is available, agentic only where required. [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|Functional equivalence]] is the safety invariant: arrangement changes, nothing added or removed, so the API surface is provably identical.

**Three things reversed inside this phase, and each came from evidence rather than argument:**

- **Structural preset enums were built and failed (July 28).** *"it's always going to be bounded by the design language originally."* **The first empirical finding in the project, and it came from building rather than reasoning.** Replaced by free agentic editing bounded by the invariant, on a Recompose-managed fork that **never writes to the platform's trunk.** See [[pivots/2026-07-28-01-agentic-editing-all-in|the agentic-editing pivot]].
- **UAT turned out to be a branch, not a review environment (July 30).** A misread branch name had propagated across the vault, and the error budget had been resting on a human reviewer who did not exist. The promise flipped to **autonomous operation**, made survivable by halting rather than reviewing. The ~95/4/1 figure is reclassified as a target, never measured. See [[pivots/2026-07-30-22-autonomous-is-the-promise|the autonomy pivot]].
- **The design-service budget line does not exist (August 2).** Trainerize prices the deliverable at $99–169, Vagaro at $499, professional services runs ~1.2% of revenue at Olo. **Cost reduction died as a pitch.** Attach rate, measured on Shopify at 1.73% of Plus stores, tracks *tenant size* rather than design quality — so the ICP filter moved to platforms where **every tenant already has an app**. See [[pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps|the ICP pivot]].

**The open test, unchanged from Phase 4:** the engine was never shown to a white-label platform. No named human at any target was ever produced.

---

## Phase 7 — The modular feature system

**What changed (August 12, 2026).** The full visual redesign stops being the product. Recompose builds a **modular per-tenant feature system**: a tenant describes functionality, an additive module is generated and inserted into their app carrying the platform's own tokens. Theming survives as that token layer and nothing more. See [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|the August 12 pivot]].

**The trigger was the money, not the design argument.** The vault had three independent findings that design is not what moves the needle and had never acted on them. What made it decisive: there is **no design budget line**, and there **is** a custom-development budget line, staffed by named engineering organisations at Banno, Backbase and Tapcart and priced behind sales. The buyer moves to platforms that **already pay to build per-tenant functionality.**

**The safety story changed hands.** A module is **additive**, which is the boundary Salesforce, ServiceNow, Shopify, Atlassian Forge and Banno's Plugin Framework all converged on independently. The previous product structurally could not be additive.

**And the founder immediately rejected the framing that made it sound easier, which is the most important thing in the phase.** *"even though it's kinda greenfield we have to still integrate with their APIs for auth, base data, user IDs… I would actually argue this is a lot harder."* Greenfield describes the module's *interior* only; its boundary is integration against a production system nobody here wrote. **The one-person asymmetry is spent** — the redesign's failure mode was cosmetic, this one's is a security incident.

**The open test:** nothing shown to any platform. The ten-named-platforms assignment had now been written identically in five consecutive sessions and executed zero times.

---

## Phase 8 — The extensible workspace (current)

**What changed (August 13, 2026).** Recompose stops extending anyone else's product and builds its own. A deliberately simplified Notion-shaped workspace whose one distinguishing capability is that **real HTML and JavaScript are first-class content inside it** — authored by prompting, installed from a marketplace, modified freely. Small teams first, the enterprise information-hub budget line as the destination. See [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|the August 13 pivot]].

**Six research briefs landed in one day and closed every available substrate.** Retool's Acceptable Use Policy forecloses building a competing product on it. Airtable and Notion are bounded by a configuration ceiling no model quality exceeds. The white-label platforms stayed unreachable for a seventh session. And Stacker — the closest precedent, six years and $23M in — concluded it needed to own the data layer.

**The position is three things a coding agent structurally cannot do**, each a property of owning the base: verification against a bounded contract with guaranteed rollback; extensions surviving the base moving ([[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], unimplemented anywhere); and simply running, since an agent hands you code and you still have to provision, deploy, secure and pay for a database.

**The architecture splits three ways, each placed for a different reason.** Files local, so coding agents operate on the workspace natively. Data server-side and per-workspace, because collaboration is impossible otherwise. Execution local, because arbitrary user compute on our infrastructure is unbounded liability. See [[Strategy/Architecture_Thesis|Architecture_Thesis.md]] and [[Strategy/Trust_And_Safety|Trust_And_Safety.md]].

**The differentiator got a better statement on August 14, and it came from the founder in passing:** *"a lot of times the html was the doc."* Not adjacency — identity. Salesforce had already built the separate-artifact-store version and it did not close the problem, for exactly that reason. See [[Office_Hours/2026-08-14-11-Office_Hours_The_Doc_Is_The_Artifact|The Doc Is The Artifact]].

**The open test — and for the first time in eight phases it does not require an unreachable stranger.** Zero customers, and zero conversations *for any direction since the gym product*. But the assignment stopped being *ten named platforms with a named human at each* and became **one person, one afternoon**: does someone handed an artifact then change it.

---

## Key structural lessons from the whole arc

1. **Cold CRM *replacement* is dead — becoming the operational layer is not.** Asking a gym running on PushPress/Mindbody to switch its billing fails on migration friction; that's structural. But that is *cold rip-and-replace*, not a permanent law. The June 2 correction found a third path: replacement targeted only at gyms whose incumbent CRM is switch-friendly, where migration friction is low by construction.
2. **Layered architecture has a real value-add ceiling.** Coach-dependent features are structurally hard without an adoption hook the layered app doesn't own.
3. **Features added from thinness anxiety don't survive first principles.** Messaging was added and cut same-day precisely because the discipline held.
4. **The unit economics had to be fixed, not just the product.** The merge solved a structural problem that better retention software alone couldn't fix.
5. **The design bet needs to actually be miles better, not marginally better.** The thesis rested on first-pass output producing a "whoa" in 5 seconds. That's the engineering bar, and it was never validated at scale.

### What the whole arc teaches Recompose (added 2026-07-28)

6. **Reasoning has been the only instrument since the gym product, and that is the actual failure pattern.** Six phases, roughly eight months, zero paying customers, and no outside party has responded to anything built since Phase 1. **The gym CRM was carried to 20+ gyms and 5+ interviews and produced two yeses; every direction after it was reasoned to and never carried to a person.** So the pattern is not that the founder does not sell — he sold when he knew the buyer and stopped when he did not. Every phase since cleared an intellectual bar and none cleared a market one.
7. **Build-instead-of-sell is how each phase actually ended.** The June 2 validation assignment sat unexecuted for eight weeks while rewards productionization, the member app and Kiosk Mode all shipped. Each was good work. None tested demand.
8. **Founder conviction is a hard constraint, not a soft preference — and the filter is sharper than "boring vs. fun."** The CRM was not abandoned at a low point; it was **fully built, and the founder was roughly a week from taking it to customers** when he stopped. Not from avoidance, from comparison: *"I was legit a week from going to customers, I had the whole thing built, but I realized I really don't care about it."*

    **The filter, in his words: boring is fine if the base of what you're building is fun and impactful.** The test is *where the interesting thing sits relative to what the buyer is actually buying.* The acceptable shape is *"get through the boring to make the fun vision come true, instead of get past the boring to have a little fun on the side."* Run this over every future idea **before** the market analysis.
9. **The one durable asset produced in eight months was infrastructure, not product.** Five gym-facing product theses were discarded; the app-agnostic generation pipeline survived all of them and became the company. When output is discarded that fast, notice what keeps getting reused.
10. **Take the ambition that raises scope without raising risk.** Phase 6 went from theming to a full visual redesign — a materially bigger claim — while getting a *tighter* safety story. Most scope increases trade safety away. The ones that don't are the credible ones.

### What Phase 7 adds (2026-08-12)

11. **Phase 7 is the counter-example to lesson 10, taken deliberately.** It raises scope *and* risk: the failure mode goes from cosmetic to security, three surfaces replace one, and the accept condition that made the autonomy promise defensible no longer exists. That is allowed, but it is the opposite trade from the one lesson 10 identifies as credible, and it should be named as such rather than dressed up.
12. **Follow the budget line, not the pain.** Five phases were spent finding a problem people complained about. What moved the company was noticing which complaint has a **staffed engineering team and a contracted price** attached. Ask what a company already pays a human to do before asking what annoys them.
13. **The most valuable correction is the one that damages your own case.** The greenfield argument was the strongest point in favour of Phase 7, and the founder took it apart within minutes of choosing the direction. Every prior instance of this habit was correcting research that disagreed with him; dismantling an argument built in your own favour is the rarer and more protective version.

### What Phase 8 adds (2026-08-13)

14. **Commission the replication before you believe the finding.** The spreadsheet wedge was the best evidence this project had produced, and it was killed within hours by a brief deliberately designed to exclude the corpus that generated it. **The first genuine falsification in the whole arc**, and it cost one brief.
15. **Closing a door counts as progress.** Three directions ended the day weaker than they began it, and each closure narrowed the field rather than costing anything.
16. **The same unsolved problem appearing five times is a signal, not a coincidence.** Surviving concurrent change showed up as Retool's module versioning, marketplace forking, extension breakage everywhere surveyed, sync conflict, and edit-versus-regeneration drift. When a problem recurs at every level of a design, it is the design's actual centre.
17. **Check whether the buyer is reachable before choosing the buyer.** Seven sessions were spent with an assignment that could not be executed because it required a named human at a company that does not answer email.

### What August 14 adds

18. **Your strongest material arrives sideways.** The two best findings in the project both came out in passing while explaining something else — the preset enums failing, and *"the html was the doc."* Neither was flagged at the time. When something lands mid-sentence and moves on, stop and write it down.

---

## The CombatDen build record

CombatDen's build milestones — the rewards system, the member app, Kiosk Mode — live in that repo's own journey at `/var/home/jm/Documents/CombatDen/docs/Journey.md`. They are the build record of what is now the reference implementation, not company direction, and they are not duplicated here.

*Last updated: August 14, 2026 — Phase 8 compressed, the CombatDen build record moved to its own vault, and the Phase 1 outreach recorded: 20+ gyms, 5+ interviews, two yeses, one lost to migration friction.*
