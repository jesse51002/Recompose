// `MockNavProvider`'s stack, and one bug it shipped for a long time.
//
// THE BUG THIS FILE EXISTS FOR. `reset()` used to fall back to `initialRoute` —
// the route the stage OPENED on. A host that remembers where you were and hands
// it back so a reload lands there (../../../dev/DevHarness.tsx does exactly
// that) therefore moved the reset target as you navigated. Once you were on
// `booking`, `nav.reset()` resolved to `booking` and did nothing — and booking
// carries no bottom nav, so its Continue button was that screen's only exit.
// Every app in the package had a dead end there.
//
// It typechecked, linted and passed 622 tests, and only a live click found it.
// So the two routes are now separate (`initialRoute` seeds the stack,
// `rootRoute` is where `reset()` goes) and both halves are pinned here.
//
// Rendered with `react-dom/client` + React 19's own `act` rather than a testing
// library: this package has no `@testing-library/react` and adding a dependency
// to assert four state transitions would be a poor trade.

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import type { MockNav } from '../MockNav';
import { MockNavProvider, useMockNav } from '../MockNav';

// React only treats `act` as supported when this flag is set; without it every
// call still works but logs a warning per render, which buries real output.
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

let container: HTMLDivElement | null = null;

afterEach(() => {
  container?.remove();
  container = null;
});

/** Mount a provider and hand back a live handle on its nav value. */
function mountNav(props: { initialRoute: string; rootRoute?: string }): () => MockNav {
  let latest: MockNav | null = null;
  function Probe() {
    latest = useMockNav();
    return null;
  }
  container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <MockNavProvider initialRoute={props.initialRoute} rootRoute={props.rootRoute}>
        <Probe />
      </MockNavProvider>,
    );
  });
  return () => {
    if (latest === null) throw new Error('provider did not render');
    return latest;
  };
}

describe('reset', () => {
  it('goes to the ASSET ROOT, not the route the stage opened on', () => {
    // The exact shape of the shipped dead end: opened on `booking` (because the
    // host remembered it), whose only exit calls `reset()` with no argument.
    const nav = mountNav({ initialRoute: 'booking', rootRoute: 'home' });
    expect(nav().route).toBe('booking');
    act(() => {
      nav().reset();
    });
    expect(nav().route).toBe('home');
    expect(nav().canGoBack).toBe(false);
  });

  it('still honours an explicit route — what a tab switch passes', () => {
    const nav = mountNav({ initialRoute: 'home', rootRoute: 'home' });
    act(() => {
      nav().reset('store');
    });
    expect(nav().route).toBe('store');
    expect(nav().canGoBack).toBe(false);
  });

  it('falls back to initialRoute when no root is given', () => {
    // An embedder that only knows about one route keeps the old behaviour.
    const nav = mountNav({ initialRoute: 'home' });
    act(() => {
      nav().go('class');
      nav().reset();
    });
    expect(nav().route).toBe('home');
  });
});

describe('the stack', () => {
  it('opens on initialRoute, so a host can still deep-link', () => {
    const nav = mountNav({ initialRoute: 'store', rootRoute: 'home' });
    expect(nav().route).toBe('store');
    // Deep-linked, not pushed: there is nothing behind it.
    expect(nav().canGoBack).toBe(false);
  });

  it('pushes and pops — a class detail opened from the schedule', () => {
    const nav = mountNav({ initialRoute: 'home', rootRoute: 'home' });
    act(() => {
      nav().go('class');
    });
    expect(nav().route).toBe('class');
    expect(nav().canGoBack).toBe(true);
    act(() => {
      nav().back();
    });
    expect(nav().route).toBe('home');
  });

  it('replaces without leaving the old card behind — the celebration flow', () => {
    const nav = mountNav({ initialRoute: 'streak', rootRoute: 'streak' });
    act(() => {
      nav().replace('points');
    });
    expect(nav().route).toBe('points');
    // Backing into a dismissed card is a screen the app does not have.
    expect(nav().canGoBack).toBe(false);
  });

  it('is a no-op at the root, so any back affordance is safe to wire', () => {
    const nav = mountNav({ initialRoute: 'home', rootRoute: 'home' });
    act(() => {
      nav().back();
    });
    expect(nav().route).toBe('home');
  });
});
