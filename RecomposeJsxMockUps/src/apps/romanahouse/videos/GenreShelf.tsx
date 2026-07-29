// One genre's shelf: a header, a "view all", and a horizontally scrolling run
// of numbered plates.
//
// Replaces ./sections/VideoSectionRow.tsx + ./VideoCarouselCard.tsx. The
// horizontal scroll is kept — it is what the inventory names and what a shelf
// IS — and so is every field on a card: the thumbnail, the creator avatar, the
// title and the view count. The card loses its surface and its radius, and
// gains an ordinal, because in this design a run of things is an order.

import type { ShowcaseVideo } from '../showcaseContent';
import { Plate } from '../shell/Plate';

import { CreatorAvatar } from './CreatorAvatar';
import styles from './GenreShelf.module.css';
import { formatViewCount } from './videoSelectors';

const SHELF_AVATAR = 20;

export interface GenreShelfProps {
  title: string;
  videos: readonly ShowcaseVideo[];
}

export function GenreShelf({ title, videos }: GenreShelfProps) {
  return (
    <section className={styles.shelf}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.viewAll}>view all</span>
      </header>
      <ol className={styles.run}>
        {videos.map((video, i) => (
          <li key={video.videoId} className={styles.item}>
            <Plate className={styles.plate} src={video.thumbnailUrl} slot={video.themeSlot} />
            <div className={styles.caption}>
              <span className={styles.ordinal}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.captionText}>
                <span className={styles.itemTitle}>{video.title}</span>
                <span className={styles.itemMeta}>
                  <CreatorAvatar url={video.channelAvatarUrl} size={SHELF_AVATAR} />
                  {views(video)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** `views.isEmpty ? channelName : '$views views'` — the base's own rule. */
function views(video: ShowcaseVideo): string {
  const count = formatViewCount(video.viewCount);
  return count === '' ? video.channelName : `${count} views`;
}
