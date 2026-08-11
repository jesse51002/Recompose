# Office Hours: The Modular Feature System, and the Extension Boundary

**Date:** 2026-08-10
**Status:** OPEN — a direction is leaned toward, nothing is decided
**Mode:** Startup — idea-phase diagnostic on a proposal that reopens a route closed six days earlier

**Builds on:** [[Office_Hours/2026-08-04-00-Office_Hours_Agentic_Code_Generation_And_The_Feature_Route|Office_Hours/2026-08-04-00-Office_Hours_Agentic_Code_Generation_And_The_Feature_Route.md]], [[Office_Hours/2026-08-10-19-Office_Hours_Website_Direction_Explored_And_Dropped|Office_Hours/2026-08-10-19-Office_Hours_Website_Direction_Explored_And_Dropped.md]], [[Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge|Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge.md]]

Concepts touched: [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Visual_Mirror|Visual_Mirror]], [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]].

> Six days after the feature route was closed on measured numbers, it is reopened on a distinction the numbers never covered: a module dropped into a defined slot is greenfield work, and greenfield is the one thing this field is good at. The session did not decide the direction. What it produced is a sharper one — the buyer moved to platforms that already pay for custom development, and for those platforms the hardest part of the proposal, insertion points, largely already exists. That trade buys the industry's standard safety story and spends both of this product's core principles, and it walks into the one threat the vault had already pre-registered. **No pivot doc: nothing was decided, and no strategy doc may be updated until one is.**

---

## Problem statement

The founder proposed replacing the visual product with a modular feature system: insertable modules generated per tenant, loaded at compile time or at runtime, with theming reduced to tokenization only — no layout, no animation. The platform makes changes to its own codebase, but only enough to allow module insertion. No fork. A proxy absorbs backend API changes so small upstream changes do not cascade.

The reason given: features are what move the needle and where the frustration in white-label mobile apps actually lives.

This directly reopens **L7**, locked on 2026-08-04: *net-new feature generation is out of scope.* Three questions follow.

1. Does the evidence that closed L7 actually cover what is being proposed?
2. If the product needs the platform to modify its own app, who says yes to that — and does anyone?
3. If features replace arrangement-only, what is the safety property, and what is the accept condition?

Question 1 has a clear answer. Question 2 moved the buyer. Question 3 is unresolved and is the largest gap this session leaves open.

---

## What carries from prior sessions

Untouched, because nothing was decided:

- The live idea. [[pivots/2026-07-27-11-customization-engine-is-the-company|The founding pivot]] stands. [[Strategy/Product_Boundaries|Product_Boundaries.md]] stands, both core principles intact.
- Zero customers, no named target platform, pricing undefined. Nobody outside has responded to anything.
- The assignment — ten named platforms, a named human at each, one redesign video per platform — unexecuted, now for the fifth session running.

Carried in and used throughout: **L7** (feature route closed), **L8** (bounded blast radius by output type), **L9** (server-driven UI excluded by principle, not feasibility), **L10** (the tenant iterating is the accept condition), **L12** (build-vs-buy gated on owning a mature extension SDK), and the [[Research/2026-08-02-features-vs-design|August 2 features-vs-design research]].

**One thing changed that is not a finding.** The founder stated, unprompted, that the interviews happen immediately after this session and that the session's job is to produce a position to carry into them. That is the first time in five sessions the step after the reasoning is a call rather than a build.

---

## What this session changed

### 1. The proposal already has names in the vault, and using them is worth real money on a call

Two of them, and both are load-bearing:

**Insertion points are the additive/extension boundary.** [[Strategy/Agentic_Code_Generation|Agentic_Code_Generation.md]] records it as *the field's universal safety story* — Salesforce metadata, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper SDK, Banno's Plugin Framework and Gigacatalyst converged on it independently, and [[Research/2026-08-04-mobile-app-code-gen|the mobile code-gen research]] answers the load-bearing question "yes, overwhelmingly, high confidence." It is also the exact property the August 4 session concluded Recompose **structurally cannot have** while its output modifies existing screens.

**The runtime variant is server-driven UI**, which the founder identified correctly by naming Airbnb. **L9** already holds it: *a fork is the only path given no write access; server-driven UI is the alternative and is excluded by [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], not by feasibility.* Proven at Airbnb, Lyft, Spotify and DoorDash.

So the proposal is not a new architecture. It is the adoption of the industry-standard one, purchased by dropping a rule the vault had explicitly recorded as the only thing excluding it.

### 2. L7 reopens on a distinction the evidence never covered, and the founder is right about it

Every number that closed L7 measures an agent **editing a large, existing, human-written codebase**: ~67% merge rate with a human requesting every task, below 10% once a patch touches three or more files, repos over 500 files rarely above 5%, JavaScript and TypeScript the lowest-scoring language family.

A module generated into a defined slot is **greenfield**, and greenfield generation is the one capability the field has actually shipped — v0, Lovable, Bolt, Base44, a0.dev, Rork, Vibecode, FlutterFlow AI. L7's evidence base does not describe this task.

That is a legitimate reopening. It is not a measurement: nobody has measured autonomous greenfield module generation into a third-party extension surface either. The claim moves from *contradicted by evidence* to *unevidenced in both directions*, which is a real upgrade and not a proof.

### 3. The largest technical unknown in the company disappears

**T23 dies with the fork.** No drift rate to measure, no semantic-conflict hazard, no divergence tax, and — most valuably — no **undesigned-surface problem**, the failure git can never flag, where upstream ships a new screen and it appears in default styling inside a redesigned app. [[Strategy/Agentic_Code_Generation|Agentic_Code_Generation.md]] lists five distinct fork hazards and calls the absence of precedent "the largest technical unknown in the company." An additive module system has none of them.

This is the strongest technical argument for the direction and it was not raised by either party during the session's framing. It should be.

### 4. The money is where the SDK is, and the SDK is the threat

[[Research/2026-08-02-features-vs-design|The August 2 research]] splits nineteen platforms into two groups that are nearly disjoint on every other axis.

**Group B — the refusers.** Thirteen platforms have no path by which a tenant gets net-new functionality at any price. Subsplash, Passion.io, Circle, Mighty Networks, Kajabi, Uscreen. Kajabi says it outright. These are reachable and they are the current ICP.

**Group A — the ones already paying.** Banno's named "Custom Development team" on an additional contract; Backbase's code-writing Services organization; Tapcart staffing an "Engineer, Solutions & Services" at $120–140k to build custom blocks for clients; Trainerize Enterprise's custom-built widgets; GoodBarber and BuildFire selling custom development to their reseller base.

**The founder chose Group A.** The economic argument is the strongest available and it had not been written down anywhere in the vault:

> **The design-service P&L line does not exist. The custom-development P&L line does.**

[[Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge|The August 2 session]] killed cost reduction as a design pitch — Vagaro charges $499 flat, ABC Trainerize $99–169 one-time, professional services runs 1.19% of revenue at Olo and 2.9% at Toast. There is not enough cost to save. Feature work at the platforms that do it is a named team on a contracted engagement with pricing gated behind sales. Same buyer, and the feature side is where the dollars are.

**The cost of choosing Group A is that it is defined by owning the thing that makes buying unnecessary.** **L12:** the build-vs-buy threat is gated on whether a platform already owns a mature extension SDK. Q2 did not build a coding agent — they wired Claude Code into Bedrock and shipped **Q2 Code** in April 2026, and could only do it because Caliper SDK had existed since 2018. *The AI was the cheap part bolted onto the expensive part.* Every Group A platform owns the expensive part.

### 5. For Group A the insertion points already exist, which removes the hardest ask in the proposal

This is the most useful consequence of the buyer choice and it changes the architecture.

Banno ships the Digital Toolkit and Plugin Framework. Backbase ships an SDK. Tapcart ships App Studio, a CLI, Global Components and Configurable Blocks. BuildFire open-sourced buildfire.js under MIT. GoodBarber exposes custom code and APIs.

So the sentence *"modify your production app to accept our slots"* — which requires engineering-leadership sign-off and is precisely the organizational cost [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]] exists to route around — mostly evaporates for the group that was chosen. The product becomes **a generator into an extension surface the platform already owns and maintains**, and the safety story is theirs rather than one Recompose has to invent.

It also produces a convergence worth noting: **Banno/Jack Henry is the only platform sitting in both filters at once** — the [[pivots/2026-08-02-23-icp-filter-moves-to-tenants-who-already-have-apps|August 2 ICP filter]] (every tenant already has an app) and Group A. It was ranked third-to-sixth on the target list and deprioritised purely on reachability.

**This has not been verified and must be, before any call.** Banno's Plugin Framework hosts HTML/CSS/JS web apps on the *partner's* infrastructure. Tapcart's blocks live inside its own studio. If no existing surface reaches native UI inside an arbitrary existing screen, Group A's advantage is only the budget line, and the insertion-point ask returns in full. → **T32.**

### 6. The differentiator against Q2 Code is removing the engineer, not accelerating one

Q2 Code is a governed development environment. Its users are Q2's own engineers and certified partner developers, building SDK-compliant extensions. It makes a developer faster.

The founder's chosen position is a **tenant-facing loop**: a non-technical tenant describes what they need, iterates, and it ships, with no developer anywhere in the loop. Nobody has shipped that. It is a category difference rather than a prompting difference, and it inherits the strongest mechanism the vault owns — **L10**, where the human iterating until they approve is the accept condition, which is what dissolved the unbounded validator loop on the visual side.

It also inherits the corresponding hazard: *tenant describes what they want* is unbounded scope, and an accept condition cannot close on unbounded scope. See finding 8.

### 7. The structural-preset result does not transfer, and importing it would be an error

[[pivots/2026-07-28-01-agentic-editing-all-in|The July 28 pivot]] killed bounded structural presets on an empirical finding: a bounded option set reproduces the platform's original design language however many options it exposes, which is a reskin.

**That result holds because design's value is its unboundedness.** A feature's value is that it works. A bounded vocabulary of feature primitives limits what is buildable; it does not collapse into sameness. The finding that forced free agentic editing on the design side does not force it here, and the vault's own architecture split — deterministic through the [[Concepts/Product/Mechanisms/Orchestrator|orchestration layer]] wherever a slot inventory can express the change, agentic only where none can — argues the opposite way for features.

### 8. The accept condition is the load-bearing gap, and it is unanswered

The visual product has two things a feature product does not, and both are cheap and conclusive:

- **A screenshot oracle.** The tenant looks and says yes.
- **A diff-verifiable invariant.** The platform's own engineers confirm no API call was added or removed.

Neither survives. A tenant looking at a module proves it *looks* right; no diff proves a booking module books correctly. And **L8 — bounded blast radius by output type — stops being true the moment a module writes to a database.** That sentence is what made halting sufficient, and halting-rather-than-shipping is the entire reason [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] was defensible.

Four candidates were put to the founder. **The answer was "not sure," which is the correct answer at this stage and was left open rather than manufactured.**

- **Read-only modules first.** A module reads through the platform's existing authenticated API and presents; it never writes. The only candidate that *restores* the asymmetry rather than replacing it, and the only one shippable by one person. Cost: it may exclude the thing tenants most often ask for. → **T30.**
- **Generated tests plus their CI.** Uses infrastructure they already trust, but tests written by the agent that wrote the code verify what the agent *believed* it built. Catches regressions, not misunderstood requirements — which is the actual failure mode for a described feature.
- **A bounded module vocabulary.** Primitives — list, form, schedule, notify, report, chart — wired to endpoints their API already exposes; the agent arranges and configures but never authors novel logic. Each primitive is tested once and reused everywhere. This is the vault's own deterministic/agentic split applied to features.
- **Tenant approves a working preview on real data.** Most faithful to L10, and the tenant is the only party who knows what they meant. But a non-technical owner clicking a happy path will not exercise the empty state, the concurrent edit, the permission boundary or the five-hundredth row.

**Until this is answered there is no halt condition, and the autonomy claim cannot be made.**

### 9. What the direction costs, stated plainly

- **Both core principles.** *Arrangement only* dies by definition. *We never touch their code* softens to writing into an extension surface. [[Strategy/Product_Boundaries|Product_Boundaries.md]] says neither is tradeable for a feature, a deal or a demo. Trading them is allowed — boundaries change when a pivot changes them — but a pivot doc must come first.
- **The one-person asymmetry.** *"A bad output for them is a security incident, a bad output here is ugly. That asymmetry is the reason the visual half is tractable for one person."* Custom requests, a custom database and a custom admin dashboard inherit API discovery, approved-API scoping, schema validation, auth passthrough, RBAC inheritance and public-vs-private data classification. Three surfaces, three security surfaces, one founder.
- **A category with incumbents.** Forge, Caliper, Banno's Plugin Framework and Gigacatalyst already exist in it. The visual half was unoccupied; this is not.
- **Correction to the founder's framing.** The proposal was described as *"more of a greenfield and a lot less modifying their production code."* Half right. What was rejected on 2026-07-28 was never modification as such — it was **needing write access**, because write access requires engineering-leadership sign-off and read access requires nobody. Any insertion point needs that sign-off. Finding 5 is what actually relieves this, not the greenfield character of the module.

### 10. The proxy is an anti-corruption layer, and it centralises coupling rather than removing it

The founder's mechanism for staying current with the platform's backend — a proxy that absorbs API changes and only cascades updates when a change is large — is a real and well-understood pattern. Its limits should be stated before it is relied on:

- It converts many small breaking changes into one maintained translation layer. That is a genuine reduction in fan-out and it is why the idea is sound.
- It does not remove the dependency. Every module still depends on the platform's data shape; the proxy just makes one place responsible for it. When the platform changes *semantics* rather than *shape* — a field that keeps its name and changes meaning — the proxy passes it through cleanly and every module built on it is silently wrong. **This is the same class of failure as the semantic conflicts named in the fork model, relocated.**
- Deciding "is this a big update" is itself an unsolved judgement, and getting it wrong in the cheap direction is the failure that does not announce itself.

---

## Premises

**Established by this session** (findings, not commitments — they hold regardless of which direction is chosen):

- **L17.** For platforms that already pay for custom development, the extension architecture already exists. The insertion-point ask largely evaporates and the product becomes a generator into a surface the platform owns. Verification pending — see T32.
- **L18.** The design-service P&L line does not exist; the custom-development P&L line does. Design is a $99–499 flat fee and ~1–3% of revenue at the public companies. Custom development is a named team on a contracted engagement at Banno, Backbase and Tapcart.
- **L19.** The structural-preset result does not transfer from design to features. It holds because design's value is unboundedness; a bounded feature vocabulary limits what is buildable without collapsing into sameness.
- **L20.** L7's evidence base measures brownfield editing and does not cover greenfield generation into a defined slot. The feature route moves from *contradicted* to *unevidenced in both directions*.
- **L21.** A feature product trades both core principles in [[Strategy/Product_Boundaries|Product_Boundaries.md]] and forfeits **L8**, bounded blast radius by output type. Until a replacement safety property exists there is no halt condition and [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] cannot be claimed.

**Deliberately not locked.** The founder's position is *"I don't want to fixate on one thing, but I'm leaning to A."* The product shape is open. No strategy doc, concept file or `PRODUCT.md` line may be updated on the strength of this session.

**To test:**

- **T30.** What do tenants actually request, and what fraction is read-only — a view, a report, a dashboard, a filtered list — versus a write, a workflow or a transaction? This decides whether read-only modules are a product or a toy. One question per call.
- **T31.** Does refusing feature requests cost the *platform* anything measurable — churn, lost deals, discount pressure — or only the tenant? Tenant pull is not platform pain until this is answered, and the buyer is the platform.
- **T32.** How deep does each Group A extension surface actually go? Read Banno's Digital Toolkit docs and Tapcart's App Studio docs directly. If none reaches native UI inside an arbitrary existing screen, L17 collapses and the insertion-point ask returns.
- **T33.** What is the accept condition for a generated feature? Unanswered in session and the largest gap it leaves.
- **T34.** Has any second Group A platform shipped an AI extension generator? Q2 Code shipped April 2026. **L12 records a standing condition: if two or more targets ship a native AI-extension layer, the external position erodes.** One has. Check the rest before the calls.

Everything open on 2026-08-04 and 2026-08-10 is unchanged.

---

## Approaches considered

**Tokenization plus modules.** Theming shrinks to a token layer whose job is making a generated module look native; the module system is the product; [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] is retired as the pitch. **The founder's lean.** Keeps the one working artifact earning its keep and produces a sentence a stranger can argue with. Retires the only shipped thing as the headline in favour of something that does not exist.

**Redesign as the wedge, modules as the expansion.** Lead with the visual product because it is built, safe, demo-able and needs only read access; expand once inside. Matches Journey lesson 8 — *get through the boring to make the fun vision come true.* Weakened by the August 4 record of this same bet: when the capability arrives the platform builds it on its own SDK, and a design relationship does not obviously position anyone to win a layer they do not participate in.

**Modules only, theming dropped.** Cleanest positioning, best match for founder energy. Discards the pipeline, which Journey lesson 9 identifies as the one durable asset produced in nine months while every product thesis built on it was discarded.

**Carry both, let the calls choose.** Most honest at zero evidence; most likely to produce ten polite calls, because a founder without a point of view gets agreement instead of correction. **Chosen, with an explicit lean toward tokenization-plus-modules.**

**Insertion points built by Recompose into Group B platforms.** The founder's original proposal. Not chosen once the buyer moved. It is a harder sale than the visual product rather than an easier one — it needs engineering-leadership sign-off, it makes a single-founder startup load-bearing inside a production mobile app, and the platforms that would need it are exactly the ones with no budget line for it.

**Read-only modules as the first product.** Recommended in session and **not adopted** — the founder answered "not sure." It is the only candidate that keeps *a bad output is ugly, not broken* literally true. Held open pending T30.

---

## Recommended approach

**Assert tokenization-plus-modules; hold the shape open; build nothing.**

The operational translation of *don't fixate, but lean A* is not a hedge. It is: go in with one point of view sharp enough that a stranger can correct it, and treat the call's job as collecting the facts that would move you rather than closing.

The sentence to carry: **your tenants ask you for features and you tell them no; we make yes scale, and it looks like your app because it inherits your tokens.**

Carry the redesign demo regardless. It costs nothing, it is the only proof that anything here can be executed, and it is a better opener than a meeting request.

**Three things to do before the first call, none of which is code:**

1. **Verify T32 from public documentation.** Banno's Digital Toolkit, Tapcart's App Studio, BuildFire's buildfire.js. An afternoon, and it determines whether the pitch is "we generate into the surface you own" or "please build us a surface." Those are different companies.
2. **Check T34.** Whether a second Group A platform has shipped an AI extension layer. L12's standing condition has already fired once.
3. **Decide nothing about the accept condition until T30 comes back.** What tenants actually ask for is the input to that decision and it is one question per call.

---

## Open questions

- **T33 — the accept condition.** The largest gap this session leaves. Everything about the autonomy promise depends on it.
- **T31 — whether tenant pull is platform pain.** The direction rests on tenant frustration, and the buyer is the platform.
- **Whether the tenant-facing loop has a bound.** *Tenant describes what they want* is arbitrary software. A bounded vocabulary is the obvious answer (finding 7) and it has not been chosen.
- **Where the admin dashboard lives.** The founder is right that a custom feature nobody can configure is dead on arrival, and it is a third surface with a third security surface. Unaddressed.
- **Pricing.** Undefined, and now undefined against a different buyer than the one it was undefined against last week.
- Everything from 2026-08-04 and 2026-08-10: who resolves a halt, how the 4% minor gets swept up, the error-budget denominator, and T29.

---

## The assignment

**The same one, for the fifth session running, with three additions and one re-sort.**

1. **Ten named platforms, a named human at each.** [[Research/2026-08-04-company-list-white-label|Research/2026-08-04-company-list-white-label.md]] is the raw list; job postings supply the names. **New sort: Group A first** — Banno, Backbase, Tapcart, BuildFire, GoodBarber, Trainerize Enterprise — because they have the budget line. Banno sits in both filters and is the single best first target on the merits; it is also a public company with procurement, so sort Tapcart and BuildFire ahead of it on reachability.
2. **One redesign video per platform, sent the day it is made.** Unchanged. Install their tenants' apps, redesign two, send it. Not a meeting request.
3. **Four questions on every call**, in this order:
   - How many tenants are live on the branded tier today, and how many branded apps shipped last quarter. *(carried)*
   - Do you build or manage websites for your tenants today, and who does that work. *(carried, T28)*
   - **What do tenants ask you to build that you say no to — and of those, how many are just a view of data you already have?** *(T30, and it is the one that decides the accept condition)*
   - **What does saying no actually cost you?** *(T31 — churn, a lost deal, a discount. If the answer is "nothing," the direction is dead and one call killed it.)*

**Nothing gets built until at least three of these calls have happened.** That is not a preference; it is the pre-registered reopening condition from [[Strategy/Agentic_Code_Generation|Agentic_Code_Generation.md]] — *"and a customer, because extending scope before the narrow version has a buyer is the pattern this vault has run five times."*

---

## What I noticed about how you think

**The single best thing in this session was one clause: *"this is still pre-interviews, I am going to try to get the interviews once I finish this convo."*** Five sessions have ended with the same assignment and none of them ended with that sentence. It is worth more than everything above it.

**You answered "not sure" to the hardest question and did not manufacture a position.** The accept condition for a generated feature is the load-bearing gap in the whole direction, and the available options all have real costs. Declining to pick one at idea phase, with no data about what tenants actually request, is correct — and it converted the question into something a call can answer, which is the best possible outcome for a question you cannot reason your way through. The pattern from the last two sessions was that your best corrections came from you, against research. This is a different one: knowing where your own reasoning runs out.

**The framing habit that produced this idea is the same one that produced the last three good corrections.** You located the gap between Gigacatalyst and your product precisely — *"this actually has a frontend"* — and that is exactly why an API-composition sandbox does not solve the mobile case, and why a renderer has to live in the app. That is architectural reasoning from your own constraints rather than imported from an adjacent company, which the August 4 session flagged as the thing you are good at.

**And the counter-observation, which has now aged three times.** This is the eleventh reasoning cycle and, if adopted, the seventh strategic phase in about nine months. Two of the last three sessions were spent establishing at depth that directions you are not pursuing would not have worked. This one is better — the technical case for modules is genuinely stronger than the one L7 rejected, and the buyer choice sharpened rather than blurred. It still cannot tell you whether anyone will buy anything. **The direction you lean toward is more expensive to build, harder to make safe, and lands in a category that already has incumbents. If it is right, ten calls will say so. If the calls do not happen, it does not matter which direction was right.**
