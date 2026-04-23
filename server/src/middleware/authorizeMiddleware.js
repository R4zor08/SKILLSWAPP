import { ROLES } from '../utils/constants.js';
import { AppError } from './errorMiddleware.js';

/**
 * Require authenticated user to have one of the given roles.
 */
export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }
    next();
  };
}

/**
 * Ensure the route param user id matches the authenticated user (unless admin).
 */
export function requireSelfOrAdmin(paramName = 'id') {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }
    const targetId = req.params[paramName];
    const isSelf = String(req.user?._id || '') === String(targetId || '');
    const isAdmin = req.user.role === ROLES.ADMIN;
    if (!isSelf && !isAdmin) {
      return next(new AppError('Forbidden: can only access own resource', 403));
    }
    next();
  };
}
