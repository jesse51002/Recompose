---
tags: [concept, product, mechanism, operations, quality]
aliases: [uat sync, sync to uat, never straight to prod, staged sync]
---

# UAT Sync

Every upstream change re-derives through the design forks and lands on **`uat`** — a branch of the platform's own repository — never directly on `main`.

**`uat` is a branch, not a review environment, and there is no approval queue.**

**Nothing lands on `uat` unverified.** A sync the agent cannot complete **halts** — it does not push a partial re-derive and wait for someone to notice. That is what makes the error budget defensible without a reviewer: the significant failures never reach the branch at all (`pivots/2026-07-30-22-autonomous-is-the-promise.md`).

A design is **one fork carrying two branches**, `uat` and `main`, mirroring the platform's own. Generation always runs against `uat`, because uat is the branch that is ahead; `main` then fast-forwards, since it already has the commit history. Two branches, but not two units of work — the promotion is free.

That free promotion rests on uat being strictly ahead of main, which holds under a clean promote-forward workflow and **breaks on a hotfix straight to main.** That is a claim about the platform's branching discipline rather than about this architecture, and it is the specific event most likely to produce real divergence — at the worst possible moment, since a hotfix means production is already broken.

## Shows up in

- `pivots/2026-07-28-01-agentic-editing-all-in.md`
- `Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md`
- `Product_Boundaries.md`
- `Recompose_Flow.mermaid`

## Related concepts

- [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]]
- [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]]
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
