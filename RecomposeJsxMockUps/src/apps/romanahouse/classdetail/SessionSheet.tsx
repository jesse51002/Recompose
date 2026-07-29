// The body of the class screen: a plate, its caption, a spec table, three
// ruled sections.
//
// Replaces the base's `ClassBannerStack` + `ClassSectionStack` +
// `SubtitleSection` chain. The section TITLES survive verbatim — Details,
// Instructor, Location — but drop from a 16px semibold heading to a 9px
// tracked label over a hairline, because in this design a region announces
// itself quietly and the content outranks the word.
//
// The instructor portrait and the map are photographs and take the plate
// treatment like every other photograph in the app: mounted, ruled, veiled
// warm, never bled. The base draws the portrait as a circle; a circle is a
// shape this design does not have, so it is a square plate here.

import { Plate } from '../shell/Plate';
import { PersonIcon } from '../support/icons';

import type { ClassDetail } from './classDetail';
import styles from './SessionSheet.module.css';

export function SessionSheet({ detail }: { detail: ClassDetail }) {
  const cls = detail.classData;
  return (
    <div className={styles.sheet}>
      {/* THE PLATE, and its caption outside the frame. */}
      <Plate className={styles.photo} src={cls.imageUrl} slot={cls.themeSlot} />
      <h1 className={styles.caption}>{cls.name}</h1>

      <dl className={styles.spec}>
        <SpecRow label="Location" value={detail.location} />
        <SpecRow label="Date" value={detail.dateLabel} />
        <SpecRow label="Time" value={cls.timeRange} />
        {cls.attending !== undefined && (
          <div className={styles.specRow}>
            <dt className={styles.specLabel}>Attending</dt>
            <dd className={styles.specValue}>
              <span className={styles.attending}>
                <PersonIcon size={14} className={styles.attendingIcon} />
                {String(cls.attending)} attending
              </span>
            </dd>
          </div>
        )}
      </dl>

      <Section title="Details">
        <p className={styles.prose}>{cls.description}</p>
      </Section>

      <Section title="Instructor">
        <div className={styles.instructor}>
          {cls.instructorImageUrl !== '' && (
            <Plate className={styles.portrait} src={cls.instructorImageUrl} />
          )}
          <p className={styles.prose}>{cls.instructorBio}</p>
        </div>
      </Section>

      <Section title="Location">
        <Plate className={styles.map} src={detail.mapSrc} />
        <p className={styles.address}>{detail.address}</p>
      </Section>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.specRow}>
      <dt className={styles.specLabel}>{label}</dt>
      <dd className={styles.specValue}>{value}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}
