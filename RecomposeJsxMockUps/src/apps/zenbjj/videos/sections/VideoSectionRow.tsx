// Ports ../../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// sections/video_section_row.dart — a genre section as a horizontally scrolling
// row of cards, the body `carouselRows` ships today.
//
// THE ROW SCROLLS AND THE PAGE DOES TOO. Dart nests a horizontal
// `SingleChildScrollView` inside the screen's vertical one; the CSS equivalent
// is `overflow-x: auto` on the row inside the scaffold's opted-in vertical
// scroller (../../support/ShowcaseScaffold.tsx). The row's own inline padding
// is what lets the first and last card sit at the screen inset while the cards
// still scroll edge to edge.
//
// IT IS THE ONE SECTION THAT INSETS ITSELF, and Dart says why: its cards have
// to run past the gutter and off the edge, so the arrangement placing it cannot
// pad it from outside. Every other shape takes its inset from its owner.

import type { ShowcaseVideo } from '../../showcaseContent';
import { showcaseStyle } from '../../showcaseTokens';
import { PART_ATTR, VIDEO_PARTS } from '../videoParts';
import { VideoCarouselCard } from '../VideoCarouselCard';

import { VideoSectionHeader } from './VideoSectionHeader';
import styles from './VideoSectionRow.module.css';

export interface VideoSectionRowProps {
  title: string;
  videos: readonly ShowcaseVideo[];
  /**
   * The inline padding the header and the row's ends sit at. The videos tab
   * uses `screenHorizontalPadding` (video_section_row.dart:31) and the profile
   * uses `paddingBig` (level_up_videos_section.dart:79) — the one real
   * difference between the two Dart sections this file merges.
   */
  inset?: 'screen' | 'big' | undefined;
}

export function VideoSectionRow({ title, videos, inset = 'screen' }: VideoSectionRowProps) {
  // ZEN BJJ's screen gutter is `screenHorizontalPadding * 1.5`, the same value
  // every other surface in this fork insets to. `big` (the profile's carousel)
  // is left at `paddingBig`, which is what that screen's own blocks use.
  const insetVar =
    inset === 'big' ? 'var(--sc-padding-big)' : 'calc(var(--sc-screen-padding-x) * 1.5)';
  return (
    // `Column(stretch, spacing: spacingLarge)`.
    <section
      className={styles.section}
      style={showcaseStyle({ '--vc-inset': insetVar })}
      {...{ [PART_ATTR]: VIDEO_PARTS.section }}
    >
      {/*
        ZEN BJJ takes the `divider` header: the genre title, then a hairline
        running out to the "view all" action. It reads as an editorial band
        rather than as a heading with a button parked on the far side of it,
        and it gives a row of thumbnails a horizon to sit under. Both elements
        are still there and still say the same thing — only the rule is new,
        and a rule is not an affordance.
      */}
      <VideoSectionHeader title={title} style="divider" />
      {/* `SingleChildScrollView(horizontal) > Row(spacing: spacingLarge)`. */}
      <div className={styles.row}>
        {videos.map((video) => (
          <VideoCarouselCard key={video.videoId} video={video} />
        ))}
      </div>
    </section>
  );
}
