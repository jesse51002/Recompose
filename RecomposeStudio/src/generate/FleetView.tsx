// The Fleet page: every customer app, and what an agent is doing to it.
//
// DEMO-WARE, and labelled so. Everything on it comes from
// ../data/fleetFixtures.ts — there are no customers and no deployment. The
// Generate page became real because a run and a session are real; a fleet is
// not, and drawing it from a fake API would only disguise that.
//
// Cards, not a table. The state has to land at a glance from across a room,
// and a card an agent is working on right now has to be obviously alive.
//
// **The mark is the row's identity.** Thirty rows of identical grey chrome is
// a spreadsheet; thirty different logos, each one actually produced by the
// pipeline, is the product's whole claim rendered as a list. So the logo comes
// first in the row and everything else reads to the right of it.

import { useState } from 'react';

import { cx } from '../widgets/cx';
import {
  BRANCH_URL,
  FILTERS,
  FLEET,
  FORK,
  KPIS,
  logoUrl,
  statusMeta,
  type FleetApp,
  type FleetStatus,
} from '../data/fleetFixtures';

import { FleetChat } from './FleetChat';
import { SHELL_CLASS } from './phaseClass';
import styles from './FleetView.module.css';

export function FleetView() {
  // All, and it stays all until someone chooses otherwise. A fleet page that
  // opened pre-filtered would hide the one number it exists to show.
  const [filter, setFilter] = useState<FleetStatus | 'all'>('all');
  // Which row's agent is being talked to. The ROW, not its id, because the
  // panel renders from the row and nothing else needs to look it up again.
  const [talking, setTalking] = useState<FleetApp | null>(null);
  const shown = filter === 'all' ? FLEET : FLEET.filter((a) => a.status === filter);

  return (
    <div className={cx(styles.page, SHELL_CLASS)}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <h1>CombatDen · customer apps</h1>
          {/* One line. The argument lives in the footer; a header only has to
              name the page, and nobody reads past the first few words. */}
          <p>
            <b>Agents automatically maintain</b> the customer design fork.
          </p>
        </div>

        {/* THE FORK ITSELF, at the top and only once. Every row below is a
            BRANCH of this one repository — that is the whole arrangement —
            so the shared thing they all depend on needs somewhere to look.
            Without it the page showed thirty links into a repository it
            never named. */}
        <a className={styles.fork} href={FORK.url}>
          <span className={styles.forkLead}>Open the forked repo</span>
          <b>{FORK.name}</b>
          <u>{FORK.note}</u>
        </a>
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

      {/* Lifecycle order, left to right, so the bar reads as the pipeline a
          design travels down rather than as a set of tags. */}
      <nav className={styles.filters} aria-label="Filter by status">
        {FILTERS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={filter === tab.id}
            onClick={() => setFilter(tab.id)}
            className={cx(
              styles.filter,
              filter === tab.id && styles.on,
              tab.tone !== null && styles[tab.tone],
              // The one tab that is asking for something wears its hue rather
              // than only dotting it — and ONLY while the count is not zero,
              // the same rule the tiles follow. Colour APPEARING is the
              // signal; a permanently amber tab that usually reads zero would
              // be noise, and this status is supposed to usually read zero.
              tab.id === 'help' && tab.n > 0 && styles.urgent,
            )}
          >
            {tab.tone !== null && <i />}
            {tab.label}
            <em>{tab.n}</em>
          </button>
        ))}
      </nav>

      <div className={styles.body}>
        {talking !== null && (
          <FleetChat
            // Re-keyed per row so switching rows starts the panel's entrance
            // and its dispatch bar over, rather than leaving the previous
            // conversation's animations mid-flight under new text.
            key={talking.branch}
            app={talking}
            onClose={() => setTalking(null)}
          />
        )}

        <div className={styles.cards}>
          {shown.map((app) => {
            const meta = statusMeta(app.status);
            return (
              <article
                key={app.branch}
                className={cx(styles.card, meta.live && styles.live)}
              >
                {/* Decorative: the name sits beside it, so a mark that fails to
                    load costs the row nothing. */}
                <img className={styles.logo} src={logoUrl(app.run)} alt="" />

                <div className={styles.who}>
                  <b>{app.name}</b>
                  <u>{app.branch}</u>
                  <span className={styles.since}>{app.since}</span>
                </div>

                <div className={styles.state}>
                  <span className={cx(styles.tag, styles[meta.tone])}>
                    <i />
                    {meta.label}
                  </span>
                  <b>{app.state}</b>
                  <u>{app.note}</u>
                  <span className={styles.log}>{app.log}</span>
                </div>

                <div className={styles.acts}>
                  <button
                    type="button"
                    className={cx(styles.btn, styles.pri)}
                    aria-pressed={talking?.branch === app.branch}
                    onClick={() => setTalking(app)}
                  >
                    Talk to the agent
                  </button>
                  {/* The BRANCH, not the repo — one fork, one branch per design.
                      Every one of them points at CombatDen itself: the branches
                      do not exist, and thirty invented URLs would be a page of
                      dead links pretending to be a product. */}
                  <a className={styles.btn} href={BRANCH_URL}>
                    View branch
                  </a>
                  <button type="button" className={styles.btn}>
                    View design
                  </button>
                </div>
              </article>
              );
            })}
        </div>
      </div>

      <footer className={styles.foot}>
        <b>
          {FLEET.filter((a) => statusMeta(a.status).live).length} agents
          working, {FLEET.filter((a) => a.status === 'help').length} waiting on
          you.
        </b>{' '}
        That is the shape the product is for. <b>Nothing here waits to be
        approved</b> — at this many branches an approval queue is the
        bottleneck, so a design ships when its own checks pass and only stops
        when they do not. {FLEET.filter((a) => a.status === 'help').length} of{' '}
        {FLEET.length} needs you, and that one is the whole reason this page
        exists. None of it is a pull request into a
        customer&rsquo;s repository; there is never one.
      </footer>

      <p className={styles.synthetic}>
        Every customer, branch, repository and figure on this page is invented,
        the fork at the top included. There are no customers. Only the logos are
        real — the pipeline made each one.
      </p>
    </div>
  );
}
