import { swapService } from '../services/swapService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const createSwap = asyncHandler(async (req, res) => {
  const swap = await swapService.createSwap(req.user._id, req.body);
  return successResponse(res, { message: 'Swap request created', data: { swap }, statusCode: 201 });
});

export const listSwaps = asyncHandler(async (req, res) => {
  const swaps = await swapService.listSwapsForUser(req.user._id, { role: req.query.role });
  return successResponse(res, { message: 'Swaps', data: { swaps } });
});

export const getSwap = asyncHandler(async (req, res) => {
  const swap = await swapService.getSwapById(req.params.id, req.user._id);
  return successResponse(res, { message: 'Swap detail', data: { swap } });
});

export const acceptSwap = asyncHandler(async (req, res) => {
  const swap = await swapService.acceptSwap(req.params.id, req.user._id);
  return successResponse(res, { message: 'Swap accepted', data: { swap } });
});

export const rejectSwap = asyncHandler(async (req, res) => {
  const swap = await swapService.rejectSwap(req.params.id, req.user._id);
  return successResponse(res, { message: 'Swap rejected', data: { swap } });
});

export const cancelSwap = asyncHandler(async (req, res) => {
  const swap = await swapService.cancelSwap(req.params.id, req.user._id);
  return successResponse(res, { message: 'Swap cancelled', data: { swap } });
});

export const completeSwap = asyncHandler(async (req, res) => {
  const swap = await swapService.completeSwap(req.params.id, req.user._id);
  return successResponse(res, { message: 'Swap completed', data: { swap } });
});
