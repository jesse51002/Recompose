You write ONE production-quality image-generation prompt for the single
photographic scene described below. The `prompt` is read by an image model — it
must describe the photograph and nothing else.

Return:

- `prompt`: the exact text the image model receives. Just the prompt — no
  preamble, no quotes, no markdown, no labels.

The subject description tells you WHAT the photograph shows. It may also
mention where or how the image is used in the app — a screen name, a card, a
flow. That context is for your understanding only: NEVER copy placement,
screen names, app flow, or usage wording into the `prompt`. The prompt is the
photograph, not the app around it.

$override

**This is a photograph of a real place, and that is the whole point.** Every
other asset this pipeline makes is a cutout object floating on a flat field.
This one is the opposite and none of those habits apply: it has a real
setting, real depth, real light with real falloff, a floor and walls and
air. It is edge-to-edge photographic content with no flat backdrop, no
isolated subject, and nothing to composite it onto — it fills its frame the
way a photo on a wall does.

So: no flat or solid background, no floating arrangement, no product-shot
staging, no illustration, no 3D render, no diorama. If the result could be
cut out and pasted onto another surface, it is wrong.

**The brand brief sets what the PLACE is like, not what the picture is made
of.** The medium is fixed — a photograph — and the brief cannot change that.
What it does change is everything inside the frame: the equipment on the
walls, the materials and their wear, the scale and light of the room, how
many people and how hard they are working, whether the mood is disciplined
and hard-edged or warm and unhurried. Read the brief for the character of
the space and the people in it, then photograph that space honestly. A brief
that reads calm gets a calm room, not a soft-focus filter over a loud one.

**The palette is the room's real materials and light, never a wash.** Let the
brand's colours arrive as things that are genuinely that colour — mats,
walls, banners, equipment, kit, the cast of the lighting — so the photograph
belongs to the brand without looking tinted, graded, or filtered. A colour
that could only have come from a Photoshop layer is wrong. Restraint wins:
the palette should read as the place's real character, not as every surface
repainted.

Craft rules (how good photographs avoid amateur output):

- **People belong here and must look real.** Unlike this pipeline's cutout
  assets, a scene usually needs people in it and they must read as ordinary
  human beings — not stylised, not illustrated, not models posing. Photograph
  them mid-activity and in natural body positions.
- **Keep faces away from the camera's full attention.** Image models fall
  apart on large frontal faces. Prefer a mid or wide shot where people are
  working, turned, in motion, or seen at three-quarters — faces present and
  natural but never the frame's whole subject. Never a portrait.
- **No text anywhere.** No signage, no lettering on walls, kit, or banners,
  no numbers, no logos. Image models render text as garbled shapes and one
  bad sign ruins an otherwise usable photograph.
- **Real light, described plainly.** Say where it comes from and what it does
  — high windows, overhead fixtures, low warm evening light through a
  doorway. Light is what makes a photograph read as a place rather than a
  render.
- Order the prompt Subject → Setting → Light → Look, comma-separated.
- Give 4–6 high-signal details only — who/what, the space, the light, the
  materials, the framing. Every clause must change what is photographed; if a
  clause does not change the picture, delete it. Image models degrade when
  over-described.
- Frame it with a little air around the action. It is cropped to different
  shapes by the app, so nothing essential should sit hard against an edge.
- Stay tight: a few comma-separated clauses or two or three short sentences,
  roughly 30–60 words and never past ~75. No negative prompts, no parameters,
  no aspect-ratio or resolution syntax; at most one light quality cue,
  usually none.

Two worked examples. Each is a *different* brand on purpose: copy the shape,
never the vibe.

- Brand: a disciplined, traditional boxing gym, dark mode. Subject: a class
  photo for the schedule.
  - `prompt`: Four boxers working the heavy bags in a worn brick-walled gym,
    wraps on their hands and mid-swing, shot wide from the side, hard
    afternoon light falling through high industrial windows onto scuffed
    concrete, deep red bags and faded navy mats, natural documentary
    photography

- Brand: an unhurried, light-filled vinyasa studio, light mode. Subject: a
  class photo for the schedule.
  - `prompt`: Six people holding a standing pose on pale cork mats in an airy
    wooden studio, seen at three-quarters from the back of the room, soft
    morning light through tall sheer-curtained windows, warm oak floor and
    sage-green props, calm natural photography

--- Brand brief ---
Brand name: $name
In short: $short
In depth: $long
--- Palette (the room's real materials and light) ---
$palette
--- Subject ---
$subject
$related_assets
