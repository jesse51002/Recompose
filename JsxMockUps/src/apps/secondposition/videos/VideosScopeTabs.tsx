// Ports ../../../../../../MobileApp/lib/features/videos/presentation/layouts/
// videos_scope_tabs.dart — the scope of the library, wired to the screen's
// payload.
//
// It stays a layer of its own even though one screen calls it, for the reason
// Dart keeps it: ./VideoCategoryTabs.tsx is told what to draw and knows nothing
// about a feed, and ./videosLayoutData.ts is the only thing allowed to decide
// which genres exist and which one is selected. A screen reaching past the
// payload to hand the tabs a label list of its own is exactly the drift the
// arrangement-only invariant forbids.

import { VideoCategoryTabs } from './VideoCategoryTabs';
import type { VideosLayoutData } from './videosLayoutData';

export interface VideosScopeTabsProps {
  data: VideosLayoutData;
}

export function VideosScopeTabs({ data }: VideosScopeTabsProps) {
  return <VideoCategoryTabs tabs={data.tabLabels} selectedIndex={data.selectedTabIndex} />;
}
