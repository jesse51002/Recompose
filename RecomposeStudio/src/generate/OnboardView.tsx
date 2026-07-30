// The Onboard page: point us at the app.
//
// DEMO-WARE. Nothing is connected, nothing is read, nothing is forked. The
// steps advance on a click and a timer, exactly as the demo did — this page
// exists to make the mechanism legible, and the mechanism it describes (a
// managed fork, once per platform) is real even though this surface is not.
//
// TWO STEPS, not five. Connecting is a CREDENTIALS handshake — nothing has
// been read yet, so nothing is counted at that point — and tokenizing and
// mirroring are two halves of one job that taught a viewer nothing apart.

import { useEffect, useState } from 'react';

import { cx } from '../widgets/cx';
import { ONBOARD_FOUND } from '../data/fleetFixtures';

import { SHELL_CLASS } from './phaseClass';
import styles from './OnboardView.module.css';

type Step = 'idle' | 'connected' | 'forking' | 'forked';

/** How long the fake fork pass takes on screen. */
const FORK_MS = 4200;

const LOG_LINES = [
  'reading lib/theme/palette.dart…',
  'reading lib/features/class_booking/class_screen.dart…',
  'lifting 41 colour literals onto tokens…',
  'mirroring 6 screens into a feature-free mock…',
  'writing the design fork…',
];

export function OnboardView({ onOpenCustomerView }: { onOpenCustomerView: () => void }) {
  const [step, setStep] = useState<Step>('idle');
  const [log, setLog] = useState(LOG_LINES[0]!);

  // The log line advances while the fork pass "runs". A single static line
  // would read as hung, which is the exact impression this page must avoid.
  useEffect(() => {
    if (step !== 'forking') return;
    let i = 0;
    const tick = window.setInterval(() => {
      i = (i + 1) % LOG_LINES.length;
      setLog(LOG_LINES[i]!);
    }, FORK_MS / LOG_LINES.length);
    const done = window.setTimeout(() => setStep('forked'), FORK_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [step]);

  return (
    <div className={cx(styles.page, SHELL_CLASS)}>
      {/* The drifting light. It is the only decorative colour in the whole
          shell, and it is allowed here because this page has no state to
          report — nothing it could be confused with. It owns the field around
          the reading column, never the column itself. */}
      <div className={styles.beam} aria-hidden="true">
        <i />
      </div>

      <div className={styles.body}>
        <div className={styles.kick}>Admin · onboard a platform</div>
        <h1 className={styles.display}>Point us at the app.</h1>
        <p className={styles.lede}>
          We never touch your code. You give us read access, we keep a{' '}
          <b>managed fork</b>.
        </p>

        <div className={styles.urlbar}>
          <div className={styles.field}>
            <span className={styles.glyph} />
            <span>github.com/combatden/member-app</span>
          </div>
          <button
            type="button"
            className={cx(styles.btn, styles.primary)}
            disabled={step !== 'idle'}
            onClick={() => setStep('connected')}
          >
            {step === 'idle' ? 'Connect' : 'Connected'}
          </button>
        </div>

        <div className={styles.ribbon}>
          <Ribbon n="01" label="Connect" done={step !== 'idle'} />
          <Ribbon
            n="02"
            label="Create Design Fork"
            done={step === 'forked'}
            active={step === 'forking'}
          />
        </div>

        {step !== 'idle' && (
          <section className={styles.panel}>
            <div className={cx(styles.agent, styles.ok)}>
              <span className={styles.pulse} />
              <div className={styles.lb}>
                <b>Connected</b>
                <u>read access confirmed · nothing read, nothing written</u>
              </div>
              <span className={styles.el}>1.4s</span>
            </div>
            {step === 'connected' && (
              <div className={styles.acts}>
                <span className={styles.spacer} />
                <button
                  type="button"
                  className={cx(styles.btn, styles.primary)}
                  onClick={() => setStep('forking')}
                >
                  Create design fork →
                </button>
              </div>
            )}
          </section>
        )}

        {(step === 'forking' || step === 'forked') && (
          <section className={styles.panel}>
            <div
              className={cx(
                styles.agent,
                step === 'forking' ? styles.running : styles.ok,
              )}
            >
              <span className={styles.pulse} />
              <div className={styles.lb}>
                <b>
                  {step === 'forking'
                    ? 'An agent is creating your design fork'
                    : 'Your design fork is ready'}
                </b>
                <u>{step === 'forking' ? log : 'tokenized and mirrored'}</u>
              </div>
            </div>

            {step === 'forking' && (
              // Saying up front that this is long, and that you can leave, is
              // the difference between "working" and "hung".
              <div className={styles.longrun}>
                Usually <b>30–60 minutes</b>. You can close this — we&rsquo;ll
                email you when the fork is ready.
              </div>
            )}

            {step === 'forked' && (
              <>
                <div className={styles.found}>
                  {ONBOARD_FOUND.map((item) => (
                    <div key={item.label}>
                      <b>{item.n}</b>
                      <u>{item.label}</u>
                    </div>
                  ))}
                </div>
                <div className={styles.acts}>
                  <button type="button" className={styles.btn}>
                    View repo
                  </button>
                  <span className={styles.spacer} />
                  {/* The flow. Onboarding is the ADMIN's job and it ends by
                      handing over to the customer's view — so the page says
                      so and takes you there, rather than leaving you to find
                      the right tab. */}
                  <button
                    type="button"
                    className={cx(styles.btn, styles.primary)}
                    onClick={onOpenCustomerView}
                  >
                    Open the customer view →
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {/* Fine print, not a repeat of the headline: it carries the facts the
            one-liner drops — no integration work, and the cost amortizes. */}
        <p className={styles.disclaim}>
          No pull request into your repository, no branch on your trunk, no
          library to install, no integration work on your side.{' '}
          <b>Once per platform</b>, not once per tenant.
        </p>

        <p className={styles.synthetic}>
          Nothing on this page is connected. The repository, the timings and the
          counts are invented.
        </p>
      </div>
    </div>
  );
}

function Ribbon({
  n,
  label,
  done,
  active = false,
}: {
  n: string;
  label: string;
  done: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={cx(
        styles.rstep,
        done && styles.rdone,
        active && styles.ractive,
      )}
    >
      <span className={styles.rn}>{n}</span>
      <b>{label}</b>
    </div>
  );
}
