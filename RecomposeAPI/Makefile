.PHONY: help install dev test check

# The Recompose API — read AND write in one app. Poetry's project root is the
# REPO root, one level up, so every target runs from there.

help:
	@echo "dev    serve the API with reload (read + studio, one port)"
	@echo "test   pytest, the API + studio suites"
	@echo "check  test"

# 0.0.0.0 so the Flutter emulator can reach it (10.0.2.2 -> the host). NOTE it
# now carries POST /runs: it answers immediately, but leaves ~20 minutes of work
# and about a dollar of spend running behind it. Until there is auth, this bind
# is the only thing limiting who can start one — use 127.0.0.1 on a network you
# do not trust and do not need the emulator on.
dev:
	cd .. && poetry run python -m uvicorn RecomposeAPI.main:app --host 0.0.0.0 --port 8001 --reload

test:
	cd .. && poetry run pytest tests/test_api.py tests/test_studio.py tests/test_studio_agent.py tests/test_sessions.py -v

check: test

install:
	cd .. && poetry install
