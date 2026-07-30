// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// gym_video_carousel_card.dart — one film on a shelf: its frame, and the line
// under it.
//
// ONE CARD HERE, TWO THERE. `video_carousel_card.dart` and
// `gym_video_carousel_card.dart` are the same layout over two models — the
// retired `Video` and the portal's `GymVideoCard` — and Dart keeps both because
// each still has a consumer. This island has one model, so it gets one card
// (../../../CLAUDE.md: never reproduce an existing duplication to stay
// "consistent" with the code being ported).
//
// AND ONE SHAPE. `VideoCardSize`'s four values (`md` / `lg` / `tile` / `tall`)
// existed to feed four section shapes that this fork no longer has; they are
// gone with them rather than left as unreachable branches drawn in the old
// design language. See ./VideoCarouselSection.tsx.
//
// IT IS A FRAME, NOT A CARD. No surface, no radius, no clip — the picture is
// the only rectangle, and what would have been the card is just the column the
// picture and its two lines share. The frame's WIDTH is whatever its own ratio
// makes it at the shelf's fixed height, which is what lets a 4:3 still stand
// beside three 16:9 ones with none of them cropped.
//
// Also the Profile screen's carousel card (`level_up_videos_section.dart:99`),
// which is why it lives here rather than under the Video screen's own folder.

import type { ShowcaseVideo } from '../showcaseContent';

import { VideoCardInfo } from './VideoCardInfo';
import styles from './VideoCarouselCard.module.css';
import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import { VideoThumbnail } from './VideoThumbnail';

export interface VideoCarouselCardProps {
  video: ShowcaseVideo;
}

export function VideoCarouselCard({ video }: VideoCarouselCardProps) {
  return (
    <article className={styles.card} {...{ [PART_ATTR]: VIDEO_PARTS.card }}>
      <VideoThumbnail video={video} frame="strip" />
      <VideoCardInfo video={video} />
    </article>
  );
}
