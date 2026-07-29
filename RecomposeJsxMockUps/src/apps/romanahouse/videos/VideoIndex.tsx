// VIDEOS — the library as a plate index.
//
// Replaces ./layouts/VideosCarouselRows.tsx. The parts are the base's, in the
// base's order: the scope tabs, one featured hero, then one horizontally
// scrolling shelf per genre with its own header and its own "view all". What
// changes is that a video is a numbered PLATE with its caption beneath it,
// never a card with type over or inside artwork.
//
// THE CAPTION IS OUTSIDE THE FRAME, and here that is forced as well as chosen:
// a run's video thumbnails are real YouTube frames with their own titles burnt
// into the pixels, so a title laid over one collides with the artwork's own
// lettering. Captioning beneath is the only treatment that survives the assets
// this app actually has.
//
// The featured video's Play is the screen's one walnut band — the same role the
// store's balance block plays there: exactly one thing on the sheet is filled.

import type { ShowcaseVideo } from '../showcaseContent';

import { GenreShelf } from './GenreShelf';
import { Plate } from '../shell/Plate';
import { CreatorAvatar } from './CreatorAvatar';
import styles from './VideoIndex.module.css';
import { videoMetaLabel } from './videoSelectors';
import type { VideosLayoutData } from './videosLayoutData';
import { sectionTitle } from './videosLayoutData';

const FEATURED_AVATAR = 34;

export function VideoIndex({ data }: { data: VideosLayoutData }) {
  return (
    <div className={styles.index}>
      {/* The scope tabs. Labels rather than controls, exactly as in the base —
          ./VideoCategoryTabs.tsx explains why the preview does not drive them. */}
      <div className={styles.scope}>
        {data.tabLabels.map((label, i) => (
          <span
            key={label}
            className={i === data.selectedTabIndex ? styles.scopeItemActive : styles.scopeItem}
          >
            {label}
          </span>
        ))}
      </div>

      {data.featured !== null && <Featured video={data.featured} />}

      {data.sections.map((section) => (
        <GenreShelf
          key={section.genre}
          title={sectionTitle(section)}
          videos={section.videos}
        />
      ))}

      {data.isEmpty && <p className={styles.empty}>Nothing here yet.</p>}
    </div>
  );
}

function Featured({ video }: { video: ShowcaseVideo }) {
  return (
    <section className={styles.featured}>
      <h2 className={styles.featuredLabel}>Featured</h2>
      <div className={styles.featuredInset}>
        <Plate
          className={styles.featuredPlate}
          src={video.thumbnailUrl}
          slot={video.themeSlot}
        />
        <div className={styles.featuredCaption}>
          <CreatorAvatar url={video.channelAvatarUrl} size={FEATURED_AVATAR} />
          <div className={styles.featuredText}>
            <span className={styles.featuredTitle}>{video.title}</span>
            <span className={styles.featuredMeta}>{videoMetaLabel(video)}</span>
          </div>
        </div>
      </div>
      {/* The screen's one filled action. */}
      <button type="button" className={styles.play}>
        Play
      </button>
    </section>
  );
}
