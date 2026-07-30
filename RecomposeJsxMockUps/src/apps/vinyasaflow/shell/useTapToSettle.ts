// A TAP FINISHES THE CARD. The rule that outranks the motion, in six lines.
//
// ../layout_brief.yaml: "Interaction is never held hostage to any of this. A
// tap on any still-drawing celebration card completes the loop immediately and
// settles it… A member standing in a studio doorway with their phone out is
// never made to wait for a nicety."
//
// ../celebrationAsset.tsx's scaffold already does HALF of that: a tap anywhere
// on an unsettled card calls `markDone`, so the action appears at once and no
// card can ever be a dead end. What it cannot do is tell the CARD, because the
// callback runs the other way — so before this hook the line kept drawing
// underneath a card that had already announced itself as settled. That is the
// card contradicting itself, and it reads as a bug rather than as a design.
//
// So each card listens for the same tap itself. `pointerdown` and not `click`:
// the member has committed by then, and waiting for the release puts ~100ms of
// nothing between the touch and the finish on exactly the surface that is
// supposed to feel unhurried rather than unresponsive. It is `Capture` so a
// child that stops propagation cannot swallow it.
//
// WHAT A CARD DOES WITH IT is one CSS class plus, where the card branches its
// own timeline in JS, one term in that branch. See `.settled` in each card's
// stylesheet: `animation-delay: -30s` runs every CSS animation in the subtree
// past its end, so each lands on its own final frame — which is the settled
// card, exactly, without any file restating what "settled" looks like.

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
