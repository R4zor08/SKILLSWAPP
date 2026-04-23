import { Router } from 'express';
import * as skillController from '../controllers/skillController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  createSkillRules,
  updateSkillRules,
  skillIdParamRules,
} from '../requests/skillRequest.js';

const router = Router();

router.get('/', skillController.listSkills);
router.get('/:id', skillIdParamRules, validateRequest, skillController.getSkill);

router.post('/', authMiddleware, createSkillRules, validateRequest, skillController.createSkill);
router.put('/:id', authMiddleware, updateSkillRules, validateRequest, skillController.updateSkill);
router.delete('/:id', authMiddleware, skillIdParamRules, validateRequest, skillController.deleteSkill);

export default router;
