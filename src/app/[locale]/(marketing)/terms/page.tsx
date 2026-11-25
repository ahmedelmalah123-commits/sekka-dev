import type { Metadata } from "next";
import { SectionHeader } from "@/components/marketing/section-header";
import { Alert } from "@/components/ui/alert";
import { brandConfig } from "@/config/brand.config";

export const metadata: Metadata = {
  title: "الشروط والأحكام (مسودة)",
  description: "مسودة صفحة الشروط والأحكام — بانتظار المراجعة القانونية.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[720px] px-4 space-y-8">
        <SectionHeader label="قانوني" annotation="DRAFT" headingLevel="h1">
          الشروط والأحكام
        </SectionHeader>

        <Alert variant="warning" title={brandConfig.legalDraftNotice.ar}>
          هذه الصفحة مجرد هيكل مبدئي (Placeholder). النص القانوني الفعلي سيتم نشره بعد المراجعة القانونية المعتمدة.
        </Alert>

        <div className="space-y-4 text-sm leading-relaxed text-text-muted rounded-sm border border-border bg-surface p-6">
          <h2 className="font-display text-base font-semibold text-text">
            ١. طبيعة الخدمة (مسودة)
          </h2>
          <p>
            سِكّة أداة مساعدة لتنظيم وتخطيط المشاريع. أي معلومات قانونية أو إجرائية داخل المنصة هي للإرشاد فقط ولا تُعد استشارة قانونية رسمية.
          </p>
          <h2 className="font-display text-base font-semibold text-text">
            ٢. المحتوى والقرارات (مسودة)
          </h2>
          <p>
            صاحب المشروع هو المسؤول الوحيد عن قراراته التجارية والقانونية.
          </p>
        </div>
      </div>
    </section>
  );
}
