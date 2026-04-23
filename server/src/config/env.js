import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Always load server/.env relative to this file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const required = ['DATABASE_URL', 'JWT_SECRET'];

export function loadEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    console.warn(`Warning: missing env vars: ${missing.join(', ')}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
