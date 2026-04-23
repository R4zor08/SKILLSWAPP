import { authService } from '../services/authService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return successResponse(res, {
    message: 'Registered successfully',
    data: result,
    statusCode: 201,
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return successResponse(res, { message: 'Logged in successfully', data: result });
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user._id);
  return successResponse(res, { message: 'Current user', data: { user } });
});
