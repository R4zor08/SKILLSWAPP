import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { updateProfileRules, userIdParamRules } from '../requests/userRequest.js';

const router = Router();

router.put('/profile', authMiddleware, updateProfileRules, validateRequest, userController.updateProfile);
router.get('/:id', userIdParamRules, validateRequest, userController.getUser);

export default router;
