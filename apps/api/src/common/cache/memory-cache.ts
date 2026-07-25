import type { CacheEntry, CacheOptions } from "./cache.types";

import type { CacheProvider } from "./cache.interface";

import { cacheConfig } from "./cache.config";

export class MemoryCache implements CacheProvider {
  private readonly cache = new Map<string, CacheEntry<unknown>>();

  constructor() {
    setInterval(() => {
      this.cleanup();
    }, cacheConfig.cleanupIntervalMs);
  }

  async get<T>(key: string): Promise<T | undefined> {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    if (entry.expiresAt <= Date.now()) {
      this.cache.delete(key);

      return undefined;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, options?: CacheOptions): Promise<void> {
    const ttl = options?.ttlMs ?? cacheConfig.defaultTtlMs;

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();

    for (const [key, entry] of this.cache) {
      if (entry.expiresAt <= now) {
        this.cache.delete(key);
      }
    }
  }
}
