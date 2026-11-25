import { SectionHeader } from "@/components/marketing/section-header";

const MESSAGES = [
  {
    role: "user" as const,
    text: "عندي فكرة مشروع لتطبيق توصيل أكل. أبدأ منين؟",
  },
  {
    role: "ai" as const,
    text: "كويس! قبل ما نبدأ، محتاج أفهم أكتر. إيه ميزانيتك التقريبية للبداية؟ وفي أي مدينة هتشتغل؟",
  },
  {
    role: "user" as const,
    text: "القاهرة. الميزانية حوالي 50 ألف جنيه.",
  },
  {
    role: "ai" as const,
    text: "تمام. بناءً على ده، اقترح نبدأ بـ MVP بدون تطبيق كامل — واتساب بيزنس + مطعمين أو تلاتة بس. ده بيوفر الميزانية ويثبت الطلب. عايز أشيل القرار ده في سجل المشروع؟",
  },
] as const;

export function AiCapabilitiesPreview() {
  return (
    <section className="py-20 bg-surface-muted" aria-labelledby="ai-heading">
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="ai-heading"
          label="قدرات الـ AI"
          annotation="FIG. 07"
          headingLevel="h2"
          className="mb-10 text-center"
        >
          بيسأل، بيحلل، بيقترح، بيرتّب
        </SectionHeader>

        <div
          className="mx-auto max-w-2xl rounded-sm border border-border bg-surface"
          aria-label="مثال محادثة مع سِكّة"
          role="region"
        >
          {/* Chat header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div
              className="h-2 w-2 rounded-full bg-highlight"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-text-muted">
              سِكّة · Co-founder
            </span>
            <span className="ms-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
              مثال توضيحي [مسودة]
            </span>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-4 p-4">
            {MESSAGES.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-sm px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-contrast"
                      : "border border-border bg-bg text-text"
                  }`}
                  dir="rtl"
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-text-muted">
          * المحادثة دي مثال توضيحي بنص ثابت
        </p>
      </div>
    </section>
  );
}
