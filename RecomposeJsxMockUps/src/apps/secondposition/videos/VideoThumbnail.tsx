// No single Dart counterpart — this is the `Image(… errorBuilder: (_, _, _) =>
// ColoredBox(color: card))` that `video_recc_card.dart:47-52` and
// `gym_video_carousel_card.dart:41-46` each spell inline, lifted once.
//
// A YouTube thumbnail is a stored URL that can rotate or 404 on its own, so a
// dead one must degrade to the flat rectangle the box already paints rather
// than to a broken-image glyph. The `key` remount is what resets that decision
// when the URL changes — a category switch swaps the whole feed, and without it
// one dead URL would pin its slot to the empty box forever (the same idiom
// ../home/classItem/ClassItemThumb.tsx and ../rewards/RewardCard.tsx use;
// resetting in an effect is a lint error in this package, see
// ../../../CLAUDE.md).
//
// IT TAKES THE WHOLE VIDEO, NOT A URL, and that is a deliberate guard rather
// than convenience. The generated still arrives as an optional `themeSlot`, and
// an optional prop is exactly the shape that lets a component be wired while a
// caller is not — it typechecks, it lints, and the screen silently keeps
// rendering the un-themed image. That has already happened twice in this
// package (see the `mockup-redesign-general` skill). A required `video` prop
// makes every call site a compile error until it is updated.
//
// IT SIZES NOTHING. The box is ./FilmPanel.tsx's `.media`, which is 16:9
// because every still this screen renders is 1.78 — the four generated slots at
// 1200x675 and the shared-pool fallbacks at 1280x720. This file only fills
// whatever box it is handed, which is why the ratio lives in one place instead
// of at each call site.

import { ThemedImage } from 'recompose-react';
import { useState } from 'react';

import type { ShowcaseVideo } from '../showcaseContent';

import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import styles from './VideoThumbnail.module.css';

export interface VideoThumbnailProps {
  video: ShowcaseVideo;
}

export function VideoThumbnail({ video }: VideoThumbnailProps) {
  // The generated still when the theme has one, with the shared-pool thumbnail
  // as its fallback — so an unrun theme is exactly what it was before, and the
  // `data-sc-part` hook is identical on both paths.
  if (video.themeSlot !== undefined) {
    return (
      <ThemedImage
        className={styles.thumb}
        slot={video.themeSlot}
        fallbackSrc={video.thumbnailUrl}
        alt=""
        {...{ [PART_ATTR]: VIDEO_PARTS.thumb }}
      />
    );
  }
  return <ThumbnailImage key={video.thumbnailUrl} src={video.thumbnailUrl} />;
}

function ThumbnailImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || src === '') return null;
  return (
    <img
      className={styles.thumb}
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
