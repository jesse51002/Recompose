// THE POST-RESERVATION CONFIRMATION — the member app's `ClassBookedScreen`,
// billed.
//
// NOT the class detail page. Both port out of the Dart's single
// `features/class_booking/` folder and both have "booking" in their name, which
// is the confusion the app's own skill warns about: `./classdetail/` is the page
// carrying the Reserve action, and THIS is the celebration that action pushes
// (`AppRoutes.reservingLoading`). Reshaping it into a detail page would delete
// the looping entrance the asset relies on.
//
// ---------------------------------------------------------------------------
// THE ARRANGEMENT IS THE BRIEF'S BILLED REGISTER, APPLIED TO ONE WORK
// ---------------------------------------------------------------------------
//
// ../layout_brief.yaml: the first work on a bill gets its picture at the
// picture's own proportion "with the satin field carried underneath it as a
// plinth rather than beside it, the name larger there than anywhere else on the
// screen." That is already the shape of a confirmation — one work, announced —
// so this screen is that register with nothing else on it: the still life
// mounted on the cream ground with clear air around it, and the headline
// knocked out of a full-bleed satin plinth carried beneath it.
//
// THE TWO ARE ONE OBJECT, WHICH IS WHY THE MARK SITS LOW ON THE SHEET. A
// confirmation carries three elements and no list, so the only thing holding it
// together is where the air goes: the still life is biased down the cream
// ground until the gap beneath it is about half the gap above, which reads as
// mounted OVER the announcement rather than floating in a void of its own. The
// stylesheet's `.stage` carries the reasoning and what was tried instead.
//
// WHY THE HEADLINE LEADS AND THE PICTURE SUPPORTS. Everywhere else in this app a
// name and its photograph are ONE object at rank 1 — the class, the reward, the
// film. Here the emphasis ranking splits them deliberately: rank 1 is the
// confirmation, rank 2 the Continue, and the hero image only supports. So the
// plinth is the heaviest thing on the screen (a full-width field of satin
// holding nothing but the headline), and the still life is sized to be looked at
// rather than to compete with it. A larger picture here would win the eye and
// invert the ranking, which is Guardrail 14's exact failure.
//
// THE HERO IS AN INSIGNIA, SO IT IS CONTAINED. `celebration_image` is a composed
// still life cut out on transparency and it is NOT square — the bundled art
// measures 0.92 — so it is scaled to fit inside its box with the remainder left
// empty, never cropped to one. `./shell/Insignia.tsx` is where that rule lives;
// the opposite rule (a photograph gets a box of its own ratio) belongs to
// `./shell/Panel.tsx` and the two are not interchangeable.
//
// ---------------------------------------------------------------------------
// THE ENTRANCE, AND THE TAP RULE THAT OUTRANKS IT
// ---------------------------------------------------------------------------
//
// One phrase in three beats, every duration from ./shell/phrase.ts so this
// screen shares a clock with the rest of the fork: the still life settles, then
// the plinth opens downward and the field passing over the type is what puts the
// headline on screen, then the action opens beneath it the same way. One curve,
// one direction, nothing bouncing.
//
// AND THE CONTINUE IS LIVE FROM THE FIRST FRAME. It is the ONLY way off this
// screen — booking carries no foot nav, exactly as the member app's does not —
// and it has been unreachable here twice over: once drawn with no handler at
// all, once behind a `pointer-events: none` that had outlived its reason. So its
// arrival is a VEIL and never a clip, a disable or an `IgnorePointer`: a sheet
// of the cream ground lies over the band and retracts off it, and the sheet
// itself is `pointer-events: none` so it can never intercept the tap it is
// covering. The brief states that as a rule that outranks the motion, and this
// is the screen it was written for.
//
// ---------------------------------------------------------------------------
// THE LOOP, AND WHY `onCycleComplete` IS NOT A SETTLE CALLBACK
// ---------------------------------------------------------------------------
//
// `loop` is true when this screen is previewed on its own; the interval re-keys
// the body so every CSS entrance replays, which is what Dart's `_cycle` does
// with a `KeyedSubtree`. Inside the app asset ./appAsset.tsx renders it with
// `loop={false}`, so nothing is armed and the screen holds where it landed until
// the member taps.
//
// `onCycleComplete` fires when a full cycle has PLAYED, and that distinction is
// load-bearing here in a way it is nowhere else. Guardrail 5 says a card's
// settle callback must fire before any early return — but the route wires this
// one to `nav.reset(ROUTE_HOME)`, so firing it on settle would throw the member
// off the screen a second after they arrived. The dead end Guardrail 5 exists to
// prevent is closed here by a different mechanism instead: the action is
// hit-testable from the first frame, so there is no state in which this screen
// cannot be left.

import { useEffect, useState } from 'react';
import { ThemedImage, useThemeText } from 'recompose-react';

import { useMockNav } from '../../kit/MockNav';

import { ROUTE_HOME } from './appAsset';
import styles from './BookingShowcase.module.css';
import { cx } from './cx';
import { ActionBand } from './shell/ActionBand';
import { INSIGNIA_ART_CLASS, Insignia } from './shell/Insignia';
import { HOLD_MS, SETTLE_MS, WIPE_MS } from './shell/phrase';
import { Screen } from './shell/Screen';
import { showcaseAsset } from './showcaseAssets';
import { SLOT_CELEBRATION_IMAGE, SLOT_CLASS_BOOKED_HEADLINE } from './showcaseSlots';
import { showcaseStyle } from './showcaseTokens';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * The edge of the box the still life is CONTAINED in.
 *
 * Deliberately smaller than the picture on any browsing screen. The hero here is
 * the supporting element, and a still life much past this ties with the plinth
 * for the eye — which, per Guardrail 14, means rank 1 is not winning. The art is
 * 0.92, so this renders it about 198 wide inside its own transparent margin: an
 * object at rest on a sheet, not a picture competing with a field.
 */
const HERO_BOX = 216;

/**
 * The three beats of the phrase, as the delays the stylesheet reads.
 *
 * `--bk-*` and not `--sc-*` / `--sp-*`: those two namespaces are swept against
 * ./showcaseTokens.ts and ./shell/phrase.ts respectively, and a screen-local
 * value that appeared in neither would read as an invented token. These are
 * written inline by this component, so the `.module.css` restates no timing of
 * its own — every number below comes off the shared clock.
 *
 * A module constant: none of it depends on the theme or on a render.
 */
const MOTION_VARS = showcaseStyle({
  // The plinth opens once the still life has come to rest.
  '--bk-plinth-delay': `${String(SETTLE_MS)}ms`,
  // The action opens once the card has finished saying what it came to say.
  '--bk-action-delay': `${String(SETTLE_MS + WIPE_MS)}ms`,
});

/**
 * One full loop: the settle, both wipes, then the hold.
 *
 * Derived rather than restated, so slowing the celebration down later moves the
 * loop with it instead of clipping the last beat off. `HOLD_MS` is the REPLAY
 * concern and appears only here — a card must never wait one out before
 * reporting that it settled.
 */
const CYCLE_MS = SETTLE_MS + WIPE_MS * 2 + HOLD_MS;

export interface BookingShowcaseProps {
  loop?: boolean;
  onCycleComplete?: (() => void) | undefined;
}

export function BookingShowcase({ loop = true, onCycleComplete }: BookingShowcaseProps) {
  const nav = useMockNav();
  const reduceMotion = usePrefersReducedMotion();
  // Re-keys the body so every CSS entrance replays — Dart's `_cycle`.
  const [cycle, setCycle] = useState(0);
  // THE FALLBACK IS THIS BRAND'S OWN WORDS, not the base's generic label.
  //
  // The slot still wins whenever a theme is loaded; this is only what renders
  // when none is — which, in the dev harness, is always, so it is what a
  // reviewer actually reads. The run resolved `class_booked_headline` to
  // "You're in", and the wins card's two copy slots already carry the run's
  // wording as their fallbacks for the same reason. Leaving this one on the
  // base's "Class Booked" made one screen speak in the brand's voice and the
  // next one in the platform's.
  const headline = useThemeText(SLOT_CLASS_BOOKED_HEADLINE, 'You’re in');

  useEffect(() => {
    // A member who asked for less motion still gets the whole confirmation, just
    // not the travel — so the timer is never armed and the screen renders its
    // settled state directly (see the stylesheet's reduced-motion block).
    if (!loop || reduceMotion) return;
    const id = window.setInterval(() => {
      onCycleComplete?.();
      setCycle((current) => current + 1);
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [loop, reduceMotion, onCycleComplete]);

  return (
    // No head and no foot: this screen carries neither the masthead nor the four
    // destinations, which is the member app's own arrangement for it. `Screen`
    // supplies the status inset in the masthead's absence.
    <Screen>
      <div key={cycle} className={styles.screen} style={MOTION_VARS}>
        <div className={styles.stage}>
          <Insignia
            size={HERO_BOX}
            settling
            art={
              <ThemedImage
                className={INSIGNIA_ART_CLASS}
                slot={SLOT_CELEBRATION_IMAGE}
                fallbackSrc={showcaseAsset('class_booked_celebration.png')}
                alt=""
              />
            }
          />
        </div>

        {/*
          THE PLINTH. The headline is already in place under the veil, so the
          satin passing over the type is what puts it on screen — one gesture,
          one element, no per-word delay curve to keep in sync.
        */}
        <div className={styles.plinth}>
          <p className={styles.headline}>{headline}</p>
          <span className={cx(styles.veil, styles.veilPlinth)} aria-hidden="true" />
        </div>

        <div className={styles.action}>
          <ActionBand
            label="Continue"
            onPress={() => {
              // reset, not back: booking is the END of the reserve flow, so it
              // returns to the schedule rather than back through the class
              // detail the member has just finished with — which would leave
              // them one tap from reserving the same class twice. The route id
              // is imported rather than threaded down as a callback (Guardrail
              // 6) and named explicitly rather than left to `reset()`'s default,
              // because a host that deep-links this screen once made that
              // default resolve to `booking` itself.
              nav.reset(ROUTE_HOME);
            }}
          />
          <span className={cx(styles.veil, styles.veilAction)} aria-hidden="true" />
        </div>
      </div>
    </Screen>
  );
}
