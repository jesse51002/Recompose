// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// gym_video_carousel_card.dart — one film on a genre strip: its still, and the
// satin plinth carrying its name.
//
// ONE CARD HERE, TWO THERE. `video_carousel_card.dart` and
// `gym_video_carousel_card.dart` are the same layout over two models — the
// retired `Video` and the portal's `GymVideoCard` — and Dart keeps both because
// each still has a consumer. This island has one model, so it gets one card
// (../../../CLAUDE.md: never reproduce an existing duplication to stay
// "consistent" with the code being ported).
//
// AND ONE SHAPE. `VideoCardSize`'s four values (`md` / `lg` / `tile` / `tall`)
// existed to feed four section shapes this fork no longer has; they are deleted
// with them rather than left as unreachable branches drawn in the old design
// language. A fork carrying shapes that can only render wrong is a fork the
// next agent has to reverse-engineer.
//
// IT IS NOT A CONTROL, AND THAT IS THE BASE'S BEHAVIOUR RATHER THAN AN
// OVERSIGHT. Tapping a film would open a player, and there is no player screen
// in this asset; inventing one would add a capability the platform's own app
// does not have here. A <button> wired to nothing is Guardrail 4's exact shape.
// The screen's exit is the four destinations at the foot.
//
// Also the Profile screen's carousel card (`level_up_videos_section.dart:99`),
// which is why it lives here rather than under this screen's own folder.

import type { ShowcaseVideo } from '../showcaseContent';

import { FilmPanel } from './FilmPanel';
import { VideoCardInfo } from './VideoCardInfo';
import { VIDEO_PARTS } from './videoParts';
import { VideoThumbnail } from './VideoThumbnail';

export interface VideoCarouselCardProps {
  video: ShowcaseVideo;
  /** Position along the strip, for the plinth's entrance stagger. */
  index?: number | undefined;
}

export function VideoCarouselCard({ video, index }: VideoCarouselCardProps) {
  return (
    <FilmPanel
      register="shelf"
      media={<VideoThumbnail video={video} />}
      index={index}
      part={VIDEO_PARTS.card}
    >
      <VideoCardInfo video={video} />
    </FilmPanel>
  );
}
