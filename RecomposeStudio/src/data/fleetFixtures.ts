// SYNTHETIC. Every name, repository and figure below is invented.
//
// There are no customers, no named platform, and no production deployment.
// This file exists so the Fleet page has something to draw; it must never be
// mistaken for a data source, and nothing here may leak into a claim made
// anywhere else.
//
// The Onboard and Fleet pages are DEMO-WARE and stay that way. The Generate
// page became real because a run and a session are real; a fleet of customer
// apps is not, and drawing it from a fake API rather than a fixture would only
// disguise that.

/** One customer app on the fleet page. */
export interface FleetApp {
  readonly name: string;
  readonly repo: string;
  readonly since: string;
  /** An agent is working on it right now — the card animates. */
  readonly live: boolean;
  readonly tag: string;
  /** Which status hue the tag wears: run / ok / you. */
  readonly tone: 'run' | 'ok' | 'you';
  readonly state: string;
  readonly note: string;
  /** The agent's own last line, set in mono. */
  readonly log: string;
}

export const FLEET: readonly FleetApp[] = Object.freeze([
  {
    name: 'Stillwater Pilates',
    repo: 'combatden-stillwater',
    since: 'approved 29 Jul',
    live: false,
    tag: 'In sync',
    tone: 'ok',
    state: 'Nothing to do',
    note: 'uat and main are level with our fork of CombatDen. Nothing to do.',
    log: 'last re-derived 2h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Apex MMA',
    repo: 'combatden-apex',
    since: 'approved 26 Jul',
    live: true,
    tag: 'Working',
    tone: 'run',
    state: 'An agent is productionalizing this design',
    note:
      'Turning the approved mock into real Flutter, carrying the ' +
      'arrangement-only invariant. Slow by design — it is the pass whose ' +
      'output ships.',
    log: 'rewriting class_screen.dart · 9 of 14 files · 34m elapsed, typically 1–2h',
  },
  {
    name: 'Ironline',
    repo: 'combatden-ironline',
    since: 'approved 21 Jul',
    live: true,
    tag: 'Working',
    tone: 'run',
    state: 'An agent is pulling your latest UAT branch',
    note:
      'CombatDen shipped a waitlist. Re-applying this design on top of it ' +
      'so the fork never drifts.',
    log: 'rebasing on combatden/uat@d41c907 · 3 of 11 screens · 12m elapsed',
  },
]);

export interface Kpi {
  readonly n: number;
  readonly label: string;
  readonly tone: 'run' | 'ok' | 'you' | null;
}

/**
 * The four counts across the top.
 *
 * **A zero stays neutral.** "Needing you" turns amber the moment it is not
 * zero, and colour APPEARING is the signal — a permanently amber zero would be
 * noise, and the page would stop being scannable from across a room.
 */
export const KPIS: readonly Kpi[] = Object.freeze([
  { n: FLEET.length, label: 'customer apps', tone: null },
  { n: FLEET.filter((app) => app.live).length, label: 'agents working', tone: 'run' },
  { n: FLEET.filter((app) => app.tone === 'ok').length, label: 'in sync', tone: 'ok' },
  { n: 0, label: 'needing you', tone: 'you' },
]);

/** What the onboarding agent claims to have found. Synthetic. */
export const ONBOARD_FOUND: readonly { readonly n: string; readonly label: string }[] =
  Object.freeze([
    { n: '6', label: 'screens' },
    { n: '5', label: 'post-class cards' },
    { n: '41', label: 'colour literals' },
    { n: '18', label: 'asset references' },
  ]);
