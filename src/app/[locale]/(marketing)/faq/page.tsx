import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/section-header";
import { FaqSection, HOME_FAQS } from "@/components/marketing/faq-section";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات واضحة عن سِكّة، التأسيس القانوني في مصر، والخصوصية.",
};

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16 border-b border-border">
        <BlueprintGrid className="absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <SectionHeader label="الأسئلة الشائعة" annotation="FIG. 01" headingLevel="h1">
            كل اللي محتاج تعرفه عن سِكّة
          </SectionHeader>
        </div>
      </section>

      <FaqSection faqs={HOME_FAQS} />

      <ClosingCta />
    </>
  );
}
