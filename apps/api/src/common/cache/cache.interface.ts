import type { CacheOptions } from "./cache.types";

export interface CacheProvider {
  get<T>(key: string): Promise<T | undefined>;

  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;

  delete(key: string): Promise<void>;

  clear(): Promise<void>;
}
