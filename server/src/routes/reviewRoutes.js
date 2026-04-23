import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createReviewRules, userReviewsParamRules } from '../requests/reviewRequest.js';

const router = Router();

router.post('/', authMiddleware, createReviewRules, validateRequest, reviewController.createReview);
router.get('/user/:id', userReviewsParamRules, validateRequest, reviewController.listUserReviews);

export default router;
