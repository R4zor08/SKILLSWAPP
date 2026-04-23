import { body, param } from 'express-validator';

export const sendMessageRules = [
  body('swapId').isString().notEmpty().withMessage('Valid swap id is required'),
  body('receiverId').isString().notEmpty().withMessage('Valid receiver id is required'),
  body('content').trim().notEmpty().withMessage('Message content is required'),
];

export const swapIdMessagesParamRules = [param('swapId').isString().notEmpty().withMessage('Invalid swap id')];
