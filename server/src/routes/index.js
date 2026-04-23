import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import skillRoutes from './skillRoutes.js';
import matchRoutes from './matchRoutes.js';
import swapRoutes from './swapRoutes.js';
import messageRoutes from './messageRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import progressRoutes from './progressRoutes.js';
import * as authController from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginRules, registerRules } from '../requests/authRequest.js';

const router = Router();

// Backward-compatible endpoint for clients posting directly to /api/register.
router.post('/register', registerRules, validateRequest, authController.register);
// Backward-compatible endpoint for clients posting directly to /api/login.
router.post('/login', loginRules, validateRequest, authController.login);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/skills', skillRoutes);
router.use('/matches', matchRoutes);
router.use('/swaps', swapRoutes);
router.use('/messages', messageRoutes);
router.use('/reviews', reviewRoutes);
router.use('/progress', progressRoutes);

export default router;
