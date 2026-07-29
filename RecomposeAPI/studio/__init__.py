"""studio — the local launch surface: start a run, watch it happen.

The WRITE half of `RecomposeAPI` (`make -C RecomposeAPI dev`), beside the
read-only output API in `RecomposeAPI/`. It writes a brand brief, launches a
pipeline run, and streams that run's progress to a browser.

It is a second app on purpose, not a few endpoints bolted onto `RecomposeAPI/`.
Both `Settings` classes instantiate at import time, and `RecomposeAPI/` never
imports `src.core.config` — which is exactly what lets the deployed App
Runner container boot with only `GOOGLE_FONTS_API_KEY` set. Importing the
pipeline (and therefore the four provider keys) into the read API would
destroy that property. The studio imports the pipeline freely because it
runs on a laptop that has the keys.
"""

from __future__ import annotations
