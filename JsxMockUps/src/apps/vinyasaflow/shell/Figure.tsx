// EVERY NUMBER THIS APP COUNTS, and the one headline that names a screen.
//
// The display face does exactly two jobs and this component is both of them.
// Both at LIGHT weight, which is the design's whole register: a 72px figure at
// weight 600 is a scoreboard, and a scoreboard is what this brand was chosen
// against. Unhurried confidence, not volume.
//
// A big number set light is the most characteristic mark on any screen here,
// and it is what the eye lands on first — which is why a heading is rarely a
// heading in this app. It is a spoken label beside a node, over a very large
// figure.

import type { ReactNode } from 'react';

import { cx } from '../cx';

import styles from './Figure.module.css';

/** The rungs, largest first. */
export type FigureSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

// `string | undefined` because CSS-module lookups are typed that way under
// `noUncheckedIndexedAccess`; `cx` drops an undefined. See ./Thread.tsx.
const SIZE_CLASS: Readonly<Record<FigureSize, string | undefined>> = Object.freeze({
  xl: styles.xl,
  lg: styles.lg,
  md: styles.md,
  sm: styles.sm,
  xs: styles.xs,
});

export interface FigureProps {
  size?: FigureSize | undefined;
  /**
   * Set the ink for a figure sitting ON one of the two fills. `warm` is the
   * light derivation of terracotta (5.54:1); `calm` the light derivation of
   * sage (5.03:1). Neither is the canvas linen, which clears neither.
   */
  on?: 'warm' | 'calm' | undefined;
  className?: string | undefined;
  children: ReactNode;
}

/** A counted figure. Tabular by construction — see the stylesheet. */
export function Figure({ size = 'md', on, className, children }: FigureProps) {
  return (
    <span
      className={cx(
        styles.figure,
        SIZE_CLASS[size],
        on === 'warm' && styles.onFill,
        on === 'calm' && styles.onCalm,
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TitleProps {
  on?: 'warm' | 'calm' | undefined;
  className?: string | undefined;
  children: ReactNode;
}

/** The one headline that names a screen. Sentence case, always. */
export function Title({ on, className, children }: TitleProps) {
  return (
    <h1
      className={cx(
        styles.title,
        on === 'warm' && styles.onFill,
        on === 'calm' && styles.onCalm,
        className,
      )}
    >
      {children}
    </h1>
  );
}
