import { Router } from 'express';
import * as progressController from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createProgressRules, progressSwapParamRules } from '../requests/progressRequest.js';

const router = Router();

router.post('/', authMiddleware, createProgressRules, validateRequest, progressController.createProgress);
router.get('/:swapId', authMiddleware, progressSwapParamRules, validateRequest, progressController.listProgress);

export default router;
