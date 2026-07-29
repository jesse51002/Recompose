.PHONY: help install typecheck lint test check

# the mock screens — no build target of its own. This package installs on its own — there is no workspace.

help:
	@echo "install    npm install (this package only)"
	@echo "typecheck  tsc"
	@echo "lint       eslint, zero warnings"
	@echo "test       vitest"
	@echo "check      typecheck + lint + test"

install:
	npm install

typecheck:
	npm run typecheck

lint:
	npm run lint

test:
	npm test

check: typecheck lint test
