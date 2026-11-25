import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contactSchema, toContactRecord } from "@/lib/validation/contact";
import { verifyTurnstile } from "@/server/security/turnstile";
import { checkRateLimit } from "@/server/security/rate-limit";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function errorResponse(code: string, message: string, status: number) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse("INVALID_JSON", "طلب غير صالح", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError =
      parsed.error.issues[0]?.message ?? "بيانات غير صالحة";
    return errorResponse("VALIDATION_ERROR", firstError, 422);
  }

  const data = parsed.data;

  let turnstileOk: boolean;
  try {
    turnstileOk = await verifyTurnstile(data.turnstile_token);
  } catch {
    return errorResponse("TURNSTILE_MISCONFIGURED", "خطأ في إعداد التحقق.", 500);
  }
  if (!turnstileOk) {
    return errorResponse("TURNSTILE_FAILED", "التحقق من البشر فشل", 400);
  }

  const ip = getClientIp(req);
  const rl = await checkRateLimit(ip, "contact");
  if (!rl.success) {
    return NextResponse.json(
      {
        error: {
          code: "RATE_LIMITED",
          message: `كثير جدًا من المحاولات. جرّب بعد ${rl.retryAfter ?? 60} ثانية.`,
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter ?? 60) },
      },
    );
  }

  const supabase = createSupabaseServiceClient();
  const record = toContactRecord(data);

  const { error: dbError } = await supabase
    .from("contact_messages")
    .insert(record);

  if (dbError) {
    console.error("[/api/contact] DB error:", dbError.message);
    return errorResponse(
      "DB_ERROR",
      "حصلت مشكلة من عندنا. جرّب تاني بعد شوية.",
      500,
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
