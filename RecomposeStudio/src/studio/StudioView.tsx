// The Generate tab: open a design, or re-attach to the one already going.
//
// **NOTHING IS TYPED BEFORE THE CONVERSATION STARTS.** There used to be a form
// here asking for the design's name — one box and a Start button in front of
// the whole product. It asked a person to name a thing that did not exist yet,
// before anything had shown them what was about to happen, and it asked for a
// fact the agent's own first question collects anyway ("what is the business
// called?"). So the page opens the session itself and the interview begins.
//
// The name arrives later, from the brief that interview produces, which is also
// the first moment a name means anything.
//
// `attaching` exists because the studio serializes sessions GLOBALLY: a page
// that loads while one is open must re-attach to it rather than open a second
// that would only be refused. It is also what makes a reload in the middle of a
// long design free.

import { useEffect, useState } from 'react';

import { APP_ID } from '../config';
import { GenerateAttaching, GenerateView } from '../generate/GenerateView';

import { fetchActiveSession, openSession } from './sessionApi';
import { StudioError } from './studioApi';
import { StudioDown } from './StudioDown';

type Phase =
  | { readonly kind: 'attaching' }
  | { readonly kind: 'down'; readonly error: string }
  | { readonly kind: 'in-session'; readonly sessionId: string };

export function StudioView({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>({ kind: 'attaching' });

  // ATTACH OR OPEN, in one effect, because they are one question — "which
  // session am I watching?" — and the answer is never "none". A page that
  // reached this view has already decided to make a design.
  useEffect(() => {
    let cancelled = false;

    const attach = async (): Promise<Phase> => {
      const active = await fetchActiveSession();
      if (active !== null) {
        return { kind: 'in-session', sessionId: active.session_id };
      }
      try {
        const opened = await openSession({ appId: APP_ID });
        return { kind: 'in-session', sessionId: opened.session_id };
      } catch (cause: unknown) {
        // A 409 means one opened between the two calls — a second tab, or a
        // double mount in dev. The useful answer is to show THAT one, not an
        // error about it.
        if (cause instanceof StudioError && cause.status === 409) {
          const raced = await fetchActiveSession();
          if (raced !== null) {
            return { kind: 'in-session', sessionId: raced.session_id };
          }
        }
        throw cause;
      }
    };

    void attach()
      .then((next) => {
        if (!cancelled) setPhase(next);
      })
      .catch((cause: unknown) => {
        // The studio is not running, or refused. There is no form to fall back
        // to any more, so the failure has to say so itself — and name the
        // command that fixes the common cause.
        if (cancelled) return;
        setPhase({
          kind: 'down',
          error: cause instanceof Error ? cause.message : String(cause),
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (phase.kind === 'attaching') return <GenerateAttaching />;
  if (phase.kind === 'down') return <StudioDown error={phase.error} />;
  return (
    // KEYED ON THE SESSION. `useSessionStream` accumulates records in state,
    // and resetting them when the id changed would mean setting state from an
    // effect — an error in this package. A `key` remount is the replacement it
    // uses everywhere else (../../CLAUDE.md, "Things that will bite").
    <GenerateView
      key={phase.sessionId}
      sessionId={phase.sessionId}
      onDone={onDone}
    />
  );
}
