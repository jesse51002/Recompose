// The navigation an asset runs on: an in-memory route stack.
//
// APP-AGNOSTIC. Nothing here knows a screen name, a tab, or an app. Routes are
// plain string ids the asset declares; this module only remembers which one is
// showing and how you got there.
//
// WHY A STACK AND NOT A CURRENT-ROUTE STRING. The mock has to answer "back",
// and back is only well-defined against history: a class detail reached from
// the schedule returns to the schedule, and the booking confirmation reached
// from that detail returns past it to where the member started. A single
// current-route value cannot express either without the caller re-deriving the
// history it just threw away. It ports `Navigator`'s push/pop, minus everything
// a preview has no use for (named arguments, route settings, transitions).
//
// WHY NOT A ROUTER LIBRARY. The island rule (../../CLAUDE.md) allows
// `recompose-react` and this package, and nothing else. A router would also put
// the mock's navigation in the URL, which is wrong twice over: the studio nests
// this inside a page that owns its own URL, and two assets on one page would
// fight over it.

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/** What a screen can do to the stack. */
export interface MockNav {
  /** The route showing now — the top of the stack. */
  readonly route: string;
  /** Push a route on top. The current one stays underneath, reachable by `back`. */
  readonly go: (route: string) => void;
  /**
   * Replace the top of the stack instead of pushing onto it.
   *
   * The difference is what `back` does afterwards, which is why both exist: a
   * celebration card advancing to the next card must NOT leave the previous one
   * behind (the flow moves forward, and backing into a card already dismissed
   * would be a screen the app does not have), whereas opening a class detail
   * must.
   */
  readonly replace: (route: string) => void;
  /** Pop back one. A no-op at the root, which is what makes it safe to wire to any back affordance. */
  readonly back: () => void;
  /**
   * Back to the ASSET'S ROOT, clearing history — what a tab switch and a
   * finished flow both do.
   *
   * "Root" means the route the asset DECLARES as its own (`rootRoute`), never
   * the route the stage happened to open on. Those two are usually the same and
   * were conflated for a while, which made this a no-op on exactly the screens
   * that need it most — see `MockNavProviderProps.rootRoute`.
   */
  readonly reset: (route?: string) => void;
  /** Whether there is anything to go back to; a back button can hide itself on the root. */
  readonly canGoBack: boolean;
}

const MockNavContext = createContext<MockNav | null>(null);

export interface MockNavProviderProps {
  /** The route to OPEN on. A host may deep-link this to anything the asset declares. */
  initialRoute: string;
  /**
   * The asset's OWN root — where `reset()` goes when given no argument.
   *
   * SEPARATE FROM `initialRoute`, and the separation is a bug fix rather than a
   * refinement. A host that remembers where you were and hands it back as
   * `initialRoute` (which ../../dev/DevHarness.tsx does, so a reload lands where
   * you left off) used to move the reset target with it. The consequence was
   * silent and severe: once you were on `booking`, `nav.reset()` resolved to
   * `booking`, so the Continue button — that screen's ONLY exit, since it
   * carries no bottom nav — did nothing at all. Every app in the package had a
   * dead end there, and it typechecked, linted and passed the suite.
   *
   * Defaults to `initialRoute` so an embedder that only knows about one route
   * keeps the old behaviour.
   */
  rootRoute?: string | undefined;
  children: ReactNode;
}

export function MockNavProvider({ initialRoute, rootRoute, children }: MockNavProviderProps) {
  const [stack, setStack] = useState<readonly string[]>([initialRoute]);
  const root = rootRoute ?? initialRoute;

  const go = useCallback((route: string) => {
    setStack((current) => [...current, route]);
  }, []);

  const replace = useCallback((route: string) => {
    setStack((current) => [...current.slice(0, -1), route]);
  }, []);

  const back = useCallback(() => {
    // Guarded rather than asserted: every back affordance in the app can call
    // this unconditionally, and the root simply has nowhere to go.
    setStack((current) => (current.length > 1 ? current.slice(0, -1) : current));
  }, []);

  const reset = useCallback(
    (route?: string) => {
      setStack([route ?? root]);
    },
    [root],
  );

  // `stack` is the only state, so the value changes exactly when the route does.
  const value = useMemo<MockNav>(
    () => ({
      route: stack[stack.length - 1] ?? initialRoute,
      go,
      replace,
      back,
      reset,
      canGoBack: stack.length > 1,
    }),
    [stack, initialRoute, go, replace, back, reset],
  );

  return <MockNavContext.Provider value={value}>{children}</MockNavContext.Provider>;
}

/**
 * The nav for the asset this screen is inside.
 *
 * Throws outside a provider rather than returning a no-op. A dead nav is the
 * failure that looks exactly like a design problem — buttons that do nothing —
 * and it would be found by clicking rather than by rendering, which is the
 * worst time to find it.
 */
export function useMockNav(): MockNav {
  const nav = useContext(MockNavContext);
  if (nav === null) {
    throw new Error(
      'useMockNav must be used inside a <MockNavProvider>. A screen is being ' +
        'rendered outside the asset that owns its routes.',
    );
  }
  return nav;
}
