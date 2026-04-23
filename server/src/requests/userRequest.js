import { body, param } from 'express-validator';

export const userIdParamRules = [param('id').isString().notEmpty().withMessage('Invalid user id')];

export const updateProfileRules = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('bio').optional().isString(),
  body('location').optional().isString(),
  body('avatar').optional().isString(),
];
