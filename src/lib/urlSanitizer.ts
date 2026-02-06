const ALLOWED_PROTOCOLS = new Set(["https:", "mailto:", "tel:"]);

export const sanitizeUrl = (url: string): string | null => {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
};
