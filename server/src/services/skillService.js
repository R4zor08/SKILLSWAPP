import { prisma } from '../config/prisma.js';
import { AppError } from '../middleware/errorMiddleware.js';
import { parseJsonArrayString, toJsonArrayString, withPublicId } from '../utils/dbMappers.js';

function mapSkill(skill) {
  return withPublicId({ ...skill, tags: parseJsonArrayString(skill.tags) });
}

export const skillService = {
  async createSkill(userId, payload) {
    const skill = await prisma.skill.create({
      data: {
        userId: String(userId),
      skillName: payload.skillName,
      category: payload.category,
      description: payload.description ?? '',
      type: payload.type,
      level: payload.level || 'beginner',
        tags: toJsonArrayString(payload.tags || []),
      },
    });
    return mapSkill(skill);
  },

  async listSkills(filters = {}) {
    const where = {};
    if (filters.type) where.type = filters.type;
    if (filters.category) where.category = { contains: filters.category, mode: 'insensitive' };
    if (filters.userId) where.userId = String(filters.userId);
    if (filters.search) {
      where.OR = [
        { skillName: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { tags: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(filters.limit) || 12));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.skill.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              location: true,
              averageRating: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.skill.count({ where }),
    ]);

    const mapped = items.map((s) => {
      const { user, ...rest } = s;
      return { ...mapSkill(rest), userId: user };
    });

    return { items: mapped, total, page, limit, pages: Math.ceil(total / limit) || 1 };
  },

  async getSkillById(id) {
    const skill = await prisma.skill.findUnique({
      where: { id: String(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            bio: true,
            location: true,
            avatar: true,
            averageRating: true,
            reviewsCount: true,
          },
        },
      },
    });
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }
    const { user, ...rest } = skill;
    return { ...mapSkill(rest), userId: user };
  },

  async updateSkill(skillId, userId, payload) {
    const skill = await prisma.skill.findUnique({ where: { id: String(skillId) } });
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }
    if (skill.userId !== String(userId)) {
      throw new AppError('Forbidden: not your skill', 403);
    }
    const allowed = ['skillName', 'category', 'description', 'type', 'level', 'tags'];
    const update = {};
    for (const key of allowed) {
      if (payload[key] !== undefined) update[key] = key === 'tags' ? toJsonArrayString(payload.tags) : payload[key];
    }
    const updated = await prisma.skill.update({
      where: { id: String(skillId) },
      data: update,
    });
    return mapSkill(updated);
  },

  async deleteSkill(skillId, userId) {
    const skill = await prisma.skill.findUnique({ where: { id: String(skillId) } });
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }
    if (skill.userId !== String(userId)) {
      throw new AppError('Forbidden: not your skill', 403);
    }
    await prisma.skill.delete({ where: { id: String(skillId) } });
    return { deleted: true };
  },
};
