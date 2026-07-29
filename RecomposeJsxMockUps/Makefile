.PHONY: help install dev typecheck lint test check

# The mock screens. Consumed as SOURCE by ../RecomposeStudio and by the design
# agent, so there is still no build target here — `dev` serves the thin harness
# in ./dev/ so the assets can be looked at while they are edited, which is the
# whole point of them. This package installs on its own — there is no workspace.

help:
	@echo "install    npm install (this package only)"
	@echo "dev        the asset harness on :8081 (unthemed; needs no backend)"
	@echo "typecheck  tsc"
	@echo "lint       eslint, zero warnings"
	@echo "test       vitest"
	@echo "check      typecheck + lint + test"

install:
	npm install

# :8081 on purpose — ../RecomposeStudio pins 8080 with strictPort, and running
# both at once is the normal case when checking the harness against the real
# host. Needs no API and no theme run: every --sc-* token falls back to its
# bundled value, which is what makes this the cheap loop.
dev:
	npm run dev

typecheck:
	npm run typecheck

lint:
	npm run lint

test:
	npm test

check: typecheck lint test
