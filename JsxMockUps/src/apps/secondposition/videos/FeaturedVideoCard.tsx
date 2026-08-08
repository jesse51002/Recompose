// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// featured_video_card.dart — the hero the videos tab opens with:
// ./VideoReccCard.tsx with the "Play" action waiting under it.
//
// THE ACTION IS CREAM, NOT SATIN, AND THAT IS FORCED. Every primary action in
// this fork is a full-width band with a serif label (../shell/ActionBand.tsx),
// and everywhere else that band is satin on the cream ground. Here it lands
// directly beneath the hero's satin plinth, and two satin bands touching read
// as one — so the band is inverted: the raised cream as the field, the blush as
// the ink. Measured rather than assumed, because the blush is the colour this
// palette is fussiest about. It is the SAME PAIR as a knocked-out name, read the
// other way round — `--sc-ground-raised` and `--sc-on-satin` are one colour —
// so the band's ink lands at the same 5.47:1 and passes AA at any size, where on
// the page's own cream (`--sc-background`) the identical blush is 4.31:1 and is
// legible only at the display sizes. The band paints the raised cream itself for
// exactly that reason rather than sitting transparent on the page.
//
// It also cannot be ../shell/ActionBand.tsx itself: that component is the
// screen's ONE primary action pinned above the foot, and it never coexists with
// ../shell/FootNav.tsx. This one belongs to the hero, not to the screen, and
// this screen has a foot nav.
//
// IT CARRIES NO HANDLER, AND THAT IS THE BASE'S BEHAVIOUR RATHER THAN AN
// OVERSIGHT. There is no player screen in this asset and inventing one would
// add a capability the platform's own app does not have here. It is therefore
// drawn as a plate rather than as a <button>: a dead <button> advertises an
// action the phone cannot take, which is the trap Guardrail 4 names. The
// screen's exit is the four destinations at the foot.
//
// The `FeaturedVideoLayout` prop the base carried is gone. It chose between an
// inset rounded card and a bleeding one; this design has no card to inset, and
// an always-`bleed` prop would be a lie about what the component does.

import type { ShowcaseVideo } from '../showcaseContent';

import styles from './FeaturedVideoCard.module.css';
import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import { VideoReccCard } from './VideoReccCard';

/** `AppPrimaryButton(text: 'Play')`. */
const PLAY_LABEL = 'Play';

export interface FeaturedVideoCardProps {
  video: ShowcaseVideo;
}

export function FeaturedVideoCard({ video }: FeaturedVideoCardProps) {
  return (
    <div className={styles.hero} {...{ [PART_ATTR]: VIDEO_PARTS.featured }}>
      <VideoReccCard video={video} />
      <div className={styles.play} {...{ [PART_ATTR]: VIDEO_PARTS.featuredPlay }}>
        <span className={styles.playLabel}>{PLAY_LABEL}</span>
      </div>
    </div>
  );
}
