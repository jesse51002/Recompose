---
name: mockup-qa
description: Exhaustively QA a mock asset in a live browser — screenshot every screen, click every transition, prove no screen is a dead end, and check every rendered screen against the app's inventory. Use after editing a mock, after a design agent produces a redesign, before shipping a mock to a tenant, or whenever asked to test, verify, check or sign off the mockups. This is a full sweep, not a smoke test: every screen, every route, every affordance, every time. Run `/code-review low` over the diff before opening a browser, then run this sweep in ONE serial session — browse is a single shared Chromium and parallel agents navigate out from under each other.
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

`?app=<id>&asset=<id>` deep-links straight to an asset.

**Re-snapshot after every navigation.** `browse` refs (`@e3`) are captured at
the last snapshot and go stale the moment a route changes. Clicking a stale ref
silently hits the wrong element and reads exactly like a broken handler — this
has already caused a false "the button does nothing" finding.

```bash
# the safe click: resolve the ref fresh, every time
step() { ref=$($B snapshot -i | grep -v UNTRUSTED | grep -m1 "\"$1" |
  sed -E 's/^ *(@[ec][0-9]+).*/\1/'); [ -n "$ref" ] && $B click "$ref"; sleep 2; }
```

## Run a code review FIRST, and do NOT parallelise the sweep

**Before opening a browser, run `/code-review low` over the diff.** It is
static, needs no browser, and catches the whole class of defects a reader can
see — a dangling import, a handler that was never wired, a class name that does
not exist, a prop no caller passes. Every one of those found here is one you are
not chasing through a browser afterwards, and browser time is the expensive
part.

**Then run this sweep in ONE session, serially.** Do not fan it out — with one
exception, below.

**The one thing to run in parallel: Pass 2d, the spacing audit.** Start it as a
subagent at the same moment you start the code review. It reads stylesheets and
measures a static DOM without navigating, so it does not move the browser out
from under you, and it is slow-ish work that would otherwise sit in the critical
path. Everything else — every pass that clicks, navigates or advances a flow —
stays in this session and stays serial.

`browse` is a single shared headless Chromium. Two agents driving it at once
navigate out from under each other: refs captured by one go stale the moment
the other changes route, screenshots come back showing somebody else's screen,
and every finding has to be re-validated before you can believe it. The
parallelism buys nothing because the browser is the bottleneck and there is
only one of it.

The build parallelises — the sweep does not. Fan out screens while you are
*writing* them (see `mockup-redesign-start`); walk them one at a time.

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

  **Presence, not form.** The inventory says what must be *there*, never how
  big, what shape, what order or how emphasised. One class as a hero card with
  the rest compact still matches — every class is present. A square thumbnail
  where the base had a wide one still matches. Do not report a hierarchy or
  proportion change as a finding; that is the redesign working. If an inventory
  line pins a form, the inventory is wrong — fix it there rather than holding a
  redesign to it.
- Nothing clipped at the phone edge, nothing overlapping, no text at a default
  font, no image at an obviously wrong size.
- **DOES THE SPACING LOOK GOOD?** Ask this of every screenshot, explicitly, and
  do not treat it as polish to defer — spacing is one of the most important
  parts of design, and it is the thing that most reliably separates a screen
  that looks designed from one that looks assembled. Three questions per
  screenshot:
  - Is anything **jammed** — text against a rule, a label against a stripe, a
    row against the screen edge?
  - Is anything **adrift** — a gap so large the element looks orphaned from what
    it belongs to?
  - Do things that belong together **look** like they belong together, before
    you read a single word?

  If a screen looks cramped, it is cramped. Trust that reading and go measure it
  with Pass 2d rather than talking yourself out of it — every spacing bug found
  in this package was visible in a screenshot before it was ever measured.

Also, once per asset:

```bash
$B console --errors
```

---

## Pass 1b — every element is somewhere it MEANS something

**The inventory check is necessary and not sufficient.** It asks "is this
element present?" in both directions, and a screen can answer yes for every row
and still be wrong, because *present* is not the same as *placed*. Two shapes,
both of which pass Pass 1 cleanly:

**Orphaned by relocation.** A redesign moves an element rather than dropping it
— correct, the invariant demands it — and then parks it somewhere it says
nothing. The tell is a region whose entire content is one relocated item, with
no relationship to the lane above or below it. It reads as an element in
storage rather than an element on a screen, and it is usually the last thing in
the scroll because that is where there was room.

Found and fixed in `apps/milemarker/`: the store ended with a lane labelled
"YOUR RANK" containing a single rank medallion and nothing else. The base
carries that badge in its topbar, so dropping it would break the invariant — but
a section of its own at the foot of a shop is not where it means anything. It
now sits beside the balance, which is the pairing the base actually has.
**Preserving an element is the floor. Placing it is the job.**

**The same fact, twice.** A redesign that re-emphasises freely (which it should)
can easily state one value in two places without noticing, because each
placement was decided separately and both look reasonable alone. Same package:
profile rendered the same remaining-classes count as "7 TO GO" beside the
progress label and again as "7 more classes" one lane below. Neither was wrong;
together they were noise, and a reader assumes two different numbers were meant.
The cause was structural — one region of the base had been split into two lanes
— so the fix was to merge them back, not to delete a line.

How to check, per screen — this one is READING, not tooling:

- For each region, ask **why is this here rather than three lanes up?** If the
  only answer is "it had to go somewhere", that is the finding.
- List every FIGURE on the screen. Any value appearing twice is either a
  deliberate echo you can justify in one sentence, or a duplicate.
- Ask whether a member would read the screen as one thing with a structure, or
  as a correct list of parts.

**A duplicate is not always a defect — but it must be justifiable in one
sentence.** The same screen legitimately keeps the rank target as a figure AND
as the rating graph's y-axis maximum, because one is the member's target and the
other is the plot's scale, and a plot without its scale is unreadable. Write the
justification down next to the code; an unexplained echo will be re-litigated by
every later sweep.

Report these as **misplaced element** — distinct from missing and from added,
because the fix is different: nothing is removed and nothing is introduced, the
arrangement is corrected. It is also the one finding class that a redesign is
MORE likely to produce than the base, precisely because it moved things on
purpose.



---

## Pass 1c — the most important thing LOOKS the most important

**The inventory check asks whether elements are PRESENT. This asks whether the
right one is PROMINENT**, and a screen can pass every other pass in this file
while failing here — every element rendered, correctly themed, correctly spaced,
nothing clipped, and the biggest thing on the screen is the least important
thing on it.

The app's own skill carries an **EMPHASIS RANKING**, one row per screen: what
leads, what follows, what supports. Check the render against it, screen by
screen. A fork may express the ranking any way it likes; it may not reorder it.

**The test is one second long.** Look at the screenshot for a beat and look
away. *What did you see first?* If that is not the screen's rank 1, the
hierarchy is inverted, however good each individual choice was. Squinting works
too — it collapses the screen to contrast and mass, which is what the eye
actually sorts on.

Then measure the thing you suspect, because "it looks fine" is exactly what was
said about the case below:

```bash
$B js "(()=>{const s=document.querySelector('[class*=_screen_]');const out=[];
s.querySelectorAll('*').forEach(e=>{const t=[...e.childNodes].filter(n=>n.nodeType===3)
  .map(n=>n.textContent.trim()).join('');if(!t||t.length>40)return;
const c=getComputedStyle(e);const px=parseFloat(c.fontSize);if(px<15)return;
out.push(Math.round(px)+'px '+c.fontWeight+'  '+t.slice(0,28));});
return JSON.stringify([...new Set(out)].sort((a,b)=>parseFloat(b)-parseFloat(a)).slice(0,12));})()"
```

**Read the top of that list against the ranking.** The largest type on the
screen should be its rank 1. It is a finding whenever a supporting element — a
time, a count, a total, a cost — is set larger than the name of the thing it
describes.

**A NAME AND ITS PICTURE ARE ONE OBJECT AT RANK 1.** The pipeline generates the
image FROM the copy (`depends_on_text`), so they are one claim about one thing.
The failure to look for is not "the photograph is too big" — it is **"the name
is too small for the photograph it belongs to."**

This pass exists because `apps/vinyasaflow/` shipped a schedule with the start
time at 40px above a class name at 17px. The loudest element on the screen a
member opens to choose a class was the clock. `make check` passed, the token
sweep passed, the inventory check passed, and nothing in this file caught it
until it was added.

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

## Pass 2b — nothing overflows the screen, and centred things are centred

An element wider than the phone does not clip or wrap — it runs off the right
edge, and everything inside it stops being centred. It reads as "the layout is
slightly off" rather than as a broken box, so it survives review easily.

Run this on **every** screen. It compares each direct descendant of the asset
root against the phone frame and reports anything hanging over an edge or
sitting off-centre:

```bash
$B js "(()=>{const st=document.querySelector('[class*=phone]').getBoundingClientRect();
const bad=[];
document.querySelectorAll('[class*=topbar],[class*=nav],header,footer,[class*=screen]>*').forEach(e=>{
  const r=e.getBoundingClientRect(); if(r.width<40) return;
  const L=Math.round(r.left-st.left), R=Math.round(st.right-r.right);
  if(L<-1||R<-1||Math.abs(L-R)>2) bad.push({cls:e.className.slice(0,32),L,R});});
return JSON.stringify(bad.slice(0,10));})()"
```

A negative `L` or `R` is an overflow. `L` and `R` that differ on something meant
to be full-width or centred is the same bug seen from the other side.

**The cause is almost always `box-sizing`.** This package has **no global
`border-box` reset**, so a rule like `width: 100%` (or a literal `390px`) plus
horizontal padding computes *wider than its parent* — silently, and by exactly
twice the padding. Widening a gutter is therefore enough to turn an invisible
1px overhang into an obvious one.

Two places this is live today: the topbar overflows on both the base and its
forks (the base by 4px at 8px padding, a fork by 33px at 24px), and
`celebrations/CelebrationFrame.module.css` has the same shape wherever a layout
other than `centerHero` is selected. Fix it at the element with
`box-sizing: border-box`, and check its siblings — one file with the bug usually
means the whole surface was written the same way.

---

## Pass 2c — no photograph is in a box of the wrong ratio

**This is the easiest way in the whole package to make a screen look terrible,
and it passes every other check.** The layout is fine, the tokens are fine,
nothing overflows, nothing is a dead end — and the pictures are ruined.

A photograph arrives ALREADY COMPOSED. A 16:9 video still has its title burnt
into the top third and its subject framed against the edges; a 3:2 class
photograph is cropped by whoever shot it. Put one in a box of a different ratio
and `object-fit: cover` does not resize it, it **throws part of it away** —
silently, with no error and no visual cue that anything is missing. Mask that
box to a circle and the corners go too.

The numbers are not marginal. Cropping 16:9 to 1:1 discards **44% of the
width**; a circular mask on top of that leaves barely half the original frame,
centre-weighted. It renders as unreadable fragments of burnt-in text — real
output from this package: `ENDARY`, `KING`, `1-6 D`.

Run this on every screen carrying imagery:

```bash
$B js "(()=>{const bad=[];document.querySelectorAll('img').forEach(i=>{
if(!i.naturalWidth) return; const r=i.getBoundingClientRect(); if(r.width<24) return;
const nat=i.naturalWidth/i.naturalHeight, box=r.width/r.height;
const fit=getComputedStyle(i).objectFit;
if(fit==='cover' && Math.abs(nat-box)/nat > 0.12)
  bad.push(i.src.split('/').pop().slice(0,24)+' nat='+nat.toFixed(2)+' box='+box.toFixed(2)+
    ' losing '+Math.round(100*(1-Math.min(nat,box)/Math.max(nat,box)))+'%');});
return bad.length?JSON.stringify(bad.slice(0,8)):'every image is in a box of its own ratio'})()"
```

A hit is not automatically a bug — a deliberate tight crop of a photograph that
carries no edge detail can be right. It IS a bug whenever:

- the source has **burnt-in text or graphics** (video stills almost always do),
- the box is **circular**, which crops twice, or
- the loss is **over ~20%** and nobody decided that on purpose.

**The fix is not a different `object-fit`.** `contain` letterboxes, which
usually looks worse. Give the picture a box of **its own ratio** and solve the
layout around it.

**Know which of your images are photographs and which are cut-outs**, because
the honest treatments differ and the ratios tell you which is which. In this
package the generated marks — roundel, medallion, struck coins, streak glyph —
measure **0.99-1.00** and are transparent-edged and centre-weighted, so a circle
costs them nothing. Every generated photograph measures **1.50 or 1.78**. If a
design has a rule like "everything is a disc", that rule will eat the
photographs; the rule has to be conditioned on what the art is, and that belongs
in the fork's `layout_brief.yaml`, not in the CSS.

This shipped once, in `apps/milemarker/`: the brief said "full-bleed or a disc,
never an inset rectangle" as an absolute, and every 1280x720 shelf thumbnail
went into a 1:1 disc. The guardrail existed and was read; the DIRECTION
contradicted it, which is why the fix went to the brief first and the components
second.

---

## Pass 2d — spacing: is there any, is it consistent, does it group

**Run this as a SUBAGENT, in parallel with the code review.** It is the one part
of QA that parallelises: it reads stylesheets and measures a static DOM, it
changes no route, and it therefore does not fight the shared browser the way a
second navigating agent would. Start it when you start `/code-review low` and
collect both before you begin the walk-through.

Spacing is where a redesign quietly stops looking designed, and it fails in
three distinct ways. Check all three — they have different causes and different
fixes.

**1. Is there any?** A region with no padding or gap at all reads as broken
rather than as tight. The usual cause is a container that was given `flush` /
`bleed` / `padding: 0` for one good reason (its child runs to the edge) and then
gained a second child that needed the padding after all.

```bash
$B js "(()=>{const s=document.querySelector('[class*=_screen_]');const bad=[];
s.querySelectorAll('*').forEach(e=>{const c=getComputedStyle(e);const r=e.getBoundingClientRect();
if(r.height<12||r.width<40) return;
const kids=[...e.children].filter(k=>k.getBoundingClientRect().height>4);
if(kids.length<2) return;
const pad=parseFloat(c.paddingTop)+parseFloat(c.paddingBottom);
const gap=c.rowGap==='normal'?0:parseFloat(c.rowGap)||0;
if(pad===0&&gap===0&&c.display.includes('flex'))
  bad.push(String(e.className).slice(0,34)+' kids='+kids.length+' pad=0 gap=0');});
return bad.length?JSON.stringify([...new Set(bad)].slice(0,8)):'no zero-spacing containers'})()"
```

**This one produces false positives by design — it is a prompt to look, not a
verdict.** Two shapes are correct and will be flagged every time:

- a container whose CHILDREN each bring their own padding (a bleed lane holding
  rows, for instance) legitimately has none of its own;
- a deliberately tight pair — a figure and the unit label directly under it — is
  ONE object, and zero gap is what makes it read as one. That is rule 3 working,
  not rule 1 failing.

Confirm against the screenshot before changing anything.

**2. Is it consistent across similar places?** The same control on two screens
must carry the same spacing. This is the failure that actually shipped here: the
store's tab cells had **no** inline padding and the video library's had **16px**
— identical control, two stylesheets, nobody decided. Collect every value in use
and look at the shape of the list:

```bash
$B js "(()=>{const s=document.querySelector('[class*=_screen_]');const v={};
s.querySelectorAll('*').forEach(e=>{const c=getComputedStyle(e);
[['padT',c.paddingTop],['padX',c.paddingLeft],['gap',c.rowGap==='normal'?'0px':c.rowGap]]
 .forEach(([k,x])=>{if(x&&x!=='0px'){const key=k+':'+x;v[key]=(v[key]||0)+1;}});});
return JSON.stringify(Object.entries(v).sort((a,b)=>b[1]-a[1]))})()"
```

**A healthy app shows a SHORT list with tall counts** — a handful of values, each
used many times. A long tail of one-off values (`13px`, `18px`, `22px`) means
numbers were typed at call sites instead of taken from the scale. Every value
should be traceable to a `--sc-*` token.

**When two places disagree, prefer extracting the shared component over syncing
the numbers.** Syncing fixes today; the two copies drift again the next time
either is touched. The tab rows above were fixed by giving the app ONE `TabRow`,
not by copying `16px` across.

**MEASURE FROM THE TEXT, NOT FROM THE BOX.** This trap was hit twice in one
session and produced two confidently wrong readings, one of which nearly sent a
correct fix into reverse.

`element.getBoundingClientRect()` returns the **border box**, which INCLUDES the
element's own padding. So measuring `label.top - container.top` tells you where
the label's *box* starts, not where its *text* starts — and if the padding you
just added lives inside that box, the number does not move and the fix looks
like it did nothing. The reading said `2px` before a fix and `3px` after; the
real gaps were 2px and 31px.

Measure between the two things a reader actually sees — the deepest text nodes —
and divide by the stage's scale, because the phone is scaled to fit:

```bash
$B js "(()=>{const s=document.querySelector('[class*=_screen_]');
const sc=390/s.getBoundingClientRect().width;              // undo the stage scale
const a=s.querySelector('SELECTOR_ABOVE').getBoundingClientRect();
const b=s.querySelector('SELECTOR_BELOW').getBoundingClientRect();
return Math.round((b.top-a.bottom)*sc)+'px between them (authored)';})()"
```

Two corollaries worth keeping: a gap you measured in raw viewport pixels is
**not** the authored value unless you divided by the scale, and a `0px` gap
between two boxes can still be a comfortable gap on screen if one of them has
inner padding. Always sanity-check the number against the screenshot.

**WHEN IN DOUBT, MORE GAP.** If you cannot decide between two values, take the
larger one. Cramped is a defect a reader feels immediately and attributes to the
product being cheap; slightly loose is at worst a missed opportunity, and on a
390pt screen it usually reads as calm rather than empty. Almost every spacing
finding in this package has been "not enough", and none has been "too much".

**3. Does the spacing GROUP?** This is the half no script can check, and it is
the half that decides whether a screen reads. **Related things sit closer
together than unrelated things.** A label and the figure it names are one object
and should be nearer to each other than either is to the next region. When every
gap on a screen is the same value, nothing is grouped and the screen reads as a
list of parts — which is a spacing failure even though every individual value is
"consistent".

Screenshot each screen and ask, per region:

- Does the gap between a label and its value look SMALLER than the gap to the
  next region? If they are equal, the hierarchy is not being carried.
- Is anything closer to a thing it is not related to than to the thing it is?
  That is the one that actively misleads.
- Does a region have breathing room from the edge above it, or is it jammed
  against a rule or a horizon?

Report as **spacing** findings, and say which of the three it is — missing,
inconsistent, or ungrouped — because the fix differs each time.

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
- **its handler runs and is a NO-OP**, which looks identical to the line above
  from the outside and is not identical at all — see below,
- its only affordance is `BLOCKED` from Pass 2,
- it is the last screen of a flow and does not return to that flow's root.

**Confirm the move, never the click.** A handler that fires and changes nothing
passes every check that stops at "did the button respond": the hit test says
`hittable`, no console error appears, and the DOM under the cursor is the button
you wanted. Always read the route (or the screen) BEFORE and AFTER and assert it
changed.

That is not hypothetical. `nav.reset()` took its fallback from the route the
stage OPENED on rather than the asset's declared root, and `dev/DevHarness.tsx`
hands the remembered route back so a reload lands where you were — so once you
were on `booking`, `reset()` resolved to `booking`. Booking's Continue is that
screen's only exit (it carries no bottom nav), and it did nothing, **on every app
in the package at once**. It typechecked, linted, passed the whole suite, and
only a before/after route comparison found it. `src/kit/__tests__/mockNav.test.tsx`
now pins it.

**When a finding reproduces on every app, suspect `src/kit/` or `dev/`, not the
fork.** Check one other app before writing it up as a redesign's regression —
that one comparison is what separates "this fork broke it" from "this was always
broken", and the two have completely different owners.

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
**missing element**, an **added element** (both break the invariant), a
**misplaced element** (present but meaningless where it landed — Pass 1b), an
**inverted hierarchy** (the wrong thing leads the screen — Pass 1c), a
**mangled image** (a photograph in a box of the wrong ratio — Pass 2c), a
**spacing** finding (missing, inconsistent, or ungrouped — Pass 2d), or
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
