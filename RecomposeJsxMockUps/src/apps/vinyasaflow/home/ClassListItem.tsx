// One class in the schedule.
//
// Ports ../../../../../../CRM/lib/showcase/home/class_list_item.dart. THE DATA
// IS FIXED AND THE FORM IS NOT: both treatments below render the identical
// element set — name, time range with duration, instructor, attending count,
// photograph, and the booked mark on a page that carries one — and both open
// the same class when tapped. `lead` picks only how much room the class is
// given, which is a hierarchy decision and belongs to the design.
//
// Two treatments, not five. The base carried a switch over a `home_format`
// vocabulary; a bounded option set reproduces the platform's own design
// language, which is a reskin, so the machinery went (../../../CLAUDE.md, "One
// layout and one animation per asset").

import { ClassItemHero } from './classItem/ClassItemHero';
import { ClassItemRow } from './classItem/ClassItemRow';
import type { ShowcaseClass } from './homeClass';

export interface ClassListItemProps {
  classData: ShowcaseClass;
  showBookings?: boolean;
  /** The first class of a day: a full-bleed photograph and a figure-set time. */
  lead?: boolean;
}

export function ClassListItem({
  classData,
  showBookings = true,
  lead = false,
}: ClassListItemProps) {
  if (lead) {
    return <ClassItemHero classData={classData} showBookings={showBookings} />;
  }
  return <ClassItemRow classData={classData} showBookings={showBookings} />;
}
