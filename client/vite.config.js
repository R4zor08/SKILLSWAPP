import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiPort = env.VITE_API_PORT || '5000';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      // Allow external ngrok hostname when tunneling Vite dev server.
      allowedHosts: ['.ngrok-free.dev', 'localhost', '127.0.0.1'],
      proxy: {
        '/api': {
          // Use IPv4 explicitly — on Windows, "localhost" can resolve to ::1 while the
          // proxy handshake fails with ECONNRESET; 127.0.0.1 matches the typical dev server bind.
          // Must match PORT in server/.env (override with VITE_API_PORT in .env.local).
          target: `http://127.0.0.1:${apiPort}`,
          changeOrigin: true,
          timeout: 60000,
          proxyTimeout: 60000,
        },
      },
    },
  };
});
