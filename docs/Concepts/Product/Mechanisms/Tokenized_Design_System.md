---
tags: [concept, product, mechanism, architecture, design]
aliases: [SVG design system, design tokens, parameterized design system]
---

# Tokenized Design System

A frontend architecture where customizable visual elements are exposed as parameterized **slots** rather than hard-coded. A customer's "skin" becomes a config — the pipeline's `output.yaml` (a resolved palette plus image, font, and text slots) — and swapping skins is updating that config rather than rebuilding components.

This architecture is the engineering substrate that makes [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]] usable in production. Without tokenization, each customer-customized version of the app requires per-customer code, which kills the marginal-cost economics. With tokenization, AI-generated assets and resolved tokens drop into a known parameter shape and the same codebase produces visibly different apps per customer.

As shipped, the token surface is **colours, images, fonts, and text**. Icon-set and animation tokens are not yet built but stay in the modification pipeline, scheduled for after validation; layout tokens are added only as required. It is also flatter than originally planned: there is no three-layer page → flow → tenant cascade. The pipeline resolves a single finished palette (the colour node derives all surfaces, faded variants, and dividers deterministically), so the Flutter runtime (`Flutter/lib/`) is a plain consumer that reads slots and no longer carries its own surface-derivation math. Most slots fall back to a bundled const default when no customization is loaded; images deliberately have no engine fallback (the bundled tenant asset is the fallback). The slot inventory lives entirely in `app.yaml`, so the same client and pipeline customize a different app with no code change.

## Shows up in

- [[Office_Hours/2026-04-30-14-Office_Hours_Customizable_White_Label_Thesis|Office_Hours/2026-04-30-14-Office_Hours_Customizable_White_Label_Thesis.md]]
- [[ThemeTreeArchitecture|ThemeTreeArchitecture.md]]
- [[pivots/2026-05-20-23-customization-pipeline-simplified-to-dependency-dag|pivots/2026-05-20-23-customization-pipeline-simplified-to-dependency-dag.md]]

## Related concepts

- [[Concepts/Business/Strategy/AI_Design_Compression|AI_Design_Compression]]
- [[Concepts/Business/Strategy/Shopify_Pattern|Shopify_Pattern]]
