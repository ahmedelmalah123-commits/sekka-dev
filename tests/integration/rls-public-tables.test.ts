import "dotenv/config";
import crypto from "node:crypto";
import dotenv from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

dotenv.config({ path: ".env.local", override: false });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isCi = process.env.CI === "true";

const hasSupabaseEnv = Boolean(
  supabaseUrl &&
    anonKey &&
    serviceKey &&
    !supabaseUrl.includes("example.supabase.co")
);

if (isCi && !hasSupabaseEnv) {
  throw new Error(
    "RLS tests require NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in CI."
  );
}

const describeRls = hasSupabaseEnv ? describe : describe.skip;

describeRls("Public leads & contact_messages RLS (zero public policies)", () => {
  let serviceClient: SupabaseClient;
  let anonClient: SupabaseClient;
  let authClient: SupabaseClient;
  let testUserId: string | null = null;
  let seededLeadId: string | null = null;
  let seededContactId: string | null = null;

  beforeAll(async () => {
    serviceClient = createClient(supabaseUrl!, serviceKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    anonClient = createClient(supabaseUrl!, anonKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    authClient = createClient(supabaseUrl!, anonKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const uniqueSuffix = crypto.randomUUID().slice(0, 8);
    const testEmail = `rls-check-${uniqueSuffix}@example.com`;
    const testPassword = `SecRet!${uniqueSuffix}Aa1`;

    const { data: createdUser, error: userErr } =
      await serviceClient.auth.admin.createUser({
        email: testEmail,
        password: testPassword,
        email_confirm: true,
      });
    if (userErr || !createdUser.user) {
      throw new Error(`Failed creating auth test user: ${userErr?.message}`);
    }
    testUserId = createdUser.user.id;

    const { error: signInErr } = await authClient.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });
    if (signInErr) {
      throw new Error(`Failed signing in auth test user: ${signInErr.message}`);
    }

    const { data: leadRow, error: leadErr } = await serviceClient
      .from("leads")
      .insert({
        email: `seed-lead-${uniqueSuffix}@example.com`,
        name: "Seed Lead",
        segment: "freelancer",
        consent_at: new Date().toISOString(),
      })
      .select("id")
      .single();
    if (leadErr || !leadRow) {
      throw new Error(`Failed seeding lead row: ${leadErr?.message}`);
    }
    seededLeadId = leadRow.id;

    const { data: contactRow, error: contactErr } = await serviceClient
      .from("contact_messages")
      .insert({
        name: "Seed Contact",
        email: `seed-contact-${uniqueSuffix}@example.com`,
        subject: "Test",
        message: "Hello",
        consent_at: new Date().toISOString(),
      })
      .select("id")
      .single();
    if (contactErr || !contactRow) {
      throw new Error(`Failed seeding contact row: ${contactErr?.message}`);
    }
    seededContactId = contactRow.id;
  });

  afterAll(async () => {
    if (seededLeadId) {
      await serviceClient.from("leads").delete().eq("id", seededLeadId);
    }
    if (seededContactId) {
      await serviceClient
        .from("contact_messages")
        .delete()
        .eq("id", seededContactId);
    }
    if (testUserId) {
      await serviceClient.auth.admin.deleteUser(testUserId);
    }
  });

  it("blocks anon from SELECT, INSERT, UPDATE, and DELETE on leads", async () => {
    const selectRes = await anonClient.from("leads").select("*");
    expect(selectRes.data ?? []).toHaveLength(0);

    const insertRes = await anonClient.from("leads").insert({
      email: "anon-attempt@example.com",
      name: "Anon",
      segment: "student",
      consent_at: new Date().toISOString(),
    });
    expect(insertRes.error).not.toBeNull();

    const updateRes = await anonClient
      .from("leads")
      .update({ name: "Hacked" })
      .eq("id", seededLeadId!);
    expect(updateRes.data ?? []).toHaveLength(0);

    const deleteRes = await anonClient
      .from("leads")
      .delete()
      .eq("id", seededLeadId!);
    expect(deleteRes.data ?? []).toHaveLength(0);

    const verifySeed = await serviceClient
      .from("leads")
      .select("name")
      .eq("id", seededLeadId!)
      .single();
    expect(verifySeed.data?.name).toBe("Seed Lead");
  });

  it("blocks authenticated users from SELECT, INSERT, UPDATE, and DELETE on leads", async () => {
    const selectRes = await authClient.from("leads").select("*");
    expect(selectRes.data ?? []).toHaveLength(0);

    const insertRes = await authClient.from("leads").insert({
      email: "auth-attempt@example.com",
      name: "Auth User",
      segment: "student",
      consent_at: new Date().toISOString(),
    });
    expect(insertRes.error).not.toBeNull();

    const updateRes = await authClient
      .from("leads")
      .update({ name: "Hacked" })
      .eq("id", seededLeadId!);
    expect(updateRes.data ?? []).toHaveLength(0);

    const deleteRes = await authClient
      .from("leads")
      .delete()
      .eq("id", seededLeadId!);
    expect(deleteRes.data ?? []).toHaveLength(0);
  });

  it("blocks anon and authenticated from SELECT, INSERT, UPDATE, and DELETE on contact_messages", async () => {
    for (const [roleName, client] of [
      ["anon", anonClient],
      ["authenticated", authClient],
    ] as const) {
      const selectRes = await client.from("contact_messages").select("*");
      expect(selectRes.data ?? [], `${roleName} select`).toHaveLength(0);

      const insertRes = await client.from("contact_messages").insert({
        name: "Attempt",
        email: `${roleName}@example.com`,
        subject: "Subj",
        message: "Msg",
        consent_at: new Date().toISOString(),
      });
      expect(insertRes.error, `${roleName} insert`).not.toBeNull();

      const updateRes = await client
        .from("contact_messages")
        .update({ subject: "Modified" })
        .eq("id", seededContactId!);
      expect(updateRes.data ?? [], `${roleName} update`).toHaveLength(0);

      const deleteRes = await client
        .from("contact_messages")
        .delete()
        .eq("id", seededContactId!);
      expect(deleteRes.data ?? [], `${roleName} delete`).toHaveLength(0);
    }
  });
});
