/**
 * Cloudflare Turnstile server-side verification.
 * Uses the official test secret on Preview (VERCEL_ENV != production).
 * Throws if TURNSTILE_SECRET_KEY is not set.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env["TURNSTILE_SECRET_KEY"];
  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured");
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

/**
 * Returns the Turnstile site key to pass to the client.
 * Preview envs use the official Cloudflare test key.
 */
export function getTurnstileSiteKey(): string {
  const key = process.env["TURNSTILE_SITE_KEY"];
  if (!key) {
    // Official Cloudflare test key — always passes
    return "1x00000000000000000000AA";
  }
  return key;
}
