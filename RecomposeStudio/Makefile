.PHONY: help install typecheck lint test check build dev preview

# the standalone theme browser. This package installs on its own — there is no workspace.

help:
	@echo "install    npm install (this package only)"
	@echo "dev        vite dev server"
	@echo "preview    serve the production build"
	@echo "build      production build"
	@echo "typecheck  tsc"
	@echo "lint       eslint, zero warnings"
	@echo "test       vitest"
	@echo "check      typecheck + lint + test"

install:
	npm install

dev:
	npm run dev

preview:
	npm run preview

build:
	npm run build

typecheck:
	npm run typecheck

lint:
	npm run lint

test:
	npm test

check: typecheck lint test
