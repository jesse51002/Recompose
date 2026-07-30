// The RANK celebration card — the 4th of the five post-class cards.
//
// Ports MobileApp/lib/features/stats/presentation/widgets/rank/rank_body.dart,
// and it is the one card this island never had: the Flutter PREVIEW this
// package was first ported from carried no rank celebration, so `rank_belt`'s
// third and largest use — "the animated hero of the post-class Rank celebration
// screen ... where it flies in large and centred (~280px)"
// (`apps/combatden/app.yaml`) — had no surface here to be judged on.
//
// THIS IS WHERE THE THREAD CLOSES. Everywhere else in this app the line enters
// at the brand mark and leaves through the bottom edge without ever completing;
// on a celebration card it draws itself AROUND that card's hero, comes round,
// and meets itself. That is the only place the line finishes, and it is why
// this card carries a <Loop> and no descending rail: the loop IS the thread
// here, not an ornament laid over one. See ./layout_brief.yaml.
//
// THE MEDALLION EARNS ITS CIRCLE. `rank_belt` is generated as a 1:1 minted
// cut-out — a struck terracotta disc, centre-weighted, transparent-edged — so
// <MintedDisc> costs it nothing and belongs to it. Guardrail 10b is about
// LANDSCAPE art in a square box; this is the sanctioned other half of that
// rule, and ./shell/Photo.tsx says so at the component.
//
// It is still deliberately the plainest of the five. The other four each carry
// a bespoke driver (a point sphere, a cover flow, an orbit, a sparkle burst);
// this one is a line closing around a single object, which is what makes a rank
// read as status rather than as a firework.

import { useEffect, useState } from 'react';

import { CelebrationFrame } from './celebrations/CelebrationFrame';
import { CountUpText } from './celebrations/CountUpText';
import { cx } from './cx';
import styles from './RankShowcase.module.css';
import { ARRIVE_MS, CLOSE_MS, COUNT_MS, HOLD_MS } from './shell/breath';
import { Figure, Title } from './shell/Figure';
import { MintedDisc } from './shell/Photo';
import { Loop } from './shell/Thread';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_RANK_BELT } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * The rank the member just reached, and what it took. Sample data, like every
 * card's — and sentence case, like every label in this app.
 */
const RANK_NAME = 'Blue Belt';
const RANK_SUBTITLE = 'Rank achieved';
const CLASSES_AT_RANK = 48;
const CLASSES_LABEL = 'Classes in rank';

/**
 * The closing loop, and the medallion it encircles.
 *
 * 280 is `rank_belt`'s own documented hero size, kept: the loop takes it and
 * the disc sits inside with a clear ring of canvas between the two, so the
 * thread reads as a separate stroke rather than as the medallion's own rim —
 * which it would if the two were within a few pixels of each other.
 *
 * Numbers rather than tokens because both are COMPONENT PROPS: `Loop` and
 * `MintedDisc` are sized by the caller in logical px (a ring that does not fit
 * its hero is worse than no ring). Nothing in the stylesheet types a px value.
 */
const LOOP_SIZE = 280;
const MEDALLION_SIZE = 196;

/**
 * The tempo, and it is the brief's literal one: a breath, soft at BOTH ends,
 * about three quarters of a second for the line to travel.
 *
 * `CLOSE_MS` from ./shell/breath.ts rather than a number of this card's own:
 * this is the same stroke travelling the same distance as the loop on every
 * other celebration, and it shipped 140ms slower than its siblings for no
 * reason anyone could have named.
 *
 * The draw is split across two half-circles (see the stylesheet), so each half
 * runs for `DRAW_MS / 2` — the first on `--vf-breath-in` and the second on
 * `--vf-breath-out`, which recompose into one breath across the whole circle
 * and therefore do not stall where they meet.
 */
const DRAW_MS = CLOSE_MS;

/** The type's arrival, at the moment the loop closes. Opacity only — nothing slides. */
const SETTLE_MS = ARRIVE_MS;

const MOTION_VARS = Object.freeze({
  '--rank-draw-ms': `${String(DRAW_MS)}ms`,
  '--rank-draw-half-ms': `${String(DRAW_MS / 2)}ms`,
  '--rank-settle-ms': `${String(SETTLE_MS)}ms`,
});

export interface RankShowcaseProps {
  /** Replay forever. Off inside the celebration flow, which advances instead. */
  loop?: boolean;
  /** Fired when the entrance has finished and the card is settled. */
  onCycleComplete?: (() => void) | undefined;
}

export function RankShowcase({ loop = true, onCycleComplete }: RankShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  // A tap finishes the draw — ./shell/useTapToSettle.ts.
  const { settled: tapped, bind } = useTapToSettle();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Reduced motion has no entrance to wait for, so the card is settled the
    // moment it renders — the same shortcut every other card takes, and
    // Guardrail 5's shape: the callback fires BEFORE the early return, or a
    // card rendered with `loop={false}` never settles and its action never
    // arrives.
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    // THE CLOSE IS THE SETTLE. This used to be one timer at `HOLD_MS`, so the
    // flow's action appeared 1.7 seconds after the loop had visibly finished —
    // the card sat there looking done and offering nothing. "The moment it
    // closes is the moment the card is settled and its action appears"
    // (./layout_brief.yaml). The hold is a REPLAY concern and is now its own
    // timer, armed only when this card is running standalone.
    const settle = window.setTimeout(() => {
      onCycleComplete?.();
    }, DRAW_MS);
    const restart = loop
      ? window.setTimeout(() => {
          setCycle((n) => n + 1);
        }, DRAW_MS + HOLD_MS)
      : 0;
    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(restart);
    };
  }, [cycle, loop, reduceMotion, onCycleComplete]);

  return (
    <CelebrationFrame>
      <RankContent key={cycle} finished={tapped || reduceMotion} bind={bind} />
    </CelebrationFrame>
  );
}

/** `_RankContent` — the loop closing on the medallion, the rank it names, and what it cost. */
function RankContent({
  finished,
  bind,
}: {
  /** The member tapped, or asked for reduced motion: the card is already done. */
  finished: boolean;
  bind: { readonly onPointerDownCapture: () => void };
}) {
  // NOT themed. `rank_body.dart` has no ThemeText call at all — the rank name
  // and its sub-label come from the live profile, not from a copy slot. The
  // first version of this file read `wins_subtitle`, which belongs to the
  // trophy card; borrowing another card's slot would have re-labelled this one
  // whenever a tenant's wins copy changed.
  return (
    <div
      className={cx(styles.content, finished && styles.finished)}
      style={showcaseStyle(MOTION_VARS)}
      {...bind}
    >
      <Loop size={LOOP_SIZE}>
        {/*
          THE DRAWING OF THE LINE, and it is a subtraction rather than an
          addition: two canvas-coloured wedges start covering the ring and
          rotate off it, one half after the other, so what the eye sees is a
          terracotta stroke travelling clockwise from twelve o'clock and meeting
          itself. The wedges pass UNDER the medallion (which is opaque and sits
          a layer up) and over nothing else, so the only thing they ever uncover
          is the ring.
        */}
        <span className={styles.draw} aria-hidden="true">
          <span className={styles.drawHalfRight}>
            <span className={styles.wedgeRight} />
          </span>
          <span className={styles.drawHalfLeft}>
            <span className={styles.wedgeLeft} />
          </span>
        </span>
        <span className={styles.medallion}>
          <MintedDisc
            slot={SLOT_RANK_BELT}
            fallback={showcaseAsset('profile_rank_belt_gold.png')}
            alt=""
            size={MEDALLION_SIZE}
          />
        </span>
      </Loop>

      {/*
        The name and its sub-label are ONE object and share the smallest gap on
        the card; the gap to the tally below is the scale's largest. That
        difference is the whole of the grouping (Guardrail 13).
      */}
      <div className={styles.naming}>
        <Title>{RANK_NAME}</Title>
        <p className={styles.sub}>{RANK_SUBTITLE}</p>
      </div>

      {/*
        A spoken label over a very large figure — this app's own idiom for a
        count, and the reason it never needs a heading. The label names the
        number, so it sits with it.
      */}
      <div className={styles.tally}>
        <p className={styles.say}>{CLASSES_LABEL}</p>
        <Figure size="xl">
          <CountUpText
            target={CLASSES_AT_RANK}
            durationMs={COUNT_MS}
            delayMs={DRAW_MS}
            immediate={finished}
          />
        </Figure>
      </div>
    </div>
  );
}
