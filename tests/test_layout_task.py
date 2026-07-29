"""Layout task tests — the copy, the brief on disk, and the refusal.

No agent and no subprocess: what is worth locking down here is the part that
touches the filesystem. The copy is the one step in the layout half that can
destroy generated work, so the test that matters most is the one asserting it
refuses rather than overwrites.
"""

from __future__ import annotations

import asyncio
from pathlib import Path

import pytest
import yaml

from RecomposeAPI.studio.errors import DesignNameTakenError, UnknownAppError
from RecomposeAPI.studio.schema.layout_brief import Direction, LayoutBrief
from RecomposeAPI.studio.service.layout_task import (
    GENERATED_PREFIX,
    LAYOUT_BRIEF_FILENAME,
    StubLayoutTask,
)
from RecomposeAPI.studio.service.session_registry import SessionRegistry


def _brief(name: str = "Quiet Morning") -> LayoutBrief:
    """A LayoutBrief carries only what a layout IS. Which base it forks and
    which run it is designed against are arguments to `start`."""
    return LayoutBrief(
        name=name,
        layout_direction=Direction(
            short_desc="Lead with the next class.",
            long_desc="The schedule is why people open this, so it leads.",
        ),
        motion_direction=Direction(
            short_desc="Restrained.",
            long_desc="Things settle in; nothing bounces.",
        ),
    )


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

    design_id = asyncio.run(layout.start(_brief(), app="combatden"))

    assert design_id == f"{GENERATED_PREFIX}quiet-morning"
    target = apps / design_id
    assert target.is_dir()
    # The whole tree, not just the top level.
    assert (target / "index.ts").read_text() == "export const APP = 1;\n"
    assert (target / "home" / "HomeShowcase.tsx").is_file()
    # And the base is untouched.
    assert (apps / "combatden" / "index.ts").is_file()


def test_the_brief_lands_beside_the_code_it_describes(task) -> None:
    """The agent is handed a directory and a YAML file; this is that file."""
    layout, apps = task

    design_id = asyncio.run(layout.start(_brief(), app="combatden"))

    written = yaml.safe_load(
        (apps / design_id / LAYOUT_BRIEF_FILENAME).read_text(encoding="utf-8")
    )
    assert written["name"] == "Quiet Morning"
    # Both directions carry the same two fields and nothing else — the same
    # shape as a brand brief's `design_direction`.
    for group in ("layout_direction", "motion_direction"):
        assert set(written[group]) == {"short_desc", "long_desc"}
    # Field order is the model's, because that is the order a person reads.
    assert list(written) == ["name", "layout_direction", "motion_direction"]


def test_a_repeated_name_is_refused_not_overwritten(task) -> None:
    """THE test in this file. Two generations called the same thing are the
    same thing; silently overwriting one would delete an agent's work."""
    layout, apps = task
    design_id = asyncio.run(layout.start(_brief(), app="combatden"))
    (apps / design_id / "index.ts").write_text("// edited\n", encoding="utf-8")

    with pytest.raises(DesignNameTakenError):
        asyncio.run(layout.start(_brief(), app="combatden"))

    # The edit survives, which is the point of refusing.
    assert (apps / design_id / "index.ts").read_text() == "// edited\n"


def test_an_unsluggable_name_is_refused(task) -> None:
    """Better a clear refusal than a directory called `gen-`."""
    layout, _ = task

    with pytest.raises(ValueError, match="cannot derive a filename"):
        asyncio.run(layout.start(_brief(name="!!!"), app="combatden"))


def test_an_unknown_base_app_is_refused(task) -> None:
    """Named apps are checked before anything is created."""
    layout, _ = task

    with pytest.raises(UnknownAppError):
        asyncio.run(layout.start(_brief(), app="nosuchapp"))


def test_the_base_app_cannot_walk_out_of_the_apps_tree(task) -> None:
    """`app` reaches the filesystem, so it is checked by resolved identity
    rather than by pattern — the same rule the run launcher holds."""
    layout, _ = task

    with pytest.raises(UnknownAppError):
        asyncio.run(layout.start(_brief(), app="../../etc"))
