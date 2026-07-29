// Every app folder must ship a `mockup.yaml`, and it must agree with the code.
//
// WHY THIS IS A TEST AND NOT A CONVENTION. The file is the LAYOUT half of a
// design's provenance — the mockup's counterpart to a run's
// `customization.yaml`. A provenance file that is merely encouraged gets
// written for the first app and forgotten for the third, and a missing one is
// invisible: everything builds, everything renders, and the record is just
// absent. So the presence check is the point, and the drift check is what
// stops the file rotting into a lie once it exists.
//
// IT IS A PRESENCE-AND-AGREEMENT CHECK, NOT A PARSE. There is no YAML parser
// in this package and adding one for a single test is a dependency this
// package does not need — so the assertions are "the code's own values appear
// in the file", which is exactly the drift that matters. Rename a route in
// `defineMockAsset` and forget the yaml and this fails; reformat the yaml
// without changing a value and it does not.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { MOCK_APPS } from '../index';

const APPS_DIR = dirname(fileURLToPath(import.meta.url)).replace(/\/__tests__$/, '');

/** The sections a mockup.yaml must declare, whatever the app. */
const REQUIRED_SECTIONS = ['id:', 'label:', 'design:', 'spec:', 'assets:', 'invariants:'];

function mockupYaml(appId: string): string {
  return readFileSync(join(APPS_DIR, appId, 'mockup.yaml'), 'utf-8');
}

/**
 * Whether `yaml` carries `line` as a WHOLE line, ignoring indentation.
 *
 * `toContain` is wrong for every check in this file and quietly so: `- menuu`
 * contains `- menu`, so a mistyped route passed the drift check that exists to
 * catch exactly that. Caught by deliberately corrupting a route and watching
 * the suite stay green — which is the only way to find out whether a gate
 * fires.
 */
function hasLine(yaml: string, line: string): boolean {
  return yaml.split('\n').some((candidate) => candidate.trim() === line);
}

describe.each(MOCK_APPS.map((app) => [app.id, app] as const))(
  'mockup.yaml for %s',
  (appId, app) => {
    it('exists and declares every required section', () => {
      const yaml = mockupYaml(appId);
      for (const section of REQUIRED_SECTIONS) {
        // Anchored at the start of a line: a section is a top-level key, and
        // an unanchored search would be satisfied by the word appearing inside
        // any prose line in the file.
        expect(
          new RegExp(`^${section}`, 'm').test(yaml),
          `mockup.yaml is missing the "${section}" section`,
        ).toBe(true);
      }
    });

    it('names the same app the code registers', () => {
      const yaml = mockupYaml(appId);
      expect(hasLine(yaml, `id: ${app.id}`), 'app id differs').toBe(true);
      expect(hasLine(yaml, `label: ${app.label}`), 'app label differs').toBe(true);
    });

    it('names the design this layout belongs to', () => {
      // `run_id` may be empty — a ported or authored layout belongs to no run —
      // but the KEY has to be there, because "which design is this" is the
      // question the file exists to answer and an absent field reads as an
      // oversight rather than as "none".
      expect(mockupYaml(appId)).toMatch(/design:\s*\n\s*name:.+\n(\s*#.*\n)*\s*run_id:/);
    });

    it.each(app.assets.map((asset) => [asset.id, asset] as const))(
      'matches the declared asset %s',
      (assetId, asset) => {
        const yaml = mockupYaml(appId);
        expect(hasLine(yaml, `- id: ${assetId}`), 'asset id missing').toBe(true);
        expect(
          hasLine(yaml, `width: ${String(asset.width)}`),
          'authored width differs',
        ).toBe(true);
        expect(
          hasLine(yaml, `height: ${String(asset.height)}`),
          'authored height differs',
        ).toBe(true);
        expect(
          hasLine(yaml, `initial_route: ${asset.initialRoute}`),
          'initial route differs',
        ).toBe(true);
        for (const route of Object.keys(asset.routes)) {
          expect(hasLine(yaml, `- ${route}`), `route "${route}" is not listed`).toBe(true);
        }
      },
    );

    it('lists no asset the code does not declare', () => {
      // The other direction. Without it a deleted asset lingers in the record
      // and the file describes a mockup that no longer exists.
      const listed = [...mockupYaml(appId).matchAll(/^ {2}- id: (\S+)/gm)].map((m) => m[1]);
      expect([...listed].sort()).toEqual([...app.assets.map((a) => a.id)].sort());
    });
  },
);
