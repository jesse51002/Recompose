"""SessionRecord — one line of a session's append-only log, and the SSE frame.

A **session** is one design being made, start to approval: the interview, the
asset run, the layout brief, the layout agent. A **run** is one pipeline
launch. A session starts runs, so the two are separate and both are
independently watchable.

Same machinery as ``run_record.py`` and for the same reasons: one JSON object
per line in ``.studio/sessions/<session_id>.jsonl``, handed to every SSE
subscriber in the same order, replayed from index 0 on connect. **A log whose
last line is not ``SETTLED`` is a crashed session.**

WHY THE SERVER HOLDS THIS AT ALL. ``POST /brief-agent`` is deliberately
stateless — the browser keeps the transcript and posts it back each turn — and
that works when the only thing that speaks is the model. It cannot work here:
an asset run and a layout agent produce events for an hour with nobody asking,
and a page reloaded forty minutes in has to come back to the same conversation.
Only a server-held log can answer both.

**Per-node asset progress is deliberately NOT carried here.** A ``TASK`` record
names the ``run_id`` and the browser attaches to ``/runs/{id}/events`` — the
existing stream, its existing fold, its existing tests. Re-emitting
twenty-three nodes into a second stream would create two places that can
disagree about what one run is doing.
"""

from __future__ import annotations

import enum
from typing import Literal

from pydantic import BaseModel, ConfigDict

from schema import Customization
from RecomposeAPI.studio.schema.agent_output import AgentQuestion


class SessionRecordKind(str, enum.Enum):
    """Every line kind a session's log can carry."""

    OPENED = "opened"
    PHASE = "phase"
    SAID = "said"
    ASKED = "asked"
    PROPOSED = "proposed"
    TASK = "task"
    SPENT = "spent"
    SETTLED = "settled"


class SessionPhase(str, enum.Enum):
    """Where the design stands — the demo's own phase vocabulary.

    Carried as its own record kind rather than derived from what happened,
    because the header and the transcript must never be able to disagree about
    what the session is doing. One append, both surfaces.
    """

    BRIEF = "brief"
    GENERATING = "generating"
    # No LAYOUT_BRIEF between these two any more: the layout is not
    # interviewed for, so a run settling goes straight to DESIGNING.
    DESIGNING = "designing"
    VALIDATING = "validating"
    REVIEW = "review"
    APPROVED = "approved"


class SessionRecord(BaseModel):
    """One append-only line — and one SSE frame's payload.

    Every field but ``kind``/``index``/``at`` is optional because one model
    covers all seven kinds; one frame shape means a client needs only
    ``EventSource.onmessage``. Which kind carries what:

    - ``OPENED`` — ``session_id``, ``app_id``, ``design_name``
    - ``PHASE`` — ``phase``
    - ``SAID`` — ``who`` and ``text``
    - ``ASKED`` — ``question``
    - ``PROPOSED`` — ``brief``, awaiting an Accept
    - ``TASK`` — ``task``, ``task_state``, and then whichever of ``run_id`` /
      ``design_id`` / ``line`` / ``error`` that state carries
    - ``SPENT`` — ``cost_usd`` and what it was for (``spent_on``)
    - ``SETTLED`` — ``error`` on a failure

    ``index`` is the 0-based position in this session's stream, and also the
    SSE frame's ``id:``.
    """

    model_config = ConfigDict(extra="forbid")

    kind: SessionRecordKind
    index: int
    # UTC, ISO-8601 — readable in the log, orderable, and enough for a UI to
    # show when each step happened.
    at: str

    # --- OPENED ----------------------------------------------------------
    session_id: str | None = None
    app_id: str | None = None
    design_name: str | None = None

    # --- PHASE -----------------------------------------------------------
    phase: SessionPhase | None = None

    # --- SAID ------------------------------------------------------------
    who: Literal["agent", "you"] | None = None
    text: str | None = None

    # --- ASKED -----------------------------------------------------------
    question: AgentQuestion | None = None

    # --- PROPOSED --------------------------------------------------------
    brief: Customization | None = None

    # --- TASK ------------------------------------------------------------
    task: Literal["assets", "layout"] | None = None
    task_state: Literal["started", "progress", "finished", "failed"] | None = None
    # The pipeline run to attach `/runs/{id}/events` to. Assets only.
    run_id: str | None = None
    # The mock app folder the layout agent is writing to. Layout only.
    design_id: str | None = None

    # --- SPENT -----------------------------------------------------------
    #
    # WHAT THIS DESIGN COST, recorded as it is spent rather than totalled at
    # the end. A record rather than a running field because the JSONL is the
    # durable truth: a session rebuilt from its log has to report the same
    # number as one that was watched live, and a total held only in memory
    # would come back as zero after a restart.
    #
    # Money is the one thing here that cannot be re-derived later. A node's
    # state can be read off the artifact and a transcript off the records,
    # but nothing on disk remembers what a conversation cost once the
    # process that had the token counts is gone.
    cost_usd: float | None = None
    # Which half of the work spent it. The interview and the pipeline bill
    # separately and at wildly different rates, so one total that could not
    # be broken down would hide which half to worry about.
    spent_on: Literal["agent", "assets"] | None = None
    # Token counts behind an `agent` cost, kept so a price that turns out to
    # be wrong can be recomputed from the log instead of being lost with it.
    input_tokens: int | None = None
    output_tokens: int | None = None
    cache_read_tokens: int | None = None
    cache_write_tokens: int | None = None
    # One line of the layout agent's stdout. Its work is invisible otherwise,
    # so a silent subprocess and a hung one would look identical.
    line: str | None = None

    # --- TASK (failed) and SETTLED ---------------------------------------
    error: str | None = None

    @property
    def terminal(self) -> bool:
        """Whether this record ends the stream (nothing follows it)."""
        return self.kind is SessionRecordKind.SETTLED
