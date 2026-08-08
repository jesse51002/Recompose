// A byte-for-byte sibling of ../../../Studio/src/widgets/useElementSize.ts,
// duplicated rather than imported.
//
// THE ISLAND RULE (see ../../CLAUDE.md) is why: this package may import from
// `recompose-react` and from itself, and from nothing else. Reaching into the
// studio for a hook would put a dependency on admin chrome inside the surface a
// design agent rewrites freely — exactly the edge that rule exists to forbid.
// `../apps/combatden/cx.ts` is duplicated for the same reason and has been since
// before the package split.
//
// The measurement itself: CSS cannot express a contain-fit inside an arbitrary
// box, because `aspect-ratio` + `max-height` does not re-derive the WIDTH when
// the height is the binding constraint — only a size derived FROM the ratio
// does. So the box is measured with a ResizeObserver and the scale is computed
// in JS. ./MockAssetStage.tsx is this package's only caller.

import { useCallback, useState } from 'react';

export interface ElementSize {
  readonly width: number;
  readonly height: number;
}

const ZERO: ElementSize = Object.freeze({ width: 0, height: 0 });

/**
 * Returns a ref callback to attach to the element, and its current content box.
 *
 * `initial` is what is reported for the single frame before the first
 * measurement lands. It defaults to zero — the narrowest sensible layout, never
 * a guess at a wide one — and the real measurement replaces it on the first
 * commit.
 */
export function useElementSize<T extends Element>(
  initial: ElementSize = ZERO,
): [(node: T | null) => void, ElementSize] {
  const [size, setSize] = useState<ElementSize>(initial);

  // A ref callback, not an effect + a ref read: writing to (or reading) a ref
  // during render is forbidden by the React Compiler lint rules this package
  // runs under, and the ref callback fires at commit with the node in hand.
  const measureRef = useCallback((node: T | null) => {
    if (node === null) return;
    const apply = (width: number, height: number) => {
      // Same reference when nothing moved, so a resize that does not change the
      // box never costs a render.
      setSize((current) =>
        current.width === width && current.height === height ? current : { width, height },
      );
    };
    const box = node.getBoundingClientRect();
    apply(box.width, box.height);
    // jsdom (the test environment) has no ResizeObserver; one measurement is
    // the correct degradation there, not a crash.
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) apply(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [measureRef, size];
}
