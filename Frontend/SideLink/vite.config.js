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
  plugins: [react(), basicSsl()],
  test: {
    globals: true,
    reporters: ['default', 'verbose'],
    environment: 'jsdom',
    setupFiles: './testing/setupTests.js',
  },
});
