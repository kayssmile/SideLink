import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  //plugins: [react()],
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true, // (optional, vermeidet, dass er einen anderen Port wählt)
  },
  test: {
    globals: true,
    reporters: ['default', 'verbose'],
    environment: 'jsdom',
    setupFiles: './testing/unit_integration/setupTests.js',
  },
});
