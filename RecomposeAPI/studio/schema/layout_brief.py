"""LayoutBrief — the brief a mock app's layout was produced from.

A design is **two artifacts produced separately**, and each is written from
its own brief:

- the **assets** — palette, type, imagery, copy. Brief:
  ``schema/customization.py`` (``Customization``), a ``design_direction`` plus
  a ``colors_direction``. Consumed by the pipeline.
- the **layout** — the screens themselves, one folder per design under
  ``RecomposeJsxMockUps/src/apps/<id>/``. Brief: this model, written to
  ``layout_brief.yaml`` beside them.

The two are deliberately the same SHAPE — a name plus one `Direction` per
thing being directed — because they are the same kind of document about
opposite halves of one design. A reviewer holding both should not have to
translate between them.

**Why layout and motion are separate directions.** They are the two things a
redesign actually controls, and they fail differently: an arrangement can be
right while its animation is wrong, and a motion note buried in a paragraph
about spacing is a note nobody acts on. Splitting them also matches the
package's own rule that there is exactly one layout and one animation per
asset — no presets, no vocabularies to switch between, so each gets a
direction rather than an option set.

**Why this lives in ``RecomposeAPI/studio/`` and not in ``schema/``.** ``schema/``
holds the contracts the PIPELINE reads: ``app.yaml``, ``customization.yaml``,
the produced ``output.yaml``. Nothing in the pipeline reads a layout brief —
it never sees a screen. The studio is where briefs are authored and runs are
launched, which makes it the surface that produces one, and it is local-only
so nothing about this ships in the read API.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class Direction(BaseModel):
    """One directed dimension: the short line and the reasoning behind it.

    Mirrors ``DesignDirection`` / ``ColorsDirection`` minus the ``name``,
    which belongs to the brief as a whole rather than to each dimension of
    it — a layout and its motion are two aspects of one design, not two
    designs.
    """

    # ``str_strip_whitespace`` is what makes ``min_length=1`` mean what it
    # looks like. Length alone counts characters, so a field holding "   "
    # passes it — and a whitespace-only direction is exactly as useless as an
    # empty one. Stripping first also trims the trailing newline a folded YAML
    # block (``>-``) leaves behind, so the value is the prose and nothing else.
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    short_desc: str = Field(min_length=1)
    long_desc: str = Field(min_length=1)


class LayoutBrief(BaseModel):
    """One mock app's ``layout_brief.yaml``.

    ``extra="forbid"`` is what keeps this a BRIEF rather than a manifest. An
    earlier version carried the route list, the asset inventory and the
    authored device size; all of it duplicated what the TypeScript already
    declares, which makes a second source of truth that can only drift. The
    code says what a layout CONTAINS. This says what it IS, and why.
    """

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name: str = Field(min_length=1)
    layout_direction: Direction
    motion_direction: Direction
