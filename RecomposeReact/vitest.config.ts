import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig({
  ...(typeof viteConfig === 'object' ? viteConfig : {}),
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/__tests__/**/*.{test,spec}.{ts,tsx}'],
    // `setup.ts` installs an in-memory `Storage` when the environment's is
    // unusable. It existed and was never registered here, so under Node 26 —
    // whose built-in `localStorage` getter returns `undefined` without
    // `--localstorage-file` and shadows jsdom's — every persistence test died
    // in `beforeEach` on `window.localStorage.clear()`.
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
