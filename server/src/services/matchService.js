import { prisma } from '../config/prisma.js';
import { SKILL_TYPES } from '../utils/constants.js';
import { withPublicId } from '../utils/dbMappers.js';

function normalize(s) {
  return (s || '').trim().toLowerCase();
}

export const matchService = {
  /**
   * Suggest users where there is complementary interest:
   * - They offer something I want (by skill name similarity)
   * - I offer something they want
   */
  async getMatchesForUser(userId, { limit = 20 } = {}) {
    const uid = String(userId);
    const [myOffered, myWanted] = await Promise.all([
      prisma.skill.findMany({ where: { userId: uid, type: SKILL_TYPES.OFFERED } }),
      prisma.skill.findMany({ where: { userId: uid, type: SKILL_TYPES.WANTED } }),
    ]);

    const myOfferedNames = new Set(myOffered.map((s) => normalize(s.skillName)));
    const myWantedNames = new Set(myWanted.map((s) => normalize(s.skillName)));

    if (myOfferedNames.size === 0 || myWantedNames.size === 0) {
      return {
        message: 'Add both offered and wanted skills to get match suggestions.',
        matches: [],
      };
    }

    const others = await prisma.user.findMany({
      where: { id: { not: uid } },
      select: {
        id: true,
        name: true,
        avatar: true,
        location: true,
        bio: true,
        averageRating: true,
        reviewsCount: true,
      },
      take: 200,
    });

    const results = [];

    for (const other of others) {
      const [theirOffered, theirWanted] = await Promise.all([
        prisma.skill.findMany({ where: { userId: other.id, type: SKILL_TYPES.OFFERED } }),
        prisma.skill.findMany({ where: { userId: other.id, type: SKILL_TYPES.WANTED } }),
      ]);

      const theyOffer = new Set(theirOffered.map((s) => normalize(s.skillName)));
      const theyWant = new Set(theirWanted.map((s) => normalize(s.skillName)));

      const iWantTheyOffer = [...myWantedNames].filter((n) => theyOffer.has(n));
      const theyWantIOffer = [...theyWant].filter((n) => myOfferedNames.has(n));

      if (iWantTheyOffer.length && theyWantIOffer.length) {
        results.push({
          user: other,
          score: iWantTheyOffer.length + theyWantIOffer.length,
          youLearnFromThem: iWantTheyOffer,
          theyLearnFromYou: theyWantIOffer,
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return { matches: withPublicId(results.slice(0, limit)) };
  },
};
