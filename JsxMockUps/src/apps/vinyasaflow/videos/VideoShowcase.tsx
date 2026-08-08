// THE VIDEO LIBRARY, as a sequence rather than as a page of shelves.
//
// Ports ../../../../../../MobileApp/lib/features/videos/presentation/screens/
// videos_screen.dart. Same element set as ../../combatden's: the head, the
// scope tabs, one featured hero, one carousel per genre, the four destinations
// at the foot with Videos marked. What changed is that none of it sits in a
// box any more — every part of it hangs on the one terracotta thread the shell
// draws (../shell/Screen.tsx), and each genre is the thread bowing sideways to
// gather that genre's frames and coming back.
//
// THE HARDEST IMAGERY CONSTRAINT IN THE APP IS ON THIS SCREEN. Every video
// still carries its TITLE BURNT INTO THE FRAME, and the four generated slots
// are not one shape: `video_thumb_1/2/4` are 1200x675 (16:9) and
// `video_thumb_3` is 480x360 (4:3, with the letterbox bars burnt in too). A
// shelf that fixed a WIDTH would crop one of the four; a shelf that fixed a box
// would crop three. So the shelf fixes HEIGHT only (../shell/Photo.tsx's
// `StripPhoto`) and lets width differ, which is exactly how frames sit on a
// strip — the 4:3 simply reads narrower than its neighbours and not one of them
// loses a pixel. Guardrail 10b, and the reason "ENDARY" / "KING" / "1-6 D" are
// real output from getting it wrong here.
//
// THE FOURTEEN CARDS CYCLE ACROSS FOUR SLOTS, and that is resolved once in
// ../useShowcaseContent.ts, not here: card `i` takes slot `i % 4` for its
// picture AND its title, off the same index. Nothing on this screen re-derives
// it, which is what stops a card wearing one video's frame under another's
// name.
//
// A STATIC, SCROLLING SURFACE. The real screen is a `CustomScrollView` and so
// is this one (`bodyScroll`): a feed is the one thing in the member app that
// cannot be shown in a single viewport, and clipping it would preview a shorter
// app than the one being sold.
//
// THE STATES THE REAL SCREEN HAS AND THIS ONE DOES NOT. `videos_screen.dart`
// branches over loading / error / empty because it awaits a portal fetch. The
// preview resolves its feed synchronously from bundled constants
// (../useShowcaseContent.ts), so the two request states have no reachable input
// — see ./VideosFeedStatus.tsx.
//
// WHAT IS THE GYM'S AND WHAT IS THE MEMBER'S. `gymName` / `gymLogoSrc` are the
// HOST's gym identity and are NOT customization slots. The streak, points and
// rank badge the head carries are PER-MEMBER chrome and stay sample data,
// exactly as ../RewardsShowcase.tsx keeps them when a gym's real rewards are
// injected.

import { Head } from '../shell/Head';
import { Screen } from '../shell/Screen';
import { Region } from '../shell/Thread';
import { ThreadNav } from '../shell/ThreadNav';
import type { ShowcaseVideo } from '../showcaseContent';

import { FeaturedVideoCard } from './FeaturedVideoCard';
import { VideoCarouselSection } from './VideoCarouselSection';
import styles from './VideoShowcase.module.css';
import { VideosFeedStatus } from './VideosFeedStatus';
import { VideosScopeTabs } from './VideosScopeTabs';
import { sectionTitle, videosLayoutData } from './videosLayoutData';

/** `VideosScreen`'s own default gym name, matching every other surface here. */
const DEFAULT_GYM_NAME = 'Your Gym';

// Dummy non-identity data: the streak and points the head carries, the same
// sample values ../home/HomeShowcase.tsx uses.
const STREAK_DAYS = 3;
const POINTS_LABEL = '3.4k';

/**
 * The region announcing the hero.
 *
 * It names what is already visible — the card the feed puts first — rather than
 * telling the member anything the screen did not already say, which is what
 * keeps it typography instead of a new piece of data.
 */
const FEATURED_LABEL = 'Featured';

export interface VideoShowcaseProps {
  /** The host gym's name. There is no gym in this browser. */
  gymName?: string;
  /** The host gym's real logo URL. Absent here. */
  gymLogoSrc?: string | undefined;
  /**
   * Resolve the theme's `logo_primary` as the mark's middle rung.
   *
   * DEFAULTS TRUE HERE, where the base's `nameOnly` topbar drew no mark at all
   * and therefore never had to answer the question. This fork's head always
   * draws the mark, because the mark is where the thread comes from and is the
   * one element that does not redraw between screens (../shell/Head.tsx) — so a
   * themed run must re-logo it, or the video tab shows a different brand's mark
   * than the home tab does.
   */
  themeTabPreview?: boolean | undefined;
  /** The resolved feed for the previewed theme's category. */
  videos: readonly ShowcaseVideo[];
}

export function VideoShowcase({
  gymName = DEFAULT_GYM_NAME,
  gymLogoSrc,
  themeTabPreview = true,
  videos,
}: VideoShowcaseProps) {
  const data = videosLayoutData(videos);
  const { featured } = data;

  return (
    <Screen
      head={
        <Head
          gymName={gymName}
          gymLogoSrc={gymLogoSrc}
          themeTabPreview={themeTabPreview}
          streakDays={STREAK_DAYS}
          pointsLabel={POINTS_LABEL}
        />
      }
      foot={<ThreadNav selected="videos" />}
      bodyScroll
    >
      <div className={styles.feed}>
        {/*
          The scope tabs are the thread's first excursion below the head: the
          line goes out sideways through the genre words and comes back. They
          are labels rather than controls because in the app a genre pill opens
          that genre's own list and a preview has nowhere to open — the same
          conclusion ../rewards/RewardsTabs.tsx reached for its two tabs.
        */}
        <VideosScopeTabs data={data} />

        {featured !== null && (
          // `solid` — the line swelling to a stop for the thing the feed puts
          // first. `bleed` because the hero photograph runs edge to edge at its
          // own ratio, with the thread redrawn across it in the knockout ink.
          <Region label={FEATURED_LABEL} kind="solid" bleed>
            <FeaturedVideoCard video={featured} />
          </Region>
        )}

        {data.sections.map((section) => (
          <VideoCarouselSection
            key={section.genre}
            title={sectionTitle(section)}
            videos={section.videos}
          />
        ))}

        {data.isEmpty && <VideosFeedStatus />}
      </div>
    </Screen>
  );
}
