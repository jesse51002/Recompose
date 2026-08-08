// The stage: renders an asset at its authored size and scales it uniformly to
// fit whatever box it is given.
//
// This is the display half of the package's public surface — what a host
// (../../../Studio) mounts. It is app-agnostic and knows only the
// `MockAsset` contract.
//
// WHY THE FIT IS COMPUTED IN JS, not `aspect-ratio` + `max-height`. CSS
// re-derives the other axis from a ratio only when the size it derives FROM is
// the definite one. A box with `width: 100%` and `aspect-ratio` inside a SHORT
// container computes a huge height, and `max-height: 100%` merely CLIPS it —
// the width does not shrink to keep the ratio, so the asset spills out of a
// short pane. `min(w / W, h / H)` is `BoxFit.contain` exactly, and
// `transform: scale()` is the one CSS primitive that scales laid-out pixels
// rather than re-laying them out. That distinction is the whole point: a
// reflow at a different size would mean the arrangement being reviewed is not
// the arrangement that ships.
//
// The same maths, and the same reasoning, as
// ../../../Studio/src/widgets/PhoneFrame.tsx — which is why `fit`
// exists (below): a host that already scales must not scale twice.

import type { CSSProperties } from 'react';
import { useEffect } from 'react';

import type { MockAsset } from './asset';
import { MockNavProvider, useMockNav } from './MockNav';
import { useElementSize } from './useElementSize';

/** How the asset is sized inside its container. */
export type MockAssetFit =
  /** Scale uniformly to fit, centred. The default. */
  | 'contain'
  /**
   * Render at authored size and do not scale.
   *
   * For a host that already applies its own contain-fit — the studio's phone
   * frame scales its whole body, bezel included — where scaling here too would
   * compound into a doubly-shrunk screen.
   */
  | 'none';

export interface MockAssetStageProps {
  asset: MockAsset;
  fit?: MockAssetFit | undefined;
  /** Extra style for the outer measured box (positioning, background). */
  style?: CSSProperties | undefined;
  className?: string | undefined;
  /**
   * Open on this route instead of the asset's own initial one.
   *
   * For a host restoring where someone was — a reload, or switching between an
   * app and a redesign fork of it, where landing back on the root would mean
   * re-navigating to the screen you were comparing.
   *
   * **Silently ignored when the asset does not declare it**, which is what
   * makes it safe to hand the same route to two different apps: a fork carries
   * the base's route ids, an unrelated app does not, and the second case falls
   * back to that asset's own root rather than throwing.
   */
  initialRoute?: string | undefined;
  /** Called whenever the showing route changes, so a host can remember it. */
  onRouteChange?: ((route: string) => void) | undefined;
}

/**
 * Mount one asset. Owns its own navigation, so two stages on a page are
 * independent and neither can move the other.
 */
export function MockAssetStage({
  asset,
  fit = 'contain',
  style,
  className,
  initialRoute,
  onRouteChange,
}: MockAssetStageProps) {
  const [measureRef, { width, height }] = useElementSize<HTMLDivElement>();

  // Zero on the first frame, before the box is measured. Scaling to 0 would
  // flash an invisible asset, so hold at 1 and let the first real measurement
  // correct it — one frame at the wrong size beats one frame at no size.
  const scale =
    fit === 'none' || width === 0 || height === 0
      ? 1
      : Math.min(width / asset.width, height / asset.height);

  const screenStyle: CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: `${String(asset.width)}px`,
    height: `${String(asset.height)}px`,
    transform: `translate(-50%, -50%) scale(${String(scale)})`,
    overflow: 'hidden',
  };

  return (
    <div
      ref={measureRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <div style={screenStyle}>
        {/* A route the asset does not declare falls back to its own root —
            see `initialRoute` above for why that is silent rather than an
            error. */}
        {/* `rootRoute` is the asset's OWN root and is deliberately NOT the
            route we opened on: a host that deep-links or remembers a route must
            not move where `reset()` lands, or a finished flow resets to itself.
            See `MockNavProviderProps.rootRoute`. */}
        <MockNavProvider
          initialRoute={
            initialRoute !== undefined && initialRoute in asset.routes
              ? initialRoute
              : asset.initialRoute
          }
          rootRoute={asset.initialRoute}
        >
          <MockAssetBody asset={asset} onRouteChange={onRouteChange} />
        </MockNavProvider>
      </div>
    </div>
  );
}

/** The route, wrapped in the asset's provider when it declares one. */
function MockAssetBody({
  asset,
  onRouteChange,
}: {
  asset: MockAsset;
  onRouteChange?: ((route: string) => void) | undefined;
}) {
  const Provider = asset.provider;
  const route = (
    <>
      <RouteReporter onRouteChange={onRouteChange} />
      <MockAssetRoute asset={asset} />
    </>
  );
  return Provider === undefined ? route : <Provider>{route}</Provider>;
}

/**
 * Reports the showing route up to the host. Renders nothing.
 *
 * A separate component so the notification does not re-render the screen: it
 * reads the nav and runs an effect, and the actual route lives one sibling
 * over. It sits INSIDE the provider because that is the only place the route
 * is readable, and it is deliberately not merged into `MockAssetRoute` — a
 * screen should not re-render because a host wanted to know where it is.
 */
function RouteReporter({
  onRouteChange,
}: {
  onRouteChange?: ((route: string) => void) | undefined;
}) {
  const { route } = useMockNav();
  useEffect(() => {
    onRouteChange?.(route);
  }, [route, onRouteChange]);
  return null;
}

/**
 * The screen the asset's nav currently points at.
 *
 * Split from the stage because it must read the nav, and the nav is provided by
 * the stage — a component cannot consume a context it renders itself.
 */
function MockAssetRoute({ asset }: { asset: MockAsset }) {
  const { route } = useMockNav();
  const Screen = asset.routes[route];
  if (Screen === undefined) {
    // Fail visible. A blank phone reads as a broken design; this says which
    // route is missing and from which asset.
    throw new Error(
      `MockAsset "${asset.id}": no screen registered for route "${route}".`,
    );
  }
  return <Screen />;
}
