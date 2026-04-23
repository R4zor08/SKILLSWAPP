import { matchService } from '../services/matchService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const getMatches = asyncHandler(async (req, res) => {
  const data = await matchService.getMatchesForUser(req.user._id, { limit: req.query.limit });
  return successResponse(res, { message: 'Match suggestions', data });
});
