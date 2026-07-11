import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Dedicated port to avoid clashing with other local apps / PWA service workers.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      // Used only by the interactive 3D experience (src/experience/**).
      '@': fileURLToPath(new URL('./src/experience', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        interactive: fileURLToPath(new URL('./interactive/index.html', import.meta.url))
      }
    }
  },
  server: { port: 5210, strictPort: true },
  preview: { port: 5210, strictPort: true }
});
