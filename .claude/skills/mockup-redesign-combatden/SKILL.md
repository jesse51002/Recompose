---
name: mockup-redesign-combatden
description: CombatDen-specific facts for editing or redesigning its mock assets — which screens exist, how each one exits, the celebration order, the nav tab mapping, and which upstream sources have gone stale. Load alongside mockup-redesign-general (which carries the rules that hold for every app) whenever touching src/apps/combatden/.
---

# CombatDen mock assets — app specifics

Load **`mockup-redesign-general`** first; it carries the rules that hold for any
app (token root, token names, shorthands, dead ends, verification). This file is
only what is true about CombatDen.

Source of truth for the real app: `/var/home/jm/Documents/CombatDen/codebase/MobileApp/`.

---

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
