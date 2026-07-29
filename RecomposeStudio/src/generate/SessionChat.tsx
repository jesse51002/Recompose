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
  readonly busy: boolean;
}

export function SessionChat({
  view,
  onSay,
  onAccept,
  onOpenProposal,
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
              <span className={styles.cardState}>
                {entry.accepted ? 'accepted' : 'ready'}
              </span>
            </h4>
            <p className={styles.cardName}>
              {entry.brief.design_direction.name}
            </p>
            <p className={styles.cardDesc}>
              {entry.brief.design_direction.short_desc}
            </p>
            {!entry.accepted && (
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
