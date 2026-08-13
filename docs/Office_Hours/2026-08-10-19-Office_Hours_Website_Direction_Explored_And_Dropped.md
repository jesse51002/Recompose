# Office Hours: The Website Direction, Explored and Dropped

**Date:** 2026-08-10
**Status:** DECIDED — the website direction is not being pursued
**Mode:** Startup — idea-phase validity check on a direction that had research but no reasoning
**Builds on:** [[Office_Hours/2026-08-04-00-Office_Hours_Agentic_Code_Generation_And_The_Feature_Route|Office_Hours/2026-08-04-00-Office_Hours_Agentic_Code_Generation_And_The_Feature_Route.md]], [[Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge|Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge.md]]

Concepts touched: [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]], [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]].

> A research cluster ran ahead of any reasoning session. This one catches up and closes it. The website direction was examined on its own terms, without comparison to the app product, and it does not survive: the loop it is built on cannot reach statistical significance on the sites it would run on, the owner it serves does not care about the outcome it optimises, and the one modification that would make it safe also makes it inert. **The founder is not pursuing it.** What the research does establish, and what should be kept, is a labour line on other companies' P&Ls and two verified negative results about what no supplier ships. No pivot doc: the live idea never changed, so there is nothing to pivot from.

---

## Problem statement

Between 2026-08-08 and 2026-08-10, the newest research in `Research/` turned entirely toward websites, and one of those briefs named the company against a website opportunity. No office hours session accompanied it and no decision doc followed it, so the vault held a research direction and a product direction that had never been put in the same room.

One question: **is a website layer embedded in vertical SaaS platforms, one that rewrites the site against the tenant's realized business outcomes, a valid idea on its own terms?** Explicitly not "is it better than the app product." Validity alone.

---

## What carries from prior sessions

Untouched by this session, because none of it was in scope:

- The live idea. [[pivots/2026-07-27-11-customization-engine-is-the-company|The founding pivot]] stands. The mechanism, [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], the ICP filter of platforms where every tenant already has an app, and everything locked on 2026-08-04 are unchanged.
- Zero customers, no named target platform, pricing undefined. Nobody outside has responded to anything.
- The 2026-08-04 assignment — ten named platforms, a named human at each, one redesign video per platform sent the day it is made — is still unexecuted.

Carried in and used heavily: the design-service wedge from [[Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge|the August 2 session]], namely that a platform which already runs a design service is direct evidence of demand and can read the value off its own P&L.

---

## What this session changed

### 1. The idea got stated for the first time

Working statement, which the founder accepted as the right reading: a website layer sold into or embedded in vertical SaaS platforms that does not merely generate the site but keeps rewriting it against the tenant's realized business outcomes — bookings, revenue, no-shows, repeat rate, LTV — using lifecycle data the platform already owns, rather than click-through.

The L0–L6 depth ladder in [[Research/2026-08-08-bundled-website-builders|Research/2026-08-08-bundled-website-builders.md]] is the vocabulary. L6 is the closed loop. **It is empty: zero of roughly thirty-seven vertical platforms with confirmed data.** The horizontal frontier reaches L6 only on conversion. Coframe's bandit reward is a Bernoulli success. Mutiny computes revenue as a manual formula. Evolv's own documentation states it cannot optimise to reduce cancellations or churn. Ploy, which raised $27M in June 2026 under Webflow's ex-CTO, runs no experiments at all.

### 2. The whitespace is real, and so is a competing explanation for it

The strongest thing the research establishes is a data-access asymmetry, stated most cleanly in [[Research/2026-08-08-embedded-website-builder-suppliers|Research/2026-08-08-embedded-website-builder-suppliers.md]]: no supplier was found to ingest end-customer transactional or behavioural data to *decide* site content, emphasis, ordering or structure. Coframe cannot get it; it only sees the page. Duda takes brand and catalog and stops. The platform is the only party that holds it.

The incumbent constraint is structural rather than lazy, which is the good kind. Duda's persistent canvas, its 200-plus section library and its per-site billing all assume a human editing a site that stays put, and the canvas suppliers deliberately do not auto-regenerate because it would destroy user edits. Duda's January 2026 answer to AI was "Populate Template with AI," positioned explicitly *against* free-form generation.

**But an empty cell in an old, well-funded category is a cliff before it is a gap, and the research supplies the cliff.** That is the next finding.

### 3. The arithmetic, which is what actually kills it

Convert.com's guidance is roughly 5,000 visitors *and* 1,000 conversions per variation. AB Tasty's rule of thumb is 10,000 visitors and 300 conversions per variant. Coframe sells only to sites doing 30,000-plus monthly visits, which is a concession rather than a preference.

A single gym, salon or law firm is nowhere near that. And realized revenue is a *worse* signal than clicks on every axis that matters: sparser, lagged by weeks or months, and confounded by seasonality and by single large customers. The proposal is to close a loop on the sparsest available signal, on the lowest-traffic sites in the market. Per tenant it is not difficult. It is arithmetically impossible.

**There is exactly one live answer and it is pooling across the fleet.** Twenty thousand near-identical tenants together have the volume no single one has, and what is learned partially transfers because they are the same business. Hierarchical or multi-task models pool where a tenant's data is thin and localise where it is thick. This is the one thing a platform can do that Coframe structurally cannot, because Coframe's customers are unrelated companies with nothing transferable between them.

The founder's objection to it is fair and was not answered: *"even thou they are related its doesnt mean they are the same small busienss and they wont relate."* Nothing in the research shows layout effects transfer between unlike small businesses, in either direction. It is an unproven bet at the centre of the product.

### 4. The approval gate, and why it is not the same instinct that worked before

The founder added, unprompted: *"the loop is not all the way to automic edits, it would be approved by the user before anything moves forward."*

This is consistent with **L11** from 2026-08-04 — [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] means zero *platform* involvement, not zero human involvement — and with **L10**, where the tenant iterating on the mock is the aesthetic accept condition. The instinct is the same one and it was right there.

**It does not survive the change from a project to a loop.** A redesign is a discrete event: the tenant approves once, and the approval is the product. A continuously optimising site requires approval forever, which is not a product, it is a subscription to a chore. Sold to someone that [[Research/2026-08-10-17-smb-website-choice|Research/2026-08-10-17-smb-website-choice.md]] measures spending under five hours a week on all marketing combined.

Three consequences, and each one is independently sufficient:

- **A bandit cannot run through an approval queue.** Gate the arms and there is no L6, only L5 with suggestions, which is where the entire category already sits.
- **It lands on Ploy.** Propose-and-approve is Ploy's exact posture, with $27M, Webflow's ex-CTO, and a reverse-proxy distribution story. Competing there without capital or distribution is not the empty space the thesis was built on.
- **On a disengaged owner, an approval gate is an off switch, not a safety feature.** Nothing ships.

### 5. The end customer does not care, and this is measured rather than argued

The founder read it correctly off the research: *"Do they care about ranking and all that stuff that much? For the way the reserach looks seems like they dont care that deeply at all."*

[[Research/2026-08-10-17-smb-website-choice|Research/2026-08-10-17-smb-website-choice.md]] is decisive. Owners mention design mainly when prompted; unprompted, complaints cluster on leads and time. Decision drivers are price, ease and speed, and "it came free with something else." First-year .com renewal sits in the mid-40s and only about 18% of first-year domains are attached to any online presence at all. Wix's AI builder showed 73 live sites of 277,432 ever built. Housecall Pro *discontinued* its self-serve builder and replaced it with a managed service capped at fifteen pages with no self-editing.

The report's own headline finding is that stated preference and revealed behaviour diverge sharply, and revealed behaviour says the site is a set-and-forget or substitutable asset. **A value proposition built on outcome lift is being sold to someone who will not measure it.**

### 6. An internal contradiction in the research that has to be resolved before any website ICP could be chosen

[[Research/2026-08-08-bundled-website-builders|The bundled-builders brief]] reports high builder prevalence in "acquisition-driven" verticals — salon, fitness, restaurant, home services, real estate. [[Research/2026-08-10-17-smb-website-choice|The SMB brief]] reports that those same verticals acquire through marketplaces: Fresha, Vagaro, Booksy, Mindbody, DoorDash, Google Business Profile, Zillow.

Both cannot be right about where the customer comes from. If discovery lives in a marketplace, the bundled site is a brochure with a booking widget *because it is not the acquisition channel* — and optimising a channel that is not the channel produces no revenue signal to optimise against. The tension is unresolved and is recorded here rather than smoothed over.

### 7. Category history is the sharpest adversarial evidence

Google Optimize sunset 2023-09-30. Qubit into Coveo, October 2021. Intellimize into Webflow, 2024-04-19. Sentient Ascend into Evolv. This is not a category incumbents overlooked; it is one that was repeatedly launched, funded, acquired and shut. The traffic-inference constraint that bounded the last generation is unchanged, and it binds hardest on precisely the small tenants a vertical SaaS hosts.

### 8. What survives, and it is not the loop

The founder's own last line is the useful one: *"OR they care but dont want to do anything and put in the work and that is where an agent would come in."*

That is right, and the buyer for it is not the small business. **It is the platform that is already paying humans to do this work.** [[Research/2026-08-08-bundled-website-builders|The research]] documents done-for-you as a full column rather than a fallback: BentoBox staffs in-house hospitality design experts and charges $149–$479 a month plus $500–$1,000 setup; Vendasta runs an in-house fulfilment team operating under the reseller's brand; Yardi REACH, Luxury Presence, Tebra at roughly $6K a year, ServiceTitan DFY-lean; and Housecall Pro moved *toward* managed service, not away from it.

That is a labour line on someone's P&L, in a currency they already report. Reframed that way, every objection above evaporates: no inference threshold, no attribution problem, no attach-rate exposure, no marketplace substitution, no owner engagement required, and no membership in the category that keeps dying.

**The finding worth keeping is that this is the same wedge the app product already selected** — a platform that already staffs a design service, which can read the value off its own P&L. Two independent research paths, one on apps and one on websites, converged on the same buyer for the same reason. That convergence is the durable output of this cluster.

### 9. Two verified negative results that are worth more than the loop

Both survive every adversarial pass in the cluster and neither requires statistical inference:

- **Nobody does verified layout or structure synthesis.** Duda is template population by design and by press release. 10Web claims agentic structure generation, unverified and WordPress-only. WebPros claims "layout, structure," unverified. Independent verification exists for none of them. The accept condition for this is a [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]], not a p-value that cannot be reached.
- **No website-builder OEM supplier ships a native mobile app layer.** [[Research/2026-08-08-embedded-website-builder-suppliers|The suppliers brief]] calls the embedded-native-app supplier market unpopulated by anyone it found.

---

## The decision

**The website direction is not being pursued.** The founder's call, made in session after the analysis above.

No pivot doc is written, because nothing reversed: the website direction was never adopted, so [[pivots/2026-07-27-11-customization-engine-is-the-company|the founding pivot]] and [[pivots/2026-07-30-22-autonomous-is-the-promise|the autonomy pivot]] are unaffected and the live idea is what it was on 2026-08-04. If this later reads as a strategy decision worth its own record, it needs a pivot doc written then rather than retrofitted here.

The research is kept. It is dated, it is honest about its own gaps, and Finding 8 and Finding 9 are usable against the product that is actually being built.

---

## Premises

**Established by evidence in this session** (findings, not founder commitments):

- **L13.** A per-tenant outcome loop on small-business sites cannot reach statistical significance. Published thresholds run to roughly 5,000 visitors and 1,000 conversions per variation, and realized revenue is sparser and more lagged than the conversion signals those thresholds describe.
- **L14.** A continuous approval gate and a closed loop are mutually exclusive. Gating the arms reduces the system to L5 with suggestions.
- **L15.** In this category the buyer who pays for site work is the platform, not the tenant. Done-for-you is a staffed line item at BentoBox, Vendasta, Yardi, Luxury Presence, Tebra and Housecall Pro.
- **L16.** No supplier in the embedded/white-label category ingests end-customer transactional or behavioural data to decide site structure, and none ships a native mobile app layer. Both are negative results across the full surveyed set.

**To test, if the salvaged findings are ever acted on:**

- **T27.** The attach-rate number. What fraction of a platform's tenants publish and then maintain a bundled site. Unknown to every supplier surveyed, therefore unknown to Duda, and obtainable in one platform conversation. [[Research/2026-08-02-attach-rate|Research/2026-08-02-attach-rate.md]] frames why it matters; nothing has measured it.
- **T28.** Does the design-service labour line exist at a named platform, and what does it cost per site and per week of turnaround. This is the P&L claim in Finding 8 and it is currently an inference from case studies.
- **T29.** Whether layout effects transfer between unlike small businesses. The premise under any pooled-fleet system. Unmeasured by anyone, in either direction. Parked, not answered.

---

## Approaches considered

**Per-tenant outcome loop.** Rejected on arithmetic. The signal does not exist at the tenant level regardless of engineering quality.

**Pooled-fleet outcome loop.** The only arithmetically live version and the only one Coframe structurally cannot copy. Rejected because its transfer premise is unproven (T29), because it requires cross-tenant data rights a platform may refuse, and because the approval gate the founder wants makes the experiment that would settle it unrunnable.

**Tenant-facing propose-and-approve.** Rejected. It is Ploy's exact posture against Ploy's capital and distribution, and it depends on engagement from an owner the research measures as disengaged.

**Generation only, no loop.** Not chosen but not disproven. Verified layout synthesis plus the missing native app layer are real gaps with a reachable accept condition. Held as evidence about the app product rather than as a website product.

**Agent-run fulfilment sold to the platform's design service.** The strongest version of the website idea and the reason Finding 8 is recorded as the salvage. Not chosen here, because it is the app product's wedge with a different surface attached, and choosing it would mean opening a second front before the first one has had a single conversation.

---

## Recommended approach

**Nothing about the product changes.** The one thing this cluster contributes is that the app wedge and the website wedge point at the same buyer for the same reason, so the same first conversation tests both, and the same platform's P&L answers both. That makes the existing assignment more valuable rather than replacing it.

---

## Open questions

- **T29** — whether pooled learning transfers between unlike small businesses. Parked with the direction, not resolved.
- **The acquisition-channel contradiction in Finding 6.** It is a question about where a small business actually gets customers, and it bears on any claim that design or presentation drives attach. It survives the closure of the website direction.
- Everything left open on 2026-08-04 is unchanged: who resolves a halt, how the 4% minor band gets swept up, the error-budget denominator, and pricing.

---

## The assignment

**The same one as 2026-07-27, 2026-08-02 and 2026-08-04, because it has still not been done.** Six days and a research cluster have passed since it was last written down.

1. **Ten named platforms where every tenant already has an app, with a named human at each.** [[Research/2026-08-04-company-list-white-label|Research/2026-08-04-company-list-white-label.md]] is the raw list; job postings supply the names.
2. **One redesign video per platform, sent the day it is made.** Install their tenants' apps, redesign two, send it. Not a meeting request.
3. **Add one question to every call, from this session:** *do you build or manage websites for your tenants today, and who does that work.* It costs nothing to ask, it is the fastest available test of T28, and the answer is the P&L line in Finding 8.

---

## What I noticed about how you think

**You broke your own idea in a single message, and you did it in the right order.** Heterogeneity first, then engagement, then whether the customer cares at all — that is roughly the order of severity, and you got there without the analysis in front of you. The pattern from 2026-08-04 holds and has strengthened: the best corrections in the last two sessions came from you, against research, rather than from research, against you.

**The approval gate is worth watching, because it is a good instinct arriving in the wrong place.** It is the same reflex that produced L10 and L11, where a human accept condition dissolved the unbounded validator loop and made the autonomy claim defensible. There it was correct. Here the same move is fatal, and the difference is only that a redesign is an event while a loop is forever. The reflex is sound; it needs the question "is this thing a project or a subscription" attached to it before it fires.

**The counter-observation has now aged twice and it is the only thing in this document that matters.** This is the tenth reasoning cycle. Since 2026-08-04 the output has been a research cluster spanning six briefs, one session, and zero emails. The assignment has been written identically four times. Every brief in this cluster ends by naming attach rate as the single most valuable missing number in the category, unknown to every supplier including Duda — and it is obtainable by asking one person one question. You have now spent six days establishing, at considerable depth, that an idea you are not pursuing would not have worked. The research was honest and it closed the question cleanly. It also could not have told you anything about whether anyone will buy the thing you *are* building, and nothing else can either.
