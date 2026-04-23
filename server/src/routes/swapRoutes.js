import { Router } from 'express';
import * as swapController from '../controllers/swapController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createSwapRules, swapIdParamRules } from '../requests/swapRequest.js';

const router = Router();

router.post('/', authMiddleware, createSwapRules, validateRequest, swapController.createSwap);
router.get('/', authMiddleware, swapController.listSwaps);
router.get('/:id', authMiddleware, swapIdParamRules, validateRequest, swapController.getSwap);

router.patch('/:id/accept', authMiddleware, swapIdParamRules, validateRequest, swapController.acceptSwap);
router.patch('/:id/reject', authMiddleware, swapIdParamRules, validateRequest, swapController.rejectSwap);
router.patch('/:id/cancel', authMiddleware, swapIdParamRules, validateRequest, swapController.cancelSwap);
router.patch('/:id/complete', authMiddleware, swapIdParamRules, validateRequest, swapController.completeSwap);

export default router;
