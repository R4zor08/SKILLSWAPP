export function toJsonArrayString(value) {
  if (Array.isArray(value)) return JSON.stringify(value.filter((v) => typeof v === 'string'));
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return JSON.stringify(parsed.filter((v) => typeof v === 'string'));
      return JSON.stringify([]);
    } catch {
      return JSON.stringify(
        value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      );
    }
  }
  return JSON.stringify([]);
}

export function parseJsonArrayString(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function stripPassword(user) {
  if (!user) return user;
  const { password: _password, ...rest } = user;
  return rest;
}

export function withPublicId(value) {
  if (Array.isArray(value)) return value.map((item) => withPublicId(item));
  if (!value || typeof value !== 'object') return value;

  const out = {};
  for (const [key, val] of Object.entries(value)) {
    if (key === 'id') {
      out._id = val;
    } else {
      out[key] = withPublicId(val);
    }
  }
  return out;
}

