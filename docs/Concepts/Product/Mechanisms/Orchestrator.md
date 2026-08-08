---
tags: [concept, product, mechanism, ai, orchestration]
aliases: [orchestration layer, orchestration pipeline, design orchestrator]
---

# Orchestrator

The coordination layer that turns commodity AI generation primitives (text-to-image generators, background removers, LLMs for colour/copy/font selection) into one coherent brand-applied app. Per-modality generators are commoditizing; anyone with API access can call them. The orchestrator is the layer that makes their outputs cohere, while staying anti-same across tenants and accessible under arbitrary brand inputs.

As shipped, the orchestrator is a small **dependency DAG** (`src/executor/orchestrator.py` in `codebase/CustomizationService/`). A registry turns two YAMLs (`app.yaml` + `customization.yaml`) into a node set — one colour node, one font node, one text node, and one image node per image slot — and the executor levels the graph topologically and resolves each level concurrently and fault-tolerantly. It currently coordinates four surfaces: **images, colours, fonts, and text**. Coherence is achieved structurally (a shared derived palette feeds every image prompt; `depends_on` edges fold one slot's look into another's prompt as a style reference; colour derivation is deterministic), not by a separate cross-modality review stage.

The earlier, more ambitious framing imagined the orchestrator enforcing cross-module coherence across illustration, iconography, motion, copy, typography, and layout — see [[Modal_Coherence]]. That remains the trajectory. The shipped engine is deliberately simpler in its *resolution architecture* (no six-pillar per-page cascade), but the surfaces are not abandoned: **icon-set and animation modification stay in the modification pipeline, scheduled for after validation**, joining the DAG as new node types the way fonts and text did. The orchestrator is still the actual product — generation is table stakes — but its current job is leveling and resolving a small typed graph. This is the opposite design philosophy from general AI app builders (Lovable, Bolt) which optimize for breadth of expression with maximum agent latitude; the orchestrator optimizes for depth of constraint.

## Shows up in

- `Architecture_Thesis.md`
- `Product_Boundaries.md`
- `ThemeTreeArchitecture.md`
- `Office_Hours/2026-05-01-15-Office_Hours_Marketplace_Pivot_and_Architecture_Refinement.md`
- `pivots/2026-05-20-23-customization-pipeline-simplified-to-dependency-dag.md`

## Related concepts

- [[Modal_Coherence]]
- [[AI_Design_Compression]]
- [[Tokenized_Design_System]]
