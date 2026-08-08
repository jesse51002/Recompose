# Office Hours: Agentic Code Generation, and Why the Feature Route Closes

**Date:** 2026-08-03 → 2026-08-04
**Status:** APPROVED
**Mode:** Startup — doubt review, then a commissioned research pass, then an architecture decision
**Builds on:** [[Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge|Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge.md]], [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]]

Concepts touched: [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]].

> The session opened with the founder's own doubt — that design is not a budget line anyone currently pays for, which makes this category creation rather than replacement — and ended by closing the feature route on evidence. In between it produced two research briefs and a concrete outreach mechanism. The product did not change. What changed is that the boundary around it is now argued from measurement rather than from instinct, and the safety property was found to have been named wrongly for a month. No pivot doc: nothing reversed direction.

---

## Problem statement

Four questions in sequence, each forced by the previous one's answer:

1. If design is not something companies currently pay for, is Recompose creating a category rather than replacing a spend — and is that survivable for a solo founder with no customers?
2. Given the ICP is platforms of real size, how does a founder with no logos get on a call with any of them?
3. Should the mechanism extend from arrangement-only to generating net-new per-tenant features — the thing the August 2 research showed platforms actually want and structurally refuse to supply?
4. If not, what specifically makes the visual route different, and what is still unsolved inside it?

Question 3 is the one this session answers. Questions 1 and 2 produced positions, not decisions.

---

## What carries from prior sessions

Untouched:

- The mechanism. Assets by pipeline, layout by agent, [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] in scope, no new features.
- [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], read access as the whole integration, UAT as the landing branch.
- The August 2 ICP filter: platforms where every tenant already has an app.
- "Close enough at a fraction of the price," explicitly not parity.
- Pricing undefined. Zero customers. No outside party has responded to anything.
- T19 — whether attach rate responds to design quality at all — remains the largest open question and remains unanswerable by research.

---

## What this session changed

### 1. The feature route closes, and it closes on numbers

[[Research/2026-08-04-mobile-app-code-gen|Research/2026-08-04-mobile-app-code-gen.md]] was commissioned to answer whether the fork mechanism could carry net-new per-tenant features. It answers no, for now, and the margin is not close.

**Nobody has done it.** No documented case exists of an agent autonomously shipping a net-new, user-facing feature into a pre-existing production mobile codebase it did not author. Not vendor-claimed, not measured.

**The measured rate is ~65–70%, with a human on every single task.** Devin merges 67% of its PRs; GitHub's Copilot Coding Agent hit 67.9% on `dotnet/runtime` across 878 PRs — and *every one of those was requested by a human with maintainer rights, because the agent cannot open a PR on its own.* On Scale AI's commercial SWE-bench Pro set, the best model scores under 20%.

**It collapses exactly where a redesign lives.** Success falls below 10% once a patch touches three or more files or spans 100+ lines; patches touching seven or more files are never solved; repositories over 500 files rarely exceed 5%. JavaScript and TypeScript score lowest of all languages, which is React Native.

**Mobile is the worst-supported domain in the field.** iOS/Swift has essentially no robust agent benchmark. Native build configuration, code signing and App Store review are failure modes web tooling never encounters.

**Everyone keeps a human at the merge gate.** Devin, Copilot CCA, Meta's SapFix, Uber's Piranha — all of them. Even Piranha, a deterministic single-purpose tool that only deletes stale feature flags, assigns its diff to the flag's author for review before it lands.

### 2. The safety property had the wrong name, and the correction is an upgrade

The vault has been describing its safety story in Gigacatalyst's vocabulary — separability, sandboxing, additive output. The research establishes that separability is the load-bearing idea across the *entire* field: Salesforce metadata, ServiceNow, SAP's keep-the-core-clean doctrine, Shopify, Atlassian Forge, Q2's Caliper SDK, Jack Henry's Plugin Framework, and Gigacatalyst all converge on it independently.

**Recompose does not have it and cannot have it.** A visual redesign modifies screens that already exist. It is not separable by construction and cannot be sandboxed.

What Recompose has instead is a property nobody else has, because nobody else's output is cosmetic: **the blast radius is bounded by the type of the output.** A bad output is ugly, not broken. No data model to corrupt, no permission to leak, no correctness contract to violate. That is a genuine safety story, it is Recompose's own rather than borrowed, and every comparison to Gigacatalyst's architecture should stop — the research confirms theirs is an API-composition sandbox that shares almost none of these problems and none of these guarantees.

### 3. The fork is unprecedented, and the precision matters

Founder, and the research agrees: *"the fork mechanism is unprecedented... but that's because white labeled apps arent what the indusry is building for."* No published example exists of an agent autonomously maintaining a long-lived fork against a moving upstream. No drift-rate or maintenance-burden data exists anywhere, because no such system is documented.

The founder's position — a fork is the only realistic way to do customizable white-label apps — survives with one correction that matters on a sales call. **There is one other technical path: server-driven UI.** The app ships a renderer and the server sends layout as data, which makes per-tenant layout data rather than code. Airbnb, Lyft, Spotify and DoorDash all run this in production at scale.

It is excluded here not by physics but by [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]] — it requires the platform to rewrite their app around a layout framework. So the accurate claim is **"a fork is the only path given no write access,"** and no write access is the thing that makes the sale possible. That is a stronger sentence than "there is no other way," and it comes with a good answer attached when a platform engineer raises it: *you could build server-driven UI yourselves, it would take 12–18 months, and you would own it forever.*

It also names an escape hatch that did not previously exist on paper. If fork drift proves unmanageable, the fallback is not abandonment — it is a one-time write into their trunk, rejected on 2026-07-28 for GTM reasons rather than technical ones.

### 4. A drift failure mode nobody had named

Semantic conflicts — changes that merge cleanly and break behaviour — are an unsolved research problem, and they are the named hazard in the fork model. On a purely visual fork they are largely defanged: a clean merge that breaks something breaks it *visually*, which is the bounded blast radius again.

**The real fork hazard for a visual product is different and git will never flag it.** Upstream ships a new screen. Nothing conflicts, because there is nothing to conflict with. The design fork simply has no design for that surface, so a brand-new screen appears in the platform's default styling inside a redesigned app. It is a coverage problem, not a merge problem, and it scales with the platform's release cadence multiplied by the number of design forks. Every feature the platform ships silently degrades the coherence of every design in the fleet until it is redesigned.

### 5. Tenant iteration on the mock resolves two open problems at once

Founder: *"vlm desnt matter, the mock ups are iterated on BY THE USER... so it odesnt have to be perfect."*

This is correct and does more than it appears to. The research's finding on VLM judging is blunt — *"VLM Judges Can Rank but Cannot Score"* — with only 32–34% exact agreement on absolute scoring against human ratings, but r = 0.93 on pairwise ranking of design outputs.

If the tenant iterates until they approve, then the aesthetic accept condition is a human, not a model. Two consequences:

- **The unbounded validator loop (T14) largely dissolves.** The loop terminates on approval.
- **[[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]] moves to the mode that works.** Generate N candidates, rank pairwise, present the best; do not generate one and ask a model whether it is good enough. This is a cheap architecture change and is unambiguously correct.

### 6. The autonomy promise needs one word changed

The tenant iterating on their own mock *is the product* — "customers agentically redesign white-label apps." But [[Recompose_Summary|Recompose_Summary.md]] and the 2026-07-30 pivot describe the trend as toward zero human involvement, which the product contradicts on its face.

The claim that is both true and defensible is **zero *platform* involvement.** [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] means no work lands on the buyer's desk, not that no human is in the loop anywhere. Left as written, it is a contradiction a partner or a buyer catches for free.

### 7. Build-versus-buy gets a sharper filter than "they lack the talent"

The founder's read — these are business-management companies that happen to have apps, not app-first companies, and certainly not agentic-coding companies — is substantially right and is already the argument in [[Research/2026-08-02-incumbent-design-delivery|Research/2026-08-02-incumbent-design-delivery.md]].

The research supplies a better version. Q2 did not build a coding agent; they wired Claude Code into Bedrock and shipped **Q2 Code** in April 2026. Low bar. What made it possible is that **Caliper SDK has existed since 2018** — they already owned the extension architecture, and the AI was the cheap part bolted onto the expensive part. Tellingly, what they built generates *SDK-compliant extensions*, not source modifications: even the platform building this in-house respects the additive boundary.

**So the real build-vs-buy filter is whether a platform already has a mature extension or plugin model.** The fintech four do — Caliper, Banno's Plugin Framework, Backbase's SDK. Subsplash, Passion.io and the church, fitness and creator platforms mostly do not, and building one is the 12–18 month rebuild. This pushes further toward the ICP already chosen and further from the fintech four already deprioritised.

### 8. CodeParrot is not the analogy

Raised as the closest recorded death in the category — YC W23, Figma → production frontend code, shut down July 2025: *"the generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value."*

The founder rejected the comparison and was right. CodeParrot generated new code from a design artifact with no code lineage; productionalize transplants existing, working, known-correct code into a new arrangement. Different problem.

**What does transfer is economic rather than technical.** The pitch is a ratio — close enough at a fraction of the price. Cleanup time attacks the denominator. That is the 4% minor band already in the error budget, and CodeParrot is the record of a company that died of it rather than of correctness.

### 9. Question 1: the category-creation doubt resolves into a call, not an answer

The founder's opening doubt was strong and correctly reasoned: design is priced at $99–$499 standalone, professional services runs 1.19% of revenue at Olo, design has never once been the sole documented driver of a custom build, and attach rate tracks tenant size rather than quality.

The counter that survives is a logical gap rather than a hope. **All of that evidence is about bespoke builds — six-figure, multi-year, staff-an-engineering-team decisions.** Nobody makes one of those for a single reason. It says nothing about whether a tenant pays a fraction of that, at no risk, for a distinctly designed app, because nobody has measured that and no research can.

Two premises the founder stated as fact were corrected against the vault's own numbers: "2% of companies have a branded app" is the Shopify shell-model attach rate and does not describe the chosen ICP, where every tenant already has one; and "design isn't paid for" is true of design-as-a-skin and false of design-as-a-build, which is the comparison target that was deliberately chosen.

### 10. Question 2: the ICP filter never had reachability in it

The August 2 filter selected for N — tenants with their own app — and N correlates almost perfectly with unreachability. Q2, Alkami and Jack Henry are public companies with procurement, vendor risk assessment and 6–18 month cycles, and they are positions three through six on the current target list.

Three things came out of this and none required a decision:

- **The demo does not require their code.** The [[Concepts/Product/Mechanisms/Visual_Mirror|visual mirror]] is feature-free, so it can be built from public material and a redesign produced for any platform on earth without permission.
- **Better than screenshots: their tenants' apps are publicly downloadable.** These are white-label platforms; the product is publicly distributed by definition. Hundreds of Subsplash church apps are installable right now, and church content is the least login-gated in any vertical — which makes Subsplash the most *inspectable* platform in the market, a reason to sort it first that has nothing to do with tenant count.
- **Booking a sales demo under false pretences is a bad trade**, specifically because the plan is to return to that company as a founder within weeks.

---

## Premises

**Locked by this session:**

- **L7.** Net-new feature generation is out of scope. The field's measured brownfield rate is ~65–70% with a human requesting and reviewing every task, and it collapses below 10% on the multi-file changes a real feature requires.
- **L8.** The safety property is **bounded blast radius by output type** — a bad output is ugly, not broken. It is not separability, which Recompose structurally cannot have.
- **L9.** A fork is the only path **given no write access**. Server-driven UI is the alternative and is excluded by [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], not by feasibility.
- **L10.** The aesthetic accept condition is the tenant iterating on the mock. The VLM ranks candidates and catches gross defects; it never scores.
- **L11.** [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] means zero *platform* involvement, not zero human involvement.
- **L12.** The build-vs-buy threat is gated on whether a platform already owns a mature extension SDK, not on whether it can afford an AI budget.

**To test:**

- **T23.** Fork drift, measured. Point the re-derivation at a real, actively-shipping upstream mobile repo for 8–12 weeks and record: clean-merge rate, semantic-regression rate on clean merges, minutes per re-derive, and **how often upstream adds a surface no design covers.** The last one is the failure mode git cannot flag and it has never been measured by anyone.
- **T24.** Does the functional-equivalence diff gate pass on real variants? Restates T11 and raises its priority: it is the strongest claim in the pitch and it is currently an assertion.
- **T25.** Cost per re-derivation, and how it scales. Inference gets cheaper; re-derivation frequency is set by the platform's release train and fork count grows with sales, so this is cost that scales with success.
- **T26.** Does anything catch a widget that is *present but not visible* — zero-height, clipped, occluded, inside a collapsed container? The diff gate passes it and the screen is broken.

---

## Approaches considered

**Extend the mechanism to per-tenant features.** Rejected for the foreseeable future. Inherits the full security surface it currently avoids — API discovery, approved-API scoping, schema validation, auth passthrough, RBAC inheritance, sandbox boundaries, public-vs-private data classification — and moves the failure mode from *ugly* to *security incident*, which is the asymmetry that makes the visual half tractable for one person. Revisit condition recorded in [[Agentic_Code_Generation|Agentic_Code_Generation.md]].

**Server-driven UI instead of a fork.** Rejected. Technically sound and proven at scale, but it requires writing a layout framework into the platform's app, which is the one thing the GTM depends on not doing.

**A one-time write into their trunk (tokenization plus a layout framework).** Not chosen, and now recorded as the **escape hatch** if T23 shows the fork model does not scale. Rejected on 2026-07-28 for GTM reasons rather than technical ones, which means it remains available at the cost of the sale being harder.

**Be the engine underneath a platform's governed extension layer.** Raised from the research's own Stage 5 recommendation and not chosen. It is the position that survives if platforms build the customization layer themselves, and it is a different company. Held as an option, not a plan.

**Keep the design wedge as a foothold for a future feature product.** This is the founder's stated strategic bet — get in on design now, extend to features when models improve, hold a relationship advantage. Recorded honestly with its weakness: Q2 Code indicates that when the capability arrives, the platform builds it, on its own SDK, in the additive shape. A design relationship does not obviously position anyone to win a layer delivered through a mechanism they do not participate in.

---

## Recommended approach

**Hold the visual-only scope, and stop borrowing the safety argument.** Lead with bounded blast radius, which is true and unusual, instead of separability, which the research shows Recompose does not have.

Build order, and only one of these is code:

1. **The functional-equivalence diff gate.** Roughly an afternoon against CombatDen. It converts the strongest claim in the pitch from an assertion into a property a buyer's own security reviewer can check.
2. **Start T23 in the background.** Mostly wall-clock rather than effort, and it runs concurrently with outreach. At the end there is either the strongest technical claim available or the knowledge that the fork model does not scale — which is better learned now than in month six of a customer.
3. **Switch [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]] to pairwise ranking** next time the pipeline is open.

None of it precedes the outreach.

---

## Open questions

- **Who resolves a halt** (2.1c). Unchanged and now sharper: every production system in the field keeps a human at the merge gate, so this is the single answer standing between the autonomy claim and the field's strongest counterexample.
- **How the 4% minor gets swept up** (2.1d). Unchanged, and CodeParrot is now the recorded example of a company that died of exactly this.
- **The error budget denominator** (T15). Per screen, per redesign, or per sync operation. Still unpicked, and T23 will force the choice.
- **Whether the design wedge actually leads anywhere.** The founder's bet is that white-label apps end up per-tenant AI-customized and that arriving early on design confers an advantage. The direction is plausible; the transfer of advantage is not established.
- **Pricing.** Undefined, and T25 now bounds it from below.

---

## The assignment

Unchanged in shape from 2026-07-27 and 2026-08-02, because it has not been executed:

1. **Ten named platforms where every tenant already has an app, with a named human at each.** The exhaustive-list research brief written this session exists to produce the raw list; job postings supply the names. Sort on the shell/no-shell model first, not on tenant count.
2. **On every call, ask the two questions** — how many tenants are live on the branded tier today, and how many branded apps shipped last quarter — plus the one this evidence base most needs: *how many tenants have asked you to redo their app since launch, and what did you tell them.*
3. **Run the live-theming call.** Now with a stronger opener: install their tenants' apps from the App Store, redesign two, and send the video rather than requesting a meeting.

**One video per platform, sent the same day it is made.** A batch of twenty polished ones before the first send is this pattern wearing a costume.

---

## What I noticed about how you think

**You argued back on four specific technical claims and were right on three, and the ones you won have a shape.** CodeParrot, the fork's necessity, the code-review gate, and VLM scoring — in every case the correction was that an argument had been imported from an adjacent company's architecture rather than reasoned from your own constraints. You caught the CodeParrot mismatch faster than the analysis that produced it did, and the reason you could is that you know what productionalize actually consumes as input. That is the same coherence-auditing habit the last session flagged, applied to architecture rather than to market facts, and it is worth more here because the research agent's confident wrong answers are harder to spot than a market claim's.

**You are also now doing it in the right direction.** The August 2 session's corrections all came from research. This session's best corrections came from you, against research. That is a meaningful change in three days.

**The counter-observation is the same one, and it has aged.** This is the ninth reasoning cycle. Between the last session and this one, four days produced two research briefs, one completed research pass, and zero emails — and both sessions ended by agreeing that the ten-name list is the only thing that moves. The research commissioned this session was genuinely worth commissioning; it closed a real question with real numbers and corrected a safety story that had been wrong for a month. It also cost four days, and the finding it delivers about your own position is that *no amount of it can tell you whether anyone will buy.* The most useful sentence in the whole report is the one about CodeParrot: they built it, shipped it, and learned from customers that the output was not good enough. They got that answer. You still cannot.
