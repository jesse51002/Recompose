"""Pricing one orchestrator turn.

The interview is the one part of a design a person watches happen, and until
this existed it was the only spend nobody could see. The tests that matter
here are about the CACHE, because that is where a naive implementation is
wrong by a factor rather than a rounding error.
"""

from __future__ import annotations

import litellm
import pytest

from RecomposeAPI.studio.service.agent_cost import turn_cost_usd

MODEL = "claude-opus-5"


def test_a_turn_is_priced_from_litellms_own_model_pricing() -> None:
    """No hand-maintained price table — one in this repo would be wrong the
    week a price changed, and wrong silently."""
    cost = turn_cost_usd(MODEL, input_tokens=1000, output_tokens=500)

    expected = sum(
        litellm.cost_per_token(
            model=MODEL, prompt_tokens=1000, completion_tokens=500
        )
    )
    assert cost == pytest.approx(expected)
    assert cost > 0


def test_cached_input_is_far_cheaper_than_fresh_input() -> None:
    """THE test in this file.

    The orchestrator replays the whole conversation every turn, so by the
    eighth question almost all of its input is a cache READ. Counting those at
    the full input rate would overstate a long interview several times over —
    and it would be most wrong exactly when the number mattered most.
    """
    fresh = turn_cost_usd(MODEL, input_tokens=100_000, output_tokens=100)
    cached = turn_cost_usd(
        MODEL,
        input_tokens=0,
        output_tokens=100,
        cache_read_tokens=100_000,
    )

    assert cached < fresh, "a cache read must not cost what fresh input costs"
    # Anthropic prices a cache read at a small fraction of fresh input; the
    # exact ratio is litellm's to know, so this asserts the property, not a
    # number that would pin a third party's price list into this repo.
    assert cached < fresh / 2


def test_an_unpriceable_turn_is_a_visible_zero_not_a_crash(caplog) -> None:
    """A design must not die because its meter broke — but a zero has to be
    diagnosable, never silent. Same guard the pipeline's cost helper uses."""
    with caplog.at_level("WARNING"):
        cost = turn_cost_usd(
            "not-a-real-model-anyone-sells", input_tokens=10, output_tokens=10
        )

    assert cost == 0.0
    assert "could not price a turn" in caplog.text


# --- the seam that already broke once -------------------------------------


def test_pydantic_ais_usage_is_a_property_not_a_method() -> None:
    """A CONTRACT TEST, and it exists because this exact thing shipped broken.

    `AgentRunResult.usage` is a property. It was read as `result.usage()`,
    which raised a TypeError that `_record_spend`'s own never-raise guard
    swallowed — so every turn recorded nothing and the meter read $0 with
    nothing anywhere to suggest it was lying. A silent meter is worse than no
    meter, because it is believed.

    If a future Pydantic AI makes this callable again, this fails here rather
    than quietly zeroing the number a person is about to trust.
    """
    from pydantic_ai.agent import AgentRunResult

    assert isinstance(
        AgentRunResult.__dict__["usage"], property
    ), "read it as `result.usage`, not `result.usage()` — see _record_spend"


def test_a_turn_records_its_spend_against_the_session(tmp_path) -> None:
    """Exercises `_record_spend` itself, not just the pricing underneath it.

    The pricing had tests and passed while the feature was dead, because
    nothing tested the seam between the result object and the log. This is
    that seam.
    """
    import asyncio

    from pydantic_ai.usage import RunUsage

    from RecomposeAPI.studio.agent.orchestrator_service import OrchestratorService
    from RecomposeAPI.studio.schema.session_record import SessionRecordKind
    from RecomposeAPI.studio.service.session_registry import SessionRegistry

    class _Result:
        """Shaped like Pydantic AI's: `usage` is a PROPERTY."""

        @property
        def usage(self) -> RunUsage:
            return RunUsage(input_tokens=1000, output_tokens=200)

    registry = SessionRegistry(tmp_path / "sessions")
    service = OrchestratorService(
        sessions=registry,
        briefs=None,  # type: ignore[arg-type]  — unused on this path
        runs=None,  # type: ignore[arg-type]
        layout=None,  # type: ignore[arg-type]
        model_name=MODEL,
        retries=1,
        anthropic_api_key="",  # no agent built; nothing here needs one
    )

    async def scenario() -> list:
        opened = await registry.open(app_id="combatden")
        await service._record_spend(opened.session_id, _Result())
        snap = await registry.snapshot(opened.session_id)
        return [snap, snap.records]

    snap, records = asyncio.run(scenario())

    spent = [r for r in records if r.kind is SessionRecordKind.SPENT]
    assert len(spent) == 1, "the turn's cost never reached the log"
    assert spent[0].cost_usd is not None and spent[0].cost_usd > 0
    assert spent[0].spent_on == "agent"
    assert spent[0].input_tokens == 1000
    assert snap.agent_cost_usd > 0
