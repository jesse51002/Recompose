---
name: mockup-qa
description: Exhaustively QA a mock asset in a live browser — screenshot every screen, click every transition, prove no screen is a dead end, and check every rendered screen against the app's inventory. Use after editing a mock, after a design agent produces a redesign, before shipping a mock to a tenant, or whenever asked to test, verify, check or sign off the mockups. This is a full sweep, not a smoke test: every screen, every route, every affordance, every time.
---

# Mock asset QA — the full sweep

**This is an exhaustive test, and partial runs are worse than none.** A sweep
that checked four of eleven screens and reported "looks good" is how a mock
ships with a dead end in it. If you cannot finish, say which screens you did not
reach — never round up to "verified".

Load the app's own skill first (e.g. `mockup-redesign-combatden`). **Its
inventory is the checklist**: every screen, everything each must contain, and
every transition. QA is checking the render against that list. Without it you
are looking at screens and guessing.

---

## Why this exists

`make -C RecomposeJsxMockUps check` proves typecheck, lint and tests. **It
proves nothing about what renders.** Every failure that has shipped in this
package passed it:

- a screen tree rendering with **no design tokens at all**,
- an **invented token name** voiding a whole CSS declaration,
- a **rendered button with no handler**,
- a **`pointer-events: none`** making the only exit unclickable,
- a screen with **no way off it**.

A successful build and an HTTP 200 also prove nothing — both were true while
every screen rendered unstyled. Only pixels and clicks find these.

---

## Setup

```bash
make -C RecomposeJsxMockUps dev &     # :8081, no backend needed
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B viewport 1280x900
$B goto http://localhost:8081/
```

`?asset=<id>` deep-links each asset.

**Re-snapshot after every navigation.** `browse` refs (`@e3`) are captured at
the last snapshot and go stale the moment a route changes. Clicking a stale ref
silently hits the wrong element and reads exactly like a broken handler — this
has already caused a false "the button does nothing" finding.

```bash
# the safe click: resolve the ref fresh, every time
step() { ref=$($B snapshot -i | grep -v UNTRUSTED | grep -m1 "\"$1" |
  sed -E 's/^ *(@[ec][0-9]+).*/\1/'); [ -n "$ref" ] && $B click "$ref"; sleep 2; }
```

---

## Pass 1 — every screen renders, and renders *styled*

For **every route in every asset**: navigate to it, screenshot it, and **Read
the PNG**. Looking at the image is the test; a saved file you did not open is
not evidence.

```bash
$B screenshot /tmp/qa-<asset>-<route>.png
```

On each, check:

- **Is it themed at all?** Unstyled is the loudest failure and the easiest to
  mistake for bad layout: browser-default type (serif, wrong sizes), every gap
  collapsed, and images at natural resolution — a 1024px icon filling the phone.
  That is a missing token root, not a broken layout.
- **The render matches the inventory exactly — nothing missing, nothing extra.**
  Go item by item in both directions. A missing region is what a redesign drops
  silently; an element on screen that is NOT in the inventory is a feature
  someone added, which breaks the arrangement-only invariant just as badly and
  is far easier to wave through because it usually looks like an improvement.
  Flag both.

  **Presence, not prominence.** The inventory says what must be *there*, never
  how big or how emphasised. A screen that makes one class a hero card and the
  rest compact rows still matches its inventory — every class is present. Do
  not report a hierarchy change as a finding; that is the redesign working.
- Nothing clipped at the phone edge, nothing overlapping, no text at a default
  font, no image at an obviously wrong size.

Also, once per asset:

```bash
$B console --errors
```

---

## Pass 2 — every affordance is actually hittable

A button can be visible, correctly labelled, and unclickable. Check the ones
that matter — every CTA and every sole exit — with a real hit test:

```bash
$B js "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='LABEL');
if(!b) return 'MISSING'; const r=b.getBoundingClientRect();
const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
return (b.contains(top)||top===b)?'hittable':'BLOCKED by '+top.tagName+'.'+top.className})()"
```

`BLOCKED` means a click will never reach it. Causes seen here: a
`pointer-events: none` that outlived its reason, and an overlay that was fine
until a screen gained a real control.

**A CTA that is legitimately hidden while a card animates will read as blocked.**
That is correct behaviour, not a defect — re-check after the entrance finishes,
and confirm tapping the card skips to settled.

---

## Pass 3 — every transition, in both directions

Walk the app's transition table. For each row: perform the trigger, confirm you
land on the stated screen, and confirm the history behaved (push leaves a way
back; reset does not).

Also check that **an asset shown on two screens is the SAME asset**. Open a
class from the schedule and compare its banner to the row's thumbnail; compare
a reward on the store to the same reward in the celebration carousel. A picture
that changes between two screens showing one thing means one consumer was
tokenised and another was not — it errors nowhere and is invisible to every
gate but this one.

Also check **reachability**, which is where a hierarchy change can go wrong
without adding or removing anything: every destination a member could reach
before must still be reachable, in the same number of taps or fewer. A
rearrangement that buries a destination has removed it in practice, and the
inventory check will not catch that on its own.

Then walk the flows end to end:

- Root → every nav destination, confirming the nav survives each.
- Root → a pushed detail → **back** → root.
- The full reserve/booking-style chain, ending back at root.
- Every card of every celebration flow, confirming the last one **wraps to the
  first**.

---

## Pass 4 — the dead-end sweep (the one that must not be skipped)

**For every screen, name its exit and then use it.** Not "there is a button" —
click it and confirm you moved.

A screen fails this pass if any of these is true:

- it has no exit affordance at all,
- its only affordance has no handler (the click does nothing),
- its only affordance is `BLOCKED` from Pass 2,
- it is the last screen of a flow and does not return to that flow's root.

Pay special attention to screens with **no bottom nav** — their single
affordance is load-bearing, and both dead ends found in this package so far were
exactly that shape.

---

## Pass 5 — states and edges

- **Reduced motion.** Entrances must not be the only thing that makes content
  appear. `$B js "matchMedia('(prefers-reduced-motion: reduce)')"` will not
  change the setting; check the CSS has a `prefers-reduced-motion` branch and
  that settle callbacks still fire (a card that only settles on a timer strands
  a reduced-motion user).
- **Scaling.** `$B viewport 600x500` then `1600x1200`: the asset must scale
  uniformly with no reflow and no distortion. Content re-wrapping means
  something is sized in percentages instead of the authored pixels.
- **Re-entry.** Switch assets and come back — each should open on its initial
  route with fresh state, not resume mid-flow.

---

## When a themed image will not change — the checklist

"The new images do not show" was diagnosed four separate ways in one session,
and only one of them was the mockup's fault. Work down this list before
touching a component; every rung has actually been the cause.

1. **Is the API pointing at a CDN?** `RecomposeAPI/config.py`'s
   `assets_cdn_base_url` used to default to a prod CDN whose deploy plumbing was
   dropped, so the API handed clients absolute URLs for bytes nothing uploads
   any more. They 404, and every client correctly falls back to its bundled
   asset — which looks exactly like the wiring being broken. It now defaults to
   empty (serve off disk); if you ever see a `cdn.` URL in the DOM and the image
   is the old one, this is why.
2. **Does the run actually have the slot?** `curl
   localhost:8001/apps/<app>/<Run> | jq '.image_set.images | keys'`. A run
   generated before a slot existed simply does not have it. `scripts/prefill`
   seeds them; nothing else will.
3. **Is the API serving the right catalogue?** From a git worktree, produced
   runs are gitignored (`apps/*/*/`) so a fresh worktree has NONE and every
   styles request 404s. `setup_worktree_env.sh` at the root checkout symlinks
   them in. A 404 here is missing data, not a broken route.
4. **Is the component wired — and is it PASSED the slot?** An optional
   `themeSlot` prop that no caller passes typechecks, lints and passes every
   test while silently taking the untokenised path. Grep the callers, not just
   the component (Guardrail 7).

Only after all four does it make sense to suspect the resolver.

## The check that catches what a slot-by-slot sweep cannot

**Load a theme from a category the mock is NOT already showing, and read the
whole screen.** Every rung above asks "did this slot resolve?", and a screen can
answer yes for all of them and still be nonsense.

That is not hypothetical. A yoga theme once rendered correct yoga class names
over correct yoga photographs — and a boxing video feed, hero captioned "Nick
Drossos Defensive Tactics ‧ 3.8M views". Nothing was un-themed. The demo content
that is *not* generated — the per-category constants — was pinned to the default
group because the host never passed the run's own `category` down, and no
per-slot check can see it, because every slot was right.

So, per app, with a theme loaded:

- Switch to a theme whose `category` differs from the default group. Fighting is
  CombatDen's default, so a Yoga or Pilates run is the useful one.
- Read the screen as a person, not as a slot list. Do the names, the imagery,
  the channel names, the genre tabs and the copy all describe **one business**?
- Any single element still describing the old category is the finding. Report
  what it was and what everything around it said, because "one card is wrong" and
  "the content source never moved" look identical on one screen and are not the
  same bug.

## Reporting

State the scope you actually covered: **N screens of M, across K assets.**

For each finding: the screen, what is wrong, the evidence (screenshot path,
`BLOCKED by …`, console error), and whether it is a **dead end** (blocking), a
**missing element**, an **added element** (both break the invariant), or
**cosmetic**.

Then say plainly, in these words if they are true:

> Every screen renders styled. Every screen exits. Every flow returns to its
> root. Every screen matches its inventory — nothing missing, nothing added.

If any of the three is not true, do not write the sentence. **Do not report a
partial sweep as a pass** — name the screens you did not reach.

Use `/design-review` on the running harness for visual polish once this passes;
these two answer different questions and neither substitutes for the other.

---

## Living document

When a new class of failure is found here, add it to Pass 1–5 **and** to
`mockup-redesign-general`'s guardrails in the same change — QA finding a bug
twice means the guardrail that would have prevented it was never written down.
