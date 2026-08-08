// THE VIDEO LIBRARY — the company's films, on a bill.
//
// Ports ../../../../../../MobileApp/lib/features/videos/presentation/screens/
// videos_screen.dart. Same element set as ../../combatden's: the masthead, the
// scope tabs, one featured hero, one carousel per genre with its own header,
// and the four destinations at the foot with Videos marked.
//
// WHAT IT IS. ../layout_brief.yaml: everything this app lists is one full-bleed
// panel that is half picture and half satin field, and the first work on a bill
// is billed larger. So the hero film's still runs the full width of the screen
// at its own 16:9 with the satin carried underneath as a plinth, its name set
// in the display serif larger than anything else on the page; every genre below
// it is a brass rule, the genre's name, and that genre's films on a strip in
// the same unit at two thirds the width. There is no card anywhere, no radius
// and nothing floating — a genre is separated from the one above it by a change
// of field and a line.
//
// EMPHASIS: the film's TITLE AND ITS STILL, TOGETHER, lead. They are one claim
// about one thing — the pipeline generates the still FROM the title, and
// ../useShowcaseContent.ts stamps the pair off one index — so they are sized
// and placed as one object rather than as a picture with a caption. The channel
// and the view count follow; the scope tabs and the genre headers are the small
// tracked sans and stay support. A figure never leads a browsing screen here.
//
// EVERY STILL IS 16:9 AND GETS A 16:9 BOX (Guardrail 10b). The run's four
// generated slots are 1200x675 and the shared-pool fallbacks are YouTube's own
// 1280x720. Cropping one to a square discards 44% of the width and renders
// fragments of the burnt-in title — `ENDARY`, `KING`, `1-6 D` are real output
// from this package getting it wrong. The box is set once, in
// ./FilmPanel.module.css, and no call site re-derives it.
//
// THE FEED CYCLES ACROSS FOUR SLOTS AND THAT IS RESOLVED ONCE, upstream in
// ../useShowcaseContent.ts: card `i` takes slot `i % 4` for its picture AND its
// title, off the same index. Nothing on this screen re-derives it, which is
// what stops a card wearing one film's still under another film's name.
//
// A STATIC, SCROLLING SURFACE. The real screen is a `CustomScrollView` and so
// is this one (`scroll` on ../shell/Screen.tsx): a feed is the one thing in the
// member app that cannot be shown in a single viewport, and clipping it would
// preview a shorter app than the one being sold.
//
// THE STATES THE REAL SCREEN HAS AND THIS ONE DOES NOT. `videos_screen.dart`
// branches over loading / error / empty because it awaits a portal fetch. This
// preview resolves its feed synchronously from bundled constants
// (../useShowcaseContent.ts), so the two request states have no reachable input
// — see ./VideosFeedStatus.tsx.
//
// WHAT IS THE GYM'S AND WHAT IS THE MEMBER'S. `gymName` / `gymLogoSrc` are the
// HOST's gym identity and are NOT customization slots. The streak, the points
// and the rank belt the masthead carries are PER-MEMBER chrome and stay sample
// data, exactly as ../RewardsShowcase.tsx keeps them when a gym's real rewards
// are injected.

import { FootNav } from '../shell/FootNav';
import { Masthead } from '../shell/Masthead';
import { Screen } from '../shell/Screen';
import type { ShowcaseVideo } from '../showcaseContent';

import { FeaturedVideoCard } from './FeaturedVideoCard';
import { VideoCarouselSection } from './VideoCarouselSection';
import styles from './VideoShowcase.module.css';
import { VideosFeedStatus } from './VideosFeedStatus';
import { VideosScopeTabs } from './VideosScopeTabs';
import { sectionTitle, videosLayoutData } from './videosLayoutData';

/** `VideosScreen`'s own default gym name, matching every other surface here. */
const DEFAULT_GYM_NAME = 'Your Gym';

// Dummy non-identity data: the streak and points the masthead carries, the same
// sample values ../home/HomeShowcase.tsx uses.
const STREAK_DAYS = 3;
const POINTS_LABEL = '3.4k';

// Re-exported from where it has always been imported: the tab labels are part
// of the payload the screen is handed, so the derivation lives in
// ./videosLayoutData.ts with the rest of it. ../__tests__/videoSelectors.test.ts
// imports it from here.
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
  gymName = DEFAULT_GYM_NAME,
  gymLogoSrc,
  videos,
}: VideoShowcaseProps) {
  const data = videosLayoutData(videos);
  const { featured } = data;

  return (
    <Screen
      head={
        // `plain` — the name and the carried line, no big mark. The mark is the
        // schedule root's; every other tab opens straight into its content.
        <Masthead
          mode="plain"
          gymName={gymName}
          logoSrc={gymLogoSrc}
          streakDays={STREAK_DAYS}
          pointsLabel={POINTS_LABEL}
        />
      }
      foot={<FootNav selected="videos" />}
      scroll
    >
      <div className={styles.feed}>
        <VideosScopeTabs data={data} />

        {featured !== null && <FeaturedVideoCard video={featured} />}

        {/*
          THE HERO IS ALSO THE FIRST CARD OF ITS OWN GENRE, and that is the real
          screen's behaviour rather than a porting slip: `videos_feed_body.dart`
          calls `featuredCard` and `genreSections` over the SAME list and
          neither excludes the other's pick. Kept verbatim — this island mirrors
          the member app rather than improving on it.
        */}
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
