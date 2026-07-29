// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// video_carousel_section.dart plus its `row` section and header — one genre's
// films, its title, and its "view all", as ONE place on the thread.
//
// A GENRE IS THE THREAD BOWING SIDEWAYS. The line swells to a node, the genre
// says its own name beside that node, and below it the line runs out across the
// screen through the frames it carries and back down (../shell/Thread.tsx's
// `Bow`). That excursion is the only sideways scrolling anywhere in this app,
// which is what makes it read as part of one sequence rather than a second axis
// bolted onto the page.
//
// FOUR SHAPES BECAME ONE. The base carried `row` / `stack` / `grid` / `tall`
// and four card sizes beneath them, a vocabulary left over from the arrangement
// presets this package tested and rejected (../../../CLAUDE.md, "One layout and
// one animation per asset"). Only `row` was ever rendered; the other three are
// deleted rather than left unreachable in the old design language, because a
// fork carrying shapes that can only render wrong is a fork the next agent has
// to reverse-engineer.
//
// THE HEADER AND THE NODE SHARE A GRID ROW, so the label cannot drift away from
// the thing it names — the same construction ../shell/Thread.tsx's `Region`
// uses. This does not simply call `Region` because "view all" has to sit at the
// far end of the label's own row: an affordance that is only reachable after a
// sideways scroll has been buried, which the invariant counts as removed.
//
// Also the Profile screen's "Videos to level up" shelf
// (`level_up_videos_section.dart:99`), which is why it lives here rather than
// under this screen's own folder and why `inset` survives.

import { Bow, Node } from '../shell/Thread';
import type { ShowcaseVideo } from '../showcaseContent';
import { showcaseStyle } from '../showcaseTokens';

import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import { VideoCarouselCard } from './VideoCarouselCard';
import styles from './VideoCarouselSection.module.css';
import { VideoViewAllAction } from './VideoViewAllAction';

export interface VideoCarouselSectionProps {
  title: string;
  videos: readonly ShowcaseVideo[];
  /**
   * Where the header's trailing edge sits. The videos tab uses the screen
   * gutter (`video_section_row.dart:31`) and the profile uses `paddingBig`
   * (`level_up_videos_section.dart:79`) — the one real difference between the
   * two Dart sections this file merges.
   *
   * The LEADING edge is not a parameter any more and cannot be: in this design
   * every region begins at the thread, and a shelf that started somewhere else
   * would be beside the line rather than on it.
   */
  inset?: 'screen' | 'big' | undefined;
}

export function VideoCarouselSection({
  title,
  videos,
  inset = 'screen',
}: VideoCarouselSectionProps) {
  const trail = inset === 'big' ? 'var(--sc-padding-big)' : 'var(--sc-screen-padding-x)';
  return (
    <section
      className={styles.shelf}
      style={showcaseStyle({ '--vc-trail': trail })}
      {...{ [PART_ATTR]: VIDEO_PARTS.section }}
    >
      <Node kind="open" />
      <header className={styles.head}>
        <h2 className={styles.title} {...{ [PART_ATTR]: VIDEO_PARTS.sectionTitle }}>
          {title}
        </h2>
        <VideoViewAllAction />
      </header>
      <div className={styles.strip}>
        <Bow>
          {videos.map((video) => (
            <VideoCarouselCard key={video.videoId} video={video} />
          ))}
        </Bow>
      </div>
    </section>
  );
}
