# RecomposeStudio — the theme browser

The product, as three pages walked in order:

| `?view=` | Who | What |
|---|---|---|
| *(default)* | admin | **Onboard** — point us at a platform, get a design fork. Demo-ware. |
| `generate` | customer | **Generate** — answer an interview, watch the design get made. Real. |
| `fleet` | admin | **Fleet** — every customer app and what an agent is doing to it. Demo-ware. |

**The pages hand over to each other.** Onboarding ends by opening the customer
view; an approved design ends by returning to the fleet. That handover is the
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
  itself, which is the only place a viewer would otherwise be misled.
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
- **An answered question shows WHICH option was taken**, in the shell's own
  colour for "you". Derived by matching the next thing the person said against
  the options — a chip press posts the option's own text, so the records
  genuinely cannot tell a pick from typing. Without it a finished interview
  scrolled back as identical grey rows: every question kept, every answer lost.
- **Stop and Start share one slot, and only one is ever shown.** The layout
  agent is the most expensive thing the page can start and closing the tab does
  not stop it, so Stop exists — gated on `view.layoutRunning`, because an offer
  to stop something that is not running is worse than no offer. Start is its
  pair: without it, stopping would be a one-way door out of the whole design.
  It appears only once `view.themeId` exists, since before a run has settled
  there is nothing for an agent to look at, and it reads "Run the agent again"
  once a design folder is there — starting continues that folder rather than
  discarding it.
- **Fail visible.** A missing artifact, a failed run, an empty catalog: show the
  state. A blank pane that could mean "loading" or "broken" is the one failure
  mode that wastes the most time here.
- Tests live in `__tests__/` beside what they test and run with `npm test`.
