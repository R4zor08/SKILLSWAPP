import { body, param } from 'express-validator';

export const createReviewRules = [
  body('swapId').isString().notEmpty().withMessage('Valid swap id is required'),
  body('revieweeId').isString().notEmpty().withMessage('Valid reviewee id is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('comment').optional().isString(),
];

export const userReviewsParamRules = [param('id').isString().notEmpty().withMessage('Invalid user id')];
