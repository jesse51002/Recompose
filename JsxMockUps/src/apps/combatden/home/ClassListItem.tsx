// Ports ../../../../../../CRM/lib/showcase/home/class_list_item.dart and, for
// the treatment switch, MobileApp's own
// `lib/features/home/presentation/widgets/class_schedule/class_list_item.dart`.
//
// One class in the schedule.
//
// THE DATA PROPS ARE FIXED — every home format hands this the same `classData`
// and the same `showBookings`. `layout` is PRESENTATION ONLY: it picks which of
// the treatments in ./classItem/ draws the row, and each of those renders the
// identical element set (title, time, instructor, attendee count, thumbnail,
// and the booked mark on a page that carries one). That is what keeps
// `home_format` an arrangement-only choice.
//
// The row's tap is still a preview no-op: this browser has no class-detail
// screen to open, so — unlike Dart's `ClassItemTap` — no treatment wraps itself
// in a control. Adding one would add an affordance the shipped screen does not
// have.

import { ClassItemTextLeft } from './classItem/ClassItemTextLeft';
import type { ShowcaseClass } from './homeClass';

export interface ClassListItemProps {
  classData: ShowcaseClass;
  showBookings?: boolean;
}

export function ClassListItem({ classData, showBookings = true }: ClassListItemProps) {
  return <ClassItemTextLeft classData={classData} showBookings={showBookings} />;
}
