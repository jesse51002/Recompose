// THE ONE PRIMARY ACTION ON A SCREEN.
//
// Replaces the base's `support/ShowcasePrimaryButton.tsx`. Drawn as a CAPSULE
// — a line with round ends — so the app's single most emphatic element is still
// made of the two forms everything else is made of, rather than a rounded
// rectangle smuggled in as a button.
//
// Exactly one terracotta fill per screen, which is a rule of the design and not
// a style preference: with both brand colours failing AA as ink on the canvas,
// a fill is the only way this palette can carry emphasis, and a screen with two
// of them has no primary action at all.
//
// The `borderRadius` / `font` / `padding` string overrides the base's button
// took are gone. They existed so a caller could reach outside the token system
// at a call site; this design has one action and it looks the same everywhere.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Action.module.css';

export interface ActionProps {
  text: string;
  /** Absent means the action is not yet live — see Guardrail 4 before shipping one. */
  onPressed?: (() => void) | undefined;
  /**
   * `warm` is the terracotta fill and the default. `calm` is sage, for a thing
   * already earned. `open` is the thread's stroke bent into a capsule with no
   * fill, for a secondary affordance on a screen whose one fill is spent.
   */
  tone?: 'warm' | 'calm' | 'open' | undefined;
  icon?: ReactNode;
}

export function Action({ text, onPressed, tone = 'warm', icon }: ActionProps) {
  return (
    <button
      type="button"
      className={cx(
        styles.action,
        tone === 'calm' && styles.calm,
        tone === 'open' && styles.open,
      )}
      onClick={onPressed}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
