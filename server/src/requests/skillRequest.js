import { body, param } from 'express-validator';
import { SKILL_TYPES } from '../utils/constants.js';

export const createSkillRules = [
  body('skillName').trim().notEmpty().withMessage('Skill name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').optional().isString(),
  body('type').isIn(Object.values(SKILL_TYPES)).withMessage('Type must be offered or wanted'),
  body('level').optional().trim().notEmpty(),
  body('tags').optional().isArray(),
];

export const updateSkillRules = [
  param('id').isString().notEmpty().withMessage('Invalid skill id'),
  body('skillName').optional().trim().notEmpty(),
  body('category').optional().trim().notEmpty(),
  body('description').optional().isString(),
  body('type').optional().isIn(Object.values(SKILL_TYPES)),
  body('level').optional().trim(),
  body('tags').optional().isArray(),
];

export const skillIdParamRules = [param('id').isString().notEmpty().withMessage('Invalid skill id')];
