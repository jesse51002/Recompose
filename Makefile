.PHONY: run smoke api studio test sync-assets react-install react-dev react-build react-check

run:
	poetry run python -m ThemeTree --app-yaml apps/combatden/app.yaml --customization-yaml apps/combatden/customization.yaml

smoke:
	poetry run python -m ThemeTree --app-yaml apps/smoketest/app.yaml --customization-yaml apps/smoketest/customization.yaml

api:
	poetry run python -m uvicorn RecomposeAPI.main:app --host 0.0.0.0 --port 8001 --reload

# The local launch surface (start a run, watch it stream). NOT deployed and
# NOT 0.0.0.0: it starts runs that spend real money, so it is bound to
# loopback only. Needs the full .env (it imports the pipeline).
studio:
	poetry run python -m uvicorn ThemeTree.studio.main:app --host 127.0.0.1 --port 8002 --reload

test:
	poetry run pytest tests/ -v

# --- ThemeReact (the web theme runtime + standalone browser) ----------------
# npm, not poetry. ThemeReact/ is invisible to pyproject.toml and excluded from
# the API image (.dockerignore), exactly as RecomposeFlutter/ is — the two sides
# share only the HTTP contract this Makefile's `api` target serves.
# `react-dev` serves on :8080 (pinned — see ThemeReact/vite.config.ts) and needs
# `make api` running alongside it.
react-install:
	cd ThemeReact && npm install

react-dev:
	cd ThemeReact && npm run dev

react-build:
	cd ThemeReact && npm run build

react-check:
	cd ThemeReact && npm run typecheck && npm run lint && npm run test

# Mirror all generated images/icons to S3 (backfill + repair). Needs boto3 + AWS
# creds; bucket defaults to combatden-assets. New runs self-upload via the Writer
# when ASSET_UPLOAD_ENABLED=1; this is the one-shot backfill (skips unchanged).
sync-assets:
	poetry run python -m scripts.sync_assets.run
