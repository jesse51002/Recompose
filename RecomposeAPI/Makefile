.PHONY: help install dev test check

# The read-only API — the only Python surface that ships. Poetry's project root
# is the REPO root, one level up, so every target runs from there.

help:
	@echo "dev    serve the read-only API with reload"
	@echo "test   pytest, the API suite only"
	@echo "check  test"

dev:
	cd .. && poetry run python -m uvicorn RecomposeAPI.main:app --host 0.0.0.0 --port 8001 --reload

test:
	cd .. && poetry run pytest tests/test_api.py -v

check: test

install:
	cd .. && poetry install
