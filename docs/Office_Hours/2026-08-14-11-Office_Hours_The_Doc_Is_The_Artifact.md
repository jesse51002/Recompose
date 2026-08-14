# Office Hours: The Doc Is The Artifact

**Date:** 2026-08-14
**Status:** NO PIVOT — the direction sharpened rather than moved. The differentiator acquired a better statement, the validation instrument was chosen, and one new gap opened. No decision here supersedes [[pivots/2026-08-13-22-extensible-workspace-replaces-per-tenant-modules|the extensible-workspace pivot]].
**Mode:** Startup — a diagnostic session run against a direction one day old, opened by asking the founder to answer the demand question about himself

**Builds on:** [[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace.md]], [[Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed|Office_Hours/2026-08-13-22-Office_Hours_Every_Substrate_Closed.md]]

Concepts touched: [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]], [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]].

> No research was commissioned. The session asked the founder four questions about his own first-hand experience and every one of them returned something the six briefs of 2026-08-13 could not. The direction is unchanged. Its one-sentence statement is better, the reason the field never shipped this is now a documented pattern rather than an absence, the validation instrument is decided, and the product's only accept condition turns out not to cover the risk the sharpened framing creates.

---

## Problem statement

Phase 8 was one day old and had never been tested against anything except research. The session opened by asking the question nobody had asked in nine months: does the founder himself have the problem the direction is built on, and can he name a person who does.

---

## What carries from prior sessions

- **L41–L50** in full, and none of them was contradicted here.
- **T44** — do people who install an artifact then modify it — as the premise the direction rests on.
- **T47**, parity, as the thing every simplified-Notion in the field died on.
- **L46**, the two-percent-versus-fourteen-automations split, still an inference across two populations and still the weakest load-bearing premise.
- The marketplace-versus-verification contradiction, unresolved.
- Zero customers, and an assignment that finally became executable.

---

## What this session changed

### 1. The founder works at Salesforce, and it appears nowhere in nine months of docs

The single most consequential omission in the vault. For seven consecutive sessions the assignment required a named human at a company that does not answer email, and it went unexecuted every time. The founder has been inside an enterprise for the whole period, watching the exact failure mode the product addresses.

He declined to recruit colleagues, deliberately and for good reason: **he does not want the company to cost him the job.** That is the right call and it is recorded as decided rather than open. What he can do, and did here, is report what he sees.

**The employment-agreement question is raised and unanswered.** Salesforce owns Quip and Slack, both document products in this exact category, and IP-assignment clauses covering work "related to the business of the company" are standard. This is the one item in the whole session that cannot be fixed retroactively.

### 2. The one-line statement of the differentiator got materially better, and the founder produced it

> *"a lot of times the html **was** the doc"*

[[Strategy/Recompose_Summary|Recompose_Summary.md]] currently says the gap is that AI artifacts have nowhere to live **beside** your notes and data. That is adjacency. The founder's version is stronger and different in kind: the artifact is not a thing that belongs next to the document, **it is the document**, and every product in the category models them as two objects.

**This converts "freedom" from a value into a mechanism.** Freedom is asserted. *Your document and your interactive artifact are one object* is either true of a product or it is not, and it can be shown to someone in ten seconds.

It also explains why a separate artifact store does not solve the problem — see below.

### 3. Salesforce built the findability product. It did not close the problem

**A first-hand null result, and the most decision-relevant thing said all session.** Because so many people were generating custom HTML against customer data, Salesforce built a place to put it. It exists. It is funded. Artifacts are still lost, and non-technical people still cannot find things tracked in GitHub.

The founder's diagnosis is the important half: **the store failed because the artifact sits apart from the document, and a separate store re-creates the exact split it was built to close.**

This killed a reframe proposed in-session — that the observed pain is findability rather than authoring freedom, and that a much smaller findability product would sidestep T47 almost entirely. The reframe was wrong, and it was killed by evidence rather than by argument, from a company with unlimited engineering that already ran the experiment.

It also **rescues a claim the vault had weakened.** [[Strategy/Recompose_Summary|Recompose_Summary.md]] concedes that distribution is not the gap, given GitHub Pages, Vercel, Val Town, CodePen and Claude's own publishing. That concession stands, and the Salesforce case shows why it does not matter: a dedicated destination for artifacts is not the missing piece, because the artifact was never supposed to be a separate destination.

### 4. Five products built the HTML escape hatch into a document surface, and every one retreated

The pattern the vault had as scattered findings, assembled:

- **Confluence** built the HTML macro and ships it **disabled by default**, for cross-site scripting, unchanged across documentation versions 8.3 through 10.2 (L41).
- **Claude Artifacts** permits it and sandboxes it hard enough that it cannot be a dashboard over your data — *"NEVER use localStorage, sessionStorage, or ANY browser storage APIs"* (L42).
- **Zope/Plone** invented through-the-web development and its own current documentation records the walk-back to *"configuration tasks"* only (L48).
- **Salesforce** built it as a separate place, which is the same retreat in a different shape (this session).
- **Notion** never shipped it and structurally cannot, though L44 qualifies how strongly that can be said.

**This is not an empty cell nobody noticed. It is a cell five companies walked into and backed out of, for the same documented reason each time.** That is a much better answer to *why has nobody done this* than an absence, and it converts the bet into a specific one: being the first willing to pay a price four others declined.

It also sets the bar for the architecture deck. A technical reviewer will name Confluence's disabled macro within thirty seconds, because it is public and famous.

### 5. The marketplace may have been demoted, and the founder did not say so

If the primary act is *authoring a document that contains live things*, then installing someone else's template is a growth channel rather than the mechanism.

**That would dissolve the marketplace-versus-verification contradiction for free** — one of the two items [[Strategy/Open_Questions|Open_Questions.md]] says decides whether this is a company. The bounded contract that makes generated output checkable survives intact if arbitrary third-party executables are not distributed in v1, and the marketplace becomes a later decision made with users in the room rather than a founding constraint.

**Recorded as an inference, not a decision.** It follows from the reframe and the founder did not state it. It should be settled deliberately, because the cheapest resolution to a hard question is exactly the kind of thing that gets adopted by drift.

### 6. Rollback does not cover the risk the reframe creates, and this is a new gap

[[Strategy/Trust_And_Safety|Trust_And_Safety.md]] currently argues the cross-site-scripting surface is narrower than the whole product: execution is local, a plugin in your own vault is Obsidian's model, and the sandboxing work applies to the published path rather than to everything anyone authors.

**Under doc-is-artifact that is no longer a subset.** Every artifact is a document, and documents are shared — that is what documents are for. The published path becomes the main case.

**And D5's rollback is orthogonal to it.** The only accept condition the product has is *can I undo it*. You cannot undo having opened a page that read your session. The one risk the sharpened framing makes central is the one risk the safety model does not touch.

Sharper still: the founder reports the Salesforce documents **contain customer data**, even where the artifact is not querying it live. The population that most wants this is the population where stored cross-site scripting is a breach notification.

### 7. T47 may have an argument for the first time

If HTML is a first-class document type, the plain document editor can perhaps stay genuinely thin, because anything rich becomes an artifact instead of a feature request.

That would be the first real argument that *deliberately simplified* is **structural rather than a preference** — which is what the 2026-08-13 session said it had to become or the differentiator never ships. Raised here, unproven, and worth attacking directly.

### 8. The vault's "zero conversations" claim was false, and the vault already knew

The founder's correction: gym-era CRM conversations happened at volume in the studio vertical, and [[Strategy/Journey|Journey.md]]'s own Phase 1 records a verbal yes at price from one gym and a near-close at another.

**The correction already existed.** [[Office_Hours/2026-08-13-11-Office_Hours_The_Research_Cluster_And_The_Extensible_Base|the 2026-08-13-11 session]] states it directly: *"Nine months of docs record that no outside party has responded to anything, while these conversations happened and went unrecorded because a CRM was being sold at the time."* Journey.md and Recompose_Summary.md were rewritten the same evening and both carried the false version forward.

The corrected claim is narrower and more useful than the one it replaces: **no conversation has been had about any direction since the gym product.** Which reframes the whole failure pattern. It is not that the founder does not sell. **He sold when he knew the buyer and stopped when he did not**, and every direction since Phase 1 has been reasoned to rather than carried to a person.

### 9. The validation instrument was chosen, against the session's recommendation, and the founder was right

The session recommended building a working single-player prototype first, on the reasoning that only a working thing can return a no. The founder chose mockups plus a full architecture, to validate before building.

**His rebuttal was correct on the facts.** No phase in this vault died from a mockup. Phase 1 died on migration friction, Phase 2 on unit economics, Phase 3 on a red-team of its own landing page, Phase 5 on a two-day reconsideration, Phase 7 on every substrate closing. What killed them is [[Strategy/Journey|Journey.md]]'s lesson 7 — *build-instead-of-sell is how each phase actually ended* — and validate-before-building is that lesson's own prescription. The recommendation was the pattern the vault warns against, dressed as rigor.

**And it reconciles a conflict the vault has been carrying unresolved.** 2026-08-10 pre-registered *"Nothing gets built until at least three of these calls have happened."* 2026-08-13 assigned *"build the smallest thing that proves T44, days not months."* Mockup, then calls, then build satisfies both.

There is also a **May 2026 instrument that was raised and never executed or retired** — three to five hand-curated mockups as the smallest believable interview asset, and a five-second test costing thirty minutes. This is that instrument resurrected, not a regression from the August one.

### 10. The scope reflex, and where it pointed

Asked what goes in the prototype, the answer added a semantic querying layer and framed the build around the founder's own workflow. Both are worth separating carefully, because one is already decided and one is a different company:

- **"Artifacts can query workspace data"** is **D6**, already in [[Strategy/Architecture_Thesis|Architecture_Thesis.md]], and correct. An artifact that reads nothing is decoration.
- **"The product is a company brain that also renders artifacts"** competes with Glean at $200M ARR, Dust at 3,000 organisations, Onyx which is MIT-licensed and free, and Copilot bundled at $30 a seat — and it abandons the one gap **L43** identified, which is that none of that band makes a rich interactive page.

The gbrain-specific version is the good one and fits the architecture cleanly: gbrain is local and indexes a folder, and D2 makes the vault a folder on disk.

**One piece of engineering follows immediately.** If the prototype requires gbrain, it can be shown to almost nobody. The artifact must not know gbrain exists — it asks the host for data over the IPC contract, and the host decides whether that resolves to gbrain, a SQLite table or a fixture file. That is D6 as already written; what is new is the instruction not to hardcode the adapter on the artifact side. Free today, expensive once artifacts exist in the wild.

---

## Premises

**Established this session:**

- **L51.** Salesforce built an internal home for HTML artifacts because employees were generating custom HTML against customer data. It exists and the problem persists, because the artifact sits apart from the document. *(First-hand founder observation, single organisation, not published anywhere.)*
- **L52.** Five document products built an HTML escape hatch and every one disabled, sandboxed, separated or never shipped it. The stated cause where it is stated is cross-site scripting. **The absence is a repeated retreat, not an oversight.**
- **L53.** The vault's claim that no conversation has ever been had with anyone outside the project is false for Phase 1. Gym-era CRM conversations happened at volume and produced a verbal yes at price. The true claim is that no conversation has happened about any direction since.

**To test:**

- **T49.** Does *your document and your interactive artifact are the same object* land cold in ten seconds, with no narration? If it has to be explained, that is the finding.
- **T50.** Can a person in the target population produce, on request, a recent HTML artifact they wanted to keep? **The beachhead in [[Strategy/Customer_ICP|Customer_ICP.md]] is defined as people who already generate them and have nowhere to put them, and this is the cheapest possible check on whether that population exists.** Ten founders saying "cool" while none can produce an artifact is a no, available in a week.
- **T51.** Can the plain document editor stay thin because rich content becomes an artifact rather than a feature request? If yes, *deliberately simplified* is structural and T47 has its first real answer.

---

## Approaches considered

**A findability product — a home for artifacts that already exist.** Proposed in-session on the strength of the Salesforce observation, and rejected within one exchange because Salesforce already built it. Would have shrunk T47 almost to nothing and given up two of the three things a coding agent cannot do, keeping only *it runs*, which is the most copyable.

**A working single-player prototype, dogfooded.** Recommended in-session and not chosen. Its argument was that only a working artifact can return a no, and that a working thing produces the demo for free while the reverse is not true. Its defect was that it is build-before-sell, which is what ended six phases.

**Mockups plus a full architecture, then calls, then build.** Chosen. Tests positioning and feasibility before weeks are spent, satisfies both halves of the vault's own unresolved sequencing conflict, and produces the artifact a raise needs.

**A company-brain positioning.** Raised and separated out rather than chosen. The querying capability is kept as D6; the positioning is not adopted.

**An Obsidian plugin to prove the personal half.** Offered and not chosen. Remains the cheapest available kill signal for the personal half of the why-now, and remains a comfortable place to spend three months not talking to anyone.

---

## Recommended approach

**Build the mockup and the architecture together, and construct the conversation so it can produce a no.** Most mockup validation structurally cannot, which is why the May 2026 version of this instrument was never worth executing.

Five things that make it falsifiable:

1. **Show it without explaining it.** The only way to read T49.
2. **Ask what it replaces, never whether they like it.** *"What would you stop using?"* returns an answer or a blank stare, and both are data.
3. **Ask them to show you the last HTML artifact they generated.** T50, and the highest information-per-question in the script.
4. **Ask what they pay for the thing they would stop using.** Not a price test — a test of whether a budget line exists at all, given cost-savings has been a dead pitch here since 2026-08-02.
5. **Write T46 down first.** What observation would show the HTML-artifact trend has stalled. Written afterward, everything reads as confirmation.

**The architecture half has to survive three attacks, in the order they will arrive:** stored cross-site scripting in the shared path, which is now the main case and which rollback does not address; the host-to-artifact IPC contract, named as the first thing to specify and still unspecified; and surviving concurrent change, which the vault calls the central engineering problem and which nothing anywhere has solved. **Naming the third as hard and unsolved reads as credible. Omitting it reads as naive.**

---

## Open questions

- **Is the marketplace demoted to a growth channel, or still the mechanism?** Inferred here, not decided. It determines whether the marketplace-versus-verification contradiction has to be resolved at all.
- **Stored cross-site scripting in the shared path**, which the doc-is-artifact framing promotes from a subset to the main case, and which D5's rollback does not cover. New as of this session.
- **The Salesforce employment agreement.** The only item raised here that cannot be fixed later.
- **The observe-here, sell-there mismatch.** The pain is observed in an enterprise — non-technical receivers, scattered artifacts, customer data in documents. Validation will run against the startup community, which is smaller, more technical, and would happily use a repo. [[Strategy/Customer_ICP|Customer_ICP.md]] names the discontinuity; what is new is that the *evidence* and the *first users* now sit on opposite sides of it.
- Everything in [[Strategy/Open_Questions|Open_Questions.md]] carries unchanged.

---

## The assignment

1. **Write T46 down before the first conversation.** Fifteen minutes, and it has been on the list since 2026-08-13.
2. **Ask every person to show you the last HTML artifact they generated.** T50 is the cheapest available disconfirmation of the beachhead, and it costs one question per conversation.
3. **The architecture deck must answer stored cross-site scripting in the shared path**, specify the IPC contract, and name surviving concurrent change as unsolved.
4. **Read the Salesforce employment agreement.**
5. **The gym-era CRM interview evidence is still unwritten**, ninth session running. Today made it more valuable rather than less: it is now the evidence that the founder sells when he knows the buyer.
6. **Run `make -C docs brain`.** The index predates the 2026-08-13 Strategy rewrite and answers off deleted text.

---

## What I noticed about how you think

**You corrected me twice and were right both times, and both corrections came from something first-hand.** The findability reframe died on *"Salesforce already built that."* The build-first recommendation died on *"the reason I moved away from the other startup has nothing to do with mock ups."* The pattern the 2026-08-13 session named held exactly: the correction arrives from a constraint you are holding and I am reasoning past. What is new is that both constraints this time were things you had *seen*, not things you had reasoned.

**The best sentence of the session was five words long and you dropped it without flagging it.** *"the html was the doc."* It is better than the line in the summary doc, it is falsifiable where "freedom" is not, and you moved straight past it. The 2026-07-28 session recorded the same shape when the structural-preset finding arrived from building rather than reasoning: **your strongest material comes out sideways, in passing, while you are explaining something else.**

**Uncertainty produces scope.** At *"not sure"* the answer grew a semantic querying layer and a personal-workflow framing, both larger than the question asked. The direction that settled came back from a constraint, not from an addition. This is the same observation as 2026-08-13's — *given a wall you produce architecture, given a blank field you produce another direction* — and the practical form is that when you notice yourself adding, the question is probably underspecified rather than the product underscoped.

**You took the correction about the vault being wrong and immediately asked for it to be fixed rather than defending it.** The vault has been telling you for nine months that you do not talk to customers. It was wrong, you knew it was wrong, and the first thing you did with that was file a correction rather than an excuse.
