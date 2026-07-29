// The Studio tab: start a design, or re-attach to the one already going.
//
// This used to launch a pipeline run directly from a form. It does not any
// more: a run is one step inside a DESIGN, and what a person starts is a
// SESSION — an interview that decides what to make and then starts making it.
// The direct-launch form went with the direct launch; `BriefForm` and
// `exampleBrief` are gone, and `RunSheet` survives as the Generate page's
// Inspect tab, which is what it was always best at.
//
// `attaching` exists because the studio serializes sessions GLOBALLY: a page
// that loads while one is open should re-attach to it rather than offer to
// start a second that would only be refused. It is also what makes a reload in
// the middle of an hour-long design free.

import { useEffect, useState } from 'react';

import { APP_ID } from '../config';
import { GenerateAttaching, GenerateView } from '../generate/GenerateView';

import { fetchActiveSession, openSession } from './sessionApi';
import { StartDesign } from './StartDesign';
import { StudioError } from './studioApi';

type Phase =
  | { readonly kind: 'attaching' }
  | { readonly kind: 'idle'; readonly error: string | null }
  | {
      readonly kind: 'in-session';
      readonly sessionId: string;
      readonly designName: string;
    };

export function StudioView() {
  const [phase, setPhase] = useState<Phase>({ kind: 'attaching' });

  useEffect(() => {
    let cancelled = false;
    void fetchActiveSession()
      .then((active) => {
        if (cancelled) return;
        setPhase(
          active === null
            ? { kind: 'idle', error: null }
            : {
                kind: 'in-session',
                sessionId: active.session_id,
                designName: active.design_name,
              },
        );
      })
      .catch(() => {
        // The studio is not running. The start form is still the right thing
        // to show — pressing it is what surfaces the reason, together with the
        // command that fixes it.
        if (!cancelled) setPhase({ kind: 'idle', error: null });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const start = async (designName: string): Promise<void> => {
    try {
      const opened = await openSession({ appId: APP_ID, designName });
      setPhase({
        kind: 'in-session',
        sessionId: opened.session_id,
        designName: opened.design_name,
      });
    } catch (cause: unknown) {
      // A 409 is not a failure to reach — it means a design is already open,
      // and the useful answer is to SHOW that one rather than an error about
      // it. Anything else is reported as-is.
      if (cause instanceof StudioError && cause.status === 409) {
        const active = await fetchActiveSession().catch(() => null);
        if (active !== null) {
          setPhase({
            kind: 'in-session',
            sessionId: active.session_id,
            designName: active.design_name,
          });
          return;
        }
      }
      setPhase({
        kind: 'idle',
        error: cause instanceof Error ? cause.message : String(cause),
      });
    }
  };

  if (phase.kind === 'attaching') return <GenerateAttaching />;
  if (phase.kind === 'idle') {
    return <StartDesign onStart={start} error={phase.error} />;
  }
  return (
    // KEYED ON THE SESSION. `useSessionStream` accumulates records in state,
    // and resetting them when the id changed would mean setting state from an
    // effect — an error in this package. A `key` remount is the replacement it
    // uses everywhere else (../../CLAUDE.md, "Things that will bite").
    <GenerateView
      key={phase.sessionId}
      sessionId={phase.sessionId}
      designName={phase.designName}
    />
  );
}
