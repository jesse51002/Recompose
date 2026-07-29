// One place that knows which phase wears which hue.
//
// The header tag, the transcript's phase markers and each message's pip all
// read from this, so they cannot disagree about what the run is doing. In the
// demo that invariant was held by a single `stamp()` function writing both
// places at once; here it is held by the data — a `phase` record — and this
// map is the only translation between the wire value and the stylesheet.

import type { SessionPhase } from '../studio/sessionApi';

import tokens from './generateTokens.module.css';

/**
 * The CSS class carrying a phase's `--phase*` custom properties.
 *
 * Falls back to no class rather than to a default hue: before the first phase
 * record there IS no phase, and colouring that state would claim one.
 */
export function phaseClass(phase: SessionPhase | null | undefined): string {
  switch (phase) {
    case 'brief':
      return tokens['p-brief']!;
    case 'generating':
      return tokens['p-generating']!;
    // No 'layout brief' case: the layout is not interviewed for, so a
    // settled run goes straight to 'designing'.
    case 'designing':
      return tokens['p-designing']!;
    case 'validating':
      return tokens['p-validating']!;
    case 'review':
      return tokens['p-review']!;
    case 'approved':
      return tokens['p-approved']!;
    default:
      return '';
  }
}

/** The shell's own token scope. Applied once, at the view's root. */
export const SHELL_CLASS = tokens['shell']!;
