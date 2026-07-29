"""Writer — serializes a run's YAML artifacts in one call."""

from __future__ import annotations

import hashlib
import logging
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import yaml
from pydantic import BaseModel

from ThemeTree.core.asset_uploader import upload_run_assets
from ThemeTree.core.config import settings
from ThemeTree.core.errors import PipelineError
from ThemeTree.core.run_context import RUN_ID_FORMAT, RunContext
from ThemeTree.executor.orchestrator import PipelineResult
from schema import (
    ExpansionCostLog,
    ExpansionEntry,
    ExpansionKind,
    Output,
    RunCost,
)

logger = logging.getLogger(__name__)

APP_PROVENANCE_NAME = "app.yaml"
CUSTOMIZATION_PROVENANCE_NAME = "customization.yaml"

# Cost is an estimate (litellm pricing + a flat Recraft removeBackground
# rate), so a fixed business precision — not float noise — lands in output.yaml.
COST_PRECISION = 6


class Writer:
    """Writes provenance + output for one run, together."""

    def write(
        self,
        result: PipelineResult,
        run_ctx: RunContext,
        *,
        prior_category: str | None = None,
    ) -> None:
        """Serialize provenance, then ``output.yaml`` with the run cost.

        The writer already owns assembly, so it also aggregates cost:
        each paid service tracked its own running total during the run;
        here we sum them into an optional ``RunCost`` and stamp it onto
        the output before the dump.

        ``prior_category`` is the classification of a run this write
        *overwrites*, and it is a **fallback, not an override**: the run's own
        classification node produces the category now, so a full in-place
        re-run re-classifies from the brief exactly as it re-makes every other
        slot. The prior stamp is used only when this run produced nothing —
        the app declares no ``categories`` vocabulary, or the classification
        node failed — so a provider blip or a classification-less app never
        drops a listed theme out of the picker. The caller (``ThemeTree/cli.py``)
        captures it from the existing ``output.yaml`` *before* the pipeline
        clears that file. A fresh run of an app with no vocabulary has neither
        and stays uncategorised.
        """
        app_path = run_ctx.run_dir / APP_PROVENANCE_NAME
        cust_path = run_ctx.run_dir / CUSTOMIZATION_PROVENANCE_NAME
        output_path = run_ctx.output_path()

        run_cost = self._run_cost(result)
        category = self._resolve_category(
            result.output.category, prior_category, run_ctx
        )
        output = result.output.model_copy(
            update={"cost": run_cost, "category": category}
        )
        self._stamp_versions(output, run_ctx)

        self._dump_model(run_ctx.app, app_path)
        self._dump_model(run_ctx.cust, cust_path)
        self._dump_model(output, output_path)

        self._upload_assets(
            run_ctx,
            list(output.image_set.images),
            list(output.icon_set.icons),
        )

        logger.debug(
            "wrote provenance + output (cost $%.6f: llm $%.6f, "
            "image $%.6f, bg $%.6f, icon $%.6f): %s, %s, %s",
            run_cost.total,
            run_cost.llm,
            run_cost.image_generation,
            run_cost.background_removal,
            run_cost.icon_generation,
            app_path,
            cust_path,
            output_path,
        )

    def write_expansion(
        self,
        result: PipelineResult,
        run_ctx: RunContext,
        *,
        original_cost: RunCost | None,
        original_category: str | None,
        kind: ExpansionKind,
    ) -> None:
        """Write a reopen-time pass (expand or regenerate) back in place.

        Two files change, no others:

        - ``output.yaml`` is re-dumped from the merged ``Output`` (the seeded
          done nodes plus whatever this pass (re)generated), but its ``cost``
          block is set to ``original_cost`` — carried forward from the file we
          loaded — so a partial pass never overwrites the original full-run
          cost. ``original_category`` is a **fallback** for the classification
          the same way ``prior_category`` is on ``write``: a seeded pass
          normally returns the run's own category through the classification
          node (verbatim when it was already classified, freshly picked when
          this pass backfilled it), and the loaded value is used only when the
          pass produced none — the run dir's frozen ``app.yaml`` snapshot
          declares no ``categories``, or the node failed. Without that
          fallback an expand against an old snapshot would silently un-list
          the theme from the picker.
        - ``expansion_cost.yaml`` gains one appended ``ExpansionEntry``
          recording *this* pass: its ``kind`` (expand vs regenerate), when it
          ran, which node keys it (re)generated, the per-slot
          ``overwrite_specs`` applied, and what those calls cost (the fresh
          paid services accumulated only this pass's spend).

        The dir's ``app.yaml`` / ``customization.yaml`` are left alone — they
        are the inputs the caller curated, not artifacts this writer owns.
        """
        category = self._resolve_category(
            result.output.category, original_category, run_ctx
        )
        output = result.output.model_copy(
            update={"cost": original_cost, "category": category}
        )
        self._stamp_versions(output, run_ctx)
        self._dump_model(output, run_ctx.output_path())

        self._upload_assets(
            run_ctx,
            [s for s in result.generated if s in output.image_set.images],
            [s for s in result.generated if s in output.icon_set.icons],
        )

        ledger_path = run_ctx.expansion_cost_path()
        log = self._load_expansion_log(ledger_path)
        pass_cost = self._run_cost(result)
        log.expansions.append(
            ExpansionEntry(
                kind=kind,
                expanded_at=datetime.now(timezone.utc).strftime(
                    RUN_ID_FORMAT
                ),
                generated=sorted(result.generated),
                overwrite_specs=run_ctx.overwrite_specs,
                cost=pass_cost,
            )
        )
        self._dump_model(log, ledger_path)

        logger.debug(
            "%s %s: generated %s (pass cost $%.6f); ledger now %d entr%s",
            kind.value,
            run_ctx.run_dir,
            sorted(result.generated),
            pass_cost.total,
            len(log.expansions),
            "y" if len(log.expansions) == 1 else "ies",
        )

    def write_partial(self, result: PipelineResult, run_ctx: RunContext) -> None:
        """Write ``output.yaml`` for a run that is still going.

        Called once per settled level by a watcher passed to
        ``Pipeline.run(on_partial=...)``. It exists so a live preview can
        REPAINT while the run is in flight: images have their own files and
        can be shown the moment a node reports them, but colour, typography
        and copy exist nowhere except this file, so without it a watcher shows
        generated imagery over an unthemed shell for the whole run.

        **Provenance is written too, and that is not an oversight.** The
        first version of this wrote only ``output.yaml``, reasoning that
        ``app.yaml`` / ``customization.yaml`` are static and the final write
        lays them down. The final write may never happen. A run killed
        mid-flight then left a directory carrying an ``output.yaml`` — so the
        read API lists it as a design — with no frozen manifest, which is
        exactly what ``expand`` / ``regen`` reopen against: the run was
        listed, looked finished, and could not be repaired. Writing them here
        is idempotent and costs two small dumps per level.

        **Never anything append-only**: no asset upload (a partial is not a
        publish), and above all no ledger entry —
        ``expansion_cost.yaml`` appends, so writing one per level would record
        a dozen phantom passes for a single run.

        The cost stamped here is the RUNNING total, which is the honest
        figure: it is what has been spent at this instant, and the final
        ``write`` overwrites it with the same arithmetic over the same
        services.

        Slots that have not been produced yet stamp an empty ``version`` —
        ``_content_version`` already returns "" for a file that is not there,
        which is the truthful answer for an asset that does not exist rather
        than a fingerprint of nothing.
        """
        output = result.output.model_copy(
            update={"cost": self._run_cost(result)}
        )
        self._stamp_versions(output, run_ctx)
        self._dump_model_atomic(output, run_ctx.output_path())
        # The inputs this run was launched from, so a run that dies mid-flight
        # is still a REOPENABLE directory rather than an un-repairable one.
        self._dump_model_atomic(
            run_ctx.app, run_ctx.run_dir / APP_PROVENANCE_NAME
        )
        self._dump_model_atomic(
            run_ctx.cust, run_ctx.run_dir / CUSTOMIZATION_PROVENANCE_NAME
        )

        logger.debug(
            "wrote partial output for %s (%d image slot(s) so far)",
            run_ctx.run_dir,
            len(output.image_set.images),
        )

    def write_prefill(
        self,
        output: Output,
        run_ctx: RunContext,
        *,
        prefilled: list[str],
        also_seeded: list[str] | None = None,
    ) -> None:
        """Write a prefill pass — slots seeded from checked-in files rather
        than generated — back in place.

        ``prefilled`` is the image slots and ``also_seeded`` anything else
        (today: text). They are separate parameters because only the first
        names an ASSET — a file on disk to hash and upload — while both
        belong in the ledger's ``generated`` list, which records what the
        pass touched. Collapsing them would either upload copy or hide it.

        The same two files a reopen pass touches, and nothing else. It is a
        sibling of ``write_expansion`` rather than a caller of it because a
        prefill has no ``PipelineResult`` behind it: no node ran, no provider
        was called, and there is no cost to sum. What it does share is the
        part that matters — ``_stamp_versions`` runs over the merged output,
        so a seeded slot gets the same content-hash ``?v=`` token a generated
        one does and the API can serve it without knowing the difference.

        ``cost`` on ``output.yaml`` is whatever was loaded and is never
        touched; the ledger entry is a genuine zero. That is not a placeholder
        for an unknown figure — a prefill provably spends nothing, and a
        reader summing the ledger should see that.
        """
        self._stamp_versions(output, run_ctx)
        self._dump_model(output, run_ctx.output_path())

        self._upload_assets(run_ctx, prefilled, [])

        seeded = sorted(prefilled) + sorted(also_seeded or [])
        ledger_path = run_ctx.expansion_cost_path()
        log = self._load_expansion_log(ledger_path)
        log.expansions.append(
            ExpansionEntry(
                kind=ExpansionKind.PREFILL,
                expanded_at=datetime.now(timezone.utc).strftime(RUN_ID_FORMAT),
                generated=seeded,
                # Every bucket spelled out rather than defaulted: a prefill
                # spends nothing anywhere, and a reader summing the ledger
                # should see four explicit zeros, not absent fields.
                cost=RunCost(
                    total=0.0,
                    llm=0.0,
                    image_generation=0.0,
                    background_removal=0.0,
                    icon_generation=0.0,
                ),
            )
        )
        self._dump_model(log, ledger_path)

        logger.debug(
            "prefill %s: seeded %s; ledger now %d entr%s",
            run_ctx.run_dir,
            seeded,
            len(log.expansions),
            "y" if len(log.expansions) == 1 else "ies",
        )

    @staticmethod
    def _resolve_category(
        produced: str | None,
        carried: str | None,
        run_ctx: RunContext,
    ) -> str | None:
        """The ``category`` to stamp on ``output.yaml``, validated against the
        app's declared vocabulary before it is written.

        ``produced`` is what this pass's classification node resolved (``None``
        when the app declares no vocabulary, or the node failed); ``carried``
        is the value the overwritten/reopened ``output.yaml`` already had.
        Produced wins — a re-run re-classifies — and the carried value is the
        fallback that keeps a listed theme listed when nothing was produced.

        Validating here, at write time, is what stops a bad value reaching the
        artifact. The styles endpoint skips any run whose category is not in
        the declared vocabulary, so an unvalidated write surfaces only as the
        theme silently vanishing from the picker — a symptom nobody traces back
        to the write. The two sources are treated differently on purpose:

        - A **produced** value outside the vocabulary is an internal
          contradiction (the node built its response schema *from* that
          vocabulary and the seed only seeds in-vocabulary values), so it is a
          bug, not data — raise rather than write a run the picker will drop.
        - A **carried** value outside it is stale artifact data — the app's
          vocabulary changed under a run classified against the old one. The
          pass already spent real money, so failing the write would be the
          expensive answer to someone else's edit: log it loudly and write the
          run uncategorised, leaving ``expand`` / ``regen --slot category`` to
          re-file it.

        An app that declares no vocabulary is not checked at all — the same
        rule the styles endpoint applies.
        """
        declared = run_ctx.app.categories
        if produced is not None:
            if declared and produced not in declared:
                raise PipelineError(
                    f"refusing to write category {produced!r}: not in the "
                    f"{run_ctx.app_id} app.yaml vocabulary {sorted(declared)}"
                )
            return produced
        if carried is not None:
            if declared and carried not in declared:
                logger.error(
                    "dropping stale category %r on %s/%s: not in the "
                    "app.yaml vocabulary %s — the run is written "
                    "uncategorised and will not be listed by the styles API "
                    "until it is re-classified",
                    carried,
                    run_ctx.app_id,
                    run_ctx.run_id,
                    sorted(declared),
                )
                return None
            return carried
        if declared:
            logger.warning(
                "run %s/%s has no category — it will not be listed by the "
                "styles API until it is classified",
                run_ctx.app_id,
                run_ctx.run_id,
            )
        return None

    @staticmethod
    def _load_expansion_log(path: Path) -> ExpansionCostLog:
        """The run's existing spend ledger, or an empty one if never expanded.

        An empty/whitespace ``expansion_cost.yaml`` parses to ``None``; treat
        that the same as absent — a fresh, empty log to append to.
        """
        if not path.is_file():
            return ExpansionCostLog()
        return ExpansionCostLog.model_validate(
            yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        )

    @staticmethod
    def _run_cost(result: PipelineResult) -> RunCost:
        """Sum the run's paid services into the total + per-service breakdown,
        and the same spend split per model id.

        ``llm`` = every structured LLM call; ``image_generation`` =
        generate + any corrective edit (one service);
        ``background_removal`` = the flat Recraft removeBackground per-call
        rate; ``icon_generation`` = the published Recraft per-image price for
        any icon slot a curated set couldn't cover. ``by_model`` merges the
        four services' per-model-id buckets: LLM ids only ever appear on
        the LLM client, image ids only on the image generator,
        ``"recraft_remove_bg"`` only on the remover, and the Recraft icon
        model ids only on the icon generator, so the buckets are disjoint and
        a plain merge cannot double-count.
        """
        llm = round(result.llm.cost, COST_PRECISION)
        image_generation = round(result.image_gen.cost, COST_PRECISION)
        background_removal = round(result.bg_remover.cost, COST_PRECISION)
        icon_generation = round(result.icon_gen.cost, COST_PRECISION)
        by_model = {
            model: round(amount, COST_PRECISION)
            for service in (
                result.llm,
                result.image_gen,
                result.bg_remover,
                result.icon_gen,
            )
            for model, amount in service.cost_by_model.items()
        }
        return RunCost(
            total=round(
                llm + image_generation + background_removal + icon_generation,
                COST_PRECISION,
            ),
            llm=llm,
            image_generation=image_generation,
            background_removal=background_removal,
            icon_generation=icon_generation,
            by_model=by_model,
        )

    def _stamp_versions(self, output: Output, run_ctx: RunContext) -> None:
        """Stamp each asset slot with a content fingerprint of the bytes the
        API will serve, so an edited asset gets a changed ``?v=`` URL.

        Hashes the *served* file by slot id — ``final_images/<slot>.png``,
        ``icons/<slot>.svg`` (the same paths the API
        streams) — not the recorded ``path``, so a moved run dir still hashes
        correctly. Identical bytes hash identically, so an unchanged slot keeps
        a stable URL and only genuinely-changed assets bust their cache.
        """
        for slot_id, image in output.image_set.images.items():
            image.version = self._content_version(
                Path(str(run_ctx.image_path(slot_id)))
            )
        for slot_id, icon in output.icon_set.icons.items():
            icon.version = self._content_version(
                Path(str(run_ctx.icon_path(slot_id)))
            )

    @staticmethod
    def _content_version(path: Path) -> str:
        """A short sha256 of the file's bytes, or "" if it's absent."""
        if not path.is_file():
            return ""
        return hashlib.sha256(path.read_bytes()).hexdigest()[:12]

    @staticmethod
    def _upload_assets(
        run_ctx: RunContext, image_slots: list[str], icon_slots: list[str]
    ) -> None:
        """Opt-in on-generation mirror of the run's image/icon bytes to S3
        (gated by ``ASSET_UPLOAD_ENABLED``). Best-effort — a failure here never
        fails the run; ``make sync-assets`` is the always-available backstop."""
        if not settings.asset_upload_enabled:
            return
        try:
            n = upload_run_assets(
                run_ctx.app_id,
                run_ctx.run_id,
                image_slots,
                icon_slots,
                run_ctx.final_image_dir,
                run_ctx.icon_dir,
            )
            logger.info(
                "mirrored %d asset(s) to S3 for %s/%s",
                n,
                run_ctx.app_id,
                run_ctx.run_id,
            )
        except Exception:  # noqa: BLE001 - best-effort; sync-assets backstops
            logger.warning(
                "asset upload failed for %s/%s (continuing)",
                run_ctx.app_id,
                run_ctx.run_id,
                exc_info=True,
            )

    @staticmethod
    def _dump_model(model: BaseModel, path: Path) -> None:
        """Serialize one validated model to readable YAML at ``path``."""
        path.write_text(
            Writer._to_yaml(model),
            encoding="utf-8",
        )

    @staticmethod
    def _dump_model_atomic(model: BaseModel, path: Path) -> None:
        """The same dump, but the file is never observed half-written.

        ``_dump_model``'s plain ``write_text`` truncates and then fills, so a
        reader that opens the file in between gets a fragment. That is
        harmless when the only write happens after the run, with nobody
        watching — but a partial write happens WHILE the read API and a
        browser are polling this exact path, and a truncated ``output.yaml``
        served to the theme runtime is indistinguishable from a broken
        pipeline.

        Write-then-``os.replace`` makes the swap atomic on POSIX: a reader
        sees either the previous complete file or the new complete one. The
        temp file is created in the SAME directory because ``os.replace``
        is only atomic within a filesystem.
        """
        fd, tmp_name = tempfile.mkstemp(
            dir=path.parent, prefix=f".{path.name}.", suffix=".tmp"
        )
        tmp = Path(tmp_name)
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as handle:
                handle.write(Writer._to_yaml(model))
            os.replace(tmp, path)
        except BaseException:
            tmp.unlink(missing_ok=True)
            raise

    @staticmethod
    def _to_yaml(model: BaseModel) -> str:
        """One validated model as readable YAML — the single serialization
        shape, so the atomic and plain dumps cannot produce different files."""
        return yaml.safe_dump(
            model.model_dump(mode="json"),
            sort_keys=False,
            allow_unicode=True,
            default_flow_style=False,
        )
