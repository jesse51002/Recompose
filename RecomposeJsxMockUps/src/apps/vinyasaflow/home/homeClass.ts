// Ports ../../../../../../CRM/lib/showcase/home/home_class.dart — a clone of
// MobileApp's `MockClass` / `MockDay` home-schedule models.
//
// The real member screen fetches its classes from VideoService; the showcase
// carries bundled sample data instead, so it renders with no backend at all.
// `imageAsset` is a bundled filename (resolved through ../showcaseAssets.ts);
// `imageUrl` is an injected gym photo (a network URL) and wins over it.
//
// `themeSlot` IS REQUIRED HERE, where the base left it optional. Guardrail 10's
// rule is that a list longer than the slot set cycles and that the slot is
// stamped AT THE SOURCE — and an optional field is exactly how a tail of the
// list ends up un-themed without anything erroring. Making it required turns a
// forgotten stamp into a compile error, and it is what lets ./classItem/
// ClassItemPhoto.tsx hand a slot to ../shell/Photo.tsx unconditionally instead
// of branching on `undefined` and quietly taking the untokenised path.

import { SLOT_CLASS_PHOTOS, slotAt } from '../showcaseSlots';
import type { ShowcaseAssetFile } from '../showcaseAssets';

export interface ShowcaseClass {
  readonly name: string;
  readonly timeRange: string;
  readonly durationMinutes: number;
  /** Instructor display name. */
  readonly mentor: string;
  /** Bundled class-photo filename. Ignored when `imageUrl` is set. */
  readonly imageAsset?: ShowcaseAssetFile | undefined;
  /** Injected gym class photo (a network URL); wins over `imageAsset`. */
  readonly imageUrl?: string | undefined;
  /**
   * The generated class-photo slot this class paints with — the TOP rung of the
   * image ladder, above the injected gym photo and the bundled fallback.
   * Assigned by position where the schedule is built, never at a call site.
   */
  readonly themeSlot: string;
  readonly attending?: number | undefined;
  readonly isBooked: boolean;
}

export interface ShowcaseDay {
  readonly label: string;
  readonly classes: readonly ShowcaseClass[];
}

/**
 * The four daily classes, mirroring VideoService's four-class feed. The
 * schedule generator loops these into the fixed time slots, one per slot.
 *
 * The photo slot and the bundled photo are stamped by the SAME index, which is
 * the pairing the pipeline itself believes in: `class_photo_2` declares
 * `depends_on_text: [class_name_2]`, so the picture is generated from the copy.
 */
export const SHOWCASE_CLASSES: readonly ShowcaseClass[] = Object.freeze([
  {
    name: 'Fundamentals',
    timeRange: '9:00am - 9:55am',
    durationMinutes: 55,
    mentor: 'Coach Marcus Reyes',
    imageAsset: 'class_photo_1.png',
    themeSlot: slotAt(SLOT_CLASS_PHOTOS, 0),
    isBooked: false,
  },
  {
    name: 'Striking & Pads',
    timeRange: '11:00am - 11:55am',
    durationMinutes: 55,
    mentor: 'Coach Dana Whitfield',
    imageAsset: 'class_photo_2.png',
    themeSlot: slotAt(SLOT_CLASS_PHOTOS, 1),
    isBooked: false,
  },
  {
    name: 'Open Mat Sparring',
    timeRange: '6:00pm - 6:55pm',
    durationMinutes: 55,
    mentor: 'Coach Leo Tanaka',
    imageAsset: 'class_photo_3.png',
    themeSlot: slotAt(SLOT_CLASS_PHOTOS, 2),
    isBooked: false,
  },
  {
    name: 'Conditioning',
    timeRange: '7:00pm - 7:55pm',
    durationMinutes: 55,
    mentor: 'Coach Priya Nair',
    imageAsset: 'class_photo_4.png',
    themeSlot: slotAt(SLOT_CLASS_PHOTOS, 3),
    isBooked: false,
  },
]);
