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
//
// **The logos, alone, are real.** Each row names a run that actually exists in
// `apps/combatden/`, and its mark is fetched from the read API. That is the
// one honest thing on the page and it is the point: a fleet of grey initials
// argues nothing, whereas thirty genuinely different marks — every one of them
// produced by the pipeline — is the argument the page is making. The URL is
// hardcoded at loopback because this is a laptop demo and nothing here is
// deployed; a row that cannot reach the API simply draws no mark.

/**
 * THE SHARED TOKENIZED FORK — the base every design branches off.
 *
 * Recompose never writes to the platform's trunk. There are two agent-
 * maintained fork layers: this one, re-derived against their main as they
 * ship, and one branch per DESIGN on top of it. So a row below is a branch,
 * not a repository of its own, and the fleet page needs one link to the fork
 * itself — otherwise the shared thing every row depends on is the only part
 * of the arrangement with nowhere to look.
 */
export const FORK = Object.freeze({
  name: 'recompose/combatden-tokenized',
  /** Where it sits. Invented, like everything else on the page. */
  url: 'https://example.invalid/recompose/combatden-tokenized',
  /** What it is, in one line, for the button's second row. */
  note: 'the tokenized fork every design branches from',
});

/** Where the read API answers. Loopback, hardcoded: see the note above. */
const READ_API = 'http://127.0.0.1:8001';

/** The pipeline app every run below belongs to. */
const APP = 'combatden';

/**
 * The logo a run resolved, straight off the read API.
 *
 * `GET /apps/{app}/{run}/images/{slot}` streams the PNG — the same endpoint
 * the live gallery uses mid-run, so this page adds no new surface.
 */
export function logoUrl(run: string): string {
  return `${READ_API}/apps/${APP}/${encodeURIComponent(run)}/images/logo_primary`;
}

/**
 * What is happening to a customer app right now.
 *
 * The order is the LIFECYCLE order — a design travels down this list — and the
 * filter bar renders in the same order, so the bar reads as a pipeline rather
 * than as an alphabetised set of tags. `help` sits last because it is where a
 * design falls OUT of the pipeline, not a stage inside it.
 */
export type FleetStatus =
  | 'synced'
  | 'deploying'
  | 'merging'
  | 'productionalizing'
  | 'help';

export interface StatusMeta {
  readonly id: FleetStatus;
  readonly label: string;
  /** The hue token stem: `--st-<tone>`, and the CSS-module class name. */
  readonly tone: string;
  /** Something is moving — the dot pulses and the card lifts. */
  readonly live: boolean;
}

/**
 * Five statuses, five hues, and each hue is used for nothing else.
 *
 * Three of them mean *an agent is working*, and they are still given separate
 * hues rather than one shared "busy" colour, because WHICH stage a design sits
 * in is the only question this page exists to answer from across a room. One
 * busy colour would collapse three answers into one.
 */
export const STATUSES: readonly StatusMeta[] = Object.freeze([
  { id: 'synced', label: 'Deployed & Synced', tone: 'ok', live: false },
  { id: 'deploying', label: 'Deploying', tone: 'ship', live: true },
  { id: 'merging', label: 'Merging', tone: 'merge', live: true },
  { id: 'productionalizing', label: 'Productionalizing', tone: 'run', live: true },
  { id: 'help', label: 'Needs Human Help', tone: 'you', live: false },
]);

const BY_ID = new Map(STATUSES.map((s) => [s.id, s]));

/** The metadata for a status. Total by construction — every id has an entry. */
export function statusMeta(id: FleetStatus): StatusMeta {
  const meta = BY_ID.get(id);
  if (meta === undefined) throw new Error(`unknown fleet status: ${id}`);
  return meta;
}

/** One customer app on the fleet page. */
export interface FleetApp {
  readonly name: string;
  /**
   * The design's BRANCH in the shared fork — not a repository.
   *
   * One fork, re-derived against the platform's main; one branch per design on
   * top of it. Naming a repo per customer described an arrangement that does
   * not exist and quietly implied a repository per tenant.
   */
  readonly branch: string;
  /** A run that really exists in `apps/combatden/` — its logo is drawn. */
  readonly run: string;
  readonly since: string;
  readonly status: FleetStatus;
  readonly state: string;
  readonly note: string;
  /** The agent's own last line, set in mono. */
  readonly log: string;
}

export const FLEET: readonly FleetApp[] = Object.freeze([
  // ── Deployed & Synced ────────────────────────────────────────────────────
  {
    name: 'Apex MMA',
    branch: 'design/apex',
    run: 'ApexMMA',
    since: 'started 26 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'uat and main are level with our fork of CombatDen. Nothing to do.',
    log: 'last re-derived 2h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Zen BJJ',
    branch: 'design/zenbjj',
    run: 'ZenBJJ',
    since: 'started 24 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Live for eleven days. No drift since the last trunk re-derive.',
    log: 'last re-derived 5h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Stillwater Pilates',
    branch: 'design/stillwater',
    run: 'MatPilates',
    since: 'started 29 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'The first design this account shipped. Untouched since.',
    log: 'last re-derived 2h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Iyengar House',
    branch: 'design/iyengar',
    run: 'IyengarStudio',
    since: 'started 19 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Carried two trunk releases without a single manual fix.',
    log: 'last re-derived 9h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Sweet Science',
    branch: 'design/sweetscience',
    run: 'SweetScienceBoxing',
    since: 'started 17 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'A second design is queued for the autumn; this one stays until then.',
    log: 'last re-derived 2h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Hyrox Prep Co.',
    branch: 'design/hyrox',
    run: 'HyroxPrep',
    since: 'started 15 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Seasonal palette; it swaps back in October on its own.',
    log: 'last re-derived 6h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Vinyasa Rooms',
    branch: 'design/vinyasa',
    run: 'VinyasaFlow',
    since: 'started 12 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Runs the base arrangement — only the assets were redesigned.',
    log: 'last re-derived 2h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Kettlebell Club',
    branch: 'design/kettlebell',
    run: 'Kettlebell',
    since: 'started 09 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Smallest tenant on the platform. Same pipeline, same cost.',
    log: 'last re-derived 11h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Ashtanga Shala',
    branch: 'design/ashtanga',
    run: 'AshtangaShala',
    since: 'started 06 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Nobody has ever had to look at this one.',
    log: 'last re-derived 4h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Pole Studio 9',
    branch: 'design/pole9',
    run: 'PoleDance',
    since: 'started 03 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Longest-lived design on the fleet at twenty-six days.',
    log: 'last re-derived 7h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Breathwork Room',
    branch: 'design/breathwork',
    run: 'Breathwork',
    since: 'started 01 Jul',
    status: 'synced',
    state: 'Nothing to do',
    note: 'The quietest design generated so far; the operator asked for exactly that.',
    log: 'last re-derived 3h ago against combatden@8f3c1ad · clean',
  },
  {
    name: 'Aqua Cycling',
    branch: 'design/aquacycling',
    run: 'AquaCycling',
    since: 'started 28 Jun',
    status: 'synced',
    state: 'Nothing to do',
    note: 'Four trunk releases carried. Nobody has looked at it since June.',
    log: 'last re-derived 8h ago against combatden@8f3c1ad · clean',
  },

  // ── Deploying ────────────────────────────────────────────────────────────
  {
    name: 'Ironline',
    branch: 'design/ironline',
    run: 'Powerlifting',
    since: 'started 21 Jul',
    status: 'deploying',
    state: 'Shipping to production',
    note:
      'It passed its own checks nine minutes ago and went straight out. ' +
      'Nothing has changed since — deploying moves the artifact that was ' +
      'built, it does not build a new one.',
    log: 'uploading bundle 3 of 4 · ios + android · 9m elapsed, typically 20m',
  },
  {
    name: 'Sprint Cycle Lab',
    branch: 'design/sprintcycle',
    run: 'SprintCycling',
    since: 'started 28 Jul',
    status: 'deploying',
    state: 'Shipping to production',
    note: 'First release for this tenant. Store review is the long pole, not us.',
    log: 'submitted for review · android live, ios pending · 41m elapsed',
  },
  {
    name: 'Krav Maga School',
    branch: 'design/kravmaga',
    run: 'KravMagaSchool',
    since: 'started 30 Jul',
    status: 'deploying',
    state: 'Shipping to production',
    note: 'Rolling to 10% first — every release on this account is staged.',
    log: 'staged rollout 10% · 2h elapsed · no crash reports',
  },
  {
    name: 'Trampoline Cardio',
    branch: 'design/trampoline',
    run: 'TrampolineCardio',
    since: 'started 30 Jul',
    status: 'deploying',
    state: 'Shipping to production',
    note: 'Assets deploy ahead of the binary, so the theme is already live.',
    log: 'assets published · binary queued · 4m elapsed',
  },
  {
    name: 'Hatha Studio',
    branch: 'design/hatha',
    run: 'HathaStudio',
    since: 'started 29 Jul',
    status: 'deploying',
    state: 'Shipping to production',
    note: 'Second deploy this week; the first rolled itself back on a crash spike.',
    log: 'uploading bundle 1 of 4 · ios + android · 2m elapsed',
  },

  // ── Merging ──────────────────────────────────────────────────────────────
  {
    name: 'Strike Kickboxing',
    branch: 'design/strike',
    run: 'StrikeKickboxing',
    since: 'started 23 Jul',
    status: 'merging',
    state: 'An agent is pulling your latest UAT branch',
    note:
      'CombatDen shipped a waitlist. Re-applying this design on top of it ' +
      'so the fork never drifts.',
    log: 'rebasing on combatden/uat@d41c907 · 3 of 11 screens · 12m elapsed',
  },
  {
    name: 'CrossFit Box 44',
    branch: 'design/box44',
    run: 'CrossFitBox',
    since: 'started 20 Jul',
    status: 'merging',
    state: 'An agent is pulling your latest UAT branch',
    note: 'Trunk renamed two route files. The design fork follows the rename.',
    log: 'rebasing on combatden/uat@d41c907 · 8 of 11 screens · 27m elapsed',
  },
  {
    name: 'Reformer Classical',
    branch: 'design/reformer',
    run: 'ReformerClassical',
    since: 'started 18 Jul',
    status: 'merging',
    state: 'An agent is pulling your latest UAT branch',
    note:
      'A new booking field appeared upstream. Placing it, not redesigning ' +
      'around it — placement is arrangement, and that is allowed.',
    log: 'rebasing on combatden/uat@d41c907 · 2 of 11 screens · 5m elapsed',
  },
  {
    name: 'Aerial Silks Co.',
    branch: 'design/aerialsilks',
    run: 'AerialSilks',
    since: 'started 14 Jul',
    status: 'merging',
    state: 'An agent is pulling your latest UAT branch',
    note: 'Clean so far. Most re-derives are; this is the boring case working.',
    log: 'rebasing on combatden/uat@d41c907 · 10 of 11 screens · 33m elapsed',
  },
  {
    name: 'Barre Three Flow',
    branch: 'design/barre3',
    run: 'Barre3Flow',
    since: 'started 11 Jul',
    status: 'merging',
    state: 'An agent is pulling your latest UAT branch',
    note: 'Second attempt — the first hit a conflict and backed itself out.',
    log: 'rebasing on combatden/uat@d41c907 · 1 of 11 screens · 2m elapsed',
  },
  {
    name: 'Indoor Cycling Co.',
    branch: 'design/indoorcycling',
    run: 'IndoorCycling',
    since: 'started 08 Jul',
    status: 'merging',
    state: 'An agent is pulling your latest UAT branch',
    note: 'Catching up on three trunk releases at once after a quiet fortnight.',
    log: 'rebasing on combatden/uat@d41c907 · 6 of 11 screens · 19m elapsed',
  },

  // ── Productionalizing ────────────────────────────────────────────────────
  {
    name: 'Burn Boot Camp',
    branch: 'design/burn',
    run: 'BurnBootCamp',
    since: 'started 27 Jul',
    status: 'productionalizing',
    state: 'An agent is productionalizing this design',
    note:
      'Turning the generated mock into real Flutter, carrying the ' +
      'arrangement-only invariant. Slow by design — it is the pass whose ' +
      'output ships.',
    log: 'rewriting class_screen.dart · 9 of 14 files · 34m elapsed, typically 1–2h',
  },
  {
    name: 'Karate Dojo North',
    branch: 'design/karatenorth',
    run: 'KarateDojo',
    since: 'started 29 Jul',
    status: 'productionalizing',
    state: 'An agent is productionalizing this design',
    note: 'The API surface is diffed after every file. Identical so far.',
    log: 'rewriting booking_sheet.dart · 4 of 14 files · 51m elapsed',
  },
  {
    name: 'Megaformer Lagree',
    branch: 'design/megaformer',
    run: 'MegaformerLagree',
    since: 'started 30 Jul',
    status: 'productionalizing',
    state: 'An agent is productionalizing this design',
    note: 'Densest arrangement generated this month. Expect the slow end of the range.',
    log: 'rewriting schedule_grid.dart · 2 of 14 files · 1h 18m elapsed',
  },
  {
    name: 'Rowing Studio',
    branch: 'design/rowing',
    run: 'RowingStudio',
    since: 'started 30 Jul',
    status: 'productionalizing',
    state: 'An agent is productionalizing this design',
    note: 'Nearly through. The screenshot comparison runs once the last file lands, and it ships itself if it passes.',
    log: 'rewriting profile_screen.dart · 13 of 14 files · 1h 47m elapsed',
  },
  {
    name: 'Tactical Prep',
    branch: 'design/tactical',
    run: 'TacticalPrep',
    since: 'started 30 Jul',
    status: 'productionalizing',
    state: 'An agent is productionalizing this design',
    note: 'Just started — the design landed four minutes ago.',
    log: 'reading the generated mock · 0 of 14 files · 4m elapsed',
  },
  {
    name: 'Yin Restorative',
    branch: 'design/yin',
    run: 'YinRestorative',
    since: 'started 30 Jul',
    status: 'productionalizing',
    state: 'An agent is productionalizing this design',
    note: 'Third design on this account. The other two are live.',
    log: 'rewriting home_screen.dart · 6 of 14 files · 1h 02m elapsed',
  },

  // ── Needs Human Help ─────────────────────────────────────────────────────
  {
    name: 'Orange Theory Indie',
    branch: 'design/otindie',
    run: 'OrangeTheoryStyle',
    since: 'started 25 Jul',
    status: 'help',
    state: 'An agent stopped and is asking for a decision',
    note:
      'Trunk split the class screen into two. Splitting a screen is not an ' +
      'arrangement change, so the agent refused to guess and stopped. This ' +
      'is the invariant working, not a failure.',
    log: 'halted at combatden/uat@d41c907 · waiting 3h 12m · nothing deployed',
  },
  {
    name: 'Hot Pilates 24',
    branch: 'design/hotpilates',
    run: 'HotPilates',
    since: 'started 22 Jul',
    status: 'help',
    state: 'A screenshot check failed twice',
    note:
      'The productionalized build does not match the design it was built ' +
      'from on the booking sheet. It retried once, then stopped rather than ' +
      'ship a difference it could not account for.',
    log: 'halted after 2 attempts · waiting 51m · nothing deployed',
  },
  {
    name: 'Duck Dancer',
    branch: 'design/duckdancer',
    run: 'DuckDancer',
    since: 'started 30 Jul',
    status: 'help',
    state: 'Contrast fell below AA on two surfaces',
    note:
      'The operator pinned both brand colours by hand, and the pair cannot ' +
      'meet AA together. One of them has to move, and which one is theirs ' +
      'to choose.',
    log: 'halted before deploy · waiting 22m · nothing deployed',
  },
]);

export interface Kpi {
  readonly n: number;
  readonly label: string;
  readonly tone: string | null;
}

const count = (status: FleetStatus): number =>
  FLEET.filter((app) => app.status === status).length;

/** The statuses that mean something is moving right now. */
const WORKING: readonly FleetStatus[] = STATUSES.filter((s) => s.live).map((s) => s.id);

/**
 * The four counts across the top.
 *
 * **A zero stays neutral.** "Needing you" turns amber the moment it is not
 * zero, and colour APPEARING is the signal — a permanently amber zero would be
 * noise, and the page would stop being scannable from across a room.
 */
export const KPIS: readonly Kpi[] = Object.freeze([
  { n: FLEET.length, label: 'customer apps', tone: null },
  {
    n: FLEET.filter((app) => WORKING.includes(app.status)).length,
    label: 'agents working',
    tone: 'run',
  },
  { n: count('synced'), label: 'in sync', tone: 'ok' },
  { n: count('help'), label: 'needing you', tone: 'you' },
]);

/**
 * The filter bar: All first and selected by default, then the five statuses in
 * lifecycle order.
 *
 * A count rides on every tab, so the bar is a summary as well as a control —
 * which is what lets it replace the four KPI tiles' job of saying how many are
 * where, rather than repeating it.
 */
export interface FilterTab {
  readonly id: FleetStatus | 'all';
  readonly label: string;
  readonly tone: string | null;
  readonly n: number;
}

export const FILTERS: readonly FilterTab[] = Object.freeze([
  { id: 'all' as const, label: 'All', tone: null, n: FLEET.length },
  ...STATUSES.map((s) => ({
    id: s.id,
    label: s.label,
    tone: s.tone,
    n: count(s.id),
  })),
]);

/** What the onboarding agent claims to have found. Synthetic. */
export const ONBOARD_FOUND: readonly { readonly n: string; readonly label: string }[] =
  Object.freeze([
    { n: '6', label: 'screens' },
    { n: '5', label: 'post-class cards' },
    { n: '41', label: 'colour literals' },
    { n: '18', label: 'asset references' },
  ]);
