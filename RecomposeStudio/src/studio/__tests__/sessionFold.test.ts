// The fold has the branching, so it has the tests. The property that matters:
// rendering is a pure function of the record list, because the stream replays
// from zero on every connect and a tab that joins late must see what a tab that
// watched from the start sees.

import { describe, expect, it } from 'vitest';

import type { SessionRecord } from '../sessionApi';
import {
  appendSessionRecord,
  foldSession,
  goneSessionRecords,
} from '../sessionFold';

let next = 0;
const reset = () => {
  next = 0;
};
const rec = (r: Omit<SessionRecord, 'index' | 'at'>): SessionRecord => ({
  ...r,
  index: next++,
  at: '2026-07-29T00:00:00Z',
});

const OPENED = () => rec({ kind: 'opened', session_id: 's', app_id: 'combatden' });
const ASK = (q: string) =>
  rec({ kind: 'asked', question: { question: q, options: ['A', 'B'], multi_select: false } });
const SAID = (who: 'agent' | 'you', text: string) => rec({ kind: 'said', who, text });

const BRIEF = {
  design_direction: { name: 'Stillwater', short_desc: 's', long_desc: 'l' },
  colors_direction: { description: 'warm sand', mode: 'light' as const },
};

describe('foldSession', () => {
  it('reports only the LAST unanswered question as pending', () => {
    reset();
    const view = foldSession([OPENED(), ASK('one'), SAID('you', 'A'), ASK('two')]);

    // Two questions in the transcript, one live chip row. Without this, a long
    // interview would show every question it ever asked as still open.
    expect(view.entries.filter((e) => e.kind === 'asked')).toHaveLength(2);
    expect(view.pending?.question).toBe('two');
  });

  it('clears the pending question once the owner answers', () => {
    reset();
    const view = foldSession([OPENED(), ASK('one'), SAID('you', 'A')]);

    // The records never say "answered" — answering IS the next `said`.
    expect(view.pending).toBeNull();
    expect(view.entries.find((e) => e.kind === 'asked')).toMatchObject({
      answered: true,
    });
  });

  it('surfaces a proposal until it is accepted', () => {
    reset();
    const open = foldSession([OPENED(), rec({ kind: 'proposed', brief: BRIEF })]);
    expect(open.proposal).toEqual(BRIEF);
    // The name comes from the brief, not from a form in front of the page.
    expect(open.designName).toBe(BRIEF.design_direction.name);

    // TALKING BACK DOES NOT ACCEPT IT. This is the regression that shipped:
    // a proposal stops being the OPEN one as soon as the owner says anything
    // — that is how a question knows it was answered — and the fold read
    // "no longer open" as "accepted". So typing a note marked the brief
    // accepted and took its Accept button away, and the run then started off
    // a brief nobody had approved.
    reset();
    const talkedBack = foldSession([
      OPENED(),
      rec({ kind: 'proposed', brief: BRIEF }),
      SAID('you', 'Can you make it warmer?'),
    ]);
    expect(talkedBack.proposal).toEqual(BRIEF);
    expect(talkedBack.entries.find((e) => e.kind === 'brief')).toMatchObject({
      accepted: false,
      awaiting: true,
    });

    // Only the record written when the button is pressed accepts it.
    reset();
    const accepted = foldSession([
      OPENED(),
      rec({ kind: 'proposed', brief: BRIEF }),
      rec({ kind: 'accepted' }),
      SAID('you', 'Accepted the brand brief.'),
    ]);
    expect(accepted.proposal).toBeNull();
    expect(accepted.entries.find((e) => e.kind === 'brief')).toMatchObject({
      accepted: true,
    });
  });

  it('offers Accept on the newest brief only', () => {
    // A brief the agent replaced is neither accepted nor waiting on anything.
    // Two live Accept buttons would mean two answers and the second would
    // silently overwrite the first — the same failure the ask rule prevents.
    reset();
    const second = { ...BRIEF, design_direction: { ...BRIEF.design_direction, name: 'Second' } };
    const view = foldSession([
      OPENED(),
      rec({ kind: 'proposed', brief: BRIEF }),
      SAID('you', 'Try again'),
      rec({ kind: 'proposed', brief: second }),
    ]);
    const briefs = view.entries.filter((e) => e.kind === 'brief');
    expect(briefs).toHaveLength(2);
    expect(briefs.filter((b) => b.kind === 'brief' && b.awaiting)).toHaveLength(1);
    expect(view.proposal).toEqual(second);
  });

  it('never leaves a question and a proposal both awaiting an answer', () => {
    // A system note (a run settling) starts a turn without the owner having
    // said anything, so an ask left open before it would still be live
    // underneath whatever came after — chips and an Accept button both
    // wanting a reply, and the second answer silently overwriting the first.
    reset();
    const view = foldSession([
      OPENED(),
      ASK('which palette?'),
      rec({ kind: 'proposed', brief: BRIEF }),
    ]);

    expect(view.pending).toBeNull();
    expect(view.proposal).toEqual(BRIEF);

    // And the other way round: a question closes an open proposal.
    reset();
    const back = foldSession([
      OPENED(),
      rec({ kind: 'proposed', brief: BRIEF }),
      ASK('one more thing'),
    ]);

    expect(back.proposal).toBeNull();
    expect(back.pending?.question).toBe('one more thing');
  });

  it('marks which option an answered question was answered with', () => {
    // An answered row used to dim as a whole, so a finished interview
    // scrolled back as identical grey rows with no trace of what had been
    // decided — every question kept, every answer lost.
    reset();
    const view = foldSession([
      OPENED(),
      ASK('which palette?'),
      SAID('you', 'B'),
      ASK('which voice?'),
    ]);

    const asked = view.entries.filter((e) => e.kind === 'asked');
    expect(asked[0]).toMatchObject({ answered: true, picked: 'B' });
    // The live one has nothing picked yet.
    expect(asked[1]).toMatchObject({ answered: false, picked: null });
  });

  it('does not attribute a typed answer that matches no option', () => {
    // A chip press posts the option's own text, so the records cannot tell a
    // pick from typing. Matching is the only honest test — and something that
    // matches nothing was not a pick.
    reset();
    const view = foldSession([
      OPENED(),
      ASK('which palette?'),
      SAID('you', 'something else entirely'),
      ASK('next'),
    ]);

    expect(view.entries.filter((e) => e.kind === 'asked')[0]).toMatchObject({
      answered: true,
      picked: null,
    });
  });

  it('knows whether a layout agent is running, so Stop can be offered', () => {
    // The agent is the most expensive thing the page starts and closing the
    // tab does not stop it — but an offer to stop something that is not
    // running is worse than no offer at all.
    reset();
    const running = foldSession([
      OPENED(),
      rec({ kind: 'task', task: 'layout', task_state: 'started', design_id: 'gen-x' }),
    ]);
    expect(running.layoutRunning).toBe(true);

    reset();
    const done = foldSession([
      OPENED(),
      rec({ kind: 'task', task: 'layout', task_state: 'started', design_id: 'gen-x' }),
      rec({ kind: 'task', task: 'layout', task_state: 'finished', design_id: 'gen-x' }),
    ]);
    expect(done.layoutRunning).toBe(false);

    // An asset run in flight is not a layout agent.
    reset();
    const assets = foldSession([
      OPENED(),
      rec({ kind: 'task', task: 'assets', task_state: 'started', run_id: 'r1' }),
    ]);
    expect(assets.layoutRunning).toBe(false);
  });

  it('totals what the design has cost, split by which half spent it', () => {
    // Summed from records rather than held as a total, so a tab that joins in
    // the fortieth minute reports the same number as one that watched from
    // the start. Money is also the one thing that cannot be re-derived later:
    // nothing on disk remembers the token counts once the process is gone.
    reset();
    const view = foldSession([
      OPENED(),
      rec({ kind: 'spent', spent_on: 'agent', cost_usd: 0.01 }),
      rec({ kind: 'spent', spent_on: 'agent', cost_usd: 0.02 }),
      rec({ kind: 'spent', spent_on: 'assets', cost_usd: 1.5 }),
    ]);

    expect(view.agentCostUsd).toBeCloseTo(0.03);
    expect(view.assetsCostUsd).toBeCloseTo(1.5);
    // Money is a running total, not a moment in the conversation — a spend
    // record must never become a line in the transcript.
    expect(view.entries).toHaveLength(0);
  });

  it('carries the run id and design id forward for the panes to attach to', () => {
    reset();
    const view = foldSession([
      OPENED(),
      rec({ kind: 'task', task: 'assets', task_state: 'started', run_id: 'r1' }),
      rec({ kind: 'task', task: 'layout', task_state: 'finished', design_id: 'gen-x' }),
    ]);

    // These are why per-node progress does not flow through the session: the
    // browser attaches the RUN stream to this id instead.
    expect(view.runId).toBe('r1');
    expect(view.designId).toBe('gen-x');
  });

  it('tracks the phase as the last one declared', () => {
    reset();
    const view = foldSession([
      OPENED(),
      rec({ kind: 'phase', phase: 'brief' }),
      SAID('agent', 'hello'),
      rec({ kind: 'phase', phase: 'generating' }),
    ]);
    expect(view.phase).toBe('generating');
  });

  it('leaves nothing open on a settled session', () => {
    reset();
    const view = foldSession([
      OPENED(),
      ASK('one'),
      rec({ kind: 'proposed', brief: BRIEF }),
      rec({ kind: 'settled' }),
    ]);

    // A session that ended cannot be waiting on anything, whatever the last
    // records happened to be.
    expect(view.settled).toBe(true);
    expect(view.pending).toBeNull();
    expect(view.proposal).toBeNull();
  });
});

describe('appendSessionRecord', () => {
  it('drops a replayed duplicate', () => {
    reset();
    const current = [OPENED()];
    expect(appendSessionRecord(current, current[0]!)).toBe(current);
  });

  it('extends by one', () => {
    reset();
    const current = [OPENED()];
    const added = SAID('agent', 'hi');
    expect(appendSessionRecord(current, added)).toEqual([...current, added]);
  });

  it('returns null on a gap rather than appending a hole', () => {
    reset();
    const current = [OPENED()];
    const far = { ...SAID('agent', 'hi'), index: 9 };
    // The list cannot repair itself; the caller resyncs from the snapshot.
    expect(appendSessionRecord(current, far)).toBeNull();
  });
});

describe('goneSessionRecords', () => {
  it('adds a terminal record so a client stops waiting', () => {
    reset();
    const gone = goneSessionRecords([OPENED()]);
    expect(gone[gone.length - 1]!.kind).toBe('settled');
  });

  it('leaves an already-settled list alone', () => {
    reset();
    const settled = [OPENED(), rec({ kind: 'settled' })];
    expect(goneSessionRecords(settled)).toBe(settled);
  });
});
