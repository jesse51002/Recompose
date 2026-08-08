// Ports ../../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// sections/video_section_header.dart — how a genre opens: the brass hairline,
// the genre's name, and its "view all" at the far end of the same line.
//
// Also ports the header half of `level_up_videos/level_up_videos_header.dart`,
// which is the byte-identical row under a different name; the two Dart files
// differ only in the padding token their owner wraps them in, so that arrives
// here as the `--vc-inset` variable the placing section sets.
//
// WHY IT IS NOT ../../shell/Section.tsx. That component is the shell's reading
// region — a brass rule, a label, and the prose under it — and it is exactly
// right everywhere the label has nothing beside it. Here "view all" has to sit
// at the far end of the label's own row: an affordance reachable only after a
// sideways scroll has been buried, and the invariant counts buried as removed.
// The rule and the label register are the shell's, so the two read as the same
// thing opening.
//
// THE GENRE IS A LABEL, NOT A NAME. The display serif in this app names WORKS —
// the class, the reward, the film — and a genre is a shelf those works sit on.
// It is also rank 3 on this screen (the ranking puts the section headers under
// the film title and its channel), so it is the small tracked sans, held back
// to the second ink. Setting it in the serif would make the loudest thing on a
// browsing screen the word "EDUCATIONAL".
//
// `showViewAll` and the three header styles are gone with the section shapes
// they served (../VideoCarouselSection.tsx). There is one header now, and the
// action never disappears from it.

import { VideoViewAllAction } from '../VideoViewAllAction';
import { PART_ATTR, VIDEO_PARTS } from '../videoParts';

import styles from './VideoSectionHeader.module.css';

export interface VideoSectionHeaderProps {
  title: string;
}

export function VideoSectionHeader({ title }: VideoSectionHeaderProps) {
  return (
    <header className={styles.header}>
      {/* Brass is a LINE and a MARK, never a word — see the stylesheet. */}
      <div className={styles.rule} />
      <div className={styles.row}>
        <h2 className={styles.title} {...{ [PART_ATTR]: VIDEO_PARTS.sectionTitle }}>
          {title}
        </h2>
        <VideoViewAllAction />
      </div>
    </header>
  );
}
