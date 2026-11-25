import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const patchSchema = z.object({
  email: z.string().email(),
});

export async function PATCH(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "طلب غير صالح" } },
      { status: 400 },
    );
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "البريد الإلكتروني مطلوب" } },
      { status: 422 },
    );
  }

  const { email } = parsed.data;
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase
    .from("leads")
    .update({ interview_opt_in: true })
    .eq("email", email);

  if (error) {
    console.error("[/api/leads/interview] DB error:", error.message);
    return NextResponse.json(
      { error: { code: "DB_ERROR", message: "حصلت مشكلة من عندنا." } },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
