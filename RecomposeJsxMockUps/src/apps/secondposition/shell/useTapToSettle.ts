// A TAP FINISHES THE CARD — the rule that outranks the motion.
//
// ../layout_brief.yaml: "A tap anywhere on a card still in motion finishes it
// outright: the figure lands on its value, the object reaches its resting
// place, the action appears — the card COMPLETES rather than merely revealing
// its button."
//
// ../celebrationAsset.tsx's scaffold already does half of that: a tap on an
// unsettled card calls `markDone`, so the action appears at once and no card
// can be a dead end. What the scaffold cannot do is tell the CARD, because the
// callback runs the other way — so without this hook a card keeps animating
// underneath an action that has announced it settled. That is the card
// contradicting itself, and it reads as a bug rather than as a design.
//
// So each card listens for the same tap itself. `pointerdown` and not `click`:
// the member has committed by then, and waiting for the release puts ~100ms of
// nothing between the touch and the finish on exactly the surface meant to feel
// unhurried rather than unresponsive. `Capture`, so a child that stops
// propagation cannot swallow it.
//
// WHAT A CARD DOES WITH IT is one CSS class — see `.finished` in each card's
// stylesheet, whose whole body is `animation-delay: -30s !important` on the
// card and its subtree. Every CSS animation runs past its end and holds its own
// final frame, so no file has to restate what "settled" looks like. A per-frame
// driver has no keyframe to fast-forward and is handed over by its own
// component's branch instead.

import { useCallback, useState } from 'react';

export interface TapToSettle {
  /** True once the member has tapped. Never goes back to false. */
  readonly settled: boolean;
  /** Spread onto the card's ROOT element. */
  readonly bind: { readonly onPointerDownCapture: () => void };
}

export function useTapToSettle(): TapToSettle {
  const [settled, setSettled] = useState(false);
  const onPointerDownCapture = useCallback(() => {
    setSettled(true);
  }, []);
  return { settled, bind: { onPointerDownCapture } };
}
