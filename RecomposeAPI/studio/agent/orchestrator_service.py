"""OrchestratorService — the agent that interviews, then starts the work.

The brief agent conducts one interview and has zero tools. This one conducts
that same interview and has ONE tool — start the asset run — because a design
now has exactly one thing an owner decides.

**It used to have two of each.** There was a second interview about layout and
motion, a `LayoutProposal` to accept, and a `start_layout_agent` tool. All of it
is gone: most owners have no layout direction to give, and the agent that does
the work opens the generated images before deciding, which no interview out here
can match. The layout starts itself when the assets settle (`run_settled`).

**What the agent decides, and what it cannot.** It chooses *when* the asset run
starts, and nothing else. It never decides *what happens*: the tool's body is
the same deterministic launcher an HTTP client would hit, a brief is committed
by ``BriefService`` before the agent is told, and the tool refuses outright when
its precondition is unmet. A model cannot talk its way past a `ModelRetry` — it
can only try again with a better turn. It cannot fail to start the layout
either, because starting the layout is not something it is asked to do.

**Why per-session state exists here.** Pydantic AI needs its own message
history, and a `SessionRecord` list is not that: the records are what a HUMAN
reads, the history is what the model reads, and neither can be derived from the
other without lossy guesswork. Since a store is required anyway, the small
amount of flow state (what was accepted, whether the assets settled) lives with
it rather than being re-derived from records on every turn.

That store is in memory and dies with the process, deliberately: the durable
transcript is the JSONL, which is what a reloaded page reads. A restarted studio
loses the model's memory of a conversation, not the conversation.
"""

from __future__ import annotations

import asyncio
import logging
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from pydantic_ai import Agent, ModelRetry, RunContext
from pydantic_ai.models.anthropic import AnthropicModel
from pydantic_ai.providers.anthropic import AnthropicProvider

from schema import Customization
from ThemeTree.core.config import settings as pipeline_settings
from RecomposeAPI.studio.config import settings
from RecomposeAPI.studio.errors import StudioError
from RecomposeAPI.studio.schema.agent_output import (
    AgentQuestion,
    BriefProposal,
    OrchestratorOutput,
)
from RecomposeAPI.studio.schema.brief_request import BriefRequest
from RecomposeAPI.studio.schema.launch_request import LaunchRequest
from RecomposeAPI.studio.schema.session_record import SessionPhase
from RecomposeAPI.studio.service.agent_cost import turn_cost_usd
from RecomposeAPI.studio.service.brief_service import BriefService, brief_service
from RecomposeAPI.studio.service.layout_task import LayoutTask, layout_task
from RecomposeAPI.studio.service.run_launcher import RunLauncher, run_launcher
from RecomposeAPI.studio.service.run_registry import RunRegistry
from RecomposeAPI.studio.service.session_registry import (
    SessionRegistry,
    session_registry,
)

logger = logging.getLogger(__name__)

PROMPT_PATH = Path(__file__).parent / "prompts" / "orchestrator_system.md"

# The opening turn carries no message — the browser just says "go". A note
# rather than an empty prompt, which the provider would reject.
OPENING_NOTE = "[Start the interview. Ask what the business is called.]"
# Bracketed so the model reads these as system asides, not as something the
# owner typed. Same convention the brief agent's SAVED_NOTE uses.
BRIEF_ACCEPTED = (
    "[The owner accepted the brand brief; it is saved as {slug}.yaml. Start "
    "the asset run now.]"
)
RUN_SETTLED = (
    "[The asset run finished. {summary} The layout agent has been started "
    "automatically on the design folder {design_id}; it decides the "
    "arrangement itself. Tell the owner the look is done and the screens "
    "are being rearranged now. Do NOT ask them anything about layout.]"
)
RUN_FAILED = "[The asset run failed: {error}. Tell the owner plainly.]"


@dataclass
class _Conversation:
    """One session's model-side state.

    ``history`` is Pydantic AI's own serialized message list, deliberately
    opaque: its shape is that library's contract, and re-declaring it here
    would be a second, immediately-stale copy of someone else's schema.
    """

    app_id: str
    design_name: str | None = None
    history: list[Any] = field(default_factory=list)
    accepted_brief: Customization | None = None
    assets_settled: bool = False
    # The studio's run id (what `/runs/{id}` is keyed by) and the run's
    # NAME (the folder under `apps/<app>/`, which the catalogue lists the
    # design under and the layout fork is named after). Two different
    # things that both identify one run.
    run_id: str | None = None
    run_name: str | None = None


@dataclass
class _Deps:
    """What a tool is allowed to reach. Passed per run, never global."""

    conversation: _Conversation
    session_id: str
    sessions: SessionRegistry
    runs: RunLauncher
    layout: LayoutTask
    watch: Callable[[str, str], None]


class OrchestratorService:
    """Drives one design's conversation and the work it starts."""

    def __init__(
        self,
        *,
        sessions: SessionRegistry,
        briefs: BriefService,
        runs: RunLauncher,
        layout: LayoutTask,
        model_name: str,
        retries: int,
        anthropic_api_key: str,
    ) -> None:
        self._sessions = sessions
        self._briefs = briefs
        # Kept for PRICING, not for building — the agent is constructed once
        # below and the id is needed on every turn afterwards.
        self._model_name = model_name
        self._runs = runs
        self._layout = layout
        self._live: dict[str, _Conversation] = {}
        # Background tasks are only weakly referenced by the event loop, so a
        # watcher could be collected mid-run. Hold each until it finishes.
        self._watchers: set[asyncio.Task[None]] = set()
        self._agent: Agent[_Deps, OrchestratorOutput] | None = None
        if anthropic_api_key:
            self._agent = self._build(model_name, retries, anthropic_api_key)
        else:
            logger.warning(
                "orchestrator not built: ANTHROPIC_API_KEY is empty. Runs, "
                "briefs and the catalogue are unaffected; a session will open "
                "but the agent will not speak."
            )

    # --- construction ----------------------------------------------------

    @staticmethod
    def _build(
        model_name: str, retries: int, api_key: str
    ) -> Agent[_Deps, OrchestratorOutput]:
        """The agent, its prompt read from `.md`, and its one tool."""
        agent: Agent[_Deps, OrchestratorOutput] = Agent(
            AnthropicModel(
                model_name, provider=AnthropicProvider(api_key=api_key)
            ),
            deps_type=_Deps,
            output_type=[str, BriefProposal, AgentQuestion],
            instructions=PROMPT_PATH.read_text(encoding="utf-8"),
            retries=retries,
        )

        @agent.tool
        async def start_asset_run(
            ctx: RunContext[_Deps], run_name: str
        ) -> str:
            """Start generating the palette, typography, copy and imagery.

            Call this only after the owner has accepted the brand brief.
            Returns immediately; the run itself takes about five minutes
            reports its own progress. Never call it twice.

            Args:
                run_name: a short lowercase-hyphenated name for this run,
                    derived from the business name.
            """
            convo = ctx.deps.conversation
            if convo.accepted_brief is None:
                # The model cannot talk its way past this: no accepted brief
                # on the session means no run, whatever it believes.
                raise ModelRetry(
                    "No brand brief has been accepted yet. Propose one and "
                    "wait for the owner to accept it."
                )
            if convo.run_id is not None:
                raise ModelRetry(
                    f"An asset run is already going ({convo.run_id}). Do not "
                    "start another; tell the owner it is running."
                )
            try:
                accepted = await ctx.deps.runs.launch(
                    LaunchRequest(
                        app_id=convo.app_id,
                        run_name=run_name,
                        brief=convo.accepted_brief,
                    )
                )
            except StudioError as exc:
                # A refusal is information the model can act on — a taken name
                # means "pick another" — so it comes back as a retry rather
                # than as an exception that would kill the turn.
                raise ModelRetry(str(exc)) from None
            convo.run_id = accepted.run_id
            convo.run_name = accepted.run_name
            # Nothing else would ever tell the agent this run ended: the
            # launcher settles the RUN registry and knows nothing about
            # sessions. Follow the run's own stream and report back when it
            # goes terminal — reusing the stream rather than adding a second
            # notification path that could disagree with it.
            ctx.deps.watch(ctx.deps.session_id, accepted.run_id)
            await ctx.deps.sessions.phase(
                ctx.deps.session_id, SessionPhase.GENERATING
            )
            await ctx.deps.sessions.task(
                ctx.deps.session_id,
                task="assets",
                state="started",
                run_id=accepted.run_id,
                # The run NAME, not the run id: the name is the folder under
                # `apps/<app>/`, which is exactly the id the read API lists the
                # design under. It is what lets a watching browser switch to
                # the theme being generated and repaint as it lands.
                design_id=accepted.run_name,
            )
            return (
                f"Started. Run id {accepted.run_id}. It will report when it "
                "settles; do not call this again."
            )

        # THERE IS NO SECOND TOOL. Starting the layout used to be one, gated on
        # an accepted layout brief — so the model chose the moment, after an
        # interview about arrangement that most owners have no answer to. The
        # asset run finishing is the only signal that was ever needed, and the
        # service starts the layout on it directly (see `run_settled`). A model
        # cannot forget to call something that is not a call.
        return agent

    # --- the conversation -------------------------------------------------

    async def open(self, session_id: str, *, app_id: str) -> None:
        """Register the conversation and take the agent's opening turn."""
        self._live[session_id] = _Conversation(app_id=app_id)
        await self._sessions.phase(session_id, SessionPhase.BRIEF)
        await self._run_turn(session_id, OPENING_NOTE)

    async def say(self, session_id: str, message: str) -> None:
        """The owner said something. Record it, then let the agent answer."""
        await self._sessions.said(session_id, who="you", text=message)
        await self._run_turn(session_id, message)

    async def accept_brief(
        self, session_id: str, brief: Customization
    ) -> None:
        """Commit the accepted brand brief, THEN tell the agent.

        The commit is deterministic ``BriefService.commit`` — the same path an
        HTTP form posts to — and it runs first and on its own. If it raises,
        nothing was written and the error surfaces unchanged. A brief is never
        reported saved because a model said so.
        """
        convo = self._require(session_id)
        committed = await self._briefs.commit(BriefRequest.from_brief(brief))
        convo.accepted_brief = brief
        # The design has a name from here on: the brief's own. It is the first
        # moment one exists — nothing was typed before the conversation began.
        convo.design_name = brief.design_direction.name
        await self._sessions.named(session_id, convo.design_name)
        await self._sessions.said(
            session_id, who="you", text="Accepted the brand brief."
        )
        await self._run_turn(
            session_id, BRIEF_ACCEPTED.format(slug=committed.slug)
        )

    async def run_settled(
        self, session_id: str, *, ok: bool, summary: str
    ) -> None:
        """A background asset run ended: start the layout, then narrate both.

        **The layout starts here, in code, not because a model decided to.**
        A finished asset run is the only precondition the layout ever had —
        it is designed for those images, that palette and those typefaces —
        so there is nothing left to judge and nothing to ask. The owner is
        not consulted because most people have no layout direction to give,
        and the agent that does the work has more to go on than either of
        them: it opens the generated pictures.

        Order matters. The layout is started BEFORE the agent's turn so the
        note can say it is already running; a turn that promised it first
        would be a promise the code had not yet kept.

        A task finishing is not a human turn, so it reaches the model as a
        bracketed system note — the same convention `BRIEF_ACCEPTED` uses.
        """
        convo = self._live.get(session_id)
        if convo is None:
            return
        convo.assets_settled = ok
        await self._sessions.task(
            session_id,
            task="assets",
            state="finished" if ok else "failed",
            run_id=convo.run_id,
            error=None if ok else summary,
        )
        if not ok:
            await self._run_turn(session_id, RUN_FAILED.format(error=summary))
            return

        design_id = await self._start_layout(session_id, convo)
        await self._run_turn(
            session_id,
            RUN_SETTLED.format(summary=summary, design_id=design_id),
        )

    async def start_layout(self, session_id: str) -> str:
        """Launch the layout agent on this session's run. RAISES on failure.

        The manual door, behind `POST /sessions/{id}/layout/start`. A person
        pressing a button is owed the reason it did not work, so unlike the
        automatic path this propagates — the route turns a
        `LayoutInFlightError` into a 409 and a missing run into a 422.
        """
        convo = self._require(session_id)
        if convo.run_name is None:
            raise ValueError(
                "there is no finished asset run to design against yet"
            )
        design_id = await self._layout.start(
            app=convo.app_id, theme_run=convo.run_name
        )
        await self._sessions.phase(session_id, SessionPhase.DESIGNING)
        await self._sessions.task(
            session_id, task="layout", state="started", design_id=design_id
        )
        return design_id

    async def _start_layout(
        self, session_id: str, convo: _Conversation
    ) -> str:
        """The AUTOMATIC start, when an asset run settles.

        **Never raises**, which is the difference from `start_layout`. Nobody
        pressed anything here: the assets are made and the theme is watchable,
        so a layout that could not start is one half missing, not a dead
        session. It is reported as a failed task — a visible red state in the
        transcript, with a Start button beside it — and the conversation
        carries on.
        """
        if convo.run_name is None:
            return "(none)"
        try:
            return await self.start_layout(session_id)
        except Exception as exc:
            logger.exception("could not start the layout for %s", session_id)
            await self._sessions.task(
                session_id, task="layout", state="failed", error=str(exc)
            )
            return "(it could not be started)"

    def close(self, session_id: str) -> None:
        """Drop the conversation. The durable transcript is the JSONL."""
        self._live.pop(session_id, None)

    # --- internals --------------------------------------------------------

    def _watch_run(self, session_id: str, run_id: str) -> None:
        """Follow one run to its terminal record, then narrate it.

        Consumes the run's OWN stream, which replays from index 0 and ends
        after the terminal record — so this cannot miss the ending even if it
        attaches late, and it needs no second notification path that could
        disagree with what a watching browser sees.
        """
        task = asyncio.create_task(self._await_run(session_id, run_id))
        self._watchers.add(task)
        task.add_done_callback(self._watchers.discard)

    async def _await_run(self, session_id: str, run_id: str) -> None:
        registry = self._runs.registry
        try:
            async for record in registry.stream(run_id):
                if not record.terminal:
                    continue
                ok = record.status is not None and record.status.value == "succeeded"
                snapshot = await registry.snapshot(run_id)
                # The run's own total, onto the SESSION's log — this is the
                # only moment it is reachable from here, and once the run
                # registry forgets the run nothing else remembers it.
                spent = self._run_cost(snapshot)
                if spent:
                    await self._sessions.spent(
                        session_id, cost_usd=spent, spent_on="assets"
                    )
                await self.run_settled(
                    session_id,
                    ok=ok,
                    summary=self._summarise(snapshot, record.error),
                )
                return
        except Exception:
            logger.exception("watching run %s failed", run_id)

    @staticmethod
    def _run_cost(snapshot: object) -> float:
        """The pipeline's own total for this run, off its terminal event.

        Read rather than recomputed: `PipelineResult.total_cost` is the one
        place the four paid services are summed, so a second sum here could
        only disagree with the artifact.
        """
        for record in reversed(getattr(snapshot, "records", [])):
            event = getattr(record, "event", None)
            if event is not None and event.cost is not None:
                return float(event.cost)
        return 0.0

    @staticmethod
    def _summarise(snapshot: object, error: str | None) -> str:
        """What the agent is told about a finished run, in engine terms.

        Deliberately factual and deliberately not owner-facing: the agent's
        job is to translate this into the owner's language, and giving it
        pre-softened text would leave it nothing to translate.
        """
        if error:
            return error
        records = getattr(snapshot, "records", [])
        finished = sum(
            1
            for r in records
            if getattr(r, "event", None) is not None
            and r.event.kind.value == "node_finished"
        )
        failed = [
            r.event.node
            for r in records
            if getattr(r, "event", None) is not None
            and r.event.kind.value == "node_failed"
        ]
        parts = [f"{finished} node(s) produced"]
        if failed:
            parts.append(f"these failed and are missing: {', '.join(failed)}")
        return "; ".join(parts) + "."

    def _require(self, session_id: str) -> _Conversation:
        convo = self._live.get(session_id)
        if convo is None:
            raise LookupError(f"no live conversation for session {session_id}")
        return convo

    async def _run_turn(self, session_id: str, prompt: str) -> None:
        """One agent turn, with whatever it emits appended to the transcript.

        **Never raises.** A model or provider failure must not take the session
        down with it — the owner sees the failure in the transcript and can
        keep going, which is the whole reason the transcript is server-held.
        """
        agent = self._agent
        convo = self._live.get(session_id)
        if agent is None or convo is None:
            await self._sessions.said(
                session_id,
                who="agent",
                text=(
                    "The design agent is not configured (ANTHROPIC_API_KEY is "
                    "empty), so I cannot answer. Everything else still works."
                ),
            )
            return
        deps = _Deps(
            conversation=convo,
            session_id=session_id,
            sessions=self._sessions,
            runs=self._runs,
            layout=self._layout,
            watch=self._watch_run,
        )
        try:
            result = await agent.run(
                prompt,
                deps=deps,
                message_history=convo.history or None,
            )
        except Exception:
            logger.exception("agent turn failed for session %s", session_id)
            await self._sessions.said(
                session_id,
                who="agent",
                text=(
                    "Something went wrong on my side and I did not manage to "
                    "reply. Say that again and I will pick up where we were."
                ),
            )
            return
        convo.history = result.all_messages()
        await self._record_spend(session_id, result)
        await self._emit(session_id, result.output)

    async def _record_spend(self, session_id: str, result: Any) -> None:
        """What this turn cost, onto the session's log.

        **Recorded before the turn's output**, so a crash between the two
        loses a message rather than losing money that was already spent —
        an unrecorded cost is the one thing here that cannot be recovered
        later, since nothing on disk remembers the token counts.

        Never raises. A design must not die because its meter broke — but that
        guard is also how this went unnoticed once already: `usage` is a
        PROPERTY on Pydantic AI's result, and calling it as `usage()` raised a
        TypeError that this very `except` swallowed, leaving the meter reading
        $0 with nothing in the transcript to suggest otherwise. Hence the
        contract test in tests/test_agent_cost.py, which fails loudly if that
        attribute ever becomes callable again.
        """
        try:
            usage = result.usage
            cost = turn_cost_usd(
                self._model_name,
                input_tokens=usage.input_tokens or 0,
                output_tokens=usage.output_tokens or 0,
                cache_read_tokens=usage.cache_read_tokens or 0,
                cache_write_tokens=usage.cache_write_tokens or 0,
            )
            await self._sessions.spent(
                session_id,
                cost_usd=cost,
                spent_on="agent",
                input_tokens=usage.input_tokens,
                output_tokens=usage.output_tokens,
                cache_read_tokens=usage.cache_read_tokens,
                cache_write_tokens=usage.cache_write_tokens,
            )
        except Exception:
            logger.exception("could not record spend for session %s", session_id)

    async def _emit(self, session_id: str, output: OrchestratorOutput) -> None:
        """One run's output as transcript records.

        A proposal writes TWO records — its message and the proposal itself —
        so a brief never lands in the review panel without a word in the
        conversation.
        """
        if isinstance(output, BriefProposal):
            await self._sessions.said(
                session_id, who="agent", text=output.message
            )
            await self._sessions.proposed(session_id, brief=output.brief)
        elif isinstance(output, AgentQuestion):
            await self._sessions.asked(session_id, output)
        else:
            await self._sessions.said(session_id, who="agent", text=output)


_service: OrchestratorService | None = None


def orchestrator_service() -> OrchestratorService:
    """The process-wide orchestrator (it holds the live conversations)."""
    global _service
    if _service is None:
        _service = OrchestratorService(
            sessions=session_registry(),
            briefs=brief_service(),
            runs=run_launcher(),
            layout=layout_task(),
            model_name=settings.brief_agent_model,
            retries=settings.brief_agent_retries,
            anthropic_api_key=pipeline_settings.anthropic_api_key,
        )
    return _service
