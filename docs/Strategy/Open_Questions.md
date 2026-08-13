---
tags: [business, open-questions, validation, risk]
status: live
updated: 2026-08-12
---

# Open Questions

Concepts touched: [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]].

Everything Recompose has not answered. §5 holds what is closed, so nobody re-opens it by accident.

Every entry states the question, why it matters, and what evidence would close it. Source tags in brackets point at the premise, test, or open question in the office hours doc that raised it.

**The demand section leads because it is the only section where nothing has been attempted with an outside party.** The target list exists — [[Research/2026-08-04-company-list-white-label|Research/2026-08-04-company-list-white-label.md]]. No platform on it has been contacted, no human at any of them has been named, and the entire ICP is reasoned rather than validated.

---

## 1. Demand and validation

### 1.1 Does any platform want this? [T1]

No platform has been asked. The origin is a realization while building a white-labeled app — *"I just figured it out it could be useful when i was doing a different idea of building my own white lalbed app for class based gym"* — not a request from a buyer.

**Why it matters:** every other question in this doc is a refinement of a company nobody outside has responded to. Nine months, **seven** strategic phases, zero paying customers, and **no outside party has ever responded to anything built.**

**What closes it:** a platform that keeps a second meeting, or asks what it costs, without being led there. Nothing built closes it.

### 1.2 Is there a named human at any target platform? [assignment #2]

The list half is done and overshot. `Contact_Surface` in the company-list research names a channel, not a person. **No human has been named**, in five consecutive sessions of the assignment saying so.

**The filter is *platforms that already fund per-tenant custom development*** — Banno, Backbase, Tapcart, Trainerize Enterprise, GoodBarber, BuildFire — sorted within that by whether every tenant already has their own app.

**Fintech sorts high on fit and low on reachability.** Banno and Backbase have the strongest custom-development evidence in the research, and banking's resistance to visual differentiation is irrelevant because nothing here asks them to look different. What binds is procurement, vendor risk assessment and 6–18 month cycles — plus the sharpest build-versus-buy exposure, since owning a mature extension SDK is exactly what makes building this in-house cheap.

**Banno is the only platform in both filters** and is the strongest target on the merits. It is also a public company with procurement and 6–18 month cycles, so **sort Tapcart and BuildFire ahead of it** on reachability.

**What closes it:** ten rows, each with a person.

### 1.3 Will the founder run a validation assignment before building more? [carried from 2026-06-02]

The live behavioural risk, not a historical note. The 2026-06-02 validation assignment sat unexecuted for eight weeks while three product surfaces shipped. The founding session treats that as the most economical explanation for the whole CRM arc.

**It has now aged further.** The current assignment has been written identically in **five consecutive sessions** and executed zero times. Two of the last three sessions established, at depth, that directions *not* being pursued would not have worked.

**The one thing that changed:** the founder ended the August 10 session saying the interviews come next rather than the build. That is the first time in five sessions the stated next step was a call.

**What closes it:** a dated record of ten named targets and three calls, completed before the next thing is built. Another build stretch with no outside contact is the falsification.

### 1.4 Does refusing feature requests cost the platform anything? [T31] — **OPENED 2026-08-12**

The whole direction rests on tenant frustration at being told no. **The buyer is the platform**, and tenant frustration is not platform pain until it shows up as churn, a lost deal, or discount pressure.

**Why it matters:** if the answer is "nothing," there is no budget to sell into and the direction is dead. It is the cheapest possible falsification in the vault — one question, one call.

**What closes it:** asking it. *What do tenants ask you to build that you say no to, and what does saying no cost you.*

### 1.5 What do tenants actually request, and how much of it is read-only? [T30] — **OPENED 2026-08-12**

Nobody knows the composition of the refused-request pile. The split that matters is **a view of data the platform already holds** — a dashboard, a report, a filtered list, a calculator — versus **a workflow that writes something.**

**Why it matters:** it decides the accept condition (§2.1), which decides whether one person can build this. A read-only module's worst failure is a wrong-looking screen; a writing module's is wrong data.

**What closes it:** one question per call, and the answer is a ratio rather than a yes or no.

### 1.6 How many refused requests are the same request? [T30b] — **OPENED 2026-08-12**

**A module is for one tenant by construction**, so nothing amortises unless requests repeat.

**Why it matters:** it decides whether the business is pure bespoke (revenue and cost both scale with requests), a growing library (margin improves and the first customer is the most expensive), or a bounded vocabulary (best margin, smallest answerable set). This changes the economics more than anything else that is open.

**What closes it:** asking a platform how much repetition is in its refused pile.

### 1.7 Is the output close enough — and who decides? [T8]

The bar is not parity: *close enough at a fraction of the price.* The comparison target is **a contracted custom-development engagement**.

**Group A is defined by having a named engineering organisation doing this work** — Banno's Custom Development team, Backbase's Services org. They are the champion *and* the opponent, and their objections will be about real things: the security surface, API coupling, and whether generated code is correct inside their auth context.

**What closes it:** a generated module put in front of the person who runs that team.

### 1.8 "Why aren't you just Gigacatalyst?" [OQ9]

Both companies generate per-tenant functionality inside a host SaaS, on the host's APIs, governed by the host's auth. There is no clean separation to point at.

The honest answer has two parts and only one is defensible ground: **they have no mobile frontend**, so an API-composition sandbox suffices for them while a mobile app needs a renderer in the build or in the app; and **they are funded, shipping and live with Series B companies** while this is a direction with nothing built.

**Why it matters:** it is the first question any informed person asks, and the frozen YC application omits them from its competitor answer, which is visible to anyone who checks.

**What closes it:** a written paragraph, prepared rather than improvised. Not research — a decision about what to say.

### 1.9 Should the traction metrics be borrowed, and is anything instrumented? [OQ11]

Gigacatalyst reports adoption rate, day-30 retention, pipeline unblocked, churn prevented, and engineering-hours saved. That is the vocabulary this buyer responds to, and **engineering-hours saved now applies directly** rather than by analogy. **Nothing here is instrumented to produce any of it.**

**What closes it:** picking two and deciding what would have to be logged, before the first customer.

### 1.10 Does CombatDen keep running with real gyms? [OQ4]

Offered in the founding session and never ruled on. A live multi-tenant fleet is a stronger artifact than a static demo — and it is gym sales work, which is a second GTM. **It cannot be split down the middle.**

**What closes it:** a decision, not evidence.

---

## 2. Architecture

### 2.1 What is the accept condition for a generated feature? [T33] — **the load-bearing one**

**This is where the product lives.** There is no cheap conclusive oracle: nothing a human reads at a glance, and no diff that proves correctness. Additive-only is diff-verifiable for *existing* code and says nothing about whether the added thing works.

Four candidates, none chosen:

- **Read-only modules first.** Reads through the platform's authenticated API and presents; never writes. The only candidate whose worst failure is cosmetic. May exclude what tenants most often ask for — that is §1.5.
- **Generated tests through their CI.** Uses infrastructure they trust. Tests written by the agent that wrote the code verify what the agent *believed* it built; they catch regressions, not misunderstood requirements.
- **A bounded module vocabulary.** Primitives — list, form, schedule, notify, report, chart — over endpoints their API already exposes. Each tested once, reused everywhere.
- **Tenant approval on real data.** The tenant is the only party who knows what they meant, and will not exercise the empty state, the concurrent edit, the permission boundary or the five-hundredth row.

**Why it matters:** a promise of unattended operation needs a check the system can fail. **Until it closes, no autonomy claim may be made and no error budget may be quoted.** See [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

**What closes it:** §1.5 supplies the input; then a decision.

### 2.2 How deep do the existing extension surfaces actually go? [T32] — **OPENED 2026-08-12**

The central bet is that Group A platforms already own a surface to write into, which removes the insertion-point ask. **Unverified.** Banno's Plugin Framework hosts HTML/CSS/JS web apps on the *partner's* infrastructure. Tapcart's blocks live inside its own studio. BuildFire's SDK is open-source but its reach is unknown.

**Why it matters:** if none reaches native UI inside an arbitrary existing screen, Group A buys the budget line but not the integration, and the harder sale — the platform adds insertion points, needing engineering-leadership sign-off — becomes the normal one.

**What closes it:** reading their public developer documentation. An afternoon, and it decides which product is being sold.

### 2.3 Compile-time or runtime insertion? — **OPENED 2026-08-12**

Runtime is **server-driven UI**: the app ships a renderer, the server sends layout as data. Proven at Airbnb, Lyft, Spotify and DoorDash. Compile-time means a per-tenant binary.

**Why it matters:** it decides whether per-tenant App Store submission returns as a problem, what the platform has to do to adopt, and how fast a module can change after it ships.

**What closes it:** a decision, informed by 2.2 and by whichever stack the first interested platform runs.

### 2.4 The boundary: auth, identity, tenant scoping and base data — **OPENED 2026-08-12**

**This is the hard part, and it is not greenfield.** A module runs as the tenant's user inside the platform's auth context, reads the platform's base data, and must never see another tenant's. Getting any of it wrong is an incident rather than a bug.

Four sub-problems, all unaddressed: auth and session passthrough; approved-API scoping and public-vs-private data classification; tenant scoping; and schema validation against an API that moves.

**Why it matters:** the greenfield argument covers the module's interior only. The boundary is most of the work and all of the risk, and Gigacatalyst built agentic API discovery as their entire first product to handle exactly this.

**What closes it:** a written design, not a list. Currently a list.

### 2.5 Contract drift [T23]

A module depends on the platform's API and the dependency is **invisible**: a field that keeps its name and changes meaning passes cleanly, and every module built on it is silently wrong indefinitely. There is no conflict, no event, and no oracle.

A **proxy** absorbing upstream API changes is the working answer. It is an anti-corruption layer and it genuinely reduces fan-out. It does not remove the dependency, it cannot see a semantic change, and *"is this a big update"* is an unsolved judgement whose cheap-direction failure does not announce itself.

**What closes it:** a design for what the proxy actually detects, and an honest statement of what it cannot.

### 2.6 Three surfaces, one founder [T35] — **OPENED 2026-08-12**

Module, backend, admin dashboard. A custom feature nobody can configure is dead on arrival, so the admin surface is not optional, and each surface carries its own security surface.

**Why it matters:** whether the work fits one person is an open question rather than an assumption, and the vault has never assessed it.

**What closes it:** a scoped build plan for the first module, boundary included, with the security surface enumerated rather than waved at.

### 2.7 Does the asset pipeline survive contact with a foreign app? [T5]

Unproven. Every artifact to date is `apps/combatden/` or `apps/smoketest/` — both written by the founder, both ends of the contract included.

**Why it matters:** the pipeline is the one thing that already works, and its new job is making generated modules look native inside someone else's app.

**What closes it:** tokenizing a structurally foreign app end to end, aimed at whatever stack an interested party runs.

### 2.8 Which stack, and does it filter the buyer?

Sharper than it was. A module is written in whatever the platform's app is written in. React Native and Flutter are the friendly cases. **Native Swift and Kotlin are the hard ones, and mobile is the worst-supported domain in agentic code generation** — no robust iOS/Swift benchmark, and JS/TS the lowest-scoring language family.

**What closes it:** whichever stack the first interested platform runs.

### 2.9 What job does each subsystem hold?

The asset pipeline's job is settled: it produces the tokens a module renders against. The Flutter and React theme runtimes, the studio and the JSX mock surfaces have no assigned role.

**Why it matters:** unassigned subsystems become dead scaffolding, and worse, quietly steer the architecture toward the shape they were built for.

**What closes it:** an explicit decision per subsystem, taken once the mechanism settles — not before, and not by neglect.

---

## 3. Pricing

### 3.1 What is the price? [T7]

**Pricing is undefined.**

- **The old $100/$300/$500 ladder is dead.** Gym-owner pricing from the CRM prehistory.
- **The $100/month per branded tenant in [[Strategy/YC_Application_F26|YC_Application_F26.md]] does not transfer.** It was priced against *designs*, and a module is not a design.
- **The anchor is a services line.** The reference is a **contracted custom-development engagement** — a platform's engineers building one feature for one tenant. Nobody publishes rates, minimums or timelines; all of it is gated behind sales, which is itself informative.
- **The metering unit is undecided** and §1.6 decides it: per module, per tenant, per platform licence, or a share of what the platform charges for the capability.
- **The floor is unmeasured.** Cost per generated module, including the boundary work, has never been estimated.

**Why it matters:** the pitch is *close enough at a fraction of the price*, and **the ratio is the pitch.** It is meaningless until the fraction has a number.

**What closes it:** a platform stating what a custom build costs it today, in money and in weeks.

### 3.2 Do not reuse any figure from the frozen YC application

[[Strategy/YC_Application_F26|YC_Application_F26.md]] is the record of what was submitted and is not edited. Its $100/month figure, its 20% attach-rate benchmark and the market sizing computed from them were all built on a design product and a per-design unit. **None of it transfers.** Corrections live in that doc's corrections tables.

---

## 4. Delivery

### 4.1 Is the organizational objection real? [T4]

Codex's challenge, live: adoption stalls organizationally, not technically — *"messy design systems, hardcoded one-off screens, asset assumptions, native build quirks, QA ownership, and internal resistance to giving an external system control over production UI."*

There is no architectural answer to it now: a module runs inside their app, under their auth, against their data. Where an extension surface already exists it is small; where it does not, the platform must restructure — and the founding rule says that is a product defect rather than an objection to argue past.

**What closes it:** five platforms agreeing on value, then watching what happens to the first integration.

### 4.2 Who resolves a failure?

Every production system in the field keeps a human at the merge gate — Devin, Copilot CCA, SapFix, and even Uber's Piranha, a deterministic tool that only deletes stale feature flags and still routes its diff to the flag's author.

**Why it matters:** the hardest operational question, and a failure here can be wrong data rather than a wrong-looking screen. If the answer is the platform's staff, then "no manual maintenance" is false.

**What closes it:** decide who owns it, and price it. Recompose resolving it is COGS; the platform resolving it is a broken promise.

### 4.3 Should the operational surface be built before the first call?

Approval states, run history, QA, per-tenant status. Building it first is the comfortable move and is what every prior phase did instead of selling.

**What closes it:** let the first three calls decide it.

### 4.4 Apple Rule 4.2.6 and distribution

Decided by §2.3. Runtime insertion removes it entirely; compile-time brings per-tenant store submission with it. Either way Recompose submits nothing, so it is the platform's problem — **unconfirmed with any platform.**

---

## 5. Closed — do not re-open

### Questions that belong to a mechanism this product does not use

Recorded so nobody re-opens them and nobody mistakes their old answers for current architecture.

- **Does productionalize work?** The approved-mock-in, production-code-out step, and its hazard that the mock has no edge cases. There is no mirror and no productionalize step.
- **What terminates the design validator loop.** No design validator loop.
- **Does the functional-equivalence gate pass on real variants?** The strongest claim in the previous pitch, never built. **Additive-only replaces it** and is weaker in one specific way: it proves nothing existing changed, not that the new thing is right.
- **Does anything catch a widget present but not visible?** A question about a redesign's render tree.
- **The error-budget denominator.** The ~95/4/1 target was never measured and does not transfer. Do not quote it.
- **Does the agent-maintained fork survive upstream churn, and what does re-derivation cost?** There is no fork. **The coupling hazard is §2.5 instead, and it is quieter rather than absent.**
- **How does a branded build reach the platform's release train?** Superseded by §2.3.
- **Screenshot diffing is flaky; how stable is generation across runs?** The second half survives as a property of the asset pipeline; the first is gone.
- **Whether presets are the platform's product or its tenants'.** A design question.
- **"Nested HTML."** Never defined, and now moot — the integration surface is the platform's extension architecture.

### Attach rate and design quality — no longer load-bearing

T19, T20 and T21 asked whether attach rate responds to **design quality**, what the attach rate for a *redesign* is, and whether design drives platform switching. Nothing in the value argument depends on any of them.

The measurements stand and are worth knowing: branded-app attach is 0.1–3% on shell platforms and tracks tenant *size* across a 70× range at a single price. The equivalent live question is §1.4 — does refusing feature requests cost the platform anything.

### Whether the mechanism extends to net-new features — **yes, additively**

The field's brownfield numbers measure an agent *editing* an existing codebase; a module's interior is greenfield and its boundary is integration work. Status is **unevidenced in both directions** rather than contradicted.

**One standing condition is unmet and should stay visible:** scope has been extended before a buyer existed in every prior phase of this project. Three calls with real platforms is the cheapest thing that changes that.

### Whether Recompose writes to the customer's repository — **never to their trunk**

Writes are confined to an extension surface the platform owns and governs. How much sign-off that needs depends on whether such a surface exists — §2.2, and [[Strategy/Product_Boundaries|Product_Boundaries.md]].

### Company name — resolved 2026-07-28

**Recompose.** Still provisional, still explicitly changeable, and **domain and trademark are still unchecked.** The name was chosen because *composition* is the design term for arrangement, which no longer describes what the product does — worth weighing if the name is ever revisited.

### Whether the company's surface is the website — resolved 2026-08-10

**Not pursued.** The per-tenant outcome loop cannot reach statistical significance on small-business sites, the owner does not measure the outcome it optimises, and the approval gate that would make it safe also makes it inert. Two findings were kept: the buyer who pays for site work is the platform, not the tenant; and no supplier in the embedded category ingests transactional data to decide site structure or ships a native mobile app layer. See [[Office_Hours/2026-08-10-19-Office_Hours_Website_Direction_Explored_And_Dropped|Office_Hours/2026-08-10-19-Office_Hours_Website_Direction_Explored_And_Dropped.md]].

---

## Dropped: gym-specific questions not carried forward

Open in the CombatDen prehistory and not Recompose's questions. Recorded as dropped so nobody re-opens them by accident: the $100/$300/$500 gym-owner pricing ladder; the switch-friendly-CRM target list and commitment-to-switch bar; the unlimited-membership beachhead and booking-anchored engagement loop; and the autonomous agent layer for gym CRMs, withdrawn two days after it was written.

The one thing carried out of that period is **behavioural, not strategic**: the pattern in §1.3. It has survived every pivot so far, which is why it is filed under demand rather than under history.
