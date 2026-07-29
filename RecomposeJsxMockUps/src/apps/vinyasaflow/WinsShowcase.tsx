// THE WINS CARD — the 5th and last of the post-class celebration cards, and the
// one where this app's thread finishes.
//
// Everywhere else the line enters at the brand mark and leaves through the
// bottom edge without ever completing. Here it draws itself AROUND the wreath,
// comes round, meets itself — and then drops out of the bottom of that loop and
// spreads sideways through the three wins and off both edges, into the action
// waiting beneath. One continuous drawing, top to bottom, which is what the
// brief means by a card being "a single held shape" (./layout_brief.yaml).
//
// THE HERO IS A WREATH, SO IT LIVES IN A RING. `trophy_image` is generated for
// this run as two eucalyptus branches closed into a laurel around a river stone
// — a circle already, and the one form this design draws everything from. The
// closing loop is therefore not an ornament laid over it; it is the same shape
// stated twice, which is exactly how the brand mark is built (one continuous
// stroke, looping, enclosed by a circle).
//
// AND IT IS NOT IN A DISC. `<MintedDisc>` would be the obvious shell component
// and it is the wrong one: it sets width AND height, and this art measures 1.29
// rather than the 1.00 that component's own header requires — a square box would
// clip the ribbon curls at their widest. So the wreath is given a WIDTH and
// nothing else, and its height is whatever its own proportion makes it, which is
// the rule ./shell/Photo.tsx enforces structurally for every other picture in
// the app (Guardrail 10b).
//
// WHAT WAS A ROW OF BORDERED TILES is now three circles on the thread, each with
// its spoken label and its figure — see ./celebrations/WinsTile.tsx. Every
// element the card carried is still on it: the hero, the burst around it, both
// themed copy slots, and all three wins with their icons, values and labels.
//
// THE COPY IS THE TENANT'S. `wins_title` and `wins_subtitle` are the only themed
// strings on any celebration card, read here through <useThemeText>; the
// constants behind them in ./celebrations/showcaseCelebrationStats.ts are
// fallbacks for an unthemed harness, not the content.
//
// HOW IT ANIMATES. Everything is CSS keyframes over fixed endpoints — the loop
// draws by subtraction (see the stylesheet), the bloom opens petal by petal as
// the stroke passes each one, the stem and strand draw, and each win arrives as
// the line reaches it. The only JS is the loop: one interval bumping a counter
// that re-keys the body, which is what makes the CSS animations replay. The
// count-up inside a win is the one driver-backed motion; see
// ./celebrations/CountUpText.tsx for why.

import { useEffect, useState } from 'react';
import { ThemedImage, useThemeText } from 'recompose-react';

import { CelebrationFrame } from './celebrations/CelebrationFrame';
import { SparkleBurst } from './celebrations/SparkleBurst';
import { SHOWCASE_WINS_STATS } from './celebrations/showcaseCelebrationStats';
import { WINS_SETTLE_MS } from './celebrations/WinsTile';
import { WINS_STEM_MS, WinsTileRow } from './celebrations/WinsTileRow';
import { Title } from './shell/Figure';
import { Loop } from './shell/Thread';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_TROPHY_IMAGE, SLOT_WINS_SUBTITLE, SLOT_WINS_TITLE } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import styles from './WinsShowcase.module.css';

/**
 * The closing loop, and the wreath inside it.
 *
 * Numbers rather than tokens because both are COMPONENT PROPS: `<Loop>` is sized
 * by its caller in logical px (a ring that does not fit its hero is worse than
 * no ring), and the wreath is sized on its one given axis. The 36px of canvas
 * between them is what keeps the stroke reading as a separate line rather than
 * as the wreath's own rim.
 */
const LOOP_SIZE = 300;
const WREATH_WIDTH = 228;

/** `_kWinsHold` — how long the finished recap holds before the celebration replays. */
export const WINS_HOLD_MS = 3200;

/**
 * The headings are named FIRST, before the line reaches the wreath, because the
 * stroke travels top to bottom through this card as it does through every other
 * screen. One beat between them; nothing here is a per-element delay curve.
 */
export const HEADER_DELAY_MS = 0;
export const SUBTITLE_DELAY_MS = 140;

/** When the stroke arrives at the loop and starts round it. */
const LOOP_DELAY_MS = 200;

/**
 * How long the line takes to travel once round the wreath.
 *
 * The brief's tempo is literal — a breath, soft at BOTH ends, about three
 * quarters of a second for a full screen to draw. The sweep is split across two
 * half-circles (see the stylesheet), so each half runs for `DRAW_MS / 2`: the
 * first on an ease-IN sine and the second on an ease-OUT sine, which recompose
 * into one ease-in-out across the whole circle and therefore do not stall where
 * they meet.
 */
const DRAW_MS = 800;

/**
 * `tileBaseDelay` — when the strand starts opening.
 *
 * Derived, not restated: the loop closes, the stem drops out of it, and only
 * then does the line spread sideways. Change any term above and the wins move
 * with it.
 */
export const TILE_BASE_DELAY_MS = LOOP_DELAY_MS + DRAW_MS + WINS_STEM_MS;

/**
 * The motion and geometry the stylesheet reads. Derived from the constants above
 * and from ./celebrations/WinsTile.tsx's settle, so nothing is a literal there.
 * A module constant, because none of it depends on the theme or on a render.
 */
const MOTION_VARS: Readonly<Record<string, string>> = Object.freeze({
  '--wn-wreath-width': `${String(WREATH_WIDTH)}px`,
  '--wn-settle-ms': `${String(WINS_SETTLE_MS)}ms`,
  '--wn-header-delay-ms': `${String(HEADER_DELAY_MS)}ms`,
  '--wn-subtitle-delay-ms': `${String(SUBTITLE_DELAY_MS)}ms`,
  '--wn-loop-delay-ms': `${String(LOOP_DELAY_MS)}ms`,
  '--wn-draw-half-ms': `${String(DRAW_MS / 2)}ms`,
  '--wn-draw-second-half-delay-ms': `${String(LOOP_DELAY_MS + DRAW_MS / 2)}ms`,
});

export interface WinsShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function WinsShowcase({ loop = true, onCycleComplete }: WinsShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  // Re-keys the body so every CSS entrance replays — Dart's `_cycle`.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Settle FIRST, then decide whether to keep looping. The guard used to sit
    // above this, so a card rendered with `loop={false}` — which is exactly how
    // the celebration flow renders it — never reported settling and its CTA
    // stayed hidden forever. The sibling cards all fire the callback ahead of
    // their own guard for this reason.
    if (!loop) {
      onCycleComplete?.();
      return;
    }
    if (reduceMotion) {
      onCycleComplete?.();
      return;
    }
    const id = window.setInterval(() => {
      onCycleComplete?.();
      setCycle((current) => current + 1);
    }, WINS_HOLD_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [loop, reduceMotion, onCycleComplete]);

  return (
    // The recap's arrangement — `PostClassScaffold`, resolved from the tenant's
    // `celebration_format` (./celebrations/CelebrationFrame.tsx).
    <CelebrationFrame>
      <WinsContent key={cycle} />
    </CelebrationFrame>
  );
}

/** The card: what it is called, the held shape, and what was won. */
function WinsContent() {
  const stats = SHOWCASE_WINS_STATS;
  const title = useThemeText(SLOT_WINS_TITLE, stats.title);
  const subtitle = useThemeText(SLOT_WINS_SUBTITLE, stats.subtitle);

  return (
    <div className={styles.content} style={showcaseStyle(MOTION_VARS)}>
      {/*
        The one headline that names this screen, and the line beneath it. They
        are ONE object and share the tightest gap on the card; the gap to the
        held shape below is the scale's largest.
      */}
      <div className={styles.headings}>
        <Title className={styles.title}>{title}</Title>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.hero}>
        <Loop size={LOOP_SIZE}>
          {/*
            THE DRAWING OF THE LINE, and it is a subtraction rather than an
            addition: two canvas-coloured wedges start covering the ring and
            rotate off it, one half after the other, so what the eye sees is a
            terracotta stroke travelling clockwise from twelve o'clock and
            meeting itself. The wedges pass UNDER the wreath (which sits a layer
            up) and over nothing else, so the only thing they ever uncover is
            the ring.
          */}
          <span className={styles.draw} aria-hidden="true">
            <span className={styles.drawHalfRight}>
              <span className={styles.wedgeRight} />
            </span>
            <span className={styles.drawHalfLeft}>
              <span className={styles.wedgeLeft} />
            </span>
          </span>
          <span className={styles.wreath}>
            <ThemedImage
              className={styles.wreathImg}
              slot={SLOT_TROPHY_IMAGE}
              fallbackSrc={showcaseAsset(stats.heroAsset)}
              alt=""
            />
          </span>
        </Loop>
        {/*
          The bloom sits on a ring OUTSIDE the loop and opens petal by petal as
          the stroke passes each one — same start, same duration, so the two are
          one movement. Rendered after the loop so its petals are never covered
          by the sweeping wedges.
        */}
        <SparkleBurst delayMs={LOOP_DELAY_MS} windowMs={DRAW_MS} />
      </div>

      <WinsTileRow tiles={stats.tiles} baseDelayMs={TILE_BASE_DELAY_MS} />
    </div>
  );
}
