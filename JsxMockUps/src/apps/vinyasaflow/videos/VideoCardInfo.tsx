// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// cards/video_card_info.dart — the creator's avatar, the title and the count:
// the line every shelf card carries under its frame.
//
// The `compact` and `flush` knobs are gone with the card sizes and section
// shapes that asked for them (./VideoCarouselCard.tsx). One shelf, one line.
//
// THE AVATAR IS A CIRCLE AND THE TITLE IS NOT. A channel headshot is near
// square, so a circle costs it nothing and it belongs to the same family as
// every other disc in this app; the FRAME above is a landscape photograph and
// gets a box of its own ratio instead. That split is the design's one hard rule
// about pictures.

import type { ShowcaseVideo } from '../showcaseContent';

import { CreatorAvatar } from './CreatorAvatar';
import styles from './VideoCardInfo.module.css';
import { formatViewCount } from './videoSelectors';

/** `_kPfpSize` — an asset dimension, not a spacing token. */
const PFP_SIZE = 24;

export interface VideoCardInfoProps {
  video: ShowcaseVideo;
}

export function VideoCardInfo({ video }: VideoCardInfoProps) {
  const views = formatViewCount(video.viewCount);
  return (
    <div className={styles.info}>
      <CreatorAvatar url={video.channelAvatarUrl} size={PFP_SIZE} />
      <div className={styles.text}>
        <span className={styles.title}>{video.title}</span>
        {/* `views.isEmpty ? channelName : '$views views'` — verbatim. */}
        <span className={styles.meta}>{views === '' ? video.channelName : `${views} views`}</span>
      </div>
    </div>
  );
}
