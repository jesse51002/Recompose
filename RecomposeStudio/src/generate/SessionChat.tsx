// The transcript column: one conversation for the whole design.
//
// It never resets between phases. The brand interview, the asset run, the
// layout interview and the layout agent all land in the same column, in order,
// because they are one design being made and splitting them would make the
// person reconcile four views of it.
//
// Everything here is a pure function of the folded record list, which is what
// makes a reload free: the stream replays from index 0, so a tab that opens in
// the fortieth minute renders exactly what a tab that watched from the start
// renders.

import { useEffect, useRef, useState } from 'react';

import { cx } from '../widgets/cx';
import type { Entry } from '../studio/sessionFold';
import type { SessionView } from '../studio/sessionFold';

import { phaseClass } from './phaseClass';
import styles from './SessionChat.module.css';

interface SessionChatProps {
  readonly view: SessionView;
  /** Send a message, or the text of a picked chip. */
  readonly onSay: (message: string) => void;
  /** Accept whatever proposal is open. */
  readonly onAccept: () => void;
  /** Open the proposal in the centre pane's brief tab. */
  readonly onOpenProposal: () => void;
  /** Run the layout agent on the settled theme, or continue its folder. */
  readonly onStartLayout: () => void;
  /** Kill the running layout agent. */
  readonly onStopLayout: () => void;
  readonly busy: boolean;
}

export function SessionChat({
  view,
  onSay,
  onAccept,
  onOpenProposal,
  onStartLayout,
  onStopLayout,
  busy,
}: SessionChatProps) {
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  // Follow the tail. A transcript that stays where it was while the agent
  // answers below the fold reads as a hung page.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [view.entries.length]);

  const send = (text: string): void => {
    const message = text.trim();
    if (!message || busy) return;
    setDraft('');
    onSay(message);
  };

  return (
    <div className={styles.column}>
      <div className={styles.scroll}>
        {view.entries.map((entry, i) => (
          <EntryView
            // Index is a stable key here BECAUSE the list is append-only and
            // replayed in order — an entry never moves once written.
            key={i}
            entry={entry}
            onPick={send}
            onAccept={onAccept}
            onOpen={onOpenProposal}
            busy={busy}
          />
        ))}
        {/* THE LAYOUT AGENT LIVES WITH THE CONVERSATION, not in the canvas
            bar, and it is a CARD IN THE FLOW rather than a strip pinned above
            the composer. Starting and stopping the agent is a decision about
            the design, the same kind of act as accepting a brief, and every
            other such decision arrives here as something the agent said with a
            button under it. A pinned strip was neither a message nor chrome
            and read as both.

            It sits after the entries because it is always about the state
            right now — one card that changes, not one per start.

            Stop and Start share the card and only one is ever shown. Stop is
            gated on a running agent, because an offer to stop something that
            is not running is worse than no offer. Start appears only once a
            theme exists, since before that there is nothing to design against,
            and it reads "again" once a folder is there — starting continues
            that folder rather than discarding it. */}
        {!view.settled && (view.layoutRunning || view.themeId !== null) && (
          <div className={styles.msg}>
            <div className={styles.who}>Recompose</div>
            <div className={styles.card}>
              <h4>
                Layout agent
                <span className={styles.cardState}>
                  {view.layoutRunning ? 'working' : 'idle'}
                </span>
              </h4>
              <p className={styles.cardDesc}>
                {view.layoutRunning
                  ? 'It is rewriting the screens for this theme. Closing this tab will not stop it.'
                  : view.designId === null
                    ? 'The theme is ready. An agent can now redesign the screens against it.'
                    : 'It is not running. Starting it again continues the design folder it already wrote.'}
              </p>
              <div className={styles.actions}>
                {view.layoutRunning ? (
                  <button
                    type="button"
                    className={cx(styles.btn, styles.danger)}
                    disabled={busy}
                    title="Kill the layout agent. The screens keep whatever it has already written."
                    onClick={onStopLayout}
                  >
                    Stop the agent
                  </button>
                ) : (
                  <button
                    type="button"
                    className={cx(styles.btn, styles.primary)}
                    disabled={busy}
                    title={
                      view.designId === null
                        ? 'Redesign the screens for this theme.'
                        : 'Run the layout agent again on this design, continuing what is already there.'
                    }
                    onClick={onStartLayout}
                  >
                    {view.designId === null
                      ? 'Start the agent'
                      : 'Run the agent again'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        className={styles.composer}
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <input
          className={styles.input}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={view.settled ? 'This design is finished.' : 'Say something…'}
          disabled={busy || view.settled}
          aria-label="Message"
        />
        <button
          type="submit"
          className={styles.send}
          disabled={busy || view.settled || draft.trim() === ''}
        >
          Send
        </button>
      </form>
    </div>
  );
}

interface EntryViewProps {
  readonly entry: Entry;
  readonly onPick: (text: string) => void;
  readonly onAccept: () => void;
  readonly onOpen: () => void;
  readonly busy: boolean;
}

function EntryView({ entry, onPick, onAccept, onOpen, busy }: EntryViewProps) {
  switch (entry.kind) {
    case 'phase':
      // A marker, not a message: it spans the column and names the phase in
      // that phase's own hue.
      return (
        <div className={cx(styles.phase, phaseClass(entry.phase))}>
          <span>{entry.phase}</span>
        </div>
      );

    case 'said':
      return (
        <div className={cx(styles.msg, entry.who === 'you' && styles.you)}>
          <div className={styles.who}>{entry.who === 'you' ? 'You' : 'Recompose'}</div>
          <p>{entry.text}</p>
        </div>
      );

    case 'asked':
      return (
        <div className={styles.msg}>
          <div className={styles.who}>Recompose</div>
          <p>{entry.question.question}</p>
          <div className={styles.choices}>
            {entry.question.options.map((option) => (
              <button
                key={option}
                type="button"
                // THE ANSWER IS MARKED, not just recorded. An answered row
                // used to grey out whole, so scrolling back through a
                // finished interview showed eight identical dim rows and no
                // trace of what had actually been decided — the transcript
                // kept the questions and lost the answers.
                className={cx(
                  styles.choice,
                  entry.picked === option && styles.chosen,
                )}
                aria-pressed={entry.picked === option}
                // An answered question keeps its options visible but inert:
                // the transcript is a record, and hiding what was on offer
                // would make an earlier decision unreadable later.
                disabled={entry.answered || busy}
                onClick={() => onPick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );

    case 'brief':
      return (
        <div className={styles.msg}>
          <div className={styles.who}>Recompose</div>
          <div className={styles.card}>
            <h4>
              Brand brief
              {/* Three states, not two. A brief the agent replaced is
                  neither accepted nor waiting on anything, and calling it
                  "ready" would offer a decision that has moved on. */}
              <span className={styles.cardState}>
                {entry.accepted
                  ? 'accepted'
                  : entry.awaiting
                    ? 'ready'
                    : 'superseded'}
              </span>
            </h4>
            <p className={styles.cardName}>
              {entry.brief.design_direction.name}
            </p>
            <p className={styles.cardDesc}>
              {entry.brief.design_direction.short_desc}
            </p>
            {/* ACCEPT IS SHOWN ONLY ON THE BRIEF THAT IS ACTUALLY WAITING.
                It used to be shown on any unaccepted brief, and separately
                any brief that stopped being the open one was MARKED accepted
                — so typing a note after a proposal both took its button away
                and told you it had been accepted, neither of which had
                happened. Nothing accepts a brief now except pressing this. */}
            {entry.awaiting && (
              <div className={styles.actions}>
                {/* Accept is primary because the brief opens in the centre
                    pane on its own — the person has already seen it, so the
                    button that moves things on is the one they want. */}
                <button
                  type="button"
                  className={cx(styles.btn, styles.primary)}
                  disabled={busy}
                  onClick={onAccept}
                >
                  Accept &amp; continue
                </button>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={onOpen}
                >
                  Open the brief
                </button>
              </div>
            )}
          </div>
        </div>
      );

    case 'task':
      return (
        <div
          className={cx(
            styles.task,
            entry.state === 'failed' && styles.taskFailed,
          )}
        >
          <span className={styles.taskName}>{entry.task}</span>
          <span>{entry.error ?? entry.line ?? entry.state}</span>
        </div>
      );

    default:
      return null;
  }
}
