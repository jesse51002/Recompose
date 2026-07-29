"""What opening a session and taking a turn look like on the wire.

One tight unit: the request that starts a design, what comes back, and the one
request shape every human action uses afterwards.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, field_validator


class StartSession(BaseModel):
    """Open a session against one app, for one design.

    ``design_name`` is what the person is making, not what it will be called
    on disk — the brand brief's own name decides that when it is committed.
    It exists here so the transcript has something to call the design from its
    first line, and so ``/sessions/active`` can say which one is open.
    """

    model_config = ConfigDict(extra="forbid")

    app_id: str = Field(min_length=1)
    design_name: str = Field(min_length=1)


class SessionOpened(BaseModel):
    """The accepted open: what to watch, and what it is watching."""

    model_config = ConfigDict(extra="forbid")

    session_id: str
    app_id: str
    design_name: str
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
