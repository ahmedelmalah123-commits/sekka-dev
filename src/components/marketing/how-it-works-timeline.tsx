import { DimensionLabel } from "@/components/brand/dimension-label";
import { SectionHeader } from "@/components/marketing/section-header";

const STEPS = [
  {
    num: "01",
    title: "احكيلي فكرتك",
    body: "متعبّيش فورم طويل. احكيلي الفكرة بكلامك الطبيعي وأنا هسألك الأسئلة الصح.",
  },
  {
    num: "02",
    title: "AI يبني خطتك",
    body: "بناءً على فكرتك، هبني خطة مشروع مخصصة بمراحل وخطوات ومهام واضحة.",
  },
  {
    num: "03",
    title: "نفّذ معاه خطوة بخطوة",
    body: "أنا معاك في كل خطوة. بنفذ المهام الـ AI، وأديك تعليمات المهام البشرية بكل التفاصيل.",
  },
] as const;

export function HowItWorksTimeline() {
  return (
    <section
      className="py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="how-it-works-heading"
          label="كيف يعمل"
          annotation="FIG. 04"
          headingLevel="h2"
          className="mb-14 text-center"
        >
          3 خطوات بس
        </SectionHeader>

        <ol className="relative flex flex-col gap-0 md:flex-row" role="list">
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              className="relative flex flex-1 flex-col md:items-center"
            >
              {/* Connector line (not last) */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute start-6 top-6 hidden h-px w-full bg-border md:block"
                  aria-hidden="true"
                />
              )}

              <div className="relative flex flex-col gap-4 pb-10 md:items-center md:pb-0 md:text-center">
                {/* Step number */}
                <DimensionLabel code={step.num} className="z-10 bg-bg" />

                <h3 className="font-display text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted max-w-xs">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
