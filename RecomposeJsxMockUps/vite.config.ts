import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// No build target of its own — these screens are consumed as source by
// ../RecomposeStudio and, later, by the design agent. This config exists so the
// package can typecheck and run its own tests in isolation.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'recompose-react': fileURLToPath(new URL('../RecomposeReact/src/index.ts', import.meta.url)),
    },
  },
});
