import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network interfaces (0.0.0.0) for LAN access
    port: 5173,
    open: false,
    cors: true
  },
  preview: {
    host: true,
    port: 4173
  }
});
