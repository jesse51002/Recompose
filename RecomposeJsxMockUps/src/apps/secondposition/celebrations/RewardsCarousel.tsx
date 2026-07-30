// THE SHELF — the cover-flow strip of reward photographs the giftbox opens into.
//
// One page is face-on at full size and its neighbours turn away, shrink and
// wash back toward the ground. The page at rest is rank 1's PHOTOGRAPH: its
// name is set directly beneath it by ../RewardsCardShowcase.tsx, and the two are
// one object.
//
// EVERY PAGE IS A 3:2 BOX, NOT A DISC. The base put each reward in a 208px
// circle and `cover`ed a 1.50 photograph into it, which discarded a third of
// every frame and then masked the corners off the rest (Guardrail 10b). A
// photograph in this app is given a box of its own proportion and the layout is
// solved around that; a disc is for a CUT-OUT, which carries its own
// transparent margin and can be contained without losing anything. The two
// rules are stated separately in ../layout_brief.yaml precisely so one cannot
// be applied to the other.
//
// WHAT REPLACES THE `PageController`. Dart hands the carousel a controller and
// the OWNER drives it. React has no such object, so the controller's two jobs
// split: the owner keeps the integer `page` it already had and passes it as a
// prop, and the TWEEN — the thing the controller actually owned — lives here,
// where one rAF driver eases the fractional page toward the prop and writes
// each page's transform straight to its element. Every intermediate frame is
// `coverFlowTransform` of a live fractional offset rather than a browser's
// interpolation between two already-resolved matrices, which is the part that
// matters: the tilt and the scale have to track the position continuously or
// the fan reads as a slideshow.
//
// THE BLOOM RIDES THE SAME DRIVER. On arrival every page sits stacked exactly
// on the featured one and spreads to its own slot over `BLOOM_MS` — the shelf
// coming out of the burst. It is a second factor on the same offset, so it
// costs one more number per frame rather than a second animation to keep in
// sync, and it is a per-frame value with no keyframe to fast-forward: `immediate`
// is the branch that hands it over when a tap finishes the card
// (../shell/useTapToSettle.ts).
//
// A page's element is placed in a REF CALLBACK as well as by the driver.
// Advancing mounts one new page element at the far edge, and a mount is
// precisely where Dart would reach for `addPostFrameCallback`: the callback
// fires at commit with the node in hand, so the new page is already positioned
// on its first painted frame instead of flashing at the centre.
//
// NO SWIPE. Every showcase surface is a preview inside a phone frame and takes
// no input, which is why there is no scroll container here and why Dart's
// `onPageChanged` has no counterpart — nothing but the owner can change the
// page.

import { useEffect, useRef, useState } from 'react';
import { ThemedImage } from 'recompose-react';

import { showcaseAssetOrNetwork } from '../showcaseAssets';
import { showcaseStyle } from '../showcaseTokens';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

import styles from './RewardsCarousel.module.css';
import {
  BLOOM_MS,
  FEATURED_SIZE,
  PERSPECTIVE_PX,
  PHOTO_RATIO,
  PHRASE_CURVE,
  SLIDE_MS,
  VIEWPORT_FRACTION,
  coverFlowTransform,
  pageDepth,
  recessionVeil,
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

/** The attributes the driver finds its elements by. */
const PAGE_ATTR = 'data-carousel-page';
const FRAME_ATTR = 'data-page-frame';
const VEIL_ATTR = 'data-page-veil';

/**
 * `AnimatedBuilder`'s body for ONE page. Module-level because it closes over
 * nothing: the element carries its own slot number and the maths lives in
 * ./rewardsCoverFlow.ts.
 *
 * `spread` is the bloom, 0 → 1. At 0 every page resolves to offset 0, so they
 * are stacked one on another at full size and only the featured one is visible;
 * at 1 they are on their slots.
 */
function placePage(element: HTMLElement, fractionalPage: number, spread: number): void {
  const slot = Number(element.dataset['carouselPage']);
  const offset = (slot - fractionalPage) * spread;
  const { scale, tiltRadians } = coverFlowTransform(offset);
  // A page slot's own share of the carousel IS its width, so translating by a
  // percentage of itself is translating by whole slots — nothing measured.
  element.style.transform = `translateX(-50%) translateX(${String(offset * 100)}%)`;
  element.style.zIndex = String(pageDepth(offset));
  const frame = element.querySelector<HTMLElement>(`[${FRAME_ATTR}]`);
  if (frame !== null) {
    frame.style.transform = `perspective(${String(PERSPECTIVE_PX)}px) rotateY(${String(tiltRadians)}rad) scale(${String(scale)})`;
  }
  const veil = element.querySelector<HTMLElement>(`[${VEIL_ATTR}]`);
  if (veil !== null) {
    veil.style.opacity = String(recessionVeil(offset));
  }
}

export interface RewardsCarouselProps {
  items: readonly ShowcaseRewardItem[];
  /**
   * The UNBOUNDED page index, exactly Dart's `_page`. The item shown in a slot
   * is `items[slot % items.length]`, so the owner may count up forever.
   */
  page: number;
  /** `_slideDuration` — how long one page advance takes to settle. */
  slideMs?: number | undefined;
  /** How long the shelf takes to spread open out of the burst. */
  bloomMs?: number | undefined;
  /** The featured page's height, in px. Its width is 3:2 of this. */
  featuredHeight?: number | undefined;
  /**
   * Land everything on its resting value with no travel.
   *
   * THE HAND-OVER. `.finished`'s negative animation delay finishes every CSS
   * animation on the card at once, but a per-frame driver has no keyframe to
   * fast-forward — so a tap that finishes the card has to reach the bloom and
   * the page tween through their own branch. Reduced motion takes the same one.
   */
  immediate?: boolean | undefined;
}

export function RewardsCarousel({
  items,
  page,
  slideMs = SLIDE_MS,
  bloomMs = BLOOM_MS,
  featuredHeight = FEATURED_SIZE,
  immediate = false,
}: RewardsCarouselProps) {
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  /** The live fractional page — the controller's `page`, and the driver's state. */
  const livePage = useRef(page);
  /** The live bloom, 0 → 1. Starts closed; one pass opens it and it stays open. */
  const liveBloom = useRef(0);

  const settleNow = immediate || reduceMotion;

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    const apply = (fractionalPage: number, spread: number): void => {
      livePage.current = fractionalPage;
      liveBloom.current = spread;
      for (const element of root.querySelectorAll<HTMLElement>(`[${PAGE_ATTR}]`)) {
        placePage(element, fractionalPage, spread);
      }
    };

    const fromPage = livePage.current;
    const fromBloom = liveBloom.current;
    // `MediaQuery.disableAnimationsOf`, a tap that finished the card, and the
    // case where there is simply nothing left to travel: land, do not tween.
    if (settleNow || (fromPage === page && fromBloom === 1)) {
      apply(page, 1);
      return;
    }

    // ONE LOOP FOR BOTH, because both are functions of the same frame clock and
    // two loops writing `transform` on the same elements would fight. Each term
    // is skipped by starting it already finished, which is what makes an advance
    // after the bloom cost nothing extra.
    let raf = 0;
    let startMs = 0;
    const frame = (now: number): void => {
      if (startMs === 0) startMs = now;
      const elapsed = now - startMs;
      const slideT = fromPage === page ? 1 : Math.min(elapsed / slideMs, 1);
      const bloomT = fromBloom === 1 ? 1 : Math.min(elapsed / bloomMs, 1);
      apply(
        fromPage + (page - fromPage) * PHRASE_CURVE(slideT),
        fromBloom + (1 - fromBloom) * PHRASE_CURVE(bloomT),
      );
      if (slideT < 1 || bloomT < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [page, slideMs, bloomMs, settleNow]);

  const slots: number[] = [];
  for (let slot = page - WINDOW; slot <= page + WINDOW; slot++) slots.push(slot);

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      style={showcaseStyle({
        '--rc-height': `${String(featuredHeight)}px`,
        '--rc-width': `${String(featuredHeight * PHOTO_RATIO)}px`,
        '--rc-slot': `${String(VIEWPORT_FRACTION * 100)}%`,
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
            // Placed at COMMIT, with the node in hand — Dart's
            // `addPostFrameCallback`. `settleNow` is read here as well as in
            // the effect because the effect runs after the browser may already
            // have painted: a card that mounts already finished (a tap during
            // the intro, or reduced motion) would otherwise show one frame of
            // the shelf still stacked on the featured page before snapping
            // open. The first painted frame has to be the resting one.
            ref={(node) => {
              if (node === null) return;
              if (settleNow) placePage(node, page, 1);
              else placePage(node, livePage.current, liveBloom.current);
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
 * One reward's photograph, in a box of the photograph's own proportion.
 *
 * The generated reward slot is preferred over the gym's own photo URL, which is
 * preferred over the bundled sample — the same ladder, in the same order, as
 * the store's own panels (../RewardsShowcase.tsx). Guardrail 7: this catalogue
 * appears on two screens, and a reward that changed picture between the store
 * and the celebration would read as two different rewards.
 */
function RewardFrame({ item }: { item: ShowcaseRewardItem }) {
  const src = showcaseAssetOrNetwork(item.imageUrl, item.imageAsset);
  // <ThemedImage> already holds the fallback until the override's URL probes,
  // so the `key` remount below is only needed on the untokenised path.
  if (item.themeSlot !== undefined) {
    return (
      <div className={styles.frame} data-page-frame="">
        <ThemedImage
          className={styles.photo}
          slot={item.themeSlot}
          fallbackSrc={src}
          alt={item.name}
        />
        <span className={styles.veil} data-page-veil="" aria-hidden="true" />
      </div>
    );
  }
  // `key` remounts the frame whenever the photo changes, so one dead URL cannot
  // pin the slot to an empty box forever. The same reset ../home/classItem/ClassItemThumb.tsx
  // and the library's <ThemedImage> use, and for the same reason.
  return <RewardFrameFallback key={src} src={src} alt={item.name} />;
}

/**
 * A photo that fails to load degrades to the empty field rather than a
 * broken-image box — Dart's `errorBuilder`, and the same thing
 * ../shell/Panel.tsx's media box does.
 */
function RewardFrameFallback({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={styles.frame} data-page-frame="">
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
      <span className={styles.veil} data-page-veil="" aria-hidden="true" />
    </div>
  );
}
