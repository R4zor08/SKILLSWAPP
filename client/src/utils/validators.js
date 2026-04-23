export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRequired(value) {
  return value !== undefined && value !== null && String(value).trim().length > 0;
}
