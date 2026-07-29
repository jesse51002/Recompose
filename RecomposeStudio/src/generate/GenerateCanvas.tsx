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

import { COMBATDEN_APP, MockAssetStage, type MockAsset } from 'recompose-jsx-mockups';

import { PhoneFrame } from '../widgets/PhoneFrame';
import type { SessionView } from '../studio/sessionFold';

import styles from './GenerateCanvas.module.css';

export function GenerateCanvas({ view }: { view: SessionView }) {
  // The base app until a generation exists. `designId` arrives on the layout
  // task's own record, so the switch happens exactly when there is something
  // else to show — never speculatively.
  const asset: MockAsset = COMBATDEN_APP.assets[0]!;

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
            key={view.designId ?? 'base'}
            asset={asset}
            // PhoneFrame already scales its whole body to 390x844; scaling
            // here too would compound into a doubly-shrunk screen.
            fit="none"
          />
        </div>
      </PhoneFrame>

      <p className={styles.caption}>
        {view.designId === null
          ? 'The base layout. It repaints as the theme is generated.'
          : `Layout generation ${view.designId} — edits appear here as they are made.`}
      </p>
    </div>
  );
}
