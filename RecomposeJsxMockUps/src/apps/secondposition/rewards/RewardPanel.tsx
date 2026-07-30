// ONE REWARD, AS A PANEL ON THE BILL.
//
// Replaces the base's `RewardCard.tsx` + `rewardCardParts.tsx` — a rounded
// `card`-filled rectangle with the photograph across its top, five arrangements
// deep, and a full-width Redeem button in its foot. This design has no card:
// everything the app lists is one full-bleed panel, half picture and half satin
// carrying the name (../layout_brief.yaml), and a reward is one of the things
// this studio announces.
//
// EVERY FIELD THE CARD CARRIED IS STILL HERE — the image, the title, the points
// cost, the price label, and the one redeem action belonging to this reward.
// What changed is which of them leads and what shape the action takes.
//
// THE PANEL IS THE REDEEM ACTION, and that is the one call in this screen that
// is worth stating plainly. ../shell/Panel.tsx is a single <button>, so a
// second button inside it is not even valid markup; and a design whose unit is
// one object per thing does not then hang a control off the side of it. So the
// action moved onto the panel itself — the same move a schedule row makes when
// it opens a class, and the standard phone idiom Guardrail 12 asks for. It is
// still exactly ONE redeem action per reward, and its tap target is larger than
// the button's was.
//
// BUT THE WORD STAYS ON SCREEN, and that half shipped missing. Moving the
// action onto the panel is arrangement; deleting its NAME is removal. The base
// draws `Redeem` on every card and the base's own card contract counts it as
// one of the five things a reward carries, so a member who could previously
// read what tapping does could no longer. `aria-label` is not a substitute:
// Guardrail 12's test is whether someone can use the screen on sight. So the
// word is set on the panel's last line, beside the cost, underlined in the
// cream so it reads as the action rather than as a third label — no chip, no
// fill, no radius, which is what this design refuses.
//
// NO REDEEM DIALOG. Dart's `RewardStoreCard` wires the action to
// `RewardRedeemDialog`, which has no counterpart in this asset — see `redeem`.
//
// THE PHOTOGRAPH GETS A BOX OF ITS OWN PROPORTION. A reward photo is 3:2, so
// `ratio="photo"` in BOTH registers: the billed one is the same picture given
// the full width, never the same width given a shorter box. Guardrail 10b is
// invisible to typecheck, lint and the token sweep — the layout stays "correct"
// while the pictures are thrown away — and it has shipped here before.
//
// NO `data-reward-part`. The base tagged its four parts so a DOM census could
// count them without knowing the arrangement. Two of the four (the picture and
// the name) are now rendered by the shared Panel and cannot carry an attribute
// this file adds, and a census that can only see half the parts is worse than
// none. Nothing in this fork reads the attribute.

import { ThemedImage } from 'recompose-react';

import { formatThousands } from '../formatPoints';
import { Panel, PANEL_MEDIA_CLASS } from '../shell/Panel';
import { showcaseAssetOrNetwork } from '../showcaseAssets';

import type { ShowcasePointsStoreItem } from './mockPointsStore';
import styles from './RewardPanel.module.css';

/**
 * What renders when a reward carries no picture of its own — the same bundled
 * default the base's `RewardImageHero` fell through to.
 */
const FALLBACK_REWARD_IMAGE = 'reward_bring_friend.png';

/**
 * The redeem action, in a preview that has nowhere to redeem to.
 *
 * Dart pushes `RewardRedeemDialog` here. There is no such screen in this asset
 * and adding one would be adding a feature, so the handler is real and does
 * nothing — which is exactly what the base's own `ShowcasePrimaryButton`
 * default did behind every Redeem button in the store. This is not a dead end:
 * the four destinations at the foot are on screen the whole time (Guardrail 4).
 */
function redeem(): void {
  // Deliberately empty. See above.
}

export interface RewardPanelProps {
  item: ShowcasePointsStoreItem;
  /** `RewardCard.buttonText` — the redeem action's name ("Redeem", "Use"). */
  buttonText: string;
  /**
   * `billed` for the reward that opens the bill, `split` for the rest. Two
   * registers of one unit, and the bill decides which — not this file.
   */
  register: 'billed' | 'split';
  /** Position down the column, for the entrance's fixed interval. */
  index: number;
}

export function RewardPanel({ item, buttonText, register, index }: RewardPanelProps) {
  // Theme slot -> injected gym photo -> bundled, the same ladder a schedule row
  // uses. The slot is stamped where the list is built (../RewardsShowcase.tsx's
  // `storeItemsFor`), so every surface showing this reward paints from the same
  // one and the picture cannot drift off the name it was generated from.
  const fallback = showcaseAssetOrNetwork(item.imageUrl, item.imageAsset ?? FALLBACK_REWARD_IMAGE);

  return (
    <Panel
      register={register}
      ratio="photo"
      index={index}
      onOpen={redeem}
      // The visible name says WHAT; the control's name says what tapping does.
      label={`${buttonText} — ${item.title}`}
      media={
        <ThemedImage
          className={PANEL_MEDIA_CLASS}
          slot={item.themeSlot ?? ''}
          fallbackSrc={fallback}
          alt={item.title}
        />
      }
      name={item.title}
      // The price label — a brand-filled chip over the photo's corner in the
      // base. Here it is type: a chip would be a third fill on a screen whose
      // only two are the cream and the satin, and it would sit ON the picture,
      // which this design does not do to a photograph. Held at the label rung
      // so the cost below it reads as the louder of the two.
      meta={<span className={styles.price}>{item.priceLabel}</span>}
      // THE TERMS LINE — the cost, then the action. A bill states the work,
      // then the note, then what it costs and how it is taken.
      //
      // The cost leads because it is rank 2 and the eye returns to the left
      // edge; it inherits `.trailing`'s sans value rung and tabular figures, so
      // the digits of one reward line up with the next one's. The action
      // follows at the tracked label rung, a whole register quieter, so
      // naming the action can never out-shout the price of it.
      //
      // Both sit inside one span because `.trailing` is itself the flex row and
      // its gap is the SMALL one — right for a figure and its unit, too tight
      // for two facts that are read separately.
      trailing={
        <span className={styles.terms}>
          <span>{formatThousands(item.pointsCost)} pts</span>
          <span className={styles.redeem}>{buttonText}</span>
        </span>
      }
    />
  );
}
