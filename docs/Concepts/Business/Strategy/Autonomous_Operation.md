---
tags: [concept, business, strategy, positioning, quality]
aliases: [autonomous operation, autonomy, the promise, nothing waits to be approved, halts rather than ships]
---

# Autonomous Operation

> [!danger] Suspended — this claim may not be made until an accept condition exists
> **Do not describe Recompose as autonomous, and do not quote any error budget.**

## Why it is suspended

The claim needs three things in order, and it currently fails at the first:

1. **A check the system can fail.** A generated feature has none — nothing a human reads at a glance, and no diff that proves correctness rather than absence of change. Four candidates are recorded in [[Strategy/Product_Boundaries|Product_Boundaries.md]] and none is chosen.
2. **Therefore halting is sufficient.** A stage that cannot satisfy its accept condition stops and nothing deploys, so a significant failure costs a delay rather than a brand. **There is nothing to halt on.**
3. **Therefore nothing lands on the platform's desk.**

A module that writes to a database also fails differently from a cosmetic system: the failure is wrong data or a permission leak, so even a working check has to cover more than "does it look right."

## No error budget may be quoted

The **95% clean / 4% minor / 1% significant** figure in circulation was a target that was never measured, and it described *cosmetic* defects. It has no meaning for generated functionality. **Do not quote it, do not adapt it, and do not fill its absence with a new number before anything is measured.**

## What the claim can still say

**Zero *platform* involvement** — no PR into their trunk, no review queue, no engineering sign-off — as distinct from zero human involvement. The tenant being in the loop has always been compatible with the platform not being.

**Who resolves a failure is unresolved, and it is the one question that can falsify the promise.** The candidates are the platform's own staff, or a forward-deployed engineer who lacks domain knowledge of an app they did not write. Every production system in the field keeps a human at the merge gate — Devin, Copilot CCA, SapFix, and even Uber's Piranha, a deterministic tool that only deletes stale feature flags and still routes its diff to the flag's author. If failures land on the platform's staff, "no manual maintenance" is false. A failure resolved by Recompose is COGS; one resolved by the platform is a broken promise, and **a failure that is wrong data rather than a wrong-looking screen is a third case nobody has priced.**

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
