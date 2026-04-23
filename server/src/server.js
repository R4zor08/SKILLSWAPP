import app from './app.js';
import { connectDb } from './config/db.js';
import { env, loadEnv } from './config/env.js';

loadEnv();

if (!process.env.DATABASE_URL?.trim()) {
  console.error('FATAL: DATABASE_URL is missing. Copy server/.env.example to server/.env and set DATABASE_URL.');
  process.exit(1);
}
const jwtSecret = process.env.JWT_SECRET?.trim();
if (!jwtSecret) {
  console.error('FATAL: JWT_SECRET is missing. Set JWT_SECRET in server/.env.');
  process.exit(1);
}
if (jwtSecret.length < 8) {
  console.error('FATAL: JWT_SECRET must be at least 8 characters (jsonwebtoken requirement).');
  process.exit(1);
}

async function start() {
  try {
    await connectDb();
    const server = app.listen(env.port, () => {
      console.log(`SkillSwap API listening on port ${env.port} (${env.nodeEnv})`);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `\nFATAL: Port ${env.port} is already in use (another SkillSwap API or app is running).\n` +
            `Fix: close that terminal, or run: netstat -ano | findstr :${env.port}\n` +
            `     then: taskkill /PID <pid> /F\n` +
            `Or set a different PORT in server/.env and match Vite proxy in client/vite.config.js\n`
        );
      } else {
        console.error('Server listen error:', err);
      }
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
