// Every app folder must ship a `mockup.yaml` with all three fields filled in.
//
// WHY THIS IS A TEST AND NOT A CONVENTION. The file is the LAYOUT half of a
// design's provenance — the counterpart to a run's `customization.yaml`, and
// deliberately the same three fields as that file's `design_direction`. A
// provenance file that is merely encouraged gets written for the first app and
// forgotten for the third, and a missing one is invisible: everything builds,
// everything renders, and the record is just absent.
//
// It checks presence and non-emptiness, nothing more. The file says what the
// layout IS; the code says what it contains. Asserting the two agree about
// routes or sizes would mean keeping a second copy of the inventory here,
// which is the duplication the three-field shape exists to avoid.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { MOCK_APPS } from '../index';

const APPS_DIR = dirname(fileURLToPath(import.meta.url)).replace(/\/__tests__$/, '');

const REQUIRED_FIELDS = ['name', 'short_desc', 'long_desc'] as const;

function mockupYaml(appId: string): string {
  return readFileSync(join(APPS_DIR, appId, 'mockup.yaml'), 'utf-8');
}

describe.each(MOCK_APPS.map((app) => [app.id] as const))('mockup.yaml for %s', (appId) => {
  it('exists', () => {
    expect(() => mockupYaml(appId)).not.toThrow();
  });

  it.each(REQUIRED_FIELDS)('declares a non-empty %s', (field) => {
    // Anchored at the start of a line, because these are top-level keys and an
    // unanchored search is satisfied by the word appearing anywhere in the
    // prose. The value may be inline or a `>-` block, so the assertion is that
    // SOMETHING follows the key — either on the line or indented beneath it.
    const match = new RegExp(`^${field}:(.*)$`, 'm').exec(mockupYaml(appId));
    expect(match, `mockup.yaml has no "${field}:" line`).not.toBeNull();

    const rest = (match?.[1] ?? '').trim();
    const isBlock = rest.startsWith('>') || rest.startsWith('|');
    if (isBlock) {
      const body = mockupYaml(appId)
        .slice((match?.index ?? 0) + (match?.[0].length ?? 0))
        .split('\n')
        .slice(1)
        .find((line) => line.trim() !== '');
      expect(body?.trim() ?? '', `"${field}" opens a block and never fills it`).not.toBe(
        '',
      );
    } else {
      expect(rest, `"${field}" is empty`).not.toBe('');
    }
  });
});
