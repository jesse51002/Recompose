---
tags: [concept, product, mechanism, ai, design]
aliases: [cross-modal coherence, design coherence, brand coherence, anti-sameness]
---

# Modal Coherence

The property of having a tenant's customized surfaces — images, colours, fonts, copy (and, in time, iconography, motion, and layout) — feel like one designer made them, rather than like separate AI tools produced outputs that got stapled together. The quality the [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]] is built to protect.

Each modality producing technically-correct output independently is solvable today (text-to-image generators for imagery, an LLM for the palette, Google-Fonts selection, LLMs for copy). What is not solved is whether the outputs, when composed, feel coherent. An app can have a perfect image set, a perfect palette, perfect typography, and perfect copy and still feel off because the imagery's energy doesn't match the type, or the copy voice doesn't match the brand archetype.

This is the AI sameness failure mode dressed up. Nielsen Norman Group's evaluations of Galileo AI, Figma First Draft, and Stitch consistently find AI-generated UI tends toward purple gradients, glossy cards, homogenized layouts. The MDPI 2024 systematic review found generated interfaces "exhibit homogenized layouts" with "structural and functional errors." Coherence is a coordination problem, not a per-module quality problem.

In the shipped pipeline, coherence is pursued **structurally rather than through a separate review stage**: a single deterministically-derived palette feeds every image prompt, image `depends_on` edges fold one slot's resolved look into another's prompt as a style reference (visual continuity), and colour derivation is fully deterministic so surfaces stay consistent. There is no VLM self-critique pass — it can worsen already-good output, and the simpler structural approach is sufficient for now. Cross-modality coherence across motion and iconography is where the longer-term moat is expected to live; those surfaces stay in the modification pipeline and are scheduled for after validation, at which point the coherence machinery they need ships with them. If the pipeline produced "all modules technically correct but the apps feel like AI made them," the product would collapse to the same surface as Galileo, Stitch, or Lovable.

## Shows up in

- `Architecture_Thesis.md`
- `Product_Boundaries.md`
- `ThemeTreeArchitecture.md`
- `Office_Hours/2026-05-01-15-Office_Hours_Marketplace_Pivot_and_Architecture_Refinement.md`
- `pivots/2026-05-20-23-customization-pipeline-simplified-to-dependency-dag.md`

## Related concepts

- [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]]
- [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]]
- [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]]
