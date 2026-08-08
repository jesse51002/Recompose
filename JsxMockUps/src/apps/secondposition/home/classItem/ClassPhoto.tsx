// THE CLASS PHOTOGRAPH — the other half of the panel, and half of rank 1.
//
// It carries no box of its own. ../../shell/Panel.tsx owns the frame and gives
// it the SOURCE ART's proportion, so this component owns only what the base's
// `ClassItemThumb` owned once its four sizing props are gone: the resolution
// ladder and the error fallback. That is deliberate rather than a simplification
// — a photograph whose container shape is decided at the call site is exactly
// how `apps/milemarker/` destroyed every thumbnail it had.
//
// THE LADDER, TOP RUNG FIRST: the THEME's generated class photo, then the
// injected gym photo, then the bundled sample. <ThemedImage> owns the top rung —
// it keeps the fallback on screen until the override's URL has actually probed,
// so a 404 degrades to the old image rather than to an empty box.

import { useState } from 'react';

import { ThemedImage } from 'recompose-react';

import { PANEL_MEDIA_CLASS } from '../../shell/Panel';
import { showcaseAssetOrNetwork } from '../../showcaseAssets';
import type { ShowcaseClass } from '../homeClass';

export interface ClassPhotoProps {
  classData: ShowcaseClass;
}

export function ClassPhoto({ classData }: ClassPhotoProps) {
  const src = showcaseAssetOrNetwork(
    classData.imageUrl,
    classData.imageAsset ?? 'class_photo_1.png',
  );
  if (classData.themeSlot !== undefined) {
    return (
      <ThemedImage
        className={PANEL_MEDIA_CLASS}
        slot={classData.themeSlot}
        fallbackSrc={src}
        alt=""
      />
    );
  }
  // `key` remounts the image whenever the photo changes — a theme switch swaps
  // the whole class list, and without the reset one dead URL would pin this
  // slot to the empty frame forever. The same trick <ThemedImage> uses, and for
  // the same reason: resetting in an effect is a lint error in this package.
  return <ClassPhotoFallback key={src} src={src} />;
}

/**
 * Dart's `errorBuilder`: a photo that will not load leaves the panel's own
 * frame colour rather than a broken-image box. The frame is already painted by
 * `Panel`'s media box, so there is nothing to draw here — only something to
 * stop drawing.
 */
function ClassPhotoFallback({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      className={PANEL_MEDIA_CLASS}
      src={src}
      alt=""
      onError={() => {
        setFailed(true);
      }}
    />
  );
}
