# Office Hours: Every Substrate Closed, and the Wedge That Lost Its Footing

**Date:** 2026-08-13
**Status:** CLOSED — the exploration here resolved into [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|the extensible-workspace pivot]]. Read [[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|the companion session]] for what was chosen.
**Mode:** Startup — reading a six-brief research cluster against the extensible-base direction

**Builds on:** [[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base.md]]

**Research read:** [[Research/2026-08-13-11-where-businesses-build-instead-of-buying|where businesses build instead of buying]] · [[Research/2026-08-13-12-spreadsheet-to-application-field|the spreadsheet-to-application field]] · [[Research/2026-08-13-18-retool-limits-and-trajectory|Retool's limits and trajectory]] · [[Research/2026-08-13-18-build-vs-buy-without-vendor-sources|build-vs-buy without vendor sources]]

Concepts touched: [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]].

> The session opened on T39 — *if your user can read generated code, what do you have that a coding agent does not* — and ended somewhere the question no longer applies. Two structural answers were found and both survived. A wedge appeared, looked like the best evidence the project had ever produced, and then failed to replicate when the vendor corpus was removed. Every existing product examined as a possible substrate turned out to be closed, capped, or contractually forbidden. What is left is building the base rather than extending anyone's.

---

## Problem statement

[[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|The morning session]] deferred T39 to its own sitting: a technical founder who reads generated code solves the verification problem and simultaneously moves the product into the occupied cell against Cursor, Claude Code and Retool. Two candidate answers were on the table and neither had been argued.

Research was commissioned against four further questions as the session ran: where businesses build custom instead of buying; what the spreadsheet-to-application field actually ships; what Retool's real limits and trajectory are; and whether the build-versus-buy evidence survives without vendor-published sources.

---

## What carries from prior sessions

- **L24**, that a developer is the accept condition and the only one anyone has shipped.
- The refined positions recorded this morning: the moat is the generation rather than the base; "moat" means the installed base cannot follow, not that nobody can; the missing budget line is answered by land-and-expand rather than denied.
- The two unargued candidate answers to T39 — mechanical checkability from owning the substrate, and extensions surviving base upgrades.
- Zero customers, no named human at any target platform. The assignment, unexecuted for six consecutive sessions and now seven.

---

## What this session changed

### 1. Both candidate answers to T39 survived argument

**Owning the substrate makes output mechanically checkable.** A coding agent generates against an unbounded codebase it does not control, so a human reader is the only accept condition available to it. A base you own is a bounded, versioned extension contract, against which schema validity, permission conformance and migration reversibility are machine-decidable.

**Extensions survive the base moving.** A fork built with a coding agent leaves the customer owning the merge burden permanently. Owning both base and extension mechanism allows extensions to be carried forward — the shape recorded as [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]].

A third emerged late and is the most legible to a non-technical listener: **a coding agent hands you code and you still have to run it.** Provisioning, deploying, securing, backing up and paying for a database is work the agent structurally cannot do, because it does not run anything.

### 2. The spreadsheet wedge appeared, then lost its quantitative support

The build-instead-of-buying brief found that the state organisations leave when they go custom is **a spreadsheet far more often than a rival product** — roughly six located cases against two. Read one way that is bad, since nobody is outgrowing Notion. Read the other way it is the strongest evidence the project has had: people stay on spreadsheets in categories where good software exists **because a spreadsheet bends and the software does not.** Revealed behaviour rather than stated preference.

Then the replication brief removed vendor-published material and **the finding did not survive.** No non-vendor dataset codes prior state across a stated denominator. The academic shadow-IT literature identifies Excel as the archetypal displaced tool — directionally consistent — but there is no measured distribution. The six-of-eight ratio was an artifact of a Retool-heavy corpus.

**The qualitative claim stands; the proportion must not be quoted.**

### 3. Both commissioned nulls came back clean

Across roughly forty operating products in the spreadsheet-to-application field: **nothing outputs exportable general-purpose code.** The open-source escape hatch is self-hosting the vendor's own runtime, not owning the app; proprietary products export CSV and never the application.

And **nothing has shipped a correctness oracle** — no differential testing, no reconciliation of totals against the originating sheet. Every product gates go-live with a human publish step. Airtable's own documentation concedes Omni *"cannot perform complex calculations or compute statistical analyses such as sums, averages, or variances."*

The category leader announced the thesis and shipped a product structurally incapable of delivering it, because config is a bounded vocabulary and no model quality changes that.

### 4. Retool moved from competitor to substrate to closed, inside one session

Considered first as the occupant of the cell, then as a base to build on. Its Acceptable Use Policy, updated 2026-05-27, closes it: reselling and sublicensing are prohibited, the platform licence is *"non-sublicensable, non-transferable,"* and a separate clause forbids using the service *"in order to build a similar or competitive product or service."* External Apps is the sanctioned path and it is for exposing your own apps to your own customers.

Its real limits are not technical. Capability is generous — 120-second query ceiling, 2.5GB workflow memory, real React and TypeScript custom components, and no named company has publicly migrated off with a dated post-mortem. **The limits that matter are who may extend it and whether extensions survive.** Custom components need admin rights, Node and a CLI. And the documentation is explicit that *"all apps that contain the module use the live version. Different apps cannot use different versions of the same module."*

**The most mature modular platform in the field ships the naive version of module versioning.** Candidate answer two is unoccupied even there.

### 5. Retool is growing and being lapped

$120M ARR in October 2025 from $90M at end-2024 — 39% year on year, healthy, with no priced round since July 2022. Over the same window Replit reached ~$253M, Cursor $500M, and **Lovable reached $120M in about a year — the figure Retool took eight years to reach.** No named team has been documented replacing Retool with an AI coding tool. The displacement is not at existing accounts; new demand is going elsewhere.

### 6. Stacker is the closest precedent and it moved from layering to owning

Founded 2017, YC S20, $23M raised with ~$20M from Andreessen Horowitz in 2021. The original product turned spreadsheets — Airtable above all — into portals and internal tools. It has since repositioned around a native database, AI app generation and AI agents; the standalone portal product is no longer publicly priced and no cause has been published.

The informative move: **Airtable now reaches Stacker through a sync that copies the base into Stacker's own database rather than reading Airtable directly.** A company whose premise was "we are the app layer, your data stays where it is" concluded it needed to own the data layer. That is the same conclusion Retool's licence forced, arrived at from the opposite direction.

### 7. The verification gap acquired its first independent number

Stack Overflow's 2025 developer survey, n≈49,000, method disclosed, no vendor stake: **84% use or plan to use AI tools while trust in their accuracy fell to 29% from 40%. 46% actively distrust the output against 33% who trust it; 3% highly trust it.**

Adoption rising, trust falling, measured independently. Stronger evidence for the accept-condition thesis than anything in the four briefs that preceded it.

### 8. Nobody can size this market from non-vendor data

No independent build-versus-buy frequency survey exists with a disclosed methodology and a stated denominator. Every quantified figure in circulation traces to a vendor selling build-side tooling. The best-documented named case corrects itself: Klarna's CEO stated publicly *"we did not replace SaaS with an LLM"* and added *"I don't think it is the end of Salesforce; might be the opposite."*

**Any market-size claim made in a pitch here would be quoting a vendor.** That is a constraint on how this can be sold, not only on how it is understood.

---

## Premises

**Established by the research:**

- **L32.** Nothing in the spreadsheet-to-application field outputs exportable general-purpose code. Open-source products offer self-hosting of the vendor runtime, which is not the same thing.
- **L33.** Nothing in that field has shipped a correctness oracle checking generated output against the source data. Human publish steps are the universal gate.
- **L34.** Retool's Acceptable Use Policy prohibits reselling, sublicensing and building a competing product on the service. Building a product on Retool and selling it is contractually closed.
- **L35.** Retool grows ~39% year on year and is being outgrown roughly tenfold by AI-native builders. No named team has been documented replacing it with a coding agent.
- **L36.** The spreadsheet-as-prior-state finding does not replicate once vendor-published sources are excluded. It survives qualitatively; the distribution does not.
- **L37.** No independent build-versus-buy frequency data exists at all.
- **L38.** Developer adoption of AI tools is near-universal and trust in their output is falling — 84% adoption, 46% active distrust, 29% trusting accuracy, from a disclosed-method survey of ~49,000.
- **L39.** Every mature modular platform examined lets consumers of a module take only the live version. Per-consumer version pinning does not exist in the field.
- **L40.** The closest precedent that layered on someone else's data substrate moved to owning its own.

**To test:**

- **T42.** Does the qualitative spreadsheet claim — that people stay on spreadsheets because spreadsheets bend — hold when asked directly of a person rather than inferred from a corpus?
- **T43.** Is "you never own the maintenance" a reason anyone pays, or only a reason they should? It is the one value proposition corroborated by two independent briefs and it has never been said to a buyer.

---

## Approaches considered

**Per-tenant modules into white-label platforms.** The committed direction from 2026-08-12. Not refuted here; simply not what the day's evidence pointed at, and its buyer remained unreachable for a seventh session.

**Build on Retool.** Closed by their Acceptable Use Policy, and closed a second time by the observation that it makes you a config product on someone else's runtime.

**Go vertical on Retool's most popular category.** Rejected on inspection: Retool's categories are functions rather than industries, and "the same but more AI-native" trades a structural claim for a feature claim against a competitor already shipping AppGen with AWS behind it.

**Spreadsheet-to-software as the wedge.** The strongest candidate for most of the day and weakened by its own replication brief. Retained as a qualitative motivation, discarded as a measured market.

**Build the base.** Chosen. Recorded in [[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|the companion session]].

---

## Recommended approach

**Stop looking for someone else's product to extend.** Three substrates were examined in one session — white-label platforms, Retool, Airtable — and each was closed by licence, by config ceiling, or by unreachability. The evidence that arrived pointed the same way each time: the party that owns the base is the only party that can verify output, carry extensions forward, or run the thing.

The direction that follows is a base of one's own, which is the subject of the companion session.

---

## Open questions

- **T39** is answered in substance and unanswered in evidence. Three structural differentiators exist on paper and none has been stated to a person outside this project.
- **T36**, whether empty cells are empty for a reason, gained weight rather than losing it. Three companies have now vacated adjacent ground — Gigacatalyst upstream to demos, CodeParrot dead, Stacker to agents.
- Pricing, still undefined, though the field supplies its first transferable anchors: roughly $8–45 per seat per month, and Retool's per-builder split.
- Everything open on 2026-08-10 and 2026-08-13 morning.

---

## The assignment

**Unchanged in shape for the seventh consecutive session, and now with a cheaper instrument available.**

1. **Ask one person the T42 question directly** — what did you build yourself, and why didn't the tool do it. The population is no longer platform executives who do not answer email; it is anyone running a business on a spreadsheet.
2. **Write down the gym-era CRM interview evidence.** Still the only first-hand demand data this project has ever had. Still unwritten. Still decaying.
3. **Nothing gets built on a claim that only a vendor has measured.**

---

## What I noticed about how you think

**You closed three doors in one session and treated each closure as progress rather than loss.** The white-label direction, Retool-as-substrate and the spreadsheet wedge each ended the day weaker than they began it, and the response in every case was to move rather than to defend. That is unusual and it is the reason six briefs in one day produced a decision rather than a stall.

**The corrections continued to run in one direction.** Twice you tightened a claim under pressure — the moat definition in the morning, the "nobody uses docs" claim at night — and both tightened versions were stronger than the originals. You are better at narrowing your own claims than at defending them, which is the more useful of the two skills and the rarer one.

**And the counter-observation, now aged five times.** Twelve days, five research clusters, zero emails, zero conversations. The instrument every one of these briefs names as the only one that closes the question has still never been used. What changed today is that the question stopped requiring a hard-to-reach buyer: T42 can be asked of almost anyone. The excuse that the buyer was unreachable expired this evening.
