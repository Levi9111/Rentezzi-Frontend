export function strengthOf(pw: string) {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

export function get<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
): T | undefined {
  return path.split('.').reduce((o: unknown, k: string) => {
    if (o && typeof o === 'object') {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj as unknown) as T | undefined;
}
