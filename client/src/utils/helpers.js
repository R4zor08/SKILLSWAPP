export function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function getErrorMessage(err) {
  if (!err) return 'Something went wrong';
  if (typeof err === 'string') return err;
  const apiMsg = err.response?.data?.message;
  if (apiMsg) return apiMsg;
  if (Array.isArray(err.errors) && err.errors.length) {
    return err.errors.map((e) => e.message || e.msg || String(e)).join(' ');
  }
  return err.message || 'Something went wrong';
}
