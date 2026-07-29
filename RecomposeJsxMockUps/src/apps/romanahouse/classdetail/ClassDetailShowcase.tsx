// CLASS — one session, as a specimen sheet.
//
// Clone of `ClassScreen`, the detail page a schedule entry pushes. NOT the
// post-reservation celebration — that is ../BookingShowcase.tsx, and the two
// are easy to confuse because both port out of the Dart's one
// `features/class_booking/` folder.
//
// The base stacks a topbar, a full-bleed photograph, a title block and three
// captioned sections above a pinned pill button. This lays out a plate: the
// photograph mounted inside a paper margin, captioned OUTSIDE its frame by the
// class name under a hairline, then the session's facts as a ruled spec table,
// then the three sections each opened by a tracked label over a rule, then the
// reserve action as a walnut band across the foot.
//
// NO INDEX, because the base carries no bottom nav here. The head's back
// control is therefore the ONLY way off this screen, which is exactly why it is
// wired to `nav.back` and walked in the browser rather than assumed.
//
// EVERY ELEMENT THE BASE RENDERS IS HERE: the gym name and chevron, the four
// info-bar cells, the back control, the class photograph, the name, the
// location, the date and time range, the attending count, the Details
// description, the Instructor bio and portrait, the Location map and address,
// and exactly one Reserve action. The base shows no instructor NAME on this
// screen and neither does this — rendering one would be reaching for data the
// screen does not have.

import { useThemeText } from 'recompose-react';

import { useMockNav } from '../../../kit/MockNav';
import { ROUTE_BOOKING } from '../appAsset';
import { ActionBand } from '../shell/ActionBand';
import { Sheet } from '../shell/Sheet';
import { SheetHead } from '../shell/SheetHead';
import type { ShowcaseClassInfo } from '../showcaseContent';
import { SLOT_RESERVE_CTA } from '../showcaseSlots';

import { detailFor, previewClassCard } from './classDetail';
import { SessionSheet } from './SessionSheet';

const RANK_BADGE_ASSET = 'icon_rank_belt.png' as const;
const STREAK_DAYS = 3;
const POINTS_LABEL = '3.4k';

export interface ClassDetailShowcaseProps {
  gymName?: string;
  /**
   * The host gym's real logo URL. Accepted and unused, exactly as in the base:
   * this screen's topbar is `nameOnly`, so it draws no mark and has no logo
   * ladder to feed. The prop stays because the route adapter passes the same
   * payload to every screen.
   */
  gymLogoSrc?: string | undefined;
  /** The gym's real classes; null falls back to the group defaults. */
  classes?: readonly ShowcaseClassInfo[] | null;
  /**
   * The previewed style's showcase category. Needed because the detail-only
   * text resolves PER FIELD against the bundled group (./classDetail.ts), not
   * only through the tier `useShowcaseContent` already picked.
   */
  category?: string | null;
}

export function ClassDetailShowcase({
  gymName = 'Your Gym',
  classes,
  category = null,
}: ClassDetailShowcaseProps) {
  const nav = useMockNav();
  const detail = detailFor(previewClassCard(classes, category), gymName);
  return (
    <Sheet
      scroll
      flush
      head={
        <SheetHead
          gymName={gymName}
          streakDays={STREAK_DAYS}
          pointsLabel={POINTS_LABEL}
          rankBadgeAsset={RANK_BADGE_ASSET}
          onBack={nav.back}
        />
      }
      foot={<ReserveBand />}
    >
      <SessionSheet detail={detail} />
    </Sheet>
  );
}

/**
 * The reserve action. Reserving is what pushes the booking celebration —
 * `ClassScreen`'s reserve action routes to `AppRoutes.reservingLoading`, which
 * is what ../BookingShowcase.tsx clones. The label is the tenant's own
 * `reserve_cta` copy slot.
 */
function ReserveBand() {
  const nav = useMockNav();
  const label = useThemeText(SLOT_RESERVE_CTA, 'Reserve your spot');
  return (
    <ActionBand
      label={label}
      onPressed={() => {
        nav.go(ROUTE_BOOKING);
      }}
    />
  );
}
