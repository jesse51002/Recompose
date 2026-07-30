// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// video_carousel_section.dart plus its `row` section — one genre: a brass rule,
// the genre's name, its "view all", and that genre's films running sideways.
//
// FOUR SHAPES BECAME ONE. The base carried `row` / `stack` / `grid` / `tall`
// and four card sizes beneath them, a vocabulary left over from the arrangement
// presets this package tested and rejected (../../../CLAUDE.md, "One layout and
// one animation per asset"). Only `row` was ever rendered; the other three are
// deleted rather than left unreachable in the old design language.
//
// THE STRIP IS THE ONE SIDEWAYS SCROLL IN THIS APP, and it is why a film on a
// shelf is billed rather than split (./FilmPanel.tsx): on a sideways strip the
// space beside a picture is where the NEXT film is, so the satin goes
// underneath. The strip insets its own ends rather than being padded from
// outside, which is Dart's own reason too — its cards have to run past the
// gutter and off the edge.
//
// Also the Profile screen's "Videos to level up" shelf
// (`level_up_videos_section.dart:99`), which is why it lives here rather than
// under this screen's own folder and why `inset` survives.

import type { ShowcaseVideo } from '../showcaseContent';
import { showcaseStyle } from '../showcaseTokens';

import { VideoSectionHeader } from './sections/VideoSectionHeader';
import styles from './VideoCarouselSection.module.css';
import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import { VideoCarouselCard } from './VideoCarouselCard';

export interface VideoCarouselSectionProps {
  title: string;
  videos: readonly ShowcaseVideo[];
  /**
   * The inline inset the header and the strip's ends sit at. The videos tab
   * uses `screenHorizontalPadding` (video_section_row.dart:31) and the profile
   * uses `paddingBig` (level_up_videos_section.dart:79) — the one real
   * difference between the two Dart sections this file merges.
   *
   * It reaches the header through `--vc-inset` rather than a prop, because the
   * brass rule that opens the section is FULL BLEED and only the words under it
   * are inset. One variable set here is what keeps those two facts in step.
   */
  inset?: 'screen' | 'big' | undefined;
}

export function VideoCarouselSection({ title, videos, inset = 'screen' }: VideoCarouselSectionProps) {
  const insetVar = inset === 'big' ? 'var(--sc-padding-big)' : 'var(--sc-screen-padding-x)';
  return (
    <section
      className={styles.section}
      style={showcaseStyle({ '--vc-inset': insetVar })}
      {...{ [PART_ATTR]: VIDEO_PARTS.section }}
    >
      <VideoSectionHeader title={title} />
      <div className={styles.strip}>
        {videos.map((video, index) => (
          // The index is the plinth's place in the entrance count, not an
          // identity — `videoId` is the key, exactly as it was.
          <VideoCarouselCard key={video.videoId} video={video} index={index} />
        ))}
      </div>
    </section>
  );
}
