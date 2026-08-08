---
tags: [business, open-questions, validation, risk]
status: live
updated: 2026-07-28
---

# Open Questions

Concepts touched: [[Integration_Surface]], [[Tier_Unlock_ROI]], [[Full_Visual_Redesign]], [[No_New_Requests_Invariant]], [[Re_Derived_Not_Forked]], [[Closed_Design_To_Production_Loop]], [[Tokenized_Design_System]], Template_Marketplace, [[Shopify_Pattern]].

Everything Recompose has not answered, carried forward from the open questions and named risks in `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md` and `pivots/2026-07-27-11-customization-engine-is-the-company.md`. Gym-specific questions from the CombatDen prehistory are not carried; see the last section for what was dropped and why.

Every entry states the question, why it matters, and what evidence would close it. Source tags in brackets (`T*`, `P*`, `OQ*`) point at the premise, test, or open question in the office hours doc.

**The demand section leads because it is the only section where nothing at all has been attempted.** No platform has been contacted. There is no target list. The entire ICP is reasoned rather than validated.

---

## 1. Demand and validation

### 1.1 Does any platform want this? [T1]

No platform has been asked. The origin is a realization while building a white-labeled app — *"I just figured it out it could be useful when i was doing a different idea of building my own white lalbed app for class based gym"* — not a request from a buyer, and not a personal pain narrative. Everything downstream of that (the buyer profile, the two-sided ROI argument, the wedge) is reasoned from market evidence: published prices for the manual version, the level-1–4 white-label ladder, Gigacatalyst's traction shape.

**Why it matters:** every other question in this doc is a refinement of a company nobody outside has responded to. Eight months, six strategic phases, zero paying customers, and **no outside party has ever responded to anything built.**

**What closes it:** a platform that keeps a second meeting, or asks what it costs, without being led there. Nothing built closes it.

### 1.2 Can a named target platform and a named human at it be produced at all? [T2, assignment #2]

The single biggest hole the founding session found, and it is unclosed. A category is not a target. Assignment item 2 is ten named platforms where **every tenant already has their own app**, with a named human at each — Subsplash, Passion.io, then the fintech four (Q2, Banno, Alkami, Backbase). On those the addressable app count equals the tenant count; on a shared-shell platform it is roughly a hundredth of it ([[Tier_Unlock_ROI]]).

**Why it matters:** nothing else in the company moves until this list exists. It is also cheap — this is a research afternoon, not a project.

**What closes it:** the list, written down, ten rows, each with a person.

### 1.3 Will the founder run a validation assignment before building more? [carried from 2026-06-02]

The live behavioral risk to this phase, not a historical note. The 2026-06-02 validation assignment (define the bar, build the target list, pitch, measure commitment) **sat unexecuted for eight weeks** while rewards productionization, the member app, and Kiosk Mode all shipped. The founding session treats that as the most economical explanation for the whole CRM arc — a founder without conviction in the product does not make the hundredth cold call — and the session's closing observation is that whether this becomes the sixth phase or the last one is decided entirely by whether assignment items 2 and 3 happen **before any more code does.**

**Why it matters:** the energy argument for this pivot is that the engine is the product the founder actually wants. That predicts the pattern breaks. It does not guarantee it, and the same prediction has never been tested.

**What closes it:** a dated record of ten named targets and three live-theming calls, completed before the next feature ships. A second eight-week build stretch with no outside contact is the falsification.

### 1.4 Does live in-call theming produce the reaction? [T3, assignment #3]

The chosen validation instrument: pull a prospect's biggest customers off their own logo wall, theme the example app live in the call, and watch. The claim being demonstrated is **elapsed time** — an artifact sent by email shows the output; live generation shows the clock.

**Why it matters:** it is the only instrument proposed that tests demand and quality in the same motion, and the founder proposed it himself.

**What closes it:** three calls run. A reaction that converts into a next step, or three lukewarm ones.

### 1.5 Is the output close enough to a custom build — and who gets to decide? [T8]

The bar is not parity: *"it deosnt have to clear it, and it likely never will but it has to be clsoe enough to it, wher eit can give very close to the quailty at a fraction of the price, we are not trying to beat actual designers here."* What changed when layout entered scope is the comparison target — a custom build rather than a generic template — not the requirement. The 76 generated themes have never been evaluated against a custom build.

**The half that is not a property of the output:** "close enough" is a judgment a person makes, and which person makes it decides the deal. A head of design would see the gap and be right that it exists; someone reading a delivery time against a queue of waiting tenants may not care.

**That person frequently does not exist.** The client-facing roles at these platforms are Solutions Consultants, Client Implementation Managers, Customer Onboarding Specialists, Community Strategists and marketing designers; Circle's design department is ~4 people who primarily do Circle's own marketing. So the hostile-evaluator risk is small. What replaces it is worse in a quieter way: there is no internal owner whose job improves if the purchase succeeds, so the failure mode is a deal with neither opponent nor advocate, which stalls rather than losing.

**What closes it:** a generated redesign put next to a real custom build for the same brand, judged by someone at a target platform who owns tenant throughput.

### 1.6 Does throughput matter more than beauty to this buyer? [T6, OQ6]

Codex's independent read: this should *"not optimize for beautiful one-off generations… It should optimize for platform onboarding, tenant throughput, review/approval, repeatability, QA."* The current asset optimizes for generation quality — 80 themes — not for operations.

**Why it matters:** if true, the next build is approval states, run history, per-tenant status and QA surfaces, not more generation modalities. It changes what gets built next.

**What closes it:** what the first three prospects ask about unprompted. If the questions are about approval flow, rollback, and per-tenant status rather than about how good the themes look, throughput won.

### 1.6a Does attach rate respond to design quality at all? [T19] — **OPENED 2026-08-02, and it is the largest one**

The whole value argument assumes that a better-looking app moves how many tenants take the branded tier, or what the platform can charge for it. The only measurement that exists says otherwise: on Shopify, mobile-app-builder adoption is **1.73% of Plus stores, 0.10% overall**, and it correlates with **tenant size** across at least a 70× range at a single price. If size is the binding variable, no design improvement changes it.

**Why it matters:** it is upstream of the pricing question, the ICP question and the product roadmap. If attach rate is set by tenant scale, Recompose sells throughput on an existing installed base and nothing else — which is a smaller and different business than "unlock a tier they can't currently sell."

**What closes it:** no amount of further research. A platform that has run both — a shallow branded tier and a genuinely differentiated one — and can say whether the take rate moved. Failing that, the first customer's own before-and-after.

### 1.6b What is the attach rate for a *redesign*, as opposed to a first app? [T20] — **OPENED 2026-08-02**

The measured numbers are for tenants buying their first branded app. Recompose's actual product is a redesign of an app the tenant already has. Nothing measures how many tenants of a no-shell platform (Subsplash, Alkami, Q2) would pay to have theirs redone, or how often.

**Why it matters:** it is the multiplier on every revenue estimate, and it may be a recurring number rather than a one-time conversion.

**What closes it:** ask it on the call — *how many tenants have asked you to redo their app since launch.*

### 1.6c Does design drive platform-to-platform switching? [T21] — **OPENED 2026-08-02**

The lost-deals half of the value argument needs design to influence which platform a tenant picks. Across a dozen documented custom-build cases, design was **never the sole driver** and appears only as a co-driver. The two closest cases — Circle's *"how the platform looks and feels is really important to me"* and Mariana Tek's *"never puts its own branding in front of your clients"* — are vendor testimonials, and both are platform-to-platform switches rather than bespoke builds. That is the only evidence pointing at the mechanism.

**Why it matters:** [[Brand_Is_Product]] has now taken three independent hits (`Research/2026-05-01-ai-brand-competitor-analysis.md:3`, `Research/2026-05-01-ai-brand-competitor-analysis-v2.md:47`, `Build_vs_Buy.md`). Lost deals is the half that survives, and it rests on two testimonials.

**What closes it:** a platform naming a deal it lost on brand, or win/loss notes.

### 1.6d Which app architecture is targeted — per-tenant binary or container? [T22] — **OPENED 2026-08-02**

Subsplash runs both simultaneously: standalone apps under each church's own developer account, and "The Church App," a single container housing thousands of tenants under one listing. Planning Center, Tithe.ly and Pushpay do the same. A container tenant has no per-tenant binary.

**Why it matters:** it changes what ships. A container tenant's redesign is runtime theming inside a shared shell, which may be easier, but the brand is capped by the container. It also breaks any app-store census as a measurement method.

**What closes it:** a decision, once a target platform is named and its architecture is known.

### 1.7 "Why isn't visual just Gigacatalyst's next feature?" [OQ9]

Unanswered. Gigacatalyst (YC Spring 2026) already parses the host's **design system** so their generated apps look native. Reading a design system to conform to it is genuinely different from generating a new one, so the features-versus-visuals separation holds — but they have built plumbing adjacent to this, and anyone who knows them will ask.

**Why it matters:** it is the one competitive question with a specific, funded, same-batch-adjacent name attached. Being surprised by it in a partner interview is worse than the answer being imperfect.

**What closes it:** a written one-paragraph answer, prepared rather than improvised. Not research — a decision about what to say.

### 1.8 Should the traction metrics be borrowed, and is anything instrumented to produce them? [OQ11]

Gigacatalyst reports adoption rate, day-30 retention, pipeline unblocked, churn prevented, and engineering-hours saved. That is the metric vocabulary this buyer responds to. **Nothing here is currently instrumented to produce any of it.**

**What closes it:** picking two of those metrics and deciding what would have to be logged to produce them, before the first customer rather than after.

### 1.9 Does CombatDen keep running with real gyms? [OQ4]

Offered in the founding session and not ruled on. `P5` makes CombatDen the reference implementation and demo canvas. A live multi-tenant fleet with real per-tenant themes is a materially stronger artifact than a static demo — for a platform buyer and for a YC partner — but it is also gym sales work, which is the thing the pivot moved away from.

**Why it matters:** it is the only path to real per-tenant usage data, and it directly contradicts the reason for the pivot. It cannot be split down the middle without becoming two GTMs again.

**What closes it:** a decision, not evidence. Nobody is going to hand this one an answer.

---

## 2. Architecture

### 2.1 Does productionalize work? [T13] — the load-bearing one

**This is where the product lives.** Approved visual mock in, production code out, [[No_New_Requests_Invariant|invariant]] preserved. It is the only step that must carry the invariant, the only translation whose output ships, and the one with no free oracle.

The specific hazard is that **the mock has no edge cases.** By design it has no features, no logic, no state — which is exactly what makes it cheap to generate and cheap to iterate on. It also means it does not know a list is paginated, a name can be 47 characters, or a screen has loading, empty, error and overflow states. The design agent therefore produces layouts that are correct against *ideal* data, and productionalize has to reconcile that against production code which is mostly edge cases.

Two mitigations proposed in the 2026-07-28 session, neither built:
- **Mock every state, not just the happy path.** Mocking is the mirror's job — tokenization only tokenizes assets. If the mirror generates each screen's empty/loading/error/long-string/overflow variants rather than one ideal render, the design agent designs against realistic variance and productionalize stops being a reconciliation problem.
- **Screenshot-diff the production build against the approved mock.** Flutter Web is canvas-painted and pixel-identical to mobile (2026-05-25), so the same oracle applies on both sides and the mirror's fidelity becomes measured rather than assumed.

**What closes it:** run productionalize by hand on one real CombatDen screen and count what breaks. An afternoon, and it is the single most informative thing available to build right now.

### 2.1a What terminates the design validator loop? [T14]

Screenshots give an **accept condition** where there previously was none — this closes the older "layout has no deterministic accept condition" risk, which is now in §5. They do not give a **stopping condition**. "Loops with the design agent until accepted" is unbounded, and unbounded loops are unbounded cost inside a fixed price.

**What closes it:** measure whether a VLM's screenshot judgement correlates with the founder's own on a set of generated variants, then set an iteration cap and see what fraction of runs hit it.

### 2.1b What unit is the error budget measured in? [T15]

The stated bar is roughly **95% clean, 4% minor error, 1% significant failure** — a **target, not a measurement.** But 95/4/1 per screen, per tenant-redesign, or per sync operation differ by orders of magnitude in resulting workload.

What makes the budget acceptable is settled and is not this question: the pipeline **halts rather than ships**, so a significant failure is a stall and never reaches the branch (`pivots/2026-07-30-22-autonomous-is-the-promise.md`). The denominator is what remains open.

**Why it matters:** the denominator sets how often the halt path fires, and the halt path is the whole basis of the budget. A rate that is fine per screen is unworkable per sync operation.

**What closes it:** pick the denominator, then instrument it from the very first customer.

### 2.1c Who resolves a halt? — **OPENED 2026-07-30**

The autonomous promise says nothing lands on the platform's desk, and the halt mechanism is what makes the error budget defensible. But a halted design has to be resolved by somebody, and the fleet surface already models this as a **Needs Human Help** state.

Founder, 2026-07-30: *"likely the platform staff but maybe we will have an FDE that just goes and fixes error — but the problem with this is the lack of domain knowledge."*

**Why it matters:** this is the one question that can falsify the closing claim of the demo. If halts are resolved by the platform's staff, then *"essentially no manual integration and maintenance for a white-label platform"* is false, and the autonomous promise is autonomous only until it isn't. An FDE keeps the claim true and moves the cost onto Recompose — but an FDE lacks domain knowledge of an app they did not write, which is the same objection that makes the mirror unproven on a foreign app (§2.3).

**What closes it:** decide who owns the halt queue, and price it. A halt resolved by Recompose is COGS; a halt resolved by the platform is a broken promise.

### 2.1d How does the 4% minor get swept up? — **OPENED 2026-07-30**

The minor band is cosmetic by definition — annoying rather than breaking — and unlike the 1% it **does reach production**. Nothing currently catches it.

**Why it matters:** the halt path only defends against significant failures. A steady trickle of small visual defects into a hundred branded apps is the failure mode that erodes the product quietly rather than loudly, and it is invisible to the accept condition that makes the rest of the budget safe.

**What closes it:** a scheduled code review was floated as a candidate and is not a decision. Whatever it is has to run without a human, or the autonomous promise absorbs another exception.

### 2.2 Does the functional-equivalence gate actually pass on real variants? [T11]

[[No_New_Requests_Invariant]] is the safety architecture: a redesign changes **arrangement only** — no screen merged or split, no functionality added or removed, the API surface provably identical. It is a strong claim *because* it is checkable by the customer's own engineers. **It has never been checked.**

**Why it matters:** it is the answer to "we don't want an external system driving our production UI," and it is a strictly tighter constraint than Gigacatalyst operates under. Promising it before building the gate would make it an assertion rather than a property.

**What closes it:** build the diff gate against the existing CombatDen app — diff the API calls a generated variant makes against the baseline, fail the build on any addition — and run it on real variants before it is ever promised to a customer.

### 2.3 Does app-agnosticism survive contact with a foreign app? [T5]

The engine is app-agnostic by construction: every app is one `apps/<app_id>/` folder and the pipeline knows nothing about any specific app. That has only ever been exercised on `apps/combatden/` and `apps/smoketest/` — both written by the founder, both ends of the contract included.

**Why it matters:** the core claim of the [[Closed_Design_To_Production_Loop]] is "point it at a different app and it customizes that app." Two self-authored apps do not prove it. This is also why the Theme Factory demo, however good, proves nothing new — it renders an app whose [[Tokenized_Design_System|tokenization]] was written by the same person who wrote the pipeline.

**What closes it:** the Second Shell — tokenize a structurally foreign app end to end. Deliberately sequenced *after* a real call, aimed at whatever stack an interested party actually runs.

### 2.4 How does a tenant's redesign stay current, and how does output reach the customer? — **RESOLVED 2026-07-28**

Both of these — the old 2.4 and 2.5 — collapsed into one answer: **Recompose never writes to the platform's trunk.**

Two fork layers, both kept current by an agent. A **shared tokenized fork** of the platform's app is Recompose's base, re-derived against their main as they ship. Each **design fork** — one per design, not per tenant — is re-derived against that base. Changes land on **`uat`**, the platform's own branch that is ahead of `main`, never straight to production. A re-derive the agent cannot complete halts rather than landing unverified. The platform grants read access; that is the entire integration.

The [[Re_Derived_Not_Forked]] principle is satisfied in a way its name does not describe — divergence exists in the git sense, but nothing in it is hand-maintained, so it never accumulates as human work. The trade is that the maintenance burden moves to Recompose permanently, and absorbing it agentically is what [[Autonomous_Operation|the autonomous promise]] claims.

**Rejected in the same decision: the layout enum** — the option the founder rated highest as recently as 2026-07-27. It requires writing generated layout code into their trunk, which is incompatible with never touching it. Founder: *"just touching and maintaining their production code sounds like a mess. Agentic separate forks you essentially don't have to think about unless there is an error is better."*

See `pivots/2026-07-28-01-agentic-editing-all-in.md`.

### 2.5 How does a branded build reach the platform's release train? [new, 2026-07-28]

Created by the resolution above. If the source of truth for a tenant's design is a Recompose fork rather than the platform's repo, then the branded binary is built from our fork — so something has to connect it back into their pipeline. Either they build from our artifact, or we hand them builds.

**Mostly closed 2026-07-28, as implementation rather than strategy.** Binaries scale with tenants and designs scale with variety, and those are independent numbers — so per-design layout adds no new distribution overhead to a platform already shipping per-tenant binaries, and Apple 4.2.6 stays their problem because Recompose submits nothing. What remains is the literal handoff: the platform either builds from our fork or takes an artifact. The founder rates this the easy part and it is not a direction question.

**Why it matters:** *"we never touch your source"* is true and is the strongest thing in the integration story. *"We're not in your pipeline"* is not true, because the app has to ship from somewhere. A platform engineer will ask this first, and it should have an answer before a call rather than be discovered on one.

**What closes it:** one paragraph naming who runs the build and where the artifact crosses over. The founder rates this the easy part — *"that's the easy part in all honesty, the real problem is getting them to trust it"* — which is likely right, but easy and answered are different states.

### 2.6 What does "nested html" mean concretely? [OQ1, assignment #4]

Raised by the founder as a candidate [[Integration_Surface]] alongside the SDK and API. Read provisionally as embeddable web surfaces a platform drops in — an iframe-able theme picker or editor, webview components — **but that is inference, not a statement.** It is a materially different engineering commitment from an SDK plus an API.

**What closes it:** one paragraph naming the surface, who embeds it, and what it replaces. Needs to exist before the phrase enters any roadmap.

### 2.7 Is the stack an ICP filter? [OQ3] — **narrowed 2026-07-28**

It used to gate the whole product: the 2026-05-25 session tied live preview to stacks that compile to web, which would have restricted the ICP to Flutter and React Native.

**The JSX visual mirror dissolves that for the design half.** Any stack can be mirrored into JSX, so preview and design no longer care what the production app is written in.

What survives is narrower and later: **production-side validation**. Screenshot-diffing the shipped app against the approved mock requires the real app to render somewhere. Flutter Web gives that free; native Swift or Kotlin would need a simulator. So the constraint is now a validation-tooling problem attached to one step at the end, not a boundary on who can be sold to.

**What closes it:** whichever stack the first interested platform runs, plus a decision on simulator-based validation if that stack is native.

### 2.8 How stable is generation across runs? [T12]

Distinct from 2.1 — that asks whether output is *good*, this asks whether it is *repeatable*. Cheap to check: re-run an existing brand brief against the current CombatDen app and diff the result.

**Why it matters:** it went up in priority on 2026-07-28. Under the fork model every upstream change re-derives designs continuously, so run-to-run instability is no longer a hypothetical concern about a regeneration model that might not be chosen — it is a property of the shipping architecture.

**What closes it:** the diff. An afternoon.

### 2.9 Does the agent-maintained fork survive real upstream churn? [T18]

The cost of never touching their trunk is that no human who understands a change is in the loop when it is re-reconciled. A one-time tokenization PR into their main would have left tokens in code their own devs maintain naturally. An external fork means our agent re-reconciles against every structural change they make, forever.

**Why it matters:** this is the accepted price of the core principle, and it is the failure mode that only appears over months rather than in a demo. Drift here is quiet.

**What closes it:** running the fork against a real upstream repo with real churn for a sustained period. Not testable in an afternoon, which is exactly why it should be named now.

---

## 3. Pricing

### 3.1 What is the price? [T7, OQ2]

**Pricing is undefined.** It has never been decided for this ICP, and nothing in the vault should be read as a pricing decision.

What is known rather than decided:

- **The old $100/$300/$500 ladder is dead.** It was gym-owner pricing from the CRM prehistory and does not transfer to a platform buyer.
- **The anchor moved.** Because the product now replaces a designer *and* the front-end engineer who implements the design, the reference is a **services** line item — the $10–50k / 4–12 week custom build — not a software line item. That is roughly an order of magnitude higher than the theming budget it used to be compared against.
- **The metering unit is undecided**: per branded tenant, per seat, platform licence, or revenue share on the premium tier the platform unlocks. The [[Tier_Unlock_ROI]] framing suggests pricing tied to what the tier earns them, but nothing is decided.
- **No comparable exists in the nearest analog.** Gigacatalyst publishes no pricing.

**Why it matters more than it first appeared:** the pitch is *"close enough at a fraction of the price."* **The ratio is the pitch, and it is meaningless until the fraction has a number.** Pricing is not a later problem; it is part of the value claim.

**What closes it:** a real platform stating what their design tier earns them and what the delivery costs them. Until then, any number is a placeholder.

### 3.2 The $100/tenant figure in the YC application is a working number, not a decision

`YC_Application_F26.md` answer 8 states a plan to charge platforms $100/month per customer running one of our designs, and sizes the market off it. The doc's own notes are explicit about the status: $100 is the **platform's COGS, not the end price**, positioned at the top of the defensible range, holding only if they price the tier at $300+; it is to be defended as *"the price at which the platform still keeps 70% on a tier they currently cannot scale,"* **never as a final number**. The 20% premium-tier attach rate underneath it is a generic white-label SaaS benchmark. Measured, it is **0.1–1.73%** on shell-model platforms (`Research/2026-08-02-attach-rate.md`), so the market size computed from it is wrong for any platform that sells a shared shell — and does not apply at all to a no-shell platform like Subsplash, where the open number is the redesign rate (T20).

**What closes it:** a platform giving its real attach rate and its real tier price. Both numbers exist inside these companies; neither is public.

### 3.3 Two fields of the application disagree on the discount

The founder video says the customer pays **90% less** than the industry charges. Answer 8 prices this at $100/month to the platform, marked up and sold at $300–500. Against $1,000+/month that is 50–70% cheaper, not 90%.

**Why it matters:** it is a precise number volunteered where none was required, in a field that is still undefined — the same failure mode as the stale Mighty Pro price and the colour-determinism claim. Two fields of one application contradicting each other is the kind of thing a partner catches.

**What closes it:** pick one claim and hold it everywhere, or drop the percentage entirely until 3.1 is answered.

---

## 4. Delivery

### 4.1 Is the organizational objection real? [T4]

Codex's challenge, raised independently of Claude's and stronger than it: adoption stalls **organizationally**, not technically — *"messy design systems, hardcoded one-off screens, asset assumptions, native build quirks, QA ownership, and internal resistance to giving an external system control over production UI."*

Its own falsification test, kept verbatim because it is the sharpest one in the vault: *"5 real white-label SaaS platforms agree the value prop, but the first integration takes weeks, touches many screens, needs engineering refactors, or stalls in security/QA/app-store/build-process concerns. If that happens, tokenization was the product, not just onboarding."*

**Why it matters:** the answer to the technical half is [[Integration_Surface]] — adopt the engine without changing your architecture. The organizational half is not answered by architecture and remains live.

**What closes it:** five platforms agreeing on value, then watching what happens to the first integration.

### 4.2 How long does the tokenization pass take? [T9, restated 2026-07-28]

**The original question is moot.** It asked whether integration could beat Gigacatalyst's public ~2 days to install and ~2 weeks to full platform integration. There is no longer an installation step to measure — the platform grants read access and Recompose forks ([[Never_Touch_Their_Code]]), so their benchmark measures something this product does not do.

What survives is narrower and entirely on our side of the line: **how long the forward-deployed tokenization pass takes, and how fast it compresses.** That is the only labor left in onboarding, it is paid work rather than friction the customer absorbs, and compressing it is the stated roadmap priority.

**What closes it:** the first real tokenization of a foreign codebase, timed. Note this is the same unmeasured thing as T16 — nothing has been tokenized that the founder did not write.

### 4.3 Should the operational surface be built before the first call? [OQ6]

Approval states, run history, QA, per-tenant status. This is the build-sequencing half of 1.6.

**Why it matters:** building it first is the comfortable move and resembles the last eight weeks. Not building it risks arriving at a serious conversation with a generator rather than a platform.

**What closes it:** 1.6. Let the first three calls decide it.

### 4.4 Does the curated preset model transfer to this ICP? [OQ7]

The founder named *"a very broad preset themes"* as part of the value, and pre-generated presets and mix-and-match theme sets are now the **demo surface** rather than the architecture. What is unexamined: whether presets are the **platform's** product (a library the platform curates and sells) or the **tenants'** product (a starting point each tenant picks from). Those are different products with different owners.

**Why it matters:** the [[Shopify_Pattern]] read — ~98.5% of merchants use stock themes — says curated-set-plus-brand-overlay is the shape buyers actually want. Which side of the platform boundary that set lives on decides who reviews it and who is accountable for it.

**What closes it:** asking a platform whether they would want to own the preset library or hand it to tenants.

### 4.5 Apple Rule 4.2.6 and distribution [OQ8]

Probably stops being this product's problem under the platform ICP, since platform customers already ship apps. **Probably is not confirmed.** The old distribution doc stayed in the CombatDen vault (per-customer developer accounts, CRM prehistory); a Recompose equivalent should be written only once this is confirmed.

**What closes it:** confirming with one platform how they currently ship per-tenant apps, then rewriting the doc.

---

## 5. Resolved

### Company name — resolved 2026-07-28

Open Question 5 (*"Company and product name. Nothing chosen."*) is **closed: Recompose.** Forced by drafting the founder video, which needed a name to say out loud. *Composition* is the design term for how elements are arranged on a screen, so re-compose names the arrangement-only invariant directly. Rejected: Overhaul + a second word (defaults to car repair), Repackage (the everyday meaning is the exact dismissal the pivot spends a page rejecting), Remix / Retool / Render (occupied by large dev companies), Rendition (US association is extraordinary rendition).

**Residual, still open:** the name is **provisional and explicitly changeable**, and **domain and trademark are unchecked.**

### Where the full-redesign scope stops — resolved 2026-07-27

Open Question 10, resolved in the founding session. **Layout is in scope; information architecture is not.** Arrangement only: no screens merged or split, no functionality added or removed. That is the sentence to hand an engineering team.

A corollary was retired with it: because no component crosses a screen boundary, the client-side role-gating residual (a role-conditional component surfacing where it should not) cannot occur.

### How layout quality is judged — resolved 2026-07-28

T10, the risk the founding pivot called its largest. **Screenshots are the accept condition.** Render the design and judge the image. Not deterministic the way WCAG is for colour, and not claimed to be — but an oracle where there was none, and the reason the JSX visual mirror earns its cost independently of preview.

What replaced it is narrower and lives in 2.1a: an accept condition is not a *stopping* condition, and the validator loop still has no bound.

### How structural variation is produced — resolved 2026-07-28

**Not by presets or enums.** Tested and rejected: a bounded option set reproduces the platform's original design language however many options it exposes, because the options are drawn from that language. Founder: *"it's always going to be bounded by the design language originally... if it sticks to it it'll cease to be truly unique."*

Replaced by free agentic editing bounded only by the arrangement-only invariant. Any future proposal to constrain layout by classification or a template set is re-opening a closed question and has to beat that test result.

### Whether Recompose writes to the customer's repository — resolved 2026-07-28

**It does not, ever.** This is now a core principle rather than an implementation choice, and it collapsed the old 2.4 and 2.5 into a single answer. Two agent-maintained fork layers, changes landing on the `uat` branch, platform grants read access only.

It killed the layout enum, which the founder had rated highest a day earlier, and it removed the largest named adoption blocker in the vault. The new question it created is 2.5.

---

## Dropped: gym-specific questions not carried forward

These were open in the CombatDen prehistory and are not Recompose's questions. They are recorded as dropped so nobody re-opens them by accident:

- The $100/$300/$500 gym-owner pricing ladder and the ROI math underneath it.
- The switch-friendly-CRM target list, the migration-friction workarounds, and the commitment-to-switch validation bar.
- The unlimited-membership beachhead constraint and the booking-anchored engagement loop.
- The autonomous agent layer for gym CRMs, withdrawn by the founder two days after it was written.

The one thing carried out of that period is **behavioral, not strategic**: the pattern in 1.3. It survived every pivot so far, which is why it is filed under demand rather than under history.
