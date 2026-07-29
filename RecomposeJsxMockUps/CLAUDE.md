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
| `production-to-mockup` | porting a real app into a new mock |
| `mockup-redesign-general` | editing any mock — the app-agnostic guardrails |
| `mockup-redesign-combatden` | editing CombatDen's — its inventory and gotchas |
| `mockup-qa` | the exhaustive live sweep, after any change |

Load the general one plus the app's own whenever you touch a screen. They carry
the failure modes `make check` cannot see, every one of which has shipped here
at least once.

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
  index.ts             the ONLY export surface
```

**A second app is a sibling folder under `apps/` plus one `defineMockApp`.**
Not a change to the kit, and not a change to the host. That is the whole reason
the split exists, and **eslint Gate 1 enforces the direction**: `src/kit/` may
not import `src/apps/`. An app reaches the kit by calling `defineMockAsset` /
`defineMockApp`, never the other way round.

`src/index.ts` is the only export surface. The studio imports the package, never
a file inside it. If the studio needs something new, export it there.

## Assets, not screens

The package ships **assets**: self-contained, interactive mocks you click
through. Not a gallery of stills behind a picker.

| asset | what | routes |
| --- | --- | --- |
| `app` | the member app | home, class, booking, store, video, profile |
| `celebration` | the post-class flow | streak, rank, points, rewards, wins |

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

`make dev` (or `npm run dev`) serves the harness in `dev/` on **:8081** — an asset switcher, a
phone-shaped box, and nothing else. `?asset=celebration` deep-links, so a reload
lands back where you were instead of making you click through the flow again.

**It renders UNTHEMED.** No `initializeTheme`, no API: every `--sc-*` token
falls back to CombatDen's bundled values. That is the honest default for what
the harness is for — judging layout and interaction. Judging a *generated theme*
needs a run to point at, which is `../RecomposeStudio`'s job.

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

**Directory names are load-bearing.** Gate 2a bans `**/widgets/**`,
`**/chrome/**` and `**/browser/**` anywhere in this island and matches the
IMPORT STRING, so a screen's own folder may not be called `widgets` — which is
why `classdetail/sections/` is `sections/` where the Dart says `widgets/`.

**NOT to be confused with the engine** (`..`) — the Python pipeline that
*generates* the configs this package *consumes*. Different language, different
toolchain; they share only the HTTP contract `make api` serves.
