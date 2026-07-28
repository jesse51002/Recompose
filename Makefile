.PHONY: run smoke api test sync-assets

run:
	poetry run python -m ThemeTree --app-yaml apps/combatden/app.yaml --customization-yaml apps/combatden/customization.yaml

smoke:
	poetry run python -m ThemeTree --app-yaml apps/smoketest/app.yaml --customization-yaml apps/smoketest/customization.yaml

api:
	poetry run python -m uvicorn ThemeTree.api.main:app --host 0.0.0.0 --port 8001 --reload

test:
	poetry run pytest tests/ -v

# Mirror all generated images/icons to S3 (backfill + repair). Needs boto3 + AWS
# creds; bucket defaults to combatden-assets. New runs self-upload via the Writer
# when ASSET_UPLOAD_ENABLED=1; this is the one-shot backfill (skips unchanged).
sync-assets:
	poetry run python -m scripts.sync_assets.run
