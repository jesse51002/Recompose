// No single Dart counterpart — this is the `Image(… errorBuilder: (_, _, _) =>
// ColoredBox(color: card))` that `video_recc_card.dart:47-52` and
// `gym_video_carousel_card.dart:41-46` each spell inline, lifted once.
//
// A YouTube thumbnail is a stored URL that can rotate or 404 on its own, so a
// dead one must degrade to the flat `card` rectangle the box already paints
// rather than to a broken-image glyph. The `key` remount is what resets that
// decision when the URL changes — a category switch swaps the whole feed, and
// without it one dead URL would pin its slot to the empty box forever (the same
// idiom ../home/classItem/ClassItemThumb.tsx and ../rewards/RewardCard.tsx use; resetting
// in an effect is a lint error in this package, see ../../../CLAUDE.md).
//
// IT TAKES THE WHOLE VIDEO, NOT A URL, and that is a deliberate guard rather
// than convenience. The generated thumbnail arrives as an optional
// `themeSlot`, and an optional prop is exactly the shape that lets a component
// be wired while a caller is not — it typechecks, it lints, and the screen
// silently keeps rendering the un-themed image. That has already happened
// twice in this package (see the `mockup-redesign-general` skill). A required
// `video` prop makes every call site a compile error until it is updated.

import { ThemedImage } from 'recompose-react';
import { useState } from 'react';

import type { ShowcaseVideo } from '../showcaseContent';
import { cx } from '../cx';

import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import styles from './VideoThumbnail.module.css';

export interface VideoThumbnailProps {
  video: ShowcaseVideo;
  /** Extra class from the owning card — it sizes the box, this fills it. */
  className?: string | undefined;
}

export function VideoThumbnail({ video, className }: VideoThumbnailProps) {
  // `cx`, not a template literal: a CSS-module key is `string | undefined`
  // under `noUncheckedIndexedAccess`, and interpolating one renders the
  // literal text "undefined" as a class name.
  const cls = cx(styles.thumb, className);
  // The generated frame when the theme has one, with the YouTube thumbnail as
  // its fallback — so an unrun theme is exactly what it was before, and the
  // `data-video-part` hook is identical on both paths.
  if (video.themeSlot !== undefined) {
    return (
      <ThemedImage
        className={cls}
        slot={video.themeSlot}
        fallbackSrc={video.thumbnailUrl}
        alt=""
        {...{ [PART_ATTR]: VIDEO_PARTS.thumb }}
      />
    );
  }
  return <ThumbnailImage key={video.thumbnailUrl} src={video.thumbnailUrl} className={cls} />;
}

function ThumbnailImage({ src, className }: { src: string; className: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || src === '') return null;
  return (
    <img
      className={className}
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => {
        setFailed(true);
      }}
      {...{ [PART_ATTR]: VIDEO_PARTS.thumb }}
    />
  );
}
