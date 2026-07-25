type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export class RateLimitStore {
  private readonly store = new Map<string, RateLimitEntry>();

  get(key: string, windowMs: number): RateLimitEntry {
    const now = Date.now();

    const existing = this.store.get(key);

    if (!existing || existing.resetAt <= now) {
      const entry: RateLimitEntry = {
        count: 0,
        resetAt: now + windowMs,
      };

      this.store.set(key, entry);

      return entry;
    }

    return existing;
  }

  increment(key: string, windowMs: number): RateLimitEntry {
    const entry = this.get(key, windowMs);

    entry.count++;

    return entry;
  }

  reset(key: string): void {
    this.store.delete(key);
  }

  clearExpired(): void {
    const now = Date.now();

    for (const [key, value] of this.store) {
      if (value.resetAt <= now) {
        this.store.delete(key);
      }
    }
  }
}
