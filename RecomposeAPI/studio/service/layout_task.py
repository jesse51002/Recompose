"""LayoutTask — copy the base mock, write the brief, run the layout agent.

**The seam with work that lives elsewhere.** What the layout agent is told to do
is authored in another worktree and this file knows none of it. What this file
owns is everything around it:

1. slug the generation's name,
2. copy the base mock app folder to ``gen-<slug>/``,
3. write ``layout_brief.yaml`` into the copy,
4. run a configured command with that folder as its working directory,
5. pump its stdout into the session as it goes.

**The contract is two things and no more:** the working directory is a
self-contained mock app folder, and ``layout_brief.yaml`` in it is the
instruction. Nothing here needs to know how the agent works, and the agent needs
to know nothing about this service.

**Why a folder copy and not a branch.** A design is a sibling directory under
``RecomposeJsxMockUps/src/apps/``, so ``ls`` is the list of designs and the undo
is ``rm -rf``. The ``gen-`` prefix is what lets one ``.gitignore`` line cover
every generated folder without a negation per authored app.
"""

from __future__ import annotations

import asyncio
import logging
import shutil
from pathlib import Path
from typing import Protocol

import yaml

from RecomposeAPI.studio.config import settings
from RecomposeAPI.studio.errors import DesignNameTakenError, UnknownAppError
from RecomposeAPI.studio.schema.layout_brief import LayoutBrief
from RecomposeAPI.studio.service.session_registry import (
    SessionRegistry,
    session_registry,
)
from RecomposeAPI.studio.service.slug import slugify

logger = logging.getLogger(__name__)

# Generated folders are prefixed so `.gitignore` is one unambiguous line. The
# prefix never reaches a human: a picker shows `MockApp.label`, which is the
# brief's `name`.
GENERATED_PREFIX = "gen-"
LAYOUT_BRIEF_FILENAME = "layout_brief.yaml"


class LayoutTask(Protocol):
    """Start a layout generation. Returns the design folder's id.

    ``app`` is the authored mock to fork; ``theme_run`` the run whose palette
    and typefaces the layout is designed on top of. Neither is a field on the
    brief, deliberately: a `LayoutBrief` says what a layout IS, in prose, and
    it is the file that ships beside the mock. Which base it forked and which
    run it was made against are properties of the JOB, and the brief's own
    long_desc is where a fork says so in words (see the base's and Zen BJJ's).
    """

    async def start(
        self, brief: LayoutBrief, *, app: str, theme_run: str | None = None
    ) -> str: ...


class _LayoutTaskBase:
    """The half both implementations share: slug, copy, write the brief.

    Split out rather than duplicated because getting the copy wrong is the one
    step that can destroy work — an existing folder must be refused, never
    overwritten — and a stub that skipped that check would be a stub that
    behaves differently from the thing it stands in for in exactly the way
    that matters.
    """

    def __init__(
        self, apps_dir: Path, sessions: SessionRegistry
    ) -> None:
        self._apps_dir = apps_dir
        self._sessions = sessions

    async def _prepare(
        self, brief: LayoutBrief, app: str
    ) -> tuple[str, Path]:
        """Copy the base app to ``gen-<slug>/`` and write the brief into it."""
        design_id = f"{GENERATED_PREFIX}{slugify(brief.name)}"
        base = self._apps_dir / app
        target = self._apps_dir / design_id

        # Checked by identity, not by pattern: the resolved base must still be
        # inside the apps dir, so no `app` value can walk out of the tree.
        if not base.resolve().is_relative_to(self._apps_dir.resolve()):
            raise UnknownAppError(f"no such mock app {app!r}")
        if not await asyncio.to_thread(base.is_dir):
            raise UnknownAppError(
                f"no such mock app {app!r} (expected {base})"
            )
        if await asyncio.to_thread(target.exists):
            # Two generations called the same thing ARE the same thing. Refuse
            # and let the caller ask for another name — the same courtesy
            # RunNameTakenError extends, and for the same reason: this is the
            # one path here that could destroy generated work.
            raise DesignNameTakenError(design_id)

        await asyncio.to_thread(shutil.copytree, base, target)
        await asyncio.to_thread(self._write_brief, target, brief)
        logger.info("prepared design folder %s from %s", design_id, app)
        return design_id, target

    @staticmethod
    def _write_brief(target: Path, brief: LayoutBrief) -> None:
        """The brief, as readable YAML, beside the code it describes.

        Same dump settings as ``BriefService`` — ``sort_keys=False`` so the
        fields stay in the order the model declares them, which is the order a
        person reads them in.
        """
        (target / LAYOUT_BRIEF_FILENAME).write_text(
            yaml.safe_dump(
                brief.model_dump(mode="json"),
                sort_keys=False,
                allow_unicode=True,
                default_flow_style=False,
            ),
            encoding="utf-8",
        )


class SubprocessLayoutTask(_LayoutTaskBase):
    """Run the configured command against the prepared folder."""

    def __init__(
        self,
        apps_dir: Path,
        sessions: SessionRegistry,
        command: list[str],
    ) -> None:
        super().__init__(apps_dir, sessions)
        self._command = command
        # Background tasks are only weakly referenced by the event loop, so a
        # pump could be garbage-collected mid-flight. Hold each until it ends.
        self._tasks: set[asyncio.Task[None]] = set()

    async def start(
        self, brief: LayoutBrief, *, app: str, theme_run: str | None = None
    ) -> str:
        design_id, target = await self._prepare(brief, app)
        # A LIST, never a shell string, and never built from anything a model
        # produced — the only interpolated value is the cwd, which is a path
        # this service derived itself.
        proc = await asyncio.create_subprocess_exec(
            *self._command,
            cwd=target,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
        )
        task = asyncio.create_task(self._pump(proc, design_id))
        self._tasks.add(task)
        task.add_done_callback(self._tasks.discard)
        return design_id

    async def _pump(
        self, proc: asyncio.subprocess.Process, design_id: str
    ) -> None:
        """Every line the agent prints becomes one session record.

        The transcript is the only place this work is visible, so a silent
        subprocess and a hung one look identical — which is the failure this
        exists to prevent.
        """
        session_id = self._sessions.active_id
        assert proc.stdout is not None  # PIPE, set above
        async for raw in proc.stdout:
            line = raw.decode(errors="replace").rstrip()
            if line and session_id is not None:
                await self._sessions.task(
                    session_id, task="layout", state="progress", line=line
                )
        code = await proc.wait()
        logger.info("layout agent for %s exited %d", design_id, code)
        if session_id is not None:
            await self._sessions.task(
                session_id,
                task="layout",
                state="finished" if code == 0 else "failed",
                design_id=design_id,
                error=None if code == 0 else f"the layout agent exited {code}",
            )


class StubLayoutTask(_LayoutTaskBase):
    """No command configured: prepare the folder, settle, say so plainly.

    It makes no edit to the copy. A stub that scribbled something would make
    the demo look like it worked, which is the one thing a stub must not do —
    the transcript says no agent ran, and the folder is an honest untouched
    copy of the base.
    """

    async def start(
        self, brief: LayoutBrief, *, app: str, theme_run: str | None = None
    ) -> str:
        design_id, _ = await self._prepare(brief, app)
        session_id = self._sessions.active_id
        if session_id is not None:
            await self._sessions.task(
                session_id,
                task="layout",
                state="progress",
                line=(
                    "No layout agent is configured (LAYOUT_AGENT_COMMAND is "
                    "empty), so the folder is an unedited copy of the base."
                ),
            )
            await self._sessions.task(
                session_id,
                task="layout",
                state="finished",
                design_id=design_id,
            )
        return design_id


_task: LayoutTask | None = None


def layout_task() -> LayoutTask:
    """The process-wide layout task.

    Which implementation is a configuration question, not a code one: with no
    command configured the stub runs, so the whole flow is walkable on a
    machine that has no agent set up at all.
    """
    global _task
    if _task is None:
        apps_dir = settings.mockup_apps_dir
        sessions = session_registry()
        command = settings.layout_agent_command
        _task = (
            SubprocessLayoutTask(apps_dir, sessions, command)
            if command
            else StubLayoutTask(apps_dir, sessions)
        )
        if not command:
            logger.warning(
                "no LAYOUT_AGENT_COMMAND configured; layout generations will "
                "copy the base mock and settle without editing it"
            )
    return _task
