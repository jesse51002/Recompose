"""LayoutTask — make the design folder, point the layout agent at it.

**The studio does not author a layout direction, and that is the whole design
of this file.** It used to: the orchestrator interviewed the owner about layout
and motion, proposed a `LayoutBrief`, and wrote it into the folder for the agent
to obey. That was the wrong agent doing the wrong job. The layout agent runs
`mockup-redesign-start`, whose FIRST step is to open the run's generated images,
read its palette and typefaces, and commit to a visual world — with a bigger
context window, a browser, and its own skills. It writes `layout_brief.yaml`
itself, before it writes any code. A brief authored out here could only be a
thinner guess made by something that has not seen the pictures.

It also asked the owner for a layout direction, and most people simply do not
have one. Asking produced either a shrug or an answer invented to fill the box.

So this file owns four things and no more:

1. name the design folder DETERMINISTICALLY from the run it belongs to,
2. copy the base mock app into it,
3. run a configured command with a prompt naming the app, the run and the
   folder,
4. pump its stdout into the session as it goes.

**The contract with the agent is one argument.** The configured argv gets the
effort flag and then one final element: the launch prompt, in absolute paths.
Nothing here needs to know how the agent works, and the agent needs to know
nothing about this service.

**Why a folder copy and not a branch.** A design is a sibling directory under
``JsxMockUps/src/apps/``, so ``ls`` is the list of designs and the undo
is ``rm -rf``. The ``gen-`` prefix is what lets one ``.gitignore`` line cover
every generated folder without a negation per authored app.

**Why the copy happens here rather than in the agent.** A folder that is a
working copy of the base compiles and hot-reloads from the first second, so the
reviewer watches a real app being rearranged. An agent starting from an empty
directory would leave the canvas broken until it finished, which is the one
thing this page exists not to do.
"""

from __future__ import annotations

import asyncio
import logging
import os
import shutil
import signal
from pathlib import Path
from typing import Protocol

from Backend.studio.config import settings
from Backend.studio.errors import LayoutInFlightError, UnknownAppError
from Backend.studio.service.session_registry import (
    SessionRegistry,
    session_registry,
)

logger = logging.getLogger(__name__)

# Generated folders are prefixed so `.gitignore` is one unambiguous line. The
# prefix never reaches a human: a picker shows `MockApp.label`.
GENERATED_PREFIX = "gen-"

# The env var whose presence decides whether a coding-agent CLI bills API
# credits or the operator's subscription. See `_env`.
ANTHROPIC_KEY_VAR = "ANTHROPIC_API_KEY"

# How long a terminated agent gets to exit before it is killed. Short on
# purpose: this exists because an agent left running costs money, and one
# that does not act on a TERM is exactly the one worth killing.
TERMINATE_GRACE_SECONDS = 5.0

# What the agent is told. Three properties, each load-bearing:
#
# 1. **It opens with `/goal`.** That is what makes the agent run the job to
#    completion on its own instead of stopping at the first natural pause and
#    waiting for a human who is not watching. A redesign is a dozen screens
#    behind several skills; an agent that halts halfway leaves a half-built
#    folder hot-reloading into the reviewer's canvas.
# 2. **Absolute paths throughout**, so the job does not depend on the command's
#    working directory being guessed correctly — the one place a hand-off like
#    this usually breaks.
# 3. **It names WHAT and WHERE and stops.** It does not say how to design: that
#    is the `mockup-redesign-start` skill's job, and repeating a worse version
#    of it here is how the two drift apart.
LAUNCH_PROMPT = """\
/goal Create the redesigned mock app at {target}. It is a fresh copy of the \
{app} base and must end up reading as a different piece of design, not as the \
base recoloured.

It is being designed for one specific theme, which is already produced and \
finished: {run_dir}. Open that run before deciding anything — the generated \
images in final_images/, the icons in icons/, the palette and typefaces in \
output.yaml, and the brand brief in customization.yaml. The layout is being \
built for those pixels.

Follow the mockup-redesign-start skill from its first step, including writing \
{target}/layout_brief.yaml before you write any code, and then run every skill \
it hands off to. The design folder already exists as a working copy of the \
base, so edit it in place rather than creating it.

Finish all the steps and run all the skills needed to complete this mockup. Do \
not skip any steps.\
"""


class LayoutTask(Protocol):
    """Start a layout generation. Returns the design folder's id.

    ``app`` is the authored mock to fork; ``theme_run`` the run whose palette,
    imagery and typefaces the layout is designed for, and also what the folder
    is NAMED after — one design per theme, derived rather than asked for.
    """

    async def start(self, *, app: str, theme_run: str) -> str: ...

    async def stop(self) -> int:
        """Kill every layout agent this task has running. Returns how many.

        Idempotent, and safe when nothing is running. Exists because a layout
        agent is the most expensive thing this service can start and the only
        one that keeps spending after the page that started it is closed.

        Its counterpart is `start`, and they are a PAIR: a Stop with no way
        back would mean regenerating a whole theme to get another layout
        attempt, so stopping would cost more than letting a bad run finish.
        """
        ...


class _LayoutTaskBase:
    """The half both implementations share: name the folder, copy the base.

    Split out rather than duplicated because getting the copy wrong is the one
    step that can destroy work — an existing folder must be reused, never
    re-copied over — and a stub that skipped that would behave differently
    from the thing it stands in for in exactly the way that matters.
    """

    def __init__(self, apps_dir: Path, sessions: SessionRegistry) -> None:
        self._apps_dir = apps_dir
        self._sessions = sessions

    async def _prepare(self, app: str, theme_run: str) -> tuple[str, Path]:
        """Ensure ``gen-<theme_run>/`` exists as a copy of the base app.

        The folder's name is the RUN's, so a design's two halves are legible as
        a pair from the filesystem alone — ``apps/combatden/bike-maniacs/`` and
        ``src/apps/gen-bike-maniacs/`` — with no field in either pointing at
        the other. The run name is already a slug (the launcher only ever
        creates one), so there is nothing left to slugify.

        **An existing folder is reused, never re-copied.** It used to be
        refused, on the reasoning that two designs wanting one name are the
        same design. That reasoning died with the naming: the folder is the
        run's now, so an existing one can only mean this run has been laid out
        before — and the right answer to that is to carry on editing it. Both
        alternatives are worse than reuse: refusing makes Stop a one-way door
        (the only way back would be redoing the whole theme), and re-copying
        the base would silently delete whatever the last agent wrote.
        """
        design_id = f"{GENERATED_PREFIX}{theme_run}"
        base = self._apps_dir / app
        target = self._apps_dir / design_id

        # Checked by identity, not by pattern: the resolved base must still be
        # inside the apps dir, so no `app` value can walk out of the tree.
        if not base.resolve().is_relative_to(self._apps_dir.resolve()):
            raise UnknownAppError(f"no such mock app {app!r}")
        if not await asyncio.to_thread(base.is_dir):
            raise UnknownAppError(f"no such mock app {app!r} (expected {base})")

        if await asyncio.to_thread(target.exists):
            logger.info("reusing existing design folder %s", design_id)
        else:
            await asyncio.to_thread(shutil.copytree, base, target)
            logger.info("prepared design folder %s from %s", design_id, app)
        return design_id, target

    def _refuse_if_running(self, design_id: str) -> None:
        """One agent per design, because two would corrupt the folder.

        Two agents editing one tree interleave writes into the same files and
        the loser's work is gone — nothing records what it was about to write.
        This is the only exclusivity the layout half needs.
        """
        if self._live_design_ids() & {design_id}:
            raise LayoutInFlightError(design_id)

    def _live_design_ids(self) -> set[str]:
        """Design ids with an agent running. Empty unless overridden."""
        return set()

    @staticmethod
    def _prompt(app: str, theme_run: str, target: Path) -> str:
        """The one argument the agent receives."""
        run_dir = settings.apps_root / app / theme_run
        prompt = LAUNCH_PROMPT.format(target=target, app=app, run_dir=run_dir)
        steer = settings.layout_steer.strip()
        return f"{prompt}\n\n{steer}" if steer else prompt

    @staticmethod
    def _env() -> dict[str, str]:
        """The child's environment, and the one thing deliberately taken out.

        A coding-agent CLI bills to ``ANTHROPIC_API_KEY`` when it finds one and
        to its own logged-in subscription when it does not. A subprocess
        inherits this process's environment, so leaving the key in would make
        "who pays for a two-hour redesign" depend on whether someone exported
        it in the shell that started the API — a difference that is invisible
        until a bill arrives. Stripped by default, deliberate when not.
        """
        env = dict(os.environ)
        if not settings.layout_agent_inherit_api_key:
            env.pop(ANTHROPIC_KEY_VAR, None)
        return env


class SubprocessLayoutTask(_LayoutTaskBase):
    """Run the configured command against the prepared folder."""

    def __init__(
        self, apps_dir: Path, sessions: SessionRegistry, command: list[str]
    ) -> None:
        super().__init__(apps_dir, sessions)
        self._command = command
        # Background tasks are only weakly referenced by the event loop, so a
        # pump could be garbage-collected mid-flight. Hold each until it ends.
        self._tasks: set[asyncio.Task[None]] = set()
        # Every agent currently running, by pid. The ONE thing this service
        # holds that must not be lost: an agent nobody has a handle to is an
        # agent nobody can stop, and it bills for as long as it lives.
        self._running: dict[int, tuple[str, asyncio.subprocess.Process]] = {}

    def _live_design_ids(self) -> set[str]:
        return {design_id for design_id, _ in self._running.values()}

    def _argv(self, app: str, theme_run: str, target: Path) -> list[str]:
        """The whole command line: configured argv, effort, then the prompt.

        The prompt goes LAST and stays one element, so nothing in it can be
        read as a flag or a command however it is punctuated.
        """
        effort = settings.layout_agent_effort.strip()
        return [
            *self._command,
            *(["--effort", effort] if effort else []),
            self._prompt(app, theme_run, target),
        ]

    async def start(self, *, app: str, theme_run: str) -> str:
        self._refuse_if_running(f"{GENERATED_PREFIX}{theme_run}")
        design_id, target = await self._prepare(app, theme_run)
        # A LIST, never a shell string, and never passed through a shell — the
        # prompt is a single argv element, so nothing in it can be read as a
        # command however it is punctuated.
        #
        # `start_new_session` puts the agent in its OWN process group, and that
        # is what makes it killable. A coding agent spawns children of its own
        # — subagents, language servers, test runners — so signalling the one
        # process we hold a handle to would leave the expensive half of the
        # tree running, reparented to init and invisible.
        proc = await asyncio.create_subprocess_exec(
            *self._argv(app, theme_run, target),
            cwd=settings.layout_agent_cwd,
            env=self._env(),
            start_new_session=True,
            # NOTHING IS EVER TYPED AT THIS AGENT. A coding-agent CLI reads
            # stdin for piped input and waits when it is a terminal it will
            # never receive anything on — and a child inherits this server's
            # stdin, which is whichever terminal `make api` was started from.
            # DEVNULL is what makes the agent start working immediately
            # instead of stalling on input that is never coming, and stops two
            # agents from ever competing to read the operator's keystrokes.
            stdin=asyncio.subprocess.DEVNULL,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
        )
        self._running[proc.pid] = (design_id, proc)
        logger.info(
            "layout agent for %s started as pid %d", design_id, proc.pid
        )
        task = asyncio.create_task(self._pump(proc, design_id))
        self._tasks.add(task)
        task.add_done_callback(self._tasks.discard)
        return design_id

    async def stop(self) -> int:
        """Kill every running agent, whole process group at a time.

        SIGTERM to the group first so the agent can end cleanly, then SIGKILL
        to whatever is still there. Killing the GROUP rather than the process
        is the whole point — see `start`.

        Returns how many were signalled, so a caller can say "nothing was
        running" rather than implying it stopped something.
        """
        running = [proc for _, proc in self._running.values()]
        for proc in running:
            self._signal_group(proc, signal.SIGTERM)
        if not running:
            return 0
        # A short grace period, then unconditional. An agent mid-tool-call may
        # not act on a TERM at all, and the reason this exists is cost — a
        # process that ignores the polite signal is exactly the one to kill.
        _, pending = await asyncio.wait(
            [asyncio.create_task(proc.wait()) for proc in running],
            timeout=TERMINATE_GRACE_SECONDS,
        )
        for task in pending:
            task.cancel()
        for proc in running:
            if proc.returncode is None:
                self._signal_group(proc, signal.SIGKILL)
        return len(running)

    @staticmethod
    def _signal_group(
        proc: asyncio.subprocess.Process, sig: signal.Signals
    ) -> None:
        """Signal the agent's whole process group, tolerating a dead one.

        The race is unavoidable and benign: the agent can exit between the
        returncode check and the signal, and `ProcessLookupError` is what that
        looks like. It means the thing we wanted gone is gone.
        """
        if proc.returncode is not None:
            return
        try:
            os.killpg(os.getpgid(proc.pid), sig)
        except (ProcessLookupError, PermissionError):
            logger.debug("layout agent %d was already gone", proc.pid)

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
        self._running.pop(proc.pid, None)
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

    async def stop(self) -> int:
        """Nothing runs, so nothing stops. Not an error — the flow is meant to
        be walkable with no agent configured at all."""
        return 0

    async def start(self, *, app: str, theme_run: str) -> str:
        design_id, _ = await self._prepare(app, theme_run)
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
