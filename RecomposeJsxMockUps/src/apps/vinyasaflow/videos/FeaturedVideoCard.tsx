// Ports ../../../../../../MobileApp/lib/features/videos/presentation/widgets/
// featured_video_card.dart — the hero the videos tab opens with:
// ./VideoReccCard.tsx with the "Play" action waiting under it.
//
// THE SCREEN'S ONE TERRACOTTA FILL IS HERE. `Action` (../shell/Action.tsx) is a
// capsule — a line with round ends — so even the most emphatic element on the
// screen is drawn from the two forms everything else is drawn from, rather than
// a rounded rectangle smuggled in as a button. Exactly one of these may appear
// per screen: with both brand colours failing AA as ink on the linen canvas, a
// fill is the only way this palette carries emphasis, and a screen with two of
// them has no primary action at all.
//
// IT CARRIES NO HANDLER, AND THAT IS THE BASE'S BEHAVIOUR RATHER THAN AN
// OVERSIGHT. There is no player screen in this asset and inventing one would be
// adding a capability the platform's own app does not have here. The screen's
// exit is the four destinations at the foot (Guardrail 4), which the base's
// "Play" also relied on.
//
// The `FeaturedVideoLayout` prop the base carried is gone. It chose between an
// inset rounded card and a bleeding one; this design has no card to inset, and
// an always-`bleed` prop would be a lie about what the component does.

import { Action } from '../shell/Action';
import type { ShowcaseVideo } from '../showcaseContent';

import styles from './FeaturedVideoCard.module.css';
import { PART_ATTR, VIDEO_PARTS } from './videoParts';
import { VideoReccCard } from './VideoReccCard';

/** `AppPrimaryButton(text: 'Play')`. Sentence case, like every label here. */
const PLAY_LABEL = 'Play';

export interface FeaturedVideoCardProps {
  video: ShowcaseVideo;
}

export function FeaturedVideoCard({ video }: FeaturedVideoCardProps) {
  return (
    <div className={styles.hero} {...{ [PART_ATTR]: VIDEO_PARTS.featured }}>
      <VideoReccCard video={video} />
      <div className={styles.ctaRow} {...{ [PART_ATTR]: VIDEO_PARTS.featuredPlay }}>
        <Action text={PLAY_LABEL} />
      </div>
    </div>
  );
}
