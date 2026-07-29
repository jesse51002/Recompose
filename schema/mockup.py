"""MockupSpec — the shape of a mock app's `mockup.yaml`.

A design is **two artifacts produced separately**, and until this file only
one of them was described by a schema:

- the **assets** — palette, type, imagery and copy. A pipeline run: its
  ``customization.yaml`` brief (``schema/customization.py``) and the
  ``output.yaml`` it resolves to.
- the **layout** — the screens themselves, one folder per design under
  ``RecomposeJsxMockUps/src/apps/<id>/``. Described by ``mockup.yaml``, which
  this model is the contract for.

**Three fields, deliberately the same three as ``DesignDirection``.** The two
answer the same question about opposite halves of one design, so they read
alike on purpose — a reviewer holding a brief and a layout spec side by side
should not have to translate between them.

They are separate models rather than one shared one because they describe
different artifacts with different lifecycles: a brief is an *input* a human
edits before a run, a mockup spec is a *description* of a layout an agent
produced. Either is free to gain a field the other should not have, and
inheritance would make that a silent change rather than a decision.

``extra="forbid"`` is what actually enforces "three fields and no more". The
first version of this file carried a route list, an asset inventory and the
authored device size; all of it duplicated what the TypeScript already
declares, which makes it a second source of truth that can only ever drift.
The code says what a layout CONTAINS. This says what it IS.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, field_validator


class MockupSpec(BaseModel):
    """One mock app's `mockup.yaml`: what this layout is, in prose."""

    model_config = ConfigDict(extra="forbid")

    name: str
    short_desc: str
    long_desc: str

    @field_validator("name", "short_desc", "long_desc")
    @classmethod
    def _non_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("field must be non-empty")
        return v
