// CLASS — the detail page, rebuilt as a bill of one work.
//
// A bill announces what is being given, in what order, danced by whom. Every
// other screen in this app is a COLUMN of works; this screen is one work given
// the whole sheet, so it opens in the billed register — the photograph full
// width at its own 3:2 with the satin field carried underneath it as a plinth,
// the class name larger there than anywhere else in the app. Everything a
// member reads rather than scans (the description, the teacher, the studio)
// follows on the cream ground beneath it, opened by a brass rule apiece, and
// the one thing they can DO is the satin band across the foot.
//
// NOT TO BE CONFUSED WITH ../BookingShowcase.tsx, the other screen ported out of
// the Dart's one `class_booking/` folder. That one clones `ClassBookedScreen`,
// the post-reservation CELEBRATION this screen's action pushes.
//
// FIVE THINGS HERE ARE CORRECTNESS RATHER THAN DESIGN:
//
//   * IT PASSES NO `foot` NAV. The member app's detail screen carries no bottom
//     nav, so neither does this — what is reachable never changes. Its ONLY exit
//     is the masthead's back control, which makes an unwired one a trap that
//     ends a reviewer's session rather than a cosmetic gap. It has been one here
//     before (Guardrail 4). The `foot` slot carries the reserve action instead,
//     which is why the two never coexist (../shell/ActionBand.tsx).
//   * THE IDENTITY AND THE FOUR CARRIED ITEMS ARE NOT OPTIONAL. The base's
//     `ClassScreenTopbar` composed `ShowcaseTopbar` in `nameOnly` mode, and
//     `nameOnly` suppresses only the big MARK — the studio name, its chevron and
//     the rank / streak / points / pass row are on this screen in the member
//     app. A fork that read "a topbar with a back button" and built exactly that
//     dropped six elements and passed every mechanical gate; `apps/vinyasaflow/`
//     shipped it for an afternoon. `<Masthead mode="back">` carries all of them.
//   * BACK CALLS `nav.back()` AND THE ACTION PUSHES `ROUTE_BOOKING`, both from
//     where the affordance is rather than through a callback threaded down from
//     the asset (Guardrail 6).
//   * THE PHOTOGRAPH PAINTS THE SAME SLOT AS THE SCHEDULE ROW THE MEMBER
//     TAPPED. `ClassCard.themeSlot` is carried from the schedule rather than
//     re-derived for exactly that reason: tokenising the thumbnail alone once
//     left this screen on the content ladder and the two silently disagreed
//     (Guardrail 7).
//   * THE RESERVE LABEL IS THE THEME'S `reserve_cta` TEXT SLOT. The pipeline
//     generates a value for it on every run, and this screen is still its only
//     consumer anywhere in the island.
//
// WHAT MOVED, AND WHY. The base's `layouts/`, `parts/` and `sections/` folders
// are gone, along with `classParts.ts`: they existed so five `class_format`
// arrangements could share one element set and stamp a countable marker on each
// part. There are no format presets here — one layout per asset — and the same
// three folders were deleted by `apps/romanahouse/`, `apps/milemarker/` and
// `apps/vinyasaflow/` before this. Two of the nine markers could no longer be
// stamped anyway, because the back control and the identity now live inside the
// frozen shell. `classDetail.ts` (the data) and `DegradingImage` (the
// network-image fallback) are the pieces that carried their weight and stayed.

import { ThemedImage, useThemeText } from 'recompose-react';

import { useMockNav } from '../../../kit/MockNav';
import { ROUTE_BOOKING } from '../appAsset';
import { cx } from '../cx';
import { showcaseAssetOrNetwork } from '../showcaseAssets';
import type { ShowcaseClassInfo } from '../showcaseContent';
import { SLOT_RESERVE_CTA } from '../showcaseSlots';
import { ActionBand } from '../shell/ActionBand';
import { Masthead } from '../shell/Masthead';
import { Screen } from '../shell/Screen';
import { Section, SECTION_PROSE_CLASS } from '../shell/Section';
import { PersonIcon } from '../support/icons';

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
 * The demo stats the carried line shows. The same values ../home/HomeShowcase.tsx
 * uses, so the two surfaces agree about one member in one walkthrough.
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
        <Masthead
          mode="back"
          gymName={gymName}
          logoSrc={gymLogoSrc}
          themeTabPreview
          streakDays={STREAK_DAYS}
          pointsLabel={POINTS_LABEL}
          onBack={() => {
            // `nav.back()` is a no-op at the root by construction, so wiring it
            // unconditionally is safe — and leaving it unwired would strand a
            // reviewer on a screen with no bottom nav.
            nav.back();
          }}
        />
      }
      foot={
        <ActionBand
          label={reserveLabel}
          onPress={() => {
            nav.go(ROUTE_BOOKING);
          }}
        />
      }
      scroll
    >
      {/*
        RANK 1: THE NAME AND THE PHOTOGRAPH, AS ONE OBJECT. `class_photo_2`
        declares `depends_on_text: [class_name_2]` in the app manifest — the
        picture is generated FROM the copy — so they are one claim about one
        class and are sized and emphasised together. `?? ''` covers the one card
        that carries no slot (the defensive sample used when the screen is opened
        with no class at all); an unknown slot id resolves to the fallback rather
        than to nothing.
      */}
      <div className={styles.bill}>
        <div className={styles.photo}>
          <ThemedImage
            className={styles.photoImg}
            slot={cls.themeSlot ?? ''}
            fallbackSrc={showcaseAssetOrNetwork(cls.imageUrl, 'class_photo_1.png')}
            alt=""
          />
        </div>

        <div className={styles.plinth}>
          <h1 className={styles.name}>{cls.name}</h1>
          {/*
            The two lines under the name are the small print ABOUT it, so they
            are grouped as one sub-object rather than left as two more children
            of the plinth at the same gap as the name (Guardrail 13 — three
            uniform gaps group nothing).
          */}
          <div className={styles.plinthMeta}>
            {/*
              RANK 3. The date, the time range and the duration read as one fact
              — when this class is — so they share one line rather than stacking
              into three. The sans, never the serif: a clock set larger than the
              class answers a question nobody asked (../layout_brief.yaml).
            */}
            <span className={styles.when}>
              {detail.dateLabel} ‧ {cls.timeRange} ‧ {String(cls.durationMinutes)} min
            </span>
            <span className={styles.facts}>
              <span>{cls.mentor}</span>
              {/* `undefined` drops the count, exactly as the Dart's `int?` does. */}
              {cls.attending !== undefined && (
                <span className={styles.attending}>
                  <PersonIcon className={styles.attendingIcon} />
                  {String(cls.attending)} attending
                </span>
              )}
            </span>
          </div>
          {/*
            The satin arrives first and the name is revealed by it — the veil is
            LAST so it lies over the type, and it never intercepts a tap.
          */}
          <span className={styles.veil} aria-hidden="true" />
        </div>
      </div>

      {/*
        THE THREE LABELS ARE THE STUDIO'S VOICE, WHICH IS A REDESIGN'S TO OWN.
        The base said "Details / Instructor / Location" — the field names of a
        record rather than the headings of a programme note. This app is a
        company announcing what it is giving, in a voice that credits the line
        (../layout_brief.yaml), so a bill says what a work is about and who is
        giving it. Nothing is added or removed: the same three regions carry the
        same three fields.
      */}
      <div className={styles.reading}>
        <Section label="About this class" className={cx(styles.arrive, styles.step1)}>
          <p className={cx(SECTION_PROSE_CLASS, styles.prose)}>{cls.description}</p>
        </Section>

        <Section label="Taught by" className={cx(styles.arrive, styles.step2)}>
          {/*
            The headshot leads the bio rather than trailing it, because a face
            and the words about it are one object and a member's eye returns to
            one left edge (Guardrail 15). Not `.stack`: this body is a ROW.
          */}
          <div className={styles.instructor}>
            <DegradingImage
              src={cls.instructorImageUrl}
              className={styles.faceImg}
              frameClassName={styles.face}
            />
            <p className={cx(SECTION_PROSE_CLASS, styles.bio)}>{cls.instructorBio}</p>
          </div>
        </Section>

        <Section label="Where" className={cx(styles.arrive, styles.step3)}>
          <div className={styles.stack}>
            <span className={styles.where}>{detail.location}</span>
            {/*
              The map tile measures 2.00 and gets a 2:1 box. It is a bundled PNG
              rather than a tile request — the Dart's own choice, kept: a keyed
              network round trip on a screen whose whole point is to render with
              the backend unreachable would also show a real place the demo
              address does not describe.
            */}
            <div className={styles.map}>
              <img className={styles.mapImg} src={detail.mapSrc} alt="" />
            </div>
            <p className={styles.address}>{detail.address}</p>
          </div>
        </Section>
      </div>
    </Screen>
  );
}
