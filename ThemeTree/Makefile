.PHONY: help install run smoke studio test check sync-assets

# The pipeline. Poetry's project root is the REPO root, one level up, so every
# target runs from there — `make` still works from inside this directory.

help:
	@echo "run          a full pipeline run against apps/combatden"
	@echo "smoke        the same against apps/smoketest (small, cheap)"
	@echo "studio       the LOCAL run-orchestration API (loopback only, spends money)"
	@echo "test         pytest"
	@echo "check        test"
	@echo "sync-assets  one-shot mirror of generated images/icons to S3"

run:
	cd .. && poetry run python -m ThemeTree --app-yaml apps/combatden/app.yaml --customization-yaml apps/combatden/customization.yaml

smoke:
	cd .. && poetry run python -m ThemeTree --app-yaml apps/smoketest/app.yaml --customization-yaml apps/smoketest/customization.yaml

# NOT deployed and NOT 0.0.0.0: it starts runs that spend real money, so it binds
# to loopback only. Needs the full .env — it imports the pipeline.
studio:
	cd .. && poetry run python -m uvicorn ThemeTree.studio.main:app --host 127.0.0.1 --port 8002 --reload

test:
	cd .. && poetry run pytest tests/ -v

check: test

# Backfill + repair. New runs self-upload via the Writer when ASSET_UPLOAD_ENABLED=1.
sync-assets:
	cd .. && poetry run python -m scripts.sync_assets.run

install:
	cd .. && poetry install
