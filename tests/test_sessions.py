"""Session tests — open, say, watch, close, and survive a crash.

No agent and no pipeline here on purpose. A session's whole job is to be a
durable, replayable transcript, and that is worth proving before a model is
involved in producing one: every failure below would otherwise surface as
"the agent did something odd" rather than as a transport bug.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pytest
from fastapi.testclient import TestClient

from RecomposeAPI.studio.config import settings
from RecomposeAPI.main import app
from RecomposeAPI.studio.schema.session_record import (
    SessionPhase,
    SessionRecord,
    SessionRecordKind,
)
from RecomposeAPI.studio.agent import orchestrator_service as orchestrator_module
from RecomposeAPI.studio.service import session_registry as session_registry_module
from RecomposeAPI.studio.service.session_registry import SessionRegistry

APP = "demo"
DESIGN = "Stillwater Pilates"


@pytest.fixture
def studio(tmp_path: Path, monkeypatch: pytest.MonkeyPatch):
    """A studio with a temp `.studio` and a fresh session registry.

    The registry is process-wide (it holds live transcripts), so it is
    replaced per test — otherwise the single-session gate would leak an open
    session from one test into the next.
    """
    monkeypatch.setattr(settings, "studio_root", tmp_path / ".studio")
    monkeypatch.setattr(
        session_registry_module, "_registry", SessionRegistry(settings.sessions_dir)
    )
    # The orchestrator captures the registry when it is built, so swapping the
    # registry without clearing this would leave the agent writing into the
    # PREVIOUS test's transcript.
    monkeypatch.setattr(orchestrator_module, "_service", None)
    with TestClient(app) as client:
        yield client, settings.sessions_dir


def _open(client: TestClient, design: str = DESIGN) -> dict[str, Any]:
    resp = client.post(
        "/sessions", json={"app_id": APP, "design_name": design}
    )
    assert resp.status_code == 202, resp.text
    return resp.json()


def _frames(client: TestClient, session_id: str) -> list[dict[str, Any]]:
    """Drain the SSE stream into the records it carried."""
    out: list[dict[str, Any]] = []
    with client.stream("GET", f"/sessions/{session_id}/events") as resp:
        assert resp.status_code == 200
        assert resp.headers["content-type"].startswith("text/event-stream")
        for line in resp.iter_lines():
            if line.startswith("data: "):
                out.append(json.loads(line.removeprefix("data: ")))
    return out


def test_opening_writes_a_header_and_reports_itself_active(studio) -> None:
    """The header is written BEFORE anything else can happen, so a session
    that dies immediately is still identifiable."""
    client, _ = studio
    opened = _open(client)

    active = client.get("/sessions/active").json()
    assert active["session_id"] == opened["session_id"]
    assert active["design_name"] == DESIGN
    assert active["status"] == "running"
    # Opening puts the session in the brief phase and takes the agent's first
    # turn, so the header is never alone.
    assert active["phase"] == "brief"
    assert [r["kind"] for r in active["records"]][:2] == ["opened", "phase"]


def test_only_one_session_at_a_time(studio) -> None:
    """A session owns the single run slot for its whole length, so a second
    could do nothing but be refused — and the refusal names the first."""
    client, _ = studio
    first = _open(client)

    resp = client.post(
        "/sessions", json={"app_id": APP, "design_name": "Another"}
    )

    assert resp.status_code == 409
    detail = resp.json()["detail"]
    assert detail["active_session_id"] == first["session_id"]
    assert detail["active_design_name"] == DESIGN
    assert "one design at a time" in detail["message"]

    client.post(f"/sessions/{first['session_id']}/close")
    # With the slot free, the next open is accepted.
    assert (
        client.post(
            "/sessions", json={"app_id": APP, "design_name": "Another"}
        ).status_code
        == 202
    )


def test_a_turn_lands_in_the_transcript(studio) -> None:
    """A chip pick and a typed message are one shape, so both read the same."""
    client, _ = studio
    session_id = _open(client)["session_id"]

    resp = client.post(
        f"/sessions/{session_id}/turn", json={"message": "Warm, not clinical."}
    )

    assert resp.status_code == 202
    records = client.get(f"/sessions/{session_id}").json()["records"]
    # Asserted as a MEMBER of the transcript rather than as its last record:
    # the agent replies to it, so what follows is not this test's business.
    assert {
        "kind": "said",
        "who": "you",
        "text": "Warm, not clinical.",
    }.items() <= next(
        r for r in records if r.get("text") == "Warm, not clinical."
    ).items()


def test_a_blank_turn_is_refused(studio) -> None:
    """Refused where the cause is legible, rather than as an empty line in
    the transcript that nothing can explain later."""
    client, _ = studio
    session_id = _open(client)["session_id"]

    assert (
        client.post(
            f"/sessions/{session_id}/turn", json={"message": "   "}
        ).status_code
        == 422
    )


def test_the_stream_replays_from_zero_and_ends_on_the_terminal_record(
    studio,
) -> None:
    """The property the whole design exists for: a tab that connects LATE
    still receives the entire transcript, then stops."""
    client, _ = studio
    session_id = _open(client)["session_id"]
    client.post(f"/sessions/{session_id}/turn", json={"message": "one"})
    client.post(f"/sessions/{session_id}/turn", json={"message": "two"})
    client.post(f"/sessions/{session_id}/close")

    frames = _frames(client, session_id)

    # Both turns are in the replay, in order, and the stream ends terminally.
    said = [f["text"] for f in frames if f["who"] == "you"]
    assert said == ["one", "two"]
    assert frames[0]["kind"] == "opened"
    assert frames[-1]["kind"] == "settled"
    # Indices are dense and 0-based; they are also the SSE `id:`.
    assert [f["index"] for f in frames] == list(range(len(frames)))


def test_the_snapshot_carries_the_same_records_as_the_stream(studio) -> None:
    """One builds the other's list, so a client that polls and a client that
    streams can never disagree about what happened."""
    client, _ = studio
    session_id = _open(client)["session_id"]
    client.post(f"/sessions/{session_id}/turn", json={"message": "hello"})
    client.post(f"/sessions/{session_id}/close")

    assert client.get(f"/sessions/{session_id}").json()["records"] == _frames(
        client, session_id
    )


def test_a_log_with_no_terminal_line_reads_as_crashed(studio) -> None:
    """The reason the log exists at all.

    Nothing on disk can distinguish "still going" from "the process died half
    way" — only a durable record list whose last line is not terminal can. The
    fresh registry stands in for a restarted studio: the session is gone from
    memory, and only the log is left.
    """
    client, sessions_dir = studio
    session_id = _open(client)["session_id"]
    client.post(f"/sessions/{session_id}/turn", json={"message": "mid-flight"})

    # Restart: same log on disk, nothing in memory.
    session_registry_module._registry = SessionRegistry(sessions_dir)

    snapshot = client.get(f"/sessions/{session_id}").json()
    assert snapshot["status"] == "crashed"
    assert snapshot["design_name"] == DESIGN
    assert snapshot["records"][0]["kind"] == "opened"
    assert "mid-flight" in [r.get("text") for r in snapshot["records"]]

    # And the stream still TERMINATES, with a synthetic terminal record that
    # was never written — otherwise an EventSource would reconnect forever
    # against a session that cannot produce another line.
    frames = _frames(client, session_id)
    assert frames[-1]["kind"] == "settled"
    assert "died" in frames[-1]["error"]
    # Derived, never written: the log on disk still ends mid-flight.
    log = (sessions_dir / f"{session_id}.jsonl").read_text(encoding="utf-8")
    assert "settled" not in log


def test_the_phase_is_derived_from_the_records(studio) -> None:
    """Phase is read off the transcript rather than tracked alongside it, so
    the header and the transcript are one fact read twice and cannot drift.

    Tested against the derivation directly: it is a pure function of a record
    list, which is exactly the property that makes the guarantee hold.
    """
    records = [
        SessionRecord(kind=SessionRecordKind.OPENED, index=0, at="t0"),
        SessionRecord(
            kind=SessionRecordKind.PHASE,
            index=1,
            at="t1",
            phase=SessionPhase.BRIEF,
        ),
        SessionRecord(
            kind=SessionRecordKind.SAID, index=2, at="t2", who="you", text="hi"
        ),
        SessionRecord(
            kind=SessionRecordKind.PHASE,
            index=3,
            at="t3",
            phase=SessionPhase.GENERATING,
        ),
        SessionRecord(
            kind=SessionRecordKind.SAID, index=4, at="t4", who="agent", text="ok"
        ),
    ]

    # The LAST phase declared wins, not the last record.
    assert SessionRegistry._phase_of(records) is SessionPhase.GENERATING
    # Before any phase record, there is no phase — which is not the same as
    # defaulting to the first one.
    assert SessionRegistry._phase_of(records[:1]) is None


def test_a_malformed_session_id_is_refused_before_it_becomes_a_path(
    studio,
) -> None:
    """Defence in depth: the id is checked against `uuid4().hex` before it is
    ever joined onto `.studio/sessions/`."""
    client, _ = studio

    assert client.get("/sessions/..%2F..%2Fetc%2Fpasswd").status_code == 404
    assert client.get("/sessions/not-a-uuid/events").status_code == 404
