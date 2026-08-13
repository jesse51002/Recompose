---
tags: [concept, product, mechanism, integration, trust]
aliases: [never touch their code, no write access, read-only integration, we don't touch your trunk]
---

# Never Touch Their Code

**Recompose does not write to the platform's trunk. Ever.** A module lands in an extension surface — a plugin registry, an SDK-compliant package, a bundle their own pipeline picks up — never on their main branch.

This is one of the two core principles, alongside [[Strategy/Product_Boundaries|additive-only]]. The two answer different objections: additive-only is what makes the product *safe to accept*, and this is what makes it *possible to say yes to*.

> [!warning] Softened 2026-08-12, and the doc should say by how much
> The principle used to be **absolute**: no write of any kind, integration consisting entirely of read access, and therefore *nothing to adopt* — no library, no API, no version to track. [[pivots/2026-08-12-21-modular-feature-system-replaces-visual-redesign|The modular feature pivot]] gave that up knowingly, because a module has to run inside their app and something has to accept it.

It still works for a reason that is organizational before it is technical, but the strength now depends on which case a platform is in:

- **They already run an extension architecture** — Banno's Digital Toolkit and Plugin Framework, Backbase's SDK, Tapcart's App Studio and Configurable Blocks, BuildFire's `buildfire.js`, GoodBarber's custom code and APIs. Recompose writes into a surface they already own, host, deploy and govern. The sign-off is small because the surface exists to be written into, and the safety story is theirs.
- **They have no such surface** — they add insertion points to their own app, which needs exactly the engineering-leadership sign-off the absolute version existed to avoid. **This is the harder sale and it is the reason the ICP moved** to platforms that already have one.

**Which case is normal is unverified.** Banno's plugins are HTML/CSS/JS web apps hosted on the *partner's* infrastructure; Tapcart's blocks live inside its own studio. Whether any of them reaches native UI inside an arbitrary existing screen is answerable from public documentation and has not been checked.

What it does **not** solve is the QA and correctness objection. They still ship something an agent wrote, running under their auth against their data. Additive-only carries part of that weight and **there is no accept condition yet** for whether the added thing works.

## Shows up in

- [[Strategy/Product_Boundaries|Product_Boundaries.md]]
- [[pivots/2026-07-28-01-agentic-editing-all-in|pivots/2026-07-28-01-agentic-editing-all-in.md]]
- [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]]
- [[Strategy/Architecture_Thesis|Architecture_Thesis.md]]

## Related concepts

- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]]
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
- [[Concepts/Product/Mechanisms/UAT_Sync|UAT_Sync]]
- [[Concepts/Product/Mechanisms/Integration_Surface|Integration_Surface]]
