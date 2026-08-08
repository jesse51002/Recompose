import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// These screens are consumed as SOURCE by ../Studio and by the design
// agent, so the package still ships no build of its own. What this config does
// serve is `npm run dev` — the thin harness in ./dev, which exists because a
// library you cannot look at is a library you cannot design in.
//
// PORT 8081, not 8080. The studio pins 8080 with `strictPort` because the API's
// CORS allowlist names it; running both at once is the normal case when
// comparing the harness against the real host, so they must not collide.
export default defineConfig({
  plugins: [react()],
  server: { port: 8081, strictPort: true },
  resolve: {
    alias: {
      'recompose-react': fileURLToPath(new URL('../React/src/index.ts', import.meta.url)),
    },
  },
});
