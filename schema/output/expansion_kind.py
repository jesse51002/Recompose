"""ExpansionKind — what a single pass over an existing run did.

The ``expansion_cost.yaml`` ledger is the unified audit log for every
post-run pass. Each entry's ``kind`` says which operation it was:

- ``EXPAND``     — filled in not-yet-done slots (``scripts/expand``).
- ``REGENERATE`` — re-made an existing slot under a free-text override
  (the ``regen`` / ``regen_image`` scripts).
- ``PREFILL``    — seeded a not-yet-done image slot from a checked-in file
  instead of generating it (``scripts/prefill``). Always costs
  nothing, and is the one kind whose slots were never sent to a model —
  which is exactly why it is distinguishable: a prefilled slot is a
  placeholder holding a slot's shape until someone regenerates it for
  real, and the ledger is the only place that fact survives.
- ``UNKNOWN``    — resilient fallback for a ledger row written before this
  field existed, or carrying a value this code no longer knows (per the
  repo's resilient-enum rule). Never written deliberately.
"""

from __future__ import annotations

import enum


class ExpansionKind(str, enum.Enum):
    """The operation a single ``ExpansionEntry`` records."""

    EXPAND = "expand"
    REGENERATE = "regenerate"
    PREFILL = "prefill"
    UNKNOWN = "unknown"

    @classmethod
    def coerce(cls, value: object) -> "ExpansionKind":
        """Map any value to a member, unknown/missing → ``UNKNOWN``.

        The ``firstWhere(..., orElse=UNKNOWN)`` equivalent: a ledger row
        from before this field (``None``) or carrying a since-removed value
        loads as ``UNKNOWN`` instead of raising.
        """
        if isinstance(value, cls):
            return value
        try:
            return cls(value)
        except ValueError:
            return cls.UNKNOWN
