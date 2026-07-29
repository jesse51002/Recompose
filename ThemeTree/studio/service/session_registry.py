"""SessionRegistry — one design at a time: its transcript, its log, its stream.

The same three jobs ``RunRegistry`` does, for the other unit of work:

1. **Serialize globally.** One session at a time. Not only for the reason runs
   are serialized (rate-limited providers) but because a session *owns* the
   single run slot for its whole length — a second one could do nothing but be
   refused.
2. **Keep durable state.** Every record is appended as one JSON line to
   ``.studio/sessions/<session_id>.jsonl``. A log whose last line is not
   terminal is a crashed session, which is knowledge nothing else on disk
   carries.
3. **Fan the records out.** Every subscriber replays from index 0 and then
   follows along, so a tab that opens in the fortieth minute of a run — or
   reconnects after a drop — misses nothing.

**This is deliberately a near-copy of ``run_registry.py``.** The two solve the
same problem for different units, and the alternative to duplication is a
generic replayable-log abstraction parameterised over record type, which would
be harder to read than either concrete file and would couple two things that
are free to diverge (a run is settled by the executor; a session is settled by
a person approving). If they drift toward each other rather than apart, that is
the moment to extract — not before.
"""

from __future__ import annotations

import asyncio
import logging
import re
from collections.abc import AsyncIterator
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from pydantic import ValidationError

from ThemeTree.studio.config import RUN_LOG_SUFFIX, settings
from ThemeTree.studio.errors import SessionInFlightError, UnknownSessionError
from ThemeTree.studio.schema.run_status import RunStatus
from ThemeTree.studio.schema.session_record import (
    SessionPhase,
    SessionRecord,
    SessionRecordKind,
)
from ThemeTree.studio.schema.session_snapshot import SessionSnapshot

logger = logging.getLogger(__name__)

# `uuid4().hex`: 32 lowercase hex digits. Checked before the id is ever joined
# onto a path, so a request cannot name a file outside `.studio/sessions/`.
SESSION_ID_PATTERN = re.compile(r"^[0-9a-f]{32}$")


def _now() -> str:
    """UTC, ISO-8601 — the timestamp on every record."""
    return datetime.now(timezone.utc).isoformat()


@dataclass
class _LiveSession:
    """One in-memory session: its identity, its records, and its waiters."""

    session_id: str
    app_id: str
    design_name: str
    started_at: str
    log_path: Path
    status: RunStatus = RunStatus.RUNNING
    finished_at: str | None = None
    error: str | None = None
    records: list[SessionRecord] = field(default_factory=list)
    # Woken on every append and on settle; subscribers wait on it.
    condition: asyncio.Condition = field(default_factory=asyncio.Condition)


class SessionRegistry:
    """In-memory session state over an append-only per-session JSONL log."""

    def __init__(self, sessions_dir: Path) -> None:
        self._sessions_dir = sessions_dir
        self._live: dict[str, _LiveSession] = {}
        self._active_id: str | None = None
        # Guards the check-and-set that keeps sessions serialized. Held only
        # across the reservation, never across the session itself.
        self._gate = asyncio.Lock()

    # --- opening ---------------------------------------------------------

    async def open(self, *, app_id: str, design_name: str) -> SessionSnapshot:
        """Reserve the single session slot and write the log's header line.

        Raises ``SessionInFlightError`` when one is already open. Returns the
        new session's snapshot — its ``session_id`` is what the caller watches.
        """
        async with self._gate:
            if self._active_id is not None:
                active = self._live[self._active_id]
                raise SessionInFlightError(
                    active.session_id, active.app_id, active.design_name
                )
            session_id = uuid4().hex
            session = _LiveSession(
                session_id=session_id,
                app_id=app_id,
                design_name=design_name,
                started_at=_now(),
                log_path=self._sessions_dir / f"{session_id}{RUN_LOG_SUFFIX}",
            )
            self._live[session_id] = session
            self._active_id = session_id
        await self._append(
            session,
            SessionRecord(
                kind=SessionRecordKind.OPENED,
                index=0,
                at=session.started_at,
                session_id=session_id,
                app_id=app_id,
                design_name=design_name,
            ),
        )
        return self._snapshot_of(session)

    # --- recording -------------------------------------------------------
    #
    # One method per record kind rather than a single `record(**fields)`: the
    # caller is the agent's service layer, and a typed call site is what stops
    # a `PROPOSED` record being appended with no proposal on it.

    async def phase(self, session_id: str, phase: SessionPhase) -> None:
        """Move the session to a phase. The header and the transcript both
        read this record, so they cannot disagree about where it is."""
        await self._record(session_id, kind=SessionRecordKind.PHASE, phase=phase)

    async def said(
        self, session_id: str, *, who: str, text: str
    ) -> None:
        """One line of conversation, from the agent or the person."""
        await self._record(
            session_id, kind=SessionRecordKind.SAID, who=who, text=text
        )

    async def asked(self, session_id: str, question: object) -> None:
        """A multiple-choice question, rendered as chips and awaiting a pick."""
        await self._record(
            session_id, kind=SessionRecordKind.ASKED, question=question
        )

    async def proposed(
        self, session_id: str, *, brief: object = None, layout: object = None
    ) -> None:
        """A finished proposal awaiting the person's Accept.

        Exactly one of the two: a record carrying both would be a proposal the
        UI cannot render, since the two open different review tabs.
        """
        if (brief is None) == (layout is None):
            raise ValueError(
                "a proposal carries exactly one of 'brief' or 'layout'"
            )
        await self._record(
            session_id,
            kind=SessionRecordKind.PROPOSED,
            brief=brief,
            layout=layout,
        )

    async def task(
        self,
        session_id: str,
        *,
        task: str,
        state: str,
        run_id: str | None = None,
        design_id: str | None = None,
        line: str | None = None,
        error: str | None = None,
    ) -> None:
        """One beat of a background task's life.

        ``run_id`` on an assets task is the whole point of the record: the
        browser attaches the EXISTING ``/runs/{id}/events`` stream to it rather
        than having per-node progress duplicated through this one.
        """
        await self._record(
            session_id,
            kind=SessionRecordKind.TASK,
            task=task,
            task_state=state,
            run_id=run_id,
            design_id=design_id,
            line=line,
            error=error,
        )

    async def settle(
        self,
        session_id: str,
        *,
        status: RunStatus = RunStatus.SUCCEEDED,
        error: str | None = None,
    ) -> None:
        """Close the session: write the terminal line and free the slot.

        Unlike a run — which the executor settles when the work stops — a
        session is settled by a PERSON, when they approve the design. That is
        the difference that keeps these two registries separate.
        """
        session = self._require_live(session_id)
        session.status = status
        session.finished_at = _now()
        session.error = error
        await self._append(
            session,
            SessionRecord(
                kind=SessionRecordKind.SETTLED,
                index=len(session.records),
                at=session.finished_at,
                error=error,
            ),
        )
        async with self._gate:
            if self._active_id == session_id:
                self._active_id = None

    # --- reading ---------------------------------------------------------

    @property
    def active(self) -> SessionSnapshot | None:
        """The session currently open, if any."""
        if self._active_id is None:
            return None
        return self._snapshot_of(self._live[self._active_id])

    async def snapshot(self, session_id: str) -> SessionSnapshot:
        """The session's full state — from memory, else replayed from its log.

        A log that survived a studio restart still answers: its header line
        carries the identity, and a last line that is not terminal means the
        process died mid-session (``RunStatus.CRASHED``).
        """
        self._check_id(session_id)
        session = self._live.get(session_id)
        if session is not None:
            return self._snapshot_of(session)
        records = await asyncio.to_thread(self._read_log, session_id)
        return self._snapshot_of_records(session_id, records)

    async def stream(self, session_id: str) -> AsyncIterator[SessionRecord]:
        """Every record from index 0, then each new one as it lands.

        Ends after the terminal record, so a client that closes on it never
        reconnects. A session not in memory is replayed from its log; if that
        log has no terminal line, a synthetic terminal record is yielded
        (derived, never written) so the client still terminates rather than
        reconnecting forever against a dead session.
        """
        self._check_id(session_id)
        session = self._live.get(session_id)
        if session is None:
            records = await asyncio.to_thread(self._read_log, session_id)
            for record in records:
                yield record
            if not records or not records[-1].terminal:
                yield SessionRecord(
                    kind=SessionRecordKind.SETTLED,
                    index=len(records),
                    at=_now(),
                    error=(
                        "the session log has no terminal record — the studio "
                        "process died while this design was in flight"
                    ),
                )
            return

        cursor = 0
        while True:
            async with session.condition:
                while (
                    cursor >= len(session.records)
                    and session.status is RunStatus.RUNNING
                ):
                    await session.condition.wait()
                pending = session.records[cursor:]
                cursor += len(pending)
                done = not pending and session.status is not RunStatus.RUNNING
            for record in pending:
                yield record
            if done:
                return

    # --- internals -------------------------------------------------------

    async def _record(self, session_id: str, **fields: object) -> None:
        """Append one record, numbering it from the live list's length."""
        session = self._require_live(session_id)
        await self._append(
            session,
            SessionRecord(index=len(session.records), at=_now(), **fields),
        )

    async def _append(
        self, session: _LiveSession, record: SessionRecord
    ) -> None:
        """Add one record to the live list, persist it, wake the waiters.

        Memory first so a subscriber never blocks on disk, then the durable
        line, then the wake — the record is observable only once it is both in
        the list and on disk.
        """
        async with session.condition:
            session.records.append(record)
        await asyncio.to_thread(self._append_line, session.log_path, record)
        async with session.condition:
            session.condition.notify_all()

    @staticmethod
    def _append_line(path: Path, record: SessionRecord) -> None:
        """One JSON object, one line, opened in append mode."""
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as handle:
            handle.write(record.model_dump_json() + "\n")

    def _read_log(self, session_id: str) -> list[SessionRecord]:
        """Every parseable record in a session's durable log.

        A truncated final line (the classic crash-mid-write) is skipped with a
        warning rather than failing the read: the surviving records are exactly
        the evidence the caller wants.
        """
        path = self._sessions_dir / f"{session_id}{RUN_LOG_SUFFIX}"
        if not path.is_file():
            raise UnknownSessionError(f"no such session {session_id}")
        records: list[SessionRecord] = []
        for line in path.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            try:
                records.append(SessionRecord.model_validate_json(line))
            except ValidationError:
                logger.warning(
                    "skipping an unparseable line in %s", path, exc_info=True
                )
        return records

    def _require_live(self, session_id: str) -> _LiveSession:
        session = self._live.get(session_id)
        if session is None:
            raise UnknownSessionError(f"no live session {session_id}")
        return session

    @staticmethod
    def _check_id(session_id: str) -> None:
        """Reject anything that is not a ``uuid4().hex`` before it becomes a
        path (defence in depth against traversal)."""
        if not SESSION_ID_PATTERN.match(session_id):
            raise UnknownSessionError(f"malformed session id {session_id!r}")

    @staticmethod
    def _phase_of(records: list[SessionRecord]) -> SessionPhase | None:
        """The last phase declared, or None before the first one.

        Derived on read rather than tracked alongside, so the reported phase
        and the transcript are the same fact read twice.
        """
        for record in reversed(records):
            if record.kind is SessionRecordKind.PHASE:
                return record.phase
        return None

    @classmethod
    def _snapshot_of(cls, session: _LiveSession) -> SessionSnapshot:
        return SessionSnapshot(
            session_id=session.session_id,
            app_id=session.app_id,
            design_name=session.design_name,
            status=session.status,
            phase=cls._phase_of(session.records),
            started_at=session.started_at,
            finished_at=session.finished_at,
            error=session.error,
            records=list(session.records),
        )

    @classmethod
    def _snapshot_of_records(
        cls, session_id: str, records: list[SessionRecord]
    ) -> SessionSnapshot:
        """Rebuild a snapshot from a durable log alone.

        The header line is the only place the identity is recorded, which is
        why it is written before anything else can happen.
        """
        if not records or records[0].kind is not SessionRecordKind.OPENED:
            raise UnknownSessionError(
                f"session log {session_id} has no header record"
            )
        header, last = records[0], records[-1]
        settled = last.kind is SessionRecordKind.SETTLED
        return SessionSnapshot(
            session_id=session_id,
            app_id=header.app_id or "",
            design_name=header.design_name or "",
            # Never written, always concluded: a log that stops without a
            # terminal line is a process that died mid-session.
            status=RunStatus.SUCCEEDED if settled else RunStatus.CRASHED,
            phase=cls._phase_of(records),
            started_at=header.at,
            finished_at=last.at if settled else None,
            error=last.error if settled else None,
            records=records,
        )


_registry: SessionRegistry | None = None


def session_registry() -> SessionRegistry:
    """The process-wide session registry (it holds the live transcripts)."""
    global _registry
    if _registry is None:
        _registry = SessionRegistry(settings.sessions_dir)
    return _registry
