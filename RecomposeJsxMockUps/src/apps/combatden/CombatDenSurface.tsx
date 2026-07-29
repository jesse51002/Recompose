// The asset's ROOT — the element every `--sc-*` token lands on, plus the demo
// content its screens read.
//
// THIS IS THE PIECE WHOSE ABSENCE BREAKS EVERYTHING. Every stylesheet in this
// app reads `var(--sc-…)` and nothing else: type, spacing, radius, colour and
// every icon/image size. `ShowcaseThemeVars` is what writes those ~67 variables
// onto a single element, and CSS custom properties inherit — so if no ancestor
// carries them, they do not resolve to a fallback, they resolve to NOTHING.
// Type drops to the browser default, every padding and gap collapses, and an
// image sized only by `width: var(--sc-icon-size-md)` renders at its natural
// resolution — a 1024px PNG filling the phone.
//
// It used to be `showcaseScreen.tsx` that rendered it. That file was the old
// one-screen-at-a-time registry, and when assets replaced it the token root
// went with it: the screens rendered, and rendered unstyled.
//
// So the two roots an asset needs are composed here, in this order:
//
//   AppContentProvider   the demo content (context — order vs the vars is free)
//     ShowcaseThemeVars  the token surface (MUST be an ANCESTOR of every screen)
//       <the route>
//
// It is the app's `provider`, not something the kit does, because `--sc-*` is
// CombatDen's vocabulary. `src/kit/` may not know a token name any more than it
// may know a screen name.

import type { ReactNode } from 'react';
import { useThemeCategory } from 'recompose-react';

import { AppContentProvider } from './appContent';
import styles from './CombatDenSurface.module.css';
import { ShowcaseThemeVars } from './ShowcaseThemeVars';

export function CombatDenSurface({ children }: { children: ReactNode }) {
  // THE DEMO CONTENT FOLLOWS THE LOADED DESIGN. Without this the provider
  // defaults to the Fighting group no matter which theme is on, and the result
  // is not subtly wrong, it is incoherent: a yoga studio's theme renders yoga
  // class names and yoga photographs over a boxing video feed, captioned "Nick
  // Drossos Defensive Tactics". Every generated slot was right and the screen
  // was still nonsense, because the half of the content that ISN'T generated
  // never moved.
  //
  // An empty category — a run predating classification — passes through as
  // null, which is the provider's own "use the default group" and exactly what
  // it did before.
  const category = useThemeCategory();
  return (
    <AppContentProvider category={category === '' ? null : category}>
      <ShowcaseThemeVars className={styles.root}>{children}</ShowcaseThemeVars>
    </AppContentProvider>
  );
}
