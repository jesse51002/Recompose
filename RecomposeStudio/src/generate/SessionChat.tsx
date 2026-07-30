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
import { ANSWER_SEPARATOR, type Entry } from '../studio/sessionFold';
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
            is not running is worse than no offer.

            START IS GATED ON THE RUN HAVING FINISHED — `assetsSettled`, not
            `themeId`. The started record already names the theme it is going
            to make, so gating on the theme EXISTING announced "the theme is
            ready" a second after launch and offered to lay out a design that
            was three images deep. The layout agent is built for that palette,
            those typefaces and those pictures; there is nothing for it to look
            at until they are all there.

            It reads "again" once a folder is there — starting continues that
            folder rather than discarding it. */}
        {!view.settled && (view.layoutRunning || view.assetsSettled) && (
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
                    ? 'The theme is finished. An agent can now redesign the screens against it.'
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
      return <AskedView entry={entry} onPick={onPick} busy={busy} />;

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

/**
 * One question's chips.
 *
 * **Two modes, one component.** `multi_select` has been on the agent's own
 * schema all along and the UI ignored it, so a question the model meant as
 * "pick any that apply" behaved as "pick exactly one and send it now" —
 * silently answering with a fraction of what was true.
 *
 * Single-select still sends on the press: a confirm on a one-of-six is a
 * second click that buys nothing. Multi-select cannot work that way — the
 * first press would send — so it accumulates and needs a SUBMIT of its own,
 * which is the button below.
 *
 * The draft is local state and deliberately not folded from the records: it
 * exists only between the first press and the submit, and nothing outside
 * this row can act on a half-made answer.
 */
function AskedView({
  entry,
  onPick,
  busy,
}: {
  entry: Extract<Entry, { kind: 'asked' }>;
  onPick: (text: string) => void;
  busy: boolean;
}) {
  const [draft, setDraft] = useState<readonly string[]>([]);
  const multi = entry.question.multi_select;
  // An answered row reads from the record; a live row reads from the draft,
  // and single-select has no draft — the press IS the answer.
  const chosen = entry.answered ? entry.picked : multi ? draft : [];

  const toggle = (option: string): void => {
    if (!multi) {
      onPick(option);
      return;
    }
    setDraft((current) =>
      current.includes(option)
        ? current.filter((each) => each !== option)
        : // In the OPTIONS' order, not the press order, so the message the
          // agent reads matches the list it just offered.
          entry.question.options.filter(
            (each) => each === option || current.includes(each),
          ),
    );
  };

  return (
    <div className={styles.msg}>
      <div className={styles.who}>Recompose</div>
      <p>{entry.question.question}</p>
      {multi && !entry.answered && (
        <span className={styles.hint}>Pick any that apply</span>
      )}
      <div className={styles.choices}>
        {entry.question.options.map((option) => (
          <button
            key={option}
            type="button"
            // THE ANSWER IS MARKED, not just recorded. An answered row used to
            // grey out whole, so scrolling back through a finished interview
            // showed eight identical dim rows and no trace of what had
            // actually been decided — the transcript kept the questions and
            // lost the answers.
            className={cx(styles.choice, chosen.includes(option) && styles.chosen)}
            aria-pressed={chosen.includes(option)}
            // An answered question keeps its options visible but inert: the
            // transcript is a record, and hiding what was on offer would make
            // an earlier decision unreadable later.
            disabled={entry.answered || busy}
            onClick={() => toggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {multi && !entry.answered && (
        <div className={styles.actions}>
          <button
            type="button"
            className={cx(styles.btn, styles.primary)}
            // Nothing picked is not an answer. The composer is right there for
            // "none of these", and it says so better than an empty send would.
            disabled={busy || draft.length === 0}
            onClick={() => onPick(draft.join(ANSWER_SEPARATOR))}
          >
            {draft.length <= 1
              ? 'Send answer'
              : `Send ${String(draft.length)} answers`}
          </button>
        </div>
      )}
    </div>
  );
}
