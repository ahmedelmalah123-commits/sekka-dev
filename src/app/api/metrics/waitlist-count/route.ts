import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

/**
 * Server-side waitlist demand counter (reads via service role, never exposes PII).
 */
export async function GET() {
  try {
    const supabase = createSupabaseServiceClient();
    const { count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        { error: { code: "DB_ERROR", message: "تعذر جلب العدد" } },
        { status: 500 },
      );
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json(
      { error: { code: "CONFIG_ERROR", message: "إعدادات قاعدة البيانات غير مكتملة" } },
      { status: 500 },
    );
  }
}
