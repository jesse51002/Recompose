// THE ACTION BAND — a screen's one primary action, as a full-width satin band
// at the foot.
//
// Replaces the base's `support/ShowcasePrimaryButton.tsx`, which is DELETED
// from this folder.
//
// It never coexists with `./FootNav.tsx`, and that is not a coincidence: the
// only two app screens carrying a primary action (`class`'s Reserve and
// `booking`'s Continue) are also the only two with no bottom nav, exactly as in
// the member app. Two adjacent satin bands would read as one.
//
// A RENDERED AFFORDANCE WITH NO HANDLER IS A DEAD END (Guardrail 4), and both
// of this app's have been one: `class`'s reserve and `booking`'s continue were
// each drawn and each did nothing. `onPress` is required for that reason.

import { cx } from '../cx';

import styles from './ActionBand.module.css';

export interface ActionBandProps {
  label: string;
  onPress: () => void;
  /**
   * Lay the band out but keep it blank — the celebration cards, while their
   * intro is still playing. The BOX is always present so the action's arrival
   * never reflows the card.
   */
  pending?: boolean | undefined;
  /** Fade the label in as it arrives. Paired with `pending` going false. */
  appearing?: boolean | undefined;
}

export function ActionBand({ label, onPress, pending = false, appearing = false }: ActionBandProps) {
  return (
    <button
      type="button"
      className={styles.band}
      onClick={onPress}
      // `visibility: hidden` on the label alone would leave the BUTTON tappable
      // while it looks blank; disabling it is what makes "not yet" honest.
      disabled={pending}
      aria-hidden={pending}
      tabIndex={pending ? -1 : undefined}
    >
      <span className={cx(styles.label, pending && styles.hidden, appearing && styles.appearing)}>
        {label}
      </span>
    </button>
  );
}
