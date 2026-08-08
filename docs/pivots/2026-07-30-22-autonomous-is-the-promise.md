---
tags: [pivot, positioning, autonomy, recompose]
status: Decided
date: 2026-07-30
---

# Pivot: Autonomous Is the Promise

**Date:** 2026-07-30
**Status:** Decided

Concepts touched: [[Autonomous_Operation]], [[Never_Touch_Their_Code]], [[Re_Derived_Not_Forked]], [[UAT_Sync]], [[Integration_Surface]], [[Closed_Design_To_Production_Loop]], [[Screenshot_Oracle]].

## The decision

The promise flips from **"leverage, not autonomy"** to **autonomous operation**: the fork model removed the review burden that made the deflationary framing necessary, so nothing in the architecture requires a human in the steady state.

## What it pivots from

`pivots/2026-07-28-01-agentic-editing-all-in.md` set the stated promise as human leverage — *not that agents are magic, but that one person can manage a hundred at a time* — and justified the ~95/4/1 error budget on the grounds that **UAT and a human reviewer were the designed architecture, not a fallback.**

That justification was already half-dead. On 2026-07-30 UAT was corrected from "a review environment with an approval queue" to **a branch, with no queue and no reviewer**, which left the budget's basis recorded as OPEN across the vault.

## What it pivots to

- **Autonomous is the promise.** Humans are not needed in the normal path, and the intended trend is toward zero as agent capability improves and the skill and review scaffolding deepens.
- **~95/4/1 is a target, not a measurement.** It is a goal set now and expected to fall. The vault previously carried it as though it described observed behaviour; it never has, and nothing has been measured.
- **The 1% significant is survivable because the pipeline halts rather than ships.** An agent that cannot satisfy the accept condition stops, and nothing deploys. A significant failure becomes a stall, not an incident. This is the replacement for the reviewer and it closes the load-bearing half of the OPEN question.
- **The 4% minor is cosmetic by definition** — non-critical, annoying rather than breaking, and it reaches production.
- **No review step is claimed anywhere on the platform's side.** No PR, no queue, no integration work, no engineering sign-off.

## Why (briefly)

The leverage framing was load-bearing only while Recompose was going to edit the platform's own repository, where every change created review work for their engineers. On a Recompose-managed fork there is no PR into their trunk and no queue on their side, so the constraint that produced the deflationary promise no longer exists. Halting instead of shipping replaces the human reviewer as the thing that makes the error budget survivable — a failure that stalls costs a delay, and a failure that ships costs a brand.

## What this does NOT resolve

Recorded so no downstream doc invents an answer.

1. **Who resolves a halt.** Leaning the platform's own staff; a forward-deployed engineer was considered and the objection named against it is **lack of domain knowledge** about the platform's app. Unresolved.
2. **That open question contradicts the demo's closing claim.** The recorded pitch ends on *"essentially no manual integration and maintenance for a white-label platform."* If halts are resolved by platform staff, that sentence is false. The two cannot both stand and this pivot does not choose between them.
3. **How the 4% minor gets swept up.** A scheduled code review is a candidate, not a decision.
4. **The budget still has no denominator.** Per screen, per tenant-redesign, or per sync operation — carried forward unchanged from `Architecture_Thesis.md` and `Open_Questions.md`.

## Office hours doc(s) that explored this

None. The decision came out of reviewing the recorded YC demo (`Recompose-YcDemo-Jesse.mp3`, 2026-07-30, 2:22), in which the delivered pitch was autonomous throughout — *agents merge autonomously, the fork is managed completely by agents, needing a person should be rare* — and the founder confirmed that this was intended rather than a slip in delivery.

## Downstream impact

Docs asserting the old promise, all requiring update:

- `docs/Product_Boundaries.md` — the section *"We promise leverage, not autonomy"* and its marketing boundary (*never sell hands-off autonomy, never imply zero review*) invert.
- `docs/Recompose_Summary.md` — the promise paragraph.
- **The promise concept is renamed to [[Autonomous_Operation]]**, replacing the old strategy concept outright rather than keeping a deprecated one alongside it, and relisted in `Concepts/_Index.md`. No historical doc wikilinked the old name, so nothing broke.
- `docs/Concepts/Product/Mechanisms/Re_Derived_Not_Forked.md` — *"where a human reviews what the agent could not resolve."*
- `docs/Concepts/Product/Mechanisms/UAT_Sync.md` — already corrected once on 2026-07-30; carries the budget's basis.
- `docs/Open_Questions.md` — §2.1b closes in part; the denominator and the who-resolves-a-halt questions stay open.
- `docs/Architecture_Thesis.md` — the error-budget entry.
- `docs/Journey.md` — the Phase 6 line *"The promise got smaller and better."*
- `docs/YC_Application_F26.md` — the corrections table, the demo-script flags, and the "two strongest parts of the pitch" note.
- `CLAUDE.md` (root) — the promise bullet and its OPEN marker.
- `PRODUCT.md` — Positioning, Operating Context, Brand Commitments, Product Principle 4.

Not edited, per the never-edit-retroactively rule: `pivots/2026-07-28-01-agentic-editing-all-in.md` and every doc in `Office_Hours/`. The prior pivot's status is set to superseded-in-part and nothing else in it changes.
