import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig({
  ...(typeof viteConfig === 'object' ? viteConfig : {}),
  test: { environment: 'jsdom', globals: true, include: ['src/**/__tests__/**/*.{test,spec}.{ts,tsx}'] },
});
