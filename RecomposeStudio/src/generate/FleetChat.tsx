// Talking to one row's agent. Opens on the RIGHT, spanning the whole height.
//
// DEMO-WARE like the rest of the page, and the same rule applies: it says so on
// its own surface rather than in a file nobody opens.
//
// **The conversation is built from the row, not written per row.** Thirty
// hand-written scripts would drift from the states they describe the first time
// a status changed — and the row's `state`, `note` and `log` already ARE the
// agent's account of itself, so quoting them back is both cheaper and truer.
//
// It spans the full height rather than starting under the tiles, because it is
// a conversation about one design sitting BESIDE the fleet — a panel that began
// halfway down read as a detail of the table it was floating over.

import { useState } from 'react';

import { cx } from '../widgets/cx';
import { conversationFor, statusMeta, type FleetApp } from '../data/fleetFixtures';

import styles from './FleetChat.module.css';

export function FleetChat({
  app,
  onClose,
}: {
  app: FleetApp;
  onClose: () => void;
}) {
  const meta = statusMeta(app.status);
  const { turns, dispatch } = conversationFor(app);
  // NOTHING IS DISPATCHED UNTIL SOMEBODY SAYS SO. A coding agent bills for as
  // long as it runs, so it is proposed and waits — the same rule the Generate
  // page follows for the layout agent, and for the same reason. Cancel returns
  // here rather than to a dead card, which also makes the demo repeatable.
  const [running, setRunning] = useState(false);

  return (
    <aside className={styles.panel} aria-label={`Conversation about ${app.name}`}>
      <header className={styles.head}>
        <div className={styles.who}>
          <b>{app.name}</b>
          <u>{app.branch}</u>
        </div>
        <span className={cx(styles.tag, styles[meta.tone])}>{meta.label}</span>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close the conversation"
        >
          ×
        </button>
      </header>

      <div className={styles.scroll}>
        {turns.map((turn, i) => (
          <div
            // Index is a stable key: the script is fixed and never reorders.
            key={i}
            className={cx(styles.msg, turn.who === 'you' && styles.you)}
          >
            <div className={styles.role}>
              {turn.who === 'you' ? 'You' : 'Agent'}
            </div>
            <p>{turn.text}</p>
          </div>
        ))}

        {/* THE DISPATCH IS A MODULE, NOT A SENTENCE. The agent saying "I have
            sent someone" in prose is indistinguishable from it saying anything
            else, and the facts a person wants at that moment are the ones
            prose is worst at: whether it is running, and roughly how long.

            IT ASKS FIRST. A coding agent is the most expensive thing this
            product starts and it bills for as long as it runs, so the module
            opens as a request naming exactly what it would do, and nothing
            happens until it is approved. Cancel returns it to the request
            rather than to a dead card. */}
        <div className={styles.msg}>
          <div className={styles.role}>Agent</div>
          <div className={cx(styles.dispatch, running && styles.dispatchOn)}>
            <div className={styles.dispatchHead}>
              {running && <span className={styles.spark} />}
              <b>{running ? dispatch.title : 'Permission to dispatch an agent'}</b>
            </div>
            <p>{dispatch.detail}</p>

            {running ? (
              <>
                {/* INDETERMINATE ON PURPOSE. The bar travels rather than
                    fills, because a filling bar states a percentage — and a
                    dispatched agent reports nothing back until it lands, so
                    any percentage here would be invented. */}
                <div className={styles.bar}>
                  <i />
                </div>

                <div className={styles.eta}>
                  <span>working</span>
                  {/* "about", because it is an estimate and a bare number
                      reads as a deadline the studio cannot keep. */}
                  <b>about {dispatch.etaMinutes} minutes</b>
                </div>

                {/* Two ways out, and they are different acts. Expand is
                    primary: cancelling is the destructive one, and a
                    destructive button should not be the easiest to hit. */}
                <div className={styles.dispatchActs}>
                  <button type="button" className={cx(styles.act, styles.actPri)}>
                    Expand coding agent
                  </button>
                  <button
                    type="button"
                    className={styles.act}
                    onClick={() => setRunning(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.cost}>
                  <span>estimated</span>
                  <b>about {dispatch.etaMinutes} minutes of agent time</b>
                </div>
                <div className={styles.dispatchActs}>
                  <button
                    type="button"
                    className={cx(styles.act, styles.actPri)}
                    onClick={() => setRunning(true)}
                  >
                    Approve &amp; dispatch
                  </button>
                  <button type="button" className={styles.act}>
                    Not now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <p className={styles.synthetic}>
        This conversation is mocked. No agent was dispatched.
      </p>
    </aside>
  );
}
