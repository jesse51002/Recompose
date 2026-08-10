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
	@echo "brain         sync + embed + extract + prune + status (~2 min)"
	@echo "brain-status  lag, embed coverage, failures, queue"
	@echo ""
	@echo "Sync follows git commits, not the working tree — commit first."
	@echo "The vault is edited ONLY in the main checkout; see docs/CLAUDE.md."
	@echo ""
	@echo "Brain: $(GBRAIN_HOME)/.gbrain"

# Four steps, and two of them exist because gbrain looks healthy while being
# wrong. `sync` imports text and leaves embeddings stale by design, so stopping
# before `embed` leaves think/query answering off the previous vectors. And
# extraction only ever INSERTS, so a wikilink deleted from a doc leaves its edge
# in the graph forever — `prune` is the only thing that removes it. Neither
# failure shows up in `sources status`, which reports on import and embedding,
# never on graph correctness. That is why status runs last rather than first.
#
# The prune is a ~2 minute sequential sweep. It stays in this target rather than
# a separate one so the graph can never drift from the docs.
brain:
	@$(LOAD_KEY); \
	  echo "==> sync"    && gbrain sync --source vault && \
	  echo "==> embed"   && gbrain embed --stale && \
	  echo "==> extract" && gbrain extract links --source db && \
	  echo "==> prune"   && ../scripts/prune_vault_graph && \
	  echo && echo "==> status" && gbrain sources status

brain-status:
	@$(LOAD_KEY); gbrain sources status
