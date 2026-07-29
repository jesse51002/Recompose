.PHONY: help install typecheck lint test check build

# the web theme runtime (the SDK). This package installs on its own — there is no workspace.

help:
	@echo "install    npm install (this package only)"
	@echo "build      production build"
	@echo "typecheck  tsc"
	@echo "lint       eslint, zero warnings"
	@echo "test       vitest"
	@echo "check      typecheck + lint + test"

install:
	npm install

build:
	npm run build

typecheck:
	npm run typecheck

lint:
	npm run lint

test:
	npm test

check: typecheck lint test
