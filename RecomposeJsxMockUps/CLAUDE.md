# RecomposeJsxMockUps — the mock screens

Feature-free JSX mock screens. **No business logic, no API calls, no state.**
They exist to be looked at and edited: the design agent rewrites them, and
`../RecomposeStudio` previews them in a phone frame.

See `../CLAUDE.md` for the monorepo map.

## The skills live here, with the code

`.claude/skills/` in **this** package, not the repo root, because they are only
ever true of this subsystem:

| skill | when |
| --- | --- |
| `mockup-redesign-start` | **first**, for any NEW design fork — commit to a direction before writing code |
| `production-to-mockup` | porting a real app into a new mock |
| `mockup-redesign-general` | editing any mock — the app-agnostic guardrails |
| `mockup-redesign-combatden` | editing CombatDen's — its inventory and gotchas |
| `mockup-qa` | the exhaustive live sweep, after any change |
| `failure_modes_list` | what has ACTUALLY gone wrong here — read before a build, append after one |

Load the general one plus the app's own whenever you touch a screen. They carry
the failure modes `make check` cannot see.

`failure_modes_list` is the odd one out: it is an **evidence log, not a rule
set**. It records what has really gone wrong building screens here, with a
count of how many independent agents hit each thing, and tracks which entries
have been promoted into a real guardrail. Read it before a build; append to it
after one.

**Creating a new design fork starts with `mockup-redesign-start`**, paired with
the `impeccable` skill — the direction is decided and written to
`layout_brief.yaml` before any file is opened. Guardrails alone produce a
reskin, and a fork that reads as the base is the product failing to be the
product.

## The island rule — the one that matters

This package may import from **`recompose-react`** and **from itself**. From
nothing else.

It may not reach into `../RecomposeStudio` for a widget, a token, or a helper.
That is why `src/apps/combatden/cx.ts` and `src/kit/useElementSize.ts` are
byte-identical local copies of the studio's own — the duplication is deliberate,
and the `cx` one predates the package split.

**The reason is the product.** These screens are the surface an agent rewrites
freely under the arrangement-only invariant. Every dependency they carry is
something that can break when an agent rearranges a screen, and a broken import
inside a generated redesign is indistinguishable from a bad design. Keeping the
island sealed is what makes free agentic editing safe here.

If you want to share something with the studio: duplicate it, or push it down
into `recompose-react`. **Do not add the edge.**

## Structure — two halves

```
src/
  kit/                 app-agnostic. Knows nothing about any product.
    asset.ts             MockAsset + defineMockAsset
    MockNav.tsx          the in-memory route stack
    MockAssetStage.tsx   renders an asset at authored size, scales it to fit
    registry.ts          MockApp + defineMockApp + lookup
    useElementSize.ts    duplicated from the studio (see the island rule)
  apps/
    combatden/         one product: its screens, its tokens, its two assets
      layout_brief.yaml  the brief this layout came from — REQUIRED
    romanahouse/       a second redesign, for the ReformerClassical run
      layout_brief.yaml
      shell/             its OWN chrome: sheet, head, index, action band, plate
    milemarker/        a third redesign, for the RunClub run
      layout_brief.yaml
      shell/             its OWN chrome: screen, sky, lane, last lane, band, disc
    vinyasaflow/       a fourth redesign, for the VinyasaFlow run
      layout_brief.yaml
      shell/             its OWN chrome: screen, head, thread, nav, photo,
                         figure, action — plus breath.ts, its motion clock
    secondposition/    a fifth redesign, for the AdultBallet run
      layout_brief.yaml
      shell/             its OWN chrome: screen, masthead, foot nav, PANEL,
                         insignia, action band, section — plus phrase.ts, its
                         motion clock
    index.ts           MOCK_APPS: every app, for a host that names none
  index.ts             the ONLY export surface
```

### Every app ships a `layout_brief.yaml`, and two tests enforce it

A design is **two artifacts produced separately, each written from its own
brief**:

| half | what it is | its brief | its contract |
| --- | --- | --- | --- |
| assets | palette, type, imagery, copy | `apps/<app>/<run>/customization.yaml` | `schema/customization.py` |
| layout | the screens | `src/apps/<id>/layout_brief.yaml` | `ThemeTree/studio/schema/layout_brief.py` |

The two are the same SHAPE on purpose — a `name` plus one direction per thing
being directed — because they are the same kind of document about opposite
halves of one design. The asset brief directs `design_direction` and
`colors_direction`; the layout brief directs `layout_direction` and
`motion_direction`.

**Layout and motion are separate because they fail differently.** An
arrangement can be right while its animation is wrong, and a motion note buried
in a paragraph about spacing is a note nobody acts on. It also matches this
package's own rule that there is exactly one layout and one animation per asset
— no presets and no vocabulary to switch between, so each gets a *direction*
rather than an option set.

**No inventory, ever.** `extra="forbid"` is what keeps this a brief: the code
already declares routes, sizes and assets, so a copy in YAML could only drift.
The code says what a layout CONTAINS; the brief says what it IS, and why.

Two tests, and they are not redundant:

- **`test_every_layout_brief_validates`** (engine suite) is the real one — it
  parses and validates, and `extra="forbid"` rejects a typo'd key rather than
  ignoring it. It lives on the Python side because that is where a YAML parser
  and the schema already are.
- **`src/apps/__tests__/layoutBrief.test.ts`**, here, asks the one question the
  engine cannot: the engine globs `src/apps/*/layout_brief.yaml`, so an app
  registered in `MOCK_APPS` with **no** brief is invisible to it — nothing to
  glob, nothing to fail. Only the TypeScript knows what is registered. Over
  there: "every file that exists is valid." Here: "every app that exists has a
  file." That gate has already caught a real gap.

**A second app is a sibling folder under `apps/` plus one `defineMockApp`.**
Not a change to the kit, and not a change to the host. That is the whole reason
the split exists, and **eslint Gate 1 enforces the direction**: `src/kit/` may
not import `src/apps/`. An app reaches the kit by calling `defineMockAsset` /
`defineMockApp`, never the other way round.

`src/index.ts` is the only export surface. The studio imports the package, never
a file inside it. If the studio needs something new, export it there.

### A redesign is a sibling folder, not an edit

The base layout above is what the pipeline generates against and what every
redesign forks from. **A redesign never edits it.** It is copied to a sibling
folder under `apps/` with its own id, redesigned there, and registered in
`apps/index.ts` — which is the same shape as the engine's own two fork layers
(a shared tokenised base, then one design fork per design).

That is why `MOCK_APPS` exists and why the harness switches apps: the point of
having more than one folder is to put the base and a redesign side by side and
flip between them.

A redesign folder carries its own `layout_brief.yaml` naming the design it was
made for. The base's names the base — it belongs to no run, and it is what
every fork starts from.

**There are four forks, and they are worked examples of different things.**

**A FOURTH FORK, `apps/zenbjj/`, WAS DELETED** — worth knowing because its
lesson is still live. It was the first one built: same assets, same screens,
same element set, rearranged for a direction of "calm on the surface, deep power
underneath". It passed every mechanical gate and still read as the base with the
spacing tuned, because it adjusted gutters, weights and radii rather than
committing to a different world. That is the failure mode `mockup-redesign-start`
exists to prevent, and it is why guardrails alone are not enough to produce a
redesign. It was removed once three better-worked examples existed; keeping a
fork whose only value was as a warning is a fork every later agent has to read
before learning it should not be copied.

A fork renames its own surface component (`RomanaHouseSurface`,
`MileMarkerSurface`, `VinyasaFlowSurface`, `SecondPositionSurface`, where the
base has `CombatDenSurface`) and nothing else: a fork's token root is still its
own `provider`, and the file name is the only part of it that belongs to the
design.

**`apps/romanahouse/`** is the second, built for the theme produced at
`apps/combatden/ReformerClassical/`, and it shows how far a fork MAY go under
the same invariant. Its direction (read `layout_brief.yaml`) is the studio's
apparatus chart: a ruled head carrying a letterhead, a spec panel and the four
destinations as a segmented index replaces the bottom tab bar, an ivory sheet
below it is structured by scribed rules instead of cards, the
grotesque is the display face carrying tabular figures and 9px tracked labels
while the serif is prose only, and every photograph is a mounted plate captioned
outside its frame. Same eleven screens, same element set, same routes. Three
things it establishes that a later fork should know:

- **A fork owns its own `shell/`.** It replaces the base's `support/Showcase*`
  chrome outright — `RomanaIndex` for the bottom nav, `Sheet` for the scaffold,
  `SheetHead` for the topbar, `ActionBand` for the primary button, `Plate` for
  every photograph — rather than restyling the base's. Its own folder, so
  nothing shared moved.
- **It was built once with a vertical nav rail and that was wrong.** Guardrail
  11 now bans it by name: at ~390pt width is the scarce axis, and a rail spends
  a fifth of it on chrome along an edge the thumb cannot reach. The replacement
  is a segmented header index, which costs one row of the axis there is more of.
  If a direction seems to need a pattern from a bigger screen, it needs a
  different pattern.
- **A fork MAY replace its bundled fallbacks**, and this one does where a
  palette-agnostic direction would not need to. Its `showcaseTokens.ts` fallback colours, its two font families and
  its bundled cut-out art are the produced run's, not CombatDen's. The reason is
  in the file: the direction is committed to a light canvas, and the harness
  opens UNTHEMED — against CombatDen's near-black canvas the whole arrangement
  is invisible. A fork whose direction is palette-agnostic should still inherit.
  A fork that replaces them must also update its own `showcaseTokens.test.ts`,
  which pins them.
- **`--sc-*` may be EXTENDED by a fork, in its own `showcaseTokens.ts`.**
  Romana House adds rule weights, a plate veil and two type
  registers the ported ramp has no rung for. Guardrail 2's sweep still holds
  because every `var(--sc-…)` any of its stylesheets reads is a string in that
  one file. **Do not add a numeric `line-height` to anything containing a
  `CountUpText`** — a line box shorter than the font's own makes adjacent digit
  cells overlap through the reel's clip, which is a bug this fork shipped once.

**`apps/milemarker/`** is the third, built for the theme produced at
`apps/combatden/RunClub/` (Mile Marker Run Club). Its direction (read
`layout_brief.yaml`) is the road seen from the start line: every screen is split
by a HORIZON, with a fixed field of daylight above it carrying the one live fact
of that screen knocked out at 60px, a lane-striped ground below it that is the
only thing that scrolls, and the four destinations as the ground's own last lane
at the foot. What it adds to what the other two already establish:

- **Guardrail 11 now fixes nav at the FOOT, and this fork was built to it.** The
  first direction put the four destinations on the horizon line mid-screen; that
  is not a side rail, but it is not the foot either. The replacement is the
  ground's last band, opened by a lane stripe like every other lane, with the
  coral finish tape stretched across the cell the member is standing in.
- **Contrast is a design input, not a review finding.** Two decisions were forced
  by it and both are recorded in the brief: the finish tape could not be the
  navigation FILL (its ink lands at 4.35:1 and fails AA under 18.66px bold), so
  coral is the marker and track blue is the action band; and a white lane stripe
  is ~1.25:1 on the pale canvas, so the fork carries TWO stripe colours — blue on
  the ground, knockout white only over a colour field or a photograph.
- **It replaces its bundled ART as well as its fallback colours**, which
  `romanahouse` does not. The filenames stay the base's — they are the keys every
  ported call site uses — while the bytes are the run's `final_images/`. The
  harness opens UNTHEMED, so those files are what a reviewer actually judges: left
  as the base's, a run club renders a fight-club shield in its sky.
- **Photographs are full-bleed or a disc, never an inset rectangle.** A schedule
  forty rows long cannot give every thumbnail a stretch of route, and the
  alternative to a disc is the small rounded rectangle that IS the card this
  design does not have. A coin is the form this brand already mints.

Its celebration asset is REFRAMED rather than rebuilt: the flow's action is the
fork's full-width band and every card wears the fork's palette, faces and art,
but the five card interiors still carry the base's composition. That is the
honest state of it and the next thing to do there.

It also **deletes the base chrome it replaced** rather than leaving it in place:
a fork carrying two navigations and two scaffolds, one of them unreachable, is a
fork the next agent has to reverse-engineer. If a fork replaces a component,
delete the original from *its own folder* — never from `apps/combatden/`.

One deliberate BEHAVIOURAL divergence from the base, and the only one: under
`prefers-reduced-motion: reduce`, `StatsShowcase` and `PointsShowcase` now fire
`onCycleComplete` before returning. The base returns first, so those two cards
never settle and their action stays hidden until the card is tapped — Guardrail
5's exact shape, confirmed in the browser on both. **The same fix belongs in
`apps/combatden/` and has not been made there**, because this change was scoped
to the fork.

**`apps/vinyasaflow/`** is the fourth, built for the theme produced at
`apps/combatden/VinyasaFlow/`. Its direction (read `layout_brief.yaml`) is one
unbroken thread: a single terracotta line enters at the brand mark, runs the
whole screen without a break, and every fact the app holds hangs on it. Its
`shell/` replaces the base chrome outright, as `romanahouse` and `milemarker`
do. What it establishes that the other three do not is **how a fork holds one
motion together across eleven screens**, and that is worth reading before
touching any of it:

- **A fork owns a MOTION CLOCK, and one file is it.** `shell/breath.ts` holds
  the single easing curve and every duration; `VinyasaFlowSurface` writes them
  onto the asset root as `--vf-*` beside the `--sc-*` token surface, so a
  stylesheet reads the same clock a driver samples. It is separate from
  `showcaseTokens.ts` on purpose: that file is the ported token surface, and
  keeping motion out of it keeps Guardrail 2's `--sc-*` sweep honest. Both have
  a sweep of their own — grep for `var(--vf-…)` against `breath.ts`.
  **Why it exists:** the eleven screens were built in parallel and arrived with
  three different "breath" curves, four ideas of how long a line takes to
  travel, and a count-up on `easeOutExpo`. Each was defensible alone; together
  they read as eleven designers. **Motion is judged across an asset, so it is
  one pass and one file, not eleven.**
- **A screen entrance can be ONE element.** `shell/Screen.tsx`'s `.veil` is a
  sheet of canvas covering everything below the brand mark whose top edge
  descends over one breath. The rail sits under it, so the line draws itself by
  the same edge that uncovers each region: the stagger is a consequence of one
  stroke passing each node, with no per-element delay curve to keep in sync.
  It is a VEIL and not a `clip-path` because a clip removes what it hides from
  HIT TESTING — every tap target has to be live from the first frame, and that
  rule outranks the motion. `booking` opts out with `draws={false}`, because its
  loop closing already IS the line arriving.
- **A celebration card settles when its LOOP CLOSES, never when its hold
  expires.** All five shipped conflating the two, so the flow's action appeared
  at 0.76s / 4.3s / 8.9s / 2.6s / 3.2s across five cards that look alike. The
  hold is a REPLAY concern, armed only when a card runs standalone
  (`loop={true}`). This is Guardrail 5's cousin and just as invisible to
  `make check`: nothing errors, the action simply is not there yet.
- **A tap must finish the card, not just reveal its action.**
  `shell/useTapToSettle.ts` — the scaffold's tap already calls `markDone`, but
  the callback runs the wrong way for the card to hear it, so the line kept
  drawing under a card that had announced itself settled. Each card listens for
  the same `pointerdown` and adds a `.finished` class whose whole body is
  `animation-delay: -30s !important` on itself and its subtree: every CSS
  animation runs past its end and holds its own final frame, so no file has to
  restate what "settled" looks like. Per-frame drivers (the point sphere, the
  rewards bloom) have no keyframe to fast-forward and are handed over by their
  component's own branch instead.

**`apps/secondposition/`** is the fifth, built for the theme produced at
`apps/combatden/AdultBallet/` (Second Position Ballet). Its direction (read
`layout_brief.yaml`) is a company's season, BILLED: every class, reward and film
is one full-bleed panel that is half photograph and half satin-blush field, with
the name set in the display serif and knocked out on the satin, and the day's
first class / featured reward / hero film billed larger with the field carried
underneath as a plinth instead of beside it. Its `shell/` replaces the base
chrome outright, as the other three do, and `shell/phrase.ts` is its motion
clock in the shape `vinyasaflow` established. What it adds that none of the
other four do:

- **CONTRAST WAS THE DESIGN INPUT, AND IT OVERTURNED THREE CHOICES BEFORE ANY
  COMPONENT EXISTED.** `milemarker` established that contrast is an input rather
  than a review finding; this fork is what that looks like when the palette
  fights back hard. Measured on the run's own colours: the antique brass is
  **3.25:1** on the cream ground, so brass is a LINE and a MARK in this app and
  never spells a word; it is **1.33:1** on the satin, so brass and satin never
  meet at all; and the warm charcoal is **2.70:1** on the satin, so everything
  set on a satin field is the light cream (`--sc-on-satin`, 5.47:1). The third
  one is the interesting one, because it killed the obvious foot-nav design:
  **no opacity holds an inactive nav label above AA on satin** — 85% lands at
  4.46:1 and every value below is worse — so all four destinations are set at
  full strength and the active one is marked by a CREAM rule, its label weight,
  and its ICON's opacity, which is the one element there allowed to be held back
  because an icon answers to 3:1 rather than 4.5:1. Each of these is written
  into `layout_brief.yaml` as a law, not left as a comment.
- **A fork may change `DEFAULT_SHOWCASE_GROUP`, and this one is the first to.**
  The base ships `'Fighting'`, which is right for CombatDen and wrong for every
  redesign built against a different run. The harness opens UNTHEMED, so
  `useThemeCategory()` returns nothing and that constant is what actually
  decides the half of the screen the pipeline does not generate — leaving it
  meant a ballet studio rendering "MMA Fundamentals" down its schedule and a
  boxing feed on its video tab, under satin-and-brass insignia. It is `'Dance'`
  here, which is the `category` the run itself carries, so the untheme'd default
  now agrees with what a loaded theme would pick anyway. **The same gap is still
  live in `romanahouse`, `milemarker` and `vinyasaflow`** — a Pilates studio, a
  run club and a yoga studio each previewing a boxing feed.
- **The ratio rule is stated as a CONDITIONAL, because Guardrail 10b says a
  direction can cause the bug.** `milemarker`'s brief mandated a container shape
  outright ("full-bleed or a disc") and thereby forced 1:1 boxes onto 1.78 art,
  destroying every shelf thumbnail. This brief instead says a photograph gets a
  box of ITS OWN proportion and a cut-out is CONTAINED — two rules, conditioned
  on what the art is, and it names the numbers: the cut-outs here are NOT all
  square (the satin chevrons are 0.60, the coin scatter 0.84), so a treatment
  that cropped them to a square would behead one and clip the other.
- **The type system is one sentence and the ramp enforces it.** The display
  serif NAMES things and the sans carries every figure, label and line of prose.
  `showcaseTokens.test.ts` asserts it two ways — which family each rung
  resolves, and that every `-name-*` rung is larger than every metadata rung, so
  the ramp itself now forbids the `vinyasaflow` failure where a start time at
  40px sat above a class name at 17px.

**The run it was built against is only half-filled, and that shaped the design.**
Only the ten cut-out objects and five copy strings were generated for this
brand. The four class photographs, all four reward photographs, the four video
stills and the class / reward / video NAMES are verbatim `Dance` prefill
placeholders (`apps/combatden/prefill/Dance/`, which labels itself
"PLACEHOLDERS, not brand copy") — including a class called "High Energy Cardio",
which the brand brief explicitly rules out, and video art with
"EASY KIDS CHOREOGRAPHY" burnt into it. So the design is OBJECT-led rather than
photography-led: the medallions, coins and still lifes are the on-brand material
and they carry the screens, while photographs are contained inside panels at
their own ratio. That is the honest response to the assets that exist, but the
run wants a `regen` pass on those slots before this fork is shown to anyone.

## Assets, not screens

The package ships **assets**: self-contained, interactive mocks you click
through. Not a gallery of stills behind a picker.

| app | asset | what | routes |
| --- | --- | --- | --- |
| combatden | `app` | the member app | home, class, booking, store, video, profile |
| combatden | `celebration` | the post-class flow | streak, rank, points, rewards, wins |
| romanahouse | `app` | the same member app, redesigned | the same six |
| romanahouse | `celebration` | the same post-class flow, redesigned | the same five |
| milemarker | `app` | the same member app, redesigned again | the same six |
| milemarker | `celebration` | the same post-class flow, reframed | the same five |
| vinyasaflow | `app` | the same member app, redesigned a third time | the same six |
| vinyasaflow | `celebration` | the same post-class flow, redesigned again | the same five |
| secondposition | `app` | the same member app, redesigned a fourth time | the same six |
| secondposition | `celebration` | the same post-class flow, redesigned again | the same five |

A redesign's rows are the base's rows, and that is the point: **the asset and
route sets are the thing a fork may not change.** If a fork ever needs a row of
its own here, it has stopped being a redesign.

**An asset holds everything reachable by tapping.** The bottom nav switches
tabs, a schedule row opens a class, its reserve action books it — all one asset.

**A second asset needs a screen that genuinely cannot be reached that way.**
The post-class celebration plays after a member attends a class and no button in
the app leads to it. That is the only justification, and it is the whole
justification. Splitting for any other reason rebuilds the slideshow this
replaced.

Tap targets live **where the affordance is** — `home/classItem/
ClassItemTextLeft.tsx` opens a class, `classdetail/sections/
ClassReserveFooter.tsx` books it, `support/ShowcaseBottomNav.tsx` switches tab —
importing a route id rather than receiving a callback. A callback chain through
five layers of layout is exactly the prop plumbing a design agent breaks when it
rearranges a screen; an imported constant is not.

### Fixed size, uniform scale

Both assets are authored at **390x844** and scaled by `transform: scale()`,
never reflowed. `MockAssetStage` computes `min(w/W, h/H)` — `BoxFit.contain`
exactly — because CSS re-derives an axis from `aspect-ratio` only when the size
it derives FROM is definite, so `aspect-ratio` + `max-height` clips instead of
shrinking. Reflowing at a different size would mean the arrangement being
reviewed is not the arrangement that ships.

`fit="none"` turns scaling off for a host that already scales — the studio's
phone frame scales its whole body, and scaling twice compounds.

### The celebration's interaction

Ports `PostClassScaffold` + `PostClassController` (`MobileApp/lib/shared/
widgets/post_class/`): while a card's intro plays the CTA is hidden and a tap
means *skip*; once the body settles the CTA appears. Continue advances, the last
card says **Done** — `celebrationCtaLabel`'s own rule. Cards already exposed
`loop` / `onCycleComplete`, so nothing inside one had to change to join the flow.

The order is the member app's: **streak, rank, points, rewards, wins**, which
`apps/combatden/app.yaml` records in `rank_belt`'s description ("the 2nd of five
post-class cards") and `trophy_image`'s ("the 5th and final card"). The flow's
GATES are deliberately not ported — the app hides the rewards card when a gym
runs no rewards, but a preview has no gym and hiding a card the reviewer is
meant to judge is worse than showing it.

## One layout and one animation per asset

There are **no layout or animation presets**. There used to be seven format
slots x ~5 arrangements, resolved from the pipeline's `format_set`. That idea
was tested and rejected — a bounded option set reproduces the platform's own
design language, which is a reskin — so the machinery went, along with
`formats.ts`, the `layouts/` variants, and the seven invariant tests that proved
arrangements rendered alike.

**Layout and animation are now changed by editing the layout and the animation.**
That is the point of the mock screens. If you find yourself adding a switch over
a vocabulary, you are rebuilding what was deliberately removed.

## Looking at it: `npm run dev`

`make dev` (or `npm run dev`) serves the harness in `dev/` on **:8081** — an app
switcher, an asset switcher, a phone-shaped box, and nothing else.
`?app=<id>&asset=celebration` deep-links, so a reload lands back where you were
instead of making you click through the flow again.

**It names no app.** The switcher lists whatever `src/apps/index.ts` exports, so
a third app changes no file under `dev/`. The frame takes its aspect ratio from
the *asset*, not a pinned 390/844 — two apps at two device sizes is the point,
and a hardcoded frame would letterbox one of them and read as the stage getting
the scale wrong.

**It opens UNTHEMED.** No `initializeTheme`, no API: every token falls back to
its app's own bundled values. That is the honest default for what the harness is
for — judging layout and interaction. The **Load themes** button is opt-in: it
boots the runtime against `make api` on :8001 and gives you the catalogue; with
the API down it says so and everything else keeps working.

`dev/` sits **outside `src/`** on purpose. It is a HOST, and hosts are what the
island rule keeps out of the screens: nothing under `src/` may import it and it
is exported from nowhere. It is typechecked and linted (it is in `tsconfig.json`
`include`), because a harness that silently breaks is worse than none.

Port 8081, not 8080 — the studio pins 8080 with `strictPort`, and running both
at once is the normal case when checking the harness against the real host.

## No screen may be a dead end

**Every screen must carry a way off it, and the last screen of a flow returns to
that flow's root.** This is a correctness property, not a nicety: an asset is
something a reviewer clicks through, and one screen with no exit ends the
review there.

Where the exit lives, per screen:

- `home` / `store` / `video` / `profile` — the bottom nav. Four tabs, always
  present, always reset to that tab's root.
- `class` — the topbar's **back** button, and only that. This screen carries no
  bottom nav (the member app's does not either), so an unwired back button here
  is not a cosmetic gap, it is a trap.
- `booking` — its **Continue**, which `nav.reset()`s to the asset root rather
  than back through the class detail the member just finished with.
- every celebration card — its CTA, which appears once the card settles; a tap
  anywhere on a still-animating card skips straight to settled, so a slow
  entrance can never strand anyone. The last card wraps to the first.

Two traps this has already sprung, both of which typecheck and lint cleanly:

- **A rendered affordance with no handler.** `class`'s back button and
  `booking`'s Continue were both drawn and both did nothing.
- **`pointer-events: none` outliving its reason.** `booking`'s CTA row was
  pinned unclickable on the argument that every tap was a no-op anyway. True
  when nothing navigated; a dead end the moment something did.

When adding a screen, walk to it in `make dev` and walk back out. Nothing in
`make check` can see this.

## Rules

- **No data fetching, ever.** Content comes from `showcaseContent.ts` /
  `showcaseGroupDefaults.ts`, or is passed in through `useShowcaseContent`'s
  `real*` arguments. A `fetch` in this package is a bug — and was one: the old
  ladder's middle tier imported the studio's fetching module, which imports this
  package back, so it never resolved and every render fell through it. It is
  gone; the ladder is real -> bundled.
- **Themeable by construction.** Colour, type and imagery come from
  `recompose-react` resolvers and the `--sc-*` tokens, never hard-coded. A
  hard-coded hex silently breaks every generated theme.
- **Mock every state, not just the happy path.** Empty, loading, error,
  long-string and overflow variants are what stop a design being correct only
  against ideal data.
- Tests live in `__tests__/` beside what they test and run with `npm test`. A
  test that asserts things about an app belongs under `apps/`, not in `kit/` —
  Gate 1 will tell you.

## Things that are easy to get wrong

**`class` and `booking` are two different screens.** Both port out of the Dart's
one `features/class_booking/` folder and both have "booking" in the name.
`classdetail/` ports **`ClassScreen`** — the detail page with the reserve
action. `BookingShowcase.tsx` clones **`ClassBookedScreen`** — the
post-reservation celebration at `AppRoutes.reservingLoading`, which the reserve
action pushes. Reshaping the celebration into a detail page would delete the
looping animation the asset relies on.

**The nav tabs are named for concepts, not screens.** `rank` is the profile and
`reward` is the store, matching the four `nav_*` icon slots the pipeline
generates. Renaming them to match the screens would break icon resolution.

**Half the screen is not generated, and it has to follow the theme too.**
CombatDen's demo classes, rewards and video feed are per-category constants, and
the category comes from the loaded run — `CombatDenSurface` reads it with
`useThemeCategory` and passes it to `AppContentProvider`. Drop that and every
generated slot still resolves perfectly while the screen turns to nonsense: a
yoga studio's theme painting yoga names and yoga photographs over a boxing feed,
hero captioned "Nick Drossos Defensive Tactics". Nothing in `make check` sees
it, and it looks like a theming bug rather than a content one.

**A generated NAME and a generated PICTURE are one claim.** `class_photo_2`
declares `depends_on_text: [class_name_2]` in `apps/combatden/app.yaml`, so the
image is generated *from* the copy. On this side that means the two are stamped
together, by position, in `useShowcaseContent` — split them across two files and
they drift, and a card captioned one thing while showing another is worse than
either being un-themed.

**A list longer than the slot set cycles, and every generated field of one
item cycles off the SAME index.** Fourteen feed cards against four slots: card
`i` takes slot `i % 4` for its picture AND its title. Splitting the two — art
cycled, copy applied to the first four only — was tried and is worse, because
card five then wears thumbnail one under a title belonging to nothing. A card
that repeats is fine; a card that contradicts itself is broken. Guardrail 10 in
`mockup-redesign-general` is the full rule.

**Directory names are load-bearing.** Gate 2a bans `**/widgets/**`,
`**/chrome/**` and `**/browser/**` anywhere in this island and matches the
IMPORT STRING, so a screen's own folder may not be called `widgets` — which is
why `classdetail/sections/` is `sections/` where the Dart says `widgets/`.

**NOT to be confused with the engine** (`..`) — the Python pipeline that
*generates* the configs this package *consumes*. Different language, different
toolchain; they share only the HTTP contract `make api` serves.
