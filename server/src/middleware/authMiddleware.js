import { prisma } from '../config/prisma.js';
import { verifyToken } from '../utils/generateToken.js';
import { AppError } from './errorMiddleware.js';
import { stripPassword, withPublicId } from '../utils/dbMappers.js';

export async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new AppError('Not authorized, token missing', 401);
    }
    const token = header.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: String(decoded.id) } });
    if (!user) {
      throw new AppError('User not found', 401);
    }
    req.user = withPublicId(stripPassword(user));
    next();
  } catch (e) {
    if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
      return next(new AppError('Not authorized, invalid token', 401));
    }
    next(e);
  }
}
