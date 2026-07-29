---
name: recompose-mockup
description: Build, edit or review the JSX mock assets in RecomposeJsxMockUps — the interactive phone mocks a design agent rewrites. Use when adding or changing a screen, adding an asset or an app, wiring navigation, touching --sc-* tokens or CSS in that package, porting a screen from CombatDen's Flutter app, or reviewing a redesign an agent produced. Carries the guardrails for the failure modes typecheck, lint and the test suite cannot see.
---

# Recompose mock assets

The surface a design agent rewrites freely. `RecomposeJsxMockUps` ships
**assets**: self-contained interactive phone mocks you click through, not a
gallery of stills.

**The one thing to internalise:** every failure that has actually shipped here
was invisible to `make check`. Typecheck, eslint and 155 tests passed over a
screen rendering with no styling at all, over two dead-end screens, over an
unclickable button, and over three sets of invented CSS token names. **You must
open it and look.** Nothing below is theoretical; each rule is a bug that
happened.

---

## Before you touch anything

Read `RecomposeJsxMockUps/CLAUDE.md`. Then run it:

```
make -C RecomposeJsxMockUps dev     # :8081, no backend, no theme run needed
```

`?asset=app` / `?asset=celebration` deep-link.

---

## The structure, and the one-way rule

```
src/kit/          app-agnostic. Asset contract, route stack, registry, stage.
src/apps/<app>/   one product's screens, tokens and assets.
src/index.ts      the ONLY export surface.
dev/              the harness. A HOST — nothing in src/ may import it.
```

`src/kit/` may **not** import `src/apps/`. An app reaches the kit by calling
`defineMockAsset` / `defineMockApp`, never the reverse. eslint Gate 1 enforces
it; a test that asserts things about an app belongs under `apps/`.

The package is an **island**: it may import `recompose-react` and itself, and
nothing else. `cx` and `useElementSize` are duplicated from the studio rather
than imported. Do not add the edge — and note the island rule is why the old
content ladder's fetched tier was deleted rather than vendored: it reached into
the studio, whose module imports this package back.

---

## GUARDRAIL 1 — the token root is load-bearing

**Every screen must render under `CombatDenSurface`** (which composes the
content provider and `ShowcaseThemeVars`). It is the asset's `provider`.

Every stylesheet here reads `var(--sc-…)` and nothing else — type, spacing,
radius, colour, and every icon and image size. `ShowcaseThemeVars` writes those
~67 variables onto one element and **custom properties inherit**. With no
ancestor carrying them they do **not** fall back — they resolve to *nothing*.

What that looks like: browser-default type, every gap and padding collapsed,
and images sized only by `width: var(--sc-icon-size-md)` drawn at natural
resolution — 1024px PNGs filling the phone. It reads as catastrophic layout
breakage. The layout is fine; it has no tokens.

This shipped once, when the old registry that rendered the wrapper was deleted
and nothing replaced it.

## GUARDRAIL 2 — never invent a token name

**Grep `showcaseTokens.ts` for the exact string before using a `--sc-*` var.**
Got wrong three times running, always with plausible-sounding names.

| Wrong (invented) | Right |
|---|---|
| `--sc-h1`, `--sc-h2` | `--sc-type-h1`, `--sc-type-h2` |
| `--sc-body`, `--sc-caption` | `--sc-type-p`, `--sc-type-big2` |
| `--sc-padding-standard` | `--sc-screen-padding-x` |

Every type token has a **paired `-ls`** letter-spacing var. Always set both:

```css
font: var(--sc-type-h1);
letter-spacing: var(--sc-type-h1-ls);
```

Sweep for the whole class of error:

```bash
grep -rhoE "var\(--sc-[a-z0-9-]+\)" src/apps/<app> --include=*.css | sort -u |
  sed 's/var(\(.*\))/\1/' | while read v; do
    grep -q "'$v'" src/apps/<app>/showcaseTokens.ts || echo "MISSING: $v"
  done
```

## GUARDRAIL 3 — longhands, never shorthands, with var()

**A shorthand containing one unresolvable `var()` is invalid at computed-value
time and the browser drops the WHOLE declaration.**

```css
/* WRONG — one bad name silently kills the bottom padding too */
padding: 0 var(--sc-padding-standard) var(--sc-spacing-big);

/* RIGHT — a bad name can only cost the axis it is on */
padding-inline: var(--sc-screen-padding-x);
padding-bottom: var(--sc-spacing-big);
```

Same for `font`, `background`, `border`, `margin`.

## GUARDRAIL 4 — no screen may be a dead end

**Every screen carries a way off it, and the last screen of a flow returns to
that flow's root.** An asset is something a reviewer clicks through; one screen
with no exit ends the review there.

- `home` / `store` / `video` / `profile` — the bottom nav.
- `class` — the topbar **back** button, and only that. No bottom nav here (the
  member app has none either), so an unwired back button is a trap.
- `booking` — its **Continue**, which `nav.reset()`s to the asset root.
- celebration cards — the CTA, which appears once settled; tapping a
  still-animating card skips to settled, so a slow entrance never strands
  anyone. The last card wraps to the first.

Two traps this has sprung, both perfectly valid code:

- **A rendered affordance with no handler.** `class`'s back button and
  `booking`'s Continue were both drawn and both did nothing.
- **`pointer-events: none` outliving its reason.** `booking`'s CTA row was
  pinned unclickable because "every tap here is a no-op anyway". True until
  something navigated; a dead end the moment it did. Check with
  `document.elementFromPoint` over the button's centre — if it does not return
  the button, the click never lands.

## GUARDRAIL 5 — fire callbacks before guards

A card's settle callback must fire **before** any early return:

```ts
// WRONG — the flow renders with loop={false}, so it never settles and its
// CTA stays hidden forever
if (!loop || reduceMotion) return;

// RIGHT
if (!loop) { onCycleComplete?.(); return; }
```

This is what made the wins card unescapable except by tapping.

## GUARDRAIL 6 — one layout, one animation

**There are no layout or animation presets.** Seven format slots × ~5
arrangements were built, tested and rejected — a bounded option set reproduces
the platform's own design language, which is a reskin. Layout and animation are
changed by **editing the layout and the animation**.

If you find yourself adding a switch over a vocabulary, you are rebuilding what
was deliberately removed.

## GUARDRAIL 7 — tap targets live where the affordance is

A screen's tap handler imports its route id (`ROUTE_CLASS`) and calls
`useMockNav()` directly. Do **not** thread callbacks down through layout layers:
a callback chain through five components is exactly the prop plumbing a design
agent breaks when it rearranges a screen; an imported constant is not.

`nav.go` pushes, `nav.replace` advances a flow without leaving the old card
behind, `nav.reset` returns to the root. Tab switches reset (the Dart uses
`pushReplacementNamed`).

## GUARDRAIL 8 — no data fetching, ever

Content comes from `showcaseContent.ts` / `showcaseGroupDefaults.ts`, or is
passed in through `useShowcaseContent`'s `real*` arguments. A `fetch` here is a
bug: a screen that reaches the network can fail in ways a redesign cannot be
judged against.

---

## When porting from the Flutter app

CombatDen lives at `/var/home/jm/Documents/CombatDen/codebase/MobileApp/`.

**The live Dart is the authority — not `app.yaml`, and not the demo
constants.**

- **Never copy `mock_stats.dart`.** `mockWinsStats` / `mockStreakStats` are
  dormant demo constants no screen renders. The screens call
  `celebration_stats_builder.dart`'s `buildWinsStats` / `buildStreakStats`.
  Copying the constants shipped a "Rank Classes" tile the app had deleted and a
  streak subtitle of the wrong *kind* of string.
- **`app.yaml` slot descriptions go stale.** Its `rank_belt` text calls the rank
  card "the 2nd of five"; `celebration_flow.dart` puts it 4th. The Dart won.
- **Read the branch, not just `main`** if work is in flight, and check
  `git log` — a screen may have been rewritten since the port.
- `CRM/lib/showcase/` is a **stale** source. Several mock screens port from it
  and predate the member app going live (e.g. the topbar's switch chevron,
  which the app deleted, and the identity avatar, which the mock lacks).

---

## Verification — the part that is not optional

`make -C RecomposeJsxMockUps check` proves typecheck, lint and tests. **It
proves nothing about what renders.** A build succeeding and an HTTP 200 also
prove nothing — both were true while the screens rendered completely unstyled.

Run the harness and **look at pixels**:

```bash
make -C RecomposeJsxMockUps dev &
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B goto http://localhost:8081/ ; $B screenshot /tmp/app.png
$B console --errors
```

Then Read the PNG. Then walk it:

1. Every bottom-nav tab, confirming the nav survives each.
2. Home → open a class → **back** → home.
3. Home → class → Reserve → booking → **Continue** → home.
4. The whole celebration flow, confirming each card's CTA appears and the last
   one wraps to the first.

Re-snapshot between navigations — `browse` refs go stale after a route change,
and clicking a stale ref silently hits the wrong element.

`/design-review` on the running harness is the right tool for visual polish.

---

## Adding things

**A screen:** build it under `src/apps/<app>/`, add a `ROUTE_*` id and a route
entry in the asset, give it an exit (Guardrail 4), wire its tap targets
(Guardrail 7), and walk to it in the browser.

**An asset:** only when a screen genuinely cannot be reached by tapping.
Everything tap-reachable belongs in one asset — splitting for any other reason
rebuilds the slideshow assets replaced.

**An app:** a sibling folder under `src/apps/`, its own surface composing its
provider and token vars, and one `defineMockApp`. No change to `src/kit/` and no
change to the host. If you find yourself editing the kit to add an app, the
thing you are adding is app-specific and belongs in the app.

---

## Living document

This skill and `RecomposeJsxMockUps/CLAUDE.md` track reality. When a rule here
is outgrown on purpose, update it **in the same change**. A stale guardrail
produces false findings and misleads the next agent — which is exactly how the
deleted `showcaseScreen.tsx` made the token root look like it still existed.
