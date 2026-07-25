import type { CacheOptions } from "./cache.types";

import type { CacheProvider } from "./cache.interface";

import { MemoryCache } from "./memory-cache";

export class CacheService {
  constructor(private readonly cache: CacheProvider = new MemoryCache()) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get<T>(key);
  }

  async set<T>(key: string, value: T, options?: CacheOptions): Promise<void> {
    await this.cache.set(key, value, options);
  }

  async delete(key: string): Promise<void> {
    await this.cache.delete(key);
  }

  async clear(): Promise<void> {
    await this.cache.clear();
  }

  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    options?: CacheOptions,
  ): Promise<T> {
    const cached = await this.get<T>(key);

    if (cached !== undefined) {
      return cached;
    }

    const value = await factory();

    await this.set(key, value, options);

    return value;
  }

  async deleteRuntime(conversationId: string): Promise<void> {
    await this.delete(`runtime:${conversationId}`);
  }
}
