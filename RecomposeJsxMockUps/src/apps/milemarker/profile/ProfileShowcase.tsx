// PROFILE — the member's rank and progress.
//
// The base stacks a topbar, a belt header, a summary, a next-rank section with a
// circular progress badge, a rating graph with a pill selector, and a level-up
// row. This rebuilds it as the horizon: the RANK is the one thing in the air
// with its medallion floating beside it, and the ground carries the progress as
// a filled track, the plot, and the shelf.
//
// EVERY ELEMENT IS STILL HERE: the topbar (the sky), the rank header with its
// current belt, the rank summary, the next-rank section with its progress and
// its next-belt preview, the rating graph with its timeframe selector, and the
// level-up videos row.
//
// THE CIRCULAR PROGRESS BADGE IS NOW A TRACK, and that is a form change rather
// than a dropped element: the same numerator, denominator and next-rank belt are
// all still on the screen. A ring measures nothing in this design — progress
// fills a lane at a constant rate and stops flat against its mark, which is what
// the motion direction asks for and what a track can show and a ring cannot.

import { showcaseAsset } from '../showcaseAssets';
import type { ShowcaseVideo } from '../showcaseContent';
import { SLOT_NEXT_RANK_BELT_IMAGE, SLOT_RANK_BELT } from '../showcaseSlots';
import { cx } from '../cx';
import { Disc } from '../shell/Disc';
import { Lane } from '../shell/Lane';
import { LastLane } from '../shell/LastLane';
import { Screen } from '../shell/Screen';
import { Sky, SkyMark } from '../shell/Sky';
import { videoMetaLabel } from '../videos/videoSelectors';
import { levelUpVideos } from '../videos/videoSelectors';

import {
  RANK_TIMEFRAMES,
  SHOWCASE_RANK,
  SHOWCASE_RANK_POINTS,
  SHOWCASE_TIMEFRAME_INDEX,
} from './mockRankProgress';
import { RatingGraph } from './RatingGraph';
import styles from './RecordLane.module.css';

/** `ShowcaseScreen.build`'s `gymName` default. */
const DEFAULT_GYM_NAME = 'Your Gym';

export interface ProfileShowcaseProps {
  /** The host gym's name. There is no gym in this browser. */
  gymName?: string;
  /** The host gym's real logo URL. Absent here. */
  gymLogoSrc?: string | undefined;
  /** The resolved feed, for the level-up row. */
  videos: readonly ShowcaseVideo[];
}

export function ProfileShowcase({
  gymName: _gymName = DEFAULT_GYM_NAME,
  gymLogoSrc: _gymLogoSrc,
  videos,
}: ProfileShowcaseProps) {
  const rank = SHOWCASE_RANK;
  const levelUp = levelUpVideos(videos);
  // `classesSinceRank / classesTillNextStep`, clamped — the same two numbers the
  // base's circular badge divides.
  const ratio =
    rank.classesTillNextStep === 0
      ? 0
      : Math.min(1, Math.max(0, rank.classesSinceRank / rank.classesTillNextStep));
  const remaining = Math.max(0, rank.classesTillNextStep - rank.classesSinceRank);

  return (
    <Screen
      sky={
        <Sky
          label="Your rank"
          headline={rank.name}
          small
          aside={rank.subLabel}
          mark={
            <SkyMark
              slot={SLOT_RANK_BELT}
              fallbackSrc={showcaseAsset('profile_rank_belt_gold.png')}
            />
          }
        />
      }
      foot={<LastLane selected="rank" />}
    >
      <Lane first label="Progress" labelAside={`${String(remaining)} to go`}>
        <div className={styles.progressRow}>
          <span className={styles.stat}>
            <span className={styles.figure}>{rank.classesSinceRank}</span>
            <span className={styles.unit}>Classes in rank</span>
          </span>
          <span className={styles.stat}>
            <span className={styles.figure}>{rank.classesTillNextStep}</span>
            <span className={styles.unit}>Needed</span>
          </span>
        </div>
        <div className={styles.track}>
          <span className={styles.fill} style={{ width: `${String(ratio * 100)}%` }} />
          <span className={styles.mark} style={{ left: `${String(ratio * 100)}%` }} />
        </div>
      </Lane>

      <Lane label="Next rank">
        <div className={styles.nextRow}>
          <Disc
            size={64}
            slot={SLOT_NEXT_RANK_BELT_IMAGE}
            src={showcaseAsset('profile_next_rank_belt.png')}
            object
          />
          <span className={styles.rankCol}>
            <span className={styles.rankName}>{remaining} more classes</span>
            <span className={styles.rankSub}>Until your next promotion</span>
          </span>
        </div>
      </Lane>

      <Lane label="Rating">
        {/*
          The timeframe selector. PINNED to ALL and rendered as labels, exactly
          as in the base: every showcase surface is a preview inside a frame that
          takes no input, and the pill that reads active and the window the plot
          actually uses are pinned to one constant so they cannot drift apart.
        */}
        <div className={styles.frames}>
          {RANK_TIMEFRAMES.map((frame, i) => (
            <span
              key={frame.label}
              className={cx(
                styles.frame,
                i === SHOWCASE_TIMEFRAME_INDEX && styles.frameActive,
              )}
            >
              {i === SHOWCASE_TIMEFRAME_INDEX && <span className={styles.frameTape} />}
              {frame.label}
            </span>
          ))}
        </div>
        <RatingGraph points={SHOWCASE_RANK_POINTS} />
      </Lane>

      {levelUp.length > 0 && (
        <Lane label="Level up" bleed>
          <div className={styles.shelf}>
            {levelUp.map((video) => (
              <span key={video.videoId} className={styles.card}>
                <Disc size={84} slot={video.themeSlot} src={video.thumbnailUrl} />
                <span className={styles.cardTitle}>{video.title}</span>
                <span className={styles.rankSub}>{videoMetaLabel(video)}</span>
              </span>
            ))}
          </div>
        </Lane>
      )}
    </Screen>
  );
}
