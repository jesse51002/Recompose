// The one thing a person types before the conversation takes over.
//
// It asks for a NAME and nothing else. The old form asked for all five brief
// fields up front, which is the wrong shape for this: the interview is what
// works out what the brand should be, so asking for it first would either
// duplicate that work or pre-empt it. A name is what the design is CALLED —
// it is needed before anything can be recorded under it, and the agent asks
// for everything else.

import { useState } from 'react';

import { cx } from '../widgets/cx';
import { SHELL_CLASS } from '../generate/phaseClass';

import styles from './StartDesign.module.css';

interface StartDesignProps {
  readonly onStart: (designName: string) => Promise<void>;
  readonly error: string | null;
}

export function StartDesign({ onStart, error }: StartDesignProps) {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = (event: React.FormEvent): void => {
    event.preventDefault();
    const designName = name.trim();
    if (!designName || busy) return;
    setBusy(true);
    void onStart(designName).finally(() => setBusy(false));
  };

  return (
    <div className={cx(styles.shell, SHELL_CLASS)}>
      <form className={styles.form} onSubmit={submit}>
        <h1 className={styles.title}>Design an app</h1>
        <p className={styles.lede}>
          Tell me who this is for and I&rsquo;ll design the app around it —
          palette, type, copy, imagery, then the layout itself.
        </p>

        <label className={styles.label} htmlFor="design-name">
          The business
        </label>
        <input
          id="design-name"
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Stillwater Pilates"
          disabled={busy}
          autoFocus
        />

        <button
          type="submit"
          className={styles.start}
          disabled={busy || name.trim() === ''}
        >
          {busy ? 'Starting…' : 'Start'}
        </button>

        {error !== null && <p className={styles.error}>{error}</p>}

        {/* Said before anything starts, because it is the thing most likely to
            be misread later: this takes real time and spends real money, and
            a person who expects it to be instant will read a working run as a
            broken one. */}
        <p className={styles.note}>
          Generating the palette, type, copy and imagery takes ten to twenty
          minutes and spends real money. You can close this page — everything
          is still here when you come back.
        </p>
      </form>
    </div>
  );
}
