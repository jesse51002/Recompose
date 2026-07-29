# RecomposeStudio — the theme browser

The standalone tool. Three views, switched by the tab bar and reachable by URL
(`?view=`, `src/appUrl.ts`):

| `?view=` | What |
|---|---|
| *(default)* | **Library** — the catalog, and any design previewed in a phone frame. |
| `inspect` | **Inspect** — every artifact one pipeline run produced: the four colour roles with their derivations, the flat palette, both typefaces set in themselves, the generated copy, icons and imagery. |
| `studio` | **Studio** — authoring a brief and watching a run produce a theme. In progress. |

See `../CLAUDE.md` for the monorepo map.

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

- `browser/` — the Library view: catalog grid, search, filters, phone-frame preview.
- `inspect/` — the Inspect view and `artifactModel.ts`, which maps a run's output into what the view renders.
- `studio/` — the Studio view: brief authoring and run watching, against `ThemeTree/studio`'s local API.
- `chrome/`, `widgets/`, `tokens/`, `styles/` — the app shell and its own UI vocabulary. **This is the studio's design system, not the product's** — it is admin chrome, deliberately plain, and must never leak into the mockups.
- `data/` — defaults and fixtures the views fall back to.
- `design/` — **static hi-fi mockups, not code.** Eleven HTML files proposing a
  full redesign of this package; see their `README.md`. They sit outside `src/`
  so no check touches them, and nothing imports them.

## Rules

- **The studio's own look is not a design surface.** It is a tool. Do not theme it
  with `recompose-react` resolvers, and do not let its widgets drift toward
  looking like product UI — the whole point is that the previewed screen is the
  only themed thing on the page.
- **Fail visible.** A missing artifact, a failed run, an empty catalog: show the
  state. A blank pane that could mean "loading" or "broken" is the one failure
  mode that wastes the most time here.
- Tests live in `__tests__/` beside what they test and run with `npm test`.
