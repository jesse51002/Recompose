# Studio redesign — hi-fi mockups

Static HTML. **No behaviour, no JS, nothing to build.** Open any file directly:

```
open RecomposeStudio/design/01-generate-idle.html
```

They are a review artifact for a full visual redesign of the studio, not
shipping code. `tokens.css` is shared by all eleven; each file carries only the
one-off styles its own state needs.

They sit outside `src/`, so `make check` never sees them — `tsconfig.json`
includes only `src`, `vitest.config.ts` only `src/**/__tests__`, and eslint only
matches `.ts`/`.tsx`.

## The eleven

| # | File | State |
|---|---|---|
| 1 | `01-generate-idle.html` | Nothing running. The "what is this" screen. |
| 2 | `02-onboarding.html` | Stages 1–3 — connect, tokenize, mirror. Once per **platform**. |
| 3 | `03-brief-interview.html` | The brand-brief interview, and the app before anything is generated. |
| 4 | `04-asset-run.html` | The DAG mid-flight: 11/23 done, one node failed, two skipped, phone repainting. |
| 5 | `05-design-agent.html` | The agent rewriting the mock. Same content, different arrangement. |
| 6 | `06-validation.html` | The screenshot oracle **rejecting** — long strings clip, empty state missing. |
| 7 | `07-productionalize.html` | Production code written, git repo created. |
| 8 | `08-mockup-picker.html` | The design list. A design is a folder copy; the undo is delete + re-copy. |
| 9 | `09-library-pane.html` | One arrangement under another brand's resolved slots. |
| 10 | `10-fleet-table.html` | Every platform, uat/main sync, the review queue. |
| 11 | `11-fleet-lanes.html` | One upstream commit propagating across five hops. |

## What they commit to

- **Three panes** — chat, canvas, and a right pane whose in-pane selector
  switches **Tree ⇄ Library**. The tree replaces the old Inspect view.
- **The stage rail on top of the canvas.** Stages 1–3 collapse to a satisfied
  prefix once a platform is onboarded, because they are not per-design.
- **Dark shell, one saturated colour.** The generated theme is the only
  chromatic thing on the page. Node state is luminance, weight and motion.
  The single exception is **failure**, which gets a hue — a failed node reading
  as one more neutral is what "fail visible" exists to prevent.
- **Theme and mockup are independent axes**, with a picker each.

Every slot id and node name is real, taken from `apps/combatden/app.yaml`:
18 image slots, 4 colours, 2 fonts, 5 texts, 4 icons, 8 categories, zero formats.
The DAG is 23 nodes over 3 levels — 5 roots, 15 images on `color`, and 3 derived
from another image (`points_stars_image` and `giftbox` from `single_point`,
`next_rank_belt_image` from `rank_belt`).

The long-form plan behind them, including the engine changes they imply, is the
agent-native plan `plan-eb24a1ad6c314b28`.

## Known limits

- **Desktop only**, authored at 1600×980. There is no responsive behaviour and
  the app frame does not reflow.
- `tokens.css` `@import`s Geist from Google Fonts, so the type falls back to a
  system stack offline.
- The phone is drawn in HTML at the ratio `MockAssetStage` would produce. It is
  not the real mockups package.
