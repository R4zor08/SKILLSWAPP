import { env } from '../config/env.js';

export function errorMiddleware(err, req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 422;
    message = 'Validation failed';
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = err.message || 'Invalid token';
  }

  if (env.nodeEnv !== 'production' && statusCode >= 500) {
    console.error('[API]', err);
  }

  const body = {
    success: false,
    message: statusCode === 500 && env.nodeEnv === 'production' ? 'Internal Server Error' : message,
  };

  if (err.errors) {
    body.errors = err.errors;
  }

  if (env.nodeEnv !== 'production' && err.stack) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
}

export class AppError extends Error {
  constructor(message, statusCode = 400, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
