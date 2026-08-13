---
tags: [concept, business, strategy, positioning, quality]
aliases: [autonomous operation, autonomy, the promise, nothing waits to be approved, halts rather than ships]
---

# Autonomous Operation

> [!danger] Suspended 2026-08-12 — this claim may not be made until an accept condition exists
> The promise was defensible because of a chain that [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|the modular feature pivot]] broke at its first link. **Do not describe Recompose as autonomous, and do not quote any error budget, until the chain is rebuilt.**

## Why it is suspended, and the chain that broke

The promise stood on three things in order:

1. **A bad output is ugly, not broken** — no data model to corrupt, no permission to leak, no correctness contract to violate.
2. **Therefore halting is sufficient.** A stage that cannot satisfy its accept condition stops and nothing deploys, so a significant failure costs a delay rather than a brand.
3. **Therefore nothing lands on the platform's desk.**

**A module that writes to a database fails at step 1**, and steps 2 and 3 do not survive it. Worse, step 2 needs an accept condition to halt *against*, and a feature has neither of the visual product's two oracles — no screenshot a human can judge, and no diff proving the API surface is unchanged. **There is currently nothing to halt on.** Four candidates are recorded in [[Strategy/Product_Boundaries|Product_Boundaries.md]] and none is chosen.

## The error budget does not transfer

Roughly **95% clean, 4% minor, 1% significant** was a **target that was never measured** under the previous product, and it described *cosmetic* defects in a *redesign*. It has no meaning for generated functionality. **Do not quote it, do not adapt it, and do not treat its absence as a gap to fill with a new number before anything is measured.**

## What survives

The half of the claim that never depended on output type: **zero *platform* involvement** — no PR into their trunk, no review queue, no engineering sign-off — as distinct from zero human involvement. That distinction was established on 2026-08-04 and it still holds, because the tenant being in the loop was always compatible with the platform not being.

**Who resolves a failure remains the unresolved question, and it got harder.** Every production system in the field keeps a human at the merge gate — Devin, Copilot CCA, SapFix, and even Uber's Piranha, a deterministic tool that only deletes stale feature flags and still routes its diff to the flag's author. If failures land on the platform's staff, "no manual maintenance" is false. A failure resolved by Recompose is COGS; one resolved by the platform is a broken promise. **A failure that is wrong data rather than a wrong-looking screen is a third case nobody has priced.**

## The unresolved question inside it

**Who resolves a halt.** The halt mechanism is what makes the budget defensible, but a halted design still has to be resolved by somebody. Leaning the platform's own staff; a forward-deployed engineer was considered and the objection against it is lack of domain knowledge of an app they did not write.

This is the one question that can falsify the promise. If halts land on the platform's staff, then "no manual integration and maintenance" is false and the autonomy holds only until it doesn't. A halt resolved by Recompose is COGS; a halt resolved by the platform is a broken promise.

## Shows up in

- [[pivots/2026-07-30-22-autonomous-is-the-promise|pivots/2026-07-30-22-autonomous-is-the-promise.md]]
- [[Strategy/Product_Boundaries|Product_Boundaries.md]]
- [[Strategy/Recompose_Summary|Recompose_Summary.md]]
- [[Strategy/Open_Questions|Open_Questions.md]]
- [[Strategy/YC_Application_F26|YC_Application_F26.md]]

## Related concepts

- [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]]
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
- [[Concepts/Product/Mechanisms/UAT_Sync|UAT_Sync]]
- [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]]
