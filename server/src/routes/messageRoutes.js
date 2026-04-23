import { Router } from 'express';
import * as messageController from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { sendMessageRules, swapIdMessagesParamRules } from '../requests/messageRequest.js';

const router = Router();

router.post('/', authMiddleware, sendMessageRules, validateRequest, messageController.sendMessage);
router.get('/:swapId', authMiddleware, swapIdMessagesParamRules, validateRequest, messageController.getMessages);

export default router;
