// What ONE phone in a comparison is showing, read off the URL.
//
// The stage is a whole document — see `generate/CompareView.tsx` — so its
// inputs cannot be props. They arrive as query parameters and nothing else,
// which also means a stage URL can be opened on its own to debug one side.

/** One side of a comparison, fully specified. */
export interface StageParams {
  /** The generated design to boot the runtime on. Null renders unthemed. */
  readonly theme: string | null;
  /** The mock app (the LAYOUT) to render. */
  readonly app: string | null;
  /** Which of that app's flows. */
  readonly asset: string | null;
  /** The screen to open on, so both sides can be pointed at the same one. */
  readonly route: string | null;
}

function param(search: URLSearchParams, key: string): string | null {
  const value = search.get(key);
  return value === null || value === '' ? null : value;
}

/**
 * Reads the stage's parameters, tolerating either URL strategy the way
 * `viewFromUrl` does — a hash fragment or a real query string.
 */
export function stageParamsFromUrl(): StageParams {
  const fragment = window.location.hash.replace(/^#/, '');
  const search = new URLSearchParams(
    fragment.includes('?') ? fragment.slice(fragment.indexOf('?')) : window.location.search,
  );
  return {
    theme: param(search, 'theme'),
    app: param(search, 'app'),
    asset: param(search, 'asset'),
    route: param(search, 'route'),
  };
}

/**
 * The message a stage and its parent pass in both directions.
 *
 * ONE shape for both directions on purpose: a stage reports the screen it moved
 * to, and the parent hands that same screen to the other stage. Two message
 * types would let the two halves mean subtly different things by the screen
 * they name, which is the failure this whole page exists to avoid.
 */
export const ROUTE_MESSAGE = 'recompose:route';

export interface RouteMessage {
  readonly type: typeof ROUTE_MESSAGE;
  readonly route: string;
}

export function isRouteMessage(data: unknown): data is RouteMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as { type?: unknown }).type === ROUTE_MESSAGE &&
    typeof (data as { route?: unknown }).route === 'string'
  );
}

/** The URL one side of a comparison loads. Absolute, same origin. */
export function stageUrl(params: StageParams): string {
  const search = new URLSearchParams({ view: 'stage' });
  if (params.theme !== null) search.set('theme', params.theme);
  if (params.app !== null) search.set('app', params.app);
  if (params.asset !== null) search.set('asset', params.asset);
  if (params.route !== null) search.set('route', params.route);
  return `${window.location.origin}${window.location.pathname}?${search.toString()}`;
}
