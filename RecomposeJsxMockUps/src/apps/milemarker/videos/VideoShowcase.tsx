// VIDEO — the library.
//
// The base draws a topbar, a scope-tab row, a big featured card and one
// horizontally-scrolling carousel per genre, every card a rounded thumbnail
// with text beneath. This rebuilds it as the horizon: the featured video is the
// one thing in the air and its thumbnail is the first stretch of route below,
// then one lane per genre with its entries struck into discs and travelling
// sideways.
//
// EVERY ELEMENT IS STILL HERE: the topbar (now the sky), the scope tabs, the
// featured hero card, and one section per genre with its header and its
// horizontally-scrolling cards.
//
// GUARDRAIL 10 IS LIVE ON THIS SCREEN. The feed is fourteen cards against four
// generated thumbnail slots, so card `i` takes slot `i % 4` for its PICTURE and
// its TITLE off the same index — `themeSlot` is stamped where the feed is
// resolved, never chosen at a call site. Splitting the two was tried in the base
// and is worse: card five then wears thumbnail one under a title belonging to
// nothing. A card that repeats is fine; a card that contradicts itself is broken.

import { cx } from '../cx';
import type { ShowcaseVideo } from '../showcaseContent';
import { Disc } from '../shell/Disc';
import { Lane } from '../shell/Lane';
import { LastLane } from '../shell/LastLane';
import { RouteImage } from '../shell/RouteImage';
import { Screen } from '../shell/Screen';
import { Sky } from '../shell/Sky';

import styles from './VideoIndex.module.css';
import { sectionTitle, videosLayoutData } from './videosLayoutData';
import { videoMetaLabel } from './videoSelectors';

/** `ShowcaseScreen.build`'s `gymName` default. */
const DEFAULT_GYM_NAME = 'Your Gym';

// Re-exported for the same reason the base does it: one import site for the
// tab labels, which live in ./videosLayoutData.ts with the rest of the payload.
export { videoTabLabels } from './videosLayoutData';

export interface VideoShowcaseProps {
  /** The host gym's name. There is no gym in this browser. */
  gymName?: string;
  /** The host gym's real logo URL. Absent here. */
  gymLogoSrc?: string | undefined;
  /** The resolved feed for the previewed theme's category. */
  videos: readonly ShowcaseVideo[];
}

export function VideoShowcase({
  gymName: _gymName = DEFAULT_GYM_NAME,
  gymLogoSrc: _gymLogoSrc,
  videos,
}: VideoShowcaseProps) {
  const data = videosLayoutData(videos);
  const { featured } = data;

  return (
    <Screen
      shortSky
      sky={
        <Sky
          label="Featured"
          headline={featured?.title ?? 'Library'}
          small
          aside={featured === null ? undefined : videoMetaLabel(featured)}
        />
      }
      foot={<LastLane selected="videos" />}
    >
      {/*
        The scope tabs. LABELS, not controls — the same call the base makes, and
        for the same reason: switching them would add an affordance the shipped
        screen does not carry.
      */}
      <Lane first flush>
        <div className={styles.tabs}>
          {data.tabLabels.map((label, i) => (
            <span
              key={label}
              className={cx(styles.tab, i === data.selectedTabIndex && styles.tabActive)}
            >
              {i === data.selectedTabIndex && <span className={styles.tabTape} />}
              {label}
            </span>
          ))}
        </div>
      </Lane>

      {featured !== null && (
        <Lane bleed flush>
          <RouteImage
            slot={featured.themeSlot}
            src={featured.thumbnailUrl}
            height={186}
          />
          <div className={styles.creator}>
            {featured.channelAvatarUrl !== '' && (
              <Disc size={28} src={featured.channelAvatarUrl} />
            )}
            <span className={styles.creatorName}>{featured.channelName}</span>
          </div>
        </Lane>
      )}

      {data.isEmpty && (
        <Lane label="Library">
          <span className={styles.empty}>Nothing to watch here yet.</span>
        </Lane>
      )}

      {data.sections.map((section) => (
        <Lane
          key={section.genre}
          label={sectionTitle(section)}
          labelAside={`${String(section.videos.length)}`}
          bleed
        >
          <div className={styles.shelf}>
            {section.videos.map((video) => (
              <span key={video.videoId} className={styles.card}>
                <Disc size={92} slot={video.themeSlot} src={video.thumbnailUrl} />
                <span className={styles.cardTitle}>{video.title}</span>
                <span className={styles.cardMeta}>{videoMetaLabel(video)}</span>
              </span>
            ))}
          </div>
        </Lane>
      ))}
    </Screen>
  );
}
