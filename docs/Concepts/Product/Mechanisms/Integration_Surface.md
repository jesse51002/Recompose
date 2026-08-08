---
tags: [concept, product, mechanism, integration, adoption]
aliases: [integration surface, low-friction integration, adoption without architectural change, no integration]
---

# Integration Surface

The claim that a platform must be able to adopt the engine **without changing its architecture**. Integrating into a customer's existing setup was named as the biggest expected blocker to adoption, so whatever removes that blocker is as much the product as the generation pipeline is.

**The answer is "there is nothing to integrate."** Recompose keeps its own tokenized fork and derives every design from it; the platform grants read access and adopts no library, no API and no version to track. Its architecture is not merely unchanged, it is untouched — see [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]].

The premise was reversed twice inside the 2026-07-27 session and the final position is stronger than either earlier one. The founder first argued tokenization is not hard, only unpackaged; after an independent cold read raised the objection from an organizational angle (QA ownership, security review, reluctance to hand production UI to an external system), he reversed to *"tokenizaion is going to be a blocker because i havwe to integrate into their architecture, and this might be the biggest blocker."* Naming integration as the blocker is what promoted the surface to product.

**What that objection was actually about** — every item in it concerns an external system operating inside their codebase. The fork model does not answer the objection so much as remove its premise, and the reason it works is organizational before it is technical: write access to a trunk needs engineering leadership sign-off, read access does not.

**What the runtime layer actually is.** Two runtimes exist, not one: `ThemeFlutter`, consumed live by the member app and the CRM, and `ThemeReact`, a built web runtime shipping as the `theme-react` library alongside a standalone theme browser. A local-only studio API (`ThemeTree/studio`) drives runs behind them. An earlier draft of this concept asked whether the runtime and read API would survive the fork model at all; a second runtime having been built answers that — the layer is being invested in.

What stays genuinely open is narrower: once layout is code inside a fork, whether resolved **assets** are fetched at runtime or baked at build time. A hybrid is the likely shape and nothing decides it. The old multi-language roadmap framing (React Native, Swift, Kotlin as a queue of SDKs to write) is not how this is being built — surfaces are appearing where they are needed. The "nested html" idea remains undefined (Open Question 2.6).

**The Gigacatalyst benchmark no longer applies.** Their ~2 days to install and ~2 weeks to full integration was the bar to beat when there was something to install. There is no installation step now. The remaining time cost is the forward-deployed tokenization pass, which is our work rather than theirs.

The strategic payoff is unchanged and is what makes this infrastructure rather than a pipeline with a services team attached: an agent that can write view code for a redesign can also do the initial tokenization pass, so the integration problem and the redesign product are one capability.

## Shows up in

- `pivots/2026-07-28-01-agentic-editing-all-in.md`
- `pivots/2026-07-27-11-customization-engine-is-the-company.md`
- `Architecture_Thesis.md`
- `Office_Hours/2026-07-27-11-Office_Hours_Customization_Engine_As_The_Company.md` (§4, P3, P14a, T4, T9)

## Related concepts

- [[Concepts/Product/Mechanisms/Never_Touch_Their_Code|Never_Touch_Their_Code]]
- [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]]
- [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]]
- [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]]
- [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]
