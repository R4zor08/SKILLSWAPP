export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function truncate(str, len = 120) {
  if (!str) return '';
  return str.length > len ? `${str.slice(0, len)}…` : str;
}
