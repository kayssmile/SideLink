import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    reporters: ['default', 'verbose'],
    environment: 'jsdom',
    setupFiles: './testing/setupTests.js',
  },
});
