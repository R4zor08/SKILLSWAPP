import { AppError } from './errorMiddleware.js';

export function notFoundMiddleware(req, res, next) {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
}
