// Ports ../../../../../../MobileApp/lib/features/profile/presentation/widgets/
// rank_summary/rank_header.dart — the member's belt art beside their rank name,
// with the sub-rank label under it.
//
// THE MEDALLION IS A DISC THE THREAD PASSES THROUGH, and that is the whole
// design of this element. The descent runs at `--sc-thread-x`; the disc is
// centred on that same line and is opaque, so the stroke enters at its top edge,
// disappears behind it, and comes out the bottom. It is not a node with a
// picture in it and it is not a badge dropped beside the line — it IS the node
// for this region, which is why this file draws its own row rather than reaching
// for `<Region>`'s small ring.
//
// ITS DIAMETER IS DECIDED BY THE THREAD, NOT BY TASTE, and it is the app's own
// circle rather than a number picked here. The line's centre sits
// `--sc-thread-x` + half `--sc-thread-width` from the screen's left edge (27),
// so a disc centred on it eats into BOTH the left margin and the content column
// as it grows. `navDisc` is the size the design already settled on for exactly
// that problem: the four destinations at the foot are circles centred on this
// same line at this same distance from this same edge. Reusing it means the
// member's own mark, the destinations they move between, and the studio mark
// the thread starts from are all one family of circle — and a disc drawn at
// taste rather than at that number was sitting a single pixel off the screen
// edge, which was the first thing wrong with this screen when it was looked at.
//
// <MintedDisc>, NOT A PHOTOGRAPH. The belt art the pipeline produces for this
// slot is a struck medallion — 1:1, centre-weighted, transparent-edged — so a
// circle costs it nothing and belongs to it. Guardrail 10b is about the other
// case, and it is why nothing landscape ever gets this treatment.
//
// THE BELT IS A THEME SLOT HERE, WHICH IS THE POINT. Dart's ladder is the
// member's own `rank.image_url` (the gym's real belt art) over a bundled
// fallback; there is no member in this browser, so the ladder starts one rung
// lower and the ACTIVE THEME's `rank_belt` is what renders — the same rung
// ../shell/Head.tsx's carried row already uses for this slot. Switching theme
// therefore re-belts the member, which is exactly the claim the preview exists
// to make.

import { MintedDisc } from '../shell/Photo';
import { Title } from '../shell/Figure';
import { showcaseAsset } from '../showcaseAssets';
import { SLOT_RANK_BELT } from '../showcaseSlots';

import { RANK_PART } from './rankParts';
import styles from './RankHeader.module.css';

/** The app's own circle, centred on the app's own line. See the header. */
/*
 * The belt is rank 1 on this screen TOGETHER WITH the rank's name, so it is
 * sized to hold its own beside a display-size word rather than to match the
 * navigation's glyph, which is what it borrowed before.
 */
const MEDALLION = 56;

export interface RankHeaderProps {
  rankTitle: string;
  rankSubtitle?: string | undefined;
}

export function RankHeader({ rankTitle, rankSubtitle }: RankHeaderProps) {
  return (
    <div className={styles.header} data-rank-part={RANK_PART.rankHeader}>
      <span className={styles.medallion} data-rank-part={RANK_PART.rankBelt}>
        <MintedDisc
          slot={SLOT_RANK_BELT}
          fallback={showcaseAsset('profile_rank_belt_gold.png')}
          alt=""
          size={MEDALLION}
        />
      </span>
      {/*
        The one headline that names this screen, in the display face at LIGHT
        weight and in sentence case — the member's rank is what the screen is
        called. The sub-rank sits under it, close, because the two are one name.
      */}
      <div className={styles.names}>
        <Title>{rankTitle}</Title>
        {rankSubtitle !== undefined && rankSubtitle !== '' && (
          <p className={styles.subtitle}>{rankSubtitle}</p>
        )}
      </div>
    </div>
  );
}
