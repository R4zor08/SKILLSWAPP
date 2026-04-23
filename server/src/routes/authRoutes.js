import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { registerRules, loginRules } from '../requests/authRequest.js';

const router = Router();

router.post('/register', registerRules, validateRequest, authController.register);
router.post('/login', loginRules, validateRequest, authController.login);
router.get('/me', authMiddleware, authController.me);

export default router;
