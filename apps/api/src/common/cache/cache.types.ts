export type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

export type CacheOptions = {
  ttlMs?: number;
};
