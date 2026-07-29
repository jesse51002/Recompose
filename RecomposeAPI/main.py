"""The Recompose API: `create_app()` plus the module-level `app`.

**One app, two halves.**

- ``output_router`` — READ. A produced ``output.yaml`` served to the Flutter and
  React runtimes. The only half a shipped client ever touches.
- ``studio/`` — WRITE. Author a brief, launch a pipeline run, watch it, hold a
  design session.

These were two apps on two ports until 2026-07-29, split on the argument that a
deployed read API must boot without any provider keys. That split is gone:
starting a run is an API request like any other.

**Nothing here is a long request.** ``POST /runs`` registers the run and returns
202 in milliseconds; the pipeline runs as a background task and the client polls
``GET /runs/{id}`` or streams ``/runs/{id}/events``. The eventual move is that
background task out of the web process into a real worker — which changes where
the work runs, not the shape of the request.

**What the merge costs, stated plainly rather than discovered later:** this
process imports the pipeline, so ``ThemeTree.core.config`` loads at import time
and its four provider keys (Anthropic, Gemini, OpenAI, Recraft) are required.
There is no longer a configuration in which this boots on
``GOOGLE_FONTS_API_KEY`` alone.

**And what it exposes.** ``POST /runs`` returns immediately but sets ~5 minutes
of work and about a dollar of provider spend going. The studio half used to bind
loopback, which is what actually kept it unreachable; this app binds ``0.0.0.0``
so the emulator can reach it. Until there is auth, the bind address is the only
thing limiting who can start a run — CORS is a browser mechanism and stops
nothing else.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from RecomposeAPI.config import settings
from RecomposeAPI.output_router import output_router
from RecomposeAPI.studio.agent_router import agent_router
from RecomposeAPI.studio.brief_router import brief_router
from RecomposeAPI.studio.run_router import run_router
from RecomposeAPI.studio.session_router import session_router


def create_app() -> FastAPI:
    """Build the app: CORS, the read + write routers, and a health probe."""
    application = FastAPI(title="Recompose API", version="0.1.0")

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        # POST is here because this app now starts paid runs. With the default
        # `cors_origins` of `["*"]`, any page open in a browser can POST /runs
        # — set CORS_ORIGINS in `.env` to the studio's own origins to close
        # that. It is not a substitute for auth: CORS binds browsers only.
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )

    application.include_router(output_router)
    application.include_router(run_router)
    application.include_router(brief_router)
    # The brief agent is optional: with no ANTHROPIC_API_KEY its service is
    # never built and only its own endpoint 503s, so mounting it is safe.
    application.include_router(agent_router)
    # A session is one design end to end; a run is one pipeline launch inside
    # it. Both are independently watchable, which is why this is a router
    # beside `runs` rather than a wrapper around it.
    application.include_router(session_router)

    @application.get("/health", tags=["meta"])
    async def health_check() -> dict[str, str]:
        """Liveness probe."""
        return {"status": "ok"}

    return application


app = create_app()
