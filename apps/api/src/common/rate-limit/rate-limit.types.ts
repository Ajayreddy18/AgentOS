export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitEntry {
  count: number;
  resetAt: number;
}
