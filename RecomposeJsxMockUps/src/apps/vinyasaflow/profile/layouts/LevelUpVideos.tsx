// Ports ../../../../../../../MobileApp/lib/features/profile/presentation/
// widgets/level_up_videos/{level_up_videos_section,level_up_videos_header}.dart
// — "Videos to level up", the Education-bucket cards from the live feed.
//
// THE LINE BOWS SIDEWAYS TO GATHER THEM. This is the one horizontal scroller on
// the screen and the same device the head's carried row uses, which is what
// makes sideways movement read as part of one sequence rather than as a second
// axis bolted on: the thread goes out across the screen, through the frames, and
// back. The stroke runs BEHIND each still and shows in the gaps between them —
// the brief's "the thread may pass behind a photograph".
//
// FRAMES ON A STRIP, NOT CARDS. <StripPhoto> fixes the HEIGHT and leaves the
// width to the picture, so stills of differing proportion sit in one row aligned
// on their tops and bottoms and not one of them is cropped to match a
// neighbour. That matters more here than anywhere else in the app: a video still
// carries its TITLE BURNT INTO THE FRAME, so a box of the wrong ratio does not
// resize it, it renders fragments of words (Guardrail 10b). There is no card
// around a frame, because a card would be a fourth form.
//
// IT HIDES ITSELF WHEN EMPTY (Dart's `SizedBox.shrink()`), so a tenant whose
// feed carries no educational videos gets no heading over nothing. The base drew
// a rule above the section and had to hide that with it; there is no rule here,
// so there is nothing left to keep in step.
//
// THE "VIEW ALL" AFFORDANCE MOVED, IT DID NOT GO. Dart offers it inline in the
// header, in a row closing the section beneath its cards, or as a tile; this
// takes the second, because the header row belongs to the node and its spoken
// label. Preview-only, so it is a label rather than a control — there is no
// route behind it and a dead <button> would advertise an action the phone cannot
// take, exactly as ../../rewards/RewardsTabs.tsx concluded for its own tabs.
//
// THE AVATAR IS DRAWN HERE RATHER THAN IMPORTED, deliberately. ../../videos/
// owns a `CreatorAvatar` doing the same job, and this shelf is the only thing on
// this screen that would reach into another screen's folder for a widget; twelve
// lines is cheaper than the coupling. The behaviour it reproduces is the one
// that matters: an empty URL means NO avatar (the shared pool routinely carries
// none and the field arrives as `''`), and a URL that 404s — YouTube rotates
// them whenever a creator changes their picture — collapses rather than drawing
// a broken disc.

import { useState } from 'react';

import { StripPhoto } from '../../shell/Photo';
import { Bow, Region } from '../../shell/Thread';
import type { ShowcaseVideo } from '../../showcaseContent';
import { formatViewCount } from '../../videos/videoSelectors';

import { RANK_PART } from '../rankParts';
import { RankPartMarker } from '../rankLayoutData';

import styles from './levelUpVideos.module.css';

export function LevelUpVideos({ videos }: { videos: readonly ShowcaseVideo[] }) {
  if (videos.length === 0) return null;
  return (
    <RankPartMarker part={RANK_PART.levelUpVideos}>
      <Region label="Videos to level up" bleed>
        <Bow>
          {videos.map((video) => (
            <Frame key={video.videoId} video={video} />
          ))}
        </Bow>
        <p className={styles.viewAll}>view all</p>
      </Region>
    </RankPartMarker>
  );
}

/**
 * One frame on the strip: the still at its own proportion, and under it the
 * creator's circle beside the title and its view count.
 *
 * The frame takes its WIDTH from the picture. `.info` is kept out of that
 * measurement (see the stylesheet) so a long title wraps inside the still's
 * width instead of stretching the frame past it.
 */
function Frame({ video }: { video: ShowcaseVideo }) {
  const views = formatViewCount(video.viewCount);
  return (
    <article className={styles.frame}>
      <StripPhoto
        slot={video.themeSlot ?? ''}
        fallback={video.thumbnailUrl}
        alt={video.title}
      />
      <div className={styles.info}>
        <Avatar url={video.channelAvatarUrl} />
        <div className={styles.text}>
          <span className={styles.title}>{video.title}</span>
          {/* `views.isEmpty ? channelName : '$views views'` — verbatim. */}
          <span className={styles.meta}>
            {views === '' ? video.channelName : `${views} views`}
          </span>
        </div>
      </div>
    </article>
  );
}

/** An avatar sits in a circle — the only rectangle in this app is a photograph. */
function Avatar({ url }: { url: string }) {
  const trimmed = url.trim();
  if (trimmed === '') return null;
  return <AvatarImage key={trimmed} url={trimmed} />;
}

function AvatarImage({ url }: { url: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      className={styles.avatar}
      src={url}
      alt=""
      onError={() => {
        setFailed(true);
      }}
    />
  );
}
