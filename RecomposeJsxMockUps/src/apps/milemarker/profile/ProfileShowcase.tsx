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
//
// THE NEXT-RANK REGION IS ONE LANE, and it is one deliberately. It shipped as
// two — a "Progress" lane and a "Next rank" lane — and the split stated the
// remaining count twice, once as an aside and once as a headline, in two
// different phrasings. Nothing was missing and nothing was added, so the
// inventory check passed in both directions and the screen was still wrong.
// `mockup-qa` Pass 1b is the check that catches it.

import { showcaseAsset } from '../showcaseAssets';
import type { ShowcaseVideo } from '../showcaseContent';
import { SLOT_NEXT_RANK_BELT_IMAGE, SLOT_RANK_BELT } from '../showcaseSlots';
import { cx } from '../cx';
import { Disc } from '../shell/Disc';
import { Frame } from '../shell/Frame';
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
  nextRankProgress,
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
  // The base's own arithmetic, not a local re-derivation. It also carries the
  // top-of-the-ladder case: with no target the track reads empty and the label
  // names the state rather than printing "17 / 0 classes".
  const { progress, label } = nextRankProgress(rank);
  // `label` is the base's "17 / 24 classes" — the SAME two numbers this lane
  // already sets as figures, so printing both says one thing twice. The figures
  // are this design's treatment of it (the largest thing in a region is a
  // number), and the string is kept for the one state they cannot express: at
  // the top of the ladder there is no target, and the label reads "Top of the
  // ladder." instead.
  const atTop = rank.classesTillNextStep <= 0;
  // ONE DELIBERATE ECHO, recorded so a Pass 1b sweep does not re-litigate it:
  // the target (24) is set as a figure here AND appears as the rating graph's
  // y-axis maximum below, because the graph plots progress toward that same
  // threshold. They are the member's target and the plot's scale — different
  // roles, and a plot without its scale is unreadable. The base avoids the
  // collision only because it never promotes the target to a standalone
  // number; this design does, and that is the trade it makes on purpose.

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
      {/*
        ONE region, not two. This was split into a "Progress" lane and a "Next
        rank" lane, and the split silently stated the same fact twice — the
        remaining count appeared as an aside on one and as the headline of the
        other. The base has a single next-rank section carrying exactly three
        things: the belt preview, the progress, and the `done / target` label.
        That is what this is.
      */}
      <Lane first label="Next rank" labelAside={atTop ? label : undefined}>
        <div className={styles.nextRow}>
          <Disc
            size={64}
            slot={SLOT_NEXT_RANK_BELT_IMAGE}
            src={showcaseAsset('profile_next_rank_belt.png')}
            object
          />
          <span className={styles.rankCol}>
            <span className={styles.progressRow}>
              <span className={styles.stat}>
                <span className={styles.figure}>{rank.classesSinceRank}</span>
                <span className={styles.unit}>Classes in rank</span>
              </span>
              <span className={styles.stat}>
                <span className={styles.figure}>{rank.classesTillNextStep}</span>
                <span className={styles.unit}>Needed</span>
              </span>
            </span>
          </span>
        </div>
        <div className={styles.track}>
          <span className={styles.fill} style={{ width: `${String(progress * 100)}%` }} />
          <span className={styles.mark} style={{ left: `${String(progress * 100)}%` }} />
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
                <Frame width={140} ratio={16 / 9} slot={video.themeSlot} src={video.thumbnailUrl} />
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
