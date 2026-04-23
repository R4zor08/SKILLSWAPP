import { body, param } from 'express-validator';

const PROGRESS_STATUSES = ['in_progress', 'blocked', 'done'];

export const createProgressRules = [
  body('swapId').isString().notEmpty().withMessage('Valid swap id is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('notes').optional().isString(),
  body('completionStatus')
    .optional()
    .isIn(PROGRESS_STATUSES)
    .withMessage(`Status must be one of: ${PROGRESS_STATUSES.join(', ')}`),
];

export const progressSwapParamRules = [param('swapId').isString().notEmpty().withMessage('Invalid swap id')];
