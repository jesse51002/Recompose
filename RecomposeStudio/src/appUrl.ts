// The app's TOP-LEVEL page routing.
//
// Three pages, walked in order. A deep link opens straight onto one, and from
// then on the address bar follows the state, which is what lets the demo be
// handed over as a URL rather than as a click path.
//
// There used to be a second URL module beside this one carrying `?theme=`, for
// a Library view that no longer exists. Theme selection is a popup over the
// canvas now, so a theme is a thing you pick while looking at a design rather
// than an address you navigate to.

/**
 * The three pages of the product, in the order a demo walks them.
 *
 * `onboard` is the default and is deliberately ABSENT from the URL — a bare
 * `/` is where the story starts, so the address a visitor shares stays clean
 * and an unknown `?view=` degrades to it rather than erroring.
 *
 * The old `browse` and `inspect` surfaces are gone. Picking a theme is a
 * popup over the canvas and inspecting artifacts is a pane of it, so neither
 * is a destination any more — a catalogue you had to leave the design to
 * visit was a shopping trip in the middle of a review.
 */
export type AppView = 'onboard' | 'generate' | 'fleet';

const VIEW_PARAM = 'view';

const VIEWS: readonly AppView[] = Object.freeze(['onboard', 'generate', 'fleet']);

function isAppView(value: string | null): value is AppView {
  return value !== null && (VIEWS as readonly string[]).includes(value);
}

/**
 * Reads `?view=…`, tolerating either URL strategy (hash or real query string)
 * exactly as `themeFromUrl` does, so a deep link works under both.
 */
export function viewFromUrl(): AppView {
  const fragment = window.location.hash.replace(/^#/, '');
  if (fragment !== '') {
    const queryStart = fragment.indexOf('?');
    if (queryStart >= 0) {
      const fromHash = new URLSearchParams(fragment.slice(queryStart)).get(VIEW_PARAM);
      if (isAppView(fromHash)) return fromHash;
    }
  }
  const fromQuery = new URLSearchParams(window.location.search).get(VIEW_PARAM);
  return isAppView(fromQuery) ? fromQuery : 'onboard';
}

/**
 * The deep-linked view, read ONCE at module load — the mirror of
 * `INITIAL_URL_THEME`, and for the same reason: `syncViewUrl` starts rewriting
 * the address bar as soon as the app mounts, so the arrival value has to be
 * captured before that happens.
 */
export const INITIAL_URL_VIEW: AppView = viewFromUrl();

/**
 * Mirrors the current view into the address bar.
 *
 * **Replace, not push** (the same call `syncThemeUrl` makes) so switching views
 * doesn't stack history entries, and **merge** so the `?theme=` the browser
 * owns survives a view change untouched.
 */
export function syncViewUrl(view: AppView): void {
  const params = new URLSearchParams(window.location.search);
  if (view === 'onboard') params.delete(VIEW_PARAM);
  else params.set(VIEW_PARAM, view);
  const query = params.toString();
  const url = query === '' ? window.location.pathname : `${window.location.pathname}?${query}`;
  window.history.replaceState(window.history.state, '', url);
}
