import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      '@tests': resolve(__dirname, 'tests/unit_integration'),
    },
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['react'],
  },
  test: {
    globals: true,
    reporters: ['default', 'verbose'],
    environment: 'jsdom',
    setupFiles: './tests/unit_integration/setupTests.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
