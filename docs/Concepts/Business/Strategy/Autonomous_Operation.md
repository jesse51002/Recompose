---
tags: [concept, business, strategy, positioning, quality]
aliases: [autonomous operation, autonomy, the promise, nothing waits to be approved, halts rather than ships]
---

# Autonomous Operation

The promise Recompose sells is that **a redesign runs to production without anyone being asked about it.** No PR into the platform's trunk, no review queue, no integration work, no engineering sign-off. The intended trend is toward zero human involvement as agent capability and the review scaffolding around it improve.

This is possible only because of [[Never_Touch_Their_Code|the fork model]]. While Recompose was going to edit the platform's own repository, every change created review work for their engineers. On a Recompose-managed fork there is no PR and no queue on their side, so nothing about the architecture requires a person in the normal path.

## What makes it defensible: halting, not reviewing

The stated error budget is roughly **95% clean, 4% minor, 1% significant** — a **target that has never been measured.** It must never be quoted as an observed rate.

What makes it survivable is that **the pipeline halts rather than ships.** A stage that cannot satisfy its own accept condition stops, and nothing deploys — so a significant failure costs a delay rather than a brand. This is the replacement for the human reviewer the budget used to rest on, and it is what the fleet surface already implements as its **Needs Human Help** state.

The **4% minor band is cosmetic by definition** — annoying rather than breaking — and unlike the 1% it *does* reach production. Nothing currently catches it. That is the quiet failure mode of this promise: not a loud incident, but a slow accumulation of small visual defects across a hundred branded apps, invisible to the check that makes the rest of the budget safe.

## The unresolved question inside it

**Who resolves a halt.** The halt mechanism is what makes the budget defensible, but a halted design still has to be resolved by somebody. Leaning the platform's own staff; a forward-deployed engineer was considered and the objection against it is lack of domain knowledge of an app they did not write.

This is the one question that can falsify the promise. If halts land on the platform's staff, then "no manual integration and maintenance" is false and the autonomy holds only until it doesn't. A halt resolved by Recompose is COGS; a halt resolved by the platform is a broken promise.

## Shows up in

- `pivots/2026-07-30-22-autonomous-is-the-promise.md`
- `Product_Boundaries.md`
- `Recompose_Summary.md`
- `Open_Questions.md`
- `YC_Application_F26.md`

## Related concepts

- [[Never_Touch_Their_Code]]
- [[Re_Derived_Not_Forked]]
- [[UAT_Sync]]
- [[Screenshot_Oracle]]
