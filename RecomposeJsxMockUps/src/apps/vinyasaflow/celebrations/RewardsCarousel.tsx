// THE SHELF OF REWARDS the thread bows sideways to gather.
//
// A cover-flow strip: the page the member is on is full size and face-on, and
// its neighbours recede and tilt away in 3D at both edges. Same behaviour the
// base had; a different object, because the base put every reward in a CIRCLE
// and this design may not.
//
// THE REWARD PHOTOGRAPHS ARE THE ONE SET THAT DOES NOT BELONG TO THIS WORLD —
// loud, saturated stock frames of a different kind of gym, handed to a studio
// whose own photography is warm linen and long horizontals. ./layout_brief.yaml
// says what to do about it and it is a LAYOUT answer, not an image one: hold
// them small, at their own ratio, with the type and the cost leading and the
// picture supporting. So they are not hidden, not recoloured, not cropped and
// not tinted — they are frames on a strip, aligned on a common HEIGHT and free
// to differ in width, with the thread running behind them.
//
// WHAT REPLACES THE `PageController`. Dart hands the carousel a controller and
// the OWNER drives it. React has no such object, so the controller's two jobs
// split: the owner keeps the integer `page` it already had and passes it as a
// prop, and the TWEEN — the thing the controller actually owned — lives here,
// where a rAF driver eases the fractional page toward the prop and writes each
// page's transform straight to its element. Every intermediate frame is
// `coverFlowTransform` of a live fractional offset rather than a browser's
// interpolation between two already-resolved matrices.
//
// A page's element is placed in a REF CALLBACK as well as by the driver.
// Advancing mounts one new page element at the far edge, and a mount is
// precisely where Dart would reach for `addPostFrameCallback`: the callback
// fires at commit with the node in hand, so the new page is already positioned
// on its first painted frame instead of flashing at the centre.
//
// NO SWIPE, AND NO SCROLL CONTAINER. Every showcase surface is a preview inside
// a phone frame and takes no input; the cover flow is also wider than its slot
// on purpose, and an `overflow` of any kind on this subtree would crop the
// thing that makes it a cover flow.

import { useEffect, useRef, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { showcaseAssetOrNetwork } from '../showcaseAssets';
import { showcaseStyle } from '../showcaseTokens';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

import { Curves } from './curves';
import styles from './RewardsCarousel.module.css';
import {
  FEATURED_HEIGHT,
  PERSPECTIVE_PX,
  SLIDE_MS,
  VIEWPORT_FRACTION,
  coverFlowTransform,
  wrapIndex,
} from './rewardsCoverFlow';
import type { ShowcaseRewardItem } from './showcaseCelebrationStats';

/**
 * How many slots either side of the active page are rendered.
 *
 * Dart's `PageView.builder` has no `itemCount` — it is infinite, and Flutter
 * builds only what the viewport needs. Two either side IS that viewport: a page
 * three slots out is off the phone's edge at every scale the cover flow
 * produces, and one advance can only ever pull one new slot into view.
 */
const WINDOW = 2;

/** The attribute the driver finds its page elements by. */
const PAGE_ATTR = 'data-carousel-page';

/**
 * `AnimatedBuilder`'s body for ONE page. Module-level because it closes over
 * nothing: the element carries its own slot number and the maths lives in
 * ./rewardsCoverFlow.ts.
 */
function placePage(element: HTMLElement, fractionalPage: number): void {
  const slot = Number(element.dataset['carouselPage']);
  const offset = slot - fractionalPage;
  const { scale, tiltRadians, depth } = coverFlowTransform(offset);
  // A page slot's own share of the viewport IS its width, so translating by a
  // percentage of itself is translating by whole slots — nothing measured.
  element.style.transform = `translateX(-50%) translateX(${String(offset * 100)}%)`;
  element.style.zIndex = String(depth);
  const frame = element.firstElementChild;
  if (frame instanceof HTMLElement) {
    frame.style.transform = `perspective(${String(PERSPECTIVE_PX)}px) rotateY(${String(tiltRadians)}rad) scale(${String(scale)})`;
  }
}

export interface RewardsCarouselProps {
  items: readonly ShowcaseRewardItem[];
  /**
   * The UNBOUNDED page index, exactly Dart's `_page`. The item shown in a slot
   * is `items[slot % items.length]`, so the owner may count up forever.
   */
  page: number;
  /** How long one page advance takes to settle. */
  slideMs?: number | undefined;
  /** The featured frame's HEIGHT, in px. Its width follows its own art. */
  featuredHeight?: number | undefined;
}

export function RewardsCarousel({
  items,
  page,
  slideMs = SLIDE_MS,
  featuredHeight = FEATURED_HEIGHT,
}: RewardsCarouselProps) {
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  /** The live fractional page — the controller's `page`, and the driver's state. */
  const currentPage = useRef(page);

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    const applyAll = (fractionalPage: number): void => {
      currentPage.current = fractionalPage;
      for (const element of root.querySelectorAll<HTMLElement>(`[${PAGE_ATTR}]`)) {
        placePage(element, fractionalPage);
      }
    };

    const from = currentPage.current;
    // `MediaQuery.disableAnimationsOf`, and the first mount: land, don't tween.
    if (reduceMotion || from === page) {
      applyAll(page);
      return;
    }

    let raf = 0;
    let startMs = 0;
    const frame = (now: number): void => {
      if (startMs === 0) startMs = now;
      const t = Math.min((now - startMs) / slideMs, 1);
      // Eased soft at both ends, like everything else on this card.
      applyAll(from + (page - from) * Curves.easeInOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [page, slideMs, reduceMotion]);

  const slots: number[] = [];
  for (let slot = page - WINDOW; slot <= page + WINDOW; slot++) slots.push(slot);

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      style={showcaseStyle({
        '--rc-height': `${String(featuredHeight)}px`,
        '--rc-viewport-fraction': `${String(VIEWPORT_FRACTION * 100)}%`,
        // The one width in this file, and it is NOT a photograph's: it is the
        // box a DEAD photo leaves behind, so the strip keeps its rhythm rather
        // than collapsing a slot to nothing. A picture that loads is never
        // given a width.
        '--rc-empty-width': `${String(Math.round(featuredHeight * 1.5))}px`,
      })}
    >
      {slots.map((slot) => {
        const item = items[wrapIndex(slot, items.length)];
        if (item === undefined) return null;
        return (
          <div
            key={slot}
            className={styles.page}
            data-carousel-page={slot}
            ref={(node) => {
              if (node !== null) placePage(node, currentPage.current);
            }}
          >
            <RewardFrame item={item} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * One frame on the shelf — the generated reward photograph when a theme carries
 * one, else the gym's own catalogue photo, else the bundled sample.
 *
 * That is the same ladder, off the same slot, that ../rewards/RewardRow.tsx
 * paints the store card with. The slot is stamped where the list is built
 * (../rewardsCelebration.ts's `buildRewardsStats`), so a reward cannot show one
 * picture in the store and a different one here.
 */
function RewardFrame({ item }: { item: ShowcaseRewardItem }) {
  const fallback = showcaseAssetOrNetwork(item.imageUrl, item.imageAsset);
  // <ThemedImage> already holds the fallback until an override's URL probes, so
  // the `key` remount below is only needed on the untokenised path.
  if (item.themeSlot !== undefined && item.themeSlot !== '') {
    return (
      <div className={styles.frame}>
        <ThemedImage
          className={styles.photo}
          slot={item.themeSlot}
          fallbackSrc={fallback}
          alt={item.name}
        />
      </div>
    );
  }
  // `key` remounts the frame whenever the photo changes, so one dead URL cannot
  // pin the slot to the empty frame forever. The same reset
  // ../home/classItem/ClassItemThumb.tsx and the library's <ThemedImage> use.
  return <RewardFrameFallback key={fallback} src={fallback} alt={item.name} />;
}

/**
 * A photo that fails to load degrades to a bare linen box rather than a
 * broken-image icon — Dart's `errorBuilder`, in this design's own ink.
 */
function RewardFrameFallback({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={failed ? styles.frameEmpty : styles.frame}>
      {!failed && (
        <img
          className={styles.photo}
          src={src}
          alt={alt}
          onError={() => {
            setFailed(true);
          }}
        />
      )}
    </div>
  );
}
