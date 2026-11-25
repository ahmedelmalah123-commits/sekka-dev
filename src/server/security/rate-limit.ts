/**
 * Upstash Redis sliding-window rate limiter.
 * NO in-memory fallback — fails loudly if Redis is not configured.
 * This is intentional per the project decision (W1 decision D-008).
 */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let _ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit {
  if (_ratelimit) return _ratelimit;

  const url = process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["UPSTASH_REDIS_REST_TOKEN"];

  if (!url || !token) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required. " +
        "No in-memory fallback is intentional (see docs/decisions.md D-008).",
    );
  }

  const redis = new Redis({ url, token });

  _ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: false,
    prefix: "sekka:rl",
  });

  return _ratelimit;
}

/**
 * Check the rate limit for a given identifier (IP address recommended).
 * @throws if Redis is not configured
 * @returns `{ success: true }` if allowed, `{ success: false, retryAfter }` if limited
 */
export async function checkRateLimit(
  identifier: string,
  action: "leads" | "contact",
): Promise<{ success: boolean; retryAfter?: number }> {
  const rl = getRatelimit();
  const key = `${action}:${identifier}`;
  const result = await rl.limit(key);

  if (result.success) {
    return { success: true };
  }

  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);
  return { success: false, retryAfter: Math.max(retryAfter, 1) };
}
