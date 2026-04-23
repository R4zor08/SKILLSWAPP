import { Router } from 'express';
import * as matchController from '../controllers/matchController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, matchController.getMatches);

export default router;
