// The class photograph, at one of two sizes.
//
// Ports MobileApp/lib/features/home/presentation/widgets/class_schedule/
// class_item/class_item_thumb.dart, and replaces the base's `ClassItemThumb`,
// which handed the frame's WIDTH AND HEIGHT in from the treatment and cropped
// the picture to whatever box came back. That is Guardrail 10b: the source art
// is 3:2 and the base's box was 122x73 (1.67), so every thumbnail on the
// schedule was losing a strip of itself with nothing on screen saying so.
//
// Here the proportion is not the layout's to choose. ../shell/Photo.tsx sets
// ONE axis and leaves the other `auto`, so the box is always the picture's own
// shape and there is nothing for `object-fit` to discard — which also means a
// tenant whose class photography arrives at a different proportion is handled
// for free rather than destroyed.
//
// THE LADDER IS THE BASE'S AND IS NOT A DESIGN DECISION: the theme's generated
// class photo, then the injected gym photo, then the bundled sample.
// <ThemedImage> owns the top rung and keeps the fallback on screen until the
// override's URL has actually probed, so a 404 degrades to the old picture
// rather than to an empty box.

import { BleedPhoto, InlinePhoto } from '../../shell/Photo';
import { showcaseAssetOrNetwork } from '../../showcaseAssets';
import type { ShowcaseClass } from '../homeClass';

export interface ClassItemPhotoProps {
  classData: ShowcaseClass;
  /** Edge to edge, with the thread redrawn across it in the knockout ink. */
  bleed?: boolean;
}

export function ClassItemPhoto({ classData, bleed = false }: ClassItemPhotoProps) {
  const fallback = showcaseAssetOrNetwork(
    classData.imageUrl,
    classData.imageAsset ?? 'class_photo_1.png',
  );
  if (bleed) {
    return <BleedPhoto slot={classData.themeSlot} fallback={fallback} alt="" />;
  }
  return <InlinePhoto slot={classData.themeSlot} fallback={fallback} alt="" />;
}
