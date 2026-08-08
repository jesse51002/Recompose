// ASSET 1 — the app you click through.
//
// Six screens, and every one of them is reachable by tapping something: the
// bottom nav switches between home, profile, store and video; a schedule row
// opens a class; that class's reserve action opens the booking confirmation.
// Nothing here is reached by a chrome control outside the phone, which is the
// whole point — this is one asset, not six previews behind a picker.
//
// WHY THE ROUTE IDS ARE EXPORTED. The tap targets live where the affordance is
// (`home/classItem/ClassItemTextLeft.tsx` opens a class,
// `classdetail/sections/ClassReserveFooter.tsx` books it,
// `support/ShowcaseBottomNav.tsx` switches tab) rather than being threaded down
// as callbacks from here. A callback chain through five layers of layout is
// exactly the kind of prop plumbing a design agent breaks when it rearranges a
// screen; a route id it imports is not.
//
// The screens themselves take their content from ./appContent.tsx, so a route
// component is a thin adapter and nothing more.

import { defineMockAsset } from '../../kit/asset';
import { useMockNav } from '../../kit/MockNav';

import { useAppContent } from './appContent';
import { VinyasaFlowSurface } from './VinyasaFlowSurface';
import { BookingShowcase } from './BookingShowcase';
import { ClassDetailShowcase } from './classdetail/ClassDetailShowcase';
import { HomeShowcase } from './home/HomeShowcase';
import { ProfileShowcase } from './profile/ProfileShowcase';
import { RewardsShowcase } from './RewardsShowcase';
import { VideoShowcase } from './videos/VideoShowcase';

/** The app asset's routes. Exported because the tap targets import them. */
export const ROUTE_HOME = 'home';
export const ROUTE_CLASS = 'class';
export const ROUTE_BOOKING = 'booking';
export const ROUTE_STORE = 'store';
export const ROUTE_VIDEO = 'video';
export const ROUTE_PROFILE = 'profile';

/**
 * Bottom-nav tab → the route it lands on.
 *
 * The four tabs are the member app's own (`nav_home` / `nav_rank` /
 * `nav_reward` / `nav_videos`), and two of them are named for the CONCEPT
 * rather than the screen: `rank` is the profile, `reward` is the store. That
 * mismatch is the Dart's, kept rather than tidied so the four `nav_*` icon
 * slots keep resolving against the names the pipeline generates them under.
 */
export const TAB_ROUTES = Object.freeze({
  home: ROUTE_HOME,
  rank: ROUTE_PROFILE,
  reward: ROUTE_STORE,
  videos: ROUTE_VIDEO,
});

function HomeRoute() {
  const { classes, gymName, gymLogoSrc } = useAppContent();
  return (
    <HomeShowcase
      gymName={gymName}
      gymLogoSrc={gymLogoSrc}
      classes={classes}
      themeTabPreview
    />
  );
}

function ClassRoute() {
  const { classes, gymName, gymLogoSrc, openClass } = useAppContent();
  // The class the member opened, or — before any row has been tapped — the
  // list, from which the screen picks a representative one exactly as it did
  // when it was only ever previewed standalone.
  return (
    <ClassDetailShowcase
      gymName={gymName}
      gymLogoSrc={gymLogoSrc}
      classes={openClass === null ? classes : [openClass]}
    />
  );
}

function BookingRoute() {
  // `ClassBookedScreen` ends by returning the member to where they were; here
  // that is the schedule, and the whole class-detail push goes with it.
  const nav = useMockNav();
  return (
    <BookingShowcase
      loop={false}
      onCycleComplete={() => {
        nav.reset(ROUTE_HOME);
      }}
    />
  );
}

function StoreRoute() {
  const { rewards, gymName, gymLogoSrc } = useAppContent();
  return <RewardsShowcase gymName={gymName} gymLogoSrc={gymLogoSrc} rewards={rewards} />;
}

function VideoRoute() {
  const { videos, gymName, gymLogoSrc } = useAppContent();
  return <VideoShowcase gymName={gymName} gymLogoSrc={gymLogoSrc} videos={videos ?? []} />;
}

function ProfileRoute() {
  const { videos, gymName, gymLogoSrc } = useAppContent();
  return <ProfileShowcase gymName={gymName} gymLogoSrc={gymLogoSrc} videos={videos ?? []} />;
}

export const APP_ASSET = defineMockAsset({
  id: 'app',
  label: 'App',
  description:
    'The member app: browse the schedule, open a class, reserve it, and move ' +
    'between home, profile, store and videos from the bottom nav.',
  // The iPhone screen the member app is designed against. Every arrangement in
  // this asset is authored at exactly this size and scaled, never reflowed.
  width: 390,
  height: 844,
  initialRoute: ROUTE_HOME,
  provider: VinyasaFlowSurface,
  routes: {
    [ROUTE_HOME]: HomeRoute,
    [ROUTE_CLASS]: ClassRoute,
    [ROUTE_BOOKING]: BookingRoute,
    [ROUTE_STORE]: StoreRoute,
    [ROUTE_VIDEO]: VideoRoute,
    [ROUTE_PROFILE]: ProfileRoute,
  },
});
