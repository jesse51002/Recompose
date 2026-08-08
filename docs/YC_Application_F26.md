# YC F26 Application — Working Draft

**Status:** SUBMITTED 2026-07-27 — **the answers below are frozen and are not edited.** They are the record of what was actually sent. Where an answer now disagrees with the architecture, the correction is stated in the demo rather than retrofitted here. See "Corrections to state in the demo" below.
**Deadline:** 2026-07-27 (met)
**Source session:** `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md`
**Decision it reflects:** `pivots/2026-07-27-11-customization-engine-is-the-company.md`

Concepts touched: [[Orchestrator]], [[Modal_Coherence]], [[Tokenized_Design_System]], [[Brand_Is_Product]], Switching_Cost_Moat, [[AI_Design_Compression]].

> **Company name (2026-07-28, founder): Recompose.** Provisional — chosen to have *something* sayable in the founder video, explicitly changeable. *Composition* is the design term for how elements are arranged on a screen, so re-compose names the arrangement-only invariant (P14) directly. Rejected: **Overhaul** + second word (the word's default association is car repair, and every second word either fought it or doubled it), **Repackage** (the everyday meaning is "changed the wrapper, nothing else" — the exact dismissal the pivot doc spends a page rejecting, and white-label already attracts it), **Remix / Retool / Render** (occupied by large dev companies), **Rendition** (the US association is extraordinary rendition). **Not yet checked for domain or trademark availability.**

> **Ordering:** answers appear in the order they were worked on, not YC's form order.

> **Length rule (2026-07-27, founder):** every answer is **1–2 sentences**. Readers skim. The only exception is the tech stack, which stays a list — less detail per line, but every piece present.

> **Drafting rules** (from the `investor-pitch` skill): lead with **what**, not why or how · three nouns must survive · delete buzzwords and reread · **no defense, no pre-empting objections** · conversational, no preamble.

---

## Corrections to state in the demo

The application is frozen; the demo is where the record gets corrected. Each row is a place a submitted answer no longer matches the architecture as of `pivots/2026-07-28-01-agentic-editing-all-in.md`. Say the right thing out loud rather than hoping nobody reads closely.

| The submitted answer says | Say this instead | Why it changed |
|---|---|---|
| Code delivery connects to their repo; redesigns arrive as pull requests (answers 2, 5) | **We never write to their code.** They grant read access; we keep our own tokenized fork and derive every design from it. No PR, no write access, no review burden. | The largest adoption objection was an external system operating inside their codebase. The fork model removes the premise instead of answering it. |
| SDKs across Flutter, React Native, Swift, Kotlin (answer 5) | The multi-language SDK roadmap **is not the plan.** Whether the runtime SDK survives at all is open — if layout is baked into a fork, the assets could be too. | "There is nothing to integrate" satisfies adopt-without-changing-your-architecture more completely than an SDK does. |
| 80 brand themes (answers 2, 3) | **76.** | 76 app folders on disk, 76 completed `output.yaml`, and `codebase/README.md` says 76. |
| Mighty Pro charges $1,167/month (answer 6) | **"$1,000+/month"** — a range, never the precise figure. | Three conflicting figures across sources, none official. Mighty Pro is sales-led and does not publish, so more searching produces a fourth number rather than an answer. |
| The founder video's "90% cheaper" | Do not repeat it. Current thinking is **per design, per month** — roughly $400 against ~$150 maintenance. | It contradicted answer 8's own $100/month figure, which that answer's notes call the platform's COGS rather than the end price. |

**Two things the application does not contain that are now the strongest parts of the pitch**, and are worth volunteering unprompted:

1. **The enum finding.** Structural presets were built, tested, and rejected — a bounded option set reproduces the platform's original design language however many options it exposes. This is the only empirical result in the project, and it came from building rather than reasoning.
2. **The promise: autonomy.** No PR into their trunk, no review queue, no integration work, no engineering sign-off. The ~95/4/1 error budget is a **target, never measured** — say it as a goal, not a rate. What makes it survivable is that **the pipeline halts rather than ships**: a stage that cannot satisfy its own checks stops and nothing deploys, so a significant failure is a stall, not an incident.

> [!warning] Do not answer this in a room: who resolves a halt
> The autonomous promise depends on halting, and a halted design still has to be resolved by somebody. Leaning the platform's own staff; an FDE was considered and is blocked on lacking domain knowledge of an app they did not write. **If the answer is platform staff, the demo's "no manual maintenance" close is false.** Undecided — see `Open_Questions.md` §2.1c.

---

## 1 — Describe what your company does in 50 characters or less.

```
Customers agentically redesign white-label apps.
```

**48 / 50. Final.** Customers are the subject performing the verb, so the self-serve claim lands. The line spends the visual fence — no *look*, no *visual* — which is why answer 2's first sentence has to carry it.

---

## 2 — What is your company going to make? Please describe your product and what it does or will do.

> We let every customer of a white-label platform redesign the entire look of their app. An agent redesigns imagery, palette, typography, icons, copy, layout and animations across every screen, editing code where it has to.

**~65 words.** The floor held: *what* (redesign the whole look), *who* (every customer of a white-label platform), *problem* (a designer per customer). "Editing code where it has to" is the only depth signal kept — it's what stops this reading as a theming tool.

**Cut in compression:** the three platform gains (deals won, premium tier, retention). Retention was the weakest — it rests on platform-side switching cost, not on end users caring about brand depth, and the vault's own research says they don't. Have it verbally, don't write it.

---

## 3 — How far along are you?

> I'm in the prototyping phase. I've finished prototyping the palette, typography, copy, icons and imagery creation. I'm currently working on the layout and animation creation through an autonomous coding agent.

**~45 words.** Stage first, then done vs. left. No timeline on the unbuilt half — that's a number you'd defend in an interview.

**Notes:** the gym product stays unnamed here. If asked about users: zero. If tonight's layout run works, replace sentence three with what happened and attach a screen recording — the form takes a demo link.

---

## 4 — How long have each of you been working on this? How much of that has been full-time?

> I pivoted to this startup a month ago. I'm currently running the startup along side my full time job, planning to go all in after a paying customer or startup accelerator / investor.

**~50 words.** Leads with the pivot so four months reads as experience rather than as time without a customer. The by-hand origin is the scratch-your-own-itch beat and does more work than "I pivoted" alone.

**Cut in compression:** the Gigacatalyst discovery beat — it now lives in the competitor answer where it's stronger. The two-years-of-work-experience clause stays cut; it gated commitment on a résumé and was the only line giving a reason to pass.

**Notes:** "four months" here vs "about eight months" elsewhere — both defensible. **Pick one and hold it.** If asked what you were doing in June: the gym platform with the engine inside it.

---

## 5 — What tech stack are you using, or planning to use? Include AI models and AI coding tools.

> **Backend:** Python, FastAPI. Customer-facing as well.

> **Frontend:** Next.js web app
> 
> **SDKs:** Flutter, React Native, Swift, Kotlin — loads the theme at runtime.
>
> **Code delivery:** Connects to their while labeled app git repo
>
> **Models:** Claude, Grok, Gemini, OpenAI. GPT-Image-2 and Recraft for imagery. Swapped as better models ship.
>
> **Autonomous design coding agents:** Codex and Claude Code, headless
>
> **Coding tool for my own development:** Claude Code.

**Ten lines, ~80 words.** Explanation only where the line is meaningless without it — *loads the theme at runtime*, *arrive as pull requests*, *kicked off by a retheme*. Those three are the ones a technical reader stops on.

**Have ready, not written:**

- **Colour is not deterministic.** The four base slots come from an LLM call *bounded* by a deterministic contract (WCAG AA enforced before accept); only the rest of the palette is derived in Python. Don't claim otherwise.
- **Grok is not in the source** (Claude, Gemini, OpenAI, Recraft are) — phrase it as where you'd go. **No model version numbers**; the pins are a generation behind.
- **Iframe preview is web-compiled stacks only** — Flutter and React Native, not native Swift or Kotlin. Emulator streaming is the parked fallback. (`Business/Office_Hours/2026-05-25-12-...`)
- **Auth/DB undecided** — "Firebase or similar" is fine verbally. Supabase, Stripe, SQLAlchemy, Postgres are CRM stack, deliberately absent.
- **Agent SDK:** API-key auth mandatory for commercial use (a COGS input, pricing still open); "Claude Code" can't appear in product naming; Managed Agents is worth evaluating before building the runtime — hosted loop, per-session sandbox, mounts a customer repo without exposing the token.

---

## 6 — Why did you pick this idea? Do you have domain expertise? How do you know people need it?

> I was building the white-labeled app for a previous startup and realized the whole design could be automated with AI, giving customers their own design.
>
> The industry currently pays designers for this. Mighty Pro charges $1,167/month, Passion.io sells at $10–20k, and agencies charge $10–50k over 4–12 weeks.
> 
> My background is in developing agentic development and spent most of my college time in computer vision through research and a previous start up. 

**Three sentences, one per question**, in the order the field asks them: *why* (saw it while building), *expertise* (the two technologies), *demand* (the manual version is priced).

**The expertise line does not say "I don't have domain expertise, but…"** Volunteering a negative is the hedging the `investor-pitch` rules prohibit. It redefines the area truthfully instead: the product is an image generation pipeline plus an autonomous coding agent, and both are professional background. White-label market knowledge is a separate question and the pricing line answers it.

**The origin is a realization, not a pain — don't upgrade it.** A draft claimed "branding was the only work that repeated for every customer and never got faster." False: there was one app and no customer ever asked for a specific look. The true version is weaker as a hook and is the one to use. Same failure mode as the colour-determinism claim in answer 5 — a sentence that *sounds* like good pitch copy, invented rather than remembered.

**This is now the only place the origin appears** — answer 4 was cut back to the timeline. Don't cut it here too.

**"Nobody has asked me for this yet" was cut by the founder.** Demand is now answered by market evidence alone — honest by omission, not false. If a partner asks whether any platform has been spoken to, the answer is no, and it lands harder unprompted than volunteered. Defensible either way; know which one is in the form.

**Kept out:** the live-theming test plan. Verbally — *"my instrument is the sales call: I pull their biggest customers off their own logo wall and rebrand my example app live"* — because elapsed time only proves itself in the room.

**LinkedIn could not be verified** (HTTP 999 to non-browser clients). The expertise sentence is written from the founder's own description: autonomous coding agents and image generation models, professional work. Employer deliberately unnamed here — Salesforce appears in answer 4 as a job, and naming it here invites "what exactly did you do there."

---

## 7 — Who are your competitors? What do you understand about your business that they don't?

> Right now the industry is full of platforms charging $1,000+/month with human design teams behind them. Given the right tooling coding agents are consistent on a well-defined task meaning a coding agent can take a customer's specification and open a pr with the design changes.

**~60 words.** Competitors first, insight second, matching the field's own order.

**The insight is not "coding agents got good."** That claim will be in a large share of F26 applications, so on its own it categorizes rather than distinguishes. The load-bearing qualifier is *on a well-defined task* — the reason an agent is trustworthy here is that a redesign only rearranges what already exists, which is the narrow job agents are already dependable at. Keep that clause; it is the whole difference.

**Named competitors were generalized to a category by the founder.** The specific names — Mighty Pro's Design Lab, Passion.io, BentoBox under Clover, and the agencies platforms send customers to — are the stronger answer to a *who* question and are in answer 6's pricing line. Have them ready verbally.

**Gigacatalyst deliberately omitted.** Founder's call: they do features, not visuals, so they aren't competing for the same dollar. The omission is visible to any partner who knows them — have the distinction ready rather than surprised.

**Not written, have ready:** the fast follower is the real risk, because the barrier is packaging rather than difficulty. Never make a moat claim; an informed partner takes it apart and the honesty reads better.

**"What's new about what you're making?" was deleted from this doc** — it is not a field on the F26 form. It was carried forward from an earlier raw-material list without being checked against the actual application.

---

## 8 — How do or will you make money? How much could you make?

> We plan to charge the platform $100 a month for every customer running one of our designs.
>
> The white label market is $99B and there are over 2.5 million white-labeled apps in it. At $100 a month per app that's a $3B market.

**~45 words. Market size, unit count, one multiplication.** "How much could you make" is the size-of-the-prize question — investors are not asking for a forecast they expect to be hit.

**Two founder corrections produced this, both right.** An earlier draft answered bottoms-up with a single platform's revenue, which is a unit economic, not a market. The draft after that sized it off **vertical SaaS ($143–164B)** — wrong category, since most vertical SaaS is never white-labeled — and leaned on Subsplash, which makes an industry number look like one company's story.

**The figures:** white-label market **$99.19B by 2026**; **over 2.5 million white-labeled apps**. 2.5M × $100 × 12 = **$3B**. The discarded vertical-SaaS route landed on $3–6B independently, which is reassurance the order of magnitude is right.

**The 2.5M needs a better source.** It is published as *"over 2.5 million readymade apps available"* — which could mean apps deployed by businesses or templates on offer, and those are different numbers. It is the only industry-wide count available and is directionally consistent with the $99B. If asked, say it is the industry figure and you would want a better source. **Do not defend it as precise.**

**Per-platform arithmetic, kept for conversation, not the form:** Subsplash has 20,000+ churches; at a 20% upgrade rate that is **$4.8M a year from one customer.** This is the checkable half if a partner pushes on the $3B.

> [!warning] The 20% is measurably wrong for most platforms — and probably wrong in Subsplash's favour
> Measured on Shopify, the only vertical where attach rate can be counted: mobile-app-builder adoption is **1.73% of Shopify Plus stores and 0.10% across all 802,852 stores**, and it tracks **tenant size** rather than price, spanning at least 70× across the size range. Applied to any platform that sells a shared shell with a branded app as an upgrade, 20% overstates by roughly an order of magnitude.
>
> **Subsplash is not that kind of platform.** It has no shell tier — every one of its 20,000+ churches is provisioned with its own app — so the relevant question is not what fraction *upgrade* but what fraction would pay for a *redesign*, which nobody has measured (T20). The $4.8M figure may therefore be conservative for Subsplash specifically and badly optimistic for a Mighty Networks, Circle or Kajabi.
>
> In conversation: name the distinction rather than the number. "It depends whether they sell a shared shell or give every tenant an app, and those are completely different businesses" is a stronger answer than any percentage, and it is true. See `Research/Attach_Rate.md`.

**Recurring per branded tenant, not per generation — this was decided, and the reason matters.** Metering on generations ties revenue to how often a design is *made*, and a good design is made once. Modelled both ways: per-generation on new signups only (~100–150/month for a platform this size) is a **~$180k/year** customer; converting the existing 20,000 base is ~$2M **one time**; recurring per tenant is **$4.8M every year and grows as they add tenants.** Generations can still be the metering unit — the bill is monthly per tenant carrying a design.

**Where the numbers come from:**

- **Subsplash 20,000+ churches**, acquired by Roper for $800M, July 2025. Public.
- **Passion.io 15,000+ apps launched.** Public.
- **~100–150 new tenants/month** for a platform this size — *derived*, not published: total base ÷ years shipping apps (Subsplash since 2009). A floor, since growth compounds.
- **20% premium-tier attach** is a generic white-label SaaS benchmark, **not a design-tier number.** Measured in the one vertical where it can be counted, it is **0.1–1.73%** on shell-model platforms (`Research/Attach_Rate.md`). Do not use 20% for a shell platform. For a no-shell platform like Subsplash the concept does not apply — every tenant already has an app, and the open number is the redesign rate (T20).

**$100/month is the platform's COGS, not the end price, and it sits at the top of the defensible range.** They mark it up and sell the tier at $300–500, making $100 a 20–33% cost of revenue — software companies get uncomfortable above ~30%. It holds only if they price the tier at $300+. **Defend it as the price at which the platform still keeps 70% on a tier they currently cannot scale**, never as a final number.

**Margin underneath is not a problem.** A redesign burns tokens once and then earns $1,200/year. Even at $100 of generation cost it pays back in month one. This partially closes T7 from the office hours doc, which flagged that *"close enough at a fraction of the price"* was meaningless until the fraction had a number.

**Mighty Pro's price needs re-checking before submission.** Answer 6 states $1,167/month; current sources put Mighty Pro at **$3,000–5,000+/month** (one cites $28k/year). The higher figure helps the argument, but a precise stale number is a liability. Change answer 6 to "$1,000+/month" and let this answer carry the range.

---

## 9 — Founder Video (please record a one minute video introducing the founder(s))

> Hey, I'm Jesse. I'm an AI engineer that's worked at Salesforce and AWS, who now has a start up called Recompose. It let's every customer of a white-label app do a full visual redesign for their business.
>
> Currently in the industry if a customer wants a custom design, platforms charge over a thousand a month, and agencies charge ten to fifty thousand as a one time payment while taking weeks.
>
> The start up i'm building is made to automate it. It has agents that redesigns imagery, palette, typography, icons, layout and animations across every screen, editing code where it has to. This can cost the customer 90% less than what is being charged in the industry currently.
>
> I came up with this idea from a previous start up I pivoted away where I was building a white labeled app. While building, it felt like what i was doing could be automated so here I am doing that.
>
> Thanks, and i hope to see you in San Fransico

**~165 words, ~66 seconds.** Company first, founder second — the order all four YC-supplied examples use. Zenefits gives the whole mechanism and both "interesting things about this business" before "a bit about me and my background." Founder's correction to an earlier Claude draft that led with biography, and it was right: *"They care abotu the start up first, why it has value, then i can get into why i start it and why im the right person AFTER."*

**The credential opener is the Flip/Kamar move.** *"I'm an AI engineer that's worked at Salesforce and AWS"* does the founder-credibility work in ten words, the way Kamar's *"former Google and Apple engineer"* does, which removes the need for a biography paragraph later.

**Length is not a hard limit.** The Zenefits example YC supplies runs **2:32**.

**Open flags on this script — none of these are ruled on:**

- **There is no proof in it.** All four example videos contain evidence something exists (Campus Job's 20k users, Kamar's bots powering a six-figure business, Parker's sync integrations at SigFig, Teespring's $600k). This script is entirely claim. **Eighty brands in under two hours, running live in two production Flutter apps** is the only hard artifact in the whole application and it is currently absent.
- **The 90% contradicts answer 8.** That answer prices this at **$100/month to the platform**, and its own notes say $100 is their COGS, not the end price — *"they mark it up and sell the tier at $300–500."* Against $1,000+/month that is 50–70% cheaper, not 90%. Two fields of one application disagreeing. Same failure mode as the stale Mighty Pro figure: a precise number volunteered where none was required, in a field (T7) that is still undefined.
- **"an AI engineer that's worked at Salesforce and AWS"** parses as *AI engineer at both*. AWS was distributed tracing, X-Ray, Lambda and CDK — infrastructure. One comma fixes it: *"I'm an AI engineer, I've worked at Salesforce and AWS."*
- **Copy, spoken-irrelevant but the doc should be clean:** "let's" → *lets*; "agents that redesigns" → *redesign*; "pivoted away where" → *pivoted away from, where*.
- **Solo founder is not stated.** Visible on camera and the form asks directly, so saying it spends words naming a weakness with no answer attached. Parker Conrad carried it off only because he had a named non-recruit clause and named people he was recruiting.

**Deliberately absent: zero customers.** The application states it plainly; volunteering it in sixty seconds is pre-empting an objection nobody raised — the same rule that governs every other answer here.

**Delivery:** phone camera, face filling the frame, quiet room, window light in front. Learn the beats, do not read it — reading off a script is the single most visible flaw in a bad founder video. Two or three takes. Both Kamar and Liz say "um" repeatedly in the examples and it costs them nothing; polish is not the bar.

---

## Pre-submit checklist (spent — kept as the record of what was checked)

- [ ] The 50-character line is under 50
- [ ] Every answer is 1–2 sentences (tech stack exempted)
- [ ] Answer 2's first sentence establishes visual-only
- [ ] No answer contains a moat claim
- [ ] No answer pre-empts an objection
- [ ] Zero customers stated plainly
- [ ] "Four months" vs "eight months" — one number, held everywhere
- [ ] Mighty Pro price re-checked; answer 6 says "$1,000+/month", not a stale precise figure
- [ ] Every question in the doc is actually a field on the form
- [ ] Founder video recorded and uploaded — company first, founder second
- [ ] Read it aloud once. Would it survive being repeated by someone else at dinner?

---

## Demo script — as delivered, 2:22 (recorded 2026-07-30)

**Status: recorded.** Timings below are measured off `Recompose-YcDemo-Jesse.mp3`, not estimated. Still a working surface, not frozen like the answers above.

Concepts engaged: [[Full_Visual_Redesign]], [[Tokenized_Design_System]], [[Never_Touch_Their_Code]], [[Re_Derived_Not_Forked]], [[Integration_Surface]], [[Autonomous_Operation]].

**What it is walked on:** the studio's three pages, now on `main` — Generate (customer, real), Onboard (admin, demo-ware) and Fleet (admin, demo-ware) — plus the before/after compare and the ballet app `secondposition` in `RecomposeJsxMockUps`. The order is **customer first, platform second**: the buyer has to want the outcome before they will listen to how it is delivered.

**The spine is one worked example, not a feature tour.** A single ballet studio is named up front and carried through every screen — brief, generation, layout, animation, themes — and only then does the platform's side appear. That choice is what bought the depth: describing one tenant's app changing is concrete in a way that "the pipeline generates images, palette, typography" is not.

**384 spoken words over 141.6 seconds — 163 wpm.** Note for future drafts: **163 is the real delivery rate, not the 150 wpm these scripts were planned against.** Word budgets built on 150 will run ~8% short. There is also 2.7s of dead air at 0:28 while the generation is watched, which is the only silence in the recording.

**It ran 22 seconds over the 120-second target.** The overage is not evenly spread — see the timings.

### 0:00–0:04 · What it is

> My start up Recompose lets customers agentically redesign white-labeled apps.

### 0:05–0:16 · Ballet framing + questionnaire

*[Generate view. Agent's first question on screen — click a chip or two.]*

> We are going to walk through the experience of a ballet studio using Recompose to redesign their white labeled app. First an agent interviews them about their brand and writes a brief to be approved.

### 0:16–0:28 · Theme generation

*[Accept the brief. Run starts. Before/after compare — default app left, ballet redesign right, repainting live. 2.7s of silence at 0:28 while it lands.]*

> Once approved it starts the generation. The default app is on the left and the ballet redesign in on the right.
> It has generated images, palette, typography, icons and wording all based on the ballets brand.

### 0:31–0:46 · Layout + animation generation

*[Start the layout agent from the transcript card. Then the celebration flow — `secondposition/celebrations/`, which is where the animation claim is actually backed.]*

> Next the layout and animation agent runs. This modifies the visual structure of the app, the most important part truely customizing their app to be perfect for their brand. It also makes custom celebration animations for their users.

### 0:46–0:52 · Theme variety on one layout

*[Theme chip only. The ballet layout holds while the theme changes under it — the separation is shown, never stated.]*

> Here is some examples of the ballet app with different themes so you can really see the extent of customization it enables.

### 0:52–1:01 · Linking

*[Onboard page. Repo URL sitting in the field. Hit Connect.]*

> Now the white labeled platform's side. Integration is one step: a link to the repo and read access.

### 1:01–1:14 · Tokenization agent

*[Create design fork → log lines run → the found counts land.]*

> We fork their repo and an agent tokenizes their app allowing for the themes to work. This means integration requires zero code changes on the white labeled platform side, we only need read access to their codebase.

### 1:14–1:22 · The fleet

*[Fleet page, unfiltered.]*

> This is a mock up of the white labels platforms view when they use our product. It shows all the possible states of process.

### 1:23–1:52 · The states

*[Click each filter tab as it is named. This is the order a design actually travels, which runs right-to-left across the bar — the bar itself renders synced-first.]*

>  Productionalizing state is when the agent turns the customer's design into production code. 
>  Merging state is when the white labeled platform codebase moved forward so agents are autonomously  merging that change. 
>  Deploying state is putting the changes onto the app store.
>  Live and in sync  state means customers desgined apps are deployed to production.   
>  And Needs human help state. This when the agent ran into and error it couldnt fix on its own which should be rare.

### 1:52–2:04 · Agentic changes

*[Hover "Talk to the agent" on a card.]*

> If a employee of the white labeled app wants to make changes they can talk to an agent which can autonomously dispatch a change or fix. Or they can edit the branch directly themselves. 

### 2:04–2:22 · Closing: we never edit their repo

> One thing I want to reiterate on is that we never directly edit the white labels platforms repo. Everything happens on a fork that is managed completely by agents. Meaning there is essentially no manual integration and maintenance for a white label platform integrating with this product.

### Open flags — none of these are ruled on

- **The close asserts something undecided.** *"Essentially no manual integration and maintenance for a white-label platform"* holds only if Recompose resolves every halt. Who resolves a halt is open and leaning toward platform staff (`Open_Questions.md` §2.1c). Those two cannot both be true.
- **The scale argument was cut and nothing replaced it.** The bounded-layouts → bounded-branches close is gone. It was the only part of the pitch that explained why this does not collapse under tenant count, and it was the reason the theme/layout split mattered commercially rather than just technically. The demo now shows the split and never says what it buys. *(This also retires the old flag about the fleet page's thirty `design/<name>` branches contradicting the branch-count claim — no claim, no contradiction.)*
- **22 seconds over, and the states walk is where it went.** The five states take 0:29 — a fifth of the runtime — to narrate a list the page already labels. The customer half, which is the half with real software behind it, gets 0:47. If the target stays 120s, that block is the cut.
- **Productionalize leads the states walk and is not built.** First of the five named, most attention, least real. Also a terminology drift worth settling: the recording says *"productionization"*, this doc says *"Productionalizing"*, and `fleetFixtures.ts` says *"Productionalizing"*. Pick one.
- **Fleet is labelled a mockup out loud, Onboard is not.** Onboard is still narrated as though the connect and the fork pass are really happening.
- **A named tenant now carries the whole demo while there are zero customers.** "A ballet studio" is framed as a walkthrough rather than a client, which is honest — but the app folder is `secondposition`, the logos are real pipeline output, and nothing in the recording says nobody has bought this. The omission is louder than it was on the form.

**The animation claim is backed** — `RecomposeJsxMockUps/src/apps/secondposition/` carries 19 distinct `@keyframes` and its own `celebrations/` folder (`SparkleBurst`, `WinsTile`, `CountUpText`, `RewardsCarousel`). Say it without hedging.
- **Nothing in the script states zero customers.** Consistent with the application's rule against pre-empting objections, but the fleet page shows thirty synthetic tenants, so the omission is louder here than it is on the form.
