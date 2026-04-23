import { reviewService } from '../services/reviewService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

export const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(req.user._id, req.body);
  return successResponse(res, { message: 'Review submitted', data: { review }, statusCode: 201 });
});

export const listUserReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.listReviewsForUser(req.params.id);
  return successResponse(res, { message: 'Reviews', data: { reviews } });
});
