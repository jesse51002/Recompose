// Ports ../../../../../../CRM/lib/showcase/rewards/points_headline.dart — the
// member's points balance, stated once at the head of the store.
//
// THE BASE MADE THIS THE LOUDEST THING ON THE SCREEN and this design will not.
// There it was `SparkleHero`: a 64px numeral in the brand colour with
// twenty-two stars scaling up around it, sitting above the store it was meant
// to introduce. Two lines of ../layout_brief.yaml rule that out on their own —
// a figure never leads a screen a member browses, and nothing in this app
// scales up and settles — and the emphasis ranking puts the balance THIRD, under
// each reward's name-and-photograph and under its cost.
//
// So the balance is stated the way this app states a fact the member carries:
// left aligned on the cream reading ground, in the SANS with tabular figures,
// its two labels in the tracked label register. Loud enough to be the first
// thing read on the cream, quiet enough that the first satin panel below it
// wins the screen. The three strings are the Dart's own, unchanged.
//
// That widget is GONE from this fork rather than left unreachable beside its
// replacement. The base composes it twice — here and from
// `profile/rankLayoutData` for the streak hero — and this fork's profile
// replaced its half too, so nothing was left importing it. Only the pure
// maths survives, in ./sparkleHeroGeometry.ts, because a test pins it.

import { formatThousands } from '../formatPoints';

import styles from './PointsHeadline.module.css';

export interface PointsHeadlineProps {
  /** The member's points balance. Sample data, not a customization slot. */
  points: number;
}

export function PointsHeadline({ points }: PointsHeadlineProps) {
  return (
    <div className={styles.headline}>
      <span className={styles.eyebrow}>YOU EARNED</span>
      {/*
        The figure and its unit are ONE object, so they share a line and the
        small gap. A label naming the value beside it tells the member nothing
        the screen did not already say — which is what makes it typography
        rather than a new field.
      */}
      <span className={styles.balance}>
        <span className={styles.value}>{formatThousands(points)}</span>
        <span className={styles.unit}>POINTS</span>
      </span>
    </div>
  );
}
