import { progressService } from '../services/progressService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const createProgress = asyncHandler(async (req, res) => {
  const progress = await progressService.addProgress(req.user._id, req.body);
  return successResponse(res, { message: 'Progress added', data: { progress }, statusCode: 201 });
});

export const listProgress = asyncHandler(async (req, res) => {
  const progress = await progressService.listProgressForSwap(req.params.swapId, req.user._id);
  return successResponse(res, { message: 'Progress timeline', data: { progress } });
});
