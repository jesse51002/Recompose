"""What one orchestrator turn cost, in USD.

The pipeline has priced itself since it was written (`ThemeTree/shared/
services/cost.py`); the studio's own agent never did, so the interview — the
one part of a design a person watches happen — was the only spend nobody
could see. This is that gap closed, and it deliberately borrows the
pipeline's rule rather than inventing a second one:

**Price comes from litellm's own model pricing, never a hand-maintained
table.** A table in this repo would be wrong the week a model's price
changed, and wrong silently.

**CACHE TOKENS ARE PRICED SEPARATELY, and getting that wrong is the whole
reason this file is not two lines.** The orchestrator replays the entire
conversation on every turn, so by the eighth question almost all of its
input is a cache READ — billed at a fraction of fresh input. Counting those
at the full rate would overstate a long interview several times over, and
the number would be most wrong exactly when it mattered most.

A turn litellm cannot price counts as $0 and is logged at warning. A zero
must be visible and diagnosable, never silent — the same guard the pipeline
uses, for the same reason.
"""

from __future__ import annotations

import logging

import litellm

logger = logging.getLogger(__name__)


def turn_cost_usd(
    model: str,
    *,
    input_tokens: int,
    output_tokens: int,
    cache_read_tokens: int = 0,
    cache_write_tokens: int = 0,
) -> float:
    """USD for one agent turn, via litellm's pricing for ``model``.

    ``input_tokens`` is the FRESH input only. Pydantic AI reports cache reads
    and writes as their own counts, and litellm expects them the same way, so
    they are passed through rather than folded in — folding them would price
    a cache read at full rate.
    """
    try:
        prompt_cost, completion_cost = litellm.cost_per_token(
            model=model,
            prompt_tokens=input_tokens,
            completion_tokens=output_tokens,
            cache_read_input_tokens=cache_read_tokens,
            cache_creation_input_tokens=cache_write_tokens,
        )
    except Exception as exc:  # noqa: BLE001 — any failure ⇒ a visible $0
        logger.warning(
            "could not price a turn on %s (in=%d out=%d cache_r=%d "
            "cache_w=%d): %s",
            model,
            input_tokens,
            output_tokens,
            cache_read_tokens,
            cache_write_tokens,
            exc,
        )
        return 0.0
    return float(prompt_cost) + float(completion_cost)
