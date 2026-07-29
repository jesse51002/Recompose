// ASSET 2 — the post-class celebration flow.
//
// WHY THIS IS A SECOND ASSET. Everything in ./appAsset.tsx is reachable by
// tapping something. These five cards are not: they play after a member
// attends a class, and no button in the app leads to them. That is the only
// justification for splitting an asset, and it is the whole justification —
// anything reachable by tapping belongs in the app.
//
// THE ORDER IS THE MEMBER APP'S: streak, points, rewards, RANK, wins — the
// list `celebration_flow.dart`'s `celebrationCardRoutes` returns, and what its
// own test asserts (wins last in every gym shape).
//
// `apps/combatden/app.yaml` disagrees: `rank_belt`'s description calls the rank
// card "the 2nd of five". The Dart is the authority on what the app does, so
// that slot description is the stale one — worth correcting there, but it does
// not change the order here.
//
// THE INTERACTION IS `PostClassScaffold` + `PostClassController`
// (MobileApp/lib/shared/widgets/post_class/). While a card's intro plays, the
// CTA is hidden and a tap means "skip"; once the body settles it calls
// `markDone` and the CTA appears. Continue advances, and the last card says
// Done — `celebrationCtaLabel`'s own rule.
//
// WHAT THIS DELIBERATELY DOES NOT PORT: the flow's GATES. The member app skips
// the rewards card when the gym runs no rewards and the rank card when the
// member holds no rank (`celebration_flow.dart`). A preview has no gym and no
// member, so gating here would hide a card the reviewer is meant to be judging
// — every card always plays.

import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { defineMockAsset } from '../../kit/asset';
import { useMockNav } from '../../kit/MockNav';

import { useThemeText } from 'recompose-react';

import { useAppContent } from './appContent';
import { VinyasaFlowSurface } from './VinyasaFlowSurface';
import styles from './celebrationAsset.module.css';
import { cx } from './cx';
import { PointsShowcase } from './PointsShowcase';
import { RankShowcase } from './RankShowcase';
import { RewardsCardShowcase } from './RewardsCardShowcase';
import { StatsShowcase } from './StatsShowcase';
import { SLOT_BOOK_NEXT_CLASS_CTA } from './showcaseSlots';
import { ShowcasePrimaryButton } from './support/ShowcasePrimaryButton';
import { WinsShowcase } from './WinsShowcase';

export const ROUTE_STREAK = 'streak';
export const ROUTE_RANK = 'rank';
export const ROUTE_POINTS = 'points';
export const ROUTE_REWARDS = 'rewards';
export const ROUTE_WINS = 'wins';

/** The flow, in order. The last card's CTA says Done and returns to the first. */
const FLOW: readonly string[] = Object.freeze([
  ROUTE_STREAK,
  ROUTE_POINTS,
  ROUTE_REWARDS,
  ROUTE_RANK,
  ROUTE_WINS,
]);

/** `celebrationCtaLabel` — the last card says Done, every other one Continue. */
function ctaLabel(route: string): string {
  return route === FLOW[FLOW.length - 1] ? 'Done' : 'Continue';
}

/**
 * The wins card's CTA, which is the one exception to the rule above.
 *
 * `wins_screen.dart` does NOT call `celebrationCtaLabel` — it reads the
 * `book_next_class_cta` copy slot instead, because a card whose whole reason to
 * exist is the nudge cannot end on "Done". That also makes wins the only
 * celebration card carrying a themed string, so leaving it on the generic label
 * left a tenant-facing slot unexercised on the exact surface that owns it.
 */
function useWinsCtaLabel(): string {
  return useThemeText(SLOT_BOOK_NEXT_CLASS_CTA, 'Book your next class');
}

/**
 * One card, plus the scaffold that governs it.
 *
 * `PostClassScaffold`: the body fills the screen, a tap during the intro skips
 * it, and the CTA appears only once the card is settled.
 */
function CelebrationCard({
  route,
  children,
  onSettled,
  settled,
  label,
}: {
  route: string;
  children: ReactNode;
  onSettled: () => void;
  settled: boolean;
  /** Overrides `celebrationCtaLabel` — only the wins card passes one. */
  label?: string | undefined;
}) {
  const nav = useMockNav();

  const advance = useCallback(() => {
    const next = FLOW[FLOW.indexOf(route) + 1];
    // `pushReplacementNamed`, not push: a dismissed card is not somewhere the
    // member can go back to, so the flow replaces rather than stacks. The last
    // card returns to the first, which is what makes the asset re-watchable.
    nav.replace(next ?? FLOW[0]!);
  }, [nav, route]);

  return (
    <div
      className={styles.scaffold}
      // The tap-to-skip target covers the whole card and exists ONLY while the
      // intro is playing — `PostClassController.requestSkip` is a no-op once
      // `isAnimating` is false, and a live target over a settled card would
      // swallow taps meant for the CTA beneath it.
      onClick={settled ? undefined : onSettled}
      role={settled ? undefined : 'button'}
      tabIndex={settled ? undefined : 0}
      onKeyDown={
        settled
          ? undefined
          : (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSettled();
              }
            }
      }
    >
      <div className={styles.body}>{children}</div>
      {/* Built either way so the CTA's space is reserved from the first frame:
          a button that appears and REFLOWS the card beneath it reads as the
          card twitching, not as the button arriving. */}
      <div className={cx(styles.cta, settled && styles.ctaVisible)} aria-hidden={!settled}>
        <ShowcasePrimaryButton
          text={label ?? ctaLabel(route)}
          fullWidth
          borderRadius="var(--sc-radius-big)"
          onPressed={settled ? advance : undefined}
        />
      </div>
    </div>
  );
}

/**
 * Wires one card's `loop` / `onCycleComplete` to the flow.
 *
 * Every card already exposes both — they were built to loop standalone — so
 * the flow turns looping OFF and treats the cycle-complete callback as
 * `markDone`. Nothing inside a card had to change to join the flow.
 */
function useSettle(): [boolean, () => void, () => void] {
  const [settled, setSettled] = useState(false);
  const settle = useCallback(() => {
    setSettled(true);
  }, []);
  const reset = useCallback(() => {
    setSettled(false);
  }, []);
  return [settled, settle, reset];
}

function StreakRoute() {
  const [settled, settle] = useSettle();
  return (
    <CelebrationCard route={ROUTE_STREAK} settled={settled} onSettled={settle}>
      <StatsShowcase loop={false} onCycleComplete={settle} />
    </CelebrationCard>
  );
}

function RankRoute() {
  const [settled, settle] = useSettle();
  return (
    <CelebrationCard route={ROUTE_RANK} settled={settled} onSettled={settle}>
      <RankShowcase loop={false} onCycleComplete={settle} />
    </CelebrationCard>
  );
}

function PointsRoute() {
  const [settled, settle] = useSettle();
  return (
    <CelebrationCard route={ROUTE_POINTS} settled={settled} onSettled={settle}>
      <PointsShowcase loop={false} onCycleComplete={settle} />
    </CelebrationCard>
  );
}

function RewardsRoute() {
  const [settled, settle] = useSettle();
  const { rewards } = useAppContent();
  return (
    <CelebrationCard route={ROUTE_REWARDS} settled={settled} onSettled={settle}>
      <RewardsCardShowcase rewards={rewards} loop={false} onCycleComplete={settle} />
    </CelebrationCard>
  );
}

function WinsRoute() {
  const [settled, settle] = useSettle();
  const label = useWinsCtaLabel();
  return (
    <CelebrationCard route={ROUTE_WINS} settled={settled} onSettled={settle} label={label}>
      <WinsShowcase loop={false} onCycleComplete={settle} />
    </CelebrationCard>
  );
}

export const CELEBRATION_ASSET = defineMockAsset({
  id: 'celebration',
  label: 'Celebration',
  description:
    'The post-class flow: streak, points, rewards, rank and wins. Tap to skip ' +
    'a card’s entrance, then continue through to the end.',
  width: 390,
  height: 844,
  initialRoute: ROUTE_STREAK,
  // The rewards card carousels the gym's real catalogue, so this asset needs
  // the same content ladder the app does.
  provider: VinyasaFlowSurface,
  routes: {
    [ROUTE_STREAK]: StreakRoute,
    [ROUTE_POINTS]: PointsRoute,
    [ROUTE_REWARDS]: RewardsRoute,
    [ROUTE_RANK]: RankRoute,
    [ROUTE_WINS]: WinsRoute,
  },
});
