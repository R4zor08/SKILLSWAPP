import { prisma } from '../config/prisma.js';
import { SWAP_STATUS } from '../utils/constants.js';
import { AppError } from '../middleware/errorMiddleware.js';
import { parseJsonArrayString, withPublicId } from '../utils/dbMappers.js';

function mapSkill(skill) {
  return skill ? { ...skill, tags: parseJsonArrayString(skill.tags) } : skill;
}

async function loadSwap(swapId) {
  const swap = await prisma.swapRequest.findUnique({
    where: { id: String(swapId) },
    include: {
      sender: { select: { id: true, name: true, email: true, avatar: true } },
      receiver: { select: { id: true, name: true, email: true, avatar: true } },
      offeredSkill: true,
      requestedSkill: true,
    },
  });
  if (!swap) {
    throw new AppError('Swap request not found', 404);
  }
  return withPublicId({
    ...swap,
    senderId: swap.sender,
    receiverId: swap.receiver,
    offeredSkillId: mapSkill(swap.offeredSkill),
    requestedSkillId: mapSkill(swap.requestedSkill),
  });
}

export const swapService = {
  async createSwap(senderId, payload) {
    const { receiverId, offeredSkillId, requestedSkillId, message } = payload;
    if (String(receiverId) === String(senderId)) {
      throw new AppError('Cannot swap with yourself', 400);
    }

    const [offered, requested] = await Promise.all([
      prisma.skill.findUnique({ where: { id: String(offeredSkillId) } }),
      prisma.skill.findUnique({ where: { id: String(requestedSkillId) } }),
    ]);

    if (!offered || !requested) {
      throw new AppError('One or both skills not found', 404);
    }
    if (offered.userId !== String(senderId)) {
      throw new AppError('Offered skill must belong to you', 403);
    }
    if (requested.userId !== String(receiverId)) {
      throw new AppError('Requested skill must belong to the receiver', 400);
    }

    const swap = await prisma.swapRequest.create({
      data: {
        senderId: String(senderId),
        receiverId: String(receiverId),
        offeredSkillId: String(offeredSkillId),
        requestedSkillId: String(requestedSkillId),
        message: message || '',
        status: SWAP_STATUS.PENDING,
      },
    });

    return loadSwap(swap.id);
  },

  async listSwapsForUser(userId, { role } = {}) {
    const where = {};
    if (role === 'incoming') {
      where.receiverId = String(userId);
    } else if (role === 'outgoing') {
      where.senderId = String(userId);
    } else {
      where.OR = [{ senderId: String(userId) }, { receiverId: String(userId) }];
    }

    const swaps = await prisma.swapRequest.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } },
        offeredSkill: true,
        requestedSkill: true,
      },
    });
    return swaps.map((swap) => withPublicId({
      ...swap,
      senderId: swap.sender,
      receiverId: swap.receiver,
      offeredSkillId: mapSkill(swap.offeredSkill),
      requestedSkillId: mapSkill(swap.requestedSkill),
    }));
  },

  async getSwapById(swapId, userId) {
    const swap = await loadSwap(swapId);
    const isParticipant =
      swap.senderId._id === String(userId) || swap.receiverId._id === String(userId);
    if (!isParticipant) {
      throw new AppError('Forbidden', 403);
    }
    return swap;
  },

  async acceptSwap(swapId, userId) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) throw new AppError('Swap request not found', 404);
    if (swap.receiverId !== String(userId)) {
      throw new AppError('Only the receiver can accept', 403);
    }
    if (swap.status !== SWAP_STATUS.PENDING) {
      throw new AppError('Swap is not pending', 400);
    }
    const updated = await prisma.swapRequest.update({
      where: { id: String(swapId) },
      data: { status: SWAP_STATUS.ACCEPTED },
    });
    return loadSwap(updated.id);
  },

  async rejectSwap(swapId, userId) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) throw new AppError('Swap request not found', 404);
    if (swap.receiverId !== String(userId)) {
      throw new AppError('Only the receiver can reject', 403);
    }
    if (swap.status !== SWAP_STATUS.PENDING) {
      throw new AppError('Swap is not pending', 400);
    }
    const updated = await prisma.swapRequest.update({
      where: { id: String(swapId) },
      data: { status: SWAP_STATUS.REJECTED },
    });
    return loadSwap(updated.id);
  },

  async cancelSwap(swapId, userId) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) throw new AppError('Swap request not found', 404);
    if (swap.senderId !== String(userId)) {
      throw new AppError('Only the sender can cancel', 403);
    }
    if (swap.status !== SWAP_STATUS.PENDING) {
      throw new AppError('Only pending swaps can be cancelled', 400);
    }
    const updated = await prisma.swapRequest.update({
      where: { id: String(swapId) },
      data: { status: SWAP_STATUS.CANCELLED },
    });
    return loadSwap(updated.id);
  },

  async completeSwap(swapId, userId) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) throw new AppError('Swap request not found', 404);
    const isParticipant =
      swap.senderId === String(userId) || swap.receiverId === String(userId);
    if (!isParticipant) {
      throw new AppError('Forbidden', 403);
    }
    if (swap.status !== SWAP_STATUS.ACCEPTED) {
      throw new AppError('Swap must be accepted before completion', 400);
    }
    const updated = await prisma.swapRequest.update({
      where: { id: String(swapId) },
      data: { status: SWAP_STATUS.COMPLETED },
    });
    return loadSwap(updated.id);
  },
};
