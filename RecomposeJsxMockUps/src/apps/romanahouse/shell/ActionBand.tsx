// THE ACTION BAND — a screen's primary action, as a full-width walnut band
// across the foot of the sheet.
//
// It replaces the base's rounded brand-fill button (../support/
// ShowcasePrimaryButton.tsx, which stays for the one place a button is a button
// rather than a screen's commitment). The label colour is still
// `primaryButtonText` — the theme's own AA-checked `regular_text` derivation of
// `primary`, which is the service's answer to "what reads on this fill" rather
// than a guess made here.
//
// It is a BAND rather than a button because the navigation went vertical and
// left the foot of every screen empty. A pill floating in that space would be
// a button wearing the room the rail paid for; a band takes the room.

import styles from './ActionBand.module.css';

export interface ActionBandProps {
  label: string;
  onPressed?: (() => void) | undefined;
  /**
   * The small tracked line above the label — a spec caption, never a second
   * label. Omitted where the action needs no qualification.
   */
  note?: string | undefined;
}

export function ActionBand({ label, onPressed, note }: ActionBandProps) {
  return (
    <button type="button" className={styles.band} onClick={onPressed}>
      {note !== undefined && <span className={styles.note}>{note}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
