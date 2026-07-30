// The canvas: the mock, in a phone, repainting as the design lands.
//
// TWO THINGS MOVE HERE AND NEITHER IS THIS COMPONENT'S DOING, which is the
// whole point of how the pieces are arranged:
//
//  1. **The theme.** The pipeline writes `output.yaml` after every level, the
//     read API serves it, and `recompose-react`'s runtime repaints. So colour,
//     typography and copy arrive DURING the run rather than at the end of it.
//  2. **The layout.** Once a layout agent is writing to a generated folder,
//     that folder is source the Vite dev server already watches — so its edits
//     hot-reload into this pane while the reviewer is looking at it.
//
// This component picks WHICH app to mount and WHICH of its flows to show.
// Everything else is a consequence of decisions made elsewhere, and that is
// why it is short.

import { MockAssetStage, type MockApp, type MockAsset } from 'recompose-jsx-mockups';

import { cx } from '../widgets/cx';
import { PhoneFrame } from '../widgets/PhoneFrame';
import type { SessionView } from '../studio/sessionFold';

import styles from './GenerateCanvas.module.css';

interface GenerateCanvasProps {
  readonly view: SessionView;
  readonly app: MockApp;
  /** The flow being shown. */
  readonly assetId: string;
  readonly onPickAsset: (id: string) => void;
  /** The screen to open on — the last one that was being looked at. */
  readonly route: string | null;
  readonly onRouteChange: (route: string) => void;
}

export function GenerateCanvas({
  view,
  app,
  assetId,
  onPickAsset,
  route,
  onRouteChange,
}: GenerateCanvasProps) {
  // AN APP IS MORE THAN ONE FLOW, and only the first was ever drawn.
  // `combatden` ships the app itself and the post-class celebration, and every
  // fork carries both — so half of what the redesign changed was on a screen
  // this pane could not reach. `defineMockApp` rejects an empty asset list, so
  // index 0 always exists as the fallback.
  const asset: MockAsset =
    app.assets.find((candidate) => candidate.id === assetId) ?? app.assets[0]!;

  return (
    <div className={styles.canvas}>
      {/* Only when there is a choice to make. One flow and a one-button
          switcher would be chrome that never does anything. */}
      {app.assets.length > 1 && (
        <div className={styles.flows} role="group" aria-label="Flow">
          {app.assets.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={cx(candidate.id === asset.id && styles.flowOn)}
              aria-pressed={candidate.id === asset.id}
              title={candidate.description}
              onClick={() => onPickAsset(candidate.id)}
            >
              {candidate.label}
            </button>
          ))}
        </div>
      )}

      <PhoneFrame>
        <div className={styles.stage}>
          <MockAssetStage
            // Remounted when the app, the flow or the generation changes,
            // because each is a different tree. A THEME change deliberately
            // does not remount: that is the same screen repainted, and
            // bouncing the reviewer home every time a level lands would make
            // the run unwatchable.
            key={`${app.id}-${asset.id}-${view.designId ?? 'base'}`}
            asset={asset}
            // THE SCREEN SURVIVES A MOCKUP SWITCH. Comparing two designs means
            // flipping between them on the SAME screen, and a remount that
            // always opened at the root made that impossible — every switch
            // sent you home and you re-navigated to compare. The kit is built
            // for this: a route it does not declare falls back to the asset's
            // own root, so handing a fork's route to an unrelated app is safe
            // rather than broken.
            initialRoute={route ?? undefined}
            onRouteChange={onRouteChange}
            // PhoneFrame already scales its whole body to 390x844; scaling
            // here too would compound into a doubly-shrunk screen.
            fit="none"
          />
        </div>
      </PhoneFrame>

      <p className={styles.caption}>
        {view.designId !== null && view.designId === app.id
          ? `Layout generation ${app.id} — edits appear here as they are made.`
          : `${app.label} — it repaints as the theme is generated.`}
      </p>
    </div>
  );
}
