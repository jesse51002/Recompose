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
// This component only picks WHICH app to mount. Everything else is a
// consequence of decisions made elsewhere, and that is why it is short.

import { MockAssetStage, type MockApp, type MockAsset } from 'recompose-jsx-mockups';

import { PhoneFrame } from '../widgets/PhoneFrame';
import type { SessionView } from '../studio/sessionFold';

import styles from './GenerateCanvas.module.css';

export function GenerateCanvas({ view, app }: { view: SessionView; app: MockApp }) {
  // Whichever mockup the bar has selected. `defineMockApp` rejects an empty
  // asset list, so index 0 always exists.
  const asset: MockAsset = app.assets[0]!;

  return (
    <div className={styles.canvas}>
      <PhoneFrame>
        <div className={styles.stage}>
          <MockAssetStage
            // Remounted when the generation changes, so a new design opens at
            // its own starting route rather than wherever the previous one was
            // left. A THEME change deliberately does not remount: that is the
            // same screen repainted, and bouncing the reviewer to home every
            // time a level lands would make the run unwatchable.
            key={`${app.id}-${view.designId ?? 'base'}`}
            asset={asset}
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
