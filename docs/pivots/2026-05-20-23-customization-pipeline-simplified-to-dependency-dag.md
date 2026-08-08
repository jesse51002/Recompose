# Pivot: Customization Pipeline Shipped as a Simple Dependency DAG, Not the Six-Pillar Orchestrator

**Date:** 2026-05-20
**Status:** Decided

Concepts touched: [[Concepts/Product/Mechanisms/Orchestrator]], [[Concepts/Product/Mechanisms/Tokenized_Design_System]], [[Concepts/Product/Mechanisms/Modal_Coherence]], [[Concepts/Business/Strategy/AI_Design_Compression]].

## The decision

The AI customization pipeline ships as a small, app-agnostic **dependency DAG** that takes two YAMLs (`app.yaml` + `customization.yaml`), customizes four surfaces today — **images, colours, fonts, and text** — and writes one `output.yaml`. The elaborate per-page resolution machinery (override pillars, a page→flow→tenant cascade, per-page sparse-patch overrides, `wished_for` telemetry) is dropped as overengineering. **Animation and icon-set modification are not dropped** — they stay in the modification pipeline and get built after validation. The governing principle for *architecture* is add complexity only as required; animation and icons are committed product surfaces, just sequenced behind validating the business first.

## What it pivots from

The architecture described in the old `Codebase/AI Gen Architecture.md`: a five-stage sequential pipeline (Design Direction → Base Style → Flow Modules → Page Design → Wording) producing one `TenantCustomization` Pydantic document with **six override pillars** (color, typography, layout, icons, images, animation) plus copy, all resolved at runtime through a **three-layer page → flow → tenant cascade**. It included a batched app-wide icon set, a hand-curated tagged Lottie animation library with brand recoloring, per-page sparse-patch overrides, and `wished_for` telemetry on every stage. The Flutter client carried its own surface-derivation math (elevation, dividers, popups).

## What it pivots to

A dependency DAG, not a fixed sequence. A registry turns the two YAMLs into a node set — one colour node, one font node, one text node, plus one image node per image slot — and an executor levels the graph topologically and resolves each level concurrently, fault-tolerantly (a failed node skips only its transitive dependents). Colour resolves four base slots in one LLM call (OKLCH, WCAG-AA-enforced) and then **derives the whole palette deterministically in Python** — surfaces, faded variants, dividers, dark/light — so the client became a plain consumer and the per-client surface math is gone. Fonts are one Google-Fonts-validated call; text is one batched, length-bounded call. Each image node runs build-prompt → classify-complexity → generate → background-removal, with `depends_on` edges used purely as style references for visual continuity. The customized surface is **images, colours, fonts, and text only** — no icons, no motion, no per-page cascade. The pipeline knows nothing about any specific app; every new app is one new `apps/<app_id>/` folder.

**Animation and icon-set modification stay in the modification pipeline** — they are committed surfaces, scheduled for after validation. They join the DAG as new node types the same way fonts and text did; the sequencing is "validate the business, then build them," not "build them only if a need arises."

## Why (briefly)

The old plan's *architecture* was ambitious and, on paper, excellent — but it was almost certainly overengineering. The shipped pipeline works fine as it is right now, and the simpler shape is faster to reason about, cheaper to run (no style-adherence check, no corrective edit, no per-page generation), and trivially app-agnostic. The three-layer cascade, the per-page override pillars, and the self-critique machinery were solving coherence and scale problems the current single-tenant-per-run reality does not yet have. The governing principle for that machinery: **add complexity only as it is required.** Note this is about the *resolution architecture*, not the surfaces — animation and icon modification remain on the roadmap inside the modification pipeline; they are simply built after validation. Coherence is currently achieved structurally — a shared palette feeds every image prompt, `depends_on` folds one slot's look into another's prompt, deterministic colour derivation keeps surfaces consistent — rather than by a separate review stage or a cascade. This decision was made during the build itself (the working pipeline is the evidence), so there is no separate office hours exploration session.

## Office hours doc(s) that explored this

None. This was a build-time decision — the simpler architecture emerged from implementing the pipeline and finding it sufficient, not from a formal exploration session. The prior `2026-05-01-12-merge-aiautodesign-and-generalize-to-class-based-gyms.md` pivot is the upstream context: it folded the orchestrator architecture in as the engine for the custom tier and noted the engineering bet was hedged. This pivot records that the hedge paid off — the engine that shipped is far simpler than the one that was planned.

## Downstream impact

### Docs updated as part of this pivot

- `Codebase/AI Gen Architecture.md` — rewritten to describe the dependency DAG, the two input YAMLs, the brand-brief skill, deterministic colour derivation, fault tolerance, the four customized surfaces, and the add-complexity-only-as-needed philosophy. Stale `See also` paths corrected from `codebase/AICustomizationPipeline/` to `codebase/CustomizationService/`.
- `Codebase/MobileApp/README.md` — customization surface corrected to images/colours/fonts/text, and the client-as-consumer story updated (pipeline now owns surface derivation; the client no longer carries elevation/divider/popup math).
- [[Concepts/Product/Mechanisms/Orchestrator|Concepts/Product/Mechanisms/Orchestrator.md]], `Tokenized_Design_System.md`, `Modal_Coherence.md` — definitions updated to match the shipped DAG. These are concept files (current-usage records, not historical), so they describe the pipeline as it is now, with the broader vision noted as trajectory.

### Engine behavior worth recording

- The MobileApp customization engine (`lib/customization/`) has a const fallback for colours, fonts, and text, but **deliberately has no fallback for images**. `BrandImage.of()` returns `null` when no customization applies (DI absent, nothing loaded, slot empty), and the app-side `BrandedImage` widget pairs that null with the bundled asset. A built-in image fallback was skipped because the local-asset-vs-network-URL resolution made it materially more complex than the colour/font/text case; the bundled-asset-in-the-tenant-build approach keeps the engine a pure live override.

### What stays on the roadmap vs. what is dropped

Committed surfaces, in the modification pipeline, scheduled after validation:

- **Animation modification** — joins the DAG as a node type. (The old plan's curated, tagged Lottie library with brand recoloring is the reference design.)
- **Icon-set modification** — joins the DAG as a node type. (The old plan's batched, app-wide shared icon set is the reference design.)

Dropped as overengineering (re-add only if a real need shows up):

- The three-layer page → flow → tenant cascade and per-page override pillars.
- Per-page sparse-patch overrides and `wished_for` telemetry.
- VLM self-critique / style-adherence + corrective-edit passes.
