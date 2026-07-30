// The `errorBuilder` every network image on the class detail screen carries —
// a flat box in the image's own shape rather than a broken-image glyph.
//
// It matters more here than anywhere else in the app: the coach headshot is the
// only NETWORK image on any screen of this asset (every other one is a bundled
// PNG behind a theme slot), and the demo content points at third-party hosts.
// One dead URL must degrade to a shape, never to a browser placeholder that
// gives away the mock.
//
// MOVED UP OUT OF `sections/` BY THIS FORK, which does not have that folder: the
// five `class_format` arrangements it existed to share are gone, and this is the
// one piece of the old tree that carried its weight. Same file, same behaviour.
//
// The reset is a `key` REMOUNT, not an effect — the same trick
// ../home/classItem/ClassItemThumb.tsx uses and for the same reason: `setState`
// in an effect to clear derived state is a React Compiler error in this package
// (../../../CLAUDE.md). Without the reset, one dead URL would pin the box empty
// for every later theme, because the failure flag would outlive the src that
// caused it.

import { useState } from 'react';

export interface DegradingImageProps {
  src: string;
  className?: string | undefined;
  /** Applied to the wrapper that paints the fallback block. */
  frameClassName?: string | undefined;
}

export function DegradingImage({ src, ...rest }: DegradingImageProps) {
  return <ImageFrame key={src} src={src} {...rest} />;
}

function ImageFrame({ src, className, frameClassName }: DegradingImageProps) {
  const [failed, setFailed] = useState(false);
  // An empty src never even attempts a request, so it starts failed rather than
  // firing `onError` — `FALLBACK_CARD.instructorImageUrl` is `''` by design.
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
