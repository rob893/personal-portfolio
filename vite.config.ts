import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dedicated port to avoid clashing with other local apps / PWA service workers.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5210, strictPort: true },
  preview: { port: 5210, strictPort: true }
});
