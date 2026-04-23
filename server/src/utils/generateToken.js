import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../middleware/errorMiddleware.js';

export function generateToken(payload) {
  const secret = env.jwtSecret && String(env.jwtSecret).trim();
  if (!secret || secret.length < 8) {
    throw new AppError('JWT_SECRET is missing or too short. Set a value of at least 8 characters in server/.env', 500);
  }
  try {
    return jwt.sign(payload, secret, {
      expiresIn: env.jwtExpiresIn,
    });
  } catch (err) {
    throw new AppError(err.message || 'Failed to sign token', 500);
  }
}

export function verifyToken(token) {
  const secret = env.jwtSecret && String(env.jwtSecret).trim();
  if (!secret) {
    throw new AppError('JWT_SECRET is not configured', 500);
  }
  return jwt.verify(token, secret);
}
