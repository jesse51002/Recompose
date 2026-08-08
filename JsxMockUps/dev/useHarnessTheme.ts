// The harness's theme switch.
//
// OPT-IN ON PURPOSE. The harness's whole value is that it runs with no backend
// and no theme run — `make dev` and you are looking at screens. Booting the
// runtime on load would make it need `make api` on :8001, and the common case
// (judge a layout you just edited) does not want that.
//
// So it stays unthemed until asked. Click Load, and it boots the runtime,
// fetches the catalogue and lets you switch. With the API down it says so and
// the harness carries on exactly as before — a theme switch is a bonus here,
// never a dependency.
//
// This is HOST state, which is why it lives in dev/ rather than in an app: the
// mock screens read the active theme through `recompose-react`'s resolvers and
// have no idea a picker exists.

import { useCallback, useState } from 'react';
import {
  activeDesignId,
  fetchStylesPage,
  initializeTheme,
  selectDesign,
} from 'recompose-react';

/** The app whose catalogue to browse. Matches the pipeline's `app.yaml` id. */
const APP_ID = 'combatden';
/** Loaded first, before any catalogue arrives, so there is always a theme on. */
const SEED_DESIGN_ID = 'ApexMMA';
/** One page is plenty for a picker; the catalogue is ~76 runs. */
const PAGE_SIZE = 100;

export interface HarnessStyle {
  readonly id: string;
  readonly name: string;
}

export type HarnessThemeStatus = 'off' | 'loading' | 'ready' | 'failed';

export interface HarnessTheme {
  readonly status: HarnessThemeStatus;
  readonly styles: readonly HarnessStyle[];
  readonly active: string | null;
  /** Why it failed, for the bar to show. Empty unless `status === 'failed'`. */
  readonly error: string;
  readonly load: () => void;
  readonly select: (id: string) => void;
}

export function useHarnessTheme(): HarnessTheme {
  const [status, setStatus] = useState<HarnessThemeStatus>('off');
  const [styles, setStyles] = useState<readonly HarnessStyle[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setStatus('loading');
    setError('');
    void (async () => {
      try {
        await initializeTheme({ appId: APP_ID, designId: SEED_DESIGN_ID });
        const page = await fetchStylesPage({ limit: PAGE_SIZE });
        setStyles(page.items.map((s) => ({ id: s.id, name: s.displayName })));
        setActive(activeDesignId());
        setStatus('ready');
      } catch (e: unknown) {
        // Named rather than swallowed: "nothing happened" after clicking Load
        // is the least debuggable outcome, and the cause is almost always the
        // same one — :8001 is not running.
        setError(e instanceof Error ? e.message : String(e));
        setStatus('failed');
      }
    })();
  }, []);

  const select = useCallback((id: string) => {
    void (async () => {
      // `selectDesign` never throws and leaves the current theme intact on
      // failure, so a bad pick degrades to "nothing changed" rather than to a
      // half-applied theme. Re-read the runtime instead of assuming it took.
      await selectDesign(id);
      setActive(activeDesignId());
    })();
  }, []);

  return { status, styles, active, error, load, select };
}
