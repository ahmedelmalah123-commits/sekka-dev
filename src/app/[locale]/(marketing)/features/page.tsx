import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/section-header";
import { Badge } from "@/components/ui/badge";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";

export const metadata: Metadata = {
  title: "المميزات — سِكّة",
  description: "كل قدرات سِكّة مرتبة حسب مراحل رحلة المشروع.",
};

const MODULES = [
  {
    stage: "الفكرة والتحقق",
    status: "available",
    features: [
      "محادثة ذكية لاستخراج الفكرة وفهم السياق",
      "أسئلة موجّهة (ميزانية، مدينة، وقت، خبرة)",
      "ملف مشروع منظّم بتأكيدك",
    ],
  },
  {
    stage: "التخطيط والبحث",
    status: "available",
    features: [
      "خطة مشروع مخصصة (مراحل + مهام)",
      "سجل القرارات مع الأسباب",
      "مساحة عمل مستقلة لكل مشروع",
    ],
  },
  {
    stage: "التأسيس القانوني",
    status: "available",
    features: [
      "مقارنة الكيانات القانونية (محتوى مراجع)",
      "خطوات بشرية مفصّلة (أروح فين، آخد إيه، الرسوم، الموعد)",
      "كل إجابة قانونية بمصدرها وتاريخ مراجعتها",
      "تحذير واضح لو مفيش معلومة موثقة",
    ],
  },
  {
    stage: "بناء النموذج الأولي",
    status: "coming_soon",
    features: ["قريبًا"],
  },
  {
    stage: "الإطلاق والمبيعات الأولى",
    status: "coming_soon",
    features: ["قريبًا"],
  },
] as const;

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16 border-b border-border">
        <BlueprintGrid className="absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <SectionHeader label="المميزات" annotation="FIG. 01" headingLevel="h1">
            مرتّبة حسب رحلتك، مش قايمة أدوات
          </SectionHeader>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((mod) => (
              <div
                key={mod.stage}
                className="rounded-sm border border-border bg-surface p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h2 className="font-display text-base font-semibold text-text">
                    {mod.stage}
                  </h2>
                  {mod.status === "available" ? (
                    <Badge variant="success" className="text-[10px] shrink-0">
                      متاح
                    </Badge>
                  ) : (
                    <Badge variant="muted" className="text-[10px] shrink-0 text-text-muted">
                      قريبًا
                    </Badge>
                  )}
                </div>
                <ul className="flex flex-col gap-2" role="list">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-muted">
                      {mod.status === "available" && (
                        <span className="text-success mt-0.5" aria-hidden="true">
                          ✓
                        </span>
                      )}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
