---
name: mockup-redesign-combatden
description: CombatDen's mock assets in full — every screen and everything it must contain, every transition between them, how each screen exits, plus the gotchas (celebration order, concept-vs-screen nav names, stale upstream sources, unported gaps). Load alongside mockup-redesign-general (which carries the rules that hold for every app) whenever touching src/apps/combatden/ or reviewing a redesign of it.
---

# CombatDen mock assets — app specifics

Load **`mockup-redesign-general`** first; it carries the rules that hold for any
app (token root, token names, shorthands, dead ends, verification). This file is
only what is true about CombatDen.

Source of truth for the real app: `/var/home/jm/Documents/CombatDen/codebase/MobileApp/`.

---

# PART ONE — the inventory

Everything the mock must contain, in prose, so nothing can be missed by someone
who cannot run it. If an element is not listed here, a redesign can drop it and
nobody will notice.

**It lists PRESENCE, never form.** "A thumbnail", not "a 16:9 thumbnail";
"the four info-bar items", not "a four-column strip". Size, aspect, order,
emphasis and grouping all belong to the redesign — an inventory that pins them
forbids the thing this package exists to do, and does it silently, because it
reads as a requirement rather than as a description of the base.

## Two assets, and why exactly two

| asset | routes |
| --- | --- |
| `app` | `home`, `class`, `booking`, `store`, `video`, `profile` |
| `celebration` | `streak`, `points`, `rewards`, `rank`, `wins` |

Everything **tap-reachable** is one asset: the bottom nav switches tabs, a
schedule row opens a class, its reserve action books it. The celebration is the
second **only** because it plays after a member attends a class and no button
leads to it. A third asset needs that same justification or it rebuilds the
slideshow assets replaced.

Both are authored at **390×844**.

## How each screen exits

| screen | its exit |
| --- | --- |
| `home` / `store` / `video` / `profile` | the bottom nav |
| `class` | the topbar **back** button, and only that |
| `booking` | its **Continue**, which `nav.reset()`s to the asset root |
| every celebration card | its CTA, once the card settles |

**`class` carries no bottom nav** — the member app's detail screen does not
either — so an unwired back button there is a trap, not a cosmetic gap. It has
been one.

**`booking` also has no bottom nav.** Its CTA is the only way out, and it was
unreachable twice over: no handler, plus a `pointer-events: none` on the CTA row
that had outlived its reason.

A **tap anywhere on a still-animating celebration card** skips to settled, so a
slow entrance never strands anyone. The last card wraps to the first.

## WHAT EACH SCREEN IS ABOUT — the emphasis ranking

**Read this before the inventory below, and design to it.** The inventory says
what must be PRESENT. This says what must be PROMINENT, and it is the half that
gets lost — a redesign can render every element on the list and still be wrong,
because it made the biggest thing on the screen the least important thing on it.

This ranking is a property of the PRODUCT, not of any one design. "A member
scanning a schedule is looking for the class, not the clock" is true of every
fork, so it is decided once, here, and every redesign inherits it. A fork may
express it however it likes — scale, weight, colour, position, space — but it
may not reorder it.

**Rank 1 should be unmistakable at a glance, before anything is read.** If two
elements tie for the eye, rank 1 is not winning.

| screen | 1 — leads | 2 | 3 | supporting |
| --- | --- | --- | --- | --- |
| `home` | the class NAME **and its photograph, together** | its time | instructor, attending | the day selector, the carried stats |
| `class` | the class NAME **and its photograph, together** | the **Reserve** action | time + duration | description, instructor, location |
| `booking` | the confirmation headline | the **Continue** action | — | the hero image |
| `store` | each reward's NAME **and its photograph, together** | its points cost | the member's points balance | the price label, the tabs |
| `video` | the video TITLE **and its thumbnail, together** | channel, views | — | the scope tabs, the section headers |
| `profile` | the current RANK **and its belt, together** | progress to the next rank | streak and class counts | the rating graph, the level-up shelf |
| `streak` | the week COUNT | the streak mark | the +N points | the week strip |
| `points` | the points GAINED | the hero image | the running total | — |
| `rewards` | the featured reward's NAME **and its photograph** | its points cost | the carousel | the giftbox intro |
| `rank` | the rank NAME **and its belt, together** | classes in rank | — | — |
| `wins` | the title copy | the three stat values | their labels | the trophy, the burst |

**A NAME AND ITS PICTURE ARE ONE OBJECT AT RANK 1, NOT A THING AND ITS
DECORATION.** This is the correction that matters most in the table, and the
codebase already says why elsewhere: `class_photo_2` declares
`depends_on_text: [class_name_2]` in `apps/combatden/app.yaml`, so the picture is
generated FROM the copy. They are one claim about one class. Treating the
photograph as support leads to the small-thumbnail-beside-small-text row that
every scheduling app looks identical in; treating them as one object is what
lets a class read as a thing worth attending.

So they are sized, placed and emphasised TOGETHER. The photograph may be large —
it should be — and the name has to hold its own beside it rather than shrinking
because the picture is doing the work. **The failure is not "the photo is too
big", it is "the name is too small for the photo it belongs to."**

**What is genuinely supporting**: the time, the instructor, the attending count,
the tabs, the day selector, the carried stats. Those are how a member chooses
BETWEEN classes once the class has caught their eye — they are not what catches
it.

**Two failures this has already produced here**, both of which passed every gate:

- `apps/vinyasaflow/`'s schedule set the start time at 40px and the class name at
  17px, so the loudest thing on the screen was the clock. Every element was
  present, correctly themed, correctly spaced, and the screen answered the wrong
  question.
- A figure is seductive because the display face makes it look good at size.
  That is a reason to be suspicious of a big number, not a reason to keep it.

## Every screen, and what it must contain

### Asset `app`

**`home`** — the schedule, and the asset's root. Must contain: the branded
topbar (gym mark, gym name with its chevron, and the four-item info bar —
rank belt, streak with its icon and count, points total, QR affordance); a
horizontal date row of five days with the active day marked; a "TODAY" section
heading; and a list of class rows. Each row carries the class name, its time
range with duration, the instructor, an attending count, and a thumbnail.
Bottom nav present, Home active.

**`class`** — the class detail page. Must contain: a **back** control; the same
identity and four carried items the other app screens show (gym mark, gym name
with its chevron, rank belt, streak with its count, points total, QR
affordance); a full-width class photo; the class meta (name, time, duration,
instructor, attending); a description section; an instructor section with bio; a
location section with its map image; and exactly one **Reserve** action. No
bottom nav.

**The identity and carried items are easy to miss here and this entry used to
omit them.** `parts/ClassScreenTopbar.tsx` composes `support/ShowcaseTopbar` in
its `nameOnly` mode, and `nameOnly` suppresses only the big MARK — every
arrangement `TopbarStacked` builds still renders `<InfoBar>`. A redesign reading
"a topbar with a back button" and building exactly that drops five elements and
passes every mechanical gate. `apps/vinyasaflow/` shipped that for an afternoon
before it was caught by reading the base rather than this list.

**`booking`** — the post-reservation celebration. Must contain: the celebration
hero image scaling in, the "Class Booked" headline (themed copy slot), and a
**Continue** CTA that fades in beneath it. No bottom nav.

**`store`** — the points store. Must contain: the topbar with rank badge and
points, the member's points headline, the reward category tabs, and a grid of
reward cards each with its image, title, points cost and price label. Bottom
nav present, Reward active.

**`video`** — the video library. Must contain: the topbar, the scope tabs, a
featured hero video card, and one carousel row per genre, each with a section
header and horizontally-scrolling cards. Bottom nav present, Videos active.

**`profile`** — the member's rank and progress. Must contain: the topbar, the
rank header with the current belt, a rank summary, a next-rank section with its
circular progress badge and belt preview, a rating graph with a timeframe
selector, and a level-up videos row. Bottom nav present, Rank active.

### Asset `celebration`

Each card fills the screen, plays an entrance, and reveals a CTA once settled.
Each must contain its hero, its figures, and the CTA zone (which is laid out
from the first frame so its arrival never reflows the card).

**`streak`** — the streak icon hero, a large week count that counts up, the
"+N points" subtitle, and the week strip of seven day badges with attended days
marked.

**`points`** — the orbiting 3D sphere of point tokens, collapsing into the
points hero image, with a "+N POINTS" count-up and a running total caption.

**`rewards`** — the giftbox intro that opens into a burst, then a cover-flow
carousel of reward cards with a featured caption.

**`rank`** — the rank belt hero, the rank name and its sub-label, and a count-up
of classes in rank.

**`wins`** — the trophy hero inside a sparkle burst, the "Today's wins" title
and subtitle (both themed copy slots), and a row of three stat tiles that
cascade in.

## Every transition

| from | trigger | to | history |
| --- | --- | --- | --- |
| `home` | tap a class row | `class` | **push** (back returns) |
| `class` | topbar **back** | `home` | pop |
| `class` | **Reserve your spot** | `booking` | push |
| `booking` | **Continue** | `home` | **reset** — clears the class push too |
| any app screen | bottom-nav tab | that tab's root | **reset**, never push |
| any celebration card | tap while animating | same card, settled | none |
| any celebration card | its CTA | the next card | **replace** — no going back |
| `wins` (last) | **Book your next class** | `streak` | replace — wraps to the start |

Tab switches reset rather than push because the Dart reaches each tab root with
`pushReplacementNamed`; pushing would accumulate a back stack the member never
built.

---

# PART TWO — the gotchas

## Running it against real themes

`make -C RecomposeJsxMockUps dev` needs nothing. Seeing a real THEME needs the
read API, and from a git worktree that takes one setup step first:

```bash
/var/home/jm/Documents/Recompose/codebase/setup_worktree_env.sh   # once per worktree
make api                                                          # then :8001
```

**Why the setup step.** Produced runs are gitignored (`apps/*/*/`), so a fresh
worktree has zero of them and every `GET /apps/combatden/styles` answers 404 —
which reads as a broken API and is really an empty directory. The script copies
`.env`, symlinks the `.venv` and each `node_modules`, and symlinks every run dir
from the root checkout. It is local and uncommitted, the sibling of CombatDen's
script of the same name.

Two things that used to break this and are now fixed — worth knowing because
either symptom is confusing:

- `RecomposeAPI/config.py` derived the repo root one `.parent` too far, so from
  a worktree `apps_root` pointed at `.claude/worktrees/apps`, which does not
  exist. Every run invisible, every styles request 404.
- `assets_cdn_base_url` defaulted to a CDN whose deploy plumbing had been
  dropped, so images resolved to 404s and every client silently fell back.

In the harness, the theme picker is **opt-in** — click *Load themes*. With the
API down it says so rather than failing quietly.



## The celebration order is the Dart's

**streak → points → rewards → rank → wins.**

That is what `celebration_flow.dart`'s `celebrationCardRoutes` returns and what
its own test asserts (wins last in every gym shape).

**`apps/combatden/app.yaml` disagrees and is the stale side** — its `rank_belt`
description calls the rank card "the 2nd of five". The Dart is the authority on
what the app does. Do not "fix" the mock to match the slot description.

The wins card is **the one card that does not use `celebrationCtaLabel`** — it
reads the `book_next_class_cta` copy slot ("Book your next class"), because a
card whose whole reason to exist is the nudge cannot end on "Done".

The flow's **gates are deliberately not ported**. The app hides the rewards card
when a gym runs no rewards and the rank card when the member holds no rank. A
preview has no gym and no member, and hiding a card the reviewer is meant to
judge is worse than showing it.

## The nav tabs are named for concepts, not screens

`rank` → the **profile** screen. `reward` → the **store** screen.

That mismatch is the Dart's, kept so the four `nav_*` icon slots keep resolving
against the names the pipeline generates them under. Renaming them to match the
screens breaks icon resolution.

## `class` and `booking` are two different screens

The easiest mistake here: both port out of the Dart's one `features/class_booking/`
folder and both have "booking" in the name.

- **`class`** (`classdetail/`) ports **`ClassScreen`** — the detail page with
  topbar, photo, meta, instructor, location and one reserve action.
- **`booking`** (`BookingShowcase.tsx`) clones **`ClassBookedScreen`** — the
  post-reservation celebration at `AppRoutes.reservingLoading`, which the reserve
  action pushes.

Reshaping the celebration into a detail page deletes the animation the asset
relies on.

## Directory names are load-bearing

eslint Gate 2a bans `**/widgets/**`, `**/chrome/**` and `**/browser/**` anywhere
in this island and matches the **import string**, so a screen's own folder may
not be called `widgets` — which is why `classdetail/sections/` is `sections/`
where the Dart says `widgets/`.

---

## Upstream sources that have gone stale

**Never copy `mock_stats.dart`.** `mockWinsStats` / `mockStreakStats` are
dormant demo constants no screen renders — the screens call
`celebration_stats_builder.dart`'s `buildWinsStats` / `buildStreakStats`.
Copying the constants shipped a "Rank Classes" tile the app had deleted and a
streak subtitle of the wrong *kind* of string (it is `+N points`, not a
sentence).

**`CRM/lib/showcase/` predates the member app going live.** Several mock screens
port from it. Known drift it has already caused: the topbar renders a switch
chevron the app deleted, and lacks the identity avatar the app added.

**Check `git log` before trusting any port.** Work lands on branches
(`wins-card` was merged as `3b3f248a`); a screen may have been rewritten since.

## Known gaps against the app, not yet ported

Not bugs — unported work, so do not "fix" them by inventing something:

- **The belt-promotion card** (`57e419c2`, ~500 lines of Dart plus a 1,253-line
  spec). A new route outside the `postClass*` family, a `MemberPromotion` model,
  a cross-dissolve/sparkle/swell swap and a fly into a measured slot. It also
  composes the rank card **out** when it plays. The mock has no equivalent.
- **Rank card fidelity.** The real one flies the belt from centred-280pt into a
  measured 77×50 slot beside the rank name and pins a "N more classes until
  promotion" line at the foot. The mock is a static column.
- **Rewards affordability.** The app derives the card's title, subtitle and
  featured index from the member's points balance, with per-slide
  redeemable/locked state and a progress ring. The mock is static.

---

## Living document

When CombatDen's app changes, this file changes in the same edit. A stale
guardrail is the exact shape of the bug it warns about — the `app.yaml` ordering
above is a live example of a description outliving its truth.
