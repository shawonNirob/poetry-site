import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/poetry-site/',
  server: {
    host: true,
    port: 5173,
  },
});
