# RecomposeStudio — the theme browser

The product, as three pages walked in order:

| `?view=` | Who | What |
|---|---|---|
| *(default)* | admin | **Onboard** — point us at a platform, get a design fork. Demo-ware. |
| `generate` | customer | **Generate** — answer an interview, watch the design get made. Real. |
| `fleet` | admin | **Fleet** — every customer app and what an agent is doing to it. Demo-ware. |
| `layouts` | admin | **Layouts** — how few arrangements dress every tenant. Demo-ware. |

**Layouts is not in the switcher.** It is reached from the fleet's header,
because it answers a question the fleet raises — this many designs, so how many
things are actually maintained? — rather than being a fourth peer. The nav's
three pages are the demo's spine and stay three. It is addressable all the same
(`?view=layouts`), so the demo can be handed over pointing at it.

**The pages hand over to each other.** Onboarding ends by opening the customer
view; a signed-off design ends by returning to the fleet. That handover is the
product's shape — set a platform up once, generate against it many times — so
the pages perform it rather than leaving a person to find the right tab.

**Library and Inspect are no longer destinations.** Picking a theme is a popup
over the canvas (`generate/ThemePopup.tsx`) and inspecting artifacts is a pane
of it (`inspect/InspectView.tsx`, mounted by the Generate page). A catalogue
you had to leave the design to visit was a shopping trip in the middle of a
review, and `browser/` is deleted.

## What it depends on, and what it must not become

It consumes `recompose-react` (the runtime) and `recompose-jsx-mockups` (the
screens it previews). **Nothing depends on this package** — it is the top of the
dependency graph, which is what makes it the safe place to iterate.

It imports the mockups **through their package entry**, never by reaching into a
file inside them. The mockups are an island; see their `CLAUDE.md` for why. If
the studio needs something the island does not export, add the export there
rather than deepening the import here.

## The pinned port — do not change it casually

Dev and preview are pinned to **8080** with `strictPort`. The API's CORS
allowlist contains 8080 and **not** Vite's default 5173, so moving the port
silently breaks every catalog fetch with a CORS error that looks like a backend
problem. Pinning is what keeps this a zero-backend-change frontend.

## Structure

- `inspect/` — the artifact sheet and `artifactModel.ts`, which maps a run's output into what it renders. Mounted as the Generate page's Inspect pane, not as a view of its own.
- `studio/` — the wire contract and the streams: `sessionApi` / `studioApi`,
  `recordStream` (the replayable-log subscription both streams share),
  `sessionFold` / `runFold`, and `RunSheet`, which is now the Generate page's
  Inspect tab rather than a page of its own. Talks to `RecomposeAPI/studio`.
- `generate/` — the Generate page itself: the transcript column, the canvas,
  the brief document, and its own dark token scope. **Nothing is typed before
  it.** Opening the tab opens the session; the start form that used to stand in
  front asked a person to name a thing that did not exist yet, for a fact the
  agent's own first question collects. `StudioDown` is all that remains in
  front, and only when the API cannot be reached. **This is the one view with
  a ground of its own** — the rest of the studio is a daylit control desk, and
  this page was designed dark so the generated theme is the brightest thing on
  it. The tokens are scoped to `.shell`, so nothing else can read them.
- `chrome/`, `widgets/`, `tokens/`, `styles/` — the app shell and its own UI vocabulary. **This is the studio's design system, not the product's** — it is admin chrome, deliberately plain, and must never leak into the mockups.
- `data/` — defaults and fixtures the views fall back to, including
  `fleetFixtures.ts`. **Everything in that file is invented** — there are no
  customers and no deployment — and both pages that read it say so on the page
  itself, which is the only place a viewer would otherwise be misled. **The
  logos are the one exception and they are real:** every fleet row names a run
  that exists in `apps/combatden/` and draws its `logo_primary` off the read
  API at a hardcoded loopback URL. A fleet of grey initials argues nothing; a
  column of thirty different marks the pipeline actually made is the page's
  whole point, so it says that on the page too.
- `public/` — static assets served at the site root: the brand lockup as
  delivered, plus the R mark and the favicons cropped from it. The header and
  the browser tab use the **mark**, never the lockup — its wordmark is white on
  a light outline and vanishes on this chrome, and at 16px a wordmark is a
  smudge. `public/README.md` records how the derived files were made.
- `design/` — **a clickable demo of a proposed redesign, not code.** One
  self-contained `studio-demo.html`: open it, no build, no server. Three pages
  across two points of view — Onboard and Fleet are admin, Generate is the
  customer. Everything in it is fake. It sits outside `src/`, so no check
  touches it and nothing imports it.

## Rules

- **The studio's own look is not a design surface.** It is a tool. Do not theme
  it with `recompose-react` resolvers, and do not let its widgets drift toward
  looking like product UI — the whole point is that the previewed screen is the
  only themed thing on the page.
- **The Inspect sheet is the one exception, and it is total.** It is where the
  artifact is JUDGED, and judging a palette on the tool's ground is how a warm
  sand reads as grey and a dark theme reads as broken. So `inspect/InspectView`
  wears the design's own `background` and `text` roles, and **rebinds
  `--adm-ink` / `--adm-text-2nd` / `--adm-text-3rd` / `--adm-line` /
  `--adm-line-soft` on its root** so every plate below follows. Setting `color`
  alone is not enough — the plates state their own `color: var(--adm-ink)`,
  which beats an inherited value. That rebinding works because **CSS Modules
  scopes class names but not custom property names**, which is the same fact
  that makes `animation-name` need `var(--kf-*)` indirection in `styles/base.css`.
  The secondary inks are alpha ratios off the one `text` role, because
  `app.yaml` declares no muted role to read.
- **In `generate/`, colour is functional and nothing else.** A hue in the shell
  means a state — a phase, a failure, a person is needed. Decorative colour
  belongs to the generated theme, and the canvas is where it lives. So a hue
  appearing in the chrome always means something changed.
- **Demo-ware says so on its own surface.** Onboard and Fleet connect to
  nothing, and each carries a line naming what is invented. A demo that cannot
  be told from a product is the one failure this repo cannot afford, and a note
  in a file nobody opens is not a label.
- **Phase colour has exactly one source.** `generate/phaseClass.ts` maps a wire
  phase to the class carrying its `--phase*` properties, and the header tag and
  the transcript markers both read it. In the demo a single `stamp()` call held
  that invariant; here the data holds it, and a second mapping would be the way
  it breaks.
- **One thing at a time is awaiting the person.** `sessionFold` closes any open
  question when a proposal lands and any open proposal when a question lands, so
  live chips can never sit above a live Accept. The agent's output union already
  makes one TURN produce one arm, but a turn is not the unit that matters: a
  system note (a run settling) starts a turn with nothing said, so an ask left
  open before it would still be live underneath.
- **An answered question shows WHICH option(s) were taken**, in the shell's own
  colour for "you". Derived by matching the next thing the person said against
  the options — a chip press posts the option's own text, so the records
  genuinely cannot tell a pick from typing. Without it a finished interview
  scrolled back as identical grey rows: every question kept, every answer lost.
- **`multi_select` is honoured, and it needs a Send.** The flag has been on the
  agent's own schema all along and the UI ignored it, so a question the model
  meant as "pick any that apply" answered with exactly one and silently sent a
  fraction of what was true. Single-select still sends on the press — a confirm
  on a one-of-six is a click that buys nothing — but multi-select cannot work
  that way, since the first press would send it, so the chips accumulate in
  local draft state and one Send posts them joined by `ANSWER_SEPARATOR`. That
  draft is deliberately NOT folded from the records: it lives only between the
  first press and the Send, and nothing outside the row can act on a half-made
  answer. `picked` is a list for the same reason.
- **The layout agent is started and stopped from the TRANSCRIPT**, as a card in
  the flow (`SessionChat`), not from the canvas bar. It is the most expensive
  thing the page can start, and in the bar it sat among the readouts and the
  pane switches — a row about what you are *looking at* — so the costliest
  button on the page read as chrome. Starting it is a decision about the
  design, and every other such decision arrives in that column as something
  the agent said with a button under it. Stop and Start share the card and only
  one is ever shown: Stop is gated on `view.layoutRunning`, because an offer to
  stop something that is not running is worse than no offer, and Start appears
  only once `view.assetsSettled` is true. **Not `view.themeId`** — the started
  record already names the theme it is going to make, so gating on the theme
  existing announced "the theme is ready" a second after launch and offered to
  lay out a design that was three images deep. Nor `!assetsRunning`, which is
  equally true of a failed run and of one that never began. The layout agent is
  built for that palette, those typefaces and those pictures, so only a
  `finished` state will do. It reads "Run the agent again" once a design folder
  is there — starting continues that folder rather than discarding it.
- **Nothing spends money without a press.** The layout used to start itself the
  moment the asset run settled. A finished run is genuinely its only
  precondition, and that was still the wrong default — a precondition being met
  is not the same as a person being ready. The button is the only door now.
- **Only an `accepted` record accepts a brief.** A proposal stops being the
  *open* one as soon as the owner says anything, which is how a question knows
  it was answered — so reading "no longer open" as "accepted" marked a brief
  accepted the instant someone typed "make it warmer", took its Accept button
  away, and left the run to start off a brief nobody had approved. Not open and
  accepted are different facts and the log carries the second one itself. A
  brief that was replaced by a newer one reads as *superseded*, and only the
  newest unaccepted brief offers Accept — two live Accepts would be two answers
  with the second silently overwriting the first.
- **The canvas keeps re-reading the theme for the whole run.** `selectDesign`
  fetches once and caches, and nothing in `recompose-react` re-fetches on its
  own — so the loop in `GenerateView` is the only thing that makes the phone
  repaint mid-run. It used to stop at the first success, which pinned the
  canvas to whichever DAG level happened to have landed first; it now refreshes
  until `view.assetsRunning` goes false.
- **The whole view survives a mockup switch — flow AND screen.** Comparing two
  designs means flipping between them on the same screen, so `GenerateView`
  remembers both the asset id and the route and hands the route back through
  `MockAssetStage`'s `initialRoute` / `onRouteChange`. Both carry across apps
  because both id spaces are shared by convention (`app` / `celebration`, and
  a fork keeps its base's route ids), and both degrade rather than break: the
  kit falls back to an asset's own root for a route it does not declare, and
  the canvas falls back to the first asset for an id an app does not have.
  Resetting either on a switch is what made a design impossible to compare.
- **An app is more than one flow.** Every app ships the app itself and the
  post-class celebration; the canvas drew only the first, so half of what a
  redesign changed was unreachable. The flow switch renders only when there is
  more than one.
- **A settled session is not necessarily an approved one.** A session is settled
  by a person pressing Approve — except when the studio's process restarted
  while the design was in flight, where the stream SYNTHESISES a terminal
  record carrying an error so a client stops reconnecting to something dead.
  Reading `view.settled` alone rendered that crash marker as the approval
  celebration, so a design announced itself approved with nobody having pressed
  anything, every time the API was restarted mid-run. `view.settledError`
  separates them and `SessionLost` says what happened.
- **The Layouts board is the one admin surface built to be LOOKED at.** Its
  argument is that layout is code and theme is data, so they scale differently:
  drag the cap and the same thirty-two marks re-pack into fewer columns. The
  deal is round-robin rather than chunked precisely so that moving the cap
  disturbs every column — chunking would leave the first columns untouched and
  show nothing. The reveal is a pure CSS stagger with a per-cell
  `animation-delay`, not a timer pushing state: thirty-two `setState` calls to
  animate a list is work the compositor does for free, and this package treats
  setting state from an effect as an error. The board is re-keyed on the cap so
  the marks replay their entrance instead of silently teleporting between
  columns.
- **Fail visible.** A missing artifact, a failed run, an empty catalog: show the
  state. A blank pane that could mean "loading" or "broken" is the one failure
  mode that wastes the most time here.
- Tests live in `__tests__/` beside what they test and run with `npm test`.
