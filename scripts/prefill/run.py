"""Prefill an existing run's image and text slots from checked-in seed files.

Adding a slot to ``app.yaml`` leaves every already-produced run missing it.
The honest fix is to regenerate, which costs real money per run and, across a
whole back catalogue, is a bill nobody asked for just to make a new slot
exist. This script is the cheap alternative: it SEEDS the missing slots from
the demo content the mock screens already ship, so the slot is present and
renderable immediately, and regenerating it per brand becomes an opt-in
improvement rather than a prerequisite.

**Both halves, in one pass.** Images come from ``<Category>/<slot>.jpg`` and
copy from ``<Category>/texts.yaml``, and the two are seeded together rather
than by two scripts. That is not tidiness: an image slot can now declare
``depends_on_text``, so a seeded picture and a seeded name are two halves of
one claim about what the thing IS. Seeding one without the other produces a
photo of a boxing class labelled "Sunrise Flow", which is worse than seeding
neither.

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
script is idempotent and can never overwrite a genuinely generated image or
a genuinely written line of copy.

Run from the package root (so ``.env`` is found):

    poetry run python scripts/prefill/run.py --run-dir apps/combatden/ZenBJJ
    poetry run python scripts/prefill/run.py --all-runs apps/combatden
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

import yaml
from PIL import Image

from schema import ImageOutput, TextOutput
from ThemeTree.core.errors import PipelineError
from ThemeTree.core.run_context import (
    FINAL_IMAGES_DIRNAME,
    RunContext,
    load_run,
)
from ThemeTree.executor.writer import Writer

RULE = "=" * 72
PREFILL_DIRNAME = "prefill"
# The per-category text seeds, written beside that category's images by
# ``fetch_seeds.py``: ``{text_slot_id: value}``.
TEXTS_FILENAME = "texts.yaml"
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
        prog="prefill",
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
        "--seed-root",
        type=Path,
        default=None,
        help="Where the per-category seed folders live. Defaults to "
        "<app_dir>/prefill. Pass this when the seeds and the runs are not in "
        "the same checkout — e.g. seeding a catalogue on main from a branch "
        "that added the seed set.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Report what would be seeded without writing anything.",
    )
    return parser.parse_args(argv)


def _load_texts(path: Path) -> dict[str, str]:
    """One category's text seeds, or ``{}`` when it has none.

    A missing file is not an error: text seeding is additive, and a category
    folder that predates it still seeds its images exactly as before.
    Blank or non-string values are dropped rather than written — ``TextOutput``
    rejects empty copy, and failing a whole run over one bad seed line would
    be a worse trade than skipping the slot.
    """
    if not path.is_file():
        return {}
    raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    return {
        str(k): v.strip()
        for k, v in raw.items()
        if isinstance(v, str) and v.strip()
    }


def _run_dirs(args: argparse.Namespace) -> list[Path]:
    """The run directories to act on, in a stable order.

    ``absolute()``, never ``resolve()``. A run directory is routinely a
    SYMLINK into another checkout — that is what ``setup_worktree_env.sh``
    creates so a worktree can see the real catalogue without copying it —
    and resolving one silently relocates the run into the checkout it points
    at. The seed folder is then looked for beside THAT copy, where a branch
    that just added seeds has none, and the run is skipped with "no seed
    folder for category X": a path bug wearing a category bug's clothes.
    ``--all-runs`` never resolved (``iterdir`` yields the link itself), so
    resolving here also made the two modes disagree on the same run.
    """
    if args.run_dir is not None:
        return [args.run_dir.absolute()]
    app_dir: Path = args.all_runs.absolute()
    if not app_dir.is_dir():
        raise SystemExit(f"no app directory at {app_dir}")
    # A run directory is one holding an output.yaml; `prefill/` and any other
    # bookkeeping folder is skipped by that test alone.
    return sorted(d for d in app_dir.iterdir() if (d / "output.yaml").is_file())


def _prefill_one(
    run_dir: Path,
    *,
    app_yaml: Path | None,
    seed_root: Path | None,
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
    seed_dir = (seed_root or run_dir.parent / PREFILL_DIRNAME) / category
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

    # The TEXT half, same three rules: declared by app.yaml, absent from
    # output.yaml, and present in this category's seed file.
    seeded_texts = _load_texts(seed_dir / TEXTS_FILENAME)
    text_todo: list[tuple[str, str]] = [
        (slot.id, seeded_texts[slot.id])
        for slot in app.texts
        if slot.id not in output.text_set.texts and slot.id in seeded_texts
    ]

    if not todo and not text_todo:
        return ("nothing to do", [])
    seeded_ids = [s for s, _ in todo] + [s for s, _ in text_todo]
    if dry_run:
        return (f"would seed from {category}", seeded_ids)

    final_dir = run_dir / FINAL_IMAGES_DIRNAME
    final_dir.mkdir(parents=True, exist_ok=True)
    run_ctx = RunContext(
        app, cust, out_root=run_dir.parent.parent, run_id=run_dir.name
    )
    for slot_id, value in text_todo:
        output.text_set.texts[slot_id] = TextOutput(value=value)
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

    # Only the IMAGE ids go to ``prefilled``: that argument drives asset
    # upload, and a text slot is not an asset. Both kinds are reported to the
    # caller, and both land in the ledger entry the writer appends.
    Writer().write_prefill(
        output,
        run_ctx,
        prefilled=[s for s, _ in todo],
        also_seeded=[s for s, _ in text_todo],
    )
    return (f"seeded from {category}", seeded_ids)


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(argv)
    runs = _run_dirs(args)

    mode = "DRY RUN — nothing written" if args.dry_run else "prefilling"
    print(f"\n{RULE}\n{mode}: {len(runs)} run(s)\n{RULE}")

    seeded_runs = 0
    seeded_slots = 0
    for run_dir in runs:
        status, slots = _prefill_one(
            run_dir,
            app_yaml=args.app_yaml,
            seed_root=args.seed_root.resolve() if args.seed_root else None,
            dry_run=args.dry_run,
        )
        if slots:
            seeded_runs += 1
            seeded_slots += len(slots)
            print(f"  {run_dir.name:24} {status} ({len(slots)} slots)")
        else:
            print(f"  {run_dir.name:24} {status}")

    print(f"\n{RULE}\n{seeded_runs} run(s), {seeded_slots} slot(s)")
    if seeded_slots and not args.dry_run:
        # Only when a CDN is actually configured. ``ASSETS_CDN_BASE_URL``
        # defaults to empty, which means the API serves the bytes straight
        # off disk and the new files are already live — telling everyone to
        # push to S3 would send the common case chasing infrastructure it
        # does not use.
        print(
            "seeded bytes are served off disk by default; run "
            "`make sync-assets` only if ASSETS_CDN_BASE_URL is set."
        )
    print(RULE)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
