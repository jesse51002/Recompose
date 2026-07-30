// ONE CLASS, AS A PANEL — the unit this whole design is built from.
//
// Replaces the base's `ClassListItem` -> `ClassItemTextLeft` -> `ClassItemMeta`
// / `ClassItemTime` / `ClassItemRule` / `ClassItemThumb` chain, every file of
// which is DELETED from this folder. That chain existed to let five arrangements
// share one row; there is one arrangement here, and a fork carrying a treatment
// switch with a single treatment behind it is a fork the next agent has to
// reverse-engineer.
//
// THE NAME AND THE PHOTOGRAPH ARE ONE OBJECT AND THEY ARE RANK 1 TOGETHER.
// ../../shell/Panel.tsx gives them comparable area by construction — half
// picture, half satin field — so the only way to get this wrong here is to let
// something else in the field out-shout the name. Hence the facts below: the
// time is rank 2 and never larger than the name, the instructor and the
// attending count are rank 3 and quieter than the time.
//
// THE TAP LIVES HERE, ON THE ENTRY ITSELF, and it imports its route id rather
// than receiving a callback (Guardrail 6). A callback chain through the screen,
// the day group and the panel is exactly the prop plumbing a design agent
// breaks when it rearranges a screen; an imported constant is not. The class is
// carried across BY NAME rather than by object because the board repeats the
// resolved list over the week, so a panel's position on it is not a position in
// `classes`.

import { useMockNav } from '../../../../kit/MockNav';
import { ROUTE_CLASS } from '../../appAsset';
import { useAppContent } from '../../appContent';
import { cx } from '../../cx';
import { Panel } from '../../shell/Panel';
import { SC } from '../../showcaseTokens';
import { PersonIcon } from '../../support/icons';
import type { ShowcaseClass } from '../homeClass';

import { ClassPhoto } from './ClassPhoto';
import styles from './ClassPanel.module.css';

export interface ClassPanelProps {
  classData: ShowcaseClass;
  /** `billed` for the opening work of the bill; `split` for every other. */
  register: 'billed' | 'split';
  /** Position in the day's column, for the entrance stagger. */
  index: number;
}

export function ClassPanel({ classData, register, index }: ClassPanelProps) {
  const nav = useMockNav();
  const { openClassNamed } = useAppContent();
  const billed = register === 'billed';

  return (
    <Panel
      register={register}
      // THE SOURCE ART'S OWN PROPORTION, not a shape the layout preferred. The
      // generated class photographs measure 1.50, so they get a 3:2 box in both
      // registers; a box of any other shape does not resize a composed
      // photograph, it throws part of it away (Guardrail 10b).
      ratio="photo"
      index={index}
      media={<ClassPhoto classData={classData} />}
      name={classData.name}
      meta={
        <span className={cx(styles.facts, billed && styles.factsBilled)}>
          <span className={styles.when}>
            <span className={styles.time}>{classData.timeRange}</span>
            <span className={styles.duration}>{durationLabel(classData.durationMinutes)}</span>
          </span>
          <span className={styles.who}>
            <span className={styles.mentor}>{classData.mentor}</span>
            {classData.attending !== undefined && (
              <span className={styles.attending}>
                {/*
                 * The count and the mark that says WHO is being counted are one
                 * object, and the icon is what lets the pair sit beside the
                 * instructor on a 190px field instead of taking a third line —
                 * which, in the split register, the photograph cannot afford.
                 * See the stylesheet: a third line costs the picture its shape.
                 */}
                <PersonIcon size={SC.iconSizeXs} className={styles.attendingIcon} />
                {String(classData.attending)}
              </span>
            )}
          </span>
        </span>
      }
      onOpen={() => {
        openClassNamed(classData.name);
        nav.go(ROUTE_CLASS);
      }}
      // The whole panel is one control, so its accessible name says everything
      // the field says — including the word the attending mark draws instead of
      // spelling.
      label={spokenName(classData)}
    />
  );
}

/** `55 min` — the duration beside the range it belongs to. */
function durationLabel(minutes: number): string {
  return `${String(minutes)} min`;
}

function spokenName(classData: ShowcaseClass): string {
  const parts = [classData.name, classData.timeRange, durationLabel(classData.durationMinutes), classData.mentor];
  if (classData.attending !== undefined) {
    parts.push(`${String(classData.attending)} attending`);
  }
  return parts.join(', ');
}
