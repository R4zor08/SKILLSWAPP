import { prisma } from '../config/prisma.js';
import { SWAP_STATUS } from '../utils/constants.js';
import { AppError } from '../middleware/errorMiddleware.js';
import { withPublicId } from '../utils/dbMappers.js';

export const reviewService = {
  async createReview(reviewerId, { swapId, revieweeId, rating, comment }) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) {
      throw new AppError('Swap not found', 404);
    }
    if (swap.status !== SWAP_STATUS.COMPLETED) {
      throw new AppError('Reviews are only allowed after the swap is completed', 400);
    }

    const participants = [swap.senderId, swap.receiverId];
    if (!participants.includes(String(reviewerId)) || !participants.includes(String(revieweeId))) {
      throw new AppError('Review must be between swap participants', 403);
    }
    if (String(reviewerId) === String(revieweeId)) {
      throw new AppError('Cannot review yourself', 400);
    }

    try {
      const review = await prisma.review.create({
        data: {
          swapId: String(swapId),
          reviewerId: String(reviewerId),
          revieweeId: String(revieweeId),
          rating,
          comment: comment || '',
        },
        include: {
          reviewer: { select: { id: true, name: true, avatar: true } },
        },
      });

      await this._recalculateUserRating(String(revieweeId));

      return withPublicId({ ...review, reviewerId: review.reviewer });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new AppError('You already reviewed this swap', 400);
      }
      throw e;
    }
  },

  async _recalculateUserRating(userId) {
    const stats = await prisma.review.aggregate({
      where: { revieweeId: String(userId) },
      _avg: { rating: true },
      _count: { rating: true },
    });
    await prisma.user.update({
      where: { id: String(userId) },
      data: {
        averageRating: Math.round(((stats._avg.rating ?? 0) * 10)) / 10,
        reviewsCount: stats._count.rating ?? 0,
      },
    });
  },

  async listReviewsForUser(userId) {
    const reviews = await prisma.review.findMany({
      where: { revieweeId: String(userId) },
      orderBy: { createdAt: 'desc' },
      include: {
        reviewer: { select: { id: true, name: true, avatar: true } },
        swap: true,
      },
    });
    return reviews.map((r) => withPublicId({ ...r, reviewerId: r.reviewer, swapId: r.swap }));
  },
};
