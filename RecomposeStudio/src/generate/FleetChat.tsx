// Talking to one row's agent. Opens on the LEFT of the fleet, over the list.
//
// DEMO-WARE like the rest of the page, and the same rule applies: it says so on
// its own surface rather than in a file nobody opens.
//
// **The conversation is built from the row, not written per row.** Thirty
// hand-written scripts would drift from the states they describe the first time
// a status changed — and the row's `state`, `note` and `log` already ARE the
// agent's account of itself, so quoting them back is both cheaper and truer.
//
// It sits on the left because that is where a conversation lives everywhere
// else in this product: the Generate page's transcript is the left column, and
// a chat that opened on the right would make the same act look like two
// different things depending on which page you were on.

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
            sent someone" in prose is indistinguishable from the agent saying
            anything else, and what a person wants at that moment is the two
            facts prose is worst at: that it is running, and roughly how long.
            So it gets a card, a bar that is moving, and a figure. */}
        <div className={styles.msg}>
          <div className={styles.role}>Agent</div>
          <div className={styles.dispatch}>
            <div className={styles.dispatchHead}>
              <span className={styles.spark} />
              <b>{dispatch.title}</b>
            </div>
            <p>{dispatch.detail}</p>

            {/* INDETERMINATE ON PURPOSE. The bar travels rather than fills,
                because a filling bar states a percentage — and a dispatched
                agent reports nothing back until it lands, so any percentage
                here would be invented. */}
            <div className={styles.bar}>
              <i />
            </div>

            <div className={styles.eta}>
              <span>working</span>
              {/* "about", because it is an estimate and a bare number reads as
                  a deadline the studio has no way to keep. */}
              <b>about {dispatch.etaMinutes} minutes</b>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.synthetic}>
        This conversation is mocked. No agent was dispatched.
      </p>
    </aside>
  );
}
