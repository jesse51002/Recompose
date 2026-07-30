# Architecture Notes

This file tracks architectural TODOs that are known but explicitly deferred —
not implemented now, but written down so they aren't lost. Unlike the
per-subsystem `CLAUDE.md` files (which describe how the code *is* organized),
this file is a backlog of how it *should change* later.

## Post-demo backlog: cost & speed of the agentic pipeline

Logged 2026-07-30. None of this is implemented yet — current pipeline is slow
and expensive but functionally works, which is acceptable for the demo. These
are the known next moves once the demo is done, roughly in the order they
were raised.

1. **Pre-warmed base conversation to fork from.** Don't start every run from
   a fresh Claude conversation that has to re-explore the codebase from
   scratch. Keep a conversation that has already completed exploration and
   already understands the codebase, and fork from that as the starting
   point for new runs. Reduces both latency and token spend on repeated
   codebase orientation.

2. **Generate the design brief YAML outside the coding agent.** Coding
   agents are too expensive to use for this step. Use a max-thinking model
   to one-shot the brief (or a small agentic loop, not a full coding-agent
   session). This also opens the door to a user-in-the-loop step: the
   generated layout/animation direction can be shown to the user for
   acceptance/modification in the UI *before* committing a coding agent to
   it. Not a questionnaire — still automatic — but editable.

3. **Deterministic, reusable screenshot tool.** Screenshotting all screens
   should not require re-implementing headless browser setup per run. It
   should be a single function/tool call that runs immediately. Similarly,
   screenshot grading should be pulled out of the coding agent — a one-shot
   LLM call or a small purpose-built agentic loop, not run inside the
   expensive coding-agent session.

4. **Defer heavy QA until after plan acceptance.** Heavy QA shouldn't run
   while the user is waiting on the initial pass. Only light, automatic QA
   (e.g. the screenshot grading from #3) should run during iteration, so
   iteration stays fast. Full/heavy QA runs once the user has accepted the
   plan and iteration is expected to taper off — perfection isn't needed
   until productionalization.
