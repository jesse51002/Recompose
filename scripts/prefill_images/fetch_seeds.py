"""Fetch the checked-in prefill seed images — a ONE-TIME vendoring step.

``prefill/run.py`` seeds an existing run's class and reward image slots from
files on disk. This script is what puts those files there: it downloads the
per-gym-type demo imagery the mock screens already use and writes it under
``apps/<app_id>/prefill/<Category>/<slot>.jpg``.

**Why the seeds are JPEG when the pipeline delivers PNG.** Every source is
already a JPEG, so re-encoding one to PNG stores lossy data losslessly — 8x
the bytes for nothing recoverable (a 120 KB Pexels photo becomes a 950 KB
PNG). This set is checked in and cloned forever, so that waste is permanent.
``run.py`` converts to PNG as it seeds, into a run directory that is
gitignored, so nothing downstream sees a JPEG or pays for the PNG.

**Why the bytes are vendored rather than fetched at prefill time.** The
pipeline may not assume network access to a third-party host, and a run's
artifacts must not silently change because someone else re-uploaded an image.
Downloading once and committing the result makes the seed set a fixed,
reviewable input like every other file under ``apps/<app_id>/``.

**Why it is keyed by category.** The source imagery is already per gym type —
a Fighting gym's class photos show heavy bags, a Yoga studio's show mats — and
a run's ``output.yaml`` carries the ``category`` that says which set it wants.
Seeding from the matching set is what stops a yoga theme's store from
advertising boxing gloves. The three rewards that are genuinely universal
(guest pass, apparel, session) resolve to the same source for every category
and are written into each one anyway, so a category folder is self-contained
and the prefill script never needs a fallback path.

Run from the package root:

    poetry run python scripts/prefill_images/fetch_seeds.py

It is idempotent: an already-downloaded file is skipped unless ``--force``.
"""

from __future__ import annotations

import argparse
import io
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

# Standalone entrypoint two levels under the repo root: make `src`/`schema`
# importable regardless of how the venv installed them.
_REPO_ROOT = Path(__file__).resolve().parents[2]
if str(_REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(_REPO_ROOT))

from PIL import Image

import yaml

RULE = "=" * 72
# Where the mock screens keep the per-gym-type demo content. It is a
# TypeScript module rather than a data file, so it is read by executing it
# with the package's own toolchain (see ``_read_groups``) instead of being
# re-transcribed here — a second copy of 39 URLs would drift the first time
# one is swapped.
GROUPS_MODULE = (
    _REPO_ROOT / "RecomposeJsxMockUps" / "src" / "showcaseGroupDefaults.ts"
)
PREFILL_DIRNAME = "prefill"
MANIFEST_FILENAME = "manifest.yaml"
# Seeds are stored as JPEG, not as the PNG the pipeline delivers.
#
# These are photographs, and PNG is lossless: the same 65 images cost ~143 MB
# as PNG against ~8 MB as JPEG, and this set is CHECKED IN — the repo pays
# that every clone, forever, for demo placeholders. The prefill script
# converts to PNG as it seeds, and the run directory it writes into is
# gitignored, so nothing downstream sees a JPEG or pays for the PNG.
SEED_SUFFIX = ".jpg"
# Stock sources run to 4000px+. The phone mock renders these at ~150px
# (rewards) and full-bleed on a 390pt screen (classes), and the pipeline's own
# generated images are 1024x1024 — so anything past that is bytes nobody sees.
MAX_EDGE = 1200
JPEG_QUALITY = 82
# Slot ← source mapping. The class slots take the category's four class
# photos in order; the reward slots take its four rewards, which the source
# lists cheapest-first (guest pass, apparel, gear, session) — the same order
# the app.yaml slots are declared in.
CLASS_SLOTS = ("class_photo_1", "class_photo_2", "class_photo_3", "class_photo_4")
REWARD_SLOTS = ("reward_guest_pass", "reward_apparel", "reward_gear", "reward_session")
# A plain UA: Wikimedia rejects urllib's default with 403.
USER_AGENT = "Recompose-prefill-seed-fetch/1.0 (+https://github.com/recompose)"
TIMEOUT_SECONDS = 60

_EXTRACT_JS = """
const M = process.argv[2];
const { SHOWCASE_CLASSES_BY_GROUP, SHOWCASE_REWARDS_BY_GROUP } = await import(M);
const out = {};
for (const g of Object.keys(SHOWCASE_CLASSES_BY_GROUP)) {
  out[g] = {
    classes: SHOWCASE_CLASSES_BY_GROUP[g].map((c) => [c.name, c.imageUrl]),
    rewards: SHOWCASE_REWARDS_BY_GROUP[g].map((r) => [r.title, r.imageUrl]),
  };
}
console.log(JSON.stringify(out));
"""


def _parse_args(argv: list[str] | None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="fetch_seeds",
        description="Download the per-category prefill seed images (one-time).",
    )
    parser.add_argument(
        "--app-dir",
        type=Path,
        default=_REPO_ROOT / "apps" / "combatden",
        help="App directory the seeds are written under (default apps/combatden).",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-download files that are already present.",
    )
    return parser.parse_args(argv)


def _read_groups() -> dict[str, dict[str, list[list[str]]]]:
    """The per-gym-type demo content, read out of the mock screens' own module.

    Executed with ``tsx`` rather than parsed, so the source of truth stays the
    TypeScript the app actually renders from.
    """
    script = Path(__file__).with_name("_extract_groups.mjs")
    script.write_text(_EXTRACT_JS, encoding="utf-8")
    try:
        proc = subprocess.run(
            ["npx", "--yes", "tsx", str(script), str(GROUPS_MODULE)],
            capture_output=True,
            text=True,
            timeout=300,
        )
    finally:
        script.unlink(missing_ok=True)
    if proc.returncode != 0:
        raise SystemExit(
            f"could not read {GROUPS_MODULE.name}:\n{proc.stderr.strip()}"
        )
    return json.loads(proc.stdout)


def _download_seed(url: str, dest: Path) -> None:
    """Fetch ``url`` and write a JPEG seed to ``dest``.

    **Verbatim whenever possible.** Every source here is already a JPEG, and
    re-encoding one costs a second generation of loss to buy nothing — so the
    fetched bytes are written through untouched unless something actually
    needs changing. Only an oversized or non-JPEG source is re-encoded, and
    then just once.
    """
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
        payload = response.read()

    dest.parent.mkdir(parents=True, exist_ok=True)
    image = Image.open(io.BytesIO(payload))
    if image.format == "JPEG" and max(image.size) <= MAX_EDGE:
        dest.write_bytes(payload)
        return

    image = image.convert("RGB")
    image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
    # `optimize` runs an extra Huffman pass; these are written once and read
    # forever, so the encode time is free in the only sense that matters.
    image.save(dest, format="JPEG", quality=JPEG_QUALITY, optimize=True)


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(argv)
    app_dir: Path = args.app_dir.resolve()
    if not app_dir.is_dir():
        raise SystemExit(f"no app directory at {app_dir}")

    groups = _read_groups()
    root = app_dir / PREFILL_DIRNAME
    print(f"\n{RULE}\nfetching prefill seeds for {len(groups)} categories → {root}\n{RULE}")

    manifest: dict[str, dict[str, str]] = {}
    fetched = skipped = 0
    for category, content in sorted(groups.items()):
        pairs: list[tuple[str, str, str]] = []
        for slot, (name, url) in zip(CLASS_SLOTS, content["classes"], strict=True):
            pairs.append((slot, name, url))
        for slot, (name, url) in zip(REWARD_SLOTS, content["rewards"], strict=True):
            pairs.append((slot, name, url))

        manifest[category] = {}
        for slot, name, url in pairs:
            dest = root / category / f"{slot}{SEED_SUFFIX}"
            manifest[category][slot] = url
            if dest.is_file() and not args.force:
                skipped += 1
                continue
            _download_seed(url, dest)
            fetched += 1
            print(f"  {category:9} {slot:20} ← {name}")

    manifest_path = root / MANIFEST_FILENAME
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(
        "# Provenance for the checked-in prefill seed images.\n"
        "#\n"
        "# Written by scripts/prefill_images/fetch_seeds.py. Each entry records\n"
        "# the URL a seed PNG was downloaded from, so the set can be audited and\n"
        "# re-fetched. The BYTES beside this file are what prefill actually uses\n"
        "# — nothing reads these URLs at prefill time.\n\n"
        + yaml.safe_dump(manifest, sort_keys=True, width=100),
        encoding="utf-8",
    )

    print(f"\n{RULE}\nfetched {fetched}, skipped {skipped} (already present)")
    print(f"manifest: {manifest_path}\n{RULE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
