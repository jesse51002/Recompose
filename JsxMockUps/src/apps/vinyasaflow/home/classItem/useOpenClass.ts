// Opening a class, from wherever the affordance is.
//
// GUARDRAIL 6: a tap target imports its own route id and calls `useMockNav()`
// where the affordance is, rather than receiving a callback threaded down
// through the layout. A callback chain through five layers is exactly the prop
// plumbing a design agent breaks when it rearranges a screen; an imported
// constant is not.
//
// It is a hook rather than duplicated in both treatments because the two are
// the SAME affordance at two sizes, and the thing they must agree on is the
// order of the two calls: the content provider is told which class was opened
// BEFORE the push, so the detail screen mounts already holding it. Split across
// two files that is a rule someone has to remember; here it is one line.
//
// The class is carried across BY NAME rather than by object or index, because
// the board repeats the resolved four-class list across the week
// (../homeScheduleGenerator.ts) — a row's position in the schedule is not a
// position in `classes`.

import { useMockNav } from '../../../../kit/MockNav';
import { ROUTE_CLASS } from '../../appAsset';
import { useAppContent } from '../../appContent';

/** Returns the handler a schedule row fires when it is tapped. */
export function useOpenClass(name: string): () => void {
  const nav = useMockNav();
  const { openClassNamed } = useAppContent();
  return () => {
    openClassNamed(name);
    nav.go(ROUTE_CLASS);
  };
}
