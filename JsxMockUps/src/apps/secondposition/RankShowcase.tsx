// CELEBRATION CARD 4 — THE RANK, as a mark mounted on satin with its entry
// ruled at the foot.
//
// Ports MobileApp/lib/features/stats/presentation/widgets/rank/rank_body.dart,
// and it is the one card this island never had: the Flutter PREVIEW this
// package was first ported from carried no rank celebration, so `rank_belt`'s
// third and largest use — "the animated hero of the post-class Rank celebration
// screen ... where it flies in large and centred (~280px)"
// (`apps/combatden/app.yaml`) — had no surface here to be judged on.
//
// WHAT THIS CARD IS, IN THIS DESIGN. A company mounts what it awards: the mark
// centred on a field of satin, clear air around it, nothing framing it, its
// name directly beneath (./layout_brief.yaml, "THE STRUCK OBJECTS ARE INSIGNIA
// AND ARE PRESENTED AS SUCH"). That is ./shell/Insignia.tsx exactly. Beneath it,
// parted by a hairline and set against the left edge, is what the rank cost —
// the entry at the foot of a bill, after the bill has announced what is given.
// It is deliberately the plainest of the five: the other four each carry a
// bespoke driver (a coin swarm, a cover flow, a week strip, a sparkle burst) and
// this one is a single object coming to rest, which is what makes a rank read as
// status rather than as a firework.
//
// THE SKELETON IS THE ONE ./StatsShowcase.tsx AND ./PointsShowcase.tsx ALREADY
// STAND ON, and that is not a coincidence — a satin field edge to edge, a focal
// mount centred in everything above the foot, and a ruled entry pinned to the
// foot. Five cards that look alike is a requirement of the brief, not a bonus,
// so the third card built on the pattern adopts it rather than inventing a
// third structure.
//
// NO `Screen` AND NO `CelebrationFrame`, for ./PointsShowcase.tsx's two reasons,
// both of which are correctness rather than taste. The satin field is "the
// ground of every celebration card" (./layout_brief.yaml) and runs edge to edge,
// so a frame that inset it, painted a second ground under it, or reserved a
// status strip above it would break the one thing this card is. And the tap that
// finishes the card has to be heard across the WHOLE card, so the element
// carrying `bind` is the element that fills the box — an inner box that stops
// short leaves a band where a tap settles the flow's action without telling the
// card, which is precisely the contradiction ./shell/useTapToSettle.ts exists to
// prevent. ./celebrationAsset.tsx's scaffold already owns the CTA zone beneath
// this, laid out from the first frame so nothing reflows.
//
// THE BELT IS A CUT-OUT AND IS THEREFORE CONTAINED, NEVER CROPPED. `rank_belt`
// measures ~0.98 — near square but not square — and it carries its own
// transparent margin. <Insignia> scales it to fit INSIDE its box and leaves the
// remainder empty, which shows no letterbox because there is no opaque edge to
// show one. Guardrail 10b's other half: a PHOTOGRAPH gets a box of its own
// proportion, a cut-out gets containment, and the two rules are not
// interchangeable.
//
// THE EMPHASIS IS A NAME PLUS AN OBJECT, NOT A FIGURE (the ranking in
// `.claude/skills/mockup-redesign-combatden`): rank 1 here is "Blue Belt" AND
// its belt, together, so the display serif goes on the NAME and the
// classes-in-rank count stays in the sans, stays smaller and stays lighter. This
// is the card where it would be easiest to get that backwards, because the count
// is the only number on screen and the serif sets a number beautifully — which
// is precisely the habit Guardrail 14 warns about. The serif figure rungs
// (`--sc-type-figure-*`) belong to the cards whose whole subject IS the number;
// this card's subject is a rank.

import { useEffect, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { CountUpText } from './celebrations/CountUpText';
import { cx } from './cx';
import styles from './RankShowcase.module.css';
import { INSIGNIA_ART_CLASS, Insignia } from './shell/Insignia';
import { COUNT_MS, HOLD_MS, WIPE_MS } from './shell/phrase';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_RANK_BELT } from './showcaseSlots';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** The rank the member just reached, and what it took. Sample data, like every card's. */
const RANK_NAME = 'Blue Belt';
const RANK_SUBTITLE = 'Rank achieved';
const CLASSES_AT_RANK = 48;
const CLASSES_LABEL = 'Classes in rank';

/**
 * The medallion's box, in px.
 *
 * `rank_belt`'s own documented hero size, kept. It is a component PROP rather
 * than a token because <Insignia> is sized by its caller in logical px — an
 * insignia that does not fit the air around it is worse than a smaller one —
 * and nothing in the stylesheet types a px value.
 *
 * 280 inside a 390pt screen leaves 55pt of satin either side of the mark, which
 * is the "clear air" the brief asks for rather than a margin that happens to be
 * left over.
 */
const BELT_SIZE = 280;

// ---------------------------------------------------------------------------
// THE PHRASE, as one ladder — the same ladder ./StatsShowcase.tsx climbs, so the
// two cards built on the same skeleton also keep the same clock. Every value is
// a sum of ./shell/phrase.ts constants, so slowing the fork slows the card and
// nothing here has to be re-derived by hand.
// ---------------------------------------------------------------------------

/**
 * The count starts rolling once the field has finished opening.
 *
 * The satin is the entrance (./layout_brief.yaml): the field wipes open with
 * everything already in place beneath it, so the field passing over the type is
 * what puts the type on screen. A figure that had already rolled underneath the
 * veil would arrive spent.
 */
const FIGURE_DELAY_MS = WIPE_MS;

/**
 * WHEN THIS CARD IS SETTLED, AND WHY IT IS THIS NUMBER.
 *
 * "A card settles when its figure lands and its object stops, never when a
 * timer expires... the same moment on all five cards, because five cards that
 * look alike and reveal their action at five different times read as five
 * broken cards" (./layout_brief.yaml).
 *
 * The belt comes to rest at `SETTLE_MS` (1000ms, inside this window) and the
 * count lands at the end of it, so the figure is the last event on the card.
 * This is byte-for-byte ./StatsShowcase.tsx's `LOOP_CLOSE_MS` — the two cards
 * that share a skeleton reveal their action at the same instant, which is the
 * whole point of deriving it rather than choosing it.
 *
 * NOT `HOLD_MS`. The hold is a REPLAY concern that exists only when this card
 * runs standalone; conflating the two is what left `apps/vinyasaflow/`'s five
 * look-alike cards revealing their action at 0.76s, 4.3s, 8.9s, 2.6s and 3.2s.
 */
const SETTLES_AT_MS = FIGURE_DELAY_MS + COUNT_MS;

export interface RankShowcaseProps {
  /** Replay forever. Off inside the celebration flow, which advances instead. */
  loop?: boolean;
  /** Fired when the entrance has finished and the card is settled. */
  onCycleComplete?: (() => void) | undefined;
}

export function RankShowcase({ loop = true, onCycleComplete }: RankShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  // A tap finishes the card outright — ./shell/useTapToSettle.ts.
  const { settled, bind } = useTapToSettle();
  const [cycle, setCycle] = useState(0);

  // THE CALLBACK FIRES BEFORE EVERY GUARD (Guardrail 5). A flow renders this
  // card with `loop={false}`, so a `return` ahead of the call leaves the CTA
  // hidden forever; the reduced-motion branch has exactly the same shape,
  // because a member who asked for less motion is handed a card that is ALREADY
  // settled rather than one that never settles.
  useEffect(() => {
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    const close = window.setTimeout(() => {
      onCycleComplete?.();
    }, SETTLES_AT_MS);
    return () => {
      window.clearTimeout(close);
    };
  }, [cycle, reduceMotion, onCycleComplete]);

  // THE HOLD IS A REPLAY CONCERN AND IS ARMED ONLY STANDALONE. Inside the flow
  // the card holds where it landed and the member's tap advances it. A tap also
  // ends the replay: once someone has finished the card by hand, restarting it
  // under them is the card arguing with them.
  useEffect(() => {
    if (!loop || reduceMotion || settled) return;
    const replay = window.setTimeout(() => {
      setCycle((current) => current + 1);
    }, SETTLES_AT_MS + HOLD_MS);
    return () => {
      window.clearTimeout(replay);
    };
  }, [cycle, loop, reduceMotion, settled]);

  // A per-frame driver has no keyframe for `.finished` to fast-forward, so the
  // count-up is handed over in its own branch: the reel is replaced by the value
  // it was rolling towards. Tabular figures on both sides of the swap mean the
  // digit cell is the same width either way, and `.tallyFigure` is a flex box
  // rather than a line box, so the reel and the plain value occupy the same
  // height too — nothing shifts in either axis. Re-running the odometer at a
  // shorter duration instead would reset every reel to zero for a frame first,
  // which is a visible flick back to 0 on exactly the tap meant to end the wait.
  const landed = settled || reduceMotion;

  // NOT THEMED. `rank_body.dart` has no ThemeText call at all — the rank name
  // and its sub-label come from the live profile, not from a copy slot. An
  // earlier version of this file read `wins_subtitle`, which belongs to the
  // trophy card; borrowing another card's slot would have re-labelled this one
  // whenever a tenant's wins copy changed.
  return (
    <div className={cx(styles.card, landed && styles.finished)} {...bind}>
      <div key={cycle} className={styles.field}>
        {/*
          THE MARK, ITS NAME AND ITS SUB-LABEL ARE ONE OBJECT, and they arrive as
          one gesture: <Insignia settling> puts a single `--sp-settle` animation
          on the whole mount rather than three staggered ones on three children.
          That is the emphasis ranking expressed in the motion — rank 1 is the
          name AND the belt, together, so nothing may reveal one without the
          other.

          `onSatin` is what puts the caption and the sub-label into
          `--sc-on-satin`, the only legible ink on this field: the warm charcoal
          reaches 2.70:1 there and fails AA at every size.
        */}
        <div className={styles.statement}>
          <Insignia
            className={styles.hero}
            art={
              <ThemedImage
                className={INSIGNIA_ART_CLASS}
                slot={SLOT_RANK_BELT}
                fallbackSrc={showcaseAsset('profile_rank_belt_gold.png')}
                alt=""
              />
            }
            size={BELT_SIZE}
            caption={RANK_NAME}
            sub={RANK_SUBTITLE}
            onSatin
            settling
          />
        </div>

        {/*
          THE TALLY IS THE ENTRY AT THE FOOT OF THE BILL. Separation in this
          design is a change of field or a hairline, and there is no second field
          available inside a satin card — so the hairline is what parts what was
          AWARDED from what it COST. `--sc-satin-hair` and not `--sc-rule`: brass
          on satin is 1.33:1, which is not a faint line, it is no line at all.
        */}
        <div className={styles.tally}>
          <span className={styles.part} aria-hidden="true" />
          <span className={styles.tallyLabel}>{CLASSES_LABEL}</span>
          <span className={styles.tallyFigure}>
            {landed ? (
              CLASSES_AT_RANK
            ) : (
              <CountUpText
                target={CLASSES_AT_RANK}
                durationMs={COUNT_MS}
                delayMs={FIGURE_DELAY_MS}
              />
            )}
          </span>
        </div>
      </div>

      {/*
        THE SATIN ARRIVES FIRST AND EVERYTHING IS REVEALED BY IT. A sheet of the
        cream ground lying over the whole card and retracting downward off it, so
        the field's own leading edge is what puts the mark, its name and the
        entry at the foot on screen — one gesture, one element, no per-region
        delay curve to keep in sync. `pointer-events: none`, because it lies over
        the scaffold's tap-to-skip target and a covering may never intercept a
        tap (./layout_brief.yaml, "NOTHING THAT CAN BE TAPPED IS EVER HIDDEN
        WHILE IT MOVES").
      */}
      <span key={`veil-${String(cycle)}`} className={styles.veil} aria-hidden="true" />
    </div>
  );
}
