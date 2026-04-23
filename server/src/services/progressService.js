import { prisma } from '../config/prisma.js';
import { SWAP_STATUS } from '../utils/constants.js';
import { AppError } from '../middleware/errorMiddleware.js';
import { withPublicId } from '../utils/dbMappers.js';

function assertParticipant(swap, userId) {
  const ok =
    swap.senderId.toString() === userId.toString() || swap.receiverId.toString() === userId.toString();
  if (!ok) throw new AppError('Forbidden', 403);
}

export const progressService = {
  async addProgress(userId, { swapId, title, notes, completionStatus }) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) {
      throw new AppError('Swap not found', 404);
    }
    assertParticipant(swap, userId);
    if (swap.status !== SWAP_STATUS.ACCEPTED && swap.status !== SWAP_STATUS.COMPLETED) {
      throw new AppError('Progress updates require an accepted or completed swap', 400);
    }

    const entry = await prisma.progress.create({
      data: {
      swapId: String(swapId),
      title,
      notes: notes || '',
      completionStatus: completionStatus || 'in_progress',
        updatedById: String(userId),
      },
      include: {
        updatedBy: { select: { id: true, name: true, avatar: true } },
      },
    });
    return withPublicId({ ...entry, updatedBy: entry.updatedBy });
  },

  async listProgressForSwap(swapId, userId) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) {
      throw new AppError('Swap not found', 404);
    }
    assertParticipant(swap, userId);

    const items = await prisma.progress.findMany({
      where: { swapId: String(swapId) },
      orderBy: { createdAt: 'desc' },
      include: {
        updatedBy: { select: { id: true, name: true, avatar: true } },
      },
    });
    return withPublicId(items);
  },
};
