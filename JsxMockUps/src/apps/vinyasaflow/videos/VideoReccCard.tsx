// Ports ../../../../../../MobileApp/lib/shared/widgets/video_recc_card/
// video_recc_card.dart — the full-width video recommendation: the frame, the
// creator, the title, and the count.
//
// THE FRAME RUNS EDGE TO EDGE AT ITS OWN RATIO and the words sit right of the
// thread beneath it. That split is the design rather than a detail: a
// photograph is the only rectangle this app contains and the studio's own
// footage earns width, while everything spoken hangs off the line at the same
// inset every other region's content does. ../shell/Photo.tsx redraws the
// thread across the picture in the knockout ink, because the line may never
// break and a full-bleed photograph covers the one the screen root draws.
//
// THE COUNT IS A FIGURE, SO IT IS SET IN THE DISPLAY FACE. Dart prints
// "Channel ‧ 168K views" as one string (`GymVideoCard.metaLabel`); this splits
// the same two facts into the channel, in the body sans, and the count, large
// and light in Raleway with its unit beneath the size of a caption. Nothing is
// added and nothing is dropped — a big number set light is simply what this
// brand does with every number it counts, and the views clause still disappears
// entirely when a channel hides its stats, exactly as the Dart drops it.
//
// Nothing here is tappable: every showcase surface is a preview inside a phone
// frame that takes no input, so Dart's `onTap` goes the way
// ../rewards/RewardsTabs.tsx's callbacks did.

import { Figure } from '../shell/Figure';
import type { ShowcaseVideo } from '../showcaseContent';

import { CreatorAvatar } from './CreatorAvatar';
import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import styles from './VideoReccCard.module.css';
import { formatViewCount } from './videoSelectors';
import { VideoThumbnail } from './VideoThumbnail';

/** `_CreatorRow._kPfpSize` — an asset dimension, not a spacing token. */
const PFP_SIZE = 44;

export interface VideoReccCardProps {
  video: ShowcaseVideo;
}

export function VideoReccCard({ video }: VideoReccCardProps) {
  const views = formatViewCount(video.viewCount);
  return (
    <div className={styles.card} {...{ [PART_ATTR]: VIDEO_PARTS.reccCard }}>
      <VideoThumbnail video={video} frame="bleed" />
      {/*
        Everything spoken, at the thread's own inset. The gap from the picture
        to this block is one rung LARGER than the gaps inside it, so the words
        read as one object hanging under the frame rather than as three
        unrelated lines.
      */}
      <div className={styles.below}>
        <div className={styles.creatorRow}>
          <CreatorAvatar url={video.channelAvatarUrl} size={PFP_SIZE} />
          <div className={styles.creatorText}>
            <span className={styles.title}>{video.title}</span>
            <span className={styles.channel}>{video.channelName}</span>
          </div>
        </div>
        {/*
          `views.isEmpty` — the channel hides its stats, so the clause is
          dropped rather than printed after nothing. Verbatim from the Dart.
        */}
        {views !== '' && (
          <p className={styles.views}>
            <Figure size="xs">{views}</Figure>
            <span className={styles.viewsLabel}>views</span>
          </p>
        )}
      </div>
    </div>
  );
}
