# RecomposeAPI — FastAPI Coding Standards

> [!info] Where this came from
> Ported from CombatDen's `FastApiBackend/CLAUDE.md` on 2026-07-28. The generic
> FastAPI, Python and project-structure standards carried; every CombatDen domain
> section did not — payment sync, memberships, ranks, videos, uploads, the member
> portal, computed-status views, and the database patterns. **RecomposeAPI has no
> database.** It serves the `output.yaml` a pipeline run produced, and since
> 2026-07-29 it also LAUNCHES those runs (`studio/`). If a rule below assumes a
> DB it is a porting error; rules that assume no write path are simply out of
> date — fix them here rather than working around them.

## What this service is

`RecomposeAPI/` is the Recompose API, and it has **two halves in one app**:

- **read** (`output_router.py`, `service/`, `schema/`) — the theme catalog and
  per-run design detail from a produced `output.yaml`. GET only. This is what
  the Flutter and React runtimes consume.
- **write** (`studio/`) — author a brief, launch a pipeline run, stream it, hold
  a design session. POST and SSE. This is what the browser studio talks to.

**The write half moved here from `ThemeTree/studio/` on 2026-07-29.** It was a
separate app on `127.0.0.1:8002`, split from this one so a deployed read API
could boot without provider keys. That split is gone: starting a run is an API
request like any other.

**None of it is a long request.** `POST /runs` registers the run and returns 202
in milliseconds; the pipeline runs as a background task and the client polls
`GET /runs/{id}` or streams `/runs/{id}/events`. The eventual move is that
background task out of the web process into a real worker — which changes where
the work runs, not the shape of the request.

**Two consequences, both deliberate:**

1. **This process imports the pipeline**, so `ThemeTree.core.config` loads at
   import time and all four provider keys (Anthropic, Gemini, OpenAI, Recraft)
   are required. There is no longer a configuration that boots on
   `GOOGLE_FONTS_API_KEY` alone. A rule in `../ThemeTree/CLAUDE.md` used to
   forbid exactly this; it was removed with the merge rather than worked around.
2. **`POST /runs` returns at once but sets ~5 minutes of work and about $1.50
   of spend going**, and the app binds `0.0.0.0` so the emulator can
   reach it. Until there is auth, the bind address is the only thing limiting
   who can start a run. CORS binds browsers only and stops nothing else.

### Rules that hold inside `studio/`

- **Nothing wire-shaped leaks down.** This half owns SSE framing, JSONL and HTTP
  status mapping; `ThemeTree/executor/` owns `ProgressEvent` and `on_partial`.
  Anything transport-flavoured belongs here, never in the pipeline.
- **State lives in `.studio/`, never in a run directory** — `.studio/runs/<id>.jsonl`
  per launch, `.studio/sessions/<id>.jsonl` per design, briefs under
  `.studio/briefs/`. Writing into `apps/<app_id>/<run_id>/` would break the
  pipeline's iron-clad no-hand-edits rule. `.studio/` is gitignored.
- **The launch path only ever CREATES a run directory.** A name collision is
  refused, never re-run in place, so `Pipeline._overwrite_existing`'s delete
  path is unreachable from a browser.
- **One run at a time and one session at a time**, refused with 409 rather than
  queued: the providers rate-limit, and a session owns the run slot for its
  whole length.
- **Nothing is typed before the conversation starts.** `POST /sessions` takes an
  app id and nothing else; the design's name arrives from the brand brief the
  interview produces, and `/sessions/active` reports `null` until it does. The
  form that used to ask for a name up front asked a person to name a thing that
  did not exist yet, for a fact the agent's first question collects anyway.
- **There is ONE approval gate: the brand brief.** The layout is not interviewed
  for and not proposed. When an asset run settles, `run_settled` makes
  `src/apps/gen-<run>/` as a copy of the base and launches the layout agent on
  it — in code, not because a model chose to. That agent authors its own
  `layout_brief.yaml` before it writes any code, having actually opened the
  generated images; a direction authored out here could only be a thinner guess.
  Most owners have no layout direction to give, and asking produced a shrug or
  an invention.
- **THE LAYOUT AGENT IS THE MOST EXPENSIVE THING THIS SERVICE STARTS**, and two
  rules keep it controllable. It is spawned into its OWN process group
  (`start_new_session=True`) because a coding agent spawns children of its own,
  so only a group kill takes the whole tree. And the app's `lifespan` stops
  every live one on shutdown — a process group outlives its parent, so without
  that a Ctrl-C would leave the expensive half of the system running,
  reparented to init and invisible. `POST /sessions/{id}/layout/stop` is the
  same kill on demand.
- **Stop and start are a PAIR.** `POST /sessions/{id}/layout/start` is the
  manual door, and it exists because a Stop with no way back would mean
  regenerating a whole theme to get another layout attempt — so stopping a bad
  run would cost more than letting it finish. It also recovers an automatic
  start that failed, and runs another pass on a finished design. **Starting on
  an existing folder CONTINUES it**, never re-copies the base: the folder is
  named after the run, so an existing one can only mean this run has been laid
  out before, and re-copying would delete the last agent's work. What is
  exclusive is the AGENT, not the folder — a second one on the same design is a
  409, because two agents editing one tree lose each other's writes.
- **Effort is a FLAG, not an `/effort` line in the prompt.**
  `layout_agent_effort` (default `medium`) is appended as `--effort <level>`.
  The prompt already opens with `/goal`; whether a second slash command on a
  later line parses as a command or reads as prose is not worth betting a
  two-hour run on, and the CLI validates the flag and warns on a bad value.
  Set it empty for a command that does not accept it.
- **The agent's stdin is `DEVNULL`.** A coding-agent CLI reads stdin for piped
  input and waits when it is a terminal that will never send any — and a child
  inherits this server's stdin, whichever terminal `make api` was started from.
  Without this an agent stalls before it starts, and two of them would compete
  for the operator's keystrokes.
- **WHAT A DESIGN COSTS IS RECORDED AS IT IS SPENT**, as `spent` records on
  the session log, split into `agent` (the interview) and `assets` (the
  pipeline run). A record and not a running field, because money is the one
  thing here that cannot be re-derived: a node's state is readable off the
  artifact and a transcript off the records, but nothing on disk remembers what
  a conversation cost once the process holding the token counts is gone. Token
  counts ride along so a wrong price can be recomputed from the log.
  `SessionSnapshot` sums them on read, so a live session and one rebuilt from
  its log cannot disagree.
  - **The interview runs on Sonnet, and the meter is why.** A turn is a long
    system prompt in and a question out (~4,500 tokens in, single digits out),
    which is a cheap shape of work Opus was being paid 2.5x for — $0.0226 a
    turn against $0.0090, measured. Question quality is set by the prompt, not
    the model: side by side on the same interview, Sonnet's option banks were
    as specific as Opus's. The layout agent is where a bigger model earns its
    keep, and that is a separate process with its own choice.
  - Pricing comes from litellm's own model pricing (`service/agent_cost.py`),
    never a table in this repo — one here would be wrong the week a price
    changed, and wrong silently. **Cache reads are priced separately**: the
    orchestrator replays the whole conversation each turn, so counting cached
    input at the fresh rate would overstate a long interview several times.
  - **The layout agent is deliberately not counted.** It runs on the operator's
    own CLI credentials and reports nothing back, so a figure for it would be
    invented. The meter says so on its own surface — a total that quietly
    omitted the longest-running agent would be worse than none, because it
    would be believed.
  - `_record_spend` never raises, and that guard once hid a real bug: Pydantic
    AI's `usage` is a PROPERTY, `result.usage()` raised a TypeError the guard
    swallowed, and the meter read $0 for every turn. `tests/test_agent_cost.py`
    now has a contract test that fails if that attribute becomes callable.
- **Which account pays for it is a decision, not an accident.** A coding-agent
  CLI bills to `ANTHROPIC_API_KEY` when it finds one in its environment and to
  its own logged-in subscription when it does not. `layout_agent_inherit_api_key`
  defaults false and the key is stripped from the child's environment, so the
  answer does not depend on whether someone exported it before `make api`.

### Sessions and runs are different units

A **run** is one pipeline launch. A **session** is one design end to end — the
brand interview, the asset run, and the layout agent that starts itself when
that run settles. A session starts
runs; both are independently watchable, which is why `session_router.py` sits
*beside* `run_router.py` rather than wrapping it.

- **Per-node progress never crosses over.** A session's `task` record names its
  `run_id` and the browser attaches `/runs/{id}/events` to it. Re-emitting
  twenty-three nodes into a second stream would be two places that can disagree
  about one run.
- **A session is settled by a person, a run by the executor.** The work stopping
  is not what makes a design done — approving it is. That is why `SessionRegistry`
  is a sibling of `RunRegistry` rather than a generalisation of it. They are
  near-copies on purpose; extract only if they converge.
- **`POST /brief-agent` is still stateless** — the client holds that transcript
  and posts it back each turn. A session is not. Read `agent_turn.py`'s
  stateless claim as scoped to that one endpoint.

## No assumptions

When a decision has more than one reasonable answer, ask and wait for the user's explicit response. Never assume, recommend-and-proceed, or defer the choice unilaterally. Presenting researched options is encouraged; making the choice for the user is not.

## CLAUDE.md is a living document

This file is a living document — exactly like a skill, it must track reality. Whenever the code genuinely diverges from what this CLAUDE.md says (a new domain, a renamed module, an added dependency, a rule the code has outgrown on purpose, an architecture change), **update this file in the same change** so the doc and the code never drift apart. Never leave it stale: a stale rule produces false "violation" findings in review and misleads the next contributor. If a documented rule is what diverged, fix the doc to match the new reality; if the divergence is a mistake, fix the code. Either way, doc and code must agree when you are done.

## README and the architecture chart — keep them current

Two living documents describe this service and stay in sync with the code:

- **`../README.md`** — the monorepo overview: the subsystem list and the
  dependency direction between them.
- **`../architecture.mermaid`** — the full graph. Author and edit it with the
  `mermaid-creation` skill and follow its rules: top-down `TB` at the flow level,
  sibling-only edges, the fixed palette, **no `~~~`** (Mermaid-9 safe), and both
  the render and `check_siblings.py` validation before you call it done.

Whenever a route is added, removed or renamed, or an external dependency changes,
update both in the same change.

## Domain builds — settle before code, audit after

When a task builds or heavily reshapes a domain (tables + services + routes):

- **Lock the schema shape with the founder before writing migrations or service code.** Pause at every schema inflection point and get the structure approved — rework is most expensive here.
- **Confirm domain placement explicitly** — new domain vs fold into an existing one, and which domain owns the feature (per the root *No assumptions* rule).
- **No demo-only code paths.** Presets/demos/imports go through the production write paths and produce production-shaped data — no special-case logic.
- **Default to deterministic code over agent/LLM steps** for anything that can run as plain code after a user decision (diff-check → derive → save); an agent converses, the commit path is code.
- **When the build reaches "works", run the `refine-backend` skill** as the post-build audit before hand-off.

## Workflow

**Always Ask Clarifying Questions**
- Before starting implementation, ask clarifying questions about ambiguous requirements
- Don't assume intent — confirm with the user when the spec is unclear or has multiple valid interpretations
- Better to ask upfront than to build the wrong thing

**NEVER Write Tests Around Production Bugs**
- If a test fails because production code is broken, **fix the production code** — do not reshape the test to pass against the broken path
- If you cannot fix the production code in the same change (scope, unknowns, waiting on approval), **stop and surface the bug to the user**. Do not ship a test that silently accommodates a known defect
- Tell-tale patterns that mean you are writing around a bug — never do any of these:
  - Calling the same service method twice ("force a settle sync", "re-run so the writeback is visible") when the contract says once should be enough
  - Substituting a lower-level path for the documented flow (e.g. flipping a column via SQL because the real cancel/update path is broken)
  - `pytest.mark.xfail` or `pytest.mark.skip` with a reason that points at a production line number instead of an external constraint
  - Loosening an assertion ("either 7500 or 7600 is fine") when the actual root cause is a bug on our side, not genuine non-determinism from a third party
  - Docstrings that say "since X doesn't actually Y, we do Z instead" — if you catch yourself writing that comment, file the bug instead
- When a test discovers a production bug, the correct workflow is: (1) reproduce, (2) **write the test against the correct behavior so it fails loudly**, (3) fix production, (4) watch the test turn green. Not: (1) reproduce, (2) reshape the test until it passes.
- Regression guards for *already-fixed* bugs are fine and encouraged — the distinction is that the production code is correct now and the test locks it in. A test shaped around a *live* bug is not a regression guard, it is camouflage.

**Don't test retired or non-existent routes**
- When a route is removed or renamed, **delete its tests** — never keep a test that asserts the old path now returns 404/405. A "this route is gone" assertion has no behavioral value, silently rots as the router grows (a future unrelated route on that path flips it green or red for the wrong reason), and just adds noise. The same goes for asserting that a route which never existed is absent.
- Test the routes that **exist** and their real behavior (status codes, payloads, auth). Coverage of the API surface comes from the Pydantic schemas (`src/<domain>/<domain>_schema.py`) + the live router, not from negative existence checks.

**Integration tests hit real files, not a database**
- There is no shared DB and no Stripe account to clean up — the CombatDen `created`
  fixture and its FK-ordered teardown were dropped in the port. Tests here read
  real `apps/<app_id>/` fixtures and a real `output.yaml`.
- A test that writes anything must write into a tmp path and clean it up. Never
  mutate a checked-in run directory: those are fixtures other tests read.
- A test must establish its own preconditions rather than inherit them from
  whatever run happens to be on disk. If it needs a design with three image slots,
  it builds one; it does not narrow its assertion until an existing run matches.


## General Principles

**SOLID Principles**
- Single Responsibility: Each class/module has one well-defined purpose
- Open/Closed: Open for extension, closed for modification
- Interface Segregation: Many specific interfaces over one general-purpose

**Other Core Principles**
- DRY (Don't Repeat Yourself): Single source of truth for each piece of logic
- KISS (Keep It Simple): Favor simplicity over complexity
- YAGNI (You Aren't Gonna Need It): Don't add features until needed
- Separation of Concerns: Separate different aspects into distinct sections

## Python Standards

**Imports**
- **ALWAYS add imports at the top of the file** - all imports must be at the beginning
- Good: All imports grouped at the top, before any code
- Bad: Imports scattered throughout the file or added in the middle of code
- **NEVER use relative imports** - always use absolute imports from `src`
- Good: `from src.users.schemas.user_schema import UserCreateRequest`
- Bad: `from .schemas.user_schema import UserCreateRequest`
- Bad: `from ..services.user_service import UserService`
- This ensures clarity and prevents import errors when modules are moved

**Constants**
- **NEVER use magic numbers or hardcoded values** — all constants must live in `src/core/config.py` (as `Settings` fields) or as `UPPER_CASE` final variables at the top of the consuming file
- **Inside `src/core/config.py` itself, EVERY constant is a `Settings` field — never a module-level `Final` variable.** The class is the whole point: fields are env-overridable, typed, and monkeypatchable in tests via `settings`. A module-level constant next to the class is the anti-pattern this rule exists to prevent (it crept in once and spread).
- Good: `settings.db_pool_size`, `settings.lock_ttl_seconds`, or `MAX_RETRIES = 3` at the top of the file that uses it
- Bad: `pool_size=10` buried inside a function or constructor; `LOCK_TTL_SECONDS: Final[int] = 60` at module level in `config.py`

**Enums**
- **ALWAYS use enums instead of raw strings for known value sets** — statuses, types, categories, discriminators, etc. must be `StrEnum` classes (`from enum import StrEnum`, Python 3.11+; ruff's `UP042` enforces this over `(str, Enum)` on this codebase's Python 3.13)
- **NEVER use hardcoded strings** when an enum exists — all comparisons, match/case, filter values, and Pydantic field types must use the enum
- **ALWAYS reuse enums and schemas from the Database package** (`../Database/python_data/schema/`) when they exist — import via `from schema.<module> import <Enum>` (available through `src/shared/db_schema_path.py`). Never redefine enums that already exist in the Database package.
- Pydantic auto-serializes `str` enums to their string values in JSON responses, so no manual conversion needed
- Use `Literal[MyEnum.value]` for Pydantic discriminated union fields, not `Literal["some_string"]`
- Good: `value: list[MemberStatus]` with `class MemberStatus(StrEnum): active = "active"`
- Bad: `value: list[str]` with hardcoded `"active"`, `"trial"` scattered through the code

**PEP 8 Naming**
- Modules/packages: `my_module.py`
- Classes: `UserService`, `PostRepository`
- Functions/variables: `get_user_by_email`, `user_count`
- Constants: `MAX_CONNECTIONS`, `API_TIMEOUT`
- Private: `_internal_var`, `__name_mangled`

**Formatting**
- Max 79 characters per line (99 acceptable)
- 2 blank lines around top-level functions/classes
- 1 blank line between methods

**Code Complexity & Nesting**
- **Limit deep nesting** - avoid nesting more than 3 levels deep
- **Extract functions when nesting gets complex** - create new helper functions/methods
- Good: Extract nested logic into separate, well-named private methods
- Bad: Deep nesting (4+ levels) makes code hard to read and maintain
- Example: Instead of `if/for/if/for/if/try`, extract the inner logic into `_validate_and_correct_item()`
- Benefits: Easier to test, read, and maintain; follows Single Responsibility Principle
- **Prefer flat functions with an orchestrator over deep nesting** (situational)
  - Write small, focused functions that each do one thing
  - Use an orchestrator function to call them in sequence
  - Good: `orchestrate()` calls `_validate()`, `_transform()`, `_persist()` sequentially — **but inside a service class these are private methods (`self._validate()`), not module-level functions** (see the next rule)
  - Bad: `orchestrate()` contains all logic in deeply nested blocks
  - Use judgment — simple logic doesn't need to be split into 5 tiny functions
- **No loose module-level functions in a service file** — a file built around a service class must keep its helpers *inside* that class as private methods, never as bare `def`s hanging above or below the class.
  - When you "extract a helper" (above) inside a service, extract it as a **private method** (`self._foo(...)`), not a module-level `def`. A `@staticmethod` is fine when the helper uses no instance state.
  - If a helper genuinely doesn't belong on the class, pull it into its **own dedicated class/module** — never leave a standalone function floating next to a class.
  - Good: `MembersBillingDetailService._build_rank(self, ...)`. Bad: a bare `def _build_rank(...)` sitting below the class in the same file.
  - **Exception:** standalone, class-less *concern modules* (e.g. `formatters.py`, pure mappers, `queries.py`) are function modules by design and stay as free functions — this rule is about service files built around a class.
- **Keep files small and focused** — don't put everything in one giant file
  - Split logically distinct concerns into separate modules (e.g., formatters, query builders, mappers)
  - A file with 5+ responsibilities is too big — break it up
  - Good: `formatters.py` for formatting, `queries.py` for SQL, `service.py` for orchestration
  - Bad: One 500-line service file that formats, queries, maps, and orchestrates

**Type Hints**
- **MUST have type hints on ALL function parameters and return values**
- Use native collections for Python 3.9+ (`list[str]`, `dict[str, int]`)
- Use `Optional[T]` for nullable values
- Use `Union` or `|` for multiple types
- Create type aliases for complex types
- No exceptions - even simple functions must have type hints

**DateTime Handling**
- **ALWAYS use UTC timezone for datetime fields**
- Good: `datetime.now(timezone.utc)`
- Bad: `datetime.now()` (uses local timezone)
- Use `default_factory=lambda: datetime.now(timezone.utc)` for Pydantic fields
- Store all timestamps in UTC, convert to user's timezone only in the frontend
- **NEVER do manual date arithmetic for months/years** — use `dateutil.relativedelta` instead. Manual calendar math has too many edge cases (leap years, month-end clamping, etc.)
- Good: `start + relativedelta(months=3)`, `start + relativedelta(years=1)`
- Bad: Manual modular arithmetic with `calendar.monthrange`, `date.replace(year=...)`
- `timedelta` is fine for days/weeks only

**Async/Await**
- Always await coroutines
- Use async-compatible libraries (`httpx`, `aiohttp`, `asyncpg`, `aiofiles`)
- Use `asyncio.gather()` for concurrent execution
- Never use blocking operations (`time.sleep`, sync `requests`)
- Always close connections with async context managers

**HTTP Requests**
- **ALWAYS add timeout to HTTP requests (default to 30 seconds)**
- Good: `httpx.get(url, timeout=30.0)`
- Good: `async with httpx.AsyncClient(timeout=30.0) as client:`
- Bad: `httpx.get(url)` (no timeout - can hang indefinitely)
- Use custom timeouts for specific endpoints if needed (e.g., `timeout=60.0` for slow APIs)

**Dependency Management**
- **ALWAYS use `poetry add <package>` to add dependencies**
- **NEVER manually modify pyproject.toml or poetry.lock**
- Use `poetry add --group dev <package>` for development dependencies
- Use `poetry add --group test <package>` for test dependencies
- Let Poetry handle version resolution and lock file updates

## Project Structure

**Domain-Driven Architecture**
```
src/
├── main.py                 # Application entry point
├── config.py               # Configuration
├── database/               # Database utilities
│   ├── session.py
│   └── base.py
├── auth/                   # Authentication domain
│   ├── auth_router.py      # API routes
│   ├── auth_schemas.py     # Pydantic models
│   ├── auth_models.py      # Database models
│   ├── auth_service.py     # Business logic
│   ├── auth_repository.py  # Data access
│   ├── auth_dependencies.py# Dependencies
│   └── auth_exceptions.py  # Custom exceptions
├── users/                  # Users domain
│   └── ...
└── posts/                  # Posts domain
    └── ...
```

**File Naming Within a Domain**
- **Every file inside a domain folder carries the domain name as a prefix.** The prefix makes the file's origin unambiguous when it appears in imports, tracebacks, or grep output.
- Good: `memberships/memberships_router.py`, `sync/service/sync_builder.py`, `plans/plans_schema.py`
- Bad: `memberships/router.py`, `sync/service/builder.py` (no prefix — ambiguous in isolation)
- **A service file's primary class and its file name must stay consistent.** The file name is the class's role in the domain; renaming one means renaming the other in the same change.
  - Good: `memberships_discounts.py` ↔ `MemberMembershipsDiscounts`, `sync_builder.py` ↔ `PaymentSyncBuilder`
  - Bad: renaming the file without renaming the class, or vice versa — a drifted name silently misleads every reader and every grep.

**Why Domain-Driven**
- Clear boundaries between business domains
- Easy to scale and maintain
- Teams can work independently
- Promotes separation of concerns

**Service-Layer Organization**
- When a service grows past one file, its pieces live **flat in `service/`** by default — sibling files, the facade as `service/<domain>_service.py`; helpers are `service/<domain>_start.py`, `service/<domain>_cancel.py`, etc.
  - Good: `memberships/service/memberships_service.py` (facade), `memberships/service/memberships_start.py`, `memberships/service/memberships_cancel.py` — all flat in `service/`.
  - Good: `sync/service/sync_service.py` (orchestrator), `sync/service/sync_builder.py`, `sync/service/sync_queries.py` — all flat in `service/`.
- **A large domain MAY group a distinct sub-concern cluster into a subfolder** when that materially aids clarity — flat stays the *default*, but a domain that has grown big enough to hold a self-contained multi-file sub-concern can put it in its own `service/<sub-concern>/` folder. Reach for this only for a genuine multi-file cluster, **never for a single file**.
  - Good: `videos/service/video_agent/` holds the conversational-agent wrapper (`video_agent_service.py`), a self-contained sub-concern of the otherwise-flat `videos/service/`.
  - **The class system is versioned schedules + computed occurrences** (single source of truth: the `class-system-guide` skill). A class = a `gym_classes` IDENTITY row + append-only `gym_class_schedules` VERSIONS (each freezing its `timezone` at mint); occurrences are never stored — the pure `ClassesExpander` (one schedule shape; each candidate date FANS OUT over its `weekday_slots` slot list, so a class may occur several times per day) wrapped by `ClassesVersionExpander` (ownership windows by `effective_from`, first-version-owns-the-past, SLOT-level dedup at `(original_date, original_time)`) computes them for every read. An occurrence's identity is its ORIGINAL slot `(class_id, original_date, original_time)` — what `member_attendance`, `class_signups`, and `class_instance_exceptions` key (their UNIQUEs include `original_time`); every occurrence-addressed API call passes the date AND time; exceptions/reschedules never re-key anything. **`ClassesVersionsService`** (`classes_versions_service.py`) is the only writer of `gym_class_schedules`: a schedule edit mints a version effective NOW and, in the same transaction, wipes future-keyed sign-ups / early check-ins / instance exceptions whose original slot the new shape no longer produces (exact wall-clock matches survive); soft-delete wipes everything future; `remint_timezone` is the gym tz-change hook. `PUT /classes/{id}` splits `identity` (in-place) vs `schedule` (a complete shape → mint), the discounts identity/values precedent.
  - **A PAUSED class (`gym_classes.is_active=false`) is hidden SERVER-side, fail-closed:** `GET /api/v1/classes/instances` takes `include_inactive: bool = False` (mirroring `GET /api/v1/classes`) and by default emits none of its occurrences, so no client can offer one that check-in and sign-up would reject. The CRM classes page opts in (`include_inactive=true`) to show + un-pause them; `EffectiveClassInstanceResponse.is_active` flags each row so that one mixed response can mark the paused cards. The full contract lives in the `class-system-guide` skill — read it before changing anything paused-shaped.
  - The `checkin` domain decomposes its check-in into two DI-injected seams kept flat in `checkin/service/`: `checkin_class_resolver.py` (`CheckinClassResolver`, the one-way `checkin → classes` seam — loads the class identity + its schedule versions + the day's exceptions and resolves the occurrence via the injected `ClassesVersionExpander` into a `ResolvedClass`; purely a read, nothing written; a retroactive any-date check-in validates against whichever version owned that date; it also enforces the **early-check-in window** — an occurrence starting more than `settings.checkin_opens_hours_before_start` (2h) in the future is rejected, gating both single + batch check-in) and `checkin_member_gate.py` (the per-member gate: one evaluation feeds the `is_member` split — a kiosk (`is_member=True`) strict-gate **reject**, or a staff (`is_member=False`) path that records a **clean** check-in but returns **`requires_confirmation`** (nothing written, the reasons as `warnings`) for a warned one **unless `ignore_warnings`** overrides — which records with NULL/best-available attribution + the warnings surfaced), over `checkin_queries.py` / `checkin_writer.py` / `checkin_plan_selector.py`. **What blocks a kiosk is `GateEvaluation.blocked`, not membership of `CheckinWarning`** — every current warning blocks, but the two stay separate so a future one can warn staff without rejecting a self-serve scan. That split, and the invariant every new warning must satisfy, live in the **`class-system-guide`** skill (the source of truth for the gate); don't restate them here. There is deliberately **no facade**: the single-check-in router injects the resolver + gate directly (resolve, then gate), and `batch_checkin_service.py` injects the same two (resolve once, then loop the gate over a de-duped member list). Siblings `cycle_counts_service.py` / `streak_service.py` / `checkin_attendees_service.py` (read-only per-occurrence **combined roster** — see sign-ups below) round out the domain, all flat in `service/` — the attendance row's denormalized `occurred_at` feeds the streak / cycle-count / last-class window SQL; streak additionally joins `gyms` to bucket weeks in the gym's CURRENT-local timezone (not UTC — see the class-system-guide skill), the others stay join-free. Check-in **reversal** also lives here: `checkin_reverser.py` (`CheckinReverser`) is the reusable per-member reversal core — `reverse(session, member_id, gym_id, class_id, original_date, points_worth)` deletes that member's attendance row by key, claws back the points (floored at 0), drops one `class_attended` activity, and reverses the auto-end on the charged trial / one_time pack, all in the caller's OPEN transaction (no commit). It imports **nothing** from `src.classes`. `checkin_remover.py` (`CheckinRemover`) is the thin single-member wrapper the remove endpoint injects.
  - **Sign-ups (reservations)** also live in `checkin` (NOT a new domain): `signup_service.py` (`SignupService`) creates/removes a member's reservation for an occurrence — `POST /api/v1/signup` + `DELETE /api/v1/signup`, both gated by `verify_gym_employee_for_member` at `STAFF` (staff-only, same as check-in — the member cannot self-serve a reservation). A sign-up is a reservation, **not attendance** — `member_attendance` is still only written by a check-in; a signed-up member who never checks in is a no-show, never auto-counted. `create` validates the occurrence via the version expander, stamps `original_time` from the resolved slot, resolves the effective `max_capacity` (`gym_classes.max_capacity` overridden per-occurrence by `class_instance_exceptions.new_max_capacity`; NULL = unlimited, never blocks) then, when limited, reads `CheckinQueries.get_signup_or_attended_members` — the **DISTINCT signed-up-OR-attended union** (`class_signups` ∪ `member_attendance` by `(class_id, original_date, original_time)` — capacity pools are per exact SLOT, one SQL file `signup_capacity_count.sql`) — and rejects with `CheckinClassFullError("Class is full")` (`code = class_full`) only when this member ISN'T already in that set and the set is already at capacity. The write is idempotent (`ON CONFLICT (class_id, member_id, original_date, original_time) DO NOTHING` → `already_signed_up=true`, still 200). **The check-in capacity gate reads the same union.** **The combined roster** — `GET /api/v1/checkin/attendees` — returns everyone who signed up OR attended an occurrence, each flagged `signed_up` / `attended` (`Attendee.log_id`/`plan_id`/`item_id` NULL when not attended) (`roster_for_occurrence.sql`). The schedule board (`src/classes`) adds `signup_count` + `attendance_count` per occurrence via plain cross-domain table reads (`classes_signup_counts.sql` / `classes_attendance_counts.sql`) — sanctioned `classes → checkin`-table (not code) reads.
    - **Deliberate exception to the one-way seam (`classes → checkin`):** `ClassesUndoService` (in `src.classes`) depends on `CheckinReverser` — the OPPOSITE of the documented one-way `checkin → classes` direction — looping it per attendee inside its shared `teardown_occurrence` (reverse attendance + delete sign-ups for one date), which is itself the single teardown that BOTH cancel entry points, the future-reschedule path, and `ClassesVersionsService`'s version-change wipe route through. So the per-member reversal has a **single** implementation. It is cycle-free precisely because `CheckinReverser` imports nothing from `src.classes` (the DI container builds `checkin_reverser` before all consumers). Don't flag this `classes → checkin` edge as a layering violation — it is intentional.
    - **The `gyms → classes` edge:** `GymsService.update_gym` calls `ClassesVersionsService.remint_timezone` on every save that carries a `timezone` (deliberately not gated on "did it change" — the gym row commits before the per-class remint, so a changed-value gate would skip a retry after a partial failure forever; the per-class deep-equal skip makes a re-save a cheap self-heal). A same-shape version mint per live class; wall-clock matching keeps every future-keyed row. Documented, deliberate.
  - Bad: `memberships/service/memberships/member_memberships_service.py` — a sub-subfolder wrapping a *single* group / file.
- The orchestrator / facade **lives inside `service/` as `<domain>_service.py`**, grouped with the files it orchestrates — never floating one level above.
  - Legacy note: `members/service/management/members_management_service.py` predates the flat rule and uses a nested layout (`management/` subdir with `members_management_create.py`, `_update.py`, …). That layout is not wrong for that domain, but new domains use the flat layout described above.
  - Bad: `members/service/members_management_service.py` floating above a sibling `management/` folder.
- A genuinely standalone service with no peers stays as a single file at the `service/` top level — fine (a future one-file service belongs flat at `service/`, not buried in a one-member subdir).
- **Don't add a nesting level for a single file/group.** If a folder would only ever hold one related set, keep those files flat in `service/` instead of burying them (e.g. a single set of handlers lives directly in `service/`, not in a `handlers/` subdir). The subfolder allowance above is for a genuine *multi-file* sub-concern, not a single file.
- No bare module-level helper functions in a service file — fold them into the service class as private methods (see *Code Complexity & Nesting → No loose module-level functions in a service file*).

## FastAPI Patterns

**Dependency Injection (dependency_injector)**
- Use `dependency_injector` with `DeclarativeContainer` for all dependency management
- All injectable dependencies must be defined as providers in `src/core/dependencies.py`
- Route handlers using `Provide[...]` must have the `@inject` decorator
- New domain modules must be added to `wiring_config.modules` in the container
- Use `Annotated` type aliases for clean route signatures (`DbSession`, `CurrentUser`)
- Good: `DbSession = Annotated[AsyncSession, Depends(Provide[Container.db_session])]`
- Good: `@inject` on any handler or dependency function using `Provide[...]`
- Bad: Importing `settings` directly — use container injection instead
- **Never import Container in service/shared modules** — DI wiring (`Provide[Container.xxx]`) belongs only in router files. Shared classes should use `self` and receive dependencies via constructor.
- Chain dependencies for authorization
- Apply common dependencies at router level

**Router Organization**
- One router per domain/resource
- Use RESTful principles (GET, POST, PUT, DELETE)
- Plural nouns for resources (`/users`, not `/user`)
- Path parameters for IDs, query parameters for filters
- Proper HTTP status codes (200, 201, 204, 400, 404, 500)

**Pydantic Models**
- Separate schemas for create, update, and response
- Create custom base model with shared config
- Use validators for complex validation
- Update schemas have optional fields
- Response schemas exclude sensitive data
- Use `EmailStr`, `HttpUrl`, built-in validators
- **Update requests must separate IDs from mutable data** — the request model contains identity fields (path parameters or top-level fields) and a nested `data` model with only mutable optional fields. This allows the service to extract change keys from `data` and validate them against the immutable columns guard (`validate_mutable_columns` from `src/shared/column_guard.py` + frozensets in `schema.immutable_columns` from the Database package).
- Good: `RewardUpdateRequest(data: RewardUpdateData)` where `RewardUpdateData` has only mutable optional fields and the reward_id comes from the URL path
- Bad: Flat update model mixing PKs, immutable columns, and mutable fields together
- **Discounts are a deliberate variant of this rule, not a violation.** A discount is a two-table identity/version model (`gym_discounts` identity + immutable `gym_discount_values` versions), so `DiscountUpdateRequest` splits the mutable data **by destination** into two sub-models — `identity` (rename in place) and `values` (mint a new version) — instead of one flat `data`. The model shape itself encodes which table each field writes (no runtime field-partition set), while the service **still** runs the same `validate_mutable_columns(GYM_DISCOUNTS, …)` guard over the combined change keys. `discount_id`/`gym_id` stay top-level for the auth `gym_id` check. See `src/discounts/schema/discounts_schema.py` + `service/discounts/discounts_update.py` and the `discounts-guide` skill.

**Error Handling**
- Create a custom exception hierarchy per domain, in
  `src/<domain>/<domain>_exceptions.py` (the domain-prefix naming rule). Class
  names carry the domain prefix too: `CheckinClassNotFoundError`,
  `EmployeeNotFoundError`.
- **A router must map an exception to its HTTP status BY TYPE — never by
  matching words in the message.** Substring dispatch
  (`if "not found" in str(exc).lower(): 404`) makes the message *prose* part of
  the public API: rewording it silently moves the status code, and no test can
  catch that structurally. This bit us live — the kiosk got an opaque 400 for
  "Class is not active" because that string happens not to contain "not found".
  Catch the specific types first, then the domain base, then the generic
  fallback.
- **When a client must branch on a specific error, add a machine-readable
  `code` as a SIBLING of `detail` (a plain STRING).** The status alone is not
  enough to branch on, and matching on prose client-side would just move the
  fragility across the wire. `checkin` is the reference implementation — its
  kiosk client switches on the `code` to show a real reason instead of a bare
  400. This is opt-in per domain, not a universal shape: a domain whose clients
  never branch past the status (most of them) needs only `detail` and no code
  machinery. Where a code IS used, a typed domain rejection serializes as:

  ```json
  {"detail": "Class is not active", "code": "class_inactive"}
  ```

  - **Never declare a `code` you do not also put on the wire.** A code cannot
    reach a client without the one global `app.add_exception_handler` formatter
    in `src/main.py`; declaring the enum without registering that handler
    test-locks a set of strings into the public contract while no caller can
    ever read them — declared, invisible, and pure liability. `members` and
    `waivers` both went through this state and both dropped the enum:
    no CRM caller branches past the STATUS on either domain's rejections, so
    each has typed exceptions carrying **only** `status_code`, and their
    error-mapping tests assert positively that no `code` attribute exists.
    If a client ever does need to branch, add the enum AND the formatter in the
    SAME change.
  - **`detail` is a plain string by default, and that default holds for every
    ordinary endpoint.** The CRM's `lib/core/network/api_client.dart`
    `_extractDetail` returns `data['detail']` **only** when it is a `String`
    (yielding `null` otherwise), and `member_detail_bloc.dart` renders
    `(e.detail ?? e.message)` — so an endpoint whose error is meant to be READ
    as prose must keep `detail` a string, or its message silently degrades to
    "Server error 400: Bad Request". This is *why* the sibling-`code` shape
    exists: structure never has to go inside `detail`.
  - **Two endpoints deliberately return an OBJECT `detail`, and they are
    correct.** The duplicate-member **409** (`POST /members/` →
    `{"code": "duplicate_member", "matches": [...]}`, raised at
    `members_management_create.py:131`) and the waiver-gate **422**
    (`{"message": …, "unsigned": [...]}`). Each has a purpose-built client
    parser that reads the RAW response body, never `_extractDetail`:
    `member_repository.dart` `_parseDuplicateMember` (`:153`, called from the
    409 arm at `:141`) and `_parseWaiverGate` (`:469`). Both require `detail`
    to be a `Map`, check their discriminator, and **return null on a shape
    mismatch**, so a plain 409/422 from anywhere else still propagates
    normally.
  - **The invariant that keeps that safe: an object `detail` is allowed ONLY
    when a purpose-built client parser owns that endpoint's body.** Absent
    such a parser, the object is unreadable (`_extractDetail` yields null) and
    the error renders as the bare status line. So: don't "fix" those two
    endpoints to comply with the default, and don't copy their shape onto a
    third endpoint without writing its parser in the same change. If a change
    makes preserving a string impossible on an endpoint that has no parser,
    stop and raise it — don't reshape the body.
  - **`code` is the stable machine-readable discriminator** clients switch on;
    `detail` is prose for humans and may be reworded freely.
  - **Codes are part of the public contract. Renaming one is a BREAKING
    change** for every client switching on it — add a new code instead of
    repurposing an existing one.
  - `code` is a `StrEnum` in the domain's exceptions module
    (`CheckinErrorCode`), and each concrete exception declares **both**
    `status_code` and `code` as class attributes — the type is the single
    source of truth for the whole contract. In a domain with no code (the
    common case) the type declares `status_code` alone.
- **One global handler formats the body; routers only re-raise.** Register the
  domain base with `app.add_exception_handler` in `src/main.py` (the
  `_handle_lock_busy_error` template) — Starlette resolves a handler by walking
  the raised type's MRO, so registering the base covers every subclass — and
  have it read `exc.status_code` / `exc.code` off the instance. Then **the
  hazard**: every router handler wraps its call in `try/except Exception → 500`,
  which would swallow the domain error before it ever reached a global handler.
  The fix is a typed arm that **re-raises**:

  ```python
  except CheckinError:
      raise          # a `raise` inside an `except` clause propagates out of
                     # the WHOLE try — the sibling `except Exception` below
                     # cannot re-catch it
  except ValueError as exc:   # foreign bad input → 400, no code
      ...
  except Exception:           # → 500, logged with exc_info=True
      ...
  ```

  Prove it with a test, don't assume it: the parametrized type → status/code
  tests flip to 500 the moment a re-raise stops working.
  - **`LockBusyError` is the recurring victim of this hazard, in every router
    that touches billing.** It subclasses `Exception` **directly**, the payer
    lock is acquired INSIDE the service (so inside the handler's `try`), and
    `_handle_lock_busy_error` in `src/main.py` maps it to a retryable **409** —
    so a handler missing the re-raise arm reports ordinary contention (front
    desk acting while a bulk reprice holds a lock) as a 500 outage. It bit
    `memberships_router.py` across 14 handlers and then `members_router.py`'s
    three authorized-payer handlers (`PUT /members/{id}/link`,
    `POST /members/{id}/link/remove`, `.../remove/preview` — the preview locks
    too, so its quoted figures can't be computed mid-converge). **Add the arm
    ONLY where the service actually takes the lock** — `POST /link/check` is a
    lock-free read, and a dead `except` there would read as coverage;
    `tests/members/test_members_link_lock_guards.py` asserts that exclusion
    against the service source so a future lock added there fails loudly.
    Document the 409 with the shared **`BUSY_PAYER_409`** string
    (`memberships_router.py`) — imported, never restated, so the route docs
    cannot drift. Proof pattern:
    `tests/memberships/test_billing_endpoint_guards.py` and
    `tests/members/test_members_link_lock_guards.py` both parametrize
    "the error ESCAPES the handler" over every locking handler.
- **Declare the shape in OpenAPI.** Every `responses` entry a typed rejection
  can produce carries `{"model": <Domain>ErrorResponse, …}` (`detail: str` +
  `code: <Domain>ErrorCode | None`), so the contract is self-documenting and
  client codegen sees the enum. `code` is nullable because the generic
  `except ValueError` → 400 arm emits none — clients fall back to `detail` when
  it is absent. Model: `src/checkin/schema/checkin_error_schema.py`. A domain
  with no code has nothing to declare beyond its per-status descriptions.
- **An INPUT-VALIDATION domain's exception base subclasses `ValueError`** so an
  unmapped domain error lands as a 400 (bad input), not a 500 — the router's
  existing `except ValueError` → 400 arm catches it, so a typed hierarchy is
  additive, never a breaking sweep. Models: `src/checkin/checkin_exceptions.py`,
  `src/employees/employees_exceptions.py`, `src/members/members_exceptions.py`,
  `src/waivers/waivers_exceptions.py`.
  This is **deliberately not universal**: the money / external-system domains
  base on `Exception` on
  purpose, because their unmapped failures must map to 500 / retryable — never a
  400 (see the Money & external-system rules). Do NOT "fix" one of those to
  subclass `ValueError`; it would silently turn a billing 500 into a 400.
- **`members` is the partial case, and the partiality is deliberate.**
  `MembersError` + its four subclasses (`MemberNotFoundError` → 404; the
  a missing upstream account and
  no-update-fields types → 400) cover the seven handlers backed by
  `MembersManagementService` — the SIX that used substring dispatch (update
  member, card update, unlink payment, payment-method-status, invoices,
  upcoming-invoice) plus `POST /members/`, whose 400 was already right and now
  comes off the type rather than by coincidence — **plus the two member-DETAIL
  reads** (`GET /members/{id}`, `GET /members/{id}/billing`), whose blanket
  `except ValueError` → 404 "Member not found" is now a typed arm (see the
  pydantic-trap rule below; `MembersBillingDetailService` raises
  `MemberNotFoundError`). The domain carries **no `code` enum** — no client
  branches past the status, so declaring one would be four invisible strings
  (see the never-declare-an-unwired-code rule above). One thing is still
  knowingly unfinished, documented in the code, and should be picked up rather
  than rediscovered:
  - Two of the three linked-account handlers (`POST /members/{id}/link/check`
    and `/link/remove`) **still dispatch on the message's prose**, because
    their `ValueError`s are raised by `src/memberships/` — a members-side type
    cannot classify an error members never raises. Fixing them means a typed
    hierarchy in that domain; note `memberships` is a money domain, so per the
    rule above its base must stay on `Exception` and each router arm maps its
    types explicitly. `PUT /members/{id}/link` is now **half** converted on
    purpose: a `WaiversError` arm above the prose arm handles its waiver half
    (signing the payer-auth agreement) by type, and the prose arm below keeps
    the `KNOWN GAP` comment for the memberships half. Its `"reload"` → 409
    branch is **gone** — that conflict was exclusively the waivers version-lock
    and the typed arm owns it now.
- **`waivers` is fully typed, and it is the cautionary tale for prose
  dispatch.** `WaiversError` + seven subclasses
  (`src/waivers/waivers_exceptions.py`): the not-found family
  (`WaiverNotFoundError`, `WaiverVersionNotFoundError`,
  `WaiverSignerNotInGymError`, `WaiverPayerAuthMissingError`) → 404,
  `WaiverNoCurrentVersionError` + `WaiverPayerAuthNotArchivableError` → 400,
  `WaiverVersionStaleError` → 409. Two things are worth carrying forward:
  - The 409 used to hang off `if "reload" in str(exc).lower()`. **Nothing about
    the word "reload" says "conflict"**, so a copy edit to the signer-facing
    message would have demoted a version-lock conflict to a 400 — telling a
    client its request was malformed when the document had simply moved, which
    invites it to re-submit the same stale version. This is the sharpest
    example of why status-by-prose is banned.
  - One raise (`get_payer_auth_waiver_for_member`) answered **404 on the read
    route and 400 on the link route**, purely because its message happens not
    to contain "not found". One type cannot keep both; it is 404 everywhere now
    (the status the read path documents). Two of the seven statuses are
    inherited from the prose dispatch rather than chosen — recorded in the
    module docstring so nobody mistakes an accident for a decision.
- **Keep the generic `except Exception` → 500 arm** (with
  `logger.error(..., exc_info=True)`) below the typed arms. Add a generic
  `except ValueError` → 400 arm between them **only on a handler whose service
  actually raises a `ValueError` for bad input** — omit it where the service
  raises none, or it becomes the catch-all bug described below.
- **The type → status (and, where one exists, `code`) table belongs in a test,
  not in a comment.** A parametrized test over that table, using deliberately
  message-hostile strings (a 404 type whose message lacks "not found", a 400
  type whose message contains it, a 409 type whose message contains neither the
  409 nor the 404 trigger word), is what actually locks the contract — assert
  the status, that `detail` is a `str`, and the exact `code` where there is one.
  Add reflection tests so a new exception can't silently inherit a default:
  every concrete subclass in the module must appear in the table and must
  declare `status_code` (plus `code`, in a domain that has one) in its **own**
  `vars()` (the base keeps safe fallbacks so a forgotten subclass can't 500 a
  live request — the test is what fails loudly instead). In a
  deliberately code-less domain, also assert **positively that no `code`
  attribute exists**, so the half-wired state cannot creep back. Models:
  `tests/checkin/test_checkin_error_mapping.py` (with codes),
  `tests/members/test_members_error_mapping.py` and
  `tests/waivers/test_waivers_error_mapping.py` (both without — each
  parametrizes the same table across every one of its endpoints, and asserts
  the body equals `{"detail": …}` exactly so nothing can quietly grow a second
  key).
- Include meaningful error messages; customize validation error responses.
- **Status codes are a contract — don't "improve" one during a refactor.**
  `checkin`'s "not an occurrence of this class" is a **400, not a 404**, because
  occurrences are computed rather than stored (a bad slot is a bad address, not
  a missing resource) and both endpoints' OpenAPI `responses` have documented
  `400 Not a valid occurrence on that date` since they shipped. If a status
  looks wrong, report it — changing it is a separate call.
- **Beware `except ValueError` as a catch-all: pydantic `ValidationError`
  subclasses `ValueError`.** A blanket arm can turn an internal validation
  failure into a wrong 4xx with a raw validation dump as `detail` instead of a
  500. Narrow such arms to the typed catches. **A blanket arm on a handler
  whose service raises no `ValueError` at all is always the bug** — it can only
  ever fire on an internal failure. `GET /checkin/attendees` (a pure read) and
  `DELETE /checkin` (whose remover raises only `CheckinClassNotFoundError`)
  both carried one mapping *any* `ValueError` to 404; both now catch only the
  typed error, so a serialization failure is a logged 500. Same in `members`:
  five of the six converted handlers (card update, unlink payment,
  payment-method-status, invoices, upcoming-invoice) now catch only
  `MembersError`, since their services raise nothing but typed errors;
  `PUT /members/{id}` KEEPS its generic arm because the shared, domain-agnostic
  `validate_mutable_columns` guard really does raise a plain `ValueError` for an
  immutable column.
  **The worst instance of this trap was the member-DETAIL read**, and it is
  worth remembering as the pattern to look for: `GET /members/{id}` and
  `GET /members/{id}/billing` both serve
  `MembersBillingDetailService.get_member_billing_detail` — the largest response
  model in the API (memberships grouped by plan, authorized payers,
  who-pays-for-whom, payment history, rewards, pending redemptions, rank, card)
  — behind a blanket `except ValueError` → 404 `"Member not found"`. So ONE bad
  field anywhere in that payload reported a member who plainly exists as
  missing: staff re-checked the id, and the 500 that should have paged someone
  was indistinguishable from a typo. The bigger the payload behind a blanket
  arm, the more likely it fires on our own bug rather than the caller's. Same
  shape in `waivers`: `GET /waivers/{id}` mapped any `ValueError` to 404, so a
  stored body that no longer fit `WaiverResponse` reported the document as
  missing; and `GET /members/{id}/authorized-payer-waiver` did the same. All
  three are typed arms now; `PUT /waivers/` keeps its generic arm for the same
  `validate_mutable_columns` reason as `PUT /members/{id}`.

**Logging and Exception Strategy**
- **API/Router layer**: Use `logger.error()` with `exc_info=True` to log full stack traces
  - Good: `logger.error("Request failed", exc_info=True)`
  - Always import logging and create logger: `logger = logging.getLogger(__name__)`
  - Log before raising HTTPException to capture full context
- **Service/Repository/Util layers**: Just raise exceptions with relevant error messages
  - Good: `raise ValueError("Invalid URL format")`
  - Good: `raise HTTPException(status_code=404, detail="Resource not found")`
  - Bad: Don't log in service/util layers - let API layer handle logging
  - Focus on clear, descriptive exception messages that help debugging
- **Layer Separation**: API logs + handles, Services raise + describe

**Middleware**
- CORS must be first in middleware stack
- One purpose per middleware
- Proper ordering: CORS → Logging → Auth → Rate Limiting

## Security

RecomposeAPI has **no database and no user accounts.** The entire CombatDen auth
chapter (Supabase Auth, JWT role sets, RLS, `gym_employees`, GoTrue's
auto-confirm guard) was dropped in the port because none of it applies.

**It does have a write path**, and since 2026-07-29 that path is in this
service: `studio/` starts pipeline runs. The old "GET only, adding a non-GET
route is an architecture change" rule described a service that no longer exists.

**The actual surface**
- **The read half stays GET-only.** Adding a non-GET route to `output_router`
  is still an architecture change, not a feature.
- **The write half spends money.** `POST /runs` answers immediately and leaves
  ~5 minutes and ~$1.50 of work running behind it. There is
  **no auth on it yet** — the bind address is the whole control. That is
  acceptable for a laptop tool and is not acceptable once this is deployed;
  auth is the prerequisite for deploying, not a follow-up.
- **No secrets are served.** The service reads a run's `output.yaml` and emits
  metadata plus asset URLs.
- **Five credentials now**, not one: `GOOGLE_FONTS_API_KEY` plus the four
  provider keys the pipeline needs. Injected at runtime, never baked into an
  image.

**Input validation**
- Always validate with Pydantic; a route's schema is its contract.
- Treat every path parameter as untrusted, especially anything that becomes a
  filesystem path. A design id must be validated against the known catalog, never
  interpolated into a path — `../` traversal is the realistic attack on a service
  that reads files off disk.

**Configuration**
- CORS: specific origins only in production. The allowlist must contain the
  studio's pinned dev port (8080); Vite's default 5173 is deliberately absent.
- HTTPS only in production, security headers on, secrets via environment.

## Documentation

**Code Documentation**
- Docstrings for all public functions/classes/modules
- Document parameters, return values, exceptions
- Keep docstrings updated with code changes

**API Documentation**
- Specify `response_model` for all endpoints
- Use `summary` and `description` parameters
- Document all possible status codes
- Use tags to organize endpoints
- Mark deprecated endpoints with `deprecated=True`

**Versioning**
- Use URL path versioning (`/api/v1`, `/api/v2`)
- Maintain separate docs per version
- Document breaking changes
- Provide migration guides

## Code Quality Checklist

- [ ] Follows SOLID principles
- [ ] Type hints on all functions
- [ ] Proper async/await usage
- [ ] Domain-driven structure
- [ ] Repository pattern for data access
- [ ] Service layer for business logic
- [ ] Pydantic validation on all inputs
- [ ] Custom exception handling
- [ ] Comprehensive tests
- [ ] Security best practices
- [ ] Complete documentation
- [ ] No secrets in code
- [ ] Proper error messages

## Linting

**`ruff check` is the gate; do NOT run `make format` / `ruff format`.**
- The repo is not ruff-format-clean: a blanket format churns unrelated
  pre-existing lines and pollutes diffs.
- Run `.venv/bin/python -m ruff check src/ tests/` (broken venv shebangs —
  always invoke via `python -m`) and fix what it reports; hand-format the
  lines you touch to match the surrounding style.
- `ruff check --fix` on the files you changed is fine; whole-repo
  formatting is not.

**Remember: Code is read more often than written. Prioritize clarity, modularity, and maintainability.**
