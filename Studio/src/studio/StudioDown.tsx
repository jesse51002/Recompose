// What the Generate page shows when it cannot open a session at all.
//
// This is the ONLY screen in front of the interview now. The start form that
// used to stand here is gone — nothing is typed before the conversation
// starts — so the page has no other state to fall back to, and a failure to
// open has to explain itself rather than leaving an empty dark rectangle.
//
// It names the command that fixes the common cause, because the common cause
// is that the API is not running and the fix is one line.

import { cx } from '../widgets/cx';
import { SHELL_CLASS } from '../generate/phaseClass';

import styles from './StudioDown.module.css';

export function StudioDown({ error }: { readonly error: string }) {
  return (
    <div className={cx(styles.shell, SHELL_CLASS)}>
      <div className={styles.panel}>
        <h1 className={styles.title}>The studio is not answering</h1>
        <p className={styles.lede}>
          The design agent, the pipeline and the theme catalogue are all one
          service, and this page could not reach it.
        </p>
        <p className={styles.error}>{error}</p>
        <p className={styles.note}>
          It usually means the API is not running. Start it with{' '}
          <code>make api</code> and reload this page.
        </p>
      </div>
    </div>
  );
}
