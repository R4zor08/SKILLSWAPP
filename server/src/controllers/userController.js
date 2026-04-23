import { userService } from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const getUser = asyncHandler(async (req, res) => {
  const data = await userService.getProfileById(req.params.id);
  return successResponse(res, { message: 'User profile', data });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user._id, req.body);
  return successResponse(res, { message: 'Profile updated', data: { user } });
});
