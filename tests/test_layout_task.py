"""Layout task tests — the copy, the launch prompt, and the refusal.

No agent and no subprocess: what is worth locking down here is the part that
touches the filesystem. The copy is the one step in the layout half that can
destroy generated work, so the test that matters most is the one asserting it
refuses rather than overwrites.

**Nothing here writes a `layout_brief.yaml` any more.** The studio used to
author one and drop it into the folder for the agent to obey; the agent writes
its own now, at the start of its run, having actually opened the generated
images. What this service hands over is a directory and a prompt.
"""

from __future__ import annotations

import asyncio
import os
from pathlib import Path

import pytest

from RecomposeAPI.studio.config import settings
from RecomposeAPI.studio.errors import LayoutInFlightError, UnknownAppError
from RecomposeAPI.studio.service.layout_task import (
    ANTHROPIC_KEY_VAR,
    GENERATED_PREFIX,
    StubLayoutTask,
    SubprocessLayoutTask,
)
from RecomposeAPI.studio.service.session_registry import SessionRegistry

RUN = "quiet-morning"


@pytest.fixture
def task(tmp_path: Path):
    """A stub task over a fake apps dir holding one base app."""
    apps = tmp_path / "apps"
    base = apps / "combatden"
    (base / "home").mkdir(parents=True)
    (base / "index.ts").write_text("export const APP = 1;\n", encoding="utf-8")
    (base / "home" / "HomeShowcase.tsx").write_text("//\n", encoding="utf-8")
    registry = SessionRegistry(tmp_path / "sessions")
    return StubLayoutTask(apps, registry), apps


def test_it_copies_the_base_into_a_prefixed_folder(task) -> None:
    """`gen-` is what lets one .gitignore line cover every generation without
    a negation per authored app — so the prefix is a contract, not cosmetics."""
    layout, apps = task

    design_id = asyncio.run(layout.start(app="combatden", theme_run=RUN))

    assert design_id == f"{GENERATED_PREFIX}{RUN}"
    target = apps / design_id
    assert target.is_dir()
    # The whole tree, not just the top level.
    assert (target / "index.ts").read_text() == "export const APP = 1;\n"
    assert (target / "home" / "HomeShowcase.tsx").is_file()
    # And the base is untouched.
    assert (apps / "combatden" / "index.ts").is_file()


def test_the_folder_is_named_after_the_run_not_asked_for(task) -> None:
    """A design's two halves are legible as a pair from the filesystem alone.

    `apps/combatden/quiet-morning/` and `src/apps/gen-quiet-morning/` — no
    field in either pointing at the other, and no name for anyone to invent.
    """
    layout, _ = task

    first = asyncio.run(layout.start(app="combatden", theme_run=RUN))
    second_run = "other-run"
    second = asyncio.run(layout.start(app="combatden", theme_run=second_run))

    assert first == f"{GENERATED_PREFIX}{RUN}"
    assert second == f"{GENERATED_PREFIX}{second_run}"


def test_the_studio_writes_no_layout_brief(task) -> None:
    """The agent authors its own, and this is the assertion that keeps it so.

    A `layout_brief.yaml` appearing here again would mean the studio had gone
    back to guessing a direction without having seen the theme's images.
    """
    layout, apps = task

    design_id = asyncio.run(layout.start(app="combatden", theme_run=RUN))

    assert not (apps / design_id / "layout_brief.yaml").exists()


def test_a_second_start_continues_the_folder_and_never_re_copies(task) -> None:
    """THE test in this file: an agent's work must survive a restart.

    Starting again on the same run means "carry on with this design" — after
    a Stop, or for another pass. Re-copying the base would silently delete
    everything the previous agent wrote, and refusing outright would make Stop
    a one-way door whose only escape was regenerating the whole theme.
    """
    layout, apps = task
    design_id = asyncio.run(layout.start(app="combatden", theme_run=RUN))
    (apps / design_id / "index.ts").write_text("// redesigned\n", encoding="utf-8")

    again = asyncio.run(layout.start(app="combatden", theme_run=RUN))

    assert again == design_id
    # The work survives, which is the whole point.
    assert (apps / design_id / "index.ts").read_text() == "// redesigned\n"


def test_an_unknown_base_app_is_refused(task) -> None:
    """Named apps are checked before anything is created."""
    layout, _ = task

    with pytest.raises(UnknownAppError):
        asyncio.run(layout.start(app="nosuchapp", theme_run=RUN))


def test_the_base_app_cannot_walk_out_of_the_apps_tree(task) -> None:
    """`app` reaches the filesystem, so it is checked by resolved identity
    rather than by pattern — the same rule the run launcher holds."""
    layout, _ = task

    with pytest.raises(UnknownAppError):
        asyncio.run(layout.start(app="../../etc", theme_run=RUN))


# --- the hand-off ---------------------------------------------------------


def test_the_prompt_names_the_folder_and_the_run_absolutely(
    task, monkeypatch
) -> None:
    """The whole contract is one argument, so it has to be self-contained.

    Relative paths here would make the job depend on the command's working
    directory being guessed right, which is exactly where a hand-off like this
    usually breaks.
    """
    _, apps = task
    monkeypatch.setattr(settings, "layout_steer", "")
    target = apps / f"{GENERATED_PREFIX}{RUN}"

    prompt = SubprocessLayoutTask._prompt("combatden", RUN, target)

    assert str(target) in prompt
    assert str(settings.apps_root / "combatden" / RUN) in prompt
    # It points at the skill rather than restating a worse version of it.
    assert "mockup-redesign-start" in prompt
    assert "layout_brief.yaml" in prompt


def test_the_prompt_opens_with_the_goal_command(task, monkeypatch) -> None:
    """`/goal` is what makes the agent run the job to completion.

    A redesign is a dozen screens behind several skills. Without it the agent
    stops at the first natural pause and waits for a human who is not
    watching — leaving a half-built folder hot-reloading into the reviewer's
    canvas, which reads as a broken app rather than an unfinished one.
    """
    _, apps = task
    monkeypatch.setattr(settings, "layout_steer", "")

    prompt = SubprocessLayoutTask._prompt(
        "combatden", RUN, apps / f"{GENERATED_PREFIX}{RUN}"
    )

    assert prompt.startswith("/goal ")
    assert "Do not skip any steps." in prompt


def test_the_steer_is_appended_when_set(task, monkeypatch) -> None:
    """The one seam a human leans on, since the studio authors no direction."""
    _, apps = task
    monkeypatch.setattr(settings, "layout_steer", "Lean editorial.")

    prompt = SubprocessLayoutTask._prompt(
        "combatden", RUN, apps / f"{GENERATED_PREFIX}{RUN}"
    )

    assert prompt.endswith("Lean editorial.")


def test_the_api_key_is_stripped_from_the_agents_environment(
    monkeypatch,
) -> None:
    """WHO PAYS FOR A TWO-HOUR REDESIGN, decided here rather than by accident.

    A coding-agent CLI bills to `ANTHROPIC_API_KEY` when it finds one and to
    its own logged-in subscription when it does not. A child inherits this
    process's environment, so without this the answer would depend on whether
    someone exported the key in the shell that started the API — invisible
    either way, and only discovered on a bill.
    """
    monkeypatch.setenv(ANTHROPIC_KEY_VAR, "sk-should-not-reach-the-agent")
    monkeypatch.setattr(settings, "layout_agent_inherit_api_key", False)

    assert ANTHROPIC_KEY_VAR not in SubprocessLayoutTask._env()


def test_the_api_key_can_be_passed_through_deliberately(monkeypatch) -> None:
    """Billing credits is allowed — it just has to be asked for."""
    monkeypatch.setenv(ANTHROPIC_KEY_VAR, "sk-deliberate")
    monkeypatch.setattr(settings, "layout_agent_inherit_api_key", True)

    assert SubprocessLayoutTask._env()[ANTHROPIC_KEY_VAR] == "sk-deliberate"


# --- killing the agent ----------------------------------------------------
#
# The most expensive thing this service starts, and the only one that keeps
# spending after the page that started it is closed. These use a real
# subprocess that spawns a real child, because the failure being guarded
# against — signalling the parent and leaving the tree — cannot be observed
# with a mock.


def _sleeper_task(tmp_path: Path) -> SubprocessLayoutTask:
    """A layout task whose 'agent' backgrounds a child and then waits.

    The appended launch prompt lands in `$0`, which `sh` ignores.
    """
    apps = tmp_path / "apps"
    (apps / "combatden").mkdir(parents=True)
    (apps / "combatden" / "index.ts").write_text("//\n", encoding="utf-8")
    return SubprocessLayoutTask(
        apps,
        SessionRegistry(tmp_path / "sessions"),
        ["sh", "-c", "sleep 300 & sleep 300"],
    )


def test_stopping_kills_the_agents_whole_process_tree(tmp_path: Path) -> None:
    """A coding agent spawns children — subagents, servers, test runners.

    Signalling only the process we hold a handle to would leave the expensive
    half of the tree running, reparented to init and invisible to the tool
    that started it. The agent is put in its own process group so the kill
    takes the group, and this is the test that says so.
    """
    task = _sleeper_task(tmp_path)

    async def scenario() -> tuple[int, list[int]]:
        await task.start(app="combatden", theme_run=RUN)
        _, proc = next(iter(task._running.values()))
        group = os.getpgid(proc.pid)
        # The backgrounded `sleep` has to actually exist before we can prove
        # it was reaped with its parent.
        for _ in range(50):
            if _pids_in_group(group):
                break
            await asyncio.sleep(0.05)
        before = _pids_in_group(group)
        stopped = await task.stop()
        for _ in range(50):
            if not _pids_in_group(group):
                break
            await asyncio.sleep(0.05)
        return stopped, before

    stopped, before = asyncio.run(scenario())

    assert stopped == 1
    # The shell AND the sleep it backgrounded — more than one process, which
    # is the whole reason the group kill exists.
    assert len(before) >= 2, f"expected a tree, saw {before}"
    assert task._running == {}


def test_stopping_when_nothing_runs_is_not_an_error(tmp_path: Path) -> None:
    """Asking twice is the normal way to be sure, and the count is how the
    page says 'nothing was running' instead of implying it stopped one."""
    task = _sleeper_task(tmp_path)

    assert asyncio.run(task.stop()) == 0


def _pids_in_group(pgid: int) -> list[int]:
    """Every live pid in one process group, read off /proc."""
    found: list[int] = []
    for entry in Path("/proc").iterdir():
        if not entry.name.isdigit():
            continue
        try:
            if os.getpgid(int(entry.name)) == pgid:
                found.append(int(entry.name))
        except (ProcessLookupError, PermissionError, ValueError):
            continue
    return found


def test_a_second_agent_on_one_design_is_refused(tmp_path: Path) -> None:
    """The one exclusivity the layout half needs.

    Two agents editing one folder interleave writes into the same files, and
    the loser's work is unrecoverable — nothing records what it was about to
    write. Note this is the AGENT being exclusive, not the folder: starting
    again after the first has exited is allowed and expected.
    """
    task = _sleeper_task(tmp_path)

    async def scenario() -> None:
        await task.start(app="combatden", theme_run=RUN)
        try:
            with pytest.raises(LayoutInFlightError):
                await task.start(app="combatden", theme_run=RUN)
        finally:
            await task.stop()

    asyncio.run(scenario())


def test_the_effort_flag_is_passed_as_argv_not_a_slash_command(
    tmp_path: Path, monkeypatch
) -> None:
    """Effort is a FLAG, and that is a deliberate choice over `/effort`.

    The prompt already opens with `/goal`. Whether a second slash command on a
    later line is parsed as a command or read as prose is not something worth
    betting a two-hour run on, and the flag is unambiguous — the CLI even
    validates it and warns on an unknown value.
    """
    task = _sleeper_task(tmp_path)
    monkeypatch.setattr(settings, "layout_agent_effort", "medium")

    argv = task._argv("combatden", RUN, tmp_path / "target")

    assert argv[-3:-1] == ["--effort", "medium"]
    # The prompt stays LAST and stays one element, so nothing in it can be
    # read as a flag however it is punctuated.
    assert argv[-1].startswith("/goal ")


def test_an_empty_effort_omits_the_flag(tmp_path: Path, monkeypatch) -> None:
    """For a configured command that does not accept `--effort` at all."""
    task = _sleeper_task(tmp_path)
    monkeypatch.setattr(settings, "layout_agent_effort", "")

    argv = task._argv("combatden", RUN, tmp_path / "target")

    assert "--effort" not in argv
