"""LayoutBrief — the instruction handed to the layout/animation agent.

A design is two artifacts made separately, and each half has an INPUT and a
RESULT:

===========  ==========================  ============================
half         input                       result
===========  ==========================  ============================
assets       ``customization.yaml``      ``output.yaml``
layout       ``layout_brief.yaml``       the folder itself
===========  ==========================  ============================

This is the layout half's input — what a person asked for, before anything
exists. It is deliberately not the same thing as a description of what came
out, and the two must not be collapsed: an input is edited by a human before
the work, a description is written after it, and either is free to gain a
field the other should not have.

**Both directions are ``{short_desc, long_desc}`` and nothing else**, the same
shape as a brief's ``design_direction``, so one ``Direction`` serves both and a
reviewer holding a brand brief and a layout brief side by side does not have to
translate between them.

Local only. It lives here rather than in the top-level ``schema/`` package
because ``RecomposeAPI`` never serves it and ``schema/`` is what ships.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, field_validator


class Direction(BaseModel):
    """One direction: a line, and the prose behind it.

    Free prose rather than an enumerated vocabulary, and that is load-bearing
    rather than lazy. A ``density: generous | balanced | dense`` field would be
    a bounded option set, and bounded option sets are precisely what structural
    presets were built, tested and rejected for — they reproduce the platform's
    existing design language, which is a reskin. Encoding the vocabulary here
    would rebuild the thing that was deliberately removed, one field at a time.
    """

    model_config = ConfigDict(extra="forbid")

    short_desc: str = Field(min_length=1)
    long_desc: str = Field(min_length=1)

    @field_validator("short_desc", "long_desc")
    @classmethod
    def _non_empty(cls, value: str) -> str:
        """Whitespace is not a description. ``min_length`` alone would accept
        a single space, which reads as filled in and is not."""
        if not value.strip():
            raise ValueError("field must be non-empty")
        return value


class LayoutBrief(BaseModel):
    """One named layout generation.

    ``name`` sits above the directions rather than inside one: it names the
    GENERATION, not its layout half. It is also what makes a second attempt
    possible — one brand brief and one settled asset run can carry several of
    these, each its own folder, all visible at once. Comparing two arrangements
    of the same brand is the point, and naming is the whole cost of it.

    ``theme_run`` is the run this arranges *against*. The agent designs on top
    of a palette, typography and imagery that already exist, so recording which
    ones is the difference between a reproducible generation and a folder whose
    provenance has to be guessed.
    """

    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=1)
    app: str = Field(min_length=1)
    theme_run: str = Field(min_length=1)

    layout_direction: Direction
    motion_direction: Direction

    @field_validator("name", "app", "theme_run")
    @classmethod
    def _non_empty(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("field must be non-empty")
        return value
