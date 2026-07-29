"""ImageNode — one image graph node: resolve a single image slot.

One instance per image slot (the registry builds the list; the executor
schedules them). Atomic per image: write the prompt, classify its
complexity (which picks the generator's quality tier), generate, then
hand off to the ``BackgroundService`` for removal/crop. ``color`` is an
automatic dependency; declared ``depends_on`` images arrive as resolved
inputs and are always used as *reference* (their look is folded into the
prompt text for visual continuity — never fed in as an input image).

A slot declaring ``scene: true`` inverts two of those steps: it is a
photograph rather than a cutout asset, so it takes the scene prompt rule,
pins the cheapest quality tier, and never reaches the background pass.
See ``ImageSlot.scene`` and ``_deliver`` below.
"""

from __future__ import annotations

import hashlib
import logging
import shutil
from pathlib import Path
from string import Template
from typing import Any

from schema import ColorMode, Complexity, ImageOutput, ImageSlot
from ThemeTree.core.errors import ProviderError
from ThemeTree.core.run_context import RunContext
from ThemeTree.modules.base import DependencyKind, Node
from ThemeTree.modules.images.background_service import BackgroundService
from ThemeTree.modules.images.complexity_service import ComplexityClassifier
from ThemeTree.modules.images.image_edit_service import ImageEditService
from ThemeTree.modules.images.image_models import ImagePrompt
from ThemeTree.shared.interfaces.image_generator import ImageGenerator
from ThemeTree.shared.interfaces.llm_client import LLMClient

logger = logging.getLogger(__name__)


def _content_version(path: Path) -> str:
    """Short sha256 of the just-written image bytes — the API's cache-busting
    ``?v=`` token, set on the ``ImageOutput`` at creation (matches the Writer's
    later re-stamp). The file is always present here (it was just written)."""
    return hashlib.sha256(path.read_bytes()).hexdigest()[:12]

IMAGE_PROMPT_PATH = Path(__file__).parent / "prompts" / "image_prompt_rule.md"
# The scene counterpart, used for slots declaring ``scene: true``. Same
# substitution vocabulary as the rule above minus ``theme_background``,
# which a photograph has no use for (``safe_substitute`` ignores the
# unused key, so both templates are fed the identical mapping).
SCENE_PROMPT_PATH = Path(__file__).parent / "prompts" / "scene_prompt_rule.md"
# Injected into the main prompt ONLY when the slot has image
# dependencies: the visual-continuity guidance plus the per-dependency
# listing. Kept separate so the common no-dependency prompt carries no
# dependency wording at all. Dependencies are always reference.
RELATED_ASSETS_PATH = Path(__file__).parent / "prompts" / "related_assets.md"
# Injected into the main prompt ONLY when a reopen-time ``--spec`` is present:
# the user's change request wrapped in a high-priority "obey this exactly"
# frame so it outranks the subject's example imagery (the create-new path used
# to drop the spec entirely, so a "make it a flame" steer was ignored). Empty —
# no injection — on a fresh run or a re-roll carrying no spec. Kept as its own
# ``.md`` per the no-inline-prompt rule; code holds only the path.
USER_OVERRIDE_PATH = Path(__file__).parent / "prompts" / "user_override.md"
RAW_SUFFIX = ".raw.png"
# A retried generation reuses the canonical ``{slot}.raw.png`` dest; before
# the next attempt overwrites a file a prior attempt already wrote, that
# file is moved aside under this name so the full attempt lineage survives
# on disk for inspection. ``{n}`` is the 1-based number of the preserved
# attempt. The happy path (no retry) never produces one of these.
RAW_ATTEMPT_TMPL = "{stem}.attempt{n}.png"
# The asset composites onto the app's own base surface, so the generated
# background is fixed to that surface by theme: a matching flat field makes
# the cutout trivial. Named literally — image models render these reliably.
THEME_BG_DARK = "pure black (the app is in dark mode)"
THEME_BG_LIGHT = "pure white (the app is in light mode)"

# Per-call constants, not config — this flow is now too specific for
# global config. Override in dev (bake-off scripts under `scripts/`);
# production uses these. ``IMAGE_GEN_MODEL`` is provider-prefixed and the
# generic litellm image generator routes on it (swap providers here).
IMAGE_PROMPT_MODEL = "anthropic/claude-opus-4-8"
IMAGE_GEN_MODEL = "openai/gpt-image-2"
# Bounded re-calls: image-provider moderation/infra is non-deterministic,
# so a benign prompt can blip on one call and pass the next. There is no
# usable fallback for a missing image, so exhaustion fails the run.
IMAGE_GEN_MAX_ATTEMPTS = 3
# Complexity tier → generator quality. ``high`` is reserved/unused for now
# (overkill); flip it to "high" here to enable it — no schema change.
QUALITY_BY_COMPLEXITY: dict[Complexity, str] = {
    Complexity.LOW: "low",
    Complexity.MEDIUM: "medium",
    Complexity.HIGH: "medium",
}
# A ``scene`` slot's quality, pinned regardless of the classified tier.
# A photograph of a real place is table stakes for an image model in a way
# a brand's rank insignia is not: there is no taste to get right and no
# cutout edge to keep clean, so the cheapest tier is genuinely enough and
# the extra spend buys nothing visible. The classifier still RUNS for a
# scene slot and its verdict is still recorded on the ``ImageOutput`` —
# only the quality it would have picked is overridden, so the tier stays
# visible and this stops being a pin the day that changes.
SCENE_QUALITY = "low"


class ImageNode(Node):
    """One image node, atomic per image: ``run() -> ImageOutput``.

    ``slot`` and ``deps`` are construction state; ``color`` (the palette)
    and any ``depends_on`` images arrive via ``inputs`` set by the
    executor just before ``run()``.
    """

    def __init__(
        self,
        run_ctx: RunContext,
        *,
        slot: ImageSlot,
        deps: frozenset[str],
        llm: LLMClient,
        image_gen: ImageGenerator,
        classifier: ComplexityClassifier,
        background: BackgroundService,
        seed: dict[str, ImageOutput] | None = None,
    ) -> None:
        super().__init__(
            run_ctx,
            key=slot.id,
            deps=deps,
            declared_slots={slot.id},
            seed=seed,
        )
        self._slot = slot
        self._llm = llm
        self._image_gen = image_gen
        self._classifier = classifier
        self._background = background
        self._edit = ImageEditService(llm)

    async def run(self, *, prompt_model: str = IMAGE_PROMPT_MODEL) -> ImageOutput:
        """Resolve this slot end to end: deps → prompt → classify →
        generate → deliver (cutout + crop, or straight through for a scene).

        ``prompt_model`` drives the prompt-generation call (override in dev
        to compare models). Complexity classification picks the generator's
        quality tier — except on a ``scene`` slot, which pins
        ``SCENE_QUALITY``. Declared image dependencies are folded into the
        prompt as style reference only; delivery is ``_deliver``, which
        runs the background pass for a cutout slot and skips it for a
        scene.

        A per-slot node: a seeded, un-overridden image (nothing dirty) is
        returned verbatim with no generation — so reopening a run to change
        one thing never re-bills every untouched image."""
        dirty = self.dirty()
        self.regenerated = dirty
        if not dirty:
            return self.seed[self._slot.id]  # type: ignore[return-value]
        palette = self.inputs[DependencyKind.COLOR.value]
        # Image-to-image: when the steering carries an ``image_to_image`` and
        # a current image exists, edit it (change only what was asked) rather
        # than generate a fresh scene.
        if self.overwrite_specs.image_to_image is not None:
            source = Path(str(self._run_ctx.image_path(self._slot.id)))
            if source.is_file():
                return await self._edit_current(palette, source)
        image_deps: dict[str, ImageOutput] = {
            dep_id: self.inputs[dep_id]  # type: ignore[misc]
            for dep_id in self._slot.depends_on
        }
        prompt = await self._build_prompt(palette, image_deps, model=prompt_model)
        complexity = await self._classifier.classify(prompt)
        quality = SCENE_QUALITY if self._slot.scene else QUALITY_BY_COMPLEXITY[complexity]
        raw = await self._generate(prompt, quality)
        final = Path(str(self._run_ctx.image_path(self._slot.id)))

        await self._deliver(raw, final)
        return ImageOutput(
            path=self._run_ctx.image_path(self._slot.id),
            version=_content_version(final),
            prompt=prompt,
            complexity=complexity,
            overwrite_specs=self.overwrite_specs,
        )

    async def _deliver(self, raw: Path, final: Path) -> None:
        """Put the generated bytes at ``final``.

        A cutout slot goes through ``BackgroundService`` — remove the flat
        backdrop, then grid-trim crop — because the asset has to composite
        onto whatever surface the app paints it on.

        A ``scene`` slot skips that entirely and the raw image IS the
        final one. Running it would be actively destructive: the pass
        exists to lift a subject off a known flat field, and a photograph
        of a room has no flat field and no single subject, so it would cut
        a person out of the gym and crop away the gym. The bytes are
        COPIED rather than moved so the ``.raw.png`` stays on disk for
        inspection, exactly as it does on the cutout path.
        """
        if self._slot.scene:
            final.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(raw, final)
            return
        await self._background.run(raw, final)

    async def _edit_current(self, palette: Any, source: Path) -> ImageOutput:
        """Image-to-image: author the edit instruction (the change only) and
        edit ``source`` in place, then deliver it the same way a fresh
        generation is (so a scene edit keeps its background too). The
        prompt recorded is the edit instruction; complexity is ``None`` (no
        classify on an edit)."""
        instruction = await self._edit.author(
            self._run_ctx,
            slot=self._slot,
            palette=palette,
        )
        raw = self._run_ctx.image_dir / f"{self._slot.id}.edit{RAW_SUFFIX}"
        await self._image_gen.edit(instruction, source, raw, model=IMAGE_GEN_MODEL)
        final = Path(str(self._run_ctx.image_path(self._slot.id)))
        await self._deliver(raw, final)
        return ImageOutput(
            path=self._run_ctx.image_path(self._slot.id),
            version=_content_version(final),
            prompt=instruction,
            complexity=None,
            overwrite_specs=self.overwrite_specs,
        )

    async def _build_prompt(
        self,
        palette: Any,
        image_deps: dict[str, ImageOutput],
        *,
        model: str = IMAGE_PROMPT_MODEL,
    ) -> str:
        """Brief + slot + palette (+ related-asset block) → ``prompt``.

        The related-assets block — visual-continuity guidance plus the
        per-dependency listing — is a separate prompt fragment injected
        ONLY when the slot has image dependencies; otherwise nothing about
        dependencies reaches the model. Dependencies are always used as
        *reference*: their look is folded into the prompt text, never fed
        in as an input image.

        A ``scene`` slot swaps the rule for its photographic counterpart;
        everything else about the call — the substitutions, the structured
        response, the related-assets and override fragments — is identical,
        because only the CONTRACT for what the picture is differs."""
        rule = SCENE_PROMPT_PATH if self._slot.scene else IMAGE_PROMPT_PATH
        template = rule.read_text(encoding="utf-8")
        design = self._run_ctx.cust.design_direction
        dark_mode = self._run_ctx.cust.colors_direction.mode is ColorMode.DARK
        palette_summary = "\n".join(
            # OklchColor.__str__ gives the canonical CSS string form
            # (`oklch(70.5% 0.19 41)`) — easier for the image-gen model to
            # reason about than the wire JSON `{l, c, h}`.
            f"  {slot_id}: {color.color.oklch!s} — "
            f"{color.display_name}: {color.description}"
            for slot_id, color in palette.colors.items()
        )
        if image_deps:
            listing = "\n".join(
                f"  {dep_id}: {out.prompt}" for dep_id, out in image_deps.items()
            )
            fragment = RELATED_ASSETS_PATH.read_text(encoding="utf-8")
            related_assets = Template(fragment).safe_substitute(dependencies=listing)
        else:
            related_assets = ""
        # The reopen-time change request: dropped here historically, now folded
        # in as a high-priority override so create-new actually obeys --spec.
        spec = self._run_ctx.overwrite_specs.specs
        override = (
            Template(USER_OVERRIDE_PATH.read_text(encoding="utf-8")).safe_substitute(
                spec=spec
            )
            if spec
            else ""
        )
        prompt = Template(template).safe_substitute(
            name=design.name,
            short=design.short_desc,
            long=design.long_desc,
            palette=palette_summary,
            theme_background=(THEME_BG_DARK if dark_mode else THEME_BG_LIGHT),
            subject=self._slot.description,
            related_assets=related_assets,
            override=override,
        )
        result = await self._llm.complete_structured(
            [{"role": "user", "content": prompt}],
            schema=ImagePrompt,
            model=model,
        )
        return result.prompt

    async def _generate(self, prompt: str, quality: str) -> Path:
        """Generate the raw image (subject on a plain solid background).

        Text-to-image only — declared dependencies are reference (folded
        into ``prompt``), never fed to the generator.

        The image provider's moderation/infra is non-deterministic — a
        benign prompt can hit a false-positive block, a transient failure,
        or a timeout on one call and succeed on the next — so generation is
        retried a bounded number of times. Unlike background removal there
        is no usable fallback for a missing image, so exhaustion re-raises
        the last provider error and fails the run.
        """
        dest = self._run_ctx.image_dir / f"{self._slot.id}{RAW_SUFFIX}"
        last_error: ProviderError | None = None
        for attempt in range(IMAGE_GEN_MAX_ATTEMPTS):
            # Never clobber a file an earlier attempt actually wrote: move
            # it aside under its attempt number before this one overwrites
            # the canonical dest. (A hard-failed attempt raises before
            # writing, so usually there is nothing here to preserve.)
            if attempt and dest.exists():
                dest.rename(
                    dest.with_name(RAW_ATTEMPT_TMPL.format(stem=dest.stem, n=attempt))
                )
            try:
                await self._image_gen.generate(
                    prompt, dest, model=IMAGE_GEN_MODEL, quality=quality
                )
                return dest
            except ProviderError as exc:
                last_error = exc
                logger.warning(
                    "image generation failed on attempt %d/%d for %s: %s",
                    attempt + 1,
                    IMAGE_GEN_MAX_ATTEMPTS,
                    self._slot.id,
                    exc,
                )
        raise last_error or ProviderError(
            f"image generation produced nothing for {self._slot.id}"
        )
