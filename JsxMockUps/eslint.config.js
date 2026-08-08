import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// The import gates below are not style rules — they are the enforcement for
// two architectural invariants that are otherwise invisible until something
// has already drifted. Both mirror rules the Flutter side states in prose and
// enforces with grep (see ../ThemeFlutter/CLAUDE.md, "Hard rules").
//
//  1. THE KIT IS APP-AGNOSTIC. src/kit/ must never reach into src/apps/.
//     It describes, navigates and displays an asset; it may not know what any
//     app's screens are. That is what makes a second app a new folder rather
//     than a change to the kit.
//
//  2. THE APP NEVER IMPORTS THE HOST'S CHROME. The studio's admin tokens and
//     the mock screens' ShowcaseTokens share token NAMES with different VALUES
//     — radiusBig is 12 in one and 32 in the other — so an accidental import
//     silently re-skins the phone with admin values. The studio's half of this
//     pair lives in that package; this gate is the island's own half.
export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Gate 1 — the kit stays app-agnostic.
  {
    files: ['src/kit/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/apps/**', '../apps/*', '../../apps/*'],
              message:
                'src/kit is app-agnostic. An app reaches the kit by calling defineMockAsset / defineMockApp, never the other way round — see src/index.ts and CLAUDE.md.',
            },
          ],
        },
      ],
    },
  },

  // Gate 2a — the showcase island never sees the app-chrome tokens.
  {
    files: ['src/apps/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // Both spellings of the token modules are listed on purpose: the
              // pattern is matched against the IMPORT STRING, so a rename that
              // changed only the case would silently open the gate.
              //
              // AND THAT IS WHY THESE GLOBS CANNOT BE ANCHORED. `../widgets/X`
              // is the same string whether it leaves the island or stays inside
              // it, so `**/app/widgets/**` — the obvious "fix" when a
              // showcase-internal folder named `widgets` trips this — matches
              // NEITHER, and quietly lets the showcase import the admin chrome.
              // The constraint is therefore a NAMING one: no directory under
              // `src/app/showcase/` may be called `widgets`, `chrome` or
              // `browser`, because those three names belong to the surrounding
              // app and this gate can only see the name.
              group: [
                '**/tokens/gw',
                '**/tokens/adminTokens',
                '**/tokens/admin-tokens',
                '**/chrome/**',
                '**/browser/**',
                '**/widgets/**',
              ],
              message:
                'The showcase renders the MEMBER app and resolves only ShowcaseTokens (--sc-*). GW / DesignConstants are the surrounding admin chrome and use the same token names with different values.',
            },
          ],
        },
      ],
    },
  },

);
