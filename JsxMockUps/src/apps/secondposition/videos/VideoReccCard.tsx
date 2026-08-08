// Ports ../../../../../../MobileApp/lib/shared/widgets/video_recc_card/
// video_recc_card.dart — the full-width recommendation body: the still, then
// the creator, the title and the meta line.
//
// HERE IT IS THE BILLED PANEL. ../layout_brief.yaml: the first work on a bill
// is billed larger, and that is the only concession to hierarchy the list
// makes. So the hero's still runs the full width of the screen at its own 16:9
// and the satin is carried UNDERNEATH it as a plinth rather than beside it,
// with the film's name set larger there than anywhere else on the page — which
// is the emphasis ranking's rank 1 (the title and its thumbnail, together) made
// literal.
//
// `roundThumbnail` is NOT ported. Dart carries it because its recommendation
// surfaces frame the thumbnail with enough inset to round it; this design has
// no radius anywhere and no card to round, and an always-false prop would be a
// lie about what the port does (../../../CLAUDE.md).
//
// Nothing here is tappable — see ./VideoCarouselCard.tsx for why, and
// ./FeaturedVideoCard.tsx for the one affordance the hero does draw.

import type { ShowcaseVideo } from '../showcaseContent';

import { CreatorAvatar } from './CreatorAvatar';
import { FILM_FACT_CLASS, FILM_META_CLASS, FILM_NAME_CLASS, FilmPanel } from './FilmPanel';
import { VIDEO_PARTS } from './videoParts';
import { videoMetaLabel } from './videoSelectors';
import { VideoThumbnail } from './VideoThumbnail';

/**
 * `_CreatorRow._kPfpSize` — an asset dimension, not a spacing token.
 *
 * Smaller than the Dart's 55: there the avatar leads a row of its own, and here
 * it sits inside a 13px meta line under a 30px name. At 55 it would be the
 * second-largest thing in the plinth and would start competing with the film's
 * name for the eye, which inverts the ranking this screen is built on.
 */
const PFP_SIZE = 32;

export interface VideoReccCardProps {
  video: ShowcaseVideo;
}

export function VideoReccCard({ video }: VideoReccCardProps) {
  return (
    <FilmPanel
      register="billed"
      media={<VideoThumbnail video={video} />}
      part={VIDEO_PARTS.reccCard}
    >
      <span className={FILM_NAME_CLASS}>{video.title}</span>
      {/*
        `GymVideoCard.metaLabel` — "Combat Culture ‧ 168K views", dropping the
        views clause when the channel hides its stats. The separator is the
        Dart's own U+2027 hyphenation point, not a bullet.
      */}
      <span className={FILM_META_CLASS}>
        <CreatorAvatar url={video.channelAvatarUrl} size={PFP_SIZE} />
        <span className={FILM_FACT_CLASS}>{videoMetaLabel(video)}</span>
      </span>
    </FilmPanel>
  );
}
