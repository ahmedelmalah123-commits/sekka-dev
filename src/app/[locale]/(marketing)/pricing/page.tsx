import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/marketing/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlueprintGrid } from "@/components/brand/blueprint-grid";

export const metadata: Metadata = {
  title: "الأسعار — سِكّة",
  description: "خطة مجانية للبدء. الخطط المدفوعة قريبًا.",
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16 border-b border-border">
        <BlueprintGrid className="absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <SectionHeader label="الأسعار" annotation="FIG. 01" headingLevel="h1">
            ابدأ مجانًا، ووسّع مع مشروعك
          </SectionHeader>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            الأرقام التفصيلية والحدود الدقيقة هتظهر قبل الإطلاق الرسمي.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {/* Free */}
            <div className="rounded-sm border-2 border-primary bg-surface p-8 md:col-span-1">
              <Badge variant="success" className="mb-4">متاح الآن</Badge>
              <h2 className="font-display text-xl font-semibold text-text mb-2">
                المجانية
              </h2>
              <p className="text-sm text-text-muted mb-6">
                كل الأدوات الأساسية مع حدود مناسبة للبداية.
              </p>
              <ul className="space-y-2 mb-8" role="list">
                {[
                  "مشروع واحد",
                  "AI Co-founder",
                  "خطة وخطوات",
                  "محتوى قانوني مراجع",
                  "تصدير الملخصات",
                ].map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-text">
                    <span className="text-success" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link href="/waitlist">انضم لقائمة الانتظار</Link>
              </Button>
            </div>

            {/* Pro teaser */}
            <div className="rounded-sm border border-border bg-surface-muted p-8 opacity-70 md:col-span-1">
              <Badge variant="muted" className="mb-4">قريبًا</Badge>
              <h2 className="font-display text-xl font-semibold text-text mb-2">
                المدفوعة
              </h2>
              <p className="text-sm text-text-muted mb-6">
                مشاريع أكثر، استخدام أوسع، ميزات متقدمة. التفاصيل قريبًا.
              </p>
              <Button variant="outline" disabled className="w-full">قريبًا</Button>
            </div>

            {/* B2B */}
            <div className="rounded-sm border border-border bg-surface p-8 md:col-span-1">
              <Badge variant="neutral" className="mb-4">للمؤسسات</Badge>
              <h2 className="font-display text-xl font-semibold text-text mb-2">
                الحاضنات والمسرّعات
              </h2>
              <p className="text-sm text-text-muted mb-6">
                حزمة مخصصة لدعم مجموعات من المشاريع الناشئة.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">تواصل معنا</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
