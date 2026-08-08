// Ports ../../../../../../MobileApp/lib/features/videos/presentation/layouts/
// videos_scope_tabs.dart — the screen's top filter, wired to the payload.
//
// It stays a separate file from ./VideoCategoryTabs.tsx for the reason Dart
// splits it: the TABS are a control that knows about labels and a selection,
// and this is the one place that decides which labels and which selection they
// are handed. A screen that reached past the payload to build its own label
// list is precisely the drift the arrangement-only invariant forbids.

import { VideoCategoryTabs } from './VideoCategoryTabs';
import type { VideosLayoutData } from './videosLayoutData';

export interface VideosScopeTabsProps {
  data: VideosLayoutData;
}

export function VideosScopeTabs({ data }: VideosScopeTabsProps) {
  return <VideoCategoryTabs tabs={data.tabLabels} selectedIndex={data.selectedTabIndex} />;
}
