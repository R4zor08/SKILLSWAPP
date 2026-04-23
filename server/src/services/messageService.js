import { prisma } from '../config/prisma.js';
import { AppError } from '../middleware/errorMiddleware.js';
import { withPublicId } from '../utils/dbMappers.js';

function assertSwapParticipant(swap, userId) {
  const ok =
    swap.senderId.toString() === userId.toString() || swap.receiverId.toString() === userId.toString();
  if (!ok) {
    throw new AppError('Forbidden: not a participant in this swap', 403);
  }
}

export const messageService = {
  async sendMessage(senderId, { swapId, receiverId, content }) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) {
      throw new AppError('Swap not found', 404);
    }
    assertSwapParticipant(swap, senderId);

    const sid = String(senderId);
    const rid = String(receiverId);
    if (![swap.senderId, swap.receiverId].includes(sid)) {
      throw new AppError('Invalid sender for this swap', 403);
    }
    if (![swap.senderId, swap.receiverId].includes(rid)) {
      throw new AppError('Invalid receiver for this swap', 400);
    }
    if (rid === sid) {
      throw new AppError('Cannot message yourself', 400);
    }

    const message = await prisma.message.create({
      data: {
        swapId: String(swapId),
        senderId: sid,
        receiverId: rid,
        content,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
      },
    });
    return withPublicId({ ...message, senderId: message.sender });
  },

  async getMessagesForSwap(swapId, userId) {
    const swap = await prisma.swapRequest.findUnique({ where: { id: String(swapId) } });
    if (!swap) {
      throw new AppError('Swap not found', 404);
    }
    assertSwapParticipant(swap, userId);

    await prisma.message.updateMany({
      where: { swapId: String(swapId), receiverId: String(userId), isRead: false },
      data: { isRead: true },
    });

    const messages = await prisma.message.findMany({
      where: { swapId: String(swapId) },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } },
      },
    });

    return messages.map((msg) => withPublicId({
      ...msg,
      senderId: msg.sender,
      receiverId: msg.receiver,
    }));
  },
};
