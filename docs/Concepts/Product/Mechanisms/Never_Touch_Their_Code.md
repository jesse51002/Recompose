---
tags: [concept, product, mechanism, integration, trust]
aliases: [never touch their code, no write access, read-only integration, we don't touch your trunk]
---

# Never Touch Their Code

Recompose does not write to the platform's repository. Ever. It maintains its own tokenized fork as a base and derives every design from that; the platform grants **read access**, and that is the entire integration.

This is one of the two core principles, alongside [[No_New_Requests_Invariant|arrangement only]]. The two answer different objections — arrangement-only is what makes the product *safe to accept*, and this is what makes it *possible to say yes to*.

It works for a reason that is organizational before it is technical. An external agent with **write** access to the trunk requires engineering leadership sign-off; **read** access does not. That changes who has to approve the deal, which for a solo founder is the difference between a procurement cycle and a demo. It also gives the platform a better trust primitive than review: a pull request is a one-time gate that costs them attention, while a fork is continuously and self-serve auditable — they can diff it against their main whenever they want, without involving us.

What it costs is accepted rather than avoided: **the maintenance burden moves to Recompose permanently.** Their own developers are not maintaining tokens inside code they understand; our agent re-reconciles an external fork against every structural change they make, indefinitely.

What it does **not** solve is the QA and release objection. They still ship a binary built from code an agent wrote. [[No_New_Requests_Invariant]] carries that weight and is still unbuilt.

## Shows up in

- `Product_Boundaries.md`
- `pivots/2026-07-28-01-agentic-editing-all-in.md`
- `Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md`
- `Architecture_Thesis.md`

## Related concepts

- [[No_New_Requests_Invariant]]
- [[Re_Derived_Not_Forked]]
- [[UAT_Sync]]
- [[Integration_Surface]]
