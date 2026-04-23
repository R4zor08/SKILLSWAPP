import { body, param } from 'express-validator';

export const createSwapRules = [
  body('receiverId').isString().notEmpty().withMessage('Valid receiver id is required'),
  body('offeredSkillId').isString().notEmpty().withMessage('Valid offered skill id is required'),
  body('requestedSkillId').isString().notEmpty().withMessage('Valid requested skill id is required'),
  body('message').optional().isString(),
];

export const swapIdParamRules = [param('id').isString().notEmpty().withMessage('Invalid swap id')];
