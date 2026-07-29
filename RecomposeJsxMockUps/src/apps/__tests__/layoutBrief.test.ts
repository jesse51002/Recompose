// Every REGISTERED app ships a `layout_brief.yaml`.
//
// That is the whole job of this test, and it is the one question the engine
// cannot ask. The real validation of the file's shape lives on the Python
// side — `ThemeTree/studio/schema/layout_brief.py` (`LayoutBrief`), checked by
// `test_every_layout_brief_validates` — because that is where a YAML parser
// and the schema already are, and `extra="forbid"` there rejects a typo'd key
// instead of ignoring it.
//
// But the engine can only see FILES. It globs `src/apps/*/layout_brief.yaml`
// and validates what it finds, so an app registered in `MOCK_APPS` with no
// brief at all is invisible to it: nothing to glob, nothing to fail. Only the
// TypeScript knows which apps are registered.
//
// Hence the split. Over there: "every file that exists is valid." Here: "every
// app that exists has a file."

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { MOCK_APPS } from '../index';

const APPS_DIR = dirname(fileURLToPath(import.meta.url)).replace(/\/__tests__$/, '');

/** The top-level keys `LayoutBrief` requires. Mirrored, not parsed. */
const REQUIRED_KEYS = ['name', 'layout_direction', 'motion_direction'] as const;

describe.each(MOCK_APPS.map((app) => [app.id] as const))(
  'layout_brief.yaml for %s',
  (appId) => {
    const read = () => readFileSync(join(APPS_DIR, appId, 'layout_brief.yaml'), 'utf-8');

    it('exists', () => {
      expect(read).not.toThrow();
    });

    it.each(REQUIRED_KEYS)('declares %s', (key) => {
      // Anchored to the start of a line: these are top-level keys, and an
      // unanchored search is satisfied by the word appearing anywhere in the
      // prose the file is mostly made of.
      expect(
        new RegExp(`^${key}:`, 'm').test(read()),
        `layout_brief.yaml has no top-level "${key}:"`,
      ).toBe(true);
    });
  },
);
