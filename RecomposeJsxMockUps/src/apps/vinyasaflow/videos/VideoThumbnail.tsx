// THE ONE PLACE THAT DECIDES HOW A VIDEO'S FRAME IS DRAWN.
//
// No single Dart counterpart — this is the `Image(…)` that
// `video_recc_card.dart:47-52` and `gym_video_carousel_card.dart:41-46` each
// spell inline, lifted once.
//
// IT TAKES THE WHOLE VIDEO, NOT A URL, and that is a guard rather than
// convenience. The generated frame arrives as an optional `themeSlot`, and an
// optional prop is exactly the shape that lets a component be wired while a
// caller is not — it typechecks, it lints, and the screen silently keeps
// rendering the un-themed image. That has already happened twice in this
// package (`mockup-redesign-general`). A required `video` prop makes every call
// site a compile error until it is updated.
//
// NEITHER FRAME SETS BOTH AXES, AND THAT IS THE WHOLE POINT. The four generated
// slots are not one shape — `video_thumb_1/2/4` are 1200x675 and
// `video_thumb_3` is 480x360 with its letterbox bars burnt in — and every one
// of them carries its TITLE burnt into the picture. ../shell/Photo.tsx gives
// one axis and derives the other, so there is no box for `object-fit: cover` to
// discard a third of a title into. `bleed` gives WIDTH (the hero runs edge to
// edge and takes whatever height its ratio makes); `strip` gives HEIGHT, so a
// shelf holds frames of two ratios side by side, aligned top and bottom,
// differing in width, none of them cropped to match a neighbour.
//
// A DEAD URL DEGRADES RATHER THAN BREAKS: <ThemedImage> inside those two falls
// back to `fallbackSrc` — here the shared pool's own YouTube thumbnail — when a
// resolved override 404s, and remounts on the URL changing so one dead theme
// cannot pin a slot forever.

import { BleedPhoto, StripPhoto } from '../shell/Photo';
import type { ShowcaseVideo } from '../showcaseContent';

/** Which axis the frame is given. See the header — never both. */
export type VideoFrame = 'strip' | 'bleed';

export interface VideoThumbnailProps {
  video: ShowcaseVideo;
  frame?: VideoFrame | undefined;
}

export function VideoThumbnail({ video, frame = 'strip' }: VideoThumbnailProps) {
  // `''` is simply an absent slot: the resolver answers with the fallback, which
  // is what an un-themed browser wants anyway. Every video ../useShowcaseContent.ts
  // resolves is stamped, so this branch is the type's honesty rather than a
  // reachable state.
  const slot = video.themeSlot ?? '';
  if (frame === 'bleed') {
    return <BleedPhoto slot={slot} fallback={video.thumbnailUrl} alt="" />;
  }
  return <StripPhoto slot={slot} fallback={video.thumbnailUrl} alt="" />;
}
