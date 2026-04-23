import { prisma } from '../config/prisma.js';
import { AppError } from '../middleware/errorMiddleware.js';
import { parseJsonArrayString, stripPassword, withPublicId } from '../utils/dbMappers.js';

export const userService = {
  async getProfileById(userId) {
    const user = await prisma.user.findUnique({ where: { id: String(userId) } });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const skillsRaw = await prisma.skill.findMany({
      where: { userId: String(userId) },
      orderBy: { updatedAt: 'desc' },
    });
    const skills = skillsRaw.map((s) => withPublicId({ ...s, tags: parseJsonArrayString(s.tags) }));
    return { user: withPublicId(stripPassword(user)), skills };
  },

  async updateProfile(userId, data) {
    const allowed = ['name', 'bio', 'location', 'avatar'];
    const update = {};
    for (const key of allowed) {
      if (data[key] !== undefined) update[key] = data[key];
    }
    const existing = await prisma.user.findUnique({ where: { id: String(userId) } });
    if (!existing) {
      throw new AppError('User not found', 404);
    }
    const user = await prisma.user.update({
      where: { id: String(userId) },
      data: update,
    });
    return withPublicId(stripPassword(user));
  },
};
