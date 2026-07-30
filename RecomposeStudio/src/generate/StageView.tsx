// ONE PHONE, AND NOTHING ELSE. The document a comparison loads per side.
//
// It has no chrome, no nav and no state of its own: everything it shows comes
// off the URL (`../stageUrl.ts`), because it is loaded in an iframe rather than
// mounted as a component. `CompareView` explains why that has to be so.
//
// The consequence worth stating: this file must stay dumb. The moment it grows
// a control, the two sides of a comparison can drift apart in a way the parent
// cannot see, and a comparison whose halves disagree about what they are
// showing is worse than no comparison.

import { ThemeProvider } from 'recompose-react';
import {
  MOCK_APPS,
  MockAssetStage,
  findMockApp,
} from 'recompose-jsx-mockups';

import { APP_ID } from '../config';
import { PhoneFrame } from '../widgets/PhoneFrame';
import { stageParamsFromUrl } from '../stageUrl';

import styles from './StageView.module.css';

const PARAMS = stageParamsFromUrl();

export function StageView() {
  // Falls back rather than failing: a stage pointed at an app that no longer
  // exists should draw SOMETHING, because the alternative is one empty half of
  // a comparison and no clue why.
  const app = findMockApp(PARAMS.app) ?? MOCK_APPS[0]!;
  const asset =
    app.assets.find((candidate) => candidate.id === PARAMS.asset) ?? app.assets[0]!;

  const phone = (
    <div className={styles.stage}>
      <PhoneFrame>
        <div className={styles.screen}>
          <MockAssetStage
            asset={asset}
            initialRoute={PARAMS.route ?? undefined}
            // PhoneFrame already scales its body to 390x844.
            fit="none"
          />
        </div>
      </PhoneFrame>
    </div>
  );

  // NO THEME IS A REAL ANSWER, and it is the absence of a runtime rather than a
  // runtime holding nothing: with no store registered every resolver returns
  // its caller's own fallback, which IS the app before a design is applied. It
  // is also the most useful "before" a comparison can have.
  if (PARAMS.theme === null) return phone;

  return (
    <ThemeProvider
      appId={APP_ID}
      designId={PARAMS.theme}
      // NOT STICKY. A stage is told what to show. Left sticky, both sides of a
      // comparison would boot into whichever design the visitor last picked in
      // the studio, and each would overwrite the other's stored selection as it
      // loaded — so the page would show one theme twice and give no sign why.
      sticky={false}
    >
      {phone}
    </ThemeProvider>
  );
}
