"""OrchestratorService — the agent that interviews, then starts the work.

The brief agent conducts one interview and has zero tools. This one conducts
BOTH interviews and has two tools, because they are the same ritual — ask,
propose, accept — about two halves of one design, and splitting them across two
agents would give the owner two transcripts to reconcile.

**What the agent decides, and what it cannot.** It chooses *when* work starts.
It never decides *what happens*: a tool's body is the same deterministic
launcher an HTTP client would hit, a brief is committed by ``BriefService``
before the agent is told, and a tool refuses outright when its precondition is
unmet. A model cannot talk its way past a `ModelRetry` — it can only try again
with a better turn.

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
    LayoutProposal,
    OrchestratorOutput,
)
from RecomposeAPI.studio.schema.brief_request import BriefRequest
from RecomposeAPI.studio.schema.launch_request import LaunchRequest
from RecomposeAPI.studio.schema.layout_brief import LayoutBrief
from RecomposeAPI.studio.schema.session_record import SessionPhase
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
LAYOUT_ACCEPTED = (
    "[The owner accepted the layout brief. Start the layout agent now.]"
)
RUN_SETTLED = "[The asset run finished. {summary}]"
RUN_FAILED = "[The asset run failed: {error}. Tell the owner plainly.]"


@dataclass
class _Conversation:
    """One session's model-side state.

    ``history`` is Pydantic AI's own serialized message list, deliberately
    opaque: its shape is that library's contract, and re-declaring it here
    would be a second, immediately-stale copy of someone else's schema.
    """

    app_id: str
    design_name: str
    history: list[Any] = field(default_factory=list)
    accepted_brief: Customization | None = None
    accepted_layout: LayoutBrief | None = None
    assets_settled: bool = False
    run_id: str | None = None


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
        """The agent, its prompt read from `.md`, and its two tools."""
        agent: Agent[_Deps, OrchestratorOutput] = Agent(
            AnthropicModel(
                model_name, provider=AnthropicProvider(api_key=api_key)
            ),
            deps_type=_Deps,
            output_type=[str, BriefProposal, AgentQuestion, LayoutProposal],
            instructions=PROMPT_PATH.read_text(encoding="utf-8"),
            retries=retries,
        )

        @agent.tool
        async def start_asset_run(
            ctx: RunContext[_Deps], run_name: str
        ) -> str:
            """Start generating the palette, typography, copy and imagery.

            Call this only after the owner has accepted the brand brief.
            Returns immediately; the run itself takes 10-20 minutes and
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

        @agent.tool
        async def start_layout_agent(ctx: RunContext[_Deps]) -> str:
            """Start redesigning the screens from the accepted layout brief.

            Call this only after the owner has accepted the layout brief AND
            the asset run has finished — the layout is designed on top of the
            palette and typefaces that run produced.
            """
            convo = ctx.deps.conversation
            if convo.accepted_layout is None:
                raise ModelRetry(
                    "No layout brief has been accepted yet. Propose one and "
                    "wait for the owner to accept it."
                )
            if not convo.assets_settled:
                raise ModelRetry(
                    "The asset run has not finished yet. Wait for it — the "
                    "layout is designed on top of what it produces."
                )
            try:
                # The base app and the run come from the SESSION, not the
                # brief: a LayoutBrief says what a layout IS, and which base it
                # forked is a property of this job.
                design_id = await ctx.deps.layout.start(
                    convo.accepted_layout,
                    app=convo.app_id,
                    theme_run=convo.run_id,
                )
            except StudioError as exc:
                raise ModelRetry(str(exc)) from None
            await ctx.deps.sessions.phase(
                ctx.deps.session_id, SessionPhase.DESIGNING
            )
            return f"Started, on the folder {design_id}."

        return agent

    # --- the conversation -------------------------------------------------

    async def open(
        self, session_id: str, *, app_id: str, design_name: str
    ) -> None:
        """Register the conversation and take the agent's opening turn."""
        self._live[session_id] = _Conversation(
            app_id=app_id, design_name=design_name
        )
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
        await self._sessions.said(
            session_id, who="you", text="Accepted the brand brief."
        )
        await self._run_turn(
            session_id, BRIEF_ACCEPTED.format(slug=committed.slug)
        )

    async def accept_layout(
        self, session_id: str, brief: LayoutBrief
    ) -> None:
        """Record the accepted layout brief, then tell the agent.

        Unlike the brand brief there is nothing to commit here: the layout
        brief is written into the design folder by the layout task, at the
        moment the folder exists. Writing it anywhere else first would leave a
        copy to keep in sync.
        """
        convo = self._require(session_id)
        convo.accepted_layout = brief
        await self._sessions.said(
            session_id, who="you", text="Accepted the layout brief."
        )
        await self._run_turn(session_id, LAYOUT_ACCEPTED)

    async def run_settled(
        self, session_id: str, *, ok: bool, summary: str
    ) -> None:
        """A background asset run ended. Let the agent narrate it.

        A task finishing is not a human turn, so it arrives as a bracketed
        system note — the same convention the brief agent's SAVED_NOTE uses,
        so the model reads it as an aside rather than as the owner speaking.
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
        if ok:
            await self._sessions.phase(session_id, SessionPhase.LAYOUT_BRIEF)
        await self._run_turn(
            session_id,
            (RUN_SETTLED if ok else RUN_FAILED).format(
                summary=summary, error=summary
            ),
        )

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
                await self.run_settled(
                    session_id,
                    ok=ok,
                    summary=self._summarise(snapshot, record.error),
                )
                return
        except Exception:
            logger.exception("watching run %s failed", run_id)

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
        await self._emit(session_id, result.output)

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
        elif isinstance(output, LayoutProposal):
            await self._sessions.said(
                session_id, who="agent", text=output.message
            )
            await self._sessions.proposed(session_id, layout=output.brief)
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
