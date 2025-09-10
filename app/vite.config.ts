import path from 'node:path';

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
