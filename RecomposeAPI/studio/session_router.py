"""The session endpoints: open a design, say something, watch it happen.

A **session** is one design being made end to end. It is the surface the
studio's Generate page talks to, and it is where the orchestrator agent will
live; today it carries the transcript and nothing drives it but the client,
which is deliberate — the transport is worth proving before a model is
involved in it.

Three ways to watch, all fed by the same record list, exactly as ``runs`` does:

- ``GET /sessions/{id}/events`` — Server-Sent Events over a plain
  ``StreamingResponse``. No ``sse-starlette``: the browser's ``EventSource``
  is built in and needs no npm dependency on the client either.
- ``GET /sessions/{id}`` — the same records as one JSON snapshot.
- ``GET /sessions/active`` — the open session, so a page that loads fresh can
  re-attach rather than offer to start one that would only be refused.

**Per-node asset progress does not come through here.** A ``task`` record
names its ``run_id`` and the browser attaches ``/runs/{id}/events`` to it. One
run, one stream, one fold.
"""

from __future__ import annotations

import logging
from collections.abc import AsyncIterator

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse

from RecomposeAPI.studio.errors import SessionInFlightError, UnknownSessionError
from RecomposeAPI.studio.schema.session_open import (
    SessionOpened,
    SessionTurn,
    StartSession,
)
from RecomposeAPI.studio.schema.session_snapshot import SessionSnapshot
from RecomposeAPI.studio.agent.orchestrator_service import orchestrator_service
from RecomposeAPI.studio.service.session_registry import session_registry

logger = logging.getLogger(__name__)

session_router = APIRouter(prefix="/sessions", tags=["sessions"])

# Keep the stream raw all the way to the browser: no proxy buffering, no
# cache, no connection teardown between records.
_SSE_HEADERS = {
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no",
}


@session_router.post(
    "",
    response_model=SessionOpened,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Open a session (returns immediately)",
    responses={
        202: {"description": "The session is open; watch its stream"},
        409: {"description": "A session is already open"},
    },
)
async def open_session(request: StartSession) -> SessionOpened:
    """Reserve the single session slot and write the log's header.

    Returns as soon as the session exists. Everything the agent says arrives
    over the stream like everything else, so there is exactly one path a
    transcript can reach the browser by.
    """
    try:
        snapshot = await session_registry().open(
            app_id=request.app_id, design_name=request.design_name
        )
    except SessionInFlightError as exc:
        # Enough detail for the UI to name what is already open, rather than
        # a bare "busy" — the same courtesy `POST /runs` extends.
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "message": str(exc),
                "active_session_id": exc.session_id,
                "active_app_id": exc.app_id,
                "active_design_name": exc.design_name,
            },
        ) from None
    # The agent opens the interview. It speaks over the stream like everything
    # else, so there is exactly one path a transcript reaches the browser by.
    await orchestrator_service().open(
        snapshot.session_id,
        app_id=snapshot.app_id,
        design_name=snapshot.design_name,
    )
    return SessionOpened(
        session_id=snapshot.session_id,
        app_id=snapshot.app_id,
        design_name=snapshot.design_name,
        started_at=snapshot.started_at,
    )


@session_router.post(
    "/{session_id}/turn",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Say something, pick a chip, or accept a proposal",
    responses={
        202: {"description": "Recorded; the reply arrives on the stream"},
        404: {"description": "No such open session"},
    },
)
async def take_turn(session_id: str, turn: SessionTurn) -> None:
    """One entry point for every human action.

    A typed message, a chip pick and an Accept are all the same thing to the
    agent — a message — so they share one endpoint rather than three that
    would each need their own ordering guarantee against the transcript.

    Returns nothing useful on purpose: the reply is not the response to this
    request, it is the next record on the stream. A client that read a reply
    here would have two places to render the conversation from.
    """
    try:
        # Resolve before the agent is touched, so a bad id costs nothing.
        await session_registry().snapshot(session_id)
        await orchestrator_service().say(session_id, turn.message)
    except UnknownSessionError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)
        ) from None


@session_router.post(
    "/{session_id}/close",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Approve the design and close the session",
    responses={
        202: {"description": "Settled; the stream ends after this record"},
        404: {"description": "No such open session"},
    },
)
async def close_session(session_id: str) -> None:
    """Write the terminal record and free the session slot.

    A session is closed by a PERSON approving, which is what distinguishes it
    from a run — the executor settles a run when the work stops, but the work
    stopping is not what makes a design done.
    """
    try:
        await session_registry().settle(session_id)
        orchestrator_service().close(session_id)
    except UnknownSessionError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)
        ) from None


@session_router.get(
    "/active",
    response_model=SessionSnapshot | None,
    summary="The session currently open, if any",
)
async def active_session() -> SessionSnapshot | None:
    """The open session, or ``null``. Declared before ``/{session_id}`` so
    the literal path wins over the parameterised one."""
    return session_registry().active


@session_router.get(
    "/{session_id}",
    response_model=SessionSnapshot,
    summary="One session's full state (the poll fallback)",
    responses={404: {"description": "No such session"}},
)
async def get_session(session_id: str) -> SessionSnapshot:
    """The same records the SSE stream carries, as one snapshot."""
    try:
        return await session_registry().snapshot(session_id)
    except UnknownSessionError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)
        ) from None


@session_router.get(
    "/{session_id}/events",
    summary="Stream one session (Server-Sent Events)",
    responses={
        200: {
            "content": {"text/event-stream": {}},
            "description": (
                "Every record from index 0, then each new one as it lands; "
                "the stream ends after the terminal record"
            ),
        },
        404: {"description": "No such session"},
    },
)
async def stream_session(session_id: str) -> StreamingResponse:
    """Replay this session from index 0, then follow it live.

    Every frame is a default (unnamed) ``message`` event whose data is one
    ``SessionRecord`` as JSON, with the record's index as the SSE ``id:``.

    **The client must call ``close()`` on the terminal record**
    (``kind == "settled"``): the server ends the stream there, and an
    ``EventSource`` still open will reconnect automatically — and be replayed
    from 0 again, forever. Replay is always from index 0 by design, so
    ``Last-Event-ID`` is deliberately ignored; a design's transcript is the
    thing being watched, not the tail of it.
    """
    registry = session_registry()
    # Resolve before returning 200 — inside the generator a 404 is no longer
    # expressible.
    try:
        await registry.snapshot(session_id)
    except UnknownSessionError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)
        ) from None

    async def frames() -> AsyncIterator[str]:
        async for record in registry.stream(session_id):
            yield f"id: {record.index}\ndata: {record.model_dump_json()}\n\n"

    return StreamingResponse(
        frames(), media_type="text/event-stream", headers=_SSE_HEADERS
    )
