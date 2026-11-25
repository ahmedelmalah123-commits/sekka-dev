import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/section-header";
import { DimensionLabel } from "@/components/brand/dimension-label";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";

export const metadata: Metadata = {
  title: "كيف يعمل سِكّة",
  description: "رحلة المستخدم من الفكرة للإطلاق خطوة بخطوة مع سِكّة، شريك المؤسس بالذكاء الاصطناعي.",
};

const STEPS = [
  {
    num: "01",
    title: "احكيلي فكرتك",
    body: "متعبّيش فورم طويل. احكيلي الفكرة بكلامك الطبيعي وأنا هسألك الأسئلة الصح لفهم مشروعك.",
  },
  {
    num: "02",
    title: "AI بيبني ملف مشروعك",
    body: "بناءً على المحادثة، الـ AI بيبني Profile للمشروع: النوع، الميزانية، المدينة، الوقت المتاح. كل حاجة بتأكدها إنت قبل ما تتحفظ.",
  },
  {
    num: "03",
    title: "خطة مخصصة ليك",
    body: "بناءً على مشروعك، بتوّلد خطة بمراحل وخطوات ومهام واضحة. مش قالب جاهز، خطة مبنية على تفاصيلك.",
  },
  {
    num: "04",
    title: "مهام AI ومهام بشرية",
    body: "بعض الخطوات الـ AI بينفذها وبسلّمهالك (تحليل، مستند، خطة). والبشرية بتجيها بكل التفاصيل: أروح فين، آخد إيه، الرسوم، الموعد.",
  },
  {
    num: "05",
    title: "السياق بيفضل معاك",
    body: "الـ AI بيفتكر كل قرار خدته ومعلومة قلتها. مش محتاج تعيد الشرح في كل محادثة.",
  },
  {
    num: "06",
    title: "توسّع مع مشروعك",
    body: "كل ما المشروع بيتقدم، الـ AI بيقترح الخطوات الجاية ويفتح مراحل جديدة معاك.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden py-16 border-b border-border">
        <BlueprintGrid className="absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <SectionHeader
            label="كيف يعمل"
            annotation="FIG. 01"
            headingLevel="h1"
          >
            من الفكرة للتنفيذ في خطوات واضحة
          </SectionHeader>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20" aria-label="خطوات العمل">
        <div className="mx-auto max-w-[800px] px-4">
          <ol className="relative border-s border-border ps-8" role="list">
            {STEPS.map((step, i) => (
              <li key={step.num} className="mb-12 last:mb-0">
                <div
                  className="absolute -start-2.5 mt-1 flex h-5 w-5 items-center justify-center rounded-sm border border-primary bg-bg"
                  aria-hidden="true"
                >
                  <span className="font-mono text-[9px] text-primary">
                    {i + 1}
                  </span>
                </div>
                <DimensionLabel code={step.num} className="mb-2" />
                <h2 className="font-display text-xl font-semibold text-text mb-3">
                  {step.title}
                </h2>
                <p className="text-text-muted leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
