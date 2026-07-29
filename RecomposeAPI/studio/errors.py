"""Studio error vocabulary (kept apart from `core.errors` and `api.errors`).

One exception per refusal the launch path can make, so the router maps a
cause to a status code instead of inspecting messages.
"""

from __future__ import annotations


class StudioError(Exception):
    """Base for every studio refusal."""


class UnknownAppError(StudioError):
    """No such `apps/<app_id>/app.yaml` (maps to HTTP 404)."""


class UnknownBriefError(StudioError):
    """No such saved brief under `.studio/briefs/` (maps to HTTP 404)."""


class UnknownRunError(StudioError):
    """No such run, in memory or on disk (maps to HTTP 404)."""


class RunInFlightError(StudioError):
    """A run is already going and runs are serialized (maps to HTTP 409).

    Carries the active run's identity so the UI can say *which* one, rather
    than a bare "busy".
    """

    def __init__(self, run_id: str, app_id: str, run_name: str) -> None:
        super().__init__(
            f"run {run_id} is already in flight ({app_id}/{run_name}); "
            "the providers rate-limit, so the studio runs one at a time"
        )
        self.run_id = run_id
        self.app_id = app_id
        self.run_name = run_name


class UnknownSessionError(StudioError):
    """No such session, in memory or on disk (maps to HTTP 404)."""


class SessionInFlightError(StudioError):
    """A session is already open and sessions are serialized (HTTP 409).

    Serialized for the same reason runs are — one laptop, rate-limited
    providers — and additionally because a session OWNS the single run slot
    for its whole length: a second one could only sit and be refused.

    Carries the active session's identity so the UI can say *which* one.
    """

    def __init__(
        self, session_id: str, app_id: str, design_name: str | None = None
    ) -> None:
        super().__init__(
            f"session {session_id} is already open "
            f"({app_id}/{design_name or 'unnamed'}); "
            "the studio runs one design at a time"
        )
        self.session_id = session_id
        self.app_id = app_id
        self.design_name = design_name


class LayoutInFlightError(StudioError):
    """A layout agent is already running (maps to HTTP 409).

    The one thing a second start must never do. Two agents editing one folder
    would interleave writes into the same files, and the loser's work is not
    recoverable — nothing records what it was about to write.

    **This replaced a folder-exists refusal**, which stopped making sense once
    the folder's name became the run's. An existing folder used to mean "a
    different design wants this name"; now it can only mean "this run has been
    laid out before", and the useful answer to that is to carry on editing it,
    not to refuse. What is genuinely exclusive is the AGENT, so that is what is
    checked.
    """

    def __init__(self, design_id: str) -> None:
        super().__init__(
            f"a layout agent is already running on {design_id!r}; stop it "
            "before starting another"
        )
        self.design_id = design_id


class RunNameTakenError(StudioError):
    """The target run directory already exists (maps to HTTP 409).

    The launch path only ever CREATES run directories — it never targets an
    existing one — so the destructive in-place overwrite is unreachable from
    the browser. A collision is refused, not overwritten.
    """
