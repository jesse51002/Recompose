.PHONY: help brain brain-status

# The vault. Not a code subsystem — the root Makefile does not fan out to it,
# and there is nothing here to install, typecheck or test. What it owns is the
# gbrain index over these docs.
#
# Every recipe supplies the two things an interactive shell would have given it
# and a tool-run shell does not: GBRAIN_HOME (direnv is absent) and
# VOYAGE_API_KEY (~/.bashrc is not sourced). Both failures read as a broken
# brain rather than a missing variable, which is why they are handled here
# instead of being left to the caller.

SHELL := /bin/bash

# Derived from git, never hardcoded, and matching .envrc: --git-common-dir is
# the shared .git, so its parent is the MAIN checkout even when run from a
# worktree. gbrain appends `.gbrain` itself, so this is the parent directory.
GBRAIN_HOME := $(shell cd "$$(dirname "$$(cd "$$(git rev-parse --git-common-dir)" && pwd)")" && pwd)
export GBRAIN_HOME

# Only sourced when the key is absent, so an already-configured shell wins.
LOAD_KEY = if [ -z "$$VOYAGE_API_KEY" ]; then . ~/.bashrc >/dev/null 2>&1 || true; fi

help:
	@echo "brain         sync + embed + extract + status — the whole refresh"
	@echo "brain-status  lag, embed coverage, failures, queue"
	@echo ""
	@echo "Sync follows git commits, not the working tree — commit first."
	@echo "The vault is edited ONLY in the main checkout; see docs/CLAUDE.md."
	@echo ""
	@echo "Brain: $(GBRAIN_HOME)/.gbrain"

# Three steps, and skipping the second is the easy mistake: `sync` imports text
# and leaves embeddings stale by design, so stopping there leaves `think` and
# `query` answering off the previous vectors while looking healthy.
brain:
	@$(LOAD_KEY); \
	  echo "==> sync"    && gbrain sync --source vault && \
	  echo "==> embed"   && gbrain embed --stale && \
	  echo "==> extract" && gbrain extract links --source db && \
	  echo && echo "==> status" && gbrain sources status

brain-status:
	@$(LOAD_KEY); gbrain sources status
