---
tags: [concept, product, mechanism, operations, quality, retired]
status: retired
retired: 2026-08-12
aliases: [uat sync, sync to uat, never straight to prod, staged sync]
---

# UAT Sync

> [!warning] Retired 2026-08-12 with the fork model
> There are no design forks to re-derive and nothing lands on the platform's branches. How a module actually reaches a running app is undecided and turns on compile-time versus runtime insertion — [[Strategy/Open_Questions|Open_Questions.md]] §2.3.
>
> **The halting principle underneath this did not survive intact either.** Halting was sufficient *because* a bad output was cosmetic; a module has no accept condition to halt against yet, which is why [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]] is suspended.

Every upstream change re-derives through the design forks and lands on **`uat`** — a branch of the platform's own repository — never directly on `main`.

**`uat` is a branch, not a review environment, and there is no approval queue.**

**Nothing lands on `uat` unverified.** A sync the agent cannot complete **halts** — it does not push a partial re-derive and wait for someone to notice. That is what makes the error budget defensible without a reviewer: the significant failures never reach the branch at all ([[pivots/2026-07-30-22-autonomous-is-the-promise|pivots/2026-07-30-22-autonomous-is-the-promise.md]]).

A design is **one fork carrying two branches**, `uat` and `main`, mirroring the platform's own. Generation always runs against `uat`, because uat is the branch that is ahead; `main` then fast-forwards, since it already has the commit history. Two branches, but not two units of work — the promotion is free.

That free promotion rests on uat being strictly ahead of main, which holds under a clean promote-forward workflow and **breaks on a hotfix straight to main.** That is a claim about the platform's branching discipline rather than about this architecture, and it is the specific event most likely to produce real divergence — at the worst possible moment, since a hotfix means production is already broken.

## Shows up in

- [[pivots/2026-07-28-01-agentic-editing-all-in|pivots/2026-07-28-01-agentic-editing-all-in.md]]
- [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]]
- [[Strategy/Product_Boundaries|Product_Boundaries.md]]
- `Recompose_Flow.mermaid`

## Related concepts

- [[Concepts/Business/Strategy/Autonomous_Operation|Autonomous_Operation]]
- [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]]
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
