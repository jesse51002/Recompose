// Ports ../../../../../../CRM/lib/showcase/rewards/points_headline.dart — a
// clone of MobileApp's `PointsHeadline`: the "YOU EARNED / 3,400 / POINTS"
// statement over the member's balance.
//
// ALL THREE PARTS SURVIVE, sentence-cased and re-set: the eyebrow above is now
// the region's spoken label beside its node, the balance is the screen's one
// big light FIGURE, and the eyebrow below is the unit under it. Nothing was
// dropped and nothing was added — the wording is the base's own.
//
// THE SPARKLE SCATTER IS GONE. Twenty-two eight-point stars are a fourth form
// in a world that has three (the line, the circle, the photograph), and the
// brief rules out exactly this kind of reflex ornament. ./SparkleHero.tsx is
// left in place and untouched because ../profile/ still renders it; this screen
// simply stopped reaching for it.
//
// THE NODE IS SAGE, not terracotta. Sage is the second fill and the quieter
// one, and this design spends it only on a thing already earned — which is what
// a points balance is. Terracotta stays reserved for the thread, the
// destination the member is standing in, and a screen's single primary action.
//
// The Dart carries its own private `_formatPoints`; the port reads the island's
// single ../formatPoints.ts instead — see that file for why there is one rather
// than four.

import { formatThousands } from '../formatPoints';
import { Figure } from '../shell/Figure';
import { Region } from '../shell/Thread';

import styles from './PointsHeadline.module.css';

export interface PointsHeadlineProps {
  /** The member's points balance. Sample data, not a customization slot. */
  points: number;
}

export function PointsHeadline({ points }: PointsHeadlineProps) {
  return (
    <Region label="You earned" kind="calm">
      <Figure size="xl">{formatThousands(points)}</Figure>
      <p className={styles.unit}>points</p>
    </Region>
  );
}
