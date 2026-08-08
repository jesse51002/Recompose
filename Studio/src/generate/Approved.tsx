// The last screen the tenant sees, and the one moment the tool gets out of
// the way.
//
// IT IS IN THEIR THEME, not the shell's. Everywhere else on this page the
// generated colour is confined to the phone, because the chrome's hues mean
// states. Here there is no state left to report, so the design fills the
// screen — which is also the argument: what they chose is what they get.
//
// THE VOICE IS THE PLATFORM'S, NOT OURS. A tenant has no "review environment",
// has never heard of a fork, and the company they have a relationship with is
// the platform — so it says the platform will reach out, and says nothing
// about UAT, forks, or what happens next on our side.

import { rgba, toCss, useThemeColor, useThemeFontFamily } from 'recompose-react';

import styles from './Approved.module.css';

const SLOT_PRIMARY = 'primary';
const SLOT_BG = 'background';
const SLOT_SURFACE = 'surface';
const SLOT_TEXT = 'text';
const SLOT_MUTED = 'muted';
const SLOT_FONT_DISPLAY = 'display';

/** The platform whose app this is. Synthetic, like everything named in the demo. */
const PLATFORM = 'CombatDen';

export function Approved({
  designName,
  onDone,
}: {
  designName: string;
  onDone: () => void;
}) {
  // Warm neutral fallbacks: an unresolved slot degrades to a readable screen
  // rather than to a named miss or an unstyled one.
  const primary = toCss(useThemeColor(SLOT_PRIMARY, { fallback: rgba(42, 35, 32) }));
  const background = toCss(useThemeColor(SLOT_BG, { fallback: rgba(247, 242, 236) }));
  const surface = toCss(useThemeColor(SLOT_SURFACE, { fallback: rgba(255, 253, 250) }));
  const text = toCss(useThemeColor(SLOT_TEXT, { fallback: rgba(42, 35, 32) }));
  const muted = toCss(useThemeColor(SLOT_MUTED, { fallback: rgba(138, 122, 108) }));
  const display = useThemeFontFamily(SLOT_FONT_DISPLAY, '');

  return (
    <div className={styles.screen} style={{ background, color: text }}>
      <div className={styles.inner}>
        <div className={styles.mark} style={{ background: primary, color: surface }}>
          ✓
        </div>
        <h1 className={styles.title} style={{ fontFamily: display || undefined }}>
          Design approved.
        </h1>
        <p className={styles.body} style={{ color: muted }}>
          <b>{PLATFORM}</b> will reach out to you when your new app is ready.
        </p>
        <div className={styles.meta} style={{ color: muted }}>
          {designName}
        </div>
        {/* The admin's way onward. Deliberately quiet and last — this screen
            belongs to the tenant, and the fleet is not their concern. */}
        <button
          type="button"
          className={styles.onward}
          style={{ color: muted }}
          onClick={onDone}
        >
          Back to the fleet →
        </button>
      </div>
    </div>
  );
}
