// The RANK celebration card — the 4th of the five post-class cards.
//
// Ports MobileApp/lib/features/stats/presentation/widgets/rank/rank_body.dart,
// and it is the one card this island never had: the Flutter PREVIEW this
// package was first ported from carried no rank celebration, so `rank_belt`'s
// third and largest use — "the animated hero of the post-class Rank celebration
// screen ... where it flies in large and centred (~280px), holds, then shrinks"
// (`apps/combatden/app.yaml`) — had no surface here to be judged on.
//
// It is deliberately the plainest of the five. The other four each carry a
// bespoke driver (a point sphere, a cover flow, an orbit, a sparkle burst);
// this one is a single object arriving, which is what the slot description
// asks for and what makes a rank read as status rather than as a firework.

import { useEffect, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { CelebrationFrame } from './celebrations/CelebrationFrame';
import { CountUpText } from './celebrations/CountUpText';
import styles from './RankShowcase.module.css';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_RANK_BELT } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** The rank the member just reached, and what it took. Sample data, like every card's. */
const RANK_NAME = 'Blue Belt';
const RANK_SUBTITLE = 'Rank achieved';
const CLASSES_AT_RANK = 48;
const CLASSES_LABEL = 'classes in rank';

/** How long the settled card holds before a loop replays it. 2600 in the base. */
const HOLD_MS = 3200;

/**
 * The hero's arrival.
 *
 * ZEN BJJ slows both beats — 900/260 in the base — and the card's whole reason
 * for existing is what makes that the right call: a rank is not news, it is
 * status. "Controlled strength at rest, never frantic." The belt still arrives
 * by scale and opacity only (nothing translates), so it reads as coming to the
 * member rather than sliding in from off-screen; it just takes its time.
 */
const MOTION_VARS = Object.freeze({
  '--rank-arrive-ms': '1300ms',
  '--rank-settle-ms': '420ms',
});

export interface RankShowcaseProps {
  /** Replay forever. Off inside the celebration flow, which advances instead. */
  loop?: boolean;
  /** Fired when the entrance has finished and the card is settled. */
  onCycleComplete?: (() => void) | undefined;
}

export function RankShowcase({ loop = true, onCycleComplete }: RankShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Reduced motion has no entrance to wait for, so the card is settled the
    // moment it renders — the same shortcut every other card takes.
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      onCycleComplete?.();
      if (loop) setCycle((n) => n + 1);
    }, HOLD_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [cycle, loop, reduceMotion, onCycleComplete]);

  return (
    <CelebrationFrame>
      <RankContent key={cycle} />
    </CelebrationFrame>
  );
}

/** `_RankContent` — the belt, the rank it names, and what it cost. */
function RankContent() {
  // NOT themed. `rank_body.dart` has no ThemeText call at all — the rank name
  // and its sub-label come from the live profile, not from a copy slot. The
  // first version of this file read `wins_subtitle`, which belongs to the
  // trophy card; borrowing another card's slot would have re-labelled this one
  // whenever a tenant's wins copy changed.
  return (
    <div className={styles.content} style={showcaseStyle(MOTION_VARS)}>
      <div className={styles.hero}>
        <ThemedImage
          className={styles.beltImg}
          slot={SLOT_RANK_BELT}
          fallbackSrc={showcaseAsset('profile_rank_belt_gold.png')}
          alt=""
        />
      </div>
      <div className={styles.caption}>
        <span className={styles.rank}>{RANK_NAME}</span>
        <span className={styles.subtitle}>{RANK_SUBTITLE}</span>
      </div>
      <div className={styles.tally}>
        <span className={styles.tallyValue}>
          <CountUpText target={CLASSES_AT_RANK} />
        </span>
        <span className={styles.tallyLabel}>{CLASSES_LABEL}</span>
      </div>
    </div>
  );
}
