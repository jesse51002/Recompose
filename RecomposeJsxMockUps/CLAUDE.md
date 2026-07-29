# RecomposeJsxMockUps — the mock screens

Feature-free JSX mock screens. **No business logic, no API calls, no state.**
They exist to be looked at and edited: the design agent rewrites them, and
`../RecomposeStudio` previews them in a phone frame.

See `../CLAUDE.md` for the monorepo map.

## The island rule — the one that matters

This package may import from **`recompose-react`** and **from itself**. From
nothing else.

It may not reach into `../RecomposeStudio` for a widget, a token, or a helper.
That is why `src/cx.ts` is a byte-identical local copy of the studio's `cx`
rather than a shared import — the duplication is deliberate and predates the
package split.

**The reason is the product.** These screens are the surface an agent rewrites
freely under the arrangement-only invariant. Every dependency they carry is
something that can break when an agent rearranges a screen, and a broken import
inside a generated redesign is indistinguishable from a bad design. Keeping the
island sealed is what makes free agentic editing safe here.

If you want to share something with the studio: duplicate it, or push it down
into `recompose-react`. **Do not add the edge.**

## Structure

One directory per screen (`home/`, `profile/`, `rewards/`, `videos/`,
`classdetail/`, `celebrations/`, `support/`), each with a `layouts/` folder
holding its **arrangement variants** — the same content composed several ways.
Arrangements are the point of this package: they are what a redesign chooses
between, and what makes the difference between a redesign and a reskin legible.

Shared-across-screens material sits at the package root: `showcaseContent.ts`
(the mock data), `showcaseSlots.ts` (the slot manifest), `showcaseTokens.ts`,
`showcaseAssets.ts`, `formats.ts`, `cx.ts`.

`src/index.ts` is the **only** export surface. The studio imports the package,
never a file inside it. If the studio needs something new, export it there.

## Rules

- **No data fetching, ever.** If a screen needs content, it comes from
  `showcaseContent.ts`. A `fetch` in this package is a bug.
- **Mock every state, not just the happy path.** Empty, loading, error,
  long-string and overflow variants are what stop a design being correct only
  against ideal data — and what stops the productionalize step becoming a
  reconciliation problem.
- **Themeable by construction.** Colour, type and imagery come from
  `recompose-react` resolvers, never hard-coded. A hard-coded hex here silently
  breaks every generated theme.
- Tests live in `__tests__/` beside what they test and run with `npm test`.

## The screens themselves

_Moved from `RecomposeReact/CLAUDE.md` in the 2026-07-28 package split._

### The ten showcase screens

`showcase/showcaseScreen.tsx` is the registry, and adding a screen touches four
compiler-linked spots in it: the `ShowcaseScreen` union, the frozen
`SHOWCASE_SCREENS` array (slideshow order), `SHOWCASE_SCREEN_LABELS`, and the
exhaustive switch. Consumers (`browser/ThemePreviewPane.tsx`) derive their chips
and arrows from those arrays and need no change.

| screen | label | shape | body scrolls |
| --- | --- | --- | --- |
| `home` | Home | app surface | **yes** |
| `class` | Class | app surface | **per arrangement** |
| `booking` | Booking | celebration (loops) | no |
| `wins` | Achievements | celebration (loops) | no |
| `points` | Points | celebration (loops) | no |
| `rewards` | Rewards | celebration (loops) | no |
| `streak` | Streak | celebration (loops) | no |
| `store` | Store | app surface | **yes** |
| `video` | Video | app surface | **yes** |
| `profile` | Profile | app surface | **yes** |

That split is a rule, not a coincidence. An **app surface** is a screen a member
scrolls on a real device, so clipping it previews a shorter app than the one
being licensed. A **celebration** is a single-moment composition: a post-class
reward animation is not a scrolling surface, and giving one a scrollbar would
invent a behaviour the member app does not have. Both kinds are rearranged by a
`*_format` slot (below); neither may earn its arrangement by scrolling.

### The celebration cards share ONE arrangement

`wins`, `points`, `rewards` and `streak` are the post-class cards, and the
pipeline classifies all four with a single slot — `celebration_format`, whose
own doc says "the body slot differs per card, the arrangement around it does
not". So the hook lives in **`showcase/celebrations/CelebrationFrame.tsx`**, the
port of `PostClassScaffold` and its five layouts, and the four screens compose
into it. One choice moves all four, and `showcase/showcaseScreen.tsx` — the file
all four are registered in — never learns the slot exists.

Two things about that set are easy to get wrong. The member app has a **fifth**
consumer, `rank_screen.dart`; the Flutter preview this island ports never
carried a rank celebration, so there is no rank card here to rearrange. And
`BookingShowcase` is **not** one of them — it clones `ClassBookedScreen`, which
is governed by **no format slot at all** (see the section below).

The member app's layouts arrange four slots (header, body, close, one primary
action); a preview card ships exactly one, its **body**, so the frame places
exactly that one and never invents an action to arrange. What the absent action
leaves behind is a measurement: `splitBand` and `fullBleed` still reserve
`kCelebrationCtaZone` beneath the celebration, because both values ARE the seam
between the card and the canvas the action stands on.
`showcase/__tests__/celebrationFormats.test.tsx` is the mechanical gate — the
stage's subtree must come out byte-identical across all five values, per card,
in both of each card's views.

### `class` and `booking` are two different screens

The single easiest mistake in this island, because both port out of the Dart's
one `features/class_booking/` folder and both have "booking" in the name.

- **`class`** (`showcase/classdetail/`) ports **`ClassScreen`** — the class
  DETAIL page: topbar + back, photo, meta, details, instructor, location, and
  exactly one reserve action. It is the **only** consumer of `class_format`;
  `ThemeLayout.classDetail()` is read in exactly one place on the Dart side,
  `class_screen.dart`.
- **`booking`** (`showcase/BookingShowcase.tsx`) clones **`ClassBookedScreen`** —
  the post-reservation CELEBRATION: image scale-pop, caption cascade, CTA fade,
  then a hold and a replay. It is routed at `AppRoutes.reservingLoading`, reads
  **no** format slot, and is not a `celebration_format` card either (that slot
  belongs to `post_class/`, which backs `wins`/`points`/`rewards`/`streak`).

So `class_format` never had a surface in this package until `classdetail/` was
built, and `booking` must never be reshaped into a detail page — doing so would
delete the looping animation the preview run depends on.

`class` is the only screen whose scrolling is **per arrangement** rather than
per screen: each of the five layouts owns its own scroller exactly as the Dart's
five do, so `ClassDetailShowcase` passes no `bodyScroll` and `ShowcaseScaffold`
stays `overflow: hidden`. That is what keeps `detailSheet`'s full-bleed backdrop
from being clipped by an ancestor scroller it never asked for.

Its section folder is `showcase/classdetail/sections/`, where the Dart says
`widgets/`: Gate 2a bans `**/widgets/**` anywhere in this island and matches the
IMPORT STRING, so `../widgets/ClassMetaSection` trips it even pointing at the
screen's own folder.

`showcase/showcaseSlots.ts` is a SUBSET of the member app's manifest — only what
these screens render. `next_rank_belt_image` is in it because `profile` renders
it (`showcase/profile/NextRankSection.tsx`); it is the pipeline's tenth
generated image, derived from `rank_belt`, and Profile is its only consumer in
the member app too. `reserve_cta` was in it from the start and rendered by
nothing until `class` arrived — `showcase/classdetail/sections/
ClassReserveFooter.tsx` is its first consumer here.

The demo CONTENT ladder is `showcase/useShowcaseContent.ts`: classes and rewards
resolve real → fetched (`GET /theme/showcase-defaults`) → bundled
(`showcaseGroupDefaults.ts`), and video feeds resolve real → bundled
(`showcaseVideoDefaults.ts`) because the wire format carries no videos. Videos
deliberately skip `fillSlots` — that helper repeats a single item across a FIXED
four-card layout, and a feed has no slots to fill.

**That ladder picks ONE TIER for the whole class list, which is why the class
detail screen resolves three of its fields per-FIELD instead.** A
`ShowcaseClassInfo` carries `description`, `instructorBio` and
`instructorImageUrl` as OPTIONAL — the bundled tier has all three for every
group (extracted from `VideoService/gyms/*.yaml`, which is also where the rest
of that file came from), and the fetched tier declares them (`str | None` on
`FastApiBackend/ThemeTree/theme/schema/theme_schema.py`) but serves NULL for every
one, because its source
`FastApiBackend/ThemeTree/theme/showcase_defaults/theme_showcase_defaults.yaml` was
ported from the CRM constants that predate the fields, and says so in its own
header. A per-tier ladder therefore lets the fetched nulls hide the richer
bundled copy whenever `:8000` is up. `showcase/classdetail/classDetail.ts`
closes that by filling each missing field from the bundled class of the same
name; the real fix is for that yaml to carry them.

**NOT to be confused with `..` (the engine itself)** — that is the Python
pipeline which *generates* the configs this package *consumes*. Different
language, different toolchain (poetry vs npm); they share only the HTTP contract
that `make api` serves.
