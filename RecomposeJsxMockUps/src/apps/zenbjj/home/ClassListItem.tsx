// One class in the schedule.
//
// THE DATA PROPS ARE FIXED — every row is handed the same `classData` and the
// same `showBookings`. `lead` is PRESENTATION ONLY: it picks which of the two
// treatments in ./classItem/ draws the row, and both render the identical
// element set (title, time, instructor, attendee count, thumbnail, and the
// booked mark on a page that carries one) and open the identical class detail
// screen on tap.
//
// ZEN BJJ'S ONE ADDITION TO THE BASE'S ROW CONTRACT is that flag. The base
// draws every class the same way; this fork lights ONE of them (see
// ./classItem/ClassItemLead.tsx for why) and leaves the rest compact. That is a
// hierarchy decision, which is the redesign's to make — every class is still on
// the board, still shows what it showed, and still opens when tapped.

import { ClassItemLead } from './classItem/ClassItemLead';
import { ClassItemTextLeft } from './classItem/ClassItemTextLeft';
import type { ShowcaseClass } from './homeClass';

export interface ClassListItemProps {
  classData: ShowcaseClass;
  showBookings?: boolean;
  /** Draw this row as the board's lead card. Presentation only. */
  lead?: boolean;
}

export function ClassListItem({
  classData,
  showBookings = true,
  lead = false,
}: ClassListItemProps) {
  if (lead) return <ClassItemLead classData={classData} showBookings={showBookings} />;
  return <ClassItemTextLeft classData={classData} showBookings={showBookings} />;
}
