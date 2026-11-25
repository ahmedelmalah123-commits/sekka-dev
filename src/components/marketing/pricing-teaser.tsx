import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/marketing/section-header";
import { Badge } from "@/components/ui/badge";

export function PricingTeaser() {
  return (
    <section className="py-20" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-[1200px] px-4">
        <SectionHeader
          id="pricing-heading"
          label="الأسعار"
          annotation="FIG. 10"
          headingLevel="h2"
          className="mb-12 text-center"
        >
          ابدأ مجانًا، ووسّع مع مشروعك
        </SectionHeader>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Free plan */}
          <div className="rounded-sm border-2 border-primary bg-surface p-8">
            <Badge variant="success" className="mb-4">
              متاح الآن
            </Badge>
            <h3 className="font-display text-xl font-semibold text-text mb-2">
              الخطة المجانية
            </h3>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              ابدأ مشروعك مجانًا. كل الأدوات الأساسية بحدود كافية للبداية.
            </p>
            <ul className="flex flex-col gap-2 mb-8" role="list">
              {[
                "مشروع واحد",
                "الـ AI Co-founder",
                "خطة المشروع والمهام",
                "المحتوى القانوني المراجع",
                "تصدير الملخصات",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-text">
                  <span className="text-success" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild className="w-full">
              <Link href="/waitlist">انضم لقائمة الانتظار</Link>
            </Button>
          </div>

          {/* Paid plan teaser */}
          <div className="rounded-sm border border-border bg-surface-muted p-8 opacity-80">
            <Badge variant="muted" className="mb-4">
              قريبًا
            </Badge>
            <h3 className="font-display text-xl font-semibold text-text mb-2">
              الخطط المدفوعة
            </h3>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              مشاريع أكثر، استخدام أوسع، وميزات متقدمة. التفاصيل قريبًا.
            </p>
            <Button variant="outline" className="w-full" disabled>
              قريبًا
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-text-muted">
          الأرقام والحدود التفصيلية هتظهر قبل الإطلاق الرسمي.{" "}
          <Link href="/pricing" className="underline hover:text-text">
            تفاصيل الأسعار
          </Link>
        </p>
      </div>
    </section>
  );
}
