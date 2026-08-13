---
tags: [architecture, research-synthesis, agents, codegen, risk]
status: current
date: 2026-08-12
source-session: Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary.md
---

# Agentic code generation: the state of the field, and what Recompose has to solve

Concepts touched: [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]].

Synthesis of [[Research/2026-08-04-mobile-app-code-gen|Research/2026-08-04-mobile-app-code-gen.md]], which surveyed AI app builders, brownfield coding agents, automated large-scale code change, fork maintenance, per-tenant customization architecture and visual validation. Detail and sourcing live there; this is the position.

> [!warning] This doc was written to close the feature route, and the route reopened on 2026-08-12
> Everything under **What the field has actually shipped** is a factual survey and still holds. The sections after it were rewritten by [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|the modular feature pivot]]. The numbers did not change; **what changed is that they were being applied to a task the product no longer performs.**

---

## What the field has actually shipped

**Every AI app builder is a greenfield generator.** v0, Lovable, Bolt, Base44 on web; a0.dev, Rork, Vibecode, FlutterFlow AI on mobile. None modifies a large, existing, human-written codebase.

**Brownfield agents work at roughly two-thirds, with a human on every task.** Devin merges 67% of its PRs; GitHub's Copilot Coding Agent hit 67.9% across 878 PRs on `dotnet/runtime` — and cannot open a PR on its own. The human baseline in the same repo is 85–87%. SWE-bench Verified sits near 80% and is saturated; **SWE-bench Pro's commercial set puts the best models under 20%.**

**It collapses on the shape a multi-file change has.** Success falls below 10% once a patch touches three or more files or spans 100+ lines; patches touching seven or more are never solved; repos over 500 files rarely exceed 5%. JavaScript and TypeScript score lowest of any language family, which is React Native.

**Mobile is the worst-supported domain.** iOS and Swift have essentially no robust agent benchmark. Native build config, code signing and App Store review are failure modes web tooling never touches.

**The reliable systems are deterministic, not generative** — OpenRewrite's compiler-accurate transforms, Uber's Piranha, Meta's SapFix. All three still route output to a human before it lands. **No production system found auto-merges agent output to trunk.**

**The additive boundary is the field's universal safety story.** Salesforce metadata, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper SDK, Banno's Plugin Framework and Gigacatalyst all converged independently on extension points and sandboxes rather than per-tenant source modification, because forks turn maintenance into O(tenants × changes). **Q2 Code (April 2026) is the same boundary drawn by a platform building this in-house** — they wired Claude Code into Bedrock to generate *SDK-compliant extensions*, not source changes.

**Fork maintenance: syntax solved, semantics not, autonomy nonexistent.** Structural merge is mature (Mergiraf); semantic conflicts — clean merge, broken behaviour — are an open research problem. **No published example exists of an agent autonomously maintaining a long-lived fork against moving upstream.** No drift data exists anywhere, because no such system is documented.

**VLM judges rank; they do not score.** r = 0.93 on pairwise ranking of design outputs, but only 32–34% exact agreement on absolute scoring. *"VLM Judges Can Rank but Cannot Score."*

**The graveyard.** Builder.ai (~$450M raised, insolvent May 2025). CodeParrot (YC W23, Figma → production frontend code, shut down July 2025): *"the generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value."*

---

## Why Recompose now generates features, and what the numbers actually said

The feature route was closed on 2026-08-04 and reopened on 2026-08-12. The reopening is not a claim that the field improved in eight days. It is that **every number above measures a different task from the one the product performs.**

**What the numbers measure.** An agent *editing* a large, existing, human-written codebase: locating the right files, understanding code it did not write, and changing it without breaking anything. That is where ~67% comes from, where the sub-10% multi-file collapse comes from, and where the 500-file repository ceiling comes from.

**What a module is.** New code, written into a defined slot, alongside code it does not touch. Its interior is greenfield — **and greenfield generation is the one capability this field has actually shipped at scale.** v0, Lovable, Bolt, Base44, a0.dev, Rork, Vibecode and FlutterFlow AI all work, and every one of them is a greenfield generator.

So the route moves from *contradicted by evidence* to **unevidenced in both directions.** Nobody has measured autonomous greenfield module generation into a third-party extension surface either. That is an honest upgrade over a closure, not a proof.

> [!danger] The correction that matters more than the reopening
> **This is harder than the visual redesign, not easier, and greenfield describes only the module's interior.** Its boundary — auth, session, user identity, tenant scoping, base data reads, RBAC inheritance — is integration against a production system nobody here wrote. That is most of the work and it is exactly where failures stop being cosmetic.
>
> The old formulation still holds and now cuts the other way: *a bad output for them is a security incident, a bad output here is ugly, and that asymmetry is the reason the visual half is tractable for one person.* **The redesign was an unsolved problem with a cosmetic failure mode. This is an unsolved problem with a security failure mode.**
>
> And the cost signal is real: thirteen of nineteen platforms refuse per-tenant functionality outright, and the six that supply it staff named engineering organisations and price behind sales. If it were straightforward, someone would already have shipped it.

**What the field's structure gives back.** The additive boundary, rated load-bearing at high confidence across every verified-safe system surveyed. The visual product structurally could not have it, because a redesign modifies screens that already exist and cannot be sandboxed. A module is separable by construction, which is why it is the only version of the feature route worth attempting.

Note that METR's doubling trend applies to the *50%* reliability horizon; the 80% horizon is roughly five times shorter, and mobile tooling is not obviously on the fast part of that curve.

---

## The challenges

None solved. All believed solvable, and **the list is longer and heavier than the visual product's was.**

### The boundary — the new hard part

1. **Auth, session and identity passthrough.** A module runs as the tenant's user inside the platform's auth context. Getting this wrong is not a bug, it is an incident. Gigacatalyst's answer — inherit the host's auth and RBAC rather than model it — is the shape to copy rather than invent.
2. **Approved-API scoping and data classification.** Which endpoints a module may call, and which fields are safe to render. Gigacatalyst built agentic API discovery for exactly this, and it is a funded team of four's entire first product.
3. **Tenant scoping.** A module reading the wrong tenant's data is the worst available failure and it will not look like a failure.
4. **Schema validation against a moving API.** The module's assumptions about response shape have to be checked, not trusted.

### Contract drift — what replaced fork drift

5. **Coupling went from visible to invisible.** A git merge conflict is an event somebody is told about. A module's API dependency has no such event: a field that keeps its name and changes meaning passes cleanly and every module built on it is silently wrong, indefinitely.
6. **The proxy's limits.** An anti-corruption layer genuinely reduces fan-out by making one place responsible for the platform's data shape. It cannot see a semantic change, and *"is this a big update"* is an unsolved judgement whose cheap-direction failure does not announce itself.

### The accept condition — the load-bearing gap

7. **There is no oracle.** The visual product had two, both cheap and conclusive: a screenshot a human judges, and a diff proving the API surface is identical. Neither exists for a feature. Additive-only is diff-verifiable for *existing* code and says nothing about whether the added thing is correct.
8. **Four candidates, none chosen.** Read-only modules first; generated tests through the platform's CI; a bounded primitive vocabulary; tenant approval on real data. Each has a named cost — see [[Strategy/Product_Boundaries|Product_Boundaries.md]].
9. **Autonomy is suspended until this closes.** Halting was sufficient *because* a bad output was cosmetic. Neither premise holds now, so [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] cannot be claimed and the old ~95/4/1 target must not be quoted at all.

### Generation

10. **Mobile is the worst-supported domain in the field.** No robust iOS/Swift benchmark; JS and TS score lowest of any language family, which is React Native; native build config and signing are failure modes web tooling never encounters. Argues for targeting the friendliest stack first.
11. **Run-to-run instability.** Repeatability, not quality. Cheap to check and never checked.
12. **Three surfaces, not one.** Module, backend, admin dashboard. A custom feature nobody can configure is dead on arrival, so the admin surface is not optional — and each surface carries its own security surface.

### Operational

13. **Who resolves a failure.** Every production system in the field keeps a human at the merge gate — Devin, Copilot CCA, Meta's SapFix, and even Uber's Piranha, a deterministic tool that only deletes stale feature flags and still routes its diff to the flag's author. This was already the hardest operational question and it is harder now that a failure can be a data problem rather than a cosmetic one.
14. **The build handoff, and whether there is one.** Runtime insertion means layout arrives as data and nothing new ships. Compile-time means a per-tenant binary and per-tenant store submission. Undecided, and it changes what the platform has to do.
15. **Nothing has ever been generated against a codebase the founder did not write.** Only `apps/combatden/` and `apps/smoketest/` have been exercised, both with the founder holding both ends of the contract.

### Commercial

16. **Cost per module must sit far under a price that does not exist.** *Close enough at a fraction of the price* is a ratio, and the ratio is the pitch.
17. **The unit of leverage is gone until it is redesigned.** One *design* could serve forty tenants, so the unit sold and the unit maintained were the same object. A custom feature is for one tenant by construction. Whether a module library re-serves later requests, and who owns it, decides the margin and is undecided.
18. **Build-versus-buy, and the filter now points at the buyer rather than away from it.** Q2 did not build a coding agent — they wired Claude Code into Bedrock, and could only do it because **Caliper has existed since 2018.** *The AI was the cheap part bolted onto the expensive part.* The real filter is whether a platform already owns an extension architecture, and **the chosen ICP is defined by owning one.** Standing condition, unchanged in wording and sharper in effect: **if two or more targets ship a native AI-extension layer, the external position erodes.** One has.
19. **CodeParrot is the recorded death, and the mechanism is the accept condition.** *"The generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value."* Cleanup time attacks the denominator of the ratio that is the whole pitch. Under the visual product this was the 4% minor band; here it is the main risk.

---

## How to read this list

**It is longer than the previous product's and every item is heavier.** Under the visual redesign most challenges were cosmetic failures wearing technical clothes — a clean merge that broke something broke it *visually*. That mitigation is gone. Items 1 through 4 are security problems, item 5 is a correctness problem with no alarm attached, and item 7 is the absence of the thing that made the whole system safe to run unattended.

**Three things are cheap and none of them is code.** Verify how deep Banno's, Tapcart's and BuildFire's extension surfaces actually go, from their public developer documentation. Check whether a second Group A platform has shipped an AI extension layer. And ask, on a call, what tenants request and how much of it is a view of data the platform already holds — because that answer decides whether read-only modules are a product or a toy, which decides item 7.

**The reopening conditions this doc previously recorded are worth keeping, because one of them was never met.** They were: measured brownfield success clearing ~95%; a robust iOS benchmark with React Native catching the pack; the equivalence gate built and proven first; **and a customer** — *"because extending scope before the narrow version has a buyer is the pattern this vault has run five times."* The route reopened on the grounds that the first three measure the wrong task, which is a fair argument. **The fourth was not addressed, and it is the one with the track record behind it.**
