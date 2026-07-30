// CELEBRATION CARD 5 — TODAY'S WORK, and the last card in the flow.
//
// WHAT THIS CARD IS ABOUT, AND WHY THAT IS UNUSUAL HERE. On the other four
// cards the subject is a thing the member earned — a streak, a rank, a points
// total, a reward — so the card's own figure or its own object leads. On this
// one the subject is what the studio SAYS: `wins_title` and `wins_subtitle` are
// the only tenant-authored sentences in the whole celebration flow, and the
// emphasis ranking puts the title copy at rank 1, the three stat values at rank
// 2, their labels at rank 3, and the trophy and its burst in SUPPORT. That
// order is a property of the product and may not be reordered — so this card is
// built around a line of copy rather than around its picture.
//
// THE COPY LEADS BY POSITION AND BY A CHANGE OF FIELD, BECAUSE IT CANNOT LEAD
// BY SIZE. The display serif tops out at 30px on this token surface, so no line
// of type here can out-MEASURE a picture, and a card that tried would just have
// two things tying for the eye — which Guardrail 14 says means rank 1 is not
// winning. So the announcement takes the two levers that are left. It is struck
// on a PLINTH — a full-bleed band of the raised cream sheet cut straight out of
// the satin, the only inversion on the card — and that plinth sits at the HEAD,
// where a bill announces what is being given before it lists anything. The
// member reads it first, the veil uncovers it first, and the still life below
// then reads as the illustration of a claim already made rather than as the
// claim.
//
// This card was built once with the plinth in the middle, and that is what this
// pass corrects: a satin / cream / satin sandwich put a 230px still life in the
// first 55% of the screen with a line of type underneath it, so the object won
// the eye outright and the announcement arrived second in both space and time.
//
// WHAT IS LEFT IS THE SKELETON ITS THREE SIBLINGS ALREADY STAND ON — a satin
// field edge to edge, a focal mount centred in everything above the foot, and a
// ruled entry pinned to that foot (./RankShowcase.tsx, ./PointsShowcase.tsx,
// ./StatsShowcase.tsx). Five cards that look alike is a requirement of the
// brief, so this card differs from its siblings by exactly the one thing that
// makes it different — the studio's own sentence, given its own field at the
// head — and by nothing else.
//
// THE FIGURES ARE A TALLY, NOT THE SUBJECT. `--sc-type-figure-*` — the serif
// rungs — belong to a card whose whole subject IS a number (the streak's week
// count, the points gained). Here the three values are rank 2, so they take the
// largest rung the body SANS has in its REGULAR cut, exactly as ./RankShowcase
// does and for the reason it gives: the bold cut of the same rung ties with the
// name above it, and a tie means rank 1 is not winning. This is the card where
// that would be easiest to get backwards, because three figures in a row
// photograph beautifully at size — which is precisely the habit Guardrail 14
// warns about.
//
// NEVER FROM `mock_stats.dart`. The tiles come from
// ./celebrations/showcaseCelebrationStats.ts, which mirrors the member app's
// `buildWinsStats`. The dormant `mockWinsStats` constant it was once copied
// from carries a "Rank Classes" tile the app deleted.
//
// NO `Screen` AND NO `CelebrationFrame`, for ./PointsShowcase.tsx's and
// ./RankShowcase.tsx's two reasons, both of which are correctness rather than
// taste. The satin field is "the ground of every celebration card"
// (./layout_brief.yaml), so a scaffold that painted a second ground underneath
// it or RESERVED A STATUS STRIP ABOVE IT would break the one thing this card is
// — and `Screen` reserves exactly that strip whenever the host publishes
// `--phone-status-inset` (the studio's phone frame publishes 52px), which put a
// cream band across the top of this card in the one host a reviewer sees it in.
// And the tap that finishes the card has to be heard across the WHOLE card, so
// the element carrying `bind` is the element that fills the box.
//
// THE CTA IS THE ONE THAT DOES NOT SAY "DONE". ./celebrationAsset.tsx passes
// this card the themed `book_next_class_cta` label, because a card whose whole
// reason to exist is the nudge cannot end on "Done". Nothing here touches it.

import { useEffect, useState } from 'react';
import { ThemedImage, useThemeText } from 'recompose-react';

import { SparkleBurst } from './celebrations/SparkleBurst';
import { SHOWCASE_WINS_STATS } from './celebrations/showcaseCelebrationStats';
import { WinsTileRow } from './celebrations/WinsTileRow';
import { cx } from './cx';
import { INSIGNIA_ART_CLASS, Insignia } from './shell/Insignia';
import { ARRIVE_MS, COUNT_MS, HOLD_MS, SETTLE_MS, STAGGER_MS, WIPE_MS } from './shell/phrase';
import { useTapToSettle } from './shell/useTapToSettle';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_TROPHY_IMAGE, SLOT_WINS_SUBTITLE, SLOT_WINS_TITLE } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import styles from './WinsShowcase.module.css';

/**
 * The edge of the box the trophy is CONTAINED in.
 *
 * The still life measures **1.044** — near square but not square — and it is a
 * cut-out carrying its own transparent margin, so it is scaled to fit INSIDE
 * this box and the remainder stays empty. No letterbox shows, because there is
 * no opaque edge to show one. That is the rule for an insignia and it is the
 * opposite of the rule for a photograph; the two are never interchangeable
 * (Guardrail 10b, ./layout_brief.yaml).
 *
 * THE NUMBER IS A HIERARCHY DECISION, and the two marks already in this flow
 * are the scale it is read against: ./RankShowcase mounts its belt at 280
 * because the belt IS rank 1 there, and ./StatsShowcase its streak mark at 140
 * because that mark is rank 2. The trophy is neither — the ranking files it
 * under SUPPORTING — so it sits between them and nearer the bottom.
 *
 * 230 was tried and is what this pass corrects: it covered about the same area
 * as the whole announcement, and a tie means rank 1 is not winning
 * (Guardrail 14). 180 leaves the plinth the larger field, and with the plinth
 * moved to the head the mark no longer has to lose on area alone — it is read
 * second because it is encountered second. Going further down was worse rather
 * than safer: below about 160 the still life is marooned in the middle of the
 * only stretch of clear satin on the card and reads as an afterthought, which
 * buys the announcement nothing it has not already won.
 */
const TROPHY_BOX_PX = 180;

// ---------------------------------------------------------------------------
// THE PHRASE, as one ladder.
//
// Every delay below is a sum of ./shell/phrase.ts constants, so slowing the
// fork slows the card and nothing here has to be re-derived by hand. Two beats
// are deliberately NOT drawn from the celebration clock: the field opens at
// `WIPE_MS`, because the satin opens at that speed everywhere in this app, and
// the burst is pinned to `IMPACT_MS` inside ./celebrations/sparkleGeometry.ts.
// ---------------------------------------------------------------------------

/** The announcement arrives the moment the field has finished opening. */
const TITLE_DELAY_MS = WIPE_MS;
/** Its second line, a beat behind the line it belongs to. */
const SUBTITLE_DELAY_MS = WIPE_MS + STAGGER_MS * 2;
/**
 * The tally begins printing once the announcement has LANDED, not when it
 * started — the same relationship the member app's own arithmetic has
 * (`tileBaseDelay = subtitleDelay + reveal`), expressed in this fork's clock.
 */
const TILE_BASE_DELAY_MS = SUBTITLE_DELAY_MS + ARRIVE_MS;
/**
 * THE BURST IS THE TROPHY LANDING, so it fires when the trophy comes to rest.
 *
 * Guardrail 16's second half: a hit is FELT, not read. The arrival is unhurried
 * (`--sp-settle`, on <Insignia>) and the hit that punctuates it is not — it
 * runs for `IMPACT_MS` and is pinned there rather than derived from this
 * ladder, so slowing the celebration later cannot stretch an explosion into a
 * waft.
 */
const BURST_DELAY_MS = SETTLE_MS;

/**
 * WHEN THE LOOP CLOSES, WHICH IS WHEN THE CARD HAS SAID WHAT IT CAME TO SAY.
 *
 * "A card settles when its figure lands and its object stops, never when a
 * timer expires" (./layout_brief.yaml). The object stops at `SETTLE_MS`, the
 * burst ends at `SETTLE_MS + IMPACT_MS`, the last cell of the tally lands at
 * `TILE_BASE_DELAY_MS + CASCADE_MS`, and the three figures resolve together one
 * `COUNT_MS` after the tally starts — which is the last event on the card, so
 * it is the card's clock.
 *
 * NOT `HOLD_MS`. The hold is a REPLAY concern that exists only when this card
 * runs standalone; conflating the two is what left `apps/vinyasaflow/`'s five
 * look-alike cards revealing their action at 0.76s, 4.3s, 8.9s, 2.6s and 3.2s.
 */
const LOOP_CLOSE_MS = TILE_BASE_DELAY_MS + COUNT_MS;

/**
 * The two delays the stylesheet reads. The tally's beats belong to the tally
 * and go to <WinsTileRow> as a prop, so this object stays two entries rather
 * than a second copy of the ladder above.
 */
const WINS_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--wn-title-delay': `${String(TITLE_DELAY_MS)}ms`,
  '--wn-subtitle-delay': `${String(SUBTITLE_DELAY_MS)}ms`,
});

export interface WinsShowcaseProps {
  /** Replay forever. Off inside the celebration flow, which advances instead. */
  loop?: boolean;
  /** Fired when the entrance has finished and the card is settled. */
  onCycleComplete?: (() => void) | undefined;
}

export function WinsShowcase({ loop = true, onCycleComplete }: WinsShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  // A tap finishes the card outright — ./shell/useTapToSettle.ts.
  const { settled, bind } = useTapToSettle();
  const [cycle, setCycle] = useState(0);

  // THE CALLBACK FIRES BEFORE EVERY GUARD (Guardrail 5). This card was the
  // island's worst offender in both directions: it returned early under
  // `loop={false}` — which is exactly how the flow renders it — and it fired
  // the callback on MOUNT rather than on loop close, so the flow's action
  // appeared at t=0 on a card that had not started moving. Both are the same
  // bug wearing different clothes: the settle is a property of the ANIMATION
  // finishing, not of the props.
  useEffect(() => {
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    const close = window.setTimeout(() => {
      onCycleComplete?.();
    }, LOOP_CLOSE_MS);
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
    }, LOOP_CLOSE_MS + HOLD_MS);
    return () => {
      window.clearTimeout(replay);
    };
  }, [cycle, loop, reduceMotion, settled]);

  // A per-frame driver has no keyframe for `.finished` to fast-forward, so each
  // tally figure is handed over in ./celebrations/WinsTile.tsx's own branch:
  // the reel is replaced by the value it was rolling towards. Tabular figures
  // on both sides of the swap mean the digit cell is the same width either way.
  const landed = settled || reduceMotion;

  return (
    <div className={cx(styles.card, settled && styles.finished)} {...bind}>
      {/*
        The field is a CHILD rather than the root so it can stop short of the
        action band below — the stylesheet says why that is not optional. The
        card itself paints the cream, so the strip the field leaves clear has
        something to be.
      */}
      <div className={styles.field} style={showcaseStyle(WINS_VARS)}>
        <WinsBands key={cycle} landed={landed} />
      </div>

      {/*
        THE SATIN ARRIVES FIRST AND EVERYTHING IS REVEALED BY IT. A sheet of the
        cream ground lying over the whole card and retracting downward off it,
        so the field's own leading edge is what puts the plinth, then the
        trophy, then the tally on screen — one gesture, one element, no
        per-region delay curve to keep in sync, and the order it uncovers them
        in is the order the emphasis ranking puts them in. It is the sheet-music
        cream and the plinth is the RAISED cream, so the retreat turns the lower
        two thirds to satin and leaves the head standing a shade lighter than
        the sheet that was covering it — which is what makes the inversion read
        as the field it is rather than as a second entrance. `pointer-events:
        none`, because it lies over the scaffold's tap-to-skip target and a
        covering may never intercept a tap.
      */}
      <span key={cycle} className={styles.veil} aria-hidden="true" />
    </div>
  );
}

/**
 * The card's three bands, in the order the eye takes them: the announcement on
 * its plinth at the head, the trophy centred in everything the foot does not
 * take, and the tally printed along that foot.
 *
 * A fragment rather than a wrapper, so the three are the FIELD's own flex
 * children — an extra box between them and the field would have to restate the
 * column and would give the crest a second thing to stretch against.
 */
function WinsBands({ landed }: { landed: boolean }) {
  const stats = SHOWCASE_WINS_STATS;
  // The only two tenant-authored sentences in the whole celebration flow. The
  // fallbacks are the produced run's own resolved values, for the reason
  // ./showcaseTokens.ts gives about its fallback palette: the harness opens
  // UNTHEMED, so a fallback is what a reviewer actually judges.
  const title = useThemeText(SLOT_WINS_TITLE, stats.title);
  const subtitle = useThemeText(SLOT_WINS_SUBTITLE, stats.subtitle);

  return (
    <>
      {/*
        THE PLINTH — rank 1, and it is at the HEAD because that is where a bill
        announces. The sentence struck on the raised cream sheet cut out of the
        satin, full bleed and square, because nothing in this app floats above
        anything and separation is a change of field.
      */}
      <div className={styles.plinth}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/*
        THE FIELD. The insignia mounted centred on satin with clear air around
        it — never framed, never bordered, never inset into a container, never
        laid under type. It carries no caption because the thing it stands for
        has already been announced above it, at a size an <Insignia> caption
        could not hold.
      */}
      <div className={styles.crest}>
        <SparkleBurst className={styles.burst} delayMs={BURST_DELAY_MS} />
        <Insignia
          className={styles.trophy}
          art={
            <ThemedImage
              className={INSIGNIA_ART_CLASS}
              slot={SLOT_TROPHY_IMAGE}
              fallbackSrc={showcaseAsset(stats.heroAsset)}
              alt=""
            />
          }
          size={TROPHY_BOX_PX}
          settling
        />
      </div>

      {/* THE TALLY, printed along the foot of the bill. */}
      <WinsTileRow
        className={styles.tally}
        tiles={stats.tiles}
        baseDelayMs={TILE_BASE_DELAY_MS}
        settled={landed}
      />
    </>
  );
}
