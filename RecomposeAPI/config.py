"""API settings — where the runs live, plus CORS, from env / `.env`."""

from __future__ import annotations

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# This file is <root>/RecomposeAPI/config.py; runs live in <root>/apps — so the
# root is TWO hops up (config.py -> RecomposeAPI -> root), not three. The third
# hop was invisible in the main checkout, where <root>/.. happens to contain a
# sibling that no request ever reached for, and fatal inside a git worktree,
# where it lands on `.claude/worktrees/` and every styles request 404s.
#
# `RecomposeAPI/studio/config.py` keeps THREE hops and is correct: it sits one
# directory deeper. The two are not copies of each other and must not be
# "made consistent" by matching the numbers.
_ROOT = Path(__file__).resolve().parent.parent
_DEFAULT_APPS_ROOT = _ROOT / "apps"


class Settings(BaseSettings):
    """Read-only API config. Env vars (or `.env`) override every default."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Root that holds `<app_id>/<run_id>/output.yaml` + images.
    apps_root: Path = _DEFAULT_APPS_ROOT
    # No auth: the emulator hits this directly. `["*"]` keeps it open.
    cors_origins: list[str] = ["*"]

    # CDN base for image/icon assets. EMPTY by default: the API serves the bytes
    # off disk from the run directory.
    #
    # It used to default to the prod CDN, because the deployed container did not
    # bake the image bytes and a relative path would have 404'd there. That
    # deployment was dropped (`75694f3`, "drop deploy plumbing") and the default
    # outlived it: every local run emitted absolute `cdn.combatden.net` URLs for
    # bytes nothing in this repo uploads any more, so a freshly generated image
    # resolved to a 404 and every client fell back to its bundled asset. That
    # reads as "the new images do not work" and is really "the API pointed
    # somewhere else".
    #
    # Set ASSETS_CDN_BASE_URL to a CDN base if one is ever reintroduced; the
    # byte endpoints then 307-redirect there. See ThemeTree/core/asset_urls.py.
    assets_cdn_base_url: str = ""

    # Google Fonts Developer API. The font delivery endpoint resolves the
    # per-variant TTF URLs by hitting Google's catalog, so the API process
    # needs the key too. Required — fail loud if absent, matching how the
    # pipeline process treats every provider key.
    google_fonts_api_key: str
    google_fonts_api_url: str = "https://www.googleapis.com/webfonts/v1/webfonts"
    google_fonts_request_timeout_seconds: float = 30.0
    google_fonts_ttl_seconds: int = 24 * 60 * 60


settings = Settings()
