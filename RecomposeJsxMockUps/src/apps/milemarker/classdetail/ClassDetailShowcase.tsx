// CLASS — the detail page, and the one screen with no last lane.
//
// The base stacks a topbar over a banner over four bordered sections with a
// pinned pill button. This rebuilds it as the horizon: the class NAME is the one
// thing in the air, its photograph is the first stretch of route below the
// horizon, and the four sections are lanes.
//
// TWO THINGS ON THIS SCREEN ARE CORRECTNESS, NOT DESIGN:
//
//   * IT CARRIES NO LAST LANE, because the member app's detail screen carries no
//     bottom nav. Its ONLY exit is the back affordance in the sky — an unwired
//     back button here is a trap rather than a cosmetic gap, and it has been one
//     (Guardrail 4).
//   * THE BANNER PAINTS THE SAME PHOTO AS THE SCHEDULE ROW THE MEMBER TAPPED.
//     `ClassCard.themeSlot` is carried from the schedule rather than re-derived
//     for exactly this reason: tokenising the thumbnail alone once left this
//     screen on the content ladder, and the two silently disagreed (Guardrail 7).

import { useThemeText } from 'recompose-react';

import { useMockNav } from '../../../kit/MockNav';
import { ROUTE_BOOKING } from '../appAsset';
import { SLOT_RESERVE_CTA } from '../showcaseSlots';
import type { ShowcaseClassInfo } from '../showcaseContent';
import { ActionBand } from '../shell/ActionBand';
import { Disc } from '../shell/Disc';
import { Lane } from '../shell/Lane';
import { RouteImage } from '../shell/RouteImage';
import { Screen } from '../shell/Screen';
import { Sky, SkyBack } from '../shell/Sky';

import { detailFor, previewClassCard } from './classDetail';
import styles from './ClassSheet.module.css';

export interface ClassDetailShowcaseProps {
  gymName?: string;
  /** The host gym's real logo URL. Absent in the public browser. */
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
  gymLogoSrc: _gymLogoSrc,
  classes,
  category = null,
}: ClassDetailShowcaseProps) {
  const nav = useMockNav();
  const detail = detailFor(previewClassCard(classes, category), gymName);
  const { classData } = detail;
  const reserveLabel = useThemeText(SLOT_RESERVE_CTA, 'Reserve your spot');

  return (
    <Screen
      shortSky
      sky={
        <Sky
          lead={
            <SkyBack
              onBack={() => {
                nav.back();
              }}
            />
          }
          label={detail.dateLabel}
          headline={classData.name}
          small
          aside={classData.timeRange}
        />
      }
      action={
        <ActionBand
          label={reserveLabel}
          onPress={() => {
            nav.go(ROUTE_BOOKING);
          }}
        />
      }
    >
      <RouteImage
        slot={classData.themeSlot}
        src={classData.imageUrl}
        height={196}
      />

      <Lane label="The session">
        <div className={styles.stats}>
          <span className={styles.stat}>
            <span className={styles.figure}>{classData.durationMinutes}</span>
            <span className={styles.unit}>Minutes</span>
          </span>
          {classData.attending !== undefined && (
            <span className={styles.stat}>
              <span className={styles.figure}>{classData.attending}</span>
              <span className={styles.unit}>Attending</span>
            </span>
          )}
        </div>
      </Lane>

      <Lane label="Brief">
        <p className={styles.prose}>{classData.description}</p>
      </Lane>

      <Lane label="Your coach">
        <div className={styles.person}>
          <Disc size={64} src={classData.instructorImageUrl} />
          <span className={styles.personCol}>
            <span className={styles.personName}>{classData.mentor}</span>
            <p className={styles.prose}>{classData.instructorBio}</p>
          </span>
        </div>
      </Lane>

      <Lane label="Where" labelAside={detail.location} bleed>
        <img className={styles.map} src={detail.mapSrc} alt="" />
        <span className={styles.address}>{detail.address}</span>
      </Lane>
    </Screen>
  );
}
