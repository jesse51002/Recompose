// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/rank_header.dart — the member's belt with their rank name and
// sub-rank label.
//
// THE BELT IS AN INSIGNIA, NOT AN ILLUSTRATION, and that decides everything
// about how this is drawn. ../layout_brief.yaml: this brand's struck objects
// are "presented centred on a field of satin with clear air around them and
// their name beneath — the way a company mounts what it awards. Never framed,
// never given a border, never inset into a container, never laid under text."
// So this component is ../shell/Insignia.tsx and a size, and the field it is
// mounted on is the plate ./RankSummarySection.tsx paints around it.
//
// THAT IS ALSO WHY THERE IS NO LAYOUT PROP. The base carried four
// (`centred` / `beltLeft` / `beltBleed` / `tile`), one of which laid the rank
// name OVER the belt art behind a scrim — a treatment this design refuses
// outright, and one that only existed because five `rank_format` arrangements
// needed somewhere to put the pair. This package has no layout presets
// (../../../CLAUDE.md), so there is one presentation and it is the one the
// brief describes.
//
// CONTAINED, NEVER CROPPED. The two belt PNGs measure 0.978 and 0.988 — close
// to square but not square, and cut out on transparency. `Insignia` contains
// them inside their box and leaves the remainder empty, which shows no
// letterbox because there is no opaque edge to show one. That is the opposite
// of the rule for a photograph (../shell/Panel.tsx) and the two are not
// interchangeable.
//
// THE BELT IS A THEME SLOT HERE, WHICH IS THE POINT. Dart's ladder starts at
// the member's own `rank.image_url` (the gym's real belt art); there is no
// member in this browser, so it starts one rung lower and the ACTIVE THEME's
// `rank_belt` is what renders — the same rung the masthead's carried line uses.
// Switching theme therefore re-belts the member, which is the claim the preview
// exists to make.

import { ThemedImage } from 'recompose-react';

import { INSIGNIA_ART_CLASS, Insignia } from '../shell/Insignia';
import { showcaseAsset } from '../showcaseAssets';
import { SLOT_RANK_BELT } from '../showcaseSlots';

import { RANK_PART } from './rankParts';
import styles from './RankHeader.module.css';

/**
 * The box the medallion is contained within.
 *
 * A per-asset layout dimension, not a design token — the Dart spells its belt
 * extents as file-local consts too. It is the largest struck object on any
 * screen a member browses, because the current rank is what this screen is
 * about; the belt they are working toward is deliberately smaller
 * (./NextRankSection.tsx).
 */
const BELT_SIZE = 140;

export interface RankHeaderProps {
  rankTitle: string;
  rankSubtitle?: string | undefined;
}

export function RankHeader({ rankTitle, rankSubtitle }: RankHeaderProps) {
  return (
    // `display: contents` — the marker stays in the DOM and in every query and
    // generates no box at all, so stamping this screen's inventory can never
    // move a pixel of the arrangement it exists to describe.
    <div className={styles.marker} data-rank-part={RANK_PART.rankHeader}>
      <Insignia
        size={BELT_SIZE}
        // The plate this sits on IS the satin field, and `onSatin` is what sets
        // the caption in the light cream. It is a contrast law rather than a
        // colour preference: the charcoal ink measures 2.70:1 on the blush and
        // fails AA at every size, where the cream is 5.47:1 (../showcaseTokens.ts).
        onSatin
        caption={rankTitle}
        sub={rankSubtitle}
        art={
          <ThemedImage
            className={INSIGNIA_ART_CLASS}
            slot={SLOT_RANK_BELT}
            fallbackSrc={showcaseAsset('profile_rank_belt_gold.png')}
            alt=""
            data-rank-part={RANK_PART.rankBelt}
          />
        }
      />
    </div>
  );
}
