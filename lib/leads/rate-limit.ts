/**
 * Fixed-window rate limiter held in memory. It's enough to stop casual form
 * abuse on a low-traffic marketing site. It is per server instance, so Phase 2
 * moves it to Postgres (or a KV store) for limits that hold across instances.
 */
type Bucket = { count: number; resetAt: number };

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>();

  return function check(key: string, now = Date.now()): { ok: boolean; retryAfterMs: number } {
    // Opportunistic cleanup keeps memory bounded.
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
    }
    const b = buckets.get(key);
    if (!b || b.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, retryAfterMs: 0 };
    }
    if (b.count >= limit) return { ok: false, retryAfterMs: b.resetAt - now };
    b.count += 1;
    return { ok: true, retryAfterMs: 0 };
  };
}
