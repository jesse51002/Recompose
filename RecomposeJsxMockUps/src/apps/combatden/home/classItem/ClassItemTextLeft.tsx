// Ports MobileApp/lib/features/home/presentation/widgets/class_schedule/
// class_item/layouts/class_item_text_left.dart.
//
// `ClassItemLayout.textLeftThumbRight` — THE ROW THAT SHIPS TODAY.
//
// Meta column left, small 16:9 thumbnail right, rule beneath. Element for
// element the previous flat ./../ClassListItem.tsx rendering, so a tenant with
// no `home_format` slot sees no change — ../__tests__/agendaListBaseline.html
// is the fixture that keeps that true.

import { useMockNav } from '../../../../kit/MockNav';
import { useAppContent } from '../../appContent';
import { ROUTE_CLASS } from '../../appAsset';
import type { ShowcaseClass } from '../homeClass';

import { ClassItemMeta } from './ClassItemMeta';
import { ClassItemRule } from './ClassItemRule';
import { ClassItemThumb } from './ClassItemThumb';
import styles from './ClassItemTextLeft.module.css';

export interface ClassItemTreatmentProps {
  classData: ShowcaseClass;
  showBookings: boolean;
}

export function ClassItemTextLeft({ classData, showBookings }: ClassItemTreatmentProps) {
  // The schedule row is what opens a class — the app asset's first real
  // navigation, and the Dart's own (`ClassScreen` is what a schedule row
  // pushes). The name is carried across rather than the object, because the
  // board repeats the resolved list across the week and a row's position in it
  // is not a position in `classes`.
  const nav = useMockNav();
  const { openClassNamed } = useAppContent();
  const open = () => {
    openClassNamed(classData.name);
    nav.go(ROUTE_CLASS);
  };
  return (
    <div
      className={styles.item}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className={styles.row}>
        <ClassItemMeta
          classData={classData}
          showBookings={showBookings}
          className={styles.info}
        />
        <ClassItemThumb
          classData={classData}
          className={styles.photo}
          imgClassName={styles.photoImg}
        />
      </div>
      <ClassItemRule />
    </div>
  );
}
