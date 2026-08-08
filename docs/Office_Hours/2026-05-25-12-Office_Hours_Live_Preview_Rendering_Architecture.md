# Office Hours: Live Preview Rendering Architecture (How Clients See Edits Live)

**Date:** 2026-05-25
**Status:** DRAFT
**Mode:** Startup, architecture-options exploration
**Builds on:** Business/Office_Hours/2026-05-01-15-Office_Hours_Marketplace_Pivot_and_Architecture_Refinement.md, Business/Office_Hours/2026-04-30-14-Office_Hours_Customizable_White_Label_Thesis.md

Concepts touched: [[Concepts/Product/Mechanisms/Orchestrator|Orchestrator]], [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]], [[Concepts/Business/Strategy/Shopify_Pattern|Shopify_Pattern]], [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]].

> Focused architecture session, not a full strategic diagnostic. The founder asked an open-ended exploration question: how does a client view the generated presets and **edit them live, seeing the result in the real app**, in a way that scales when selling the customization service — not just by running the Flutter app directly. The session worked through the industry landscape (white-label app builders, Shopify/WordPress live preview, Appetize emulator streaming, server-driven UI, design tokens), challenged the founder's own "Figma-style design tool" idea, and converged on a clear MVP direction with one path explicitly parked for the future. Nothing here overturns a prior documented decision, so no pivot doc is written; this stands alone as the record of the reasoning. The parked native-stack path is also logged in `Future_Ideas_and_Explorations/customization_live_preview.md`.

---

## What carries from prior sessions

These premises survive untouched and frame this session:

- The actual product is the [[Concepts/Product/Mechanisms/Orchestrator|orchestration layer]] that produces coherent brand-applied output, not the generation models. (2026-05-01)
- The [[Concepts/Business/Strategy/Shopify_Pattern|Shopify_Pattern]] is the architectural analog: fixed structure, brand/style layer applied on top, premium customization as the upsell tier. (2026-04-30, 2026-05-01)
- The customization the product sells is **token/asset-level** — palette, typography, iconography, illustration, motion presets, copy register, logo — *not* layout or structural redesign. ([[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]])
- Default quality matters more than iteration UX, because marketplace-tier buyers ship with first output and won't fiddle deeply. (2026-05-01)
- "I am not making a magic button, I am making an easy way to customize, not frictionless or instant." (2026-05-01) — the live editor is a *light-touch* preview-and-nudge surface, not a design studio.

---

## What this session changed / added

1. **Named the real problem.** The question is not "how do clients design" (that's the orchestrator's job, already decided). It is "how do clients **preview and lightly tweak** what the AI already generated, rendered in the real app, without the founder being in the room." Much smaller, well-solved problem.
2. **Killed the Figma-style design tool, on principle.** A client-facing design tool inverts the product's value prop ("you don't design it, we generate it") and makes the sale harder (now they need design skill, taste, time, and they have to author animations). Confirmed against the founder's own intuition that it gets complicated fast.
3. **Surfaced the binding technical reframe: decouple preview from runtime.** "Which language is the production app written in" only matters if you tie the preview to the runtime. Driven off a shared spec/config, the preview is just one more consumer; the production app's stack stops mattering. This is the load-bearing insight of the session.
4. **Converged on Flutter-(or RN-)to-web as the MVP preview engine**, with native-stack live preview (Appetize Enterprise) explicitly parked until revenue + a native-only client justify it.
5. **Established a stack-fidelity preference: Flutter > React Native** for the preview, because Flutter Web is canvas-painted (pixel-identical to mobile) while RN→web re-maps to DOM and can drift, especially on animation — which is exactly what the product customizes.

---

## Problem Statement

How does a paying client view the generated presets and **edit them live — seeing the change reflected in the actual app — at scale**, given that:

- Running the Flutter app directly works for now (the founder can be the FDE on each sale) but does not scale.
- The founder's only scalable idea so far was a Figma-style "design your app" surface, which he suspects is too complex and edge-case-ridden.
- Critically: **the founder does not own every app.** The customization service injects a brand config into an already-built app that could be in any stack (native Kotlin/Swift, Flutter, React Native). Flutter/RN compile to web; native does not.

Working questions that emerged:

1. How does the industry give a live-updating preview of an app inside a browser editor?
2. Does the Figma/design-tool idea hold up? (No.)
3. If the production app is native (Kotlin/Swift) and can't run in a browser, how can a live preview exist at all?
4. What does Appetize-style emulator streaming cost, and does it scale?
5. What's the right MVP shape given the founder owns the stack today?

---

## The reframe that dissolves most of the problem

"Live preview" can mean two fundamentally different things, with completely different architectures:

- **(A) The preview is the literal production binary, running.**
- **(B) The preview is a faithful re-render driven by the same source of truth.**

The founder was implicitly assuming (A) — "I must render the real Kotlin app in a browser" — which is what made it feel impossible. (B) is how almost everyone actually ships this, and it makes the production app's language irrelevant: the native app and the web preview are *both* downstream consumers of one config/spec. You never render Kotlin in a browser; you render the **spec** in a browser, and the native app renders the same spec on the phone.

The honest cost of (B): a web re-render is ~95% faithful to native, not byte-identical (font hinting, native ripple, platform component chrome differ). But the 5% that differs is exactly the part the client is *not* customizing. For brand fidelity — color, type, logo, icon, motion — (B) is faithful for everything that changes.

This is the same pattern the white-label builders ship (GoHighLevel, AppMySite, MobiLoud all use a web mock as the live preview even when they ship native binaries), and the same pattern Shopify/WordPress use (control panel + the real rendering engine live in an iframe, updated via partial re-render rather than full reload).

---

## Approaches Considered

### Mechanism 1 — Stream the real binary (the (A) answer)

Appetize.io / BrowserStack App Live: upload the actual `.ipa`/`.apk`, boot a real iOS simulator / Android emulator in the cloud, stream the screen into an iframe with input piped back. Live-update loop relies on the app re-reading the brand config at runtime (which the [[Concepts/Product/Mechanisms/Tokenized_Design_System|config layer]] already assumes): edit token → push config → running app refetches → re-renders.

- **Strengths:** pixel-perfect (it IS the real app); language-agnostic — works for Kotlin, Swift, Unity, anything; previews an app the founder doesn't own.
- **Weaknesses:** metered streaming cost; "live" feels like remote-desktop (2–5s, not instant); **concurrency queues** on metered plans; and the hard dependency that the target app must hot-read config without a rebuild (if it reads config only at build time, you re-upload a binary per change — fatal).

**Appetize pricing captured this session** (verify exact minute allocations and overage at appetize.io/pricing — the page is JS-rendered and the precise included-minutes / per-minute rate could not be scraped):
- Free / Trial: $0, small metered-minute allotment.
- Starter: ~$59/mo, bundled minutes + per-minute overage.
- Premium: ~$319/mo, larger bundled minutes + overage.
- Enterprise: custom — the *only* tier with the "Active Devices" model (flat, **unmetered** concurrent device slots), **minimum 16 devices, sold in packs of 8**.

**Billing models do not stack.** Starter/Premium = pay for **minutes**, no per-device line item, concurrency queues at peak. Enterprise Active Devices = pay for **devices**, unmetered, no per-minute charge. Minutes are cheaper for bursty/occasional use (a few demos a week, ~$1.50 for a 30-min session at ~$0.05/min). Devices win for heavy continuous use (an always-open public editor), because the meter would otherwise run nonstop.

### Mechanism 2 — Design tokens, one source → many renderers (a (B) answer)

Style Dictionary model. The config is platform-neutral tokens; one source transforms to CSS (web preview), `UIColor` (iOS), `colors.xml` (Android), DesignConstants (Flutter). Build one web renderer that draws "an app shell with these tokens"; native apps are parallel consumers.

- **Strengths:** instant, free, infinite concurrency; framework-agnostic.
- **Weaknesses / why rejected for the not-our-app case:** the founder *does not own the app*. A token-driven web re-render shows *a* generic shell, never *their* actual shell — so the preview would always diverge from the real app the client cares about. Works only when the previewed shell IS the product (i.e. apps the founder builds).

### Mechanism 3 — Server-Driven UI (the heavyweight (B) answer)

Airbnb Ghost Platform / Lyft / DoorDash: server sends JSON describing the entire UI; each platform interprets the same JSON natively; a web client renders the same JSON as a first-class preview.

- **Strengths:** truly live, cross-platform, identical across clients.
- **Why rejected:** defining the whole UI as a spec **is the Figma burden again** — it re-imports the design-tool complexity the founder already ruled out, plus a major platform build. Reserved for "if we ever sell structural customization," which we don't.

### Mechanism 0 (the converged MVP) — Flutter/RN compiled to web, live-edited via postMessage

The founder builds the apps today, so they are Flutter. Flutter compiles to **Flutter Web**, embeds in an iframe, and does two-way `postMessage`. The editor wraps the real app in a phone frame; a control panel pushes config; the widget tree rebuilds in the same frame. The preview **is** the production engine — (A)'s fidelity and (B)'s scale at once, for free.

- **Strengths:** no queue, no per-minute meter, near-zero cost, truly instant, and it's the real engine not a mock — for any stack that compiles to web.
- **Weaknesses:** only works for Flutter / RN apps (or apps the founder builds in those); a pre-built native-only client app is out of reach until Mechanism 1.

---

## Recommended Approach

**MVP: Mechanism 0 — Flutter-Web preview in an iframe, light-touch control panel, config over `postMessage`.** Strictly dominates Appetize for stacks that compile to web (no queue, no meter, instant, real engine). Tiered build:

- **Tier 0 — shareable preview link (cheapest, highest sales leverage).** AI generates the theme → publish a URL loading the app-as-Flutter-Web with that tenant's config baked in. Client opens *their* branded app on their own phone. No editor at all. May be the entire first MVP; validates the iframe/config plumbing.
- **Tier 1 — preview + a handful of constrained knobs.** Accent color, pick-from-3 font presets, logo upload, light/dark. `postMessage` config into the iframe, partial re-render. The Shopify/WordPress experience; the natural thing to sell.
- **Tier 2 — full design tool (Figma-clone).** Do not build. Contradicts the value prop; where animation/layout edge cases live.

**Animations stay a curated preset library, never client-authored** — this is the line that keeps Tier 1 from sliding into Tier 2. The client picks a motion preset (or the orchestrator assigns one); they never author motion. Consistent with the 2026-05-01 decision to ship motion as curated presets selected by brand archetype.

**Stack preference if choosing: Flutter over React Native** for preview fidelity (canvas-painted web = pixel-identical; RN→web re-maps to DOM and can drift on exactly the animation layer the product sells).

**Parked: Mechanism 1 (Appetize Enterprise / Active Devices)** for the future case of previewing native-only apps the founder doesn't own. Logged in Future Ideas. The chicken-and-egg resolves by YAGNI: ship Mechanism 0 now (free, scales), land revenue, and only go Appetize Enterprise when a paying native-only client demands it.

---

## Open Questions

1. **Self-serve knobs vs. founder-applies-changes.** Tier 1 (client moves knobs themselves, scales to zero founder involvement) vs. view-only preview where change requests route back through the orchestrator (ships fastest, doesn't scale forever). Asked but not resolved — likely phased (view-only links now, knobs once the founder knows which 3–4 controls clients actually reach for).
2. **Which surface is previewed** — the member-facing app, the gym-admin app, or both. Depends on what the client is buying/branding. Unresolved.
3. **Whose web build.** If the client brings a pre-built Flutter/RN app, the founder needs *their* web build wired to read the config. If the founder builds it, he controls all of it (simplest, probably the right MVP shape). Confirm per deal.
4. **The runtime-config contract** (only bites under Mechanism 1): the target app must hot-read brand config without a rebuild, or live preview is impossible. This is a sales-qualification question for native-only clients, not a tech problem the founder can solve from his side.
5. **Stack-constraint as ICP filter.** Restricting early clients to "Flutter/RN, or let me build it" is a narrower wedge — likely a *feature* at MVP (narrowest wedge), but worth confirming it doesn't exclude a segment the founder wants. Possible future pivot doc if this hardens into a committed positioning constraint.
6. **Exact Appetize economics** — included minutes and per-minute overage rate (couldn't scrape; verify before any commitment).

---

## The assignment

1. Prove Tier 0 end-to-end: `flutter build web` of the member app + config-by-URL → open the branded app on a phone from a link. This is both the smallest MVP and a killer sales artifact.
2. Use that link in 2–3 real sales conversations before building any knobs; observe which 3–4 controls clients actually ask to change. Those become Tier 1.
3. Confirm the exact Appetize included-minutes / overage numbers and file them in the Future Ideas note, so the native-stack path has real numbers the day it's needed.

---

## What I noticed about how you think

- **You rejected your own idea once it stopped earning its place.** You floated the Figma-style tool, then immediately pressure-tested it ("they have to design it and make it... it becomes complicated quick") rather than defending it. Founders usually defend the idea they arrived with; you treated it as disposable the moment a better frame appeared.
- **You reasoned to the right architecture before I named it.** You worked out that token re-render fails because "the whole app is not mine, I am just rendering an already built app," and that SDUI "is essentially the Figma" problem again. Those are the two correct rejections, and you got there from the constraint, not from the vocabulary. You found the load-bearing distinction (own-the-app vs. don't) on your own.
- **You closed the loop with a clean stage-appropriate decision.** "I have to do it on React Native or Flutter for the MVP" is exactly the right call: it trades a scope constraint (stack) for an enormous simplification (free, instant, scalable preview) and defers the hard native case to when money justifies it. You consistently convert "this won't scale forever" into "here's the version that ships now," instead of stalling on the general solution.
- **You price the scaling ceiling honestly but don't let it block the floor.** You saw the Appetize queue, concluded metered won't scale, identified Enterprise as the real answer, and recognized you have to *earn your way* to it — then chose the MVP that doesn't need it. That's the same cost-structure-first reasoning you used on pricing in the 2026-05-01 session.
