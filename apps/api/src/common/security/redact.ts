const SENSITIVE_KEYS = new Set([
  "authorization",
  "password",
  "token",
  "secret",
  "apiKey",
  "jwt",
]);

export function redact<T extends Record<string, unknown>>(obj: T): T {
  const copy = { ...obj };

  for (const key of Object.keys(copy)) {
    if (SENSITIVE_KEYS.has(key)) {
      copy[key as keyof T] = "***REDACTED***" as T[keyof T];
    }
  }

  return copy;
}
