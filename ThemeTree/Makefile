.PHONY: help install run smoke test check sync-assets

# The pipeline. Poetry's project root is the REPO root, one level up, so every
# target runs from there — `make` still works from inside this directory.

help:
	@echo "run          a full pipeline run against apps/combatden"
	@echo "smoke        the same against apps/smoketest (small, cheap)"
	@echo "test         pytest"
	@echo "check        test"
	@echo "sync-assets  one-shot mirror of generated images/icons to S3"

run:
	cd .. && poetry run python -m ThemeTree --app-yaml apps/combatden/app.yaml --customization-yaml apps/combatden/customization.yaml

smoke:
	cd .. && poetry run python -m ThemeTree --app-yaml apps/smoketest/app.yaml --customization-yaml apps/smoketest/customization.yaml

test:
	cd .. && poetry run pytest tests/ -v

check: test

# Backfill + repair. New runs self-upload via the Writer when ASSET_UPLOAD_ENABLED=1.
sync-assets:
	cd .. && poetry run python -m scripts.sync_assets.run

install:
	cd .. && poetry install
