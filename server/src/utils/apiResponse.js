export function successResponse(res, { message = 'OK', data = null, statusCode = 200 }) {
  const body = { success: true, message };
  if (data !== undefined && data !== null) body.data = data;
  return res.status(statusCode).json(body);
}

export function errorResponse(res, { message = 'Error', errors = null, statusCode = 400 }) {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
}
