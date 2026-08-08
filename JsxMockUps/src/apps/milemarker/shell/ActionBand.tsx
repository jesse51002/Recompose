// THE ACTION BAND — a screen's primary action, and the one filled region on it.
//
// Replaces ../support/ShowcasePrimaryButton.tsx, which is deleted from this
// folder. The base's button is a pill the caller positions; this is a full-width
// band seated directly above the last lane, and there is exactly one per screen.
//
// SOLID TRACK BLUE, NOT CORAL, and that is a legibility decision rather than a
// taste one. The label colour is the theme's `regular_text` derivation of
// `primary` — the pipeline's own AA-checked answer to "what reads on this fill"
// — which lands at ~6.7:1. The same label on coral is 4.35:1 and fails AA for
// anything under 18.66px bold, so a coral action band would be a legibility
// failure dressed as a brand moment. Coral stays the finish tape.

import { ChevronMarkIcon } from '../support/icons';

import styles from './ActionBand.module.css';

export interface ActionBandProps {
  label: string;
  onPress: () => void;
}

export function ActionBand({ label, onPress }: ActionBandProps) {
  return (
    <button type="button" className={styles.band} onClick={onPress}>
      <span>{label}</span>
      <ChevronMarkIcon className={styles.glyph} size={16} />
    </button>
  );
}
