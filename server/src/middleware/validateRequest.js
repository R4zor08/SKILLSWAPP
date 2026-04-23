import { validationResult } from 'express-validator';
import { AppError } from './errorMiddleware.js';

export function validateRequest(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((e) => ({
      field: e.path || e.param,
      message: e.msg,
      value: e.value,
    }));
    return next(new AppError('Validation failed', 422, errors));
  }
  next();
}
