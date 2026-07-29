// The demo content every screen in an asset shares, resolved once.
//
// Replaces what `showcaseScreen.tsx` used to do by threading props: it called
// `useShowcaseContent` at the top and handed `classes` / `rewards` / `videos`
// down to whichever single screen it was rendering. An asset has no such top —
// the stage renders one route at a time and routes take no props — so the same
// resolution happens here and screens read it from context.
//
// Resolving ONCE (rather than per screen) is what keeps the demo coherent: the
// class a member opens from the schedule has to be the class they tapped, and
// the reward on the store has to be the reward in the celebration carousel.
// Two independent resolutions of the same ladder could disagree the moment the
// network tier answers differently between them.
//
// `gymName` / `gymLogoSrc` are the HOST's gym identity, not customization
// slots — a theme pick must never rename the mock. There is no gym in this
// browser, which is what arms the logo ladder onto the theme's own
// `logo_primary`.

import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { ShowcaseClassInfo, ShowcaseReward, ShowcaseVideo } from './showcaseContent';
import { useShowcaseContent } from './useShowcaseContent';

/** `ShowcaseScreen.build`'s `gymName` default. */
const DEFAULT_GYM_NAME = 'Your Gym';

export interface AppContent {
  readonly classes: readonly ShowcaseClassInfo[] | null;
  readonly rewards: readonly ShowcaseReward[] | null;
  readonly videos: readonly ShowcaseVideo[] | null;
  readonly gymName: string;
  readonly gymLogoSrc?: string | undefined;
  /**
   * The class the member opened from the schedule.
   *
   * Null until one is tapped, which is also what the class detail screen falls
   * back on — it previews a representative class rather than an empty screen,
   * exactly as it did when it was reachable only as a standalone preview.
   */
  readonly openClass: ShowcaseClassInfo | null;
  /**
   * Open a class by name — what a schedule row calls before navigating.
   *
   * By NAME rather than by index, because the schedule the member sees is
   * generated (`home/homeScheduleGenerator.ts` synthesises time slots and
   * repeats the resolved list across the week), so a row's position in the
   * board is not a position in `classes`.
   */
  readonly openClassNamed: (name: string) => void;
}

const AppContentContext = createContext<AppContent | null>(null);

export interface AppContentProviderProps {
  children: ReactNode;
  /**
   * The previewed style's showcase category (`Fighting`, `Yoga`, …), which
   * picks the demo classes, rewards and videos. Null falls back to the default
   * group, exactly as Dart does when no category is known yet.
   */
  category?: string | null;
  gymName?: string;
  gymLogoSrc?: string | undefined;
}

export function AppContentProvider({
  children,
  category = null,
  gymName = DEFAULT_GYM_NAME,
  gymLogoSrc,
}: AppContentProviderProps) {
  const { classes, rewards, videos } = useShowcaseContent(category);
  // Which class the member opened. Held here rather than in the class screen
  // because the screen is unmounted the moment they navigate away, and coming
  // back to it must not silently show a different class than the one tapped.
  const [openName, setOpenName] = useState<string | null>(null);

  const openClassNamed = useCallback((name: string) => {
    setOpenName(name);
  }, []);

  const openClass = useMemo(
    () => classes?.find((c) => c.name === openName) ?? null,
    [classes, openName],
  );

  const value = useMemo<AppContent>(
    () => ({ classes, rewards, videos, gymName, gymLogoSrc, openClass, openClassNamed }),
    [classes, rewards, videos, gymName, gymLogoSrc, openClass, openClassNamed],
  );
  return <AppContentContext.Provider value={value}>{children}</AppContentContext.Provider>;
}

/**
 * The asset's shared content.
 *
 * Throws outside a provider rather than returning empties: a screen rendered
 * with no content silently previews the bundled fallback, which looks like a
 * working mock and is the hardest kind of wrong to notice.
 */
export function useAppContent(): AppContent {
  const content = useContext(AppContentContext);
  if (content === null) {
    throw new Error(
      'useAppContent must be used inside an <AppContentProvider>. A screen is ' +
        'being rendered outside the asset that supplies its demo content.',
    );
  }
  return content;
}
