// Ports the `errorBuilder` every image on the class detail screen carries —
// `class_image_banner.dart:57`, `class_instructor_section.dart:110` — which
// paints the image's own shape rather than a broken-image glyph.
//
// It matters more here than anywhere else in the island: the class photo, the
// coach headshot and the map are the only NETWORK images on any showcase
// screen (every other one is a bundled PNG behind a theme slot), and the demo
// content points at third-party hosts. One dead URL must degrade to a shape,
// never to a browser placeholder that gives away the mock.
//
// IN THIS FORK IT HAS ONE CONSUMER, the teacher's face, and the shape it
// degrades to is an open circle drawn by the caller's frame class — a form this
// design already contains. The class photograph and the map both go through the
// shell instead: the photograph is a generated slot, so <ThemedImage> owns its
// ladder, and the map is bundled art that cannot 404.
//
// The reset is a `key` REMOUNT, not an effect — the same trick
// ../home/classItem/ClassItemThumb.tsx uses and for the same reason: `setState`
// in an effect to clear derived state is a React Compiler error in this package
// (../../../CLAUDE.md). Without the reset, one dead URL would pin the frame
// empty for every later theme, because the failure flag would outlive the src
// that caused it.

import { useState } from 'react';

export interface DegradingImageProps {
  src: string;
  className?: string | undefined;
  /** Applied to the wrapper that stays behind when the image is gone. */
  frameClassName?: string | undefined;
}

export function DegradingImage({ src, ...rest }: DegradingImageProps) {
  return <ImageFrame key={src} src={src} {...rest} />;
}

function ImageFrame({ src, className, frameClassName }: DegradingImageProps) {
  const [failed, setFailed] = useState(false);
  // An empty src never even attempts a request, so it starts failed rather than
  // firing `onError` — `fallbackClass.instructorImageUrl` is `''` by design.
  const broken = failed || src === '';
  return (
    <div className={frameClassName}>
      {!broken && (
        <img
          src={src}
          alt=""
          className={className}
          onError={() => {
            setFailed(true);
          }}
        />
      )}
    </div>
  );
}
