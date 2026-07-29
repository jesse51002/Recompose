// Ports ../../../../../../../MobileApp/lib/features/class_booking/presentation/
// widgets/class_details_section.dart — "Details" over the long-form
// description. `SubtitleSection` with a `pBig` /
// `text2nd` body.

import { CLASS_PART, classPart } from '../classParts';
import { SubtitleSection } from '../parts/SubtitleSection';

import styles from './ClassDetailsSection.module.css';

export interface ClassDetailsSectionProps {
  description: string;
}

export function ClassDetailsSection({ description }: ClassDetailsSectionProps) {
  return (
    <SubtitleSection
      title="Details"
      // ZEN BJJ: `large`, the SubtitleSection default. The base tightens every
      // section head to `medium`; a heading that sits almost on its own body
      // text reads as a label rather than as a heading, and this page has four
      // of them in a row.
      spacing="large"
      markerProps={classPart(CLASS_PART.details)}
    >
      <p className={styles.body}>{description}</p>
    </SubtitleSection>
  );
}
