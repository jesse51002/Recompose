---
name: mockup-redesign-general
description: The app-agnostic guardrails for editing or redesigning any mock asset in RecomposeJsxMockUps. Load this before changing a screen, wiring navigation, touching --sc-* tokens or CSS, or reviewing a redesign an agent produced. Pair it with the app-specific skill (e.g. mockup-redesign-combatden) — this one covers rules that hold for every app, that one covers which screens exist. Carries the failure modes typecheck, lint and the test suite cannot see.
---

# Redesigning a mock asset — general rules

`RecomposeJsxMockUps` ships **assets**: self-contained interactive phone mocks
you click through, not a gallery of stills. This skill is the half that holds
for **any** app. For which screens exist and how each one exits, load that app's
skill too.

**Read the invariant below first.** It is not one rule among nine — it is the
property the product is sold on, and the guardrails exist to keep a redesign
from breaking it by accident.

**The one thing to internalise:** every failure that has actually shipped here
was invisible to `make check`. Typecheck, eslint and a full green suite passed
over a screen rendering with no styling at all, over two dead-end screens, over
an unclickable button, and over three sets of invented CSS token names. **You
must open it and look.** Nothing below is theoretical; each rule is a bug that
happened.

Run it before you start:

```
make -C RecomposeJsxMockUps dev     # :8081, no backend, no theme run needed
```

---

## THE INVARIANT — arrangement only, in both directions

**A redesign may move anything and may change nothing.** Every element that was
on a screen is still on it; no element that was not is now. This outranks every
guardrail below, and it is the one rule that is not a matter of judgement.

**Never remove.** Not a screen, not a control, not a state, not a field, not a
label. If a redesign has no good place for something, that is a hard layout
problem to solve, not permission to drop it. An element quietly missing after a
redesign is indistinguishable from a bug in the platform's own app.

**Never add — this is the half that gets broken.** Removing feels like
vandalism, so nobody does it by accident. *Adding* feels like doing the job
well: a filter that would obviously help, a sort control, an empty-state action,
a second tab, one more button. Every one of those is a new feature, and shipping
it means the redesigned app is no longer the app the platform wrote.

Also never reach for **new data**. Rendering a field the original screen did not
show is adding a feature even when the value happens to be available in the mock
data — the real screen would need a request that does not exist.

**What you may do is unlimited within that:** move, resize, restack, regroup,
re-emphasise, restyle, retime, change hierarchy, change density, change the
motion. The *arrangement* is the free variable. The *element set* is fixed.

**Why it is absolute.** The whole product is sellable because functional
equivalence is checkable rather than argued: a tenant's redesigned app is
provably the same app, with the same screens and the same API surface, wearing a
different design. One added button makes that claim false everywhere.

**Your checklist is the app's inventory** in its own skill — the list of every
screen and everything it must contain. A redesign is correct when the render
matches that list exactly: nothing missing, nothing extra. If a change you want
to make would alter the inventory, the inventory is not the thing that should
change.

## The structure, and the one-way rule

```
src/kit/          app-agnostic. Asset contract, route stack, registry, stage.
src/apps/<app>/   one product's screens, tokens and assets.
src/index.ts      the ONLY export surface.
dev/              the harness. A HOST — nothing in src/ may import it.
```

`src/kit/` may **not** import `src/apps/`. An app reaches the kit by calling
`defineMockAsset` / `defineMockApp`, never the reverse. eslint Gate 1 enforces
it; a test asserting things about an app belongs under `apps/`.

The package is an **island**: it may import `recompose-react` and itself, and
nothing else. `cx` and `useElementSize` are duplicated from the studio rather
than imported. Do not add the edge.

**One layout and one animation per asset — there are no presets.** Format slots
× arrangements were built, tested and rejected: a bounded option set reproduces
the platform's own design language, which is a reskin. Layout and animation are
changed by editing the layout and the animation, which is what this whole
package is for.

This is context, not a trap — nothing breaks if you add a switch over a
vocabulary. You would just be rebuilding something that was deliberately
removed, and spending the effort twice.

---

## GUARDRAIL 1 — every screen needs a token root

**An app's screens must render under that app's surface component** (which
composes its content provider and its `ShowcaseThemeVars`). It is the asset's
`provider`.

Every stylesheet reads `var(--sc-…)` and nothing else — type, spacing, radius,
colour, and every icon and image size. The surface writes those ~67 variables
onto one element and **custom properties inherit**. With no ancestor carrying
them they do **not** fall back — they resolve to *nothing*.

What that looks like: browser-default type, every gap and padding collapsed, and
images sized only by `width: var(--sc-icon-size-md)` drawn at natural resolution
— 1024px PNGs filling the phone. It reads as catastrophic layout breakage. The
layout is fine; it has no tokens.

This shipped once, when the registry that rendered the wrapper was deleted and
nothing replaced it.

## GUARDRAIL 2 — never invent a token name

**Grep the app's `showcaseTokens.ts` for the exact string before using a
`--sc-*` var.** Got wrong three times running, always with plausible names —
`--sc-h1`, `--sc-body`, `--sc-caption`, `--sc-padding-standard`. None exist.

Type tokens are `--sc-type-*` and each has a **paired `-ls`** letter-spacing
var. Always set both:

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

Two traps this has sprung, both perfectly valid code:

- **A rendered affordance with no handler.** Two separate buttons were drawn and
  did nothing.
- **`pointer-events: none` outliving its reason.** A CTA row was pinned
  unclickable because "every tap here is a no-op anyway". True until something
  navigated; a dead end the moment it did. Check with
  `document.elementFromPoint` over the button's centre — if it does not return
  the button, the click never lands.

## GUARDRAIL 5 — fire callbacks before guards

A card's settle callback must fire **before** any early return:

```ts
// WRONG — a flow renders with loop={false}, so it never settles and its CTA
// stays hidden forever
if (!loop || reduceMotion) return;

// RIGHT
if (!loop) { onCycleComplete?.(); return; }
```

## GUARDRAIL 6 — tap targets live where the affordance is

A screen's tap handler imports its route id and calls `useMockNav()` directly.
Do **not** thread callbacks down through layout layers: a callback chain through
five components is exactly the prop plumbing a design agent breaks when it
rearranges a screen; an imported constant is not.

`nav.go` pushes, `nav.replace` advances a flow without leaving the old card
behind, `nav.reset` returns to the root. Tab switches reset.

## GUARDRAIL 7 — no data fetching, ever

Content comes from the app's bundled demo data, or is passed in through
`useShowcaseContent`'s `real*` arguments. A `fetch` here is a bug: a screen that
reaches the network can fail in ways a redesign cannot be judged against.

## GUARDRAIL 8 — fixed size, uniform scale

Assets are authored at one device size and scaled by `transform: scale()`, never
reflowed. `MockAssetStage` computes `min(w/W, h/H)` in JS because CSS re-derives
an axis from `aspect-ratio` only when the size it derives FROM is definite. A
reflow at another size would mean the arrangement being reviewed is not the one
that ships. A host that already scales passes `fit="none"`.

---

## The bar is "does it look right" — and you have to actually check

You have **full freedom over arrangement**. That freedom is the product, so
almost nothing here is a prohibition — resizing, re-proportioning, cropping and
rescaling are all fair game when the result looks right.

The one thing that is not optional is **looking at it and judging honestly**.
The failures that get through are not illegal moves; they are moves that were
reasonable in the abstract and wrong on the screen. Two real ones, offered as
things to notice rather than rules to obey:

- A thumbnail re-proportioned to fit a taller card. The source art has a fixed
  shape, so the card gained its height by squashing the picture — the layout was
  fine, the image was wrong. There was a way to get the same card shape without
  touching the artwork.
- A hero uniformly scaled down to fit a tighter slot. Type and decoration do not
  shrink at the same rate to the eye, so the result read as a *squashed copy*
  rather than a smaller one.

Both look correct in code and only fail as pixels. So the question to ask of any
resize is not "am I allowed to" but **"having looked at it, is this better?"** —
and if an element only fits because it was shrunk to, consider whether the
arrangement wanted more room rather than a smaller element.

Screenshot it and decide. If you are unsure whether something reads correctly,
that uncertainty is the finding — say so rather than shipping it quietly.

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

Then Read the PNG. Then walk every route in the asset, confirming each one exits
and the last screen of any flow returns to its root.

**Re-snapshot between navigations** — `browse` refs go stale after a route
change, and clicking a stale ref silently hits the wrong element and looks like
a broken handler.

**`mockup-qa` is the full sweep** — every screen, every transition, every
affordance, checked against the app's inventory. Run it after a redesign, not a
spot-check. `/design-review` on the running harness handles visual polish; the
two answer different questions.

---

## Adding things

**A screen:** build it under `src/apps/<app>/`, add a `ROUTE_*` id and a route
entry in the asset, give it an exit (Guardrail 4), wire its tap targets
(Guardrail 6), and walk to it in the browser.

**An asset:** only when a screen genuinely cannot be reached by tapping.
Everything tap-reachable belongs in one asset — splitting for any other reason
rebuilds the slideshow assets replaced.

**An app:** see `production-to-mockup`.

---

## Living document

This skill, the app skill and `RecomposeJsxMockUps/CLAUDE.md` track reality.
When a rule is outgrown on purpose, update it **in the same change**. A stale
guardrail produces false findings and misleads the next agent — which is exactly
how a deleted registry file made the token root look like it still existed.
