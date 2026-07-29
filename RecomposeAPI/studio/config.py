"""Studio settings — where runs, logs and briefs live, plus CORS."""

from __future__ import annotations

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# This file is <root>/ThemeTree/studio/config.py; runs live in <root>/apps.
_ROOT = Path(__file__).resolve().parent.parent.parent
_DEFAULT_APPS_ROOT = _ROOT / "apps"

# The studio's own state lives OUTSIDE any run directory. A run's produced
# artifacts are never touched by anything but the pipeline (CLAUDE.md's
# iron-clad rule), so the run log cannot live beside output.yaml.
STUDIO_DIRNAME = ".studio"
RUNS_DIRNAME = "runs"
BRIEFS_DIRNAME = "briefs"
# A session is one design being made end to end; a run is one pipeline launch
# inside it. Separate directories because they have separate lifetimes — a
# session outlives every run it starts.
SESSIONS_DIRNAME = "sessions"
# One JSON object per line, append-only. See ./schema/run_record.py.
RUN_LOG_SUFFIX = ".jsonl"
BRIEF_SUFFIX = ".yaml"

class Settings(BaseSettings):
    """Studio config. Env vars (or `.env`) override every default."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Root that holds `<app_id>/<run_id>/` — the same tree the read API
    # serves and the CLI writes.
    apps_root: Path = _DEFAULT_APPS_ROOT
    # The studio's own durable state (run logs + saved briefs). Gitignored.
    studio_root: Path = _ROOT / STUDIO_DIRNAME
    # --- The layout half ---------------------------------------------------
    # Where a design folder is copied to. This is a TypeScript package's source
    # tree, which is unusual for Python to write into and is the point: a
    # design IS a mock app folder, and the dev server already watches this
    # directory, so an agent's edits hot-reload in the browser.
    mockup_apps_dir: Path = _ROOT / "RecomposeJsxMockUps" / "src" / "apps"
    # The layout agent, as ARGV — a list, never a shell string. Empty (the
    # default) selects the stub, so the flow is walkable with no agent set up.
    # Set LAYOUT_AGENT_COMMAND to a JSON array in `.env`, e.g.
    #   LAYOUT_AGENT_COMMAND=["claude","-p","--permission-mode","bypassPermissions"]
    #
    # **The job arrives as one final argument appended to this list** — the
    # launch prompt, naming the app, the run directory and the design folder in
    # absolute paths. That is the whole hand-off: an argv command that takes a
    # prompt is all a layout agent has to be.
    layout_agent_command: list[str] = []
    # Where the layout agent runs. The repo root rather than the design folder,
    # because the job spans both trees — the theme it designs against lives in
    # `apps/<app>/<run>/` and the folder it writes lives in
    # `RecomposeJsxMockUps/src/apps/`, and only their common root sees both.
    layout_agent_cwd: Path = _ROOT
    # How hard the layout agent thinks, as `--effort <level>` appended to the
    # command. A FLAG rather than an `/effort` line in the prompt: the prompt
    # already opens with `/goal`, and whether a second slash command on a later
    # line is parsed as a command or read as prose is not something to bet a
    # two-hour run on. The flag is unambiguous.
    #
    # Medium by default because a redesign is long and mostly mechanical once
    # the direction is fixed — the expensive thinking is in the first step,
    # which the skill front-loads anyway. Valid: low, medium, high, xhigh, max.
    # Empty omits the flag entirely, for a command that does not accept it.
    layout_agent_effort: str = "medium"
    # Raw text appended to every launch prompt. The one steering seam: the
    # layout agent has more context than this service (it opens the generated
    # images, reads the palette, loads its own skills), so the studio does not
    # author a direction for it — it points, and this is where a human leans.
    layout_steer: str = ""
    # WHICH ACCOUNT PAYS FOR THE LAYOUT AGENT.
    #
    # A coding-agent CLI bills to an API key when it finds one in its
    # environment and to the operator's own logged-in subscription when it does
    # not. A subprocess inherits this process's environment, so whether a long
    # redesign is billed as credits or covered by a subscription would
    # otherwise be decided by whether someone happened to `export
    # ANTHROPIC_API_KEY` before `make api` — invisible either way, and only
    # discovered on a bill.
    #
    # Default false: the key is stripped from the child's environment, so the
    # agent uses the CLI's own credentials. Set true to bill API credits
    # deliberately. The pipeline is unaffected — it reads its key from
    # Settings, never from the environment of a child process.
    layout_agent_inherit_api_key: bool = False

    # --- The brief agent (ThemeTree/studio/agent/) ------------------------------
    # A BARE Anthropic model name, never a litellm "provider/model" string:
    # the agent names its provider explicitly (`AnthropicProvider`), so the
    # id stands alone. Override with BRIEF_AGENT_MODEL.
    #
    # Its ANTHROPIC_API_KEY is deliberately NOT redeclared here — the studio
    # already imports the pipeline, so `src.core.config.settings` is the one
    # definition of that secret and `brief_agent_service()` reads it there.
    # A second copy would be a second requiredness rule for one env var.
    brief_agent_model: str = "claude-opus-5"
    # Extra re-asks when the agent's structured output misses the schema.
    brief_agent_retries: int = 3

    @property
    def runs_dir(self) -> Path:
        """Where one append-only `<run_id>.jsonl` per launch is written."""
        return self.studio_root / RUNS_DIRNAME

    @property
    def briefs_dir(self) -> Path:
        """Where a committed brand brief is saved as `<slug>.yaml`."""
        return self.studio_root / BRIEFS_DIRNAME

    @property
    def sessions_dir(self) -> Path:
        """Where one append-only `<session_id>.jsonl` per design is written."""
        return self.studio_root / SESSIONS_DIRNAME


settings = Settings()
