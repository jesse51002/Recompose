---
name: mockup-redesign-general
description: The app-agnostic guardrails for editing or redesigning any mock asset in RecomposeJsxMockUps. Load this before changing a screen, wiring navigation, touching --sc-* tokens or CSS, or reviewing a redesign an agent produced. Pair it with the app-specific skill (e.g. mockup-redesign-combatden) — this one covers rules that hold for every app, that one covers which screens exist. Carries the failure modes typecheck, lint and the test suite cannot see.
---

# Redesigning a mock asset — general rules

`RecomposeJsxMockUps` ships **assets**: self-contained interactive phone mocks
you click through, not a gallery of stills. This skill is the half that holds
for **any** app. For which screens exist and how each one exits, load that app's
skill too.

> **Creating a NEW design fork?** Run **`mockup-redesign-start`** first, and
> load **`impeccable`** with it. This skill is the safety rail: it tells you
> what not to break. It does not tell you what to build, and guardrails alone
> produce a reskin.

**Read the invariant below first.** It is not one rule among nine — it is the
property the product is sold on, and the guardrails exist to keep a redesign
from breaking it by accident.

**Read it as PERMISSION, not restriction.** It constrains what is *present and
reachable* and says nothing about form. A bottom tab bar is the base's answer,
not a requirement — a sheet, a pager, a scrolling header or an overlay keeps
the same destinations reachable. A schedule need not be rows. Cards are not
mandatory. Obeying a constraint that was never there costs more here than
breaking one — within Guardrail 11, which rules out patterns borrowed from
bigger screens.

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

**The test is whether it tells the member something the screen did not.** A
label naming a value already on screen (`POINTS` over the points total), or an
ordinal restating an order already visible (`01`–`04` down a list), tells them
nothing new — that is typography, and it is yours. A filter, a sort, an extra
tab, a count the screen never showed: those hand over a fact or a capability
that was not there, and they are features. When a change is genuinely on the
line, ship it and **say so in your report** rather than deciding silently.

**What you may do is unlimited within that:** move, resize, restack, regroup,
re-emphasise, restyle, retime, change hierarchy, change density, change the
motion. The *arrangement* is the free variable. The *element set* is fixed.

**Hierarchy is explicitly yours, and that includes treating items unequally.**
Making the first class on the schedule a big hero card and the rest compact
rows is a redesign doing its job, not a new feature — every class is still
there, still shows what it showed, still opens when tapped. The same goes for
featuring one reward, collapsing a section behind a heading, or giving one
screen's content twice the space it had. Prominence is a design decision and
you own it.

The two tests that keep that honest:

- **Is everything still functional?** An item you demoted must still be
  readable and still do what it did. Demoting is fine; disabling is not.
- **Is every end result still reachable?** Whatever a member could get to
  before, they can still get to, in the same number of taps or fewer. A
  rearrangement that buries a destination has removed it in practice.

**"New feature" means something BRAND NEW** — a capability the app did not
have. A filter that did not exist, a sort control, a new destination, a
new piece of data on screen. Not "this looks different from before"; different
is the entire point.

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

**The same trap, one layer over: CSS-module class names.** `styles.whatever`
for a class the stylesheet does not define is `undefined`, which React renders
as no class at all. No error, no warning, no type error — the element simply
arrives unstyled. This happened three times in one session (`styles.circleImg`,
`styles.photoImg`, and a `treatmentClass()` helper that never existed), every
time from writing the name that *seemed* right instead of opening the
stylesheet.

Before using `styles.x`, confirm `x` is in the `.module.css`. When adding
markup beside existing markup, copy the class names off the neighbour rather
than inventing parallel ones.

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

## GUARDRAIL 7 — one asset, every screen that shows it

**When you tokenise an image, find every screen that renders it.** The same
asset almost always appears more than once, and wiring one consumer leaves the
others on the old path — so the picture silently CHANGES between two screens
showing the same thing.

Real: a class photo appears on the schedule row AND on the class detail banner.
A reward appears on the store card AND in the celebration carousel. Tokenising
the thumbnail and the store card alone meant opening a class showed a different
photo than the row you tapped, and a reward changed picture between the store
and the celebration. Nothing errored; nothing was missing; the two screens just
disagreed.

Before you wire one, list them all:

```bash
grep -rn "showcaseAssetOrNetwork\|<ThemedImage\|imageAsset" src/apps/<app> --include=*.tsx
```

Then check every hit, including the ones that use a different helper — the
class banner went through `DegradingImage` rather than the shared ladder, so a
grep for the ladder alone missed it.

**An optional prop hides the miss.** Adding `themeSlot?: string | undefined` to
a component and forgetting to pass it from the caller typechecks perfectly and
silently takes the untokenised path — which is exactly how the class banner
stayed broken after it had supposedly been wired. After adding the prop, grep
the callers and confirm each one passes it:

```bash
grep -rn "<ComponentName" src/apps/<app> --include=*.tsx | grep -v themeSlot
```

**Better: make it impossible instead of grep-able.** Where a component already
receives the whole data object, take THAT and read the slot off it, rather than
adding an optional prop beside it. `VideoThumbnail` went from `src={video.thumbnailUrl}`
to `video={video}` for this reason: a required prop turns every call site into a
compile error until it is updated, which is the check the grep was standing in
for. Reach for the grep when you cannot change the signature; prefer the
signature when you can.

**Stamp the slot at the source, not at each call site.** Put it on the data
object where the list is resolved (`useShowcaseContent`), so every screen that
renders that item inherits the same slot and cannot drift. A call site that
picks its own slot is a second source of truth, and the two will disagree the
first time one of them is edited.

## GUARDRAIL 8 — no data fetching, ever

Content comes from the app's bundled demo data, or is passed in through
`useShowcaseContent`'s `real*` arguments. A `fetch` here is a bug: a screen that
reaches the network can fail in ways a redesign cannot be judged against.

**But bundled does not mean fixed.** The demo content is keyed by the run's
`category`, and the surface reads that off the loaded theme (`useThemeCategory`)
and passes it down. If you touch the provider, keep that wire: without it every
generated slot still resolves perfectly and the screen turns to nonsense — a
yoga theme rendering yoga names and yoga photographs over a boxing feed. Nothing
in `make check` sees it, and it reads as a theming bug when it is a content one.

The general form, worth carrying into any app: **a redesign moves the generated
half of the screen. Check that the half you did not generate moved with it.**

## GUARDRAIL 9 — fixed size, uniform scale

Assets are authored at one device size and scaled by `transform: scale()`, never
reflowed. `MockAssetStage` computes `min(w/W, h/H)` in JS because CSS re-derives
an axis from `aspect-ratio` only when the size it derives FROM is definite. A
reflow at another size would mean the arrangement being reviewed is not the one
that ships. A host that already scales passes `fit="none"`.

## GUARDRAIL 10 — many items, few slots: the standard mapping

**Every app hits this.** A real screen renders a list whose length the brand
does not control — a schedule, a store, a feed, a catalogue — while the
pipeline generates a FIXED, small number of slots for it. A slot per item is
not something an `app.yaml` can declare, because the manifest is written once
and the list is however long the tenant's data happens to be. So there is one
standard mapping, and it is not a per-app decision:

**1. Cycle by position.** Item `i` uses slot `i % M`. `slotAt(slots, i)` is the
helper; do not hand-roll the modulo at a call site.

**2. One index per ITEM, for every generated field it has.** The picture, the
name, and anything else generated for that item come off the *same* index.
Never one index for the art and a different rule for the copy.

This is the half that gets got wrong, because the wrong version looks more
careful. The video shelf first cycled thumbnails across all fourteen cards but
applied generated titles to the first four only — reasoning that a repeated
*title* reads as the same video listed twice, while a repeated *photograph*
reads as a brand that owns four good ones. That reasoning is true and it still
produced the worse screen: card five wore thumbnail one under a title
belonging to nothing. **A card that repeats is fine. A card that contradicts
itself is broken.** When the two goals conflict, coherence wins.

**3. Declare the sets paired, in the same order.** `SLOT_X_PHOTOS[i]` and
`SLOT_X_NAMES[i]` must describe the same thing, because the pipeline believes
they do — the image slot declares `depends_on_text` naming its own copy, so the
picture is generated *from* the name. Two lists in different orders is a
silent, total mismatch.

**4. Stamp at the source.** Where the list is resolved, not at each call site
(Guardrail 7). One index computed once per item is what makes 2 structurally
true instead of remembered.

**5. Never leave a tail un-themed, and never invent an (M+1)th slot.** A
half-themed list looks broken in a way a repeated one does not, and a slot the
manifest never declared resolves to nothing at all.

The trade is deliberate and worth stating out loud when you pick M: repetition
across a long list is the accepted cost, and M is chosen to be large enough
that a *screenful* rarely repeats. Four covers a week of schedule rows and a
genre carousel; it does not cover a fourteen-card feed without repeating, and
that was known when it was chosen.

## GUARDRAIL 10b — a photograph goes in a box of ITS OWN ratio

**This is the easiest way in this package to make a screen look terrible, and it
is invisible to every mechanical gate.** Typecheck, lint, the suite, the token
sweep and the overflow check all pass. The layout is right. The pictures are
ruined.

A photograph arrives **already composed**. A 16:9 video still has its title
burnt into the top third and its subject framed against the edges. Put it in a
box of a different ratio and `object-fit: cover` does not shrink it, it
**discards part of it** — no error, no warning, nothing on screen saying a third
of the frame is gone. Crop 16:9 to 1:1 and you lose **44% of the width**; mask
that to a circle and the corners go too, leaving about half the original,
centre-weighted. It renders as fragments of burnt-in text: `ENDARY`, `KING`,
`1-6 D` are real output from this package.

**Be deliberate here.** Resizing and cropping are legitimate and often right —
the rule is not "never crop", it is *decide the crop, do not inherit it from a
container shape you picked for another reason*.

The reliable tell is the ratio of the source art itself:

| what it is | measures | honest treatment |
| --- | --- | --- |
| generated cut-out (roundel, medallion, coin, glyph) | **0.99-1.00**, transparent-edged, centre-weighted | a circle costs it nothing |
| headshot / avatar | near square | a circle is fine |
| generated photograph (class, reward) | **1.50** | give it a 3:2 box |
| video still | **1.78** | give it a 16:9 box |

**The fix is never a different `object-fit`.** `contain` letterboxes and usually
looks worse. Give the picture a box of its own ratio and solve the layout around
that.

**A DIRECTION CAN CAUSE THIS, AND THAT IS HOW IT SHIPPED.** `apps/milemarker/`'s
brief said *"full-bleed or a disc, never an inset rectangle"* as an absolute. It
is a good rule for a design with no cards — and it silently mandated 1:1 boxes
for 1.78 source art, so every shelf thumbnail was destroyed. The component was
doing exactly what the brief said. So: **when a direction states a container
shape, condition it on what the art IS**, and fix the `layout_brief.yaml` before
the components — otherwise the next agent reads the brief and rebuilds the bug.

`mockup-qa`'s Pass 2c is the check, and it reports the exact percentage each
image is losing.

## GUARDRAIL 11 — primary nav lives at the bottom; never a side rail

**Primary navigation sits at the FOOT of the screen.** Not the top, not a
vertical / side rail — unless the origin app puts it elsewhere, in which case
it stays where the origin has it. The bottom is the reachable edge on a 390pt
phone and where every mobile OS puts it; a rail additionally spends a fifth of
the scarce axis on chrome.

**Radical is not the same as importing a pattern from a bigger screen.** Same
reason, also out: hover or right-click dependence, multi-column text,
desktop-density hit targets, any persistent sidebar.

You still choose its FORM — a bar, a segmented band, a dock, how it is ruled,
filled or labelled — and everything else (sheets, pagers, swipe, overlay menus,
gesture-first) is free. Only its position is fixed.

## GUARDRAIL 13 — spacing carries the grouping, and more is safer than less

Spacing is not polish applied at the end. It is the mechanism that tells a
reader what belongs to what, and it fails in three ways that need different
fixes — `mockup-qa` Pass 2d is the check, and this is the rule it checks.

**Related things sit closer than unrelated things.** A label and the figure it
names are ONE object; the gap between them must be smaller than the gap to the
next region. Get this backwards and the label reads as the previous region's
footer instead of the next one's heading — which is exactly what shipped here:
a "REDEEM" label sat 2px under a lane stripe and 24px above the list it named,
so it belonged to the wrong thing. **When every gap on a screen is the same
value, nothing is grouped**, and the screen reads as a list of parts even though
no single value is wrong.

**The same control gets the same spacing everywhere.** Two tab rows on two
screens drifted to 0px and 16px of inline padding because they were two
stylesheets doing one job. When two places disagree, **extract the shared
component rather than syncing the numbers** — syncing fixes today and drifts
again the next time either is touched.

**Every value comes from the scale.** `--sc-spacing-tiny/small/medium/large/big`
and `--sc-gutter`. A tail of one-off values (`3px`, `6px`, `13px`) means numbers
were typed at call sites. A healthy screen shows a short list of values with
tall usage counts.

**When in doubt, more gap.** If you cannot decide between two values, take the
larger. Cramped is a defect a reader feels instantly and reads as cheap; a
little loose is at worst a missed opportunity and usually reads as calm. Every
spacing finding in this package has been "not enough" and none has been "too
much".

**Watch the modifiers that remove padding.** A container given `flush` / `bleed`
/ `padding: 0` for one good reason — its child runs to the edge — will strand
the NEXT thing added to it. Both spacing bugs here came from exactly that: a
label placed into a lane whose padding had been deliberately removed for a
photograph.

## GUARDRAIL 14 — the most important thing must LOOK the most important

**Hierarchy is yours, but its ORDER is not.** Every app's skill carries an
EMPHASIS RANKING — one row per screen naming what leads, what follows, and what
merely supports. You choose how to express it (scale, weight, colour, position,
space, contrast); you may not reorder it.

**A screen can render every element on its inventory, correctly themed and
correctly spaced, and still be wrong**, because the inventory only asks whether
things are PRESENT. Nothing in `make check`, nothing in the token sweep and
nothing in the inventory check can see that the biggest thing on the screen is
the least important thing on it.

That shipped here. `apps/vinyasaflow/`'s schedule set the start time at 40px
above a class name at 17px — so the loudest element on a screen a member opens
to choose a class was the clock. Every gate passed.

**A NAME AND ITS PICTURE ARE ONE OBJECT AT RANK 1.** Where the pipeline
generates an image from a piece of copy — `class_photo_2` declares
`depends_on_text: [class_name_2]` — the two are one claim about one thing, and
they are sized and emphasised together. The photograph may be large; the name
has to hold its own beside it. The failure is rarely "the photo is too big" and
almost always **"the name is too small for the photo it belongs to."**

**Two habits that produce this, both of which feel like good typography:**

- **A display face makes a FIGURE look wonderful at size.** Times, counts,
  totals and costs drift upward in scale because they photograph well, while
  the name of the thing stays at body size. Be suspicious of any screen whose
  largest element is a number.
- **Reaching for the biggest rung you have** because a screen looks empty. If a
  region needs filling, it needs more space or a larger PICTURE — not a
  rank-3 element promoted to 40px.

The check: squint at the screenshot, or look at it for one second and look away.
**What did you see first?** If it is not that screen's rank 1, the hierarchy is
inverted no matter how good each individual choice was.

## GUARDRAIL 15 — group first, then DISTRIBUTE. Packing is the defect, not alignment

Two questions get conflated here, and only the second one is usually wrong:

1. **What is this row made OF?** — semantic grouping.
2. **How is it spread across the width it has?** — distribution.

### Grouping: what counts as one entity

**A thing and what belongs to IT are ONE entity** — an icon and its value, a
photograph and its name, a figure and its unit, an avatar and the name beside
it. The gap INSIDE an entity is small, because a small gap is what says "these
are one object". That is not a violation of anything below; it is the point.

**Semantically DISTINCT entities** are things a member could act on, read, or
care about independently: rank, streak, points and a QR pass are four separate
facts that happen to share a row. So are four filter chips, or a price and a
button.

### Distribution: the actual rule

**When a row holds several DISTINCT entities and has width to spare, spread them
across that width.** Equal columns, `space-between`, or a deliberately generous
uniform gap — any of those. What fails is a row of distinct things packed
against one edge behind one small gap, leaving a void at the other end that no
entity claims. It reads as unfinished, or as a layout that ran out of content.

Shipped here: `apps/vinyasaflow/`'s head put the rank belt, the streak, the
points total and the pass in a row with a single `--sc-spacing-large` between
them. Four unrelated facts bunched into the left third of the screen with the
right third empty. Every gap was "from the scale" and the row was still wrong,
because consistency is not distribution.

### LEFT ALIGNMENT IS NOT THE PROBLEM, AND IS USUALLY RIGHT

**Read this part carefully, because the rule above is easy to over-apply.**

- **Text that wraps must be left aligned.** Always. Centred paragraphs are a
  legibility defect, not a style.
- **Anything scanned is left aligned**: lists, schedules, headings, body copy,
  form labels, rows of items. A member's eye returns to one left edge; taking
  that away costs them real time.
- **A design that is entirely left aligned is a good design.** Most of the best
  mobile apps are. Do not read this guardrail as pressure toward centred
  layouts — it is about the GAPS BETWEEN distinct entities, not about which
  edge things start from. A left-aligned row can and should still be evenly
  distributed.

**Centre alignment is right for a single focal object with nothing to scan** —
a celebration hero and its one line, an empty state, a confirmation, a splash.
One thing, centred, with its caption. Never a list, never running copy.

**Right alignment is right for numerals that should line up on their digits** in
a column, and for a trailing action or value at the end of a row.

### The check

Cover the content with your hand and look only at the gaps. Are the gaps between
distinct entities roughly equal? Is there a void at one end that nothing claims?
If a row's entities occupy two thirds of the width and the last third is empty,
either distribute them or give the row a reason to stop where it stops.

## GUARDRAIL 12 — invent the look, not the interaction

**Be creative within industry standards.** A member must be able to use the app
on sight, without learning anything new. Novel interaction is a cost they pay;
novel *appearance* is the product.

Where the creativity goes: type, colour, imagery, composition, density,
hierarchy, materials, motion, ornament, voice.

Where it does not: a control must look like what it is and behave the way its
platform behaves. A button looks pressable, a tab looks selectable and switches
immediately, back is top-left or a swipe, a list scrolls vertically, a sheet
dismisses downward, tapping a row opens it. Do not invent a gesture, hide a
primary action behind a discovery, repurpose a familiar control for a different
job, or replace a standard affordance with something that has to be explained.

The test: **could someone use this screen correctly the first time, having only
ever used other phone apps?** If it needs a caption, redesign it.

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

## "Looks right" is the floor. "Is it a different app" is the bar

Everything above keeps a redesign from looking broken. It does not make it a
redesign. Recompose sells a **genuinely different app**, not a themed one, so
the question that decides whether a fork was worth building is:

> Shown a screenshot of the base and one of this fork, would someone say
> *"same app, restyled"*?

Answer it before reporting done, by running the four **anti-reskin tests** in
`mockup-redesign-start` — side-by-side, skeleton, diff, origin — and report the
result honestly.

Two habits to avoid, both of which feel like diligence:

- **Editing the base's files instead of deciding a world.** Open a
  `.module.css` first and your ceiling is set before you start. Decide the
  direction first; that is what `mockup-redesign-start` is for.
- **Describing your work as a diff.** "The gutter opens to 1.5×, the heading
  drops to an eyebrow" are adjustments to the incumbent, which means the
  incumbent is still the frame. A redesign is describable as a different idea.

## Verification — run `mockup-qa`

**You are not done until `mockup-qa` passes.** It is the full sweep: every
screen screenshotted and looked at, every affordance hit-tested, every
transition walked, and the render checked against the app's inventory in both
directions. It owns the procedure — do not improvise a shorter version of it
here.

`make -C RecomposeJsxMockUps check` is not that check. It proves typecheck, lint
and tests, and **nothing about what renders** — every failure listed in the
guardrails above passed it.

`/design-review` on the running harness handles visual polish. Different
question; neither substitutes for the other.

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
