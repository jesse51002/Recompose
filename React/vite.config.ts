import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The LIBRARY build. This package ships no screens and no bundled assets —
// it is the web mirror of ../Flutter.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'React',
      fileName: (format) => (format === 'es' ? 'recompose-react.js' : 'recompose-react.umd.js'),
      formats: ['es', 'umd'],
    },
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
    emptyOutDir: true,
  },
});
