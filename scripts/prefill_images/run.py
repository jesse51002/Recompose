"""Prefill an existing run's image slots from checked-in seed files.

Adding an image slot to ``app.yaml`` leaves every already-produced run
missing it. The honest fix is to regenerate, which costs real money per run
and, across a whole back catalogue, is a bill nobody asked for just to make a
new slot exist. This script is the cheap alternative: it SEEDS the missing
slots from the demo imagery the mock screens already ship, so the slot is
present and renderable immediately, and regenerating it per brand becomes an
opt-in improvement rather than a prerequisite.

**A prefilled slot is a placeholder, and the ledger says so.** The bytes were
never generated for this brand — they are stock demo content matched to the
run's ``category``, not something a model made from the brief. The pass is
recorded as ``ExpansionKind.PREFILL`` at zero cost precisely so that fact
survives: anything reading the ledger can tell a seeded slot from a real one
and re-roll it with ``scripts/regen_image``.

**Category-matched, never one-size-fits-all.** Seeds live under
``apps/<app_id>/prefill/<Category>/<slot>.png`` and the run's own
``output.yaml`` category picks the folder, so a Yoga theme is seeded with a
yoga studio's photographs and a Fighting theme with a fight gym's. A run whose
category is missing or has no seed folder is SKIPPED rather than seeded from
some default — silently giving a pilates studio boxing imagery is the exact
failure this arrangement exists to avoid.

**Absent-only.** A slot already in ``output.yaml`` is never touched, so the
script is idempotent and can never overwrite a genuinely generated image.

Run from the package root (so ``.env`` is found):

    poetry run python scripts/prefill_images/run.py --run-dir apps/combatden/ZenBJJ
    poetry run python scripts/prefill_images/run.py --all-runs apps/combatden

Then ``make sync-assets`` — the new bytes have to reach S3/CloudFront or the
API will emit CDN URLs for images that are not there.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

# Standalone entrypoint two levels under the repo root: make `src`/`schema`
# importable regardless of how the venv installed them.
_REPO_ROOT = Path(__file__).resolve().parents[2]
if str(_REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(_REPO_ROOT))

from PIL import Image

from schema import ImageOutput
from ThemeTree.core.errors import PipelineError
from ThemeTree.core.run_context import (
    FINAL_IMAGES_DIRNAME,
    RunContext,
    load_run,
)
from ThemeTree.executor.writer import Writer

RULE = "=" * 72
PREFILL_DIRNAME = "prefill"
# Seeds are checked in as JPEG (see fetch_seeds.py: the sources are already
# JPEG, and storing them as PNG would be 8x the bytes for nothing). What a run
# DELIVERS is always ``<slot>.png`` — the API, the CDN sync and the
# content-hash stamp all key off that name — so seeding converts.
SEED_SUFFIX = ".jpg"
IMAGE_SUFFIX = ".png"
# Recorded as the slot's ``prompt``. ``ImageOutput.prompt`` is required and
# validated non-empty, and it is the field a human reads when asking "what
# made this image" — so it says plainly that nothing did.
PREFILL_PROMPT = (
    "Prefilled from checked-in demo imagery matched to this run's category; "
    "not generated from the brand brief. Re-roll with scripts/regen_image to "
    "produce a brand-specific image."
)


def _parse_args(argv: list[str] | None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="prefill_images",
        description=(
            "Seed an existing run's not-yet-generated image slots from the "
            "checked-in per-category demo imagery."
        ),
    )
    target = parser.add_mutually_exclusive_group(required=True)
    target.add_argument(
        "--run-dir",
        type=Path,
        help="A single run directory, e.g. apps/combatden/ZenBJJ.",
    )
    target.add_argument(
        "--all-runs",
        type=Path,
        metavar="APP_DIR",
        help="Every run directory under an app, e.g. apps/combatden.",
    )
    parser.add_argument(
        "--app-yaml",
        type=Path,
        default=None,
        help="Updated manifest to prefill against (e.g. the live "
        "apps/<app_id>/app.yaml). Defaults to each run dir's frozen snapshot, "
        "which by definition does not declare slots added after it was written "
        "— so pass this when seeding NEW slots.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Report what would be seeded without writing anything.",
    )
    return parser.parse_args(argv)


def _run_dirs(args: argparse.Namespace) -> list[Path]:
    """The run directories to act on, in a stable order."""
    if args.run_dir is not None:
        return [args.run_dir.resolve()]
    app_dir: Path = args.all_runs.resolve()
    if not app_dir.is_dir():
        raise SystemExit(f"no app directory at {app_dir}")
    # A run directory is one holding an output.yaml; `prefill/` and any other
    # bookkeeping folder is skipped by that test alone.
    return sorted(d for d in app_dir.iterdir() if (d / "output.yaml").is_file())


def _prefill_one(
    run_dir: Path,
    *,
    app_yaml: Path | None,
    dry_run: bool,
) -> tuple[str, list[str]]:
    """Seed one run. Returns (status, slots-seeded)."""
    try:
        app, cust, output = load_run(run_dir, app_yaml=app_yaml)
    except PipelineError as exc:
        return (f"unreadable ({exc})", [])

    category = output.category
    if not category:
        return ("skipped: run has no category", [])
    seed_dir = run_dir.parent / PREFILL_DIRNAME / category
    if not seed_dir.is_dir():
        return (f"skipped: no seed folder for category {category!r}", [])

    # Prefillable = declared by app.yaml, absent from output.yaml, and has a
    # seed file for this category. The seed FOLDER is what decides which slots
    # are prefillable at all, so adding one for a new app is a file drop
    # rather than a code change.
    todo: list[tuple[str, Path]] = []
    for slot in app.images:
        if slot.id in output.image_set.images:
            continue
        seed = seed_dir / f"{slot.id}{SEED_SUFFIX}"
        if seed.is_file():
            todo.append((slot.id, seed))

    if not todo:
        return ("nothing to do", [])
    if dry_run:
        return (f"would seed from {category}", [s for s, _ in todo])

    final_dir = run_dir / FINAL_IMAGES_DIRNAME
    final_dir.mkdir(parents=True, exist_ok=True)
    run_ctx = RunContext(
        app, cust, out_root=run_dir.parent.parent, run_id=run_dir.name
    )
    for slot_id, seed in todo:
        dest = Path(str(run_ctx.image_path(slot_id)))
        # JPEG seed -> the PNG a run delivers. Re-encoded rather than renamed:
        # the name is what the API serves, and a PNG-named JPEG would be a lie
        # that only surfaces in whatever decodes it first.
        with Image.open(seed) as image:
            image.convert("RGB").save(dest, format="PNG")
        output.image_set.images[slot_id] = ImageOutput(
            path=run_ctx.image_path(slot_id),
            # Re-affirmed by the writer's _stamp_versions against the bytes
            # actually on disk; set here so the model is valid at construction.
            version=Writer._content_version(dest),
            prompt=PREFILL_PROMPT,
            # No classification happened — nothing was sent to a model.
            complexity=None,
        )

    Writer().write_prefill(output, run_ctx, prefilled=[s for s, _ in todo])
    return (f"seeded from {category}", [s for s, _ in todo])


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(argv)
    runs = _run_dirs(args)

    mode = "DRY RUN — nothing written" if args.dry_run else "prefilling"
    print(f"\n{RULE}\n{mode}: {len(runs)} run(s)\n{RULE}")

    seeded_runs = 0
    seeded_slots = 0
    for run_dir in runs:
        status, slots = _prefill_one(
            run_dir, app_yaml=args.app_yaml, dry_run=args.dry_run
        )
        if slots:
            seeded_runs += 1
            seeded_slots += len(slots)
            print(f"  {run_dir.name:24} {status} ({len(slots)} slots)")
        else:
            print(f"  {run_dir.name:24} {status}")

    print(f"\n{RULE}\n{seeded_runs} run(s), {seeded_slots} slot(s)")
    if seeded_slots and not args.dry_run:
        print("next: make sync-assets  (push the new bytes to S3/CloudFront)")
    print(RULE)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
