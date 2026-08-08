"""Fetch the checked-in prefill seeds — a ONE-TIME vendoring step.

``prefill/run.py`` seeds an existing run's not-yet-generated slots from files
on disk. This script is what puts those files there. It writes two kinds of
seed under ``apps/<app_id>/prefill/<Category>/``:

* ``<slot>.jpg`` — the per-gym-type demo imagery the mock screens already
  use: four class photographs, four reward products, four video thumbnails.
* ``texts.yaml`` — the NAMES that go with them, taken from the same source
  rows: the class names, the reward titles and the video titles.

The two halves are fetched together because they describe the same twelve
things, and a seeded picture whose seeded name came from a different row
would be exactly the mismatch ``ImageSlot.depends_on_text`` exists to
prevent. One pass over one source keeps them in step by construction.

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

    poetry run python scripts/prefill/fetch_seeds.py

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

from schema import AppFormat

RULE = "=" * 72
# Where the mock screens keep the per-gym-type demo content. It is a
# TypeScript module rather than a data file, so it is read by executing it
# with the package's own toolchain (see ``_read_groups``) instead of being
# re-transcribed here — a second copy of 39 URLs would drift the first time
# one is swapped.
GROUPS_MODULE = (
    _REPO_ROOT
    / "JsxMockUps"
    / "src"
    / "apps"
    / "combatden"
    / "showcaseGroupDefaults.ts"
)
# The video feeds live one module over — same provenance, same group keys, but
# ~110 rows against 32 classes and 32 rewards, which is why the mockups split
# them in the first place.
VIDEOS_MODULE = GROUPS_MODULE.with_name("showcaseVideoDefaults.ts")
PREFILL_DIRNAME = "prefill"
MANIFEST_FILENAME = "manifest.yaml"
# The per-category text seeds, beside that category's images. A data file
# rather than more Python because it is app content, and the app-agnostic
# rule puts app content under ``apps/<app_id>/``.
TEXTS_FILENAME = "texts.yaml"
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
# The video shelf takes the first four cards of the category's feed, which is
# already ranked — card 0 is the hero the Videos tab features, so slot 1 seeds
# from the same row the app would put in the same place.
VIDEO_SLOTS = ("video_thumb_1", "video_thumb_2", "video_thumb_3", "video_thumb_4")
# Image slot → the text slot naming it, mirroring ``depends_on_text`` in
# ``apps/combatden/app.yaml``. Held here so ONE source row seeds both halves:
# the picture and the name are read off the same entry, in the same pass.
NAME_SLOT_FOR = {
    "class_photo_1": "class_name_1",
    "class_photo_2": "class_name_2",
    "class_photo_3": "class_name_3",
    "class_photo_4": "class_name_4",
    "reward_guest_pass": "reward_name_guest_pass",
    "reward_apparel": "reward_name_apparel",
    "reward_gear": "reward_name_gear",
    "reward_session": "reward_name_session",
    "video_thumb_1": "video_title_1",
    "video_thumb_2": "video_title_2",
    "video_thumb_3": "video_title_3",
    "video_thumb_4": "video_title_4",
}
# A plain UA: Wikimedia rejects urllib's default with 403.
USER_AGENT = "Recompose-prefill-seed-fetch/1.0 (+https://github.com/recompose)"
TIMEOUT_SECONDS = 60

# Each row is [name, imageUrl] — the two halves of one seeded thing, kept
# together from the source so the picture and the name cannot drift apart.
# Videos are capped at the first four of an already-ranked feed: card 0 is the
# hero the Videos tab features, so slot 1 seeds from the row the app itself
# would put in the same place.
_EXTRACT_JS = """
const M = process.argv[2];
const V = process.argv[3];
const { SHOWCASE_CLASSES_BY_GROUP, SHOWCASE_REWARDS_BY_GROUP } = await import(M);
const { SHOWCASE_VIDEOS_BY_GROUP } = await import(V);
const out = {};
for (const g of Object.keys(SHOWCASE_CLASSES_BY_GROUP)) {
  out[g] = {
    classes: SHOWCASE_CLASSES_BY_GROUP[g].map((c) => [c.name, c.imageUrl]),
    rewards: SHOWCASE_REWARDS_BY_GROUP[g].map((r) => [r.title, r.imageUrl]),
    videos: (SHOWCASE_VIDEOS_BY_GROUP[g] ?? [])
      .slice(0, 4)
      .map((v) => [v.title, v.thumbnailUrl]),
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
            [
                "npx",
                "--yes",
                "tsx",
                str(script),
                str(GROUPS_MODULE),
                str(VIDEOS_MODULE),
            ],
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


def _text_bounds(app_dir: Path) -> dict[str, tuple[int, int]]:
    """Each text slot's ``(max_words, max_chars)`` from the app's manifest.

    Read off ``AppFormat`` rather than re-parsed, so the numbers checked
    against are the CLAMPED ones the pipeline will really validate with —
    a YAML typo is corrected identically in both places.
    """
    app = AppFormat.model_validate(
        yaml.safe_load((app_dir / "app.yaml").read_text(encoding="utf-8"))
    )
    return {s.id: (s.max_words, s.max_chars) for s in app.texts}


def _bounds_overflow(value: str, bound: tuple[int, int] | None) -> str:
    """Why ``value`` breaks ``bound``, or ``""`` when it fits (or the slot
    is not declared — an undeclared name is the prefill script's problem to
    report, not this one's)."""
    if bound is None:
        return ""
    max_words, max_chars = bound
    words = len(value.split())
    if words > max_words:
        return f"{words} words > {max_words}"
    if len(value) > max_chars:
        return f"{len(value)} chars > {max_chars}"
    return ""


def _write_texts(path: Path, category: str, texts: dict[str, str]) -> None:
    """Write one category's text seeds: ``{text_slot_id: value}``."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        f"# Text seeds for the {category} category.\n"
        "#\n"
        "# Written by scripts/prefill/fetch_seeds.py from the same source\n"
        "# rows as the images beside this file — a class photo and its class\n"
        "# name come from ONE entry, which is what keeps a seeded picture and\n"
        "# a seeded name describing the same thing.\n"
        "#\n"
        "# These are PLACEHOLDERS, not brand copy: they are the demo content\n"
        "# the mock screens ship, matched to this category. `scripts/regen`\n"
        "# re-rolls any of them for a real brand.\n\n"
        + yaml.safe_dump(texts, sort_keys=True, width=100, allow_unicode=True),
        encoding="utf-8",
    )


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(argv)
    app_dir: Path = args.app_dir.resolve()
    if not app_dir.is_dir():
        raise SystemExit(f"no app directory at {app_dir}")

    groups = _read_groups()
    root = app_dir / PREFILL_DIRNAME
    print(f"\n{RULE}\nfetching prefill seeds for {len(groups)} categories → {root}\n{RULE}")

    bounds = _text_bounds(app_dir)
    manifest: dict[str, dict[str, str]] = {}
    fetched = skipped = 0
    overflows: list[str] = []
    for category, content in sorted(groups.items()):
        pairs: list[tuple[str, str, str]] = []
        for slot, (name, url) in zip(CLASS_SLOTS, content["classes"], strict=True):
            pairs.append((slot, name, url))
        for slot, (name, url) in zip(REWARD_SLOTS, content["rewards"], strict=True):
            pairs.append((slot, name, url))
        for slot, (name, url) in zip(VIDEO_SLOTS, content["videos"], strict=True):
            pairs.append((slot, name, url))

        manifest[category] = {}
        texts: dict[str, str] = {}
        for slot, name, url in pairs:
            dest = root / category / f"{slot}{SEED_SUFFIX}"
            manifest[category][slot] = url
            # The NAME half. Written for every pair regardless of whether the
            # image was re-downloaded, so a `--force`-less re-run still
            # refreshes texts.yaml after the slot map changes.
            name_slot = NAME_SLOT_FOR.get(slot)
            if name_slot is not None:
                texts[name_slot] = name
                overflow = _bounds_overflow(name, bounds.get(name_slot))
                if overflow:
                    overflows.append(f"{category}/{name_slot}: {overflow} — {name!r}")
            if dest.is_file() and not args.force:
                skipped += 1
                continue
            _download_seed(url, dest)
            fetched += 1
            print(f"  {category:9} {slot:20} ← {name}")

        _write_texts(root / category / TEXTS_FILENAME, category, texts)

    manifest_path = root / MANIFEST_FILENAME
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(
        "# Provenance for the checked-in prefill seed images.\n"
        "#\n"
        "# Written by scripts/prefill/fetch_seeds.py. Each entry records\n"
        "# the URL a seed PNG was downloaded from, so the set can be audited and\n"
        "# re-fetched. The BYTES beside this file are what prefill actually uses\n"
        "# — nothing reads these URLs at prefill time.\n\n"
        + yaml.safe_dump(manifest, sort_keys=True, width=100),
        encoding="utf-8",
    )

    print(f"\n{RULE}\nfetched {fetched}, skipped {skipped} (already present)")
    print(f"manifest: {manifest_path}")
    if overflows:
        # Reported, never truncated. A seed that breaks its slot's declared
        # bounds is a real mismatch — the seeded screen would lay out
        # differently from the generated one — and the fix is to widen the
        # bound in app.yaml or pick another source row, both of which are
        # decisions. Silently trimming would hide the choice.
        print(f"\n{len(overflows)} text seed(s) EXCEED their app.yaml bounds:")
        for line in overflows:
            print(f"  {line}")
        print("widen the slot in app.yaml, or seed from a different row.")
    print(RULE)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
