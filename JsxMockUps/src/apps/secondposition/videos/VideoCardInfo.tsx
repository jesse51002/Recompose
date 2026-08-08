// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// cards/video_card_info.dart — what a shelf film's satin field says: the film's
// NAME, and under it the channel's avatar with the view count.
//
// IT CARRIES THE NAME NOW, WHERE THE DART CARRIES ONLY THE META LINE. In this
// design the name and the picture are one claim about one thing and they share
// a panel (./FilmPanel.tsx), so the field's whole contents are one unit and are
// written in one place. Splitting the name into the panel and the meta into
// here would give two files an opinion about the same object.
//
// It sets no type of its own: the three rungs it uses are the classes
// ./FilmPanel.tsx exports, so a shelf film and the hero cannot drift apart. The
// register is decided by which panel they are inside, not by which component
// wrote the markup — which is also why this file has no stylesheet.
//
// `compact` and `flush` are gone with the card sizes they served — the base
// carried four `VideoCardSize` shapes feeding four section shapes, a vocabulary
// left over from the arrangement presets this package tested and rejected
// (../../../CLAUDE.md, "One layout and one animation per asset"). A prop with
// one possible value is a lie about what the component does.

import type { ShowcaseVideo } from '../showcaseContent';

import { CreatorAvatar } from './CreatorAvatar';
import { FILM_FACT_CLASS, FILM_META_CLASS, FILM_NAME_CLASS } from './FilmPanel';
import { formatViewCount } from './videoSelectors';

/** `_kPfpSizeCompact` — an asset dimension, not a spacing token. */
const PFP_SIZE = 24;

export interface VideoCardInfoProps {
  video: ShowcaseVideo;
}

export function VideoCardInfo({ video }: VideoCardInfoProps) {
  const views = formatViewCount(video.viewCount);
  return (
    <>
      <span className={FILM_NAME_CLASS}>{video.title}</span>
      <span className={FILM_META_CLASS}>
        <CreatorAvatar url={video.channelAvatarUrl} size={PFP_SIZE} />
        {/* `views.isEmpty ? channelName : '$views views'` — verbatim. */}
        <span className={FILM_FACT_CLASS}>
          {views === '' ? video.channelName : `${views} views`}
        </span>
      </span>
    </>
  );
}
