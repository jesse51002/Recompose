"""What opening a session and taking a turn look like on the wire.

One tight unit: the request that starts a design, what comes back, and the one
request shape every human action uses afterwards.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, field_validator

from schema import Customization


class StartSession(BaseModel):
    """Open a session against one app.

    **Nothing is typed before the conversation starts.** A design name used to
    be required here, collected by a form in front of the Generate page — which
    asked a person to name a thing that does not exist yet, in a box, before
    anything had explained what was about to happen. The agent's own first
    question is what the business is called, so the form was asking for the
    same fact twice and putting a wall in front of the product.

    The name arrives later, from the brand brief the interview produces, and
    ``/sessions/active`` reports ``None`` until it does.
    """

    model_config = ConfigDict(extra="forbid")

    app_id: str = Field(min_length=1)


class SessionOpened(BaseModel):
    """The accepted open: what to watch, and what it is watching."""

    model_config = ConfigDict(extra="forbid")

    session_id: str
    app_id: str
    design_name: str | None = None
    started_at: str


class SessionTurn(BaseModel):
    """One human action: something typed, or a chip picked.

    Deliberately one shape for both. A chip pick posts the option's own text,
    so the transcript reads the same whether the person chose or typed — and
    the agent, which cannot tell the difference either, does not have to.
    """

    model_config = ConfigDict(extra="forbid")

    message: str = Field(min_length=1)

    @field_validator("message")
    @classmethod
    def _non_blank(cls, value: str) -> str:
        """A blank turn is a client bug. Refused here, where the cause is
        still legible, rather than as an empty line in the transcript."""
        if not value.strip():
            raise ValueError("'message' must not be blank")
        return value


class SessionAccept(BaseModel):
    """Accept the brand brief. The design's ONE approval gate.

    The reviewed brief comes back VERBATIM rather than being taken from server
    state, because the review panel is editable: what the owner accepted is
    what they were looking at, which is not necessarily what the agent last
    proposed.

    **There is no layout half to accept.** This used to carry an optional
    ``layout`` and refuse unless exactly one arm was set. The layout brief is
    authored by the layout agent now, at the start of its own run — see
    ``service/layout_task.py``.
    """

    model_config = ConfigDict(extra="forbid")

    brief: Customization
