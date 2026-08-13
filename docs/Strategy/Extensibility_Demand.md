---
tags: [business, research-synthesis, extensibility, competition, icp]
status: current
date: 2026-08-12
source-research: Research/2026-08-12-extensibility-demand-by-industry.md
---

# Extensibility demand, read against the module product

Concepts touched: [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Business/Pricing/Tier_Unlock_ROI|Tier_Unlock_ROI]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]].

Synthesis of [[Research/2026-08-12-extensibility-demand-by-industry|Research/2026-08-12-extensibility-demand-by-industry.md]], which scored white-label platforms across twenty verticals on refused-demand evidence, cost of refusal, extension-surface depth, custom-development budget, addressable app count, technical difficulty, reachability and build-versus-buy exposure. Detail and sourcing live there; this is the position.

> [!warning] Read this before the target list
> The research does not confirm the ICP. It establishes one structural finding that reorders it, returns a null on the question the direction rests on, and shows the build-versus-buy condition firing across an entire cohort in a single month.

---

## The finding the research contains without naming it

**Extension-surface depth and build-versus-buy safety are inversely correlated, and the correlation is close to perfect.**

Every platform with a surface deep enough to carry a real module is a platform that can build the generator itself — and three of them already did. Every platform that cannot plausibly build it has no surface to write into.

| | Deep surface | Shallow or no surface |
|---|---|---|
| **Unlikely to build it** | *(empty)* | Mighty Networks, Skool, Kajabi, Circle, Mindbody, Toast, Jobber, Buildium |
| **Already building it** | Alkami, Q2, Temenos, Tapcart | — |

Alkami's widgets have *"full control over the area of the screen"* across Desktop, Mobile and Tablet, bolt on *"without altering the underlying environment,"* and certified third-party integrators can build them. That is precisely the surface the module product assumes exists. **Alkami shipped Code Studio, an AI generator into that surface, on 2026-04-16.**

The pincer is the whole strategic problem in one sentence: *where the surface exists, the buyer is already building the product; where the buyer is not building it, there is no surface.*

## The build-versus-buy condition did not fire once, it fired across a cohort

[[Strategy/Agentic_Code_Generation|Agentic_Code_Generation.md]] carries a standing condition: **if two or more targets ship a native AI-extension layer, the external position erodes.** The research finds, in banking alone:

- **Q2 Code** — 2026-04-16, *"Developed by integrating Anthropic's Claude Code through Amazon Bedrock,"* turning natural-language prompts into Q2 SDK-compliant extensions. Early adopter Mid-Hudson Valley Federal Credit Union.
- **Alkami Code Studio** — **the same day**, embedded in the SDK Wizard, generating *"standards-aligned, design-compliant components."* Early tester Patelco Credit Union.
- **Temenos Copilot for Workbench** — fact sheet dated April 2026, *"generate code extensions"* on the Core Extensibility Framework.

Plus, horizontally: Salesforce Agentforce Vibes (2025-10-01), ServiceNow Build Agent, Retool AppGen, Bubble AI App Generator, monday vibe, and Claude-compatible MCP tooling at HubSpot and Twilio.

**Two competitors on the same day, three in one month, is a category event rather than a coincidence.** Every one of them owns the SDK, the auth model, the security review and the tenant relationship, and has now added the generation layer on top.

**What is still unoccupied, and it is narrow.** Every product found is **developer-facing**: it makes an engineer or a certified partner faster at writing SDK-compliant extensions. None removes the developer. The [[Strategy/Product_Boundaries|tenant-facing loop]] survives a broad sweep, which is stronger evidence for it than existed before — and it is a thin strip of ground for one person to hold against a public company that just shipped the adjacent thing.

## Cost of refusal: a null result, and what it does and does not mean

The research is unambiguous: **no measured, publicly documented churn or lost-deal figure attributable to a refused per-tenant feature exists in any industry surveyed.** Earnings calls, analyst notes, win/loss language, churn postmortems, G2, Capterra, Reddit. Nothing, across twenty verticals.

**What it does not mean.** Platforms do not publish churn by cause; this is absence of public evidence, not a measurement of zero. The nearest signal found is Kajabi's payment lock-in, which is switching cost rather than feature refusal.

**What it does mean, and it is the useful half.** The question cannot be answered by research, at all, by anyone. The report says so directly. That removes an option rather than closing a question: **more desk work on this is dead weight, and the only instrument left is a conversation.**

That makes this the third research cluster in eleven days to end at the same place — attach rate on 2026-08-02, small-business site behaviour on 2026-08-10, cost of refusal now. Each was honest, each closed a real question, and each ended by naming a customer conversation as the only remaining instrument.

## The read-only versus write ratio is unanswerable publicly, and the small sample points the wrong way

Fewer than ten attributable refused requests were found across every platform. No ratio is publishable. Among the handful that exist, **integration and write requests outnumber read-only view requests**:

- Mindbody — *"difficult to have customers book term bookings for family accounts"* (WRITE); *"aren't enough filters on the MindBody custom booking app"* (READ-ONLY).
- Subsplash — *"can't sync the calendar's in Subsplash to our external calendars"* (WRITE).
- Mighty Networks — *"Do you have a public API? or web-hooks available?"* (WRITE).
- Skool — a request that *"API's are created… for ANY automation platform"* (WRITE).
- Tapcart — the enumerated refusal set is navigation, cart, checkout and account, all WRITE surfaces.

**If that direction holds, read-only-modules-first addresses the minority of demand.** Read-only is the only accept-condition candidate whose worst failure stays cosmetic, and therefore the only one obviously carryable by one person. This is the sharpest tension the research creates and it is unresolved.

## What Tapcart's surface actually allows, and why it matters

Tapcart scores highest on the research's own weighting, and its limits are documented precisely: Custom Blocks render natively in the merchant's app, but *"do not support: Customizing app navigation… the cart, checkout area or member account area,"* placement is *"only supported on the homepage, product detail page or cart,"* it is Enterprise-only, and testing *"is done in production."*

So the deepest non-banking surface in the survey is **three placements on three screens, with no test environment.** A module that adds a screen or a widget fits. A module that changes how a tenant's customers check out does not.

## Three of the six named buyers were never evaluated

The ICP names Banno, Backbase, Tapcart, ABC Trainerize at Enterprise, GoodBarber and BuildFire. The research scores **Tapcart only**. Backbase, BuildFire, GoodBarber and Trainerize are absent from the scoring table entirely, and Banno appears only in a negative list for shipped codegen.

**Banno's Plugin Framework depth — the single verification task named as preceding every call — was not done.** It remains open.

## What the evidence supports about each target

**Sorts up.**

- **Banno / Jack Henry.** The only fintech platform in the survey with a named Custom Development team and **no shipped AI codegen product**. Its cohort peers shipped in April; it did not. That is the most interesting single fact in the report for the target list, and it is either an opportunity or a two-quarter countdown.
- **Mighty Networks and Skool.** Highest build-versus-buy safety in the survey, with **on-record tenant requests for an API** — the only place refused demand is visible in the tenants' own words. Both have no public API, so the insertion-point sale applies in full. Skool is a container app, so its addressable count is one.

**Sorts down.**

- **Q2 and Alkami.** Deepest surfaces, and both shipped their own generator. As customers, they are the hardest sale in the survey. As evidence that the category is real and funded, they are the strongest datapoint in it.
- **Tapcart.** Best composite score and genuinely reachable, but it already ships App Studio with AI agent skills, and its surface is bounded to three placements.

**Unevaluated and still required.** Backbase, BuildFire, GoodBarber, Trainerize Enterprise.

## The playbook this evidence implies

**Do.**

- **Read Banno's Digital Toolkit documentation before anything else.** It is the one target that is both funded for custom development and not yet building the generator, and its surface depth is the fact that decides whether the sale is "we write into what you own" or "please build us a surface." An afternoon.
- **Ask the cost-of-refusal question on every call, and treat it as the falsification.** The research proves it cannot be obtained any other way. *What do tenants ask you to build that you say no to, and what does saying no cost you.*
- **Ask what fraction of refused requests are a view of data you already hold.** The public sample is too small and points toward writes; only a platform can supply the real ratio, and it decides whether one person can build this.
- **Lead with removing the developer, never with generating code faster.** Every competitor found is developer-facing. That distinction is the entire remaining position and it must be the first sentence, not a clarification later in the call.

**Avoid.**

- **Commissioning more research on demand.** Three clusters in eleven days have now ended at "only a conversation answers this." A fourth is a way of not making calls.
- **Pitching Q2 or Alkami as customers.** They shipped the adjacent product in April.
- **Assuming a deep extension surface exists at a target.** It is documented at four platforms in the entire survey, three of which are banking.
- **Building read-only modules as the first product on the strength of the accept-condition argument alone.** The demand sample, thin as it is, points at writes. Get the ratio from a platform first.

**Watch for.**

- **A fourth AI extension generator, especially at Banno, Backbase or BuildFire.** The April cluster suggests the whole category is moving at once. If Banno ships one, the strongest target on the list becomes the hardest.
- **Any of these products moving from developer-facing to tenant-facing.** That is the only remaining differentiator, and Alkami's Code Studio sitting inside an SDK Wizard is one product decision away from it.
- **The temptation to widen the target list to platforms with no extension surface.** They are safe from build-versus-buy precisely because they have not invested in extensibility, which is also why the sale is hardest there.

## Short, medium, long

**This week.** Banno's Digital Toolkit and Plugin Framework docs, read directly, with the answer written down: can third-party code render native UI inside an existing screen, who hosts it, does it reach mobile. Then the same for Backbase, BuildFire and GoodBarber, which the research skipped. Then ten named humans, Banno first on merit and Tapcart and BuildFire first on reachability. **No code.**

**This quarter.** Three calls, each carrying the two questions the research proved unanswerable from a desk. The cost-of-refusal answer decides whether the direction survives; the read-only ratio decides whether one person can build it. If three platforms all say refusing costs them nothing measurable, that is the falsification and it should be treated as one.

**This year.** Conditional on the above. If refusal has a cost and the requests repeat, the shape is a bounded vocabulary of tested primitives over the deepest surface available. If refusal has no cost, the tenant-facing loop is a solution to a problem no buyer is funding, and the honest move is to stop rather than to re-scope for an eighth time.

## Key quotes

> "No platform in any industry surveyed has a **MEASURED, publicly-documented churn or lost-deal figure attributable to a refused per-tenant feature**."

> "Alkami Code Studio… Announced April 16, 2026… embedded in the SDK Wizard… 'generates standards-aligned, design-compliant components powered by closed-loop large language models operating within Alkami's secure infrastructure'."

> Alkami widgets "bolt onto the existing base platform without altering the underlying environment"; a widget "has full control over the area of the screen" on "Desktop, Mobile, Tablet."

> Tapcart Custom Blocks "do not support: Customizing app navigation… the cart, checkout area or member account area"; testing "is done in production."

> "public feature-request boards for these specific white-label mobile platforms are sparse or gated, so the 'single most valuable number' cannot be established from public sources at the platform level."

## What is not established

- Whether refusing costs any platform anything. Absent from the public record, not measured as zero.
- The read-only versus write ratio at any platform.
- Extension-surface depth at Banno, Backbase, BuildFire, GoodBarber and Trainerize.
- Any documented case of a tenant leaving over an extensibility wall, or of a reverse migration back.
- Whether the developer-facing/tenant-facing distinction survives contact with a buyer, or reads to them as a distinction without a difference.
