// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// level_up_videos/level_up_videos_section.dart — "Videos to level up", the
// Education-bucket films from the live feed.
//
// IT IS THE VIDEOS TAB'S OWN SECTION, RENDERED HERE. That is the Dart's shape
// too — `level_up_videos_section.dart:99` builds the same carousel widget the
// videos screen builds — and it is the right shape for a redesign as well:
// a film on this shelf and a film on that one are the same object, so they are
// one component. Two implementations of the panel would drift the moment either
// screen was touched, and a member would see the same film wearing two
// different faces on two tabs (Guardrail 7's shape, one layer up from an
// image).
//
// IT HIDES ITSELF WHEN EMPTY (Dart's `SizedBox.shrink()`), so a tenant whose
// feed carries no educational films gets no heading over nothing. The base also
// had to hide a divider with it; there is no divider here — the section opens
// with its own brass rule and takes it away with itself.
//
// IT SITS AT THE SCREEN GUTTER, NOT AT `paddingBig`. Dart insets this shelf at
// 32 where the videos screen insets its own at 16, and that difference belonged
// to the base's profile layout rather than to the shelf: every heading on THIS
// screen — the masthead's carried line, both ruled sections above — starts at
// the screen gutter, and one region starting 16px further in reads as a
// misalignment rather than as a nesting. A member's eye returns to one left
// edge (Guardrail 15).
//
// The section's own brass rule runs FULL BLEED where the two rules above it are
// inset, and that is deliberate: a rule opens the region under it at the width
// that region occupies, and this one opens a strip that runs off both edges.

import { VideoCarouselSection } from '../videos/VideoCarouselSection';
import type { ShowcaseVideo } from '../showcaseContent';

import { RANK_PART } from './rankParts';
import styles from './LevelUpVideos.module.css';

/** `_kSectionTitle` — the one heading, wherever the shelf is placed. */
const TITLE = 'Videos to level up';

export function LevelUpVideos({ videos }: { videos: readonly ShowcaseVideo[] }) {
  if (videos.length === 0) return null;
  return (
    // `display: contents` — the marker stamps this screen's inventory
    // (./rankParts.ts) onto a component this folder does not own, and generates
    // no box, so the section stays a direct child of the screen's column.
    <div className={styles.marker} data-rank-part={RANK_PART.levelUpVideos}>
      <VideoCarouselSection title={TITLE} videos={videos} inset="screen" />
    </div>
  );
}
