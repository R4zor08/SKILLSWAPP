import { messageService } from '../services/messageService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const message = await messageService.sendMessage(req.user._id, req.body);
  return successResponse(res, { message: 'Message sent', data: { message }, statusCode: 201 });
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await messageService.getMessagesForSwap(req.params.swapId, req.user._id);
  return successResponse(res, { message: 'Messages', data: { messages } });
});
