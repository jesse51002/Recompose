---
tags: [business, strategy, architecture, thesis]
status: current
---

# Architecture Thesis

Concepts touched: [[AI_Design_Compression]], [[Tokenized_Design_System]], [[Orchestrator]], [[Modal_Coherence]], [[Full_Visual_Redesign]], [[No_New_Requests_Invariant]], [[Re_Derived_Not_Forked]], [[Integration_Surface]], [[Tier_Unlock_ROI]], [[Closed_Design_To_Production_Loop]], [[Shopify_Pattern]], Template_Marketplace, [[Brand_Is_Product]], [[Freelance_Conversion_Thesis]].

> Rewritten for Recompose. The architectural reasoning below carried over from the pre-pivot version of this doc; the claim that the vertical is class-based gyms did not. Decision: `pivots/2026-07-27-11-customization-engine-is-the-company.md`. Exploration: `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md`.

## The load-bearing claim

The structure of an app — data model, workflows, integrations, user flows — is hard to build well, broadly the same across the customers of any one platform, and not where those customers want to differentiate. The visual surface is where they want differentiation, and it is where AI compresses cost from weeks of human labor to hours of machine plus operator time. That is [[AI_Design_Compression]] and it is the premise the whole company sits on.

What the pivot changed is **who builds the structure**. The pre-pivot version of this thesis had us building both halves: a vertical app whose structure we owned and whose styling layer we parameterized. Recompose builds neither the structure nor the app. The platform already owns the app, the tenants, the release train, the store listings, and the customer relationship. **The only thing left to own is the transformation** — brand brief in, branded production app out, no human handoff in between ([[Closed_Design_To_Production_Loop]]).

## The invariant moved: from structure-vs-style to functionality-vs-arrangement

The old boundary was *code is fixed, tokens and assets vary*. The scope decision in the pivot moves it: the product is a [[Full_Visual_Redesign]] — every screen, every asset, every surface, **including layout** — and the fixed thing is now **functionality, not code**.

The invariant, in the founder's tightened form (P14): a redesign changes **arrangement only**. No screen is merged or split, no functionality added, none removed. Every screen does what it did before and needs exactly the data it needed before, so the API surface is provably identical ([[No_New_Requests_Invariant]]).

This is a larger product surface and a **tighter** constraint at the same time, which is the unusual property of the pivot. It is checkable rather than argued: a platform's own engineers can diff the API calls a variant makes against the baseline and confirm nothing was added or removed, so their QA surface is unchanged by construction. It is also strictly tighter than Gigacatalyst operates under, since they generate new functionality against newly discovered APIs.

The gate has never been built or run. See T11 in the office hours doc.

## Two parts: assets are data, layout is code

The architecture is explicitly two systems with a boundary between them, and the boundary is where determinism runs out.

**Part one — the asset pipeline.** An app-agnostic dependency DAG resolves palette, typography, copy, icons, and images. Colour resolves four base OKLCH slots in one LLM call with WCAG AA enforced as an accept condition and the rest of the palette derived deterministically in Python; fonts are validated live against the Google Fonts catalogue; copy is length-bounded per slot; icons are matched against a curated set with generation as fallback. Coherence is achieved **structurally** — the shared derived palette feeds every image prompt and `depends_on` edges fold one slot's look into another's — not by a critique loop. The graph is validated before any paid call, cost per run is bounded and known, and a failed node skips only its transitive dependents. See `README.md`.

**Part two — the layout agent.** Layout is the surface no slot inventory can express, so an agent edits it under the invariant above. As of `pivots/2026-07-28-01-agentic-editing-all-in.md` this half is specified rather than merely named, and it is four steps:

1. **Tokenize** the platform's codebase agentically into the shared fork. Forward-deployed at MVP. This pass tokenizes every asset — images, colour, type become slot references — and does **not** mock anything; mocking belongs to the mirror.
2. **Mirror** the codebase into a **JSX visual mock** — no features, no logic, no API calls, no state. Generated once per upstream release, per platform, amortized across every tenant. This is where the design agent works and where the end user watches it happen.
3. **Design and validate** against screenshots. The agent has full freedom over arrangement; the validator loops with it until accepted.
4. **Productionalize** — approved visual design in, production code out, invariant preserved — then a production validator, then sync on every upstream merge. Each design is **one fork carrying `uat` and `main`**; generation runs against `uat` because it is the branch that is ahead, and `main` fast-forwards off the existing history rather than being maintained separately.

Two properties of that shape are load-bearing. **The mirror is visual, never functional**, so the arrangement-only invariant never crosses a translation boundary; it is enforced at productionalize time on real production code, where the platform's own engineers can still verify it by diff. And **layout freedom is bounded by the invariant rather than by an enum** — structural presets were built, tested, and rejected because a bounded option set reproduces the platform's original design language however many options it exposes, which is a reskin.

The split is load-bearing twice over. Engineering: routing palette generation through a coding agent would be slower, more expensive, non-deterministic, and would throw away the WCAG and coherence guarantees the pipeline already provides. Positioning: one agent doing everything reads as a wrapper over a model, and "agentic coding agent" is a crowded shelf. **Deterministic where determinism is available, agentic only where it is required, reads as architecture.**

Two claims from the pre-pivot thesis survive unchanged. The product is the [[Orchestrator|orchestration layer]], not the generation models — Recraft, FLUX, Firefly and their successors are commoditizing primitives anyone with an API key can call. And [[Modal_Coherence]] is the actual hard problem: each module producing technically-correct output independently is solved; outputs that compose into something that reads as one designer's work is not. The [[Tokenized_Design_System|tokenized design system]] is the substrate that makes both possible, and it is now what we produce *inside someone else's app* rather than something we build for ourselves.

## There is no integration — that is the product

The engine does not run inside the platform's app, so the [[Integration_Surface]] is satisfied by there being nothing to integrate rather than by an SDK. **The multi-language SDK roadmap is not the plan.**

Adoption was named as the biggest expected blocker in the founding pivot, and the Codex cold read located it precisely: messy design systems, hardcoded screens, QA ownership, and internal resistance to letting an external system drive production UI. Every one of those objections is about **an external system operating inside their codebase.**

The fork model removes the premise rather than answering the objection. Recompose keeps its own tokenized fork of the platform's app and derives each design from it. The platform grants **read access**. There is no PR, no write, no library to adopt, no version to keep up with, and nothing to review.

Two consequences worth stating plainly:

- **The organizational gate disappears, and that matters more than the engineering saving.** An external agent with write access to the trunk needs engineering leadership sign-off. Read access does not. This changes *who has to say yes*, which for a solo founder selling into a platform is the difference between a six-month procurement conversation and a demo.
- **The benchmark stops applying.** Gigacatalyst publishes ~2 days to install and ~2 weeks to full integration, explicitly *"not an instant plug-and-play add-on"* — from a funded team of four. That was the bar to beat when there was something to install. There is no longer an installation step to measure, so T9 is no longer the right test. The remaining time cost is the forward-deployed tokenization pass, which is our work, not theirs.

What exists today is more than the earlier drafts of this doc credited, because a large body of work lived only on a worktree branch until 2026-07-28:

- **The read path.** A read-only FastAPI over the produced `output.yaml`, deployed on App Runner with assets served from a CDN.
- **Two runtimes, not one.** `ThemeFlutter` (consumed live by the member app and the CRM) and **`ThemeReact`** — a built web runtime, the React mirror of ThemeFlutter, shipping as the `theme-react` library.
- **A standalone theme browser**, `ThemeReact`'s app half: pages the catalog and previews any design in a phone frame, with an **Inspect** view showing every artifact a run produced (four colour roles and their 28 derivations, the flat palette, both typefaces set in themselves, generated copy, icons and imagery).
- **A studio API**, `ThemeTree/studio` — brief service, run launcher, run registry, run reader, plus a brief-authoring agent. Local only by design (`make studio`, 127.0.0.1:8002); it spends real money per launch and is not deployed. The read-only API is the one that ships.

**So the runtime path is not in question — it was extended to a second platform.** An earlier version of this section asked whether `ThemeFlutter` and the read API would still have a job once layout lives in a fork. A second runtime having been built answers it: the resolved-asset layer is being invested in, not retired. The open part is narrower and unchanged — whether assets are fetched at runtime or baked at build time once layout is code, with a hybrid the likely shape. "Nested HTML" remains undefined (Open Question 2.6).

### The consequence nobody has priced: one design, one build

This one is not resolved and should not be treated as settled. **Layout is code**, and each design is its own fork, so **each design is its own binary.** Under the old token-only model one binary could serve every tenant because a theme was data fetched at runtime. That is no longer true for the layout half.

This has teeth:

- It puts a real filter on the buyer — a platform that ships **one** app for all tenants and themes it at runtime cannot consume per-design builds without changing how it releases, which is exactly the architectural change the core principle promises to avoid.
- It partially resurrects the distribution question the founding pivot marked as *"largely stops being this product's problem."* That was true when the platform shipped one binary. Per-design builds mean per-design store submissions, which is Apple Rule 4.2.6 territory again, and it was never confirmed.

The honest position: never touching their code solved the codebase objection and moved the cost into the release pipeline, where it has not yet been examined. See Open Question 2.5.

## Vertical-agnostic by intent, not just by construction

The pipeline has always been app-agnostic **by construction**: nothing app-specific lives in Python, the slot inventory and `depends_on` edges live in `apps/<app_id>/` YAML, and a new app is one new folder rather than a code change (`CLAUDE.md`).

What changed is that this stopped being a nice property of the implementation and became **the shape of the company**. There is no chosen vertical. The buyer is any multi-tenant white-label platform, in any vertical, where **every tenant already has their own app** — Subsplash, Passion.io, Q2, Banno, Alkami and their peers — because the population a redesign can act on equals their tenant count rather than the 0.1–3% who take a branded-app upgrade on a shared-shell platform (P1a). Vertical is now a **targeting question, not an architectural one**. Where tenant-side willingness to pay concentrates is a separate and inherited hypothesis ([[Brand_Is_Product]]), unvalidated for this ICP and weakened by three independent findings — see below.

CombatDen is `apps/combatden/` — the reference implementation, the demo canvas, and the eval bed. It is history and a fixture, not the product.

Two honest limits on the agnosticism claim. It is unproven outside `apps/combatden/` and `apps/smoketest/` (T5). And the mirror has never been generated from a codebase the founder did not himself write (T16).

**The stack filter moved, and it narrowed.** The 2026-05-25 session had the ICP potentially restricted to stacks that compile to web, because the live-preview path depended on it. The JSX visual mirror dissolves that for the *design* half: any stack can be mirrored into JSX, so preview and design no longer care what the production app is written in. What still depends on the stack is **production-side validation** — screenshot-diffing the shipped app requires it to render somewhere, which Flutter Web gives for free and native Kotlin/Swift would need a simulator for. So the constraint survives, but it applies to one step at the end rather than to the whole product, and it is a validation-tooling problem rather than an ICP boundary.

## The four binding constraints, re-scored for the platform ICP

`Research/AIBrandCompetitiorAnalysis.md` found that design labor was **one** of four constraints holding white-label apps at logo-and-colour, and not the most binding. That finding stands and it is the most useful thing in the research. Under the platform ICP all four are re-scored:

- **Apple Rule 4.2.6 (distribution architecture)** — largely stops being this product's problem, because platform customers already ship their own apps under their own accounts. Flagged in the pivot as **needing confirmation**; the old distribution doc was left behind in the CombatDen vault and has no Recompose equivalent yet.
- **Regression-test combinatorics** — returns, sharper. If each tenant's app is code-diverged, the platform can no longer ship one update to all tenants. The principle is settled: divergence must never accumulate, so a redesign is a repeatable transformation re-applied per version rather than a permanent branch ([[Re_Derived_Not_Forked]]). **The mechanism is deliberately undecided** and is the largest open architectural question — see below.
- **Integration and onboarding labor** — named in the research as the constraint that dominated unit economics in the Bigtincan/Showpad/Twilio/Mendix cohort and the one AI does not compress. This is now the product rather than a footnote, and P14a is the bet that it compresses after all. It is also the premise most likely to be wrong; T4 is its falsification test.
- **Weak end-user willingness-to-pay for brand depth** — not solved, made **irrelevant**. Per-tenant theming is not sold to satisfy end users; it is priced as a tier ([[Tier_Unlock_ROI]]). Embedded-analytics vendors publish a level 1–4 white-label ladder in which level 3 is explicitly per-tenant theming for reseller scenarios. The tier exists and is expensive — but the premium prices in circulation (Mighty Pro, Circle Plus, Passion.io DFY) are **tier prices covering migration, a named strategist, App Store operations and higher limits**, set by the size of the tenant's business rather than by design cost. The design work itself is priced standalone at $99–$499 (`Research/Enterprise_Tier_Anatomy.md`). What is scarce is not the money, it is the **3–6 week human turnaround** the tier runs on. The pitch is *"a price tier you can't currently sell at volume"* and *"the deals you lose on brand"* — never *"your tenants will love it,"* which the vault's own research disproves.

Because the product now changes structure and not only assets, the labor removed is the designer **and** the front-end engineer implementing the design — the whole custom-build line item, $10–50k and 4–12 weeks in the agency market. The [[Freelance_Conversion_Thesis]] returns inverted: agencies are not the buyer, but agency-grade work is what the product replaces.

## What survives of the Shopify read

The deflationary [[Shopify_Pattern]] finding — ~98.5% of Shopify merchants run stock themes, only ~1.5% truly custom — is one of three measurements from the same platform pointing the same way. The others: **1.73% of Shopify Plus stores run a mobile app builder, 0.10% across all Shopify stores**, with adoption spanning at least 70× across the tenant-size range at a single price. The pattern generalises past themes — depth of customization is bought by the largest tenants and almost nobody else, and it tracks tenant size rather than price.

It remains a finding about **end businesses**, which under this ICP are the buyer's tenants, one level downstream of the customer. Two things follow.

**Presets are the demo surface, not the architecture.** Pre-generated theme sets and mix-and-match combinations are how the output is shown in a sales call or an application video. They are not the mechanism, which is the two-part pipeline-plus-agent above. Whether the curated preset model is the platform's product or the platform's tenants' product is unexamined (Open Question 7).

**Default quality is the product.** Most customers ship the first pass without iterating, so first-output quality is the real bar. The ambition raises that bar rather than relaxing it: a logo-and-palette swap fails invisibly and just looks generic, while a full redesign fails **visibly**, because the buyer's expectation is now "this was designed for us" and anything short reads as broken rather than plain.

The quality target is *close enough at a fraction of the price*, not parity. What adding structure changed is the comparison target — from a generic template to a custom build — not the requirement, which was never to beat human designers.

## What this is and is not

- **Not a horizontal AI app builder** (Lovable, Bolt, v0). Those build apps from nothing. This transforms an app that already exists and already ships.
- **Not FlutterFlow.** App construction is not fleet rebranding — a correction the founder made to Claude's competitive claim, and it dropped a category from the set.
- **Not a coding agent product.** The two-part split is what distinguishes it: pipeline where determinism exists, agent only where it does not.
- **Not Gigacatalyst.** They change what the app does; this changes how it looks. Both are now code-modifying agents inside a host codebase, so the separation is *what each one changes*, not how either works. Their safety story does not transfer: everything they generate is **additive** and therefore separable by construction, which is why sandboxing works for them. A redesign modifies screens that already exist and cannot be sandboxed — which is exactly why the functional-equivalence gate has to carry that weight instead. *"Why isn't visual just their next feature"* is unanswered (Open Question 9).
- **Not token tooling, a brand API, or a design tool.** They stop at tokens, at brand kits, and at a mockup a human still has to implement. Nobody found closes brief → coherent multi-modal asset set → store-ready production app across a fleet of tenants on a shared shell.
- **Not defensible by moat.** The barrier is packaging, not difficulty, and the founder concedes platforms could build the pipeline themselves. Defence is being the default first plus coherence quality. Never make a moat claim.

## Open architectural questions

Named here because they are architecture, not strategy, and because none of them are answered.

1. **Productionalize is the hard part, and it is where the product actually lives.** Approved visual mock in, production code out, invariant preserved. It is the only step that must carry the invariant, the only translation whose output ships, and the one with no free oracle. The specific hazard: **the mock has no edge cases.** It does not know a list is paginated, a name can be 47 characters, a screen has loading, empty, error and overflow states — so the design agent designs against ideal data and productionalize must reconcile that against production code which is mostly edge cases. Two mitigations proposed and not yet built: have the mirror mock **every state** rather than the happy path only, and screenshot-diff the production build against the approved mock (T13).
2. **What terminates the design validator loop.** Screenshots give an accept condition where there was none, which closes the older "layout has no accept condition" risk. They do not give a *stopping* condition, and an unbounded loop is unbounded cost. Whether a VLM screenshot judgement tracks human design judgement well enough to terminate is untested (T14).
3. **The functional-equivalence gate is unbuilt.** P14 is strong precisely because it is checkable, and it has never been checked. Build it against CombatDen before it is ever promised to a customer (T11).
4. **App-agnosticism unproven on a foreign app** (T5); the mirror unproven on one (T16).
5. **The error budget has no denominator.** ~95/4/1 is the stated **target** — never measured — and per screen, per tenant-redesign or per sync operation differ by orders of magnitude in how often the halt path fires (T15). *What makes the budget acceptable is no longer open: the pipeline halts rather than ships (`pivots/2026-07-30-22-autonomous-is-the-promise.md`). Who resolves a halt is.*
6. **"Nested HTML" is undefined** (Open Question 1).

**How a tenant's redesign stays current across platform releases:** agentic re-application on every upstream merge, landing on **`uat`** — the platform's own branch that is ahead of `main` — rather than on production. `uat` is a branch, not a review environment, and there is no approval queue. A re-application the agent cannot complete **halts** rather than landing unverified, which is what makes the stated error budget survivable without a reviewer. See `pivots/2026-07-28-01-agentic-editing-all-in.md` and `pivots/2026-07-30-22-autonomous-is-the-promise.md`.

Pricing is not an architectural question, and the architecture does not decide it. **Pricing for this ICP is undefined.** The old gym-owner ladder is dead and does not transfer; the working figure in `YC_Application_F26.md` is a defended range, not a decision.
