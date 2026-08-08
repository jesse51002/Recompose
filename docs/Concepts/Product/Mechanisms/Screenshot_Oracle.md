---
tags: [concept, product, mechanism, validation, quality]
aliases: [screenshot oracle, screenshot validation, visual accept condition, VLM judge]
---

# Screenshot Oracle

Design output is judged by rendering it and looking at the image, not by evaluating a rule set. A VLM inspects the screenshot and accepts or rejects.

This is the answer to the problem the founding pivot named as its largest remaining engineering risk: colour resolves against WCAG AA and OKLCH math, but **layout has no equivalent formula**. Generating *valid* layouts is easy; generating *good* ones was the open problem, and without any proxy for quality, human review becomes the throughput ceiling — which attacks the economics that make this a platform product rather than a services business.

It is honestly weaker than what it replaces on the colour side. WCAG is deterministic; a VLM judgement is not. The claim is only that it is **an oracle where there was none**, and that it is cheap. It also only exists cheaply in a browser, which is an architectural justification for the [[Concepts/Product/Mechanisms/Visual_Mirror|visual mirror]] having nothing to do with preview.

The same oracle applies on the production side: build to web and diff screenshots against the approved mock. Flutter Web is canvas-painted and therefore pixel-identical to mobile, a finding from the 2026-05-25 session repurposed for this. That symmetry is what makes the mirror's fidelity **measured rather than assumed**.

**An accept condition is not a stopping condition.** The validator loops with the design agent until accepted, and nothing currently bounds that loop. Unbounded loops are unbounded cost inside a fixed price, and whether VLM judgement tracks human judgement well enough to terminate is untested.

## Shows up in

- [[pivots/2026-07-28-01-agentic-editing-all-in|pivots/2026-07-28-01-agentic-editing-all-in.md]]
- [[Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture|Office_Hours/2026-07-28-01-Office_Hours_Agentic_Editing_Architecture.md]]
- [[Product_Boundaries|Product_Boundaries.md]]
- [[Open_Questions|Open_Questions.md]]

## Related concepts

- [[Concepts/Product/Mechanisms/Visual_Mirror|Visual_Mirror]]
- [[Concepts/Product/Mechanisms/Full_Visual_Redesign|Full_Visual_Redesign]]
- [[Concepts/Product/Mechanisms/Modal_Coherence|Modal_Coherence]]
