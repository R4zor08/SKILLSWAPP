import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.js';
import { ROLES } from '../utils/constants.js';
import { generateToken } from '../utils/generateToken.js';
import { AppError } from '../middleware/errorMiddleware.js';
import { stripPassword, withPublicId } from '../utils/dbMappers.js';

export const authService = {
  async register({ name, email, password }) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      throw new AppError('Email already registered', 400);
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: ROLES.USER,
      },
    });
    const token = generateToken({ id: user.id });
    return { user: withPublicId(stripPassword(user)), token };
  },

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError('Invalid email or password', 401);
    }
    const token = generateToken({ id: user.id });
    return { user: withPublicId(stripPassword(user)), token };
  },

  async getMe(userId) {
    const user = await prisma.user.findUnique({ where: { id: String(userId) } });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return withPublicId(stripPassword(user));
  },
};
