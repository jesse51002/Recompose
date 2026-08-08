// CLASS — the detail page, rebuilt on the thread.
//
// The base stacked a topbar over a banner over four hairline-divided sections
// with a pinned pill button. This is the same element set hung on the line: the
// photograph is the subject of the screen and runs full bleed at its own 3:2
// with the thread crossing it in knockout, and everything after it is a node on
// the descent with its spoken label beside it.
//
// FOUR THINGS ON THIS SCREEN ARE CORRECTNESS RATHER THAN DESIGN:
//
//   * IT PASSES NO `foot`. The member app's detail screen carries no bottom
//     nav, so this one carries none either — what is reachable never changes.
//     Its ONLY exit is the back node in the head, which makes an unwired one a
//     trap that ends a reviewer's session rather than a cosmetic gap. It has
//     been one here before (Guardrail 4).
//   * THE BACK NODE CALLS `nav.back()` AND THE ACTION PUSHES `ROUTE_BOOKING`,
//     both from where the affordance is rather than through a callback threaded
//     down from the asset (Guardrail 6).
//   * THE PHOTOGRAPH PAINTS THE SAME SLOT AS THE SCHEDULE ROW THE MEMBER
//     TAPPED. `ClassCard.themeSlot` is carried from the schedule rather than
//     re-derived for exactly that reason: tokenising the thumbnail alone once
//     left this screen on the content ladder and the two silently disagreed
//     (Guardrail 7). Its bundled last rung is `showcaseAssetOrNetwork`'s, the
//     same ladder ../home/classItem/ClassItemThumb.tsx climbs.
//   * EXACTLY ONE TERRACOTTA FILL. The reserve action is it. The meta's node is
//     filled too, but a 13px node is not a field large enough to set type on,
//     which is what the rule in ../layout_brief.yaml actually bounds.
//
// WHAT MOVED, AND WHY. The base's `parts/`, `sections/` and `layouts/` folders
// are gone, along with `classParts.ts`: they existed to let five `class_format`
// arrangements share one element set and to stamp a countable marker on each
// part. This fork has one arrangement, as ../../romanahouse and ../../milemarker
// both settled on, and a fork that keeps the chrome it replaced is a fork the
// next agent has to reverse-engineer (../../../CLAUDE.md). `classDetail.ts` —
// the data — and `DegradingImage` — the network-image fallback — are the two
// pieces that carried their weight and stayed.

import { useThemeText } from 'recompose-react';

import { useMockNav } from '../../../kit/MockNav';
import { ROUTE_BOOKING } from '../appAsset';
import type { ShowcaseClassInfo } from '../showcaseContent';
import { showcaseAssetOrNetwork } from '../showcaseAssets';
import { SLOT_RESERVE_CTA } from '../showcaseSlots';
import { Action } from '../shell/Action';
import { Figure, Title } from '../shell/Figure';
import { Head } from '../shell/Head';
import { BleedPhoto, Caption } from '../shell/Photo';
import { Screen } from '../shell/Screen';
import { Node, Region } from '../shell/Thread';

import { detailFor, previewClassCard } from './classDetail';
import styles from './ClassDetail.module.css';
import { DegradingImage } from './DegradingImage';

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

/**
 * The demo stats the carried items show. The same values ../home/HomeShowcase.tsx
 * and ../videos/VideoShowcase.tsx use, so the surfaces agree in one walkthrough.
 */
const STREAK_DAYS = 3;
const POINTS_LABEL = '3.4k';

export function ClassDetailShowcase({
  gymName = 'Your Gym',
  gymLogoSrc,
  classes,
  category = null,
}: ClassDetailShowcaseProps) {
  const nav = useMockNav();
  const detail = detailFor(previewClassCard(classes, category), gymName);
  const cls = detail.classData;
  const reserveLabel = useThemeText(SLOT_RESERVE_CTA, 'Reserve your spot');

  return (
    <Screen
      head={
        <>
          <BackHead />
          {/*
            THE IDENTITY AND THE FOUR CARRIED ITEMS ARE NOT OPTIONAL HERE, and
            leaving them off was a real removal that shipped for an afternoon.
            The base's `ClassScreenTopbar` composes `ShowcaseTopbar` in its
            `nameOnly` mode, and `nameOnly` suppresses only the big MARK —
            `TopbarStacked` renders `<InfoBar>` in every mode. So this screen has
            always carried the studio name, its chevron, and the rank / streak /
            points / pass row, and the invariant is that no element that was on a
            screen leaves it.
            `mockup-redesign-combatden`'s PART ONE listed only "a topbar with a
            back button" for this screen, which is what made it easy to miss; it
            has been corrected in the same change as this.
          */}
          <Head
            gymName={gymName}
            gymLogoSrc={gymLogoSrc}
            themeTabPreview
            streakDays={STREAK_DAYS}
            pointsLabel={POINTS_LABEL}
          />
        </>
      }
      bodyScroll
    >
      <div className={styles.body}>
        {/*
          THE SUBJECT OF THE SCREEN, so it runs edge to edge at its own 3:2 and
          the thread is redrawn across it in the knockout ink. `?? ''` covers
          the one card that carries no slot — the defensive sample used when the
          screen is opened with no class at all — and an unknown slot id
          resolves to the bundled fallback rather than to nothing.
        */}
        <BleedPhoto
          slot={cls.themeSlot ?? ''}
          fallback={showcaseAssetOrNetwork(cls.imageUrl, 'class_photo_1.png')}
          alt=""
        />

        <div className={styles.stack}>
          {/*
            The class itself: a filled node, because this is the thing happening
            now. Its label is the date — a spoken phrase beside the node is
            where this design puts one, rather than in a run of meta text.
          */}
          <Region label={detail.dateLabel} kind="solid">
            <div className={styles.meta}>
              <Title>{cls.name}</Title>
              <p className={styles.studio}>{detail.location}</p>
              {/* The class time. A figure the app counts, so it is the display
                  face, set large and light — see ../layout_brief.yaml. */}
              <Figure size="sm" className={styles.time}>
                {cls.timeRange}
              </Figure>
              <div className={styles.counts}>
                <span className={styles.count}>
                  <Figure size="xs">{String(cls.durationMinutes)}</Figure>
                  <span className={styles.unit}>minutes</span>
                </span>
                {/* `undefined` drops the row, exactly as the Dart's `int?` does. */}
                {cls.attending !== undefined && (
                  <span className={styles.count}>
                    <Figure size="xs">{String(cls.attending)}</Figure>
                    <span className={styles.unit}>attending</span>
                  </span>
                )}
              </div>
              <div className={styles.commit}>
                <Action
                  text={reserveLabel}
                  onPressed={() => {
                    nav.go(ROUTE_BOOKING);
                  }}
                />
              </div>
            </div>
          </Region>

          <Region label="What to expect">
            <p className={styles.prose}>{cls.description}</p>
          </Region>

          <Region label="Your teacher">
            <div className={styles.teacher}>
              <DegradingImage
                src={cls.instructorImageUrl}
                className={styles.faceImg}
                frameClassName={styles.face}
              />
              <div className={styles.teacherText}>
                <p className={styles.teacherName}>{cls.mentor}</p>
                <p className={styles.prose}>{cls.instructorBio}</p>
              </div>
            </div>
          </Region>

          <Region label="Where to find us">
            <img className={styles.map} src={detail.mapSrc} alt="" />
            <Caption>{detail.address}</Caption>
          </Region>
        </div>
      </div>
    </Screen>
  );
}

/**
 * THE HEAD, AND THE ONLY WAY OFF THIS SCREEN.
 *
 * Every other screen's head is ../shell/Head.tsx — the brand mark where the
 * stroke begins, the studio's name, and the four things the member carries.
 * This one has none of that in the member app either, so what is left is the
 * back control, and this design already has a form for it: a node on the line,
 * with its word beside it. Tapping a node to go back UP the sequence is what
 * the thread means; the chevron points the way every phone owner already reads
 * as back (Guardrail 12), and the word removes any doubt.
 *
 * `carry` is the one node variant big enough to hold a glyph, and the one that
 * masks the line — so the stroke passes behind the circle exactly as it passes
 * behind the brand mark on every other screen.
 */
function BackHead() {
  // Where the affordance is, not threaded down from the asset (Guardrail 6).
  // `nav.back()` is a no-op at the root by construction, so it is safe to wire
  // unconditionally.
  const nav = useMockNav();
  return (
    <header className={styles.head}>
      <button
        type="button"
        className={styles.back}
        onClick={() => {
          nav.back();
        }}
      >
        <Node kind="carry">
          <svg
            className={styles.backGlyph}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M15 5.5 L8.5 12 L15 18.5" />
          </svg>
        </Node>
        <span className={styles.backSay}>Back</span>
      </button>
    </header>
  );
}
