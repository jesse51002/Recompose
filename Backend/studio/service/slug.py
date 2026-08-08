"""slugify — a human name to a filename stem, in one place.

Extracted when the layout brief needed the same rule the brand brief already
had. Two copies of "how a name becomes a path segment" is exactly the kind of
duplication that drifts silently: one gets a fix for an apostrophe and the other
does not, and the two halves of one design end up under names that do not match.
"""

from __future__ import annotations

import re

# Keep letters and digits; everything else becomes a single hyphen, trimmed at
# both ends. "Iron & Ash MMA" -> "iron-ash-mma".
_NON_SLUG_CHARS = re.compile(r"[^a-z0-9]+")


def slugify(name: str) -> str:
    """A filename stem from a human name.

    Raises ``ValueError`` when the name has nothing sluggable in it (all
    punctuation) — better a clear refusal than a file called ``.yaml`` or a
    directory called ``gen-``.
    """
    slug = _NON_SLUG_CHARS.sub("-", name.lower()).strip("-")
    if not slug:
        raise ValueError(
            f"cannot derive a filename from the name {name!r}; "
            "pass an explicit slug"
        )
    return slug
