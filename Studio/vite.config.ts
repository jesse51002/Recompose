import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The standalone theme browser (Library / Inspect / Studio).
//
// Siblings are aliased to SOURCE, not to built output: this is a monorepo with
// three independent installs and no workspace linking, so aliasing to source is
// what keeps hot reload working across package boundaries and makes a missing
// export fail here rather than in a stale dist/.
//
// The dev/preview port is pinned to 8080 on purpose and MUST NOT be changed
// casually — the API's CORS allowlist contains 8080 but not Vite's default 5173.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'recompose-react': fileURLToPath(new URL('../React/src/index.ts', import.meta.url)),
      'recompose-jsx-mockups': fileURLToPath(new URL('../JsxMockUps/src/index.ts', import.meta.url)),
    },
  },
  server: { port: 8080, strictPort: true },
  preview: { port: 8080, strictPort: true },
  build: { outDir: 'dist', emptyOutDir: true },
});
