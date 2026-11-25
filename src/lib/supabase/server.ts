import { createClient } from "@supabase/supabase-js";

/**
 * Creates a server-only Supabase client with the service role key.
 * NEVER import this module in Client Components or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createSupabaseServiceClient() {
  if (typeof window !== "undefined") {
    throw new Error("createSupabaseServiceClient must only be called on the server");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Creates an anonymous Supabase client (respects RLS) for verification and public-safe reads.
 */
export function createSupabaseAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
