---
tags: [architecture, research-synthesis, agents, codegen, risk]
status: current
date: 2026-08-04
source-session: Office_Hours/2026-08-04-00-Office_Hours_Agentic_Code_Generation_And_The_Feature_Route.md
---

# Agentic code generation: the state of the field, and what Recompose has to solve

Concepts touched: [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]], [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]], [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]], [[Concepts/Product/Mechanisms/Visual_Mirror|Visual_Mirror]].

Synthesis of [[Research/2026-08-04-mobile-app-code-gen|Research/2026-08-04-mobile-app-code-gen.md]], which surveyed AI app builders, brownfield coding agents, automated large-scale code change, fork maintenance, per-tenant customization architecture and visual validation. Detail and sourcing live there; this is the position.

---

## What the field has actually shipped

**Every AI app builder is a greenfield generator.** v0, Lovable, Bolt, Base44 on web; a0.dev, Rork, Vibecode, FlutterFlow AI on mobile. None modifies a large, existing, human-written codebase.

**Brownfield agents work at roughly two-thirds, with a human on every task.** Devin merges 67% of its PRs; GitHub's Copilot Coding Agent hit 67.9% across 878 PRs on `dotnet/runtime` — and cannot open a PR on its own. The human baseline in the same repo is 85–87%. SWE-bench Verified sits near 80% and is saturated; **SWE-bench Pro's commercial set puts the best models under 20%.**

**It collapses on the shape a redesign has.** Success falls below 10% once a patch touches three or more files or spans 100+ lines; patches touching seven or more are never solved; repos over 500 files rarely exceed 5%. JavaScript and TypeScript score lowest of any language family, which is React Native.

**Mobile is the worst-supported domain.** iOS and Swift have essentially no robust agent benchmark. Native build config, code signing and App Store review are failure modes web tooling never touches.

**The reliable systems are deterministic, not generative** — OpenRewrite's compiler-accurate transforms, Uber's Piranha, Meta's SapFix. All three still route output to a human before it lands. **No production system found auto-merges agent output to trunk.**

**The additive boundary is the field's universal safety story.** Salesforce metadata, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper SDK, Banno's Plugin Framework and Gigacatalyst all converged independently on extension points and sandboxes rather than per-tenant source modification, because forks turn maintenance into O(tenants × changes). **Q2 Code (April 2026) is the same boundary drawn by a platform building this in-house** — they wired Claude Code into Bedrock to generate *SDK-compliant extensions*, not source changes.

**Fork maintenance: syntax solved, semantics not, autonomy nonexistent.** Structural merge is mature (Mergiraf); semantic conflicts — clean merge, broken behaviour — are an open research problem. **No published example exists of an agent autonomously maintaining a long-lived fork against moving upstream.** No drift data exists anywhere, because no such system is documented.

**VLM judges rank; they do not score.** r = 0.93 on pairwise ranking of design outputs, but only 32–34% exact agreement on absolute scoring. *"VLM Judges Can Rank but Cannot Score."*

**The graveyard.** Builder.ai (~$450M raised, insolvent May 2025). CodeParrot (YC W23, Figma → production frontend code, shut down July 2025): *"the generated code wasn't reliable enough for production. Teams still had to spend time fixing outputs, which erased the value."* CodeParrot is not the analogue for productionalize — they authored new code from a design file with no code lineage — but it is the record of a company that died of cleanup economics rather than of correctness, which is the 4% minor band.

---

## Why Recompose does not generate features

[[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]] has several independent justifications. This research supplies the technical one, and it is now the strongest.

- **Nobody has done it.** No documented case of an agent autonomously shipping a net-new feature into a pre-existing production mobile codebase it did not author. Not vendor-claimed, not measured.
- **The ceiling is far below autonomy.** ~67% with a human on every task; under 10% on multi-file changes, which every real feature is.
- **It would attempt the three hardest axes at once** — brownfield, mobile, net-new functionality — in the lowest-scoring language family.
- **It inherits a security surface currently avoided entirely:** API discovery, approved-API scoping, schema validation, auth passthrough, RBAC inheritance, sandbox boundaries, public-vs-private data classification. **The failure mode moves from *ugly* to *security incident*,** which is the asymmetry that makes the visual half tractable for one person.
- **The invariant is not a constraint on the buyer anyway.** Thirteen of nineteen platforms in [[Research/2026-08-02-features-vs-design|Research/2026-08-02-features-vs-design.md]] have no path to net-new functionality at any price.

**What reopens it** — thresholds, not a date. Measured brownfield success on multi-file mobile changes clearing ~95%, the range deterministic tools achieve rather than the ~67% free generation achieves. A robust iOS/Swift benchmark existing and React Native scores catching the pack. The functional-equivalence gate built and proven first. And a customer, because extending scope before the narrow version has a buyer is the pattern this vault has run five times.

Note that METR's doubling trend applies to the *50%* reliability horizon; the 80% horizon is roughly five times shorter, and the blockers here — semantic conflict detection, mobile tooling — are not obviously on the fast part of that curve.

---

## Why the visual route is different

**The safety property is bounded blast radius by output type, not separability.** The field's universal story is that output is additive and therefore separable by construction. **Recompose does not have that** — a redesign modifies existing screens and cannot be sandboxed. What it has instead is that a bad output is *ugly*, not *broken*: no data model to corrupt, no permission to leak, no correctness contract to violate. Nobody else in the research has this, because nobody else's output is cosmetic. This is the argument to lead with, and the Gigacatalyst comparison should be retired — theirs is an API-composition sandbox sharing almost none of these problems.

**Verification is a code diff, not a judgement.** Same set of API calls, same widgets and handlers present, every screen still reachable. Deterministic, and the platform's own engineers can run it.

**The aesthetic accept condition is a human, and that is the product.** The tenant iterates on the [[Concepts/Product/Mechanisms/Visual_Mirror|mock]] until they approve. The model only ever ranks candidates — the reliable mode — and the validator loop terminates on approval rather than on a model's confidence. [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] therefore means zero *platform* involvement, not zero humans.

**The fork is the only path given no write access.** Server-driven UI is the genuine alternative — the app ships a renderer, the server sends layout as data, proven at Airbnb, Lyft, Spotify and DoorDash — and it is excluded by [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]] rather than by feasibility. The answer when a platform engineer raises it: *you could build that yourselves, it would take 12–18 months, and you would own it forever.* It is also the escape hatch if the fork model does not scale.

---

## The challenges

None solved. All believed solvable. Grouped by where they live.

### Fork mechanism

1. **No precedent, no data.** Nobody has run an autonomously maintained long-lived fork. No drift rate, no failure taxonomy to borrow. Largest technical unknown in the company. → T23.
2. **Semantic conflicts.** Clean merge, broken behaviour. Unsolved generally; here it breaks *visually*, which is the bounded blast radius. Rate unmeasured. → T23.
3. **Undesigned surfaces — git will never flag it.** Upstream ships a new screen; nothing conflicts because there is nothing to conflict with, so it appears in the platform's default styling inside a redesigned app. A coverage problem, not a merge problem, scaling with release cadence × fork count. → T23, then a decision on whether new surfaces trigger an automatic design pass or a queue.
4. **The divergence tax.** Chromium and AOSP show rebase cost scales with divergence, and a [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]] is maximal divergence. → T23's minutes-per-re-derive against upstream velocity.
5. **Cost that scales with success.** Inference gets cheaper; re-derivation frequency is set by their release train and fork count grows with sales. → T25.

### Productionalize

6. **The mock has no edge cases.** No pagination, no 47-character names, no loading/empty/error/overflow states. The design agent designs against ideal data; production code is mostly edge cases. → generate state variants in the mirror rather than one ideal render.
7. **Present but not visible.** The diff gate confirms a widget exists in the tree, not that it is on screen — zero-height, clipped, occluded and collapsed all pass and produce a broken screen. → T26, a visibility assertion in the render check.
8. **Cross-file coupling.** Below 10% success at three or more files. Mitigated because the input is existing correct code being rearranged rather than new logic authored — but nobody has measured how much that helps. → run productionalize by hand on one CombatDen screen.
9. **Mobile tooling.** No iOS benchmark, React Native in the lowest-scoring family, plus native build config and signing. Absorbed cost; argues for Flutter-first targeting.
10. **Run-to-run instability.** Repeatability, not quality — load-bearing now that re-derivation is continuous. → re-run an existing brief and diff. An afternoon (T12).

### Validation

11. **The functional-equivalence gate does not exist.** The strongest claim in the pitch is currently an assertion. An afternoon against CombatDen converts it into a property a security reviewer can verify. Highest-leverage unbuilt thing in the codebase. → T24.
12. **Screenshot diffing is flaky.** Anti-aliasing, fonts, dynamic content, timing. The mature tools manage it with tolerances and ignore regions, which implies a human adjudicating ambiguous diffs. → conventions set before the first customer.
13. **The error budget has no denominator.** 95/4/1 per screen, per redesign and per sync differ by orders of magnitude. → pick it, instrument from customer one. T23 forces the choice.

### Operational

14. **Who resolves a halt.** Platform staff breaks the autonomy claim; an FDE lacks domain knowledge of an app they did not write. Every production system in the field keeps a human at the merge gate, so this is the one answer standing between the promise and the field's strongest counterexample. → decide and price it.
15. **Nothing catches the 4% minor.** Cosmetic, and unlike the 1% it reaches production. A trickle of small defects across a hundred apps erodes the product quietly. CodeParrot is the recorded death by this economics. → must run without a human or the promise absorbs another exception.
16. **Tokenization of a foreign codebase is unproven and untimed.** Only two self-authored apps have ever been exercised. → the Second Shell, timed.
17. **The build handoff.** Either they build from our fork or we hand them artifacts. Rated the easy part, still unwritten. → one paragraph.
18. **Container-app tenants have no per-tenant binary.** Subsplash, Planning Center, Tithe.ly and Pushpay all run them; Subsplash runs both models at once. Different product shape. → decide once a target is named.

### Commercial

19. **Cost per design must sit far under a price that does not exist.** "Close enough at a fraction of the price" is a ratio and the ratio is the pitch. Meaningless until both numbers exist; challenge 5 sets the floor. → T25.
20. **Build-versus-buy, gated on extension architecture.** Q2 did not build a coding agent — they wired Claude Code into Bedrock, and could only do it because **Caliper SDK has existed since 2018.** The AI was the cheap part bolted onto an extension architecture they already owned. The real filter is whether a platform already has one: the fintech four do, Subsplash and Passion.io do not, and building one is the 12–18 month rebuild in [[Research/2026-08-02-incumbent-design-delivery|Research/2026-08-02-incumbent-design-delivery.md]]. → standing condition. If two or more targets ship a native AI-extension layer, the external-fork position erodes and the surviving play is being the engine underneath their governed layer.

---

## Why the list is more tractable than its length

**Most of these are cosmetic failures wearing technical clothes.** Challenges 2, 3, 8 and 12 would each be correctness or security problems for a feature-generating system. Here they produce a screen that looks wrong.

**Three close in an afternoon each** — the diff gate (11), the repeatability diff (10), and the first productionalize measurement (8). Highest information-per-hour in the company, and none needs a customer.

**One is wall-clock rather than effort.** T23 runs against a real upstream repo in the background while outreach happens.

**And every number above measures the wrong task.** They are all for an agent authoring new logic against an unfamiliar repo. Productionalize rearranges existing, working, known-correct code, with the original as a behavioural oracle and a diff gate as a contract. That should be materially easier than ~67%. **Nobody has measured how much easier, and that measurement is the most valuable unbuilt artifact in the project.**
