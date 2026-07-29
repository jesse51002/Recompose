// Where the STUDIO half of the API lives.
//
// Since 2026-07-29 that is the SAME service as the read API: launching a run
// is an API request like any other, so `RecomposeAPI` serves both halves on one
// port. This module survives the merge rather than being deleted into
// `src/lib/config.ts` because the two are still different AUDIENCES — the read
// half is what a shipped client consumes, this half is a local authoring tool —
// and a separate override lets you point the studio at a different host without
// moving the whole runtime with it.
//
// It mirrors that module's LADDER rather than importing it: explicit override →
// Vite env var → default. Same three steps, same empty-string rule, same
// trailing-slash normalisation.

/**
 * `RecomposeAPI/Makefile`'s `dev` target:
 * `uvicorn RecomposeAPI.main:app --host 0.0.0.0 --port 8001`.
 *
 * 8001, not 8002 — the studio no longer has a port of its own. It bound
 * loopback while it was a separate app; the merged service binds 0.0.0.0 so
 * the Flutter emulator can reach it, which also means POST /runs is reachable
 * from the local network until there is auth.
 */
const DEFAULT_STUDIO_BASE_URL = 'http://127.0.0.1:8001';

/** Trailing slashes make every joined path double-slashed. Strip them once. */
function normalise(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * Reads a Vite env var when one is present, tolerating every environment where
 * `import.meta.env` does not exist (a test runner, SSR).
 */
function viteEnv(key: string): string | undefined {
  const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
  const value = env?.[key];
  return value !== undefined && value !== '' ? value : undefined;
}

/**
 * An EMPTY override means "not configured", not "use an empty base URL" — `??`
 * alone would pass `''` through and turn every request into a relative path
 * against whatever origin is serving the page.
 */
function present(value: string | undefined): string | undefined {
  return value !== undefined && value !== '' ? value : undefined;
}

/** The studio's base URL. Local: `make -C RecomposeAPI dev`. */
export function resolveStudioBaseUrl(override?: string): string {
  return normalise(
    present(override) ?? viteEnv('VITE_STUDIO_BASE_URL') ?? DEFAULT_STUDIO_BASE_URL,
  );
}

/** The default, exported so an error message can name the port it expected. */
export const DEFAULT_STUDIO_URL = DEFAULT_STUDIO_BASE_URL;
