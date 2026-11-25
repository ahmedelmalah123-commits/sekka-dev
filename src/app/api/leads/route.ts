import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { leadSchema, toLeadRecord } from "@/lib/validation/leads";
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
  // 1. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse("INVALID_JSON", "طلب غير صالح", 400);
  }

  // 2. Zod validation
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const firstError =
      parsed.error.issues[0]?.message ?? "بيانات غير صالحة";
    return errorResponse("VALIDATION_ERROR", firstError, 422);
  }

  const data = parsed.data;

  // 3. Turnstile
  let turnstileOk: boolean;
  try {
    turnstileOk = await verifyTurnstile(data.turnstile_token);
  } catch {
    return errorResponse(
      "TURNSTILE_MISCONFIGURED",
      "خطأ في إعداد التحقق. اتصل بنا.",
      500,
    );
  }
  if (!turnstileOk) {
    return errorResponse("TURNSTILE_FAILED", "التحقق من البشر فشل", 400);
  }

  // 4. Rate limit (by IP)
  const ip = getClientIp(req);
  const rl = await checkRateLimit(ip, "leads");
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
        headers: {
          "Retry-After": String(rl.retryAfter ?? 60),
        },
      },
    );
  }

  // 5. DB insert via service role (no anon policies)
  const supabase = createSupabaseServiceClient();
  const record = toLeadRecord(data);

  const { error: dbError } = await supabase.from("leads").insert(record);

  if (dbError) {
    // Unique email conflict — treat as success (idempotent)
    if (dbError.code === "23505") {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    console.error("[/api/leads] DB error:", dbError.message);
    return errorResponse(
      "DB_ERROR",
      "حصلت مشكلة من عندنا. جرّب تاني بعد شوية.",
      500,
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
