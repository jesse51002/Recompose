"""BriefService — validate a brand brief and commit it to disk.

The one validate-and-commit path. The plain form posts to it today; the
conversational (Pydantic AI) authoring agent — a deliberate follow-up, not
built here — accepts into this same method, so there is never a second
place that decides what a valid brief is.

Briefs land in ``.studio/briefs/<slug>.yaml``. Deliberately **not**
``apps/<app_id>/customization.yaml``: that file is a checked-in input and
what ``make run`` generates from, so writing it here would silently change
what a plain `make run` does.

A brief is an editable *input*, not a produced artifact, so re-committing
the same slug overwrites it. The iron-clad no-hand-editing rule
(``CLAUDE.md``) protects a run's produced artifacts; it does not freeze a
draft brief.
"""

from __future__ import annotations

import asyncio
import logging
from pathlib import Path

import yaml

from schema import Customization
from ThemeTree.core.util import load_yaml
from RecomposeAPI.studio.config import BRIEF_SUFFIX, settings
from RecomposeAPI.studio.errors import UnknownBriefError
from RecomposeAPI.studio.schema.brief_request import BriefCommitted, BriefRequest
from RecomposeAPI.studio.service.slug import slugify

logger = logging.getLogger(__name__)


class BriefService:
    """Writes validated briefs; reads them back for a launch."""

    def __init__(self, briefs_dir: Path) -> None:
        self._briefs_dir = briefs_dir

    async def commit(self, request: BriefRequest) -> BriefCommitted:
        """Validate the five fields and write the brief.

        Raises ``pydantic.ValidationError`` if a field is blank — the
        validators live on ``Customization`` and this path runs them.
        """
        brief = request.build()
        slug = (
            str(request.slug)
            if request.slug is not None
            else slugify(request.name)
        )
        path = self._briefs_dir / f"{slug}{BRIEF_SUFFIX}"
        await asyncio.to_thread(self._write, path, brief)
        logger.info("committed brief %s -> %s", slug, path)
        return BriefCommitted(slug=slug, path=str(path), brief=brief)

    async def load(self, slug: str) -> Customization:
        """A saved brief, re-validated on the way in."""
        path = self._briefs_dir / f"{slug}{BRIEF_SUFFIX}"
        if not await asyncio.to_thread(path.is_file):
            raise UnknownBriefError(
                f"no saved brief {slug!r} (expected {path})"
            )
        raw = await asyncio.to_thread(load_yaml, path)
        return Customization.model_validate(raw)

    @staticmethod
    def _write(path: Path, brief: Customization) -> None:
        """Serialize one validated brief to readable YAML."""
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(
            yaml.safe_dump(
                brief.model_dump(mode="json"),
                sort_keys=False,
                allow_unicode=True,
                default_flow_style=False,
            ),
            encoding="utf-8",
        )


_service: BriefService | None = None


def brief_service() -> BriefService:
    """The process-wide brief service."""
    global _service
    if _service is None:
        _service = BriefService(settings.briefs_dir)
    return _service
