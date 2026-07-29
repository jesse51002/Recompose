// The slots this app resolves against a theme.
//
// DELIBERATELY ONLY THE UNIVERSAL ONES. A real second app ships its own
// `apps/<id>/app.yaml` in the pipeline, declaring whatever slots its screens
// need. This one does not exist there yet — it is here to prove the KIT is
// app-agnostic — so it resolves only the slot ids any brand manifest declares:
// the four colour roles, the two font roles, and the logo.
//
// That is what lets it be previewed against a CombatDen run and still be a
// real test of theming. What it cannot show is app-specific imagery, and it
// deliberately does not fake one: every picture on these screens is drawn in
// CSS from the palette, so nothing here can silently fall back to a bundled
// asset and look themed when it is not.

export const SLOT_PRIMARY = 'primary';
export const SLOT_BACKGROUND = 'background';
export const SLOT_TEXT = 'text';
export const SLOT_ACCENT = 'accent';

export const SLOT_FONT_DISPLAY = 'display';
export const SLOT_FONT_BODY = 'body';

export const SLOT_LOGO_PRIMARY = 'logo_primary';
