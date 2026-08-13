---
tags: [architecture, research-synthesis, agents, codegen, risk]
status: current
date: 2026-08-12
source-session: Office_Hours/2026-08-10-22-Office_Hours_Modular_Feature_System_And_The_Extension_Boundary.md
---

# Agentic code generation: the state of the field, and what Recompose has to solve

Concepts touched: [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]].

Synthesis of [[Research/2026-08-04-mobile-app-code-gen|Research/2026-08-04-mobile-app-code-gen.md]], which surveyed AI app builders, brownfield coding agents, automated large-scale code change, fork maintenance, per-tenant customization architecture and visual validation. Detail and sourcing live there; this is the position.

> [!warning] Read the numbers against the right task
> The survey below measures agents **editing** large existing codebases. A module's interior is greenfield and its boundary is integration work, so most of these figures bound neither half directly. The section after the survey says which parts apply and which do not.

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

## What the numbers bound, and what they do not

**Every number above measures a different task from the one this product performs**, and the distinction is the whole basis for attempting it.

**What the numbers measure.** An agent *editing* a large, existing, human-written codebase: locating the right files, understanding code it did not write, and changing it without breaking anything. That is where ~67% comes from, where the sub-10% multi-file collapse comes from, and where the 500-file repository ceiling comes from.

**What a module is.** New code, written into a defined slot, alongside code it does not touch. Its interior is greenfield — **and greenfield generation is the one capability this field has actually shipped at scale.** v0, Lovable, Bolt, Base44, a0.dev, Rork, Vibecode and FlutterFlow AI all work, and every one of them is a greenfield generator.

So the honest status is **unevidenced in both directions.** Nobody has measured autonomous greenfield module generation into a third-party extension surface. The field's numbers do not forbid it and nothing demonstrates it.

> [!danger] Greenfield describes only the module's interior — do not read it as "easier"
> The boundary is auth, session, user identity, tenant scoping, base data reads and RBAC inheritance against a production system nobody here wrote. **That is most of the work, and it is where failures stop being cosmetic and become security incidents.**
>
> The cost signal says the same thing: thirteen of nineteen platforms refuse per-tenant functionality outright, and the six that supply it staff named engineering organisations and price behind sales. If it were straightforward, someone would already have shipped it.

**What the field's structure gives back.** The additive boundary, rated load-bearing at high confidence across every verified-safe system surveyed. A module is separable by construction, which is why an additive module is the only version of feature generation worth attempting.

Note that METR's doubling trend applies to the *50%* reliability horizon; the 80% horizon is roughly five times shorter, and mobile tooling is not obviously on the fast part of that curve.

---

## The challenges

None solved. All believed solvable. Grouped by where they live.

### The boundary — the hard part

1. **Auth, session and identity passthrough.** A module runs as the tenant's user inside the platform's auth context. Getting this wrong is not a bug, it is an incident. Gigacatalyst's answer — inherit the host's auth and RBAC rather than model it — is the shape to copy rather than invent.
2. **Approved-API scoping and data classification.** Which endpoints a module may call, and which fields are safe to render. Gigacatalyst built agentic API discovery for exactly this, and it is a funded team of four's entire first product.
3. **Tenant scoping.** A module reading the wrong tenant's data is the worst available failure and it will not look like a failure.
4. **Schema validation against a moving API.** The module's assumptions about response shape have to be checked, not trusted.

### Contract drift

5. **Coupling went from visible to invisible.** A git merge conflict is an event somebody is told about. A module's API dependency has no such event: a field that keeps its name and changes meaning passes cleanly and every module built on it is silently wrong, indefinitely.
6. **The proxy's limits.** An anti-corruption layer genuinely reduces fan-out by making one place responsible for the platform's data shape. It cannot see a semantic change, and *"is this a big update"* is an unsolved judgement whose cheap-direction failure does not announce itself.

### The accept condition — the load-bearing gap

7. **There is no oracle.** A generated feature has nothing cheap and conclusive to judge it by — no screenshot a human reads, no diff that proves correctness. Additive-only is diff-verifiable for *existing* code and says nothing about whether the added thing works.
8. **Four candidates, none chosen.** Read-only modules first; generated tests through the platform's CI; a bounded primitive vocabulary; tenant approval on real data. Each has a named cost — see [[Strategy/Product_Boundaries|Product_Boundaries.md]].
9. **No autonomy claim until this closes.** Halting needs something to halt against. [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] cannot be claimed, and the ~95/4/1 figure in circulation was never measured and describes cosmetic defects — do not quote it or adapt it.

### Generation

10. **Mobile is the worst-supported domain in the field.** No robust iOS/Swift benchmark; JS and TS score lowest of any language family, which is React Native; native build config and signing are failure modes web tooling never encounters. Argues for targeting the friendliest stack first.
11. **Run-to-run instability.** Repeatability, not quality. Cheap to check and never checked.
12. **Three surfaces, not one.** Module, backend, admin dashboard. A custom feature nobody can configure is dead on arrival, so the admin surface is not optional — and each surface carries its own security surface.

### Operational

13. **Who resolves a failure.** Every production system in the field keeps a human at the merge gate — Devin, Copilot CCA, Meta's SapFix, and even Uber's Piranha, a deterministic tool that only deletes stale feature flags and still routes its diff to the flag's author. Hardest operational question here, and a failure can be wrong data rather than a wrong-looking screen.
14. **The build handoff, and whether there is one.** Runtime insertion means layout arrives as data and nothing new ships. Compile-time means a per-tenant binary and per-tenant store submission. Undecided, and it changes what the platform has to do.
15. **Nothing has ever been generated against a codebase the founder did not write.** Only `apps/combatden/` and `apps/smoketest/` have been exercised, both with the founder holding both ends of the contract.

### Commercial

16. **Cost per module must sit far under a price that does not exist.** *Close enough at a fraction of the price* is a ratio, and the ratio is the pitch.
17. **Nothing amortises automatically.** A module is for one tenant by construction. Whether a module library re-serves later requests, and who owns it, decides the margin and is undecided.
18. **Build-versus-buy, and the filter points straight at the buyer.** Q2 did not build a coding agent — they wired Claude Code into Bedrock, and could only do it because **Caliper has existed since 2018.** *The AI was the cheap part bolted onto the expensive part.* The filter is whether a platform already owns an extension architecture, and **the chosen ICP is defined by owning one.** Standing condition: **if two or more targets ship a native AI-extension layer, the external position erodes.** One has.
19. **CodeParrot is the recorded death, and the mechanism is the accept condition.** *"The generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value."* Cleanup time attacks the denominator of the ratio that is the whole pitch.

---

## How to read this list

**Nothing here is a cosmetic failure wearing technical clothes.** Items 1 through 4 are security problems, item 5 is a correctness problem with no alarm attached, and item 7 is the absence of the check that would make unattended operation safe. Weight them accordingly.

**Three things are cheap and none of them is code.** Verify how deep Banno's, Tapcart's and BuildFire's extension surfaces actually go, from their public developer documentation. Check whether a second Group A platform has shipped an AI extension layer. And ask, on a call, what tenants request and how much of it is a view of data the platform already holds — because that answer decides whether read-only modules are a product or a toy, which decides item 7.

**One standing condition is unmet and should stay visible.** Scope has been extended before a buyer existed in every prior phase of this project — six times now. Three calls with real platforms is the cheapest thing that changes that, and nothing on the list above needs to be built first.
