"""SessionSnapshot — the whole state of one session, as a single response.

The poll fallback, and the shape ``GET /sessions/active`` returns so a page
that loads fresh can re-attach instead of offering to start a second session.
Exactly the same records the stream carries, so the two can never disagree —
one builds the other's list in one shot.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict

from Backend.studio.schema.run_status import RunStatus
from Backend.studio.schema.session_record import SessionPhase, SessionRecord


class SessionSnapshot(BaseModel):
    """One session's identity, where it stands, and its records so far."""

    model_config = ConfigDict(extra="forbid")

    session_id: str
    app_id: str
    design_name: str | None = None
    # WHAT THIS DESIGN HAS COST SO FAR, in USD, split by which half spent it.
    # The interview and the pipeline bill at wildly different rates, so one
    # undifferentiated total would hide which half to worry about.
    #
    # Neither includes the LAYOUT agent: it runs on the operator's own CLI
    # credentials and reports nothing back, so counting it would mean
    # inventing a number. Absent and explained beats confidently wrong.
    agent_cost_usd: float = 0.0
    assets_cost_usd: float = 0.0
    # Reused rather than redefined: a session is running, succeeded, failed or
    # crashed on exactly the same terms a run is, and CRASHED is likewise never
    # written — it is what a reader concludes from a log whose last line is not
    # terminal. A second four-value enum meaning the same four things would be
    # a second place to keep true.
    status: RunStatus
    # The last PHASE record's phase, or null before the first one. Derived
    # rather than stored so it cannot drift from the transcript.
    phase: SessionPhase | None = None
    started_at: str
    finished_at: str | None = None
    error: str | None = None
    records: list[SessionRecord]
