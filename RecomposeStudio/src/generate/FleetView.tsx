// The Fleet page: every customer app, and what an agent is doing to it.
//
// DEMO-WARE, and labelled so. Everything on it comes from
// ../data/fleetFixtures.ts — there are no customers and no deployment. The
// Generate page became real because a run and a session are real; a fleet is
// not, and drawing it from a fake API would only disguise that.
//
// Cards, not a table. The state has to land at a glance from across a room,
// and a card an agent is working on right now has to be obviously alive.

import { cx } from '../widgets/cx';
import { FLEET, KPIS } from '../data/fleetFixtures';

import { SHELL_CLASS } from './phaseClass';
import styles from './FleetView.module.css';

export function FleetView() {
  return (
    <div className={cx(styles.page, SHELL_CLASS)}>
      <header className={styles.head}>
        <h1>CombatDen · customer apps</h1>
        {/* One line. The argument lives in the footer; a header only has to
            name the page, and nobody reads past the first few words. */}
        <p>
          <b>Agents automatically maintain</b> the customer design fork.
        </p>
      </header>

      <div className={styles.kpis}>
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className={cx(
              styles.kpi,
              // A zero stays neutral: colour APPEARING is the signal, and a
              // permanently amber zero would be noise.
              kpi.n > 0 && kpi.tone !== null && styles[kpi.tone],
            )}
          >
            <b>{kpi.n}</b>
            <u>{kpi.label}</u>
          </div>
        ))}
      </div>

      <div className={styles.cards}>
        {FLEET.map((app) => (
          <article
            key={app.repo}
            className={cx(styles.card, app.live && styles.live)}
          >
            <div className={styles.who}>
              <b>{app.name}</b>
              <u>{app.repo}</u>
              <span className={styles.since}>{app.since}</span>
            </div>

            <div className={styles.state}>
              <span className={cx(styles.tag, styles[app.tone])}>
                <i />
                {app.tag}
              </span>
              <b>{app.state}</b>
              <u>{app.note}</u>
              <span className={styles.log}>{app.log}</span>
            </div>

            <div className={styles.acts}>
              <button type="button" className={styles.btn}>
                Talk to the agent
              </button>
              <button type="button" className={styles.btn}>
                View repo
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer className={styles.foot}>
        <b>Two agents working, nothing waiting on you.</b> That is the shape the
        product is for — when an agent is wrong it surfaces in <b>UAT</b> as a
        queue rather than in production as an incident. None of this is a pull
        request into a customer&rsquo;s repository; there is never one.
      </footer>

      <p className={styles.synthetic}>
        Every customer, repository and figure on this page is invented. There
        are no customers.
      </p>
    </div>
  );
}
